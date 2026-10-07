/**
 * Project presentation port: { open(project, trigger), close(), destroy() }.
 * Owns rendering, native focus management, dismissal, and body scroll lock.
 */
export function createProjectDialog(dialog, { body, signal }) {
  const document = dialog.ownerDocument;
  let trigger;
  const create = (tag, text, className) => {
    const element = document.createElement(tag);
    if (text !== undefined) element.textContent = text;
    if (className) element.className = className;
    return element;
  };
  const close = () => { if (dialog.open) dialog.close(); };
  const options = { signal };
  dialog.querySelector('.dialog-close').addEventListener('click', close, options);
  dialog.querySelector('#dialog-contact').addEventListener('click', close, options);
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
  }, options);
  dialog.addEventListener('close', () => {
    body.classList.remove('modal-open');
    trigger?.focus({ preventScroll: true });
  }, options);
  return {
    open(project, origin) {
      trigger = origin;
      dialog.querySelector('#dialog-label').textContent = project.label;
      dialog.querySelector('#dialog-title').textContent = project.title;
      dialog.querySelector('#dialog-description').textContent = project.description;
      const tags = create('div', undefined, 'tags');
      project.tags.forEach(tag => tags.append(create('span', tag)));
      const list = create('ul');
      project.contributions.forEach(item => list.append(create('li', item)));
      dialog.querySelector('#dialog-content').replaceChildren(tags,
        create('h3', 'My contributions'), list, create('p', project.context, 'dialog-context'));
      dialog.showModal();
      dialog.scrollTop = 0;
      body.classList.add('modal-open');
    },
    close,
    destroy() { close(); body.classList.remove('modal-open'); },
  };
}
