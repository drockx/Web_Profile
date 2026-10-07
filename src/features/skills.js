import { filterSkills } from '../domain/portfolio.js';
import { selectFilterButton } from '../ui/filter-buttons.js';

export function initSkills({ root, signal }) {
  const buttons = [...root.querySelectorAll('[data-skill-filter]')];
  const search = root.querySelector('#skill-search');
  const status = root.querySelector('#skill-result');
  // Accessible static HTML is the content source. Read it once into a domain model.
  const views = [...root.querySelectorAll('[data-skill-category]')].map((element, id) => ({
    element,
    model: { id, category: element.dataset.skillCategory, title: element.querySelector('h3').textContent,
      skills: [...element.querySelectorAll('.skill-items > span')].map((element, id) => ({ id, label: element.textContent })) },
    items: [...element.querySelectorAll('.skill-items > span')],
  }));
  let category = 'all';
  const render = () => {
    const selected = filterSkills(views.map(view => view.model), { category, query: search.value });
    const byGroup = new Map(selected.map(group => [group.id, new Set(group.skills.map(skill => skill.id))]));
    views.forEach(view => {
      const ids = byGroup.get(view.model.id);
      view.element.hidden = !ids;
      view.items.forEach((item, id) => { item.hidden = !ids?.has(id); });
    });
    const total = selected.reduce((count, group) => count + group.skills.length, 0);
    status.textContent = total
      ? `${total} ${total === 1 ? 'tool' : 'tools'} across ${selected.length} ${selected.length === 1 ? 'area' : 'areas'} of expertise`
      : 'No matching skills. Try another search or choose All expertise.';
  };
  buttons.forEach(button => button.addEventListener('click', () => {
    category = button.dataset.skillFilter;
    selectFilterButton(buttons, button);
    render();
  }, { signal }));
  search.addEventListener('input', render, { signal });
  render();
}
