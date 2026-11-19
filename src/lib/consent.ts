// Einwilligungen (TTDSG § 25 / DSGVO). Gespeichert wird nur die Entscheidung selbst (technisch notwendig, localStorage + gleichlautendes Cookie).
// stats  = Vercel Analytics + Speed Insights, anonyme Seiten-Events, Interessen-Hinweise (Personalisierung)
// media  = externe Inhalte (Google Maps)
// marketing = Meta Pixel + Google-Tag (Google Analytics/Ads: Messung der Anzeigen, Ereignis nach erfolgreicher Buchung)
// Ältere Einwilligungen ohne „marketing“ gelten als „nein“.
export type Consent = { v: 1; stats: boolean; media: boolean; marketing?: boolean; ts: number };
const KEY = 'fi_consent';
export const CONSENT_EVENT = 'fi:consent';
export const CONSENT_OPEN_EVENT = 'fi:consent-open';

export function readConsent(): Consent | null {
  if (typeof window === 'undefined') return null;
  // Reihenfolge: localStorage → Cookie (In-App-Browser von Facebook/Instagram sperren localStorage teils) → Speicher dieser Seite
  const valid = (d: any): Consent | null =>
    d && d.v === 1 && typeof d.stats === 'boolean' && typeof d.media === 'boolean' && Date.now() - Number(d.ts || 0) < 365 * 864e5 ? d : null; // nach 12 Monaten erneut fragen
  let d: Consent | null = null;
  try { d = valid(JSON.parse(window.localStorage.getItem(KEY) || 'null')); } catch { /* gesperrt */ }
  if (!d) {
    try {
      const m = document.cookie.match(new RegExp('(?:^|; )' + KEY + '=([^;]*)'));
      if (m) d = valid(JSON.parse(decodeURIComponent(m[1])));
    } catch { /* ignore */ }
  }
  return d || valid((window as any).__fiConsent);
}
export function hasConsent(cat: 'stats' | 'media' | 'marketing'): boolean {
  const c = readConsent();
  return !!(c && c[cat]);
}
export function saveConsent(stats: boolean, media: boolean, marketing = false) {
  const c: Consent = { v: 1, stats, media, marketing, ts: Date.now() };
  try { window.localStorage.setItem(KEY, JSON.stringify(c)); } catch { /* gesperrt: Cookie unten */ }
  try { document.cookie = `${KEY}=${encodeURIComponent(JSON.stringify(c))}; Max-Age=${365 * 86400}; Path=/; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`; } catch { /* ignore */ }
  (window as any).__fiConsent = c;
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: c }));
}
export function openConsent() {
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
}
