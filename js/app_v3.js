/* ═══════════════════════════════════════════════════════════
   JUST BURGER 🍔 — app_v3.js
   Controle de Produção — Firebase Realtime Database (compat)
   Versão: 2026-03-27 — GitHub Edition
═══════════════════════════════════════════════════════════ */
'use strict';

/* ══ SENHAS ══════════════════════════════════════════════ */
const LEADER_PASSWORD  = 'lider123';
const COLLAB_PASSWORDS = { 'DINA': 'lider123*', 'SANDRO': 'lider123*' };
const DEPT_PASSWORD    = { 'ATENDIMENTO': 'lider123*' };

/* ══ MAPA COLABORADOR → DEPARTAMENTO ════════════════════ */
const COLLAB_DEPT = {
  'ANTONIEL':'ATENDIMENTO','ANTONIEL INICIO':'ATENDIMENTO','ANTONIEL FINALIZAÇÃO':'ATENDIMENTO',
  'MARCUS':'ATENDIMENTO','MARCUS INICIO':'ATENDIMENTO','MARCUS FINALIZAÇÃO':'ATENDIMENTO',
  'ALINE':'ATENDIMENTO','ALINE INICIO':'ATENDIMENTO','ALINE FINALIZAÇÃO':'ATENDIMENTO',
  'DESPACHO':'ATENDIMENTO','ATENDIMENTO / DESPACHO':'ATENDIMENTO',
  'ALAN RICARDO':'OPERACAO','SAMUEL':'OPERACAO','LOHAINE':'OPERACAO',
  'GABRIEL LEITE':'OPERACAO','RHUAN':'OPERACAO',
  'NOITE - CHAPEIRO':'OPERACAO','NOITE - MONTADOR':'OPERACAO','NOITE - FRITADEIRA':'OPERACAO',
  'GABRIEL KHALYL':'PRODUCAO','JOÃO':'PRODUCAO','PABLO':'PRODUCAO','MATEUS':'PRODUCAO',
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
  'RHUAN':'🍟','ATENDIMENTO / DESPACHO':'📦','FABIO':'🧀','DAVI':'🍅',
  'HENRIQUE':'🥬','JOSÉ BRUNO':'🥓','PEDRO':'🥤','SAMUEL':'🧊','LUCAS':'🍳',
  'FERNANDO':'🍖','RODRIGO':'🧀','JHON':'🌶️',
  'NOITE - CHAPEIRO':'🔥','NOITE - FRITADEIRA':'🍟','NOITE - MONTADOR':'🧊',
  'ANTONIEL':'🎯','ANTONIEL INICIO':'🎯','ANTONIEL FINALIZAÇÃO':'✅',
  'MARCUS':'📋','MARCUS INICIO':'📋','MARCUS FINALIZAÇÃO':'✅',
  'ALINE':'🎀','ALINE INICIO':'🎀','ALINE FINALIZAÇÃO':'✅','DESPACHO':'📦',
};

const COLLAB_SETOR = {
  'DINA':'Supervisão','SANDRO':'Supervisão Noite','PABLO':'Pré-preparo / Estagiário',
  'MATEUS':'Sachês / Produção','JOÃO':'Pré-preparo / Cozinha','ALAN RICARDO':'Ilha / Chapeiro',
  'GABRIEL KHALYL':'Hambúrguer / Logística','GABRIEL LEITE':'Ilha / Montador',
  'LOHAINE':'Fritadeira','RHUAN':'Fritadeira','ATENDIMENTO / DESPACHO':'Atendimento / Despacho',
  'ANTONIEL':'Atendimento Noite','ANTONIEL INICIO':'Atendimento / Inicio',
  'ANTONIEL FINALIZAÇÃO':'Atendimento / Finalização',
  'MARCUS':'Atendimento Noite','MARCUS INICIO':'Atendimento / Inicio',
  'MARCUS FINALIZAÇÃO':'Atendimento / Finalização',
  'ALINE':'Atendimento Dia','ALINE INICIO':'Atendimento / Inicio',
  'ALINE FINALIZAÇÃO':'Atendimento / Finalização','DESPACHO':'Despacho Noite',
  'SAMUEL':'Ilha / Montador',
};

const TODOS_COLABS = [
  'ALAN RICARDO','ALINE','ALINE INICIO','ALINE FINALIZAÇÃO',
  'ANTONIEL','ANTONIEL INICIO','ANTONIEL FINALIZAÇÃO',
  'ATENDIMENTO / DESPACHO','DAVI','DESPACHO','DINA','FABIO','FERNANDO',
  'GABRIEL KHALYL','GABRIEL LEITE','HENRIQUE','JOÃO','JOSÉ BRUNO','JHON',
  'LOHAINE','LUCAS','MARCUS','MARCUS INICIO','MARCUS FINALIZAÇÃO',
  'MATEUS','NOITE - CHAPEIRO','NOITE - FRITADEIRA',
  'NOITE - MONTADOR','PABLO','PEDRO','RHUAN','RODRIGO','SAMUEL','SANDRO',
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
  showScreen('screen-welcome');
  _prefetchCache();
  _checkPendenciasNotif();
});

async function _prefetchCache() {
  try {
    const [t,s] = await Promise.all([_fbGetAll('tarefas'),_fbGetAll('sessoes')]);
    _cache.tarefas = t; _cache.sessoes = s;
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
  const el = document.getElementById('work-date-display');
  if (!el) return;
  const dt = new Date(ds+'T12:00:00');
  const dn = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
  const mn = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  const ehHoje = ds===today();
  el.innerHTML=`
    <span class="wdd-weekday">${dn[dt.getDay()]}</span>
    <span class="wdd-date">${dt.getDate()} ${mn[dt.getMonth()]} ${dt.getFullYear()}</span>
    ${ehHoje?'<span class="wdd-today-tag">HOJE</span>':''}`;
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
  showScreen('screen-welcome');
  _checkPendenciasNotif();
}

function goToLeaderLogin() {
  if (S.leaderOk) { openLeaderPanel(); return; }
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
  ['registros','pendentes','espelho','relatorio','tarefas'].forEach(t=>{
    const btn=document.getElementById(`tab-${t}`);
    const pan=document.getElementById(`leader-panel-${t}`);
    if (btn) btn.classList.toggle('active',t==='registros');
    if (pan) pan.classList.toggle('hidden',t!=='registros');
  });
  loadLeaderData();
}

function switchLeaderTab(tab) {
  S.currentLeaderTab=tab;
  ['registros','pendentes','espelho','relatorio','tarefas'].forEach(t=>{
    const btn=document.getElementById(`tab-${t}`);
    const pan=document.getElementById(`leader-panel-${t}`);
    if (btn) btn.classList.toggle('active',t===tab);
    if (pan) pan.classList.toggle('hidden',t!==tab);
  });
  if (tab==='tarefas') loadTarefasGestao();
}

/* ══ TURNO ═══════════════════════════════════════════════ */
function selectTurno(turno) {
  if (!S.dataTrabalho) {
    const inp=document.getElementById('work-date-input');
    S.dataTrabalho=(inp&&inp.value)?inp.value:today();
  }
  _invalidarCache();
  S.turno=turno;
  const dt=new Date(S.dataTrabalho+'T12:00:00');
  S.dia=DIA_JS_MAP[dt.getDay()];
  const chip=document.getElementById('day-turno-chip');
  if (chip) chip.textContent=(turno==='dia'?'☀️':'🌙')+' Turno '+(turno==='dia'?'Dia':'Noite');
  showScreen('screen-day');
}

/* ══ DIA ══════════════════════════════════════════════════ */
function renderDayGrid() {
  const dataTrab = S.dataTrabalho || today();
  const dtTrab   = new Date(dataTrab+'T12:00:00');
  const diaKey   = DIA_JS_MAP[dtTrab.getDay()];
  const grid     = document.getElementById('day-grid');
  if (!grid) return;
  grid.innerHTML = DIAS_LIST.map(d=>{
    const isSelected = d.key===diaKey;
    const isHoje     = d.key===DIA_JS_MAP[new Date().getDay()] && dataTrab===today();
    return `<button class="day-btn${isSelected?' today':''}" onclick="selectDia('${d.key}')">
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
function _getDept(nome) {
  return COLLAB_DEPT[(nome||'').toUpperCase()] || 'PRODUCAO';
}

function _irParaDept() {
  const dObj=DIAS_LIST.find(d=>d.key===S.dia);
  const tc=document.getElementById('dept-turno-chip');
  const dc=document.getElementById('dept-day-chip');
  if (tc) tc.textContent=(S.turno==='dia'?'☀️':'🌙')+' '+(S.turno==='dia'?'Dia':'Noite');
  if (dc) dc.textContent=dObj?dObj.short+' '+dObj.icon:S.dia;
  showScreen('screen-dept');
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
  const tc=document.getElementById('setor-turno-chip');
  const dc=document.getElementById('setor-day-chip');
  const dp=document.getElementById('setor-dept-chip');
  if (tc) tc.textContent=(S.turno==='dia'?'☀️':'🌙')+' '+(S.turno==='dia'?'Dia':'Noite');
  if (dc) dc.textContent=dObj?dObj.short+' '+dObj.icon:S.dia;
  if (dp) { dp.textContent=emojiMap[dept]+' '+labelMap[dept]; dp.style.background=corMap[dept]; }
  showScreen('screen-setor');
  const grid=document.getElementById('setor-collab-grid');
  if (!grid) return;
  if (_cache.tarefas&&_cache.tarefas.length>0&&_cache.sessoes) {
    _preencherGridSetor(grid,dept,_cache.tarefas,_cache.sessoes);
    _fbGetAll('faltas').then(f=>{ _cache._faltas=f; _preencherGridSetor(grid,dept,_cache.tarefas,_cache.sessoes); }).catch(()=>{});
    return;
  }
  grid.innerHTML='<div style="padding:40px;text-align:center;color:#888"><div style="font-size:36px;animation:spin 1s linear infinite;display:inline-block">⏳</div><br><span style="font-size:13px;font-weight:600;margin-top:8px;display:block">Carregando...</span></div>';
  Promise.all([_fbGetAll('tarefas'),_fbGetAll('sessoes'),_fbGetAll('faltas')]).then(res=>{
    _cache.tarefas=res[0]; _cache.sessoes=res[1]; _cache._faltas=res[2];
    _preencherGridSetor(grid,dept,_cache.tarefas,_cache.sessoes);
  }).catch(()=>{
    grid.innerHTML='<div style="padding:40px;color:#dc2626;text-align:center">❌ Erro ao carregar. Verifique a conexão.</div>';
  });
}

function _preencherGridSetor(grid,dept,todasTarefas,todasSessoes) {
  const dtTrab=S.dataTrabalho||today();
  const map={};
  todasTarefas.forEach(t=>{
    if (t.turno===S.turno && t.dia_semana===S.dia && _getDept(t.colaborador)===dept)
      map[t.colaborador]=(map[t.colaborador]||0)+1;
  });
  const nomes=Object.keys(map).sort();
  if (!nomes.length) {
    grid.innerHTML='<div style="padding:40px;text-align:center"><div style="font-size:40px">😕</div><strong>Nenhum colaborador neste setor hoje</strong></div>';
    return;
  }
  const sessMap={};
  todasSessoes.forEach(s=>{
    if (s.data===dtTrab&&s.turno===S.turno&&s.dia_semana===S.dia)
      sessMap[s.colaborador_card]=s.status_geral;
  });
  const faltaMap={};
  (_cache._faltas||[]).forEach(f=>{
    if (f.data===dtTrab&&f.turno===S.turno) faltaMap[f.colaborador]=f.tipo;
  });
  const cores=['cc-0','cc-1','cc-2','cc-3','cc-4','cc-5','cc-6','cc-7','cc-8','cc-9','cc-10','cc-11'];
  grid.innerHTML=nomes.map((nome,i)=>{
    const em       = COLLAB_EMOJI[nome]||'👤';
    const setor    = COLLAB_SETOR[nome]||'';
    const cnt      = map[nome];
    const cor      = cores[i%cores.length];
    const ne       = nome.replace(/'/g,"\\'");
    const sessStatus=sessMap[nome];
    const jaFinaliz=!!sessStatus;
    const isCompleto=sessStatus==='completo';
    const tipoFalta=faltaMap[nome];
    let overlay='';
    if (tipoFalta) {
      const isNJ=tipoFalta==='nao_justificada';
      overlay=`<div class="collab-done-overlay ${isNJ?'done-falta-nj':'done-falta-j'}" style="pointer-events:none">${isNJ?'🚫 Falta N/J':'📋 Falta Just.'}</div>`;
    } else if (jaFinaliz) {
      overlay=`<div class="collab-done-overlay ${isCompleto?'done-100':'done-parcial'}" style="pointer-events:none">${isCompleto?'✅ Finalizado 100%':'⚠️ Parcial'}</div>`;
    }
    let acao;
    if (tipoFalta&&S.leaderOk)  acao=`_gerenciarFalta('${ne}','${tipoFalta}','remover')`;
    else if (jaFinaliz)          acao=`_clickColab('${ne}','__reabrir__')`;
    else                         acao=`_clickColab('${ne}','__selecionar__')`;
    const btnFalta=(S.leaderOk&&!tipoFalta&&!jaFinaliz)
      ?`<button class="btn-falta-card" onclick="event.stopPropagation();_abrirModalFalta('${ne}')">🚫 Falta</button>`:'';
    return `<div class="collab-card-wrap">
      <button class="collab-card ${cor}${jaFinaliz?' collab-done':''}${tipoFalta?' collab-falta':''}" onclick="${acao}">
        <div class="collab-emoji">${em}</div>
        <span class="collab-name">${nome}</span>
        ${setor?`<span class="collab-setor">${setor}</span>`:''}
        <span class="collab-count">📋 ${cnt} tarefa${cnt!==1?'s':''}</span>
        ${overlay}
      </button>${btnFalta}</div>`;
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
    const reabrir=()=>{
      const pw2=prompt('🔑 Confirme com a senha do líder:');
      if (pw2===LEADER_PASSWORD) _reabrirTurnoColab(nome);
      else if (pw2!==null) showToast('❌ Senha incorreta');
    };
    if (pw) _abrirModalSenha(COLLAB_EMOJI[nome.toUpperCase()]||'👤',nome,'Senha para continuar',pw,reabrir);
    else reabrir();
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
    const sf=sessoes.filter(s=>s.colaborador_card===nome&&s.data===dt&&s.turno===S.turno&&s.dia_semana===S.dia);
    const pf=pendencias.filter(p=>p.colaborador===nome&&p.data===dt&&p.turno===S.turno&&p.dia_semana===S.dia);
    const rf=registros.filter(r=>r.colaborador_card===nome&&r.data===dt&&r.turno===S.turno&&r.dia_semana===S.dia);
    await Promise.all([...sf.map(s=>_fbDelete('sessoes',s.id)),...pf.map(p=>_fbDelete('pendencias',p.id)),...(isAtend?rf.map(r=>_fbDelete('registros',r.id)):[] )]);
    _invalidarCache();
    showToast('🔓 Turno reaberto para '+nome);
    _mostrarTelaSetor(_deptAtual);
  } catch(e) { showToast('❌ Erro ao reabrir turno'); }
  finally { showLoading(false); }
}

/* ══ FALTAS ══════════════════════════════════════════════ */
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
    const ov=document.getElementById('_modal_falta');
    if (ov) ov.style.display='none';
    _invalidarCache(); _cache._faltas=null;
    showToast('✅ Falta registrada!');
    _mostrarTelaSetor(_deptAtual);
  } catch(e) { showToast('❌ Erro ao registrar falta'); }
}

async function _gerenciarFalta(nome,tipo,acao) {
  if (acao==='remover'&&S.leaderOk) {
    if (!confirm(`Remover a falta de ${nome}?`)) return;
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
  S.sessaoId='sess_'+Date.now(); S.producaoIniciada=false;
  _atendRegIds={};
  const isAtend=ATEND_COLABS.includes(nome.toUpperCase());
  showLoading(true);
  try {
    const todasTarefas=await _fbGetAll('tarefas');
    _cache.tarefas=todasTarefas;
    S.tarefas=todasTarefas
      .filter(t=>t.turno===S.turno&&t.dia_semana===S.dia&&t.colaborador===nome)
      .sort((a,b)=>(a.ordem||0)-(b.ordem||0));
    if (!S.tarefas.length) { showToast('😕 Sem tarefas para este colaborador'); return; }
    if (isAtend) await _carregarRegistrosAtendimento(nome);
    _setNavChips(nome);
    if (isAtend) { _prepararModoAtendimento(); renderStep2(); }
    else renderStep1();
    showScreen('screen-step1');
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
  if (banner) banner.className='step-banner step-banner-2';
  const bIcon=document.getElementById('prod-banner-icon'); if (bIcon) bIcon.textContent='✅';
  const bTitle=document.getElementById('prod-banner-title'); if (bTitle) bTitle.textContent='Modo Atendimento — Finalização';
  const bSub=document.getElementById('prod-banner-sub'); if (bSub) bSub.textContent='Marque as tarefas conforme forem concluídas';
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
  if (banner) {
    banner.className='step-banner step-banner-1';
    const bIcon=document.getElementById('prod-banner-icon'); if (bIcon) bIcon.textContent='📋';
    const bTitle=document.getElementById('prod-banner-title'); if (bTitle) bTitle.textContent='Etapa 1 — Programe as quantidades';
    const bSub=document.getElementById('prod-banner-sub'); if (bSub) bSub.textContent='Toque em cada card para definir estoque e quantidade a produzir';
  }

  list.innerHTML=S.tarefas.map(t=>{
    const cc=getCatColor(t.categoria);
    const ce=getCatEmoji(t.categoria);
    const ck=isChecklist(t);
    const conf=S.s1[t.id];
    const isConf=conf&&conf.confirmed;
    return `<div class="task-card s1-card${isConf?' task-confirmed':''}" id="s1c-${t.id}" onclick="openS1Modal('${t.id}')">
      <div class="task-card-header" style="background:${cc}">
        <span class="cat-label">${ce} ${t.categoria||'Geral'}</span>
        ${isConf?'<span class="task-check-badge">✅</span>':''}
      </div>
      <div class="task-card-body">
        <div class="task-name">${t.item}</div>
        ${ck?'<div class="task-qty-display">✓ Execução</div>'
            :`<div class="task-qty-display">${isConf?`<strong>${fmt(conf.programada)}</strong> ${t.unidade||''}`:`Padrão: ${fmt(t.quantidade_padrao)} ${t.unidade||''}`}</div>`}
      </div></div>`;
  }).join('');

  const pInfo     =document.getElementById('btn-pending-info');
  const pTxt      =document.getElementById('pending-count-text');
  const s1done    =document.getElementById('s1-done-footer');
  const concludeBtn=document.getElementById('btn-conclude');
  if (!S.producaoIniciada) {
    if (pInfo) pInfo.style.display='flex';
    if (pTxt)  pTxt.textContent='Toque nos cards acima para programar';
    if (s1done) s1done.classList.add('hidden');
    if (concludeBtn) concludeBtn.classList.add('hidden');
  } else {
    if (allConfirmed) {
      if (pInfo) pInfo.style.display='none';
      if (s1done) s1done.classList.remove('hidden');
    } else {
      if (pInfo) pInfo.style.display='flex';
      if (pTxt)  pTxt.textContent=`${total-confirmed} item(s) ainda não programado(s)`;
      if (s1done) s1done.classList.add('hidden');
    }
    if (concludeBtn) concludeBtn.classList.add('hidden');
  }
}

let _s1Id=null;
function openS1Modal(id) {
  const t=S.tarefas.find(x=>x.id===id);
  if (!t) return;
  // Inicia produção automaticamente ao clicar no primeiro card
  if (!S.producaoIniciada) { S.producaoIniciada=true; }
  _s1Id=id;
  const ck  =isChecklist(t);
  const conf=S.s1[id]||{};
  document.getElementById('modal-s1-title').textContent=t.item;
  document.getElementById('modal-s1-cat').textContent=t.categoria||'';
  document.getElementById('modal-s1-header').style.background=getCatColor(t.categoria);
  const qtyMode=document.getElementById('s1-qty-mode');
  const ckMode =document.getElementById('s1-checklist-mode');
  if (qtyMode) qtyMode.style.display=ck?'none':'';
  if (ckMode)  ckMode.classList.toggle('hidden',!ck);
  if (!ck) {
    const padrao      =Number(t.quantidade_padrao)||0;
    const estoqueAtual=conf.estoque!==undefined?conf.estoque:0;
    document.getElementById('modal-s1-estoque').textContent=estoqueAtual;
    document.getElementById('modal-s1-unidade').textContent=t.unidade||'un';
    document.getElementById('calc-padrao').textContent=fmt(padrao)+' '+(t.unidade||'');
    document.getElementById('calc-estoque').textContent=estoqueAtual;
    document.getElementById('modal-s1-prog').textContent=conf.programada!==undefined?conf.programada:(padrao>estoqueAtual?padrao-estoqueAtual:0);
    document.getElementById('modal-s1-unit2').textContent=t.unidade||'';
    _calcNecessario();
  }
  document.getElementById('modal-s1').classList.remove('hidden');
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
  let est=0,prog=1;
  if (!ck) {
    est=Number(document.getElementById('modal-s1-estoque').textContent)||0;
    prog=Number(document.getElementById('modal-s1-prog').textContent)||0;
  }
  S.s1[_s1Id]={estoque:est,programada:prog,confirmed:true};
  closeModal('modal-s1');
  renderStep1();
}

function iniciarProducao() {
  S.producaoIniciada=true;
  renderStep2();
}

function doPrintDirect() { printColaborador(); }

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
    return `<div class="task-card s2-card ${stClass}" id="s2c-${t.id}" onclick="openS2Modal('${t.id}')">
      <div class="task-card-header" style="background:${cc}">
        <span class="cat-label">${ce} ${t.categoria||'Geral'}</span>
        ${isConf?`<span class="task-check-badge">${stBadge}</span>`:''}
      </div>
      <div class="task-card-body">
        <div class="task-name">${t.item}</div>
        ${ck?`<div class="task-qty-display">${isConf?(status==='total'?'✅ Feito':'❌ Não feito'):'⏳ Pendente'}</div>`
            :`<div class="task-qty-display">${isConf?`<span>${fmt(d2.produzida)}/${fmt(prog)} ${t.unidade||''}</span>`:`<span>Prog: ${fmt(prog)} ${t.unidade||''}</span>`}</div>`}
      </div></div>`;
  }).join('');

  const allDone   =S.tarefas.every(t=>S.s2[t.id]&&S.s2[t.id].status);
  const pInfo     =document.getElementById('btn-pending-info');
  const s1done    =document.getElementById('s1-done-footer');
  const concludeBtn=document.getElementById('btn-conclude');
  if (pInfo) pInfo.style.display='none';
  if (s1done) s1done.classList.add('hidden');
  if (concludeBtn) concludeBtn.classList.toggle('hidden',!allDone);
}

let _s2Id=null,_s2Status=null,_s2Motivo=null;

function openS2Modal(id) {
  const t=S.tarefas.find(x=>x.id===id); if (!t) return;
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
  const mw =document.getElementById('motivos-wrap');  if (mw)  mw.classList.add('hidden');
  const mc =document.getElementById('motivo-custom'); if (mc)  mc.value='';
  document.querySelectorAll('.motivo-btn').forEach(b=>b.classList.remove('active'));
  if (_s2Motivo) {
    const mb=document.querySelector(`.motivo-btn[onclick*="${_s2Motivo.replace(/'/g,"\\'")}"]`);
    if (mb) mb.classList.add('active');
  }
  document.getElementById('modal-s2').classList.remove('hidden');
}

function selectStatus(status) {
  _s2Status=status;
  document.querySelectorAll('.sbtn').forEach(b=>b.classList.remove('active'));
  const ab=document.querySelector(`.sbtn[data-status="${status}"]`);
  if (ab) ab.classList.add('active');
  const qpw=document.getElementById('qty-prod-wrap');
  const mw =document.getElementById('motivos-wrap');
  if (qpw) qpw.classList.toggle('hidden',status!=='parcial');
  if (mw)  mw.classList.toggle('hidden',status==='total');
}

function selectMotivo(motivo) {
  _s2Motivo=motivo;
  document.querySelectorAll('.motivo-btn').forEach(b=>b.classList.toggle('active',b.getAttribute('onclick')&&b.getAttribute('onclick').includes(motivo)));
}

async function confirmS2() {
  if (!_s2Status) { showToast('⚠️ Selecione um status!'); return; }
  const t=S.tarefas.find(x=>x.id===_s2Id);
  const ck=isChecklist(t);
  let prod=1;
  if (!ck&&_s2Status==='parcial') {
    prod=Number(document.getElementById('modal-s2-prod').textContent)||0;
  }
  if (_s2Status!=='total'&&!_s2Motivo) {
    const inp=document.getElementById('motivo-custom');
    const mv=inp?inp.value.trim():'';
    if (!mv) { shakeEl('motivos-wrap'); showToast('⚠️ Informe o motivo!'); return; }
    _s2Motivo=mv;
  }
  if (_s2Status==='total')        prod=ck?1:(S.s1[_s2Id]||{}).programada||t.quantidade_padrao||0;
  if (_s2Status==='nao_finalizado') prod=0;
  S.s2[_s2Id]={produzida:prod,status:_s2Status,motivo:_s2Motivo};
  closeModal('modal-s2');
  renderStep2();

  /* Salvar no Firebase em background */
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
  const regExist=isAtend?_atendRegIds[_s2Id]:null;
  if (isAtend&&regExist) {
    _fbPatch('registros',regExist,{quantidade_produzida:prod,status:_s2Status,motivo:_s2Motivo,hora_registro:new Date().toLocaleTimeString('pt-BR')}).catch(console.error);
  } else {
    _fbPost('registros',payload).then(res=>{
      if (isAtend&&res?.id&&_s2Id) _atendRegIds[_s2Id]=res.id;
    }).catch(console.error);
  }
}

/* ══ CONCLUIR TURNO ══════════════════════════════════════ */
function openFinishModal() {
  const total  =S.tarefas.length;
  const totais =Object.values(S.s2).filter(d=>d.status==='total').length;
  const parciais=Object.values(S.s2).filter(d=>d.status==='parcial').length;
  const nao    =Object.values(S.s2).filter(d=>d.status==='nao_finalizado').length;
  document.getElementById('finish-summary').innerHTML=`
    <div class="finish-row"><span>📋 Total de tarefas</span><span class="finish-num">${total}</span></div>
    <div class="finish-row"><span>✅ Finalizadas 100%</span><span class="finish-num" style="color:#16a34a">${totais}</span></div>
    <div class="finish-row"><span>⚠️ Parcialmente</span><span class="finish-num" style="color:#d97706">${parciais}</span></div>
    <div class="finish-row"><span>❌ Não executadas</span><span class="finish-num" style="color:#dc2626">${nao}</span></div>`;
  document.getElementById('finish-obs').value='';
  document.getElementById('modal-finish').classList.remove('hidden');
}

async function finalizarTurno() {
  const total =S.tarefas.length;
  const totais=Object.values(S.s2).filter(d=>d.status==='total').length;
  const obs   =document.getElementById('finish-obs').value.trim();
  const completo=totais===total;
  const dt=S.dataTrabalho||today();
  showLoading(true);
  try {
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
  if (!completo) _autoPrintPendencias(S.tarefas.slice(),{...S.s1},{...S.s2},S.colaborador,S.turno,S.dia);

  S.s1={}; S.s2={}; S.producaoIniciada=false;
  _cache.sessoes=null; _cache._registros=null;
  _checkPendenciasNotif();
  showToast(completo?'🎉 Turno finalizado!':'✅ Turno encerrado!');
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
    return `<tr><td>${t.categoria||''}</td><td>${t.item}</td>
      <td>${ck?'—':fmt(prog)+' '+(t.unidade||'')}</td>
      <td>${ck?'—':fmt(feito)+' '+(t.unidade||'')}</td>
      <td style="color:#c0392b;font-weight:900">${ck?'—':fmt(rest)+' '+(t.unidade||'')}</td>
      <td>${sl2[d2.status||'']}</td><td>${d2.motivo||'—'}</td></tr>`;
  }).join('');
  const html=`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>⚠️ Pendências — ${col}</title>
    <style>body{font-family:Arial,sans-serif;font-size:12px;padding:20px}h1{font-size:18px;margin:0 0 4px}
    p{font-size:12px;color:#555;margin:0 0 16px}table{width:100%;border-collapse:collapse}
    th,td{border:1px solid #ccc;padding:6px 8px;text-align:left}th{background:#f5f5f5;font-weight:700}</style>
    </head><body onload="window.print();setTimeout(function(){window.close()},500)">
    <h1>⚠️ Pendências — ${col}</h1>
    <p>Turno: ${turno==='dia'?'☀️ Dia':'🌙 Noite'} · ${dObj?dObj.label:dia} · ${today()}</p>
    <table><thead><tr><th>Categoria</th><th>Item</th><th>Programado</th><th>Produzido</th><th>Restante</th><th>Status</th><th>Motivo</th></tr></thead>
    <tbody>${linhas}</tbody></table></body></html>`;
  const w=window.open('','_blank','width=800,height=600');
  if (w) { w.document.write(html); w.document.close(); }
}

function printColaborador() {
  const dObj=DIAS_LIST.find(d=>d.key===S.dia);
  const linhas=S.tarefas.map(t=>{
    const d1=S.s1[t.id]||{}; const ck=isChecklist(t);
    return `<tr><td>${t.categoria||''}</td><td>${t.item}</td>
      <td>${ck?'Checklist':fmt(d1.programada!==undefined?d1.programada:t.quantidade_padrao)+' '+(t.unidade||'')}</td>
      <td style="width:60px"></td></tr>`;
  }).join('');
  const html=`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${S.colaborador}</title>
    <style>body{font-family:Arial,sans-serif;font-size:12px;padding:20px}h1{font-size:18px;margin:0 0 4px}
    table{width:100%;border-collapse:collapse}th,td{border:1px solid #ccc;padding:6px 8px;text-align:left}
    th{background:#f5f5f5;font-weight:700}</style>
    </head><body onload="window.print();setTimeout(function(){window.close()},500)">
    <h1>📋 ${S.colaborador}</h1>
    <p>Turno: ${S.turno==='dia'?'☀️ Dia':'🌙 Noite'} · ${dObj?dObj.label:S.dia} · ${today()}</p>
    <table><thead><tr><th>Categoria</th><th>Item</th><th>Qtd</th><th>✓</th></tr></thead>
    <tbody>${linhas}</tbody></table></body></html>`;
  const w=window.open('','_blank','width=700,height=500');
  if (w) { w.document.write(html); w.document.close(); }
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
  setResDia(diaAtual);
  showScreen('screen-resultados');
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
  const dia  =(document.getElementById('res-dia')||{}).value||'segunda';
  const data =((document.getElementById('res-data')||{}).value)||today();
  try {
    const [pendencias,sessoes]=await Promise.all([_fbGetAll('pendencias'),_fbGetAll('sessoes')]);
    const pends=pendencias.filter(p=>(!data||p.data===data)&&(!turno||p.turno===turno)&&(!dia||p.dia_semana===dia));
    const sess =sessoes.filter(s=>(!data||s.data===data)&&(!turno||s.turno===turno)&&(!dia||s.dia_semana===dia));
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
      <div class="res-task-actions">${isVist
        ?`<span class="res-btn-done"><i class="fas fa-check"></i> Ciente</span>`
        :`<button class="res-btn-ciente" onclick="_resCiente('${item.id}','${slug}')"><i class="fas fa-check"></i> Ciente</button>`
      }</div>
    </div>`;
  }).join('');
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
    if (el) { el.style.transition='all .3s'; el.style.opacity='0'; el.style.maxHeight='0'; el.style.overflow='hidden'; setTimeout(()=>{ el.remove(); _resVerificaVazio(slug); },300); }
    showToast('✅ Ciente registrado!');
  } catch(e) { showToast('❌ Erro ao registrar ciência'); }
}

function _resVerificaVazio(slug) {
  const tl=document.getElementById(`rtl-${slug}`);
  const cb=document.getElementById(`rcc-${slug}`);
  if (!tl||!cb) return;
  if (tl.querySelectorAll('.res-task-item').length===0) {
    cb.classList.add('res-all-done');
    const meta=cb.querySelector('.res-card-meta');
    if (meta) meta.textContent='✅ Todos os itens com ciência';
  }
}

function _resSlug(s)  { return (s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,'-'); }
function _resEmoji(n) { const e=['👨‍🍳','👩‍🍳','🧑‍🍳','😎','🙂','😊','🤩','👌','💪','🍔','⭐','🌟']; let s=0; for(let i=0;i<n.length;i++) s+=n.charCodeAt(i); return e[s%e.length]; }

/* ══ PAINEL DO LÍDER ═════════════════════════════════════ */
function setDefaultDates() {
  const hoje=today();
  const dt=new Date(); dt.setDate(dt.getDate()-7);
  const ini=dt.toISOString().slice(0,10);
  ['filter-start','filter-end','rel-start','rel-end'].forEach(id=>{
    const el=document.getElementById(id);
    if (el) el.value=id.includes('end')?hoje:ini;
  });
}

async function loadLeaderData() {
  showLoading(true);
  try {
    const ds =(document.getElementById('filter-start')||{}).value||'';
    const de =(document.getElementById('filter-end')||{}).value||'';
    const turno=(document.getElementById('filter-turno')||{}).value||'';
    const col=(document.getElementById('filter-colaborador')||{}).value||'';
    let data=await _fbGetAll('registros');
    if (ds)    data=data.filter(r=>r.data>=ds);
    if (de)    data=data.filter(r=>r.data<=de);
    if (turno) data=data.filter(r=>r.turno===turno);
    if (col)   data=data.filter(r=>r.colaborador_card===col);
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
  const nomes=[...new Set((all||[]).map(r=>r.colaborador_card).filter(Boolean))].sort();
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
    if (el) { el.style.transition='all .3s'; el.style.opacity='0'; el.style.maxHeight='0'; el.style.padding='0'; setTimeout(()=>el.remove(),300); }
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
    const colabsNoDia=[...new Set(all.filter(t=>t.turno===turno&&t.dia_semana===dia).map(t=>t.colaborador).filter(Boolean))].sort();
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

async function _populateTeColab(selected) {
  let cols=[...TODOS_COLABS];
  try {
    const banco=await _fbGetAll('tarefas');
    cols=[...new Set([...cols,...banco.map(t=>t.colaborador).filter(Boolean)])].sort();
  } catch(e) {}
  const sel=document.getElementById('te-colab'); if (!sel) return;
  sel.innerHTML='<option value="">— Selecione —</option>'+cols.map(c=>`<option value="${c}"${c===selected?' selected':''}>${c}</option>`).join('')+'<option value="__novo__">+ Outro (digitar)</option>';
}

async function saveTaskEdit() {
  const id=document.getElementById('te-id').value;
  let colab=document.getElementById('te-colab').value;
  if (colab==='__novo__') { colab=prompt('Nome do colaborador (MAIÚSCULAS):'); if (!colab) return; colab=colab.trim().toUpperCase(); }
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
  const html=`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${titulo}</title>
    <style>body{font-family:Arial,sans-serif;font-size:11px;padding:20px}h1{font-size:16px;margin:0 0 2px}p{font-size:11px;color:#555;margin:0 0 12px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ccc;padding:5px 7px;text-align:left}th{background:#f0f0f0;font-weight:700}tr:nth-child(even) td{background:#fafafa}</style>
    </head><body onload="window.print();setTimeout(function(){window.close()},500)"><h1>${titulo}</h1><p>${sub}</p>
    <table><thead>${headerRow}</thead><tbody>${linhas}</tbody></table></body></html>`;
  const w=window.open('','_blank','width=900,height=700');
  if (w) { w.document.write(html); w.document.close(); }
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

function closeModal(id) { const el=document.getElementById(id); if (el) el.classList.add('hidden'); }
function shakeEl(id)    { const el=document.getElementById(id); if (!el) return; el.classList.add('shake'); setTimeout(()=>el.classList.remove('shake'),500); }
function fmt(n)  { if (n===null||n===undefined||n==='') return '—'; return Number(n).toLocaleString('pt-BR'); }
function today() { return new Date().toISOString().slice(0,10); }
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

console.log('🍔 Just Burger — app_v3.js carregado!');
