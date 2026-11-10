// Absprung-Messung (Black Week): anonyme Zähler je Abschnitt, Scrolltiefe, Verweildauer, Umschalter, FAQ und Anzeigen-Motiv.
// Gleiche Regeln wie src/lib/funnel.ts: keine Kennung, kein Cookie, nichts im Browser gespeichert, keine IP, keine Personendaten.
// Jeder Zähler besteht nur aus Schrittname + Seitenpfad + einer festen Kurzbezeichnung (Listen unten, serverseitig in /api/f geprüft).
import { funnel } from './funnel';

export const MOTIVE = ['studio', 'vorsatz', 'plaetze', 'countdown', 'preis', 'silvester', 'karussell-ablauf', 'karussell-drin'] as const;
export const QUELLEN = ['meta', 'google', 'website', 'tv', 'aushang', 'instagram', 'seals', 'facebook'] as const;
export const ABSCHNITTE = ['hero', 'saeulen', 'buchung', 'preise', 'ablauf', 'app', 'faq', 'fuss'] as const;
export const TIEFEN = ['d25', 'd50', 'd75', 'd100'] as const;
export const ZEITEN = ['t5', 't15', 't30', 't60', 't120', 't300', 't300p'] as const;

// Anzeigen-Motiv aus der Adresse (nur bekannte Werte, sonst „other“; ohne Angabe „direkt“). Nichts wird gespeichert.
export function motivAusUrl(param = 'utm_content', search?: string): string {
  try {
    const q = search ?? (typeof window === 'undefined' ? '' : window.location.search);
    const v = (new URLSearchParams(q).get(param) || '').toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 24);
    if (!v) return 'direkt';
    return (MOTIVE as readonly string[]).includes(v) ? v : 'other';
  } catch { return 'direkt'; }
}

// Herkunft aus utm_source (nur bekannte Werte, sonst „other“; ohne Angabe „direkt“).
export function quelleAusUrl(search?: string): string {
  try {
    const q = search ?? (typeof window === 'undefined' ? '' : window.location.search);
    const v = (new URLSearchParams(q).get('utm_source') || '').toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 24);
    if (!v) return 'direkt';
    return (QUELLEN as readonly string[]).includes(v) ? v : 'other';
  } catch { return 'direkt'; }
}

export function zeitBereich(sekunden: number): string {
  const s = Math.max(0, sekunden);
  return s < 5 ? 't5' : s < 15 ? 't15' : s < 30 ? 't30' : s < 60 ? 't60' : s < 120 ? 't120' : s < 300 ? 't300' : 't300p';
}

const ABSCHNITT_AUSWAHL: Array<[string, string]> = [
  ['.fc-hero', 'hero'], ['.fc-pillars', 'saeulen'], ['#anmeldung', 'buchung'], ['.bw-preis', 'preise'],
  ['#ablauf', 'ablauf'], ['section[aria-labelledby="app-block-h"]', 'app'], ['.fc-faq', 'faq'], ['footer', 'fuss'],
];

// Startet die Messung auf /black-week. Gibt eine Aufräum-Funktion zurück.
export function starteAbsprungMessung(): () => void {
  if (typeof window === 'undefined') return () => {};
  const t0 = Date.now();
  funnel('from', motivAusUrl());
  funnel('quelle', quelleAusUrl());

  let zuletzt = '';
  const gesehen = new Set<string>();
  const io = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver((eintraege) => {
    for (const e of eintraege) {
      if (!e.isIntersecting) continue;
      const id = (e.target as HTMLElement).dataset.bwSec || '';
      if (!id) continue;
      zuletzt = id;
      if (!gesehen.has(id)) { gesehen.add(id); funnel('sec', id); }
    }
  }, { threshold: 0.25 });
  if (io) {
    for (const [sel, id] of ABSCHNITT_AUSWAHL) {
      const el = document.querySelector<HTMLElement>(sel);
      if (el) { el.dataset.bwSec = id; io.observe(el); }
    }
  }

  let frame = 0;
  const tiefe = () => {
    frame = 0;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (h <= 0) return;
    const p = (window.scrollY / h) * 100;
    if (p >= 25) funnel('depth', 'd25');
    if (p >= 50) funnel('depth', 'd50');
    if (p >= 75) funnel('depth', 'd75');
    if (p >= 97) funnel('depth', 'd100');
  };
  const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(tiefe); };
  window.addEventListener('scroll', onScroll, { passive: true });

  const onChange = (e: Event) => {
    const t = e.target as HTMLInputElement | null;
    if (t?.name === 'bwp-tarif' && t.checked) funnel('toggle', t.id.replace('bwp-', ''));
  };
  document.addEventListener('change', onChange);
  const onToggle = (e: Event) => {
    const d = e.target as HTMLDetailsElement | null;
    if (!d || d.tagName !== 'DETAILS' || !d.open || !d.closest('.fc-faq-liste')) return;
    const i = Array.from(d.parentElement?.children || []).indexOf(d);
    if (i >= 0 && i < 16) funnel('faq', `q${i}`);
  };
  document.addEventListener('toggle', onToggle, true);

  // Verlassen: Tab versteckt oder Seite geschlossen. Zählt je Seitenaufruf einmal (funnel() entprellt).
  const verlassen = () => {
    funnel('exit', zuletzt || 'hero');
    funnel('dwell', zeitBereich((Date.now() - t0) / 1000));
  };
  const onVis = () => { if (document.visibilityState === 'hidden') verlassen(); };
  document.addEventListener('visibilitychange', onVis);
  window.addEventListener('pagehide', verlassen);

  return () => {
    io?.disconnect();
    window.removeEventListener('scroll', onScroll);
    document.removeEventListener('change', onChange);
    document.removeEventListener('toggle', onToggle, true);
    document.removeEventListener('visibilitychange', onVis);
    window.removeEventListener('pagehide', verlassen);
  };
}

// Serverseitige Prüfung für /api/f: nur feste Kombinationen aus Schritt, Seite und Kurzbezeichnung werden gezählt.
const KF_SCHRITTE = ['ziel', 'erfahrung', 'zeit', 'fokus', 'plan', 'termin', 'daten'];
const KF_FELDER = ['vorname', 'nachname', 'email', 'dob', 'zip', 'consent'];
const BW = '/black-week';
const KF = '/konfigurator';
const REGELN: Record<string, { page: string; src: (s: string) => boolean }> = {
  from: { page: BW, src: (s) => s === 'direkt' || s === 'other' || (MOTIVE as readonly string[]).includes(s) },
  from_open: { page: BW, src: (s) => s === 'direkt' || s === 'other' || (MOTIVE as readonly string[]).includes(s) },
  from_kf: { page: KF, src: (s) => s === 'direkt' || s === 'other' || (MOTIVE as readonly string[]).includes(s) },
  from_ok: { page: KF, src: (s) => s === 'direkt' || s === 'other' || (MOTIVE as readonly string[]).includes(s) },
  quelle: { page: BW, src: (s) => s === 'direkt' || s === 'other' || (QUELLEN as readonly string[]).includes(s) },
  sec: { page: BW, src: (s) => (ABSCHNITTE as readonly string[]).includes(s) },
  exit: { page: BW, src: (s) => (ABSCHNITTE as readonly string[]).includes(s) },
  depth: { page: BW, src: (s) => (TIEFEN as readonly string[]).includes(s) },
  dwell: { page: BW, src: (s) => (ZEITEN as readonly string[]).includes(s) },
  toggle: { page: BW, src: (s) => s === 't104' || s === 't52' },
  faq: { page: BW, src: (s) => /^q([0-9]|1[0-5])$/.test(s) },
  kf_exit: { page: KF, src: (s) => KF_SCHRITTE.includes(s) || KF_FELDER.some((f) => s === `daten-${f}`) },
  kf_err: { page: KF, src: (s) => KF_FELDER.includes(s) },
};
export const ABSPRUNG_SCHRITTE = Object.keys(REGELN);
export function absprungErlaubt(step: string, page: string, src: string): boolean {
  const r = REGELN[step];
  return !!r && page === r.page && r.src(src);
}
