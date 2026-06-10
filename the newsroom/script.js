/* ============================================
   THE NEWSROOM - JavaScript
   Version: 1.0
============================================ */

'use strict';

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const html        = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('newsroom-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('newsroom-theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ===== MOBILE MENU =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav       = document.getElementById('mainNav');

mobileMenuBtn.addEventListener('click', () => {
  mainNav.classList.toggle('mobile-open');
  const icon = mobileMenuBtn.querySelector('i');
  icon.className = mainNav.classList.contains('mobile-open') ? 'fas fa-times' : 'fas fa-bars';
});

// Add mobile nav styles dynamically
const mobileStyle = document.createElement('style');
mobileStyle.textContent = `
  @media (max-width: 768px) {
    .main-nav { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; top: 0; position: relative; }
    .main-nav.mobile-open { max-height: 500px; overflow-y: auto; }
    .nav-list { flex-direction: column; gap: 0; }
    .nav-link { padding: 0.9rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.06); }
  }
`;
document.head.appendChild(mobileStyle);

// ===== STICKY HEADER SHADOW =====
const mainHeader = document.getElementById('mainHeader');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    mainHeader.style.boxShadow = '0 4px 30px rgba(255,193,7,0.15)';
  } else {
    mainHeader.style.boxShadow = '0 2px 20px rgba(0,0,0,0.5)';
  }
});

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== TRENDING TABS =====
function switchTab(btn, type) {
  document.querySelectorAll('.trend-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  animateTrendCards();
}

function animateTrendCards() {
  const cards = document.querySelectorAll('.trend-card');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'all 0.4s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 80);
  });
}

// ===== POLL SYSTEM =====
let hasVoted = false;

function votePoll(btn, percent) {
  if (hasVoted) return;
  hasVoted = true;

  const options = document.querySelectorAll('.poll-option');
  options.forEach(opt => {
    opt.classList.add('voted');
    opt.style.cursor = 'default';
    const fill = opt.querySelector('.poll-fill');
    const pct  = parseInt(opt.querySelector('.poll-percent').textContent);
    setTimeout(() => {
      fill.style.width = pct + '%';
    }, 100);
  });

  btn.style.borderColor = 'var(--accent)';
  btn.style.background  = 'rgba(255,193,7,0.12)';

  // Update vote count
  const countEl = document.getElementById('totalVotes');
  const current = parseInt(countEl.textContent.replace(/,/g, ''));
  countEl.textContent = (current + 1).toLocaleString('en-IN');

  showToast('✅ आपका वोट दर्ज हो गया!');
}

// ===== NEWSLETTER SUBSCRIPTION =====
function subscribeNewsletter(e) {
  e.preventDefault();
  const input = e.target.querySelector('.newsletter-input');
  if (input.value) {
    showToast('🎉 Subscribe करने के लिए शुक्रिया! Welcome to THE NEWSROOM Family!');
    input.value = '';
  }
}

// ===== TOAST NOTIFICATION =====
function showToast(message) {
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed; bottom: 6rem; left: 50%; transform: translateX(-50%) translateY(20px);
    background: linear-gradient(135deg, #1a1a1a, #222);
    border: 1px solid var(--accent, #FFC107);
    color: white; padding: 0.875rem 1.5rem; border-radius: 8px;
    font-size: 0.9rem; font-weight: 600; z-index: 9999;
    box-shadow: 0 8px 30px rgba(0,0,0,0.5);
    transition: all 0.4s ease; opacity: 0;
    max-width: 90vw; text-align: center;
  `;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity    = '1';
    toast.style.transform  = 'translateX(-50%) translateY(0)';
  }, 10);

  setTimeout(() => {
    toast.style.opacity    = '0';
    toast.style.transform  = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// ===== NOTIFICATION POPUP =====
function allowNotification() {
  document.getElementById('notifPopup').style.display = 'none';
  showToast('🔔 Breaking News Alerts चालू हो गए!');
}

function denyNotification() {
  const popup = document.getElementById('notifPopup');
  popup.style.opacity   = '0';
  popup.style.transform = 'translateY(100px)';
  setTimeout(() => popup.style.display = 'none', 400);
}

// ===== PLAY VIDEO =====
function playVideo(btn) {
  const thumb = btn.closest('.video-thumb');
  const img   = thumb.querySelector('img');
  img.style.opacity = '0.3';
  btn.innerHTML = '<i class="fas fa-pause"></i>';
  showToast('▶️ Live stream के लिए YouTube पर जाएं');
  setTimeout(() => {
    img.style.opacity = '1';
    btn.innerHTML = '<i class="fas fa-play"></i>';
  }, 2000);
}

// ===== OPEN ARTICLE =====
function openArticle(card) {
  card.style.transform   = 'scale(0.98)';
  card.style.borderColor = 'var(--accent)';
  setTimeout(() => {
    card.style.transform   = '';
    card.style.borderColor = '';
    showToast('📰 खबर लोड हो रही है...');
  }, 200);
}

// ===== LIVE FEED AUTO UPDATE =====
const liveMessages = [
  "UP: योगी सरकार ने नई रोज़गार नीति की घोषणा की",
  "MP: इंदौर में स्मार्ट सिटी प्रोजेक्ट का उद्घाटन",
  "बाज़ार: RIL के शेयर में 2% की बढ़ोतरी",
  "खेल: Neeraj Chopra ने जीता Gold Medal",
  "Tech: Meta का नया AI Model लॉन्च",
];

let liveIndex    = 0;
let updateCount  = 12;

setInterval(() => {
  const feed = document.getElementById('liveFeed');
  const countEl = document.getElementById('updateCount');

  if (!feed) return;

  updateCount++;
  countEl.textContent = updateCount + ' अपडेट';

  const now  = new Date();
  const time = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0') + ' ' + (now.getHours() < 12 ? 'AM' : 'PM');

  const newItem = document.createElement('div');
  newItem.className = 'live-item new';
  newItem.innerHTML = `
    <span class="live-time">${time}</span>
    <p>${liveMessages[liveIndex % liveMessages.length]}</p>
  `;

  feed.insertBefore(newItem, feed.firstChild);

  // Remove old items beyond 5
  const items = feed.querySelectorAll('.live-item');
  if (items.length > 5) items[items.length - 1].remove();

  liveIndex++;

  // Clear NEW badge after 4 seconds
  setTimeout(() => newItem.classList.remove('new'), 4000);
}, 15000);

// ===== SEARCH FUNCTIONALITY =====
const searchInput = document.getElementById('searchInput');

if (searchInput) {
  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && searchInput.value.trim()) {
      showToast(`🔍 "${searchInput.value}" की खोज हो रही है...`);
      searchInput.blur();
    }
  });
}

// ===== SMOOTH NAV ACTIVE STATE =====
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', function() {
    navLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});

// ===== LAZY IMAGE FALLBACK =====
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
  img.addEventListener('error', function() {
    this.src = 'https://via.placeholder.com/400x220/1a1a1a/FFC107?text=THE+NEWSROOM';
  });
});

// ===== CARD HOVER RIPPLE =====
document.querySelectorAll('.news-card, .trend-card').forEach(card => {
  card.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect   = this.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height);

    ripple.style.cssText = `
      position: absolute; border-radius: 50%;
      width: $${size}px; height: $${size}px;
      left: ${e.clientX - rect.left - size/2}px;
      top: ${e.clientY - rect.top - size/2}px;
      background: rgba(255,193,7,0.1);
      transform: scale(0); animation: ripple-anim 0.5s ease-out;
      pointer-events: none; z-index: 0;
    `;

    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    
