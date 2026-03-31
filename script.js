// Cursor-following spotlight effect
document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;

  document.body.style.setProperty('--mouse-x', `${x}px`);
  document.body.style.setProperty('--mouse-y', `${y}px`);

  // Add active class to enable the effect
  document.body.classList.add('cursor-active');
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');

mobileMenuBtn.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('#nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// Smooth scroll with offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80; // Height of sticky nav
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
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
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function startAutoplay() {
    timer = setInterval(() => goTo(current + 1), AUTOPLAY_INTERVAL);
  }

  function resetAutoplay() {
    clearInterval(timer);
    startAutoplay();
  }

  prev.addEventListener('click', () => { goTo(current - 1); resetAutoplay(); });
  next.addEventListener('click', () => { goTo(current + 1); resetAutoplay(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); resetAutoplay(); }));

  carousel.addEventListener('mouseenter', () => clearInterval(timer));
  carousel.addEventListener('mouseleave', () => startAutoplay());

  // Stagger autoplay start so carousels don't all advance together
  const offset = (AUTOPLAY_INTERVAL / carousels.length) * carouselIndex;
  setTimeout(() => startAutoplay(), offset);
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const lightboxPrev = lightbox.querySelector('.lightbox-prev');
const lightboxNext = lightbox.querySelector('.lightbox-next');
const lightboxDotsContainer = lightbox.querySelector('.lightbox-dots');

let lightboxImages = [];
let lightboxCurrent = 0;

function lightboxGoTo(index) {
  lightboxCurrent = (index + lightboxImages.length) % lightboxImages.length;
  lightboxImg.src = lightboxImages[lightboxCurrent].src;
  lightboxImg.alt = lightboxImages[lightboxCurrent].alt;
  lightboxDotsContainer.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === lightboxCurrent);
  });
}

function openLightbox(images, startIndex) {
  lightboxImages = images;

  lightboxDotsContainer.innerHTML = '';
  const multi = images.length > 1;
  lightboxPrev.classList.toggle('hidden', !multi);
  lightboxNext.classList.toggle('hidden', !multi);
  if (multi) {
    images.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'dot' + (i === startIndex ? ' active' : '');
      dot.addEventListener('click', (e) => { e.stopPropagation(); lightboxGoTo(i); });
      lightboxDotsContainer.appendChild(dot);
    });
  }

  lightboxCurrent = startIndex;
  lightboxImg.src = images[startIndex].src;
  lightboxImg.alt = images[startIndex].alt;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

// Attach click handlers per carousel so each knows its own image set
document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const slideImgs = Array.from(carousel.querySelectorAll('.carousel-slide img'));
  slideImgs.forEach((img, index) => {
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(slideImgs, index);
    });
  });
});

lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); lightboxGoTo(lightboxCurrent - 1); });
lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); lightboxGoTo(lightboxCurrent + 1); });
lightbox.addEventListener('click', closeLightbox);
lightboxImg.addEventListener('click', (e) => e.stopPropagation());

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lightboxGoTo(lightboxCurrent - 1);
  if (e.key === 'ArrowRight') lightboxGoTo(lightboxCurrent + 1);
});

// Add active state to nav links on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});
