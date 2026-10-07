export function selectFilterButton(buttons, selectedButton) {
  buttons.forEach(button => {
    const selected = button === selectedButton;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}
