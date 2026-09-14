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
})();
