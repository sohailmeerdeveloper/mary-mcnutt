(() => {
  'use strict';
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  const setMenu = open => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav.classList.toggle('is-open', open);
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!nav.contains(event.target) && !toggle.contains(event.target)) setMenu(false);
  });
  window.matchMedia('(min-width: 801px)').addEventListener('change', () => setMenu(false));
  const slides = [...document.querySelectorAll('.testimonial-slide')];
  const controls = [...document.querySelectorAll('[data-slide]')];
  controls.forEach(button => button.addEventListener('click', () => {
    const selected = Number(button.dataset.slide);
    slides.forEach((slide, index) => { slide.hidden = index !== selected; });
    controls.forEach((control, index) => control.setAttribute('aria-pressed', String(index === selected)));
  }));

  // One-time arrivals keep the reading order intact and never hide static content.
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const activeAnimations = new Set();
  const counters = new Map();
  const finishStat = element => {
    const frame = counters.get(element);
    if (frame) cancelAnimationFrame(frame);
    counters.delete(element);
    element.querySelector('.stat-number').textContent = element.dataset.stat;
    element.style.setProperty('--ring-progress', '100');
  };
  const animateStat = element => {
    if (reducedMotion.matches) return finishStat(element);
    const start = performance.now();
    const target = Number(element.dataset.count);
    const number = element.querySelector('.stat-number');
    const tick = now => {
      const fraction = Math.min((now - start) / 1250, 1);
      const eased = 1 - Math.pow(1 - fraction, 3);
      element.style.setProperty('--ring-progress', String(eased * 100));
      if (element.hasAttribute('data-count')) {
        number.textContent = String(Math.floor(target * eased)) + (element.dataset.suffix || '');
      }
      if (fraction < 1) counters.set(element, requestAnimationFrame(tick));
      else finishStat(element);
    };
    counters.set(element, requestAnimationFrame(tick));
  };
  const reveal = element => {
    if (reducedMotion.matches || !element.animate) return;
    const animation = element.animate(
      [{ opacity: .25, transform: 'translateY(22px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: 620, easing: 'cubic-bezier(.16,1,.3,1)' }
    );
    activeAnimations.add(animation);
    animation.onfinish = animation.oncancel = () => activeAnimations.delete(animation);
  };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        if (entry.target.matches('.stat-ring')) animateStat(entry.target);
        else if (entry.target.matches('.timeline-marker')) entry.target.classList.add('is-reached');
        else reveal(entry.target);
      });
    }, { threshold: .16, rootMargin: '0px 0px -24px 0px' });
    document.querySelectorAll('.stat-ring, .timeline-marker, main .centered-heading, main .section-heading, .growth-card, .journal-card, .process-card, .service-directory article, .blog-card, .resource-grid article, .value-grid article, .article-content > h2, .legacy-intro, .payment-info, .contact-details').forEach(element => {
      // Hero content is immediately available; entrances begin below the first viewport.
      if (element.matches('.stat-ring, .timeline-marker') || element.getBoundingClientRect().top > window.innerHeight * .8) observer.observe(element);
    });
  }
  reducedMotion.addEventListener('change', event => {
    if (!event.matches) return;
    activeAnimations.forEach(animation => animation.cancel());
    document.querySelectorAll('.stat-ring').forEach(finishStat);
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) counters.forEach((_, element) => finishStat(element));
  });

  document.querySelectorAll('[data-email-form]').forEach(form => {
    const status = form.querySelector('[data-email-status]');
    const fallback = form.querySelector('.email-fallback');
    const draft = fallback.querySelector('textarea');
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const lines = [...new FormData(form).entries()].map(([key, value]) => `${key}: ${value}`);
      draft.value = lines.join('\n\n');
      fallback.hidden = false;
      status.textContent = 'Your email app will open with a draft. Review it and press Send there. If no app opens, copy the message below and email Mary@MaryMcNutt.com.';
      window.location.href = `${form.action.split('?')[0]}?subject=${encodeURIComponent('Coaching consultation inquiry')}&body=${encodeURIComponent(draft.value)}`;
    });
    form.querySelector('[data-copy-email]').addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(draft.value);
        status.textContent = 'Message copied. Paste it into an email to Mary@MaryMcNutt.com and send when ready.';
      } catch {
        draft.focus();
        draft.select();
        status.textContent = 'The message is selected. Copy it and paste it into your email app.';
      }
    });
  });
})();
