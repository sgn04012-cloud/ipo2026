-- Supabase에서 SQL Editor 탭에 붙여넣고 실행하세요

-- IPO 기업 테이블
create table if not exists ipo_companies (
  id              bigint generated always as identity primary key,
  dart_rcept_no   text unique,          -- DART 접수번호 (중복 방지)
  name            text,                 -- 기업명
  uw              text,                 -- 주관사 (표시용)
  uk              text,                 -- 주관사 (필터용)
  s               text,                 -- 섹터 (bio/tech/robot/energy/fin/contents)
  st              text default 'prog',  -- 상태 (prog/done)
  ld              text default '',      -- 상장일
  m               text,                 -- 방법론 (PER/PSR/EV/PBR)
  b               text,                 -- 재무기준 (실적치/추정치)
  y               text,                 -- 추정연도
  x               numeric,              -- 비교배수
  ps              text default '',      -- 국내 비교기업
  pg              text default '',      -- 글로벌 비교기업
  ev              bigint,               -- 주당 평가가액
  dl              numeric,              -- 할인율 하단
  dh              numeric,              -- 할인율 상단
  bl              bigint,               -- 공모가 밴드 하단
  bh              bigint,               -- 공모가 밴드 상단
  cp              bigint,               -- 확정 공모가
  bp              text,                 -- 밴드 위치 (top/bot)
  lc              bigint,               -- 상장일 종가
  la              boolean default false,-- 종가 근사치 여부
  ln              text default '',      -- 상장일 비고
  tb              boolean default false,-- 따따블 여부
  amended         boolean default false,-- 기재정정 여부
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- 업데이트 실행 로그
create table if not exists update_logs (
  id         bigint generated always as identity primary key,
  run_at     timestamptz default now(),
  bgn_de     text,
  end_de     text,
  added      int default 0,
  updated    int default 0,
  skipped    int default 0,
  errors     int default 0,
  detail     jsonb
);

-- Row Level Security: 읽기는 누구나, 쓰기는 service_role만
alter table ipo_companies enable row level security;
alter table update_logs    enable row level security;

create policy "public read"  on ipo_companies for select using (true);
create policy "service write" on ipo_companies for all using (auth.role() = 'service_role');

create policy "public read log"   on update_logs for select using (true);
create policy "service write log" on update_logs for all using (auth.role() = 'service_role');
