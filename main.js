/* ─────────────────────────────────────────────────────────
   main.js  |  Hang Out With Jesus – Countdown Homepage
   ───────────────────────────────────────────────────────── */

// ── HAMBURGER MENU ──────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});

// Close mobile nav when any link is tapped
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

// ── COUNTDOWN TIMER ─────────────────────────────────────
// Change this date to adjust the countdown target
const EVENT_DATE = new Date('2026-12-26T00:00:00').getTime();

function pad(number, digits = 2) {
  return String(number).padStart(digits, '0');
}

function updateCountdown() {
  const now  = Date.now();
  const diff = EVENT_DATE - now;

  if (diff <= 0) {
    document.getElementById('days').textContent    = '000';
    document.getElementById('hours').textContent   = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    clearInterval(countdownInterval);
    return;
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('days').textContent    = pad(days, 3);
  document.getElementById('hours').textContent   = pad(hours);
  document.getElementById('minutes').textContent = pad(minutes);
  document.getElementById('seconds').textContent = pad(seconds);
}

// Run immediately, then every second
updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);

// ── NAV SCROLL TINT ─────────────────────────────────────
const navEl = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
  navEl.style.background = window.scrollY > 20
    ? 'rgba(8, 8, 15, 0.97)'
    : 'rgba(8, 8, 15, 0.88)';
}, { passive: true });

// ── BADGE IMAGE — hide block if image not yet uploaded ──
const badgeImg = document.querySelector('.badge-img');
if (badgeImg) {
  badgeImg.addEventListener('error', () => {
    document.querySelector('.event-badge').style.display = 'none';
  });
}
