/* 공용 데이터 계층 + UI 유틸.
   CLUB.apiUrl 이 있으면 Apps Script 웹앱으로, 없으면 이 브라우저 localStorage(데모 모드)로 동작한다. */
(function () {
  const C = window.CLUB;
  const LS = 'bapc1:';
  const store = {
    get(k, d) { try { const v = localStorage.getItem(LS + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(LS + k, JSON.stringify(v)); } catch (e) {} }
  };

  const uid = (p) => p + '-' + Math.random().toString(36).slice(2, 8).toUpperCase();
  const now = () => new Date().toISOString();

  /* ---------- 데모 백엔드 (Apps Script Code.gs 와 같은 액션 이름·응답 모양) ---------- */
  function demoSeed() {
    if (store.get('seeded')) return;
    const members = [
      { id: 'M-HOSE', name: 'Hose', code: 'demo', role: '운영자', project: '여행기 전자책 출간 프로젝트', type: 'new',
        metric: '누적 판매', unit: '부', dir: 'up', base: 0, target: 10, values: {}, intro: '비북스 운영자. 여행기를 써서 epub로 출간하고 홍보·판매까지 AI와 함께.', sample: true },
      { id: 'M-EX1', name: '예시 멤버 A', code: 'demo-a', role: '직장인', project: '주간 보고서 자동화', type: 'save',
        metric: '보고서 1건 작성 시간', unit: '분', dir: 'down', base: 90, target: 20, values: {}, intro: '데모용 예시 데이터', sample: true },
      { id: 'M-EX2', name: '예시 멤버 B', code: 'demo-b', role: '자영업', project: '카페 인스타 콘텐츠 자동화', type: 'grow',
        metric: '월 예약·문의', unit: '건', dir: 'up', base: 12, target: 25, values: {}, intro: '데모용 예시 데이터', sample: true }
    ];
    store.set('members', members);
    store.set('logs', []);
    store.set('recipes', [
      { id: 'R-EX1', by: 'M-HOSE', week: 2, title: '여행 메모를 장 구성으로 (예시)', problem: '사진과 메모가 흩어져 있어 책의 순서를 못 잡음', tool: 'Claude', flow: '1) 날짜별 여행 메모와 사진 설명을 한 파일로 붙여 넣기\n2) “이 기록을 독자가 따라가기 좋은 12개 장으로 묶어 줘. 장마다 제목 후보 2개, 들어갈 날짜, 빠진 이야기가 있으면 질문으로 알려 줘” 프롬프트\n3) 제안을 그대로 쓰지 않고 내가 순서를 고쳐 목차 확정', result: '목차 정리 이틀 → 한나절', caution: '지명·날짜·고유명사는 반드시 내 기록과 대조', tags: ['신사업형', '글쓰기'], at: now() }
    ]);
    store.set('apps', []);
    store.set('posts', [
      { id: 'P-EX1', by: 'M-EX1', kind: '정보 공유', text: '요즘 회의록 정리에 쓰는 방법: 녹음 → 텍스트 → AI에게 "결정사항 / 할 일 / 담당자"로 나눠 달라고 해요. 시간이 꽤 줄었어요. (예시 글)', link: '', at: new Date(Date.now() - 3600e3).toISOString() },
      { id: 'P-EX2', by: 'M-EX2', kind: '질문', text: '인스타 문구를 AI로 만들면 다 비슷하게 나오는데, 우리 가게 말투로 쓰게 하려면 어떻게 하세요? (예시 글)', link: '', at: new Date(Date.now() - 1800e3).toISOString() }
    ]);
    store.set('comments', [
      { id: 'C-EX1', postId: 'P-EX2', by: 'M-HOSE', text: '예전에 쓴 글 3개를 예시로 붙여 주고 "이 말투로"라고 해 보세요! (예시 댓글)', at: new Date(Date.now() - 900e3).toISOString() }
    ]);
    store.set('seeded', true);
  }

  const demo = {
    status() { const n = store.get('apps', []).filter(a => ['취소', '대기'].indexOf(a.status || '접수') < 0).length; return { ok: true, seats: C.seats, taken: n, closed: n >= C.seats }; },
    apply({ data: d }) {
      const apps = store.get('apps', []);
      if (apps.filter(a => ['취소', '대기'].indexOf(a.status || '접수') < 0).length >= C.seats) return { ok: false, closed: true, error: '정원 ' + C.seats + '명이 모두 찼어요' };
      const id = 'AI1-' + String(apps.length + 1).padStart(3, '0') + '-' + Math.random().toString(36).slice(2, 4).toUpperCase();
      apps.push(Object.assign({ id, at: now(), status: '접수', scores: {} }, d));
      store.set('apps', apps);
      return { ok: true, id };
    },
    login({ name, code }) {
      demoSeed();
      const m = store.get('members', []).find(x => x.code === code && (!name || x.name === name || code.startsWith('demo')));
      return m ? { ok: true, member: strip(m) } : { ok: false, error: '이름 또는 멤버 코드가 맞지 않아요.' };
    },
    board({ code }) {
      demoSeed();
      if (!me(code)) return { ok: false, error: 'auth' };
      return { ok: true, members: store.get('members', []).map(strip), logs: store.get('logs', []), recipes: store.get('recipes', []) };
    },
    setValue({ code, week, value, note }) {
      const ms = store.get('members', []); const m = ms.find(x => x.code === code);
      if (!m) return { ok: false, error: 'auth' };
      if (value === '' || value === null) delete m.values[week]; else m.values[week] = { v: Number(value), note: note || '', at: now() };
      store.set('members', ms); return { ok: true };
    },
    updateProject({ code, fields }) {
      const ms = store.get('members', []); const m = ms.find(x => x.code === code);
      if (!m) return { ok: false, error: 'auth' };
      ['project', 'type', 'metric', 'unit', 'dir', 'base', 'target', 'intro'].forEach(k => { if (k in fields) m[k] = fields[k]; });
      store.set('members', ms); return { ok: true, member: strip(m) };
    },
    addRecipe({ code, recipe }) {
      const m = me(code); if (!m) return { ok: false, error: 'auth' };
      const rs = store.get('recipes', []); const r = Object.assign({ id: uid('R'), by: m.id, at: now() }, recipe);
      rs.unshift(r); store.set('recipes', rs); return { ok: true, recipe: r };
    },
    addLog({ code, log }) {
      const m = me(code); if (!m) return { ok: false, error: 'auth' };
      const ls = store.get('logs', []).filter(x => x.n !== log.n);
      const l = Object.assign({ by: m.id, at: now() }, log); ls.push(l);
      store.set('logs', ls); return { ok: true, log: l };
    },
    feed({ code }) {
      demoSeed(); const m = me(code); if (!m) return { ok: false, error: 'auth' };
      return { ok: true, me: { id: m.id, name: m.name, role: m.role }, members: store.get('members', []).map(x => ({ id: x.id, name: x.name, role: x.role })),
        posts: store.get('posts', []).slice().sort((a, b) => b.at.localeCompare(a.at)), comments: store.get('comments', []) };
    },
    addPost({ code, post }) {
      const m = me(code); if (!m) return { ok: false, error: 'auth' };
      const t = String(post.text || '').trim(); if (!t || t.length > 1500) return { ok: false, error: '내용을 1~1500자로 적어 주세요' };
      const link = String(post.link || '').trim(); if (link && !/^https?:\/\/\S{3,300}$/i.test(link)) return { ok: false, error: '링크는 http(s)로 시작해야 해요' };
      const ps = store.get('posts', []); const x = { id: uid('P'), by: m.id, kind: post.kind || '정보 공유', text: t, link, at: now() };
      ps.push(x); store.set('posts', ps); return { ok: true, post: x };
    },
    addComment({ code, postId, text }) {
      const m = me(code); if (!m) return { ok: false, error: 'auth' };
      const t = String(text || '').trim(); if (!t || t.length > 600) return { ok: false, error: '댓글을 1~600자로 적어 주세요' };
      const cs = store.get('comments', []); const x = { id: uid('C'), postId, by: m.id, text: t, at: now() };
      cs.push(x); store.set('comments', cs); return { ok: true, comment: x };
    },
    deletePost({ code, id }) {
      const m = me(code); if (!m) return { ok: false, error: 'auth' }; const ps = store.get('posts', []); const x = ps.find(p => p.id === id); if (!x) return { ok: true };
      if (x.by !== m.id && m.role !== '운영자') return { ok: false, error: '내 글만 지울 수 있어요' };
      store.set('posts', ps.filter(p => p.id !== id)); store.set('comments', store.get('comments', []).filter(c => c.postId !== id)); return { ok: true };
    },
    deleteComment({ code, id }) {
      const m = me(code); if (!m) return { ok: false, error: 'auth' }; const cs = store.get('comments', []); const x = cs.find(c => c.id === id); if (!x) return { ok: true };
      if (x.by !== m.id && m.role !== '운영자') return { ok: false, error: '내 댓글만 지울 수 있어요' };
      store.set('comments', cs.filter(c => c.id !== id)); return { ok: true };
    },
    adminList({ key }) {
      if (key !== 'demo') return { ok: false, error: '관리자 키가 맞지 않아요. (데모 모드 키: demo)' };
      return { ok: true, apps: store.get('apps', []) };
    },
    adminUpdate({ key, id, scores, status, memo }) {
      if (key !== 'demo') return { ok: false, error: 'auth' };
      const apps = store.get('apps', []); const a = apps.find(x => x.id === id);
      if (!a) return { ok: false, error: 'not found' };
      if (scores) a.scores = scores; if (status) a.status = status; if (memo !== undefined) a.memo = memo;
      // 입금확인 처리 시 멤버 라운지 계정(멤버 코드) 자동 발급
      if (a.status === '입금확인' && !a.memberCode) {
        demoSeed();
        const ms = store.get('members', []); const code = Math.random().toString(36).slice(2, 8);
        ms.push({ id: 'M-' + a.id, name: a.name, code, role: a.role, project: (a.goal || '').slice(0, 40), type: '', metric: '', unit: '',
          dir: 'up', base: '', target: '', values: {}, intro: '' });
        store.set('members', ms); a.memberCode = code;
      }
      store.set('apps', apps); return { ok: true, memberCode: a.memberCode };
    }
  };
  function me(code) { return store.get('members', []).find(x => x.code === code); }
  function strip(m) { const o = Object.assign({}, m); delete o.code; return o; }

  async function api(action, payload) {
    payload = payload || {};
    if (!C.apiUrl) { await new Promise(r => setTimeout(r, 250)); return demo[action](payload); }
    // text/plain 으로 보내면 CORS preflight 없이 Apps Script doPost 에 닿는다.
    // 구글 서버가 가끔 일시적으로 404/5xx를 돌려주므로 자동 재시도 (apply 는 reqId 로 서버가 중복 접수를 막는다)
    const RETRY = ['status', 'apply', 'login', 'feed', 'board', 'setValue', 'updateProject', 'addLog', 'adminList', 'adminUpdate'];
    const tries = RETRY.includes(action) ? 4 : 1;
    let lastErr;
    for (let i = 0; i < tries; i++) {
      try {
        const res = await fetch(C.apiUrl, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(Object.assign({ action }, payload)) });
        if (!res.ok) throw new Error('서버 응답 ' + res.status);
        return await res.json();
      } catch (e) { lastErr = e; if (i < tries - 1) await new Promise(r => setTimeout(r, 700 * (i + 1))); }
    }
    throw lastErr;
  }

  /* ---------- UI 유틸 ---------- */
  function reveal(root) {
    const els = (root || document).querySelectorAll('[data-reveal]:not(.in)');
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver((ents) => ents.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }), { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    els.forEach(e => io.observe(e));
  }

  function toast(msg, kind) {
    let t = document.querySelector('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg; t.dataset.kind = kind || '';
    t.classList.add('show'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 2800);
  }

  function countdown(el, iso) {
    const end = new Date(iso).getTime();
    const tick = () => {
      const d = Math.max(0, end - Date.now());
      if (d === 0) { el.innerHTML = '<b>모집 마감</b>'; return; }
      const dd = Math.floor(d / 864e5), hh = Math.floor(d % 864e5 / 36e5), mm = Math.floor(d % 36e5 / 6e4), ss = Math.floor(d % 6e4 / 1e3);
      el.innerHTML = `<span><b>${dd}</b>일</span><span><b>${String(hh).padStart(2, '0')}</b>시간</span><span><b>${String(mm).padStart(2, '0')}</b>분</span><span><b>${String(ss).padStart(2, '0')}</b>초</span>`;
      setTimeout(tick, 1000);
    };
    tick();
  }

  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function countUp(el, to, dur, fmt) {
    fmt = fmt || (v => Math.round(v).toLocaleString('ko-KR'));
    if (reduced()) { el.textContent = fmt(to); return; }
    const from = Number(el.dataset.from || 0), t0 = performance.now(); dur = dur || 1400;
    const step = (t) => { const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3); el.textContent = fmt(from + (to - from) * e); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }

  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmtDate = (iso, o) => new Date(iso + (iso.length === 10 ? 'T00:00:00+09:00' : '')).toLocaleDateString('ko-KR', Object.assign({ month: 'numeric', day: 'numeric', weekday: 'short' }, o || {}));

  // 오늘 기준 현재/다음 회차 (테스트: ?now=2026-11-10)
  function today() { const q = new URLSearchParams(location.search).get('now'); return q ? new Date(q + 'T12:00:00+09:00') : new Date(); }
  function currentSession() {
    const t = today();
    const next = C.sessions.find(s => new Date(s.date + 'T16:00:00+09:00') >= t);
    const done = C.sessions.filter(s => new Date(s.date + 'T16:00:00+09:00') < t).length;
    return { next, done };
  }

  // 정원 현황 { seats, taken, closed } — 서버가 안 되면 null (이때는 마감으로 막지 않는다)
  async function seatStatus() { try { const r = await api('status'); return r && r.ok ? r : null; } catch (e) { return null; } }

  window.BAPC = { api, seatStatus, store, reveal, toast, countdown, countUp, esc, fmtDate, today, currentSession, reduced, demoMode: !C.apiUrl };
})();
