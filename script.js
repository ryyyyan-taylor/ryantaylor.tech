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
document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const slides = carousel.querySelectorAll('.carousel-slide');
  const dots = carousel.querySelectorAll('.dot');
  const prev = carousel.querySelector('.carousel-prev');
  const next = carousel.querySelector('.carousel-next');
  let current = 0;

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  prev.addEventListener('click', () => goTo(current - 1));
  next.addEventListener('click', () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
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
