<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>2026 IPO 밸류에이션 DB</title>
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script src="https://unpkg.com/@supabase/supabase-js@2/dist/umd/supabase.js"></script>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}html,body,#root{height:100%}
body{background:#0e1117;color:#e8eaf0;font-family:'Noto Sans KR',sans-serif;font-size:13px}
::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:#0e1117}::-webkit-scrollbar-thumb{background:rgba(255,255,255,.18);border-radius:3px}
input,select,textarea{font-family:inherit;font-size:12.5px;outline:none;background:#1a2030;border:1px solid rgba(255,255,255,.1);color:#e8eaf0;padding:7px 10px;border-radius:6px;width:100%;transition:border .15s}
input:focus,select:focus,textarea:focus{border-color:rgba(212,169,78,.7)}
input[type=checkbox]{width:auto;cursor:pointer;accent-color:#d4a94e}
button{cursor:pointer;font-family:inherit}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes fadeIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
</style>
</head>
<body><div id="root"></div>
<script type="text/babel">
const {useState,useEffect,useCallback,useMemo,useRef}=React;

/* ─ Supabase 설정 키 ─ */
const SB_URL_KEY='ipo_sb_url', SB_KEY_KEY='ipo_sb_anon', AK='ipo_apikey';

const SM={bio:{l:'바이오·의료',c:'#e879a8'},tech:{l:'테크·AI·SW',c:'#3b82f6'},robot:{l:'로봇·모빌리티',c:'#8b5cf6'},energy:{l:'에너지·인프라',c:'#10b981'},fin:{l:'금융·핀테크',c:'#f59e0b'},contents:{l:'콘텐츠·소비',c:'#ef4444'}};
const MM={PER:{l:'PER',bg:'rgba(59,130,246,.18)',c:'#60a5fa'},PSR:{l:'PSR',bg:'rgba(139,92,246,.18)',c:'#a78bfa'},EV:{l:'EV/EBITDA',bg:'rgba(16,185,129,.15)',c:'#34d399'},PBR:{l:'PBR',bg:'rgba(245,158,11,.15)',c:'#f59e0b'}};
const UW=['KB','미래에셋','한국투자','NH투자','삼성증권','유진투자','신한투자','기타'];
const EMPTY={name:'',s:'bio',st:'prog',ld:'',uw:'',uk:'KB',m:'PER',b:'추정치',y:'2028',x:'',ps:'',pg:'',ev:'',dl:'',dh:'',bl:'',bh:'',cp:'',bp:'top',lc:'',la:false,ln:'',tb:false};

const Nf=n=>n!=null?n.toLocaleString()+'원':'—';
const Rf=(a,b)=>b?(((a-b)/b)*100).toFixed(1):null;

function htmlToText(html){
  try{const doc=new DOMParser().parseFromString(html,'text/html');doc.querySelectorAll('script,style,head').forEach(e=>e.remove());return(doc.body.textContent||'').replace(/\s+/g,' ').trim();}catch(e){return html;}
}
async function batchParse(text,apiKey,onProg){
  const CHUNK=80000,chunks=[];
  for(let i=0;i<text.length;i+=CHUNK)chunks.push(text.slice(i,i+CHUNK));
  const prompt=c=>`다음 DART IPO 문서에서 공모가 산정 정보가 있는 기업을 모두 찾아 JSON 배열만 반환하세요.\n기업이 여러개면 모두 포함. 다른 텍스트 없이 JSON 배열만.\n\n[\n  {"name":"기업명","uw":"주관사","uk":"KB|미래에셋|한국투자|NH투자|삼성증권|유진투자|신한투자|기타","s":"bio|tech|robot|energy|fin|contents","m":"PER|PSR|EV|PBR","b":"실적치|추정치","y":"추정연도","x":배수,"ps":"국내비교기업","pg":"해외비교기업","ev":주당평가가액,"dl":할인율하단,"dh":할인율상단,"bl":밴드하단,"bh":밴드상단}\n]\n\n문서:\n${c}`;
  let all=[];
  for(let i=0;i<chunks.length;i++){
    onProg&&onProg(i,chunks.length);
    const res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json','x-api-key':apiKey,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},body:JSON.stringify({model:'claude-opus-4-5',max_tokens:4000,messages:[{role:'user',content:prompt(chunks[i])}]})});
    if(!res.ok){const e=await res.json().catch(()=>({}));throw new Error(e?.error?.message||`API 오류 ${res.status}`);}
    const d=await res.json();
    const raw=d.content.map(c=>c.text||'').join('').replace(/```json|```/g,'').trim();
    const p=JSON.parse(raw);all=[...all,...(Array.isArray(p)?p:[p])];
  }
  const seen=new Set();
  return all.filter(c=>{if(!c.name||seen.has(c.name))return false;seen.add(c.name);return true;});
}

/* ─ 공통 컴포넌트 ─ */
const Tag=({bg,c,ch})=><span style={{display:'inline-block',background:bg,color:c,padding:'2px 8px',borderRadius:4,fontFamily:'JetBrains Mono,monospace',fontSize:11,fontWeight:600,whiteSpace:'nowrap'}}>{ch}</span>;
const Chip=({on,click,dot,ch})=><button onClick={click} style={{display:'inline-flex',alignItems:'center',gap:5,padding:'4px 11px',borderRadius:5,border:on?'1px solid #d4a94e':'1px solid rgba(255,255,255,.1)',background:on?'rgba(212,169,78,.1)':'transparent',color:on?'#f0c76a':'#9ba3b8',fontSize:12,fontWeight:on?500:400,transition:'all .12s',userSelect:'none',whiteSpace:'nowrap'}}>{dot&&<span style={{width:7,height:7,borderRadius:'50%',background:dot}}/>}{ch}</button>;
const Fld=({label,children,span})=><div style={{marginBottom:10,gridColumn:span?`span ${span}`:undefined}}><div style={{fontSize:10.5,color:'#7b8399',marginBottom:3,textTransform:'uppercase',letterSpacing:.8,fontFamily:'JetBrains Mono,monospace'}}>{label}</div>{children}</div>;

function DiscBar({dl,dh,bl,bh}){
  const p=Math.min(100,(dh/60)*100),g=dh>45?'#ef4444':dh>35?'#f59e0b':'#10b981';
  return<div style={{minWidth:185}}><div style={{display:'flex',justifyContent:'space-between',marginBottom:4,fontFamily:'JetBrains Mono,monospace',fontSize:10.5}}><span style={{color:'#10b981'}}>↓{dl}%</span><span style={{color:'#6b7280'}}>~</span><span style={{color:'#ef4444'}}>{dh}%↑</span><span style={{color:'#6b7280',fontSize:10}}>{(bl||0).toLocaleString()}~{(bh||0).toLocaleString()}</span></div><div style={{height:4,background:'rgba(255,255,255,.07)',borderRadius:2,overflow:'hidden'}}><div style={{width:`${p}%`,height:'100%',background:g,borderRadius:2}}/></div></div>;
}
function ResCell({d}){
  if(d.st==='prog')return<span style={{color:'#6b7280',fontSize:12,fontStyle:'italic'}}>수요예측 진행 중</span>;
  const p=d.lc&&d.cp?Rf(d.lc,d.cp):null,pc=p?parseFloat(p):0;
  return<div><div style={{display:'flex',alignItems:'center',gap:5,marginBottom:4,flexWrap:'wrap'}}><span style={{fontFamily:'JetBrains Mono,monospace',fontSize:13,fontWeight:600,color:'#e8eaf0'}}>{Nf(d.cp)}</span><Tag bg={d.bp==='top'?'rgba(16,185,129,.15)':'rgba(239,68,68,.12)'} c={d.bp==='top'?'#10b981':'#ef4444'} ch={d.bp==='top'?'상단':'하단'}/>{d.tb&&<Tag bg='rgba(245,158,11,.15)' c='#f59e0b' ch='따따블'/>}</div>{d.lc&&<div style={{display:'flex',alignItems:'baseline',gap:7}}><span style={{fontFamily:'JetBrains Mono,monospace',fontSize:13,color:'#e8eaf0'}}>{d.la&&'~'}{Nf(d.lc)}</span>{p&&<span style={{fontFamily:'JetBrains Mono,monospace',fontSize:12,fontWeight:600,color:pc>0?'#10b981':pc<0?'#ef4444':'#9ba3b8'}}>{pc>0?'+':''}{p}%</span>}</div>}{d.ln&&<div style={{fontSize:10.5,color:'#6b7280',marginTop:2,lineHeight:1.4}}>{d.ln}</div>}</div>;
}

/* ─ 설정 모달 ─ */
function SettingsModal({settings,onSave,onClose}){
  const [f,setF]=useState(settings);
  return(
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.7)',zIndex:300,display:'flex',alignItems:'center',justifyContent:'center',padding:20}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div style={{background:'#161b25',border:'1px solid rgba(255,255,255,.1)',borderRadius:12,width:'100%',maxWidth:500,padding:28,animation:'fadeIn .2s ease'}}>
        <div style={{fontSize:16,fontWeight:700,color:'#e8eaf0',marginBottom:6}}>⚙ 연동 설정</div>
        <div style={{fontSize:12.5,color:'#7b8399',marginBottom:20,lineHeight:1.7}}>
          <b style={{color:'#d4a94e'}}>Supabase</b> — 자동 업데이트 데이터 동기화. <a href="https://supabase.com" target="_blank" style={{color:'#60a5fa'}}>supabase.com</a>에서 프로젝트 생성 후 anon key 사용.<br/>
          <b style={{color:'#d4a94e'}}>Anthropic API 키</b> — 수동 붙여넣기 파싱용.
        </div>
        <Fld label="Supabase Project URL"><input value={f.sbUrl||''} onChange={e=>setF(p=>({...p,sbUrl:e.target.value}))} placeholder="https://xxxxxxxxxxx.supabase.co"/></Fld>
        <Fld label="Supabase Anon Key"><input type="password" value={f.sbKey||''} onChange={e=>setF(p=>({...p,sbKey:e.target.value}))} placeholder="eyJ..."/></Fld>
        <Fld label="Anthropic API Key (수동 파싱용)"><input type="password" value={f.akKey||''} onChange={e=>setF(p=>({...p,akKey:e.target.value}))} placeholder="sk-ant-api03-..."/></Fld>
        <div style={{fontSize:11,color:'rgba(239,68,68,.8)',marginBottom:16}}>⚠ 키는 이 브라우저에만 저장됩니다.</div>
        <div style={{display:'flex',gap:10}}>
          <button onClick={onClose} style={{flex:1,background:'transparent',border:'1px solid rgba(255,255,255,.12)',color:'#9ba3b8',padding:10,borderRadius:6,fontSize:13}}>취소</button>
          <button onClick={()=>onSave(f)} style={{flex:2,background:'#d4a94e',border:'none',color:'#0e1117',padding:10,borderRadius:6,fontSize:13,fontWeight:700}}>저장</button>
        </div>
      </div>
    </div>
  );
}

/* ─ 배치 파싱 모달 ─ */
function BatchModal({apiKey,existingNames,onDone,onClose}){
  const [src,setSrc]=useState(''),[fn,setFn]=useState(''),[step,setStep]=useState('input');
  const [prog,setProg]=useState({c:0,t:1}),[companies,setCompanies]=useState([]);
  const [checked,setChecked]=useState({}),[err,setErr]=useState('');
  const fRef=useRef();
  const handleFile=async e=>{const file=e.target.files[0];if(!file)return;setFn(file.name);const raw=await file.text();setSrc(/\.html?$/i.test(file.name)?htmlToText(raw):raw);};
  const handleDrop=async e=>{e.preventDefault();const file=e.dataTransfer.files[0];if(!file)return;setFn(file.name);const raw=await file.text();setSrc(/\.html?$/i.test(file.name)?htmlToText(raw):raw);};
  const run=async()=>{if(!src.trim()){setErr('파일 또는 텍스트가 필요합니다.');return;}if(!apiKey){setErr('⚙ 설정에서 Anthropic API 키를 먼저 입력해주세요.');return;}setStep('parsing');setErr('');
    try{const list=await batchParse(src,apiKey,(c,t)=>setProg({c,t}));if(!list.length)throw new Error('추출된 기업이 없습니다.');setCompanies(list);const init={};list.forEach((_,i)=>init[i]=true);setChecked(init);setStep('review');}catch(e){setErr(e.message);setStep('error');}};
  const toggleAll=v=>{const n={};companies.forEach((_,i)=>n[i]=v);setChecked(n);};
  const confirm=()=>onDone(companies.filter((_,i)=>checked[i]));
  const box={background:'#161b25',border:'1px solid rgba(255,255,255,.1)',borderRadius:12,width:'100%',maxWidth:760,maxHeight:'92vh',display:'flex',flexDirection:'column',animation:'fadeIn .2s ease'};
  return(
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.75)',zIndex:300,display:'flex',alignItems:'center',justifyContent:'center',padding:16}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div style={box}>
        <div style={{padding:'16px 22px',borderBottom:'1px solid rgba(255,255,255,.07)',display:'flex',justifyContent:'space-between',alignItems:'center',flexShrink:0}}>
          <div><div style={{fontSize:15,fontWeight:700,color:'#e8eaf0',marginBottom:2}}>{step==='input'?'📋 수동 데이터 추가':step==='parsing'?'🤖 AI 분석 중...':step==='review'?`✅ ${companies.length}개 추출 완료`:'❌ 분석 실패'}</div><div style={{fontSize:12,color:'#7b8399'}}>{step==='input'?'HTML 파일 or 텍스트 → AI가 모든 기업 자동 추출':step==='parsing'?`청크 ${prog.c+1}/${prog.t} 처리 중...`:step==='review'?'추가할 기업 선택':err}</div></div>
          <button onClick={onClose} style={{background:'none',border:'none',color:'#7b8399',fontSize:22,lineHeight:1}}>✕</button>
        </div>
        <div style={{flex:1,overflowY:'auto',padding:'16px 22px'}}>
          {(step==='input'||step==='error')&&<>
            <div onClick={()=>fRef.current.click()} onDrop={handleDrop} onDragOver={e=>e.preventDefault()} style={{border:'2px dashed rgba(255,255,255,.12)',borderRadius:10,padding:'22px 20px',textAlign:'center',cursor:'pointer',marginBottom:16,background:'rgba(255,255,255,.02)'}} onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(212,169,78,.5)'} onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(255,255,255,.12)'}>
              <div style={{fontSize:30,marginBottom:8}}>📂</div>
              <div style={{fontWeight:600,color:'#e8eaf0',marginBottom:4}}>{fn?<span style={{color:'#d4a94e'}}>{fn} ✓</span>:'HTML 파일 드래그 or 클릭'}</div>
              <div style={{fontSize:12,color:'#7b8399'}}>.html .htm .txt 지원 · 여러 기업이 담긴 파일도 OK</div>
              <input ref={fRef} type="file" accept=".html,.htm,.txt" onChange={handleFile} style={{display:'none'}}/>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}><div style={{flex:1,height:1,background:'rgba(255,255,255,.07)'}}/><span style={{color:'#6b7280',fontSize:12}}>또는 텍스트 직접 붙여넣기</span><div style={{flex:1,height:1,background:'rgba(255,255,255,.07)'}}/></div>
            <textarea value={src} onChange={e=>setSrc(e.target.value)} placeholder={'DART 인수인의견 텍스트 붙여넣기\n\n한 달치 여러 기업이 섞여 있어도 AI가 전부 자동 추출합니다.'} style={{width:'100%',height:160,resize:'vertical',lineHeight:1.6,fontFamily:'JetBrains Mono,monospace',fontSize:12}}/>
            {src&&<div style={{fontSize:11,color:'#7b8399',marginTop:6,textAlign:'right'}}>{src.length.toLocaleString()}자 · {Math.ceil(src.length/80000)}개 청크</div>}
            {err&&<div style={{color:'#ef4444',fontSize:12,marginTop:8,padding:'8px 12px',background:'rgba(239,68,68,.08)',borderRadius:6}}>{err}</div>}
          </>}
          {step==='parsing'&&<div style={{display:'flex',flexDirection:'column',alignItems:'center',padding:'40px 0',gap:20}}><div style={{width:52,height:52,border:'3px solid rgba(212,169,78,.15)',borderTop:'3px solid #d4a94e',borderRadius:'50%',animation:'spin 1s linear infinite'}}/><div style={{textAlign:'center'}}><div style={{color:'#d4a94e',fontSize:16,fontWeight:600,marginBottom:6}}>분석 중 {prog.c+1}/{prog.t}</div><div style={{color:'#7b8399',fontSize:13}}>기업명·방법론·배수·비교기업·할인율 자동 추출</div><div style={{marginTop:16,height:4,background:'rgba(255,255,255,.07)',borderRadius:2,overflow:'hidden',width:320}}><div style={{width:`${(prog.c/prog.t)*100}%`,height:'100%',background:'#d4a94e',borderRadius:2,transition:'width .3s'}}/></div></div></div>}
          {step==='review'&&<>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}><div style={{fontSize:12,color:'#7b8399'}}>{Object.values(checked).filter(Boolean).length}개 선택</div><div style={{display:'flex',gap:8}}><button onClick={()=>toggleAll(true)} style={{background:'transparent',border:'1px solid rgba(255,255,255,.12)',color:'#9ba3b8',padding:'4px 10px',borderRadius:5,fontSize:12}}>전체 선택</button><button onClick={()=>toggleAll(false)} style={{background:'transparent',border:'1px solid rgba(255,255,255,.12)',color:'#9ba3b8',padding:'4px 10px',borderRadius:5,fontSize:12}}>전체 해제</button></div></div>
            <div style={{display:'flex',flexDirection:'column',gap:6}}>
              {companies.map((c,i)=>{const sm=SM[c.s]||{},mm=MM[c.m]||{},on=!!checked[i],dup=existingNames.has(c.name);
                return<div key={i} onClick={()=>!dup&&setChecked(p=>({...p,[i]:!p[i]}))} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 14px',background:on?'rgba(212,169,78,.06)':'rgba(255,255,255,.02)',border:on?'1px solid rgba(212,169,78,.25)':'1px solid rgba(255,255,255,.07)',borderRadius:8,cursor:dup?'default':'pointer',opacity:dup?.5:1}}>
                  <input type="checkbox" checked={on&&!dup} onChange={()=>{}} style={{flexShrink:0}}/>
                  <span style={{width:8,height:8,borderRadius:'50%',background:sm.c,flexShrink:0}}/>
                  <div style={{flex:1,minWidth:0}}><div style={{fontWeight:600,fontSize:13,color:'#e8eaf0',marginBottom:2}}>{c.name}{dup&&<span style={{fontSize:10,color:'#f59e0b',marginLeft:6}}>이미 존재</span>}</div><div style={{fontSize:11,color:'#7b8399'}}>{c.uw}</div></div>
                  <Tag bg={mm.bg||''} c={mm.c||''} ch={mm.l||c.m}/>
                  <div style={{textAlign:'right',minWidth:80}}><div style={{fontFamily:'JetBrains Mono,monospace',fontSize:11,color:'#f59e0b',fontWeight:600}}>{c.x}배</div><div style={{fontFamily:'JetBrains Mono,monospace',fontSize:10.5,color:'#7b8399'}}>{(c.ev||0).toLocaleString()}원</div></div>
                  <div style={{textAlign:'right',minWidth:100}}><div style={{fontFamily:'JetBrains Mono,monospace',fontSize:11,color:'#10b981'}}>↓{c.dl}%~{c.dh}%↑</div><div style={{fontFamily:'JetBrains Mono,monospace',fontSize:10.5,color:'#7b8399'}}>{(c.bl||0).toLocaleString()}~{(c.bh||0).toLocaleString()}</div></div>
                </div>;
              })}
            </div>
          </>}
        </div>
        <div style={{padding:'13px 22px',borderTop:'1px solid rgba(255,255,255,.07)',display:'flex',gap:10,flexShrink:0}}>
          {step==='review'&&<button onClick={()=>setStep('input')} style={{flex:1,background:'transparent',border:'1px solid rgba(255,255,255,.12)',color:'#9ba3b8',padding:10,borderRadius:6,fontSize:13}}>← 다시</button>}
          <button onClick={onClose} style={{flex:step==='review'?0:1,background:'transparent',border:'1px solid rgba(255,255,255,.12)',color:'#9ba3b8',padding:10,borderRadius:6,fontSize:13,minWidth:70}}>취소</button>
          {step!=='review'?<button onClick={run} disabled={step==='parsing'} style={{flex:3,background:step==='parsing'?'rgba(212,169,78,.3)':'linear-gradient(135deg,#d4a94e,#f0c76a)',border:'none',color:'#0e1117',padding:10,borderRadius:6,fontSize:13,fontWeight:700}}>{step==='parsing'?'분석 중...':'✨ AI 자동 분석'}</button>
          :<button onClick={confirm} disabled={!Object.values(checked).some(Boolean)} style={{flex:3,background:'#10b981',border:'none',color:'#fff',padding:10,borderRadius:6,fontSize:13,fontWeight:700}}>✓ {Object.values(checked).filter(Boolean).length}개 추가</button>}
        </div>
      </div>
    </div>
  );
}

/* ─ 편집 드로어 ─ */
function EditDrawer({form,sf,onSave,onClose,isNew}){
  const isDone=form.st==='done';
  return(<>
    <div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(0,0,0,.6)',zIndex:200}}/>
    <div style={{position:'fixed',top:0,right:0,width:540,height:'100vh',background:'#161b25',borderLeft:'1px solid rgba(255,255,255,.1)',zIndex:201,display:'flex',flexDirection:'column',animation:'fadeIn .2s ease'}}>
      <div style={{padding:'18px 22px',borderBottom:'1px solid rgba(255,255,255,.07)',display:'flex',justifyContent:'space-between',alignItems:'center',flexShrink:0}}><div style={{fontSize:15,fontWeight:700,color:'#e8eaf0'}}>{isNew?'수동 추가':form.name+' 편집'}</div><button onClick={onClose} style={{background:'none',border:'none',color:'#7b8399',fontSize:22,lineHeight:1}}>✕</button></div>
      <div style={{flex:1,overflowY:'auto',padding:'18px 22px'}}>
        <div style={{fontSize:10,color:'#d4a94e',fontFamily:'JetBrains Mono,monospace',letterSpacing:2,textTransform:'uppercase',marginBottom:12}}>기본 정보</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'0 12px'}}>
          <Fld label="기업명 *"><input value={form.name||''} onChange={e=>sf('name',e.target.value)}/></Fld>
          <Fld label="섹터"><select value={form.s||'bio'} onChange={e=>sf('s',e.target.value)}>{Object.entries(SM).map(([v,m])=><option key={v} value={v}>{m.l}</option>)}</select></Fld>
          <Fld label="상태"><select value={form.st||'prog'} onChange={e=>sf('st',e.target.value)}><option value="prog">진행중</option><option value="done">상장완료</option></select></Fld>
          <Fld label="주관사" span={2}><input value={form.uw||''} onChange={e=>sf('uw',e.target.value)} placeholder="미래에셋·NH투자"/></Fld>
          <Fld label="주관사(필터)"><select value={form.uk||'KB'} onChange={e=>sf('uk',e.target.value)}>{UW.map(v=><option key={v} value={v}>{v}</option>)}</select></Fld>
          <Fld label="상장일"><input value={form.ld||''} onChange={e=>sf('ld',e.target.value)} placeholder="2026.07.15"/></Fld>
        </div>
        <div style={{borderTop:'1px solid rgba(255,255,255,.07)',margin:'6px 0 14px'}}/>
        <div style={{fontSize:10,color:'#d4a94e',fontFamily:'JetBrains Mono,monospace',letterSpacing:2,textTransform:'uppercase',marginBottom:12}}>밸류에이션</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'0 12px'}}>
          <Fld label="방법론"><select value={form.m||'PER'} onChange={e=>sf('m',e.target.value)}>{Object.entries(MM).map(([v,m])=><option key={v} value={v}>{m.l}</option>)}</select></Fld>
          <Fld label="재무기준"><select value={form.b||'추정치'} onChange={e=>sf('b',e.target.value)}><option>실적치</option><option>추정치</option></select></Fld>
          <Fld label="추정연도"><input value={form.y||''} onChange={e=>sf('y',e.target.value)} placeholder="2028"/></Fld>
          <Fld label="배수"><input type="number" value={form.x||''} onChange={e=>sf('x',e.target.value)}/></Fld>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 12px'}}>
          <Fld label="국내 비교기업"><input value={form.ps||''} onChange={e=>sf('ps',e.target.value)}/></Fld>
          <Fld label="글로벌 비교기업"><input value={form.pg||''} onChange={e=>sf('pg',e.target.value)}/></Fld>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'0 12px'}}>
          <Fld label="주당평가가액"><input type="number" value={form.ev||''} onChange={e=>sf('ev',e.target.value)}/></Fld>
          <Fld label="할인 하단(%)"><input type="number" value={form.dl||''} onChange={e=>sf('dl',e.target.value)}/></Fld>
          <Fld label="할인 상단(%)"><input type="number" value={form.dh||''} onChange={e=>sf('dh',e.target.value)}/></Fld>
          <Fld label="밴드 하단"><input type="number" value={form.bl||''} onChange={e=>sf('bl',e.target.value)}/></Fld>
          <Fld label="밴드 상단"><input type="number" value={form.bh||''} onChange={e=>sf('bh',e.target.value)}/></Fld>
        </div>
        {isDone&&<>
          <div style={{borderTop:'1px solid rgba(255,255,255,.07)',margin:'6px 0 14px'}}/>
          <div style={{fontSize:10,color:'#d4a94e',fontFamily:'JetBrains Mono,monospace',letterSpacing:2,textTransform:'uppercase',marginBottom:12}}>상장 결과</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'0 12px'}}>
            <Fld label="확정공모가"><input type="number" value={form.cp||''} onChange={e=>sf('cp',e.target.value)}/></Fld>
            <Fld label="밴드 위치"><select value={form.bp||'top'} onChange={e=>sf('bp',e.target.value)}><option value="top">상단</option><option value="bot">하단</option></select></Fld>
            <Fld label="상장일 종가"><input type="number" value={form.lc||''} onChange={e=>sf('lc',e.target.value)}/></Fld>
            <Fld label="옵션"><div style={{display:'flex',flexDirection:'column',gap:7,paddingTop:7}}><label style={{display:'flex',alignItems:'center',gap:5,color:'#9ba3b8',fontSize:12.5,cursor:'pointer'}}><input type="checkbox" checked={!!form.la} onChange={e=>sf('la',e.target.checked)}/> 근사치(~)</label><label style={{display:'flex',alignItems:'center',gap:5,color:'#f59e0b',fontSize:12.5,cursor:'pointer'}}><input type="checkbox" checked={!!form.tb} onChange={e=>sf('tb',e.target.checked)}/> 따따블</label></div></Fld>
          </div>
          <Fld label="상장일 비고"><input value={form.ln||''} onChange={e=>sf('ln',e.target.value)} placeholder="예) 장중 63,200원 기록"/></Fld>
        </>}
      </div>
      <div style={{padding:'13px 22px',borderTop:'1px solid rgba(255,255,255,.07)',display:'flex',gap:10,flexShrink:0}}>
        <button onClick={onClose} style={{flex:1,background:'transparent',border:'1px solid rgba(255,255,255,.12)',color:'#9ba3b8',padding:10,borderRadius:6,fontSize:13}}>취소</button>
        <button onClick={onSave} style={{flex:2,background:'#d4a94e',border:'none',color:'#0e1117',padding:10,borderRadius:6,fontSize:13,fontWeight:700}}>✓ 저장</button>
      </div>
    </div>
  </>);
}

/* ─ APP ─ */
function App(){
  const [settings,setSettings]=useState(()=>{
    try{return{sbUrl:localStorage.getItem(SB_URL_KEY)||'',sbKey:localStorage.getItem(SB_KEY_KEY)||'',akKey:localStorage.getItem(AK)||''};}catch(e){return{sbUrl:'',sbKey:'',akKey:''};};
  });
  const [data,setData]=useState([]);
  const [lastSync,setLastSync]=useState(null);
  const [syncing,setSyncing]=useState(false);
  const [flt,setFlt]=useState({s:'all',m:'all',uk:'all',st:'all'});
  const [modal,setModal]=useState(null);
  const [form,setForm]=useState({});
  const [delId,setDelId]=useState(null);
  const sf=useCallback((k,v)=>setForm(p=>({...p,[k]:v})),[]);

  /* Supabase 클라이언트 */
  const sb=useMemo(()=>{
    if(settings.sbUrl&&settings.sbKey) return supabase.createClient(settings.sbUrl,settings.sbKey);
    return null;
  },[settings.sbUrl,settings.sbKey]);

  /* 데이터 로드 */
  const loadData=useCallback(async()=>{
    if(sb){
      setSyncing(true);
      try{
        const {data:rows,error}=await sb.from('ipo_companies').select('*').order('created_at',{ascending:false});
        if(!error&&rows){setData(rows);setLastSync(new Date());}
      }catch(e){console.warn('Supabase 로드 실패',e);}
      setSyncing(false);
    } else {
      // localStorage fallback
      try{const v=localStorage.getItem('ipo2026_local');if(v)setData(JSON.parse(v));}catch(e){}
    }
  },[sb]);

  useEffect(()=>{loadData();},[loadData]);

  /* 저장 */
  const persist=useCallback(async(rows)=>{
    setData(rows);
    if(sb){
      // Supabase는 개별 row upsert로 처리
    } else {
      try{localStorage.setItem('ipo2026_local',JSON.stringify(rows));}catch(e){}
    }
  },[sb]);

  /* 설정 저장 */
  const saveSettings=s=>{
    setSettings(s);
    try{localStorage.setItem(SB_URL_KEY,s.sbUrl||'');localStorage.setItem(SB_KEY_KEY,s.sbKey||'');localStorage.setItem(AK,s.akKey||'');}catch(e){}
    setModal(null);
  };

  const rows=useMemo(()=>data.filter(d=>(flt.s==='all'||d.s===flt.s)&&(flt.m==='all'||d.m===flt.m)&&(flt.uk==='all'||d.uk===flt.uk)&&(flt.st==='all'||d.st===flt.st)),[data,flt]);
  const nextId=()=>Math.max(0,...data.map(d=>d.id||0))+1;
  const existingNames=useMemo(()=>new Set(data.map(d=>d.name)),[data]);

  const openEdit=co=>{setForm({...co,x:co.x??'',ev:co.ev??'',dl:co.dl??'',dh:co.dh??'',bl:co.bl??'',bh:co.bh??'',cp:co.cp??'',lc:co.lc??''});setModal('edit');};

  const save=async()=>{
    const n={...form,id:form.id||nextId(),x:parseFloat(form.x)||0,ev:parseInt(form.ev)||0,dl:parseFloat(form.dl)||0,dh:parseFloat(form.dh)||0,bl:parseInt(form.bl)||0,bh:parseInt(form.bh)||0,cp:form.st==='done'?(parseInt(form.cp)||null):null,lc:form.st==='done'?(parseInt(form.lc)||null):null,ps:form.ps||'',pg:form.pg||'',ln:form.ln||''};
    if(sb){
      const {id,...rest}=n;
      if(modal==='add'){await sb.from('ipo_companies').insert(rest);}
      else{await sb.from('ipo_companies').update(rest).eq('id',n.id);}
    }
    const newData=modal==='add'?[...data,n]:data.map(d=>d.id===n.id?n:d);
    await persist(newData);
    setModal(null);
  };

  const addBatch=async list=>{
    const toAdd=list.filter(c=>!existingNames.has(c.name)).map((c,i)=>({
      ...EMPTY,...c,id:nextId()+i,x:parseFloat(c.x)||0,ev:parseInt(c.ev)||0,dl:parseFloat(c.dl)||0,dh:parseFloat(c.dh)||0,bl:parseInt(c.bl)||0,bh:parseInt(c.bh)||0,cp:null,lc:null,ps:c.ps||'',pg:c.pg||'',ln:'',st:'prog'
    }));
    if(sb){for(const {id,...rest} of toAdd)await sb.from('ipo_companies').insert(rest);}
    await persist([...data,...toAdd]);
    setModal(null);
  };

  const del=async id=>{
    if(sb)await sb.from('ipo_companies').delete().eq('id',id);
    await persist(data.filter(d=>d.id!==id));
    setDelId(null);
  };

  const done=data.filter(d=>d.st==='done');
  const plus=done.filter(d=>d.lc&&d.cp&&d.lc>d.cp);
  const hasSb=!!(settings.sbUrl&&settings.sbKey);

  const TH=({ch,right})=><th style={{background:'#1a2030',color:'#7b8399',fontSize:10.5,fontWeight:600,letterSpacing:.5,textTransform:'uppercase',padding:'10px 12px',borderBottom:'1px solid rgba(255,255,255,.08)',borderRight:'1px solid rgba(255,255,255,.05)',textAlign:right?'right':'left',whiteSpace:'nowrap',position:'sticky',top:0,zIndex:5}}>{ch}</th>;
  const TD=({ch,sty})=><td style={{padding:'10px 12px',borderBottom:'1px solid rgba(255,255,255,.05)',borderRight:'1px solid rgba(255,255,255,.04)',verticalAlign:'middle',...sty}}>{ch}</td>;

  return(
    <div style={{display:'flex',flexDirection:'column',height:'100vh',overflow:'hidden'}}>
      {/* 헤더 */}
      <div style={{background:'linear-gradient(135deg,#0e1117,#161b25)',borderBottom:'1px solid rgba(255,255,255,.07)',flexShrink:0}}>
        <div style={{padding:'16px 24px 0',display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
          <div>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:10,letterSpacing:3,color:'#d4a94e',marginBottom:5}}>2026 IPO KOREA · DART</div>
            <div style={{fontSize:22,fontWeight:700,color:'#e8eaf0'}}>인수인의견 밸류에이션 <span style={{color:'#f0c76a'}}>데이터베이스</span></div>
          </div>
          <div style={{display:'flex',gap:8,marginTop:4}}>
            {hasSb&&<button onClick={loadData} disabled={syncing} title="Supabase에서 최신 데이터 가져오기" style={{background:syncing?'rgba(59,130,246,.1)':'rgba(59,130,246,.15)',border:'1px solid rgba(59,130,246,.3)',color:'#60a5fa',padding:'6px 14px',borderRadius:7,fontSize:12.5,display:'flex',alignItems:'center',gap:6}}>
              <span style={{display:'inline-block',animation:syncing?'spin 1s linear infinite':undefined}}>↻</span>
              {syncing?'동기화 중...':lastSync?`${lastSync.toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit'})} 동기화됨`:'동기화'}
            </button>}
            <button onClick={()=>setModal('settings')} style={{background:hasSb?'rgba(16,185,129,.1)':'rgba(239,68,68,.1)',border:hasSb?'1px solid rgba(16,185,129,.3)':'1px solid rgba(239,68,68,.3)',color:hasSb?'#10b981':'#ef4444',padding:'6px 14px',borderRadius:7,fontSize:12.5}}>
              ⚙ {hasSb?'Supabase 연결됨':'설정 (미연결)'}
            </button>
          </div>
        </div>
        {/* KPI */}
        <div style={{display:'flex',padding:'10px 16px 0',flexWrap:'wrap'}}>
          {[{n:data.length,l:'분석 기업 수'},{n:done.length,l:'상장 완료'},{n:data.length-done.length,l:'진행중'},{n:`${plus.length}/${done.length}`,l:'상장일 플러스'},{n:done.filter(d=>d.tb).length,l:'따따블'}].map((k,i)=>(
            <div key={i} style={{padding:'10px 24px',borderLeft:'2px solid rgba(255,255,255,.06)'}}>
              <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:20,fontWeight:600,color:'#e8eaf0',lineHeight:1,marginBottom:3}}>{k.n}</div>
              <div style={{fontSize:11,color:'#7b8399'}}>{k.l}</div>
            </div>
          ))}
          {hasSb&&<div style={{padding:'10px 24px',borderLeft:'2px solid rgba(16,185,129,.2)',marginLeft:8}}>
            <div style={{fontSize:11,color:'#10b981',fontFamily:'JetBrains Mono,monospace',marginBottom:2}}>⚡ 자동 업데이트</div>
            <div style={{fontSize:11,color:'#7b8399'}}>매월 1일 · 15일 DART 자동 수집</div>
          </div>}
        </div>
        {/* 필터 */}
        <div style={{padding:'9px 24px 11px',borderTop:'1px solid rgba(255,255,255,.05)',background:'rgba(0,0,0,.1)',marginTop:8}}>
          <div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:6}}><span style={{fontFamily:'JetBrains Mono,monospace',fontSize:10,color:'#6b7280',width:44,paddingTop:5,textTransform:'uppercase',letterSpacing:1,flexShrink:0}}>섹터</span><Chip on={flt.s==='all'} click={()=>setFlt(p=>({...p,s:'all'}))} ch="전체"/>{Object.entries(SM).map(([v,m])=><Chip key={v} on={flt.s===v} click={()=>setFlt(p=>({...p,s:v}))} dot={m.c} ch={m.l}/>)}</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:6,alignItems:'center'}}><span style={{fontFamily:'JetBrains Mono,monospace',fontSize:10,color:'#6b7280',width:44,paddingTop:5,textTransform:'uppercase',letterSpacing:1,flexShrink:0}}>방법론</span><Chip on={flt.m==='all'} click={()=>setFlt(p=>({...p,m:'all'}))} ch="전체"/>{Object.entries(MM).map(([v,m])=><Chip key={v} on={flt.m===v} click={()=>setFlt(p=>({...p,m:v}))} ch={m.l}/>)}<span style={{width:1,height:16,background:'rgba(255,255,255,.1)',margin:'0 5px',flexShrink:0}}/><Chip on={flt.st==='all'} click={()=>setFlt(p=>({...p,st:'all'}))} ch="전체"/><Chip on={flt.st==='done'} click={()=>setFlt(p=>({...p,st:'done'}))} ch="완료"/><Chip on={flt.st==='prog'} click={()=>setFlt(p=>({...p,st:'prog'}))} ch="진행중"/></div>
          <div style={{display:'flex',flexWrap:'wrap',gap:5,alignItems:'center'}}><span style={{fontFamily:'JetBrains Mono,monospace',fontSize:10,color:'#6b7280',width:44,paddingTop:5,textTransform:'uppercase',letterSpacing:1,flexShrink:0}}>주관사</span><Chip on={flt.uk==='all'} click={()=>setFlt(p=>({...p,uk:'all'}))} ch="전체"/>{UW.map(v=><Chip key={v} on={flt.uk===v} click={()=>setFlt(p=>({...p,uk:v}))} ch={v}/>)}<span style={{flex:1}}/><span style={{fontFamily:'JetBrains Mono,monospace',fontSize:11,color:'#6b7280',marginRight:10}}>{rows.length}개</span><button onClick={()=>setModal('batch')} style={{display:'flex',alignItems:'center',gap:6,background:'linear-gradient(135deg,#d4a94e,#f0c76a)',border:'none',color:'#0e1117',padding:'7px 16px',borderRadius:6,fontSize:13,fontWeight:700}}>✨ 데이터 추가</button><button onClick={()=>{setForm({...EMPTY,id:nextId()});setModal('add');}} style={{background:'transparent',border:'1px solid rgba(255,255,255,.15)',color:'#e8eaf0',padding:'6px 12px',borderRadius:6,fontSize:12.5}}>+ 수동</button></div>
        </div>
      </div>

      {delId&&<div style={{background:'rgba(239,68,68,.07)',borderBottom:'1px solid rgba(239,68,68,.15)',padding:'9px 24px',display:'flex',alignItems:'center',gap:12,flexShrink:0}}><span style={{flex:1,fontSize:13}}><b style={{color:'#f0c76a'}}>{data.find(d=>d.id===delId)?.name}</b>을 삭제하시겠습니까?</span><button onClick={()=>setDelId(null)} style={{background:'transparent',border:'1px solid rgba(255,255,255,.15)',color:'#9ba3b8',padding:'5px 14px',borderRadius:5,fontSize:12}}>취소</button><button onClick={()=>del(delId)} style={{background:'#ef4444',border:'none',color:'#fff',padding:'5px 14px',borderRadius:5,fontSize:12,fontWeight:700}}>삭제</button></div>}

      <div style={{flex:1,overflowX:'auto',overflowY:'auto'}}>
        {data.length===0&&!syncing?<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100%',gap:16,color:'#7b8399'}}>
          <div style={{fontSize:40}}>📊</div>
          <div style={{fontSize:15,fontWeight:600,color:'#9ba3b8'}}>데이터가 없습니다</div>
          <div style={{fontSize:13,textAlign:'center',lineHeight:1.7}}>{hasSb?'Supabase에 데이터가 없거나 연결을 확인해주세요.':'⚙ 설정에서 Supabase를 연결하거나\n✨ 데이터 추가 버튼을 눌러 직접 입력하세요.'}</div>
        </div>:
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:12.5,minWidth:1350}}>
          <thead><tr><TH ch="기업 / 주관사"/><TH ch="상태"/><TH ch="방법론"/><TH ch="재무기준"/><TH ch="추정연도"/><TH ch="배수" right/><TH ch="비교기업"/><TH ch="주당평가가액" right/><TH ch="할인율 → 희망밴드"/><TH ch="확정공모가 · 상장일 종가"/><TH ch=""/></tr></thead>
          <tbody>
            {rows.length===0&&<tr><td colSpan={11} style={{textAlign:'center',padding:40,color:'#6b7280',fontSize:13}}>해당 조건의 기업이 없습니다</td></tr>}
            {rows.map(d=>{
              const sm=SM[d.s]||{},mm=MM[d.m]||{},mc=d.m==='PBR'?'#9ba3b8':d.x>35?'#ef4444':d.x>22?'#f59e0b':'#10b981';
              return<tr key={d.id} onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,.02)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{transition:'background .1s'}}>
                <TD ch={<div><div style={{display:'flex',alignItems:'center',gap:7,fontWeight:600,fontSize:13,color:'#e8eaf0'}}><span style={{width:7,height:7,borderRadius:'50%',background:sm.c,flexShrink:0}}/>{d.name}{d.amended&&<span style={{fontSize:10,color:'#a78bfa',marginLeft:4}}>[정정]</span>}</div><div style={{fontSize:11,color:'#6b7280',marginTop:2}}>{d.uw}{d.ld&&` · ${d.ld}`}</div></div>}/>
                <TD ch={<Tag bg={d.st==='done'?'rgba(16,185,129,.12)':'rgba(245,158,11,.1)'} c={d.st==='done'?'#10b981':'#f59e0b'} ch={d.st==='done'?'완료':'진행중'}/>}/>
                <TD ch={<Tag bg={mm.bg||''} c={mm.c||''} ch={mm.l||d.m}/>}/>
                <TD ch={<span style={{color:d.b==='실적치'?'#10b981':'#f59e0b',fontSize:12}}>{d.b}</span>}/>
                <TD ch={<span style={{fontFamily:'JetBrains Mono,monospace',fontSize:12,color:'#9ba3b8'}}>{d.y}</span>}/>
                <TD ch={<span style={{fontFamily:'JetBrains Mono,monospace',fontSize:12,fontWeight:600,color:mc}}>{d.x}배</span>} sty={{textAlign:'right'}}/>
                <TD ch={<div style={{maxWidth:190}}>{(d.ps||'').split(',').filter(Boolean).map(p=><span key={p} style={{display:'inline-block',background:'rgba(255,255,255,.06)',padding:'1px 5px',margin:1,fontSize:10.5,color:'#9ba3b8',borderRadius:3}}>{p.trim()}</span>)}{(d.pg||'').split(',').filter(Boolean).map(p=><span key={p} style={{display:'inline-block',background:'rgba(16,185,129,.08)',padding:'1px 5px',margin:1,fontSize:10.5,color:'#10b981',borderRadius:3}}>{p.trim()}</span>)}</div>}/>
                <TD ch={<span style={{fontFamily:'JetBrains Mono,monospace',fontSize:12,fontWeight:600,color:'#e8eaf0',whiteSpace:'nowrap'}}>{Nf(d.ev)}</span>} sty={{textAlign:'right'}}/>
                <TD ch={<DiscBar dl={d.dl} dh={d.dh} bl={d.bl} bh={d.bh}/>}/>
                <TD ch={<ResCell d={d}/>}/>
                <TD sty={{borderRight:'none'}} ch={<div style={{display:'flex',gap:6}}><button onClick={()=>openEdit(d)} style={{background:'rgba(74,158,255,.1)',border:'1px solid rgba(74,158,255,.2)',color:'#60a5fa',padding:'4px 8px',borderRadius:5,fontSize:12}}>✏</button><button onClick={()=>setDelId(d.id)} style={{background:'rgba(239,68,68,.08)',border:'1px solid rgba(239,68,68,.2)',color:'#ef4444',padding:'4px 8px',borderRadius:5,fontSize:12}}>🗑</button></div>}/>
              </tr>;
            })}
          </tbody>
        </table>}
      </div>

      <div style={{padding:'8px 24px',borderTop:'1px solid rgba(255,255,255,.06)',display:'flex',justifyContent:'space-between',fontSize:11,color:'#6b7280',flexShrink:0}}>
        <span>DART 전자공시 인수인의견 · 자동 업데이트: 매월 1일·15일</span>
        <span style={{fontFamily:'JetBrains Mono,monospace',color:'#d4a94e'}}>경호 · PB Research · 2026</span>
      </div>

      {modal==='settings'&&<SettingsModal settings={settings} onSave={saveSettings} onClose={()=>setModal(null)}/>}
      {modal==='batch'&&<BatchModal apiKey={settings.akKey} existingNames={existingNames} onDone={addBatch} onClose={()=>setModal(null)}/>}
      {(modal==='edit'||modal==='add')&&<EditDrawer form={form} sf={sf} onSave={save} onClose={()=>setModal(null)} isNew={modal==='add'}/>}
    </div>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
</script>
</body></html>
