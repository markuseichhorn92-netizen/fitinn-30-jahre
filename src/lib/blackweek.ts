'use client';
// Black Week 2026 (Angebot E (Vertragsbeginn 01.01.2027, bis dahin kostenlos)): Zeitsteuerung der Seite /black-week.
// Phasen nach Berliner Kalendertag (Europe/Berlin, nicht UTC): Aktion gilt ab sofort (live) bis 30.11., ab 01.12. 00:00 = ended.
// Die Seite ist statisch gebaut; die Phase wird erst im Browser bestimmt, vorher gilt „live“ (neutraler Text).
import { useEffect, useState } from 'react';

export type BwPhase = 'live' | 'ended';

const LETZTER_TAG = '2026-11-30';
// Zielzeitpunkt für den Countdown (Berlin im November/Dezember = MEZ, +01:00)
export const BW_ENDE_MS = Date.parse('2026-11-30T23:59:00+01:00');

export function berlinTag(d = new Date()) {
  return d.toLocaleDateString('sv-SE', { timeZone: 'Europe/Berlin' });
}

export function bwPhase(d = new Date()): BwPhase {
  const tag = berlinTag(d);
  if (tag > LETZTER_TAG) return 'ended';
  return 'live';
}

// null = noch nicht im Browser bestimmt (Server-Render / erster Client-Render)
// Kostenlose Trainingstage: heute (Berliner Kalendertag) bis einschließlich 31.12.2026
export function gratisTage(d = new Date()) {
  const [j, m, t] = berlinTag(d).split('-').map(Number);
  return Math.max(0, Math.round((Date.UTC(2026, 11, 31) - Date.UTC(j, m - 1, t)) / 86400000) + 1);
}

export function useBwZeit() {
  const [z, setZ] = useState<{ phase: BwPhase; rest: number; tage: number } | null>(null);
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const phase = bwPhase(now);
      setZ({ phase, rest: Math.max(0, BW_ENDE_MS - now.getTime()), tage: gratisTage(now) });
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);
  return z;
}
