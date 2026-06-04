import './style.css';

// ==========================================================================
// TRANSLATIONS
// ==========================================================================

const translations = {
  fr: {
    // Skip links
    skipMain: 'Aller au contenu principal',
    skipNav: 'Aller à la navigation',
    // Nav
    navAbout: 'À propos',
    navServices: 'Services',
    navProjects: 'Projets',
    navProcess: 'Processus',
    navContact: 'Contact',
    // Hero
    heroEyebrow: 'Ingénieur Accessibilité Web',
    heroDesc: "Je conçois des sites et applicatifs métiers modernes et accessibles. Spécialisé en diagnostic d'accessibilité et pré-audits RGAA 4.1 / WCAG 2.1 AA, j'accompagne les équipes fabricantes sur la mise en conformité et l'éco-conception, depuis la France.",
    heroCtaProjects: 'Voir mes projets',
    heroCtaHire: 'Me contacter',
    // About
    aboutTitle: 'À propos',
    aboutP1: "Je suis un développeur web français passionné par la création de sites modernes, performants et accessibles. Diplômé d'un BUT Métiers du Multimédia et de l'Internet (MMI) à l'Université de Lorraine, je suis spécialisé en développement web et interfaces interactives.",
    aboutP2: "J'aime créer des expériences numériques qui allient code propre (HTML, CSS, JavaScript natif, Angular) et conception inclusive. Mon expertise en accessibilité web et en éco-conception garantit que chaque projet que je livre est utilisable par tous et sobre en ressources.",
    aboutP3: "En dehors du code, j'explore les nouveaux standards web et l'éco-conception numérique, je contribue à des projets open-source et j'expérimente des projets créatifs comme des bots et du développement de jeux.",
    aboutCtaGithub: 'Voir mon GitHub',
    aboutEduLabel: 'Formation',
    aboutFocusLabel: 'Spécialité',
    aboutFocusValue: 'Accessibilité Web',
    aboutLocLabel: 'Localisation',
    aboutLocDesc: 'Disponible en télétravail',
    // Services
    servicesTitle: 'Ce que je fais',
    svc1Title: 'Développement Front-End Sur-Mesure',
    svc1Desc: 'Sites internet et applicatifs métiers construits avec Angular (12 à 21), HTML, CSS et JavaScript natif. Un code propre, maintenable et accessible, pensé pour la qualité et la durabilité.',
    svc2Title: 'Diagnostics & Pré-audits RGAA',
    svc2Desc: "Diagnostics d'accessibilité et pré-audits RGAA 4.1 / WCAG 2.1 AA sur sites internet, internes/externes et applicatifs métiers. Rédaction des préconisations et animation des réunions de restitution auprès des équipes fabricantes.",
    svc3Title: 'Accompagnement des équipes',
    svc3Desc: "Suivi, vérification et validation des correctifs d'accessibilité. Revue de code, pair programming et échanges techniques pour aider les équipes fabricantes à lever les blocages et monter en compétences.",
    svc4Title: 'Solutions WordPress',
    svc4Desc: 'Thèmes personnalisés, plugins sur-mesure et installations WordPress optimisées. Je crée des sites WordPress rapides, accessibles et faciles à gérer.',
    svc5Title: 'Éco-conception numérique',
    svc5Desc: "Conception de services numériques sobres en ressources : optimisation du poids des pages, du nombre de requêtes et des parcours utilisateur. Une démarche complémentaire à l'accessibilité pour des produits plus responsables.",
    svc6Title: 'Collaboration & Conseil',
    svc6Desc: 'Je travaille étroitement avec les designers, chefs de projet et équipes de développement. Une communication claire et des méthodes agiles garantissent des livraisons dans les délais.',
    // Stack
    stackTitle: 'Technologies',
    stackTools: 'Outils',
    stackDeploy: 'Déploiement',
    stackEcodesign: 'Éco-conception',
    // Projects
    projectsTitle: 'Projets Sélectionnés',
    proj1Title: 'Istex Design System',
    proj1Desc: "Un thème WordPress sur-mesure conçu pour centraliser un design system et une bibliothèque de composants UI pour l'équipe Istex. Il sert de référence pour la charte graphique, les pictogrammes et les règles d'affichage, assurant la cohérence visuelle sur tous les produits Istex.",
    projViewSite: 'Voir le site',
    proj2Desc: "Une plateforme de fouille de texte pour l'Enseignement Supérieur et la Recherche, transformant des corpus scientifiques en connaissances exploitables. Extraction d'informations, enrichissement automatique et structuration des textes avec confidentialité renforcée.",
    projViewCode: 'Voir le code source',
    proj3Desc: 'Un jeu de morpion 3D immersif construit avec React Three Fiber. Plateau 3D entièrement rotatif, effets visuels néon avec bloom et glassmorphism, plusieurs modes de jeu et accessibilité clavier complète.',
    proj3Cta: 'Jouer au jeu',
    projViewCode2: 'Voir le code source',
    proj4Desc: "Un portfolio artistique avec un thème nature et illustrations. Conçu pour mettre en valeur des créations originales dans un univers doux et coloré avec une navigation immersive et poétique.",
    projViewSite2: 'Voir le site',
    proj5Desc: "Un bot Bluesky qui publie des photos de nature quotidiennement. Un projet automatisé combinant intégration d'API et curation de contenu pour apporter une dose quotidienne de nature sur les réseaux sociaux.",
    projViewCode3: 'Voir le code source',
    proj6Title: 'Bluffet',
    proj6Desc: "Un jeu mobile de déduction sociale pour 3 à 8 joueurs sur un seul téléphone. Inspiré par Among Us et les formats \"Qui est l'imposteur\", Bluffet propose des parties locales rapides avec des packs de questions thématiques et un gameplay de bluff accessible à tous.",
    proj6Cta: 'Voir sur Google Play',
    proj7Title: 'M2A-DAC Paris Ouest',
    proj7Desc: "Réalisation d'une déclaration d'accessibilité RGAA 4.1.2 pour le site de la M2A-DAC Paris Ouest, puis correction des principales erreurs identifiées. Le taux de conformité est passé de 55 % à 89 %, améliorant significativement l'accessibilité numérique du site.",
    proj7Cta: 'Voir la déclaration',
    proj7CtaHref: '/D%C3%A9claration%20d%27accessibilit%C3%A9%20M2A-DAC%20ParisOuest.pdf',
    // Contact
    contactTitle: 'Me Contacter',
    contactLead: "Un projet en tête ou besoin d'un diagnostic d'accessibilité ? N'hésitez pas à me contacter.",
    contactLinkedin: 'Profil LinkedIn',
    formName: 'Nom complet',
    formNamePh: 'Votre nom complet',
    formEmail: 'Adresse e-mail',
    formEmailPh: 'vous@exemple.com',
    formMsg: 'Message',
    formMsgPh: 'Parlez-moi de votre projet...',
    formSubmit: 'Envoyer le message',
    // Footer
    footerCopy: '© 2025 Matthéo Termine. Tous droits réservés.',
    footerTop: 'Retour en haut',
    // Form errors
    errName: 'Veuillez entrer votre nom.',
    errEmail: 'Veuillez entrer votre adresse e-mail.',
    errEmailInvalid: 'Veuillez entrer une adresse e-mail valide.',
    errMsg: 'Veuillez entrer un message.',
    errGeneric: "Une erreur s'est produite. Veuillez réessayer.",
    formSuccess: 'Message envoyé avec succès. Je vous réponds très vite.',
    navOpen: 'Ouvrir le menu de navigation',
    navClose: 'Fermer le menu de navigation',
  },
  en: {
    skipMain: 'Skip to main content',
    skipNav: 'Skip to navigation',
    navAbout: 'About',
    navServices: 'Services',
    navProjects: 'Projects',
    navProcess: 'Process',
    navContact: 'Contact',
    heroEyebrow: 'Web Accessibility Engineer',
    heroDesc: 'I build modern and accessible websites and business applications. Specialized in accessibility diagnostics and RGAA 4.1 / WCAG 2.1 AA pre-audits, I support delivery teams on compliance fixes and eco-design, from France.',
    heroCtaProjects: 'View My Projects',
    heroCtaHire: 'Contact Me',
    aboutTitle: 'About Me',
    aboutP1: "I'm a French web developer passionate about building modern, performant, and accessible websites. With a degree in Métiers du Multimédia et de l'Internet (MMI) from Université de Lorraine, I specialize in web development and interactive interfaces.",
    aboutP2: 'I love creating digital experiences that combine clean code (HTML, CSS, native JavaScript, Angular) and inclusive design. My expertise in web accessibility and eco-design ensures that every project I deliver can be used by everyone and remains resource-efficient.',
    aboutP3: "When I'm not coding, I'm exploring new web standards and digital eco-design, contributing to open-source projects, or experimenting with creative side projects like bots and game development.",
    aboutCtaGithub: 'View My GitHub',
    aboutEduLabel: 'Education',
    aboutFocusLabel: 'Focus',
    aboutFocusValue: 'Web Accessibility',
    aboutLocLabel: 'Location',
    aboutLocDesc: 'Available for remote work',
    servicesTitle: 'What I Do',
    svc1Title: 'Custom Front-End Development',
    svc1Desc: 'Websites and business applications built with Angular (12 to 21), HTML, CSS, and native JavaScript. Clean, maintainable, and accessible code, designed for quality and durability.',
    svc2Title: 'Accessibility Diagnostics & RGAA Pre-Audits',
    svc2Desc: 'Accessibility diagnostics and RGAA 4.1 / WCAG 2.1 AA pre-audits on public websites, internal sites, and business applications. Written recommendations and facilitation of restitution meetings with delivery teams.',
    svc3Title: 'Team Support & Coaching',
    svc3Desc: 'Monitoring, verifying, and validating accessibility fixes. Code reviews, pair programming, and technical discussions to help delivery teams unblock issues and grow their skills.',
    svc4Title: 'WordPress Solutions',
    svc4Desc: 'Custom themes, tailored plugins, and performance-tuned WordPress installations. I build WordPress sites that are fast, accessible, and easy to manage.',
    svc5Title: 'Digital Eco-Design',
    svc5Desc: 'Designing resource-efficient digital services: optimizing page weight, request counts, and user journeys. A natural complement to accessibility for more responsible products.',
    svc6Title: 'Collaboration & Consulting',
    svc6Desc: 'I work closely with designers, project managers, and development teams. Clear communication and agile workflows ensure projects ship on time.',
    stackTitle: 'Tech Stack',
    stackTools: 'Tools',
    stackDeploy: 'Deployment',
    stackEcodesign: 'Eco-Design',
    projectsTitle: 'Selected Projects',
    proj1Title: 'Istex Design System',
    proj1Desc: 'A custom WordPress theme built to centralize a design system and UI component library for the Istex team. It serves as a reference for brand guidelines, icon sets, and display rules, ensuring visual consistency across all Istex products.',
    projViewSite: 'View Live Site',
    proj2Desc: 'A text mining platform for French Higher Education and Research, transforming scientific corpora into actionable knowledge. Features include information extraction, automatic enrichment, and text structuring with enhanced confidentiality.',
    projViewCode: 'View Source Code',
    proj3Desc: 'An immersive 3D tic-tac-toe game built with React Three Fiber. Features a fully rotatable 3D board, neon visual effects with bloom and glassmorphism, multiple game modes, and complete keyboard accessibility.',
    proj3Cta: 'Play the Game',
    projViewCode2: 'View Source Code',
    proj4Desc: 'An artistic portfolio website with a nature-inspired theme and illustrations. Designed to showcase original artwork in a soft, colorful universe with an immersive and poetic browsing experience.',
    projViewSite2: 'View Live Site',
    proj5Desc: 'A Bluesky bot that posts nature photography daily. An automated project combining API integration with content curation to bring daily doses of nature to social media feeds.',
    projViewCode3: 'View Source Code',
    proj6Title: 'Bluffet',
    proj6Desc: 'A social deduction mobile game for 3 to 8 players on a single phone. Inspired by Among Us and "Who is the impostor?" formats, Bluffet delivers fast local matches with themed question packs and accessible bluff-focused gameplay.',
    proj6Cta: 'View on Google Play',
    proj7Title: 'M2A-DAC Paris Ouest',
    proj7Desc: 'RGAA 4.1.2 accessibility declaration for the M2A-DAC Paris Ouest website, followed by remediation of the main identified issues. Compliance rate improved from 55% to 89%, significantly enhancing the site\'s digital accessibility.',
    proj7Cta: 'View Declaration',
    proj7CtaHref: '/Accessibility%20Statement%20M2A-DAC%20ParisOuest.pdf',
    processTitle: 'How I Work',
    proc1Title: 'Discovery',
    proc1Desc: 'I start every project by understanding your goals, audience, and constraints. We define scope, success metrics, and accessibility requirements together.',
    proc2Desc: 'Wireframes and prototypes are built with accessibility in mind from day one. I validate contrast ratios, focus order, and semantic structure before a single line of code.',
    proc3Title: 'Development',
    proc3Desc: 'Clean, modular code with automated testing. Every component is built to be keyboard-navigable, screen-reader compatible, and performant across devices.',
    proc4Title: 'Delivery',
    proc4Desc: 'Full accessibility audit, performance benchmarks, and SEO validation before launch. I provide documentation and support to ensure long-term maintainability.',
    contactTitle: 'Get in Touch',
    contactLead: "Have a project in mind or need an accessibility diagnostic? I'd love to hear from you.",
    contactLinkedin: 'LinkedIn Profile',
    formName: 'Full Name',
    formNamePh: 'Your full name',
    formEmail: 'Email Address',
    formEmailPh: 'you@example.com',
    formMsg: 'Message',
    formMsgPh: 'Tell me about your project...',
    formSubmit: 'Send Message',
    footerCopy: '© 2025 Matthéo Termine. All rights reserved.',
    footerTop: 'Back to Top',
    errName: 'Please enter your name.',
    errEmail: 'Please enter your email address.',
    errEmailInvalid: 'Please enter a valid email address.',
    errMsg: 'Please enter a message.',
    errGeneric: 'Something went wrong. Please try again.',
    formSuccess: 'Message sent successfully. I will get back to you shortly.',
    navOpen: 'Open navigation menu',
    navClose: 'Close navigation menu',
  },
};

let currentLang = 'fr';


// ==========================================================================
// LANGUAGE SWITCHING
// ==========================================================================

function initLanguage() {
  const stored = localStorage.getItem('lang');
  if (stored && translations[stored]) {
    currentLang = stored;
  }

  // Keep the html lang attribute in sync with the active language
  document.documentElement.lang = currentLang;

  // If starting in EN, apply translations immediately
  if (currentLang === 'en') {
    applyTranslations('en');
  }

  const toggle = document.getElementById('lang-toggle');
  const label = toggle.querySelector('.lang-label');

  // Update button label to show the OTHER language
  label.textContent = currentLang === 'fr' ? 'EN' : 'FR';
  toggle.setAttribute('aria-label', currentLang === 'fr' ? 'Switch to English' : 'Passer en français');

  toggle.addEventListener('click', () => {
    const next = currentLang === 'fr' ? 'en' : 'fr';
    currentLang = next;
    localStorage.setItem('lang', next);

    applyTranslations(next);

    // Update button
    label.textContent = next === 'fr' ? 'EN' : 'FR';
    toggle.setAttribute('aria-label', next === 'fr' ? 'Switch to English' : 'Passer en français');

    // Update html lang attribute
    document.documentElement.lang = next;

    // Keep the nav toggle aria-label in sync with the current menu state
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute(
        'aria-label',
        isOpen ? translations[next].navClose : translations[next].navOpen
      );
    }
  });
}

function applyTranslations(lang) {
  const t = translations[lang];

  // Text content
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      // Check if element contains only text (no child elements to preserve)
      if (el.childElementCount === 0) {
        el.textContent = t[key];
      } else {
        // For elements with mixed content, only update text nodes
        el.childNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
            node.textContent = t[key];
          }
        });
      }
    }
  });

  // Placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key] !== undefined) {
      el.placeholder = t[key];
    }
  });

  // Href attributes
  document.querySelectorAll('[data-i18n-href]').forEach((el) => {
    const key = el.getAttribute('data-i18n-href');
    if (t[key] !== undefined) {
      el.href = t[key];
    }
  });
}


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
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
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
    toggle.setAttribute('aria-label', translations[currentLang].navOpen);
    menu.classList.remove('open');
    document.body.style.overflow = '';
  }

  function openMenu() {
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', translations[currentLang].navClose);
    menu.classList.add('open');
    document.body.style.overflow = 'hidden';
    links[0]?.focus();
  }

  // Initial label synced with current language
  toggle.setAttribute('aria-label', translations[currentLang].navOpen);

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
  ];

  revealElements.forEach((el) => el.classList.add('reveal'));

  const staggerElements = [
    ...document.querySelectorAll('.services-grid'),
    ...document.querySelectorAll('.stack-grid'),
    ...document.querySelectorAll('.projects-list'),
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

    const t = translations[currentLang];

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
      showError(name, 'name-error', t.errName);
      isValid = false;
    }

    if (!email.value.trim()) {
      showError(email, 'email-error', t.errEmail);
      isValid = false;
    } else if (!isValidEmail(email.value)) {
      showError(email, 'email-error', t.errEmailInvalid);
      isValid = false;
    }

    if (!message.value.trim()) {
      showError(message, 'message-error', t.errMsg);
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
          status.textContent = t.formSuccess;
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
      showError(message, 'message-error', t.errGeneric);
      if (status) {
        status.classList.add('error');
        status.textContent = t.errGeneric;
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
  initLanguage();
  initHeaderScroll();
  initActiveNav();
  initMobileNav();
  initScrollReveal();
  initContactForm();
  initSmoothScroll();
});
