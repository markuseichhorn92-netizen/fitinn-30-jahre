// Browser-Seite der Meta Conversions API: gemeinsame event_id, fbp/fbc und UTM-Werte mitgeben.
// Alles nur mit Einwilligung „Marketing“; ohne Einwilligung wird weder gespeichert noch gesendet.
import { hasConsent } from './consent';

const ATTR_KEY = 'fi_attr';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const;
type Attr = { utm: Record<string, string>; fbclid?: string; ts: number };

export type LeadPerson = { email: string; phone: string; firstName: string; lastName: string; zip: string };

export function newEventId(): string {
  try { return crypto.randomUUID(); } catch { return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`; }
}

const cookie = (name: string) => {
  const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : '';
};

// UTM-Werte und fbclid der Anzeige merken (nur Sitzung, nur mit Marketing-Einwilligung)
export function captureAttribution() {
  if (typeof window === 'undefined' || !hasConsent('marketing')) return;
  const q = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  UTM_KEYS.forEach((k) => { const v = q.get(k); if (v) utm[k] = v.slice(0, 80); });
  const fbclid = q.get('fbclid') || undefined;
  if (!Object.keys(utm).length && !fbclid) return;
  try { window.sessionStorage.setItem(ATTR_KEY, JSON.stringify({ utm, fbclid, ts: Date.now() } satisfies Attr)); } catch { /* privater Modus */ }
}

function readAttribution(): Attr | null {
  try { return JSON.parse(window.sessionStorage.getItem(ATTR_KEY) || 'null'); } catch { return null; }
}

// Serverseitiges Lead-Event; Fehler dürfen die Buchung nie stören.
export function sendLeadToCapi(eventId: string, source: string, person: LeadPerson) {
  if (typeof window === 'undefined' || !hasConsent('marketing')) return;
  const a = readAttribution();
  const body = JSON.stringify({
    eventId, source, consent: true, url: window.location.href, ...person,
    fbp: cookie('_fbp') || undefined,
    fbc: cookie('_fbc') || (a?.fbclid ? `fb.1.${a.ts}.${a.fbclid}` : undefined),
    utm: a?.utm || {},
  });
  try { fetch('/api/meta-capi', { method: 'POST', headers: { 'content-type': 'application/json' }, body, keepalive: true }).catch(() => {}); } catch { /* egal */ }
}
