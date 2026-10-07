/** A small notification port: { show(message), destroy() }. */
export function createToast(element, timers) {
  let timer;
  return {
    show(message) {
      timers.clearTimeout(timer);
      element.textContent = message;
      element.classList.add('show');
      timer = timers.setTimeout(() => element.classList.remove('show'), 4000);
    },
    destroy() {
      timers.clearTimeout(timer);
      element.classList.remove('show');
    },
  };
}
