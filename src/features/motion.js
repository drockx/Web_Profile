// Progressive visual enhancement. Content remains visible without support or in reduced motion.
export function initMotion({ root, body, Observer, reducedMotion }) {
  if (!Observer || reducedMotion.matches) return () => {};
  const elements = [...root.querySelectorAll('.section-heading, .about-layout, .focus-grid, .project-card, .skill-group, .timeline article, .approach-grid article')];
  const observer = new Observer(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.remove('pending'); observer.unobserve(entry.target); }
    });
  }, { threshold: .08 });
  body.classList.add('js-motion');
  elements.forEach(element => { element.classList.add('reveal', 'pending'); observer.observe(element); });
  const stop = () => {
    observer.disconnect();
    elements.forEach(element => element.classList.remove('pending'));
    body.classList.remove('js-motion');
  };
  const preferenceChanged = () => { if (reducedMotion.matches) stop(); };
  reducedMotion.addEventListener('change', preferenceChanged);
  return () => { stop(); reducedMotion.removeEventListener('change', preferenceChanged); };
}
