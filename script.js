// Composition root: wire feature controllers to data, presentation, and browser adapters.
import { profile } from './src/data/profile.js';
import { projects } from './src/data/projects.js';
import { createClipboardService, createEmailDraftService } from './src/services/browser.js';
import { createToast } from './src/ui/toast.js';
import { createProjectDialog } from './src/ui/project-dialog.js';
import { initNavigation } from './src/features/navigation.js';
import { initProjects } from './src/features/projects.js';
import { initSkills } from './src/features/skills.js';
import { initContact } from './src/features/contact.js';
import { initMotion } from './src/features/motion.js';

function startPortfolio(document, browser) {
  const events = new AbortController();
  const signal = events.signal;
  const notifications = createToast(document.querySelector('#toast'), browser);
  const presenter = createProjectDialog(document.querySelector('#project-dialog'), { body: document.body, signal });
  const stopNavigation = initNavigation({
    header: document.querySelector('.site-header'), document, signal,
    viewport: browser.matchMedia(profile.mobileBreakpoint),
    sections: profile.navigationSections, Observer: browser.IntersectionObserver,
  });
  initProjects({ root: document.querySelector('#work'), projects, presenter, signal });
  initSkills({ root: document.querySelector('#skills'), signal });
  initContact({
    root: document.querySelector('#contact'), profile, signal, notifications,
    clipboard: createClipboardService(browser.navigator),
    delivery: createEmailDraftService(browser.location),
  });
  const stopMotion = initMotion({
    root: document, body: document.body, Observer: browser.IntersectionObserver,
    reducedMotion: browser.matchMedia('(prefers-reduced-motion: reduce)'),
  });
  document.querySelector('#year').textContent = new Date().getFullYear();
  return () => {
    presenter.destroy(); notifications.destroy();
    stopNavigation(); stopMotion(); events.abort();
  };
}

let stop = startPortfolio(document, window);
// Clean up listeners/observers, including back-forward cache lifecycle.
window.addEventListener('pagehide', () => { stop?.(); stop = null; });
window.addEventListener('pageshow', event => { if (event.persisted && !stop) stop = startPortfolio(document, window); });
