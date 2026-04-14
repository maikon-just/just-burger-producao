/**
 * JB GUARD STANDALONE — v2.0
 * Cole este script no <head> de qualquer repositório externo do Just Burger.
 *
 * COMO FUNCIONA:
 *  - Usa localStorage (compartilhado entre todos os repositórios do mesmo domínio)
 *  - O hub salva a sessão no localStorage ao fazer login
 *  - Este guard lê essa sessão; se não existir, redireciona para o hub
 *  - Logout em qualquer página invalida todas as outras abas/páginas
 *
 * USO: adicionar no <head> ANTES de qualquer outro script:
 *   <script>
 *     window.JB_GUARD_PAPEIS  = ['admin','financeiro'];
 *     window.JB_GUARD_HUB_URL = 'https://maikon-just.github.io/just-burger-hub/';
 *   </script>
 *   <script src="https://maikon-just.github.io/just-burger-producao/js/jb-guard-standalone.js?v=20260414b"></script>
 */

(function () {
  'use strict';

  var HUB_URL   = (typeof window.JB_GUARD_HUB_URL !== 'undefined')
    ? window.JB_GUARD_HUB_URL
    : 'https://maikon-just.github.io/just-burger-hub/';

  var PAPEIS_OK = (typeof window.JB_GUARD_PAPEIS !== 'undefined')
    ? window.JB_GUARD_PAPEIS
    : [];

  /* Chaves — mesmas usadas pelo hub/auth-guard.js */
  var KEY       = 'jb_user';
  var KEY_STAMP = 'jb_ts';
  var KEY_OUT   = 'jb_out';
  var TTL_MS    = 8 * 60 * 60 * 1000; // 8 horas
  var SALT      = 'JB@2026#hub';

  /* ── Helpers ── */
  function _b64d(s) {
    try { return decodeURIComponent(escape(atob(s))); } catch(e) { return null; }
  }
  function _b64e(s) {
    try { return btoa(unescape(encodeURIComponent(s))); } catch(e) { return ''; }
  }
  function _sig(u) {
    return _b64e(SALT + '|' + u.username + '|' + u.papel);
  }

  /* ── Wipe: limpa sessionStorage E localStorage ── */
  function _wipe() {
    try { sessionStorage.removeItem(KEY); sessionStorage.removeItem(KEY_STAMP); } catch(e) {}
    try { localStorage.removeItem(KEY);   localStorage.removeItem(KEY_STAMP);   } catch(e) {}
  }

  /* ── Redireciona para o hub ── */
  function _redirect() {
    var from = encodeURIComponent(location.href);
    var sep  = HUB_URL.indexOf('?') >= 0 ? '&' : '?';
    window.location.replace(HUB_URL + sep + '_from=' + from);
  }

  /* ── Salva sessão no localStorage (acessível por todos os repos do mesmo domínio) ── */
  function _save(sess) {
    try {
      localStorage.setItem(KEY, JSON.stringify(sess));
      localStorage.setItem(KEY_STAMP, String(Date.now() + TTL_MS));
    } catch(e) {}
    /* também salva no sessionStorage para compatibilidade */
    try {
      sessionStorage.setItem(KEY, JSON.stringify(sess));
      sessionStorage.setItem(KEY_STAMP, String(Date.now() + TTL_MS));
    } catch(e) {}
  }

  /* ── Lê sessão válida: tenta localStorage, depois sessionStorage ── */
  function _read() {
    /* 1. Checa flag de logout total */
    try {
      if (localStorage.getItem(KEY_OUT) === '1') { _wipe(); return null; }
    } catch(e) {}

    /* 2. Tenta localStorage primeiro (compartilhado entre repos) */
    var raw   = null;
    var stamp = 0;
    try {
      raw   = localStorage.getItem(KEY);
      stamp = parseInt(localStorage.getItem(KEY_STAMP) || '0', 10);
    } catch(e) {}

    /* fallback: sessionStorage */
    if (!raw) {
      try {
        raw   = sessionStorage.getItem(KEY);
        stamp = parseInt(sessionStorage.getItem(KEY_STAMP) || '0', 10);
      } catch(e) {}
    }

    if (!raw) return null;

    /* 3. Verifica TTL */
    if (Date.now() > stamp) { _wipe(); return null; }

    /* 4. Parseia e verifica assinatura */
    try {
      var u = JSON.parse(raw);
      if (!u || !u.username || !u.papel) { _wipe(); return null; }
      /* verifica assinatura (compatível com auth-guard.js) */
      if (u._sig && u._sig !== _sig(u)) { _wipe(); return null; }
      return u;
    } catch(e) { _wipe(); return null; }
  }

  /* ── Renova TTL ── */
  function _renew() {
    var now = String(Date.now() + TTL_MS);
    try { if (localStorage.getItem(KEY))   localStorage.setItem(KEY_STAMP, now);   } catch(e) {}
    try { if (sessionStorage.getItem(KEY)) sessionStorage.setItem(KEY_STAMP, now); } catch(e) {}
  }

  /* ── Tenta restaurar sessão do token ?_jbs= na URL ── */
  function _tryFromUrl() {
    try {
      var params = new URLSearchParams(location.search);
      var token  = params.get('_jbs');
      if (!token) return null;
      var json = _b64d(decodeURIComponent(token));
      if (!json) return null;
      var sess = JSON.parse(json);
      if (!sess || !sess.username || !sess.papel) return null;
      _save(sess);
      /* Limpa token da URL */
      params.delete('_jbs');
      params.delete('_cb');
      var novaUrl = location.pathname + (params.toString() ? '?' + params.toString() : '');
      try { history.replaceState(null, '', novaUrl); } catch(e) {}
      return sess;
    } catch(e) { return null; }
  }

  /* ── Ouve logout de outras abas ── */
  function _listenLogout() {
    try {
      window.addEventListener('storage', function(e) {
        if (e.key === KEY_OUT && e.newValue === '1') {
          _wipe();
          window.location.replace(HUB_URL);
        }
      });
    } catch(e) {}
  }

  /* ── Renova TTL a cada interação do usuário ── */
  function _listenActivity() {
    ['click', 'keydown', 'touchstart', 'mousemove'].forEach(function(ev) {
      document.addEventListener(ev, _renew, { passive: true, capture: true });
    });
  }

  /* ════════════════════════════════════════════
     GUARD PRINCIPAL
  ════════════════════════════════════════════ */

  /* Ambiente de preview/dev: não bloqueia */
  var h = location.hostname || '';
  var isPreview = (
    h === 'localhost' || h === '127.0.0.1' ||
    h.indexOf('gitpod') >= 0 ||
    h.indexOf('preview') >= 0 ||
    location.protocol === 'blob:' ||
    location.href.indexOf('genspark.ai') >= 0
  );

  if (isPreview) {
    document.addEventListener('DOMContentLoaded', function() {
      _listenLogout();
      _listenActivity();
    });
    console.log('[JB Guard] Ambiente dev/preview — guard desativado.');
    return;
  }

  /* 1. Tenta restaurar sessão do ?_jbs= ou do localStorage */
  var sess = _tryFromUrl() || _read();

  /* 2. Sem sessão válida → redireciona para o hub */
  if (!sess) {
    console.log('[JB Guard] Sem sessão — redirecionando para o hub...');
    _redirect();
    return;
  }

  /* 3. Verifica papel se configurado */
  if (PAPEIS_OK.length > 0 && PAPEIS_OK.indexOf(sess.papel) < 0) {
    console.warn('[JB Guard] Papel "' + sess.papel + '" sem acesso a esta página.');
    _wipe();
    window.location.replace(HUB_URL + '?_acesso=negado');
    return;
  }

  /* 4. Sessão válida: renova TTL e instala listeners */
  _renew();
  document.addEventListener('DOMContentLoaded', function() {
    _listenLogout();
    _listenActivity();
  });

  /* Expõe sessão globalmente */
  window.JbSessao = sess;
  console.log('[JB Guard] ✅ Sessão válida:', sess.nome || sess.username, '— papel:', sess.papel);

})();
