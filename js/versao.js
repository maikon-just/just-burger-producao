/* ═══════════════════════════════════════════════════════════
   Just Burger 🍔 — Controle de Versão
   ⚠️  ATUALIZE O NÚMERO ABAIXO A CADA DEPLOY NO GITHUB!
   Isso garante que o browser baixe os arquivos novos.

   Como usar:
   1. Mude o número de BUILD_DATE para a data atual (AAAAMMDD)
   2. Suba este arquivo junto com os demais no GitHub
═══════════════════════════════════════════════════════════ */

const JB_VERSION = {
  build: '20260330-2',
  data:  '30/03/2026',
  autor: 'Just Burger Produção',
};

/* Exibe versão no console para diagnóstico */
console.log(`🍔 Just Burger v${JB_VERSION.build} — build ${JB_VERSION.data}`);

/* Força reload dos scripts com cache-bust dinâmico */
(function _forceCacheBust() {
  const v = JB_VERSION.build;
  /* Informa o SW da versão atual */
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ type: 'VERSION', version: v });
  }
})();
