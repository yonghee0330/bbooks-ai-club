/* 부천 AI 프로젝트 클럽 — 모든 페이지가 읽는 단일 설정 파일.
   일정·문구·API 주소를 바꿀 땐 이 파일만 고치면 된다. */
window.CLUB = {
  name: '부천 AI 프로젝트 클럽',
  cohort: '1기',
  short: 'BAPC',
  slogan: '3개월, 내 일에 AI를 붙여 숫자로 증명하기',
  place: '비북스 세미나실 · 부천 원미동',
  time: '매주 토요일 14:00–15:30',
  period: '2026.10.17 – 12.19 · 총 10회',
  seats: 8,
  // 마감·발표 (KST)
  open: '2026-10-06T00:00:00+09:00',      // 신청 시작 (이전에는 신청서가 닫혀 있음)
  deadline: '2026-10-16T12:00:00+09:00',
  announce: '2026-10-16T20:00:00+09:00',
  firstSession: '2026-10-17T14:00:00+09:00',
  // 참가비·보증금 — 확정되면 문구만 교체
  fee: '10회 50,000원 (일괄 결제)',
  // 송금 안내 — account 를 채우면 신청 완료 화면에 계좌가 표시된다. 비어 있으면 '입력하신 연락처로 안내' 문구가 나온다.
  pay: { amount: '50,000원', bank: '', account: '', holder: '' },
  feeDetail: '10회 50,000원을 일괄로 받아요(회당 5,000원 꼴). 끝까지 함께하는 책임감을 위해 한 번에 받고, 중간에 빠져도 환불되지 않아요. 비북스 공간 대관과 모임 다과·음료 비용에 보태요. 신청서를 작성한 뒤 송금하면 신청이 완료돼요.',
  contact: { instagram: 'https://www.instagram.com/bbooks_bucheon/', moim: 'https://moim.bbooks.co.kr/' },

  // Google Apps Script 웹앱 주소. 비워 두면 데모 모드(이 브라우저에만 저장).
  apiUrl: 'https://script.google.com/macros/s/AKfycbw03_YIR665MlJU7hEhZfD81fu2azYYx9KMF_7UjmUw6pX_J4ZtYRN6_b8QpjENI7Q_gw/exec',

  // 3구간: 킥오프(1회) → 각자 목표대로 실행(2~9회) → 마무리(10회). 정해진 커리큘럼 없이 각자의 시도가 중심.
  phases: [
    { key: 'design', name: '킥오프', color: 'var(--c-design)', range: '10/17', desc: '지금 쓰는 AI 공유 · 시작점 체크', deliv: '시작점 · 나의 목표' },
    { key: 'build',  name: '각자 목표대로 실행', color: 'var(--c-build)', range: '10/24 – 12/12', desc: '각자 목표대로 만들고, 현황을 나눠요', deliv: '주간 시도 기록' },
    { key: 'prove',  name: '마무리', color: 'var(--c-prove)', range: '12/19', desc: '처음과 비교해 나누고 아카이빙', deliv: '전후 비교 · 아카이브' }
  ],

  // 진행: Hose(비북스 매니저). 가르치는 사람이 아니라 각자의 시도를 응원하고 돕는 사람.
  // focus = 그 주의 한 줄 안내. doc = 회차별 자료 페이지 주소(있을 때만, 멤버 라운지에 링크로 표시)
  sessions: [
    { n: 1,  date: '2026-10-17', phase: 'design', title: '킥오프', out: '현재 AI 활용 공유 · 시작점 체크', doc: '',
      focus: '각자 지금 사용하고 적용 중인 AI를 공유하고, 시작점을 체크해요.' },
    { n: 2,  date: '2026-10-24', phase: 'build', title: '실행 ①', out: '목표 정하기 · 첫 시도', doc: '',
      focus: '각자 세운 목표를 따라 첫 시도를 시작해요.' },
    { n: 3,  date: '2026-10-31', phase: 'build', title: '실행 ②', out: '진행 현황 · 아이디어 교환', doc: '',
      focus: '진행 현황을 나누고, 서로 아이디어와 의견을 주고받아요.' },
    { n: 4,  date: '2026-11-07', phase: 'build', title: '실행 ③', out: '진행 현황 · 아이디어 교환', doc: '',
      focus: '진행 현황을 나누고, 서로 아이디어와 의견을 주고받아요.' },
    { n: 5,  date: '2026-11-14', phase: 'build', title: '실행 ④', out: '진행 현황 · 아이디어 교환', doc: '',
      focus: '진행 현황을 나누고, 서로 아이디어와 의견을 주고받아요.' },
    { n: 6,  date: '2026-11-21', phase: 'build', title: '실행 ⑤ · 중간 점검', out: '중간 점검 · 방향 조정', doc: '',
      focus: '지금까지의 변화를 함께 보고, 필요하면 방향을 조정해요.' },
    { n: 7,  date: '2026-11-28', phase: 'build', title: '실행 ⑥', out: '진행 현황 · 아이디어 교환', doc: '',
      focus: '진행 현황을 나누고, 서로 아이디어와 의견을 주고받아요.' },
    { n: 8,  date: '2026-12-05', phase: 'build', title: '실행 ⑦', out: '진행 현황 · 아이디어 교환', doc: '',
      focus: '진행 현황을 나누고, 서로 아이디어와 의견을 주고받아요.' },
    { n: 9,  date: '2026-12-12', phase: 'build', title: '실행 ⑧', out: '마무리 준비', doc: '',
      focus: '마지막 모임에서 나눌 처음 대비 변화를 정리해 봐요.' },
    { n: 10, date: '2026-12-19', phase: 'prove', title: '마무리', out: '성과·수치 나눔 · 아카이빙', doc: '',
      focus: '처음과 비교해 이룬 성과와 수치를 나누고, 결과를 아카이빙하고, 다음을 기약해요.' }
  ],

  // 기본 90분 (14:00–15:30)
  weekly: [
    { min: 25, name: '새로운 정보 공유', desc: '새로 발견한 걸 나누고, Hose가 짧은 미니특강을 해요' },
    { min: 50, name: '프로젝트 진행현황 공유', desc: '프로젝트 진행 현황을 나누고 아이디어를 주고받아요' },
    { min: 15, name: 'Q&A', desc: '서로 묻고 답해요' }
  ],
  shareMinPerPerson: 6,

  types: {
    save:  { name: '절감형',     dir: 'down', desc: '본업의 시간·비용을 줄인다',     ex: '주당 절감 시간, 건당 작업 시간' },
    grow:  { name: '매출 증대형', dir: 'up',   desc: '기존 일의 홍보·판매를 키운다',   ex: '유입수, 문의 수, 주문 건수' },
    new:   { name: '신사업형',   dir: 'up',   desc: 'AI로 새 상품·서비스를 만든다',  ex: '출시 여부, 첫 판매, 판매 건수' }
  },

  tools: ['ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'Copilot', 'Notion AI', 'Midjourney', '나노바나나·이미지 생성', 'Canva AI', '영상 생성(Sora·Veo·Kling 등)', 'Suno·음악', 'Make·Zapier·n8n', 'Cursor·Claude Code', 'NotebookLM'],
  roles: ['직장인', '자영업', '프리랜서', '창업 준비']
};
