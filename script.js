// JAHEZLY — Main Script
// ========================

// LOGO SVG (animated)
const LOGO_SVG = `
<svg width="160" height="44" viewBox="0 0 160 44" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FF6A00"/>
      <stop offset="100%" style="stop-color:#ff8c3a"/>
    </linearGradient>
  </defs>
  <!-- Icon -->
  <g transform="translate(0,4)">
    <rect x="0" y="0" width="12" height="12" rx="3" fill="url(#lg1)" opacity="0.9"
      style="animation:icon-pulse 2s ease-in-out infinite"/>
    <rect x="14" y="0" width="12" height="12" rx="3" fill="url(#lg1)" opacity="0.7"
      style="animation:icon-pulse 2s ease-in-out infinite 0.3s"/>
    <rect x="0" y="14" width="12" height="12" rx="3" fill="url(#lg1)" opacity="0.7"
      style="animation:icon-pulse 2s ease-in-out infinite 0.6s"/>
    <rect x="14" y="14" width="12" height="12" rx="3" fill="url(#lg1)" opacity="0.9"
      style="animation:icon-pulse 2s ease-in-out infinite 0.9s"/>
    <!-- Orbit -->
    <ellipse cx="13" cy="13" rx="16" ry="8" fill="none" stroke="#000" stroke-width="2.5"
      transform="rotate(-30 13 13)"
      style="animation:orbit-spin 4s linear infinite"/>
    <polygon points="7,13 10,10 10,16" fill="#000"
      style="animation:orbit-spin 4s linear infinite; transform-origin:13px 13px"/>
  </g>
  <!-- Text -->
  <text x="36" y="26" font-family="IBM Plex Sans, sans-serif" font-weight="800" font-size="22" fill="white" letter-spacing="-0.5">
    JAHEZ<tspan fill="url(#lg1)">LY</tspan>
  </text>
  <style>
    @keyframes icon-pulse { 0%,100%{opacity:0.9} 50%{opacity:0.5} }
    @keyframes orbit-spin { from{transform:rotate(-30deg)} to{transform:rotate(330deg)} }
  </style>
</svg>`;

const LOGO_SMALL = `
<svg width="120" height="36" viewBox="0 0 120 36" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="lg2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FF6A00"/>
      <stop offset="100%" style="stop-color:#ff8c3a"/>
    </linearGradient>
  </defs>
  <g transform="translate(0,2) scale(0.75)">
    <rect x="0" y="0" width="12" height="12" rx="3" fill="url(#lg2)"/>
    <rect x="14" y="0" width="12" height="12" rx="3" fill="url(#lg2)" opacity="0.7"/>
    <rect x="0" y="14" width="12" height="12" rx="3" fill="url(#lg2)" opacity="0.7"/>
    <rect x="14" y="14" width="12" height="12" rx="3" fill="url(#lg2)"/>
    <ellipse cx="13" cy="13" rx="16" ry="8" fill="none" stroke="#000" stroke-width="2.5" transform="rotate(-30 13 13)"/>
    <polygon points="7,13 10,10 10,16" fill="#000"/>
  </g>
  <text x="30" y="22" font-family="IBM Plex Sans, sans-serif" font-weight="800" font-size="18" fill="white" letter-spacing="-0.5">
    JAHEZ<tspan fill="url(#lg2)">LY</tspan>
  </text>
</svg>`;

// ========================
// LANGUAGE SYSTEM
// ========================
let currentLang = localStorage.getItem('jahezly_lang') || 'ar';

function initLang() {
  const translations = currentLang === 'ar' ? ar : en;
  applyTranslations(translations);
  document.getElementById('html-root').dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  document.getElementById('html-root').lang = currentLang;
  document.body.classList.toggle('ltr', currentLang === 'en');
  document.getElementById('lang-toggle').textContent = currentLang === 'ar' ? 'EN' : 'عر';
  buildDynamicLists(translations);
  buildServiceOptions();
}

function applyTranslations(t) {
  // data-key text
  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.getAttribute('data-key');
    if (t[key] !== undefined && typeof t[key] === 'string') el.textContent = t[key];
  });
  // placeholders
  document.querySelectorAll('[data-key-placeholder]').forEach(el => {
    const key = el.getAttribute('data-key-placeholder');
    if (t[key]) el.placeholder = t[key];
  });
}

function buildDynamicLists(t) {
  // Before list
  const beforeList = document.getElementById('before-list');
  if (beforeList && t.before_items) {
    beforeList.innerHTML = t.before_items.map(item => `<li>${item}</li>`).join('');
  }
  // After list
  const afterList = document.getElementById('after-list');
  if (afterList && t.after_items) {
    afterList.innerHTML = t.after_items.map(item => `<li>${item}</li>`).join('');
  }
  // Price props
  const priceProps = document.getElementById('price-props');
  if (priceProps && t.price_props) {
    priceProps.innerHTML = t.price_props.map(item => `<div class="pv-item">${item}</div>`).join('');
  }
}

function toggleLang() {
  currentLang = currentLang === 'ar' ? 'en' : 'ar';
  localStorage.setItem('jahezly_lang', currentLang);
  initLang();
}

// ========================
// LOGOS
// ========================
function initLogos() {
  const heroLogo = document.getElementById('logo-hero');
  const navLogo = document.getElementById('logo-svg-nav');
  const footerLogo = document.getElementById('footer-logo');
  if (heroLogo) heroLogo.innerHTML = LOGO_SVG;
  if (navLogo) navLogo.innerHTML = LOGO_SMALL;
  if (footerLogo) footerLogo.innerHTML = LOGO_SMALL;
}

// ========================
// PARTICLES
// ========================
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = window.innerWidth > 768 ? 25 : 10;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 1;
    p.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 15 + 8}s;
      animation-delay: ${Math.random() * 10}s;
    `;
    container.appendChild(p);
  }
}

// ========================
// NAVBAR SCROLL
// ========================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

// ========================
// HAMBURGER
// ========================
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;
  btn.addEventListener('click', () => {
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

// ========================
// CURSOR
// ========================
function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animFollower);
  }
  animFollower();

  document.querySelectorAll('a, button, .pain-card, .feat-card, .testi-card').forEach(el => {
    el.addEventListener('mouseenter', () => follower.classList.add('hovered'));
    el.addEventListener('mouseleave', () => follower.classList.remove('hovered'));
  });
}

// ========================
// SCROLL REVEAL
// ========================
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, entry.target.dataset.delay || 0);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  // Stagger children in grids
  document.querySelectorAll('.pain-grid, .features-grid, .testimonials-grid').forEach(grid => {
    grid.querySelectorAll('.reveal').forEach((el, i) => {
      el.dataset.delay = i * 100;
    });
  });

  items.forEach(item => observer.observe(item));
}

// ========================
// COUNTDOWN TIMER
// ========================
function initCountdown() {
  // Set end time: 23:59:59 today
  const now = new Date();
  const end = new Date();
  end.setHours(23, 59, 59, 0);
  if (end <= now) end.setDate(end.getDate() + 1);

  function update() {
    const diff = end - new Date();
    if (diff <= 0) { update(); return; }
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const pad = n => String(n).padStart(2, '0');
    const hEl = document.getElementById('cd-h');
    const mEl = document.getElementById('cd-m');
    const sEl = document.getElementById('cd-s');
    if (hEl) hEl.textContent = pad(h);
    if (mEl) mEl.textContent = pad(m);
    if (sEl) sEl.textContent = pad(s);
  }
  update();
  setInterval(update, 1000);
}

// ========================
// SERVICE OPTIONS
// ========================
const SERVICE_OPTIONS_AR = [
  'نظام طلبات اونلاين للمطاعم',
  'نظام حجز طاولات',
  'منيو رقمي',
  'تطبيق للمطاعم',
  'كل الخدمات'
];
const SERVICE_OPTIONS_EN = [
  'Online ordering system',
  'Table reservation system',
  'Restaurant dashboard',
  'Delivery system',
  'Reports & sales',
  'WhatsApp integration',
  'Digital menu',
  'All services'
];

let selectedServices = [];

function buildServiceOptions() {
  const container = document.getElementById('service-opts');
  if (!container) return;
  const opts = currentLang === 'ar' ? SERVICE_OPTIONS_AR : SERVICE_OPTIONS_EN;
  selectedServices = [];
  container.innerHTML = opts.map((opt, i) =>
    `<button type="button" class="sopt" onclick="toggleService(this,'${opt}')">${opt}</button>`
  ).join('');
}

function toggleService(btn, val) {
  btn.classList.toggle('active');
  const idx = selectedServices.indexOf(val);
  if (idx > -1) selectedServices.splice(idx, 1);
  else selectedServices.push(val);
  // Auto-fill message textarea
  const msgEl = document.getElementById('f-msg');
  if (msgEl && selectedServices.length > 0) {
    const t = currentLang === 'ar' ? ar : en;
    msgEl.value = (currentLang === 'ar' ? 'احتاج: ' : 'I need: ') + selectedServices.join(', ');
  } else if (msgEl && selectedServices.length === 0) {
    msgEl.value = '';
  }
}

// ========================
// CONTACT FORM → WHATSAPP
// ========================
function sendToWhatsApp(e) {
  e.preventDefault();
  const name = document.getElementById('f-name').value.trim();
  const phone = document.getElementById('f-phone').value.trim();
  const msg = document.getElementById('f-msg').value.trim();

  if (!name || !phone) return;

  const t = currentLang === 'ar' ? ar : en;
  const services = selectedServices.length > 0
    ? (currentLang === 'ar' ? '\nالخدمات المطلوبة: ' : '\nRequired services: ') + selectedServices.join(', ')
    : '';
  const extra = msg && !msg.includes(selectedServices[0] || 'X')
    ? (currentLang === 'ar' ? '\nملاحظات: ' : '\nNotes: ') + msg
    : '';

  const waMsg = currentLang === 'ar'
    ? `السلام عليكم، أنا مهتم بـ JAHEZLY\nالاسم: ${name}\nرقم التواصل: ${phone}${services}${extra}`
    : `Hello, I'm interested in JAHEZLY\nName: ${name}\nPhone: ${phone}${services}${extra}`;

  window.open('https://wa.me/201026108708?text=' + encodeURIComponent(waMsg), '_blank');

  // Show success
  const btn = document.getElementById('form-submit-btn');
  if (btn) {
    btn.style.background = '#25D366';
    btn.querySelector('span').textContent = t.form_success_msg || '✅ تم الإرسال!';
    setTimeout(() => {
      btn.style.background = '';
      btn.querySelector('span').textContent = t.form_submit;
    }, 4000);
  }
  document.getElementById('contact-form').reset();
  selectedServices = [];
  document.querySelectorAll('.sopt').forEach(b => b.classList.remove('active'));
}

// ========================
// SMOOTH SCROLL
// ========================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ========================
// PARALLAX (subtle)
// ========================
function initParallax() {
  const heroGrad = document.querySelector('.hero-gradient');
  if (!heroGrad) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroGrad.style.transform = `translateY(${y * 0.3}px)`;
  }, { passive: true });
}

// ========================
// HERO TITLE ORANGE WORD
// ========================
function highlightHeroTitle() {
  const titleEl = document.querySelector('.hero-title');
  if (!titleEl) return;
  const text = titleEl.textContent;
  const keyWord = currentLang === 'ar' ? 'فلوس' : 'money';
  if (text.includes(keyWord)) {
    titleEl.innerHTML = text.replace(keyWord, `<span class="orange-word">${keyWord}</span>`);
  }
}

// ========================
// INIT ALL
// ========================
document.addEventListener('DOMContentLoaded', () => {
  initLogos();
  initLang();
  buildServiceOptions();
  highlightHeroTitle();
  initParticles();
  initNavbar();
  initHamburger();
  initCursor();
  initReveal();
  initCountdown();
  initSmoothScroll();
  initParallax();

  // Lang toggle
  document.getElementById('lang-toggle').addEventListener('click', () => {
    toggleLang();
    highlightHeroTitle();
  });
});
