/* ═══════════════════════════════════════════════════════════
   JUST BURGER 🍔 — Controle de Produção
   js/app.js — VERSÃO FINAL ESTÁVEL (2026-03-27)
   ✅ Banco: Genspark tables API
   ✅ Funcionalidades: Produção, Atendimento (persistência
      por tarefa), Operação, painel líder, reabertura de
      turno, cards INICIO/FINALIZAÇÃO (Aline/Antoniel/Marcus)
═══════════════════════════════════════════════════════════ */
'use strict';

/* ── Config ────────────────────────────────────────────── */
const LEADER_PASSWORD = 'lider123';

/* Senhas por colaborador (case insensitive no nome) */
const COLLAB_PASSWORDS = {
  'DINA':   'lider123*',
  'SANDRO': 'lider123*',
};

/* ── Departamentos ──────────────────────────────────────── */
const DEPT_PASSWORD = { 'ATENDIMENTO': 'lider123*' };

const COLLAB_DEPT = {
  /* ATENDIMENTO — colaboradores e seus cards divididos */
  'ANTONIEL':               'ATENDIMENTO',
  'ANTONIEL INICIO':        'ATENDIMENTO',
  'ANTONIEL FINALIZAÇÃO':   'ATENDIMENTO',
  'MARCUS':                 'ATENDIMENTO',
  'MARCUS INICIO':          'ATENDIMENTO',
  'MARCUS FINALIZAÇÃO':     'ATENDIMENTO',
  'SANDRO':                 'ATENDIMENTO',
  'DINA':                   'ATENDIMENTO',
  'ALINE':                  'ATENDIMENTO',
  'ALINE INICIO':           'ATENDIMENTO',
  'ALINE FINALIZAÇÃO':      'ATENDIMENTO',
  'DESPACHO':               'ATENDIMENTO',
  /* OPERACAO */
  'ALAN RICARDO':           'OPERACAO',
  'SAMUEL':                 'OPERACAO',
  'LOHAINE':                'OPERACAO',
  'GABRIEL LEITE':          'OPERACAO',
  'RHUAN':                  'OPERACAO',
  /* Nomes alternativos */
  'ALAN':                   'OPERACAO',
  'RUAH':                   'OPERACAO',
  'RUAH FRITADEIRA':        'OPERACAO',
  'NOITE - FRITADEIRA':     'OPERACAO',
};
/* Qualquer colaborador não listado acima vai para PRODUCAO */

/* Departamento atualmente selecionado (null = não filtrado) */
let _deptAtual = 'PRODUCAO';

/* Unidades que significam "sem quantidade / só executar" */
const UNIDADES_CHECKLIST = [
  'checklist','vídeo','video','checlist',
  'execução','execucao','tarefa','atividade',
  'limpeza','higienização','higienizacao',
  'conferir','verificar','organizar','abastecer',
  's/qtd','sem qtd','sem quantidade',
  'turno','vez','dia','sessao','sessão','serviço','servico',
];

const DIAS_LIST = [
  { key: 'segunda', label: 'Segunda-feira', short: 'SEG', icon: '📅' },
  { key: 'terca',   label: 'Terça-feira',   short: 'TER', icon: '📅' },
  { key: 'quarta',  label: 'Quarta-feira',  short: 'QUA', icon: '📅' },
  { key: 'quinta',  label: 'Quinta-feira',  short: 'QUI', icon: '📅' },
  { key: 'sexta',   label: 'Sexta-feira',   short: 'SEX', icon: '📅' },
  { key: 'sabado',  label: 'Sábado',        short: 'SAB', icon: '🎉' },
  { key: 'domingo', label: 'Domingo',       short: 'DOM', icon: '😎' },
];
const DIA_JS_MAP = ['domingo','segunda','terca','quarta','quinta','sexta','sabado'];

const CAT_EMOJI = {
  'pré-preparo':'🔪','producao':'🏭','produção':'🏭','sachês':'📦','saladas':'🥗',
  'fritadeira':'🍟','hamburger / logística':'🍔','hamburger':'🍔','logística':'🚚',
  'câmaras':'❄️','ilha quente / chapeiro':'🔥','ilha fria / montador':'🧊',
  'ilha':'🏝️','abertura':'🔑','supervisão':'👁️','limpeza':'🧹','molhos':'🫙',
  'pães':'🍞','carnes':'🥩','maionese':'🧴','preparo':'👨‍🍳','geral':'📋',
  'atendimento':'🎯','ifood / delivery':'📱','operação':'⚙️','finalização':'✅','despacho':'📦',
};

/* Lista fixa de todos os colaboradores — usada no modal de nova tarefa */
const TODOS_COLABS_APP = [
  'ALAN RICARDO','ALINE','ALINE INICIO','ALINE FINALIZAÇÃO',
  'ANTONIEL','ANTONIEL INICIO','ANTONIEL FINALIZAÇÃO',
  'ATENDIMENTO / DESPACHO','DAVI','DESPACHO','DINA','FABIO','FERNANDO',
  'GABRIEL KHALYL','GABRIEL LEITE','HENRIQUE','JOÃO','JOSÉ BRUNO','JHON',
  'LOHAINE','LUCAS','MARCUS','MARCUS INICIO','MARCUS FINALIZAÇÃO',
  'MATEUS','NOITE - CHAPEIRO','NOITE - FRITADEIRA',
  'NOITE - MONTADOR','PABLO','PEDRO','RHUAN','RODRIGO','SAMUEL','SANDRO',
];

const COLLAB_EMOJI = {
  'DINA':'👩‍💼','SANDRO':'👨‍💼','PABLO':'🍗','MATEUS':'🥫','JOÃO':'🔪',
  'ALAN RICARDO':'🔥','GABRIEL KHALYL':'🥩','GABRIEL LEITE':'🧊','LOHAINE':'🍟',
  'RHUAN':'🍟','ATENDIMENTO / DESPACHO':'📦','FABIO':'🧀','DAVI':'🍅',
  'HENRIQUE':'🥬','JOSÉ BRUNO':'🥓','PEDRO':'🥤','SAMUEL':'🧊','LUCAS':'🍳',
  'FERNANDO':'🍖','RODRIGO':'🧀','JHON':'🌶️',
  'NOITE - CHAPEIRO':'🔥','NOITE - FRITADEIRA':'🍟','NOITE - MONTADOR':'🧊',
  /* Novos colaboradores de Atendimento */
  'ANTONIEL':'🎯','ANTONIEL INICIO':'🎯','ANTONIEL FINALIZAÇÃO':'✅',
  'MARCUS':'📋','MARCUS INICIO':'📋','MARCUS FINALIZAÇÃO':'✅',
  'ALINE':'🎀','ALINE INICIO':'🎀','ALINE FINALIZAÇÃO':'✅',
  'DESPACHO':'📦',
};

const COLLAB_SETOR = {
  'DINA':'Supervisão','SANDRO':'Supervisão Noite','PABLO':'Pré-preparo / Estagiário',
  'MATEUS':'Sachês / Produção','JOÃO':'Pré-preparo / Cozinha','ALAN RICARDO':'Ilha / Chapeiro',
  'GABRIEL KHALYL':'Hambúrguer / Logística','GABRIEL LEITE':'Ilha / Montador',
  'LOHAINE':'Fritadeira','RHUAN':'Fritadeira',
  'ATENDIMENTO / DESPACHO':'Atendimento / Despacho','FABIO':'Noite – Queijos / Frango',
  'DAVI':'Noite – Molhos','HENRIQUE':'Noite – Saladas','JOSÉ BRUNO':'Noite – Bacon / Cebola',
  'PEDRO':'Noite – Estágio',
  /* Novos de Atendimento */
  'ANTONIEL':'Atendimento Noite','ANTONIEL INICIO':'Atendimento Noite / Inicio',
  'ANTONIEL FINALIZAÇÃO':'Atendimento Noite / Finalização',
  'MARCUS':'Atendimento Noite','MARCUS INICIO':'Atendimento Noite / Inicio',
  'MARCUS FINALIZAÇÃO':'Atendimento Noite / Finalização',
  'ALINE':'Atendimento Dia','ALINE INICIO':'Atendimento Dia / Inicio',
  'ALINE FINALIZAÇÃO':'Atendimento Dia / Finalização',
  'DESPACHO':'Despacho Noite',
};

const CC_COLORS = ['cc-0','cc-1','cc-2','cc-3','cc-4','cc-5','cc-6','cc-7','cc-8','cc-9','cc-10','cc-11'];

/* Timers globais */
let _thanksIv = null;
let _prodIv   = null;

/* ── Colaboradores de Atendimento — persistência por tarefa ──────────────
   Esses colaboradores têm persistência individual por tarefa:
   ao marcar uma tarefa como feita, ela é salva imediatamente no banco.
   Ao retornar, as tarefas já concluídas ficam marcadas.
   A fase 1 (programação) é pulada — vão direto para a checklist de finalização.
──────────────────────────────────────────────────────────────────────── */
const ATENDIMENTO_COLABS_PERSIST = [
  'ANTONIEL','ANTONIEL INICIO','ANTONIEL FINALIZAÇÃO',
  'MARCUS','MARCUS INICIO','MARCUS FINALIZAÇÃO',
  'ALINE','ALINE INICIO','ALINE FINALIZAÇÃO',
  'DESPACHO','SANDRO','DINA'
];

function _isAtendimentoColab(nome) {
  return ATENDIMENTO_COLABS_PERSIST.includes((nome||'').toUpperCase());
}

/* Mapa de IDs dos registros já salvos no banco { tarefa_id: registro_id }
   Usado para PATCH em vez de POST ao re-confirmar */
let _atendRegistroIds = {};

/* ── Cache da tela de colaboradores ────────────────────────
   Evita re-buscar tarefas e sessões a cada navegação.
   Invalidado quando muda turno, dia, data ou após finalizar turno.
─────────────────────────────────────────────────────────── */
const _cache = {
  tarefas: null,      /* array completo de tarefas (todas) */
  sessoes: null,      /* array completo de sessoes */
  turno: null,        /* turno quando o cache foi gerado */
  dia: null,          /* dia quando o cache foi gerado */
  data: null,         /* dataTrabalho quando o cache foi gerado */
  loading: false,     /* evita double-fetch simultâneo */
};

function _cacheValido() {
  return _cache.tarefas !== null &&
         _cache.sessoes !== null &&
         _cache.turno   === S.turno &&
         _cache.dia     === S.dia &&
         _cache.data    === (S.dataTrabalho || today());
}

function _invalidarCache() {
  _cache.tarefas    = null;
  _cache.sessoes    = null;
  _cache._faltas    = null;
  _cache._registros = null;
}

/* ── Estado Global ─────────────────────────────────────── */
const S = {
  turno: null, dia: null, colaborador: null, sessaoId: null,
  dataTrabalho: null,   /* data real do trabalho (YYYY-MM-DD) — pode diferir de today() */
  tarefas: [],
  s1: {},   /* { estoque, programada, confirmed, justificativa } */
  s2: {},   /* { produzida, status, motivo } */
  leaderOk: false, leaderData: [],
  currentLeaderTab: 'registros',
  producaoIniciada: false, /* true após clicar Iniciar Produção */
};

/* ── Verificar se tarefa é do tipo "checklist" (sem qty) ── */
function isChecklist(t) {
  if (!t) return false;
  const u = (t.unidade || '').toLowerCase().trim()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, ''); /* remove acentos para comparar */
  const uOrig = (t.unidade || '').toLowerCase().trim();

  /* Verificação por igualdade exata (com e sem acento) */
  if (UNIDADES_CHECKLIST.includes(uOrig)) return true;
  if (UNIDADES_CHECKLIST.map(x =>
    x.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  ).includes(u)) return true;

  /* Sem unidade definida E quantidade zero/nula */
  if (!uOrig && (!t.quantidade_padrao || Number(t.quantidade_padrao) === 0)) return true;

  /* Quantidade explicitamente zero com unidade não numérica */
  if (Number(t.quantidade_padrao) === 0 && uOrig && !['kg','g','l','ml','un','unidade','pote','sache','saches','sachê','sachês','cx','caixa'].includes(uOrig)) return true;

  return false;
}

/* ══════════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initWorkDate();
  renderDayGrid();
  setDefaultDates();
  showScreen('screen-welcome');
  _prefetchCache();
  _checkPendenciasNotif();
});

async function _checkPendenciasNotif() {
  try {
    let todas = [];
    let pg = 1;
    while (true) {
      const r = await fetch(`tables/pendencias?limit=500&page=${pg}`);
      if (!r.ok) break;
      const j = await r.json();
      const rows = j.data || [];
      todas = todas.concat(rows);
      if (rows.length < 500) break;
      pg++;
    }
    /* Usa a data de trabalho selecionada, senão hoje */
    const dataBusca = (S.dataTrabalho) || new Date().toISOString().split('T')[0];
    /* Conta TODAS as pendências da data de trabalho que ainda não foram tratadas
       (nem vistoriadas, nem transferidas) — sem filtro de turno ou dia */
    const abertas = todas.filter(p =>
      p.data === dataBusca &&
      !(p.vistoriado == 1) &&
      !(p.transferido == 1)
    );
    _atualizarBadge(abertas.length);
  } catch(e) { /* silencioso */ }
}

function _atualizarBadge(qtd) {
  const badge = document.getElementById('badge-pendencias');
  if (!badge) return;
  if (qtd > 0) {
    badge.textContent = qtd > 99 ? '99+' : String(qtd);
    badge.style.display = 'flex';
  } else {
    badge.style.display = 'none';
  }
}

async function _prefetchCache() {
  try {
    const [rTar, rSess] = await Promise.all([
      fetch('tables/tarefas?limit=1000'),
      fetch('tables/sessoes?limit=500')
    ]);
    const jsonTar  = rTar.ok  ? await rTar.json()  : {data:[]};
    const jsonSess = rSess.ok ? await rSess.json() : {data:[]};
    _cache.tarefas = jsonTar.data  || [];
    _cache.sessoes = jsonSess.data || [];
    /* turno/dia/data ainda não foram escolhidos — define como null
       para que _cacheValido() retorne false apenas na verificação de
       turno/dia/data, e a função pule o fetch mas use os arrays já carregados */
    _cache._prefetched = true;
  } catch(e) { /* silencioso — renderCollabGrid fará o fetch normalmente */ }
}

/* ── Inicializa e gerencia a data de trabalho ── */
function initWorkDate() {
  const inp = document.getElementById('work-date-input');
  if (!inp) return;
  const hoje = today();
  inp.value = hoje;
  S.dataTrabalho = hoje;
  _updateWorkDateDisplay(hoje);
}

function onWorkDateChange() {
  const inp = document.getElementById('work-date-input');
  if (!inp) return;
  const val = inp.value || today();
  S.dataTrabalho = val;
  _invalidarCache(); /* data mudou = cache obsoleto */
  _updateWorkDateDisplay(val);
  /* Atualiza o dia da semana na grade de dias caso já esteja visível */
  renderDayGrid();
  /* Badge usa S.dataTrabalho — re-checa com nova data */
  _checkPendenciasNotif();
}

function _updateWorkDateDisplay(dateStr) {
  const el = document.getElementById('work-date-display');
  if (!el) return;
  const dt = new Date(dateStr + 'T12:00:00');
  const diasNome = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
  const mesesNome = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  const diaSemana = diasNome[dt.getDay()];
  const ehHoje = dateStr === today();
  el.innerHTML = `
    <span class="wdd-weekday">${diaSemana}</span>
    <span class="wdd-date">${dt.getDate()} ${mesesNome[dt.getMonth()]} ${dt.getFullYear()}</span>
    ${ehHoje ? '<span class="wdd-today-tag">HOJE</span>' : ''}
  `;
}

/* ══════════════════════════════════════════════════════════
   NAVEGAÇÃO
══════════════════════════════════════════════════════════ */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  const el = document.getElementById(id);
  if (el) { el.classList.remove('hidden'); el.scrollTop = 0; }
}
function goBack(to) { showScreen(to); }
function goToWelcome() {
  if (_thanksIv) { clearInterval(_thanksIv); _thanksIv = null; }
  S.turno=null; S.dia=null; S.colaborador=null; S.tarefas=[]; S.s1={}; S.s2={};
  S.producaoIniciada = false;
  /* Mantém S.dataTrabalho — o usuário pode continuar na mesma data */
  showScreen('screen-welcome');
  /* Atualiza badge ao voltar para a tela inicial */
  _checkPendenciasNotif();
}
function goToLeaderLogin() {
  if (S.leaderOk) { openLeaderPanel(); return; }
  document.getElementById('leader-password').value = '';
  document.getElementById('login-error').classList.add('hidden');
  showScreen('screen-leader-login');
}
function openLeaderPanel() {
  showScreen('screen-leader');
  S.currentLeaderTab = 'registros';
  /* Garante que a aba registros está ativa visualmente */
  ['registros','pendentes','espelho','relatorio','tarefas'].forEach(t => {
    const btn = document.getElementById(`tab-${t}`);
    const pan = document.getElementById(`leader-panel-${t}`);
    if (btn) btn.classList.toggle('active', t==='registros');
    if (pan) pan.classList.toggle('hidden', t!=='registros');
  });
  loadLeaderData();
}

/* ══════════════════════════════════════════════════════════
   TELA 1 — TURNO
══════════════════════════════════════════════════════════ */
function selectTurno(turno) {
  /* Garante que a data de trabalho está definida */
  if (!S.dataTrabalho) {
    const inp = document.getElementById('work-date-input');
    S.dataTrabalho = (inp && inp.value) ? inp.value : today();
  }
  _invalidarCache(); /* nova combinação turno/dia/data = cache obsoleto */
  S.turno = turno;

  /* Deriva o dia_semana automaticamente a partir da data de trabalho */
  const dt = new Date(S.dataTrabalho + 'T12:00:00');
  S.dia = DIA_JS_MAP[dt.getDay()];

  const chip = (turno==='dia'?'☀️':'🌙') + ' Turno ' + (turno==='dia'?'Dia':'Noite');
  document.getElementById('day-turno-chip').textContent = chip;

  /* Pré-seleciona o dia correto na grade antes de mostrar a tela */
  showScreen('screen-day');
}

/* ══════════════════════════════════════════════════════════
   TELA 2 — DIA
══════════════════════════════════════════════════════════ */
function renderDayGrid() {
  /* Usa a data de trabalho selecionada para marcar o dia correto */
  const dataTrab = S.dataTrabalho || today();
  const dtTrab   = new Date(dataTrab + 'T12:00:00');
  const diaKey   = DIA_JS_MAP[dtTrab.getDay()];       /* dia derivado da data */
  const hojeKey  = DIA_JS_MAP[new Date().getDay()];   /* dia real de hoje */
  const grid = document.getElementById('day-grid');
  if (!grid) return;
  grid.innerHTML = DIAS_LIST.map(d => {
    const isSelected = d.key === diaKey;
    const isHoje     = d.key === hojeKey && dataTrab === today();
    return `
    <button class="day-btn ${isSelected?'today':''}" onclick="selectDia('${d.key}')">
      <span class="day-icon">${d.icon}</span>
      <span>${d.short}</span>
      <span style="font-size:11px;opacity:.8">${d.label.split('-')[0]}</span>
      ${isSelected?`<span class="day-today-tag">${isHoje?'HOJE':'DATA SEL.'}</span>`:''}
    </button>`;
  }).join('');
}

async function selectDia(dia) {
  /* Guarda os dados em memória antes de invalidar */
  var tarCache  = _cache.tarefas;
  var sessCache = _cache.sessoes;
  _invalidarCache(); /* dia mudou = turno/dia/data desatualizado */
  /* Restaura os arrays de dados — só invalidamos turno/dia/data, não os dados */
  _cache.tarefas = tarCache;
  _cache.sessoes = sessCache;
  _cache._prefetched = true;
  S.dia = dia;
  /* Vai para a tela de departamento */
  _irParaDept();
}

/* ══════════════════════════════════════════════════════════
   TELA 2.5 — DEPARTAMENTO
   Fluxo: Turno → Dia → Departamento → Colaboradores
══════════════════════════════════════════════════════════ */

/** Retorna o departamento de um colaborador (PRODUCAO por padrão) */
function _getDept(nome) {
  return COLLAB_DEPT[nome.toUpperCase()] || 'PRODUCAO';
}

/**
 * Chamada por selectDia() — navega para screen-dept
 * que mostra APENAS os 3 botões de departamento.
 */
function _irParaDept() {
  var dObj = DIAS_LIST.find(function(d){ return d.key === S.dia; });
  var tc = document.getElementById('dept-turno-chip');
  var dc = document.getElementById('dept-day-chip');
  if (tc) tc.textContent = (S.turno==='dia'?'☀️':'🌙') + ' ' + (S.turno==='dia'?'Dia':'Noite');
  if (dc) dc.textContent = dObj ? dObj.short+' '+dObj.icon : S.dia;
  showScreen('screen-dept');
}

/**
 * Chamada ao clicar num botão de departamento.
 * Abre a tela de cards (screen-setor) com os colaboradores do setor.
 * Se ATENDIMENTO, pede senha antes.
 */
function _abrirSetorCards(dept) {
  if (dept === 'ATENDIMENTO') {
    _pedirSenhaSetorAtend(function() { _mostrarTelaSetor(dept); });
    return;
  }
  _mostrarTelaSetor(dept);
}

/** Exibe a tela de cards do setor e preenche o grid */
function _mostrarTelaSetor(dept) {
  _deptAtual = dept;

  var dObj = DIAS_LIST.find(function(d){ return d.key === S.dia; });
  var labelMap = { PRODUCAO:'Produção', OPERACAO:'Operação', ATENDIMENTO:'Atendimento' };
  var emojiMap = { PRODUCAO:'🏭', OPERACAO:'⚙️', ATENDIMENTO:'🎯' };
  var corMap   = { PRODUCAO:'#f97316', OPERACAO:'#16a34a', ATENDIMENTO:'#2563eb' };

  /* Atualiza chips do header */
  var tc = document.getElementById('setor-turno-chip');
  var dc = document.getElementById('setor-day-chip');
  var dp = document.getElementById('setor-dept-chip');
  if (tc) tc.textContent = (S.turno==='dia'?'☀️':'🌙') + ' ' + (S.turno==='dia'?'Dia':'Noite');
  if (dc) dc.textContent = dObj ? dObj.short+' '+dObj.icon : S.dia;
  if (dp) { dp.textContent = emojiMap[dept]+' '+labelMap[dept]; dp.style.background = corMap[dept]; }

  showScreen('screen-setor');

  /* Preenche o grid imediatamente se cache existir, senão carrega */
  var grid = document.getElementById('setor-collab-grid');
  if (!grid) return;

  if (_cache.tarefas && _cache.tarefas.length > 0 && _cache.sessoes) {
    _preencherGridSetor(grid, dept, _cache.tarefas, _cache.sessoes);
    /* Busca faltas em segundo plano e re-renderiza */
    fetch('tables/faltas?limit=200').then(r=>r.json())
      .then(function(j){ _cache._faltas = j.data||[]; _preencherGridSetor(grid, dept, _cache.tarefas, _cache.sessoes); })
      .catch(function(){});
    return;
  }

  /* Sem cache: mostra spinner, busca tudo */
  grid.innerHTML = '<div style="padding:40px;text-align:center;color:#888">'
    + '<div style="font-size:36px;animation:spin 1s linear infinite;display:inline-block">⏳</div>'
    + '<br><span style="font-size:13px;font-weight:600;margin-top:8px;display:block">Carregando...</span></div>';

  Promise.all([
    fetch('tables/tarefas?limit=1000').then(r=>r.json()),
    fetch('tables/sessoes?limit=500').then(r=>r.json()),
    fetch('tables/faltas?limit=200').then(r=>r.json())
  ]).then(function(res) {
    _cache.tarefas   = res[0].data || [];
    _cache.sessoes   = res[1].data || [];
    _cache._faltas   = res[2].data || [];
    _cache._prefetched = true;
    _preencherGridSetor(grid, dept, _cache.tarefas, _cache.sessoes);
  }).catch(function() {
    grid.innerHTML = '<div style="padding:40px;color:#dc2626;text-align:center">❌ Erro ao carregar</div>';
  });
}

/** Gera os cards de colaborador para o setor selecionado */
function _preencherGridSetor(grid, dept, todasTarefas, todasSessoes) {
  var dtTrab = S.dataTrabalho || today();

  /* Tarefas do turno+dia filtradas por dept */
  var map = {};
  todasTarefas.forEach(function(t) {
    if (t.turno === S.turno && t.dia_semana === S.dia && _getDept(t.colaborador) === dept) {
      map[t.colaborador] = (map[t.colaborador] || 0) + 1;
    }
  });

  var nomes = Object.keys(map).sort();
  if (!nomes.length) {
    grid.innerHTML = '<div style="padding:40px;text-align:center"><div style="font-size:40px">😕</div>'
      + '<strong>Nenhum colaborador neste setor hoje</strong></div>';
    return;
  }

  /* Mapa de sessões */
  var sessMap = {};
  todasSessoes.forEach(function(s) {
    if (s.data === dtTrab && s.turno === S.turno && s.dia_semana === S.dia)
      sessMap[s.colaborador_card] = s.status_geral;
  });

  /* Mapa de faltas */
  var faltaMap = {};
  (_cache._faltas || []).forEach(function(f) {
    if (f.data === dtTrab && f.turno === S.turno) faltaMap[f.colaborador] = f.tipo;
  });

  /* Progresso de Atendimento: registros já salvos (sem sessão finalizada ainda) */
  var progressoMap = {};
  if (_cache._registros) {
    var regDia = (_cache._registros || []).filter(function(reg) {
      return reg.data === dtTrab && reg.turno === S.turno && reg.dia_semana === S.dia;
    });
    regDia.forEach(function(reg) {
      var n = reg.colaborador_card;
      if (!n || !_isAtendimentoColab(n)) return;
      if (!progressoMap[n]) progressoMap[n] = { feitas: 0, total: map[n] || 0 };
      if (reg.status === 'total' || reg.status === 'parcial' || reg.status === 'nao_finalizado') {
        progressoMap[n].feitas++;
      }
    });
  }

  var cores = ['cc-0','cc-1','cc-2','cc-3','cc-4','cc-5','cc-6','cc-7','cc-8','cc-9','cc-10','cc-11'];

  grid.innerHTML = nomes.map(function(nome, i) {
    var em         = COLLAB_EMOJI[nome] || '👤';
    var setor      = COLLAB_SETOR[nome] || '';
    var cnt        = map[nome];
    var cor        = cores[i % cores.length];
    var nomeEsc    = nome.replace(/'/g, "\\'");
    var sessStatus = sessMap[nome];
    var jaFinaliz  = !!sessStatus;
    var isCompleto = sessStatus === 'completo';
    var tipoFalta  = faltaMap[nome];
    var progAtend  = progressoMap[nome];
    var emAndamento = !jaFinaliz && !tipoFalta && progAtend && progAtend.feitas > 0;

    /* Overlay de status */
    var overlay = '';
    if (tipoFalta) {
      var isNJ = tipoFalta === 'nao_justificada';
      overlay = '<div class="collab-done-overlay ' + (isNJ ? 'done-falta-nj' : 'done-falta-j') + '" style="pointer-events:none">'
              + (isNJ ? '🚫 Falta N/J' : '📋 Falta Just.') + '</div>';
    } else if (jaFinaliz) {
      overlay = '<div class="collab-done-overlay ' + (isCompleto ? 'done-100' : 'done-parcial') + '" style="pointer-events:none">'
              + (isCompleto ? '✅ Finalizado 100%' : '⚠️ Finalizado Parcial') + '</div>';
    } else if (emAndamento) {
      overlay = '<div class="collab-done-overlay done-andamento" style="pointer-events:none">'
              + '🔄 ' + progAtend.feitas + '/' + progAtend.total + ' feitas</div>';
    }

    /* Ação ao clicar */
    var acao;
    if (tipoFalta)   acao = "_gerenciarFalta('" + nomeEsc + "','" + tipoFalta + "','remover')";
    else if (jaFinaliz) acao = "_clickColab('" + nomeEsc + "','__reabrir__')";
    else             acao = "_clickColab('" + nomeEsc + "','__selecionar__')";

    /* Botão falta — só para líderes */
    var btnFalta = (S.leaderOk && !tipoFalta && !jaFinaliz)
      ? '<button class="btn-falta-card" onclick="event.stopPropagation();_abrirModalFalta(\'' + nomeEsc + '\')">🚫 Falta</button>'
      : '';

    return '<div class="collab-card-wrap" style="position:relative">'
         + '<button class="collab-card ' + cor + (jaFinaliz ? ' collab-done' : '') + (emAndamento ? ' collab-andamento' : '') + (tipoFalta ? ' collab-falta' : '') + '" onclick="' + acao + '">'
         + '<div class="collab-emoji">' + em + '</div>'
         + '<span class="collab-name">' + nome + '</span>'
         + (setor ? '<span class="collab-setor">' + setor + '</span>' : '')
         + '<span class="collab-count">📋 ' + cnt + ' tarefa' + (cnt !== 1 ? 's' : '') + '</span>'
         + overlay
         + '</button>'
         + btnFalta
         + '</div>';
  }).join('');
}

/** Modal de senha para entrar no setor Atendimento */
function _pedirSenhaSetorAtend(callback) {
  var overlay = document.getElementById('modal-collab-pw');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'modal-collab-pw';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.65);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px';
    document.body.appendChild(overlay);
  }
  overlay.innerHTML = '<div style="background:#fff;border-radius:20px;padding:28px 24px;width:100%;max-width:340px;box-shadow:0 20px 60px rgba(0,0,0,.4);font-family:inherit">'
    + '<div style="text-align:center;margin-bottom:18px">'
    + '<div style="font-size:40px">🎯</div>'
    + '<h2 style="font-size:17px;font-weight:900;margin:8px 0 2px">Atendimento</h2>'
    + '<p style="font-size:12px;color:#6b7280">Digite a senha para acessar</p>'
    + '</div>'
    + '<div style="position:relative;margin-bottom:14px">'
    + '<input id="cpw-input" type="password" placeholder="Senha..." '
    + 'style="width:100%;padding:12px 44px 12px 14px;border:2px solid #e2e6f0;border-radius:12px;font-size:15px;font-family:inherit;outline:none;box-sizing:border-box" />'
    + '<button type="button" onclick="_cpwToggle()" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;font-size:18px;padding:4px">👁️</button>'
    + '</div>'
    + '<p id="cpw-err" style="color:#dc2626;font-size:12px;font-weight:700;text-align:center;min-height:18px;margin:0 0 12px"></p>'
    + '<div style="display:flex;gap:10px">'
    + '<button onclick="_cpwFechar()" style="flex:1;padding:12px;border-radius:12px;border:2px solid #e2e6f0;background:#f9fafb;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer;color:#374151">Cancelar</button>'
    + '<button id="cpw-ok" onclick="_confirmarSenhaSetor()" style="flex:2;padding:12px;border-radius:12px;border:none;background:linear-gradient(135deg,#4f8ef7,#2563eb);font-family:inherit;font-size:13px;font-weight:800;cursor:pointer;color:#fff">Entrar 🎯</button>'
    + '</div></div>';
  overlay.style.display = 'flex';
  /* Guarda o callback para usar após confirmação */
  overlay._callback = callback;
  setTimeout(function() { var i = document.getElementById('cpw-input'); if (i) i.focus(); }, 100);
}

function _confirmarSenhaSetor() {
  var inp = document.getElementById('cpw-input');
  var err = document.getElementById('cpw-err');
  if (!inp) return;
  if (inp.value !== DEPT_PASSWORD['ATENDIMENTO']) {
    if (err) err.textContent = '❌ Senha incorreta!';
    inp.value = '';
    inp.focus();
    return;
  }
  var overlay = document.getElementById('modal-collab-pw');
  var cb = overlay ? overlay._callback : null;
  _cpwFechar();
  if (cb) cb();
}

/**
 * Preenche um grid de departamento com botões dos colaboradores.
 * Busca tarefas, sessões e faltas do dia, depois renderiza.
 */
function _popularGridDept(dept, gridId) {
  var grid = document.getElementById(gridId);
  if (!grid) return;

  var dtTrab = S.dataTrabalho || today();

  /* Se já temos tudo em cache, renderiza na hora */
  if (_cache.tarefas && _cache.tarefas.length > 0 && _cache.sessoes) {
    _preencherGridDept(dept, grid, _cache.tarefas, _cache.sessoes, dtTrab);
    return;
  }

  grid.innerHTML = '<div style="padding:16px;text-align:center;color:#888;font-size:13px">⏳ Carregando...</div>';

  var pTar  = (_cache.tarefas && _cache.tarefas.length > 0)
              ? Promise.resolve(_cache.tarefas)
              : fetch('tables/tarefas?limit=1000').then(function(r){return r.json();}).then(function(j){ _cache.tarefas = j.data||[]; return _cache.tarefas; });

  var pSess = (_cache.sessoes)
              ? Promise.resolve(_cache.sessoes)
              : fetch('tables/sessoes?limit=500').then(function(r){return r.json();}).then(function(j){ _cache.sessoes = j.data||[]; return _cache.sessoes; });

  Promise.all([pTar, pSess])
    .then(function(res){
      _preencherGridDept(dept, grid, res[0], res[1], dtTrab);
    })
    .catch(function(){
      grid.innerHTML = '<div style="padding:16px;color:#dc2626;font-size:13px">❌ Erro ao carregar</div>';
    });
}

/** Gera os cards de colaborador para um grid de departamento (com overlays de status) */
function _preencherGridDept(dept, grid, todasTarefas, todasSessoes, dtTrab) {
  /* Filtra tarefas do turno+dia atual */
  var tarDia = todasTarefas.filter(function(t){
    return t.turno === S.turno && t.dia_semana === S.dia;
  });

  /* Agrupa por colaborador filtrando pelo dept */
  var map = {};
  tarDia.forEach(function(t){
    if (_getDept(t.colaborador) === dept) {
      map[t.colaborador] = (map[t.colaborador] || 0) + 1;
    }
  });

  var nomes = Object.keys(map).sort();
  if (!nomes.length) {
    grid.innerHTML = '<div style="padding:12px 0 4px;text-align:center;color:#aaa;font-size:12px">Sem colaboradores hoje</div>';
    return;
  }

  /* Mapa de status de sessão */
  var sessMap = {};
  (todasSessoes||[]).filter(function(s){
    return s.data === dtTrab && s.turno === S.turno && s.dia_semana === S.dia;
  }).forEach(function(s){ sessMap[s.colaborador_card] = s.status_geral; });

  /* Faltas do dia (usa cache local) */
  var faltaMap = {};
  if (_cache._faltas) {
    _cache._faltas.forEach(function(f){
      if (f.data === dtTrab && f.turno === S.turno) faltaMap[f.colaborador] = f.tipo;
    });
  }

  var cores = ['cc-0','cc-1','cc-2','cc-3','cc-4','cc-5','cc-6','cc-7','cc-8','cc-9','cc-10','cc-11'];

  grid.innerHTML = nomes.map(function(nome, i){
    var em    = COLLAB_EMOJI[nome] || '👤';
    var setor = COLLAB_SETOR[nome] || '';
    var cnt   = map[nome];
    var cor   = cores[i % cores.length];
    var nomeEsc     = nome.replace(/'/g,"\\'");
    var sessStatus  = sessMap[nome];
    var jaFinaliz   = !!sessStatus;
    var isCompleto  = sessStatus === 'completo';
    var tipoFalta   = faltaMap[nome];

    /* Overlay de status */
    var overlay = '';
    if (tipoFalta) {
      var isNJ = tipoFalta === 'nao_justificada';
      overlay = '<div class="collab-done-overlay ' + (isNJ?'done-falta-nj':'done-falta-j') + '" style="pointer-events:none">'
              + (isNJ ? '\uD83D\uDEB3 Falta N/J' : '\uD83D\uDCCB Falta Just.')
              + '</div>';
    } else if (jaFinaliz) {
      overlay = '<div class="collab-done-overlay ' + (isCompleto?'done-100':'done-parcial') + '" style="pointer-events:none">'
              + (isCompleto ? '\u2705 Finalizado 100%' : '\u26A0\uFE0F Finalizado Parcial')
              + '</div>';
    }

    /* Ação ao clicar */
    var acao;
    if (tipoFalta) {
      acao = "_gerenciarFalta('" + nomeEsc + "','" + tipoFalta + "','remover')";
    } else if (jaFinaliz) {
      acao = "_clickColab('" + nomeEsc + "','__reabrir__')";
    } else {
      acao = "_clickColab('" + nomeEsc + "','__selecionar__')";
    }

    /* Botão falta (só líderes) */
    var btnFalta = (S.leaderOk && !tipoFalta && !jaFinaliz)
      ? '<button class="btn-falta-card" title="Registrar falta" onclick="event.stopPropagation();_abrirModalFalta(\'' + nomeEsc + '\')">\uD83D\uDEB3 Falta</button>'
      : '';

    return '<div class="collab-card-wrap" style="position:relative">'
         + '<button class="collab-card ' + cor + (jaFinaliz?' collab-done':'') + (tipoFalta?' collab-falta':'') + '" onclick="' + acao + '">'
         + '<div class="collab-emoji">' + em + '</div>'
         + '<span class="collab-name">' + nome + '</span>'
         + (setor ? '<span class="collab-setor">' + setor + '</span>' : '')
         + '<span class="collab-count">\uD83D\uDCCB ' + cnt + ' tarefa' + (cnt!==1?'s':'') + '</span>'
         + overlay
         + '</button>'
         + btnFalta
         + '</div>';
  }).join('');
}

/**
 * Clique no cabeçalho do departamento Atendimento — pede senha
 * se ainda não desbloqueado, ou fecha se já aberto.
 */
function _toggleAtendimento() {
  var grid = document.getElementById('dept-collab-atendimento');
  if (!grid) return;
  var aberto = grid.style.display !== 'none';
  if (aberto) {
    /* Fecha */
    grid.style.display = 'none';
    var ico = document.getElementById('dept-atend-emoji');
    if (ico) ico.textContent = '\uD83D\uDD12';
    var badge = document.getElementById('dept-atend-badge');
    if (badge) badge.textContent = 'Toque para desbloquear';
    return;
  }
  /* Abre com senha */
  _pedirSenhaAtendimento();
}

/** Modal de senha para o departamento Atendimento */
function _pedirSenhaAtendimento() {
  var overlay = document.getElementById('modal-collab-pw');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'modal-collab-pw';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.65);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px';
    document.body.appendChild(overlay);
  }
  overlay.innerHTML = '<div style="background:#fff;border-radius:20px;padding:28px 24px;width:100%;max-width:340px;box-shadow:0 20px 60px rgba(0,0,0,.4);font-family:inherit">'
    + '<div style="text-align:center;margin-bottom:18px">'
    + '<div style="font-size:40px">\uD83C\uDFAF</div>'
    + '<h2 style="font-size:17px;font-weight:900;margin:8px 0 2px">Atendimento</h2>'
    + '<p style="font-size:12px;color:#6b7280">Digite a senha para acessar</p>'
    + '</div>'
    + '<div style="position:relative;margin-bottom:14px">'
    + '<input id="cpw-input" type="password" placeholder="Senha..." '
    + 'style="width:100%;padding:12px 44px 12px 14px;border:2px solid #e2e6f0;border-radius:12px;font-size:15px;font-family:inherit;outline:none;box-sizing:border-box" '
    + 'onkeydown="if(event.key===\'Enter\') _confirmarSenhaAtendimento()" />'
    + '<button type="button" onclick="_cpwToggle()" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;font-size:18px;padding:4px">\uD83D\uDC41\uFE0F</button>'
    + '</div>'
    + '<p id="cpw-err" style="color:#dc2626;font-size:12px;font-weight:700;text-align:center;min-height:18px;margin:0 0 12px"></p>'
    + '<div style="display:flex;gap:10px">'
    + '<button onclick="_cpwFechar()" style="flex:1;padding:12px;border-radius:12px;border:2px solid #e2e6f0;background:#f9fafb;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer;color:#374151">Cancelar</button>'
    + '<button id="cpw-ok" onclick="_confirmarSenhaAtendimento()" style="flex:2;padding:12px;border-radius:12px;border:none;background:linear-gradient(135deg,#4f8ef7,#2563eb);font-family:inherit;font-size:13px;font-weight:800;cursor:pointer;color:#fff">Entrar \uD83C\uDFAF</button>'
    + '</div></div>';
  overlay.style.display = 'flex';
  setTimeout(function(){ var i = document.getElementById('cpw-input'); if(i) i.focus(); }, 100);
}

/** Valida senha e desbloqueia o grid de atendimento */
function _confirmarSenhaAtendimento() {
  var inp = document.getElementById('cpw-input');
  var err = document.getElementById('cpw-err');
  if (!inp) return;
  if (inp.value !== DEPT_PASSWORD['ATENDIMENTO']) {
    if (err) err.textContent = '❌ Senha incorreta!';
    inp.value = '';
    inp.focus();
    return;
  }
  _cpwFechar();
  /* Desbloqueia visualmente */
  var ico = document.getElementById('dept-atend-emoji');
  if (ico) ico.textContent = '\uD83C\uDFAF';
  var badge = document.getElementById('dept-atend-badge');
  if (badge) badge.textContent = 'Desbloqueado';
  /* Preenche e exibe o grid */
  var grid = document.getElementById('dept-collab-atendimento');
  if (grid) {
    grid.style.display = 'grid';
    _preencherGridDept('ATENDIMENTO', grid, _cache.tarefas || []);
  }
}

/* ══════════════════════════════════════════════════════════
   TELA 3 — COLABORADOR (com status do dia)
══════════════════════════════════════════════════════════ */
async function renderCollabGrid() {
  const grid = document.getElementById('collab-grid');

  /* ── Cache totalmente válido: renderiza instantâneo ── */
  if (_cacheValido()) {
    _renderCollabGridComDados(_cache.tarefas, _cache.sessoes);
    return;
  }

  /* ── Prefetch já trouxe tarefas: só falta sessões (ou já tem tudo) ── */
  if (_cache._prefetched && _cache.tarefas !== null) {
    /* Tarefas já estão em memória; sessões podem estar desatualizadas.
       Rebusca apenas sessões (muito menor = rápido) sem mostrar spinner de tarefas */
    if (_cache.sessoes === null) {
      /* Spinner leve enquanto busca só sessões */
      grid.innerHTML = '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;color:#888;display:flex;flex-direction:column;align-items:center;gap:12px"><div style="font-size:32px;animation:spin .8s linear infinite;display:inline-block">🔄</div><span style="font-weight:600;font-size:13px">Atualizando...</span></div>';
      try {
        const _rs = await fetch('tables/sessoes?limit=500');
        const _rj = _rs.ok ? await _rs.json() : {data:[]};
        _cache.sessoes = _rj.data || [];
      } catch(e) { _cache.sessoes = []; }
    }
    _cache.turno = S.turno;
    _cache.dia   = S.dia;
    _cache.data  = S.dataTrabalho || today();
    _renderCollabGridComDados(_cache.tarefas, _cache.sessoes);
    return;
  }

  /* ── Sem nada em cache: busca completa com spinner ── */
  grid.innerHTML = '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;color:#888;display:flex;flex-direction:column;align-items:center;gap:12px"><div style="font-size:40px;animation:spin 1s linear infinite;display:inline-block">⏳</div><span style="font-weight:700;font-size:15px">Carregando...</span></div>';

  try {
    const [rTar2, rSess2] = await Promise.all([
      fetch('tables/tarefas?limit=1000'),
      fetch('tables/sessoes?limit=500')
    ]);
    const jsonTar  = rTar2.ok  ? await rTar2.json()  : {data:[]};
    const jsonSess = rSess2.ok ? await rSess2.json() : {data:[]};
    _cache.tarefas     = jsonTar.data  || [];
    _cache.sessoes     = jsonSess.data || [];
    _cache.turno       = S.turno;
    _cache.dia         = S.dia;
    _cache.data        = S.dataTrabalho || today();
    _cache._prefetched = true;

    _renderCollabGridComDados(_cache.tarefas, _cache.sessoes);
  } catch(e) {
    console.error(e);
    grid.innerHTML = '<div style="padding:40px;color:#dc3545;text-align:center">❌ Erro ao carregar</div>';
  }
}

/* Renderiza o grid usando dados já em memória (sem fetch) */
async function _renderCollabGridComDados(todasTarefas, todasSessoes) {
  const grid = document.getElementById('collab-grid');

  const all = todasTarefas.filter(t=>t.turno===S.turno && t.dia_semana===S.dia);

  /* Sessões do dia */
  const _dtTrab = S.dataTrabalho || today();
  const todaySessions = todasSessoes.filter(s=>s.data===_dtTrab && s.turno===S.turno && s.dia_semana===S.dia);
  const sessMap = {};
  todaySessions.forEach(s=>{ sessMap[s.colaborador_card] = s.status_geral; });

  /* ── Busca faltas do dia para marcar cards ── */
  let faltasHoje = [];
  try {
    const _rF = await fetch('tables/faltas?limit=200');
    const jF = _rF.ok ? await _rF.json() : {data:[]};
    faltasHoje = (jF.data||[]).filter(f=>f.data===_dtTrab && f.turno===S.turno);
  } catch(e){ /* silencioso */ }
  const faltaMap = {};
  faltasHoje.forEach(f=>{ faltaMap[f.colaborador] = f.tipo; });

  const map = {};
  all.forEach(t=>{ if(!map[t.colaborador]) map[t.colaborador]=0; map[t.colaborador]++; });

  /* Filtra pelo departamento selecionado */
  const listFull = Object.entries(map).sort((a,b)=>a[0].localeCompare(b[0]));
  const list = listFull.filter(([nome]) => _getDept(nome) === (_deptAtual || 'PRODUCAO'));

  if (!list.length) {
    const deptLabel = {PRODUCAO:'Produção',OPERACAO:'Operação',ATENDIMENTO:'Atendimento'}[_deptAtual]||_deptAtual;
    grid.innerHTML = `<div style="padding:40px;text-align:center"><div style="font-size:48px">😕</div><strong>Nenhum colaborador em ${deptLabel} hoje</strong></div>`;
    return;
  }

  grid.innerHTML = list.map(([nome, cnt], i) => {
    const em    = COLLAB_EMOJI[nome]||'👤';
    const setor = COLLAB_SETOR[nome]||'';
    const color = CC_COLORS[i%CC_COLORS.length];
    const sessStatus   = sessMap[nome];
    const jaFinalizado = !!sessStatus;
    const isCompleto   = sessStatus === 'completo';
    const iniciado     = S.producaoIniciada && S.colaborador === nome && !jaFinalizado;
    const tipoFalta    = faltaMap[nome]; /* 'justificada' | 'nao_justificada' | undefined */
    const nomeEsc      = nome.replace(/'/g,"\\'");

    let overlay = '';
    if (tipoFalta) {
      const isNJ = tipoFalta === 'nao_justificada';
      overlay = `<div class="collab-done-overlay ${isNJ?'done-falta-nj':'done-falta-j'}" style="pointer-events:none">
        ${isNJ?'🚫 Falta N/J':'📋 Falta Just.'}
      </div>`;
    } else if (jaFinalizado) {
      overlay = `<div class="collab-done-overlay ${isCompleto?'done-100':'done-parcial'}" style="pointer-events:none">
        ${isCompleto?'✅ Finalizado 100%':'⚠️ Finalizado Parcial'}
      </div>`;
    } else if (iniciado) {
      overlay = `<div class="collab-done-overlay" style="background:#1565C0;color:#fff;pointer-events:none">
        🔄 Em Produção
      </div>`;
    }

    /* Ação ao clicar no card */
    let clickAction;
    if (tipoFalta) {
      /* Card com falta: líder pode remover a falta */
      clickAction = `_gerenciarFalta('${nomeEsc}','${tipoFalta}','remover')`;
    } else if (jaFinalizado) {
      clickAction = `_clickColab('${nomeEsc}','__reabrir__')`;
    } else if (iniciado) {
      clickAction = `_clickColab('${nomeEsc}','__retornar__')`;
    } else {
      clickAction = `_clickColab('${nomeEsc}','__selecionar__')`;
    }

    /* Botão falta — visível apenas para líderes, não aparece se já tem falta */
    const btnFalta = (S.leaderOk && !tipoFalta && !jaFinalizado) ? `
      <button class="btn-falta-card" title="Registrar falta"
        onclick="event.stopPropagation();_abrirModalFalta('${nomeEsc}')">
        🚫 Falta
      </button>` : '';

    return `
      <div class="collab-card-wrap" style="position:relative">
        <button class="collab-card ${color} ${jaFinalizado?'collab-done':''} ${tipoFalta?'collab-falta':''}"
                onclick="${clickAction}">
          <div class="collab-emoji">${em}</div>
          <span class="collab-name">${nome}</span>
          ${setor?`<span class="collab-setor">${setor}</span>`:''}
          <span class="collab-count">📋 ${cnt} tarefa${cnt!==1?'s':''}</span>
          ${overlay}
        </button>
        ${btnFalta}
      </div>`;
  }).join('');
}

/* ══════════════════════════════════════════════════════════
   REGISTRO DE FALTAS
══════════════════════════════════════════════════════════ */
function _abrirModalFalta(nome) {
  let ov = document.getElementById('modal-falta');
  if (!ov) {
    ov = document.createElement('div');
    ov.id = 'modal-falta';
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.65);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px';
    ov.innerHTML = `
      <div style="background:#fff;border-radius:18px;padding:28px 24px;width:100%;max-width:360px;
                  box-shadow:0 20px 60px rgba(0,0,0,.4);font-family:inherit">
        <div style="text-align:center;margin-bottom:16px">
          <div style="font-size:38px">🚫</div>
          <h2 id="flt-nome" style="font-size:17px;font-weight:900;margin:6px 0 4px"></h2>
          <p style="font-size:12px;color:#6b7280">Registrar falta para este colaborador</p>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px">
          <button id="flt-nj" onclick="_confirmarFalta('nao_justificada')"
            style="padding:14px;border-radius:12px;border:2px solid #dc2626;background:#fee2e2;
                   font-family:inherit;font-size:13px;font-weight:800;cursor:pointer;color:#991b1b;text-align:left">
            🚫 Falta NÃO Justificada
            <div style="font-size:11px;font-weight:600;color:#b91c1c;margin-top:3px">Peso 2× no score de premiação</div>
          </button>
          <button id="flt-j" onclick="_confirmarFalta('justificada')"
            style="padding:14px;border-radius:12px;border:2px solid #e6a800;background:#fff8e1;
                   font-family:inherit;font-size:13px;font-weight:800;cursor:pointer;color:#92400e;text-align:left">
            📋 Falta Justificada
            <div style="font-size:11px;font-weight:600;color:#b45309;margin-top:3px">Peso 1× (impacto reduzido)</div>
          </button>
        </div>
        <div style="margin-bottom:14px">
          <label style="font-size:11px;font-weight:800;color:#6b7280;text-transform:uppercase;letter-spacing:.5px">Justificativa (opcional)</label>
          <textarea id="flt-just" rows="2" placeholder="Ex: atestado médico, emergência..."
            style="width:100%;margin-top:6px;padding:10px;border:2px solid #e2e6f0;border-radius:10px;
                   font-family:inherit;font-size:13px;resize:none;outline:none;box-sizing:border-box"></textarea>
        </div>
        <button onclick="_fecharModalFalta()"
          style="width:100%;padding:11px;background:#f0f2f8;color:#6b7280;border:1px solid #e2e6f0;
                 border-radius:10px;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer">
          Cancelar
        </button>
      </div>`;
    document.body.appendChild(ov);
  }
  /* Guarda o nome no dataset do overlay */
  ov.dataset.colaborador = nome;
  document.getElementById('flt-nome').textContent = (COLLAB_EMOJI[nome]||'👤') + ' ' + nome;
  document.getElementById('flt-just').value = '';
  ov.style.display = 'flex';
}

function _fecharModalFalta() {
  const o = document.getElementById('modal-falta');
  if(o) o.style.display = 'none';
}

async function _confirmarFalta(tipo) {
  const ov   = document.getElementById('modal-falta');
  const nome = ov?.dataset?.colaborador;
  const just = document.getElementById('flt-just')?.value?.trim() || '';
  if(!nome) return;

  /* Desabilita botões enquanto salva */
  ['flt-nj','flt-j'].forEach(id=>{ const b=document.getElementById(id); if(b) b.disabled=true; });

  try {
    const body = {
      id:           'flt-' + Date.now(),
      data:         S.dataTrabalho || today(),
      turno:        S.turno || 'dia',
      dia_semana:   S.dia   || '',
      colaborador:  nome,
      tipo,
      justificativa: just,
      registrado_por: 'lider',
      hora_registro:  new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})
    };
    await postFalta(body);
    _fecharModalFalta();
    showToast(`🚫 Falta ${tipo==='nao_justificada'?'NÃO justificada':'justificada'} registrada para ${nome}`);
    _irParaDept();
  } catch(e) {
    showToast('❌ Erro ao registrar falta: ' + e.message);
  } finally {
    ['flt-nj','flt-j'].forEach(id=>{ const b=document.getElementById(id); if(b) b.disabled=false; });
  }
}

async function _gerenciarFalta(nome, tipo, acao) {
  if(acao !== 'remover') return;
  if(!S.leaderOk){ showToast('⚠️ Apenas o líder pode remover faltas.'); return; }
  const tipoLabel = tipo==='nao_justificada'?'NÃO justificada':'justificada';
  if(!confirm(`Remover a falta ${tipoLabel} de ${nome}?`)) return;
  try {
    /* Busca a falta do dia */
    const dt = S.dataTrabalho || today();
    const _rf = await fetch('tables/faltas?limit=200');
    const _jf = _rf.ok ? await _rf.json() : {data:[]};
    const falta = (_jf.data||[]).find(f=>f.colaborador===nome && f.data===dt && f.turno===S.turno);
    if(!falta){ showToast('Falta não encontrada.'); return; }
    await fetch(`tables/faltas/${falta.id}`, {method:'DELETE'});
    showToast(`✅ Falta de ${nome} removida.`);
    _irParaDept();
  } catch(e) {
    showToast('❌ Erro ao remover falta: ' + e.message);
  }
}

/* ══════════════════════════════════════════════════════════
   TELA 3→4 — Seleciona colaborador e vai para ETAPA 1
══════════════════════════════════════════════════════════ */
/* ─── Ponto único de entrada para clique nos cards ──────────
   Garante que Dina/Sandro sempre peçam senha, independente do
   estado do turno (finalizado, em produção ou aguardando).
──────────────────────────────────────────────────────────── */
function _clickColab(nome, acao) {
  const temSenha = !!COLLAB_PASSWORDS[nome.toUpperCase()];
  if (acao === '__reabrir__') {
    /* Card finalizado: usa o mesmo modal de senha do _pedirSenhaColab.
       - Se o colaborador tem senha própria (Dina/Sandro): pede a senha DELES primeiro,
         depois pede a senha do líder via outro modal.
       - Se não tem senha própria: pede direto a senha do líder usando _pedirSenhaColab
         com a senha do líder injetada temporariamente. */
    if (temSenha) {
      /* Sandro/Dina: pede senha deles → depois pede senha do líder */
      _pedirSenhaColab(nome, () => _pedirSenhaLiderParaReabrir(nome));
    } else {
      /* Colaborador comum: pede só a senha do líder usando o mesmo modal */
      _pedirSenhaLiderParaReabrir(nome);
    }
    return;
  }
  if (temSenha) {
    _pedirSenhaColab(nome, () => _executarAcaoColab(nome, acao));
  } else {
    _executarAcaoColab(nome, acao);
  }
}
function _executarAcaoColab(nome, acao) {
  if (acao === '__retornar__') {
    retornarStep2();
  } else if (acao === '__selecionar__') {
    selectColaborador(nome);
  } else if (acao.startsWith('__toast__')) {
    showToast(acao.replace('__toast__',''));
  } else {
    selectColaborador(nome);
  }
}

/* ─── Pede senha do líder via modal _pedirSenhaColab e reabre o turno ────
   Reutiliza exatamente o mesmo visual/lógica dos cards de Sandro/Dina.
   A senha do líder é injetada temporariamente no mapa COLLAB_PASSWORDS
   usando uma chave especial "__lider__" para não afetar outros colaboradores.
──────────────────────────────────────────────────────────────────────── */
function _pedirSenhaLiderParaReabrir(nome) {
  const SENHA_LIDER = 'lider123*';
  const CHAVE_TEMP  = '__LIDER_REABRIR__';
  /* Injeta senha temporária para que _pedirSenhaColab funcione */
  COLLAB_PASSWORDS[CHAVE_TEMP] = SENHA_LIDER;

  /* Reutiliza _pedirSenhaColab com nome de exibição correto mas chave da senha especial */
  let overlay = document.getElementById('modal-collab-pw');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'modal-collab-pw';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px';
    overlay.innerHTML = `
      <div style="background:#fff;border-radius:18px;padding:32px 28px;width:100%;max-width:340px;
                  box-shadow:0 20px 60px rgba(0,0,0,0.35);text-align:center;font-family:inherit">
        <div style="font-size:42px;margin-bottom:6px">🔐</div>
        <h2 id="cpw-nome" style="font-size:18px;font-weight:900;color:#1a1d2e;margin-bottom:4px"></h2>
        <p style="font-size:12px;color:#6b7280;margin-bottom:20px">Digite a senha para acessar</p>
        <div style="position:relative;margin-bottom:12px">
          <input id="cpw-input" type="password" placeholder="Senha..."
            style="width:100%;padding:11px 40px 11px 14px;border:2px solid #dde1ed;border-radius:10px;
                   font-size:15px;font-family:inherit;outline:none;box-sizing:border-box;"
            onfocus="this.style.borderColor='#e6a800'" onblur="this.style.borderColor='#dde1ed'"/>
          <button onclick="_cpwToggle()" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);
            background:none;border:none;cursor:pointer;font-size:15px;color:#6b7280">👁️</button>
        </div>
        <p id="cpw-err" style="color:#dc2626;font-size:12px;font-weight:700;margin-bottom:10px;display:none">❌ Senha incorreta!</p>
        <button id="cpw-ok" style="width:100%;background:#e6a800;color:#fff;border:none;
          padding:12px;border-radius:10px;font-size:15px;font-weight:800;cursor:pointer;font-family:inherit;margin-bottom:8px">
          🚀 Entrar
        </button>
        <button onclick="_cpwFechar()" style="width:100%;background:#f0f2f8;color:#6b7280;border:1px solid #dde1ed;
          padding:10px;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit">
          Cancelar
        </button>
      </div>`;
    document.body.appendChild(overlay);
  }

  document.getElementById('cpw-nome').textContent = `🔓 Reabrir turno de ${nome}`;
  const inp = document.getElementById('cpw-input');
  document.getElementById('cpw-err').style.display = 'none';
  overlay.style.display = 'flex';

  /* Clona input e botão para limpar listeners antigos */
  const newInp = inp.cloneNode(true);
  inp.parentNode.replaceChild(newInp, inp);
  newInp.value = ''; newInp.type = 'password';
  newInp.onfocus = function(){ this.style.borderColor='#e6a800'; };
  newInp.onblur  = function(){ this.style.borderColor='#dde1ed'; };
  setTimeout(() => newInp.focus(), 80);

  const okBtn = document.getElementById('cpw-ok');
  const newBtn = okBtn.cloneNode(true);
  okBtn.parentNode.replaceChild(newBtn, okBtn);

  const _confirm = async () => {
    if (newInp.value === SENHA_LIDER) {
      /* Feedback imediato ANTES de qualquer await */
      newBtn.disabled = true;
      newBtn.innerHTML = '⏳ Abrindo...';
      newInp.disabled = true;
      overlay.style.display = 'none';                       /* fecha modal na hora */
      const loadEl = document.getElementById('loading-overlay');
      if (loadEl) loadEl.style.display = 'flex';            /* spinner imediato */
      delete COLLAB_PASSWORDS[CHAVE_TEMP];
      await _executarReabertura(nome);
    } else {
      const err = document.getElementById('cpw-err');
      err.style.display = 'block';
      newInp.style.borderColor = '#dc2626';
      setTimeout(() => { err.style.display='none'; newInp.style.borderColor='#dde1ed'; }, 2000);
    }
  };
  newBtn.addEventListener('click', _confirm);
  newInp.addEventListener('keydown', (e) => { if (e.key === 'Enter') _confirm(); });
}

/* ─── Executa efetivamente a reabertura do turno (apaga sessão + pendências) ─ */
async function _executarReabertura(nome) {
  /* Garante loading overlay visível (pode já estar ativo se chamado de _confirm) */
  const loadEl = document.getElementById('loading-overlay');
  if (loadEl && loadEl.style.display !== 'flex') loadEl.style.display = 'flex';
  try {
    const dtTrab = S.dataTrabalho || today();
    let pgS=1, allSess=[];
    while(true){ const r=await fetch(`tables/sessoes?limit=500&page=${pgS}`); if(!r.ok) break; const j=await r.json(); allSess=allSess.concat(j.data||[]); if((j.data||[]).length<500) break; pgS++; }
    let pgP=1, allPend=[];
    while(true){ const r=await fetch(`tables/pendencias?limit=500&page=${pgP}`); if(!r.ok) break; const j=await r.json(); allPend=allPend.concat(j.data||[]); if((j.data||[]).length<500) break; pgP++; }
    let pgR=1, allReg=[];
    while(true){ const r=await fetch(`tables/registros?limit=500&page=${pgR}`); if(!r.ok) break; const j=await r.json(); allReg=allReg.concat(j.data||[]); if((j.data||[]).length<500) break; pgR++; }

    const sessoes = allSess.filter(s =>
      (s.colaborador_card === nome || s.colaborador_nome === nome) && s.data === dtTrab
    );
    const sessaoIds = sessoes.map(s => s.id);
    for (const s of sessoes) { await fetch(`tables/sessoes/${s.id}`,{method:'DELETE'}); }

    const pendsDoCola = allPend.filter(p =>
      (p.colaborador === nome || p.colaborador_card === nome) &&
      p.data === dtTrab &&
      (sessaoIds.length === 0 || sessaoIds.includes(p.sessao_id))
    );
    for (const p of pendsDoCola) { await fetch(`tables/pendencias/${p.id}`,{method:'DELETE'}); }

    if (_isAtendimentoColab(nome)) {
      const regsDoColab = allReg.filter(r =>
        (r.colaborador_card === nome || r.colaborador_nome === nome) && r.data === dtTrab
      );
      for (const r of regsDoColab) { await fetch(`tables/registros/${r.id}`,{method:'DELETE'}); }
    }
    _cache.sessoes    = null;
    _cache.tarefas    = null;
    _cache._registros = null;
    _cache._prefetched = false;
    if (loadEl) loadEl.style.display = 'none';
    showToast(`✅ Turno de ${nome} reaberto! Dados do turno removidos.`);
    _irParaDept();
  } catch(e) {
    if (loadEl) loadEl.style.display = 'none';
    showToast('❌ Erro ao reabrir: ' + e.message);
  }
}

/* ─── Verificação de senha do colaborador ─────────────────
   Se o colaborador tem senha definida, abre modal de pin antes
   de prosseguir. Caso contrário, chama selectColaborador direto.
──────────────────────────────────────────────────────────── */
function _pedirSenhaColab(nome, callback) {
  const senha = COLLAB_PASSWORDS[nome.toUpperCase()];
  if (!senha) { selectColaborador(nome); return; }

  /* Cria / reutiliza modal */
  let overlay = document.getElementById('modal-collab-pw');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'modal-collab-pw';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px';
    overlay.innerHTML = `
      <div style="background:#fff;border-radius:18px;padding:32px 28px;width:100%;max-width:340px;
                  box-shadow:0 20px 60px rgba(0,0,0,0.35);text-align:center;font-family:inherit">
        <div style="font-size:42px;margin-bottom:6px">🔐</div>
        <h2 id="cpw-nome" style="font-size:18px;font-weight:900;color:#1a1d2e;margin-bottom:4px"></h2>
        <p style="font-size:12px;color:#6b7280;margin-bottom:20px">Digite a senha para acessar</p>
        <div style="position:relative;margin-bottom:12px">
          <input id="cpw-input" type="password" placeholder="Senha..."
            style="width:100%;padding:11px 40px 11px 14px;border:2px solid #dde1ed;border-radius:10px;
                   font-size:15px;font-family:inherit;outline:none;box-sizing:border-box;"
            onfocus="this.style.borderColor='#e6a800'" onblur="this.style.borderColor='#dde1ed'"/>
          <button onclick="_cpwToggle()" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);
            background:none;border:none;cursor:pointer;font-size:15px;color:#6b7280">👁️</button>
        </div>
        <p id="cpw-err" style="color:#dc2626;font-size:12px;font-weight:700;margin-bottom:10px;display:none">❌ Senha incorreta!</p>
        <button id="cpw-ok" style="width:100%;background:#e6a800;color:#fff;border:none;
          padding:12px;border-radius:10px;font-size:15px;font-weight:800;cursor:pointer;font-family:inherit;margin-bottom:8px">
          🚀 Entrar
        </button>
        <button onclick="_cpwFechar()" style="width:100%;background:#f0f2f8;color:#6b7280;border:1px solid #dde1ed;
          padding:10px;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit">
          Cancelar
        </button>
      </div>`;
    document.body.appendChild(overlay);
  }

  /* Preenche nome e reseta estado */
  document.getElementById('cpw-nome').textContent = nome;
  const inp = document.getElementById('cpw-input');
  inp.value = '';
  inp.type  = 'password';
  document.getElementById('cpw-err').style.display = 'none';
  overlay.style.display = 'flex';
  setTimeout(() => inp.focus(), 80);

  /* Confirmar — usa callback se fornecido, senão selectColaborador */
  const _cb = typeof callback === 'function' ? callback : () => selectColaborador(nome);
  const okBtn = document.getElementById('cpw-ok');
  /* Remove listeners antigos clonando o botão E o input (keydown acumulado) */
  const newBtn = okBtn.cloneNode(true);
  okBtn.parentNode.replaceChild(newBtn, okBtn);
  const newInp = inp.cloneNode(true);
  inp.parentNode.replaceChild(newInp, inp);
  newInp.value = '';
  newInp.type  = 'password';
  newInp.onfocus = function(){ this.style.borderColor='#e6a800'; };
  newInp.onblur  = function(){ this.style.borderColor='#dde1ed'; };
  setTimeout(() => newInp.focus(), 80);
  const _confirm = () => {
    if (newInp.value === senha) {
      overlay.style.display = 'none';
      _cb();
    } else {
      const err = document.getElementById('cpw-err');
      err.style.display = 'block';
      newInp.style.borderColor = '#dc2626';
      setTimeout(() => { err.style.display='none'; newInp.style.borderColor='#dde1ed'; }, 2000);
    }
  };
  newBtn.addEventListener('click', _confirm);
  newInp.addEventListener('keydown', (e) => { if (e.key === 'Enter') _confirm(); });
}
function _cpwToggle(){ const i=document.getElementById('cpw-input'); i.type=i.type==='password'?'text':'password'; }
function _cpwFechar(){ const o=document.getElementById('modal-collab-pw'); if(o) o.style.display='none'; }

/* ─── Reset de status dos cards (líder) ──────────────────
   Pede a senha do líder e renderiza os cards como se não
   houvesse nenhuma sessão registrada (zera tags visualmente).
   NÃO apaga nada do banco — apenas sobrescreve o cache local
   com um array vazio de sessões.
──────────────────────────────────────────────────────────── */
function _pedirSenhaReset() {
  const SENHA_LIDER = 'lider123*';
  let overlay = document.getElementById('modal-reset-pw');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'modal-reset-pw';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px';
    overlay.innerHTML = `
      <div style="background:#fff;border-radius:18px;padding:32px 28px;width:100%;max-width:320px;
                  box-shadow:0 20px 60px rgba(0,0,0,0.35);text-align:center;font-family:inherit">
        <div style="font-size:38px;margin-bottom:6px">🔄</div>
        <h2 style="font-size:16px;font-weight:900;color:#1a1d2e;margin-bottom:4px">Resetar Cards</h2>
        <p style="font-size:12px;color:#6b7280;margin-bottom:16px">Remove as tags de "Em Produção" e "Finalizado" visualmente.<br>Nenhum dado é apagado do banco.</p>
        <div style="position:relative;margin-bottom:10px">
          <input id="rst-input" type="password" placeholder="Senha do líder..."
            style="width:100%;padding:11px 40px 11px 14px;border:2px solid #dde1ed;border-radius:10px;
                   font-size:15px;font-family:inherit;outline:none;box-sizing:border-box;"
            onfocus="this.style.borderColor='#e6a800'" onblur="this.style.borderColor='#dde1ed'"/>
          <button onclick="_rstToggle()" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);
            background:none;border:none;cursor:pointer;font-size:15px;color:#6b7280">👁️</button>
        </div>
        <p id="rst-err" style="color:#dc2626;font-size:12px;font-weight:700;margin-bottom:10px;display:none">❌ Senha incorreta!</p>
        <button id="rst-ok" style="width:100%;background:#e6a800;color:#fff;border:none;
          padding:12px;border-radius:10px;font-size:15px;font-weight:800;cursor:pointer;font-family:inherit;margin-bottom:8px">
          🔄 Resetar Agora
        </button>
        <button onclick="_rstFechar()" style="width:100%;background:#f0f2f8;color:#6b7280;border:1px solid #dde1ed;
          padding:10px;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit">
          Cancelar
        </button>
      </div>`;
    document.body.appendChild(overlay);
  }

  /* Reseta input cada vez que abre */
  const inp = document.getElementById('rst-input');
  inp.value = ''; inp.type = 'password';
  document.getElementById('rst-err').style.display = 'none';
  overlay.style.display = 'flex';
  setTimeout(() => inp.focus(), 80);

  /* Clona botão E input para remover listeners acumulados */
  const okBtn = document.getElementById('rst-ok');
  const newBtn = okBtn.cloneNode(true);
  okBtn.parentNode.replaceChild(newBtn, okBtn);
  const newInp = inp.cloneNode(true);
  inp.parentNode.replaceChild(newInp, inp);
  newInp.value = ''; newInp.type = 'password';
  newInp.onfocus = function(){ this.style.borderColor='#e6a800'; };
  newInp.onblur  = function(){ this.style.borderColor='#dde1ed'; };
  setTimeout(() => newInp.focus(), 80);

  const _do = () => {
    if (newInp.value === SENHA_LIDER) {
      overlay.style.display = 'none';
      /* ── Zera visualmente: sobrescreve cache com sessões vazias ──
         O próximo renderCollabGrid usará este array vazio e
         não mostrará nenhuma tag de finalizado/em produção.
         O cache fica marcado como válido para evitar re-fetch automático. */
      _cache.sessoes = [];          /* array vazio = nenhum colaborador finalizado */
      _cache.turno   = S.turno;    /* mantém validade do cache */
      _cache.dia     = S.dia;
      _cache.data    = S.dataTrabalho || today();
      S.producaoIniciada = false;
      /* Renderiza direto com sessões vazias — sem ir ao banco */
      if (_cache.tarefas) {
        _renderCollabGridComDados(_cache.tarefas, []);
      } else {
        renderCollabGrid();
      }
      showToast('✅ Tags removidas! Cards liberados para novo turno.');
    } else {
      const err = document.getElementById('rst-err');
      err.style.display = 'block';
      newInp.style.borderColor = '#dc2626';
      setTimeout(() => { err.style.display='none'; newInp.style.borderColor='#dde1ed'; }, 2000);
    }
  };
  newBtn.addEventListener('click', _do);
  newInp.addEventListener('keydown', (e) => { if (e.key==='Enter') _do(); });
}
function _rstToggle(){ const i=document.getElementById('rst-input'); i.type=i.type==='password'?'text':'password'; }
function _rstFechar(){ const o=document.getElementById('modal-reset-pw'); if(o) o.style.display='none'; }

async function selectColaborador(nome) {
  if (_thanksIv) { clearInterval(_thanksIv); _thanksIv = null; }
  S.colaborador = nome;
  S.s1 = {}; S.s2 = {};
  S.sessaoId = 'sess_' + Date.now();
  S.producaoIniciada = false;
  _atendRegistroIds = {}; /* reseta mapa de IDs dos registros */

  const isAtend = _isAtendimentoColab(nome);

  /* Sempre invalida o cache de tarefas ao selecionar colaborador,
     para garantir que tarefas transferidas recentemente apareçam com a tag correta */
  _cache.tarefas = null;
  _cache._prefetched = false;

  showLoading(true);
  try {
    /* Busca tarefas */
    const _rt0 = await fetch('tables/tarefas?limit=1000');
    const _jtar0 = _rt0.ok ? await _rt0.json() : {data:[]};
    _cache.tarefas     = _jtar0.data || [];
    _cache.turno       = S.turno;
    _cache.dia         = S.dia;
    _cache.data        = S.dataTrabalho || today();
    _cache._prefetched = true;

    S.tarefas = _cache.tarefas
      .filter(t => t.turno===S.turno && t.dia_semana===S.dia && t.colaborador===nome)
      .sort((a,b) => (a.ordem||0)-(b.ordem||0));

    if (!S.tarefas.length) { showLoading(false); showToast('😕 Sem tarefas para este colaborador'); return; }

    /* Para colaboradores de Atendimento: pré-carrega registros já salvos */
    if (isAtend) {
      await _carregarRegistrosAtendimento(nome);
    }

    setNavChips('s1', nome);

    if (isAtend) {
      /* Pula Etapa 1 — vai direto para checklist de finalização */
      _prepararModoAtendimento();
      renderStep2();
    } else {
      renderStep1();
    }
    showScreen('screen-step1');
  } catch(e) { console.error(e); showToast('❌ Erro ao carregar tarefas'); }
  finally { showLoading(false); }
}

/* ─── Carrega registros já salvos do dia para colaborador de Atendimento ─ */
async function _carregarRegistrosAtendimento(nome) {
  const dtTrab = S.dataTrabalho || today();
  try {
    /* Busca TODOS os registros com paginação completa para não perder nenhum */
    let todos = [];
    let pg = 1;
    while (true) {
      const _rr = await fetch(`tables/registros?limit=500&page=${pg}`);
      if (!_rr.ok) break;
      const _jrr = await _rr.json();
      const rows = _jrr.data || [];
      todos = todos.concat(rows);
      if (rows.length < 500) break;
      pg++;
    }

    /* Filtra apenas os do colaborador + dia + turno + dia_semana corretos */
    const registros = todos.filter(reg =>
      reg.colaborador_card === nome &&
      reg.data === dtTrab &&
      reg.turno === S.turno &&
      reg.dia_semana === S.dia
    );

    /* Se houver múltiplos registros para a mesma tarefa, pega o mais recente
       (compara updated_at ou created_at — ambos são ms epoch) */
    const regPorTarefa = {};
    registros.forEach(reg => {
      const tid = reg.tarefa_id;
      if (!tid) return;
      const tsNovo   = reg.updated_at || reg.created_at || 0;
      const tsExist  = regPorTarefa[tid]
        ? (regPorTarefa[tid].updated_at || regPorTarefa[tid].created_at || 0)
        : -1;
      if (tsNovo > tsExist) {
        regPorTarefa[tid] = reg;
      }
    });

    Object.entries(regPorTarefa).forEach(([tid, reg]) => {
      S.s2[tid] = {
        produzida: reg.quantidade_produzida !== undefined ? reg.quantidade_produzida : 1,
        status:    reg.status || 'total',
        motivo:    reg.motivo || ''
      };
      S.s1[tid] = { estoque: 0, programada: 1, confirmed: true };
      _atendRegistroIds[tid] = reg.id; /* guarda ID para PATCH posterior */
    });

    /* Usa o sessaoId do registro mais recente (para agrupar corretamente) */
    if (registros.length > 0) {
      const maisRecente = registros.reduce((a, b) =>
        ((a.updated_at || a.created_at || 0) > (b.updated_at || b.created_at || 0)) ? a : b
      );
      if (maisRecente.sessao_id) S.sessaoId = maisRecente.sessao_id;
    }
  } catch(e) {
    console.error('Erro ao carregar registros de atendimento:', e);
  }
}

/* ─── Prepara a tela step1 no modo Atendimento (sem etapa de programação) ─ */
function _prepararModoAtendimento() {
  S.producaoIniciada = true; /* marca como já em produção */

  /* Pré-confirma todas as tarefas na etapa 1 (sem qty) */
  S.tarefas.forEach(t => {
    if (!S.s1[t.id]) {
      S.s1[t.id] = { estoque: 0, programada: 1, confirmed: true };
    }
  });

  /* Ajusta banner para modo Atendimento */
  var banner = document.getElementById('prod-banner');
  if (banner) {
    banner.classList.remove('hidden');
    banner.className = 'step-banner step-banner-2';
  }
  var bIcon = document.getElementById('prod-banner-icon');
  if (bIcon) bIcon.textContent = '✅';
  var bTitle = document.getElementById('prod-banner-title');
  if (bTitle) bTitle.textContent = 'Tarefas do Turno — Atendimento';
  var bSub = document.getElementById('prod-banner-sub');
  if (bSub) bSub.textContent = 'Toque em cada tarefa para confirmar — progresso salvo automaticamente';

  /* Mostra barra de progresso em verde */
  var pw = document.querySelector('.progress-bar-wrap');
  if (pw) pw.classList.remove('hidden');
  var bFill = document.getElementById('s1-progress');
  if (bFill) bFill.className = 'progress-bar-fill prog-green';

  /* Esconde footer fase 1 e mostra botão Voltar */
  var pi = document.getElementById('btn-pending-info');
  if (pi) pi.classList.add('hidden');
  var df = document.getElementById('s1-done-footer');
  if (df) df.classList.add('hidden');
  var bv = document.getElementById('btn-voltar');
  if (bv) bv.classList.remove('hidden');
  var bPrint = document.getElementById('btn-print-header');
  if (bPrint) bPrint.classList.add('hidden');
}

function setNavChips(prefix, nome) {
  const icon = S.turno==='dia'?'\u2600\uFE0F':'\uD83C\uDF19';
  const lbl  = S.turno==='dia'?'Dia':'Noite';
  const dObj = DIAS_LIST.find(d=>d.key===S.dia);
  const elT  = document.getElementById(`${prefix}-turno-chip`);
  const elD  = document.getElementById(`${prefix}-day-chip`);
  const elU  = document.getElementById(`${prefix}-user-chip`);
  if (elT) elT.textContent = icon+' '+lbl;
  if (elD) elD.textContent = dObj?dObj.short:S.dia;
  if (elU) elU.textContent = '\uD83D\uDC64 '+nome;
}

/* ══════════════════════════════════════════════════════════
   ETAPA 1 — Renderização dos cards de programação
══════════════════════════════════════════════════════════ */
function renderStep1() {
  const list  = document.getElementById('s1-list');
  const total = S.tarefas.length;
  const done  = Object.values(S.s1).filter(d => d.confirmed).length;
  const pct   = total ? Math.round(done / total * 100) : 0;
  const allDone = done === total && total > 0;

  document.getElementById('s1-progress').style.width = pct + '%';
  document.getElementById('s1-progress-text').textContent = `${done} / ${total} programados`;

  const btnInfo   = document.getElementById('btn-pending-info');
  const doneFooter = document.getElementById('s1-done-footer');
  if (allDone) {
    btnInfo.classList.add('hidden');
    doneFooter.classList.remove('hidden');
  } else {
    btnInfo.classList.remove('hidden');
    doneFooter.classList.add('hidden');
    const pendente = total - done;
    document.getElementById('pending-count-text').textContent =
      `Toque nos cards — ${pendente} item${pendente !== 1 ? 's' : ''} pendente${pendente !== 1 ? 's' : ''}`;
  }

  const grupos = {};
  S.tarefas.forEach(t => { const c = t.categoria||'Geral'; if (!grupos[c]) grupos[c]=[]; grupos[c].push(t); });
  list.innerHTML = Object.entries(grupos).map(([cat, items]) =>
    `<div class="task-section-hdr">${getCatEmoji(cat)} ${cat.toUpperCase()}</div>
     ${items.map(t => renderTaskCard1(t)).join('')}`
  ).join('');
}

function renderTaskCard1(t) {
  const d = S.s1[t.id] || {};
  const confirmed = !!d.confirmed;
  const ck = isChecklist(t);

  let icon, qty, unit, statusTxt, stateClass;

  if (confirmed) {
    icon       = ck ? '✅' : '⚙️';
    qty        = ck ? '' : fmt(d.programada);
    unit       = ck ? '' : t.unidade;
    stateClass = 'state-programado';
    statusTxt  = `<span class="task-status-text" style="color:#CC9400">🟡 ${ck ? 'Agendado' : 'Programado — ' + fmt(d.programada) + ' ' + (t.unidade||'')}</span>`;
  } else {
    icon       = '📌';
    qty        = ck ? '' : fmt(t.quantidade_padrao);
    unit       = ck ? '' : t.unidade;
    stateClass = '';
    statusTxt  = `<span class="task-status-text" style="color:#aaa">Toque para ${ck ? 'confirmar' : 'programar'}</span>`;
  }

  const isTransf1 = !!(t.transferida_de || String(t.id||'').startsWith('tar-transf-') || String(t.categoria||'').startsWith('TRANSF:'));
  const catLabel1  = String(t.categoria||'Geral').replace(/^TRANSF:/,'');
  /* Quando transferida e ainda não programada, omite o texto "Toque para programar" */
  if (isTransf1 && !confirmed) statusTxt = '';
  const bgTransf1 = isTransf1 ? 'style="background:#fff0f0;border-color:#fca5a5"' : '';
  const tagTransf1 = isTransf1 ? '<span class="cat-badge" style="background:#2563eb;color:#fff;border-color:#2563eb">🔀 Transferido</span>' : '';

  return `
    <div class="task-card ${stateClass}" ${bgTransf1} onclick="openModalS1('${t.id}')">
      <div class="task-icon-wrap">${icon}</div>
      <div class="task-info">
        <div class="task-name">${t.item}</div>
        <div class="task-meta">
          <span class="cat-badge ${getCatClass(catLabel1)}">${catLabel1}</span>
          ${tagTransf1}
          ${statusTxt}
        </div>
      </div>
      <div class="task-qty-box">
        <span class="task-qty-num">${qty}</span>
        <span class="task-qty-unit">${unit}</span>
      </div>
      <span class="task-arrow">›</span>
    </div>`;
}

/* ── Impressão da folha de produção ───────────────────── */
function buildPrintPreview() {
  document.getElementById('preview-collab-name').textContent = S.colaborador;
  const tbody = document.getElementById('preview-tbody');
  tbody.innerHTML = S.tarefas.map(t => {
    const d1  = S.s1[t.id]||{};
    const ck  = isChecklist(t);
    const prog = ck ? '—' : fmt(d1.programada !== undefined ? d1.programada : t.quantidade_padrao);
    const est  = ck ? '—' : fmt(d1.estoque||0);
    return `<tr>
      <td>${t.item}${ck?' <em style="font-size:10px;color:#888">(execução)</em>':''}</td>
      <td style="text-align:center">${ck?'—':fmt(t.quantidade_padrao)} ${ck?'':t.unidade}</td>
      <td style="text-align:center">${est} ${ck?'':t.unidade}</td>
      <td style="text-align:center"><strong>${prog} ${ck?'':t.unidade}</strong></td>
    </tr>`;
  }).join('');
}

/* Impressão direta sem nova janela de prévia */
function doPrintDirect() {
  const dObj = DIAS_LIST.find(d=>d.key===S.dia);
  const linhas = S.tarefas.map(t => {
    const d1  = S.s1[t.id]||{};
    const ck  = isChecklist(t);
    const prog = ck ? '— (executar)' : `${fmt(d1.programada !== undefined ? d1.programada : t.quantidade_padrao)} ${t.unidade}`;
    return `<tr>
      <td>${t.categoria||''}</td>
      <td><strong>${t.item}</strong></td>
      <td style="text-align:center">${ck?'—':fmt(t.quantidade_padrao)+' '+t.unidade}</td>
      <td style="text-align:center">${ck?'—':fmt(d1.estoque||0)+' '+t.unidade}</td>
      <td style="text-align:center"><strong>${prog}</strong></td>
      <td style="width:70px;border:1px solid #ccc">&nbsp;</td>
      <td style="width:100px;border:1px solid #ccc">&nbsp;</td>
    </tr>`;
  }).join('');
  triggerPrint(
    `🍔 Just Burger — ${S.colaborador}`,
    `${S.turno==='dia'?'☀️ Turno Dia':'🌙 Turno Noite'} · ${dObj?dObj.label:''} · ${fmtDate()}`,
    '<tr><th>Categoria</th><th>Item</th><th>Padrão</th><th>Estoque</th><th>A Produzir</th><th>Qtd Feita</th><th>Obs</th></tr>',
    linhas
  );
}

/* ══════════════════════════════════════════════════════════
   MODAL S1 — Programar item
══════════════════════════════════════════════════════════ */
let _s1Id = null, _s1Est = 0, _s1Prog = 0;

function openModalS1(id) {
  _s1Id = id;
  const t = S.tarefas.find(x => x.id === id);
  if (!t) return;
  const saved = S.s1[id] || {};
  const ck = isChecklist(t);

  _s1Est  = saved.estoque    !== undefined ? saved.estoque    : 0;
  _s1Prog = saved.programada !== undefined ? saved.programada : Math.max(0, (t.quantidade_padrao||0) - _s1Est);

  /* Cabeçalho */
  document.getElementById('modal-s1-header').style.background = getCatColor(t.categoria);
  document.getElementById('modal-s1-cat').textContent   = (t.categoria||'Geral').toUpperCase();
  document.getElementById('modal-s1-title').textContent = t.item;

  /* Modos */
  document.getElementById('s1-checklist-mode').classList.toggle('hidden', !ck);
  document.getElementById('s1-qty-mode').classList.toggle('hidden',  ck);

  if (!ck) {
    document.getElementById('modal-s1-unidade').textContent = t.unidade || '';
    document.getElementById('modal-s1-unit2').textContent   = t.unidade || '';
    document.getElementById('modal-s1-estoque').textContent = _s1Est;
    document.getElementById('modal-s1-prog').textContent    = _s1Prog;
    _updateCalc(t);
  }

  document.getElementById('btn-s1-confirm').textContent = ck ? '✅ Confirmar Tarefa' : '🟡 Programar';
  document.getElementById('modal-s1').classList.remove('hidden');
}

function _updateCalc(t) {
  if (!t) t = S.tarefas.find(x => x.id === _s1Id);
  if (!t) return;
  const nec = Math.max(0, (t.quantidade_padrao||0) - _s1Est);
  const cp = document.getElementById('calc-padrao');
  const ce = document.getElementById('calc-estoque');
  const cn = document.getElementById('calc-necessario');
  if (cp) cp.textContent = fmt(t.quantidade_padrao) + ' ' + (t.unidade||'');
  if (ce) ce.textContent = fmt(_s1Est) + ' ' + (t.unidade||'');
  if (cn) cn.textContent = fmt(nec) + ' ' + (t.unidade||'');
}

function adjField(field, delta) {
  if (field === 'estoque') {
    _s1Est = Math.max(0, _s1Est + delta);
    const el = document.getElementById('modal-s1-estoque');
    if (el) el.textContent = _s1Est;
    const t = S.tarefas.find(x => x.id === _s1Id);
    if (t) {
      _s1Prog = Math.max(0, (t.quantidade_padrao||0) - _s1Est);
      const ep = document.getElementById('modal-s1-prog');
      if (ep) ep.textContent = _s1Prog;
      _updateCalc(t);
    }
  } else if (field === 'programada') {
    _s1Prog = Math.max(0, _s1Prog + delta);
    const ep = document.getElementById('modal-s1-prog');
    if (ep) ep.textContent = _s1Prog;
  } else if (field === 'produzida') {
    _s2Prod = Math.max(0, _s2Prod + delta);
    const el = document.getElementById('modal-s2-prod');
    if (el) el.textContent = _s2Prod;
  }
}

function confirmS1() {
  const t  = S.tarefas.find(x => x.id === _s1Id);
  const ck = isChecklist(t);
  S.s1[_s1Id] = ck
    ? { estoque: 0, programada: 1, confirmed: true }
    : { estoque: _s1Est, programada: _s1Prog, confirmed: true };
  closeModal('modal-s1');
  renderStep1();
  /* sem toast */
}

/* ══════════════════════════════════════════════════════════
   INICIAR PRODUÇÃO — sai do step1 e vai para step2
   Imprime a folha e navega para a tela de finalização
══════════════════════════════════════════════════════════ */
function iniciarProducao() {
  S.producaoIniciada = true;

  /* Esconde todo o footer da fase 1 */
  var pi = document.getElementById('btn-pending-info');
  if (pi) pi.classList.add('hidden');
  var df = document.getElementById('s1-done-footer');
  if (df) df.classList.add('hidden');
  var bv = document.getElementById('btn-voltar');
  if (bv) bv.classList.add('hidden');
  var btnCon = document.getElementById('btn-conclude');
  if (btnCon) btnCon.classList.add('hidden');

  /* Limpa os cards — mostra tela de confirmação com contador regressivo */
  var list = document.getElementById('s1-list');
  if (list) list.innerHTML = `
    <div style="
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      min-height:55vh; gap:24px; padding:32px 20px; text-align:center;
    ">
      <div style="font-size:64px">🚀</div>
      <div style="font-size:22px; font-weight:900; color:#1a1a1a;">Produção iniciada!</div>
      <div style="font-size:14px; color:#666; max-width:260px; line-height:1.6;">
        Voltando automaticamente em <span id="prod-countdown" style="font-weight:900;color:#1a1a1a;">3</span>s...
      </div>
      <button onclick="clearInterval(_prodIv); backToCollabScreen()" style="
        background: linear-gradient(135deg,#1a1a1a,#333);
        color: #fff;
        border: none;
        border-radius: 16px;
        padding: 18px 40px;
        font-size: 18px;
        font-weight: 900;
        font-family: inherit;
        cursor: pointer;
        box-shadow: 0 6px 24px rgba(0,0,0,0.25);
        display: flex;
        align-items: center;
        gap: 10px;
        transition: transform 0.15s, box-shadow 0.15s;
      "
      onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 10px 32px rgba(0,0,0,0.3)'"
      onmouseout="this.style.transform='';this.style.boxShadow='0 6px 24px rgba(0,0,0,0.25)'"
      >
        🏠 Ir para Início
      </button>
    </div>`;

  /* Esconde barra e banner */
  var pw = document.querySelector('.progress-bar-wrap');
  if (pw) pw.classList.add('hidden');
  var banner = document.getElementById('prod-banner');
  if (banner) banner.classList.add('hidden');

  /* Abre impressão imediatamente */
  doPrintDirect();

  /* Contador regressivo: 3 → 2 → 1 → vai! */
  var _prodCount = 3;
  _prodIv = setInterval(function() {
    _prodCount--;
    var el = document.getElementById('prod-countdown');
    if (el) el.textContent = _prodCount;
    if (_prodCount <= 0) {
      clearInterval(_prodIv);
      backToCollabScreen();
    }
  }, 1000);
}

function irParaFinalizacao() { /* não usada mais */ }

function imprimirViaIframe() {
  const dObj = DIAS_LIST.find(d => d.key === S.dia);
  const linhas = S.tarefas.map(t => {
    const d1  = S.s1[t.id] || {};
    const ck  = isChecklist(t);
    const prog = ck ? '— (executar)' : `${fmt(d1.programada !== undefined ? d1.programada : t.quantidade_padrao)} ${t.unidade}`;
    return `<tr>
      <td>${t.categoria||''}</td>
      <td><strong>${t.item}</strong></td>
      <td style="text-align:center">${ck ? '—' : fmt(t.quantidade_padrao)+' '+t.unidade}</td>
      <td style="text-align:center">${ck ? '—' : fmt(d1.estoque||0)+' '+t.unidade}</td>
      <td style="text-align:center"><strong>${prog}</strong></td>
      <td style="width:70px;border:1px solid #ccc">&nbsp;</td>
      <td style="width:100px;border:1px solid #ccc">&nbsp;</td>
    </tr>`;
  }).join('');

  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
    <title>Just Burger — ${S.colaborador}</title>
    <style>
      body{font-family:Arial,sans-serif;font-size:12px;padding:20px;color:#000}
      h1{font-size:18px;margin:0 0 4px;font-weight:900}
      p{font-size:12px;color:#555;margin:0 0 16px}
      table{width:100%;border-collapse:collapse}
      th{background:#111;color:#fff;padding:8px 10px;text-align:left;font-size:11px;font-weight:900}
      td{padding:8px 10px;border-bottom:1px solid #ddd;font-size:12px}
      tr:nth-child(even) td{background:#f9f9f9}
    </style>
  </head><body>
    <h1>🍔 Just Burger — ${S.colaborador}</h1>
    <p>${S.turno==='dia'?'☀️ Turno Dia':'🌙 Turno Noite'} · ${dObj?dObj.label:''} · ${fmtDate()}</p>
    <table>
      <thead><tr><th>Categoria</th><th>Item</th><th>Padrão</th><th>Estoque</th><th>A Produzir</th><th>Qtd Feita</th><th>Obs</th></tr></thead>
      <tbody>${linhas}</tbody>
    </table>
  </body></html>`;

  /* Cria iframe oculto, injeta o HTML e dispara print — sem abrir nova aba */
  let iframe = document.getElementById('_print_iframe');
  if (!iframe) {
    iframe = document.createElement('iframe');
    iframe.id = '_print_iframe';
    iframe.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;border:none;';
    document.body.appendChild(iframe);
  }
  iframe.onload = function() {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  };
  iframe.srcdoc = html;
}

function confirmBackToStep1() { renderStep1(); showScreen('screen-step1'); }

/* Retorna para step2 quando card já está em produção (clicou no card com tag Em Produção) */
function retornarStep2() {
  setNavChips('s1', S.colaborador);

  /* Restaura banner e barra (ficaram ocultos ao iniciar produção) */
  var banner = document.getElementById('prod-banner');
  if (banner) { banner.classList.remove('hidden'); banner.className = 'step-banner step-banner-2'; }
  var bIcon  = document.getElementById('prod-banner-icon');
  if (bIcon)  bIcon.textContent  = '✅';
  var bTitle = document.getElementById('prod-banner-title');
  if (bTitle) bTitle.textContent = 'Tarefas do Turno';
  var bSub   = document.getElementById('prod-banner-sub');
  if (bSub)   bSub.textContent   = 'Toque em cada card para registrar o resultado';

  var pw = document.querySelector('.progress-bar-wrap');
  if (pw) pw.classList.remove('hidden');
  var bFill = document.getElementById('s1-progress');
  if (bFill) bFill.className = 'progress-bar-fill prog-green';

  var btnPH = document.getElementById('btn-print-header');
  if (btnPH) btnPH.classList.remove('hidden');

  /* Esconde footer fase 1, mostra botão Voltar */
  var pi = document.getElementById('btn-pending-info');
  if (pi) pi.classList.add('hidden');
  var df = document.getElementById('s1-done-footer');
  if (df) df.classList.add('hidden');
  var bv = document.getElementById('btn-voltar');
  if (bv) bv.classList.remove('hidden');

  renderStep2();
  showScreen('screen-step1');
}

async function backToCollabScreen() {
  /* Invalida cache de registros para que o grid mostre progresso atualizado */
  _cache._registros = null;
  _cache.sessoes = null; /* força re-fetch de sessoes também */
  /* Volta para a tela de departamento — os cards ficam lá */
  showScreen('screen-dept');
}

/* ══════════════════════════════════════════════════════════
   ETAPA 2: FINALIZAÇÃO — usa mesma tela (s1-list)
══════════════════════════════════════════════════════════ */
function renderStep2() {
  const list    = document.getElementById('s1-list'); /* mesma lista da tela */
  const total   = S.tarefas.length;
  const done    = Object.values(S.s2).filter(d => d.status).length;
  const pct     = total ? Math.round(done / total * 100) : 0;
  const allDone = done === total && total > 0;

  document.getElementById('s1-progress').style.width = pct + '%';
  document.getElementById('s1-progress-text').textContent = `${done} / ${total} finalizados`;

  /* Botão Concluir: só aparece quando TODOS os cards foram finalizados
     e pelo menos 1 já foi tocado (done > 0) */
  const btnCon = document.getElementById('btn-conclude');
  if (btnCon) {
    if (allDone) btnCon.classList.remove('hidden');
    else         btnCon.classList.add('hidden');
  }

  const grupos = {};
  S.tarefas.forEach(t => { const c = t.categoria||'Geral'; if (!grupos[c]) grupos[c]=[]; grupos[c].push(t); });
  list.innerHTML = Object.entries(grupos).map(([cat, items]) =>
    `<div class="task-section-hdr">${getCatEmoji(cat)} ${cat.toUpperCase()}</div>
     ${items.map(t => renderTaskCard2(t)).join('')}`
  ).join('');
}

function renderTaskCard2(t) {
  const d   = S.s2[t.id]||{};
  const d1  = S.s1[t.id]||{};
  const ck  = isChecklist(t);
  const prog = d1.programada !== undefined ? d1.programada : t.quantidade_padrao;

  let stateClass='state-programado', icon='🟡', statusTxt='⚙️ Toque para finalizar';
  if (d.status==='total')          { stateClass='state-total';   icon='✅'; statusTxt='✅ 100% concluído'; }
  else if (d.status==='parcial')   { stateClass='state-parcial'; icon='⚠️'; statusTxt=`⚠️ Parcial — ${fmt(d.produzida)} produzidos`; }
  else if (d.status==='nao_finalizado') { stateClass='state-nao'; icon='❌'; statusTxt='❌ Não executado'; }

  const qtyNum = ck ? '' : (d.status ? fmt(d.produzida!==undefined?d.produzida:prog) : fmt(prog));
  const qtyUnit = ck ? '' : t.unidade;

  const isTransf2 = !!(t.transferida_de || String(t.id||'').startsWith('tar-transf-') || String(t.categoria||'').startsWith('TRANSF:'));
  const catLabel2  = String(t.categoria||'Geral').replace(/^TRANSF:/,'');
  const bgTransf2 = isTransf2 ? 'style="background:#fff0f0;border-color:#fca5a5"' : '';
  const tagTransf2 = isTransf2 ? '<span class="cat-badge" style="background:#2563eb;color:#fff;border-color:#2563eb">🔀 Transferido</span>' : '';

  return `
    <div class="task-card ${stateClass}" ${bgTransf2} onclick="openModalS2('${t.id}')">
      <div class="task-icon-wrap">${icon}</div>
      <div class="task-info">
        <div class="task-name">${t.item}</div>
        <div class="task-meta">
          <span class="cat-badge ${getCatClass(catLabel2)}">${catLabel2}</span>
          ${tagTransf2}
          <span class="task-status-text">${statusTxt}</span>
        </div>
        ${d.motivo?`<div class="task-reason">💬 ${d.motivo}</div>`:''}
      </div>
      <div class="task-qty-box">
        <span class="task-qty-num">${qtyNum}</span>
        <span class="task-qty-unit">${qtyUnit}</span>
      </div>
      <span class="task-arrow">›</span>
    </div>`;
}

/* ── Modal S2 ──────────────────────────────────────────── */
let _s2Id=null, _s2Prod=0, _s2Status=null, _s2Motivo='';

function openModalS2(id) {
  _s2Id=id; _s2Status=null; _s2Motivo='';
  const t   = S.tarefas.find(x=>x.id===id);
  const d   = S.s2[id]||{};
  const d1  = S.s1[id]||{};
  const ck  = isChecklist(t);
  const prog = d1.programada !== undefined ? d1.programada : (t?t.quantidade_padrao:0);

  _s2Prod   = d.produzida !== undefined ? d.produzida : prog;
  _s2Status = d.status || null;
  _s2Motivo = d.motivo  || '';

  document.getElementById('modal-s2-header').style.background = getCatColor(t?t.categoria:'');
  document.getElementById('modal-s2-cat').textContent      = t?(t.categoria||'Geral').toUpperCase():'';
  document.getElementById('modal-s2-title').textContent    = t?t.item:'';

  /* Ocultar caixa de referência para checklist */
  const refBox = document.getElementById('s2-ref-box');
  if (ck) { refBox.classList.add('hidden'); }
  else    { refBox.classList.remove('hidden'); document.getElementById('modal-s2-prog').textContent=fmt(prog); document.getElementById('modal-s2-unit-lbl').textContent=t?t.unidade:''; }

  document.getElementById('modal-s2-unit2').textContent = t?t.unidade:'';
  document.getElementById('modal-s2-prod').textContent  = _s2Prod;

  /* Reset status btns */
  ['total','parcial','nao'].forEach(s=>document.getElementById(`sbtn-${s}`).classList.remove('active'));
  if (_s2Status==='total')          document.getElementById('sbtn-total').classList.add('active');
  else if (_s2Status==='parcial')   document.getElementById('sbtn-parcial').classList.add('active');
  else if (_s2Status==='nao_finalizado') document.getElementById('sbtn-nao').classList.add('active');

  toggleMotivoArea(_s2Status, ck);

  const motivoInput = document.getElementById('motivo-custom');
  if (motivoInput) motivoInput.value = _s2Motivo;
  document.querySelectorAll('.motivo-btn').forEach(b=>{
    b.classList.toggle('active', _s2Motivo && b.textContent.trim()===_s2Motivo.trim());
  });

  document.getElementById('modal-s2').classList.remove('hidden');
}

function selectStatus(status) {
  _s2Status = status;
  ['total','parcial','nao'].forEach(s=>document.getElementById(`sbtn-${s}`).classList.remove('active'));
  const map = {total:'sbtn-total',parcial:'sbtn-parcial',nao_finalizado:'sbtn-nao'};
  if (map[status]) document.getElementById(map[status]).classList.add('active');

  const t  = S.tarefas.find(x=>x.id===_s2Id);
  const ck = isChecklist(t);

  if (status==='total') {
    const d1 = S.s1[_s2Id]||{};
    _s2Prod  = d1.programada !== undefined ? d1.programada : (t?t.quantidade_padrao:0);
    document.getElementById('modal-s2-prod').textContent = _s2Prod;
  } else if (status==='nao_finalizado') {
    /* Não executado = quantidade 0 automaticamente */
    _s2Prod = 0;
    document.getElementById('modal-s2-prod').textContent = 0;
  }

  toggleMotivoArea(status, ck);
}

function toggleMotivoArea(status, ck) {
  const qtyWrap    = document.getElementById('qty-prod-wrap');
  const motivoWrap = document.getElementById('motivos-wrap');
  /* Qty só abre se parcial E não for checklist */
  const showQty = status==='parcial' && !ck;
  /* Motivo abre para parcial e não executado */
  const showMotivo = status==='parcial' || status==='nao_finalizado';
  qtyWrap.classList.toggle('hidden', !showQty);
  motivoWrap.classList.toggle('hidden', !showMotivo);
}

function selectMotivo(texto) {
  _s2Motivo = texto;
  const inp = document.getElementById('motivo-custom');
  if (inp) inp.value = texto;
  document.querySelectorAll('.motivo-btn').forEach(b=>b.classList.toggle('active', b.textContent.trim()===texto.trim()));
}

async function confirmS2() {
  if (!_s2Status) { shakeEl('modal-s2'); showToast('⚠️ Selecione: 100%, Parcial ou Não Executado!'); return; }

  const t  = S.tarefas.find(x=>x.id===_s2Id);
  const ck = isChecklist(t);

  if (_s2Status==='parcial' || _s2Status==='nao_finalizado') {
    const inp = document.getElementById('motivo-custom');
    const motivo = inp ? inp.value.trim() : '';
    if (!motivo) { shakeEl('motivos-wrap'); showToast('⚠️ Informe o motivo!'); return; }
    _s2Motivo = motivo;
  }

  /* Para checklist 100% = produzida 1, nao = 0 */
  if (ck) { _s2Prod = _s2Status==='nao_finalizado' ? 0 : 1; }

  const d1 = S.s1[_s2Id]||{};
  S.s2[_s2Id] = { produzida:_s2Prod, status:_s2Status, motivo:_s2Motivo };

  /* Fecha modal e atualiza lista IMEDIATAMENTE — sem esperar o servidor */
  closeModal('modal-s2');
  renderStep2();

  /* Salva no servidor em background (sem travar a tela) */
  const _dtReg = S.dataTrabalho || today();
  const _payload = {
    data: _dtReg, turno: S.turno, dia_semana: S.dia,
    colaborador_nome: S.colaborador, colaborador_card: S.colaborador,
    tarefa_id: t?t.id:'', item: t?t.item:'',
    quantidade_padrao: t?t.quantidade_padrao:0,
    quantidade_programada: d1.programada !== undefined ? d1.programada : (t?t.quantidade_padrao:0),
    quantidade_produzida: _s2Prod,
    status: _s2Status, motivo: _s2Motivo,
    sessao_id: S.sessaoId,
    hora_registro: new Date().toLocaleTimeString('pt-BR'),
    is_checklist: ck ? 1 : 0,
  };

  const isAtend = _isAtendimentoColab(S.colaborador);
  const regIdExist = isAtend ? _atendRegistroIds[_s2Id] : null;

  if (isAtend && regIdExist) {
    /* PATCH — atualiza registro já existente (tarefa já havia sido salva) */
    fetch(`tables/registros/${regIdExist}`, {
      method:'PATCH', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        quantidade_produzida: _s2Prod,
        status: _s2Status, motivo: _s2Motivo,
        hora_registro: new Date().toLocaleTimeString('pt-BR'),
      }),
    }).catch(e => console.error('Erro ao atualizar registro:', e));
  } else {
    /* POST — cria novo registro */
    fetch('tables/registros', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify(_payload),
    }).then(async r => {
      if (isAtend && r.ok) {
        const j = await r.json();
        if (j && j.id && _s2Id) _atendRegistroIds[_s2Id] = j.id;
      }
    }).catch(e => console.error('Erro ao salvar registro:', e));
  }
}

/* ══════════════════════════════════════════════════════════
   MODAL — CONCLUIR TURNO
══════════════════════════════════════════════════════════ */
function openFinishModal() {
  const total    = S.tarefas.length;
  const totais   = Object.values(S.s2).filter(d=>d.status==='total').length;
  const parciais = Object.values(S.s2).filter(d=>d.status==='parcial').length;
  const nao      = Object.values(S.s2).filter(d=>d.status==='nao_finalizado').length;

  document.getElementById('finish-summary').innerHTML = `
    <div class="finish-row"><span>📋 Total de tarefas</span><span class="finish-num">${total}</span></div>
    <div class="finish-row"><span>✅ Finalizadas 100%</span><span class="finish-num" style="color:#28A745">${totais}</span></div>
    <div class="finish-row"><span>⚠️ Parcialmente</span><span class="finish-num" style="color:#FD7E14">${parciais}</span></div>
    <div class="finish-row"><span>❌ Não executadas</span><span class="finish-num" style="color:#DC3545">${nao}</span></div>`;
  document.getElementById('finish-obs').value = '';
  document.getElementById('modal-finish').classList.remove('hidden');
}

async function finalizarTurno() {
  const total   = S.tarefas.length;
  const totais  = Object.values(S.s2).filter(d=>d.status==='total').length;
  const parciais= Object.values(S.s2).filter(d=>d.status==='parcial').length;
  const nao     = Object.values(S.s2).filter(d=>d.status==='nao_finalizado').length;
  const obs     = document.getElementById('finish-obs').value.trim();
  const completo = totais===total;

  /* Usa sempre a data de trabalho selecionada — não today() */
  const _dtFim = S.dataTrabalho || today();

  showLoading(true);
  try {
    await fetch('tables/sessoes', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        data: _dtFim, turno: S.turno, dia_semana: S.dia,
        colaborador_card: S.colaborador, colaborador_nome: S.colaborador,
        hora_fim: new Date().toLocaleTimeString('pt-BR'),
        status_geral: completo ? 'completo' : 'parcial',
        observacao: obs, total_tarefas: total, tarefas_concluidas: totais,
      }),
    });

    /* Gravar pendências separadamente na tabela pendencias */
    const pendencias = S.tarefas.filter(t => {
      const d2 = S.s2[t.id];
      return !d2 || d2.status !== 'total';
    });
    for (const t of pendencias) {
      const d2 = S.s2[t.id]||{};
      await fetch('tables/pendencias', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          data: _dtFim, turno: S.turno, dia_semana: S.dia,
          colaborador: S.colaborador,
          item: t.item, categoria: t.categoria||'',
          quantidade_programada: (S.s1[t.id]||{}).programada || t.quantidade_padrao,
          quantidade_produzida: d2.produzida !== undefined ? d2.produzida : 0,
          status: d2.status || 'nao_finalizado',
          motivo: d2.motivo||'',
          vistoriado: 0,
          sessao_id: S.sessaoId,
        }),
      });
    }
  } catch(e) { console.error(e); }
  finally { showLoading(false); }

  closeModal('modal-finish');

  /* Captura snapshot dos dados ANTES de zerar — para impressão das pendências */
  const _snapTarefas    = S.tarefas.slice();
  const _snapS1         = Object.assign({}, S.s1);
  const _snapS2         = Object.assign({}, S.s2);
  const _snapColaborador = S.colaborador;
  const _snapTurno      = S.turno;
  const _snapDia        = S.dia;

  /* Imprime pendências PRIMEIRO (janela abre antes de navegar — evita bloqueio) */
  if (!completo) {
    autoPrintPendencias(_snapTarefas, _snapS1, _snapS2, _snapColaborador, _snapTurno, _snapDia);
  }

  /* Zera estado */
  S.s1 = {}; S.s2 = {}; S.producaoIniciada = false;

  /* Invalida cache de sessões e registros para o grid mostrar o novo status */
  _cache.sessoes    = null;
  _cache._registros = null;

  /* Atualiza badge de pendências após finalizar */
  _checkPendenciasNotif();
  showToast(completo ? '🎉 Turno finalizado!' : '✅ Turno encerrado!');
  /* Volta para tela de departamento e atualiza os cards */
  _irParaDept();
}

function autoPrintPendencias(tarefas, s1, s2, colaborador, turno, dia) {
  /* Aceita snapshot dos dados para evitar usar estado já zerado */
  const _tar  = tarefas  || S.tarefas;
  const _s1   = s1       || S.s1;
  const _s2   = s2       || S.s2;
  const _col  = colaborador || S.colaborador;
  const _tur  = turno    || S.turno;
  const _dia  = dia      || S.dia;

  const dObj = DIAS_LIST.find(d => d.key === _dia);

  /* Somente tarefas NÃO finalizadas 100% */
  const pend = _tar.filter(t => {
    const d2 = _s2[t.id];
    return !d2 || d2.status !== 'total';
  });
  if (!pend.length) return;

  const sl = { parcial:'⚠️ Parcial', nao_finalizado:'❌ Não feito', '':'⏳ Pendente' };
  const linhas = pend.map(t => {
    const d2      = _s2[t.id] || {};
    const prog    = (_s1[t.id]||{}).programada !== undefined ? (_s1[t.id]||{}).programada : t.quantidade_padrao;
    const feito   = d2.produzida !== undefined ? d2.produzida : 0;
    const restante = Math.max(0, (prog||0) - feito);
    const ck      = isChecklist(t);
    return `<tr>
      <td>${t.categoria||''}</td>
      <td>${t.item}</td>
      <td style="text-align:center">${ck?'—':fmt(prog)+' '+t.unidade}</td>
      <td style="text-align:center">${ck?'—':fmt(feito)+' '+t.unidade}</td>
      <td style="text-align:center;color:#c0392b;font-weight:900">${ck?'—':fmt(restante)+' '+t.unidade}</td>
      <td>${sl[d2.status||'']}</td>
      <td>${d2.motivo||'—'}</td>
    </tr>`;
  }).join('');

  /* Usa iframe para não ser bloqueado pelo navegador */
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
    <title>⚠️ Pendências — ${_col}</title>
    <style>
      body{font-family:Arial,sans-serif;font-size:12px;padding:20px;color:#000}
      h1{font-size:18px;margin:0 0 4px;font-weight:900}
      p{font-size:12px;color:#555;margin:0 0 16px}
      table{width:100%;border-collapse:collapse}
      th{background:#c0392b;color:#fff;padding:8px 10px;text-align:left;font-size:11px;font-weight:900}
      td{padding:8px 10px;border-bottom:1px solid #ddd;font-size:12px}
      tr:nth-child(even) td{background:#fef9f9}
    </style>
  </head><body>
    <h1>⚠️ Pendências — ${_col}</h1>
    <p>${_tur==='dia'?'☀️ Turno Dia':'🌙 Turno Noite'} · ${dObj?dObj.label:''} · ${fmtDate()}</p>
    <table>
      <thead><tr><th>Categoria</th><th>Item</th><th>Programado</th><th>Feito</th><th style="color:#ffcccc">Restante</th><th>Status</th><th>Motivo</th></tr></thead>
      <tbody>${linhas}</tbody>
    </table>
    <script>window.onload=function(){window.print();setTimeout(function(){window.close()},800);}<\/script>
  </body></html>`;

  let iframe = document.getElementById('_print_pend_iframe');
  if (!iframe) {
    iframe = document.createElement('iframe');
    iframe.id = '_print_pend_iframe';
    iframe.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;border:none;';
    document.body.appendChild(iframe);
  }
  iframe.onload = function() {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  };
  iframe.srcdoc = html;
}

/* Countdown removido — sem redirect automático */
function startThanksCountdown() { /* desativado */ }

/* ══════════════════════════════════════════════════════════
   IMPRESSÃO
══════════════════════════════════════════════════════════ */
function printColaborador() {
  const dObj = DIAS_LIST.find(d=>d.key===S.dia);
  const linhas = S.tarefas.map(t => {
    const d1=S.s1[t.id]||{}, d2=S.s2[t.id]||{};
    const ck=isChecklist(t);
    const prog = ck?'—':fmt(d1.programada!==undefined?d1.programada:t.quantidade_padrao)+' '+t.unidade;
    const sl={total:'✅ 100%',parcial:'⚠️ Parcial',nao_finalizado:'❌ Não feito','':'⏳'};
    return `<tr>
      <td>${t.categoria||''}</td><td>${t.item}</td>
      <td style="text-align:center">${prog}</td>
      <td style="text-align:center">${d2.produzida!==undefined?fmt(d2.produzida):'—'}</td>
      <td>${sl[d2.status||'']}</td><td>${d2.motivo||'—'}</td>
    </tr>`;
  }).join('');
  triggerPrint(
    `🍔 Just Burger — ${S.colaborador}`,
    `${S.turno==='dia'?'☀️ Turno Dia':'🌙 Turno Noite'} · ${dObj?dObj.label:''} · ${fmtDate()}`,
    '<tr><th>Categoria</th><th>Item</th><th>Programado</th><th>Produzido</th><th>Status</th><th>Motivo</th></tr>',
    linhas
  );
}

function triggerPrint(title, subtitle, tableHead, tableBody) {
  const w = window.open('','_blank');
  if (!w) { showToast('❌ Popup bloqueado. Permita popups!'); return; }
  w.document.write(`<!DOCTYPE html><html lang="pt-BR"><head>
    <meta charset="UTF-8"/><title>${title}</title>
    <style>
      body{font-family:Arial,sans-serif;font-size:12px;padding:20px;color:#000;max-width:900px;margin:0 auto}
      h1{font-size:18px;margin:0 0 4px;font-weight:900}p{font-size:12px;color:#555;margin:0 0 16px}
      table{width:100%;border-collapse:collapse}
      th{background:#111;color:#fff;padding:8px 10px;text-align:left;font-size:11px;font-weight:900}
      td{padding:8px 10px;border-bottom:1px solid #ddd;font-size:12px}
      tr:nth-child(even) td{background:#f9f9f9}
      .footer{margin-top:20px;font-size:10px;color:#aaa;border-top:1px solid #ddd;padding-top:8px}
    </style>
  </head><body>
    <h1>${title}</h1><p>${subtitle} · Impresso: ${new Date().toLocaleString('pt-BR')}</p>
    <table><thead>${tableHead}</thead><tbody>${tableBody}</tbody></table>
    <div class="footer">Just Burger – Sistema de Controle de Produção</div>
    <script>window.onload=function(){window.print();setTimeout(function(){window.close()},800);}<\/script>
  </body></html>`);
  w.document.close();
}

/* ══════════════════════════════════════════════════════════
   LOGIN DO LÍDER
══════════════════════════════════════════════════════════ */
function togglePassVisibility() {
  const inp=document.getElementById('leader-password');
  const icon=document.querySelector('.pass-toggle i');
  inp.type = inp.type==='password'?'text':'password';
  if (icon) icon.className = inp.type==='password'?'fas fa-eye':'fas fa-eye-slash';
}

function doLeaderLogin() {
  const val = document.getElementById('leader-password').value;
  if (val===LEADER_PASSWORD) {
    S.leaderOk=true;
    document.getElementById('login-error').classList.add('hidden');
    openLeaderPanel();
  } else {
    document.getElementById('login-error').classList.remove('hidden');
    document.getElementById('leader-password').value='';
    shakeEl('login-card');
  }
}

/* ══════════════════════════════════════════════════════════
   ABAS DO LÍDER
══════════════════════════════════════════════════════════ */
function switchLeaderTab(tab) {
  S.currentLeaderTab = tab;
  ['registros','pendentes','espelho','relatorio','tarefas'].forEach(t => {
    const btn = document.getElementById(`tab-${t}`);
    const pan = document.getElementById(`leader-panel-${t}`);
    if (btn) btn.classList.toggle('active', t===tab);
    if (pan) pan.classList.toggle('hidden', t!==tab);
  });
}

/* ══════════════════════════════════════════════════════════
   PAINEL DO LÍDER — DADOS
══════════════════════════════════════════════════════════ */
function setDefaultDates() {
  const hoje=today();
  const ini=new Date(); ini.setDate(1);
  const iniStr = ini.toISOString().slice(0,10);
  const fS=document.getElementById('filter-start');
  const fE=document.getElementById('filter-end');
  if(fS) fS.value=iniStr;
  if(fE) fE.value=hoje;
  /* Replica para filtros do relatório */
  const rS=document.getElementById('rel-start');
  const rE=document.getElementById('rel-end');
  if(rS) rS.value=iniStr;
  if(rE) rE.value=hoje;
}

async function populateCollabFilter(data) {
  const nomes = [...new Set((data||[]).map(r=>r.colaborador_card).filter(Boolean))].sort();
  const sel = document.getElementById('filter-colaborador');
  if (!sel) return;
  const cur = sel.value;
  sel.innerHTML = '<option value="">Todos</option>' +
    nomes.map(n=>`<option value="${n}"${n===cur?' selected':''}>${n}</option>`).join('');
}

async function loadLeaderData() {
  showLoading(true);
  try {
    const ds    = document.getElementById('filter-start').value;
    const de    = document.getElementById('filter-end').value;
    const turno = document.getElementById('filter-turno').value;
    const col   = document.getElementById('filter-colaborador').value;

    const _rldr = await fetch('tables/registros?limit=1000');
    if (!_rldr.ok) throw new Error('HTTP ' + _rldr.status);
    const _jldr = await _rldr.json();
    let data   = _jldr.data||[];

    /* Filtros */
    if (ds)    data = data.filter(r => r.data >= ds);
    if (de)    data = data.filter(r => r.data <= de);
    if (turno) data = data.filter(r => r.turno === turno);
    if (col)   data = data.filter(r => r.colaborador_card === col);

    S.leaderData = data;
    renderLeaderSummary(data);
    await populateCollabFilter(json.data||[]);

    /* Renderiza aba ativa */
    const tab = S.currentLeaderTab;
    if (tab==='registros') renderLeaderTable(data);
    if (tab==='pendentes') await renderPendentes();
    if (tab==='espelho')   renderEspelho(data);
    if (tab==='relatorio') loadRelatorio();
  } catch(e) {
    console.error(e);
    showToast('❌ Erro ao carregar dados');
  } finally {
    showLoading(false);
  }
}

/* Forçar carregar ao trocar aba */
function switchLeaderTabAndLoad(tab) {
  switchLeaderTab(tab);
  if (tab==='pendentes')  renderPendentes();
  if (tab==='espelho')    renderEspelho(S.leaderData);
  if (tab==='registros')  renderLeaderTable(S.leaderData);
}

/* Override da função switchLeaderTab para incluir load */
(function() {
  const orig = window.switchLeaderTab;
  window.switchLeaderTab = function(tab) {
    orig(tab);
    if      (tab==='pendentes')  renderPendentes();
    else if (tab==='espelho')    renderEspelho(S.leaderData);
    else if (tab==='registros')  renderLeaderTable(S.leaderData);
    else if (tab==='relatorio')  loadRelatorio();
    else if (tab==='tarefas')    loadTarefasGestao();
  };
})();

function renderLeaderSummary(data) {
  const total=data.length, ok=data.filter(r=>r.status==='total').length;
  const parcial=data.filter(r=>r.status==='parcial').length;
  const nao=data.filter(r=>r.status==='nao_finalizado').length;
  const taxa=total?Math.round(ok/total*100):0;
  document.getElementById('s-total').textContent=total;
  document.getElementById('s-ok').textContent=ok;
  document.getElementById('s-parcial').textContent=parcial;
  document.getElementById('s-nao').textContent=nao;
  document.getElementById('s-taxa').textContent=taxa+'%';
}

function renderLeaderTable(data) {
  const tbody=document.getElementById('leader-tbody');
  if (!data||!data.length) {
    tbody.innerHTML='<tr><td colspan="9" class="empty-row">😕 Nenhum registro — use os filtros</td></tr>';
    return;
  }
  const bmap = {
    total:'<span class="badge badge-total">✅ 100%</span>',
    parcial:'<span class="badge badge-parcial">⚠️ Parcial</span>',
    nao_finalizado:'<span class="badge badge-nao">❌ Não feito</span>',
  };
  tbody.innerHTML = data.map(r=>{
    const dObj=DIAS_LIST.find(d=>d.key===r.dia_semana);
    const badge=bmap[r.status]||'<span class="badge badge-pend">⏳</span>';
    return `<tr>
      <td>${r.data||'—'}</td>
      <td>${r.turno==='dia'?'☀️':r.turno==='noite'?'🌙':''}${r.turno||'—'}</td>
      <td>${dObj?dObj.short:(r.dia_semana||'—')}</td>
      <td><strong>${r.colaborador_card||'—'}</strong></td>
      <td>${r.item||'—'}</td>
      <td style="text-align:center">${r.quantidade_programada!==undefined?fmt(r.quantidade_programada):'—'}</td>
      <td style="text-align:center">${r.quantidade_produzida!==undefined?fmt(r.quantidade_produzida):'—'}</td>
      <td>${badge}</td>
      <td style="max-width:130px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${r.motivo||''}">${r.motivo||'—'}</td>
    </tr>`;
  }).join('');
}

/* ── ABA PENDENTES ─────────────────────────────────────── */
async function renderPendentes() {
  const container = document.getElementById('pendentes-list');
  container.innerHTML = '<div style="padding:20px;text-align:center">⏳ Carregando...</div>';
  try {
    const _rpend = await fetch('tables/pendencias?limit=1000');
    if (!_rpend.ok && _rpend.status !== 422) throw new Error('HTTP ' + _rpend.status);
    const json = _rpend.ok ? await _rpend.json() : {data:[]};
    const ds   = document.getElementById('filter-start').value;
    const de   = document.getElementById('filter-end').value;
    const turno= document.getElementById('filter-turno').value;
    const col  = document.getElementById('filter-colaborador').value;

    let data = (json.data||[]).filter(r=>!r.vistoriado || r.vistoriado==0);
    if (ds)    data=data.filter(r=>r.data>=ds);
    if (de)    data=data.filter(r=>r.data<=de);
    if (turno) data=data.filter(r=>r.turno===turno);
    if (col)   data=data.filter(r=>r.colaborador===col);

    if (!data.length) {
      container.innerHTML='<div style="padding:40px;text-align:center;color:#28A745;font-size:16px;font-weight:700">✅ Nenhuma pendência! Tudo ok.</div>';
      return;
    }

    /* Agrupar por data + colaborador */
    const grupos = {};
    data.forEach(r => {
      const k = `${r.data}||${r.colaborador}`;
      if (!grupos[k]) grupos[k]={data:r.data,collab:r.colaborador,turno:r.turno,items:[]};
      grupos[k].items.push(r);
    });

    container.innerHTML = Object.values(grupos).map(g => `
      <div class="pend-group">
        <div class="pend-group-header">
          <span>${g.turno==='dia'?'☀️':'🌙'} ${g.data} — <strong>${g.collab}</strong></span>
          <span class="pend-count">${g.items.length} pendente${g.items.length!==1?'s':''}</span>
        </div>
        ${g.items.map(r=>`
          <div class="pend-item" id="pend-${r.id}">
            <div class="pend-item-info">
              <span class="pend-item-name">${r.item}</span>
              <span class="pend-item-meta">${r.categoria||''} · ${sl(r.status)} ${r.motivo?'· '+r.motivo:''}</span>
            </div>
            <button class="pend-check-btn" onclick="checkPendente('${r.id}')" title="Marcar como vistoriado">
              <i class="fas fa-check"></i>
            </button>
          </div>`).join('')}
      </div>`).join('');
  } catch(e) {
    console.error(e);
    container.innerHTML='<div style="padding:20px;color:#dc3545;text-align:center">❌ Erro ao carregar pendências.<br><small>Tabela ainda não criada — finalize um turno primeiro.</small></div>';
  }
}

function sl(status) {
  const m={total:'✅ 100%',parcial:'⚠️ Parcial',nao_finalizado:'❌ Não feito','':'⏳'};
  return m[status||''];
}

async function checkPendente(id) {
  try {
    await fetch(`tables/pendencias/${id}`, {
      method:'PATCH', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ vistoriado: 1 }),
    });
    /* Animação de saída */
    const el = document.getElementById(`pend-${id}`);
    if (el) { el.style.transition='all .3s'; el.style.opacity='0'; el.style.maxHeight='0'; el.style.padding='0'; setTimeout(()=>el.remove(),300); }
    showToast('✅ Pendência vistoriada!');
  } catch(e) { console.error(e); showToast('❌ Erro ao marcar como vistoriado'); }
}

/* ── ABA ESPELHO ───────────────────────────────────────── */
function renderEspelho(data) {
  const container = document.getElementById('espelho-list');
  if (!data||!data.length) {
    container.innerHTML='<div style="padding:40px;text-align:center;color:#888">Use os filtros e clique em Filtrar</div>';
    return;
  }

  /* Agrupar por data → colaborador */
  const byDate = {};
  data.forEach(r => {
    const dk = r.data||'sem data';
    if (!byDate[dk]) byDate[dk]={};
    const ck = r.colaborador_card||'—';
    if (!byDate[dk][ck]) byDate[dk][ck]=[];
    byDate[dk][ck].push(r);
  });

  container.innerHTML = Object.entries(byDate).sort((a,b)=>b[0].localeCompare(a[0])).map(([dt, collabs]) => {
    const totalDia = Object.values(collabs).flat().length;
    const okDia    = Object.values(collabs).flat().filter(r=>r.status==='total').length;
    return `
    <div class="espelho-date-group">
      <div class="espelho-date-header">
        📅 ${dt} — ${okDia}/${totalDia} itens 100%
      </div>
      ${Object.entries(collabs).map(([collab, rows]) => {
        const tot=rows.length, ok=rows.filter(r=>r.status==='total').length;
        const parc=rows.filter(r=>r.status==='parcial').length;
        const naoF=rows.filter(r=>r.status==='nao_finalizado').length;
        const taxa=tot?Math.round(ok/tot*100):0;
        const taxaColor=taxa===100?'#28A745':taxa>=50?'#FD7E14':'#DC3545';
        return `
        <div class="espelho-collab">
          <div class="espelho-collab-header">
            <strong>${COLLAB_EMOJI[collab]||'👤'} ${collab}</strong>
            <span style="color:${taxaColor};font-weight:900">${taxa}%</span>
          </div>
          <table class="espelho-table">
            <thead><tr><th>Item</th><th>Prog.</th><th>Prod.</th><th>Status</th><th>Motivo</th></tr></thead>
            <tbody>
              ${rows.map(r=>{
                const bmap={total:'✅',parcial:'⚠️',nao_finalizado:'❌','':'⏳'};
                return `<tr>
                  <td>${r.item||'—'}</td>
                  <td>${r.quantidade_programada!==undefined?fmt(r.quantidade_programada):'—'}</td>
                  <td>${r.quantidade_produzida!==undefined?fmt(r.quantidade_produzida):'—'}</td>
                  <td>${bmap[r.status||'']||'⏳'} ${r.status==='total'?'100%':r.status==='parcial'?'Parcial':r.status==='nao_finalizado'?'Não feito':'Pendente'}</td>
                  <td style="max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.motivo||'—'}</td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
          <div class="espelho-collab-footer">
            ✅ ${ok} · ⚠️ ${parc} · ❌ ${naoF}
          </div>
        </div>`;
      }).join('')}
    </div>`;
  }).join('');
}

/* ── Impressões do líder ───────────────────────────────── */
function printLeaderReport() {
  const data=S.leaderData;
  if (!data||!data.length) { showToast('Sem dados. Filtre primeiro.'); return; }
  const linhas=data.map(r=>{
    const dObj=DIAS_LIST.find(d=>d.key===r.dia_semana);
    const sl2={total:'✅ 100%',parcial:'⚠️ Parcial',nao_finalizado:'❌ Não feito','':'⏳'};
    return `<tr>
      <td>${r.data||'—'}</td><td>${r.turno||'—'}</td>
      <td>${dObj?dObj.short:(r.dia_semana||'—')}</td>
      <td>${r.colaborador_card||'—'}</td><td>${r.item||'—'}</td>
      <td>${r.quantidade_programada!==undefined?r.quantidade_programada:'—'}</td>
      <td>${r.quantidade_produzida!==undefined?r.quantidade_produzida:'—'}</td>
      <td>${sl2[r.status||'']}</td><td>${r.motivo||'—'}</td>
    </tr>`;
  }).join('');
  triggerPrint(
    '🍔 Just Burger — Relatório de Produção',
    `Líder · ${fmtDate()}`,
    '<tr><th>Data</th><th>Turno</th><th>Dia</th><th>Colaborador</th><th>Item</th><th>Prog.</th><th>Prod.</th><th>Status</th><th>Motivo</th></tr>',
    linhas
  );
}

function printPendentes() {
  const data=(S.leaderData||[]).filter(r=>r.status!=='total');
  if (!data.length) { showToast('✅ Sem pendências!'); return; }
  const byCollab={};
  data.forEach(r=>{ const k=r.colaborador_card||'—'; if(!byCollab[k]) byCollab[k]=[]; byCollab[k].push(r); });
  let all='';
  Object.entries(byCollab).forEach(([c,rows])=>{
    all+=`<tr><td colspan="5" style="background:#111;color:#fff;font-weight:900;padding:8px">👤 ${c}</td></tr>`;
    rows.forEach(r=>{
      const sl2={parcial:'⚠️ Parcial',nao_finalizado:'❌ Não feito','':'⏳'};
      all+=`<tr><td>${r.data||'—'}</td><td>${r.item||'—'}</td>
        <td>${r.quantidade_programada!==undefined?r.quantidade_programada:'—'}</td>
        <td>${sl2[r.status||'']}</td><td>${r.motivo||'—'}</td></tr>`;
    });
  });
  triggerPrint('⚠️ Just Burger — Pendências','Líder · '+fmtDate(),
    '<tr><th>Data</th><th>Item</th><th>Programado</th><th>Status</th><th>Motivo</th></tr>',all);
}

function printAllCollabs() {
  const data=S.leaderData||[];
  if (!data.length) { showToast('Sem dados. Filtre primeiro.'); return; }
  const byCollab={};
  data.forEach(r=>{ const k=r.colaborador_card||'—'; if(!byCollab[k]) byCollab[k]=[]; byCollab[k].push(r); });
  let all='';
  Object.entries(byCollab).forEach(([c,rows])=>{
    const tot=rows.length, ok=rows.filter(r=>r.status==='total').length;
    const parc=rows.filter(r=>r.status==='parcial').length;
    const naoF=rows.filter(r=>r.status==='nao_finalizado').length;
    const taxa=tot?Math.round(ok/tot*100):0;
    all+=`<tr><td colspan="5" style="background:#111;color:#fff;font-weight:900;padding:10px">👤 ${c} — ${taxa}% (${ok}/${tot})</td></tr>`;
    rows.forEach(r=>{
      const sl2={total:'✅',parcial:'⚠️',nao_finalizado:'❌','':'⏳'};
      all+=`<tr><td>${r.data||'—'}</td><td>${r.item||'—'}</td>
        <td>${r.quantidade_programada!==undefined?r.quantidade_programada:'—'}</td>
        <td>${r.quantidade_produzida!==undefined?r.quantidade_produzida:'—'}</td>
        <td>${sl2[r.status||'']} ${r.status==='total'?'100%':r.status==='parcial'?'Parcial':r.status==='nao_finalizado'?'Não feito':'Pendente'}</td>
      </tr>`;
    });
    all+=`<tr><td colspan="5" style="background:#f5f5f5;font-size:11px;color:#666;padding:6px">✅${ok} ⚠️${parc} ❌${naoF}</td></tr>`;
  });
  triggerPrint('🍔 Just Burger — Por Colaborador','Líder · '+fmtDate(),
    '<tr><th>Data</th><th>Item</th><th>Programado</th><th>Produzido</th><th>Status</th></tr>',all);
}

function printEspelho() {
  printAllCollabs(); /* usa os mesmos dados */
}

/* ══════════════════════════════════════════════════════════
   ABA COBRANÇAS — zerar lista (marcar todos como vistoriado)
══════════════════════════════════════════════════════════ */
async function zerarCobrancas() {
  if (!confirm('Zerar toda a lista de cobranças? Todos os itens serão marcados como vistoriados.')) return;
  showLoading(true);
  try {
    const _rzero = await fetch('tables/pendencias?limit=1000');
    if (!_rzero.ok && _rzero.status !== 422) throw new Error('HTTP ' + _rzero.status);
    const _jzero = _rzero.ok ? await _rzero.json() : {data:[]};
    const pend = (_jzero.data||[]).filter(r => !r.vistoriado || r.vistoriado==0);
    await Promise.all(pend.map(r => fetch(`tables/pendencias/${r.id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({vistoriado:1})})));
    showToast('✅ Lista zerada!');
    renderPendentes();
  } catch(e) { console.error(e); showToast('❌ Erro ao zerar'); }
  finally { showLoading(false); }
}

/* ══════════════════════════════════════════════════════════
   ABA RELATÓRIO ANALÍTICO
══════════════════════════════════════════════════════════ */
async function loadRelatorio() {
  const container = document.getElementById('relatorio-list');
  if (!container) return;
  container.innerHTML = '<div style="padding:20px;text-align:center">⏳ Carregando...</div>';

  try {
    const ds     = document.getElementById('rel-start').value  || document.getElementById('filter-start').value;
    const de     = document.getElementById('rel-end').value    || document.getElementById('filter-end').value;
    const turno  = document.getElementById('rel-turno').value;
    const col    = document.getElementById('rel-colaborador').value;
    const motivo = document.getElementById('rel-motivo').value;
    const status = document.getElementById('rel-status').value;

    const _rrel = await fetch('tables/registros?limit=1000');
    if (!_rrel.ok) throw new Error('HTTP ' + _rrel.status);
    const _jrel = await _rrel.json();
    let data   = _jrel.data||[];

    /* Preenche filtro de colaboradores */
    const nomes = [...new Set(data.map(r=>r.colaborador_card).filter(Boolean))].sort();
    const selC  = document.getElementById('rel-colaborador');
    if (selC) {
      const cur = selC.value;
      selC.innerHTML = '<option value="">Todos</option>' +
        nomes.map(n=>`<option value="${n}"${n===cur?' selected':''}>${n}</option>`).join('');
    }

    if (ds)     data = data.filter(r => r.data >= ds);
    if (de)     data = data.filter(r => r.data <= de);
    if (turno)  data = data.filter(r => r.turno === turno);
    if (col)    data = data.filter(r => r.colaborador_card === col);
    if (status) data = data.filter(r => r.status === status);
    if (motivo) data = data.filter(r => (r.motivo||'').toLowerCase().includes(motivo));

    /* Resumo */
    const total = data.length;
    const ok    = data.filter(r=>r.status==='total').length;
    const parc  = data.filter(r=>r.status==='parcial').length;
    const naoF  = data.filter(r=>r.status==='nao_finalizado').length;
    const taxa  = total ? Math.round(ok/total*100) : 0;

    const sumRow = document.getElementById('rel-summary-row');
    if (sumRow) {
      sumRow.style.display = 'flex';
      sumRow.innerHTML = `
        <div class="summ-card summ-total"><span class="summ-emoji">📋</span><span class="summ-num">${total}</span><span class="summ-lbl">Total</span></div>
        <div class="summ-card summ-ok"><span class="summ-emoji">✅</span><span class="summ-num">${ok}</span><span class="summ-lbl">100%</span></div>
        <div class="summ-card summ-warn"><span class="summ-emoji">⚠️</span><span class="summ-num">${parc}</span><span class="summ-lbl">Parcial</span></div>
        <div class="summ-card summ-err"><span class="summ-emoji">❌</span><span class="summ-num">${naoF}</span><span class="summ-lbl">Não feito</span></div>
        <div class="summ-card summ-taxa"><span class="summ-emoji">📈</span><span class="summ-num">${taxa}%</span><span class="summ-lbl">Conclusão</span></div>`;
    }

    /* Gráfico de causas */
    const causasMap = {};
    data.filter(r=>r.status!=='total').forEach(r => {
      const m = (r.motivo||'Sem motivo').trim() || 'Sem motivo';
      causasMap[m] = (causasMap[m]||0) + 1;
    });
    const causasWrap = document.getElementById('rel-causas-wrap');
    const causasBars = document.getElementById('rel-causas-bars');
    if (causasWrap && causasBars && Object.keys(causasMap).length) {
      causasWrap.style.display = 'block';
      const maxVal = Math.max(...Object.values(causasMap));
      causasBars.innerHTML = Object.entries(causasMap)
        .sort((a,b)=>b[1]-a[1])
        .map(([m,v]) => {
          const pct = Math.round(v/maxVal*100);
          return `<div class="causa-bar-row">
            <span class="causa-label">${m}</span>
            <div class="causa-bar-track">
              <div class="causa-bar-fill" style="width:${pct}%"></div>
            </div>
            <span class="causa-count">${v}x</span>
          </div>`;
        }).join('');
    } else if (causasWrap) { causasWrap.style.display = 'none'; }

    if (!data.length) {
      container.innerHTML = '<div style="padding:40px;text-align:center;color:#888">😕 Nenhum registro para os filtros selecionados.</div>';
      return;
    }

    /* Agrupa por colaborador */
    const byCol = {};
    data.forEach(r => {
      const k = r.colaborador_card||'—';
      if (!byCol[k]) byCol[k] = [];
      byCol[k].push(r);
    });

    container.innerHTML = Object.entries(byCol).sort((a,b)=>a[0].localeCompare(b[0])).map(([colab, rows]) => {
      const t = rows.length;
      const o = rows.filter(r=>r.status==='total').length;
      const p = rows.filter(r=>r.status==='parcial').length;
      const n = rows.filter(r=>r.status==='nao_finalizado').length;
      const tx = t ? Math.round(o/t*100) : 0;
      const txColor = tx===100?'#28A745':tx>=50?'#FD7E14':'#DC3545';

      return `<div class="rel-collab-block">
        <div class="rel-collab-header">
          <span>${COLLAB_EMOJI[colab]||'👤'} <strong>${colab}</strong></span>
          <span style="color:${txColor};font-weight:900;font-size:18px">${tx}%</span>
        </div>
        <div class="rel-stats-row">
          <span class="rel-stat rel-stat-ok">✅ ${o} (100%)</span>
          <span class="rel-stat rel-stat-parc">⚠️ ${p} (Parcial)</span>
          <span class="rel-stat rel-stat-nao">❌ ${n} (Não feito)</span>
        </div>
        <div class="rel-cards-grid">
          ${rows.map(r => {
            const stCls = r.status==='total'?'rel-card-ok':r.status==='parcial'?'rel-card-parc':'rel-card-nao';
            const stIcon = r.status==='total'?'✅':r.status==='parcial'?'⚠️':'❌';
            const prog = r.quantidade_programada !== undefined ? fmt(r.quantidade_programada) : '—';
            const prod = r.quantidade_produzida  !== undefined ? fmt(r.quantidade_produzida)  : '—';
            const pctItem = (r.quantidade_programada && r.quantidade_programada > 0)
              ? Math.round((r.quantidade_produzida||0) / r.quantidade_programada * 100) : null;
            return `<div class="rel-card ${stCls}">
              <div class="rel-card-top">
                <span class="rel-card-icon">${stIcon}</span>
                <span class="rel-card-item">${r.item||'—'}</span>
              </div>
              <div class="rel-card-data">${r.data||''} ${r.turno==='dia'?'☀️':'🌙'}</div>
              ${r.status!=='total' ? `<div class="rel-card-qty">Prog: ${prog} → Prod: ${prod}${pctItem!==null?' ('+pctItem+'%)':''}</div>` : ''}
              ${r.motivo ? `<div class="rel-card-motivo">💬 ${r.motivo}</div>` : ''}
            </div>`;
          }).join('')}
        </div>
      </div>`;
    }).join('');

  } catch(e) {
    console.error(e);
    container.innerHTML = '<div style="padding:20px;color:#dc3545">❌ Erro ao carregar relatório.</div>';
  }
}

/* ══════════════════════════════════════════════════════════
   ABA TAREFAS — Gestão por turno/dia
══════════════════════════════════════════════════════════ */
function setTarTurno(turno) {
  document.getElementById('tar-filter-turno').value = turno;
  document.getElementById('tarbtn-dia').classList.toggle('active',   turno==='dia');
  document.getElementById('tarbtn-noite').classList.toggle('active', turno==='noite');
  loadTarefasGestao();
}

function setTarDia(dia) {
  document.getElementById('tar-filter-dia').value = dia;
  document.querySelectorAll('.tar-dia-btn').forEach(b => b.classList.toggle('active', b.dataset.dia===dia));
  loadTarefasGestao();
}

async function loadTarefasGestao() {
  const container = document.getElementById('tarefas-gestao-list');
  if (!container) return;
  container.innerHTML = '<div style="padding:20px;text-align:center;color:#888">⏳ Carregando...</div>';

  const turno = document.getElementById('tar-filter-turno').value || 'dia';
  const dia   = document.getElementById('tar-filter-dia').value   || 'segunda';
  const colab = (document.getElementById('tar-filter-colab') || {}).value || '';

  try {
    const _rt2 = await fetch('tables/tarefas?limit=1000');
    if (!_rt2.ok) throw new Error('HTTP ' + _rt2.status);
    const _jtar2 = await _rt2.json();
    const all  = _jtar2.data || [];

    /* Popula filtro de colaboradores com base em turno+dia */
    const colabsNoDia = [...new Set(all.filter(t=>t.turno===turno&&t.dia_semana===dia).map(t=>t.colaborador).filter(Boolean))].sort();
    const selC = document.getElementById('tar-filter-colab');
    if (selC) {
      const cur = selC.value;
      selC.innerHTML = '<option value="">Todos</option>' +
        colabsNoDia.map(c=>`<option value="${c}"${c===cur?' selected':''}>${c}</option>`).join('');
    }

    let data = all.filter(t => t.turno===turno && t.dia_semana===dia);
    if (colab) data = data.filter(t => t.colaborador===colab);
    data.sort((a,b) => (a.colaborador||'').localeCompare(b.colaborador||'') || (a.ordem||0)-(b.ordem||0));

    /* Contador */
    const countBar = document.getElementById('tar-count-bar');
    if (countBar) countBar.innerHTML = `<span>${data.length} tarefa${data.length!==1?'s':''} — ${colabsNoDia.length} colaborador${colabsNoDia.length!==1?'es':''}</span>`;

    if (!data.length) {
      container.innerHTML = `<div style="padding:40px;text-align:center;color:#888">
        <div style="font-size:40px;margin-bottom:12px">😕</div>
        <strong>Nenhuma tarefa para ${turno==='dia'?'☀️ Dia':'🌙 Noite'} — ${dia}</strong><br>
        <small style="color:#aaa">Clique em "+ Nova Tarefa" para adicionar</small>
      </div>`;
      return;
    }

    /* Agrupa por colaborador */
    const byCol = {};
    data.forEach(t => { if (!byCol[t.colaborador]) byCol[t.colaborador]=[]; byCol[t.colaborador].push(t); });

    container.innerHTML = Object.entries(byCol).map(([col, tasks]) => `
      <div class="tar-collab-block">
        <div class="tar-collab-header">
          <span>${COLLAB_EMOJI[col]||'👤'} <strong>${col}</strong></span>
          <span class="tar-count">${tasks.length} tarefa${tasks.length!==1?'s':''}</span>
        </div>
        <div class="tar-table-wrap">
          <table class="tar-table">
            <thead>
              <tr>
                <th style="width:22%">Categoria</th>
                <th>Item</th>
                <th style="width:120px;text-align:center">Qtd Padrão</th>
                <th style="width:50px;text-align:center">Un</th>
                <th style="width:100px;text-align:center">Ações</th>
              </tr>
            </thead>
            <tbody>
              ${tasks.map(t => `
              <tr class="tar-row" id="tar-${t.id}">
                <td><span class="tar-cat-badge">${t.categoria||'Geral'}</span></td>
                <td class="tar-item-name-cell">${t.item||'—'}</td>
                <td style="text-align:center">
                  <div class="tar-qty-wrap" style="justify-content:center">
                    <button class="tar-qty-btn" onclick="adjTarQty('${t.id}',-1)">−</button>
                    <input class="tar-qty-input" type="number" id="tqty-${t.id}" value="${t.quantidade_padrao||0}" min="0"/>
                    <button class="tar-qty-btn plus" onclick="adjTarQty('${t.id}',1)">+</button>
                  </div>
                </td>
                <td style="text-align:center;font-size:12px;color:#888">${t.unidade||''}</td>
                <td>
                  <div class="tar-actions" style="justify-content:center">
                    <button class="tar-btn-save" onclick="saveTarQty('${t.id}')" title="Salvar quantidade"><i class="fas fa-save"></i></button>
                    <button class="tar-btn-edit" onclick="openModalEditTask('${t.id}')" title="Editar"><i class="fas fa-pen"></i></button>
                    <button class="tar-btn-del"  onclick="deleteTarefa('${t.id}')" title="Excluir"><i class="fas fa-trash"></i></button>
                  </div>
                </td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`).join('');

  } catch(e) {
    console.error(e);
    container.innerHTML = '<div style="padding:20px;color:#dc3545">❌ Erro ao carregar tarefas.</div>';
  }
}

function adjTarQty(id, delta) {
  const inp = document.getElementById(`tqty-${id}`);
  if (inp) inp.value = Math.max(0, Number(inp.value) + delta);
}

async function saveTarQty(id) {
  const inp = document.getElementById(`tqty-${id}`);
  if (!inp) return;
  const qty = Number(inp.value);
  try {
    await fetch(`tables/tarefas/${id}`, {
      method:'PATCH', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ quantidade_padrao: qty }),
    });
    /* Feedback visual rápido no botão */
    const btn = inp.closest('.tar-item').querySelector('.tar-btn-save');
    if (btn) { btn.innerHTML = '<i class="fas fa-check"></i>'; setTimeout(()=>{ btn.innerHTML='<i class="fas fa-save"></i>'; },1200); }
  } catch(e) { console.error(e); showToast('❌ Erro ao salvar'); }
}

async function deleteTarefa(id) {
  if (!confirm('Excluir esta tarefa? Esta ação não pode ser desfeita.')) return;
  try {
    await fetch(`tables/tarefas/${id}`, { method:'DELETE' });
    const el = document.getElementById(`tar-${id}`);
    if (el) { el.style.transition='all .3s'; el.style.opacity='0'; el.style.maxHeight='0'; el.style.overflow='hidden'; setTimeout(()=>el.remove(),300); }
    showToast('🗑️ Tarefa excluída!');
  } catch(e) { console.error(e); showToast('❌ Erro ao excluir'); }
}

let _teColabs = [];
async function openModalNewTask() {
  document.getElementById('te-id').value = '';
  document.getElementById('modal-task-edit-title').textContent = 'Nova Tarefa';
  document.getElementById('te-item').value = '';
  document.getElementById('te-cat').value  = '';
  document.getElementById('te-qty').value  = '';
  document.getElementById('te-unit').value = '';
  document.getElementById('te-ordem').value = '';
  document.getElementById('te-turno').value = document.getElementById('tar-filter-turno').value || 'dia';
  document.getElementById('te-dia').value   = document.getElementById('tar-filter-dia').value   || 'segunda';
  await _populateTeColab('');
  document.getElementById('modal-task-edit').classList.remove('hidden');
}

async function openModalEditTask(id) {
  try {
    const _rt3 = await fetch(`tables/tarefas/${id}`);
    const t    = await _rt3.json();
    document.getElementById('te-id').value    = t.id;
    document.getElementById('modal-task-edit-title').textContent = 'Editar Tarefa';
    document.getElementById('te-item').value  = t.item||'';
    document.getElementById('te-cat').value   = t.categoria||'';
    document.getElementById('te-qty').value   = t.quantidade_padrao||0;
    document.getElementById('te-unit').value  = t.unidade||'';
    document.getElementById('te-ordem').value = t.ordem||'';
    document.getElementById('te-turno').value = t.turno||'dia';
    document.getElementById('te-dia').value   = t.dia_semana||'segunda';
    await _populateTeColab(t.colaborador||'');
    document.getElementById('modal-task-edit').classList.remove('hidden');
  } catch(e) { console.error(e); showToast('❌ Erro ao carregar tarefa'); }
}

async function _populateTeColab(selected) {
  try {
    /* Começa com a lista fixa de colaboradores */
    let cols = [...TODOS_COLABS_APP];
    /* Tenta adicionar colaboradores que já têm tarefas mas não estão na lista fixa */
    try {
      const _rt4 = await fetch('tables/tarefas?limit=1000');
      if (_rt4.ok) {
        const _jt4 = await _rt4.json();
        const dosBanco = (_jt4.data||[]).map(t=>t.colaborador).filter(Boolean);
        cols = [...new Set([...cols, ...dosBanco])].sort();
      }
    } catch(e) { /* ignora — usa só a lista fixa */ }

    const sel  = document.getElementById('te-colab');
    sel.innerHTML = '<option value="">— Selecione o colaborador —</option>' +
      cols.map(c=>`<option value="${c}"${c===selected?' selected':''}>${c}</option>`).join('');
    /* Opção para novo colaborador não listado */
    sel.innerHTML += `<option value="__novo__">+ Outro (digitar manualmente)</option>`;
  } catch(e) { console.error(e); }
}

async function saveTaskEdit() {
  const id    = document.getElementById('te-id').value;
  let   colab = document.getElementById('te-colab').value;
  if (colab === '__novo__') {
    colab = prompt('Digite o nome do colaborador (em maiúsculas):');
    if (!colab) return;
    colab = colab.trim().toUpperCase();
  }
  const body = {
    colaborador:      colab,
    turno:            document.getElementById('te-turno').value,
    dia_semana:       document.getElementById('te-dia').value,
    categoria:        document.getElementById('te-cat').value.trim(),
    item:             document.getElementById('te-item').value.trim(),
    quantidade_padrao: Number(document.getElementById('te-qty').value)||0,
    unidade:          document.getElementById('te-unit').value.trim(),
    ordem:            Number(document.getElementById('te-ordem').value)||99,
  };
  if (!colab || colab === '')        { showToast('⚠️ Selecione o colaborador!'); return; }
  if (!body.item) { showToast('⚠️ Informe o nome do item!'); return; }

  const btn = document.querySelector('#modal-task-edit .btn-modal-confirm');
  if (btn) { btn.disabled = true; btn.textContent = 'Salvando...'; }

  try {
    if (id) {
      /* Edição: usa PUT */
      const _rpu = await fetch(`tables/tarefas/${id}`, {
        method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body)
      });
      if (!_rpu.ok) throw new Error('HTTP ' + _rpu.status);
      showToast('✅ Tarefa atualizada!');
    } else {
      /* Nova tarefa: gera ID único explícito */
      const novoBody = { id: 'tar-' + Date.now(), ...body };
      const _rpo = await fetch('tables/tarefas', {
        method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(novoBody)
      });
      if (!_rpo.ok) throw new Error('HTTP ' + _rpo.status);
      showToast('✅ Tarefa criada com sucesso!');
    }
    closeModal('modal-task-edit');
    /* Invalida cache para que a nova tarefa apareça nos cards */
    _invalidarCache();
    loadTarefasGestao();
  } catch(e) {
    console.error(e);
    showToast('❌ Erro ao salvar tarefa: ' + e.message);
  } finally {
    if (btn) { btn.disabled = false; btn.innerHTML = '💾 Salvar'; }
  }
}

/* ══════════════════════════════════════════════════════════
   UTILITÁRIOS
══════════════════════════════════════════════════════════ */
function showLoading(on) { document.getElementById('loading-overlay').classList.toggle('hidden',!on); }

let _toastTimer=null;
function showToast(msg) {
  const el=document.getElementById('toast');
  if(!el) return;
  el.textContent=msg; el.classList.remove('hidden'); el.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer=setTimeout(()=>{ el.classList.remove('show'); setTimeout(()=>el.classList.add('hidden'),300); },3000);
}

function closeModal(id) {
  const el=document.getElementById(id);
  if(el) el.classList.add('hidden');
}

function shakeEl(id) {
  const el=document.getElementById(id);
  if(!el) return;
  el.classList.add('shake');
  setTimeout(()=>el.classList.remove('shake'),500);
}

function fmt(n) { if(n===null||n===undefined||n==='') return '—'; return Number(n).toLocaleString('pt-BR'); }
function today() { return new Date().toISOString().slice(0,10); }
function fmtDate() { return new Date().toLocaleDateString('pt-BR',{weekday:'long',year:'numeric',month:'long',day:'numeric'}); }

function getCatClass(cat) {
  if(!cat) return '';
  const c=cat.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z]/g,'');
  const map={prepreparo:'cat-pre-preparo',producao:'cat-producao',saches:'cat-saches',
    saladas:'cat-saladas',fritadeira:'cat-fritadeira',hamburger:'cat-hamburger',
    logistica:'cat-logistica',camaras:'cat-camaras',ilhaquente:'cat-ilha',
    ilhafria:'cat-ilha',ilha:'cat-ilha',abertura:'cat-abertura',supervisao:'cat-supervisao',
    limpeza:'cat-limpeza',paes:'cat-paes',maionese:'cat-maionese',carnes:'cat-carnes',molhos:'cat-molhos'};
  for(const[k,v] of Object.entries(map)) if(c.includes(k)) return v;
  return '';
}

function getCatColor(cat) {
  if(!cat) return '#333';
  const c=cat.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const map={
    'pré-preparo':'linear-gradient(135deg,#FF6B6B,#FF8E53)',
    'produção':'linear-gradient(135deg,#4ECDC4,#44A08D)',
    'sachês':'linear-gradient(135deg,#45B7D1,#2980B9)',
    'saladas':'linear-gradient(135deg,#56ab2f,#a8e063)',
    'fritadeira':'linear-gradient(135deg,#f093fb,#f5576c)',
    'hamburger / logística':'linear-gradient(135deg,#667eea,#764ba2)',
    'hamburger':'linear-gradient(135deg,#667eea,#764ba2)',
    'logística':'linear-gradient(135deg,#555,#888)',
    'câmaras':'linear-gradient(135deg,#00C6FF,#0072FF)',
    'ilha quente / chapeiro':'linear-gradient(135deg,#f83600,#fe8c00)',
    'ilha fria / montador':'linear-gradient(135deg,#4facfe,#00f2fe)',
    'ilha':'linear-gradient(135deg,#4facfe,#00f2fe)',
    'supervisão':'linear-gradient(135deg,#DEB887,#A0522D)',
    'limpeza':'linear-gradient(135deg,#26D0CE,#1A2980)',
    'pães':'linear-gradient(135deg,#F4A460,#6E2800)',
    'maionese':'linear-gradient(135deg,#F9CA24,#F0932B)',
    'carnes':'linear-gradient(135deg,#FF8C00,#8B3A00)',
    'molhos':'linear-gradient(135deg,#FFD700,#FF8C00)',
    'preparo':'linear-gradient(135deg,#FFA07A,#E74C3C)',
  };
  const found=Object.entries(map).find(([k])=>c.includes(k));
  return found?found[1]:'linear-gradient(135deg,#333,#555)';
}

function getCatEmoji(cat) {
  if(!cat) return '📋';
  const c=cat.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const found=Object.entries(CAT_EMOJI).find(([k])=>c.includes(k));
  return found?found[1]:'📋';
}

/* ══════════════════════════════════════════════════════════
   TELA DE RESULTADOS / PENDÊNCIAS DO DIA (in-app)
══════════════════════════════════════════════════════════ */
function abrirResultados() {
  /* Usa a data de trabalho selecionada (pode ser diferente de hoje) */
  const dataRef  = S.dataTrabalho || today();
  const dtRef    = new Date(dataRef + 'T12:00:00');
  const diaAtual = DIA_JS_MAP[dtRef.getDay()];
  const turnoAtual = S.turno || 'dia';

  /* Preenche data */
  const inp = document.getElementById('res-data');
  if (inp) inp.value = dataRef;

  /* Preenche turno */
  document.getElementById('res-turno').value = turnoAtual;
  document.getElementById('resbtn-dia').classList.toggle('active',   turnoAtual==='dia');
  document.getElementById('resbtn-noite').classList.toggle('active', turnoAtual==='noite');

  /* Marca o dia correto nos botões */
  setResDia(diaAtual);
  showScreen('screen-resultados');
  loadResultados();
}

function setResTurno(turno) {
  document.getElementById('res-turno').value = turno;
  document.getElementById('resbtn-dia').classList.toggle('active',   turno==='dia');
  document.getElementById('resbtn-noite').classList.toggle('active', turno==='noite');
  loadResultados();
}

function setResDia(dia) {
  document.getElementById('res-dia').value = dia;
  document.querySelectorAll('.tar-dia-btn[data-rdia]').forEach(b =>
    b.classList.toggle('active', b.dataset.rdia === dia)
  );
  loadResultados();
}

async function loadResultados() {
  const container = document.getElementById('res-lista');
  const summBar   = document.getElementById('res-summary-bar');
  if (!container) return;

  container.innerHTML = '<div style="padding:30px;text-align:center;color:#888"><div style="font-size:28px;margin-bottom:8px">⏳</div>Carregando...</div>';
  if (summBar) summBar.innerHTML = '';

  const turno = document.getElementById('res-turno').value || 'dia';
  const dia   = document.getElementById('res-dia').value   || 'segunda';
  const data  = (document.getElementById('res-data') || {}).value || today();

  try {
    const [_rpRes, _rsRes] = await Promise.all([
      fetch('tables/pendencias?limit=1000'),
      fetch('tables/sessoes?limit=1000')
    ]);
    const dataPend = _rpRes.ok ? await _rpRes.json() : {data:[]};
    const dataSess = _rsRes.ok ? await _rsRes.json() : {data:[]};

    let pendencias = (dataPend.data || []).filter(p =>
      (!data  || p.data === data) &&
      (!turno || p.turno === turno) &&
      (!dia   || p.dia_semana === dia)
    );
    let sessoes = (dataSess.data || []).filter(s =>
      (!data  || s.data === data) &&
      (!turno || s.turno === turno) &&
      (!dia   || s.dia_semana === dia)
    );

    /* Resumo */
    const pendAtivos = pendencias.filter(p => !p.vistoriado || p.vistoriado == 0);
    const collabNomes = [...new Set([
      ...sessoes.map(s => s.colaborador_nome).filter(Boolean),
      ...pendencias.map(p => p.colaborador).filter(Boolean)
    ])];
    const collabSemPend = collabNomes.filter(n =>
      !pendencias.find(p => p.colaborador === n || p.colaborador_nome === n)
    ).length;

    if (summBar) {
      summBar.innerHTML = `
        <div class="res-sum-card res-sum-blue"><span class="res-sum-val">${collabNomes.length}</span><span class="res-sum-lbl">Colaboradores</span></div>
        <div class="res-sum-card res-sum-green"><span class="res-sum-val">${collabSemPend}</span><span class="res-sum-lbl">100% OK</span></div>
        <div class="res-sum-card res-sum-orange"><span class="res-sum-val">${pendencias.length}</span><span class="res-sum-lbl">Pendências</span></div>
        <div class="res-sum-card res-sum-red"><span class="res-sum-val">${pendAtivos.length}</span><span class="res-sum-lbl">Aguard. Ciência</span></div>`;
    }

    if (!pendencias.length) {
      container.innerHTML = sessoes.length
        ? `<div style="padding:40px;text-align:center;color:#28A745;font-size:16px;font-weight:700">
             <div style="font-size:48px;margin-bottom:12px">✅</div>
             Tudo finalizado 100%! Nenhuma pendência.
           </div>`
        : `<div style="padding:40px;text-align:center;color:#888;font-size:14px">
             <div style="font-size:40px;margin-bottom:12px">📭</div>
             Nenhum dado para os filtros selecionados.
           </div>`;
      return;
    }

    /* Agrupa por colaborador */
    const porColab = {};
    pendencias.forEach(p => {
      const nome = p.colaborador || p.colaborador_nome || '?';
      if (!porColab[nome]) porColab[nome] = [];
      porColab[nome].push(p);
    });

    let html = '';
    Object.keys(porColab).sort().forEach(nome => {
      const itens    = porColab[nome];
      const nParcial = itens.filter(i => i.status === 'parcial').length;
      const nNao     = itens.filter(i => i.status === 'nao_finalizado').length;
      const nCiente  = itens.filter(i => i.vistoriado == 1).length;
      const todoCiente = nCiente === itens.length;
      const slugN    = _resSlug(nome);

      html += `
      <div class="res-collab-card${todoCiente ? ' res-all-done' : ''}" id="rcc-${slugN}">
        <div class="res-card-header" onclick="_resToggle('${slugN}')">
          <div class="res-card-avatar">${_resEmoji(nome)}</div>
          <div class="res-card-info">
            <div class="res-card-name">${nome}</div>
            <div class="res-card-meta">${itens.length} item(s) pendente(s)${todoCiente ? ' — ✅ Todos cientes' : ''}</div>
          </div>
          <div class="res-pills">
            ${nParcial > 0 ? `<span class="res-pill res-pill-orange">⚠️ ${nParcial}</span>` : ''}
            ${nNao > 0     ? `<span class="res-pill res-pill-red">❌ ${nNao}</span>` : ''}
            ${nCiente > 0 && !todoCiente ? `<span class="res-pill res-pill-green">✅ ${nCiente}</span>` : ''}
          </div>
          <i class="fas fa-chevron-down res-chevron" id="rch-${slugN}"></i>
        </div>
        <div class="res-tasks-list hidden" id="rtl-${slugN}">
          ${_resRenderTasks(itens, slugN)}
        </div>
      </div>`;
    });

    container.innerHTML = html;

  } catch(e) {
    console.error(e);
    container.innerHTML = `<div style="padding:20px;color:#dc3545">❌ Erro ao carregar: ${e.message}</div>`;
  }
}

function _resRenderTasks(itens, slugN) {
  return itens.map(item => {
    const isVist   = item.vistoriado == 1;
    const isParcial = item.status === 'parcial';
    const qProg  = item.quantidade_programada || 0;
    const qFeit  = item.quantidade_produzida  || 0;
    const qRest  = Math.max(0, qProg - qFeit);
    const icon   = isParcial ? '⚠️' : '❌';
    const stLabel = isParcial ? 'Parcial' : 'Não feito';
    const stColor = isParcial ? '#f97316' : '#ef4444';

    return `
    <div class="res-task-item" id="rti-${item.id}">
      <div class="res-task-icon">${icon}</div>
      <div class="res-task-body">
        <div class="res-task-name">${item.item || '—'}</div>
        <div class="res-task-detail">
          ${item.categoria ? `<strong>${item.categoria}</strong> ·` : ''}
          <span style="color:${stColor}">${stLabel}</span>
          ${item.motivo ? ` · 💬 ${item.motivo}` : ''}
        </div>
        <div class="res-task-qtds">
          ${qProg > 0 ? `<span class="res-qtd-badge res-qtd-prog">📋 ${qProg}</span>` : ''}
          ${qFeit > 0 ? `<span class="res-qtd-badge res-qtd-feito">✅ ${qFeit}</span>` : ''}
          ${qRest > 0 ? `<span class="res-qtd-badge res-qtd-rest">⬇️ ${qRest}</span>` : ''}
        </div>
      </div>
      <div class="res-task-actions">
        ${isVist
          ? `<span class="res-btn-ciente res-btn-done"><i class="fas fa-check"></i> Ciente</span>`
          : `<button class="res-btn-ciente" onclick="_resCiente('${item.id}','${slugN}')"><i class="fas fa-check"></i> Ciente</button>`
        }
      </div>
    </div>`;
  }).join('');
}

function _resToggle(slug) {
  const list  = document.getElementById(`rtl-${slug}`);
  const arrow = document.getElementById(`rch-${slug}`);
  if (!list) return;
  const isOpen = !list.classList.contains('hidden');
  list.classList.toggle('hidden', isOpen);
  if (arrow) arrow.style.transform = isOpen ? '' : 'rotate(180deg)';
}

async function _resCiente(id, slugN) {
  try {
    await fetch(`tables/pendencias/${id}`, {
      method:'PATCH', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ vistoriado: 1 }),
    });
    const el = document.getElementById(`rti-${id}`);
    if (el) {
      el.style.transition = 'all .3s';
      el.style.opacity = '0';
      el.style.maxHeight = '0';
      el.style.overflow = 'hidden';
      setTimeout(() => {
        el.remove();
        _resVerificaVazio(slugN);
      }, 300);
    }
    showToast('✅ Ciente registrado!');
  } catch(e) { showToast('❌ Erro ao registrar ciência'); }
}

function _resVerificaVazio(slugN) {
  const tl = document.getElementById(`rtl-${slugN}`);
  const cb = document.getElementById(`rcc-${slugN}`);
  if (!tl || !cb) return;
  const restantes = tl.querySelectorAll('.res-task-item');
  if (restantes.length === 0) {
    cb.classList.add('res-all-done');
    const meta = cb.querySelector('.res-card-meta');
    if (meta) meta.textContent = '✅ Todos os itens com ciência';
  }
}

function _resSlug(str) {
  return (str || '').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '-');
}

function _resEmoji(nome) {
  const emojis = ['👨‍🍳','👩‍🍳','🧑‍🍳','😎','🙂','😊','🤩','👌','💪','🍔','⭐','🌟'];
  let sum = 0;
  for (let i = 0; i < nome.length; i++) sum += nome.charCodeAt(i);
  return emojis[sum % emojis.length];
}
