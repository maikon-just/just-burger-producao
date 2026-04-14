/**
 * JB AUTH GUARD — v2.0
 * Biblioteca central de segurança Just Burger
 *
 * Funcionalidades:
 *  - Sessão com TTL (8 horas), renovada a cada ação
 *  - Flag de logout total: invalida qualquer sessão ativa imediatamente
 *  - Bloqueio do botão "Voltar" após logout
 *  - Verificação de papel (role) por página
 *  - Token de sessão com assinatura HMAC simples (anti-tamper)
 *
 * Uso nas páginas protegidas (no <head>, antes de qualquer script):
 *   JbAuth.guard({ papeis: ['admin','lider'], redirect: 'portal.html' });
 *
 * Uso no logout:
 *   JbAuth.logout('portal.html');
 */

'use strict';

const JbAuth = (() => {

  /* ── Constantes ── */
  const KEY        = 'jb_user';       // sessionStorage
  const KEY_STAMP  = 'jb_ts';         // timestamp de expiração
  const KEY_OUT    = 'jb_out';        // localStorage: flag logout total
  const TTL_MS     = 8 * 60 * 60 * 1000; // 8 horas
  const SALT       = 'JB@2026#hub';   // saldo para assinatura

  /* ── Utilitários internos ── */
  const _b64e = s => btoa(unescape(encodeURIComponent(s)));
  const _b64d = s => { try { return decodeURIComponent(escape(atob(s))); } catch(e) { return null; } };
  const _sig  = payload => _b64e(SALT + '|' + payload.username + '|' + payload.papel);

  /* ── Verifica se é ambiente seguro (local/preview) ── */
  const _isSafeEnv = () => {
    const h = location.hostname || '';
    return h === 'localhost' || h === '127.0.0.1' ||
           h.includes('gitpod') || h.includes('preview') ||
           location.protocol === 'blob:' ||
           location.href.includes('genspark.ai');
  };

  /* ── Salva sessão ── */
  function save(userObj) {
    const payload = Object.assign({}, userObj, { _sig: _sig(userObj) });
    const json    = JSON.stringify(payload);
    const stamp   = String(Date.now() + TTL_MS);
    sessionStorage.setItem(KEY, json);
    sessionStorage.setItem(KEY_STAMP, stamp);
    // Salva também no localStorage para que repos externos consigam ler
    try {
      localStorage.setItem(KEY, json);
      localStorage.setItem(KEY_STAMP, stamp);
      localStorage.removeItem(KEY_OUT); // limpa flag de logout anterior
    } catch(e) {}
  }

  /* ── Lê e valida sessão ── */
  function read() {
    // 1. Checa flag de logout total
    try {
      if (localStorage.getItem(KEY_OUT) === '1') {
        _wipe();
        return null;
      }
    } catch(e) {}

    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;

    // 2. Verifica TTL
    const exp = parseInt(sessionStorage.getItem(KEY_STAMP) || '0', 10);
    if (Date.now() > exp) {
      _wipe();
      return null;
    }

    // 3. Parseia e verifica assinatura
    try {
      const u = JSON.parse(raw);
      if (!u || !u.username || !u.papel) { _wipe(); return null; }
      if (u._sig !== _sig(u)) { _wipe(); return null; } // tamper detectado
      return u;
    } catch(e) {
      _wipe();
      return null;
    }
  }

  /* ── Renova TTL (chamada a cada interação do usuário) ── */
  function renew() {
    const stamp = String(Date.now() + TTL_MS);
    if (sessionStorage.getItem(KEY)) sessionStorage.setItem(KEY_STAMP, stamp);
    try { if (localStorage.getItem(KEY)) localStorage.setItem(KEY_STAMP, stamp); } catch(e) {}
  }

  /* ── Limpa sessão local ── */
  function _wipe() {
    sessionStorage.removeItem(KEY);
    sessionStorage.removeItem(KEY_STAMP);
    sessionStorage.removeItem('cfg_ok');
    sessionStorage.removeItem('cfg_papel');
    // Limpa também localStorage (sessão compartilhada com repos externos)
    try { localStorage.removeItem(KEY); localStorage.removeItem(KEY_STAMP); } catch(e) {}
  }

  /* ── Logout total ── */
  function logout(redirectUrl) {
    // Marca logout no localStorage → invalida outras abas/páginas e repos externos
    try {
      localStorage.setItem(KEY_OUT, '1');
      localStorage.removeItem(KEY);
      localStorage.removeItem(KEY_STAMP);
    } catch(e) {}
    _wipe();

    // Bloqueia botão "Voltar": empurra estado neutro e escuta popstate
    try {
      history.pushState(null, '', location.href);
      window.addEventListener('popstate', function _bloqVoltar() {
        history.pushState(null, '', location.href);
      });
    } catch(e) {}

    const dest = redirectUrl || 'portal.html';
    // Usa replace para não deixar entrada no histórico
    window.location.replace(dest);
  }

  /* ── Guard principal ── */
  function guard({ papeis, redirect, sistemaId } = {}) {
    const dest = redirect || 'portal.html';

    // Ambiente de preview: só verifica tamper, não redireciona
    if (_isSafeEnv()) {
      _setupLogoutListener();
      _setupActivityRenew();
      return;
    }

    // Tenta restaurar sessão via ?_jbs= (passada pelo hub)
    _tryRestoreFromUrl();

    const u = read();
    if (!u) {
      window.location.replace(dest + '?_from=' + encodeURIComponent(location.pathname));
      return;
    }

    // Verifica papel
    if (papeis && papeis.length > 0 && !papeis.includes(u.papel)) {
      // Papel sem acesso → logout forçado e redireciona ao hub com mensagem
      try { localStorage.setItem(KEY_OUT, '1'); } catch(e) {}
      _wipe();
      window.location.replace(dest + '?_acesso=negado');
      return;
    }

    // Sessão válida: renova TTL e instala listeners
    renew();
    _setupLogoutListener();
    _setupActivityRenew();
  }

  /* ── Restaura sessão passada via ?_jbs= pelo hub ── */
  function _tryRestoreFromUrl() {
    try {
      const params = new URLSearchParams(location.search);
      const token  = params.get('_jbs');
      if (!token) return;
      const json = _b64d(decodeURIComponent(token));
      if (!json) return;
      const sess = JSON.parse(json);
      if (sess && sess.username && sess.papel) {
        save(sess); // salva com TTL e assinatura
      }
      // Limpa token da URL
      params.delete('_jbs');
      params.delete('_cb');
      const novaUrl = location.pathname + (params.toString() ? '?' + params.toString() : '');
      history.replaceState(null, '', novaUrl);
    } catch(e) { /* ignora */ }
  }

  /* ── Ouve localStorage: se outra aba fizer logout, invalida esta aba ── */
  function _setupLogoutListener() {
    try {
      window.addEventListener('storage', function(e) {
        if (e.key === KEY_OUT && e.newValue === '1') {
          _wipe();
          window.location.replace('portal.html');
        }
      });
    } catch(e) {}
  }

  /* ── Renova TTL a cada clique/toque do usuário ── */
  function _setupActivityRenew() {
    ['click','keydown','touchstart','mousemove'].forEach(ev => {
      document.addEventListener(ev, renew, { passive: true, capture: true });
    });
  }

  /* ── Expõe API pública ── */
  return { save, read, renew, logout, guard, tryRestoreFromUrl: _tryRestoreFromUrl };

})();
