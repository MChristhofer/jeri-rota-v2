const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const plannerForm = document.querySelector('#planner-form');

function syncHeaderState() {
  header.classList.toggle('is-scrolled', window.scrollY > 24);
}

syncHeaderState();
window.addEventListener('scroll', syncHeaderState, { passive: true });

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

plannerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const arrivalDate = document.querySelector('#arrival-date').value;
  const travelNeed = document.querySelector('#travel-need').value;
  const travelers = document.querySelector('#travelers').value;

  const formattedDate = arrivalDate
    ? new Date(`${arrivalDate}T12:00:00`).toLocaleDateString('pt-BR')
    : 'a definir';

  const message = `Olá! Quero atendimento da Jeri Rota. Minha chegada é ${formattedDate}, procuro ${travelNeed} e viajo com ${travelers}.`;
  const url = `https://wa.me/5588982274666?text=${encodeURIComponent(message)}`;

  window.open(url, '_blank', 'noopener,noreferrer');
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
});

document.querySelectorAll('.reveal').forEach((element) => {
  revealObserver.observe(element);
});

const navLinks = [...document.querySelectorAll('.site-nav a')];
const trackedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

function setActiveNav(id) {
  navLinks.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
  });
}

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setActiveNav(entry.target.id);
    }
  });
}, {
  rootMargin: '-35% 0px -55%',
  threshold: 0,
});

trackedSections.forEach((section) => navObserver.observe(section));

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const targetId = link.getAttribute('href').slice(1);
    setActiveNav(targetId);
  });
});

const heroSection = document.querySelector('.hero');
const mobileHeaderQuery = window.matchMedia('(max-width: 960px)');
const heroVisibilityObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const shouldHideHeader = mobileHeaderQuery.matches && !entry.isIntersecting;
    header.classList.toggle('is-hidden-after-hero', shouldHideHeader);

    if (shouldHideHeader) {
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}, {
  threshold: 0.18,
});

heroVisibilityObserver.observe(heroSection);
mobileHeaderQuery.addEventListener('change', () => {
  if (!mobileHeaderQuery.matches) {
    header.classList.remove('is-hidden-after-hero');
  }
});

