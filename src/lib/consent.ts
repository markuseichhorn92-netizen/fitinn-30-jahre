// Einwilligungen (TTDSG § 25 / DSGVO). Gespeichert wird nur die Entscheidung selbst (technisch notwendig, localStorage + gleichlautendes Cookie).
// stats  = Vercel Analytics + Speed Insights, anonyme Seiten-Events, Interessen-Hinweise (Personalisierung)
// media  = externe Inhalte (Google Maps)
// marketing = Meta Pixel + Google-Tag (Google Analytics/Ads: Messung der Anzeigen, Ereignis nach erfolgreicher Buchung)
// Ältere Einwilligungen ohne „marketing“ gelten als „nein“.
// Nachweis (Art. 7 Abs. 1 DSGVO): jede Entscheidung geht mit zufälliger Einwilligungs-ID, Banner-Version, Auswahl und Zeit an /api/f
// (ohne IP, ohne Namen). Die ID steht auch im Browser (fi_consent.id), damit sich ein Eintrag zuordnen lässt.
// Widerruf: bei „nein“ zu Marketing stoppen Google-Tag und Meta Pixel sofort, ihre Cookies werden gelöscht, die Seite lädt einmal neu.
export type Consent = { v: 1; stats: boolean; media: boolean; marketing?: boolean; ts: number; id?: string; bv?: string };
const KEY = 'fi_consent';
// Banner-Version: bei jeder Textänderung im Banner hochzählen (Datum der Fassung)
export const BANNER_VERSION = '2026-11-27';
const GA4_ID = 'G-Z8ZGP4RK08'; // = googleTag.ts (hier doppelt, damit consent.ts ohne Importe bleibt)
// Cookies von Google (Analytics/Ads) und Meta, die nach dem Widerruf weg müssen
const TRACKING_COOKIE = /^(_ga|_ga_.*|_gid|_gat.*|_gcl_.*|_fbp|_fbc)$/;
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
function newId() {
  try { if (crypto.randomUUID) return crypto.randomUUID(); } catch { /* ältere Browser */ }
  const a = new Uint8Array(16);
  try { crypto.getRandomValues(a); } catch { for (let i = 0; i < 16; i++) a[i] = Math.floor(Math.random() * 256); }
  return Array.from(a, (b) => b.toString(16).padStart(2, '0')).join('');
}

// Tracking-Cookies löschen: auf diesem Host und allen übergeordneten Domains (z. B. .fit-inn-trier.de)
export function clearTrackingCookies() {
  if (typeof document === 'undefined') return;
  const names = document.cookie.split('; ').map((x) => x.split('=')[0]).filter((n) => TRACKING_COOKIE.test(n));
  if (!names.length) return;
  const parts = location.hostname.split('.');
  const domains = [''];
  for (let i = 0; i < parts.length - 1; i++) domains.push('; domain=.' + parts.slice(i).join('.'));
  for (const n of names) for (const d of domains) document.cookie = `${n}=; Max-Age=0; Path=/${d}`;
}

// Ohne Marketing-Einwilligung: Google-Tag sperren und übrig gebliebene Tracking-Cookies entfernen (läuft bei jedem Seitenaufruf).
export function enforceNoTracking() {
  if (typeof window === 'undefined' || hasConsent('marketing')) return;
  (window as any)['ga-disable-' + GA4_ID] = true;
  clearTrackingCookies();
}

// Nachweis an den Server (fire-and-forget)
function logConsent(c: Consent, how: string) {
  try {
    const body = JSON.stringify({ step: 'consent_log', id: c.id, bv: c.bv, stats: c.stats, media: c.media, marketing: !!c.marketing, how, ts: c.ts, page: location.pathname });
    if (navigator.sendBeacon && navigator.sendBeacon('/api/f', new Blob([body], { type: 'application/json' }))) return;
    fetch('/api/f', { method: 'POST', headers: { 'content-type': 'application/json' }, body, keepalive: true }).catch(() => {});
  } catch { /* egal */ }
}

export function saveConsent(stats: boolean, media: boolean, marketing = false, how = 'all') {
  const prev = readConsent();
  const c: Consent = { v: 1, stats, media, marketing, ts: Date.now(), id: prev?.id || newId(), bv: BANNER_VERSION };
  try { window.localStorage.setItem(KEY, JSON.stringify(c)); } catch { /* gesperrt: Cookie unten */ }
  try { document.cookie = `${KEY}=${encodeURIComponent(JSON.stringify(c))}; Max-Age=${365 * 86400}; Path=/; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`; } catch { /* ignore */ }
  (window as any).__fiConsent = c;
  logConsent(c, how);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: c }));
  // Widerruf von etwas, das schon lief: Messung sofort stoppen, Cookies löschen, einmal neu laden (entfernt geladene Skripte)
  const revoked = (prev?.marketing && !marketing) || (prev?.stats && !stats) || (prev?.media && !media);
  if (!marketing) {
    const w = window as any;
    w['ga-disable-' + GA4_ID] = true;
    try { if (typeof w.gtag === 'function') w.gtag('consent', 'update', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' }); } catch { /* ignore */ }
    try { if (typeof w.fbq === 'function') w.fbq('consent', 'revoke'); } catch { /* ignore */ }
    clearTrackingCookies();
  }
  if (revoked) setTimeout(() => { clearTrackingCookies(); location.reload(); }, 300);
}
export function openConsent() {
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
}
