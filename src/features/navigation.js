export function initNavigation({ header, document, viewport, sections, signal, Observer }) {
  const menu = header.querySelector('.menu-toggle');
  const navigation = header.querySelector('nav');
  const options = { signal };
  const close = () => {
    navigation.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open navigation');
  };
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navigation.classList.toggle('open', open);
  }, options);
  navigation.addEventListener('click', event => { if (event.target.closest('a')) close(); }, options);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navigation.classList.contains('open')) { close(); menu.focus(); }
  }, options);
  document.addEventListener('click', event => { if (!header.contains(event.target)) close(); }, options);
  viewport.addEventListener('change', close, options);
  let observer;
  if (Observer) {
    const links = [...navigation.querySelectorAll('a')];
    observer = new Observer(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
    sections.forEach(id => { const section = document.getElementById(id); if (section) observer.observe(section); });
  }
  return () => { close(); observer?.disconnect(); };
}
