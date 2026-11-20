// Gegenstück zum Browser-Pixel: gleiche event_id → Meta dedupliziert. Fire-and-forget, stört die Buchung nie.
import { hasConsent } from './consent';
import { fbcAusUrl } from './klickIds';

export type LeadContact = { email?: string; phone?: string; firstname?: string; lastname?: string; zip?: string };

export function newEventId(): string {
  try { return crypto.randomUUID(); } catch { return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`; }
}

function cookie(name: string): string {
  const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : '';
}

export function sendLeadToCapi(eventId: string, source: string, contact?: LeadContact) {
  if (typeof window === 'undefined') return;
  try {
    const consent = hasConsent('marketing');
    const body = JSON.stringify({
      event_id: eventId, source, consent, url: window.location.href.split('#')[0],
      ...(consent ? { contact, fbp: cookie('_fbp'), fbc: cookie('_fbc') || fbcAusUrl() } : {}),
    });
    fetch('/api/meta-capi', { method: 'POST', headers: { 'content-type': 'application/json' }, body, keepalive: true }).catch(() => {});
  } catch { /* egal */ }
}
