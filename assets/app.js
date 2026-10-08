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

  /* ---------- 시험 모드 백엔드 (apiUrl 이 비어 있을 때만 — Code.gs 와 같은 액션 이름·응답 모양) ---------- */
  function seed() {
    if (store.get('seeded')) return;
    store.set('members', [
      { id: 'M-HOSE', name: 'Hose', code: 'demo', role: '운영자' },
      { id: 'M-EX1', name: '예시 멤버 A', code: 'demo-a', role: '직장인' },
      { id: 'M-EX2', name: '예시 멤버 B', code: 'demo-b', role: '자영업' }
    ]);
    store.set('apps', []);
    store.set('posts', [
      { id: 'P-EX1', by: 'M-EX1', kind: '정보 공유', cat: '프롬프트', title: '회의록 정리 프롬프트', text: '요즘 회의록 정리에 쓰는 방법: 녹음 → 텍스트 → AI에게 "결정사항 / 할 일 / 담당자"로 나눠 달라고 해요. 시간이 꽤 줄었어요. (예시 글)', link: '', at: new Date(Date.now() - 3600e3).toISOString() },
      { id: 'P-EX2', by: 'M-EX2', kind: '질문', cat: '프롬프트', title: '우리 가게 말투로 쓰게 하려면?', text: '인스타 문구를 AI로 만들면 다 비슷하게 나오는데, 우리 가게 말투로 쓰게 하려면 어떻게 하세요? (예시 글)', link: '', at: new Date(Date.now() - 1800e3).toISOString() }
    ]);
    store.set('posts', store.get('posts').concat([{ id: 'P-EX3', by: 'M-EX1', kind: '진행현황', project: '회의록 자동 정리', pno: 1, tried: '녹음 파일을 텍스트로 바꾸고 요약 프롬프트를 돌려 봤어요.', result: '결정사항 / 할 일 표가 나왔어요.', learned: '담당자 이름을 미리 알려 주면 정확도가 올라가요. (예시 글)', text: '녹음 파일을 텍스트로', link: '', at: new Date(Date.now() - 2400e3).toISOString() }]));
    store.set('comments', [{ id: 'C-EX1', postId: 'P-EX2', by: 'M-HOSE', text: '예전에 쓴 글 3개를 예시로 붙여 주고 "이 말투로"라고 해 보세요! (예시 댓글)', at: new Date(Date.now() - 900e3).toISOString() }]);
    store.set('seeded', true);
  }
  const counts = () => { let pm = 0, pmWait = 0, am = 0; store.get('apps', []).forEach(a => { const st = a.status || '접수'; if (st === '취소') return; if (a.slot === '오전반') am++; else if (st === '대기') pmWait++; else pm++; }); return { pm, pmWait, am }; };
  const me = (code) => { seed(); return store.get('members', []).find(x => x.code === code); };


  // 글 종류별 입력 점검 (프런트 데모와 같은 규칙)
  const INFO_TYPES = ['프롬프트', '도구·서비스', '글·영상', '기타'], Q_CATS = ['AI 기초', '프롬프트', '코딩·바이브코딩', '도구·설정', '업무·일상 적용', '기타'];
  function normPost_(x, meId, all) {
    x = x || {}; const s = (v, n) => String(v == null ? '' : v).trim().slice(0, n);
    const kind = ['정보 공유', '진행현황', '질문'].indexOf(x.kind) >= 0 ? x.kind : '정보 공유';
    const link = s(x.link, 300); if (link && !/^https?:\/\/\S{3,300}$/i.test(link)) return { error: '링크는 http(s)로 시작해야 해요' };
    const o = { kind: kind, link: link, title: '', cat: '', project: '', pno: '', tried: '', result: '', learned: '', text: '' };
    if (kind === '정보 공유') {
      o.cat = INFO_TYPES.indexOf(x.cat) >= 0 ? x.cat : '기타'; o.title = s(x.title, 60); o.text = s(x.text, 3000);
      if (!o.text && !link) return { error: '코멘트나 링크를 적어 주세요' }; o.text = o.text || o.title || link;
    } else if (kind === '질문') {
      o.cat = Q_CATS.indexOf(x.cat) >= 0 ? x.cat : '기타'; o.title = s(x.title, 80); o.text = s(x.text, 1500);
      if (!o.title) return { error: '질문 제목을 적어 주세요' }; if (!o.text) return { error: '질문 내용을 적어 주세요' };
    } else {
      o.project = s(x.project, 40); if (!o.project) return { error: '프로젝트 이름을 적어 주세요' };
      o.tried = s(x.tried, 1000); o.result = s(x.result, 1000); o.learned = s(x.learned, 1000);
      if (!o.tried && !o.result && !o.learned) return { error: '시도한 것·결과물·깨달은 것 중 하나는 적어 주세요' };
      o.text = o.tried || o.result || o.learned;
      const mine = (all || []).filter(r => r.by === meId && r.kind === '진행현황' && r.project), same = mine.find(r => r.project === o.project);
      o.pno = same ? Number(same.pno) : mine.reduce((m, r) => Math.max(m, Number(r.pno) || 0), 0) + 1;
    }
    return { post: o };
  }
  
  const demo = {
    status() { const c = counts(), M = C.morning; return { ok: true, seats: C.seats, taken: c.pm, closed: c.pm >= C.seats, waitlist: c.pmWait, am: { count: c.am, min: M.min, seats: M.seats, open: c.am >= M.min, full: c.am >= M.seats } }; },
    apply({ data: d }) {
      const c = counts(), M = C.morning; let slot = ['오후반', '오전반', '오후반 대기'].includes(d.slot) ? d.slot : '오후반', status = '접수';
      if (slot === '오전반') { if (c.am >= M.seats) return { ok: false, closed: true, error: '오전반도 정원이 모두 찼어요' }; status = '대기'; }
      else if (c.pm >= C.seats) { if (slot !== '오후반 대기') return { ok: false, closed: true, full: true, error: '오후반 정원 ' + C.seats + '명이 모두 찼어요' }; status = '대기'; }
      else if (slot === '오후반 대기') slot = '오후반';
      const apps = store.get('apps', []);
      const id = 'AI1-' + String(apps.length + 1).padStart(3, '0') + '-' + Math.random().toString(36).slice(2, 4).toUpperCase();
      apps.push(Object.assign({ id, at: now() }, d, { status, slot, pay: status === '대기' ? '' : d.pay })); store.set('apps', apps);
      return { ok: true, id, status, slot, am: counts().am };
    },
    feed({ code, name }) {
      const m = me(code);
      if (!m || (name && m.name !== name && !code.startsWith('demo'))) return { ok: false, error: name ? '이름 또는 입장 코드가 맞지 않아요.' : 'auth' };
      return { ok: true, me: { id: m.id, name: m.name, role: m.role }, members: store.get('members', []).map(x => ({ id: x.id, name: x.name, role: x.role })),
        posts: store.get('posts', []).slice().sort((a, b) => b.at.localeCompare(a.at)), comments: store.get('comments', []) };
    },
    addPost({ code, post }) {
      const m = me(code); if (!m) return { ok: false, error: 'auth' };
      const ps = store.get('posts', []); const n = normPost_(post, m.id, ps); if (n.error) return { ok: false, error: n.error };
      const x = Object.assign({ id: uid('P'), by: m.id, at: now() }, n.post);
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
      if (key !== 'demo') return { ok: false, error: '관리자 키가 맞지 않아요. (시험 모드 키: demo)' };
      return { ok: true, apps: store.get('apps', []) };
    },
    adminUpdate({ key, id, status, memo }) {
      if (key !== 'demo') return { ok: false, error: 'auth' };
      const apps = store.get('apps', []); const a = apps.find(x => x.id === id);
      if (!a) return { ok: false, error: 'not found' };
      if (status) a.status = status; if (memo !== undefined) a.memo = memo;
      if (a.status === '입금확인' && !a.memberCode) { // 입금확인 시 라운지 입장 코드 자동 발급
        seed(); const ms = store.get('members', []); const code = Math.random().toString(36).slice(2, 8);
        ms.push({ id: 'M-' + a.id, name: a.name, code, role: a.role }); store.set('members', ms); a.memberCode = code;
      }
      store.set('apps', apps); return { ok: true, memberCode: a.memberCode };
    }
  };

  // 서버 호출. 구글 서버가 가끔 일시적으로 느리거나 404/5xx를 돌려주므로 시간 제한(15초) + 자동 재시도(최대 3번).
  // 글·댓글은 cid, 신청은 reqId 로 서버가 같은 요청을 한 번만 저장하므로 재시도해도 중복되지 않는다.
  // text/plain 으로 보내면 CORS preflight 없이 Apps Script doPost 에 닿는다.
  async function api(action, payload) {
    payload = payload || {};
    if (!C.apiUrl) { await new Promise(r => setTimeout(r, 120)); return demo[action](payload); }
    let lastErr;
    for (let i = 0; i < 3; i++) {
      const ctl = new AbortController(), timer = setTimeout(() => ctl.abort(), 15000);
      try {
        const res = await fetch(C.apiUrl, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(Object.assign({ action }, payload)), signal: ctl.signal });
        if (!res.ok) throw new Error('서버 응답 ' + res.status);
        return await res.json();
      } catch (e) { lastErr = e.name === 'AbortError' ? new Error('응답이 늦어요') : e; if (i < 2) await new Promise(r => setTimeout(r, 400 * (i + 1))); }
      finally { clearTimeout(timer); }
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
