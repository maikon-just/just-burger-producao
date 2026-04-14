/* ══════════════════════════════════════════════════════════
   JUST BURGER 🍔 — app_v3.js
   Controle de Produção — Firebase Realtime Database (compat)
   Versão: 2026-04-13 — Botão Sair Global + iframe print
═══════════════════════════════════════════════════════════ */
'use strict';

/* ══ SENHAS ══════════════════════════════════════════════ */
const LEADER_PASSWORD  = 'lider123*';
const COLLAB_PASSWORDS = { 'DINA': 'lider123*', 'SANDRO': 'lider123*' };
const DEPT_PASSWORD    = { 'ATENDIMENTO': 'lider123*' };

/* ══ MAPA COLABORADOR → DEPARTAMENTO ════════════════════ */
const COLLAB_DEPT = {
  // Atendimento
  'ANTONIEL':'ATENDIMENTO','ANTONIEL INICIO':'ATENDIMENTO','ANTONIEL FINALIZAÇÃO':'ATENDIMENTO',
  'MARCUS':'ATENDIMENTO','MARCUS INICIO':'ATENDIMENTO','MARCUS FINALIZAÇÃO':'ATENDIMENTO',
  'ALINE':'ATENDIMENTO','ALINE INICIO':'ATENDIMENTO','ALINE FINALIZAÇÃO':'ATENDIMENTO',
  'DESPACHO':'ATENDIMENTO','ATENDIMENTO / DESPACHO':'ATENDIMENTO','ABC':'ATENDIMENTO',
  // Operação
  'ALAN RICARDO':'OPERACAO','SAMUEL':'OPERACAO','LOHAINE':'OPERACAO',
  'GABRIEL LEITE':'OPERACAO','RHUAN':'OPERACAO','FRITADEIRA':'OPERACAO',
  'NOITE - CHAPEIRO':'OPERACAO','NOITE - MONTADOR':'OPERACAO','NOITE - FRITADEIRA':'OPERACAO',
  // Produção (dia + noite)
  'GABRIEL KHALYL':'PRODUCAO','JOÃO':'PRODUCAO','PABLO':'PRODUCAO',
  'MATEUS':'PRODUCAO','MATEUS PRODUÇÃO':'PRODUCAO',
  'JOSÉ BRUNO':'PRODUCAO','FABIO':'PRODUCAO','SERGIO CAMARAS':'PRODUCAO',
  'WESLEY MOTORISTA':'PRODUCAO','FAXINA':'PRODUCAO',
  'HENRIQUE':'PRODUCAO','PEDRO':'PRODUCAO','DAVI':'PRODUCAO',
  'ESTAGIARIO HENRIQUE':'PRODUCAO','ESTÁGIO PEDRO':'PRODUCAO','ESTÁGIO DAVI':'PRODUCAO',
  'DINA':'PRODUCAO','SANDRO':'PRODUCAO',
};

/* ══ CONSTANTES ═══════════════════════════════════════════ */
const UNIDADES_CHECKLIST = [
  'checklist','vídeo','video','execução','execucao','tarefa','atividade',
  'limpeza','higienização','higienizacao','conferir','verificar','organizar',
  'abastecer','s/qtd','sem qtd','sem quantidade','turno','vez','dia',
  'sessao','sessão','serviço','servico',
];

const DIAS_LIST = [
  { key:'segunda', label:'Segunda-feira', short:'SEG', icon:'📅' },
  { key:'terca',   label:'Terça-feira',   short:'TER', icon:'📅' },
  { key:'quarta',  label:'Quarta-feira',  short:'QUA', icon:'📅' },
  { key:'quinta',  label:'Quinta-feira',  short:'QUI', icon:'📅' },
  { key:'sexta',   label:'Sexta-feira',   short:'SEX', icon:'📅' },
  { key:'sabado',  label:'Sábado',        short:'SAB', icon:'🎉' },
  { key:'domingo', label:'Domingo',       short:'DOM', icon:'😎' },
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

const COLLAB_EMOJI = {
  'DINA':'👩‍💼','SANDRO':'👨‍💼','PABLO':'🍗','MATEUS':'🥫','JOÃO':'🔪',
  'ALAN RICARDO':'🔥','GABRIEL KHALYL':'🥩','GABRIEL LEITE':'🧊','LOHAINE':'🍟',
  'RHUAN':'🍟','FRITADEIRA':'🍟','ATENDIMENTO / DESPACHO':'📦','FABIO':'🧀','DAVI':'🍅',
  'HENRIQUE':'🥬','JOSÉ BRUNO':'🥓','PEDRO':'🥤','SAMUEL':'🧊','LUCAS':'🍳',
  'FERNANDO':'🍖','RODRIGO':'🧀','JHON':'🌶️','ABC':'🏪','DESPACHO':'📦',
  'SERGIO CAMARAS':'📸','WESLEY MOTORISTA':'🚚','FAXINA':'🧹',
  'MATEUS PRODUÇÃO':'🥫','ESTAGIARIO HENRIQUE':'🥬','ESTÁGIO PEDRO':'🥤','ESTÁGIO DAVI':'🍅',
  'NOITE - CHAPEIRO':'🔥','NOITE - FRITADEIRA':'🍟','NOITE - MONTADOR':'🧊',
  'ANTONIEL':'🎯','ANTONIEL INICIO':'🎯','ANTONIEL FINALIZAÇÃO':'✅',
  'MARCUS':'📋','MARCUS INICIO':'📋','MARCUS FINALIZAÇÃO':'✅',
  'ALINE':'🎀','ALINE INICIO':'🎀','ALINE FINALIZAÇÃO':'✅',
};

const COLLAB_SETOR = {
  'DINA':'Supervisão Dia','SANDRO':'Supervisão Noite','PABLO':'Pré-preparo / Estagiário',
  'MATEUS':'Sachês / Produção','MATEUS PRODUÇÃO':'Sachês / Produção',
  'JOÃO':'Pré-preparo / Cozinha','ALAN RICARDO':'Ilha / Chapeiro',
  'GABRIEL KHALYL':'Hambúrguer / Logística','GABRIEL LEITE':'Ilha / Montador',
  'LOHAINE':'Fritadeira','RHUAN':'Fritadeira','FRITADEIRA':'Fritadeira',
  'ATENDIMENTO / DESPACHO':'Atendimento / Despacho','ABC':'Loja ABC',
  'FABIO':'Produção Noite','JOSÉ BRUNO':'Câmaras / Produção',
  'SERGIO CAMARAS':'Câmaras','WESLEY MOTORISTA':'Logística / Motorista',
  'FAXINA':'Limpeza / Faxina','DESPACHO':'Despacho Noite',
  'HENRIQUE':'Estagiário Noite','PEDRO':'Estagiário Noite','DAVI':'Estagiário Noite',
  'ESTAGIARIO HENRIQUE':'Estagiário Noite','ESTÁGIO PEDRO':'Estagiário Noite','ESTÁGIO DAVI':'Estagiário Noite',
  'ANTONIEL':'Atendimento Noite','ANTONIEL INICIO':'Atendimento / Inicio',
  'ANTONIEL FINALIZAÇÃO':'Atendimento / Finalização',
  'MARCUS':'Atendimento Noite','MARCUS INICIO':'Atendimento / Inicio',
  'MARCUS FINALIZAÇÃO':'Atendimento / Finalização',
  'ALINE':'Atendimento Dia','ALINE INICIO':'Atendimento / Inicio',
  'ALINE FINALIZAÇÃO':'Atendimento / Finalização',
  'SAMUEL':'Ilha / Montador',
};

const TODOS_COLABS = [
  'ALAN RICARDO','ALINE','ALINE INICIO','ALINE FINALIZAÇÃO',
  'ANTONIEL','ANTONIEL INICIO','ANTONIEL FINALIZAÇÃO',
  'ATENDIMENTO / DESPACHO','ABC','DAVI','DESPACHO','DINA','FABIO','FERNANDO',
  'FRITADEIRA','GABRIEL KHALYL','GABRIEL LEITE','HENRIQUE','JOÃO','JOSÉ BRUNO','JHON',
  'LOHAINE','LUCAS','MARCUS','MARCUS INICIO','MARCUS FINALIZAÇÃO',
  'MATEUS','MATEUS PRODUÇÃO','NOITE - CHAPEIRO','NOITE - FRITADEIRA',
  'NOITE - MONTADOR','PABLO','PEDRO','RHUAN','RODRIGO','SAMUEL','SANDRO',
  'SERGIO CAMARAS','WESLEY MOTORISTA','FAXINA',
  'ESTAGIARIO HENRIQUE','ESTÁGIO PEDRO','ESTÁGIO DAVI',
];

const ATEND_COLABS = [
  'ANTONIEL','ANTONIEL INICIO','ANTONIEL FINALIZAÇÃO',
  'MARCUS','MARCUS INICIO','MARCUS FINALIZAÇÃO',
  'ALINE','ALINE INICIO','ALINE FINALIZAÇÃO',
  'DESPACHO','SANDRO','DINA',
];

/* ══ ESTADO GLOBAL ═══════════════════════════════════════ */
let _deptAtual   = 'PRODUCAO';
let _thanksIv    = null;
let _atendRegIds = {};

/* ══ SESSÃO DO PORTAL ════════════════════════════════════ */
let JB_SESSION = null;
(function _lerSessaoPortal() {
  try {
    // Tenta sessionStorage primeiro (mesma aba), depois localStorage (compartilhado no domínio)
    const raw = sessionStorage.getItem('jb_user') || localStorage.getItem('jb_user');
    if (raw) {
      JB_SESSION = JSON.parse(raw);
      // Garante que a sessão também esteja no sessionStorage para consistência
      if (!sessionStorage.getItem('jb_user') && raw) {
        sessionStorage.setItem('jb_user', raw);
      }
    }
  } catch(e) { JB_SESSION = null; }
})();

function _isColaborador() {
  return JB_SESSION && JB_SESSION.papel === 'colaborador';
}
function _isColaboradorRestrito() {
  return JB_SESSION && JB_SESSION.papel === 'colaborador' && !!JB_SESSION.nome_card;
}
function _isLider() {
  return JB_SESSION && (JB_SESSION.papel === 'lider' || JB_SESSION.papel === 'admin');
}

const _cache = {
  tarefas: null, sessoes: null, _faltas: null,
  _registros: null, turno: null, dia: null, data: null,
};

const S = {
  turno: null, dia: null, colaborador: null, sessaoId: null,
  dataTrabalho: null, tarefas: [], s1: {}, s2: {},
  leaderOk: false, leaderData: [],
  currentLeaderTab: 'registros',
  producaoIniciada: false,
  _modoConferenciaLider: false,   // true quando líder entra em modo conferência
  _sessIdConferencia: null,       // id da sessão sendo conferida
  _confCards: {},                 // { [tarefaId]: true } cards já conferidos pelo líder nesta sessão
  _nomeConferencia: null,         // nome do colaborador sendo conferido
  _turnoAutorizadoLider: false,   // true quando o turno já foi conferido e autorizado pelo líder
};

/* ══ HELPERS FIREBASE ════════════════════════════════════ */
async function _fbGetAll(col)        { return fbv2_getAll(col); }
async function _fbGetOne(col,id)     { return fbv2_getOne(col,id); }
async function _fbPost(col,data)     { return fbv2_post(col,data); }
async function _fbPatch(col,id,data) { return fbv2_patch(col,id,data); }
async function _fbPut(col,id,data)   { return fbv2_put(col,id,data); }
async function _fbDelete(col,id)     { return fbv2_delete(col,id); }

/* ══ CACHE ═══════════════════════════════════════════════ */
function _invalidarCache() {
  _cache.tarefas=null; _cache.sessoes=null;
  _cache._faltas=null; _cache._registros=null;
}

/* ══ CHECKLIST DETECTOR ══════════════════════════════════ */
function isChecklist(t) {
  if (!t) return false;
  const u  = (t.unidade||'').toLowerCase().trim();
  const uN = u.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const listN = UNIDADES_CHECKLIST.map(x=>x.normalize('NFD').replace(/[\u0300-\u036f]/g,''));
  if (UNIDADES_CHECKLIST.includes(u) || listN.includes(uN)) return true;
  if (!u && (!t.quantidade_padrao || Number(t.quantidade_padrao)===0)) return true;
  const qtdUnits=['kg','g','l','ml','un','unidade','pote','sache','saches','sachê','sachês','cx','caixa'];
  if (Number(t.quantidade_padrao)===0 && u && !qtdUnits.includes(u)) return true;
  return false;
}

/* ══ INIT ════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initWorkDate();
  renderDayGrid();
  setDefaultDates();
  _prefetchCache();
  _checkPendenciasNotif();

  _aplicarRestricoesDom();
  _renderUserBar();

  if (_isColaboradorRestrito()) {
    _iniciarFluxoColaborador();
  } else if (_isColaborador()) {
    showScreen('screen-welcome');
  } else {
    showScreen('screen-welcome');
    if (_isLider()) {
      S.leaderOk = true;
      const btnLider = document.querySelector('.btn-leader-access');
      if (btnLider) btnLider.style.display = 'none';
    }
  }
});

function _renderUserBar() {
  if (!JB_SESSION) return;

  /* =======================================================
     Botão SAIR GLOBAL — aparece em TODAS as telas.
     Posicionado no canto inferior esquerdo via CSS (#btn-sair-global).
     Não conflita com o botão Líder (canto superior direito).
  ======================================================= */
  const btnSairGlobal = document.getElementById('btn-sair-global');
  if (btnSairGlobal) btnSairGlobal.style.display = 'flex';

  /* welcome-user-bar: mantida por compat., botão interno ocultado */
  const bar  = document.getElementById('welcome-user-bar');
  const nEl  = document.getElementById('welcome-user-nome');
  const pEl  = document.getElementById('welcome-user-papel');
  const eEl  = document.getElementById('welcome-user-emoji');
  const main = document.getElementById('welcome-body-main');

  const papelLabel = { admin:'👑 Administrador', lider:'🎖️ Líder', colaborador:'👷 Colaborador' };
  const papelEmoji = { admin:'👑', lider:'🎖️', colaborador:'👷' };

  if (bar) {
    /* Esconde o botão Sair interno da user-bar (o global já cobre) */
    const sairInterno = bar.querySelector('button[onclick*="_sairDoPortal"]');
    if (sairInterno) sairInterno.style.display = 'none';

    if (nEl) nEl.textContent = JB_SESSION.nome || JB_SESSION.username || '—';
    if (pEl) pEl.textContent = papelLabel[JB_SESSION.papel] || JB_SESSION.papel;
    if (eEl) eEl.textContent = papelEmoji[JB_SESSION.papel] || '👤';

    bar.style.display = 'flex';
    if (main) main.style.paddingTop = '64px';
  }
}

function _sairDoPortal() {
  sessionStorage.removeItem('jb_user');
  JB_SESSION = null;
  window.location.href = 'portal.html';
}

function _aplicarRestricoesDom() {
  if (!_isColaborador()) return;

  const nav = document.getElementById('global-bottom-nav');
  if (nav) nav.style.display = 'none';
  document.body.classList.remove('has-bottom-nav');

  const btnLider = document.querySelector('.btn-leader-access');
  if (btnLider) btnLider.style.display = 'none';

  /* Botão Sair global (HTML fixo) já trata a saída em todas as telas.
     _injetarBotaoPortal() deprecado — não injeta mais duplicata. */
}

function _injetarBotaoPortal() {
  /* Deprecado: btn-sair-global (HTML fixo no index.html) cobre todas as telas.
     Mantido apenas para não quebrar chamadas legadas no código. */
  const btnGlobal = document.getElementById('btn-sair-global');
  if (btnGlobal) btnGlobal.style.display = 'flex';
}

function _iniciarFluxoColaborador() {
  const sess = JB_SESSION;
  initWorkDate();

  const turnoForce = sess.turno_preferido;

  if (turnoForce === 'dia' || turnoForce === 'noite') {
    S.turno = turnoForce;
    const [_y,_m,_d] = (S.dataTrabalho||today()).split('-').map(Number);
    S.dia = DIA_JS_MAP[new Date(_y,_m-1,_d).getDay()];
    _invalidarCache();
    selectColaborador(sess.nome_card);
  } else {
    _mostrarSomenteEscolhaTurno();
  }
}

function _mostrarSomenteEscolhaTurno() {
  showScreen('screen-welcome');
  const btnL = document.querySelector('.btn-leader-access');
  if (btnL) btnL.style.display = 'none';
}

function _injetarBotaoLiderNaHome() {
  const existing = document.getElementById('btn-lider-direto');
  if (existing) return;
  const btn = document.createElement('button');
  btn.id = 'btn-lider-direto';
  btn.className = 'btn-leader-access';
  btn.title = 'Painel do Líder';
  /* Botão Líder: canto superior DIREITO — botão Sair fica inferior ESQUERDO */
  btn.style.cssText = 'position:fixed;right:12px;top:12px;z-index:499;background:#1a1a2e;color:#EAB308;';
  btn.innerHTML = '<i class="fas fa-user-shield"></i>';
  btn.onclick = () => openLeaderPanel();
  document.body.appendChild(btn);
}

async function _prefetchCache() {
  try {
    const [t,s] = await Promise.all([_fbGetAll('tarefas'),_fbGetAll('sessoes')]);
    _cache.tarefas = _resolverDeptTarefas(t); _cache.sessoes = s;
  } catch(e) {}
}

async function _checkPendenciasNotif() {
  try {
    const todas  = await _fbGetAll('pendencias');
    const d      = S.dataTrabalho || today();
    const abertas= todas.filter(p=>p.data===d && !(p.vistoriado==1));
    _atualizarBadge(abertas.length);
  } catch(e) {}
}

function _atualizarBadge(qtd) {
  const b = document.getElementById('badge-pendencias');
  if (!b) return;
  if (qtd>0) { b.textContent=qtd>99?'99+':String(qtd); b.style.display='flex'; }
  else b.style.display='none';
}

/* ══ DATA DE TRABALHO ════════════════════════════════════ */
function initWorkDate() {
  const inp = document.getElementById('work-date-input');
  if (!inp) return;
  const h = today();
  inp.value = h; S.dataTrabalho = h;
  _updateWorkDateDisplay(h);
}

function onWorkDateChange() {
  const inp = document.getElementById('work-date-input');
  if (!inp) return;
  const val = inp.value || today();
  S.dataTrabalho = val;
  _invalidarCache();
  _updateWorkDateDisplay(val);
  renderDayGrid();
  _checkPendenciasNotif();
}

function _updateWorkDateDisplay(ds) {
  const weekdayEl = document.getElementById('work-date-display');
  const valEl     = document.getElementById('work-date-val');
  const dt  = new Date(ds+'T12:00:00');
  const dn  = ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'];
  const dd  = String(dt.getDate()).padStart(2,'0');
  const mm  = String(dt.getMonth()+1).padStart(2,'0');
  const yyyy = dt.getFullYear();
  const dateStr = `${dd}/${mm}/${yyyy}`;
  const diaStr  = dn[dt.getDay()];
  if (valEl)     valEl.textContent     = dateStr;
  if (weekdayEl) weekdayEl.textContent = diaStr;
}

/* ══ NAVEGAÇÃO ════════════════════════════════════════════ */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s=>s.classList.add('hidden'));
  const el = document.getElementById(id);
  if (el) { el.classList.remove('hidden'); el.scrollTop=0; }
}
function goBack(to) { showScreen(to); }

function goToWelcome() {
  if (_thanksIv) { clearInterval(_thanksIv); _thanksIv=null; }
  S.turno=null; S.dia=null; S.colaborador=null;
  S.tarefas=[]; S.s1={}; S.s2={};
  S.producaoIniciada=false;
  if (_isColaboradorRestrito() && JB_SESSION.turno_preferido) {
    _iniciarFluxoColaborador();
    return;
  }
  showScreen('screen-welcome');
  _checkPendenciasNotif();
}

function goToLeaderLogin() {
  if (S.leaderOk || _isLider()) {
    S.leaderOk = true;
    openLeaderPanel();
    return;
  }
  document.getElementById('leader-password').value='';
  document.getElementById('login-error').classList.add('hidden');
  showScreen('screen-leader-login');
}

function doLeaderLogin() {
  const pw = document.getElementById('leader-password').value;
  if (pw===LEADER_PASSWORD) {
    S.leaderOk=true;
    document.getElementById('login-error').classList.add('hidden');
    openLeaderPanel();
  } else {
    document.getElementById('login-error').classList.remove('hidden');
  }
}

function togglePassVisibility() {
  const inp = document.getElementById('leader-password');
  const ico = document.querySelector('.pass-toggle i');
  if (!inp) return;
  inp.type = inp.type==='password'?'text':'password';
  if (ico) ico.className = inp.type==='password'?'fas fa-eye':'fas fa-eye-slash';
}

function openLeaderPanel() {
  showScreen('screen-leader');
  S.currentLeaderTab='registros';
  ['registros','pendentes','espelho','relatorio','tarefas','seed'].forEach(t=>{
    const btn=document.getElementById(`tab-${t}`);
    const pan=document.getElementById(`leader-panel-${t}`);
    if (btn) btn.classList.toggle('active',t==='registros');
    if (pan) pan.classList.toggle('hidden',t!=='registros');
  });
  loadLeaderData();
}

function switchLeaderTab(tab) {
  S.currentLeaderTab=tab;
  ['registros','pendentes','espelho','relatorio','tarefas','seed'].forEach(t=>{
    const btn=document.getElementById(`tab-${t}`);
    const pan=document.getElementById(`leader-panel-${t}`);
    if (btn) btn.classList.toggle('active',t===tab);
    if (pan) pan.classList.toggle('hidden',t!==tab);
  });
  if (tab==='tarefas') loadTarefasGestao();
}

function abrirSeedFrame() {
  const wrap = document.getElementById('seed-frame-wrap');
  if (!wrap) return;
  wrap.style.display = 'block';
  setTimeout(() => {
    wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

/* ══ TURNO ═══════════════════════════════════════════════ */
function selectTurno(turno) {
  if (!S.dataTrabalho) {
    const inp=document.getElementById('work-date-input');
    S.dataTrabalho=(inp&&inp.value)?inp.value:today();
  }
  _invalidarCache();
  S.turno=turno;
  const [_y,_m,_d]=S.dataTrabalho.split('-').map(Number);
  S.dia=DIA_JS_MAP[new Date(_y,_m-1,_d).getDay()];

  if (_isColaboradorRestrito()) {
    selectColaborador(JB_SESSION.nome_card);
    return;
  }
  _irParaDept();
}

/* ══ DIA ══════════════════════════════════════════════════ */
function renderDayGrid() {
  const dataTrab = S.dataTrabalho || today();
  const dtTrab   = new Date(dataTrab+'T12:00:00');
  const diaKey   = DIA_JS_MAP[dtTrab.getDay()];
  const grid     = document.getElementById('day-grid');
  if (!grid) return;
  grid.innerHTML = DIAS_LIST.map((d,idx)=>{
    const isSelected = d.key===diaKey;
    const isHoje     = d.key===DIA_JS_MAP[new Date().getDay()] && dataTrab===today();
    const isLast = idx === DIAS_LIST.length - 1;
    return `<button class="day-btn${isSelected?' today':''}${isLast?' day-btn-last':''}" onclick="selectDia('${d.key}')">
      <span class="day-icon">${d.icon}</span>
      <span>${d.short}</span>
      <span style="font-size:11px;opacity:.8">${d.label.split('-')[0]}</span>
      ${isSelected?`<span class="day-today-tag">${isHoje?'HOJE':'SEL.'}</span>`:''}
    </button>`;
  }).join('');
}

function selectDia(dia) {
  S.dia=dia;
  _irParaDept();
}

/* ══ DEPARTAMENTO ════════════════════════════════════════ */
function _resolverDeptTarefas(tarefas) {
  const deptPorColab = {};
  tarefas.forEach(t => {
    if (t.departamento && t.colaborador)
      deptPorColab[(t.colaborador).toUpperCase()] = t.departamento.toUpperCase().trim();
  });
  tarefas.forEach(t => {
    if (!t.departamento && t.colaborador) {
      const d = deptPorColab[(t.colaborador).toUpperCase()];
      if (d) t.departamento = d;
    }
  });
  return tarefas;
}

function _getDept(nome, tarefaDept) {
  if (tarefaDept) return tarefaDept;
  const fromMap = COLLAB_DEPT[(nome||'').toUpperCase()];
  if (fromMap) return fromMap;
  return '__NONE__';
}

function _irParaDept() {
  const dObj=DIAS_LIST.find(d=>d.key===S.dia);
  const tc=document.getElementById('dept-turno-chip');
  const dc=document.getElementById('dept-day-chip');
  if (tc) tc.textContent=(S.turno==='dia'?'☀️':'🌙')+' '+(S.turno==='dia'?'Dia':'Noite');
  if (dc) dc.textContent=dObj?dObj.short+' '+dObj.icon:S.dia;
  showScreen('screen-dept');
  _carregarAreasExtras();
}

const _AREAS_FIXAS = new Set(['PRODUCAO','OPERACAO','ATENDIMENTO']);
const _DEPTS_IGNORAR = new Set([
  'MOTOCA','TESTE','TEST','TESTANDO','AAAA','BBBB','CCCC','CCCCC',
  'FINANCEIRO_TESTE','ESTOQUE_TESTE',
]);

async function _carregarAreasExtras() {
  const grid = document.getElementById('dept-btn-grid');
  if (!grid) { console.warn('[JB-DEPT] #dept-btn-grid não encontrado'); return; }

  grid.querySelectorAll('[data-custom-area],[data-custom-area-wrap],.dept-sep-extra').forEach(el => el.remove());

  const extra = {};

  let areasRaw = [];
  try {
    areasRaw = await _fbGetAll('areas');
  } catch(e) { console.warn('[JB-DEPT] Erro areas:', e); }

  areasRaw.forEach(a => {
    if (a.ativo === false) return;
    const nomeRaw = String(a.nome || a.chave || '').trim();
    if (!nomeRaw) return;
    const chave = String(a.chave || nomeRaw)
      .toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')
      .replace(/[^A-Z0-9]/g,'_').trim();
    if (!chave || _AREAS_FIXAS.has(chave)) return;
    extra[chave] = { nome: a.nome || nomeRaw, emoji: a.emoji || '🏷️' };
  });

  let tarefasRaw = [];
  try {
    tarefasRaw = await _fbGetAll('tarefas');
  } catch(e) { console.warn('[JB-DEPT] Erro tarefas:', e); }

  _resolverDeptTarefas(tarefasRaw);
  _cache.tarefas = tarefasRaw;

  tarefasRaw.forEach(t => {
    const chave = String(t.departamento || '').toUpperCase().trim();
    if (!chave || _AREAS_FIXAS.has(chave) || extra[chave]) return;
    const nome = chave.replace(/_/g,' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
    extra[chave] = { nome, emoji: '🏷️' };
  });

  const dtTrab = S.dataTrabalho || today();
  const deptComCard = new Set(
    tarefasRaw
      .filter(t => {
        if (_isColabTeste(t.colaborador)) return false;
        if (!t.departamento) return false;
        if (t.turno !== S.turno) return false;
        const matchDia = t.data_especifica
          ? t.data_especifica === dtTrab
          : t.dia_semana === S.dia;
        return matchDia;
      })
      .map(t => String(t.departamento).toUpperCase().trim())
      .filter(Boolean)
  );

  const extraVisivel = Object.entries(extra)
    .filter(([chave]) => deptComCard.has(chave) && !_DEPTS_IGNORAR.has(chave))
    .sort(([,a],[,b]) => a.nome.localeCompare(b.nome, 'pt-BR'));

  console.log('[JB-DEPT] extras visíveis:', extraVisivel.map(([k])=>k));

  if (extraVisivel.length === 0) return;

  const sep = document.createElement('div');
  sep.className = 'dept-sep-extra';
  sep.style.cssText = 'font-size:11px;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;padding:6px 2px 2px;text-align:center;';
  sep.textContent = '— Outros departamentos —';
  grid.appendChild(sep);

  extraVisivel.forEach(([chave, info]) => {
    const btn = document.createElement('button');
    btn.className = 'dept-btn dept-btn-custom';
    btn.setAttribute('data-custom-area', chave);
    btn.onclick = () => _abrirSetorCards(chave);
    btn.innerHTML =
      `<span class="dept-btn-emoji">${info.emoji}</span>` +
      `<div style="flex:1;text-align:left">` +
        `<span class="dept-btn-nome">${info.nome}</span>` +
        `<div class="dept-btn-sub">${chave}</div>` +
      `</div>` +
      `<span style="font-size:22px;opacity:.45">›</span>`;
    grid.appendChild(btn);
  });
}

function _abrirSetorCards(dept) {
  if (dept==='ATENDIMENTO') {
    _pedirSenhaDepto(()=>_mostrarTelaSetor(dept));
    return;
  }
  _mostrarTelaSetor(dept);
}

function _pedirSenhaDepto(callback) {
  _abrirModalSenha('🎯','Atendimento','Senha do departamento',DEPT_PASSWORD['ATENDIMENTO'],callback);
}

function _mostrarTelaSetor(dept) {
  _deptAtual=dept;
  const dObj=DIAS_LIST.find(d=>d.key===S.dia);
  const labelMap={PRODUCAO:'Produção',OPERACAO:'Operação',ATENDIMENTO:'Atendimento'};
  const emojiMap={PRODUCAO:'🏭',OPERACAO:'⚙️',ATENDIMENTO:'🎯'};
  const corMap  ={PRODUCAO:'#f97316',OPERACAO:'#16a34a',ATENDIMENTO:'#2563eb'};
  if (!labelMap[dept]) {
    const btnEl = document.querySelector(`[data-custom-area="${dept}"]`);
    if (btnEl) {
      labelMap[dept] = btnEl.querySelector('.dept-btn-nome')?.textContent || dept;
      emojiMap[dept] = btnEl.querySelector('.dept-btn-emoji')?.textContent || '🏷️';
    } else {
      labelMap[dept] = dept; emojiMap[dept] = '🏷️';
    }
    corMap[dept] = '#0891b2';
  }
  const tc=document.getElementById('setor-turno-chip');
  const dc=document.getElementById('setor-day-chip');
  const dp=document.getElementById('setor-dept-chip');
  if (tc) tc.textContent=(S.turno==='dia'?'☀️':'🌙')+' '+(S.turno==='dia'?'Dia':'Noite');
  if (dc) dc.textContent=dObj?dObj.short+' '+dObj.icon:S.dia;
  if (dp) { dp.textContent=emojiMap[dept]+' '+labelMap[dept]; dp.style.background=corMap[dept]; }
  showScreen('screen-setor');
  const grid=document.getElementById('setor-collab-grid');
  if (!grid) return;
  grid.innerHTML='<div style="padding:40px;text-align:center;color:#888"><div style="font-size:36px;animation:spin 1s linear infinite;display:inline-block">⏳</div><br><span style="font-size:13px;font-weight:600;margin-top:8px;display:block">Carregando...</span></div>';
  Promise.all([_fbGetAll('tarefas'),_fbGetAll('sessoes'),_fbGetAll('faltas')]).then(res=>{
    _cache.tarefas=_resolverDeptTarefas(res[0]); _cache.sessoes=res[1]; _cache._faltas=res[2];
    _preencherGridSetor(grid,dept,_cache.tarefas,_cache.sessoes);
  }).catch(()=>{
    grid.innerHTML='<div style="padding:40px;color:#dc2626;text-align:center">❌ Erro ao carregar. Verifique a conexão.</div>';
  });
}

function _preencherGridSetor(grid,dept,todasTarefas,todasSessoes) {
  const dtTrab=S.dataTrabalho||today();
  const map={};
  todasTarefas.forEach(t=>{
    if (_isColabTeste(t.colaborador)) return;
    const matchDia=t.data_especifica ? t.data_especifica===dtTrab : t.dia_semana===S.dia;
    if (t.turno===S.turno && matchDia && _getDept(t.colaborador, t.departamento)===dept)
      map[t.colaborador]=(map[t.colaborador]||0)+1;
  });
  let nomes=Object.keys(map).sort();
  if (_isColaboradorRestrito() && JB_SESSION.nome_card) {
    const card = JB_SESSION.nome_card.toUpperCase();
    nomes = nomes.filter(n => n.toUpperCase() === card);
    if (!nomes.length) {
      grid.innerHTML='<div style="padding:40px;text-align:center"><div style="font-size:40px">😊</div><p style="font-weight:700;margin-top:8px">Sem tarefas para hoje!</p></div>';
      return;
    }
  }
  if (!nomes.length) {
    grid.innerHTML='<div style="padding:40px;text-align:center"><div style="font-size:40px">😕</div><strong>Nenhum colaborador neste setor hoje</strong></div>';
    return;
  }
  const sessMap={};
  const sessConferMap={}; // lider_conferiu por colaborador
  const sessAutorizMap={}; // lider_autorizado por colaborador
  const sessIdMap={};     // id da sessão por colaborador (para patch)
  todasSessoes.forEach(s=>{
    if (s.data===dtTrab&&s.turno===S.turno&&s.dia_semana===S.dia) {
      const cur=sessMap[s.colaborador_card];
      if (!cur || s.status_geral==='completo' || s.status_geral==='parcial') {
        sessMap[s.colaborador_card]=s.status_geral;
        sessConferMap[s.colaborador_card]=!!s.lider_conferiu;
        sessAutorizMap[s.colaborador_card]=!!s.lider_autorizado;
        sessIdMap[s.colaborador_card]=s.id;
      }
    }
  });
  const faltaMap={};
  (_cache._faltas||[]).forEach(f=>{
    if (f.data===dtTrab&&f.turno===S.turno) faltaMap[f.colaborador]=f.tipo;
  });
  const cores=['cc-0','cc-1','cc-2','cc-3','cc-4','cc-5','cc-6','cc-7','cc-8','cc-9','cc-10','cc-11'];
  if (nomes.length <= 4) grid.classList.add('few-cards');
  else grid.classList.remove('few-cards');

  grid.innerHTML=nomes.map((nome,i)=>{
    const em        = COLLAB_EMOJI[nome]||'👤';
    const setor     = COLLAB_SETOR[nome]||'';
    const cnt       = map[nome];
    const cor       = cores[i%cores.length];
    const ne        = nome.replace(/'/g,"\\'");
    const sessStatus= sessMap[nome];
    const isEtapa1Ok= sessStatus==='etapa1_ok';
    const jaFinaliz = sessStatus==='completo'||sessStatus==='parcial';
    const isCompleto= sessStatus==='completo';
    const tipoFalta = faltaMap[nome];
    const jaConferiu= sessConferMap[nome]||false;
    const jaAutoriz = sessAutorizMap[nome]||false;
    const sessId    = sessIdMap[nome]||'';

    let statusBadge='';
    let wrapClass='collab-card-wrap';
    if (tipoFalta) {
      const isNJ=tipoFalta==='nao_justificada';
      wrapClass+=' wrap-falta';
      statusBadge=`<div class="collab-status-badge ${isNJ?'csb-falta-nj':'csb-falta-j'}">${isNJ?'🚫 Falta N/J':'📋 Falta Justif.'}</div>`;
    } else if (isEtapa1Ok) {
      statusBadge=`<div class="collab-status-badge csb-andamento">▶️ Em Produção</div>`;
    } else if (jaFinaliz) {
      if (jaAutoriz) {
        // Líder já autorizou — badge verde especial
        statusBadge=`<div class="collab-status-badge csb-lider-ok">🎖️ Conferido pelo Líder</div>`;
      } else if (jaConferiu) {
        // Líder conferiu mas ainda não autorizou
        statusBadge=`<div class="collab-status-badge csb-lider-conf">👁️ Conferido — Ag. Autorização</div>`;
      } else {
        statusBadge=`<div class="collab-status-badge ${isCompleto?'csb-100':'csb-parcial'}">${isCompleto?'✅ Finalizado 100%':'⚠️ Parcial / Pendências'}</div>`;
      }
    }

    let acao;
    if (tipoFalta && S.leaderOk) {
      acao=`_gerenciarFalta('${ne}','${tipoFalta}','remover')`;
    } else if (jaFinaliz && _isLider()) {
      // Líder vê card finalizado → abre modal de conferência
      acao=`_clickColabLiderConferencia('${ne}','${sessId}',${jaConferiu},${jaAutoriz})`;
    } else if (jaFinaliz) {
      // Não-líder vê card finalizado → comportamento original (reabrir com senha)
      acao=`_clickColab('${ne}','__reabrir__')`;
    } else {
      acao=`_clickColab('${ne}','__selecionar__')`;
    }

    const btnFalta=((!tipoFalta&&!jaFinaliz) && (S.leaderOk||_isLider()))
      ?`<div class="collab-falta-row"><button class="btn-falta-card" onclick="event.stopPropagation();_abrirFaltaComSenha('${ne}')">🚫 Registrar Falta</button></div>`:'';

    return `<div class="${wrapClass}">
      <button class="collab-card ${cor}${jaFinaliz?' collab-done':''}${isEtapa1Ok?' collab-etapa1':''}${tipoFalta?' collab-falta':''}${jaAutoriz?' collab-lider-ok':''}" onclick="${acao}">
        <div class="collab-emoji">${em}</div>
        <span class="collab-name">${nome}</span>
        ${setor?`<span class="collab-setor">${setor}</span>`:''}
        <span class="collab-count">📋 ${cnt} tarefa${cnt!==1?'s':''}</span>
      </button>
      ${statusBadge}
      ${btnFalta}</div>`;
  }).join('');
}

/* ══ MODAL SENHA GENÉRICO ════════════════════════════════ */
function _abrirModalSenha(emoji,titulo,subtitulo,senhaEsperada,callback) {
  let ov=document.getElementById('_modal_pw_generico');
  if (!ov) {
    ov=document.createElement('div'); ov.id='_modal_pw_generico';
    ov.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px';
    document.body.appendChild(ov);
  }
  ov.innerHTML=`<div style="background:#fff;border-radius:20px;padding:28px 24px;width:100%;max-width:340px;box-shadow:0 20px 60px rgba(0,0,0,.4);font-family:inherit">
    <div style="text-align:center;margin-bottom:18px">
      <div style="font-size:40px">${emoji}</div>
      <h2 style="font-size:17px;font-weight:900;margin:8px 0 2px">${titulo}</h2>
      <p style="font-size:12px;color:#6b7280">${subtitulo}</p>
    </div>
    <div style="position:relative;margin-bottom:14px">
      <input id="_pw_gen_input" type="password" placeholder="Senha..."
        style="width:100%;padding:12px 44px 12px 14px;border:2px solid #e2e6f0;border-radius:12px;font-size:15px;font-family:inherit;outline:none;box-sizing:border-box"/>
      <button type="button" onclick="document.getElementById('_pw_gen_input').type=document.getElementById('_pw_gen_input').type==='password'?'text':'password'"
        style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;font-size:18px;padding:4px">👁️</button>
    </div>
    <p id="_pw_gen_err" style="color:#dc2626;font-size:12px;font-weight:700;text-align:center;min-height:18px;margin:0 0 12px"></p>
    <div style="display:flex;gap:10px">
      <button onclick="document.getElementById('_modal_pw_generico').style.display='none'"
        style="flex:1;padding:12px;border-radius:12px;border:2px solid #e2e6f0;background:#f9fafb;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer">Cancelar</button>
      <button id="_pw_gen_ok"
        style="flex:2;padding:12px;border-radius:12px;border:none;background:linear-gradient(135deg,#4f8ef7,#2563eb);font-family:inherit;font-size:13px;font-weight:800;cursor:pointer;color:#fff">Entrar ✅</button>
    </div>
  </div>`;
  ov.style.display='flex';
  ov._senhaEsperada=senhaEsperada;
  ov._callback=callback;
  const inp=document.getElementById('_pw_gen_input');
  const ok =document.getElementById('_pw_gen_ok');
  const err=document.getElementById('_pw_gen_err');
  const confirm=()=>{
    if (inp.value!==ov._senhaEsperada) { err.textContent='❌ Senha incorreta!'; inp.value=''; inp.focus(); return; }
    ov.style.display='none';
    const cb=ov._callback; if (cb) cb();
  };
  ok.onclick=confirm;
  inp.addEventListener('keydown',e=>{ if(e.key==='Enter') confirm(); });
  setTimeout(()=>inp.focus(),80);
}

/* ══ CLICK COLABORADOR ═══════════════════════════════════ */
function _clickColab(nome,acao) {
  const pw=COLLAB_PASSWORDS[nome.toUpperCase()];
  if (acao==='__reabrir__') {
    const confirmarReabrir=()=>{
      _abrirModalSenha('🔑','Reabrir Turno','Senha do líder para confirmar',LEADER_PASSWORD,()=>_reabrirTurnoColab(nome));
    };
    if (pw) _abrirModalSenha(COLLAB_EMOJI[nome.toUpperCase()]||'👤',nome,'Sua senha para confirmar identidade',pw,confirmarReabrir);
    else confirmarReabrir();
    return;
  }
  if (pw) _abrirModalSenha(COLLAB_EMOJI[nome.toUpperCase()]||'👤',nome,'Sua senha para acessar',pw,()=>selectColaborador(nome));
  else selectColaborador(nome);
}

async function _reabrirTurnoColab(nome) {
  showLoading(true);
  try {
    const dt=S.dataTrabalho||today();
    const isAtend=ATEND_COLABS.includes(nome.toUpperCase());
    const [sessoes,pendencias,registros]=await Promise.all([
      _fbGetAll('sessoes'), _fbGetAll('pendencias'),
      isAtend?_fbGetAll('registros'):Promise.resolve([])
    ]);
    const sf=sessoes.filter(s=>s.colaborador_card===nome&&s.data===dt&&s.turno===S.turno&&s.dia_semana===S.dia&&(s.status_geral==='completo'||s.status_geral==='parcial'||s.status_geral==='etapa1_ok'));
    const pf=pendencias.filter(p=>p.colaborador===nome&&p.data===dt&&p.turno===S.turno&&p.dia_semana===S.dia);
    const rf=registros.filter(r=>r.colaborador_card===nome&&r.data===dt&&r.turno===S.turno&&r.dia_semana===S.dia);
    await Promise.all([...sf.map(s=>_fbDelete('sessoes',s.id)),...pf.map(p=>_fbDelete('pendencias',p.id)),...(isAtend?rf.map(r=>_fbDelete('registros',r.id)):[] )]);
    _invalidarCache();
    showToast('🔓 Turno reaberto para '+nome);
    _mostrarTelaSetor(_deptAtual);
  } catch(e) { showToast('❌ Erro ao reabrir turno'); }
  finally { showLoading(false); }
}

/* ══ CONFERÊNCIA DO LÍDER ════════════════════════════════
   Fluxo novo:
   1. Líder clica no card finalizado → modal simples (Conferir / Reabrir)
   2. "Conferir" → entra nos cards em modo conferência
   3. Dentro de cada card: "✅ Finalizar Conferência" ou "⚠️ Inf. Incorreta"
   4. Ao finalizar todos os cards → volta automático ao setor com badge 🎖️
   5. "Inf. Incorreta" → líder corrige qtd, cria pendência, -20pts no dashboard
══════════════════════════════════════════════════════════ */
function _clickColabLiderConferencia(nome, sessId, jaConferiu, jaAutoriz) {
  const ne = nome.replace(/'/g,"\\'");
  let ov = document.getElementById('_modal_lider_conf');
  if (!ov) {
    ov = document.createElement('div');
    ov.id = '_modal_lider_conf';
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.72);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px';
    document.body.appendChild(ov);
  }

  const em = COLLAB_EMOJI[nome.toUpperCase()] || '👤';
  const setor = COLLAB_SETOR[nome.toUpperCase()] || '';

  const statusLabel = jaAutoriz
    ? '🎖️ Conferência Concluída'
    : jaConferiu ? '👁️ Conferido' : '✅ Turno Finalizado';
  const statusBg    = jaAutoriz ? '#dcfce7' : jaConferiu ? '#dbeafe' : '#fef9c3';
  const statusColor = jaAutoriz ? '#15803d' : jaConferiu ? '#1d4ed8' : '#92400e';

  const btnConferir = `
    <button onclick="_liderConferir('${ne}','${sessId}')"
      style="width:100%;padding:14px 16px;border-radius:14px;border:none;
             background:linear-gradient(135deg,#2563eb,#1d4ed8);color:#fff;
             font-family:inherit;font-size:14px;font-weight:800;cursor:pointer;
             display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:10px">
      👁️ ${jaAutoriz ? 'Ver Novamente' : jaConferiu ? 'Conferir Novamente' : 'Conferir Turno'}
    </button>`;

  const btnReabrir = `
    <button onclick="_liderReabrirDoModal('${ne}')"
      style="width:100%;padding:11px 16px;border-radius:12px;border:2px solid #e2e8f0;
             background:#f9fafb;color:#6b7280;
             font-family:inherit;font-size:13px;font-weight:700;cursor:pointer;
             display:flex;align-items:center;justify-content:center;gap:6px;margin-bottom:10px">
      🔓 Reabrir Turno
    </button>`;

  const btnFechar = `
    <button onclick="document.getElementById('_modal_lider_conf').style.display='none'"
      style="width:100%;padding:10px;border-radius:12px;border:2px solid #e2e8f0;
             background:#fff;color:#6b7280;
             font-family:inherit;font-size:13px;font-weight:700;cursor:pointer">
      Fechar
    </button>`;

  ov.innerHTML = `
    <div style="background:#fff;border-radius:20px;padding:24px 20px;width:100%;max-width:360px;
                box-shadow:0 20px 60px rgba(0,0,0,.4);font-family:inherit">
      <div style="text-align:center;margin-bottom:20px">
        <div style="font-size:42px;margin-bottom:4px">${em}</div>
        <h2 style="font-size:17px;font-weight:900;margin:0 0 2px;color:#1e293b">${nome}</h2>
        ${setor ? `<p style="font-size:12px;color:#64748b;margin:0 0 8px">${setor}</p>` : ''}
        <div style="display:inline-block;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700;
                    background:${statusBg};color:${statusColor}">
          ${statusLabel}
        </div>
      </div>
      <div style="height:1px;background:#f1f5f9;margin:0 0 16px"></div>
      ${btnConferir}
      ${btnReabrir}
      ${btnFechar}
    </div>`;
  ov.style.display = 'flex';
}

/* Líder entra no card em modo somente-leitura para conferir */
async function _liderConferir(nome, sessId) {
  // Fecha o modal
  const ov = document.getElementById('_modal_lider_conf');
  if (ov) ov.style.display = 'none';

  // Marca no Firebase que o líder está conferindo (lider_conferiu=true)
  // Faz isso ANTES de abrir o card para garantir o registro
  if (sessId) {
    try {
      await _fbPatch('sessoes', sessId, { lider_conferiu: true });
      _cache.sessoes = null; // invalida cache para recarregar badge
    } catch(e) { console.error('Erro ao marcar conferência:', e); }
  }

  // Abre o card do colaborador em modo leitura (líder pode ver tudo)
  S._modoConferenciaLider = true;
  S._sessIdConferencia = sessId;
  await selectColaborador(nome);
}

/* Líder autoriza a finalização do turno */
async function _liderAutorizarFim(nome, sessId) {
  const ov = document.getElementById('_modal_lider_conf');

  // Confirmação antes de autorizar
  let ovConf = document.getElementById('_modal_lider_confirm_aut');
  if (!ovConf) {
    ovConf = document.createElement('div');
    ovConf.id = '_modal_lider_confirm_aut';
    ovConf.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:100000;display:flex;align-items:center;justify-content:center;padding:20px';
    document.body.appendChild(ovConf);
  }
  const ne = nome.replace(/'/g,"\\'");
  ovConf.innerHTML = `
    <div style="background:#fff;border-radius:20px;padding:28px 24px;width:100%;max-width:320px;
                box-shadow:0 20px 60px rgba(0,0,0,.5);font-family:inherit;text-align:center">
      <div style="font-size:48px;margin-bottom:10px">✅</div>
      <h3 style="font-size:16px;font-weight:900;margin:0 0 8px;color:#1e293b">Autorizar Finalização</h3>
      <p style="font-size:13px;color:#64748b;margin:0 0 20px">
        Confirmar que o turno de <strong>${nome}</strong> foi conferido e está autorizado?
      </p>
      <div style="display:flex;gap:10px">
        <button onclick="document.getElementById('_modal_lider_confirm_aut').style.display='none'"
          style="flex:1;padding:12px;border-radius:12px;border:2px solid #e2e8f0;background:#f9fafb;
                 font-family:inherit;font-size:13px;font-weight:700;cursor:pointer;color:#6b7280">
          Cancelar
        </button>
        <button onclick="_confirmarAutorizacaoLider('${ne}','${sessId}')"
          style="flex:2;padding:12px;border-radius:12px;border:none;
                 background:linear-gradient(135deg,#16a34a,#15803d);color:#fff;
                 font-family:inherit;font-size:13px;font-weight:800;cursor:pointer">
          ✅ Confirmar
        </button>
      </div>
    </div>`;
  ovConf.style.display = 'flex';
}

async function _confirmarAutorizacaoLider(nome, sessId) {
  // Fecha modais
  const ovConf = document.getElementById('_modal_lider_confirm_aut');
  if (ovConf) ovConf.style.display = 'none';
  const ovMain = document.getElementById('_modal_lider_conf');
  if (ovMain) ovMain.style.display = 'none';

  showLoading(true);
  try {
    if (sessId) {
      await _fbPatch('sessoes', sessId, {
        lider_conferiu:   true,
        lider_autorizado: true,
        lider_nome:       JB_SESSION ? (JB_SESSION.nome || JB_SESSION.username) : 'Líder',
        lider_hora:       new Date().toLocaleTimeString('pt-BR'),
      });
    }
    _cache.sessoes = null;
    showToast(`🎖️ Turno de ${nome} autorizado pelo Líder!`);
    _mostrarTelaSetor(_deptAtual);
  } catch(e) {
    showToast('❌ Erro ao autorizar. Tente novamente.');
    console.error(e);
  } finally {
    showLoading(false);
  }
}

/* Reabrir turno a partir do modal de conferência do líder */
function _liderReabrirDoModal(nome) {
  const ovMain = document.getElementById('_modal_lider_conf');
  if (ovMain) ovMain.style.display = 'none';
  // Usa o fluxo original de reabrir (pede senha se necessário)
  _reabrirTurnoColab(nome);
}

/* ══ BANNER DE CONFERÊNCIA DO LÍDER ══════════════════════ */
function _injetarBannerConferencia(nome, sess) {
  // Remove banner anterior se existir
  const antigo = document.getElementById('_banner_conferencia_lider');
  if (antigo) antigo.remove();

  const banner = document.createElement('div');
  banner.id = '_banner_conferencia_lider';
  const statusLabel = sess.status_geral==='completo'
    ? '<span style="color:#16a34a;font-weight:800">✅ 100% Concluído</span>'
    : '<span style="color:#d97706;font-weight:800">⚠️ Parcial / Pendências</span>';
  banner.style.cssText = `
    position:fixed;top:0;left:0;right:0;z-index:4000;
    background:linear-gradient(135deg,#1e3a8a,#1d4ed8);
    color:#fff;padding:10px 16px;
    display:flex;align-items:center;justify-content:space-between;
    font-family:inherit;gap:10px;box-shadow:0 2px 12px rgba(0,0,0,.3);
  `;
  banner.innerHTML = `
    <div style="display:flex;align-items:center;gap:8px;min-width:0">
      <span style="font-size:20px">🎖️</span>
      <div style="min-width:0">
        <div style="font-size:13px;font-weight:900;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
          Conferência: ${nome}
        </div>
        <div style="font-size:11px;opacity:.85">${statusLabel} &nbsp;·&nbsp; Somente leitura</div>
      </div>
    </div>
    <button onclick="_voltarDoModoConferencia()"
      style="flex-shrink:0;padding:8px 14px;border-radius:10px;border:2px solid rgba(255,255,255,.3);
             background:rgba(255,255,255,.12);color:#fff;font-family:inherit;
             font-size:12px;font-weight:800;cursor:pointer;white-space:nowrap">
      ← Voltar
    </button>`;
  document.body.prepend(banner);

  // Ajusta padding do conteúdo principal
  const step = document.getElementById('screen-step1');
  if (step) step.style.paddingTop = '64px';

  // Bloqueia interações dos cards (somente leitura)
  _aplicarModoLeituraStep2();
}

function _aplicarModoLeituraStep2() {
  // Mantém a flag ativa (já foi setada em _liderConferir)
  // S._modoConferenciaLider já é true — openS2Modal verifica antes de abrir o modal de edição
  // Aguarda o DOM do step2 estar pronto para aplicar estilos visuais
  const _aplicar = () => {
    const cards = document.querySelectorAll('.s2-card, .s1-card, .task-card');
    cards.forEach(card => {
      // Adiciona classe para estilo visual de somente leitura
      card.classList.add('card-conf-lider');
      // NÃO usa pointer-events:none aqui pois queremos que o líder possa clicar e VER
      // A restrição de edição é feita dentro do openS2Modal via S._modoConferenciaLider
    });
    // Oculta botão de finalizar turno
    const btnConclude = document.getElementById('btn-conclude');
    if (btnConclude) btnConclude.style.display = 'none';
    // Oculta botão iniciar produção
    const btnStart = document.getElementById('btn-sm-start-footer');
    if (btnStart) btnStart.classList.add('hidden');
    // Mostra dica visual no topo da lista
    const wrap = document.getElementById('screen-step1');
    if (wrap) {
      let dica = document.getElementById('_dica_leitura');
      if (!dica) {
        dica = document.createElement('div');
        dica.id = '_dica_leitura';
        dica.style.cssText = 'text-align:center;padding:8px 16px;font-size:12px;font-weight:700;color:#1d4ed8;background:#dbeafe;border-radius:10px;margin:8px 16px 4px;';
        dica.textContent = '👁️ Modo Conferência — clique em qualquer card para ver o resultado';
        wrap.prepend(dica);
      }
    }
  };
  // Aplica imediatamente e novamente após render completo
  setTimeout(_aplicar, 100);
  setTimeout(_aplicar, 400);
}

function _voltarDoModoConferencia() {
  // Remove banner e ajustes
  const banner = document.getElementById('_banner_conferencia_lider');
  if (banner) banner.remove();
  const dica = document.getElementById('_dica_leitura');
  if (dica) dica.remove();
  const step = document.getElementById('screen-step1');
  if (step) step.style.paddingTop = '';
  // Reseta estado de conferência
  S._modoConferenciaLider = false;
  S._confCards = {};
  S._nomeConferencia = null;
  _cache.sessoes = null; // força reload para mostrar badge atualizado
  _mostrarTelaSetor(_deptAtual);
}

/* ══ FINALIZAR CARD NA CONFERÊNCIA ══════════════════════════════════════
   Líder clica em "Finalizar Conferência" dentro de um card aberto.
   - Marca o card como conferido (esmaecido)
   - Se for o último card → grava lider_autorizado=true e volta ao setor
════════════════════════════════════════════════════════════════════════ */
async function _liderFinalizarCard(nome, tarefaId) {
  // Registra card como conferido nesta sessão
  S._confCards[tarefaId] = true;
  closeModal('modal-s2');

  // Esmaece o card visualmente na tela de conferência
  const cardEl = document.getElementById('s2c-' + tarefaId);
  if (cardEl) {
    cardEl.style.opacity = '0.35';
    cardEl.style.filter  = 'grayscale(.7)';
    cardEl.style.pointerEvents = 'none';
    // Adiciona ícone de conferido
    const header = cardEl.querySelector('.task-card-header');
    if (header && !header.querySelector('._conf_ok_badge')) {
      const badge = document.createElement('span');
      badge.className = '_conf_ok_badge';
      badge.style.cssText = 'background:#16a34a;color:#fff;font-size:10px;font-weight:900;padding:2px 6px;border-radius:8px;';
      badge.textContent = '🎖️ OK';
      header.appendChild(badge);
    }
  }

  // Verifica se todos os cards foram conferidos
  const total   = S.tarefas.length;
  const conferidos = Object.keys(S._confCards).length;

  // Atualiza contador no banner
  const dica = document.getElementById('_dica_leitura');
  if (dica) dica.textContent = `👁️ Conferidos: ${conferidos}/${total} — ${conferidos < total ? 'continue conferindo' : 'tudo conferido!'}`;

  if (conferidos >= total) {
    // Todos conferidos → finaliza a conferência
    showLoading(true);
    try {
      const sessId = S._sessIdConferencia;
      if (sessId) {
        await _fbPatch('sessoes', sessId, {
          lider_conferiu:   true,
          lider_autorizado: true,
          lider_nome: JB_SESSION ? (JB_SESSION.nome || JB_SESSION.username) : 'Líder',
          lider_hora: new Date().toLocaleTimeString('pt-BR'),
        });
      }
      _cache.sessoes = null;
      showToast('🎖️ Conferência de ' + nome + ' finalizada!');
    } catch(e) {
      showToast('❌ Erro ao finalizar conferência');
      console.error(e);
    } finally {
      showLoading(false);
    }

    // Aguarda 800ms para o usuário ver o efeito e depois volta ao setor
    setTimeout(() => _voltarDoModoConferencia(), 800);
  }
}

/* ══ INFORMAÇÃO INCORRETA NA CONFERÊNCIA ════════════════════════════════
   Líder detecta inconsistência → corrige quantidade → cria pendência
   → abate 20 pts no dashboard via coleção 'inconsistencias'
════════════════════════════════════════════════════════════════════════ */
function _liderInfIncorreta(nome, tarefaId) {
  const tarefa = S.tarefas.find(t => t.id === tarefaId);
  if (!tarefa) return;

  const d2     = S.s2[tarefaId] || {};
  const ck     = isChecklist(tarefa);
  const prodAt = d2.produzida !== undefined ? d2.produzida : (tarefa.quantidade_padrao || 0);
  const prog   = (S.s1[tarefaId] || {}).programada !== undefined
    ? (S.s1[tarefaId]).programada
    : (tarefa.quantidade_padrao || 0);

  // Fecha modal-s2 e abre modal de inconsistência
  closeModal('modal-s2');

  let ov = document.getElementById('_modal_inf_incorreta');
  if (!ov) {
    ov = document.createElement('div'); ov.id = '_modal_inf_incorreta';
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:100000;display:flex;align-items:center;justify-content:center;padding:20px';
    document.body.appendChild(ov);
  }
  const ne = nome.replace(/'/g,"\\'");
  const tid = tarefaId.replace(/'/g,"\\'");

  ov.innerHTML = `
    <div style="background:#fff;border-radius:20px;padding:24px 20px;width:100%;max-width:360px;
                box-shadow:0 20px 60px rgba(0,0,0,.5);font-family:inherit">
      <div style="text-align:center;margin-bottom:16px">
        <div style="font-size:36px">⚠️</div>
        <h3 style="font-size:16px;font-weight:900;margin:6px 0 2px;color:#1e293b">Informação Incorreta</h3>
        <p style="font-size:12px;color:#64748b;margin:0">${tarefa.item}</p>
      </div>
      <div style="background:#fef3c7;border-radius:12px;padding:10px 14px;margin-bottom:14px;font-size:12px;color:#92400e;font-weight:600;">
        ⚠️ Esta ação cria uma pendência e desconta <strong>20 pontos</strong> no dashboard do colaborador.
      </div>
      ${!ck ? `
      <div style="margin-bottom:14px">
        <label style="font-size:12px;font-weight:700;color:#374151;display:block;margin-bottom:6px">
          📦 Quantidade real produzida <span style="font-size:11px;color:#9ca3af;">(informado: ${fmt(prodAt)} ${tarefa.unidade||''})</span>
        </label>
        <div style="display:flex;align-items:center;gap:8px;justify-content:center">
          <button onclick="
            const v=document.getElementById('_inf_qtd_real');
            v.value=Math.max(0,(parseInt(v.value)||0)-1)
          " style="width:36px;height:36px;border-radius:8px;border:2px solid #e2e8f0;background:#f9fafb;font-size:18px;cursor:pointer;font-weight:900">−</button>
          <input id="_inf_qtd_real" type="number" min="0" value="${prodAt}"
            style="width:80px;text-align:center;padding:8px;border:2px solid #e2e8f0;border-radius:10px;font-size:16px;font-weight:900;font-family:inherit"/>
          <button onclick="
            const v=document.getElementById('_inf_qtd_real');
            v.value=(parseInt(v.value)||0)+1
          " style="width:36px;height:36px;border-radius:8px;border:2px solid #e2e8f0;background:#f9fafb;font-size:18px;cursor:pointer;font-weight:900">+</button>
        </div>
      </div>` : ''}
      <div style="margin-bottom:16px">
        <label style="font-size:12px;font-weight:700;color:#374151;display:block;margin-bottom:6px">📝 Observação</label>
        <textarea id="_inf_obs" rows="2" placeholder="Descreva a inconsistência encontrada..."
          style="width:100%;padding:10px;border:2px solid #e2e8f0;border-radius:10px;font-size:13px;
                 font-family:inherit;box-sizing:border-box;resize:none;"></textarea>
      </div>
      <div style="display:flex;gap:8px">
        <button onclick="document.getElementById('_modal_inf_incorreta').style.display='none';openS2Modal('${tid}')"
          style="flex:1;padding:11px;border-radius:12px;border:2px solid #e2e8f0;background:#f9fafb;
                 font-family:inherit;font-size:12px;font-weight:700;cursor:pointer;color:#6b7280">
          Cancelar
        </button>
        <button onclick="_confirmarInfIncorreta('${ne}','${tid}',${ck?'true':'false'})"
          style="flex:2;padding:11px;border-radius:12px;border:none;
                 background:linear-gradient(135deg,#f97316,#ea580c);color:#fff;
                 font-family:inherit;font-size:13px;font-weight:800;cursor:pointer">
          ⚠️ Confirmar e Registrar
        </button>
      </div>
    </div>`;
  ov.style.display = 'flex';
}

async function _confirmarInfIncorreta(nome, tarefaId, isChecklist) {
  const tarefa = S.tarefas.find(t => t.id === tarefaId);
  if (!tarefa) return;

  const obs    = (document.getElementById('_inf_obs')?.value || '').trim();
  const qtdRealEl = document.getElementById('_inf_qtd_real');
  const qtdReal   = qtdRealEl ? Math.max(0, parseInt(qtdRealEl.value) || 0) : 0;
  const prog      = (S.s1[tarefaId] || {}).programada !== undefined
    ? (S.s1[tarefaId]).programada : (tarefa.quantidade_padrao || 0);

  if (!obs) { showToast('⚠️ Descreva a inconsistência!'); return; }

  // Fecha modal de inconsistência
  const ovInc = document.getElementById('_modal_inf_incorreta');
  if (ovInc) ovInc.style.display = 'none';

  showLoading(true);
  try {
    const dt = S.dataTrabalho || today();

    // 1. Cria pendência na coleção 'pendencias' para o dashboard de resultados
    await _fbPost('pendencias', {
      data: dt, turno: S.turno, dia_semana: S.dia,
      colaborador: nome,
      item: tarefa.item, categoria: tarefa.categoria || '',
      quantidade_programada: prog,
      quantidade_produzida:  isChecklist ? 0 : qtdReal,
      status: 'nao_finalizado',
      motivo: `⚠️ Inconsistência — ${obs}`,
      vistoriado: 0,
      origem_falta: 'inconsistencia_lider',
      sessao_id: S._sessIdConferencia || '',
    });

    // 2. Grava inconsistência na coleção própria para abater 20 pts no dashboard
    await _fbPost('inconsistencias', {
      data: dt, turno: S.turno, dia_semana: S.dia,
      colaborador: nome,
      tarefa_id: tarefaId,
      item: tarefa.item,
      pontos: 20,
      obs: obs,
      lider_nome: JB_SESSION ? (JB_SESSION.nome || JB_SESSION.username) : 'Líder',
      hora: new Date().toLocaleTimeString('pt-BR'),
    });

    showToast(`⚠️ Inconsistência registrada! −20 pts para ${nome}`);

    // 3. Marca card como conferido (com inconsistência) e continua o fluxo
    S._confCards[tarefaId] = true;

    // Esmaece card visualmente
    const cardEl = document.getElementById('s2c-' + tarefaId);
    if (cardEl) {
      cardEl.style.opacity = '0.35';
      cardEl.style.filter  = 'grayscale(.7)';
      cardEl.style.pointerEvents = 'none';
      const header = cardEl.querySelector('.task-card-header');
      if (header && !header.querySelector('._conf_ok_badge')) {
        const badge = document.createElement('span');
        badge.className = '_conf_ok_badge';
        badge.style.cssText = 'background:#f97316;color:#fff;font-size:10px;font-weight:900;padding:2px 6px;border-radius:8px;';
        badge.textContent = '⚠️ Inc.';
        header.appendChild(badge);
      }
    }

    // Verifica se todos foram conferidos após esta inconsistência
    const total      = S.tarefas.length;
    const conferidos = Object.keys(S._confCards).length;

    const dica = document.getElementById('_dica_leitura');
    if (dica) dica.textContent = `👁️ Conferidos: ${conferidos}/${total}`;

    if (conferidos >= total) {
      const sessId = S._sessIdConferencia;
      if (sessId) {
        await _fbPatch('sessoes', sessId, {
          lider_conferiu:   true,
          lider_autorizado: true,
          lider_nome: JB_SESSION ? (JB_SESSION.nome || JB_SESSION.username) : 'Líder',
          lider_hora: new Date().toLocaleTimeString('pt-BR'),
        });
      }
      _cache.sessoes = null;
      showToast('🎖️ Conferência de ' + nome + ' concluída com inconsistências!');
      setTimeout(() => _voltarDoModoConferencia(), 800);
    }
  } catch(e) {
    showToast('❌ Erro ao registrar inconsistência');
    console.error(e);
  } finally {
    showLoading(false);
  }
}

/* ══ FALTAS ══════════════════════════════════════════════ */
function _abrirFaltaComSenha(nome) {
  if (S.leaderOk) { _abrirModalFalta(nome); return; }
  _abrirModalSenha('🔐','Confirmar Liderança','Senha do líder para registrar falta',LEADER_PASSWORD,()=>_abrirModalFalta(nome));
}

function _abrirModalFalta(nome) {
  let ov=document.getElementById('_modal_falta');
  if (!ov) {
    ov=document.createElement('div'); ov.id='_modal_falta';
    ov.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px';
    document.body.appendChild(ov);
  }
  const ne=nome.replace(/'/g,"\\'");
  ov.innerHTML=`<div style="background:#fff;border-radius:20px;padding:28px 24px;width:100%;max-width:340px;box-shadow:0 20px 60px rgba(0,0,0,.4);font-family:inherit">
    <h3 style="margin:0 0 16px;font-size:16px;font-weight:900">🚫 Registrar Falta — ${nome}</h3>
    <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px">
      <button onclick="_registrarFalta('${ne}','nao_justificada')" style="padding:14px;border-radius:12px;border:none;background:#fee2e2;color:#dc2626;font-weight:700;font-size:14px;cursor:pointer">🚫 Falta Não Justificada</button>
      <button onclick="_registrarFalta('${ne}','justificada')" style="padding:14px;border-radius:12px;border:none;background:#fef3c7;color:#d97706;font-weight:700;font-size:14px;cursor:pointer">📋 Falta Justificada</button>
    </div>
    <button onclick="document.getElementById('_modal_falta').style.display='none'" style="width:100%;padding:12px;border-radius:12px;border:2px solid #e2e6f0;background:#f9fafb;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer">Cancelar</button>
  </div>`;
  ov.style.display='flex';
}

async function _registrarFalta(nome,tipo) {
  const dt=S.dataTrabalho||today();
  try {
    await _fbPost('faltas',{colaborador:nome,data:dt,turno:S.turno,dia_semana:S.dia,tipo});
    const todasTarefas=_cache.tarefas||await _fbGetAll('tarefas');
    const tarefasColab=todasTarefas.filter(t=>
      t.colaborador===nome && t.turno===S.turno && t.dia_semana===S.dia
    );
    for (const t of tarefasColab) {
      await _fbPost('pendencias',{
        data:dt, turno:S.turno, dia_semana:S.dia,
        colaborador:nome,
        item:t.item,
        categoria:t.categoria||'',
        quantidade_programada:t.quantidade_padrao||0,
        quantidade_produzida:0,
        status:'nao_finalizado',
        motivo:tipo==='nao_justificada'?'🚫 Falta não justificada':'📋 Falta justificada',
        vistoriado:0,
        origem_falta:tipo,
        tarefa_id:t.id||'',
      });
    }
    const ov=document.getElementById('_modal_falta');
    if (ov) ov.style.display='none';
    _invalidarCache(); _cache._faltas=null;
    const tipoLabel=tipo==='nao_justificada'?'Falta N/J':'Falta Justificada';
    showToast(`✅ ${tipoLabel} registrada! ${tarefasColab.length} pend${tarefasColab.length!==1?'ências':'ência'} criada${tarefasColab.length!==1?'s':''} nos Resultados.`);
    _mostrarTelaSetor(_deptAtual);
  } catch(e) { showToast('❌ Erro ao registrar falta: '+e.message); }
}

async function _gerenciarFalta(nome,tipo,acao) {
  if (acao==='remover'&&S.leaderOk) {
    const ok = await new Promise(resolve=>{
      let ov=document.getElementById('_modal_confirm_falta');
      if (!ov){ ov=document.createElement('div'); ov.id='_modal_confirm_falta';
        ov.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px';
        document.body.appendChild(ov); }
      ov.innerHTML=`<div style="background:#fff;border-radius:20px;padding:28px 24px;width:100%;max-width:320px;box-shadow:0 20px 60px rgba(0,0,0,.4);font-family:inherit;text-align:center">
        <div style="font-size:36px;margin-bottom:10px">🚫</div>
        <h3 style="font-size:15px;font-weight:900;margin:0 0 8px">Remover Falta</h3>
        <p style="font-size:13px;color:#6b7280;margin:0 0 18px">Remover a falta de <strong>${nome}</strong>?</p>
        <div style="display:flex;gap:10px">
          <button onclick="document.getElementById('_modal_confirm_falta').style.display='none'" id="_cf_nao"
            style="flex:1;padding:12px;border-radius:12px;border:2px solid #e2e6f0;background:#f9fafb;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer">Cancelar</button>
          <button id="_cf_sim" style="flex:2;padding:12px;border-radius:12px;border:none;background:#dc2626;color:#fff;font-family:inherit;font-size:13px;font-weight:800;cursor:pointer">✅ Remover</button>
        </div></div>`;
      ov.style.display='flex';
      document.getElementById('_cf_sim').onclick=()=>{ ov.style.display='none'; resolve(true); };
      document.getElementById('_cf_nao').onclick=()=>{ ov.style.display='none'; resolve(false); };
    });
    if (!ok) return;
    try {
      const faltas=await _fbGetAll('faltas');
      const dt=S.dataTrabalho||today();
      const f=faltas.find(x=>x.colaborador===nome&&x.data===dt&&x.turno===S.turno);
      if (f) { await _fbDelete('faltas',f.id); _cache._faltas=null; showToast('✅ Falta removida!'); _mostrarTelaSetor(_deptAtual); }
    } catch(e) { showToast('❌ Erro ao remover falta'); }
  }
}

/* ══ SELECIONAR COLABORADOR ══════════════════════════════ */
async function selectColaborador(nome) {
  if (_thanksIv) { clearInterval(_thanksIv); _thanksIv=null; }
  S.colaborador=nome; S.s1={}; S.s2={};
  S.producaoIniciada=false;
  _atendRegIds={};
  const isAtend=ATEND_COLABS.includes(nome.toUpperCase());
  showLoading(true);
  try {
    const todasTarefas=await _fbGetAll('tarefas');
    _cache.tarefas=todasTarefas;
    const _dtTrab2=S.dataTrabalho||today();
    S.tarefas=todasTarefas
      .filter(t=>
        t.turno===S.turno && t.colaborador===nome &&
        (t.data_especifica
          ? t.data_especifica===_dtTrab2
          : t.dia_semana===S.dia
        )
      )
      .sort((a,b)=>(a.ordem||0)-(b.ordem||0));
    if (!S.tarefas.length) { showToast('😕 Sem tarefas para este colaborador'); return; }

    const dt=S.dataTrabalho||today();
    const todasSessoes=_cache.sessoes||await _fbGetAll('sessoes');
    const sessEtapa1=todasSessoes.find(s=>
      s.colaborador_card===nome&&s.data===dt&&s.turno===S.turno&&
      s.dia_semana===S.dia&&s.status_geral==='etapa1_ok'
    );

    // ── Verifica se o turno já foi autorizado pelo líder ──
    const sessAutorizada = todasSessoes.find(s=>
      s.colaborador_card===nome&&s.data===dt&&s.turno===S.turno&&
      s.dia_semana===S.dia&&(s.status_geral==='completo'||s.status_geral==='parcial')&&
      s.lider_autorizado===true
    );
    S._turnoAutorizadoLider = !!sessAutorizada && !_isLider();

    // ── MODO CONFERÊNCIA DO LÍDER ─────────────────────────
    // Quando o líder clica em "Conferir" num card já finalizado
    const sessFinalizadaLider = S._modoConferenciaLider
      ? todasSessoes.find(s=>
          s.colaborador_card===nome&&s.data===dt&&s.turno===S.turno&&
          s.dia_semana===S.dia&&(s.status_geral==='completo'||s.status_geral==='parcial')
        )
      : null;

    if (sessFinalizadaLider) {
      // Mantém flag ativa durante toda a navegação no modo conferência
      // (S._modoConferenciaLider só é zerado em _voltarDoModoConferencia)
      // Carrega pendências para mostrar o resultado final
      try {
        const todasPend = await _fbGetAll('pendencias');
        const pendColab = todasPend.filter(p=>
          p.colaborador===nome&&p.data===dt&&p.turno===S.turno&&p.dia_semana===S.dia
        );
        // Reconstrói S.tarefas com os dados das pendências + tarefas sem pendência (= concluídas)
        // Monta S.s2 a partir das pendências salvas
        pendColab.forEach(p=>{
          const tarefa = S.tarefas.find(t=>t.item===p.item&&(t.categoria||'')===(p.categoria||''));
          if (tarefa) {
            S.s2[tarefa.id]={
              produzida: p.quantidade_produzida||0,
              status:    p.status||'nao_finalizado',
              motivo:    p.motivo||'',
            };
          }
        });
        // Tarefas sem pendência = concluídas 100%
        S.tarefas.forEach(t=>{
          if (!S.s2[t.id]) S.s2[t.id]={ produzida: t.quantidade_padrao||0, status:'total', motivo:'' };
        });
      } catch(e) { console.error(e); }

      _setNavChips(nome);
      renderStep2();
      showScreen('screen-step1');
      // Injeta banner informativo de modo conferência
      _injetarBannerConferencia(nome, sessFinalizadaLider);
      return;
    }
    // ─────────────────────────────────────────────────────

    if (isAtend) {
      await _carregarRegistrosAtendimento(nome);
      _setNavChips(nome);
      _prepararModoAtendimento();
      renderStep2();
      showScreen('screen-step1');
    } else if (sessEtapa1) {
      S.sessaoId=sessEtapa1.id;
      if (sessEtapa1.s1_data) {
        try { Object.assign(S.s1, JSON.parse(sessEtapa1.s1_data)); } catch(e) {}
      }
      S.producaoIniciada=true;
      try {
        const todosRegs=await _fbGetAll('registros');
        const regsColab=todosRegs.filter(r=>
          r.colaborador_card===nome&&r.data===dt&&
          r.turno===S.turno&&r.dia_semana===S.dia&&r.tarefa_id
        );
        const byTarefa={};
        regsColab.forEach(r=>{
          const ts=r.updated_at||r.created_at||0;
          const ex=byTarefa[r.tarefa_id];
          if (!ex||(ex.updated_at||ex.created_at||0)<ts) byTarefa[r.tarefa_id]=r;
        });
        Object.entries(byTarefa).forEach(([tid,r])=>{
          S.s2[tid]={
            produzida:r.quantidade_produzida!==undefined?r.quantidade_produzida:0,
            status:r.status||'total',
            motivo:r.motivo||'',
            reg_id:r.id,
          };
        });
        const jaFinal=Object.keys(S.s2).length;
        if (jaFinal>0) showToast(`▶️ ${jaFinal} tarefa(s) já marcada(s). Continue!`);
        else showToast('▶️ Continue a finalização!');
      } catch(e) { console.error(e); showToast('▶️ Continue a finalização!'); }
      _setNavChips(nome);
      renderStep2();
      showScreen('screen-step1');
    } else {
      S.sessaoId='sess_'+Date.now();
      _setNavChips(nome);
      renderStep1();
      showScreen('screen-step1');
    }
  } catch(e) { console.error(e); showToast('❌ Erro ao carregar tarefas'); }
  finally { showLoading(false); }
}

async function _carregarRegistrosAtendimento(nome) {
  const dt=S.dataTrabalho||today();
  try {
    const todos=await _fbGetAll('registros');
    const regs=todos.filter(r=>r.colaborador_card===nome&&r.data===dt&&r.turno===S.turno&&r.dia_semana===S.dia);
    const byTarefa={};
    regs.forEach(r=>{
      const tid=r.tarefa_id; if (!tid) return;
      const tsNovo=r.updated_at||r.created_at||0;
      const tsExist=byTarefa[tid]?(byTarefa[tid].updated_at||byTarefa[tid].created_at||0):-1;
      if (tsNovo>tsExist) byTarefa[tid]=r;
    });
    Object.entries(byTarefa).forEach(([tid,r])=>{
      S.s2[tid]={produzida:r.quantidade_produzida!==undefined?r.quantidade_produzida:1,status:r.status||'total',motivo:r.motivo||''};
      S.s1[tid]={estoque:0,programada:1,confirmed:true};
      _atendRegIds[tid]=r.id;
    });
    if (regs.length>0) {
      const mr=regs.reduce((a,b)=>((a.updated_at||a.created_at||0)>(b.updated_at||b.created_at||0)?a:b));
      if (mr.sessao_id) S.sessaoId=mr.sessao_id;
    }
  } catch(e) { console.error(e); }
}

function _prepararModoAtendimento() {
  S.producaoIniciada=true;
  S.tarefas.forEach(t=>{ if (!S.s1[t.id]) S.s1[t.id]={estoque:0,programada:1,confirmed:true}; });
  const banner=document.getElementById('prod-banner');
  if (banner) banner.classList.add('hidden');
}

/* ══ CHIPS DE NAVEGAÇÃO ══════════════════════════════════ */
function _setNavChips(nome) {
  const dObj=DIAS_LIST.find(d=>d.key===S.dia);
  const turnoTxt=(S.turno==='dia'?'☀️':'🌙')+' '+(S.turno==='dia'?'Dia':'Noite');
  const diaTxt  =dObj?dObj.short+' '+dObj.icon:S.dia;
  const userTxt =(COLLAB_EMOJI[nome]||'👤')+' '+nome;
  [['s1-turno-chip',turnoTxt],['s1-day-chip',diaTxt],['s1-user-chip',userTxt]].forEach(([id,txt])=>{
    const el=document.getElementById(id); if (el) el.textContent=txt;
  });
}

/* ══ ETAPA 1 — PROGRAMAÇÃO ═══════════════════════════════ */
function renderStep1() {
  const list=document.getElementById('s1-list');
  if (!list) return;
  const allConfirmed=S.tarefas.every(t=>S.s1[t.id]&&S.s1[t.id].confirmed);
  const confirmed   =S.tarefas.filter(t=>S.s1[t.id]&&S.s1[t.id].confirmed).length;
  const total       =S.tarefas.length;

  const fill=document.getElementById('s1-progress');
  const txt =document.getElementById('s1-progress-text');
  if (fill) fill.style.width=(total?Math.round(confirmed/total*100):0)+'%';
  if (txt)  txt.textContent=`${confirmed} / ${total} programados`;

  const banner=document.getElementById('prod-banner');
  if (banner) banner.classList.add('hidden');

  list.innerHTML=S.tarefas.map(t=>{
    const cc=getCatColor(t.categoria);
    const ce=getCatEmoji(t.categoria);
    const ck=isChecklist(t);
    const conf=S.s1[t.id];
    const isConf=conf&&conf.confirmed;
    const qtdPadrao = Number(t.quantidade_padrao)||0;
    const isExcCard = !ck && qtdPadrao === 0;
    let infoLine;
    if (ck) {
      infoLine = isConf
        ? '<div class="task-qty-display" style="color:#16a34a;font-weight:800">✓ Confirmada</div>'
        : '<div class="task-qty-display" style="color:#9ca3af">Toque para confirmar</div>';
    } else if (isExcCard) {
      infoLine = isConf
        ? '<div class="task-qty-display" style="color:#d97706;font-weight:800">⚡ Exceção — confirmada</div>'
        : '<div class="task-qty-display" style="color:#f59e0b;font-weight:700">⚡ Tarefa de exceção</div>';
    } else {
      infoLine = isConf
        ? `<div class="task-qty-display"><strong>${fmt(conf.programada)}</strong> ${t.unidade||''} a produzir</div>`
        : `<div class="task-qty-display">Padrão: <strong>${fmt(qtdPadrao)}</strong> ${t.unidade||''} em estoque</div>`;
    }
    return `<div class="task-card s1-card${isConf?' task-confirmed':''}" id="s1c-${t.id}" onclick="openS1Modal('${t.id}')">
      <div class="task-card-header" style="background:${cc}">
        <span class="cat-label">${ce} ${t.categoria||'Geral'}</span>
        ${isConf?'<span class="task-check-badge">✅</span>':''}
      </div>
      <div class="task-card-body">
        <div class="task-name">${t.item}</div>
        ${infoLine}
      </div></div>`;
  }).join('');

  const pInfo      =document.getElementById('btn-pending-info');
  const pTxt       =document.getElementById('pending-count-text');
  const startBtn   =document.getElementById('btn-sm-start-footer');
  const concludeBtn=document.getElementById('btn-conclude');
  if (!S.producaoIniciada) {
    if (pInfo) pInfo.style.display='flex';
    if (pTxt)  pTxt.textContent=allConfirmed?'Todos programados — clique em Iniciar Turno!':`${total-confirmed} item(s) ainda não confirmado(s)`;
    if (startBtn) {
      startBtn.classList.remove('hidden');
      startBtn.style.display='';
      startBtn.disabled=false;
      startBtn.style.opacity='';
    }
    if (concludeBtn) concludeBtn.classList.add('hidden');
  } else {
    if (pInfo) pInfo.style.display='none';
    if (startBtn)   startBtn.classList.add('hidden');
    if (concludeBtn) concludeBtn.classList.add('hidden');
  }
}

let _s1Id=null;
function openS1Modal(id) {
  const t=S.tarefas.find(x=>x.id===id);
  if (!t) return;
  _s1Id=id;

  const padrao = Number(t.quantidade_padrao)||0;
  const ck     = isChecklist(t);
  const temQtd = !ck && padrao > 0;

  document.getElementById('modal-s1-qty').classList.add('hidden');
  document.getElementById('modal-s1-exec').classList.add('hidden');

  const cor = getCatColor(t.categoria);
  const cat = t.categoria||'';

  if (temQtd) {
    document.getElementById('modal-s1-qty-header').style.background = cor;
    document.getElementById('modal-s1-qty-cat').textContent = cat;
    document.getElementById('modal-s1-qty-title').textContent = t.item;

    const conf=S.s1[id]||{};
    const estoqueAtual=conf.estoque!==undefined?conf.estoque:0;
    document.getElementById('modal-s1-estoque').textContent=estoqueAtual;
    document.getElementById('modal-s1-unidade').textContent=t.unidade||'un';
    document.getElementById('calc-padrao').textContent=fmt(padrao)+' '+(t.unidade||'');
    document.getElementById('calc-estoque').textContent=estoqueAtual;
    document.getElementById('modal-s1-prog').textContent=conf.programada!==undefined?conf.programada:(padrao>estoqueAtual?padrao-estoqueAtual:0);
    document.getElementById('modal-s1-unit2').textContent=t.unidade||'';
    const pdEl=document.getElementById('calc-padrao-display');
    if (pdEl) pdEl.textContent=fmt(padrao)+' '+(t.unidade||'');
    _calcNecessario();

    document.getElementById('modal-s1-qty').classList.remove('hidden');
  } else {
    document.getElementById('modal-s1-exec-header').style.background = cor;
    document.getElementById('modal-s1-exec-cat').textContent = cat;
    document.getElementById('modal-s1-exec-title').textContent = t.item;

    document.getElementById('modal-s1-exec').classList.remove('hidden');
  }
}

function _calcNecessario() {
  const estEl=document.getElementById('modal-s1-estoque');
  const padEl=document.getElementById('calc-padrao');
  const necEl=document.getElementById('calc-necessario');
  if (!estEl||!padEl||!necEl) return;
  const est   =Number(estEl.textContent)||0;
  const padStr=(padEl.textContent||'').replace(/[^0-9,.]/g,'').replace(',','.');
  const pad   =parseFloat(padStr)||0;
  const nec   =Math.max(0,pad-est);
  necEl.textContent=fmt(nec);
  const progEl=document.getElementById('modal-s1-prog');
  if (progEl) progEl.textContent=nec;
}

function adjField(field,delta) {
  if (field==='estoque') {
    const el=document.getElementById('modal-s1-estoque');
    if (!el) return;
    const newVal=Math.max(0,Number(el.textContent)+delta);
    el.textContent=newVal;
    document.getElementById('calc-estoque').textContent=newVal;
    _calcNecessario();
  } else if (field==='produzida') {
    const el=document.getElementById('modal-s2-prod');
    if (!el) return;
    el.textContent=Math.max(0,Number(el.textContent)+delta);
  }
}

function confirmS1() {
  const t=S.tarefas.find(x=>x.id===_s1Id); if (!t) return;
  const ck=isChecklist(t);
  const padrao=Number(t.quantidade_padrao)||0;
  const temQtd=!ck&&padrao>0;
  let est=0,prog=1;
  if (temQtd) {
    est=Number(document.getElementById('modal-s1-estoque').textContent)||0;
    prog=Number(document.getElementById('modal-s1-prog').textContent)||0;
  }
  S.s1[_s1Id]={estoque:est,programada:prog,confirmed:true};
  document.getElementById('modal-s1-qty').classList.add('hidden');
  document.getElementById('modal-s1-exec').classList.add('hidden');
  renderStep1();
}

async function iniciarProducao() {
  const iniBtn = document.getElementById('btn-sm-start-footer');
  if (iniBtn) { iniBtn.disabled = true; iniBtn.style.opacity='0.5'; }

  S.producaoIniciada=true;
  S.tarefas.forEach(t=>{ if (!S.s1[t.id]) S.s1[t.id]={estoque:0,programada:t.quantidade_padrao||0,confirmed:true}; });
  const dt=S.dataTrabalho||today();
  try {
    const s1Json=JSON.stringify(S.s1);
    await _fbPost('sessoes',{
      data:dt, turno:S.turno, dia_semana:S.dia,
      colaborador_card:S.colaborador, colaborador_nome:S.colaborador,
      status_geral:'etapa1_ok',
      s1_data:s1Json,
      hora_inicio:new Date().toLocaleTimeString('pt-BR'),
      total_tarefas:S.tarefas.length,
    });
    _cache.sessoes=null;
  } catch(e) { console.error('Erro ao salvar etapa1:', e); }

  printColaborador();
  showToast('✅ Etapa 1 salva! Toque em Imprimir para confirmar.');
  _mostrarTelaSetor(_deptAtual);
}

function doPrintDirect() {
  S.tarefas.forEach(t=>{ if (!S.s1[t.id]) S.s1[t.id]={estoque:0,programada:t.quantidade_padrao||0,confirmed:true}; });
  printColaborador();
  return false;
}

/* ══ ETAPA 2 — PRODUÇÃO / FINALIZAÇÃO ═══════════════════ */
function renderStep2() {
  const list=document.getElementById('s1-list');
  if (!list) return;
  const done =S.tarefas.filter(t=>S.s2[t.id]&&S.s2[t.id].status).length;
  const total=S.tarefas.length;

  const fill=document.getElementById('s1-progress');
  const txt =document.getElementById('s1-progress-text');
  if (fill) { fill.className='progress-bar-fill prog-green'; fill.style.width=(total?Math.round(done/total*100):0)+'%'; }
  if (txt)  txt.textContent=`${done} / ${total} finalizados`;

  list.innerHTML=S.tarefas.map(t=>{
    const cc=getCatColor(t.categoria);
    const ce=getCatEmoji(t.categoria);
    const ck=isChecklist(t);
    const d1=S.s1[t.id]||{};
    const d2=S.s2[t.id]||{};
    const status=d2.status||'';
    const stClass=status==='total'?'s2-total':status==='parcial'?'s2-parcial':status==='nao_finalizado'?'s2-nao':'';
    const stBadge=status==='total'?'✅':status==='parcial'?'⚠️':status==='nao_finalizado'?'❌':'';
    const prog=d1.programada!==undefined?d1.programada:(t.quantidade_padrao||0);
    const isConf=!!status;
    let infoLine2;
    if (ck) {
      infoLine2=isConf
        ?(status==='total'?'<div class="task-qty-display" style="color:#16a34a;font-weight:800">✅ Realizada</div>'
         :'<div class="task-qty-display" style="color:#dc2626;font-weight:800">❌ Não realizada</div>')
        :'<div class="task-qty-display" style="color:#f59e0b;font-weight:700">⏳ Pendente</div>';
    } else {
      infoLine2=isConf
        ?`<div class="task-qty-display"><strong>${fmt(d2.produzida)}</strong>/${fmt(prog)} ${t.unidade||''}</div>`
        :`<div class="task-qty-display">Prog: ${fmt(prog)} ${t.unidade||''}</div>`;
    }
    return `<div class="task-card s2-card ${stClass}" id="s2c-${t.id}" onclick="openS2Modal('${t.id}')">
      <div class="task-card-header" style="background:${cc}">
        <span class="cat-label">${ce} ${t.categoria||'Geral'}</span>
        ${isConf?`<span class="task-check-badge">${stBadge}</span>`:''}
      </div>
      <div class="task-card-body">
        <div class="task-name">${t.item}</div>
        ${infoLine2}
      </div></div>`;
  }).join('');

  const allDone    =S.tarefas.every(t=>S.s2[t.id]&&S.s2[t.id].status);
  const done2      =S.tarefas.filter(t=>S.s2[t.id]&&S.s2[t.id].status).length;
  const pInfo      =document.getElementById('btn-pending-info');
  const pTxt2      =document.getElementById('pending-count-text');
  const startBtn2  =document.getElementById('btn-sm-start-footer');
  const concludeBtn=document.getElementById('btn-conclude');
  if (startBtn2) startBtn2.classList.add('hidden');
  // Em modo conferência do líder, nunca mostra o botão de finalizar
  if (S._modoConferenciaLider) {
    if (concludeBtn) concludeBtn.style.display = 'none';
  } else {
    if (concludeBtn) concludeBtn.classList.toggle('hidden', !allDone);
  }
  if (pInfo) pInfo.style.display='flex';
  if (pTxt2) pTxt2.textContent = S._modoConferenciaLider
    ? `👁️ ${done2}/${S.tarefas.length} tarefas — modo conferência`
    : allDone
      ? 'Tudo finalizado! Clique em Finalizar Turno.'
      : `${done2}/${S.tarefas.length} finalizadas — pode sair e voltar!`;
}

let _s2Id=null,_s2Status=null,_s2Motivo=null;

function openS2Modal(id) {
  const t=S.tarefas.find(x=>x.id===id); if (!t) return;

  // ── Colaborador não pode abrir card após turno autorizado pelo líder ──
  // S._turnoAutorizadoLider é setado em selectColaborador quando a sessão tem lider_autorizado=true
  if (S._turnoAutorizadoLider && !_isLider()) {
    showToast('🎖️ Este turno já foi conferido e autorizado pelo líder.');
    return;
  }
  _s2Id=id; _s2Status=null; _s2Motivo='';
  const ck=isChecklist(t);
  const d2=S.s2[id]||{}; const d1=S.s1[id]||{};
  document.getElementById('modal-s2-title').textContent=t.item;
  document.getElementById('modal-s2-cat').textContent=t.categoria||'';
  document.getElementById('modal-s2-header').style.background=getCatColor(t.categoria);
  const s2ref=document.getElementById('s2-ref-box');
  if (s2ref) s2ref.style.display=ck?'none':'';
  if (!ck) {
    const prog=d1.programada!==undefined?d1.programada:(t.quantidade_padrao||0);
    document.getElementById('modal-s2-prog').textContent=fmt(prog);
    document.getElementById('modal-s2-unit-lbl').textContent=t.unidade||'un';
    document.getElementById('modal-s2-prod').textContent=d2.produzida!==undefined?d2.produzida:prog;
    document.getElementById('modal-s2-unit2').textContent=t.unidade||'un';
  }
  document.querySelectorAll('.sbtn').forEach(b=>b.classList.remove('active'));
  if (d2.status) { const ab=document.querySelector(`.sbtn[data-status="${d2.status}"]`); if (ab) ab.classList.add('active'); }
  _s2Status=d2.status||null; _s2Motivo=d2.motivo||'';

  const qpw=document.getElementById('qty-prod-wrap'); if (qpw) qpw.classList.add('hidden');
  const mw =document.getElementById('motivos-wrap');
  const mc =document.getElementById('motivo-custom'); if (mc) { mc.value=''; mc.classList.add('hidden'); }
  document.querySelectorAll('.motivo-btn').forEach(b=>b.classList.remove('active'));

  if (_s2Status === 'nao_finalizado') {
    if (mw) mw.classList.remove('hidden');
    if (_s2Motivo) {
      const KNOWN=['⏰ Tempo insuficiente','🔧 Equipamento'];
      const mb=document.querySelector(`.motivo-btn[onclick*="${_s2Motivo.replace(/'/g,"\\'")}"]`);
      if (mb) mb.classList.add('active');
      if (!KNOWN.includes(_s2Motivo)) {
        if (mc) { mc.classList.remove('hidden'); mc.value=_s2Motivo; }
      }
    }
  } else {
    if (mw) mw.classList.add('hidden');
  }
  document.getElementById('modal-s2').classList.remove('hidden');

  // ── MODO CONFERÊNCIA DO LÍDER ─────────────────────────────────────────
  if (S._modoConferenciaLider) {
    setTimeout(() => _montarFooterConferencia(id), 50);
  }
}

/* Monta o rodapé especial de conferência dentro do modal-s2 */
function _montarFooterConferencia(tarefaId) {
  const modal = document.getElementById('modal-s2');
  if (!modal) return;

  const jaConferido = !!S._confCards[tarefaId];

  // Desativa controles de edição de status do colaborador
  modal.querySelectorAll('.sbtn, .motivo-btn').forEach(el => {
    el.disabled = true; el.style.opacity='0.35';
    el.style.cursor='not-allowed'; el.style.pointerEvents='none';
  });
  const qtyBtns = modal.querySelectorAll('.qty-btn');
  qtyBtns.forEach(b => { b.disabled=true; b.style.opacity='0.35'; b.style.pointerEvents='none'; });
  const mc2 = modal.querySelector('#motivo-custom');
  if (mc2) mc2.disabled = true;

  // Oculta footer original e injeta footer de conferência
  const footerOrig = document.getElementById('s2-modal-footer');
  if (footerOrig) footerOrig.style.display = 'none';

  // Remove footer antigo se existir
  const oldFt = document.getElementById('_conf_lider_footer');
  if (oldFt) oldFt.remove();

  const ne = (S.colaborador||'').replace(/'/g,"\\'");
  const ft = document.createElement('div');
  ft.id = '_conf_lider_footer';
  ft.style.cssText = 'padding:12px 16px 16px;display:flex;flex-direction:column;gap:8px;border-top:1px solid #f1f5f9;';

  if (jaConferido) {
    // Card já conferido → mostra apenas aviso e botão fechar
    ft.innerHTML = `
      <div style="text-align:center;padding:10px;background:#d1fae5;border-radius:12px;
                  color:#065f46;font-size:13px;font-weight:800;">
        ✅ Card já conferido
      </div>
      <button onclick="closeModal('modal-s2')"
        style="padding:12px;border-radius:12px;border:2px solid #e2e8f0;background:#f9fafb;
               font-family:inherit;font-size:13px;font-weight:700;cursor:pointer;color:#6b7280;">
        Fechar
      </button>`;
  } else {
    ft.innerHTML = `
      <div style="text-align:center;padding:6px 10px;background:#dbeafe;border-radius:10px;
                  color:#1d4ed8;font-size:11px;font-weight:700;margin-bottom:2px;">
        👁️ Modo Conferência — confira o resultado
      </div>
      <button onclick="_liderFinalizarCard('${ne}','${tarefaId}')"
        style="padding:13px;border-radius:12px;border:none;
               background:linear-gradient(135deg,#16a34a,#15803d);color:#fff;
               font-family:inherit;font-size:13px;font-weight:800;cursor:pointer;">
        ✅ Finalizar Conferência
      </button>
      <button onclick="_liderInfIncorreta('${ne}','${tarefaId}')"
        style="padding:11px;border-radius:12px;border:2px solid #f97316;background:#fff7ed;
               color:#c2410c;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer;">
        ⚠️ Informação Incorreta
      </button>
      <button onclick="closeModal('modal-s2')"
        style="padding:10px;border-radius:12px;border:2px solid #e2e8f0;background:#f9fafb;
               font-family:inherit;font-size:12px;font-weight:700;cursor:pointer;color:#6b7280;">
        Fechar sem conferir
      </button>`;
  }
  modal.querySelector('.modal-box').appendChild(ft);
}

function selectStatus(status) {
  _s2Status=status;
  document.querySelectorAll('.sbtn').forEach(b=>b.classList.remove('active'));
  const ab=document.querySelector(`.sbtn[data-status="${status}"]`);
  if (ab) ab.classList.add('active');

  const qpw = document.getElementById('qty-prod-wrap');
  const mw  = document.getElementById('motivos-wrap');

  if (qpw) qpw.classList.toggle('hidden', status !== 'parcial');

  const precisaMotivo = (status === 'nao_finalizado' || status === 'parcial');
  if (mw) mw.classList.toggle('hidden', !precisaMotivo);

  _s2Motivo = null;
  document.querySelectorAll('.motivo-btn').forEach(b=>b.classList.remove('active'));
  const mc = document.getElementById('motivo-custom');
  if (mc) { mc.classList.add('hidden'); mc.value=''; }

  if (status === 'total') {
    setTimeout(() => confirmS2(), 150);
  }
}

function selectMotivo(motivo) {
  _s2Motivo=motivo;
  document.querySelectorAll('.motivo-btn').forEach(b=>{
    const oc=b.getAttribute('onclick')||'';
    b.classList.toggle('active', oc.includes("'"+motivo+"'") || oc.includes('"'+motivo+'"'));
  });
  const mc=document.getElementById('motivo-custom');
  if (mc) {
    const isOthers=(motivo==='Outros');
    mc.classList.toggle('hidden',!isOthers);
    if (!isOthers) mc.value='';
    if (isOthers) mc.focus();
  }
}

async function confirmS2() {
  if (!_s2Status) { showToast('⚠️ Selecione um status!'); return; }
  const t=S.tarefas.find(x=>x.id===_s2Id);
  const ck=isChecklist(t);
  let prod=1;

  if ((_s2Status === 'nao_finalizado' || _s2Status === 'parcial') && !_s2Motivo) {
    shakeEl('motivos-wrap'); showToast('⚠️ Selecione um motivo!'); return;
  }
  if (_s2Motivo === 'Outros') {
    const inp=document.getElementById('motivo-custom');
    const mv=inp?inp.value.trim():'';
    if (!mv) { shakeEl('motivo-custom'); showToast('⚠️ Descreva o motivo!'); return; }
    _s2Motivo=mv;
  }

  if (_s2Status==='total')          prod=ck?1:(S.s1[_s2Id]||{}).programada||t.quantidade_padrao||0;
  if (_s2Status==='nao_finalizado') prod=0;
  if (_s2Status==='parcial') {
    const qv=document.getElementById('modal-s2-prod');
    prod=qv?Math.max(0,parseInt(qv.textContent)||0):0;
  }

  const existingRegId = (S.s2[_s2Id]||{}).reg_id || null;
  S.s2[_s2Id]={produzida:prod,status:_s2Status,motivo:_s2Motivo,reg_id:existingRegId};
  closeModal('modal-s2');
  renderStep2();

  const dt=S.dataTrabalho||today();
  const d1=S.s1[_s2Id]||{};
  const payload={
    data:dt, turno:S.turno, dia_semana:S.dia,
    colaborador_nome:S.colaborador, colaborador_card:S.colaborador,
    tarefa_id:t?t.id:'', item:t?t.item:'',
    quantidade_padrao:t?t.quantidade_padrao:0,
    quantidade_programada:d1.programada!==undefined?d1.programada:(t?t.quantidade_padrao:0),
    quantidade_produzida:prod,
    status:_s2Status, motivo:_s2Motivo,
    sessao_id:S.sessaoId,
    hora_registro:new Date().toLocaleTimeString('pt-BR'),
    is_checklist:ck?1:0,
  };
  const isAtend=ATEND_COLABS.includes(S.colaborador.toUpperCase());
  const regExist=isAtend?_atendRegIds[_s2Id]:(existingRegId||null);
  if (regExist) {
    _fbPatch('registros',regExist,{
      quantidade_produzida:prod,status:_s2Status,motivo:_s2Motivo,
      hora_registro:new Date().toLocaleTimeString('pt-BR'),
    }).catch(console.error);
  } else {
    _fbPost('registros',payload).then(res=>{
      if (res?.id&&_s2Id) {
        S.s2[_s2Id].reg_id=res.id;
        if (isAtend) _atendRegIds[_s2Id]=res.id;
      }
    }).catch(console.error);
  }
}

/* ══ FINALIZAR TURNO ══════════════════════════════════════ */
function openFinishModal() {
  const concludeBtn = document.getElementById('btn-conclude');
  if (concludeBtn) concludeBtn.classList.add('hidden');

  const total  =S.tarefas.length;
  const totais =Object.values(S.s2).filter(d=>d.status==='total').length;
  const nao    =Object.values(S.s2).filter(d=>d.status==='nao_finalizado').length;
  document.getElementById('finish-summary').innerHTML=`
    <div class="finish-row"><span>📋 Total de tarefas</span><span class="finish-num">${total}</span></div>
    <div class="finish-row"><span>✅ Finalizadas 100%</span><span class="finish-num" style="color:#16a34a">${totais}</span></div>
    <div class="finish-row"><span>❌ Não executadas</span><span class="finish-num" style="color:#dc2626">${nao}</span></div>`;
  document.getElementById('modal-finish').classList.remove('hidden');
}

async function finalizarTurno() {
  const total =S.tarefas.length;
  const totais=Object.values(S.s2).filter(d=>d.status==='total').length;
  const obs   = '';
  const completo=totais===total;
  const dt=S.dataTrabalho||today();
  showLoading(true);
  try {
    const todasSessoes=await _fbGetAll('sessoes');
    const sessE1=todasSessoes.filter(s=>
      s.colaborador_card===S.colaborador&&s.data===dt&&s.turno===S.turno&&
      s.dia_semana===S.dia&&s.status_geral==='etapa1_ok'
    );
    await Promise.all(sessE1.map(s=>_fbDelete('sessoes',s.id)));

    await _fbPost('sessoes',{
      data:dt, turno:S.turno, dia_semana:S.dia,
      colaborador_card:S.colaborador, colaborador_nome:S.colaborador,
      hora_fim:new Date().toLocaleTimeString('pt-BR'),
      status_geral:completo?'completo':'parcial',
      observacao:obs, total_tarefas:total, tarefas_concluidas:totais,
    });
    const pendencias=S.tarefas.filter(t=>{ const d2=S.s2[t.id]; return !d2||d2.status!=='total'; });
    for (const t of pendencias) {
      const d2=S.s2[t.id]||{};
      await _fbPost('pendencias',{
        data:dt, turno:S.turno, dia_semana:S.dia, colaborador:S.colaborador,
        item:t.item, categoria:t.categoria||'',
        quantidade_programada:(S.s1[t.id]||{}).programada||t.quantidade_padrao||0,
        quantidade_produzida:d2.produzida!==undefined?d2.produzida:0,
        status:d2.status||'nao_finalizado', motivo:d2.motivo||'',
        vistoriado:0, sessao_id:S.sessaoId,
      });
    }
  } catch(e) { console.error(e); }
  finally { showLoading(false); }

  closeModal('modal-finish');
  if (!completo) _tocarAlertaPendencias();

  S.s1={}; S.s2={}; S.producaoIniciada=false;
  _cache.sessoes=null; _cache._registros=null;
  _checkPendenciasNotif();
  _irParaDept();
}

function _autoPrintPendencias(tarefas,s1,s2,col,turno,dia) {
  const dObj=DIAS_LIST.find(d=>d.key===dia);
  const pend=tarefas.filter(t=>{ const d2=s2[t.id]; return !d2||d2.status!=='total'; });
  if (!pend.length) return;
  const sl2={parcial:'⚠️ Parcial',nao_finalizado:'❌ Não feito','':'⏳'};
  const linhas=pend.map(t=>{
    const d2=s2[t.id]||{};
    const prog=(s1[t.id]||{}).programada!==undefined?(s1[t.id]||{}).programada:t.quantidade_padrao||0;
    const feito=d2.produzida!==undefined?d2.produzida:0;
    const rest=Math.max(0,(prog||0)-feito);
    const ck=isChecklist(t);
    return `<tr>
      <td style="font-size:11px;color:#555">${t.categoria||''}</td>
      <td><strong>${t.item}</strong></td>
      <td>${ck?'—':fmt(prog)+' '+(t.unidade||'')}</td>
      <td>${ck?'—':fmt(feito)+' '+(t.unidade||'')}</td>
      <td style="color:#c0392b;font-weight:900">${ck?'—':fmt(rest)+' '+(t.unidade||'')}</td>
      <td>${sl2[d2.status||'']}</td>
      <td style="font-size:11px">${d2.motivo||'—'}</td>
    </tr>`;
  }).join('');
  const conteudo=`
    <h1 style="font-size:18px;margin:0 0 4px;font-family:Arial,sans-serif">⚠️ Pendências — ${col}</h1>
    <p style="font-size:12px;color:#555;margin:0 0 16px;font-family:Arial,sans-serif">
      Turno: ${turno==='dia'?'☀️ Dia':'🌙 Noite'} &nbsp;·&nbsp; ${dObj?dObj.label:dia} &nbsp;·&nbsp; ${today()}
    </p>
    <table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;font-size:12px">
      <thead><tr>
        <th style="background:#f5f5f5;padding:6px 8px;border:1px solid #ccc">Categoria</th>
        <th style="background:#f5f5f5;padding:6px 8px;border:1px solid #ccc">Item</th>
        <th style="background:#f5f5f5;padding:6px 8px;border:1px solid #ccc">Programado</th>
        <th style="background:#f5f5f5;padding:6px 8px;border:1px solid #ccc">Produzido</th>
        <th style="background:#fee2e2;padding:6px 8px;border:1px solid #ccc;color:#c0392b">Restante</th>
        <th style="background:#f5f5f5;padding:6px 8px;border:1px solid #ccc">Status</th>
        <th style="background:#f5f5f5;padding:6px 8px;border:1px solid #ccc">Motivo</th>
      </tr></thead>
      <tbody>${linhas}</tbody>
    </table>`;
  _abrirPreviewImpressao(conteudo);
}

function printColaborador() {
  const dObj=DIAS_LIST.find(d=>d.key===S.dia);
  const TD='border:1.5px solid #aaa;padding:7px 8px;vertical-align:middle;';
  const TDC=TD+'text-align:center;';
  const linhas=S.tarefas.map((t,i)=>{
    const d1=S.s1[t.id]||{}; const ck=isChecklist(t);
    const media=fmt(t.quantidade_padrao||0)+' '+(t.unidade||'');
    const estoque=ck?'—':fmt(d1.estoque!==undefined?d1.estoque:0)+' '+(t.unidade||'');
    const prog=ck?'Checklist':fmt(d1.programada!==undefined?d1.programada:(t.quantidade_padrao||0))+' '+(t.unidade||'');
    const bg=i%2===0?'#ffffff':'#f0f4ff';
    return `<tr style="background:${bg}">
      <td style="${TD}font-size:11px;color:#555">${t.categoria||''}</td>
      <td style="${TD}"><strong style="font-size:12px">${t.item}</strong></td>
      <td style="${TDC}font-weight:700;font-size:12px;color:#1a1d2e">${ck?'—':media}</td>
      <td style="${TDC}font-weight:700;font-size:12px">${estoque}</td>
      <td style="${TDC}font-weight:900;font-size:13px;color:#e8590c">${prog}</td>
      <td style="${TDC}width:50px">&nbsp;</td>
    </tr>`;
  }).join('');
  const TH='background:#1a1d2e;color:#fff;font-size:10px;text-transform:uppercase;letter-spacing:.4px;padding:8px;border:1.5px solid #333;text-align:center;';
  const conteudo=`
    <h1 style="font-size:18px;margin:0 0 4px;font-family:Arial,sans-serif">📋 ${S.colaborador}</h1>
    <p style="font-size:12px;color:#555;margin:0 0 12px;font-family:Arial,sans-serif">
      Turno: ${S.turno==='dia'?'☀️ Dia':'🌙 Noite'} &nbsp;·&nbsp;
      ${dObj?dObj.label:S.dia} &nbsp;·&nbsp; ${today()}
    </p>
    <table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;border:1.5px solid #aaa;">
      <thead><tr>
        <th style="${TH}text-align:left">Categoria</th>
        <th style="${TH}text-align:left">Item</th>
        <th style="${TH}">📊 Média</th>
        <th style="${TH}">📦 Estoque</th>
        <th style="${TH}color:#f97316">🎯 A Produzir</th>
        <th style="${TH}">✓ Verificar</th>
      </tr></thead>
      <tbody>${linhas}</tbody>
    </table>`;
  _abrirPreviewImpressao(conteudo);
}

/* ══ RESULTADOS / PENDÊNCIAS DO DIA ═════════════════════ */
function abrirResultados() {
  const dataRef=S.dataTrabalho||today();
  const dtRef=new Date(dataRef+'T12:00:00');
  const diaAtual=DIA_JS_MAP[dtRef.getDay()];
  const turnoAtual=S.turno||'dia';
  const inp=document.getElementById('res-data'); if (inp) inp.value=dataRef;
  const resTurnoEl=document.getElementById('res-turno'); if (resTurnoEl) resTurnoEl.value=turnoAtual;
  const rdBtn=document.getElementById('resbtn-dia'); if (rdBtn) rdBtn.classList.toggle('active',turnoAtual==='dia');
  const rnBtn=document.getElementById('resbtn-noite'); if (rnBtn) rnBtn.classList.toggle('active',turnoAtual==='noite');
  const diaEl=document.getElementById('res-dia'); if (diaEl) diaEl.value=diaAtual;
  _resAtualizaDisplayData(dataRef, diaAtual);
  showScreen('screen-resultados');
  loadResultados();
}

function _resAtualizaDisplayData(dataVal, diaKey) {
  const el = document.getElementById('res-data-texto');
  if (!el) return;
  const NOMES = {segunda:'Segunda-feira',terca:'Terça-feira',quarta:'Quarta-feira',
                 quinta:'Quinta-feira',sexta:'Sexta-feira',sabado:'Sábado',domingo:'Domingo'};
  const hj = today();
  if (dataVal === hj) {
    el.textContent = `Hoje, ${NOMES[diaKey]||diaKey}`;
  } else {
    const [y,m,d] = dataVal.split('-');
    el.textContent = `${d}/${m}/${y} · ${NOMES[diaKey]||diaKey}`;
  }
}

function onResDataChange() {
  const dataVal = (document.getElementById('res-data')||{}).value;
  if (!dataVal) return;
  const [y,m,d] = dataVal.split('-').map(Number);
  const jsDay  = new Date(y, m-1, d).getDay();
  const diaKey = DIA_JS_MAP[jsDay];
  const diaEl  = document.getElementById('res-dia');
  if (diaEl) diaEl.value = diaKey;
  _resAtualizaDisplayData(dataVal, diaKey);
  loadResultados();
}

function setResTurno(turno) {
  const el=document.getElementById('res-turno'); if (el) el.value=turno;
  const rd=document.getElementById('resbtn-dia');   if (rd) rd.classList.toggle('active',turno==='dia');
  const rn=document.getElementById('resbtn-noite'); if (rn) rn.classList.toggle('active',turno==='noite');
  loadResultados();
}

function setResDia(dia) {
  const el=document.getElementById('res-dia'); if (el) el.value=dia;
  document.querySelectorAll('.tar-dia-btn[data-rdia]').forEach(b=>b.classList.toggle('active',b.dataset.rdia===dia));
  loadResultados();
}

async function loadResultados() {
  const container=document.getElementById('res-lista');
  const summBar  =document.getElementById('res-summary-bar');
  if (!container) return;
  container.innerHTML='<div style="padding:30px;text-align:center;color:#888"><div style="font-size:28px;margin-bottom:8px">⏳</div>Carregando...</div>';
  if (summBar) summBar.innerHTML='';
  const turno=(document.getElementById('res-turno')||{}).value||'dia';
  const data =((document.getElementById('res-data')||{}).value)||today();
  const [_ry,_rm,_rd]=data.split('-').map(Number);
  const dia=DIA_JS_MAP[new Date(_ry,_rm-1,_rd).getDay()];
  const diaEl=document.getElementById('res-dia'); if(diaEl) diaEl.value=dia;
  try {
    const [pendencias,sessoes]=await Promise.all([_fbGetAll('pendencias'),_fbGetAll('sessoes')]);
    let pends=pendencias.filter(p=>p.data===data&&p.turno===turno&&!(p.vistoriado==1));
    if(pends.length===0){
      pends=pendencias.filter(p=>p.data===data&&!(p.vistoriado==1));
    }
    const sess=sessoes.filter(s=>s.data===data);
    const pendAtivos=pends.filter(p=>!(p.vistoriado==1));
    const collabNomes=[...new Set([...sess.map(s=>s.colaborador_nome).filter(Boolean),...pends.map(p=>p.colaborador).filter(Boolean)])];
    const collabSemPend=collabNomes.filter(n=>!pends.find(p=>p.colaborador===n)).length;
    if (summBar) summBar.innerHTML=`
      <div class="res-sum-card res-sum-blue"><span class="res-sum-val">${collabNomes.length}</span><span class="res-sum-lbl">Colaboradores</span></div>
      <div class="res-sum-card res-sum-green"><span class="res-sum-val">${collabSemPend}</span><span class="res-sum-lbl">100% OK</span></div>
      <div class="res-sum-card res-sum-orange"><span class="res-sum-val">${pends.length}</span><span class="res-sum-lbl">Pendências</span></div>
      <div class="res-sum-card res-sum-red"><span class="res-sum-val">${pendAtivos.length}</span><span class="res-sum-lbl">Aguard. Ciência</span></div>`;
    if (!pends.length) {
      container.innerHTML=sess.length
        ?'<div style="padding:40px;text-align:center;color:#16a34a;font-size:16px;font-weight:700"><div style="font-size:48px;margin-bottom:12px">✅</div>Tudo finalizado 100%!</div>'
        :'<div style="padding:40px;text-align:center;color:#888;font-size:14px"><div style="font-size:40px;margin-bottom:12px">📭</div>Nenhum dado para os filtros selecionados.</div>';
      return;
    }
    const porColab={};
    pends.forEach(p=>{ const n=p.colaborador||'?'; if (!porColab[n]) porColab[n]=[]; porColab[n].push(p); });
    let html='<div style="padding:12px 16px">';
    Object.keys(porColab).sort().forEach(nome=>{
      const itens   =porColab[nome];
      const nParcial=itens.filter(i=>i.status==='parcial').length;
      const nNao    =itens.filter(i=>i.status==='nao_finalizado').length;
      const nCiente =itens.filter(i=>i.vistoriado==1).length;
      const todoCiente=nCiente===itens.length;
      const slug=_resSlug(nome);
      html+=`
      <div class="res-collab-card${todoCiente?' res-all-done':''}" id="rcc-${slug}">
        <div class="res-card-header" onclick="_resToggle('${slug}')">
          <div class="res-card-avatar">${COLLAB_EMOJI[nome]||_resEmoji(nome)}</div>
          <div class="res-card-info">
            <div class="res-card-name">${nome}</div>
            <div class="res-card-meta">${itens.length} item(s) pendente(s)${todoCiente?' — ✅ Todos cientes':''}</div>
          </div>
          <div class="res-pills">
            ${nParcial>0?`<span class="res-pill res-pill-orange">⚠️ ${nParcial}</span>`:''}
            ${nNao>0?`<span class="res-pill res-pill-red">❌ ${nNao}</span>`:''}
            ${nCiente>0&&!todoCiente?`<span class="res-pill res-pill-green">✅ ${nCiente}</span>`:''}
          </div>
          <i class="fas fa-chevron-down res-chevron" id="rch-${slug}"></i>
        </div>
        <div class="res-tasks-list hidden" id="rtl-${slug}">
          ${_resRenderTasks(itens,slug)}
        </div>
      </div>`;
    });
    html+='</div>';
    container.innerHTML=html;
  } catch(e) {
    console.error(e);
    container.innerHTML=`<div style="padding:20px;color:#dc3545">❌ Erro ao carregar: ${e.message}</div>`;
  }
}

function _resRenderTasks(itens,slug) {
  return itens.map(item=>{
    const isVist  =item.vistoriado==1;
    const isParcial=item.status==='parcial';
    const qProg=item.quantidade_programada||0;
    const qFeit=item.quantidade_produzida||0;
    const qRest=Math.max(0,qProg-qFeit);
    const icon   =isParcial?'⚠️':'❌';
    const stColor=isParcial?'#f97316':'#ef4444';
    const nomeColab=(item.colaborador||'').replace(/'/g,"\\'");
    const itemNome =(item.item||'').replace(/'/g,"\\'");
    const catNome  =(item.categoria||'').replace(/'/g,"\\'");
    const motNome  =(item.motivo||'').replace(/'/g,"\\'");
    return `<div class="res-task-item" id="rti-${item.id}">
      <div class="res-task-icon">${icon}</div>
      <div class="res-task-body">
        <div class="res-task-name">${item.item||'—'}</div>
        <div class="res-task-detail">${item.categoria?`<strong>${item.categoria}</strong> · `:''}
          <span style="color:${stColor}">${isParcial?'Parcial':'Não feito'}</span>${item.motivo?` · 💬 ${item.motivo}`:''}</div>
        <div class="res-task-qtds">
          ${qProg>0?`<span class="res-qtd-badge res-qtd-prog">📋 ${qProg}</span>`:''}
          ${qFeit>0?`<span class="res-qtd-badge res-qtd-feito">✅ ${qFeit}</span>`:''}
          ${qRest>0?`<span class="res-qtd-badge res-qtd-rest">⬇️ ${qRest}</span>`:''}
        </div>
      </div>
      <div class="res-task-actions" style="display:flex;flex-direction:column;gap:5px;align-items:flex-end">
        ${isVist
          ?`<span class="res-btn-done"><i class="fas fa-check"></i> Ciente</span>`
          :`<button class="res-btn-ciente" onclick="_resCiente('${item.id}','${slug}')"><i class="fas fa-check"></i> Ciente</button>`
        }
        <button class="res-btn-transferir" onclick="_resAbrirTransferir('${item.id}','${itemNome}','${nomeColab}','${catNome}','${motNome}',${qProg},${qFeit},'${item.tarefa_id||''}')">
          <i class="fas fa-exchange-alt"></i> Transferir
        </button>
      </div>
    </div>`;
  }).join('');
}

/* ══ TRANSFERIR TAREFA ═══════════════════════════════════ */
let _trCtx={};

function _resAbrirTransferir(pendId,itemNome,origem,cat,motivo,qProg,qFeit,tarefaId) {
  const qRest=Math.max(0,(qProg||0)-(qFeit||0));
  const dataAtual  = (document.getElementById('res-data')||{}).value || today();
  const turnoAtual = (document.getElementById('res-turno')||{}).value || S.turno || 'dia';
  const [_y,_m,_d] = dataAtual.split('-').map(Number);
  const diaAtual   = DIA_JS_MAP[new Date(_y,_m-1,_d).getDay()];

  _trCtx={pendId,itemNome,origem,cat,motivo,qProg,qFeit,tarefaId,qRest,
    turnoEscolhido:turnoAtual, diaEscolhido:diaAtual,
    dataEscolhida:dataAtual,  destinoEscolhido:''};

  let ov=document.getElementById('_modal_transferir_embutido');
  if (!ov) {
    ov=document.createElement('div'); ov.id='_modal_transferir_embutido';
    ov.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px';
    document.body.appendChild(ov);
  }
  _trRenderModal(ov);
  ov.style.display='flex';
}

function _trSetTurno(t) {
  _trCtx.turnoEscolhido=t;
  const rb=document.querySelectorAll('._tr_turno_btn');
  rb.forEach(b=>{ b.style.background=b.dataset.t===t?(t==='dia'?'#FDE68A':'#1E2235'):'#f3f4f6';
    b.style.color=b.dataset.t===t?(t==='dia'?'#111':'#fff'):'#374151';
    b.style.borderColor=b.dataset.t===t?(t==='dia'?'#EAB308':'#4f46e5'):'#e2e6f0'; });
}

function _trOnDataChange() {
  const inp=document.getElementById('_tr_data_input');
  if (!inp||!inp.value) return;
  const [y,m,d]=inp.value.split('-').map(Number);
  _trCtx.dataEscolhida=inp.value;
  _trCtx.diaEscolhido=DIA_JS_MAP[new Date(y,m-1,d).getDay()];
  const lbl=document.getElementById('_tr_dia_label');
  if (lbl) {
    const dObj=DIAS_LIST.find(x=>x.key===_trCtx.diaEscolhido)||{short:_trCtx.diaEscolhido};
    lbl.textContent=`📆 ${dObj.short}`;
  }
}

function _trRenderModal(ov) {
  const {itemNome,origem,cat,qProg,qFeit,qRest,turnoEscolhido,diaEscolhido,dataEscolhida}=_trCtx;
  const diaObj=DIAS_LIST.find(d=>d.key===diaEscolhido)||{short:diaEscolhido};

  const todosColabs=Object.keys(COLLAB_EMOJI).filter(n=>n&&n!==origem).sort();
  const btns=todosColabs.map(n=>`
    <button class="_tr_dest_btn" data-nome="${n.replace(/"/g,'&quot;')}"
      onclick="_trSelecionarDestino(this)"
      style="padding:10px 12px;border-radius:12px;border:2px solid #e2e6f0;background:#fff;
             font-family:inherit;font-size:13px;font-weight:800;cursor:pointer;color:#374151;
             display:flex;align-items:center;gap:8px;text-align:left;transition:all .15s;width:100%"
      onmouseover="this.style.borderColor='#e8590c';this.style.background='#fff7ed'"
      onmouseout="this.style.borderColor='#e2e6f0';this.style.background='#fff'">
      <span style="font-size:18px">${COLLAB_EMOJI[n]||'👤'}</span>
      <span>${n}</span>
    </button>`).join('');

  ov.innerHTML=`<div style="background:#fff;border-radius:20px;padding:20px;width:100%;max-width:400px;
    box-shadow:0 20px 60px rgba(0,0,0,.4);font-family:'Nunito','Segoe UI',sans-serif;max-height:92vh;overflow-y:auto">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
      <div style="font-size:26px">🔄</div>
      <div>
        <div style="font-size:15px;font-weight:900">Transferir Tarefa</div>
        <div style="font-size:11px;color:#888">De: <strong>${origem}</strong></div>
      </div>
      <button onclick="document.getElementById('_modal_transferir_embutido').style.display='none'"
        style="margin-left:auto;background:none;border:none;font-size:22px;cursor:pointer;color:#aaa;line-height:1">✕</button>
    </div>
    <div style="background:#fff7ed;border:2px solid #fed7aa;border-radius:12px;padding:10px;margin-bottom:14px;font-size:13px">
      <strong style="font-size:14px">${itemNome}</strong>
      ${cat?`<div style="color:#888;font-size:11px;margin-top:3px">🏷️ ${cat}</div>`:''}
      ${qProg>0?`<div style="display:flex;gap:6px;margin-top:6px;flex-wrap:wrap">
        <span style="background:#dbeafe;color:#1d4ed8;padding:2px 8px;border-radius:8px;font-size:11px;font-weight:800">📋 ${qProg}</span>
        ${qFeit>0?`<span style="background:#dcfce7;color:#16a34a;padding:2px 8px;border-radius:8px;font-size:11px;font-weight:800">✅ ${qFeit}</span>`:''}
        ${qRest>0?`<span style="background:#fee2e2;color:#dc2626;padding:2px 8px;border-radius:8px;font-size:11px;font-weight:800">⬇️ falta ${qRest}</span>`:''}
      </div>`:''}
    </div>
    <div style="margin-bottom:14px">
      <label style="font-size:11px;font-weight:800;color:#888;text-transform:uppercase;letter-spacing:.5px;display:block;margin-bottom:6px">📅 Data para o destino</label>
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
        <input type="date" id="_tr_data_input" value="${dataEscolhida}"
          onchange="_trOnDataChange()"
          style="border:2px solid #e2e6f0;border-radius:10px;padding:9px 12px;font-family:inherit;
                 font-size:14px;font-weight:800;outline:none;background:#f9fafb;color:#111;cursor:pointer;
                 transition:border-color .2s;flex:1;min-width:140px"/>
        <span id="_tr_dia_label" style="font-size:13px;font-weight:800;color:#4b5563;background:#f3f4f6;
              padding:7px 12px;border-radius:10px;white-space:nowrap">📆 ${diaObj.short}</span>
      </div>
    </div>
    <div style="margin-bottom:14px">
      <label style="font-size:11px;font-weight:800;color:#888;text-transform:uppercase;letter-spacing:.5px;display:block;margin-bottom:6px">⏰ Turno</label>
      <div style="display:flex;gap:8px">
        <button class="_tr_turno_btn" data-t="dia" onclick="_trSetTurno('dia')"
          style="flex:1;padding:9px;border-radius:12px;border:2px solid ${turnoEscolhido==='dia'?'#EAB308':'#e2e6f0'};
                 background:${turnoEscolhido==='dia'?'#FDE68A':'#f3f4f6'};color:${turnoEscolhido==='dia'?'#111':'#374151'};
                 font-family:inherit;font-size:13px;font-weight:800;cursor:pointer">☀️ Dia</button>
        <button class="_tr_turno_btn" data-t="noite" onclick="_trSetTurno('noite')"
          style="flex:1;padding:9px;border-radius:12px;border:2px solid ${turnoEscolhido==='noite'?'#4f46e5':'#e2e6f0'};
                 background:${turnoEscolhido==='noite'?'#1E2235':'#f3f4f6'};color:${turnoEscolhido==='noite'?'#fff':'#374151'};
                 font-family:inherit;font-size:13px;font-weight:800;cursor:pointer">🌙 Noite</button>
      </div>
    </div>
    <label style="font-size:11px;font-weight:800;color:#374151;display:block;margin-bottom:4px">📝 Observação (opcional)</label>
    <input type="text" id="_tr_obs" placeholder="Motivo da transferência..."
      style="width:100%;padding:9px 12px;border:2px solid #e2e6f0;border-radius:10px;
             font-family:inherit;font-size:13px;margin-bottom:16px;outline:none;box-sizing:border-box"/>
    <div style="font-size:11px;font-weight:900;color:#6b7280;text-transform:uppercase;margin-bottom:8px;letter-spacing:.5px">
      👤 Transferir para</div>
    <div style="display:flex;flex-direction:column;gap:6px">
      ${btns}
    </div>
  </div>`;
}

function _trSelecionarDestino(btn) {
  const destino=btn.dataset.nome||btn.textContent.trim();
  _trCtx.destinoEscolhido=destino;
  const inpData=document.getElementById('_tr_data_input');
  if (inpData&&inpData.value) {
    _trCtx.dataEscolhida=inpData.value;
    const [y,m,d]=inpData.value.split('-').map(Number);
    _trCtx.diaEscolhido=DIA_JS_MAP[new Date(y,m-1,d).getDay()];
  }
  const obs=(document.getElementById('_tr_obs')||{}).value?.trim()||'';
  _resConfirmarTransferir(_trCtx.pendId,_trCtx.itemNome,_trCtx.origem,_trCtx.tarefaId,_trCtx.qProg,_trCtx.qFeit,obs);
}

async function _resConfirmarTransferir(pendId,itemNome,origem,tarefaId,qProg,qFeit,obsParam) {
  const destino=_trCtx.destinoEscolhido||'';
  const obs    =obsParam||(document.getElementById('_tr_obs')||{}).value?.trim()||'';
  if (!destino) { showToast('⚠️ Selecione o colaborador destino!'); return; }

  const turno=_trCtx.turnoEscolhido||S.turno||'dia';
  const dia  =_trCtx.diaEscolhido  ||S.dia  ||'segunda';
  const data =_trCtx.dataEscolhida ||today();
  const qRest=Math.max(0,(qProg||0)-(qFeit||0));
  const qtdFinal=qRest>0?qRest:(qProg||0);

  const btns=[...document.querySelectorAll('#_modal_transferir_embutido button')];
  btns.forEach(b=>{b.disabled=true;});

  try {
    await _fbPatch('pendencias',pendId,{
      vistoriado:1,
      transferido_para:destino,
      obs_transferencia:obs||`Transferido para ${destino}`,
      transferido_em:data,
    });

    const tarefasExist = await _fbGetAll('tarefas');
    const itemLower = (itemNome||'').toLowerCase().trim();
    const jaExiste = tarefasExist.some(t =>
      t.colaborador===destino &&
      t.turno===turno &&
      (t.data_especifica===data || (!t.data_especifica && t.dia_semana===dia)) &&
      (t.item||'').toLowerCase().trim()===itemLower
    );
    if (!jaExiste) {
      const novaTarefa = await _fbPost('tarefas',{
        turno,
        dia_semana: dia,
        data_especifica: data,
        colaborador: destino,
        item: itemNome,
        categoria: _trCtx.cat||'',
        quantidade_padrao: qtdFinal||1,
        unidade: 'un',
        ordem: 99,
        ativa: 1,
        transferida_de: origem,
        transferida_em: data,
        obs: obs||'',
      });
    }

    const ov=document.getElementById('_modal_transferir_embutido');
    if (ov) ov.style.display='none';

    showToast(`✅ Transferido para ${destino}! Tarefa adicionada ao card de ${destino}.`);

    const el=document.getElementById(`rti-${pendId}`);
    if (el) {
      el.style.transition='opacity 0.35s, transform 0.35s, max-height 0.4s, padding 0.4s';
      el.style.opacity='0';
      el.style.transform='translateX(50px)';
      el.style.maxHeight=el.offsetHeight+'px';
      el.style.overflow='hidden';
      void el.offsetHeight;
      el.style.maxHeight='0';
      el.style.padding='0';
      el.style.marginTop='0';
      setTimeout(()=>{
        el.remove();
        _resVerificaVazio(_resSlug(origem));
        _resAtualizaSummary();
      },420);
    }
    _invalidarCache();
  } catch(e) {
    btns.forEach(b=>{b.disabled=false;});
    showToast('❌ Erro ao transferir: '+e.message);
  }
}

function _resToggle(slug) {
  const list=document.getElementById(`rtl-${slug}`);
  const arr =document.getElementById(`rch-${slug}`);
  if (!list) return;
  const isOpen=!list.classList.contains('hidden');
  list.classList.toggle('hidden',isOpen);
  if (arr) arr.style.transform=isOpen?'':'rotate(180deg)';
}

async function _resCiente(id,slug) {
  try {
    await _fbPatch('pendencias',id,{vistoriado:1});
    const el=document.getElementById(`rti-${id}`);
    if (el) {
      el.style.transition='opacity 0.3s, max-height 0.3s, padding 0.3s';
      el.style.opacity='0';
      el.style.maxHeight='0';
      el.style.overflow='hidden';
      el.style.padding='0';
      setTimeout(()=>{
        el.remove();
        _resVerificaVazio(slug);
        _resAtualizaSummary();
      },320);
    }
    showToast('✅ Ciente registrado!');
  } catch(e) { showToast('❌ Erro ao registrar ciência'); }
}

function _resVerificaVazio(slug) {
  const tl=document.getElementById(`rtl-${slug}`);
  const cb=document.getElementById(`rcc-${slug}`);
  if (!tl||!cb) return;
  const restantes = tl.querySelectorAll('.res-task-item').length;
  if (restantes === 0) {
    cb.style.transition = 'opacity 0.4s, transform 0.4s, max-height 0.4s';
    cb.style.opacity    = '0';
    cb.style.transform  = 'scale(0.95)';
    cb.style.overflow   = 'hidden';
    cb.style.maxHeight  = cb.offsetHeight + 'px';
    void cb.offsetHeight;
    cb.style.maxHeight  = '0';
    setTimeout(() => {
      cb.remove();
      _resAtualizaSummary();
    }, 420);
  }
}

function _resAtualizaSummary() {
  const cards   = document.querySelectorAll('.res-collab-card').length;
  const itens   = document.querySelectorAll('.res-task-item').length;
  const summBar = document.getElementById('res-summary-bar');
  if (!summBar) return;
  const scOrange = summBar.querySelector('.res-sum-orange .res-sum-val');
  const scBlue   = summBar.querySelector('.res-sum-blue .res-sum-val');
  const scRed    = summBar.querySelector('.res-sum-red .res-sum-val');
  if (scOrange) scOrange.textContent = itens;
  if (scBlue)   scBlue.textContent   = cards;
  if (scRed)    scRed.textContent    = itens;
  if (cards === 0) {
    const container = document.getElementById('res-lista');
    if (container) {
      container.innerHTML = '<div style="padding:40px;text-align:center;color:#16a34a;font-size:16px;font-weight:700"><div style="font-size:48px;margin-bottom:12px">✅</div>Tudo ciente! Nenhuma pendência ativa.</div>';
    }
  }
}

function _resSlug(s)  { return (s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,'-'); }
function _resEmoji(n) { const e=['👨‍🍳','👩‍🍳','🧑‍🍳','😎','🙂','😊','🤩','👌','💪','🍔','⭐','🌟']; let s=0; for(let i=0;i<n.length;i++) s+=n.charCodeAt(i); return e[s%e.length]; }

/* ══ PAINEL DO LÍDER ═════════════════════════════════════ */
function setDefaultDates() {
  const hoje=today();
  const dt=new Date(); dt.setDate(dt.getDate()-7);
  const ini=`${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}-${String(dt.getDate()).padStart(2,'0')}`;
  ['filter-start','filter-end','rel-start','rel-end'].forEach(id=>{
    const el=document.getElementById(id);
    if (el) { el.value=id.includes('end')?hoje:ini; _syncDateDisplay(id); }
  });
}

function _syncDateDisplay(fieldId) {
  const inp = document.getElementById(fieldId);
  const disp = document.getElementById(fieldId+'-display');
  if (!inp || !disp) return;
  if (!inp.value) { disp.textContent='Selecionar...'; return; }
  const [y,m,d] = inp.value.split('-');
  const meses=['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  disp.innerHTML = `<i class='fas fa-calendar-alt' style='color:#e8590c;margin-right:6px'></i>${d}/${meses[parseInt(m,10)-1]}/${y}`;
}

async function loadLeaderData() {
  showLoading(true);
  try {
    const ds    =(document.getElementById('filter-start')||{}).value||'';
    const de    =(document.getElementById('filter-end')||{}).value||'';
    const turno =(document.getElementById('filter-turno')||{}).value||'';
    const status=(document.getElementById('filter-status')||{}).value||'';
    const col   =(document.getElementById('filter-colaborador')||{}).value||'';
    let data=await _fbGetAll('registros');
    if (ds)     data=data.filter(r=>r.data>=ds);
    if (de)     data=data.filter(r=>r.data<=de);
    if (turno)  data=data.filter(r=>r.turno===turno);
    if (status) data=data.filter(r=>r.status===status);
    if (col)    data=data.filter(r=>r.colaborador_card===col);
    S.leaderData=data;
    renderLeaderSummary(data);
    const allData=await _fbGetAll('registros');
    populateCollabFilter(allData);
    const tab=S.currentLeaderTab;
    if (tab==='registros') renderLeaderTable(data);
    if (tab==='pendentes') renderPendentes();
    if (tab==='espelho')   renderEspelho(data);
    if (tab==='relatorio') loadRelatorio();
    if (tab==='tarefas')   loadTarefasGestao();
  } catch(e) { console.error(e); showToast('❌ Erro ao carregar dados'); }
  finally { showLoading(false); }
}

function populateCollabFilter(all) {
  const nomes=[...new Set((all||[]).map(r=>r.colaborador_card).filter(n => n && !_isColabTeste(n)))].sort((a,b)=>a.localeCompare(b,'pt-BR'));
  const sel=document.getElementById('filter-colaborador'); if (!sel) return;
  const cur=sel.value;
  sel.innerHTML='<option value="">Todos</option>'+nomes.map(n=>`<option value="${n}"${n===cur?' selected':''}>${n}</option>`).join('');
}

function renderLeaderSummary(data) {
  const total=data.length, ok=data.filter(r=>r.status==='total').length;
  const parcial=data.filter(r=>r.status==='parcial').length;
  const nao=data.filter(r=>r.status==='nao_finalizado').length;
  const taxa=total?Math.round(ok/total*100):0;
  [['s-total',total],['s-ok',ok],['s-parcial',parcial],['s-nao',nao],['s-taxa',taxa+'%']].forEach(([id,v])=>{
    const el=document.getElementById(id); if (el) el.textContent=v;
  });
}

function renderLeaderTable(data) {
  const tbody=document.getElementById('leader-tbody'); if (!tbody) return;
  if (!data||!data.length) { tbody.innerHTML='<tr><td colspan="9" class="empty-row">😕 Nenhum registro — use os filtros</td></tr>'; return; }
  const bmap={total:'<span class="badge badge-total">✅ 100%</span>',parcial:'<span class="badge badge-parcial">⚠️ Parcial</span>',nao_finalizado:'<span class="badge badge-nao">❌ Não feito</span>'};
  tbody.innerHTML=data.map(r=>{
    const dObj=DIAS_LIST.find(d=>d.key===r.dia_semana);
    return `<tr>
      <td>${r.data||'—'}</td>
      <td>${r.turno==='dia'?'☀️':'🌙'} ${r.turno||'—'}</td>
      <td>${dObj?dObj.short:(r.dia_semana||'—')}</td>
      <td><strong>${r.colaborador_card||'—'}</strong></td>
      <td>${r.item||'—'}</td>
      <td style="text-align:center">${r.quantidade_programada!==undefined?fmt(r.quantidade_programada):'—'}</td>
      <td style="text-align:center">${r.quantidade_produzida!==undefined?fmt(r.quantidade_produzida):'—'}</td>
      <td>${bmap[r.status]||'<span class="badge badge-pend">⏳</span>'}</td>
      <td style="max-width:130px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${r.motivo||''}">${r.motivo||'—'}</td>
    </tr>`;
  }).join('');
}

async function renderPendentes() {
  const container=document.getElementById('pendentes-list'); if (!container) return;
  container.innerHTML='<div style="padding:20px;text-align:center">⏳ Carregando...</div>';
  try {
    const ds =(document.getElementById('filter-start')||{}).value||'';
    const de =(document.getElementById('filter-end')||{}).value||'';
    const turno=(document.getElementById('filter-turno')||{}).value||'';
    const col=(document.getElementById('filter-colaborador')||{}).value||'';
    let data=await _fbGetAll('pendencias');
    data=data.filter(r=>!(r.vistoriado==1));
    if (ds)    data=data.filter(r=>r.data>=ds);
    if (de)    data=data.filter(r=>r.data<=de);
    if (turno) data=data.filter(r=>r.turno===turno);
    if (col)   data=data.filter(r=>r.colaborador===col);
    if (!data.length) { container.innerHTML='<div style="padding:40px;text-align:center;color:#16a34a;font-size:16px;font-weight:700">✅ Nenhuma pendência!</div>'; return; }
    const grupos={};
    data.forEach(r=>{ const k=`${r.data}||${r.colaborador}`; if (!grupos[k]) grupos[k]={data:r.data,collab:r.colaborador,turno:r.turno,items:[]}; grupos[k].items.push(r); });
    container.innerHTML=Object.values(grupos).map(g=>`
      <div class="pend-group">
        <div class="pend-group-header">
          <span>${g.turno==='dia'?'☀️':'🌙'} ${g.data} — <strong>${g.collab}</strong></span>
          <span class="pend-count">${g.items.length} pendente${g.items.length!==1?'s':''}</span>
        </div>
        ${g.items.map(r=>`
          <div class="pend-item" id="pend-${r.id}">
            <div class="pend-item-info">
              <span class="pend-item-name">${r.item}</span>
              <span class="pend-item-meta">${r.categoria||''} · ${_sl(r.status)}${r.motivo?' · '+r.motivo:''}</span>
            </div>
            <button class="pend-check-btn" onclick="checkPendente('${r.id}')" title="Vistoriado"><i class="fas fa-check"></i></button>
          </div>`).join('')}
      </div>`).join('');
  } catch(e) { container.innerHTML='<div style="padding:20px;color:#dc3545;text-align:center">❌ Erro ao carregar pendências.</div>'; }
}

function _sl(s) { const m={total:'✅ 100%',parcial:'⚠️ Parcial',nao_finalizado:'❌ Não feito','':'⏳'}; return m[s||'']||'⏳'; }

async function checkPendente(id) {
  try {
    await _fbPatch('pendencias',id,{vistoriado:1});
    const el=document.getElementById(`pend-${id}`);
    if (el) { el.style.transition='all .3s'; el.style.opacity='0'; el.style.maxHeight='0'; el.style.overflow='hidden'; el.style.padding='0'; setTimeout(()=>el.remove(),300); }
    showToast('✅ Pendência vistoriada!');
  } catch(e) { showToast('❌ Erro ao marcar'); }
}

async function zerarCobrancas() {
  if (!confirm('Zerar toda a lista de cobranças?')) return;
  showLoading(true);
  try {
    const pend=await _fbGetAll('pendencias');
    const abertas=pend.filter(r=>!(r.vistoriado==1));
    await Promise.all(abertas.map(r=>_fbPatch('pendencias',r.id,{vistoriado:1})));
    showToast('✅ Lista zerada!');
    renderPendentes();
  } catch(e) { showToast('❌ Erro'); }
  finally { showLoading(false); }
}

function renderEspelho(data) {
  const container=document.getElementById('espelho-list'); if (!container) return;
  if (!data||!data.length) { container.innerHTML='<div style="padding:40px;text-align:center;color:#888">Use os filtros e clique em Filtrar</div>'; return; }
  const byDate={};
  data.forEach(r=>{ const dk=r.data||'sem data'; if (!byDate[dk]) byDate[dk]={}; const ck=r.colaborador_card||'—'; if (!byDate[dk][ck]) byDate[dk][ck]=[]; byDate[dk][ck].push(r); });
  container.innerHTML=Object.entries(byDate).sort((a,b)=>b[0].localeCompare(a[0])).map(([dt,collabs])=>{
    const tot=Object.values(collabs).flat().length, ok=Object.values(collabs).flat().filter(r=>r.status==='total').length;
    return `<div class="espelho-date-group">
      <div class="espelho-date-header">📅 ${dt} — ${ok}/${tot} itens 100%</div>
      ${Object.entries(collabs).map(([col,rows])=>{
        const t=rows.length,o=rows.filter(r=>r.status==='total').length;
        const p=rows.filter(r=>r.status==='parcial').length,n=rows.filter(r=>r.status==='nao_finalizado').length;
        const tx=t?Math.round(o/t*100):0;
        const txC=tx===100?'#16a34a':tx>=50?'#d97706':'#dc2626';
        return `<div class="espelho-collab">
          <div class="espelho-collab-header"><strong>${COLLAB_EMOJI[col]||'👤'} ${col}</strong><span style="color:${txC};font-weight:900">${tx}%</span></div>
          <table class="espelho-table"><thead><tr><th>Item</th><th>Prog.</th><th>Prod.</th><th>Status</th><th>Motivo</th></tr></thead>
          <tbody>${rows.map(r=>{
            const bm={total:'✅',parcial:'⚠️',nao_finalizado:'❌','':'⏳'};
            return `<tr><td>${r.item||'—'}</td><td>${r.quantidade_programada!==undefined?fmt(r.quantidade_programada):'—'}</td>
              <td>${r.quantidade_produzida!==undefined?fmt(r.quantidade_produzida):'—'}</td>
              <td>${bm[r.status||'']||'⏳'}</td>
              <td style="max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.motivo||'—'}</td></tr>`;
          }).join('')}</tbody></table>
          <div class="espelho-collab-footer">✅ ${o} · ⚠️ ${p} · ❌ ${n}</div>
        </div>`;
      }).join('')}
    </div>`;
  }).join('');
}

async function loadRelatorio() {
  const container=document.getElementById('relatorio-list'); if (!container) return;
  container.innerHTML='<div style="padding:20px;text-align:center">⏳ Carregando...</div>';
  try {
    const ds =(document.getElementById('rel-start')||document.getElementById('filter-start')||{}).value||'';
    const de =(document.getElementById('rel-end')||document.getElementById('filter-end')||{}).value||'';
    const turno=(document.getElementById('rel-turno')||{}).value||'';
    const col=(document.getElementById('rel-colaborador')||{}).value||'';
    const motivo=(document.getElementById('rel-motivo')||{}).value||'';
    const status=(document.getElementById('rel-status')||{}).value||'';
    let data=await _fbGetAll('registros');
    const nomes=[...new Set(data.map(r=>r.colaborador_card).filter(Boolean))].sort();
    const selC=document.getElementById('rel-colaborador');
    if (selC) { const cur=selC.value; selC.innerHTML='<option value="">Todos</option>'+nomes.map(n=>`<option value="${n}"${n===cur?' selected':''}>${n}</option>`).join(''); }
    if (ds)     data=data.filter(r=>r.data>=ds);
    if (de)     data=data.filter(r=>r.data<=de);
    if (turno)  data=data.filter(r=>r.turno===turno);
    if (col)    data=data.filter(r=>r.colaborador_card===col);
    if (status) data=data.filter(r=>r.status===status);
    if (motivo) data=data.filter(r=>(r.motivo||'').toLowerCase().includes(motivo));
    const total=data.length, ok=data.filter(r=>r.status==='total').length;
    const parc=data.filter(r=>r.status==='parcial').length, naoF=data.filter(r=>r.status==='nao_finalizado').length;
    const taxa=total?Math.round(ok/total*100):0;
    const sumRow=document.getElementById('rel-summary-row');
    if (sumRow) { sumRow.style.display='flex'; sumRow.innerHTML=`
      <div class="summ-card summ-total"><span class="summ-emoji">📋</span><span class="summ-num">${total}</span><span class="summ-lbl">Total</span></div>
      <div class="summ-card summ-ok"><span class="summ-emoji">✅</span><span class="summ-num">${ok}</span><span class="summ-lbl">100%</span></div>
      <div class="summ-card summ-warn"><span class="summ-emoji">⚠️</span><span class="summ-num">${parc}</span><span class="summ-lbl">Parcial</span></div>
      <div class="summ-card summ-err"><span class="summ-emoji">❌</span><span class="summ-num">${naoF}</span><span class="summ-lbl">Não feito</span></div>
      <div class="summ-card summ-taxa"><span class="summ-emoji">📈</span><span class="summ-num">${taxa}%</span><span class="summ-lbl">Conclusão</span></div>`; }
    if (!data.length) { container.innerHTML='<div style="padding:40px;text-align:center;color:#888">😕 Nenhum registro para os filtros.</div>'; return; }
    const byCol={};
    data.forEach(r=>{ const k=r.colaborador_card||'—'; if (!byCol[k]) byCol[k]=[]; byCol[k].push(r); });
    container.innerHTML=Object.entries(byCol).sort((a,b)=>a[0].localeCompare(b[0])).map(([colab,rows])=>{
      const t=rows.length,o=rows.filter(r=>r.status==='total').length;
      const p=rows.filter(r=>r.status==='parcial').length,n=rows.filter(r=>r.status==='nao_finalizado').length;
      const tx=t?Math.round(o/t*100):0;
      const txC=tx===100?'#16a34a':tx>=50?'#d97706':'#dc2626';
      return `<div class="rel-collab-block">
        <div class="rel-collab-header"><span>${COLLAB_EMOJI[colab]||'👤'} <strong>${colab}</strong></span><span style="color:${txC};font-weight:900;font-size:18px">${tx}%</span></div>
        <div class="rel-stats-row"><span class="rel-stat rel-stat-ok">✅ ${o}</span><span class="rel-stat rel-stat-parc">⚠️ ${p}</span><span class="rel-stat rel-stat-nao">❌ ${n}</span></div>
        <table class="espelho-table" style="margin-top:8px">
          <thead><tr><th>Data</th><th>Item</th><th>Prog.</th><th>Prod.</th><th>Status</th><th>Motivo</th></tr></thead>
          <tbody>${rows.map(r=>{
            const bm={total:'✅',parcial:'⚠️',nao_finalizado:'❌','':'⏳'};
            return `<tr><td>${r.data||'—'}</td><td>${r.item||'—'}</td>
              <td>${r.quantidade_programada!==undefined?fmt(r.quantidade_programada):'—'}</td>
              <td>${r.quantidade_produzida!==undefined?fmt(r.quantidade_produzida):'—'}</td>
              <td>${bm[r.status||'']||'⏳'}</td><td>${r.motivo||'—'}</td></tr>`;
          }).join('')}</tbody>
        </table></div>`;
    }).join('');
  } catch(e) { container.innerHTML='<div style="padding:20px;color:#dc3545">❌ Erro ao carregar.</div>'; }
}

/* ══ GESTÃO DE TAREFAS ═══════════════════════════════════ */
function setTarTurno(turno) {
  const el=document.getElementById('tar-filter-turno'); if (el) el.value=turno;
  document.getElementById('tarbtn-dia').classList.toggle('active',turno==='dia');
  document.getElementById('tarbtn-noite').classList.toggle('active',turno==='noite');
  loadTarefasGestao();
}

function setTarDia(dia) {
  const el=document.getElementById('tar-filter-dia'); if (el) el.value=dia;
  document.querySelectorAll('.tar-dia-btn').forEach(b=>b.classList.toggle('active',b.dataset.dia===dia));
  loadTarefasGestao();
}

async function loadTarefasGestao() {
  const container=document.getElementById('tarefas-gestao-list'); if (!container) return;
  container.innerHTML='<div style="padding:20px;text-align:center;color:#888">⏳ Carregando...</div>';
  const turno=(document.getElementById('tar-filter-turno')||{}).value||'dia';
  const dia  =(document.getElementById('tar-filter-dia')||{}).value||'segunda';
  const colab=((document.getElementById('tar-filter-colab')||{}).value)||'';
  try {
    const all=await _fbGetAll('tarefas');
    const colabsNoDia=[...new Set(all.filter(t=>t.turno===turno&&t.dia_semana===dia).map(t=>t.colaborador).filter(n => n && !_isColabTeste(n)))].sort((a,b)=>a.localeCompare(b,'pt-BR'));
    const selC=document.getElementById('tar-filter-colab');
    if (selC) { const cur=selC.value; selC.innerHTML='<option value="">Todos</option>'+colabsNoDia.map(c=>`<option value="${c}"${c===cur?' selected':''}>${c}</option>`).join(''); }
    let data=all.filter(t=>t.turno===turno&&t.dia_semana===dia);
    if (colab) data=data.filter(t=>t.colaborador===colab);
    data.sort((a,b)=>(a.colaborador||'').localeCompare(b.colaborador||'')||(a.ordem||0)-(b.ordem||0));
    const cb=document.getElementById('tar-count-bar');
    if (cb) cb.innerHTML=`<span>${data.length} tarefa${data.length!==1?'s':''} — ${colabsNoDia.length} colaborador${colabsNoDia.length!==1?'es':''}</span>`;
    if (!data.length) { container.innerHTML=`<div style="padding:40px;text-align:center;color:#888"><div style="font-size:40px;margin-bottom:12px">😕</div><strong>Nenhuma tarefa para ${turno==='dia'?'☀️ Dia':'🌙 Noite'} — ${dia}</strong><br><small style="color:#aaa">Clique em "+ Nova Tarefa" para adicionar</small></div>`; return; }
    const byCol={};
    data.forEach(t=>{ if (!byCol[t.colaborador]) byCol[t.colaborador]=[]; byCol[t.colaborador].push(t); });
    container.innerHTML=Object.entries(byCol).map(([col,tasks])=>`
      <div class="tar-collab-block">
        <div class="tar-collab-header"><span>${COLLAB_EMOJI[col]||'👤'} <strong>${col}</strong></span><span class="tar-count">${tasks.length} tarefa${tasks.length!==1?'s':''}</span></div>
        <div class="tar-table-wrap"><table class="tar-table">
          <thead><tr><th style="width:22%">Categoria</th><th>Item</th><th style="width:120px;text-align:center">Qtd Padrão</th><th style="width:50px;text-align:center">Un</th><th style="width:100px;text-align:center">Ações</th></tr></thead>
          <tbody>${tasks.map(t=>`
            <tr class="tar-row" id="tar-${t.id}">
              <td><span class="tar-cat-badge">${t.categoria||'Geral'}</span></td>
              <td class="tar-item-name-cell">${t.item||'—'}</td>
              <td style="text-align:center"><div class="tar-qty-wrap" style="justify-content:center">
                <button class="tar-qty-btn" onclick="adjTarQty('${t.id}',-1)">−</button>
                <input class="tar-qty-input" type="number" id="tqty-${t.id}" value="${t.quantidade_padrao||0}" min="0"/>
                <button class="tar-qty-btn plus" onclick="adjTarQty('${t.id}',1)">+</button>
              </div></td>
              <td style="text-align:center;font-size:12px;color:#888">${t.unidade||''}</td>
              <td><div class="tar-actions" style="justify-content:center">
                <button class="tar-btn-save" id="sbtn-${t.id}" onclick="saveTarQty('${t.id}')" title="Salvar"><i class="fas fa-save"></i></button>
                <button class="tar-btn-edit" onclick="openModalEditTask('${t.id}')" title="Editar"><i class="fas fa-pen"></i></button>
                <button class="tar-btn-del" onclick="deleteTarefa('${t.id}')" title="Excluir"><i class="fas fa-trash"></i></button>
              </div></td>
            </tr>`).join('')}
          </tbody></table></div>
      </div>`).join('');
  } catch(e) { container.innerHTML='<div style="padding:20px;color:#dc3545">❌ Erro ao carregar tarefas.</div>'; }
}

function adjTarQty(id,delta) { const i=document.getElementById(`tqty-${id}`); if (i) i.value=Math.max(0,Number(i.value)+delta); }

async function saveTarQty(id) {
  const inp=document.getElementById(`tqty-${id}`), btn=document.getElementById(`sbtn-${id}`);
  if (!inp) return;
  try {
    await _fbPatch('tarefas',id,{quantidade_padrao:Number(inp.value)});
    if (btn) { btn.innerHTML='<i class="fas fa-check"></i>'; setTimeout(()=>{ btn.innerHTML='<i class="fas fa-save"></i>'; },1200); }
    showToast('✅ Quantidade salva!');
  } catch(e) { showToast('❌ Erro ao salvar'); }
}

async function deleteTarefa(id) {
  if (!confirm('Excluir esta tarefa?')) return;
  try {
    await _fbDelete('tarefas',id);
    const el=document.getElementById(`tar-${id}`);
    if (el) { el.style.transition='all .3s'; el.style.opacity='0'; el.style.maxHeight='0'; el.style.overflow='hidden'; setTimeout(()=>el.remove(),300); }
    showToast('🗑️ Tarefa excluída!'); _invalidarCache();
  } catch(e) { showToast('❌ Erro ao excluir'); }
}

async function openModalNewTask() {
  document.getElementById('te-id').value='';
  document.getElementById('modal-task-edit-title').textContent='Nova Tarefa';
  ['te-item','te-cat','te-qty','te-unit','te-ordem'].forEach(id=>{ const el=document.getElementById(id); if (el) el.value=''; });
  const tet=document.getElementById('te-turno'); if (tet) tet.value=(document.getElementById('tar-filter-turno')||{}).value||'dia';
  const ted=document.getElementById('te-dia');   if (ted) ted.value=(document.getElementById('tar-filter-dia')||{}).value||'segunda';
  await _populateTeColab('');
  document.getElementById('modal-task-edit').classList.remove('hidden');
}

async function openModalEditTask(id) {
  try {
    const t=await _fbGetOne('tarefas',id); if (!t) { showToast('❌ Tarefa não encontrada'); return; }
    document.getElementById('te-id').value=t.id;
    document.getElementById('modal-task-edit-title').textContent='Editar Tarefa';
    document.getElementById('te-item').value=t.item||'';
    document.getElementById('te-cat').value=t.categoria||'';
    document.getElementById('te-qty').value=t.quantidade_padrao||0;
    document.getElementById('te-unit').value=t.unidade||'';
    document.getElementById('te-ordem').value=t.ordem||'';
    document.getElementById('te-turno').value=t.turno||'dia';
    document.getElementById('te-dia').value=t.dia_semana||'segunda';
    await _populateTeColab(t.colaborador||'');
    document.getElementById('modal-task-edit').classList.remove('hidden');
  } catch(e) { showToast('❌ Erro ao carregar tarefa'); }
}

const _COLABS_IGNORAR = new Set([
  'TESTE','MAIKON','JULIANA','MALU','MOTOCA','CCCCC','CCCC','CCC',
  'TEST','TESTANDO','TESTE1','TESTE2','AAAA','BBBB','AAA','BBB',
  'COLABORADOR TESTE','TESTE COLABORADOR','COLLAB TESTE',
]);

function _isColabTeste(nome) {
  const n = (nome || '').toUpperCase().trim();
  if (!n) return true;
  if (_COLABS_IGNORAR.has(n)) return true;
  if (n.startsWith('TESTE')) return true;
  if (/^([A-Z])\1{2,}$/.test(n)) return true;
  return false;
}

async function _populateTeColab(selected) {
  const sel = document.getElementById('te-colab');
  if (!sel) return;

  let cols = [];
  try {
    const banco = await _fbGetAll('tarefas');
    cols = [...new Set(
      banco
        .filter(t => t.colaborador && !_isColabTeste(t.colaborador))
        .map(t => t.colaborador)
    )].sort((a,b) => a.localeCompare(b,'pt-BR'));

    if (!cols.length) {
      cols = TODOS_COLABS
        .filter(c => !_isColabTeste(c))
        .sort((a,b) => a.localeCompare(b,'pt-BR'));
    }
  } catch(e) {
    cols = TODOS_COLABS
      .filter(c => !_isColabTeste(c))
      .sort((a,b) => a.localeCompare(b,'pt-BR'));
  }

  sel.innerHTML = '<option value="">— Selecione —</option>' +
    cols.map(c => `<option value="${c}"${c===selected?' selected':''}>${(COLLAB_EMOJI[c]||'👤')+' '+c}</option>`).join('');

  if (selected) sel.value = selected;
}

async function saveTaskEdit() {
  const id=document.getElementById('te-id').value;
  let colab=(document.getElementById('te-colab').value||'').trim().toUpperCase();
  const body={
    colaborador:colab,
    turno:document.getElementById('te-turno').value,
    dia_semana:document.getElementById('te-dia').value,
    categoria:document.getElementById('te-cat').value.trim(),
    item:document.getElementById('te-item').value.trim(),
    quantidade_padrao:Number(document.getElementById('te-qty').value)||0,
    unidade:document.getElementById('te-unit').value.trim(),
    ordem:Number(document.getElementById('te-ordem').value)||99,
  };
  if (!colab) { showToast('⚠️ Selecione o colaborador!'); return; }
  if (!body.item) { showToast('⚠️ Informe o nome do item!'); return; }
  const btn=document.querySelector('#modal-task-edit .btn-modal-confirm');
  if (btn) { btn.disabled=true; btn.textContent='Salvando...'; }
  try {
    if (id) { await _fbPut('tarefas',id,body); showToast('✅ Tarefa atualizada!'); }
    else    { await _fbPost('tarefas',body); showToast('✅ Tarefa criada!'); }
    closeModal('modal-task-edit'); _invalidarCache(); loadTarefasGestao();
  } catch(e) { showToast('❌ Erro ao salvar: '+e.message); }
  finally { if (btn) { btn.disabled=false; btn.innerHTML='💾 Salvar'; } }
}

/* ══ IMPRESSÕES ══════════════════════════════════════════ */
function printLeaderReport() {
  if (!S.leaderData||!S.leaderData.length) { showToast('Sem dados. Filtre primeiro.'); return; }
  const linhas=S.leaderData.map(r=>{
    const dObj=DIAS_LIST.find(d=>d.key===r.dia_semana);
    return `<tr><td>${r.data||'—'}</td><td>${r.turno||'—'}</td><td>${dObj?dObj.short:(r.dia_semana||'—')}</td>
      <td>${r.colaborador_card||'—'}</td><td>${r.item||'—'}</td>
      <td>${r.quantidade_programada!==undefined?r.quantidade_programada:'—'}</td>
      <td>${r.quantidade_produzida!==undefined?r.quantidade_produzida:'—'}</td>
      <td>${_sl(r.status)}</td><td>${r.motivo||'—'}</td></tr>`;
  }).join('');
  _triggerPrint('🍔 Just Burger — Relatório','Líder · '+fmtDate(),'<tr><th>Data</th><th>Turno</th><th>Dia</th><th>Colaborador</th><th>Item</th><th>Prog.</th><th>Prod.</th><th>Status</th><th>Motivo</th></tr>',linhas);
}

function printPendentes() {
  const data=(S.leaderData||[]).filter(r=>r.status!=='total');
  if (!data.length) { showToast('✅ Sem pendências!'); return; }
  const byCollab={};
  data.forEach(r=>{ const k=r.colaborador_card||'—'; if (!byCollab[k]) byCollab[k]=[]; byCollab[k].push(r); });
  let all='';
  Object.entries(byCollab).forEach(([c,rows])=>{
    all+=`<tr><td colspan="5" style="background:#111;color:#fff;font-weight:900;padding:8px">👤 ${c}</td></tr>`;
    rows.forEach(r=>{ all+=`<tr><td>${r.data||'—'}</td><td>${r.item||'—'}</td><td>${r.quantidade_programada!==undefined?r.quantidade_programada:'—'}</td><td>${_sl(r.status)}</td><td>${r.motivo||'—'}</td></tr>`; });
  });
  _triggerPrint('⚠️ Just Burger — Pendências','Líder · '+fmtDate(),'<tr><th>Data</th><th>Item</th><th>Programado</th><th>Status</th><th>Motivo</th></tr>',all);
}

function printAllCollabs() {
  const data=S.leaderData||[];
  if (!data.length) { showToast('Sem dados. Filtre primeiro.'); return; }
  const byCollab={};
  data.forEach(r=>{ const k=r.colaborador_card||'—'; if (!byCollab[k]) byCollab[k]=[]; byCollab[k].push(r); });
  let all='';
  Object.entries(byCollab).forEach(([c,rows])=>{
    all+=`<tr><td colspan="5" style="background:#111;color:#fff;font-weight:900;padding:8px">👤 ${c}</td></tr>`;
    rows.forEach(r=>{ all+=`<tr><td>${r.data||'—'}</td><td>${r.item||'—'}</td><td>${r.quantidade_programada!==undefined?r.quantidade_programada:'—'}</td><td>${r.quantidade_produzida!==undefined?r.quantidade_produzida:'—'}</td><td>${_sl(r.status)}</td></tr>`; });
  });
  _triggerPrint('🍔 Just Burger — Por Colaborador','Líder · '+fmtDate(),'<tr><th>Data</th><th>Item</th><th>Prog.</th><th>Prod.</th><th>Status</th></tr>',all);
}

function printEspelho() { printAllCollabs(); }

function _triggerPrint(titulo,sub,headerRow,linhas) {
  const conteudo=`
    <h1 style="font-size:16px;margin:0 0 2px;font-family:Arial,sans-serif">${titulo}</h1>
    <p style="font-size:11px;color:#555;margin:0 0 12px;font-family:Arial,sans-serif">${sub}</p>
    <table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;font-size:11px">
      <thead>${headerRow}</thead>
      <tbody>${linhas}</tbody>
    </table>`;
  _abrirPreviewImpressao(conteudo);
}

/* ── Abre o modal de pré-visualização inline ─────────────────── */
function _abrirPreviewImpressao(htmlConteudo) {
  const overlay = document.getElementById('modal-print-preview');
  const body    = document.getElementById('print-preview-body');
  if (!overlay || !body) {
    try {
      const w = window.open('','_blank');
      if (w) {
        w.document.write('<html><head><meta charset="UTF-8"><style>body{font-family:Arial,sans-serif;padding:20px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ccc;padding:6px 8px}th{background:#f0f0f0}</style></head><body>');
        w.document.write(htmlConteudo);
        w.document.write('</body></html>');
        w.document.close();
      }
    } catch(e) {}
    return;
  }
  body.innerHTML = htmlConteudo;
  overlay.classList.remove('hidden');
  overlay.scrollTop = 0;
}

/* ══════════════════════════════════════════════════════════════
   _doPrintPreview — v2026-04-06-v3 IFRAME METHOD
   ══════════════════════════════════════════════════════════════
   SOLUÇÃO DEFINITIVA PARA TABLET (iOS Safari / iPad / Android):

   Técnica: IFRAME OCULTO
   - Cria (ou reutiliza) um <iframe> oculto no DOM.
   - Escreve o HTML do conteúdo dentro do iframe.
   - O iframe tem seu próprio contexto de renderização
     isolado do resto da página.
   - Chama iframe.contentWindow.print() depois que o iframe
     dispara o evento 'load' → garante que o layout está
     100% calculado antes de imprimir.
   - Funciona em: PC (Chrome/Firefox/Edge), iPad Safari,
     iPhone Safari, Android Chrome/Samsung Browser.
   - Não depende de display:none, visibility, reflow tricks
     ou setTimeout de tempo arbitrário.

   FALLBACK: se o iframe falhar (popup bloqueado, etc.),
   usa window.print() direto na página com #print-area.
   ══════════════════════════════════════════════════════════════ */
function _doPrintPreview() {
  var src = document.getElementById('print-preview-body');

  /* Sem conteúdo de origem: print simples */
  if (!src) { window.print(); return; }

  var html = src.innerHTML;

  /* Monta o HTML completo para o iframe */
  var docHtml = '<!DOCTYPE html><html lang="pt-BR"><head>'
    + '<meta charset="UTF-8"/>'
    + '<meta name="viewport" content="width=device-width,initial-scale=1.0"/>'
    + '<style>'
    + 'body{margin:0;padding:12px;font-family:Arial,Helvetica,sans-serif;'
    + '     background:#fff;color:#000;font-size:12px;}'
    + 'h2,h3{margin:4px 0;}'
    + 'table{width:100%;border-collapse:collapse;margin-bottom:12px;}'
    + 'th,td{border:1px solid #999;padding:4px 6px;font-size:11px;text-align:left;}'
    + 'th{background:#f0f0f0;font-weight:700;}'
    + 'tr{page-break-inside:avoid;}'
    + 'thead{display:table-header-group;}'
    + '.section-title{font-size:14px;font-weight:800;margin:16px 0 6px;'
    + '  padding:6px 10px;background:#1a1a2e;color:#fff;border-radius:4px;}'
    + '.collab-header{font-size:13px;font-weight:700;margin:12px 0 4px;'
    + '  padding:4px 8px;background:#f97316;color:#fff;border-radius:4px;}'
    + '.status-ok{color:#16a34a;font-weight:700;}'
    + '.status-parcial{color:#d97706;font-weight:700;}'
    + '.status-nao{color:#dc2626;font-weight:700;}'
    + '@media print{'
    + '  body{padding:6px;}'
    + '  table{page-break-inside:auto;}'
    + '}'
    + '</style>'
    + '</head><body>' + html + '</body></html>';

  /* Tenta usar o iframe dedicado */
  var frame = document.getElementById('jb-print-frame');

  /* Se não existe no DOM, cria dinamicamente */
  if (!frame) {
    frame = document.createElement('iframe');
    frame.id = 'jb-print-frame';
    frame.style.cssText = 'position:fixed;top:-9999px;left:-9999px;'
      + 'width:1px;height:1px;border:none;visibility:hidden;';
    document.body.appendChild(frame);
  }

  /* Fecha o modal de preview */
  var closePreviewModal = function () {
    var overlay = document.getElementById('modal-print-preview');
    if (overlay) overlay.classList.add('hidden');
  };

  /* Handler do evento load do iframe */
  var onFrameLoad = function () {
    frame.removeEventListener('load', onFrameLoad);
    try {
      /* Dispara o print dentro do iframe */
      frame.contentWindow.focus();
      frame.contentWindow.print();

      /* Fecha o modal após um instante */
      setTimeout(closePreviewModal, 600);
    } catch (e) {
      /* Fallback: print na janela principal */
      console.warn('[JB] iframe.print() falhou, usando fallback:', e);
      _doPrintFallback(html, closePreviewModal);
    }
  };

  frame.addEventListener('load', onFrameLoad);

  try {
    /* Escreve o HTML no iframe */
    frame.contentDocument.open();
    frame.contentDocument.write(docHtml);
    frame.contentDocument.close();
  } catch (e) {
    /* Fallback se contentDocument falhar (e.g., CSP) */
    frame.removeEventListener('load', onFrameLoad);
    console.warn('[JB] iframe write falhou, usando fallback:', e);
    _doPrintFallback(html, closePreviewModal);
  }
}

/* ══════════════════════════════════════════════════════════════
   _doPrintFallback — usa #print-area quando iframe não funciona
   ══════════════════════════════════════════════════════════════ */
function _doPrintFallback(html, closeCb) {
  var area = document.getElementById('print-area');
  if (!area) { window.print(); if (closeCb) closeCb(); return; }

  area.innerHTML = html;
  area.style.display = 'block';

  /* Força reflow antes de imprimir */
  void area.offsetHeight;

  setTimeout(function () {
    window.print();
    var cleanup = function () {
      area.style.display = 'none';
      area.innerHTML = '';
      window.removeEventListener('afterprint', cleanup);
      if (closeCb) closeCb();
    };
    if ('onafterprint' in window) {
      window.addEventListener('afterprint', cleanup);
    } else {
      setTimeout(cleanup, 4000);
    }
  }, 150);
}

/* ══ ALERTA SONORO ═══════════════════════════════════════ */
function _tocarAlertaPendencias() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();

    const _play = function() {
      const notas  = [440, 660, 880, 440, 660, 880];
      const t0     = ctx.currentTime + 0.05;
      const durBip = 0.22;
      const gap    = 0.30;
      const pausa  = 0.55;

      notas.forEach(function(freq, i) {
        const inicio = t0 + i * gap + (i >= 3 ? pausa : 0);

        const osc  = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.value = freq;

        gain.gain.setValueAtTime(0,   inicio);
        gain.gain.linearRampToValueAtTime(0.9, inicio + 0.02);
        gain.gain.setValueAtTime(0.9,          inicio + durBip - 0.04);
        gain.gain.linearRampToValueAtTime(0,   inicio + durBip);

        osc.start(inicio);
        osc.stop(inicio + durBip + 0.01);
      });
    };

    if (ctx.state === 'suspended') {
      ctx.resume().then(_play).catch(function() { _play(); });
    } else {
      _play();
    }

  } catch(e) {
    console.warn('[JB] Alerta sonoro não suportado:', e);
  }
}

/* ══ UTILITÁRIOS ═════════════════════════════════════════ */
function showLoading(on) { const el=document.getElementById('loading-overlay'); if (el) el.classList.toggle('hidden',!on); }

let _toastT=null;
function showToast(msg) {
  const el=document.getElementById('toast'); if (!el) return;
  el.textContent=msg; el.classList.remove('hidden'); el.classList.add('show');
  clearTimeout(_toastT);
  _toastT=setTimeout(()=>{ el.classList.remove('show'); setTimeout(()=>el.classList.add('hidden'),300); },3000);
}

function closeModal(id) {
  const el=document.getElementById(id);
  if (el) el.classList.add('hidden');
  if (id === 'modal-finish') {
    const concludeBtn = document.getElementById('btn-conclude');
    const allDone = S.tarefas.length > 0 && S.tarefas.every(t=>S.s2[t.id]&&S.s2[t.id].status);
    if (concludeBtn && allDone) concludeBtn.classList.remove('hidden');
  }
  // Limpeza do modal-s2 ao fechar (modo conferência ou normal)
  if (id === 'modal-s2') {
    // Remove footer de conferência do líder
    const confFt = document.getElementById('_conf_lider_footer');
    if (confFt) confFt.remove();
    // Reexibe footer original
    const footerOrig = document.getElementById('s2-modal-footer');
    if (footerOrig) footerOrig.style.display = '';
    // Reativa todos os botões do modal para próximo uso
    if (el) {
      el.querySelectorAll('.sbtn, .motivo-btn, #btn-s2-salvar, .qty-btn').forEach(btn => {
        btn.disabled = false;
        btn.style.opacity = '';
        btn.style.cursor  = '';
        btn.style.pointerEvents = '';
      });
      const mc2 = el.querySelector('#motivo-custom');
      if (mc2) mc2.disabled = false;
    }
  }
}
function shakeEl(id)    { const el=document.getElementById(id); if (!el) return; el.classList.add('shake'); setTimeout(()=>el.classList.remove('shake'),500); }
function fmt(n)  { if (n===null||n===undefined||n==='') return '—'; return Number(n).toLocaleString('pt-BR'); }
function today() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,'0');
  const dd= String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${dd}`;
}
function fmtDate(){ return new Date().toLocaleDateString('pt-BR',{weekday:'long',year:'numeric',month:'long',day:'numeric'}); }

function getCatColor(cat) {
  if (!cat) return '#333';
  const c=cat.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const map={
    'pre-preparo':'linear-gradient(135deg,#FF6B6B,#FF8E53)',
    'producao':'linear-gradient(135deg,#4ECDC4,#44A08D)',
    'saches':'linear-gradient(135deg,#45B7D1,#2980B9)',
    'saladas':'linear-gradient(135deg,#56ab2f,#a8e063)',
    'fritadeira':'linear-gradient(135deg,#f093fb,#f5576c)',
    'hamburger':'linear-gradient(135deg,#667eea,#764ba2)',
    'logistica':'linear-gradient(135deg,#555,#888)',
    'camaras':'linear-gradient(135deg,#00C6FF,#0072FF)',
    'ilha quente':'linear-gradient(135deg,#f83600,#fe8c00)',
    'ilha fria':'linear-gradient(135deg,#4facfe,#00f2fe)',
    'ilha':'linear-gradient(135deg,#4facfe,#00f2fe)',
    'supervisao':'linear-gradient(135deg,#DEB887,#A0522D)',
    'limpeza':'linear-gradient(135deg,#26D0CE,#1A2980)',
    'paes':'linear-gradient(135deg,#F4A460,#6E2800)',
    'maionese':'linear-gradient(135deg,#F9CA24,#F0932B)',
    'carnes':'linear-gradient(135deg,#FF8C00,#8B3A00)',
    'molhos':'linear-gradient(135deg,#FFD700,#FF8C00)',
    'preparo':'linear-gradient(135deg,#FFA07A,#E74C3C)',
  };
  const f=Object.entries(map).find(([k])=>c.includes(k));
  return f?f[1]:'linear-gradient(135deg,#333,#555)';
}

function getCatEmoji(cat) {
  if (!cat) return '📋';
  const c=cat.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const f=Object.entries(CAT_EMOJI).find(([k])=>c.includes(k.normalize('NFD').replace(/[\u0300-\u036f]/g,'')));
  return f?f[1]:'📋';
}

function backToCollabScreen() { showScreen('screen-setor'); }

/* ══ NOVO COLABORADOR ════════════════════════════════════ */
async function abrirModalNovoColab() {
  const nome = document.getElementById('nc-nome');
  const depto = document.getElementById('nc-depto');
  if (nome) nome.value = '';
  if (depto) depto.value = '';

  const turnoAtual = (document.getElementById('tar-filter-turno')||{}).value || 'dia';
  const rdDia = document.getElementById('nc-turno-dia');
  const rdNoite = document.getElementById('nc-turno-noite');
  if (rdDia) rdDia.checked = (turnoAtual === 'dia');
  if (rdNoite) rdNoite.checked = (turnoAtual === 'noite');
  _ncTurnoChange();

  document.querySelectorAll('.nc-dia-cb').forEach(cb => cb.checked = false);

  await _carregarOpcoesDepto();

  document.getElementById('modal-novo-colab').classList.remove('hidden');
  setTimeout(() => { if (nome) nome.focus(); }, 80);
}

function fecharModalNovoColab() {
  document.getElementById('modal-novo-colab').classList.add('hidden');
}

function _ncTurnoChange() {
  const diaLbl = document.getElementById('nc-turno-dia-lbl');
  const noiteLbl = document.getElementById('nc-turno-noite-lbl');
  const isDia = document.getElementById('nc-turno-dia') && document.getElementById('nc-turno-dia').checked;
  if (diaLbl) {
    diaLbl.style.borderColor = isDia ? '#e8590c' : '#e2e6f0';
    diaLbl.style.background  = isDia ? 'rgba(232,89,12,.08)' : '#f9fafb';
    diaLbl.style.color       = isDia ? '#e8590c' : '#374151';
  }
  if (noiteLbl) {
    noiteLbl.style.borderColor = !isDia ? '#6366f1' : '#e2e6f0';
    noiteLbl.style.background  = !isDia ? 'rgba(99,102,241,.08)' : '#f9fafb';
    noiteLbl.style.color       = !isDia ? '#6366f1' : '#374151';
  }
}

function _ncSelecionarTodos() {
  document.querySelectorAll('.nc-dia-cb').forEach(cb => cb.checked = true);
}
function _ncDeselecionarTodos() {
  document.querySelectorAll('.nc-dia-cb').forEach(cb => cb.checked = false);
}
function _ncSemana() {
  document.querySelectorAll('.nc-dia-cb').forEach(cb => {
    cb.checked = ['segunda','terca','quarta','quinta','sexta'].includes(cb.value);
  });
}

async function _carregarOpcoesDepto() {
  const sel = document.getElementById('nc-depto');
  if (!sel) return;

  const fixos = [
    { valor:'PRODUCAO',    label:'🏭 Produção' },
    { valor:'OPERACAO',    label:'⚙️ Operação' },
    { valor:'ATENDIMENTO', label:'🎯 Atendimento' },
  ];

  let extras = [];
  try {
    const areas = await _fbGetAll('areas');
    const _AREAS_FIXAS_KEYS = ['PRODUCAO','OPERACAO','ATENDIMENTO'];
    extras = areas
      .filter(a => a.ativo !== false)
      .filter(a => {
        const key = (a.chave || (a.nome||'').toUpperCase()
          .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
          .replace(/\s+/g,'_').replace(/[^A-Z0-9_]/g,''));
        return !_AREAS_FIXAS_KEYS.includes(key) && !_DEPTS_IGNORAR.has(key);
      })
      .filter(a => {
        const n = (a.nome || a.chave || '').toLowerCase().trim();
        return !n.includes('teste') && !n.includes('test ') && n !== 'area nova' && n !== 'area_nova';
      })
      .map(a => ({
        valor: (a.chave || (a.nome||'').toUpperCase()
          .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
          .replace(/\s+/g,'_').replace(/[^A-Z0-9_]/g,'')),
        label: (a.emoji ? a.emoji+' ' : '🏷️ ') + (a.nome || a.chave || '?')
      }))
      .sort((a,b) => a.label.localeCompare(b.label, 'pt-BR'));
  } catch(e) { console.warn('[JB] _carregarOpcoesDepto erro extras:', e); }

  sel.innerHTML = '<option value="">— Selecione —</option>' +
    [...fixos, ...extras].map(o => `<option value="${o.valor}">${o.label}</option>`).join('');
}

async function salvarNovoColab() {
  const nome  = (document.getElementById('nc-nome').value || '').trim().toUpperCase();
  const depto = document.getElementById('nc-depto').value;
  const turno = document.querySelector('input[name="nc-turno"]:checked')?.value || 'dia';
  const dias  = [...document.querySelectorAll('.nc-dia-cb:checked')].map(cb => cb.value);

  if (!nome)  { showToast('⚠️ Informe o nome do colaborador!'); document.getElementById('nc-nome').focus(); return; }
  if (!depto) { showToast('⚠️ Selecione o departamento!'); document.getElementById('nc-depto').focus(); return; }
  if (!dias.length) { showToast('⚠️ Marque pelo menos 1 dia de trabalho!'); return; }

  const btn = document.getElementById('btn-salvar-novo-colab');
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...'; }

  try {
    const existentes = await _fbGetAll('tarefas');
    const jaExiste = existentes.some(t =>
      (t.colaborador||'').toUpperCase() === nome &&
      (t.turno||'') === turno &&
      dias.includes(t.dia_semana||'')
    );
    if (jaExiste) {
      showToast(`⚠️ "${nome}" já possui tarefas cadastradas para ${turno}!`);
      return;
    }

    const deptoLabel = {
      PRODUCAO:'Produção', OPERACAO:'Operação', ATENDIMENTO:'Atendimento'
    }[depto] || depto;

    let criados = 0;
    for (const dia of dias) {
      await _fbPost('tarefas', {
        colaborador:        nome,
        departamento:       depto,
        categoria:          depto,
        turno:              turno,
        dia_semana:         dia,
        item:               `[${deptoLabel}] Tarefas de ${nome}`,
        quantidade_padrao:  0,
        unidade:            'checklist',
        ordem:              999,
      });
      criados++;
    }

    _invalidarCache();
    fecharModalNovoColab();
    showToast(`✅ Colaborador "${nome}" cadastrado em ${criados} dia(s)!`);

    const ftTurno = document.getElementById('tar-filter-turno');
    if (ftTurno) ftTurno.value = turno;
    loadTarefasGestao();

  } catch(e) {
    console.error('[JB] salvarNovoColab erro:', e);
    showToast('❌ Erro ao cadastrar: ' + e.message);
  } finally {
    if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-user-plus"></i> Cadastrar'; }
  }
}

console.log('🍔 Just Burger — app_v3.js v2026-04-13 carregado (botão Sair global + iframe print)!');
