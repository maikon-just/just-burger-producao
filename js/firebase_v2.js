/* ═══════════════════════════════════════════════════════════
   JUST BURGER 🍔 — firebase_v2.js
═══════════════════════════════════════════════════════════ */

const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyDt1yzxGGzuT2cSdten1bFuXG7yeDQ90Po",
  authDomain:        "justburger-producao-e9b27.firebaseapp.com",
  databaseURL:       "https://justburger-producao-e9b27-default-rtdb.firebaseio.com",
  projectId:         "justburger-producao-e9b27",
  storageBucket:     "justburger-producao-e9b27.firebasestorage.app",
  messagingSenderId: "387070713910",
  appId:             "1:387070713910:web:f156d3247a1715a58ab897"
};

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG);
}
const fbDB_v2 = firebase.database();
window.fbDB_v2 = fbDB_v2;

function _snapToList(snap) {
  const val = snap.val();
  if (!val) return [];
  return Object.entries(val).map(([id, obj]) => ({ id, ...obj }));
}
function _ts() { return Date.now(); }

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
  const ref = fbDB_v2.ref(col).push();
  const obj = { ...data, created_at: _ts(), updated_at: _ts() };
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

window.FB2 = { getAll: fbv2_getAll, getOne: fbv2_getOne, post: fbv2_post, patch: fbv2_patch, put: fbv2_put, delete: fbv2_delete };
window.fbv2_getAll = fbv2_getAll;
window.fbv2_getOne = fbv2_getOne;
window.fbv2_post   = fbv2_post;
window.fbv2_patch  = fbv2_patch;
window.fbv2_put    = fbv2_put;
window.fbv2_delete = fbv2_delete;

console.log('🔥 Just Burger — Firebase Realtime DB conectado!');
