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
      { id: 'M-HOSE', name: 'Hose', code: 'demo', role: '운영자', project: '30일 읽고 쓰기 챌린지', type: 'new',
        metric: '누적 참여자', unit: '명', dir: 'up', base: 0, target: 40, values: {}, intro: '비북스 운영자. 하루 10페이지 읽고 한 줄 쓰기를 AI로 설계·모집·운영.', sample: true },
      { id: 'M-EX1', name: '예시 멤버 A', code: 'demo-a', role: '직장인', project: '주간 보고서 자동화', type: 'save',
        metric: '보고서 1건 작성 시간', unit: '분', dir: 'down', base: 90, target: 20, values: {}, intro: '데모용 예시 데이터', sample: true },
      { id: 'M-EX2', name: '예시 멤버 B', code: 'demo-b', role: '자영업', project: '카페 인스타 콘텐츠 자동화', type: 'grow',
        metric: '월 예약·문의', unit: '건', dir: 'up', base: 12, target: 25, values: {}, intro: '데모용 예시 데이터', sample: true }
    ];
    store.set('members', members);
    store.set('logs', []);
    store.set('recipes', [
      { id: 'R-EX1', by: 'M-HOSE', week: 1, title: '30일 쓰기 질문 한 번에 설계 (예시)', problem: '매일 다른 쓰기 질문 30개를 혼자 만들기 막막함', tool: 'Claude', flow: '1) 이달의 추천도서 10권 제목·한 줄 소개를 붙여 넣기\n2) “300페이지 내외 책을 하루 10페이지씩 읽는 사람에게, 부담 없이 한 줄로 답할 수 있는 질문 30개. 1주차는 관찰, 2주차는 기억, 3주차는 생각, 4주차는 나에게로” 프롬프트\n3) 겹치는 질문 정리 후 인증 페이지에 날짜별 등록', result: '질문 30개 설계 3시간 → 25분', caution: '특정 책 스포일러가 되는 질문은 빼기', tags: ['신사업형', '글쓰기'], at: now() }
    ]);
    store.set('apps', []);
    store.set('seeded', true);
  }

  const demo = {
    apply({ data: d }) {
      const apps = store.get('apps', []);
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
    adminList({ key }) {
      if (key !== 'demo') return { ok: false, error: '관리자 키가 맞지 않아요. (데모 모드 키: demo)' };
      return { ok: true, apps: store.get('apps', []) };
    },
    adminUpdate({ key, id, scores, status, memo }) {
      if (key !== 'demo') return { ok: false, error: 'auth' };
      const apps = store.get('apps', []); const a = apps.find(x => x.id === id);
      if (!a) return { ok: false, error: 'not found' };
      if (scores) a.scores = scores; if (status) a.status = status; if (memo !== undefined) a.memo = memo;
      // 선발 처리 시 멤버 라운지 계정(멤버 코드) 자동 발급
      if (a.status === '선발' && !a.memberCode) {
        demoSeed();
        const ms = store.get('members', []); const code = Math.random().toString(36).slice(2, 8);
        ms.push({ id: 'M-' + a.id, name: a.name, code, role: a.role, project: (a.goal || '').slice(0, 40), type: a.ptype, metric: a.mName, unit: a.mUnit,
          dir: (C.types[a.ptype] || {}).dir || 'up', base: isNaN(+a.mNow) ? '' : +a.mNow, target: isNaN(+a.mGoal) ? '' : +a.mGoal, values: {}, intro: a.job });
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
    // text/plain 으로 보내면 CORS preflight 없이 Apps Script doPost 에 닿는다
    const res = await fetch(C.apiUrl, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(Object.assign({ action }, payload)) });
    if (!res.ok) throw new Error('서버 응답 ' + res.status);
    return res.json();
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

  window.BAPC = { api, store, reveal, toast, countdown, countUp, esc, fmtDate, today, currentSession, reduced, demoMode: !C.apiUrl };
})();
