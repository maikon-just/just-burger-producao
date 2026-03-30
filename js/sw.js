/* ═══════════════════════════════════════════════════════════
   Just Burger 🍔 — Service Worker
   Versão: 20260329-1
   Estratégia: Network First com fallback para cache
   A cada novo deploy, incremente a versão CACHE_NAME abaixo
═══════════════════════════════════════════════════════════ */

const CACHE_NAME = 'justburger-v20260329-1';

/* Arquivos que serão cacheados */
const CACHE_FILES = [
  '/',
  '/index.html',
  '/portal.html',
  '/medias.html',
  '/insumos.html',
  '/resultados_v2.html',
  '/dashboard.html',
  '/css/style.css',
  '/js/app_v3.js',
  '/js/firebase_v2.js',
  '/js/data.js',
  '/images/logo-justburger.png',
];

/* ── INSTALL: guarda os arquivos em cache ── */
self.addEventListener('install', event => {
  console.log('[SW] Instalando versão:', CACHE_NAME);
  /* Força ativação imediata sem esperar a aba antiga fechar */
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CACHE_FILES)).catch(() => {})
  );
});

/* ── ACTIVATE: apaga caches antigos ── */
self.addEventListener('activate', event => {
  console.log('[SW] Ativando e limpando caches antigos...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('[SW] Deletando cache antigo:', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())  /* assume controle imediato de todas as abas */
  );
});

/* ── FETCH: Network First — sempre tenta a rede primeiro ── */
self.addEventListener('fetch', event => {
  /* Ignora requisições não-GET e requisições externas (Firebase, CDN) */
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.hostname !== self.location.hostname) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        /* Guarda a resposta nova em cache */
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => {
        /* Sem internet: usa cache */
        return caches.match(event.request);
      })
  );
});
