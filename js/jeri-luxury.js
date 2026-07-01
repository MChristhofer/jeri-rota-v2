const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const plannerForm = document.querySelector('#planner-form');
const transferForm = document.querySelector('#transfer-form');
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
  menuToggle.classList.toggle('is-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuToggle.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const contactStatus = document.querySelector('[data-form-status]');
if (contactStatus) {
  const params = new URLSearchParams(window.location.search);
  const deliveryStatus = params.get('envio');
  const successMessage = contactStatus.dataset.successMessage || 'Sua mensagem foi enviada com sucesso!';
  const errorMessage = contactStatus.dataset.errorMessage || 'Não foi possível enviar agora. Tente novamente ou fale com a gente pelo WhatsApp.';

  if (deliveryStatus === 'sucesso') {
    contactStatus.hidden = false;
    contactStatus.classList.add('is-success');
    contactStatus.textContent = successMessage;
  }

  if (deliveryStatus === 'erro') {
    contactStatus.hidden = false;
    contactStatus.classList.add('is-error');
    contactStatus.textContent = errorMessage;
  }
}

if (plannerForm) {
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
}

if (transferForm) {
  const transferVehicle = transferForm.querySelector('#transfer-vehicle');
  const transferOrigin = transferForm.querySelector('#transfer-origin');
  const transferTimeInput = transferForm.querySelector('#transfer-time');
  const transferTimeSelect = transferForm.querySelector('#transfer-time-select');
  const transferTimeCustom = transferForm.querySelector('[data-transfer-time-custom]');
  const transferTimeFixed = transferForm.querySelector('[data-transfer-time-fixed]');
  const transferTimeNote = transferForm.querySelector('[data-transfer-time-note]');
  const transferFixedNote = transferForm.querySelector('[data-transfer-fixed-note]');
  const transferVehiclePreview = document.querySelector('[data-transfer-vehicle-preview]');
  const transferVehicleMedia = document.querySelector('.transfer-booking-media');

  const swapImage = (image, src, animatedElement) => {
    if (!image || !src || image.getAttribute('src') === src) return;

    animatedElement?.classList.add('is-changing');
    image.setAttribute('src', src);
    window.setTimeout(() => animatedElement?.classList.remove('is-changing'), 220);
  };

  const syncTransferVehicleMedia = () => {
    const selectedVehicle = transferVehicle?.selectedOptions?.[0];
    if (!selectedVehicle) return;

    const previewSrc = selectedVehicle.dataset.preview;

    swapImage(transferVehiclePreview, previewSrc, transferVehicleMedia);
  };

  const timeToMinutes = (value) => {
    const [hours, minutes] = value.split(':').map(Number);
    return (hours * 60) + minutes;
  };

  const useCustomTime = ({ min = '', max = '', step = '', note = '', value = '' } = {}) => {
    if (!transferTimeInput || !transferTimeCustom || !transferTimeFixed) return;

    transferTimeCustom.hidden = false;
    transferTimeFixed.hidden = true;
    transferTimeInput.disabled = false;
    if (transferTimeSelect) transferTimeSelect.disabled = true;

    transferTimeInput.min = min;
    transferTimeInput.max = max;
    transferTimeInput.step = step;
    transferTimeInput.value = value || transferTimeInput.value;
    if (transferTimeNote) transferTimeNote.textContent = note;
  };

  const useFixedTimes = (times) => {
    if (!transferTimeSelect || !transferTimeCustom || !transferTimeFixed || !times.length) return;

    transferTimeCustom.hidden = true;
    transferTimeFixed.hidden = false;
    transferTimeSelect.disabled = false;
    if (transferTimeInput) transferTimeInput.disabled = true;

    transferTimeSelect.innerHTML = times
      .map((time) => `<option value="${time}">${time}</option>`)
      .join('');

    if (transferFixedNote) {
      transferFixedNote.textContent = times.length > 1
        ? 'Horários fixos para este transporte.'
        : 'Horário fixo para este transporte.';
    }
  };

  const syncTransferOriginRules = () => {
    const selectedVehicle = transferVehicle?.selectedOptions?.[0];
    const requiredOrigin = selectedVehicle?.dataset.originOnly;

    if (!transferOrigin) return;

    if (requiredOrigin) {
      transferOrigin.value = requiredOrigin;
      transferOrigin.disabled = true;
      return;
    }

    transferOrigin.disabled = false;
  };

  const syncTransferTimeRules = () => {
    const selectedVehicle = transferVehicle?.selectedOptions?.[0];
    if (!selectedVehicle) return;

    const timeMode = selectedVehicle.dataset.timeMode || 'free';

    if (timeMode === 'fixed') {
      const times = (selectedVehicle.dataset.times || '')
        .split(',')
        .map((time) => time.trim())
        .filter(Boolean);
      useFixedTimes(times);
      return;
    }

    if (timeMode === 'business') {
      const currentTime = transferTimeInput?.value;
      const currentMinutes = currentTime ? timeToMinutes(currentTime) : 0;
      const minMinutes = timeToMinutes('08:00');
      const maxMinutes = timeToMinutes('18:00');
      const value = currentMinutes >= minMinutes && currentMinutes <= maxMinutes
        ? currentTime
        : '08:00';

      useCustomTime({
        min: '08:00',
        max: '18:00',
        step: '1800',
        note: 'Horário comercial: 08:00 às 18:00.',
        value,
      });
      return;
    }

    if (timeMode === 'arranged') {
      useFixedTimes(['A combinar']);
      if (transferFixedNote) {
        transferFixedNote.textContent = 'Horários a combinar para este transporte.';
      }
      return;
    }

    useCustomTime({
      note: 'Horário livre para transfer privativo.',
    });
  };

  const syncTransferVehicle = () => {
    syncTransferVehicleMedia();
    syncTransferOriginRules();
    syncTransferTimeRules();
  };

  transferVehicle?.addEventListener('change', syncTransferVehicle);
  syncTransferVehicle();

  transferForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const origin = transferForm.querySelector('#transfer-origin').value;
    const destination = transferForm.querySelector('#transfer-destination').value;
    const transferDate = transferForm.querySelector('#transfer-date').value;
    const travelers = transferForm.querySelector('#transfer-travelers').value;
    const selectedVehicle = transferVehicle?.selectedOptions?.[0];
    const vehicleType = selectedVehicle?.value;
    const transferTimeMode = selectedVehicle?.dataset.timeMode;
    const transferTime = ['fixed', 'arranged'].includes(transferTimeMode)
      ? transferTimeSelect?.value
      : transferTimeInput?.value;

    const formattedDate = transferDate
      ? new Date(`${transferDate}T12:00:00`).toLocaleDateString('pt-BR')
      : 'a definir';
    const formattedTime = transferTime || 'a definir';
    const formattedVehicle = vehicleType || 'a definir';

    const message = `Olá! Quero organizar um transfer com a Jeri Rota. Origem: ${origin}. Destino: ${destination}. Data: ${formattedDate}. Horário: ${formattedTime}. Passageiros: ${travelers}. Transporte: ${formattedVehicle}.`;
    const url = `https://wa.me/5588982274666?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  });
}

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
  }, 6500);
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

const heroSlides = [...document.querySelectorAll('.hero-slide')];
if (heroSlides.length > 1 && !reduceMotion.matches) {
  let heroIndex = 0;

  window.setInterval(() => {
    heroSlides[heroIndex].classList.remove('is-active');
    heroIndex = (heroIndex + 1) % heroSlides.length;
    heroSlides[heroIndex].classList.add('is-active');
  }, 4800);
}
