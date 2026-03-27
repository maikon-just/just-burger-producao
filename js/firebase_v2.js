/* ═══════════════════════════════════════════════════════════
   JUST BURGER 🍔 — firebase_v2.js
   Banco de dados: Firebase Realtime Database
   Padrão COMPAT (igual Escala Motoboys / Pagamento Diário)
   ✅ SEM módulos ES — carregado com <script src="...">
   ✅ Expõe window.FB e funções globais
═══════════════════════════════════════════════════════════ */

/* ── Configuração Firebase ─────────────────────────────── */
const FIREBASE_CONFIG_V2 = {
  apiKey:            "AIzaSyDt1yzxGGzuT2cSdten1bFuXG7yeDQ90Po",
  authDomain:        "justburger-producao-e9b27.firebaseapp.com",
  databaseURL:       "https://justburger-producao-e9b27-default-rtdb.firebaseio.com",
  projectId:         "justburger-producao-e9b27",
  storageBucket:     "justburger-producao-e9b27.firebasestorage.app",
  messagingSenderId: "387070713910",
  appId:             "1:387070713910:web:f156d3247a1715a58ab897"
};

/* ── Init ─────────────────────────────────────────────── */
if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG_V2);
}
const fbDB_v2 = firebase.database();

/* ── Helpers ──────────────────────────────────────────── */
function _snapToList(snap) {
  const val = snap.val();
  if (!val) return [];
  return Object.entries(val).map(([id, obj]) => ({ id, ...obj }));
}

function _ts() {
  return Date.now();
}

/* ══════════════════════════════════════════════════════
   CRUD GENÉRICO
══════════════════════════════════════════════════════ */

function fbv2_getAll(col) {
  return fbDB_v2.ref(col).once('value').then(snap => _snapToList(snap));
}

function fbv2_getOne(col, id) {
  return fbDB_v2.ref(col + '/' + id).once('value').then(snap => {
    if (!snap.exists()) return null;
    return { id: snap.key, ...snap.val() };
  });
}

function fbv2_post(col, data) {
  const ref  = fbDB_v2.ref(col).push();
  const obj  = { ...data, created_at: _ts(), updated_at: _ts() };
  return ref.set(obj).then(() => ({ id: ref.key, ...obj }));
}

function fbv2_patch(col, id, data) {
  const obj = { ...data, updated_at: _ts() };
  return fbDB_v2.ref(col + '/' + id).update(obj).then(() => ({ id, ...obj }));
}

function fbv2_put(col, id, data) {
  const obj = { ...data, updated_at: _ts() };
  return fbDB_v2.ref(col + '/' + id).set(obj).then(() => ({ id, ...obj }));
}

function fbv2_delete(col, id) {
  return fbDB_v2.ref(col + '/' + id).remove();
}

/* ══════════════════════════════════════════════════════
   ATALHOS POR COLEÇÃO
══════════════════════════════════════════════════════ */

function getTarefasV2()            { return fbv2_getAll('tarefas'); }
function getTarefaV2(id)           { return fbv2_getOne('tarefas', id); }
function postTarefaV2(data)        { return fbv2_post('tarefas', data); }
function patchTarefaV2(id, data)   { return fbv2_patch('tarefas', id, data); }
function putTarefaV2(id, data)     { return fbv2_put('tarefas', id, data); }
function deleteTarefaV2(id)        { return fbv2_delete('tarefas', id); }

function getSessoesV2()            { return fbv2_getAll('sessoes'); }
function postSessaoV2(data)        { return fbv2_post('sessoes', data); }
function deleteSessaoV2(id)        { return fbv2_delete('sessoes', id); }

function getRegistrosV2()          { return fbv2_getAll('registros'); }
function postRegistroV2(data)      { return fbv2_post('registros', data); }
function patchRegistroV2(id, data) { return fbv2_patch('registros', id, data); }
function deleteRegistroV2(id)      { return fbv2_delete('registros', id); }

function getPendenciasV2()          { return fbv2_getAll('pendencias'); }
function postPendenciaV2(data)      { return fbv2_post('pendencias', data); }
function patchPendenciaV2(id, data) { return fbv2_patch('pendencias', id, data); }
function deletePendenciaV2(id)      { return fbv2_delete('pendencias', id); }

function getFaltasV2()              { return fbv2_getAll('faltas'); }
function postFaltaV2(data)          { return fbv2_post('faltas', data); }
function deleteFaltaV2(id)          { return fbv2_delete('faltas', id); }

/* ══════════════════════════════════════════════════════
   EXPÕE GLOBALMENTE
══════════════════════════════════════════════════════ */
window.fbDB_v2 = fbDB_v2;
window.FB2 = {
  getAll:  fbv2_getAll,
  getOne:  fbv2_getOne,
  post:    fbv2_post,
  patch:   fbv2_patch,
  put:     fbv2_put,
  delete:  fbv2_delete,
  getTarefas:      getTarefasV2,
  getTarefa:       getTarefaV2,
  postTarefa:      postTarefaV2,
  patchTarefa:     patchTarefaV2,
  putTarefa:       putTarefaV2,
  deleteTarefa:    deleteTarefaV2,
  getSessoes:      getSessoesV2,
  postSessao:      postSessaoV2,
  deleteSessao:    deleteSessaoV2,
  getRegistros:    getRegistrosV2,
  postRegistro:    postRegistroV2,
  patchRegistro:   patchRegistroV2,
  deleteRegistro:  deleteRegistroV2,
  getPendencias:   getPendenciasV2,
  postPendencia:   postPendenciaV2,
  patchPendencia:  patchPendenciaV2,
  deletePendencia: deletePendenciaV2,
  getFaltas:       getFaltasV2,
  postFalta:       postFaltaV2,
  deleteFalta:     deleteFaltaV2,
};

window.getTarefasV2      = getTarefasV2;
window.getTarefaV2       = getTarefaV2;
window.postTarefaV2      = postTarefaV2;
window.patchTarefaV2     = patchTarefaV2;
window.putTarefaV2       = putTarefaV2;
window.deleteTarefaV2    = deleteTarefaV2;
window.getSessoesV2      = getSessoesV2;
window.postSessaoV2      = postSessaoV2;
window.deleteSessaoV2    = deleteSessaoV2;
window.getRegistrosV2    = getRegistrosV2;
window.postRegistroV2    = postRegistroV2;
window.patchRegistroV2   = patchRegistroV2;
window.deleteRegistroV2  = deleteRegistroV2;
window.getPendenciasV2   = getPendenciasV2;
window.postPendenciaV2   = postPendenciaV2;
window.patchPendenciaV2  = patchPendenciaV2;
window.deletePendenciaV2 = deletePendenciaV2;
window.getFaltasV2       = getFaltasV2;
window.postFaltaV2       = postFaltaV2;
window.deleteFaltaV2     = deleteFaltaV2;

console.log('🔥 Just Burger — Firebase Realtime DB v2 (compat) conectado!');
