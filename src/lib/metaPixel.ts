// Meta Pixel „Website Evelan“ (derselbe Pixel wie auf fit-inn-trier.de und am Werbekonto).
// Lädt nur mit Einwilligung „Marketing“ (TDDDG § 25). Ohne Einwilligung: kein Skript, kein Aufruf an Meta.
import { hasConsent } from './consent';

export const META_PIXEL_ID = '847643619850700';
let loaded = false;

function fbq(...args: unknown[]) {
  const f = (window as any).fbq;
  if (typeof f === 'function') f(...args);
}

export function loadMetaPixel() {
  if (typeof window === 'undefined' || loaded || !hasConsent('marketing')) return;
  loaded = true;
  // offizielles Basis-Snippet, als Funktion statt Inline-Skript
  const w = window as any;
  if (!w.fbq) {
    const n: any = (w.fbq = function (...a: unknown[]) { n.callMethod ? n.callMethod(...a) : n.queue.push(a); });
    if (!w._fbq) w._fbq = n;
    n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
    const s = document.createElement('script');
    s.async = true; s.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(s);
  }
  fbq('init', META_PIXEL_ID);
}

export function metaPageView() {
  if (!loaded) return;
  fbq('track', 'PageView');
}

// Erfolgreich gebuchtes Probetraining. Keine Personendaten, nur Seite und Einstieg.
// eventId = gleiche ID wie beim serverseitigen Event (Conversions API) → Meta dedupliziert.
export function metaLead(source: string, eventId?: string) {
  if (!hasConsent('marketing')) return;
  loadMetaPixel();
  fbq('track', 'Lead', { content_name: 'Probetraining', content_category: window.location.pathname, source: String(source).slice(0, 24) }, eventId ? { eventID: eventId } : undefined);
}
