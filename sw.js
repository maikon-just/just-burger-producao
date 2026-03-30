/* ═══════════════════════════════════════════════════════════
   Just Burger 🍔 — Service Worker
   ⚠️  A cada novo deploy, troque o número abaixo (ex: v4, v5...)
       Isso força todos os browsers a baixar tudo de novo.
═══════════════════════════════════════════════════════════ */

const VERSAO = 'justburger-v20260330-3';

/* ── INSTALL ── apaga cache antigo e registra o novo ── */
self.addEventListener('install', event => {
  console.log('[SW] Install:', VERSAO);
  self.skipWaiting(); /* ativa imediatamente sem esperar fechar abas */
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .catch(() => {})
  );
});

/* ── ACTIVATE ── assume controle de todas as abas abertas ── */
self.addEventListener('activate', event => {
  console.log('[SW] Activate:', VERSAO);
  event.waitUntil(self.clients.claim());
});

/* ── FETCH ── Network First: sempre busca da rede ── */
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  /* Deixa passar: Firebase, CDN, fontes externas */
  if (url.hostname !== self.location.hostname) return;

  event.respondWith(
    fetch(event.request, { cache: 'no-store' })   /* força rede sem cache */
      .catch(() => caches.match(event.request))    /* fallback: cache se offline */
  );
});
