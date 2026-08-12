import './style.css';

// ==========================================================================
// FORM MESSAGES
// ==========================================================================

const messages = {
  errName: 'Veuillez entrer votre nom.',
  errEmail: 'Veuillez entrer votre adresse e-mail.',
  errEmailInvalid: 'Veuillez entrer une adresse e-mail valide.',
  errMsg: 'Veuillez entrer un message.',
  errGeneric: "Une erreur s'est produite. Veuillez réessayer.",
  formSuccess: 'Message envoyé avec succès. Je vous réponds très vite.',
  navOpen: 'Ouvrir le menu de navigation',
  navClose: 'Fermer le menu de navigation',
};


// ==========================================================================
// HEADER SCROLL BEHAVIOR
// ==========================================================================

function initHeaderScroll() {
  const header = document.getElementById('site-header');
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        header.classList.toggle('scrolled', window.scrollY > 20);
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}


// ==========================================================================
// ACTIVE NAVIGATION
// ==========================================================================

function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        const matchingLink = Array.from(navLinks).find((link) => link.getAttribute('href') === `#${id}`);
        // Sections without their own nav entry (e.g. intermediate content) keep
        // the previously active link highlighted instead of clearing it.
        if (!matchingLink) return;
        navLinks.forEach((link) => link.classList.toggle('active', link === matchingLink));
      });
    },
    {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
}


// ==========================================================================
// MOBILE NAVIGATION
// ==========================================================================

function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  const links = menu.querySelectorAll('.nav-link');

  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', messages.navOpen);
    menu.classList.remove('open');
    document.body.style.overflow = '';
  }

  function openMenu() {
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', messages.navClose);
    menu.classList.add('open');
    document.body.style.overflow = 'hidden';
    links[0]?.focus();
  }

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  links.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggle.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
}


// ==========================================================================
// SCROLL REVEAL ANIMATIONS
// ==========================================================================

function initScrollReveal() {
  const revealElements = [
    ...document.querySelectorAll('.section-header'),
    ...document.querySelectorAll('.about-text'),
    ...document.querySelectorAll('.about-details'),
    ...document.querySelectorAll('.contact-info'),
    ...document.querySelectorAll('.contact-form'),
    ...document.querySelectorAll('.hero-content'),
    ...document.querySelectorAll('.hero-visual'),
    ...document.querySelectorAll('.case-study-card'),
  ];

  revealElements.forEach((el) => el.classList.add('reveal'));

  const staggerElements = [
    ...document.querySelectorAll('.services-grid'),
    ...document.querySelectorAll('.secondary-grid'),
    ...document.querySelectorAll('.process-grid'),
  ];

  staggerElements.forEach((el) => el.classList.add('stagger-reveal'));

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal, .stagger-reveal').forEach((el) => {
      el.classList.add('visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  document.querySelectorAll('.reveal, .stagger-reveal').forEach((el) => {
    observer.observe(el);
  });
}


// ==========================================================================
// CONTACT FORM
// ==========================================================================

function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = form.querySelector('.btn-submit');
  const status = document.getElementById('form-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Clear previous errors and status
    form.querySelectorAll('.form-error').forEach((el) => (el.textContent = ''));
    form.querySelectorAll('.error').forEach((el) => el.classList.remove('error'));
    if (status) {
      status.textContent = '';
      status.classList.remove('error');
    }

    const name = form.querySelector('#contact-name');
    const email = form.querySelector('#contact-email');
    const message = form.querySelector('#contact-message');
    let isValid = true;

    if (!name.value.trim()) {
      showError(name, 'name-error', messages.errName);
      isValid = false;
    }

    if (!email.value.trim()) {
      showError(email, 'email-error', messages.errEmail);
      isValid = false;
    } else if (!isValidEmail(email.value)) {
      showError(email, 'email-error', messages.errEmailInvalid);
      isValid = false;
    }

    if (!message.value.trim()) {
      showError(message, 'message-error', messages.errMsg);
      isValid = false;
    }

    if (!isValid) return;

    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        submitBtn.classList.remove('loading');
        submitBtn.classList.add('success');
        form.reset();
        if (status) {
          status.classList.remove('error');
          status.textContent = messages.formSuccess;
        }
      } else {
        throw new Error('Submission failed');
      }

      setTimeout(() => {
        submitBtn.classList.remove('success');
        submitBtn.disabled = false;
      }, 3000);
    } catch {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      showError(message, 'message-error', messages.errGeneric);
      if (status) {
        status.classList.add('error');
        status.textContent = messages.errGeneric;
      }
    }
  });
}

function showError(input, errorId, message) {
  input.classList.add('error');
  document.getElementById(errorId).textContent = message;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


// ==========================================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      history.pushState(null, '', targetId);
    });
  });
}


// ==========================================================================
// INITIALIZE
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initActiveNav();
  initMobileNav();
  initScrollReveal();
  initContactForm();
  initSmoothScroll();
});
