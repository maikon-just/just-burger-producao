/* ═══════════════════════════════════════════════════════════
   Just Burger 🍔 — Controle de Versão
   ⚠️  ATUALIZE O NÚMERO ABAIXO A CADA DEPLOY NO GITHUB!
   Isso garante que o browser baixe os arquivos novos.

   Como usar:
   1. Mude o número de BUILD_DATE para a data atual (AAAAMMDD)
   2. Suba este arquivo junto com os demais no GitHub
═══════════════════════════════════════════════════════════ */

const JB_VERSION = {
  build: '20260331-32',
  data:  '31/03/2026',
  autor: 'Just Burger Produção',
  /* v32 — changelog:
     - Blacklist de departamentos: MOTOCA e outros de teste nunca aparecem
       mesmo que ainda tenham tarefas no Firebase
     - Blacklist de colaboradores expandida: MAIKON, JULIANA, MALU, MOTOCA,
       CCCCC, padrões repetidos (AAAA, CCC…) nunca aparecem em nenhuma lista
     - Lista do modal Nova Tarefa: mostra TODOS com tarefas (sem limite de 24h),
       sem os de teste, ordenados A→Z
     - Filtro de colaboradores do painel líder: exclui nomes de teste
     - Filtro de colaboradores da aba Tarefas: exclui nomes de teste
     - Departamento some automaticamente quando não tem tarefas (regra mantida)
  */
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
