import { filterProjects } from '../domain/portfolio.js';
import { selectFilterButton } from '../ui/filter-buttons.js';

// Depends on project data and a presentation port, not a specific dialog implementation.
export function initProjects({ root, projects, presenter, signal }) {
  const buttons = [...root.querySelectorAll('[data-project-filter]')];
  const cards = [...root.querySelectorAll('[data-project-id]')];
  const data = Object.values(projects);
  buttons.forEach(button => button.addEventListener('click', () => {
    selectFilterButton(buttons, button);
    const visibleIds = new Set(filterProjects(data, button.dataset.projectFilter).map(project => project.id));
    cards.forEach(card => { card.hidden = !visibleIds.has(card.dataset.projectId); });
    root.querySelector('#project-result').textContent = `${visibleIds.size} ${visibleIds.size === 1 ? 'project' : 'projects'} shown`;
  }, { signal }));
  root.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
    const project = projects[button.dataset.project];
    if (project) presenter.open(project, button);
  }, { signal }));
}
