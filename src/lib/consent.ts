// Einwilligungen (TTDSG § 25 / DSGVO). Gespeichert wird nur die Entscheidung selbst (technisch notwendig).
// stats  = Vercel Analytics + Speed Insights, anonyme Seiten-Events, Interessen-Hinweise (Personalisierung)
// media  = externe Inhalte (Google Maps)
export type Consent = { v: 1; stats: boolean; media: boolean; ts: number };
const KEY = 'fi_consent';
export const CONSENT_EVENT = 'fi:consent';
export const CONSENT_OPEN_EVENT = 'fi:consent-open';

export function readConsent(): Consent | null {
  if (typeof window === 'undefined') return null;
  try {
    const d = JSON.parse(window.localStorage.getItem(KEY) || 'null');
    if (d && d.v === 1 && typeof d.stats === 'boolean' && typeof d.media === 'boolean') {
      // nach 12 Monaten erneut fragen
      if (Date.now() - Number(d.ts || 0) < 365 * 864e5) return d;
    }
  } catch { /* ignore */ }
  return null;
}
export function hasConsent(cat: 'stats' | 'media'): boolean {
  const c = readConsent();
  return !!(c && c[cat]);
}
export function saveConsent(stats: boolean, media: boolean) {
  const c: Consent = { v: 1, stats, media, ts: Date.now() };
  try { window.localStorage.setItem(KEY, JSON.stringify(c)); } catch { /* privater Modus: gilt nur für diese Seite */ }
  (window as any).__fiConsent = c;
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: c }));
}
export function openConsent() {
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
}
