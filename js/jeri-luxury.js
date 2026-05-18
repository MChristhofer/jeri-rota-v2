const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const plannerForm = document.querySelector('#planner-form');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (plannerForm && !reduceMotion.matches) {
  let plannerKickDone = false;

  const triggerPlannerKick = () => {
    if (plannerKickDone) return;
    plannerKickDone = true;
    plannerForm.classList.add('is-kicking');
  };

  const plannerKickObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        triggerPlannerKick();
        plannerKickObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.18,
    rootMargin: '0px 0px -8% 0px',
  });

  plannerKickObserver.observe(plannerForm);

  window.addEventListener('load', () => {
    window.setTimeout(() => {
      const plannerRect = plannerForm.getBoundingClientRect();
      const plannerIsAlreadyVisible = plannerRect.top < window.innerHeight * 0.9
        && plannerRect.bottom > window.innerHeight * 0.1;

      if (plannerIsAlreadyVisible) {
        triggerPlannerKick();
      }
    }, 280);
  });
}

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
function syncMobileHeaderForMenu() {
  const isMobile = window.matchMedia('(max-width: 960px)').matches;
  const isOpen = nav.classList.contains('is-open');
  header.classList.toggle('is-hidden-after-hero', isMobile && isOpen);
}

menuToggle.addEventListener('click', () => {
  requestAnimationFrame(syncMobileHeaderForMenu);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    requestAnimationFrame(syncMobileHeaderForMenu);
  });
});

window.addEventListener('resize', syncMobileHeaderForMenu);

const scrollZoomImages = [...document.querySelectorAll('.scroll-zoom')];

function updateScrollZoom() {
  const viewportHeight = window.innerHeight;

  scrollZoomImages.forEach((image) => {
    const rect = image.getBoundingClientRect();
    const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
    const clamped = Math.min(Math.max(progress, 0), 1);
    const zoom = 1.22 - clamped * 0.2;
    image.style.setProperty('--zoom', zoom.toFixed(3));
  });
}

updateScrollZoom();
window.addEventListener('scroll', updateScrollZoom, { passive: true });
window.addEventListener('resize', updateScrollZoom);


const serviceMetaGroups = document.querySelectorAll('.service-meta');
serviceMetaGroups.forEach((group) => {
  const items = [...group.querySelectorAll('li')];

  items.forEach((item) => {
    const activate = () => {
      items.forEach((entry) => entry.classList.remove('is-active'));
      item.classList.add('is-active');
    };

    item.addEventListener('click', activate);
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activate();
      }
    });
  });
});

const testimonialCards = [...document.querySelectorAll('.testimonial-card')];
const testimonialDots = [...document.querySelectorAll('.testimonial-dots span')];
if (testimonialCards.length > 1 && !reduceMotion.matches) {
  let testimonialIndex = 0;

  window.setInterval(() => {
    testimonialCards[testimonialIndex].classList.remove('is-active');
    testimonialDots[testimonialIndex]?.classList.remove('is-active');

    testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;

    testimonialCards[testimonialIndex].classList.add('is-active');
    testimonialDots[testimonialIndex]?.classList.add('is-active');
  }, 4200);
}

const partnerCards = [...document.querySelectorAll('.partner-card')];
const partnerDots = [...document.querySelectorAll('.partner-dots span')];

if (partnerCards.length > 1 && !reduceMotion.matches) {
  let partnerIndex = 0;

  window.setInterval(() => {
    partnerCards[partnerIndex].classList.remove('is-active');
    partnerDots[partnerIndex]?.classList.remove('is-active');

    partnerIndex = (partnerIndex + 1) % partnerCards.length;

    partnerCards[partnerIndex].classList.add('is-active');
    partnerDots[partnerIndex]?.classList.add('is-active');
  }, 3200);
}
