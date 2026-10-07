import { createInquiryDraft } from '../domain/inquiry.js';

/**
 * Dependencies are narrow ports: clipboard.copy, delivery.open, notifications.show.
 * A different delivery adapter can be injected without changing this controller.
 */
export function initContact({ root, profile, clipboard, delivery, notifications, signal }) {
  const form = root.querySelector('form');
  const status = root.querySelector('#form-status');
  root.querySelector('#copy-email').addEventListener('click', async () => {
    try {
      await clipboard.copy(profile.email);
      notifications.show('Email address copied.');
    } catch {
      notifications.show('Select the email address to copy it, or click it to open your email app.');
    }
  }, { signal });
  form.addEventListener('input', () => { status.textContent = ''; }, { signal });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const result = createInquiryDraft(Object.fromEntries(new FormData(form)), profile);
    if (!result.ok) { status.textContent = result.error; return; }
    try {
      await delivery.open(result.draft);
      status.textContent = 'Email draft requested. If no email app opens, use the email address above. Your message has not been sent.';
    } catch {
      status.textContent = 'Could not open an email draft. Please use the email address above; your message is still here.';
    }
  }, { signal });
}
