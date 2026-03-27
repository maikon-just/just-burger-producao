/* ═══════════════════════════════════════════════════════
   JUST BURGER 🍔 — Controle de Produção
   css/style.css — Design tablet-first v4 (Colorido)
═══════════════════════════════════════════════════════ */

/* ── Reset & Base ────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --font: 'Nunito', sans-serif;

  /* Paleta Principal */
  --black: #111111;
  --white: #FFFFFF;
  --gray-50: #F8F9FA;
  --gray-100: #F1F3F5;
  --gray-200: #E9ECEF;
  --gray-300: #DEE2E6;
  --gray-400: #CED4DA;
  --gray-500: #ADB5BD;
  --gray-600: #6C757D;
  --gray-700: #495057;
  --gray-800: #343A40;
  --gray-900: #212529;

  /* Status */
  --yellow: #FFC107;
  --yellow-light: #FFF9E6;
  --yellow-dark: #E6A800;
  --green: #28A745;
  --green-light: #E8F5E9;
  --green-dark: #1E7E34;
  --red: #DC3545;
  --red-light: #FDECEA;
  --orange: #FD7E14;
  --orange-light: #FFF3E0;
  --blue: #007BFF;
  --blue-light: #E3F2FD;
  --purple: #6F42C1;
  --purple-light: #F3E5F5;
  --teal: #20C997;
  --teal-light: #E0F7FA;
  --pink: #E91E63;
  --pink-light: #FCE4EC;

  /* Category Colors */
  --cat-pré-preparo: #FF6B6B;
  --cat-produção: #4ECDC4;
  --cat-sachês: #45B7D1;
  --cat-saladas: #96CEB4;
  --cat-fritadeira: #FFEAA7;
  --cat-hamburger: #DDA0DD;
  --cat-carnes: #FF8C00;
  --cat-molhos: #FFD700;
  --cat-câmaras: #87CEEB;
  --cat-abertura: #98FB98;
  --cat-supervisão: #DEB887;
  --cat-limpeza: #B0E0E6;
  --cat-pães: #F4A460;
  --cat-maionese: #FFFACD;
  --cat-preparo: #FFA07A;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.12);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.16);
  --shadow-xl: 0 16px 48px rgba(0,0,0,0.2);

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-full: 999px;
}

html, body {
  height: 100%;
  overflow: hidden;
  font-family: var(--font);
  background: var(--gray-100);
  color: var(--black);
  font-size: 16px;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

/* ── Screens ─────────────────────────────────────── */
.screen {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--gray-100);
  animation: slideIn 0.25s ease;
  z-index: 10; /* explícito para que modais (z-index:9998+) apareçam sempre acima */
}
.screen.hidden { display: none !important; }

@keyframes slideIn {
  from { opacity: 0; transform: translateX(20px); }
  to   { opacity: 1; transform: translateX(0); }
}

/* ── Loading Overlay ─────────────────────────────── */
.loading-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.72);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 999999; /* acima de todos os modais dinâmicos */
  gap: 16px;
  text-align: center;
}
.loading-overlay.hidden { display: none !important; }

.loading-spinner {
  font-size: 52px;
  display: block;
  animation: spin 0.85s linear infinite;
  line-height: 1;
}
@keyframes spin { to { transform: rotate(360deg); } }

.loading-overlay p {
  color: white;
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  text-align: center;
}

/* ── Toast ───────────────────────────────────────── */
.toast {
  position: fixed;
  bottom: 140px;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  background: var(--gray-900);
  color: white;
  padding: 12px 24px;
  border-radius: var(--radius-full);
  font-size: 14px;
  font-weight: 700;
  z-index: 5000;
  box-shadow: var(--shadow-lg);
  opacity: 0;
  transition: all 0.3s ease;
  white-space: nowrap;
}
.toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
.toast.hidden { display: none; }

/* ══════════════════════════════════════════════════
   TELA 0 — LOGIN LÍDER
══════════════════════════════════════════════════ */
.login-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
  gap: 24px;
}

.login-brand {
  text-align: center;
  color: white;
}
.login-logo {
  font-size: 56px;
  margin-bottom: 8px;
}
.login-brand h1 {
  font-size: 28px;
  font-weight: 900;
  margin-bottom: 4px;
}
.login-brand p {
  color: var(--gray-400);
  font-size: 14px;
}

.login-card {
  background: white;
  border-radius: var(--radius-xl);
  padding: 32px 28px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  box-shadow: var(--shadow-xl);
}
.login-icon {
  font-size: 40px;
  margin-bottom: 12px;
}
.login-card h2 {
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 6px;
}
.login-sub {
  color: var(--gray-600);
  font-size: 14px;
  margin-bottom: 20px;
}

.pass-input-wrap {
  position: relative;
  margin-bottom: 8px;
}
.pass-input-wrap input {
  width: 100%;
  padding: 14px 48px 14px 16px;
  border: 2px solid var(--gray-300);
  border-radius: var(--radius-md);
  font-size: 16px;
  font-family: var(--font);
  outline: none;
  transition: border-color 0.2s;
}
.pass-input-wrap input:focus {
  border-color: var(--black);
}
.pass-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--gray-500);
  cursor: pointer;
  font-size: 16px;
  padding: 4px;
}

.login-error {
  color: var(--red);
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 12px;
  padding: 8px;
  background: var(--red-light);
  border-radius: var(--radius-sm);
}
.login-error.hidden { display: none; }

.btn-enter {
  width: 100%;
  padding: 14px;
  background: var(--black);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: 16px;
  font-weight: 800;
  font-family: var(--font);
  cursor: pointer;
  margin-bottom: 12px;
  transition: background 0.2s;
}
.btn-enter:hover { background: var(--gray-800); }

.btn-back-ghost {
  width: 100%;
  padding: 12px;
  background: transparent;
  border: 2px solid var(--gray-300);
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 700;
  font-family: var(--font);
  cursor: pointer;
  color: var(--gray-600);
  transition: all 0.2s;
}
.btn-back-ghost:hover { border-color: var(--black); color: var(--black); }

/* ══════════════════════════════════════════════════
   TELA 1 — BOAS-VINDAS
══════════════════════════════════════════════════ */
.welcome-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 24px 16px;
  background: var(--black);
  color: white;
}
.welcome-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-align: center;
  width: 100%;
}
.welcome-emoji {
  font-size: 36px;
}
.welcome-brand h1 {
  font-size: 22px;
  font-weight: 900;
  line-height: 1.1;
}
.welcome-brand p {
  font-size: 12px;
  color: var(--gray-400);
}

.btn-leader-top {
  background: rgba(255,255,255,0.15);
  color: white;
  border: 1.5px solid rgba(255,255,255,0.3);
  border-radius: var(--radius-full);
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 700;
  font-family: var(--font);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background 0.2s;
}
.btn-leader-top:hover { background: rgba(255,255,255,0.25); }

.welcome-body {
  flex: 1;
  overflow-y: auto;
  padding: 28px 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
}

.welcome-hero {
  text-align: center;
  padding: 8px 0 4px;
}
.hero-emoji {
  font-size: 64px;
  margin-bottom: 12px;
}
.welcome-hero h2 {
  font-size: 26px;
  font-weight: 900;
  margin-bottom: 8px;
}
.welcome-hero p {
  color: var(--gray-600);
  font-size: 15px;
}

/* ── Seletor de Data de Trabalho ─────────────────────── */
.date-selector-wrap {
  width: 100%;
  max-width: 500px;
  background: linear-gradient(135deg, #fffbeb, #fff8e1);
  border: 2px solid var(--yellow);
  border-radius: var(--radius-xl);
  padding: 16px 20px;
  box-shadow: 0 4px 16px rgba(255,193,7,0.2);
}

.date-selector-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #7a6000;
  margin-bottom: 12px;
}

.date-selector-row {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.work-date-input {
  flex: 0 0 auto;
  padding: 10px 14px;
  border: 2px solid #e0c200;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 800;
  font-family: var(--font);
  background: white;
  color: #111;
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  -webkit-appearance: none;
}
.work-date-input:focus {
  border-color: #FFC107;
  box-shadow: 0 0 0 3px rgba(255,193,7,0.25);
}

.work-date-display {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.wdd-weekday {
  font-size: 18px;
  font-weight: 900;
  color: #111;
}
.wdd-date {
  font-size: 14px;
  font-weight: 700;
  color: #555;
}
.wdd-today-tag {
  background: #28a745;
  color: white;
  font-size: 10px;
  font-weight: 900;
  padding: 2px 8px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.shift-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  width: 100%;
  max-width: 500px;
}

.shift-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  border: 3px solid transparent;
  border-radius: var(--radius-xl);
  cursor: pointer;
  font-family: var(--font);
  text-align: center;
  transition: all 0.2s;
  gap: 8px;
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
}
.shift-day {
  background: linear-gradient(135deg, #FFF9C4, #FFE082);
  border-color: #FFC107;
}
.shift-night {
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  border-color: #3a3a6e;
  color: white;
}

.shift-badge {
  font-size: 44px;
  margin-bottom: 4px;
}
.shift-name {
  font-size: 17px;
  font-weight: 900;
}
.shift-sub {
  font-size: 12px;
  opacity: 0.7;
}
.shift-arrow {
  font-size: 18px;
  margin-top: 4px;
}

.shift-btn:active { transform: scale(0.97); }
.shift-day:hover  { box-shadow: var(--shadow-lg); transform: translateY(-2px); }
.shift-night:hover { box-shadow: var(--shadow-lg); transform: translateY(-2px); }

.welcome-footer {
  padding: 18px 20px 30px;
  background: #f8fafc;
  border-top: 1px solid var(--gray-200);
}
.btn-results-footer {
  width: 100%;
  padding: 14px;
  background: white;
  border: 2px solid var(--gray-300);
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 700;
  font-family: var(--font);
  cursor: pointer;
  color: var(--gray-700);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
}
.btn-results-footer:hover { border-color: var(--black); color: var(--black); }

/* ── Footer nav — cards retangulares modernos ── */
.footer-links-row {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  padding: 4px 0 2px;
}
.footer-link-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 76px;
  height: 72px;
  border-radius: 18px;
  font-size: 10px;
  font-weight: 800;
  font-family: var(--font);
  cursor: pointer;
  transition: transform 0.18s, box-shadow 0.18s;
  text-decoration: none;
  border: none;
  box-shadow: 0 4px 14px rgba(0,0,0,0.13);
  position: relative;
  text-align: center;
  line-height: 1.2;
  color: #fff;
  letter-spacing: 0.2px;
}
.footer-link-btn i {
  font-size: 22px;
  display: block;
  opacity: 0.95;
}
/* gradientes coloridos por botão */
.footer-link-blue   { background: linear-gradient(135deg, #4f8ef7 0%, #2563eb 100%); }
.footer-link-green  { background: linear-gradient(135deg, #34d978 0%, #16a34a 100%); }
.footer-link-dark   { background: linear-gradient(135deg, #94a3b8 0%, #475569 100%); }
.footer-link-export { background: linear-gradient(135deg, #2dd4bf 0%, #0d9488 100%); }
.footer-link-dash   { background: linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%); }
.footer-link-btn:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 8px 22px rgba(0,0,0,0.18);
}
.footer-link-btn:active { transform: scale(0.96); box-shadow: 0 2px 8px rgba(0,0,0,0.12); }
.notif-badge {
  position: absolute;
  top: -7px;
  right: -7px;
  background: #dc2626;
  color: #fff;
  font-size: 10px;
  font-weight: 900;
  min-width: 20px;
  height: 20px;
  border-radius: 20px;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.25);
  animation: badge-pulse 1.5s ease-in-out infinite;
  pointer-events: none;
}
@keyframes badge-pulse {
  0%,100% { transform: scale(1); }
  50%      { transform: scale(1.15); }
}

/* ══════════════════════════════════════════════════
   HEADER NAV
══════════════════════════════════════════════════ */
.nav-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: var(--black);
  color: white;
  flex-shrink: 0;
  min-height: 60px;
}

/* ── Tela de Departamento — seções com colaboradores ─────── */

/* Seção de departamento */
.dept-section {
  margin-bottom: 22px;
}

/* Cabeçalho da seção */
.dept-section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 14px;
  margin-bottom: 12px;
  user-select: none;
}
.dept-header-producao  { background: linear-gradient(135deg,#f97316,#ea580c); color:#fff; }
.dept-header-operacao  { background: linear-gradient(135deg,#34d978,#16a34a); color:#fff; }
.dept-header-atendimento { background: linear-gradient(135deg,#4f8ef7,#2563eb); color:#fff; cursor:pointer; }

.dept-section-emoji { font-size: 24px; line-height: 1; flex-shrink: 0; }
.dept-section-nome  { font-size: 17px; font-weight: 900; letter-spacing: 0.3px; flex: 1; }
.dept-lock-badge    {
  font-size: 10px; font-weight: 800; opacity: 0.9;
  background: rgba(0,0,0,0.2); padding: 3px 10px;
  border-radius: 20px; white-space: nowrap;
}

/* Grid de cards dos colaboradores dentro de cada seção */
.dept-collab-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
}

/* ── Botões da tela de seleção de departamento ─────────────── */
.dept-btn-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  padding: 0 4px;
  margin-top: 8px;
}

.dept-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 22px 10px 18px;
  border: none;
  border-radius: 20px;
  color: #fff;
  font-family: inherit;
  cursor: pointer;
  position: relative;
  box-shadow: 0 8px 24px rgba(0,0,0,0.18);
  transition: transform 0.18s, box-shadow 0.18s;
  text-align: center;
  min-height: 140px;
  aspect-ratio: 1 / 1;
}
.dept-btn:hover  { transform: translateY(-4px); box-shadow: 0 14px 32px rgba(0,0,0,0.22); }
.dept-btn:active { transform: scale(0.96); box-shadow: 0 2px 10px rgba(0,0,0,0.14); }

.dept-btn-producao    { background: linear-gradient(140deg,#fb923c,#ea580c); }
.dept-btn-operacao    { background: linear-gradient(140deg,#4ade80,#16a34a); }
.dept-btn-atendimento { background: linear-gradient(140deg,#60a5fa,#2563eb); }

.dept-btn-emoji { font-size: 40px; line-height: 1; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.18)); }
.dept-btn-nome  { font-size: 13px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.3px; line-height: 1.2; }
.dept-btn-lock  { font-size: 13px; opacity: 0.85; background: rgba(0,0,0,0.18); padding: 2px 8px; border-radius: 50px; }

.btn-back-circle {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(255,255,255,0.15);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
  transition: background 0.2s;
}
.btn-back-circle:hover { background: rgba(255,255,255,0.25); }

.nav-chips {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
}

.nav-chip {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 700;
  background: rgba(255,255,255,0.18);
  color: white;
}
.chip-day { background: rgba(255,193,7,0.35); }
.chip-user { background: rgba(40,167,69,0.35); }

.btn-print-header {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(255,255,255,0.15);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
  transition: background 0.2s;
}
.btn-print-header:hover { background: rgba(255,255,255,0.28); }

/* ══════════════════════════════════════════════════
   SCREEN BODY (scroll)
══════════════════════════════════════════════════ */
.screen-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px 16px 24px;
  -webkit-overflow-scrolling: touch;
}

.screen-intro {
  text-align: center;
  margin-bottom: 24px;
  padding: 8px 0;
}
.screen-intro-emoji {
  font-size: 48px;
  margin-bottom: 10px;
}
.screen-intro h2 {
  font-size: 22px;
  font-weight: 900;
  margin-bottom: 6px;
}
.screen-intro p {
  color: var(--gray-600);
  font-size: 14px;
}

/* ══════════════════════════════════════════════════
   TELA 2 — DIA DA SEMANA
══════════════════════════════════════════════════ */
.day-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 12px;
}

.day-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 18px 12px;
  border-radius: var(--radius-lg);
  border: 2.5px solid var(--gray-200);
  background: white;
  cursor: pointer;
  font-family: var(--font);
  font-weight: 700;
  font-size: 15px;
  gap: 6px;
  transition: all 0.2s;
  box-shadow: var(--shadow-sm);
  position: relative;
}
.day-btn:hover { border-color: var(--black); box-shadow: var(--shadow-md); transform: translateY(-2px); }
.day-btn:active { transform: scale(0.97); }
.day-btn.today {
  border-color: var(--black);
  background: var(--black);
  color: white;
}

.day-icon {
  font-size: 28px;
}

.day-today-tag {
  font-size: 10px;
  font-weight: 900;
  background: var(--yellow);
  color: var(--black);
  padding: 2px 6px;
  border-radius: var(--radius-full);
  position: absolute;
  top: 6px;
  right: 6px;
}

/* ══════════════════════════════════════════════════
   TELA 3 — COLABORADOR
══════════════════════════════════════════════════ */
.collab-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.collab-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 22px 14px 16px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-family: var(--font);
  transition: transform 0.22s, box-shadow 0.22s;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  gap: 6px;
  text-align: center;
  height: 165px;
  width: 100%;
  justify-content: center;
  position: relative;
  overflow: hidden;
  color: #fff;
  box-sizing: border-box;
}
.collab-card:hover { transform: translateY(-4px); box-shadow: 0 14px 32px rgba(0,0,0,0.22); }
.collab-card:active { transform: scale(0.96); }

/* Gradientes vibrantes por índice */
.cc-0  { background: linear-gradient(140deg, #ff6fb0, #e8406e); }
.cc-1  { background: linear-gradient(140deg, #ffb347, #e07c24); }
.cc-2  { background: linear-gradient(140deg, #3ecfcf, #1a9e9e); }
.cc-3  { background: linear-gradient(140deg, #7b8bff, #4a56e2); }
.cc-4  { background: linear-gradient(140deg, #f87171, #c0392b); }
.cc-5  { background: linear-gradient(140deg, #34d399, #059669); }
.cc-6  { background: linear-gradient(140deg, #60a5fa, #2563eb); }
.cc-7  { background: linear-gradient(140deg, #fb923c, #c2410c); }
.cc-8  { background: linear-gradient(140deg, #a78bfa, #6d28d9); }
.cc-9  { background: linear-gradient(140deg, #f472b6, #be185d); }
.cc-10 { background: linear-gradient(140deg, #4ade80, #16a34a); }
.cc-11 { background: linear-gradient(140deg, #38bdf8, #0284c7); }

.collab-emoji {
  font-size: 44px;
  margin-bottom: 2px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.18));
}
.collab-name {
  font-size: 13px;
  font-weight: 900;
  line-height: 1.25;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: #fff;
  text-shadow: 0 1px 3px rgba(0,0,0,0.18);
}
.collab-setor {
  font-size: 11px;
  opacity: 0.88;
  font-weight: 600;
  color: #fff;
}
.collab-count {
  font-size: 11px;
  font-weight: 700;
  background: rgba(255,255,255,0.25);
  color: #fff;
  padding: 3px 10px;
  border-radius: 50px;
  margin-top: 2px;
  backdrop-filter: blur(4px);
}

/* ══════════════════════════════════════════════════
   PROGRESS BAR
══════════════════════════════════════════════════ */
.progress-bar-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  background: white;
  border-bottom: 1px solid var(--gray-200);
  flex-shrink: 0;
}
.progress-bar-track {
  flex: 1;
  height: 10px;
  background: var(--gray-200);
  border-radius: var(--radius-full);
  overflow: hidden;
}
.progress-bar-fill {
  height: 100%;
  border-radius: var(--radius-full);
  transition: width 0.4s ease;
}
.prog-yellow { background: linear-gradient(90deg, #FFC107, #FFAA00); }
.prog-green  { background: linear-gradient(90deg, #28A745, #20C997); }

.progress-bar-text {
  font-size: 12px;
  font-weight: 700;
  color: var(--gray-600);
  white-space: nowrap;
  min-width: 90px;
  text-align: right;
}

/* ══════════════════════════════════════════════════
   STEP BANNER
══════════════════════════════════════════════════ */
.step-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  font-size: 13px;
  flex-shrink: 0;
}
.step-banner-1 {
  background: #FFF9C4;
  border-bottom: 2px solid #FFC107;
  color: #7A5B00;
}
.step-banner-2 {
  background: #E8F5E9;
  border-bottom: 2px solid #28A745;
  color: #1B5E20;
}

.step-banner-icon {
  font-size: 22px;
  flex-shrink: 0;
}
.step-banner strong {
  display: block;
  font-size: 13px;
  font-weight: 800;
  margin-bottom: 2px;
}
.step-banner small {
  font-size: 11px;
  opacity: 0.8;
}

/* ══════════════════════════════════════════════════
   LISTA DE TAREFAS
══════════════════════════════════════════════════ */
.tasks-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 12px 12px 16px;
  -webkit-overflow-scrolling: touch;
}

.task-section-hdr {
  padding: 14px 4px 8px;
  font-size: 12px;
  font-weight: 900;
  color: var(--gray-600);
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* ── Task Cards ───────────────────────────────────── */
.task-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 14px;
  background: white;
  border-radius: var(--radius-lg);
  margin-bottom: 10px;
  cursor: pointer;
  border: 2.5px solid var(--gray-200);
  transition: all 0.22s;
  box-shadow: var(--shadow-sm);
  position: relative;
  overflow: hidden;
}
.task-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 5px;
  background: var(--gray-300);
  border-radius: 5px 0 0 5px;
}
.task-card:hover { box-shadow: var(--shadow-md); transform: translateX(2px); }
.task-card:active { transform: scale(0.99); }

/* Task card states */
.task-card.state-programado {
  background: #FFFDE7;
  border-color: #FFC107;
}
.task-card.state-programado::before { background: #FFC107; }

.task-card.state-total {
  background: #E8F5E9;
  border-color: #28A745;
}
.task-card.state-total::before { background: #28A745; }

.task-card.state-parcial {
  background: #FFF3E0;
  border-color: #FF9800;
}
.task-card.state-parcial::before { background: #FF9800; }

.task-card.state-nao {
  background: #FDECEA;
  border-color: #DC3545;
}
.task-card.state-nao::before { background: #DC3545; }

.task-icon-wrap {
  font-size: 24px;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gray-100);
}

.task-info {
  flex: 1;
  min-width: 0;
}
.task-name {
  font-size: 15px;
  font-weight: 800;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--black);
}
.task-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}
.task-status-text {
  font-size: 11px;
  font-weight: 700;
}
.task-reason {
  font-size: 11px;
  color: var(--gray-600);
  margin-top: 3px;
  font-style: italic;
}

.task-qty-box {
  text-align: right;
  flex-shrink: 0;
}
.task-qty-num {
  display: block;
  font-size: 20px;
  font-weight: 900;
  line-height: 1;
  color: var(--black);
}
.task-qty-unit {
  font-size: 11px;
  color: var(--gray-500);
  font-weight: 600;
}

.task-arrow {
  color: var(--gray-400);
  font-size: 20px;
  flex-shrink: 0;
  font-weight: 300;
}

/* ── Category Badges ────────────────────────────── */
.cat-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: var(--radius-full);
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  background: var(--gray-200);
  color: var(--gray-700);
}
.cat-pre-preparo  { background: #FFD0D0; color: #880000; }
.cat-producao     { background: #C8F7F5; color: #006B67; }
.cat-saches       { background: #BBDEFB; color: #0D47A1; }
.cat-saladas      { background: #C8E6C9; color: #1B5E20; }
.cat-fritadeira   { background: #FFF9C4; color: #7A5B00; }
.cat-hamburger    { background: #E1BEE7; color: #4A148C; }
.cat-logistica    { background: #E0E0E0; color: #212121; }
.cat-camaras      { background: #B3E5FC; color: #01579B; }
.cat-ilha         { background: #FCE4EC; color: #880E4F; }
.cat-abertura     { background: #F0F4C3; color: #33691E; }
.cat-supervisao   { background: #FFE0B2; color: #E65100; }
.cat-limpeza      { background: #B2EBF2; color: #006064; }
.cat-paes         { background: #F5CBA7; color: #6E2800; }
.cat-maionese     { background: #FFFDE7; color: #7A5B00; }
.cat-carnes       { background: #FFD0B5; color: #8B3A00; }
.cat-molhos       { background: #FFF8DC; color: #7A6500; }

/* ══════════════════════════════════════════════════
   FOOTER DAS TAREFAS
══════════════════════════════════════════════════ */
.tasks-footer {
  padding: 12px 16px 16px;
  background: white;
  border-top: 1px solid var(--gray-200);
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
}

.btn-pending-info {
  padding: 12px 16px;
  background: var(--gray-100);
  border: 1.5px solid var(--gray-300);
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 700;
  font-family: var(--font);
  color: var(--gray-600);
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
}

.btn-print-step1 {
  padding: 13px 20px;
  background: white;
  border: 2px solid var(--gray-300);
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 800;
  font-family: var(--font);
  cursor: pointer;
  color: var(--gray-700);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
}
.btn-print-step1:hover { border-color: var(--black); }

.btn-start-prod {
  padding: 16px 20px;
  background: linear-gradient(135deg, #000000, #333333);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  font-size: 17px;
  font-weight: 900;
  font-family: var(--font);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: var(--shadow-md);
  transition: all 0.2s;
}
.btn-start-prod:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); }
.btn-start-prod:active { transform: scale(0.98); }

.btn-conclude-wait {
  padding: 14px 20px;
  background: var(--gray-200);
  border: none;
  border-radius: var(--radius-lg);
  font-size: 14px;
  font-weight: 700;
  font-family: var(--font);
  color: var(--gray-500);
  cursor: not-allowed;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-conclude {
  padding: 16px 20px;
  background: linear-gradient(135deg, #28A745, #20C997);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  font-size: 17px;
  font-weight: 900;
  font-family: var(--font);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: var(--shadow-md);
  transition: all 0.2s;
}
.btn-conclude:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); }

/* ══════════════════════════════════════════════════
   TELA 6 — AGRADECIMENTO
══════════════════════════════════════════════════ */
.thanks-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 28px;
  text-align: center;
  gap: 20px;
  background: linear-gradient(135deg, #F8FFF8, #E8F5E9);
}

.thanks-emoji {
  font-size: 80px;
  animation: bounce 1s ease infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-12px); }
}

.thanks-wrap h2 {
  font-size: 24px;
  font-weight: 900;
  color: var(--black);
  line-height: 1.3;
}

.thanks-stats {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}
.thanks-stat {
  padding: 10px 16px;
  border-radius: var(--radius-full);
  font-size: 14px;
  font-weight: 800;
  background: white;
  box-shadow: var(--shadow-sm);
  border: 2px solid var(--gray-200);
}

.thanks-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 320px;
  margin-top: 4px;
}

.btn-print-thanks {
  padding: 13px;
  background: white;
  border: 2px solid var(--gray-300);
  border-radius: var(--radius-lg);
  font-size: 15px;
  font-weight: 700;
  font-family: var(--font);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
}
.btn-print-thanks:hover { border-color: var(--black); }

.btn-home-thanks {
  padding: 15px;
  background: var(--black);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  font-size: 16px;
  font-weight: 800;
  font-family: var(--font);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
}
.btn-home-thanks:hover { background: var(--gray-800); }

/* ══════════════════════════════════════════════════
   PAINEL DO LÍDER
══════════════════════════════════════════════════ */
.leader-nav { }

.leader-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.filter-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 16px;
  box-shadow: var(--shadow-sm);
  border: 1.5px solid var(--gray-200);
}
.filter-card h3 {
  font-size: 15px;
  font-weight: 800;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: flex-end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 120px;
}
.filter-group label {
  font-size: 11px;
  font-weight: 700;
  color: var(--gray-600);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.filter-group input,
.filter-group select {
  padding: 9px 12px;
  border: 1.5px solid var(--gray-300);
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-family: var(--font);
  outline: none;
  transition: border-color 0.2s;
  background: white;
}
.filter-group input:focus,
.filter-group select:focus { border-color: var(--black); }

.btn-filter {
  padding: 10px 20px;
  background: var(--black);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 800;
  font-family: var(--font);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  transition: background 0.2s;
  height: 40px;
  align-self: flex-end;
}
.btn-filter:hover { background: var(--gray-800); }

/* Summary cards */
.summary-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}
@media (max-width: 600px) {
  .summary-row { grid-template-columns: repeat(3, 1fr); }
}

.summ-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 14px 8px;
  text-align: center;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  border: 2px solid var(--gray-200);
}
.summ-total  { border-color: var(--gray-400); }
.summ-ok     { border-color: #28A745; background: #F1FFF4; }
.summ-warn   { border-color: #FF9800; background: #FFF8F0; }
.summ-err    { border-color: #DC3545; background: #FFF5F5; }
.summ-taxa   { border-color: var(--blue); background: #F0F8FF; }

.summ-emoji { font-size: 20px; }
.summ-num   { font-size: 24px; font-weight: 900; color: var(--black); line-height: 1; }
.summ-lbl   { font-size: 10px; font-weight: 700; color: var(--gray-500); text-transform: uppercase; }

/* Leader actions */
.leader-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn-print-pending {
  padding: 10px 16px;
  background: white;
  border: 2px solid var(--orange);
  color: var(--orange);
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 700;
  font-family: var(--font);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}
.btn-print-pending:hover { background: var(--orange); color: white; }

.btn-print-all-collab {
  padding: 10px 16px;
  background: white;
  border: 2px solid var(--gray-400);
  color: var(--gray-700);
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 700;
  font-family: var(--font);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}
.btn-print-all-collab:hover { background: var(--black); color: white; border-color: var(--black); }

/* Table */
.table-card {
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1.5px solid var(--gray-200);
  overflow: hidden;
}

.table-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1.5px solid var(--gray-200);
}
.table-header-row h3 {
  font-size: 15px;
  font-weight: 800;
}

.table-scroll {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.data-table th {
  background: var(--black);
  color: white;
  padding: 10px 12px;
  text-align: left;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
}
.data-table td {
  padding: 10px 12px;
  border-bottom: 1px solid var(--gray-200);
  white-space: nowrap;
}
.data-table tr:nth-child(even) td { background: var(--gray-50); }
.data-table tr:hover td { background: var(--yellow-light); }

.empty-row {
  text-align: center;
  color: var(--gray-500);
  padding: 32px 16px;
  font-size: 14px;
}

/* Badges tabela */
.badge {
  display: inline-block;
  padding: 3px 8px;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 800;
}
.badge-total   { background: #E8F5E9; color: #1B5E20; }
.badge-parcial { background: #FFF3E0; color: #E65100; }
.badge-nao     { background: #FDECEA; color: #B71C1C; }
.badge-pend    { background: var(--gray-200); color: var(--gray-600); }

/* ══════════════════════════════════════════════════
   MODALS
══════════════════════════════════════════════════ */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 9000; /* acima de todas as .screen (z-index:10) */
  padding: 0;
  animation: fadeIn 0.2s ease;
}
.modal-overlay.hidden { display: none; }

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.modal-box {
  background: white;
  width: 100%;
  max-width: 540px;
  max-height: 92vh;
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { transform: translateY(40px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}

.modal-close {
  position: absolute;
  top: 12px;
  right: 14px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0,0,0,0.1);
  border: none;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: background 0.2s;
  color: white;
  font-weight: 700;
}
.modal-close:hover { background: rgba(0,0,0,0.2); }

.modal-header-colored {
  padding: 20px 20px 16px;
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  color: white;
  min-height: 80px;
}

.modal-cat-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: rgba(255,255,255,0.25);
  margin-bottom: 8px;
}

.modal-title {
  font-size: 20px;
  font-weight: 900;
  line-height: 1.2;
  padding-right: 40px;
}

.modal-header-plain {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  border-bottom: 1.5px solid var(--gray-200);
}
.modal-header-icon { font-size: 28px; }
.modal-header-plain h3 { font-size: 20px; font-weight: 900; }

.modal-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.modal-footer {
  display: flex;
  gap: 10px;
  padding: 16px 20px 24px;
  border-top: 1.5px solid var(--gray-200);
}

.btn-modal-cancel {
  flex: 1;
  padding: 13px;
  background: white;
  border: 2px solid var(--gray-300);
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 700;
  font-family: var(--font);
  cursor: pointer;
  transition: all 0.2s;
}
.btn-modal-cancel:hover { border-color: var(--gray-600); }

.btn-modal-confirm {
  flex: 2;
  padding: 13px;
  background: var(--black);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: 15px;
  font-weight: 800;
  font-family: var(--font);
  cursor: pointer;
  transition: all 0.2s;
}
.btn-modal-confirm:hover { background: var(--gray-800); }

.btn-modal-finish {
  flex: 2;
  padding: 13px;
  background: linear-gradient(135deg, #28A745, #20C997);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: 15px;
  font-weight: 800;
  font-family: var(--font);
  cursor: pointer;
  transition: all 0.2s;
}
.btn-modal-finish:hover { opacity: 0.9; }

/* ── Info Boxes ───────────────────────────────────── */
.info-boxes {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.info-box {
  flex: 1;
  min-width: 120px;
  background: var(--gray-50);
  border: 1.5px solid var(--gray-200);
  border-radius: var(--radius-md);
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.info-box-stock {
  flex: 2;
}

.info-box-label {
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--gray-500);
}

.info-box-val {
  font-size: 28px;
  font-weight: 900;
  color: var(--black);
  line-height: 1;
}

.info-box-unit {
  font-size: 12px;
  color: var(--gray-500);
  font-weight: 600;
}

/* ── Calc Card ────────────────────────────────────── */
.calc-card {
  background: var(--gray-50);
  border: 1.5px solid var(--gray-200);
  border-radius: var(--radius-md);
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.calc-row-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
}

.calc-divider {
  height: 1.5px;
  background: var(--gray-300);
  margin: 2px 0;
}

.calc-highlight {
  font-size: 15px;
  font-weight: 900;
}

.calc-num {
  font-size: 20px;
  font-weight: 900;
  color: var(--black);
  padding: 4px 12px;
  background: var(--yellow);
  border-radius: var(--radius-sm);
}

/* ── Field Label ──────────────────────────────────── */
.field-label {
  font-size: 13px;
  font-weight: 800;
  color: var(--gray-700);
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.field-label small {
  font-size: 11px;
  font-weight: 600;
  color: var(--gray-500);
}
.required-mark {
  font-size: 11px;
  color: var(--red);
  font-weight: 700;
  background: var(--red-light);
  padding: 2px 6px;
  border-radius: var(--radius-full);
}

/* ── Qty Row ──────────────────────────────────────── */
.qty-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.qty-row.compact { gap: 6px; }
.qty-row.big { justify-content: center; }

.qty-btn {
  padding: 8px 12px;
  border: 2px solid var(--gray-300);
  border-radius: var(--radius-sm);
  background: white;
  font-size: 13px;
  font-weight: 800;
  font-family: var(--font);
  cursor: pointer;
  transition: all 0.15s;
  min-width: 42px;
  text-align: center;
}
.qty-btn:hover { border-color: var(--gray-600); background: var(--gray-100); }
.qty-btn:active { transform: scale(0.95); }
.qty-btn.plus { border-color: var(--green); color: var(--green-dark); }
.qty-btn.plus:hover { background: var(--green-light); }
.qty-btn.minus { border-color: var(--red); color: var(--red); }
.qty-btn.minus:hover { background: var(--red-light); }

.qty-val {
  font-size: 22px;
  font-weight: 900;
  min-width: 48px;
  text-align: center;
  color: var(--black);
}
.qty-val.big-val {
  font-size: 36px;
  min-width: 72px;
  padding: 4px 8px;
  background: var(--gray-100);
  border-radius: var(--radius-md);
}

.qty-unit {
  font-size: 14px;
  font-weight: 700;
  color: var(--gray-500);
}

/* ── Status Buttons ───────────────────────────────── */
.status-btns {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sbtn {
  width: 100%;
  padding: 14px 16px;
  border-radius: var(--radius-md);
  border: 2.5px solid transparent;
  font-size: 15px;
  font-weight: 800;
  font-family: var(--font);
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 8px;
}

.sbtn-total {
  background: var(--green-light);
  border-color: #C8E6C9;
  color: var(--green-dark);
}
.sbtn-total:hover, .sbtn-total.active {
  background: var(--green);
  border-color: var(--green);
  color: white;
  box-shadow: 0 4px 12px rgba(40,167,69,0.3);
}

.sbtn-parcial {
  background: var(--orange-light);
  border-color: #FFE0B2;
  color: #E65100;
}
.sbtn-parcial:hover, .sbtn-parcial.active {
  background: var(--orange);
  border-color: var(--orange);
  color: white;
  box-shadow: 0 4px 12px rgba(253,126,20,0.3);
}

.sbtn-nao {
  background: var(--red-light);
  border-color: #FFCDD2;
  color: var(--red);
}
.sbtn-nao:hover, .sbtn-nao.active {
  background: var(--red);
  border-color: var(--red);
  color: white;
  box-shadow: 0 4px 12px rgba(220,53,69,0.3);
}

/* ── Motivos ──────────────────────────────────────── */
.motivo-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.motivo-btn {
  padding: 8px 14px;
  border: 2px solid var(--gray-300);
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 700;
  font-family: var(--font);
  cursor: pointer;
  background: white;
  color: var(--gray-700);
  transition: all 0.2s;
}
.motivo-btn:hover, .motivo-btn.active {
  background: var(--black);
  color: white;
  border-color: var(--black);
}

.motivo-input {
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid var(--gray-300);
  border-radius: var(--radius-md);
  font-size: 14px;
  font-family: var(--font);
  resize: vertical;
  outline: none;
  transition: border-color 0.2s;
  min-height: 60px;
}
.motivo-input:focus { border-color: var(--black); }

/* ── Finish Summary ───────────────────────────────── */
.finish-summary {
  background: var(--gray-50);
  border: 1.5px solid var(--gray-200);
  border-radius: var(--radius-md);
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.finish-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
}

.finish-num {
  font-size: 18px;
  font-weight: 900;
}

/* ══════════════════════════════════════════════════
   UTILITIES
══════════════════════════════════════════════════ */
.hidden { display: none !important; }

.shake {
  animation: shake 0.4s ease;
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-8px); }
  40%       { transform: translateX(8px); }
  60%       { transform: translateX(-6px); }
  80%       { transform: translateX(6px); }
}

/* ══════════════════════════════════════════════════
   RESPONSIVE TWEAKS
══════════════════════════════════════════════════ */
@media (max-width: 480px) {
  .shift-grid { grid-template-columns: 1fr; gap: 12px; max-width: 320px; }
  .collab-grid { grid-template-columns: repeat(2, 1fr); }
  .dept-btn-grid { grid-template-columns: repeat(3, 1fr); }
  .day-grid { grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); }
  .summary-row { grid-template-columns: repeat(3, 1fr); }
  .modal-box { max-height: 96vh; }
  .info-boxes { flex-direction: column; }
  .qty-row.big { justify-content: center; }
}

@media (min-width: 768px) {
  .modal-overlay { align-items: center; }
  .modal-box { border-radius: var(--radius-xl); max-height: 88vh; }
  .shift-grid { max-width: 520px; }
  .collab-grid { grid-template-columns: repeat(3, 1fr); }
  .dept-btn-grid { grid-template-columns: repeat(3, 1fr); }
  .tasks-scroll { padding: 16px 20px; }
}

@media (min-width: 1024px) {
  .shift-grid { grid-template-columns: repeat(2, 220px); }
  .welcome-body { justify-content: center; }
  .screen-body { max-width: 700px; margin: 0 auto; width: 100%; }
  .tasks-scroll { max-width: 700px; margin: 0 auto; }
  .tasks-footer { max-width: 700px; margin: 0 auto; }
}

/* ══════════════════════════════════════════════════
   ABAS DO LÍDER
══════════════════════════════════════════════════ */
.leader-tabs {
  display: flex;
  gap: 0;
  background: var(--gray-900);
  flex-shrink: 0;
  border-bottom: 3px solid var(--yellow);
}
.leader-tab {
  flex: 1;
  padding: 12px 8px;
  background: transparent;
  border: none;
  color: var(--gray-400);
  font-size: 13px;
  font-weight: 700;
  font-family: var(--font);
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 3px solid transparent;
  margin-bottom: -3px;
}
.leader-tab:hover { color: white; background: rgba(255,255,255,0.08); }
.leader-tab.active { color: var(--yellow); border-bottom-color: var(--yellow); background: rgba(255,193,7,0.08); }

.leader-panel { display: flex; flex-direction: column; gap: 12px; }
.leader-panel.hidden { display: none !important; }

/* ── Aba Pendentes ─────────────────────────────── */
.pendentes-hint {
  font-size: 12px;
  color: var(--gray-600);
  font-weight: 600;
}
.pendentes-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.pend-group {
  background: white;
  border-radius: var(--radius-lg);
  border: 1.5px solid var(--gray-200);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}
.pend-group-header {
  background: var(--gray-900);
  color: white;
  padding: 10px 14px;
  font-size: 13px;
  font-weight: 800;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pend-count {
  background: var(--yellow);
  color: var(--black);
  padding: 2px 10px;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 900;
}
.pend-item {
  display: flex;
  align-items: center;
  padding: 12px 14px;
  border-bottom: 1px solid var(--gray-100);
  gap: 10px;
  transition: all 0.3s ease;
  overflow: hidden;
}
.pend-item:last-child { border-bottom: none; }
.pend-item-info { flex: 1; min-width: 0; }
.pend-item-name {
  font-size: 14px;
  font-weight: 800;
  display: block;
  margin-bottom: 2px;
}
.pend-item-meta {
  font-size: 11px;
  color: var(--gray-500);
  font-weight: 600;
}
.pend-check-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--green-light);
  border: 2px solid var(--green);
  color: var(--green-dark);
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s;
}
.pend-check-btn:hover { background: var(--green); color: white; transform: scale(1.1); }

/* ── Aba Espelho ───────────────────────────────── */
.espelho-list { display: flex; flex-direction: column; gap: 16px; }
.espelho-date-group {
  background: white;
  border-radius: var(--radius-lg);
  border: 1.5px solid var(--gray-200);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}
.espelho-date-header {
  background: var(--gray-800);
  color: white;
  padding: 10px 14px;
  font-size: 13px;
  font-weight: 900;
}
.espelho-collab {
  border-bottom: 2px solid var(--gray-200);
  padding: 0;
}
.espelho-collab:last-child { border-bottom: none; }
.espelho-collab-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px 6px;
  font-size: 14px;
  background: var(--gray-50);
}
.espelho-collab-footer {
  padding: 6px 14px;
  font-size: 11px;
  color: var(--gray-600);
  font-weight: 700;
  background: var(--gray-100);
}
.espelho-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}
.espelho-table th {
  background: var(--gray-200);
  color: var(--gray-700);
  padding: 6px 10px;
  text-align: left;
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
}
.espelho-table td {
  padding: 7px 10px;
  border-bottom: 1px solid var(--gray-100);
}
.espelho-table tr:last-child td { border-bottom: none; }

/* ══════════════════════════════════════════════════
   PRINT PREVIEW INLINE (Etapa 1)
══════════════════════════════════════════════════ */
.print-preview-panel {
  background: white;
  border-top: 3px solid var(--black);
  border-bottom: 2px solid var(--gray-200);
  flex-shrink: 0;
  max-height: 200px;
  overflow-y: auto;
}
.print-preview-panel.hidden { display: none !important; }

.print-preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: var(--black);
  color: white;
  font-size: 13px;
  font-weight: 700;
  position: sticky;
  top: 0;
  z-index: 1;
}
.btn-preview-print {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  background: var(--yellow);
  color: var(--black);
  border: none;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 900;
  font-family: var(--font);
  cursor: pointer;
  transition: background 0.2s;
}
.btn-preview-print:hover { background: var(--yellow-dark); }

.print-preview-table-wrap { overflow-x: auto; }
.preview-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}
.preview-table th {
  background: var(--gray-100);
  color: var(--gray-700);
  padding: 6px 10px;
  text-align: left;
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  border-bottom: 1.5px solid var(--gray-300);
}
.preview-table td {
  padding: 6px 10px;
  border-bottom: 1px solid var(--gray-100);
  font-size: 12px;
}

/* ══════════════════════════════════════════════════
   COLLAB DONE (finalizado hoje)
══════════════════════════════════════════════════ */
.collab-done {
  opacity: 0.75;
  position: relative;
  cursor: pointer; /* clicável — líder pode reabrir com senha */
}
.collab-done-overlay {
  position: absolute;
  bottom: 8px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: fit-content;
  white-space: nowrap;
  font-size: 11px;
  font-weight: 900;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  pointer-events: none;
  z-index: 2;
}
.done-100 {
  background: var(--green);
  color: white;
}
.done-parcial {
  background: var(--orange);
  color: white;
}
.done-falta-nj {
  background: var(--red);
  color: white;
}
.done-falta-j {
  background: #7c3aed;
  color: white;
}
/* ── Em andamento: Atendimento com tarefas já salvas mas não finalizou turno ── */
.done-andamento {
  background: #0891b2;
  color: white;
}
.collab-andamento {
  opacity: 0.88;
  border: 2px solid rgba(8,145,178,0.6);
}

/* ── Card com falta registrada ── */
.collab-falta {
  opacity: 0.6;
  filter: grayscale(40%);
  cursor: pointer;
}
.collab-card-wrap {
  position: relative;
}

/* ── Botão falta flutuante no card ── */
.btn-falta-card {
  position: absolute;
  top: 6px;
  right: 6px;
  background: #dc2626;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 900;
  padding: 4px 8px;
  cursor: pointer;
  z-index: 10;
  font-family: var(--font);
  box-shadow: 0 2px 6px rgba(220,38,38,.35);
  transition: .15s;
  white-space: nowrap;
}
.btn-falta-card:hover {
  background: #b91c1c;
  transform: scale(1.05);
}

/* ══════════════════════════════════════════════════
   MODAL COMPACTO (sem scroll interno)
══════════════════════════════════════════════════ */
.modal-compact {
  max-height: 94vh;
}
.modal-body-compact {
  padding: 14px 18px;
  gap: 12px;
}
.modal-body-compact .calc-card { padding: 10px 12px; gap: 6px; }
.modal-body-compact .calc-row-item { font-size: 13px; }
.modal-body-compact .field-label { font-size: 12px; }
.modal-body-compact .sbtn { padding: 11px 14px; font-size: 14px; }
.modal-body-compact .motivo-btns { gap: 6px; }
.modal-body-compact .motivo-btn { padding: 6px 10px; font-size: 11px; }
.modal-body-compact .qty-val.big-val { font-size: 28px; }
.modal-body-compact .info-box-val { font-size: 22px; }

/* ── Checklist mode (modal sem qty) ─────────────── */
.checklist-prompt {
  text-align: center;
  padding: 16px 8px;
}
.checklist-icon { font-size: 48px; margin-bottom: 10px; }
.checklist-prompt p { font-size: 15px; color: var(--gray-700); line-height: 1.5; }

/* ── Agradecimento simplificado ─────────────────── */
.thanks-redirect-msg {
  font-size: 13px;
  color: var(--gray-500);
  font-weight: 600;
}

/* ══════════════════════════════════════════════════
   S1 DONE FOOTER — botões Iniciar + Imprimir
══════════════════════════════════════════════════ */
.s1-done-footer {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}
.s1-done-footer.hidden { display: none !important; }

.btn-print-s1 {
  padding: 13px 20px;
  background: white;
  border: 2px solid var(--gray-300);
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 800;
  font-family: var(--font);
  cursor: pointer;
  color: var(--gray-700);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
}
.btn-print-s1:hover { border-color: var(--black); background: var(--gray-50); }

.btn-voltar-s1 {
  padding: 11px 20px;
  background: transparent;
  border: 2px solid var(--gray-300);
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 700;
  font-family: var(--font);
  cursor: pointer;
  color: var(--gray-600);
  width: 100%;
  transition: all 0.2s;
}
.btn-voltar-s1:hover { border-color: var(--gray-500); color: var(--black); }

/* ══════════════════════════════════════════════════
   TASK CARD — estado INICIADO
══════════════════════════════════════════════════ */
.task-card.state-iniciado {
  background: var(--blue-light);
  border-left: 4px solid #1565C0;
}
.task-card.state-iniciado::before { background: #1565C0; }

.task-iniciado-badge {
  display: inline-block;
  font-size: 10px;
  font-weight: 900;
  background: #1565C0;
  color: white;
  padding: 2px 7px;
  border-radius: 99px;
  margin-left: 6px;
  vertical-align: middle;
}

.task-just-badge {
  display: inline-block;
  font-size: 12px;
  margin-left: 4px;
  cursor: help;
  vertical-align: middle;
}

/* ══════════════════════════════════════════════════
   S1 QTY MODAL — linhas do estoque e QTD A FAZER
══════════════════════════════════════════════════ */
.s1-stock-row {
  flex-wrap: nowrap;
  justify-content: center;
  background: var(--gray-50);
  padding: 8px 10px;
  border-radius: var(--radius-md);
  border: 1.5px solid var(--gray-200);
  gap: 4px;
}
.s1-stock-row .qty-btn {
  padding: 7px 9px;
  min-width: 36px;
  font-size: 12px;
}
.s1-stock-row .qty-val {
  font-size: 18px;
  min-width: 36px;
}

.s1-prog-row {
  justify-content: center;
}

/* ══════════════════════════════════════════════════
   BOTÃO DANGER SMALL
══════════════════════════════════════════════════ */
.btn-danger-sm {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 14px; background: #dc3545; color: #fff;
  border: none; border-radius: 8px; font-size: 13px;
  font-weight: 700; font-family: var(--font); cursor: pointer;
  transition: background 0.2s;
}
.btn-danger-sm:hover { background: #b02a37; }

/* ══════════════════════════════════════════════════
   ABA RELATÓRIO ANALÍTICO
══════════════════════════════════════════════════ */
.rel-filters { background: #f8f8f8; border-radius: 12px; padding: 12px 16px; }

.rel-collab-block {
  background: #fff; border-radius: 14px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.07);
  padding: 16px; margin-bottom: 12px;
}
.rel-collab-header {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 8px; font-size: 15px;
}
.rel-stats-row {
  display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px;
}
.rel-stat {
  font-size: 12px; font-weight: 700; padding: 3px 10px;
  border-radius: 20px;
}
.rel-stat-ok   { background: #e8f5e9; color: #28a745; }
.rel-stat-parc { background: #fff3e0; color: #e65100; }
.rel-stat-nao  { background: #fdecea; color: #dc3545; }

.rel-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 8px;
}
.rel-card {
  border-radius: 10px; padding: 10px 12px;
  border-left: 4px solid #ccc; font-size: 12px;
}
.rel-card-ok   { background: #f0fdf4; border-color: #28a745; }
.rel-card-parc { background: #fffbeb; border-color: #f59e0b; }
.rel-card-nao  { background: #fff1f2; border-color: #dc3545; }
.rel-card-top  { display: flex; align-items: center; gap: 6px; margin-bottom: 4px; }
.rel-card-icon { font-size: 14px; }
.rel-card-item { font-weight: 800; font-size: 12px; line-height: 1.3; }
.rel-card-data { font-size: 11px; color: #888; margin-bottom: 3px; }
.rel-card-qty  { font-size: 11px; color: #555; margin-bottom: 3px; }
.rel-card-motivo { font-size: 11px; color: #c0392b; font-style: italic; }

/* Barras de causas */
.rel-causas-wrap {
  background: #fff; border-radius: 12px; padding: 14px 16px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.07);
}
.causa-bar-row {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 8px; font-size: 12px;
}
.causa-label { min-width: 180px; font-weight: 700; flex-shrink:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:180px; }
.causa-bar-track { flex: 1; background: #eee; border-radius: 20px; height: 14px; overflow: hidden; }
.causa-bar-fill  { height: 100%; background: linear-gradient(90deg,#dc3545,#ff6b6b); border-radius: 20px; transition: width 0.4s; }
.causa-count { font-weight: 900; color: #dc3545; min-width: 30px; text-align: right; }

/* ══════════════════════════════════════════════════
   ABA TAREFAS — GESTÃO
══════════════════════════════════════════════════ */
/* Barra de filtros */
.tar-filter-bar {
  display: flex; flex-wrap: wrap; gap: 12px; align-items: flex-end;
  background: #f8f8f8; border-radius: 12px; padding: 12px 14px;
}
.tar-filter-group { display: flex; flex-direction: column; gap: 4px; }
.tar-filter-group label { font-size: 11px; font-weight: 800; color: #888; text-transform: uppercase; letter-spacing: 0.5px; }

/* Toggle turno */
.tar-toggle-group { display: flex; gap: 0; border-radius: 8px; overflow: hidden; border: 1px solid #ddd; }
.tar-toggle { padding: 7px 14px; background: #fff; border: none; font-family: var(--font); font-size: 13px; font-weight: 700; cursor: pointer; color: #666; transition: all 0.15s; }
.tar-toggle.active { background: #1a1a1a; color: #fff; }

/* Botões de dia */
.tar-dias-group { display: flex; gap: 4px; flex-wrap: wrap; }
.tar-dia-btn { padding: 6px 10px; background: #fff; border: 1px solid #ddd; border-radius: 6px; font-family: var(--font); font-size: 11px; font-weight: 800; cursor: pointer; color: #666; transition: all 0.15s; }
.tar-dia-btn.active { background: #1a1a1a; color: #fff; border-color: #1a1a1a; }

/* Contador */
.tar-count-bar { font-size: 12px; color: #888; font-weight: 700; padding: 2px 4px; }

.tar-select {
  padding: 8px 12px; border-radius: 8px; border: 1px solid #ddd;
  font-family: var(--font); font-size: 13px; font-weight: 700;
  background: #fff; cursor: pointer;
}
.btn-new-task {
  display: flex; align-items: center; gap: 6px;
  padding: 9px 16px; background: #1a1a1a; color: #fff;
  border: none; border-radius: 8px; font-size: 13px;
  font-weight: 700; font-family: var(--font); cursor: pointer;
  transition: background 0.2s; white-space: nowrap;
}
.btn-new-task:hover { background: #333; }

.tar-collab-block {
  background: #fff; border-radius: 14px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.07);
  margin-bottom: 10px; overflow: hidden;
}
.tar-collab-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 16px; background: #1a1a1a; color: #fff;
  font-size: 14px;
}
.tar-count { font-size: 12px; opacity: 0.7; font-weight: 600; }

.tar-item {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 14px; border-bottom: 1px solid #f0f0f0;
  transition: background 0.15s;
}
.tar-item:last-child { border-bottom: none; }
.tar-item:hover { background: #fafafa; }

.tar-item-info { flex: 1; min-width: 0; }
.tar-item-cat  { display: block; font-size: 10px; color: #888; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
.tar-item-name { font-size: 13px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.tar-qty-wrap  { display: flex; align-items: center; gap: 4px; }
.tar-qty-btn   { width: 28px; height: 28px; border: 1px solid #ddd; background: #f5f5f5; border-radius: 6px; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: 700; transition: background 0.15s; }
.tar-qty-btn.plus { background: #e8f5e9; border-color: #28a745; color: #28a745; }
.tar-qty-btn:hover { background: #eee; }
.tar-qty-input { width: 52px; text-align: center; border: 1px solid #ddd; border-radius: 6px; padding: 4px 2px; font-size: 13px; font-weight: 700; font-family: var(--font); }
.tar-unit      { font-size: 11px; color: #888; min-width: 24px; }

.tar-actions   { display: flex; gap: 4px; }
.tar-btn-save  { width:30px; height:30px; background:#e8f5e9; color:#28a745; border:1px solid #28a745; border-radius:6px; cursor:pointer; font-size:12px; display:flex; align-items:center; justify-content:center; transition: background 0.15s; }
.tar-btn-edit  { width:30px; height:30px; background:#e8f0fe; color:#1565c0; border:1px solid #1565c0; border-radius:6px; cursor:pointer; font-size:12px; display:flex; align-items:center; justify-content:center; transition: background 0.15s; }
.tar-btn-del   { width:30px; height:30px; background:#fdecea; color:#dc3545; border:1px solid #dc3545; border-radius:6px; cursor:pointer; font-size:12px; display:flex; align-items:center; justify-content:center; transition: background 0.15s; }
.tar-btn-save:hover { background:#28a745; color:#fff; }
.tar-btn-edit:hover { background:#1565c0; color:#fff; }
.tar-btn-del:hover  { background:#dc3545; color:#fff; }

/* Tabela de tarefas */
.tar-table-wrap { overflow-x: auto; }
.tar-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.tar-table thead th { background: #f5f5f5; padding: 8px 10px; font-size: 11px; font-weight: 800; color: #555; text-transform: uppercase; letter-spacing: 0.4px; border-bottom: 2px solid #e0e0e0; }
.tar-table tbody tr:hover { background: #fafafa; }
.tar-table td { padding: 8px 10px; border-bottom: 1px solid #f0f0f0; vertical-align: middle; }
.tar-cat-badge { background: #f0f0f0; border-radius: 6px; padding: 2px 8px; font-size: 11px; font-weight: 700; color: #555; white-space: nowrap; }
.tar-item-name-cell { font-weight: 700; color: #1a1a1a; }
.tar-row:last-child td { border-bottom: none; }

/* ══════════════════════════════════════════════════
   PRINT STYLES
══════════════════════════════════════════════════ */
@media print {
  .screen { position: relative !important; overflow: visible !important; }
  .tasks-footer, .nav-header, .progress-bar-wrap, .step-banner { display: none; }
  .tasks-scroll { overflow: visible; max-height: none; }
}

/* ══════════════════════════════════════════════════
   TELA DE RESULTADOS / PENDÊNCIAS DO DIA (in-app)
══════════════════════════════════════════════════ */

/* Barra de filtros de resultados */
.res-filter-bar {
  background: #fff;
  border-bottom: 1px solid var(--gray-200);
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.res-filter-group {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.res-filter-group label {
  font-size: 12px;
  font-weight: 800;
  color: var(--gray-600);
  white-space: nowrap;
  min-width: 60px;
}

/* Summary bar de resultados */
.res-summary-bar {
  display: flex;
  gap: 8px;
  padding: 10px 16px;
  background: #f8f9fa;
  border-bottom: 1px solid var(--gray-200);
  overflow-x: auto;
}
.res-sum-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 14px;
  border-radius: 10px;
  min-width: 70px;
  flex-shrink: 0;
}
.res-sum-val {
  font-size: 22px;
  font-weight: 900;
  line-height: 1.1;
}
.res-sum-lbl {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  opacity: 0.8;
  margin-top: 2px;
  text-align: center;
}
.res-sum-blue   { background: rgba(59,130,246,0.12); color: #1565C0; }
.res-sum-green  { background: rgba(40,167,69,0.12);  color: #1a7f37; }
.res-sum-orange { background: rgba(253,126,20,0.12); color: #e07b00; }
.res-sum-red    { background: rgba(220,53,69,0.12);  color: #b02a37; }

/* Cards de colaborador na tela de resultados */
.res-collab-card {
  background: #fff;
  border: 1px solid var(--gray-200);
  border-radius: 12px;
  margin-bottom: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: border-color 0.2s;
}
.res-collab-card.res-all-done {
  border-color: #28a745;
  opacity: 0.7;
}
.res-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  cursor: pointer;
  background: #fafafa;
  user-select: none;
  transition: background 0.15s;
}
.res-card-header:hover { background: #f0f0f0; }
.res-card-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--yellow) 0%, var(--orange) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}
.res-card-info { flex: 1; min-width: 0; }
.res-card-name {
  font-size: 15px;
  font-weight: 800;
  color: var(--black);
}
.res-card-meta {
  font-size: 11px;
  color: var(--gray-500);
  margin-top: 2px;
  font-weight: 600;
}
.res-pills {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.res-pill {
  padding: 3px 8px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
}
.res-pill-orange { background: rgba(253,126,20,0.15); color: #e07b00; }
.res-pill-red    { background: rgba(220,53,69,0.15);  color: #b02a37; }
.res-pill-green  { background: rgba(40,167,69,0.15);  color: #1a7f37; }
.res-chevron {
  color: var(--gray-400);
  font-size: 13px;
  transition: transform 0.25s;
  flex-shrink: 0;
}

/* Lista de tarefas dentro do card */
.res-tasks-list {
  padding: 4px 16px 12px;
  border-top: 1px solid var(--gray-200);
}
.res-tasks-list.hidden { display: none; }

.res-task-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid var(--gray-100);
}
.res-task-item:last-child { border-bottom: none; }
.res-task-icon {
  font-size: 18px;
  flex-shrink: 0;
  margin-top: 2px;
}
.res-task-body { flex: 1; min-width: 0; }
.res-task-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--black);
}
.res-task-detail {
  font-size: 11px;
  color: var(--gray-500);
  margin-top: 3px;
  line-height: 1.4;
}
.res-task-qtds {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 6px;
}
.res-qtd-badge {
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
}
.res-qtd-prog  { background: rgba(59,130,246,0.1);   color: #1565C0; }
.res-qtd-feito { background: rgba(40,167,69,0.1);    color: #1a7f37; }
.res-qtd-rest  { background: rgba(220,53,69,0.1);    color: #b02a37; }
.res-task-actions {
  flex-shrink: 0;
  padding-top: 2px;
}
.res-btn-ciente {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 7px 12px;
  border: 1.5px solid #28a745;
  background: none;
  color: #28a745;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  font-family: var(--font);
  transition: all 0.15s;
  white-space: nowrap;
}
.res-btn-ciente:hover {
  background: #28a745;
  color: white;
}
.res-btn-ciente.res-btn-done {
  border-color: var(--gray-300);
  color: var(--gray-400);
  cursor: default;
}
.res-btn-ciente.res-btn-done:hover {
  background: none;
  color: var(--gray-400);
}
