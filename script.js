/* ===========================
   SCRIPT.JS
   Tainá Lima Studio Hair
   =========================== */

// ---- Navbar scroll ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ---- Mobile menu toggle ----
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ---- Gallery filter ----
const filtros       = document.querySelectorAll('.filtro-btn');
const galeriaItems  = document.querySelectorAll('.galeria-item[data-category]');

filtros.forEach(btn => {
  btn.addEventListener('click', () => {
    filtros.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    galeriaItems.forEach(item => {
      const match = filter === 'all' || item.dataset.category === filter;
      item.style.opacity    = match ? '1'       : '0.25';
      item.style.transform  = match ? 'scale(1)': 'scale(0.97)';
      item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      item.style.pointerEvents = match ? 'auto' : 'none';
    });
  });
});

// ---- Lightbox ----
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc  = document.getElementById('lightboxDesc');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(item) {
  const img   = item.querySelector('.galeria-img');
  const title = item.dataset.title || '';
  const desc  = item.dataset.desc  || '';

  lightboxImg.src       = img.src;
  lightboxImg.alt       = img.alt;
  lightboxTitle.textContent = title;
  lightboxDesc.textContent  = desc;

  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

galeriaItems.forEach(item => {
  const btn = item.querySelector('.galeria-open');
  if (btn) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(item);
    });
  }
  // Also open on item click
  item.addEventListener('click', () => {
    if (item.dataset.title) openLightbox(item);
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ---- Intersection Observer (scroll reveal) ----
const revealEls = document.querySelectorAll(
  '.servico-card, .depo-card, .rede-card, .info-card, .galeria-item, .sobre-text, .sobre-img-wrap'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ---- Stagger delay for grid items ----
document.querySelectorAll('.servicos-grid .servico-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 60}ms`;
});
document.querySelectorAll('.galeria-grid .galeria-item').forEach((card, i) => {
  card.style.transitionDelay = `${i * 50}ms`;
});
document.querySelectorAll('.depo-grid .depo-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 80}ms`;
});
