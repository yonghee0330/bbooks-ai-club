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
  deadline: '2026-10-16T12:00:00+09:00',
  announce: '2026-10-16T20:00:00+09:00',
  firstSession: '2026-10-17T14:00:00+09:00',
  // 참가비·보증금 — 확정되면 문구만 교체
  fee: '출석 보증금 5만 원 · 8회 이상 출석 시 12/19 전액 환급',
  feeDetail: '참가비는 없어요. 선발 안내(10/16 20:00) 때 입금 계좌를 알려드리고, 첫 모임 전까지 보증금 5만 원을 받습니다. 10회 중 8회 이상 출석하면 12/19 데모데이에 전액 돌려드려요. 미달 시 보증금은 1기 레시피북 제작비로 쓰입니다.',
  contact: { instagram: 'https://www.instagram.com/bbooks_bucheon/', moim: 'https://moim.bbooks.co.kr/' },

  // Google Apps Script 웹앱 주소. 비워 두면 데모 모드(이 브라우저에만 저장).
  apiUrl: 'https://script.google.com/macros/s/AKfycbw03_YIR665MlJU7hEhZfD81fu2azYYx9KMF_7UjmUw6pX_J4ZtYRN6_b8QpjENI7Q_gw/exec',

  // 3단계 공통 코스 — 같은 이론·같은 틀, 결과는 각자의 일에서
  phases: [
    { key: 'design', name: '들여다보기', color: 'var(--c-design)', range: '10/17 – 10/31', desc: '내 일 하나 고르고, 숫자로 시작값 재기', deliv: '시작값 · 한 문장 가설' },
    { key: 'build',  name: '써보고 고치기', color: 'var(--c-build)', range: '11/7 – 11/28', desc: '매주 시도 → 숫자 → 개선, 나만의 레시피 쌓기', deliv: '레시피 카드 3장 · 주간 숫자' },
    { key: 'prove',  name: '정리하고 보여주기', color: 'var(--c-prove)', range: '12/5 – 12/19', desc: '전후 숫자 비교, 한 장 리포트, 데모데이', deliv: '한 장 리포트 · 5분 발표' }
  ],

  // lecture = 15분 미니 특강(그 주에 바로 써볼 이론 하나), share = 60분 나눔에서 특히 나눌 것
  sessions: [
    { n: 1,  date: '2026-10-17', phase: 'design', title: '숫자로 말하기', out: '내 일 후보 2~3개, 숫자 후보',
      lecture: 'AI 활용의 성과를 재는 법 — 시작값·목표값, 좋은 숫자와 나쁜 숫자',
      share: '자기소개 + 지금까지 AI로 해 본 것 (돌아가며)' },
    { n: 2,  date: '2026-10-24', phase: 'design', title: '내 일 쪼개기', out: '프로젝트 한 문장, 핵심 숫자 1개',
      lecture: '일을 작업 단위로 나누고 AI에 맡길 곳 찾기',
      share: '내 일에서 가장 시간을 먹는 일, AI에 맡겨 볼 후보' },
    { n: 3,  date: '2026-10-31', phase: 'design', title: '좋은 요청의 구조', out: '시작값·목표값 보드 등록, 첫 시도 계획',
      lecture: '맥락·역할·예시·형식으로 요청하기 (프롬프트 기본기)',
      share: '시작값 공유 + 이번 주 첫 시도 한 가지' },
    { n: 4,  date: '2026-11-07', phase: 'build', title: '믿어도 될까: 검증하기', out: '내 결과물 점검표',
      lecture: '환각과 사실 확인 습관 — 같은 질문을 여러 도구에 던져 비교하기',
      share: '지난주 시도와 숫자, 틀렸던 답 · 의심스러웠던 답' },
    { n: 5,  date: '2026-11-14', phase: 'build', title: '프롬프트를 레시피로', out: '레시피 카드 1~2장',
      lecture: '잘 된 요청을 템플릿으로 저장하고 다시 쓰기',
      share: '지난주 시도와 숫자, 잘 된 요청 하나' },
    { n: 6,  date: '2026-11-21', phase: 'build', title: '막힐 때 푸는 법 · 중간 점검', out: '6주 숫자 그래프, 방향 조정',
      lecture: '막힐 때 쓰는 질문 바꾸기 · 쪼개기 · 예시 넣기',
      share: '6주 그래프 함께 보기 — 효과 있던 것 / 없던 것' },
    { n: 7,  date: '2026-11-28', phase: 'build', title: '반복 업무 자동화 맛보기', out: '자동화 후보 1개 (선택)',
      lecture: '복붙에서 연결로 — 폼·시트·자동화 도구의 개념',
      share: '지난주 시도와 숫자, 매번 반복하는 작업' },
    { n: 8,  date: '2026-12-05', phase: 'prove', title: '전후 비교하기', out: '시작값 → 현재값 정리',
      lecture: '숫자 읽는 법 — 효과 없던 것도 결과로 기록하기',
      share: '시작값 대비 변화, 숫자 뒤에 있던 이야기' },
    { n: 9,  date: '2026-12-12', phase: 'prove', title: '한 장 리포트 · 발표 리허설', out: '한 장 리포트 초안',
      lecture: '5분 발표 구성 — 문제 · 시도 · 숫자 · 배운 것 · 다음',
      share: '5분 발표 리허설과 서로의 피드백' },
    { n: 10, date: '2026-12-19', phase: 'prove', title: '비북스 데모데이', out: '3개월 숫자 발표 · 1기 수료', end: '16:00',
      lecture: '특강 대신 발표 — 멤버별 5분 발표 + 질문',
      share: '초대한 지인과 함께, 3개월의 숫자 발표' }
  ],

  // 기본 90분 (14:00–15:30). 마지막 회(데모데이)만 16:00까지
  weekly: [
    { min: 15, name: '미니 특강', desc: '그 주에 바로 써볼 이론 하나를 짧게. 어려운 말 없이, 오늘 해 볼 수 있는 것만' },
    { min: 60, name: '지난주 AI 활용 나누기', desc: '한 명당 7분씩 돌아가며 — 숫자, 해 본 것, 막힌 것, 배운 것. 실패담 환영' },
    { min: 15, name: '질의응답', desc: '서로 묻고 답하기. 정답은 운영자만 아는 게 아니라 멤버들이 같이 찾아요' }
  ],
  shareMinPerPerson: 7,

  types: {
    save:  { name: '절감형',     dir: 'down', desc: '본업의 시간·비용을 줄인다',     ex: '주당 절감 시간, 건당 작업 시간' },
    grow:  { name: '매출 증대형', dir: 'up',   desc: '기존 일의 홍보·판매를 키운다',   ex: '유입수, 문의 수, 주문 건수' },
    new:   { name: '신사업형',   dir: 'up',   desc: 'AI로 새 상품·서비스를 만든다',  ex: '출시 여부, 첫 판매, 판매 건수' }
  },

  tools: ['ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'Copilot', 'Notion AI', 'Midjourney', '나노바나나·이미지 생성', 'Canva AI', '영상 생성(Sora·Veo·Kling 등)', 'Suno·음악', 'Make·Zapier·n8n', 'Cursor·Claude Code', 'NotebookLM'],
  roles: ['직장인', '자영업', '프리랜서', '창업 준비']
};
