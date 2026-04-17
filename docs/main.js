/* ════════════════════════════
   CORPUS ACTUS — main.js
════════════════════════════ */

// ── Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ── Hamburger / mobile menu
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', open);
});
mobileMenu.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ── Active nav link on scroll
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const linkObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => linkObserver.observe(s));

// ── Carousel (cartelera)
const track   = document.getElementById('track');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentIndex = 0;
const getVisible = () => window.innerWidth < 580 ? 1 : window.innerWidth < 960 ? 2 : 3;

function updateTrack() {
  const cards  = track.querySelectorAll('.obra-card');
  const vis    = getVisible();
  const max    = Math.max(0, cards.length - vis);
  currentIndex = Math.min(currentIndex, max);
  const pct    = (100 / vis) * currentIndex;
  track.style.transform = `translateX(-${pct}%)`;
}

prevBtn.addEventListener('click', () => { if (currentIndex > 0) { currentIndex--; updateTrack(); } });
nextBtn.addEventListener('click', () => {
  const vis = getVisible();
  const max = track.querySelectorAll('.obra-card').length - vis;
  if (currentIndex < max) { currentIndex++; updateTrack(); }
});
window.addEventListener('resize', updateTrack, { passive: true });

// ── Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${i * 0.1}s`;
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObs.observe(el));

// Apply reveal class to extra elements
document.querySelectorAll('.obra-card, .gal-item, .stat-item, .soc-row').forEach(el => {
  el.classList.add('reveal');
  revealObs.observe(el);
});

// ── Contact form
function handleForm(e) {
  e.preventDefault();
  const msg = document.getElementById('form-msg');
  msg.textContent = '✓ Mensaje enviado. ¡Gracias por escribirnos!';
  e.target.reset();
  setTimeout(() => { msg.textContent = ''; }, 5000);
}