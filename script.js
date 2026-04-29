const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');

mobileMenuBtn.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('active');
  mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('#nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
  });
});

// Smooth scroll — sidebar on desktop needs small offset; top nav on mobile needs ~70px
document.querySelectorAll('a[href^="#"]:not(.skip-link)').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const isMobile = window.innerWidth <= 900;
      const offset = isMobile ? 70 : 20;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: targetPosition, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  });
});

// Carousel
const AUTOPLAY_INTERVAL = 10000;
const carousels = document.querySelectorAll('[data-carousel]');

carousels.forEach((carousel, carouselIndex) => {
  const track = carousel.querySelector('.carousel-track');
  const slides = carousel.querySelectorAll('.carousel-slide');
  const dots = carousel.querySelectorAll('.dot');
  const prev = carousel.querySelector('.carousel-prev');
  const next = carousel.querySelector('.carousel-next');
  let current = 0;
  let timer = null;

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === current);
      d.setAttribute('aria-pressed', String(i === current));
    });
  }

  function startAutoplay() {
    timer = setInterval(() => goTo(current + 1), AUTOPLAY_INTERVAL);
  }

  function resetAutoplay() {
    clearInterval(timer);
    if (!prefersReducedMotion) startAutoplay();
  }

  prev.addEventListener('click', () => { goTo(current - 1); resetAutoplay(); });
  next.addEventListener('click', () => { goTo(current + 1); resetAutoplay(); });

  dots.forEach((dot, i) => {
    dot.setAttribute('tabindex', '0');
    dot.setAttribute('role', 'button');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.setAttribute('aria-pressed', String(i === current));
    dot.addEventListener('click', () => { goTo(i); resetAutoplay(); });
    dot.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goTo(i); resetAutoplay(); }
    });
  });

  carousel.addEventListener('mouseenter', () => clearInterval(timer));
  carousel.addEventListener('mouseleave', () => { if (!prefersReducedMotion) startAutoplay(); });

  if (!prefersReducedMotion) {
    const offset = (AUTOPLAY_INTERVAL / carousels.length) * carouselIndex;
    setTimeout(() => startAutoplay(), offset);
  }
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const lightboxPrev = lightbox.querySelector('.lightbox-prev');
const lightboxNext = lightbox.querySelector('.lightbox-next');
const lightboxDotsContainer = lightbox.querySelector('.lightbox-dots');

let lightboxImages = [];
let lightboxCurrent = 0;
let lightboxTrigger = null;

function lightboxGoTo(index) {
  lightboxCurrent = (index + lightboxImages.length) % lightboxImages.length;
  lightboxImg.src = lightboxImages[lightboxCurrent].src;
  lightboxImg.alt = lightboxImages[lightboxCurrent].alt;
  lightboxDotsContainer.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === lightboxCurrent);
    d.setAttribute('aria-pressed', String(i === lightboxCurrent));
  });
}

function openLightbox(images, startIndex, trigger) {
  lightboxTrigger = trigger || null;
  lightboxImages = images;

  lightboxDotsContainer.innerHTML = '';
  const multi = images.length > 1;
  lightboxPrev.classList.toggle('hidden', !multi);
  lightboxNext.classList.toggle('hidden', !multi);
  if (multi) {
    images.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'dot' + (i === startIndex ? ' active' : '');
      dot.setAttribute('tabindex', '0');
      dot.setAttribute('role', 'button');
      dot.setAttribute('aria-label', `Go to image ${i + 1}`);
      dot.setAttribute('aria-pressed', String(i === startIndex));
      dot.addEventListener('click', (e) => { e.stopPropagation(); lightboxGoTo(i); });
      dot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); lightboxGoTo(i); }
      });
      lightboxDotsContainer.appendChild(dot);
    });
  }

  lightboxCurrent = startIndex;
  lightboxImg.src = images[startIndex].src;
  lightboxImg.alt = images[startIndex].alt;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';

  const firstFocusable = lightbox.querySelector('.lightbox-btn:not(.hidden)') || lightboxImg;
  firstFocusable.focus();
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  if (lightboxTrigger) { lightboxTrigger.focus(); lightboxTrigger = null; }
}

document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const slideImgs = Array.from(carousel.querySelectorAll('.carousel-slide img'));
  slideImgs.forEach((img, index) => {
    img.addEventListener('click', (e) => { e.stopPropagation(); openLightbox(slideImgs, index, img); });
  });
});

lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); lightboxGoTo(lightboxCurrent - 1); });
lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); lightboxGoTo(lightboxCurrent + 1); });
lightbox.addEventListener('click', closeLightbox);
lightboxImg.addEventListener('click', (e) => e.stopPropagation());

lightbox.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') { closeLightbox(); return; }
  if (e.key === 'ArrowLeft') { lightboxGoTo(lightboxCurrent - 1); return; }
  if (e.key === 'ArrowRight') { lightboxGoTo(lightboxCurrent + 1); return; }
  if (e.key === 'Tab') {
    const focusable = Array.from(lightbox.querySelectorAll('button:not(.hidden), [tabindex="0"]'));
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section, footer[id]');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  let current = '';
  const scrolledToBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 10;

  if (scrolledToBottom) {
    current = 'contact';
  } else {
    sections.forEach(section => {
      if (window.pageYOffset >= section.offsetTop - 200) {
        current = section.getAttribute('id');
      }
    });
  }

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
});
