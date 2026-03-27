/* ═══════════════════════════════════════════════════════
   JUST BURGER 🍔 — data.js
═══════════════════════════════════════════════════════ */

const COLABORADORES_DIA = {
  segunda: ['ALAN RICARDO','ATENDIMENTO / DESPACHO','SAMUEL','DINA','LOHAINE','GABRIEL KHALYL','JOÃO','PABLO','MATEUS'],
  terca:   ['ALAN RICARDO','ATENDIMENTO / DESPACHO','SAMUEL','DINA','LOHAINE','GABRIEL KHALYL','JOÃO','PABLO','MATEUS'],
  quarta:  ['ALAN RICARDO','ATENDIMENTO / DESPACHO','SAMUEL','DINA','LOHAINE','GABRIEL KHALYL','JOÃO','PABLO','MATEUS'],
  quinta:  ['ALAN RICARDO','ATENDIMENTO / DESPACHO','SAMUEL','DINA','LOHAINE','GABRIEL KHALYL','JOÃO','PABLO','MATEUS'],
  sexta:   ['ALAN RICARDO','ATENDIMENTO / DESPACHO','SAMUEL','DINA','LOHAINE','GABRIEL KHALYL','JOÃO','PABLO','MATEUS'],
  sabado:  ['ALAN RICARDO','GABRIEL LEITE','DINA','RHUAN','GABRIEL KHALYL','JOÃO','PABLO'],
  domingo: ['ALAN RICARDO','SAMUEL','DINA','LOHAINE','GABRIEL KHALYL','JOÃO','PABLO'],
};

const COLABORADORES_NOITE = {
  segunda: ['SANDRO','NOITE - MONTADOR','NOITE - CHAPEIRO','NOITE - FRITADEIRA'],
  terca:   ['SANDRO','NOITE - MONTADOR','NOITE - CHAPEIRO','NOITE - FRITADEIRA'],
  quarta:  ['SANDRO','NOITE - MONTADOR','NOITE - CHAPEIRO','NOITE - FRITADEIRA'],
  quinta:  ['SANDRO','NOITE - MONTADOR','NOITE - CHAPEIRO','NOITE - FRITADEIRA'],
  sexta:   ['SANDRO','NOITE - MONTADOR','NOITE - CHAPEIRO','NOITE - FRITADEIRA'],
  sabado:  ['SANDRO','NOITE - MONTADOR','NOITE - CHAPEIRO','NOITE - FRITADEIRA'],
  domingo: ['SANDRO','NOITE - MONTADOR','NOITE - CHAPEIRO','NOITE - FRITADEIRA'],
};

const SETORES = {
  'ALAN RICARDO':           'Ilha dia / Chapeiro',
  'SAMUEL':                 'Ilha dia / Montador',
  'GABRIEL LEITE':          'Ilha dia / Montador',
  'DINA':                   'Supervisão',
  'LOHAINE':                'Ilha dia / Fritadeira',
  'RHUAN':                  'Ilha dia / Fritadeira',
  'GABRIEL KHALYL':         'Pré-preparo / Hambúrguer',
  'JOÃO':                   'Pré-preparo / Cozinha',
  'PABLO':                  'Pré-preparo / Estagiário',
  'MATEUS':                 'Pré-preparo / Sachês',
  'ATENDIMENTO / DESPACHO': 'Atendimento',
  'SANDRO':                 'Supervisão Noite',
  'NOITE - MONTADOR':       'Ilha noite / Montador',
  'NOITE - CHAPEIRO':       'Ilha noite / Chapeiro',
  'NOITE - FRITADEIRA':     'Ilha noite / Fritadeira',
};

const AVATARS = {
  'ALAN RICARDO':           '🔥',
  'SAMUEL':                 '🧊',
  'GABRIEL LEITE':          '🧊',
  'DINA':                   '👩‍💼',
  'LOHAINE':                '🍟',
  'RHUAN':                  '🍟',
  'GABRIEL KHALYL':         '🥩',
  'JOÃO':                   '🔪',
  'PABLO':                  '🍗',
  'MATEUS':                 '🥫',
  'ATENDIMENTO / DESPACHO': '📦',
  'SANDRO':                 '👨‍💼',
  'NOITE - MONTADOR':       '🧊',
  'NOITE - CHAPEIRO':       '🔥',
  'NOITE - FRITADEIRA':     '🍟',
};

const DIAS = [
  { key: 'segunda', label: 'Segunda-feira', short: 'SEG' },
  { key: 'terca',   label: 'Terça-feira',   short: 'TER' },
  { key: 'quarta',  label: 'Quarta-feira',  short: 'QUA' },
  { key: 'quinta',  label: 'Quinta-feira',  short: 'QUI' },
  { key: 'sexta',   label: 'Sexta-feira',   short: 'SEX' },
  { key: 'sabado',  label: 'Sábado',        short: 'SAB' },
  { key: 'domingo', label: 'Domingo',       short: 'DOM' },
];
