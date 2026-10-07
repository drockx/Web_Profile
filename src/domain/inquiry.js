// Validate and compose an inquiry independently of its delivery mechanism.
export function createInquiryDraft({ name, email, type, message }, recipient) {
  const cleanName = String(name ?? '').trim();
  const cleanEmail = String(email ?? '').trim();
  const cleanMessage = String(message ?? '').trim();
  const cleanType = String(type ?? '').replace(/[\r\n]/g, ' ').trim();
  if (!cleanName || !cleanMessage) {
    return { ok: false, error: 'Please enter your name and a message, beyond spaces.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return { ok: false, error: 'Please enter a valid reply email address.' };
  }
  return {
    ok: true,
    draft: {
      to: recipient.email,
      subject: `${cleanType || 'General inquiry'} — ${cleanName.replace(/[\r\n]/g, ' ')}`,
      body: `Hi ${recipient.greetingName},\n\n${cleanMessage}\n\nFrom: ${cleanName}\nReply to: ${cleanEmail}`,
    },
  };
}

export function toMailtoUrl({ to, subject, body }) {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
