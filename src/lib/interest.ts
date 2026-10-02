// Interessenprofil eines Besuchs – lebt nur im Speicher des Browsers (kein Cookie, keine Speicherung).
// Abschnitte und Aktionen erhöhen Punkte je Thema; daraus wird der passende Hinweis gewählt.
import { track } from '@vercel/analytics';
import { hasConsent } from './consent';
import { funnel, funnelReset } from './funnel';

export type Topic = 'price' | 'fit' | 'geraete' | 'hours' | 'default';
type Score = Record<Exclude<Topic, 'default'>, number>;

const score: Score = { price: 0, fit: 0, geraete: 0, hours: 0 };
const seen: Record<string, number> = {}; // Abschnitt -> Sekunden im Bild
let questions: string[] = [];
if (typeof window !== 'undefined') (window as any).__fiInterest = () => ({ score: { ...score }, seen: { ...seen }, questions: [...questions], top: topTopic() });

// Gewichte: Abschnitts-Verweildauer (pro Sekunde) und Aktionen
const SECTION_TOPIC: Record<string, Exclude<Topic, 'default'> | null> = {
  angebot: 'price', geraete: 'geraete', stimmen: 'fit', fragen: null, anmeldung: null,
};

function send(name: string, data: Record<string, string | number>) {
  if (!hasConsent('stats')) return; // nur mit Einwilligung
  try { track(name, data); } catch { /* Analytics optional */ }
  try {
    const body = JSON.stringify({ name, data, t: Date.now() });
    if (navigator.sendBeacon) navigator.sendBeacon('/api/event', new Blob([body], { type: 'application/json' }));
    else fetch('/api/event', { method: 'POST', headers: { 'content-type': 'application/json' }, body, keepalive: true }).catch(() => {});
  } catch { /* egal */ }
}

export function dwell(sectionId: string, seconds: number) {
  seen[sectionId] = (seen[sectionId] || 0) + seconds;
  const t = SECTION_TOPIC[sectionId];
  if (t) score[t] += seconds * 0.6;
}
export function dwellReport(sectionId: string, seconds: number) {
  if (seconds >= 2) send('section_view', { id: sectionId, seconds: Math.round(seconds) });
}

export function signal(type: string, value = '') {
  const v = String(value).toLowerCase();
  if (type === 'tariff') score.price += 4;
  if (type === 'rundgang') score.geraete += 3;
  if (type === 'incl') score.price += 2;
  if (type === 'chart') score.price += 2;
  if (type === 'tile') score.geraete += 3;
  if (type === 'question') {
    questions.push(v);
    if (/preis|kost|januar|tarif|basic|premium|5\s?€|spar|geb/.test(v)) score.price += 5;
    else if (/alt|unfit|anfänger|einstieg|trainer|angst|lange nicht/.test(v)) score.fit += 5;
    else if (/öffn|uhr|voll|auslast|wann/.test(v)) score.hours += 5;
    else if (/gerät|zirkel|biocircuit|cardio|kraft|hantel|training/.test(v)) score.geraete += 4;
  }
  if (type === 'booking_start') score.fit += 1;
  send('signal', { type, value: v.slice(0, 60) });
}

export function topTopic(): Topic {
  const entries = Object.entries(score) as Array<[Exclude<Topic, 'default'>, number]>;
  entries.sort((a, b) => b[1] - a[1]);
  const [best, val] = entries[0];
  const total = entries.reduce((s, e) => s + e[1], 0);
  if (val < 4 || total < 6) return 'default';
  return best;
}

export function summary(): string {
  const t = topTopic();
  const parts: string[] = [];
  if (t === 'price') parts.push('Preis und Ersparnis');
  if (t === 'fit') parts.push('Einstieg und Betreuung');
  if (t === 'geraete') parts.push('Trainingsbereiche');
  if (t === 'hours') parts.push('Öffnungszeiten');
  const top = Object.entries(seen).sort((a, b) => b[1] - a[1]).slice(0, 2).map(([k]) => k);
  if (top.length) parts.push(`angesehen: ${top.join(', ')}`);
  if (questions.length) parts.push(`gefragt: ${questions.slice(-2).join(' / ')}`);
  return parts.join(' · ');
}

export function interestNote(): string {
  if (!hasConsent('stats')) return ''; // Profil nur mit Einwilligung
  const t = topTopic();
  const label: Record<Topic, string> = { price: 'Preis/Ersparnis', fit: 'Einstieg/Betreuung', geraete: 'Geräte & Bereiche', hours: 'Öffnungszeiten', default: 'allgemein' };
  const q = questions.length ? ` · Fragen: ${questions.slice(-2).join(' / ').slice(0, 120)}` : '';
  return `Interesse: ${label[t]}${q}`;
}

export function reportShown(topic: string, source: string) { send('nudge_shown', { topic, source }); }
export function reportClick(topic: string) { send('nudge_click', { topic }); }
export function reportBooking(stage: 'start' | 'success', source: string) {
  // Anonymer Trichter läuft immer (ohne Profil/Thema), das ausführliche Event nur mit Einwilligung.
  if (stage === 'start') { funnelReset(); funnel('open', source); } else funnel('ok', source);
  send('booking_' + stage, { source, topic: topTopic() });
}
