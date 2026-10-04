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
    { key: 'design', name: 'AI 기초 다지기', color: 'var(--c-design)', range: '10/17 – 11/7', desc: 'AI 기초 4강 + 내 일 하나 고르고 숫자로 시작값 재기', deliv: '시작값 · 한 문장 가설 · 첫 레시피' },
    { key: 'build',  name: '바이브코딩 · 활용 꿀팁', color: 'var(--c-build)', range: '11/14 – 12/5', desc: '말로 만드는 코딩과 활용 꿀팁을 내 일에 써 보기', deliv: '작은 결과물 1개 · 레시피 카드 3장' },
    { key: 'prove',  name: '정리하고 보여주기', color: 'var(--c-prove)', range: '12/12 – 12/19', desc: '전후 숫자 비교, 한 장 리포트, 데모데이', deliv: '한 장 리포트 · 5분 발표' }
  ],

  // 진행: 호세 매니저. 클로드 아카데미에 공개된 학습 자료의 핵심을 정리해 공유(가르치는 강의가 아님).
  // 모집 글에는 큰 구분만 노출. 회차별 세부 내용·출처 링크는 회차별 '강의안 페이지'에서 공유 → 페이지가 생기면 doc 에 주소 입력(멤버 라운지에 링크로 표시).
  // lecture = 15분 미니 특강의 큰 주제, share = 60분 나눔에서 특히 나눌 것
  sessions: [
    { n: 1,  date: '2026-10-17', phase: 'design', title: 'AI 기초 ①', out: '내 일 후보 · 숫자 후보', doc: '',
      lecture: 'AI 기초 핵심 정리', share: '자기소개 + 지금까지 AI를 어디에 써 봤는지 (돌아가며)' },
    { n: 2,  date: '2026-10-24', phase: 'design', title: 'AI 기초 ②', out: '프로젝트 한 문장', doc: '',
      lecture: 'AI 기초 핵심 정리', share: '내 일에서 AI에 맡겨 볼 후보 → 한 문장으로 정리하고 숫자 후보 정하기' },
    { n: 3,  date: '2026-10-31', phase: 'design', title: 'AI 기초 ③', out: '시작값 · 목표값 등록', doc: '',
      lecture: 'AI 기초 핵심 정리', share: '시작값 공유 + 이번 주 첫 시도 한 가지' },
    { n: 4,  date: '2026-11-07', phase: 'design', title: 'AI 기초 ④', out: '첫 레시피 카드', doc: '',
      lecture: 'AI 기초 핵심 정리', share: '지난주 시도와 숫자, 잘 된 요청 하나' },
    { n: 5,  date: '2026-11-14', phase: 'build', title: '바이브코딩 ①', out: '첫 결과물', doc: '',
      lecture: '바이브코딩 핵심 정리', share: '지난주 시도와 숫자, 막힌 것' },
    { n: 6,  date: '2026-11-21', phase: 'build', title: '바이브코딩 ② · 중간 점검', out: '6주 숫자 그래프', doc: '',
      lecture: '바이브코딩 핵심 정리', share: '6주 그래프 함께 보기 — 효과 있던 것 / 없던 것' },
    { n: 7,  date: '2026-11-28', phase: 'build', title: '바이브코딩 ③', out: '작은 결과물 다듬기', doc: '',
      lecture: '바이브코딩 핵심 정리', share: '지난주 시도와 숫자, 만들어 보고 싶은 것' },
    { n: 8,  date: '2026-12-05', phase: 'build', title: 'AI 활용 꿀팁 ①', out: '레시피 카드 3장', doc: '',
      lecture: 'AI 활용 꿀팁 정리', share: '시작값 대비 변화, 숫자 뒤에 있던 이야기' },
    { n: 9,  date: '2026-12-12', phase: 'prove', title: 'AI 활용 꿀팁 ② · 발표 리허설', out: '한 장 리포트 초안', doc: '',
      lecture: 'AI 활용 꿀팁 정리', share: '5분 발표 리허설과 서로의 피드백' },
    { n: 10, date: '2026-12-19', phase: 'prove', title: '비북스 데모데이', out: '3개월 숫자 발표 · 수료', end: '16:00', doc: '',
      lecture: '꿀팁 총정리 후 멤버별 5분 발표', share: '초대한 지인과 함께, 3개월의 숫자 발표' }
  ],

  // 기본 90분 (14:00–15:30). 마지막 회(데모데이)만 16:00까지
  weekly: [
    { min: 15, name: '미니 특강', desc: '호세가 공개된 학습 자료의 핵심만 정리해 공유해요. 그 주에 바로 써 볼 수 있는 것만' },
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
