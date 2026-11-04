'use client';
// Black Week 2026 (Angebot E (Vertragsbeginn 01.01.2027, bis dahin kostenlos)): Zeitsteuerung der Seite /black-week.
// Phasen nach Berliner Kalendertag (Europe/Berlin, nicht UTC): vor 15.11. = pre, 15.–30.11. = live, ab 01.12. 00:00 = ended.
// Die Seite ist statisch gebaut; die Phase wird erst im Browser bestimmt, vorher gilt „live“ (neutraler Text).
import { useEffect, useState } from 'react';

export type BwPhase = 'pre' | 'live' | 'ended';

const START_TAG = '2026-11-15';
const LETZTER_TAG = '2026-11-30';
// Zielzeitpunkte für den Countdown (Berlin im November/Dezember = MEZ, +01:00)
export const BW_START_MS = Date.parse('2026-11-15T00:00:00+01:00');
export const BW_ENDE_MS = Date.parse('2026-11-30T23:59:00+01:00');

export function berlinTag(d = new Date()) {
  return d.toLocaleDateString('sv-SE', { timeZone: 'Europe/Berlin' });
}

export function bwPhase(d = new Date()): BwPhase {
  const tag = berlinTag(d);
  if (tag < START_TAG) return 'pre';
  if (tag > LETZTER_TAG) return 'ended';
  return 'live';
}

// null = noch nicht im Browser bestimmt (Server-Render / erster Client-Render)
export function useBwZeit() {
  const [z, setZ] = useState<{ phase: BwPhase; rest: number } | null>(null);
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const phase = bwPhase(now);
      const ziel = phase === 'pre' ? BW_START_MS : BW_ENDE_MS;
      setZ({ phase, rest: Math.max(0, ziel - now.getTime()) });
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);
  return z;
}
