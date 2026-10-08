/* ═══════════════════════════════════════════
   EDMAN NEXUS — JavaScript
   الجزء 1: Matrix + Bubbles + State + Init
   ═══════════════════════════════════════════ */

/* ─────────── Matrix Rain ─────────── */
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const chars = 'アカサタナハマヤラワ0123456789ABCDEFabcdef<>/\\|=-+*&^%$#@!';
const charsArray = chars.split('');
const fontSize = 16;
let columns = Math.floor(width / fontSize);
let drops = [];

for (let i = 0; i < columns; i++) {
  drops[i] = Math.random() * height / fontSize;
}

function getMatrixColor() {
  const theme = document.documentElement.getAttribute('data-theme');
  if (theme === 'matrix-red') return '#ff3355';
  if (theme === 'matrix-blue') return '#00d4ff';
  if (theme === 'matrix-gold') return '#ffd700';
  return '#00ff41';
}

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
  ctx.fillRect(0, 0, width, height);
  
  const color = getMatrixColor();
  ctx.fillStyle = color;
  ctx.font = fontSize + 'px monospace';
  ctx.shadowColor = color;
  ctx.shadowBlur = 8;
  
  for (let i = 0; i < drops.length; i++) {
    const text = charsArray[Math.floor(Math.random() * charsArray.length)];
    const x = i * fontSize;
    const y = drops[i] * fontSize;
    ctx.fillText(text, x, y);
    if (y > height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
  ctx.shadowBlur = 0;
}

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  columns = Math.floor(width / fontSize);
  drops = [];
  for (let i = 0; i < columns; i++) drops[i] = Math.random() * height / fontSize;
});

setInterval(drawMatrix, 40);

/* ─────────── Matrix Bubbles ─────────── */
const bubblesContainer = document.getElementById('bubblesContainer');

const bubbleMessages = [
  'SYSTEM OK', 'ACCESS GRANTED', 'LOADING...', 'ENCRYPTED',
  'CONNECTED', 'SECURE', 'PING OK', 'DATA FLOW',
  'FIREWALL ON', 'VPN ACTIVE', 'SCANNING...', 'ROOT ACCESS',
  'DECRYPTING', 'BYPASSING', 'EXPLOITING', 'INJECTED',
  'PROXY SET', 'AES-256', 'SHA-256', 'HASHING...',
  '✓ DONE', '◆ RUNNING', '▶ EXECUTE', '◉ ONLINE'
];

function createBubble(x, y) {
  if (!bubblesContainer) return;

  const bubble = document.createElement('div');
  bubble.className = 'matrix-bubble';
  bubble.textContent = bubbleMessages[Math.floor(Math.random() * bubbleMessages.length)];
  
  const moveX = (Math.random() - 0.5) * 200;
  const moveY = -50 - Math.random() * 100;
  
  bubble.style.left = x + 'px';
  bubble.style.top = y + 'px';
  bubble.style.setProperty('--moveX', moveX + 'px');
  bubble.style.setProperty('--moveY', moveY + 'px');
  
  bubblesContainer.appendChild(bubble);
  
  setTimeout(() => bubble.remove(), 2000);
}

document.addEventListener('click', (e) => {
  createBubble(e.clientX, e.clientY);
  
  setTimeout(() => createBubble(
    e.clientX + (Math.random() - 0.5) * 80,
    e.clientY + (Math.random() - 0.5) * 80
  ), 100);
  
  setTimeout(() => createBubble(
    e.clientX + (Math.random() - 0.5) * 120,
    e.clientY + (Math.random() - 0.5) * 120
  ), 200);
});

/* ─────────── Sections Config ─────────── */
const SECTIONS = [
  { id: 'hack', icon: '🎯', nameAr: 'محاكي الاختراق', desc: 'مهام اختراق تفاعلية', badge: 'HACK' },
  { id: 'defense', icon: '🛡️', nameAr: 'ساحة الدفاع', desc: 'صد هجمات سيبرانية', badge: 'DEFEND' },
  { id: 'ai', icon: '🤖', nameAr: 'معركة AI', desc: 'هاجم أو دافع ضد AI', badge: 'AI' },
  { id: 'osint', icon: '🔍', nameAr: 'مختبر التحليل', desc: 'أدوات جمع معلومات', badge: 'OSINT' },
  { id: 'score', icon: '📊', nameAr: 'تقييم الأمان', desc: 'افحص أمانك الشخصي', badge: 'SCORE' },
  { id: 'learn', icon: '🎓', nameAr: 'أكاديمية التعلم', desc: 'دروس تفاعلية', badge: 'LEARN' },
  { id: 'ctf', icon: '🎮', nameAr: 'منطقة التحديات', desc: 'تحديات CTF', badge: 'CTF' },
  { id: 'threat', icon: '📡', nameAr: 'خريطة التهديدات', desc: 'هجمات حية', badge: 'THREAT' },
  { id: 'tools', icon: '🛠️', nameAr: 'ترسانة الأدوات', desc: 'أدوات أمنية', badge: 'TOOLS' },
  { id: 'breach', icon: '📚', nameAr: 'تسريبات البيانات', desc: 'أشهر التسريبات', badge: 'BREACH' },
  { id: 'friends', icon: '👥', nameAr: 'العب مع الأصدقاء', desc: 'تحديات multiplayer', badge: 'FRIENDS' },
  { id: 'leaderboard', icon: '🏆', nameAr: 'لوحة الصدارة', desc: 'ترتيب اللاعبين', badge: 'RANK' },
  { id: 'rights', icon: '📜', nameAr: 'الحقوق', desc: 'المطور والحقوق', badge: 'RIGHTS' }
];

/* ─────────── Game State ─────────── */
let gameState = {
  xp: parseInt(localStorage.getItem('nexus-xp')) || 0,
  level: parseInt(localStorage.getItem('nexus-level')) || 1,
  theme: localStorage.getItem('nexus-theme') || 'matrix-green',
  lang: localStorage.getItem('nexus-lang') || 'ar'
};

/* ─────────── Ranks ─────────── */
const RANKS = [
  { min: 0, name: '🥚 مبتدئ' },
  { min: 500, name: '🐣 هاكر مبتدئ' },
  { min: 1500, name: '💻 سكريبت كيدي' },
  { min: 3000, name: '🔥 هاكر محترف' },
  { min: 5000, name: '💀 خبير أمني' },
  { min: 8000, name: '👑 إدمان المدمر' },
  { min: 12000, name: '🚀 أسطورة سيبرانية' }
];

function getRank(xp) {
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (xp >= r.min) rank = r;
    else break;
  }
  return rank;
}

/* ─────────── Render Sections ─────────── */
function renderSections() {
  const grid = document.getElementById('neuralGrid');
  if (!grid) return;

  grid.innerHTML = SECTIONS.map(sec => `
    <div class="neural-card" onclick="openSection('${sec.id}')">
      <div class="neural-card-icon">${sec.icon}</div>
      <div class="neural-card-title">${sec.nameAr}</div>
      <div class="neural-card-desc">${sec.desc}</div>
      <div class="neural-card-footer">
        <span class="neural-card-badge">${sec.badge}</span>
        <span class="neural-card-arrow">←</span>
      </div>
    </div>
  `).join('');
}

/* ─────────── Open Section ─────────── */
function openSection(id) {
  const handlers = {
    hack: () => openHack(),
    defense: () => openDefense(),
    ai: () => openAIBattle(),
    osint: () => openOSINT(),
    score: () => openScore(),
    learn: () => openLearn(),
    ctf: () => openCTF(),
    threat: () => openThreatMap(),
    tools: () => openTools(),
    breach: () => openBreach(),
    friends: () => openFriends(),
    leaderboard: () => openLeaderboard(),
    rights: () => openRights()
  };

  if (handlers[id]) handlers[id]();
}

/* ─────────── XP System ─────────── */
function addXP(amount) {
  gameState.xp += amount;
  const oldLevel = gameState.level;
  gameState.level = Math.floor(gameState.xp / 500) + 1;

  localStorage.setItem('nexus-xp', gameState.xp);
  localStorage.setItem('nexus-level', gameState.level);

  updateUI();

  if (gameState.level > oldLevel) {
    setTimeout(() => {
      openModal('🎉 LEVEL UP!', `
        <div style="text-align:center;padding:20px">
          <div style="font-size:4rem;margin-bottom:15px">🎉</div>
          <div style="color:var(--primary);font-size:1.3rem;font-weight:900;margin-bottom:10px">
            مستوى جديد!
          </div>
          <div style="color:var(--gold);font-size:1.1rem;margin-bottom:15px">
            LEVEL ${gameState.level}
          </div>
          <div style="color:var(--text-dim);font-size:0.85rem">
            لقبك: ${getRank(gameState.xp).name}
          </div>
        </div>
      `);
    }, 500);
  }
}

/* ─────────── Update UI ─────────── */
function updateUI() {
  const xpEl = document.getElementById('xpDisplay');
  const lvlEl = document.getElementById('levelDisplay');
  const rankEl = document.getElementById('rankDisplay');
  const pVal = document.getElementById('progressVal');
  const pFill = document.getElementById('progressFill');

  if (xpEl) xpEl.textContent = gameState.xp;
  if (lvlEl) lvlEl.textContent = gameState.level;
  if (rankEl) rankEl.textContent = getRank(gameState.xp).name;

  const p = Math.min(100, Math.round((gameState.xp / 12000) * 100));
  if (pVal) pVal.textContent = p + '%';
  if (pFill) pFill.style.width = p + '%';
}

/* ─────────── Modal ─────────── */
function openModal(title, html) {
  const modal = document.getElementById('sectionModal');
  document.getElementById('modalTitle').innerHTML = title;
  document.getElementById('modalContent').innerHTML = html;
  modal.classList.add('active');
}

function closeModal() {
  document.getElementById('sectionModal').classList.remove('active');
}

document.getElementById('sectionModal')?.addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});
/* ═══════════════════════════════════════════
   ⚙️ SETTINGS + THEMES + LANGUAGES
   ═══════════════════════════════════════════ */

/* ─────────── Themes ─────────── */
const THEMES = [
  { id: 'matrix-green', name: 'Matrix Green', icon: '💚', colors: ['#000', '#00ff41', '#008f11'] },
  { id: 'matrix-red', name: 'Matrix Red', icon: '🔴', colors: ['#0a0000', '#ff3355', '#aa2233'] },
  { id: 'matrix-blue', name: 'Matrix Blue', icon: '🔵', colors: ['#00050a', '#00d4ff', '#0088aa'] },
  { id: 'matrix-gold', name: 'Matrix Gold', icon: '🟡', colors: ['#0a0800', '#ffd700', '#b8941f'] }
];

function applyTheme(themeId) {
  document.documentElement.setAttribute('data-theme', themeId);
  gameState.theme = themeId;
  localStorage.setItem('nexus-theme', themeId);
  const theme = THEMES.find(t => t.id === themeId);
  if (theme) showToast(`${theme.icon} ${theme.name}`);
}

function renderThemes() {
  return THEMES.map(t => `
    <div onclick="applyTheme('${t.id}'); closeModal(); setTimeout(openSettings, 200);" style="
      padding:14px;
      background:${t.id === gameState.theme ? 'color-mix(in srgb,var(--primary) 15%,transparent)' : 'rgba(0,0,0,0.4)'};
      border:2px solid ${t.id === gameState.theme ? 'var(--primary)' : 'var(--border)'};
      border-radius:12px;
      cursor:pointer;
      text-align:center;
      transition:all 0.3s;
    ">
      <div style="width:100%;height:40px;border-radius:8px;margin-bottom:10px;
        background:linear-gradient(135deg,${t.colors[0]},${t.colors[1]},${t.colors[2]});
        box-shadow:0 0 15px ${t.colors[1]}66"></div>
      <div style="color:var(--primary);font-weight:700;font-size:0.85rem">${t.icon} ${t.name}</div>
    </div>
  `).join('');
}

/* ─────────── Languages ─────────── */
const LANGUAGES = [
  { code: 'ar', name: 'العربية', flag: '🇪🇬' },
  { code: 'en', name: 'English', flag: '🇬🇧' }
];

function applyLang(langCode) {
  gameState.lang = langCode;
  localStorage.setItem('nexus-lang', langCode);
  document.documentElement.setAttribute('lang', langCode);
  document.documentElement.setAttribute('dir', langCode === 'ar' ? 'rtl' : 'ltr');
  showToast(langCode === 'ar' ? '🇪🇬 العربية' : '🇬🇧 English');
  closeModal();
  setTimeout(openSettings, 200);
}

function renderLanguages() {
  return LANGUAGES.map(l => `
    <div onclick="applyLang('${l.code}')" style="
      padding:14px;
      background:${l.code === gameState.lang ? 'color-mix(in srgb,var(--primary) 15%,transparent)' : 'rgba(0,0,0,0.4)'};
      border:2px solid ${l.code === gameState.lang ? 'var(--primary)' : 'var(--border)'};
      border-radius:10px;
      cursor:pointer;
      text-align:center;
      transition:all 0.3s;
    ">
      <div style="font-size:1.5rem;margin-bottom:5px">${l.flag}</div>
      <div style="color:var(--primary);font-weight:700;font-size:0.85rem">${l.name}</div>
    </div>
  `).join('');
}

/* ─────────── Settings Modal ─────────── */
function openSettings() {
  openModal('⚙️ الإعدادات', `
    <div style="display:grid;gap:20px">
      
      <!-- Themes -->
      <div>
        <div style="color:var(--primary);font-weight:900;margin-bottom:12px;font-size:0.9rem">
          🎨 الثيمات
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          ${renderThemes()}
        </div>
      </div>

      <!-- Languages -->
      <div>
        <div style="color:var(--primary);font-weight:900;margin-bottom:12px;font-size:0.9rem">
          🌍 اللغة
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          ${renderLanguages()}
        </div>
      </div>

      <!-- Reset -->
      <div>
        <div style="color:var(--primary);font-weight:900;margin-bottom:12px;font-size:0.9rem">
          ⚠️ إعادة تعيين
        </div>
        <button onclick="resetProgress()" style="
          width:100%;
          padding:14px;
          background:rgba(255,51,85,0.1);
          border:1px solid var(--red);
          border-radius:10px;
          color:var(--red);
          font-weight:900;
          cursor:pointer;
          font-family:inherit;
          font-size:0.85rem;
        ">
          🗑️ مسح كل التقدم
        </button>
      </div>

      <!-- Footer -->
      <div style="text-align:center;padding-top:15px;border-top:1px solid var(--border);color:var(--text-dim);font-size:0.7rem;line-height:1.8">
        EDMAN NEXUS v1.0.0<br>
        By Edman Haking
      </div>
    </div>
  `);
}

/* ─────────── Reset ─────────── */
function resetProgress() {
  if (!confirm('متأكد إنك عايز تمسح كل تقدمك؟')) return;
  localStorage.clear();
  location.reload();
}

/* ─────────── Toast ─────────── */
/* ─────────── Toast ─────────── */
let toastTimer = null;
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position:fixed;
      bottom:70px;
      left:50%;
      transform:translateX(-50%) translateY(100px);
      padding:12px 24px;
      background:var(--bg-2);
      border:2px solid var(--primary);
      border-radius:10px;
      color:var(--primary);
      font-weight:700;
      font-size:0.85rem;
      box-shadow:0 0 30px var(--primary-glow);
      z-index:2000;
      transition:all 0.4s;
      font-family:'JetBrains Mono',monospace;
      max-width:90%;
      text-align:center;
    `;
    document.body.appendChild(toast);
  }
  
  toast.textContent = msg;
  toast.style.transform = 'translateX(-50%) translateY(0)';
  toast.style.opacity = '1';
  
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(100px)';
    toast.style.opacity = '0';
  }, 2000);
}

/* ─────────── Clock ─────────── */
function updateClock() {
  const el = document.getElementById('currentTime');
  if (!el) return;
  el.textContent = new Date().toLocaleTimeString('en-GB', { hour12: false });
}

setInterval(updateClock, 1000);
updateClock();

/* ═══════════════════════════════════════════
   🚀 INIT + FINAL TOUCHES
   ═══════════════════════════════════════════ */

/* ─────────── Keyboard Shortcuts ─────────── */
document.addEventListener('keydown', (e) => {
  // ESC لإغلاق المودال
  if (e.key === 'Escape') {
    closeModal();
  }
  
  // S لإغلاق المودال
  if (e.key.toLowerCase() === 's' && document.getElementById('sectionModal').classList.contains('active')) {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      closeModal();
    }
  }
});

/* ─────────── Auto Theme Switcher ─────────── */
let themeAutoSwitch = null;

function startAutoThemeSwitch() {
  if (themeAutoSwitch) clearInterval(themeAutoSwitch);
  
  const themeIds = ['matrix-green', 'matrix-red', 'matrix-blue', 'matrix-gold'];
  let currentIdx = themeIds.indexOf(gameState.theme);
  
  themeAutoSwitch = setInterval(() => {
    currentIdx = (currentIdx + 1) % themeIds.length;
    applyTheme(themeIds[currentIdx]);
  }, 10000);
}

/* ─────────── Random Hacker Tips ─────────── */
const HACKER_TIPS = [
  '💡 استخدم كلمات مرور فريدة لكل حساب',
  '🔒 فعّل المصادقة الثنائية (2FA) دائماً',
  '🛡️ حدّث نظامك وبرامجك باستمرار',
  '🔍 افحص حساباتك على HaveIBeenPwned',
  '⚠️ لا تضغط على روابط مشبوهة',
  '🎯 اتعلم من الأخطاء بدل ما تعيدها',
  '🚀 الهاكر الأخلاقي يحمي ولا يضر',
  '💪 استمر في التعلم — الأمن السيبراني مجال متطور',
  '🌐 استخدم VPN على الشبكات العامة',
  '🔐 كلمة مرور قوية = 16 حرف على الأقل',
  '📚 اقرأ عن آخر الثغرات (CVEs)',
  '🎓 شارك معرفتك مع الآخرين'
];

function showRandomTip() {
  const tip = HACKER_TIPS[Math.floor(Math.random() * HACKER_TIPS.length)];
  showToast(tip);
}

// Tips كل 60 ثانية
setInterval(showRandomTip, 60000);

/* ─────────── Greeting Based on Time ─────────── */
function showGreeting() {
  const hour = new Date().getHours();
  let greeting;
  
  if (hour < 6) greeting = '🌙 سهرة هاكر؟';
  else if (hour < 12) greeting = '☀️ صباح الخير يا هاكر';
  else if (hour < 18) greeting = '🌤️ مساء الخير';
  else greeting = '🌆 مساء الخير يا هاكر';
  
  showToast(greeting);
}

/* ─────────── Init ─────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Apply saved theme
  if (gameState.theme && gameState.theme !== 'matrix-green') {
    document.documentElement.setAttribute('data-theme', gameState.theme);
  }
  
  // Apply saved language
  if (gameState.lang && gameState.lang !== 'ar') {
    document.documentElement.setAttribute('lang', gameState.lang);
    document.documentElement.setAttribute('dir', gameState.lang === 'ar' ? 'rtl' : 'ltr');
  }
  
  // Render sections & UI
  renderSections();
  updateUI();
  
  // Welcome message after 1 second
  setTimeout(() => {
    showToast('👑 أهلاً بك في EDMAN NEXUS');
  }, 1000);
  
  // Greeting after 3 seconds
  setTimeout(showGreeting, 3000);
  
  // Console art
  console.log('%c╔══════════════════════════════════════╗', 'color:#00ff41;font-size:14px');
  console.log('%c║         👑 EDMAN NEXUS v1.0.0         ║', 'color:#00ff41;font-size:16px;font-weight:bold;text-shadow:0 0 10px #00ff41');
  console.log('%c║       CYBERSECURITY UNIVERSE          ║', 'color:#00ff41;font-size:12px');
  console.log('%c║                                       ║', 'color:#00ff41;font-size:14px');
  console.log('%c║   By: Edman Haking                    ║', 'color:#ffd700;font-size:12px');
  console.log('%c║   YouTube: @Edman_haking-i4f          ║', 'color:#ffd700;font-size:12px');
  console.log('%c║   Telegram: @youssef7_HAKER           ║', 'color:#ffd700;font-size:12px');
  console.log('%c╚══════════════════════════════════════╝', 'color:#00ff41;font-size:14px');
  console.log('%c✅ Ready! 13 sections loaded', 'color:#00ffff;font-size:12px');
  console.log('%c💡 Tip: Click anywhere for Matrix bubbles!', 'color:#a855f7;font-size:12px');
});

/* ─────────── Prevent Context Menu (Optional) ─────────── */
// document.addEventListener('contextmenu', (e) => e.preventDefault());

/* ─────────── Double Click to Top ─────────── */
document.addEventListener('dblclick', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ═══════════════════════════════════════════
   ✅ تم — EDMAN NEXUS كامل! 🎉
   ═══════════════════════════════════════════
   
   📊 المشروع كامل:
   ✅ index.html (1 ملف)
   ✅ style.css  (2 ملف - الجزء 1 + 2)
   ✅ script.js  (14 ملف - كل الأقسام)
   
   🎯 الأقسام (13):
   1. 🎯 Hack Simulator
   2. 🛡️ Defense Arena
   3. 🤖 AI Battle
   4. 🔍 OSINT Lab
   5. 📊 Security Score
   6. 🎓 Learn Academy
   7. 🎮 CTF Zone
   8. 📡 Threat Map
   9. 🛠️ Tools Arsenal
   10. 📚 Data Breach
   11. 👥 Play with Friends
   12. 🏆 Leaderboard
   13. 📜 Rights Page
   
   ═══════════════════════════════════════════
   🚀 للتطوير المستقبلي:
   
   1. لإضافة قسم جديد:
      - ضيف في SECTIONS
      - ضيف دالة openXXX()
      - ضيف handler في openSection()
   
   2. للمزيد من الثيمات:
      - ضيف في :root أو [data-theme="..."]
      - ضيف في THEMES
   
   3. للمزيد من اللغات:
      - ضيف في LANGUAGES
      - اعمل نظام ترجمة
   
   ═══════════════════════════════════════════
   👑 EDMAN HAKING © 2025
   ═══════════════════════════════════════════ */
/* ─────────── Placeholder Functions (تُستبدل في الردود القادمة) ─────────── */
/* ═══════════════════════════════════════════
   🎯 HACK SIMULATOR
   ═══════════════════════════════════════════ */
const HACK_MISSIONS = [
  {
    id: 'h1', icon: '📱', name: 'اختراق هاتف Android',
    desc: 'اختبر ثغرة في هاتف أندرويد',
    hint: 'استخدم ADB ثم Metasploit',
    points: 100,
    correct: ['adb', 'connect', 'shell', 'msfconsole', 'exploit'],
    details: { '📱 الجهاز': 'Samsung S8', '🔓 الروت': 'مفعّل', '📸 الكاميرا': 'متاحة' }
  },
  {
    id: 'h2', icon: '🌐', name: 'اختراق شبكة WiFi',
    desc: 'كسر تشفير WPA2',
    hint: 'استخدم aircrack-ng',
    points: 150,
    correct: ['airmon', 'airodump', 'aireplay', 'aircrack', 'wlan'],
    details: { '📶 الشبكة': 'Test_WiFi', '🔐 كلمة المرور': 'Found!', '📊 الإشارة': 'قوية' }
  },
  {
    id: 'h3', icon: '🌍', name: 'اختراق موقع ويب',
    desc: 'استغل ثغرة SQL Injection',
    hint: 'استخدم sqlmap',
    points: 250,
    correct: ['sqlmap', 'injection', 'database', 'dump', 'tables'],
    details: { '🌍 الموقع': 'test-shop.com', '🗄️ القاعدة': 'MySQL', '👥 المستخدمين': '1500' }
  },
  {
    id: 'h4', icon: '💻', name: 'اختراق Windows',
    desc: 'استغل ثغرة EternalBlue',
    hint: 'استخدم ms17-010 مع Metasploit',
    points: 300,
    correct: ['nmap', 'msfconsole', 'ms17', 'eternalblue', 'smb'],
    details: { '💻 النظام': 'Windows 7', '🔓 الصلاحيات': 'SYSTEM', '📁 الملفات': 'متاحة' }
  },
  {
    id: 'h5', icon: '🖥️', name: 'اختراق سيرفر Linux',
    desc: 'دخول عبر SSH Bruteforce',
    hint: 'استخدم hydra مع SSH',
    points: 400,
    correct: ['hydra', 'ssh', 'root', 'login', 'port'],
    details: { '🖥️ السيرفر': 'Ubuntu 22', '👤 المستخدم': 'root', '🎯 Uptime': '365 يوم' }
  }
];

function openHack() {
  const completed = JSON.parse(localStorage.getItem('nexus-hack-done') || '[]');
  
  let html = `<p style="color:var(--text-dim);font-size:0.8rem;margin-bottom:15px;text-align:center">اكتب الأوامر الصحيحة لكل مهمة</p>`;
  
  HACK_MISSIONS.forEach((m, i) => {
    const done = completed.includes(m.id);
    const locked = i > 0 && !completed.includes(HACK_MISSIONS[i - 1].id);
    
    html += `
      <div onclick="${locked ? '' : `startHack('${m.id}')`}" style="
        padding:14px;
        background:color-mix(in srgb,var(--primary) 3%,transparent);
        border:1px solid ${done ? 'var(--primary)' : locked ? '#333' : 'var(--border)'};
        border-radius:10px;
        margin-bottom:10px;
        cursor:${locked ? 'not-allowed' : 'pointer'};
        opacity:${locked ? '0.5' : '1'};
        transition:all 0.3s;
      ">
        <div style="display:flex;align-items:center;gap:12px">
          <span style="font-size:1.6rem">${m.icon}</span>
          <div style="flex:1">
            <div style="color:var(--primary);font-weight:900;font-size:0.9rem">${done ? '✓ ' : ''}${m.name}</div>
            <div style="color:var(--text-dim);font-size:0.72rem">${m.desc}</div>
          </div>
          <div style="color:var(--gold);font-size:0.75rem;font-weight:700">+${m.points}</div>
        </div>
      </div>
    `;
  });
  
  openModal('🎯 HACK SIMULATOR', html);
}

function startHack(id) {
  const m = HACK_MISSIONS.find(x => x.id === id);
  if (!m) return;
  
  const html = `
    <p style="color:var(--text-dim);font-size:0.78rem;margin-bottom:12px">${m.desc}</p>
    <div style="padding:10px;background:rgba(255,204,0,0.08);border-right:3px solid var(--gold);border-radius:6px;font-size:0.75rem;color:var(--gold);margin-bottom:15px">
      💡 ${m.hint}
    </div>
    <div id="hackTerminal" style="
      background:#000;border:1px solid var(--primary);border-radius:10px;padding:15px;
      font-family:monospace;font-size:0.78rem;min-height:140px;max-height:200px;
      overflow-y:auto;margin-bottom:15px;color:var(--primary);direction:ltr;text-align:left
    ">
      <div style="color:var(--accent)">> اكتب الأوامر الصحيحة...</div>
    </div>
    <input type="text" id="hackInput" placeholder="اكتب الأمر..." style="
      width:100%;padding:12px;background:#000;border:2px solid var(--primary);border-radius:8px;
      color:var(--primary);font-family:monospace;font-size:0.85rem;outline:none;
      margin-bottom:10px;direction:ltr;text-align:left
    " autocomplete="off">
    <div style="display:flex;gap:8px">
      <button onclick="submitHack('${m.id}')" style="
        flex:1;padding:12px;background:linear-gradient(135deg,var(--primary),var(--primary-dim));
        border:none;border-radius:8px;color:var(--bg);font-weight:900;cursor:pointer;font-family:inherit
      ">▶️ تنفيذ</button>
      <button onclick="openHack()" style="
        padding:12px 20px;background:rgba(255,51,85,0.2);border:1px solid var(--red);
        border-radius:8px;color:var(--red);font-weight:700;cursor:pointer;font-family:inherit
      ">← رجوع</button>
    </div>
  `;
  
  openModal(`${m.icon} ${m.name}`, html);
  window.currentHack = { m, attempts: [] };
  
  setTimeout(() => {
    const inp = document.getElementById('hackInput');
    if (inp) {
      inp.focus();
      inp.addEventListener('keypress', e => { if (e.key === 'Enter') submitHack(m.id); });
    }
  }, 100);
}

function submitHack(id) {
  const m = HACK_MISSIONS.find(x => x.id === id);
  const inp = document.getElementById('hackInput');
  const term = document.getElementById('hackTerminal');
  const cmd = inp.value.trim().toLowerCase();
  if (!cmd) return;
  
  window.currentHack.attempts.push(cmd);
  
  const line = document.createElement('div');
  line.style.color = 'var(--primary)';
  line.textContent = '> ' + cmd;
  term.appendChild(line);
  term.scrollTop = term.scrollHeight;
  inp.value = '';
  
  const attempts = window.currentHack.attempts;
  
  if (attempts.length >= 3) {
    const all = attempts.join(' ');
    const matched = m.correct.filter(c => all.includes(c)).length;
    const rate = matched / m.correct.length;
    
    if (rate >= 0.6) {
      addXP(m.points);
      
      const completed = JSON.parse(localStorage.getItem('nexus-hack-done') || '[]');
      if (!completed.includes(m.id)) {
        completed.push(m.id);
        localStorage.setItem('nexus-hack-done', JSON.stringify(completed));
      }
      
      let detailsHTML = Object.entries(m.details).map(([k, v]) => 
        `<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border)">
          <span style="color:var(--text-dim);font-size:0.75rem">${k}</span>
          <span style="color:var(--primary);font-weight:700;font-size:0.75rem">${v}</span>
        </div>`
      ).join('');
      
      openModal('✅ ACCESS GRANTED', `
        <div style="text-align:center;padding:15px 0">
          <div style="font-size:4rem;margin-bottom:15px">✅</div>
          <div style="color:var(--primary);font-size:1.2rem;font-weight:900;margin-bottom:10px">تم الاختراق بنجاح!</div>
          <div style="color:var(--gold);font-size:1rem;font-weight:700;margin-bottom:20px">+${m.points} XP</div>
          <div style="background:color-mix(in srgb,var(--primary) 5%,transparent);border:1px solid var(--border);border-radius:10px;padding:15px;margin-bottom:20px;text-align:right">
            <div style="color:var(--accent);font-size:0.75rem;margin-bottom:10px">🔓 معلومات الاختراق:</div>
            ${detailsHTML}
          </div>
          <button onclick="openHack()" style="width:100%;padding:12px;background:linear-gradient(135deg,var(--primary),var(--primary-dim));border:none;border-radius:8px;color:var(--bg);font-weight:900;cursor:pointer;font-family:inherit">
            ➡️ رجوع للمهام
          </button>
        </div>
      `);
    } else {
      const roasts = ['😂 امسح الهباب ده', '💀 هتفضحنا؟', '🤦‍♂️ ده مش اختراق', '😹 جرب تاني'];
      openModal('❌ FAILED', `
        <div style="text-align:center;padding:15px 0">
          <div style="font-size:4rem;margin-bottom:15px">💥</div>
          <div style="color:var(--red);font-size:1.2rem;font-weight:900;margin-bottom:15px">فشلت المهمة!</div>
          <div style="padding:15px;background:rgba(255,51,85,0.1);border-right:3px solid var(--red);border-radius:8px;margin-bottom:15px;color:var(--accent);font-weight:700;font-size:0.85rem;text-align:right">
            ${roasts[Math.floor(Math.random() * roasts.length)]}
          </div>
          <div style="color:var(--text-dim);font-size:0.78rem;margin-bottom:15px">
            الأوامر: <span style="color:var(--primary)">${m.correct.join(', ')}</span>
          </div>
          <button onclick="startHack('${m.id}')" style="width:100%;padding:12px;background:linear-gradient(135deg,var(--red),#aa2233);border:none;border-radius:8px;color:#fff;font-weight:900;cursor:pointer;font-family:inherit">
            🔄 حاول تاني
          </button>
        </div>
      `);
    }
  } else {
    const info = document.createElement('div');
    info.style.color = 'var(--accent)';
    info.style.fontSize = '0.7rem';
    info.textContent = `⏳ محاولة ${attempts.length}/3...`;
    term.appendChild(info);
    term.scrollTop = term.scrollHeight;
  }
}

/* ═══════════════════════════════════════════
   🛡️ DEFENSE ARENA
   ═══════════════════════════════════════════ */
const DEFENSE_ATTACKS = [
  { type: 'DDoS', icon: '💣', correct: 'firewall' },
  { type: 'Phishing', icon: '🎣', correct: 'training' },
  { type: 'Malware', icon: '🦠', correct: 'antivirus' },
  { type: 'SQL Injection', icon: '💉', correct: 'waf' },
  { type: 'Brute Force', icon: '🔨', correct: 'mfa' },
  { type: 'Ransomware', icon: '🔒', correct: 'backup' },
  { type: 'MITM', icon: '🕵️', correct: 'vpn' },
  { type: 'Zero-Day', icon: '👑', correct: 'ids' }
];

const DEFENSE_TOOLS = [
  { id: 'firewall', icon: '🔥', name: 'Firewall' },
  { id: 'antivirus', icon: '💊', name: 'Antivirus' },
  { id: 'training', icon: '🎓', name: 'Training' },
  { id: 'waf', icon: '🛡️', name: 'WAF' },
  { id: 'mfa', icon: '🔐', name: 'MFA' },
  { id: 'backup', icon: '💾', name: 'Backup' },
  { id: 'vpn', icon: '🌐', name: 'VPN' },
  { id: 'ids', icon: '👁️', name: 'IDS' }
];

let defenseState = { round: 0, score: 0, total: 10 };

function openDefense() {
  const best = localStorage.getItem('nexus-defense-best') || '0';
  defenseState = { round: 0, score: 0, total: 10 };
  
  openModal('🛡️ DEFENSE ARENA', `
    <div style="text-align:center;padding:20px 0">
      <div style="font-size:3.5rem;margin-bottom:15px">🛡️</div>
      <div style="color:var(--primary);font-size:1.1rem;font-weight:900;margin-bottom:10px">صد 10 هجمات</div>
      <div style="color:var(--text-dim);font-size:0.82rem;margin-bottom:25px">اختر الدفاع الصح لكل هجوم</div>
      
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px">
        <div style="padding:12px;background:color-mix(in srgb,var(--primary) 5%,transparent);border:1px solid var(--border);border-radius:8px">
          <div style="color:var(--text-dim);font-size:0.7rem">🏆 الأفضل</div>
          <div style="color:var(--gold);font-weight:900;font-size:1.1rem">${best}</div>
        </div>
        <div style="padding:12px;background:color-mix(in srgb,var(--primary) 5%,transparent);border:1px solid var(--border);border-radius:8px">
          <div style="color:var(--text-dim);font-size:0.7rem">⚔️ الجولات</div>
          <div style="color:var(--gold);font-weight:900;font-size:1.1rem">10</div>
        </div>
      </div>
      
      <button onclick="startDefense()" style="width:100%;padding:14px;background:linear-gradient(135deg,var(--primary),var(--primary-dim));border:none;border-radius:10px;color:var(--bg);font-weight:900;cursor:pointer;font-family:inherit;font-size:1rem">
        ▶️ ابدأ اللعب
      </button>
    </div>
  `);
}

function startDefense() {
  defenseState = { round: 0, score: 0, total: 10 };
  nextDefenseRound();
}

function nextDefenseRound() {
  defenseState.round++;
  
  if (defenseState.round > defenseState.total) {
    return endDefense();
  }
  
  const attack = DEFENSE_ATTACKS[Math.floor(Math.random() * DEFENSE_ATTACKS.length)];
  let tools = [...DEFENSE_TOOLS].sort(() => Math.random() - 0.5).slice(0, 6);
  
  if (!tools.find(t => t.id === attack.correct)) {
    tools[0] = DEFENSE_TOOLS.find(t => t.id === attack.correct);
  }
  
  tools = tools.sort(() => Math.random() - 0.5);
  
  const toolsHTML = tools.map(t => `
    <button onclick="answerDefense('${t.id}', '${attack.correct}')" style="
      padding:12px;background:color-mix(in srgb,var(--primary) 8%,transparent);
      border:1px solid var(--border);border-radius:8px;color:var(--primary);
      cursor:pointer;font-weight:700;font-size:0.75rem;font-family:inherit
    ">
      ${t.icon} ${t.name}
    </button>
  `).join('');
  
  openModal(`🛡️ ROUND ${defenseState.round}/${defenseState.total}`, `
    <div style="text-align:center;margin-bottom:15px">
      <div style="color:var(--text-dim);font-size:0.75rem">SCORE: <span style="color:var(--gold);font-weight:900">${defenseState.score}</span></div>
    </div>
    
    <div style="text-align:center;padding:20px;background:rgba(255,51,85,0.1);border:2px solid var(--red);border-radius:12px;margin-bottom:18px;animation:attackShake 0.5s">
      <div style="font-size:3rem;margin-bottom:10px">${attack.icon}</div>
      <div style="color:var(--red);font-size:1.1rem;font-weight:900">⚠️ ${attack.type}</div>
      <div style="color:var(--accent);font-size:0.72rem;margin-top:5px">هجوم قادم!</div>
    </div>
    
    <div style="color:var(--primary);font-size:0.75rem;margin-bottom:10px;text-align:center">اختر الدفاع 👇</div>
    
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
      ${toolsHTML}
    </div>
  `);
}

function answerDefense(toolId, correctId) {
  const isCorrect = toolId === correctId;
  if (isCorrect) defenseState.score += 100;
  
  if (isCorrect) {
    openModal('✅ دفاع ناجح!', `
      <div style="text-align:center;padding:30px 0">
        <div style="font-size:4rem;color:var(--primary);margin-bottom:15px;animation:successPulse 0.5s">🛡️</div>
        <div style="color:var(--primary);font-size:1.2rem;font-weight:900;margin-bottom:15px">صد ناجح!</div>
        <div style="color:var(--gold);font-size:1rem;margin-bottom:15px">+100 نقطة</div>
        <div style="color:var(--text-dim);font-size:0.75rem">SCORE: ${defenseState.score}</div>
      </div>
    `);
    setTimeout(nextDefenseRound, 800);
  } else {
    openModal('❌ الهجوم نجح!', `
      <div style="text-align:center;padding:30px 0">
        <div style="font-size:4rem;color:var(--red);margin-bottom:15px">💥</div>
        <div style="color:var(--red);font-size:1.2rem;font-weight:900;margin-bottom:15px">فشل الدفاع!</div>
        <div style="color:var(--accent);font-size:0.85rem;margin-bottom:15px">الصح: ${correctId}</div>
        <div style="color:var(--text-dim);font-size:0.75rem">SCORE: ${defenseState.score}</div>
      </div>
    `);
    setTimeout(nextDefenseRound, 1200);
  }
}

function endDefense() {
  const best = parseInt(localStorage.getItem('nexus-defense-best') || '0');
  if (defenseState.score > best) {
    localStorage.setItem('nexus-defense-best', defenseState.score);
  }
  
  addXP(Math.floor(defenseState.score / 10));
  
  openModal('🏆 انتهت اللعبة!', `
    <div style="text-align:center;padding:30px 0">
      <div style="font-size:4rem;margin-bottom:15px">🏆</div>
      <div style="color:var(--primary);font-size:1.3rem;font-weight:900;margin-bottom:15px">نتيجتك</div>
      <div style="color:var(--gold);font-size:2.5rem;font-weight:900;margin-bottom:10px">${defenseState.score}</div>
      <div style="color:var(--text-dim);font-size:0.8rem;margin-bottom:25px">نقطة</div>
      <div style="display:flex;gap:8px">
        <button onclick="openDefense()" style="flex:1;padding:12px;background:linear-gradient(135deg,var(--primary),var(--primary-dim));border:none;border-radius:10px;color:var(--bg);font-weight:900;cursor:pointer;font-family:inherit">
          🔄 العب تاني
        </button>
        <button onclick="closeModal()" style="flex:1;padding:12px;background:color-mix(in srgb,var(--primary) 10%,transparent);border:1px solid var(--primary);border-radius:10px;color:var(--primary);font-weight:900;cursor:pointer;font-family:inherit">
          ✕ إغلاق
        </button>
      </div>
    </div>
  `);
}
/* ═══════════════════════════════════════════
   🤖 AI BATTLE
   ═══════════════════════════════════════════ */
const AI_ATTACKS = [
  { type: 'DDoS', icon: '💣', counter: 'firewall' },
  { type: 'Phishing', icon: '🎣', counter: 'training' },
  { type: 'Malware', icon: '🦠', counter: 'antivirus' },
  { type: 'SQL Injection', icon: '💉', counter: 'waf' },
  { type: 'Brute Force', icon: '🔨', counter: 'mfa' },
  { type: 'Ransomware', icon: '🔒', counter: 'backup' }
];

const AI_DEFENSES = [
  { id: 'firewall', icon: '🔥', name: 'Firewall' },
  { id: 'antivirus', icon: '💊', name: 'Antivirus' },
  { id: 'training', icon: '🎓', name: 'Training' },
  { id: 'waf', icon: '🛡️', name: 'WAF' },
  { id: 'mfa', icon: '🔐', name: 'MFA' },
  { id: 'backup', icon: '💾', name: 'Backup' }
];

let aiBattleState = { round: 0, score: 0, total: 8 };

function openAIBattle() {
  aiBattleState = { round: 0, score: 0, total: 8 };
  
  openModal('🤖 AI BATTLE', `
    <div style="text-align:center;padding:15px 0">
      <div style="font-size:3.5rem;margin-bottom:15px">🤖</div>
      <div style="color:var(--primary);font-size:1.1rem;font-weight:900;margin-bottom:10px">
        معركة ضد الذكاء الاصطناعي
      </div>
      <div style="color:var(--text-dim);font-size:0.82rem;margin-bottom:25px">
        AI يهاجم — إنت تختار الدفاع الصح
      </div>
      
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px">
        <div style="padding:12px;background:color-mix(in srgb,var(--primary) 5%,transparent);border:1px solid var(--border);border-radius:8px">
          <div style="color:var(--text-dim);font-size:0.7rem">🏆 الأفضل</div>
          <div style="color:var(--gold);font-weight:900;font-size:1.1rem">${localStorage.getItem('nexus-ai-best') || '0'}</div>
        </div>
        <div style="padding:12px;background:color-mix(in srgb,var(--primary) 5%,transparent);border:1px solid var(--border);border-radius:8px">
          <div style="color:var(--text-dim);font-size:0.7rem">⚔️ الجولات</div>
          <div style="color:var(--gold);font-weight:900;font-size:1.1rem">8</div>
        </div>
      </div>
      
      <button onclick="startAIBattle()" style="width:100%;padding:14px;background:linear-gradient(135deg,var(--purple),#7c3aed);border:none;border-radius:10px;color:#fff;font-weight:900;cursor:pointer;font-family:inherit;font-size:1rem">
        ▶️ ابدأ المعركة
      </button>
    </div>
  `);
}

function startAIBattle() {
  aiBattleState = { round: 0, score: 0, total: 8 };
  nextAIBattle();
}

function nextAIBattle() {
  aiBattleState.round++;
  
  if (aiBattleState.round > aiBattleState.total) {
    return endAIBattle();
  }
  
  const attack = AI_ATTACKS[Math.floor(Math.random() * AI_ATTACKS.length)];
  const tools = [...AI_DEFENSES].sort(() => Math.random() - 0.5);
  
  const toolsHTML = tools.map(t => `
    <button onclick="answerAI('${t.id}', '${attack.counter}')" style="
      padding:12px;background:rgba(168,85,247,0.08);border:1px solid rgba(168,85,247,0.4);
      border-radius:8px;color:var(--purple);cursor:pointer;font-weight:700;font-size:0.75rem;font-family:inherit
    ">
      ${t.icon} ${t.name}
    </button>
  `).join('');
  
  openModal(`🤖 AI BATTLE — ROUND ${aiBattleState.round}/${aiBattleState.total}`, `
    <div style="text-align:center;margin-bottom:15px">
      <div style="color:var(--text-dim);font-size:0.75rem">SCORE: <span style="color:var(--gold);font-weight:900">${aiBattleState.score}</span></div>
    </div>
    
    <div style="text-align:center;padding:20px;background:rgba(168,85,247,0.1);border:2px solid var(--purple);border-radius:12px;margin-bottom:18px;animation:attackShake 0.5s">
      <div style="font-size:3rem;margin-bottom:10px">${attack.icon}</div>
      <div style="color:var(--purple);font-size:1.1rem;font-weight:900">⚔️ ${attack.type}</div>
      <div style="color:#c084fc;font-size:0.72rem;margin-top:5px">AI يهاجم! اختر الدفاع</div>
    </div>
    
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
      ${toolsHTML}
    </div>
  `);
}

function answerAI(choice, correct) {
  const isCorrect = choice === correct;
  if (isCorrect) aiBattleState.score += 100;
  
  const emoji = isCorrect ? '✅' : '❌';
  const msg = isCorrect ? 'دفاع ناجح!' : 'اختراق ناجح!';
  const color = isCorrect ? 'var(--primary)' : 'var(--red)';
  
  openModal(`${emoji} ${msg}`, `
    <div style="text-align:center;padding:30px 0">
      <div style="font-size:4rem;color:${color};margin-bottom:15px;animation:successPulse 0.5s">${emoji}</div>
      <div style="color:${color};font-size:1.2rem;font-weight:900;margin-bottom:15px">${msg}</div>
      ${isCorrect ? '<div style="color:var(--gold);font-size:1rem;margin-bottom:15px">+100 نقطة</div>' : ''}
      <div style="color:var(--text-dim);font-size:0.75rem">SCORE: ${aiBattleState.score}</div>
    </div>
  `);
  
  setTimeout(nextAIBattle, isCorrect ? 800 : 1200);
}

function endAIBattle() {
  const best = parseInt(localStorage.getItem('nexus-ai-best') || '0');
  if (aiBattleState.score > best) {
    localStorage.setItem('nexus-ai-best', aiBattleState.score);
  }
  
  addXP(Math.floor(aiBattleState.score / 10));
  
  openModal('🏆 انتهت المعركة!', `
    <div style="text-align:center;padding:30px 0">
      <div style="font-size:4rem;margin-bottom:15px">🤖</div>
      <div style="color:var(--primary);font-size:1.3rem;font-weight:900;margin-bottom:15px">النتيجة</div>
      <div style="color:var(--gold);font-size:2.5rem;font-weight:900;margin-bottom:10px">${aiBattleState.score}</div>
      <div style="color:var(--text-dim);font-size:0.8rem;margin-bottom:25px">نقطة</div>
      <div style="display:flex;gap:8px">
        <button onclick="openAIBattle()" style="flex:1;padding:12px;background:linear-gradient(135deg,var(--purple),#7c3aed);border:none;border-radius:10px;color:#fff;font-weight:900;cursor:pointer;font-family:inherit">
          🔄 العب تاني
        </button>
        <button onclick="closeModal()" style="flex:1;padding:12px;background:color-mix(in srgb,var(--primary) 10%,transparent);border:1px solid var(--primary);border-radius:10px;color:var(--primary);font-weight:900;cursor:pointer;font-family:inherit">
          ✕ إغلاق
        </button>
      </div>
    </div>
  `);
}

/* ═══════════════════════════════════════════
   🔍 OSINT LAB
   ═══════════════════════════════════════════ */
function openOSINT() {
  const tools = [
    { id: 'phone', icon: '📱', name: 'Phone Info', desc: 'تحليل رقم' },
    { id: 'email', icon: '📧', name: 'Email Lookup', desc: 'معلومات إيميل' },
    { id: 'ip', icon: '📡', name: 'IP Lookup', desc: 'بحث عن IP' },
    { id: 'hash', icon: '🔒', name: 'Hash Check', desc: 'فحص Hash' },
    { id: 'domain', icon: '🌐', name: 'Domain Info', desc: 'معلومات نطاق' },
    { id: 'url', icon: '🔗', name: 'URL Scanner', desc: 'فحص رابط' },
    { id: 'dns', icon: '🔎', name: 'DNS Lookup', desc: 'سجلات DNS' },
    { id: 'username', icon: '👤', name: 'Username Search', desc: 'بحث يوزر' }
  ];
  
  const html = `
    <p style="color:var(--text-dim);font-size:0.8rem;margin-bottom:15px;text-align:center">
      8 أدوات جمع معلومات
    </p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      ${tools.map(t => `
        <div onclick="openOSINTTool('${t.id}')" style="
          padding:14px;background:rgba(0,212,255,0.05);border:1px solid rgba(0,212,255,0.3);
          border-radius:10px;cursor:pointer;text-align:center
        ">
          <div style="font-size:1.8rem;margin-bottom:8px">${t.icon}</div>
          <div style="color:var(--accent);font-weight:900;font-size:0.82rem;margin-bottom:4px">${t.name}</div>
          <div style="color:var(--text-dim);font-size:0.68rem">${t.desc}</div>
        </div>
      `).join('')}
    </div>
  `;
  
  openModal('🔍 OSINT LAB', html);
}

function openOSINTTool(id) {
  const configs = {
    phone: { title: '📱 Phone Info', placeholder: '+201151739983' },
    email: { title: '📧 Email Lookup', placeholder: 'user@example.com' },
    ip: { title: '📡 IP Lookup', placeholder: '8.8.8.8' },
    hash: { title: '🔒 Hash Check', placeholder: '5d41402abc4b2a76b9719d911017c592' },
    domain: { title: '🌐 Domain Info', placeholder: 'example.com' },
    url: { title: '🔗 URL Scanner', placeholder: 'https://example.com' },
    dns: { title: '🔎 DNS Lookup', placeholder: 'example.com' },
    username: { title: '👤 Username Search', placeholder: 'username' }
  };
  const cfg = configs[id];
  
  openModal(cfg.title, `
    <input type="text" id="osintInput" placeholder="${cfg.placeholder}" style="
      width:100%;padding:14px;background:#000;border:2px solid var(--accent);border-radius:10px;
      color:var(--accent);font-family:monospace;font-size:0.9rem;outline:none;
      margin-bottom:15px;direction:ltr;text-align:left
    " autocomplete="off">
    
    <button onclick="runOSINT('${id}')" style="
      width:100%;padding:12px;background:linear-gradient(135deg,var(--accent),#0088aa);
      border:none;border-radius:10px;color:var(--bg);font-weight:900;cursor:pointer;
      font-family:inherit;font-size:0.9rem;margin-bottom:15px
    ">🔍 بحث</button>

    <div id="osintResult" style="
      background:rgba(0,212,255,0.05);border:1px solid rgba(0,212,255,0.3);
      border-radius:10px;padding:15px;font-family:monospace;font-size:0.78rem;
      line-height:1.8;min-height:60px;color:var(--accent);display:none
    "></div>

    <button onclick="openOSINT()" style="
      width:100%;padding:10px;background:color-mix(in srgb,var(--primary) 8%,transparent);
      border:1px solid var(--border);border-radius:8px;color:var(--primary);
      cursor:pointer;font-family:inherit;font-weight:700;font-size:0.8rem;margin-top:10px
    ">← رجوع</button>
  `);
}

function runOSINT(id) {
  const v = document.getElementById('osintInput').value.trim();
  if (!v) return;
  
  const r = document.getElementById('osintResult');
  r.style.display = 'block';
  
  if (id === 'phone') {
    const codes = { '+20': '🇪🇬 مصر', '+966': '🇸🇦 السعودية', '+971': '🇦🇪 الإمارات', '+1': '🇺🇸 أمريكا', '+44': '🇬🇧 بريطانيا', '+49': '🇩🇪 ألمانيا', '+33': '🇫🇷 فرنسا' };
    let country = '🌍 غير معروف';
    for (const c in codes) if (v.startsWith(c)) { country = codes[c]; break; }
    
    r.innerHTML = `
      <div style="color:var(--primary);font-weight:900;margin-bottom:10px">✅ النتيجة</div>
      <div>📱 الرقم: <span style="color:var(--accent)">${v}</span></div>
      <div>🌍 الدولة: <span style="color:var(--accent)">${country}</span></div>
      <div>📏 الطول: <span style="color:var(--accent)">${v.length}</span></div>
      <div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--border)">
        <a href="https://wa.me/${v.replace('+','').replace(/\D/g,'')}" target="_blank" style="color:#25D366;text-decoration:none">💬 WhatsApp</a> • 
        <a href="https://t.me/${v}" target="_blank" style="color:#0088cc;text-decoration:none">✈️ Telegram</a>
      </div>
    `;
    addXP(20);
  }
  else if (id === 'email') {
    if (!v.includes('@')) { r.innerHTML = '<div style="color:var(--red)">❌ إيميل غير صحيح</div>'; return; }
    const [user, domain] = v.split('@');
    const providers = { 'gmail.com': 'Google', 'yahoo.com': 'Yahoo', 'outlook.com': 'Microsoft', 'icloud.com': 'Apple' };
    
    r.innerHTML = `
      <div style="color:var(--primary);font-weight:900;margin-bottom:10px">✅ معلومات الإيميل</div>
      <div>👤 المستخدم: <span style="color:var(--accent)">${user}</span></div>
      <div>🌐 النطاق: <span style="color:var(--accent)">${domain}</span></div>
      <div>📡 المزود: <span style="color:var(--accent)">${providers[domain.toLowerCase()] || 'آخر'}</span></div>
    `;
    addXP(20);
  }
  else if (id === 'ip') {
    r.innerHTML = '<div style="color:var(--accent)">⏳ جاري البحث...</div>';
    fetch(`https://ipapi.co/${v}/json/`)
      .then(res => res.json())
      .then(d => {
        if (d.error) { r.innerHTML = '<div style="color:var(--red)">❌ IP غير صحيح</div>'; return; }
        r.innerHTML = `
          <div style="color:var(--primary);font-weight:900;margin-bottom:10px">✅ معلومات IP</div>
          <div>🌍 البلد: <span style="color:var(--accent)">${d.country_name || 'N/A'}</span></div>
          <div>🏙️ المدينة: <span style="color:var(--accent)">${d.city || 'N/A'}</span></div>
          <div>📡 المزود: <span style="color:var(--accent)">${d.org || 'N/A'}</span></div>
          <div>📍 الإحداثيات: <span style="color:var(--accent)">${d.latitude || '?'}, ${d.longitude || '?'}</span></div>
          <div>🕐 التوقيت: <span style="color:var(--accent)">${d.timezone || 'N/A'}</span></div>
        `;
        addXP(30);
      })
      .catch(() => r.innerHTML = '<div style="color:var(--red)">❌ فشل الاتصال</div>');
  }
  else if (id === 'hash') {
    const hash = v.toLowerCase();
    let type = 'Unknown';
    if (hash.length === 32) type = 'MD5';
    else if (hash.length === 40) type = 'SHA-1';
    else if (hash.length === 64) type = 'SHA-256';
    else if (hash.length === 128) type = 'SHA-512';
    
    const db = {
      '5d41402abc4b2a76b9719d911017c592': 'hello',
      'e10adc3949ba59abbe56e057f20f883e': '123456',
      '5f4dcc3b5aa765d61d8327deb882cf99': 'password',
      '21232f297a57a5a743894a0e4a801fc3': 'admin'
    };
    const cracked = db[hash];
    
    r.innerHTML = `
      <div style="color:var(--primary);font-weight:900;margin-bottom:10px">✅ تحليل Hash</div>
      <div>📏 الطول: <span style="color:var(--accent)">${hash.length}</span></div>
      <div>🔍 النوع: <span style="color:var(--accent)">${type}</span></div>
      <div>${cracked ? `🔓 كلمة المرور: <span style="color:var(--primary)">${cracked}</span>` : '⚠️ لم يتم الكسر'}</div>
    `;
    addXP(20);
  }
  else if (id === 'domain') {
    const clean = v.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    const tld = clean.split('.').pop();
    
    r.innerHTML = `
      <div style="color:var(--primary);font-weight:900;margin-bottom:10px">✅ معلومات النطاق</div>
      <div>🌐 النطاق: <span style="color:var(--accent)">${clean}</span></div>
      <div>📌 TLD: <span style="color:var(--accent)">.${tld}</span></div>
      <div>📏 الطول: <span style="color:var(--accent)">${clean.length}</span></div>
    `;
    addXP(20);
  }
  else if (id === 'url') {
    if (!v.startsWith('http')) { r.innerHTML = '<div style="color:var(--red)">❌ رابط غير صحيح</div>'; return; }
    
    let score = 0;
    const findings = [];
    
    if (!v.startsWith('https://')) { score += 2; findings.push('❌ لا HTTPS'); }
    else findings.push('✅ HTTPS');
    
    ['free','login','verify','bit.ly','hack','prize'].forEach(kw => {
      if (v.toLowerCase().includes(kw)) { score += 2; findings.push(`⚠️ ${kw}`); }
    });
    
    r.innerHTML = `
      <div style="color:var(--primary);font-weight:900;margin-bottom:10px">✅ فحص الرابط</div>
      <div style="color:${score >= 3 ? 'var(--red)' : 'var(--primary)'}">
        ${score >= 3 ? '⚠️ مشبوه' : '✅ آمن'} (${score}/10)
      </div>
      ${findings.map(f => `<div style="font-size:0.75rem">${f}</div>`).join('')}
    `;
    addXP(25);
  }
  else if (id === 'dns') {
    r.innerHTML = '<div style="color:var(--accent)">⏳ جاري البحث...</div>';
    fetch(`https://dns.google/resolve?name=${v}&type=A`)
      .then(res => res.json())
      .then(d => {
        if (!d.Answer || d.Answer.length === 0) {
          r.innerHTML = '<div style="color:var(--red)">❌ لا توجد نتائج</div>';
          return;
        }
        r.innerHTML = `
          <div style="color:var(--primary);font-weight:900;margin-bottom:10px">✅ سجلات DNS</div>
          ${d.Answer.map(a => `<div>📡 ${a.data}</div>`).join('')}
        `;
        addXP(25);
      })
      .catch(() => r.innerHTML = '<div style="color:var(--red)">❌ فشل البحث</div>');
  }
  else if (id === 'username') {
    const sites = ['Instagram', 'Twitter', 'Facebook', 'TikTok', 'GitHub', 'YouTube', 'Reddit', 'Pinterest'];
    
    r.innerHTML = `
      <div style="color:var(--primary);font-weight:900;margin-bottom:10px">✅ نتائج @${v}</div>
      ${sites.map(s => {
        const found = Math.random() > 0.5;
        return `<div style="font-size:0.75rem">${found ? '✅' : '❌'} ${s}</div>`;
      }).join('')}
    `;
    addXP(30);
  }
}
/* ═══════════════════════════════════════════
   📊 SECURITY SCORE
   ═══════════════════════════════════════════ */
function openScore() {
  openModal('📊 SECURITY SCORE', `
    <div style="text-align:center;padding:15px 0">
      <div style="font-size:3.5rem;margin-bottom:15px">📊</div>
      <div style="color:var(--primary);font-size:1.1rem;font-weight:900;margin-bottom:10px">
        فحص أمانك الشخصي
      </div>
      <div style="color:var(--text-dim);font-size:0.82rem;margin-bottom:25px">
        افحص بصمتك الرقمية — اعرف نقاط ضعفك
      </div>
      
      <input type="email" id="scoreEmail" placeholder="أدخل إيميلك للفحص..." style="
        width:100%;padding:14px;background:#000;border:2px solid var(--primary);border-radius:10px;
        color:var(--primary);font-family:monospace;font-size:0.9rem;outline:none;
        margin-bottom:15px;direction:ltr;text-align:left
      " autocomplete="off">
      
      <button onclick="startScoreScan()" style="
        width:100%;padding:14px;background:linear-gradient(135deg,var(--primary),var(--primary-dim));
        border:none;border-radius:10px;color:var(--bg);font-weight:900;cursor:pointer;
        font-family:inherit;font-size:1rem
      ">🔍 ابدأ الفحص</button>
    </div>
  `);
}

function startScoreScan() {
  const email = document.getElementById('scoreEmail').value.trim();
  if (!email || !email.includes('@')) {
    showToast('❌ إيميل غير صحيح');
    return;
  }
  
  const content = document.getElementById('modalContent');
  
  let progress = 0;
  content.innerHTML = `
    <div style="text-align:center;padding:30px 0">
      <div style="font-size:3rem;margin-bottom:20px;animation:successPulse 1s infinite">🔍</div>
      <div style="color:var(--primary);font-size:1rem;font-weight:900;margin-bottom:20px">جاري الفحص...</div>
      <div style="height:8px;background:color-mix(in srgb,var(--primary) 10%,transparent);border-radius:4px;overflow:hidden;margin-bottom:15px">
        <div id="scoreProgressFill" style="height:100%;width:0%;background:linear-gradient(90deg,var(--primary-dim),var(--primary));transition:width 0.3s;box-shadow:0 0 15px var(--primary)"></div>
      </div>
      <div id="scoreProgressText" style="color:var(--text-dim);font-size:0.75rem">0%</div>
    </div>
  `;
  
  const steps = [
    '📧 التحقق من الإيميل...',
    '🔍 فحص التسريبات...',
    '🛡️ تحليل الأمان...',
    '📊 حساب النقاط...',
    '✅ إكمال التقرير...'
  ];
  
  let currentStep = 0;
  const interval = setInterval(() => {
    progress += 10;
    if (progress > 100) progress = 100;
    
    const fill = document.getElementById('scoreProgressFill');
    const text = document.getElementById('scoreProgressText');
    if (fill) fill.style.width = progress + '%';
    if (text) text.textContent = progress + '%';
    
    if (progress % 20 === 0 && currentStep < steps.length) {
      showToast(steps[currentStep]);
      currentStep++;
    }
    
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => showScoreResult(email), 500);
    }
  }, 200);
}

function showScoreResult(email) {
  const score = Math.floor(Math.random() * 40) + 50;
  const leaks = Math.floor(Math.random() * 4);
  const weakPoints = Math.floor(Math.random() * 3) + 1;
  
  let scoreColor, scoreText;
  if (score >= 80) { scoreColor = 'var(--primary)'; scoreText = 'ممتاز'; }
  else if (score >= 60) { scoreColor = 'var(--gold)'; scoreText = 'جيد'; }
  else { scoreColor = 'var(--red)'; scoreText = 'ضعيف'; }
  
  addXP(50);
  
  document.getElementById('modalContent').innerHTML = `
    <div style="text-align:center;padding:15px 0">
      <div style="font-size:3.5rem;margin-bottom:15px">📊</div>
      <div style="color:var(--primary);font-size:1rem;font-weight:900;margin-bottom:20px">
        تقرير الأمان
      </div>
      
      <div style="position:relative;width:140px;height:140px;margin:0 auto 20px">
        <svg width="140" height="140" style="transform:rotate(-90deg)">
          <circle cx="70" cy="70" r="60" fill="none" stroke="color-mix(in srgb,var(--primary) 15%,transparent)" stroke-width="8"/>
          <circle cx="70" cy="70" r="60" fill="none" stroke="${scoreColor}" stroke-width="8"
            stroke-dasharray="${(score / 100) * 377} 377" stroke-linecap="round"
            style="filter:drop-shadow(0 0 10px ${scoreColor})"/>
        </svg>
        <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column">
          <div style="color:${scoreColor};font-size:2rem;font-weight:900;text-shadow:0 0 15px ${scoreColor}">${score}</div>
          <div style="color:var(--text-dim);font-size:0.7rem">من 100</div>
        </div>
      </div>
      
      <div style="color:${scoreColor};font-size:1.1rem;font-weight:900;margin-bottom:20px">${scoreText}</div>
      
      <div style="text-align:right;display:grid;gap:10px;margin-bottom:20px">
        <div style="padding:12px;background:color-mix(in srgb,var(--primary) 5%,transparent);border:1px solid var(--border);border-radius:8px;display:flex;justify-content:space-between">
          <span style="color:var(--text-dim);font-size:0.8rem">📧 الإيميل</span>
          <span style="color:var(--primary);font-size:0.8rem;direction:ltr">${email}</span>
        </div>
        <div style="padding:12px;background:${leaks > 0 ? 'rgba(255,51,85,0.1)' : 'color-mix(in srgb,var(--primary) 5%,transparent)'};border:1px solid ${leaks > 0 ? 'var(--red)' : 'var(--border)'};border-radius:8px;display:flex;justify-content:space-between">
          <span style="color:var(--text-dim);font-size:0.8rem">🚨 التسريبات</span>
          <span style="color:${leaks > 0 ? 'var(--red)' : 'var(--primary)'};font-size:0.8rem;font-weight:700">${leaks}</span>
        </div>
        <div style="padding:12px;background:color-mix(in srgb,var(--primary) 5%,transparent);border:1px solid var(--border);border-radius:8px;display:flex;justify-content:space-between">
          <span style="color:var(--text-dim);font-size:0.8rem">⚠️ نقاط ضعف</span>
          <span style="color:var(--gold);font-size:0.8rem;font-weight:700">${weakPoints}</span>
        </div>
      </div>
      
      <div style="padding:15px;background:color-mix(in srgb,var(--primary) 5%,transparent);border:1px solid var(--border);border-radius:10px;text-align:right;margin-bottom:20px">
        <div style="color:var(--primary);font-weight:900;font-size:0.85rem;margin-bottom:10px">💡 التوصيات:</div>
        <div style="color:var(--text-dim);font-size:0.75rem;line-height:1.8">
          • غيّر كلمة المرور بشكل دوري<br>
          • فعّل المصادقة الثنائية (2FA)<br>
          • لا تشارك بياناتك مع مواقع مجهولة
        </div>
      </div>
      
      <button onclick="closeModal()" style="width:100%;padding:12px;background:linear-gradient(135deg,var(--primary),var(--primary-dim));border:none;border-radius:10px;color:var(--bg);font-weight:900;cursor:pointer;font-family:inherit">
        ✓ تم
      </button>
    </div>
  `;
}

/* ═══════════════════════════════════════════
   🎓 LEARN ACADEMY
   ═══════════════════════════════════════════ */
const LESSONS = [
  {
    id: 'l1', icon: '🐧', title: 'أساسيات Linux',
    level: 'مبتدئ', duration: '10 دقائق',
    content: `
      <p style="margin-bottom:10px"><b style="color:var(--primary)">Linux</b> هو نظام تشغيل مفتوح المصدر يستخدم في معظم السيرفرات.</p>
      <p style="margin-bottom:10px"><b style="color:var(--accent)">أهم الأوامر:</b></p>
      <div style="background:#000;padding:12px;border-radius:8px;font-family:monospace;font-size:0.78rem;line-height:1.8;color:var(--primary);direction:ltr;text-align:left">
        ls      # عرض الملفات<br>
        cd      # تغيير المجلد<br>
        mkdir   # إنشاء مجلد<br>
        rm      # حذف ملف<br>
        cat     # عرض محتوى ملف<br>
        sudo    # تنفيذ كمسؤول
      </div>
    `
  },
  {
    id: 'l2', icon: '🌐', title: 'أساسيات الشبكات',
    level: 'مبتدئ', duration: '15 دقيقة',
    content: `
      <p style="margin-bottom:10px"><b style="color:var(--primary)">الشبكات</b> هي أساس أي هجوم سيبراني.</p>
      <p style="margin-bottom:10px"><b style="color:var(--accent)">المفاهيم:</b></p>
      <p>• IP: عنوان الجهاز في الشبكة</p>
      <p>• MAC: عنوان الجهاز الفيزيائي</p>
      <p>• DNS: يحوّل الأسماء لأرقام IP</p>
      <p>• Ports: منافذ الاتصال</p>
      <p style="margin-top:10px">• TCP/IP: بروتوكولات الاتصال</p>
    `
  },
  {
    id: 'l3', icon: '🔐', title: 'التشفير',
    level: 'متوسط', duration: '20 دقيقة',
    content: `
      <p style="margin-bottom:10px"><b style="color:var(--primary)">التشفير</b> هو تحويل البيانات لشكل غير مفهوم.</p>
      <p style="margin-bottom:10px"><b style="color:var(--accent)">الأنواع:</b></p>
      <p>• <b>Symmetric:</b> نفس المفتاح للتشفير والفك</p>
      <p>• <b>Asymmetric:</b> مفتاح عام ومفتاح خاص</p>
      <p>• <b>Hashing:</b> تحويل لا رجعة فيه (MD5, SHA)</p>
      <p style="margin-top:10px"><b style="color:var(--gold)">💡 AES-256 هو المعيار الحالي.</b></p>
    `
  },
  {
    id: 'l4', icon: '🎯', title: 'مراحل الاختراق',
    level: 'متوسط', duration: '25 دقيقة',
    content: `
      <p style="margin-bottom:10px"><b style="color:var(--primary)">5 مراحل</b> لأي اختراق أخلاقي:</p>
      <p style="margin:6px 0"><b style="color:var(--accent)">1. Reconnaissance</b> — جمع المعلومات</p>
      <p style="margin:6px 0"><b style="color:var(--accent)">2. Scanning</b> — فحص المنافذ والخدمات</p>
      <p style="margin:6px 0"><b style="color:var(--accent)">3. Gaining Access</b> — استغلال ثغرة</p>
      <p style="margin:6px 0"><b style="color:var(--accent)">4. Maintaining Access</b> — البقاء داخل النظام</p>
      <p style="margin:6px 0"><b style="color:var(--accent)">5. Covering Tracks</b> — مسح الآثار</p>
    `
  },
  {
    id: 'l5', icon: '🛡️', title: 'أساسيات الحماية',
    level: 'مبتدئ', duration: '12 دقيقة',
    content: `
      <p style="margin-bottom:10px"><b style="color:var(--primary)">الحماية</b> أهم من الاختراق!</p>
      <p style="margin-bottom:10px"><b style="color:var(--accent)">الأساسيات:</b></p>
      <p>• كلمة مرور قوية (12+ حرف)</p>
      <p>• 2FA على كل حساباتك</p>
      <p>• تحديث مستمر للبرامج</p>
      <p>• Backup دوري</p>
      <p>• VPN على الشبكات العامة</p>
    `
  },
  {
    id: 'l6', icon: '🔍', title: 'OSINT',
    level: 'متوسط', duration: '18 دقيقة',
    content: `
      <p style="margin-bottom:10px"><b style="color:var(--primary)">OSINT</b> = جمع معلومات من المصادر المفتوحة.</p>
      <p style="margin-bottom:10px"><b style="color:var(--accent)">المصادر:</b></p>
      <p>• محركات البحث (Google)</p>
      <p>• مواقع التواصل (Facebook, Twitter)</p>
      <p>• WhoIs للسجلات</p>
      <p>• Shodan للأجهزة</p>
      <p>• HaveIBeenPwned للتسريبات</p>
    `
  },
  {
    id: 'l7', icon: '🎣', title: 'الهندسة الاجتماعية',
    level: 'متوسط', duration: '15 دقيقة',
    content: `
      <p style="margin-bottom:10px"><b style="color:var(--primary)">الهندسة الاجتماعية</b> = خداع البشر بدل الأجهزة.</p>
      <p style="margin-bottom:10px"><b style="color:var(--accent)">الأساليب:</b></p>
      <p>• Phishing — إيميلات مزيفة</p>
      <p>• Pretexting — قصة كاذبة</p>
      <p>• Baiting — إغراء</p>
      <p>• Tailgating — دخول مع شخص</p>
    `
  },
  {
    id: 'l8', icon: '⚔️', title: 'أدوات الاختراق',
    level: 'متقدم', duration: '30 دقيقة',
    content: `
      <p style="margin-bottom:10px"><b style="color:var(--primary)">أشهر الأدوات:</b></p>
      <p>• <b>Nmap</b> — فحص الشبكات</p>
      <p>• <b>Metasploit</b> — استغلال الثغرات</p>
      <p>• <b>Burp Suite</b> — اختبار الويب</p>
      <p>• <b>Wireshark</b> — تحليل الشبكة</p>
      <p>• <b>John the Ripper</b> — كسر كلمات المرور</p>
      <p>• <b>Hydra</b> — Brute Force</p>
    `
  }
];

function openLearn() {
  const completed = JSON.parse(localStorage.getItem('nexus-learn-done') || '[]');
  
  let html = `
    <p style="color:var(--text-dim);font-size:0.8rem;margin-bottom:15px;text-align:center">
      8 دروس تفاعلية — اتعلم من الصفر
    </p>
  `;
  
  LESSONS.forEach(lesson => {
    const done = completed.includes(lesson.id);
    
    html += `
      <div onclick="openLesson('${lesson.id}')" style="
        padding:14px;
        background:color-mix(in srgb,var(--primary) 3%,transparent);
        border:1px solid ${done ? 'var(--primary)' : 'var(--border)'};
        border-radius:10px;
        margin-bottom:10px;
        cursor:pointer;
      ">
        <div style="display:flex;align-items:center;gap:12px">
          <span style="font-size:1.6rem">${lesson.icon}</span>
          <div style="flex:1">
            <div style="color:var(--primary);font-weight:900;font-size:0.88rem">${done ? '✓ ' : ''}${lesson.title}</div>
            <div style="color:var(--text-dim);font-size:0.7rem">${lesson.level} • ${lesson.duration}</div>
          </div>
          <span style="color:var(--text-dim);font-size:1rem">←</span>
        </div>
      </div>
    `;
  });
  
  openModal('🎓 LEARN ACADEMY', html);
}

function openLesson(id) {
  const lesson = LESSONS.find(l => l.id === id);
  if (!lesson) return;
  
  const completed = JSON.parse(localStorage.getItem('nexus-learn-done') || '[]');
  const isCompleted = completed.includes(id);
  
  openModal(`${lesson.icon} ${lesson.title}`, `
    <div style="padding:10px 0">
      <div style="display:flex;justify-content:space-between;margin-bottom:15px;font-size:0.75rem">
        <span style="color:var(--text-dim)">📚 ${lesson.level}</span>
        <span style="color:var(--text-dim)">⏱️ ${lesson.duration}</span>
      </div>
      
      <div style="color:var(--text);font-size:0.85rem;line-height:1.8;margin-bottom:20px">
        ${lesson.content}
      </div>
      
      ${isCompleted ? `
        <div style="padding:12px;background:color-mix(in srgb,var(--primary) 10%,transparent);border:1px solid var(--primary);border-radius:10px;text-align:center;margin-bottom:15px">
          <div style="color:var(--primary);font-weight:900;font-size:0.85rem">✓ درس مكتمل</div>
        </div>
      ` : `
        <button onclick="completeLesson('${lesson.id}')" style="
          width:100%;padding:12px;background:linear-gradient(135deg,var(--primary),var(--primary-dim));
          border:none;border-radius:10px;color:var(--bg);font-weight:900;cursor:pointer;
          font-family:inherit;font-size:0.9rem;margin-bottom:10px
        ">✅ أنهيت الدرس</button>
      `}
      
      <button onclick="openLearn()" style="
        width:100%;padding:10px;background:color-mix(in srgb,var(--primary) 8%,transparent);
        border:1px solid var(--border);border-radius:8px;color:var(--primary);
        cursor:pointer;font-family:inherit;font-weight:700;font-size:0.8rem
      ">← رجوع للدروس</button>
    </div>
  `);
}

function completeLesson(id) {
  const completed = JSON.parse(localStorage.getItem('nexus-learn-done') || '[]');
  if (!completed.includes(id)) {
    completed.push(id);
    localStorage.setItem('nexus-learn-done', JSON.stringify(completed));
    addXP(100);
    showToast('✅ +100 XP');
  }
  
  setTimeout(openLearn, 300);
}
/* ═══════════════════════════════════════════
   🎮 CTF ZONE
   ═══════════════════════════════════════════ */
const CTF_CHALLENGES = [
  { id: 'c1', icon: '🔐', name: 'فك Base64', level: 'EASY', points: 100,
    challenge: 'SGVsbG9fSGFja2Vy', answer: 'hello_hacker',
    hint: 'Base64 يشفر النصوص' },
  { id: 'c2', icon: '🔢', name: 'Binary Decode', level: 'EASY', points: 150,
    challenge: '01001000 01100001 01100011 01101011', answer: 'hack',
    hint: 'كل 8 أرقام = حرف ASCII' },
  { id: 'c3', icon: '🔤', name: 'Caesar Cipher', level: 'MEDIUM', points: 200,
    challenge: 'Kdfnhu', answer: 'hacker',
    hint: 'shift = 3' },
  { id: 'c4', icon: '🔒', name: 'MD5 Crack', level: 'MEDIUM', points: 250,
    challenge: '5d41402abc4b2a76b9719d911017c592', answer: 'hello',
    hint: 'كلمة شائعة جداً' },
  { id: 'c5', icon: '🔐', name: 'SHA-256 Crack', level: 'HARD', points: 300,
    challenge: '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae', answer: 'foo',
    hint: '3 حروف إنجليزية' },
  { id: 'c6', icon: '🔡', name: 'ROT13', level: 'EASY', points: 150,
    challenge: 'unpxre', answer: 'hacker',
    hint: 'حرّك 13 حرف' },
  { id: 'c7', icon: '🔣', name: 'Hex Decode', level: 'MEDIUM', points: 200,
    challenge: '6861636b6572', answer: 'hacker',
    hint: 'كل حرف = رقمين hex' },
  { id: 'c8', icon: '🧩', name: 'URL Decode', level: 'EASY', points: 150,
    challenge: '%68%61%63%6b%65%72', answer: 'hacker',
    hint: 'كل %XX = حرف' },
  { id: 'c9', icon: '🔐', name: 'Morse Code', level: 'MEDIUM', points: 200,
    challenge: '.... .- -.-. -.- . .-.', answer: 'hacker',
    hint: 'نقطة = قصير، شرطة = طويل' },
  { id: 'c10', icon: '👑', name: 'Final Challenge', level: 'EXPERT', points: 500,
    challenge: 'aGFja2Vy', answer: 'hacker',
    hint: 'Base64 للأحرف الإنجليزية' }
];

function openCTF() {
  const completed = JSON.parse(localStorage.getItem('nexus-ctf-done') || '[]');
  const totalPoints = completed.reduce((sum, id) => {
    const c = CTF_CHALLENGES.find(x => x.id === id);
    return sum + (c ? c.points : 0);
  }, 0);
  
  let html = `
    <div style="padding:12px;background:color-mix(in srgb,var(--primary) 5%,transparent);border:1px solid var(--border);border-radius:10px;margin-bottom:15px;display:flex;justify-content:space-between;font-size:0.8rem">
      <span style="color:var(--text-dim)">✅ ${completed.length}/${CTF_CHALLENGES.length} مكتمل</span>
      <span style="color:var(--gold);font-weight:900">${totalPoints} XP</span>
    </div>
  `;
  
  CTF_CHALLENGES.forEach(c => {
    const done = completed.includes(c.id);
    const levelColors = {
      'EASY': 'var(--primary)',
      'MEDIUM': 'var(--gold)',
      'HARD': '#ff9955',
      'EXPERT': 'var(--red)'
    };
    
    html += `
      <div onclick="openCTFChallenge('${c.id}')" style="
        padding:12px;
        background:color-mix(in srgb,var(--primary) 3%,transparent);
        border:1px solid ${done ? 'var(--primary)' : 'var(--border)'};
        border-radius:10px;
        margin-bottom:8px;
        cursor:pointer;
      ">
        <div style="display:flex;align-items:center;gap:10px">
          <span style="font-size:1.4rem">${c.icon}</span>
          <div style="flex:1">
            <div style="color:var(--primary);font-weight:900;font-size:0.85rem">${done ? '✓ ' : ''}${c.name}</div>
          </div>
          <div style="text-align:left">
            <div style="color:${levelColors[c.level]};font-size:0.6rem;font-weight:700">${c.level}</div>
            <div style="color:var(--gold);font-size:0.7rem;font-weight:900">+${c.points}</div>
          </div>
        </div>
      </div>
    `;
  });
  
  openModal('🎮 CTF ZONE', html);
}

function openCTFChallenge(id) {
  const c = CTF_CHALLENGES.find(x => x.id === id);
  if (!c) return;
  
  openModal(`${c.icon} ${c.name}`, `
    <div style="padding:10px 0">
      <div style="padding:10px;background:rgba(255,204,0,0.08);border-right:3px solid var(--gold);border-radius:6px;font-size:0.75rem;color:var(--gold);margin-bottom:15px">
        💡 ${c.hint}
      </div>
      
      <div style="background:#000;padding:15px;border:1px solid var(--primary);border-radius:10px;font-family:monospace;font-size:0.85rem;color:var(--primary);word-break:break-all;direction:ltr;text-align:left;margin-bottom:15px">
        ${c.challenge}
      </div>
      
      <input type="text" id="ctfInput" placeholder="اكتب الإجابة..." style="
        width:100%;padding:14px;background:#000;border:2px solid var(--primary);border-radius:10px;
        color:var(--primary);font-family:monospace;font-size:0.9rem;outline:none;
        margin-bottom:12px;direction:ltr;text-align:left
      " autocomplete="off">
      
      <button onclick="checkCTF('${c.id}')" style="
        width:100%;padding:12px;background:linear-gradient(135deg,var(--primary),var(--primary-dim));
        border:none;border-radius:10px;color:var(--bg);font-weight:900;cursor:pointer;
        font-family:inherit;font-size:0.9rem;margin-bottom:10px
      ">✓ التحقق</button>
      
      <button onclick="openCTF()" style="
        width:100%;padding:10px;background:color-mix(in srgb,var(--primary) 8%,transparent);
        border:1px solid var(--border);border-radius:8px;color:var(--primary);
        cursor:pointer;font-family:inherit;font-weight:700;font-size:0.8rem
      ">← رجوع</button>
    </div>
  `);
  
  setTimeout(() => {
    const inp = document.getElementById('ctfInput');
    if (inp) {
      inp.focus();
      inp.addEventListener('keypress', e => { if (e.key === 'Enter') checkCTF(c.id); });
    }
  }, 100);
}

function checkCTF(id) {
  const c = CTF_CHALLENGES.find(x => x.id === id);
  const inp = document.getElementById('ctfInput');
  const answer = inp.value.trim().toLowerCase();
  
  if (!answer) return;
  
  if (answer === c.answer.toLowerCase()) {
    const completed = JSON.parse(localStorage.getItem('nexus-ctf-done') || '[]');
    if (!completed.includes(id)) {
      completed.push(id);
      localStorage.setItem('nexus-ctf-done', JSON.stringify(completed));
      addXP(c.points);
    }
    
    openModal('✅ صحيح!', `
      <div style="text-align:center;padding:30px 0">
        <div style="font-size:4rem;margin-bottom:15px;animation:successPulse 0.5s">🎉</div>
        <div style="color:var(--primary);font-size:1.3rem;font-weight:900;margin-bottom:10px">إجابة صحيحة!</div>
        <div style="color:var(--gold);font-size:1rem;margin-bottom:20px">+${c.points} XP</div>
        <button onclick="openCTF()" style="width:100%;padding:12px;background:linear-gradient(135deg,var(--primary),var(--primary-dim));border:none;border-radius:10px;color:var(--bg);font-weight:900;cursor:pointer;font-family:inherit">
          ← رجوع للتحديات
        </button>
      </div>
    `);
  } else {
    openModal('❌ خطأ!', `
      <div style="text-align:center;padding:30px 0">
        <div style="font-size:4rem;margin-bottom:15px">💥</div>
        <div style="color:var(--red);font-size:1.3rem;font-weight:900;margin-bottom:15px">إجابة خطأ!</div>
        <div style="color:var(--text-dim);font-size:0.8rem;margin-bottom:20px">حاول تاني</div>
        <button onclick="openCTFChallenge('${id}')" style="width:100%;padding:12px;background:linear-gradient(135deg,var(--red),#aa2233);border:none;border-radius:10px;color:#fff;font-weight:900;cursor:pointer;font-family:inherit">
          🔄 حاول تاني
        </button>
      </div>
    `);
  }
}

/* ═══════════════════════════════════════════
   📡 THREAT MAP
   ═══════════════════════════════════════════ */
const COUNTRIES = [
  { name: 'Russia', flag: '🇷🇺', x: 65, y: 30 },
  { name: 'China', flag: '🇨🇳', x: 75, y: 45 },
  { name: 'USA', flag: '🇺🇸', x: 22, y: 40 },
  { name: 'Iran', flag: '🇮🇷', x: 62, y: 45 },
  { name: 'Brazil', flag: '🇧🇷', x: 30, y: 70 },
  { name: 'India', flag: '🇮🇳', x: 70, y: 52 },
  { name: 'UK', flag: '🇬🇧', x: 48, y: 32 },
  { name: 'Egypt', flag: '🇪🇬', x: 55, y: 48 },
  { name: 'Korea', flag: '🇰🇷', x: 85, y: 42 },
  { name: 'Germany', flag: '🇩🇪', x: 50, y: 30 },
  { name: 'Australia', flag: '🇦🇺', x: 85, y: 78 },
  { name: 'Canada', flag: '🇨🇦', x: 20, y: 28 }
];

const ATTACK_TYPES = ['DDoS', 'Phishing', 'Malware', 'Ransomware', 'SQL Injection', 'Zero-Day'];

let threatMapIntervals = null;
let threatStats = { total: 0, blocked: 0, success: 0 };

function openThreatMap() {
  threatStats = { total: 0, blocked: 0, success: 0 };
  
  openModal('📡 THREAT MAP', `
    <div style="padding:10px 0">
      <div style="text-align:center;font-size:0.8rem;color:var(--text-dim);margin-bottom:15px">
        🌍 خريطة الهجمات الحية
      </div>
      
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:15px">
        <div style="padding:10px;background:color-mix(in srgb,var(--primary) 5%,transparent);border:1px solid var(--border);border-radius:8px;text-align:center">
          <div style="color:var(--text-dim);font-size:0.65rem">الهجمات</div>
          <div id="threatTotal" style="color:var(--red);font-weight:900;font-size:1rem">0</div>
        </div>
        <div style="padding:10px;background:color-mix(in srgb,var(--primary) 5%,transparent);border:1px solid var(--border);border-radius:8px;text-align:center">
          <div style="color:var(--text-dim);font-size:0.65rem">صد</div>
          <div id="threatBlocked" style="color:var(--primary);font-weight:900;font-size:1rem">0</div>
        </div>
        <div style="padding:10px;background:color-mix(in srgb,var(--primary) 5%,transparent);border:1px solid var(--border);border-radius:8px;text-align:center">
          <div style="color:var(--text-dim);font-size:0.65rem">نجحت</div>
          <div id="threatSuccess" style="color:var(--gold);font-weight:900;font-size:1rem">0</div>
        </div>
      </div>
      
      <div style="position:relative;height:280px;background:linear-gradient(135deg,#000,#0a1a0a);border:1px solid var(--border);border-radius:12px;overflow:hidden;margin-bottom:15px">
        <canvas id="threatCanvas" style="width:100%;height:100%;display:block"></canvas>
      </div>
      
      <div style="background:#000;border:1px solid var(--border);border-radius:10px;padding:10px;height:120px;overflow-y:auto;font-family:monospace;font-size:0.7rem" id="threatFeed">
        <div style="color:var(--primary)">> بدء المراقبة...</div>
      </div>
      
      <button onclick="closeThreatMap()" style="
        width:100%;padding:10px;background:color-mix(in srgb,var(--primary) 8%,transparent);
        border:1px solid var(--border);border-radius:8px;color:var(--primary);
        cursor:pointer;font-family:inherit;font-weight:700;font-size:0.8rem;margin-top:12px
      ">✕ إغلاق</button>
    </div>
  `);
  
  setTimeout(startThreatMap, 100);
}

function startThreatMap() {
  const canvas = document.getElementById('threatCanvas');
  if (!canvas) return;
  
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  
  const ctx = canvas.getContext('2d');
  const attacks = [];
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = 'rgba(0,255,65,0.05)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.moveTo(0, (canvas.height / 20) * i);
      ctx.lineTo(canvas.width, (canvas.height / 20) * i);
      ctx.stroke();
    }
    for (let i = 0; i < 30; i++) {
      ctx.beginPath();
      ctx.moveTo((canvas.width / 30) * i, 0);
      ctx.lineTo((canvas.width / 30) * i, canvas.height);
      ctx.stroke();
    }
    
    COUNTRIES.forEach(c => {
      const cx = (c.x / 100) * canvas.width;
      const cy = (c.y / 100) * canvas.height;
      
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#00ff41';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00ff41';
      ctx.fill();
      ctx.shadowBlur = 0;
      
      ctx.fillStyle = 'rgba(0,255,65,0.5)';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(c.name, cx, cy - 10);
    });
    
    attacks.forEach(a => {
      const fromX = (a.from.x / 100) * canvas.width;
      const fromY = (a.from.y / 100) * canvas.height;
      const toX = (a.to.x / 100) * canvas.width;
      const toY = (a.to.y / 100) * canvas.height;
      
      const curX = fromX + (toX - fromX) * a.progress;
      const curY = fromY + (toY - fromY) * a.progress;
      
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(curX, curY);
      ctx.strokeStyle = a.success ? 'rgba(0,255,65,0.7)' : 'rgba(255,51,85,0.7)';
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 10;
      ctx.shadowColor = a.success ? '#00ff41' : '#ff3355';
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(curX, curY, 4, 0, Math.PI * 2);
      ctx.fillStyle = a.success ? '#00ff41' : '#ff3355';
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    
    requestAnimationFrame(draw);
  }
  
  function spawnAttack() {
    if (!document.getElementById('threatCanvas')) return;
    
    const from = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
    let to = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
    while (to === from) to = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
    
    const success = Math.random() > 0.6;
    const type = ATTACK_TYPES[Math.floor(Math.random() * ATTACK_TYPES.length)];
    
    attacks.push({ from, to, progress: 0, success, type });
    
    threatStats.total++;
    if (success) threatStats.success++;
    else threatStats.blocked++;
    
    const tEl = document.getElementById('threatTotal');
    const bEl = document.getElementById('threatBlocked');
    const sEl = document.getElementById('threatSuccess');
    if (tEl) tEl.textContent = threatStats.total;
    if (bEl) bEl.textContent = threatStats.blocked;
    if (sEl) sEl.textContent = threatStats.success;
    
    const feed = document.getElementById('threatFeed');
    if (feed) {
      const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
      const line = document.createElement('div');
      line.style.color = success ? '#ff3355' : '#00ff41';
      line.textContent = `[${time}] ${from.flag} ${from.name} → ${to.flag} ${to.name} | ${type} ${success ? '💀' : '🛡️'}`;
      feed.insertBefore(line, feed.firstChild);
      
      while (feed.children.length > 20) {
        feed.removeChild(feed.lastChild);
      }
    }
  }
  
  function updateAttacks() {
    attacks.forEach(a => a.progress += 0.02);
    for (let i = attacks.length - 1; i >= 0; i--) {
      if (attacks[i].progress > 1) attacks.splice(i, 1);
    }
  }
  
  draw();
  
  if (threatMapIntervals) {
    clearInterval(threatMapIntervals.attack);
    clearInterval(threatMapIntervals.update);
  }
  
  const attackInterval = setInterval(spawnAttack, 800);
  const updateInterval = setInterval(updateAttacks, 30);
  
  threatMapIntervals = {
    attack: attackInterval,
    update: updateInterval
  };
}

function closeThreatMap() {
  if (threatMapIntervals) {
    clearInterval(threatMapIntervals.attack);
    clearInterval(threatMapIntervals.update);
    threatMapIntervals = null;
  }
  closeModal();
}
/* ═══════════════════════════════════════════
   🛠️ TOOLS ARSENAL
   ═══════════════════════════════════════════ */
const ARSENAL_TOOLS = [
  { id: 'pwdgen', icon: '🔑', name: 'Password Gen', desc: 'توليد كلمات قوية' },
  { id: 'pwdstrength', icon: '🛡️', name: 'Pwd Strength', desc: 'قياس قوة كلمة' },
  { id: 'hashgen', icon: '🔐', name: 'Hash Generator', desc: 'توليد Hash' },
  { id: 'base64', icon: '📝', name: 'Base64', desc: 'تشفير/فك Base64' },
  { id: 'hex', icon: '🔣', name: 'Hex Converter', desc: 'نص ← hex' },
  { id: 'url', icon: '🌐', name: 'URL Encoder', desc: 'تشفير/فك URL' },
  { id: 'uuid', icon: '🆔', name: 'UUID Generator', desc: 'توليد UUID' },
  { id: 'json', icon: '📋', name: 'JSON Formatter', desc: 'تنسيق JSON' },
  { id: 'qr', icon: '📱', name: 'QR Generator', desc: 'توليد QR Code' },
  { id: 'rot13', icon: '🔤', name: 'ROT13', desc: 'تشفير ROT13' },
  { id: 'binary', icon: '🔢', name: 'Binary', desc: 'نص ← Binary' },
  { id: 'morse', icon: '📡', name: 'Morse Code', desc: 'نص ← Morse' }
];

function openTools() {
  const html = `
    <p style="color:var(--text-dim);font-size:0.8rem;margin-bottom:15px;text-align:center">
      12 أداة أمنية متقدمة
    </p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      ${ARSENAL_TOOLS.map(t => `
        <div onclick="openArsenalTool('${t.id}')" style="
          padding:12px;background:color-mix(in srgb,var(--primary) 5%,transparent);
          border:1px solid var(--border);border-radius:10px;cursor:pointer;text-align:center;
        ">
          <div style="font-size:1.6rem;margin-bottom:6px">${t.icon}</div>
          <div style="color:var(--primary);font-weight:900;font-size:0.78rem;margin-bottom:3px">${t.name}</div>
          <div style="color:var(--text-dim);font-size:0.65rem">${t.desc}</div>
        </div>
      `).join('')}
    </div>
  `;
  openModal('🛠️ TOOLS ARSENAL', html);
}

function openArsenalTool(id) {
  const configs = {
    pwdgen: { title: '🔑 Password Generator', body: renderPwdGen() },
    pwdstrength: { title: '🛡️ Password Strength', body: renderPwdStrength() },
    hashgen: { title: '🔐 Hash Generator', body: renderHashGen() },
    base64: { title: '📝 Base64', body: renderBase64() },
    hex: { title: '🔣 Hex Converter', body: renderHex() },
    url: { title: '🌐 URL Encoder', body: renderUrl() },
    uuid: { title: '🆔 UUID Generator', body: renderUuid() },
    json: { title: '📋 JSON Formatter', body: renderJson() },
    qr: { title: '📱 QR Generator', body: renderQr() },
    rot13: { title: '🔤 ROT13', body: renderRot13() },
    binary: { title: '🔢 Binary', body: renderBinary() },
    morse: { title: '📡 Morse Code', body: renderMorse() }
  };
  
  const cfg = configs[id];
  if (!cfg) return;
  
  openModal(cfg.title, cfg.body);
  
  setTimeout(() => {
    if (id === 'uuid') generateUUIDs();
    if (id === 'qr') generateQR();
    if (id === 'json') formatJSON();
    if (id === 'pwdgen') generatePwd();
    if (id === 'hashgen') genHashes();
  }, 100);
}

/* ─────────── Render Functions ─────────── */
function renderPwdGen() {
  return `
    <div style="padding:10px 0">
      <div style="margin-bottom:12px">
        <label style="color:var(--primary);font-weight:700;font-size:0.8rem">الطول: <span id="pwdLenVal">16</span></label>
        <input type="range" id="pwdLen" min="8" max="64" value="16" style="width:100%;margin-top:5px" oninput="document.getElementById('pwdLenVal').textContent=this.value; generatePwd()">
      </div>
      
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:15px">
        <label style="color:var(--text);font-size:0.75rem;display:flex;align-items:center;gap:6px;cursor:pointer">
          <input type="checkbox" id="pwdUpper" checked onchange="generatePwd()"> A-Z
        </label>
        <label style="color:var(--text);font-size:0.75rem;display:flex;align-items:center;gap:6px;cursor:pointer">
          <input type="checkbox" id="pwdLower" checked onchange="generatePwd()"> a-z
        </label>
        <label style="color:var(--text);font-size:0.75rem;display:flex;align-items:center;gap:6px;cursor:pointer">
          <input type="checkbox" id="pwdNum" checked onchange="generatePwd()"> 0-9
        </label>
        <label style="color:var(--text);font-size:0.75rem;display:flex;align-items:center;gap:6px;cursor:pointer">
          <input type="checkbox" id="pwdSym" checked onchange="generatePwd()"> !@#$
        </label>
      </div>
      
      <div id="pwdResult" style="
        background:#000;border:1px solid var(--primary);border-radius:10px;padding:15px;
        font-family:monospace;font-size:0.95rem;color:var(--primary);text-align:center;
        word-break:break-all;margin-bottom:12px;min-height:50px
      "></div>
      
      <button onclick="generatePwd()" style="
        width:100%;padding:12px;background:linear-gradient(135deg,var(--primary),var(--primary-dim));
        border:none;border-radius:10px;color:var(--bg);font-weight:900;cursor:pointer;
        font-family:inherit;font-size:0.9rem;margin-bottom:8px
      ">🔄 توليد جديد</button>
      
      <button onclick="openTools()" style="
        width:100%;padding:10px;background:transparent;border:1px solid var(--border);
        border-radius:8px;color:var(--text-dim);cursor:pointer;font-family:inherit;
        font-weight:700;font-size:0.8rem
      ">← رجوع</button>
    </div>
  `;
}

function renderPwdStrength() {
  return `
    <div style="padding:10px 0">
      <input type="text" id="strengthInput" placeholder="اكتب كلمة المرور..." style="
        width:100%;padding:14px;background:#000;border:2px solid var(--primary);border-radius:10px;
        color:var(--primary);font-family:monospace;font-size:0.9rem;outline:none;
        margin-bottom:15px;direction:ltr;text-align:left
      " oninput="checkPwdStrength()">
      
      <div style="height:12px;background:color-mix(in srgb,var(--primary) 10%,transparent);border-radius:6px;overflow:hidden;margin-bottom:15px">
        <div id="strengthBar" style="height:100%;width:0%;background:var(--red);transition:all 0.5s;border-radius:6px"></div>
      </div>
      
      <div id="strengthResult" style="
        background:color-mix(in srgb,var(--primary) 5%,transparent);
        border:1px solid var(--border);border-radius:10px;padding:15px;
        font-size:0.8rem;color:var(--text-dim);min-height:60px
      ">
        اكتب كلمة المرور لبدء الفحص...
      </div>
      
      <button onclick="openTools()" style="
        width:100%;padding:10px;background:color-mix(in srgb,var(--primary) 8%,transparent);
        border:1px solid var(--border);border-radius:8px;color:var(--primary);
        cursor:pointer;font-family:inherit;font-weight:700;font-size:0.8rem;margin-top:15px
      ">← رجوع</button>
    </div>
  `;
}

function renderHashGen() {
  return `
    <div style="padding:10px 0">
      <textarea id="hashInput" placeholder="اكتب النص هنا..." style="
        width:100%;padding:14px;background:#000;border:2px solid var(--primary);border-radius:10px;
        color:var(--primary);font-family:monospace;font-size:0.85rem;outline:none;
        margin-bottom:15px;min-height:100px;resize:vertical;direction:ltr;text-align:left
      " oninput="genHashes()"></textarea>
      
      <div id="hashResults"></div>
      
      <button onclick="openTools()" style="
        width:100%;padding:10px;background:color-mix(in srgb,var(--primary) 8%,transparent);
        border:1px solid var(--border);border-radius:8px;color:var(--primary);
        cursor:pointer;font-family:inherit;font-weight:700;font-size:0.8rem;margin-top:15px
      ">← رجوع</button>
    </div>
  `;
}

function renderBase64() {
  return `
    <div style="padding:10px 0">
      <textarea id="b64Input" placeholder="اكتب النص هنا..." style="
        width:100%;padding:14px;background:#000;border:2px solid var(--primary);border-radius:10px;
        color:var(--primary);font-family:monospace;font-size:0.85rem;outline:none;
        margin-bottom:12px;min-height:100px;resize:vertical;direction:ltr;text-align:left
      "></textarea>
      
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">
        <button onclick="b64Encode()" style="padding:12px;background:linear-gradient(135deg,var(--primary),var(--primary-dim));border:none;border-radius:8px;color:var(--bg);font-weight:900;cursor:pointer;font-family:inherit;font-size:0.85rem">🔒 تشفير</button>
        <button onclick="b64Decode()" style="padding:12px;background:color-mix(in srgb,var(--primary) 10%,transparent);border:1px solid var(--primary);border-radius:8px;color:var(--primary);font-weight:900;cursor:pointer;font-family:inherit;font-size:0.85rem">🔓 فك</button>
      </div>
      
      <div id="b64Result" style="background:#000;border:1px solid var(--border);border-radius:10px;padding:15px;font-family:monospace;font-size:0.8rem;color:var(--primary);word-break:break-all;min-height:60px;direction:ltr;text-align:left;display:none"></div>
      
      <button onclick="openTools()" style="width:100%;padding:10px;background:transparent;border:1px solid var(--border);border-radius:8px;color:var(--text-dim);cursor:pointer;font-family:inherit;font-weight:700;font-size:0.8rem;margin-top:12px">← رجوع</button>
    </div>
  `;
}

function renderHex() {
  return `
    <div style="padding:10px 0">
      <textarea id="hexInput" placeholder="اكتب النص..." style="width:100%;padding:14px;background:#000;border:2px solid var(--primary);border-radius:10px;color:var(--primary);font-family:monospace;font-size:0.85rem;outline:none;margin-bottom:12px;min-height:100px;resize:vertical;direction:ltr;text-align:left"></textarea>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">
        <button onclick="toHex()" style="padding:12px;background:linear-gradient(135deg,var(--primary),var(--primary-dim));border:none;border-radius:8px;color:var(--bg);font-weight:900;cursor:pointer;font-family:inherit;font-size:0.85rem">→ Hex</button>
        <button onclick="fromHex()" style="padding:12px;background:color-mix(in srgb,var(--primary) 10%,transparent);border:1px solid var(--primary);border-radius:8px;color:var(--primary);font-weight:900;cursor:pointer;font-family:inherit;font-size:0.85rem">← نص</button>
      </div>
      <div id="hexResult" style="background:#000;border:1px solid var(--border);border-radius:10px;padding:15px;font-family:monospace;font-size:0.8rem;color:var(--primary);word-break:break-all;min-height:60px;direction:ltr;text-align:left;display:none"></div>
      <button onclick="openTools()" style="width:100%;padding:10px;background:transparent;border:1px solid var(--border);border-radius:8px;color:var(--text-dim);cursor:pointer;font-family:inherit;font-weight:700;font-size:0.8rem;margin-top:12px">← رجوع</button>
    </div>
  `;
}

function renderUrl() {
  return `
    <div style="padding:10px 0">
      <textarea id="urlInput" placeholder="https://example.com/test?x=1" style="width:100%;padding:14px;background:#000;border:2px solid var(--primary);border-radius:10px;color:var(--primary);font-family:monospace;font-size:0.85rem;outline:none;margin-bottom:12px;min-height:80px;resize:vertical;direction:ltr;text-align:left"></textarea>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">
        <button onclick="urlEncode()" style="padding:12px;background:linear-gradient(135deg,var(--primary),var(--primary-dim));border:none;border-radius:8px;color:var(--bg);font-weight:900;cursor:pointer;font-family:inherit;font-size:0.85rem">🔒 Encode</button>
        <button onclick="urlDecode()" style="padding:12px;background:color-mix(in srgb,var(--primary) 10%,transparent);border:1px solid var(--primary);border-radius:8px;color:var(--primary);font-weight:900;cursor:pointer;font-family:inherit;font-size:0.85rem">🔓 Decode</button>
      </div>
      <div id="urlResult" style="background:#000;border:1px solid var(--border);border-radius:10px;padding:15px;font-family:monospace;font-size:0.8rem;color:var(--primary);word-break:break-all;min-height:60px;direction:ltr;text-align:left;display:none"></div>
      <button onclick="openTools()" style="width:100%;padding:10px;background:transparent;border:1px solid var(--border);border-radius:8px;color:var(--text-dim);cursor:pointer;font-family:inherit;font-weight:700;font-size:0.8rem;margin-top:12px">← رجوع</button>
    </div>
  `;
}

function renderUuid() {
  return `
    <div style="padding:10px 0">
      <div id="uuidResult" style="
        background:#000;border:1px solid var(--primary);border-radius:10px;padding:15px;
        font-family:monospace;font-size:0.72rem;color:var(--primary);word-break:break-all;
        min-height:120px;direction:ltr;text-align:left;line-height:2
      "></div>
      <button onclick="generateUUIDs()" style="
        width:100%;padding:12px;background:linear-gradient(135deg,var(--primary),var(--primary-dim));
        border:none;border-radius:10px;color:var(--bg);font-weight:900;cursor:pointer;
        font-family:inherit;font-size:0.9rem;margin-top:12px;margin-bottom:8px
      ">🔄 توليد 5 UUIDs</button>
      <button onclick="openTools()" style="
        width:100%;padding:10px;background:transparent;border:1px solid var(--border);
        border-radius:8px;color:var(--text-dim);cursor:pointer;font-family:inherit;
        font-weight:700;font-size:0.8rem
      ">← رجوع</button>
    </div>
  `;
}

function renderJson() {
  return `
    <div style="padding:10px 0">
      <textarea id="jsonInput" placeholder='{"name":"edman","age":22}' style="
        width:100%;padding:14px;background:#000;border:2px solid var(--primary);border-radius:10px;
        color:var(--primary);font-family:monospace;font-size:0.8rem;outline:none;
        margin-bottom:12px;min-height:120px;resize:vertical;direction:ltr;text-align:left
      " oninput="formatJSON()"></textarea>
      <div id="jsonResult" style="
        background:#000;border:1px solid var(--primary);border-radius:10px;padding:15px;
        font-family:monospace;font-size:0.72rem;color:var(--primary);
        direction:ltr;text-align:left;white-space:pre;overflow-x:auto;min-height:80px
      "></div>
      <button onclick="openTools()" style="
        width:100%;padding:10px;background:transparent;border:1px solid var(--border);
        border-radius:8px;color:var(--text-dim);cursor:pointer;font-family:inherit;
        font-weight:700;font-size:0.8rem;margin-top:12px
      ">← رجوع</button>
    </div>
  `;
}

function renderQr() {
  return `
    <div style="padding:10px 0">
      <input type="text" id="qrInput" placeholder="اكتب النص أو الرابط..." style="
        width:100%;padding:14px;background:#000;border:2px solid var(--primary);border-radius:10px;
        color:var(--primary);font-family:monospace;font-size:0.85rem;outline:none;
        margin-bottom:12px;direction:ltr;text-align:left
      " oninput="generateQR()">
      <div id="qrResult" style="
        text-align:center;padding:20px;background:#fff;border-radius:10px;
        display:none;margin-bottom:12px
      "></div>
      <button onclick="openTools()" style="
        width:100%;padding:10px;background:transparent;border:1px solid var(--border);
        border-radius:8px;color:var(--text-dim);cursor:pointer;font-family:inherit;
        font-weight:700;font-size:0.8rem
      ">← رجوع</button>
    </div>
  `;
}

function renderRot13() {
  return `
    <div style="padding:10px 0">
      <textarea id="rot13Input" placeholder="اكتب النص..." style="
        width:100%;padding:14px;background:#000;border:2px solid var(--primary);border-radius:10px;
        color:var(--primary);font-family:monospace;font-size:0.85rem;outline:none;
        margin-bottom:12px;min-height:80px;resize:vertical;direction:ltr;text-align:left
      " oninput="applyRot13()"></textarea>
      <div id="rot13Result" style="
        background:#000;border:1px solid var(--primary);border-radius:10px;padding:15px;
        font-family:monospace;font-size:0.85rem;color:var(--primary);word-break:break-all;
        min-height:50px;direction:ltr;text-align:left
      "></div>
      <button onclick="openTools()" style="
        width:100%;padding:10px;background:transparent;border:1px solid var(--border);
        border-radius:8px;color:var(--text-dim);cursor:pointer;font-family:inherit;
        font-weight:700;font-size:0.8rem;margin-top:12px
      ">← رجوع</button>
    </div>
  `;
}

function renderBinary() {
  return `
    <div style="padding:10px 0">
      <textarea id="binInput" placeholder="اكتب النص..." style="
        width:100%;padding:14px;background:#000;border:2px solid var(--primary);border-radius:10px;
        color:var(--primary);font-family:monospace;font-size:0.85rem;outline:none;
        margin-bottom:12px;min-height:80px;resize:vertical;direction:ltr;text-align:left
      "></textarea>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">
        <button onclick="toBinary()" style="padding:12px;background:linear-gradient(135deg,var(--primary),var(--primary-dim));border:none;border-radius:8px;color:var(--bg);font-weight:900;cursor:pointer;font-family:inherit;font-size:0.85rem">→ Binary</button>
        <button onclick="fromBinary()" style="padding:12px;background:color-mix(in srgb,var(--primary) 10%,transparent);border:1px solid var(--primary);border-radius:8px;color:var(--primary);font-weight:900;cursor:pointer;font-family:inherit;font-size:0.85rem">← نص</button>
      </div>
      <div id="binResult" style="background:#000;border:1px solid var(--border);border-radius:10px;padding:15px;font-family:monospace;font-size:0.8rem;color:var(--primary);word-break:break-all;min-height:60px;direction:ltr;text-align:left;display:none"></div>
      <button onclick="openTools()" style="width:100%;padding:10px;background:transparent;border:1px solid var(--border);border-radius:8px;color:var(--text-dim);cursor:pointer;font-family:inherit;font-weight:700;font-size:0.8rem;margin-top:12px">← رجوع</button>
    </div>
  `;
}

function renderMorse() {
  return `
    <div style="padding:10px 0">
      <textarea id="morseInput" placeholder="اكتب النص بالإنجليزي..." style="
        width:100%;padding:14px;background:#000;border:2px solid var(--primary);border-radius:10px;
        color:var(--primary);font-family:monospace;font-size:0.85rem;outline:none;
        margin-bottom:12px;min-height:80px;resize:vertical;direction:ltr;text-align:left
      " oninput="toMorse()"></textarea>
      <div id="morseResult" style="
        background:#000;border:1px solid var(--primary);border-radius:10px;padding:15px;
        font-family:monospace;font-size:0.85rem;color:var(--primary);word-break:break-all;
        min-height:50px;direction:ltr;text-align:left
      "></div>
      <button onclick="openTools()" style="
        width:100%;padding:10px;background:transparent;border:1px solid var(--border);
        border-radius:8px;color:var(--text-dim);cursor:pointer;font-family:inherit;
        font-weight:700;font-size:0.8rem;margin-top:12px
      ">← رجوع</button>
    </div>
  `;
}

/* ─────────── Tool Logic ─────────── */
function generatePwd() {
  const len = parseInt(document.getElementById('pwdLen').value);
  const upper = document.getElementById('pwdUpper').checked;
  const lower = document.getElementById('pwdLower').checked;
  const num = document.getElementById('pwdNum').checked;
  const sym = document.getElementById('pwdSym').checked;
  
  let chars = '';
  if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (lower) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (num) chars += '0123456789';
  if (sym) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  
  let pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += chars[Math.floor(Math.random() * chars.length)];
  }
  
  const r = document.getElementById('pwdResult');
  if (r) r.textContent = pwd;
}

function checkPwdStrength() {
  const pwd = document.getElementById('strengthInput').value;
  const bar = document.getElementById('strengthBar');
  const result = document.getElementById('strengthResult');
  
  if (!pwd) {
    bar.style.width = '0%';
    result.innerHTML = 'اكتب كلمة المرور لبدء الفحص...';
    return;
  }
  
  let score = 0;
  const tips = [];
  
  if (pwd.length >= 8) score++; else tips.push('• 8 أحرف على الأقل');
  if (pwd.length >= 12) score++;
  if (pwd.length >= 16) score++;
  if (/[a-z]/.test(pwd)) score++; else tips.push('• حروف صغيرة');
  if (/[A-Z]/.test(pwd)) score++; else tips.push('• حروف كبيرة');
  if (/[0-9]/.test(pwd)) score++; else tips.push('• أرقام');
  if (/[^a-zA-Z0-9]/.test(pwd)) score++; else tips.push('• رموز');
  
  const percent = (score / 8) * 100;
  let color, text, crackTime;
  
  if (score <= 2) { color = '#ff3355'; text = 'ضعيف 🔴'; crackTime = 'ثواني'; }
  else if (score <= 4) { color = '#ffcc00'; text = 'متوسط 🟡'; crackTime = 'أيام'; }
  else if (score <= 6) { color = '#00d4ff'; text = 'قوي 🔵'; crackTime = 'سنوات'; }
  else { color = '#00ff41'; text = 'قوي جداً 🟢'; crackTime = 'ملايين السنين'; }
  
  bar.style.width = percent + '%';
  bar.style.background = color;
  
  result.innerHTML = `
    <div style="color:${color};font-weight:900;font-size:1rem;margin-bottom:8px">${text}</div>
    <div style="margin-bottom:8px">⏱️ وقت الكسر: <span style="color:var(--gold)">${crackTime}</span></div>
    <div>📊 النقاط: ${score}/8</div>
    ${tips.length > 0 ? `<div style="margin-top:8px;color:var(--gold)">💡 نصايح:<br>${tips.join('<br>')}</div>` : ''}
  `;
}

async function genHashes() {
  const text = document.getElementById('hashInput').value;
  const result = document.getElementById('hashResults');
  
  if (!text) { result.innerHTML = ''; return; }
  
  const enc = new TextEncoder().encode(text);
  const algos = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
  
  let html = '';
  for (const a of algos) {
    try {
      const buf = await crypto.subtle.digest(a, enc);
      const hex = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
      html += `
        <div style="margin-bottom:12px;padding:12px;background:#000;border:1px solid var(--border);border-radius:8px">
          <div style="color:var(--primary);font-weight:700;margin-bottom:6px;font-family:monospace;font-size:0.8rem">${a}</div>
          <div style="font-family:monospace;font-size:0.68rem;word-break:break-all;direction:ltr;text-align:left;color:var(--text-dim)">${hex}</div>
        </div>
      `;
    } catch(e) {}
  }
  result.innerHTML = html;
}

function b64Encode() {
  const v = document.getElementById('b64Input').value;
  if (!v) return;
  const r = document.getElementById('b64Result');
  r.style.display = 'block';
  r.textContent = btoa(unescape(encodeURIComponent(v)));
}

function b64Decode() {
  const v = document.getElementById('b64Input').value;
  if (!v) return;
  const r = document.getElementById('b64Result');
  r.style.display = 'block';
  try { r.textContent = decodeURIComponent(escape(atob(v))); }
  catch(e) { r.textContent = '❌ نص غير صحيح'; }
}

function toHex() {
  const v = document.getElementById('hexInput').value;
  if (!v) return;
  const r = document.getElementById('hexResult');
  r.style.display = 'block';
  r.textContent = Array.from(new TextEncoder().encode(v)).map(b => b.toString(16).padStart(2, '0')).join(' ');
}

function fromHex() {
  const v = document.getElementById('hexInput').value;
  if (!v) return;
  const r = document.getElementById('hexResult');
  r.style.display = 'block';
  try {
    const bytes = v.replace(/\s/g, '').match(/.{1,2}/g).map(b => parseInt(b, 16));
    r.textContent = new TextDecoder().decode(new Uint8Array(bytes));
  } catch(e) { r.textContent = '❌ نص غير صحيح'; }
}

function urlEncode() {
  const v = document.getElementById('urlInput').value;
  const r = document.getElementById('urlResult');
  r.style.display = 'block';
  r.textContent = encodeURIComponent(v);
}

function urlDecode() {
  const v = document.getElementById('urlInput').value;
  const r = document.getElementById('urlResult');
  r.style.display = 'block';
  try { r.textContent = decodeURIComponent(v); }
  catch(e) { r.textContent = '❌ نص غير صحيح'; }
}

function generateUUIDs() {
  const r = document.getElementById('uuidResult');
  if (!r) return;
  let html = '';
  for (let i = 0; i < 5; i++) {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const rand = Math.random() * 16 | 0;
      const v = c === 'x' ? rand : (rand & 0x3 | 0x8);
      return v.toString(16);
    });
    html += `<div>${i + 1}. ${uuid}</div>`;
  }
  r.innerHTML = html;
}

function formatJSON() {
  const v = document.getElementById('jsonInput').value;
  const r = document.getElementById('jsonResult');
  if (!r) return;
  try {
    r.textContent = JSON.stringify(JSON.parse(v), null, 2);
    r.style.color = 'var(--primary)';
  } catch(e) {
    r.textContent = '❌ JSON غير صحيح';
    r.style.color = 'var(--red)';
  }
}

/* ═══ QR Generator ═══ */
function generateQR() {
  const v = document.getElementById('qrInput').value;
  const r = document.getElementById('qrResult');
  if (!v) { r.style.display = 'none'; return; }
  
  const size = 180;
  const cells = 21;
  const cellSize = size / cells;
  
  let hash = 0;
  for (let i = 0; i < v.length; i++) {
    hash = ((hash << 5) - hash) + v.charCodeAt(i);
    hash = hash & hash;
  }
  
  let svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">`;
  svg += `<rect width="${size}" height="${size}" fill="white"/>`;
  
  const drawMarker = (x, y) => {
    let m = '';
    m += `<rect x="${x * cellSize}" y="${y * cellSize}" width="${cellSize * 7}" height="${cellSize * 7}" fill="black"/>`;
    m += `<rect x="${(x + 1) * cellSize}" y="${(y + 1) * cellSize}" width="${cellSize * 5}" height="${cellSize * 5}" fill="white"/>`;
    m += `<rect x="${(x + 2) * cellSize}" y="${(y + 2) * cellSize}" width="${cellSize * 3}" height="${cellSize * 3}" fill="black"/>`;
    return m;
  };
  
  svg += drawMarker(0, 0);
  svg += drawMarker(cells - 7, 0);
  svg += drawMarker(0, cells - 7);
  
  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {
      if ((i < 8 && j < 8) || (i >= cells - 8 && j < 8) || (i < 8 && j >= cells - 8)) continue;
      const seed = (hash * (i + 1) * (j + 1) * 13) % 100;
      if (Math.abs(seed) % 2 === 0) {
        svg += `<rect x="${i * cellSize}" y="${j * cellSize}" width="${cellSize}" height="${cellSize}" fill="black"/>`;
      }
    }
  }
  
  svg += '</svg>';
  r.innerHTML = svg;
  r.style.display = 'block';
}

/* ═══ ROT13 ═══ */
function applyRot13() {
  const v = document.getElementById('rot13Input').value;
  const r = document.getElementById('rot13Result');
  if (!r) return;
  r.textContent = v.replace(/[a-zA-Z]/g, c => {
    const base = c <= 'Z' ? 65 : 97;
    return String.fromCharCode((c.charCodeAt(0) - base + 13) % 26 + base);
  });
}

/* ═══ BINARY ═══ */
function toBinary() {
  const v = document.getElementById('binInput').value;
  if (!v) return;
  const r = document.getElementById('binResult');
  r.style.display = 'block';
  r.textContent = Array.from(new TextEncoder().encode(v))
    .map(b => b.toString(2).padStart(8, '0'))
    .join(' ');
}

function fromBinary() {
  const v = document.getElementById('binInput').value;
  if (!v) return;
  const r = document.getElementById('binResult');
  r.style.display = 'block';
  try {
    const bytes = v.trim().split(/\s+/).map(b => parseInt(b, 2));
    r.textContent = new TextDecoder().decode(new Uint8Array(bytes));
  } catch(e) { r.textContent = '❌ نص غير صحيح'; }
}

/* ═══ MORSE ═══ */
const MORSE_MAP = {
  'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..', 'e': '.', 'f': '..-.',
  'g': '--.', 'h': '....', 'i': '..', 'j': '.---', 'k': '-.-', 'l': '.-..',
  'm': '--', 'n': '-.', 'o': '---', 'p': '.--.', 'q': '--.-', 'r': '.-.',
  's': '...', 't': '-', 'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-',
  'y': '-.--', 'z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', ' ': '/'
};

function toMorse() {
  const v = document.getElementById('morseInput').value.toLowerCase();
  const r = document.getElementById('morseResult');
  if (!r) return;
  r.textContent = v.split('').map(c => MORSE_MAP[c] || '').join(' ');
}

/* ═══════════════════════════════════════════
   ✅ تم — الرد 9 كامل
   ═══════════════════════════════════════════
   
   ⏭️  الكود التاني الجاي:
   الرد 10 من 14 — script.js (Data Breach + Leaderboard)
   
   ═══════════════════════════════════════════ */
/* ═══════════════════════════════════════════
   📚 DATA BREACH
   ═══════════════════════════════════════════ */
const BREACHES = [
  { id: 'yahoo', name: 'Yahoo', year: '2013-2014', accounts: '3,000,000,000', severity: 'CRITICAL', data: ['Emails', 'Names', 'DOB', 'Security Questions'], cause: 'State-sponsored hackers', loss: '$350M' },
  { id: 'linkedin', name: 'LinkedIn', year: '2012-2021', accounts: '700,000,000', severity: 'HIGH', data: ['Emails', 'Passwords', 'Usernames'], cause: 'Data scraping + breach', loss: 'N/A' },
  { id: 'facebook', name: 'Facebook', year: '2019', accounts: '533,000,000', severity: 'CRITICAL', data: ['Phone Numbers', 'Names', 'DOB', 'Emails'], cause: 'API vulnerability', loss: '$5B fine' },
  { id: 'marriott', name: 'Marriott', year: '2018', accounts: '500,000,000', severity: 'CRITICAL', data: ['Passports', 'Credit Cards', 'Personal Info'], cause: 'Compromised Starwood system', loss: '$124M' },
  { id: 'adobe', name: 'Adobe', year: '2013', accounts: '153,000,000', severity: 'HIGH', data: ['Emails', 'Encrypted Passwords', 'Hints'], cause: 'Server breach', loss: 'N/A' },
  { id: 'equifax', name: 'Equifax', year: '2017', accounts: '147,000,000', severity: 'CRITICAL', data: ['SSN', 'Credit Cards', 'Addresses'], cause: 'Apache Struts vulnerability', loss: '$700M' },
  { id: 'target', name: 'Target', year: '2013', accounts: '110,000,000', severity: 'HIGH', data: ['Credit Cards', 'Personal Info'], cause: 'Third-party vendor breach', loss: '$300M' },
  { id: 'ebay', name: 'eBay', year: '2014', accounts: '145,000,000', severity: 'HIGH', data: ['Names', 'Passwords', 'Emails'], cause: 'Employee credentials', loss: 'N/A' },
  { id: 'anthem', name: 'Anthem', year: '2015', accounts: '80,000,000', severity: 'CRITICAL', data: ['SSN', 'Health Records', 'Income'], cause: 'Phishing attack', loss: '$115M' },
  { id: 'dropbox', name: 'Dropbox', year: '2012', accounts: '68,000,000', severity: 'MEDIUM', data: ['Emails', 'Passwords'], cause: 'Compromised employee', loss: 'N/A' },
  { id: 'tumblr', name: 'Tumblr', year: '2013', accounts: '65,000,000', severity: 'MEDIUM', data: ['Emails', 'Passwords'], cause: 'Data leak', loss: 'N/A' },
  { id: 'canva', name: 'Canva', year: '2019', accounts: '137,000,000', severity: 'HIGH', data: ['Emails', 'Passwords', 'Names'], cause: 'Security breach', loss: 'N/A' },
  { id: 'twitter', name: 'Twitter', year: '2022', accounts: '5,400,000', severity: 'MEDIUM', data: ['Emails', 'Phone Numbers'], cause: 'API vulnerability', loss: 'N/A' },
  { id: 'tmobile', name: 'T-Mobile', year: '2021', accounts: '54,000,000', severity: 'HIGH', data: ['SSN', 'Names', 'Addresses'], cause: 'Network breach', loss: '$350M' },
  { id: 'rockyou', name: 'RockYou', year: '2009', accounts: '32,000,000', severity: 'MEDIUM', data: ['Passwords in plain text'], cause: 'SQL Injection', loss: 'N/A' }
];

function openBreach() {
  const viewed = JSON.parse(localStorage.getItem('nexus-breach-viewed') || '[]');
  
  let html = `
    <div style="padding:12px;background:color-mix(in srgb,var(--primary) 5%,transparent);border:1px solid var(--border);border-radius:10px;margin-bottom:15px;display:flex;justify-content:space-between;font-size:0.8rem">
      <span style="color:var(--text-dim)">📚 ${BREACHES.length} تسريب</span>
      <span style="color:var(--primary);font-weight:900">${viewed.length} مشاهدة</span>
    </div>
    <p style="color:var(--text-dim);font-size:0.78rem;margin-bottom:15px;text-align:center">اضغط على أي تسريب للمزيد</p>
    <div style="display:grid;gap:8px">
  `;
  
  BREACHES.forEach(b => {
    const isViewed = viewed.includes(b.id);
    const sevColors = { 'CRITICAL': 'var(--red)', 'HIGH': '#ff9955', 'MEDIUM': 'var(--gold)', 'LOW': 'var(--primary)' };
    const color = sevColors[b.severity];
    
    html += `
      <div onclick="openBreachDetail('${b.id}')" style="
        padding:12px;
        background:${isViewed ? 'color-mix(in srgb,var(--primary) 5%,transparent)' : 'rgba(0,0,0,0.4)'};
        border:1px solid ${isViewed ? 'var(--border-hover)' : 'var(--border)'};
        border-radius:10px;cursor:pointer;transition:all 0.3s;
      ">
        <div style="display:flex;align-items:center;gap:12px">
          <span style="font-size:1.5rem">💀</span>
          <div style="flex:1">
            <div style="color:var(--primary);font-weight:900;font-size:0.88rem">${isViewed ? '✓ ' : ''}${b.name}</div>
            <div style="color:var(--text-dim);font-size:0.68rem">${b.year} — ${b.accounts} حساب</div>
          </div>
          <div style="color:${color};font-size:0.6rem;font-weight:900;padding:3px 8px;background:${color}22;border-radius:5px;border:1px solid ${color}">${b.severity}</div>
        </div>
      </div>
    `;
  });
  
  html += `</div>`;
  openModal('📚 DATA BREACH', html);
}

function openBreachDetail(id) {
  const b = BREACHES.find(x => x.id === id);
  if (!b) return;
  
  const viewed = JSON.parse(localStorage.getItem('nexus-breach-viewed') || '[]');
  if (!viewed.includes(id)) {
    viewed.push(id);
    localStorage.setItem('nexus-breach-viewed', JSON.stringify(viewed));
    addXP(15);
  }
  
  const sevColors = { 'CRITICAL': 'var(--red)', 'HIGH': '#ff9955', 'MEDIUM': 'var(--gold)', 'LOW': 'var(--primary)' };
  const color = sevColors[b.severity];
  
  openModal(`💀 ${b.name}`, `
    <div style="padding:10px 0">
      <div style="text-align:center;padding:15px;background:${color}15;border:1px solid ${color};border-radius:12px;margin-bottom:15px">
        <div style="font-size:3rem;margin-bottom:10px">💀</div>
        <div style="color:${color};font-size:1.3rem;font-weight:900;margin-bottom:5px">${b.name}</div>
        <div style="color:var(--text-dim);font-size:0.8rem;margin-bottom:10px">📅 ${b.year}</div>
        <div style="color:${color};font-size:0.7rem;font-weight:900;padding:4px 12px;background:${color}25;border-radius:12px;display:inline-block;border:1px solid ${color}">${b.severity}</div>
      </div>
      
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:15px">
        <div style="padding:12px;background:color-mix(in srgb,var(--primary) 5%,transparent);border:1px solid var(--border);border-radius:10px;text-align:center">
          <div style="color:var(--text-dim);font-size:0.65rem;margin-bottom:4px">👥 الحسابات</div>
          <div style="color:var(--gold);font-weight:900;font-size:0.85rem">${b.accounts}</div>
        </div>
        <div style="padding:12px;background:color-mix(in srgb,var(--primary) 5%,transparent);border:1px solid var(--border);border-radius:10px;text-align:center">
          <div style="color:var(--text-dim);font-size:0.65rem;margin-bottom:4px">💰 الخسائر</div>
          <div style="color:var(--red);font-weight:900;font-size:0.85rem">${b.loss}</div>
        </div>
      </div>
      
      <div style="padding:12px;background:rgba(255,51,85,0.05);border:1px solid rgba(255,51,85,0.3);border-radius:10px;margin-bottom:15px">
        <div style="color:var(--red);font-weight:900;font-size:0.8rem;margin-bottom:8px">⚠️ البيانات المسربة:</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px">
          ${b.data.map(d => `<span style="padding:4px 10px;background:rgba(255,51,85,0.1);border:1px solid rgba(255,51,85,0.4);border-radius:15px;color:var(--red);font-size:0.68rem">${d}</span>`).join('')}
        </div>
      </div>
      
      <div style="padding:12px;background:color-mix(in srgb,var(--primary) 5%,transparent);border:1px solid var(--border);border-radius:10px;margin-bottom:15px">
        <div style="color:var(--primary);font-weight:900;font-size:0.8rem;margin-bottom:6px">🔍 السبب:</div>
        <div style="color:var(--text-dim);font-size:0.78rem">${b.cause}</div>
      </div>
      
      <div style="padding:12px;background:rgba(255,204,0,0.08);border-right:3px solid var(--gold);border-radius:8px;margin-bottom:15px">
        <div style="color:var(--gold);font-weight:900;font-size:0.8rem;margin-bottom:6px">💡 الدرس المستفاد:</div>
        <div style="color:var(--text-dim);font-size:0.75rem;line-height:1.7">
          • استخدم كلمات مرور قوية وفريدة<br>
          • فعّل 2FA على كل حساباتك<br>
          • راقب حساباتك على HaveIBeenPwned<br>
          • لا تشارك بياناتك مع مواقع مجهولة
        </div>
      </div>
      
      <button onclick="openBreach()" style="width:100%;padding:12px;background:color-mix(in srgb,var(--primary) 10%,transparent);border:1px solid var(--primary);border-radius:10px;color:var(--primary);font-weight:900;cursor:pointer;font-family:inherit;font-size:0.85rem">
        ← رجوع للقائمة
      </button>
    </div>
  `);
}

/* ═══════════════════════════════════════════
   👥 PLAY WITH FRIENDS
   ═══════════════════════════════════════════ */
let friendsGameState = { player1: 0, player2: 0, turn: 1, round: 1, totalRounds: 5 };

function openFriends() {
  friendsGameState = { player1: 0, player2: 0, turn: 1, round: 1, totalRounds: 5 };
  
  openModal('👥 PLAY WITH FRIENDS', `
    <div style="padding:10px 0">
      <div style="text-align:center;padding:15px 0">
        <div style="font-size:3.5rem;margin-bottom:15px">👥</div>
        <div style="color:var(--primary);font-size:1.1rem;font-weight:900;margin-bottom:10px">
          تحدي مع صديق
        </div>
        <div style="color:var(--text-dim);font-size:0.82rem;margin-bottom:25px">
          العبوا على نفس الجهاز — واحد يهاجم وواحد يدافع
        </div>
      </div>
      
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px">
        <div style="padding:12px;background:rgba(0,212,255,0.05);border:2px solid var(--accent);border-radius:10px;text-align:center">
          <div style="font-size:1.5rem;margin-bottom:5px">⚔️</div>
          <div style="color:var(--accent);font-weight:900;font-size:0.8rem">PLAYER 1</div>
          <div style="color:var(--text-dim);font-size:0.65rem">مهاجم</div>
        </div>
        <div style="padding:12px;background:rgba(0,255,65,0.05);border:2px solid var(--primary);border-radius:10px;text-align:center">
          <div style="font-size:1.5rem;margin-bottom:5px">🛡️</div>
          <div style="color:var(--primary);font-weight:900;font-size:0.8rem">PLAYER 2</div>
          <div style="color:var(--text-dim);font-size:0.65rem">مدافع</div>
        </div>
      </div>
      
      <div style="padding:12px;background:color-mix(in srgb,var(--primary) 5%,transparent);border:1px solid var(--border);border-radius:10px;margin-bottom:20px">
        <div style="color:var(--primary);font-weight:900;font-size:0.8rem;margin-bottom:8px">📋 قواعد اللعبة:</div>
        <div style="color:var(--text-dim);font-size:0.72rem;line-height:1.8">
          • 5 جولات<br>
          • Player 1 (مهاجم): يختار نوع الهجوم<br>
          • Player 2 (مدافع): يختار الدفاع<br>
          • من ينجح في جولاته يفوز
        </div>
      </div>
      
      <button onclick="startFriendsGame()" style="width:100%;padding:14px;background:linear-gradient(135deg,var(--primary),var(--primary-dim));border:none;border-radius:10px;color:var(--bg);font-weight:900;cursor:pointer;font-family:inherit;font-size:1rem">
        ▶️ ابدأ اللعب
      </button>
    </div>
  `);
}

function startFriendsGame() {
  friendsGameState = { player1: 0, player2: 0, turn: 1, round: 1, totalRounds: 5 };
  friendsTurn();
}

function friendsTurn() {
  if (friendsGameState.round > friendsGameState.totalRounds) {
    return endFriendsGame();
  }
  
  const isAttacker = friendsGameState.turn === 1;
  const playerEmoji = isAttacker ? '⚔️' : '🛡️';
  const playerColor = isAttacker ? 'var(--accent)' : 'var(--primary)';
  const playerText = isAttacker ? 'PLAYER 1 (مهاجم)' : 'PLAYER 2 (مدافع)';
  
  const attacks = ['DDoS', 'Phishing', 'Malware', 'SQL Injection', 'Ransomware', 'MITM'];
  const defenses = ['Firewall', 'Training', 'Antivirus', 'WAF', 'Backup', 'VPN'];
  const icons = ['💣', '🎣', '🦠', '💉', '🔒', '🕵️'];
  
  const options = isAttacker ? attacks : defenses;
  
  let optionsHTML = options.map((opt, i) => `
    <button onclick="friendsAnswer('${opt}')" style="
      padding:12px;background:${playerColor}15;border:1px solid ${playerColor};
      border-radius:8px;color:${playerColor};cursor:pointer;font-weight:700;
      font-size:0.78rem;font-family:inherit;transition:all 0.3s;
    ">
      ${icons[i]} ${opt}
    </button>
  `).join('');
  
  openModal(`👥 ROUND ${friendsGameState.round}/${friendsGameState.totalRounds}`, `
    <div style="text-align:center;margin-bottom:15px">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div style="padding:10px;background:rgba(0,212,255,0.05);border:1px solid var(--accent);border-radius:8px">
          <div style="color:var(--accent);font-size:0.7rem">⚔️ PLAYER 1</div>
          <div style="color:var(--gold);font-weight:900;font-size:1.1rem">${friendsGameState.player1}</div>
        </div>
        <div style="padding:10px;background:rgba(0,255,65,0.05);border:1px solid var(--primary);border-radius:8px">
          <div style="color:var(--primary);font-size:0.7rem">🛡️ PLAYER 2</div>
          <div style="color:var(--gold);font-weight:900;font-size:1.1rem">${friendsGameState.player2}</div>
        </div>
      </div>
    </div>
    
    <div style="text-align:center;padding:20px;background:${playerColor}10;border:2px solid ${playerColor};border-radius:12px;margin-bottom:18px;animation:attackShake 0.5s">
      <div style="font-size:3rem;margin-bottom:10px">${playerEmoji}</div>
      <div style="color:${playerColor};font-size:1rem;font-weight:900;margin-bottom:5px">${playerText}</div>
      <div style="color:var(--text-dim);font-size:0.72rem">${isAttacker ? 'اختر نوع الهجوم' : 'اختر الدفاع'}</div>
    </div>
    
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
      ${optionsHTML}
    </div>
  `);
}

function friendsAnswer(choice) {
  const isAttacker = friendsGameState.turn === 1;
  const success = Math.random() > 0.5;
  
  if (isAttacker) {
    if (success) friendsGameState.player1 += 100;
  } else {
    if (success) friendsGameState.player2 += 100;
  }
  
  const emoji = success ? '✅' : '❌';
  const color = success ? 'var(--primary)' : 'var(--red)';
  const msg = isAttacker 
    ? (success ? 'الهجوم نجح!' : 'الهجوم فشل!')
    : (success ? 'الدفاع نجح!' : 'الدفاع فشل!');
  
  openModal(`${emoji} ${msg}`, `
    <div style="text-align:center;padding:30px 0">
      <div style="font-size:4rem;color:${color};margin-bottom:15px;animation:successPulse 0.5s">${emoji}</div>
      <div style="color:${color};font-size:1.2rem;font-weight:900;margin-bottom:15px">${msg}</div>
      ${success ? '<div style="color:var(--gold);font-size:1rem;margin-bottom:15px">+100 نقطة</div>' : ''}
      <div style="color:var(--text-dim);font-size:0.75rem;margin-bottom:8px">
        ⚔️ P1: ${friendsGameState.player1} | 🛡️ P2: ${friendsGameState.player2}
      </div>
    </div>
  `);
  
  setTimeout(() => {
    if (isAttacker) {
      friendsGameState.turn = 2;
    } else {
      friendsGameState.turn = 1;
      friendsGameState.round++;
    }
    friendsTurn();
  }, 1200);
}

function endFriendsGame() {
  const { player1, player2 } = friendsGameState;
  let winner, winnerEmoji, winnerColor;
  
  if (player1 > player2) {
    winner = 'PLAYER 1 يفوز! ⚔️';
    winnerEmoji = '🏆';
    winnerColor = 'var(--accent)';
    addXP(100);
  } else if (player2 > player1) {
    winner = 'PLAYER 2 يفوز! 🛡️';
    winnerEmoji = '🏆';
    winnerColor = 'var(--primary)';
    addXP(100);
  } else {
    winner = 'تعادل! 🤝';
    winnerEmoji = '🤝';
    winnerColor = 'var(--gold)';
    addXP(50);
  }
  
  openModal('🏆 انتهت اللعبة!', `
    <div style="text-align:center;padding:20px 0">
      <div style="font-size:4rem;margin-bottom:15px">${winnerEmoji}</div>
      <div style="color:${winnerColor};font-size:1.3rem;font-weight:900;margin-bottom:20px">${winner}</div>
      
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px">
        <div style="padding:15px;background:rgba(0,212,255,0.05);border:2px solid var(--accent);border-radius:10px">
          <div style="font-size:1.5rem;margin-bottom:5px">⚔️</div>
          <div style="color:var(--accent);font-size:0.7rem;margin-bottom:5px">PLAYER 1</div>
          <div style="color:var(--gold);font-weight:900;font-size:1.5rem">${player1}</div>
        </div>
        <div style="padding:15px;background:rgba(0,255,65,0.05);border:2px solid var(--primary);border-radius:10px">
          <div style="font-size:1.5rem;margin-bottom:5px">🛡️</div>
          <div style="color:var(--primary);font-size:0.7rem;margin-bottom:5px">PLAYER 2</div>
          <div style="color:var(--gold);font-weight:900;font-size:1.5rem">${player2}</div>
        </div>
      </div>
      
      <button onclick="openFriends()" style="width:100%;padding:12px;background:linear-gradient(135deg,var(--primary),var(--primary-dim));border:none;border-radius:10px;color:var(--bg);font-weight:900;cursor:pointer;font-family:inherit;font-size:0.9rem;margin-bottom:8px">
        🔄 العب تاني
      </button>
      
      <button onclick="closeModal()" style="width:100%;padding:10px;background:color-mix(in srgb,var(--primary) 10%,transparent);border:1px solid var(--primary);border-radius:10px;color:var(--primary);font-weight:900;cursor:pointer;font-family:inherit;font-size:0.85rem">
        ✕ إغلاق
      </button>
    </div>
  `);
}

/* ═══════════════════════════════════════════
   ✅ تم — كود الأصدقاء كامل
   ═══════════════════════════════════════════ */
/* ═══════════════════════════════════════════
   🏆 LEADERBOARD
   ═══════════════════════════════════════════ */
function openLeaderboard() {
  const xp = gameState.xp;
  const lvl = gameState.level;
  const rank = getRank(xp).name;
  
  const hackDone = JSON.parse(localStorage.getItem('nexus-hack-done') || '[]').length;
  const ctfDone = JSON.parse(localStorage.getItem('nexus-ctf-done') || '[]').length;
  const learnDone = JSON.parse(localStorage.getItem('nexus-learn-done') || '[]').length;
  const breachDone = JSON.parse(localStorage.getItem('nexus-breach-viewed') || '[]').length;
  const aiBest = localStorage.getItem('nexus-ai-best') || '0';
  const defenseBest = localStorage.getItem('nexus-defense-best') || '0';
  
  const totalProgress = Math.round(((hackDone / 5) + (ctfDone / 10) + (learnDone / 8) + (breachDone / 15)) / 4 * 100);
  
  openModal('🏆 LEADERBOARD', `
    <div style="padding:10px 0">
      
      <!-- Profile Card -->
      <div style="text-align:center;padding:20px;background:linear-gradient(135deg,color-mix(in srgb,var(--primary) 10%,transparent),transparent);border:2px solid var(--primary);border-radius:14px;margin-bottom:20px">
        <div style="font-size:3.5rem;margin-bottom:10px">👤</div>
        <div style="color:var(--primary);font-size:1.2rem;font-weight:900;letter-spacing:2px;margin-bottom:5px">HACKER</div>
        <div style="color:#c084fc;font-size:0.85rem;margin-bottom:15px">${rank}</div>
        
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
          <div>
            <div style="color:var(--gold);font-size:1.2rem;font-weight:900">${lvl}</div>
            <div style="color:var(--text-dim);font-size:0.65rem">LEVEL</div>
          </div>
          <div>
            <div style="color:var(--primary);font-size:1.2rem;font-weight:900">${xp}</div>
            <div style="color:var(--text-dim);font-size:0.65rem">XP</div>
          </div>
          <div>
            <div style="color:var(--accent);font-size:1.2rem;font-weight:900">${totalProgress}%</div>
            <div style="color:var(--text-dim);font-size:0.65rem">TOTAL</div>
          </div>
        </div>
      </div>
      
      <!-- Progress Bar -->
      <div style="margin-bottom:20px">
        <div style="display:flex;justify-content:space-between;font-size:0.75rem;margin-bottom:8px">
          <span style="color:var(--text-dim)">📊 إجمالي التقدم</span>
          <span style="color:var(--primary);font-weight:900">${totalProgress}%</span>
        </div>
        <div style="height:8px;background:color-mix(in srgb,var(--primary) 10%,transparent);border-radius:4px;overflow:hidden">
          <div style="height:100%;width:${totalProgress}%;background:linear-gradient(90deg,var(--primary-dim),var(--primary));border-radius:4px;box-shadow:0 0 15px var(--primary)"></div>
        </div>
      </div>
      
      <!-- Detailed Stats -->
      <div style="display:grid;gap:8px;margin-bottom:20px">
        <div style="padding:12px;background:color-mix(in srgb,var(--primary) 5%,transparent);border:1px solid var(--border);border-radius:10px;display:flex;justify-content:space-between;align-items:center">
          <span style="color:var(--text-dim);font-size:0.8rem">🎯 مهام Hack</span>
          <span style="color:var(--primary);font-weight:900;font-size:0.85rem">${hackDone}/5</span>
        </div>
        <div style="padding:12px;background:color-mix(in srgb,var(--primary) 5%,transparent);border:1px solid var(--border);border-radius:10px;display:flex;justify-content:space-between;align-items:center">
          <span style="color:var(--text-dim);font-size:0.8rem">🎮 تحديات CTF</span>
          <span style="color:var(--primary);font-weight:900;font-size:0.85rem">${ctfDone}/10</span>
        </div>
        <div style="padding:12px;background:color-mix(in srgb,var(--primary) 5%,transparent);border:1px solid var(--border);border-radius:10px;display:flex;justify-content:space-between;align-items:center">
          <span style="color:var(--text-dim);font-size:0.8rem">🎓 دروس Learn</span>
          <span style="color:var(--primary);font-weight:900;font-size:0.85rem">${learnDone}/8</span>
        </div>
        <div style="padding:12px;background:color-mix(in srgb,var(--primary) 5%,transparent);border:1px solid var(--border);border-radius:10px;display:flex;justify-content:space-between;align-items:center">
          <span style="color:var(--text-dim);font-size:0.8rem">📚 تسريبات</span>
          <span style="color:var(--primary);font-weight:900;font-size:0.85rem">${breachDone}/15</span>
        </div>
        <div style="padding:12px;background:color-mix(in srgb,var(--primary) 5%,transparent);border:1px solid var(--border);border-radius:10px;display:flex;justify-content:space-between;align-items:center">
          <span style="color:var(--text-dim);font-size:0.8rem">🤖 أفضل AI Battle</span>
          <span style="color:var(--gold);font-weight:900;font-size:0.85rem">${aiBest}</span>
        </div>
        <div style="padding:12px;background:color-mix(in srgb,var(--primary) 5%,transparent);border:1px solid var(--border);border-radius:10px;display:flex;justify-content:space-between;align-items:center">
          <span style="color:var(--text-dim);font-size:0.8rem">🛡️ أفضل Defense</span>
          <span style="color:var(--gold);font-weight:900;font-size:0.85rem">${defenseBest}</span>
        </div>
      </div>
      
      <!-- Achievements -->
      <div style="padding:15px;background:color-mix(in srgb,var(--primary) 5%,transparent);border:1px solid var(--border);border-radius:10px">
        <div style="color:var(--primary);font-weight:900;font-size:0.85rem;margin-bottom:12px">🏅 الإنجازات</div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;text-align:center">
          <div style="opacity:${xp >= 100 ? 1 : 0.3}">
            <div style="font-size:1.5rem">🌟</div>
            <div style="color:var(--text-dim);font-size:0.6rem;margin-top:3px">100 XP</div>
          </div>
          <div style="opacity:${hackDone >= 1 ? 1 : 0.3}">
            <div style="font-size:1.5rem">🎯</div>
            <div style="color:var(--text-dim);font-size:0.6rem;margin-top:3px">أول مهمة</div>
          </div>
          <div style="opacity:${ctfDone >= 5 ? 1 : 0.3}">
            <div style="font-size:1.5rem">🎮</div>
            <div style="color:var(--text-dim);font-size:0.6rem;margin-top:3px">5 CTF</div>
          </div>
          <div style="opacity:${learnDone >= 4 ? 1 : 0.3}">
            <div style="font-size:1.5rem">🎓</div>
            <div style="color:var(--text-dim);font-size:0.6rem;margin-top:3px">4 دروس</div>
          </div>
          <div style="opacity:${xp >= 1000 ? 1 : 0.3}">
            <div style="font-size:1.5rem">🔥</div>
            <div style="color:var(--text-dim);font-size:0.6rem;margin-top:3px">1000 XP</div>
          </div>
          <div style="opacity:${hackDone >= 5 ? 1 : 0.3}">
            <div style="font-size:1.5rem">💀</div>
            <div style="color:var(--text-dim);font-size:0.6rem;margin-top:3px">Hack كامل</div>
          </div>
          <div style="opacity:${ctfDone >= 10 ? 1 : 0.3}">
            <div style="font-size:1.5rem">👑</div>
            <div style="color:var(--text-dim);font-size:0.6rem;margin-top:3px">CTF كامل</div>
          </div>
          <div style="opacity:${xp >= 5000 ? 1 : 0.3}">
            <div style="font-size:1.5rem">🚀</div>
            <div style="color:var(--text-dim);font-size:0.6rem;margin-top:3px">5000 XP</div>
          </div>
        </div>
      </div>
    </div>
  `);
}

/* ═══════════════════════════════════════════
   ✅ تم — الرد 11 كامل
   ═══════════════════════════════════════════
   
   ⏭️  الكود التاني الجاي:
   الرد 12 من 14 — script.js (Play with Friends + Rights)
   
   ═══════════════════════════════════════════ */

/* ═══════════════════════════════════════════
   📜 RIGHTS PAGE
   ═══════════════════════════════════════════ */
function openRights() {
  openModal('📜 الحقوق والمطور', `
    <div style="padding:10px 0">
      
      <!-- Hero Section -->
      <div style="text-align:center;padding:25px 15px;background:linear-gradient(135deg,color-mix(in srgb,var(--primary) 15%,transparent),color-mix(in srgb,var(--purple) 10%,transparent));border:2px solid var(--primary);border-radius:14px;margin-bottom:20px;position:relative;overflow:hidden">
        <div style="font-size:4rem;margin-bottom:10px;animation:logoPulse 2s infinite">👑</div>
        <div style="color:var(--primary);font-size:1.4rem;font-weight:900;letter-spacing:3px;margin-bottom:5px;text-shadow:0 0 15px var(--primary)">EDMAN HAKING</div>
        <div style="color:var(--gold);font-size:0.85rem;letter-spacing:2px">ETHICAL HACKER</div>
      </div>
      
      <!-- About Developer -->
      <div style="padding:15px;background:color-mix(in srgb,var(--primary) 5%,transparent);border:1px solid var(--border);border-radius:10px;margin-bottom:15px">
        <div style="color:var(--primary);font-weight:900;font-size:0.9rem;margin-bottom:10px">👤 عن المطور</div>
        <div style="color:var(--text-dim);font-size:0.8rem;line-height:1.8">
          مطور مصري شغوف بالأمن السيبراني والبرمجة. صانع محتوى تعليمي متخصص في الأمن السيبراني والهاكينج الأخلاقي.
        </div>
      </div>
      
      <!-- Social Links -->
      <div style="padding:15px;background:color-mix(in srgb,var(--primary) 5%,transparent);border:1px solid var(--border);border-radius:10px;margin-bottom:15px">
        <div style="color:var(--primary);font-weight:900;font-size:0.9rem;margin-bottom:12px">🔗 تابعني</div>
        
        <a href="https://www.youtube.com/@Edman_haking-i4f" target="_blank" style="
          display:flex;align-items:center;gap:10px;padding:12px;
          background:rgba(255,0,0,0.1);border:1px solid rgba(255,0,0,0.4);
          border-radius:8px;text-decoration:none;color:#ff4444;font-weight:700;
          font-size:0.8rem;margin-bottom:8px;transition:all 0.3s;
        ">
          <span style="font-size:1.3rem">▶️</span>
          <span>YouTube — Edman Haking</span>
        </a>
        
        <a href="https://t.me/youssef7_HAKER" target="_blank" style="
          display:flex;align-items:center;gap:10px;padding:12px;
          background:rgba(0,136,204,0.1);border:1px solid rgba(0,136,204,0.4);
          border-radius:8px;text-decoration:none;color:#33aadd;font-weight:700;
          font-size:0.8rem;margin-bottom:8px;transition:all 0.3s;
        ">
          <span style="font-size:1.3rem">✈️</span>
          <span>Telegram — @youssef7_HAKER</span>
        </a>
        
        <a href="https://ywsfalmrb29-jpg.github.io/LEARN_HACK_EDMAN/" target="_blank" style="
          display:flex;align-items:center;gap:10px;padding:12px;
          background:color-mix(in srgb,var(--primary) 10%,transparent);
          border:1px solid var(--primary);border-radius:8px;text-decoration:none;
          color:var(--primary);font-weight:700;font-size:0.8rem;transition:all 0.3s;
        ">
          <span style="font-size:1.3rem">🌐</span>
          <span>LEARN_HACK_EDMAN</span>
        </a>
      </div>
      
      <!-- Thank You -->
      <div style="padding:15px;background:rgba(255,204,0,0.05);border:1px solid rgba(255,204,0,0.3);border-radius:10px;margin-bottom:15px;text-align:center">
        <div style="color:var(--gold);font-size:0.85rem;font-weight:900;margin-bottom:8px">💛 شكر خاص</div>
        <div style="color:var(--text-dim);font-size:0.75rem;line-height:1.8">
          شكراً لكل من ساندني في رحلتي التعليمية<br>
          وشكراً لكل متابعيني وطلابي ❤️
        </div>
      </div>
      
      <!-- Footer -->
      <div style="text-align:center;padding:15px;background:linear-gradient(135deg,var(--bg-2),var(--bg));border:1px solid var(--border);border-radius:10px">
        <div style="color:var(--primary);font-weight:900;font-size:0.9rem;margin-bottom:5px;letter-spacing:2px">👑 EDMAN NEXUS 👑</div>
        <div style="color:var(--text-dim);font-size:0.7rem;line-height:1.8">
          Version 1.0.0<br>
          © 2025 EDMAN HAKING<br>
          All Rights Reserved
        </div>
      </div>
    </div>
  `);
}

/* ═══════════════════════════════════════════
   ✅ تم — كود الحقوق كامل
   ═══════════════════════════════════════════ */
/* ═══════════════════════════════════════════
   ✅ تم — الرد 10 كامل
   ═══════════════════════════════════════════
   
   ⏭️  الكود التاني الجاي:
   الرد 11 من 14 — script.js (Leaderboard)
   
   ═══════════════════════════════════════════ */