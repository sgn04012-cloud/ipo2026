const AdmZip = require('adm-zip');
const { createClient } = require('@supabase/supabase-js');
const Anthropic = require('@anthropic-ai/sdk');

/* ─ 날짜 유틸 ─ */
const fmt = d => d.toISOString().slice(0,10).replace(/-/g,'');

function getRange() {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 17);
  return { bgn_de: fmt(start), end_de: fmt(end) };
}

/* ─ DART 목록 조회 ─ */
async function getDartList(dartKey, bgn_de, end_de) {
  const url =
    `https://opendart.fss.or.kr/api/list.json` +
    `?crtfc_key=${dartKey}` +
    `&pblntf_detail_ty=A001` +
    `&bgn_de=${bgn_de}&end_de=${end_de}` +
    `&page_count=100&sort=date&sort_mth=asc`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status !== '000') throw new Error(`DART API: ${data.message}`);
  return data.list || [];
}

/* ─ 필터링 ─ */
function isRelevantIPO(f) {
  if (f.stock_code && f.stock_code.trim()) return false;
  const corp   = f.corp_name  || '';
  const report = f.report_nm  || '';
  if (/스팩|SPAC|기업인수목적/.test(corp))  return false;
  if (/유상증자/.test(report))              return false;
  return true;
}

/* ─ DART ZIP 다운로드 → 텍스트 추출 ─ */
async function getDocText(rcept_no, dartKey) {
  const url = `https://opendart.fss.or.kr/api/document.xml?rcept_no=${rcept_no}&crtfc_key=${dartKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`문서 다운로드 실패: ${res.status}`);
  const arrayBuf = await res.arrayBuffer();
  const buf = Buffer.from(arrayBuf);
  const zip = new AdmZip(buf);
  let text = '';
  for (const entry of zip.getEntries()) {
    const name = entry.entryName.toLowerCase();
    if (!name.endsWith('.html') && !name.endsWith('.htm')) continue;
    const html = entry.getData().toString('utf8');
    const t = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&')
      .replace(/\s+/g, ' ')
      .trim();
    if (t.length > text.length) text = t;
  }
  const idx = text.indexOf('인수인의 의견');
  return idx > -1
    ? text.slice(Math.max(0, idx - 500), idx + 79500)
    : text.slice(0, 80000);
}

/* ─ Claude 파싱 ─ */
async function parseClaude(anthropic, text, corpName) {
  const msg = await anthropic.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 900,
    messages: [{
      role: 'user',
      content:
`다음은 DART 증권신고서 인수인의견 텍스트입니다.
공모가 산정 정보를 추출해 JSON만 반환하세요 (설명 없이 JSON만):

{"name":"기업명","uw":"주관사명 전체","uk":"KB|미래에셋|한국투자|NH투자|삼성증권|유진투자|신한투자|기타","s":"bio|tech|robot|energy|fin|contents","m":"PER|PSR|EV|PBR","b":"실적치|추정치","y":"기준연도(예:2028,LTM,3Q25)","x":배수숫자,"ps":"국내비교기업(쉼표구분,없으면빈문자열)","pg":"해외비교기업(없으면빈문자열)","ev":주당평가가액정수,"dl":할인율하단숫자,"dh":할인율상단숫자,"bl":공모가밴드하단정수,"bh":공모가밴드상단정수}

회사명: ${corpName}
텍스트: ${text}`
    }]
  });
  const raw = msg.content.map(c => c.text||'').join('').replace(/```json|```/g,'').trim();
  return JSON.parse(raw);
}

/* ─ 메인 핸들러 ─ */
const handler = async (event) => {
  /* 보안 확인 */
  const headers = event.headers || {};
  const qs = event.queryStringParameters || {};
  const token = headers['x-cron-token'] || qs.token;

  if (process.env.CRON_SECRET && token !== process.env.CRON_SECRET) {
    return { statusCode: 401, body: 'Unauthorized' };
  }

  const dartKey   = process.env.DART_API_KEY;
  const supabase  = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  try {
    const { bgn_de, end_de } = getRange();
    console.log(`[DART] 조회: ${bgn_de} ~ ${end_de}`);

    const list     = await getDartList(dartKey, bgn_de, end_de);
    const relevant = list.filter(isRelevantIPO);
    console.log(`[DART] 전체 ${list.length}건 → IPO 해당 ${relevant.length}건`);

    const newOnes = relevant.filter(f => !f.report_nm.startsWith('[기재정정]'));
    const amended = relevant.filter(f =>  f.report_nm.startsWith('[기재정정]'));

    const results = { added:[], updated:[], skipped:[], errors:[] };

    /* 신규 처리 */
    for (const f of newOnes) {
      await new Promise(r => setTimeout(r, 1500));
      try {
        const { data: ex } = await supabase.from('ipo_companies')
          .select('id').eq('dart_rcept_no', f.rcept_no).maybeSingle();
        if (ex) { results.skipped.push(f.corp_name); continue; }

        const text   = await getDocText(f.rcept_no, dartKey);
        const parsed = await parseClaude(anthropic, text, f.corp_name);

        await supabase.from('ipo_companies').insert({
          dart_rcept_no: f.rcept_no,
          ...parsed,
          st: 'prog', ld: '',
          cp: null, bp: null, lc: null,
          la: false, ln: '', tb: false,
          amended: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
        results.added.push(f.corp_name);
        console.log(`[추가] ${f.corp_name}`);
      } catch(e) {
        results.errors.push({ name: f.corp_name, error: e.message });
        console.error(`[오류] ${f.corp_name}:`, e.message);
      }
    }

    /* 기재정정 처리 */
    for (const f of amended) {
      await new Promise(r => setTimeout(r, 1500));
      try {
        const text   = await getDocText(f.rcept_no, dartKey);
        const parsed = await parseClaude(anthropic, text, f.corp_name);
        await supabase.from('ipo_companies')
          .update({ ...parsed, dart_rcept_no: f.rcept_no, amended: true, updated_at: new Date().toISOString() })
          .eq('name', parsed.name || f.corp_name);
        results.updated.push(f.corp_name);
        console.log(`[정정] ${f.corp_name}`);
      } catch(e) {
        results.errors.push({ name: f.corp_name, error: e.message });
        console.error(`[오류] ${f.corp_name}:`, e.message);
      }
    }

    await supabase.from('update_logs').insert({
      run_at: new Date().toISOString(),
      bgn_de, end_de,
      added:   results.added.length,
      updated: results.updated.length,
      skipped: results.skipped.length,
      errors:  results.errors.length,
      detail:  JSON.stringify(results)
    });

    console.log('[완료]', JSON.stringify(results));
    return { statusCode: 200, body: JSON.stringify({ ok: true, ...results }) };

  } catch(e) {
    console.error('[치명오류]', e.message);
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};

exports.handler = handler;
