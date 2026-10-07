import test from 'node:test';
import assert from 'node:assert/strict';
import { createInquiryDraft, toMailtoUrl } from '../src/domain/inquiry.js';
import { createClipboardService, createEmailDraftService } from '../src/services/browser.js';

const recipient = { email: 'developer@example.com', greetingName: 'Dwayne' };
const inquiry = { name: '  María & Lee  ', email: ' hello@example.com ', type: 'Project collaboration', message: '  A mobile app? Budget & scope + ideas.\nSecond line.  ' };
test('draft composition preserves meaningful Unicode and message lines, trimming edge whitespace', () => {
  const result = createInquiryDraft(inquiry, recipient);
  assert.equal(result.ok, true);
  assert.equal(result.draft.subject, 'Project collaboration — María & Lee');
  assert.match(result.draft.body, /Hi Dwayne,/);
  assert.match(result.draft.body, /ideas\.\nSecond line\./);
  assert.match(result.draft.body, /Reply to: hello@example.com$/);
});
test('whitespace-only required fields and malformed reply addresses cannot create a draft', () => {
  for (const fields of [{ name: ' ' }, { message: '\n ' }, { email: 'invalid' }, { email: 'a@example.com\nBcc: other@example.com' }]) {
    assert.equal(createInquiryDraft({ ...inquiry, ...fields }, recipient).ok, false);
  }
  assert.equal(createInquiryDraft({}, recipient).ok, false);
});
test('subject newlines cannot add mail headers', () => {
  const result = createInquiryDraft({ ...inquiry, name: 'Person\nBcc: test@example.com', type: 'Work\r\nCc: another@example.com' }, recipient);
  assert.equal(result.ok, true);
  assert.doesNotMatch(result.draft.subject, /[\r\n]/);
});
test('mailto encoding round-trips special characters without adding query parameters', () => {
  const { draft } = createInquiryDraft(inquiry, recipient);
  const url = new URL(toMailtoUrl(draft));
  assert.equal(url.protocol, 'mailto:');
  assert.equal(url.pathname, recipient.email);
  assert.equal(url.searchParams.get('subject'), draft.subject);
  assert.equal(url.searchParams.get('body'), draft.body);
  assert.deepEqual([...url.searchParams.keys()], ['subject', 'body']);
});
test('email delivery adapter uses an injected destination, without a real browser or network', () => {
  const location = { href: '' };
  const { draft } = createInquiryDraft(inquiry, recipient);
  createEmailDraftService(location).open(draft);
  assert.equal(new URL(location.href).searchParams.get('subject'), draft.subject);
});
test('clipboard adapter supports a substitute and propagates unavailable or denied access', async () => {
  let copied;
  const substitute = { clipboard: { async writeText(text) { copied = text; } } };
  await createClipboardService(substitute).copy(recipient.email);
  assert.equal(copied, recipient.email);
  await assert.rejects(createClipboardService({}).copy('text'), /unavailable/);
  await assert.rejects(createClipboardService({ clipboard: { async writeText() { throw new Error('Permission denied'); } } }).copy('text'), /Permission denied/);
});
