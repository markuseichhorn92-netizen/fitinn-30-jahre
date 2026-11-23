import type { Metadata } from 'next';
import daten from '@/content/rezepte.json';

// A-0085: Rezepte für die Terminal-QR-Codes. Quelle: outbox/ernaehrung-terminal/build/daten.py → web.py → src/content/rezepte.json.
// Nicht verlinkt, nicht im Index (Meta + X-Robots-Tag in next.config.ts), kein Cookie-Banner/Pixel (HideOn in layout.tsx).

export type Rezept = (typeof daten.rezepte)[number];
export const REZEPTE: Rezept[] = daten.rezepte;
export const TIPPS = daten.tipps;
export const HINWEIS = daten.hinweis;
export const KAT: Record<string, string> = Object.fromEntries(daten.kategorien.map((k) => [k.id, k.titel.replace(' (bis 20 Min.)', '')]));

export const APP_URL = '/app/fitinn';
export const STOFF_URL = 'https://fit-inn-trier.de/stoffwechsel-coaching';

// Filter: nur was die Daten hergeben (Kategorien aus daten.py, „Viel Eiweiß“ = ab 25 g pro Portion).
export const FILTER = [
  { id: 'alle', titel: 'Alle' },
  { id: 'eiweiss', titel: 'Viel Eiweiß' },
  { id: 'vegetarisch', titel: 'Vegetarisch' },
  { id: 'schnell', titel: 'Bis 20 Min.' },
  { id: 'abnehmen', titel: 'Abnehmen' },
  { id: 'muskelaufbau', titel: 'Muskelaufbau' },
  { id: 'entzuendungsarm', titel: 'Entzündungsarm' },
] as const;

export function passt(r: Rezept, f: string) {
  if (f === 'alle') return true;
  if (f === 'eiweiss') return r.vielEiweiss;
  return r.kat.includes(f);
}

export const zeitText = (r: Rezept) => `${r.zeit} Min.${r.zeitNotiz ? ` ${r.zeitNotiz}` : ''}`;
export const portText = (r: Rezept) => (r.portionen === 1 ? '1 Portion' : `${r.portionen} Portionen`);

// Sanity-CDN liefert passende Größe + WebP/AVIF selbst (kein Vercel-Bildkontingent nötig).
export const bildUrl = (url: string, w: number) => `${url}?w=${w}&auto=format&q=75`;
export const bildSet = (url: string) => [480, 800, 1200].map((w) => `${bildUrl(url, w)} ${w}w`).join(', ');

export function meta(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
    openGraph: { title, description, url: path, locale: 'de_DE', type: 'website' },
  };
}
