import { toMailtoUrl } from '../domain/inquiry.js';

/** @returns {{copy(text: string): Promise<void>}} */
export function createClipboardService(navigator) {
  return { async copy(text) {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(text);
  } };
}

/** @returns {{open(draft: {to: string, subject: string, body: string}): void}} */
export function createEmailDraftService(location) {
  return { open(draft) { location.href = toMailtoUrl(draft); } };
}
