/* 부천 AI 프로젝트 클럽 — 모든 페이지가 읽는 단일 설정 파일.
   일정·문구·API 주소를 바꿀 땐 이 파일만 고치면 된다. */
window.CLUB = {
  name: '부천 AI 프로젝트 클럽',
  cohort: '1기',
  short: 'BAPC',
  slogan: '3개월, 내 일에 AI를 붙여 숫자로 증명하기',
  place: '비북스 세미나실 · 부천 원미동',
  time: '매주 토요일 14:00–16:00',
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

  phases: [
    { key: 'design', name: '설계', color: 'var(--c-design)', range: '10/17 – 10/31', desc: '툴 지도 · 한 문장 가설 · 시작값 기록' },
    { key: 'build',  name: '구현', color: 'var(--c-build)',  range: '11/7 – 11/28',  desc: '매주 숫자 공유 · 막힌 문제 클리닉' },
    { key: 'prove',  name: '검증', color: 'var(--c-prove)',  range: '12/5 – 12/19',  desc: '실제 고객·업무 적용 · 데모데이' }
  ],

  sessions: [
    { n: 1,  date: '2026-10-17', phase: 'design', title: '오리엔테이션 · 툴 지도', out: '8명의 도구 지도 1장, 역할 순번표',
      agenda: ['자기소개 — 내 일과 지금 쓰는 도구', '툴 지도 그리기: 누가 어떤 도구를 어디까지 쓰나', '운영 규칙·역할 순번 정하기'] },
    { n: 2,  date: '2026-10-24', phase: 'design', title: '프로젝트 한 문장 · 가설', out: '“누구에게 무엇을 팔거나 아낄지” 한 문장',
      agenda: ['한 문장 가설 쓰기 워크숍', '서로의 문장에 질문 3개씩', '핵심 숫자 후보 고르기'] },
    { n: 3,  date: '2026-10-31', phase: 'design', title: '베이스라인 기록 · 짝꿍 매칭', out: '핵심 숫자·시작값·목표값 보드 등록, 짝꿍 4쌍',
      agenda: ['숫자 보드에 시작값·목표값 입력', '관심사 비슷한 짝꿍 매칭', '첫 2주 실행 계획'] },
    { n: 4,  date: '2026-11-07', phase: 'build', title: '첫 결과물 쇼앤텔', out: '각자의 1차 결과물',
      agenda: ['숫자 체크인', '쇼앤텔 2명: 실제 작업 화면 시연', '짝꿍 실습'] },
    { n: 5,  date: '2026-11-14', phase: 'build', title: '막힌 문제 클리닉 ①', out: '문제 1개 × 도구별 해법 비교표',
      agenda: ['숫자 체크인', '막힌 문제 하나를 각자 도구로 풀기', '결과 비교·레시피 기록'] },
    { n: 6,  date: '2026-11-21', phase: 'build', title: '중간 점검 · 숫자 리포트 v0', out: '6주 그래프, 방향 수정 여부',
      agenda: ['6주 그래프 함께 보기', '효과 있던 것 / 없던 것', '목표값 조정'] },
    { n: 7,  date: '2026-11-28', phase: 'build', title: '클리닉 ② · 성탄 시즌 준비', out: '12월 실행 체크리스트',
      agenda: ['숫자 체크인', '클리닉: 12월 실전 준비', '실행 체크리스트 작성'] },
    { n: 8,  date: '2026-12-05', phase: 'prove', title: '실제 적용 ①', out: '실사용 결과·고객 반응 기록',
      agenda: ['숫자 체크인', '실제 고객·업무 적용 결과 공유', '보완점 짝꿍 실습'] },
    { n: 9,  date: '2026-12-12', phase: 'prove', title: '실제 적용 ② · 데모데이 리허설', out: '발표 슬라이드 초안',
      agenda: ['숫자 체크인', '5분 발표 리허설', '서로 피드백'] },
    { n: 10, date: '2026-12-19', phase: 'prove', title: '비북스 데모데이', out: '3개월 숫자 발표 · 1기 수료',
      agenda: ['외부 손님 초대', '멤버별 3개월 숫자 발표', '레시피 베스트·2기 안내'] }
  ],

  weekly: [
    { min: 30, name: '숫자 체크인', desc: '멤버당 3분, 지난주 대비 숫자 변화와 한 일. 실패담 환영' },
    { min: 50, name: '쇼앤텔 · 클리닉', desc: '실제 작업 화면 시연, 또는 막힌 문제 하나를 각자 도구로 풀고 비교' },
    { min: 30, name: '짝꿍 실습', desc: '짝꿍끼리 서로의 프로젝트 진행' },
    { min: 10, name: '약속과 기록', desc: '다음 주 목표 한 줄, 오늘 건진 레시피 기록' }
  ],

  types: {
    save:  { name: '절감형',     dir: 'down', desc: '본업의 시간·비용을 줄인다',     ex: '주당 절감 시간, 건당 작업 시간' },
    grow:  { name: '매출 증대형', dir: 'up',   desc: '기존 일의 홍보·판매를 키운다',   ex: '유입수, 문의 수, 주문 건수' },
    new:   { name: '신사업형',   dir: 'up',   desc: 'AI로 새 상품·서비스를 만든다',  ex: '출시 여부, 첫 판매, 판매 건수' }
  },

  tools: ['ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'Copilot', 'Notion AI', 'Midjourney', '나노바나나·이미지 생성', 'Canva AI', '영상 생성(Sora·Veo·Kling 등)', 'Suno·음악', 'Make·Zapier·n8n', 'Cursor·Claude Code', 'NotebookLM'],
  roles: ['직장인', '자영업', '프리랜서', '창업 준비']
};
