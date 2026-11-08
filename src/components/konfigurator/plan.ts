// Inhalte und Regeln des Probetraining-Konfigurators (nur echte Fit-Inn-Angebote, keine Preise, keine Heilversprechen).

export type Option = { key: string; label: string; sub?: string; icon?: string };
export type Erfahrung = Option & { trainer: boolean; erfahren?: boolean };

export const ZIELE: Option[] = [
  { key: 'abnehmen', icon: 'flame', label: 'Abnehmen', sub: 'Gewicht und Körperfett runter' },
  { key: 'muskeln', icon: 'dumbbell', label: 'Muskelaufbau', sub: 'Kraft und Form' },
  { key: 'fit', icon: 'heart', label: 'Fit & gesund bleiben', sub: 'Ausdauer, Energie, Ausgleich' },
  { key: 'ruecken', icon: 'spine', label: 'Rücken & Beweglichkeit', sub: 'Haltung, Verspannungen vorbeugen' },
  { key: 'stress', icon: 'leaf', label: 'Stress abbauen', sub: 'Kopf frei, besser abschalten' },
  { key: 'wiedereinstieg', icon: 'restart', label: 'Wiedereinstieg', sub: 'Nach einer Pause neu starten' },
];

export const ERFAHRUNGEN: Erfahrung[] = [
  { key: 'neu', label: 'Noch nie im Studio', sub: 'Alles neu für mich', trainer: true },
  { key: 'pause', label: 'Länger pausiert', sub: 'Früher trainiert, jetzt wieder rein', trainer: true },
  { key: 'unregelmaessig', label: 'Ab und zu aktiv', sub: 'Ohne festen Plan', trainer: true },
  { key: 'regelmaessig', label: 'Trainiere regelmäßig', sub: 'Ich kenne mich aus', trainer: false, erfahren: true },
];

export const ZEITEN: (Option & { rhythmus: string })[] = [
  { key: 'wenig', label: '1 bis 2 Stunden', sub: 'Kurz und effektiv', rhythmus: '2 × 30 Minuten pro Woche im geführten Zirkel' },
  { key: 'mittel', label: '2 bis 4 Stunden', sub: 'Ein solider Rhythmus', rhythmus: '2 bis 3 Einheiten pro Woche, je 45 bis 60 Minuten' },
  { key: 'viel', label: 'Mehr als 4 Stunden', sub: 'Ich will richtig ran', rhythmus: '3 bis 4 Einheiten pro Woche mit wechselnden Schwerpunkten' },
];

// Bausteine, die es bei Fit-Inn wirklich gibt
export const SCHWERPUNKTE: Option[] = [
  { key: 'biostrength', label: 'Biostrength', sub: 'Krafttraining, das sich auf dich einstellt' },
  { key: 'biocircuit', label: 'Biocircuit', sub: 'Geführter 30-Minuten-Zirkel' },
  { key: 'cardio', label: 'Ausdauer', sub: 'Cardio mit virtuellem Coach' },
  { key: 'frei', label: 'Freihanteln', sub: 'Powerbereich mit Kabelzug' },
  { key: 'haltung', label: 'Rücken & Haltung', sub: 'Rumpf kräftigen, Beweglichkeit' },
  { key: 'ernaehrung', label: 'Ernährungs-Tipp', sub: 'Kurzer Tipp vom Trainer' },
];

// Freihanteln/Powerbereich und Probetraining ohne Trainer nur für Erfahrene (Einsteiger und Wiedereinsteiger nie)
export const NUR_ERFAHRENE = ['frei'];

export function istErfahren(erfahrung: string, ziel = ''): boolean {
  if (ziel === 'wiedereinstieg') return false;
  return ERFAHRUNGEN.find((e) => e.key === erfahrung)?.erfahren === true;
}

export function schwerpunkteFuer(erfahrung: string, ziel = ''): Option[] {
  const ok = istErfahren(erfahrung, ziel);
  return SCHWERPUNKTE.filter((s) => ok || !NUR_ERFAHRENE.includes(s.key));
}

export function fokusBereinigen(fokus: string[], erfahrung: string, ziel = ''): string[] {
  const ok = istErfahren(erfahrung, ziel);
  return fokus.filter((k) => ok || !NUR_ERFAHRENE.includes(k));
}

// Vorschläge je Ziel (werden vorgewählt, bleiben änderbar)
export const VORSCHLAG: Record<string, string[]> = {
  abnehmen: ['cardio', 'biocircuit', 'ernaehrung'],
  muskeln: ['biostrength', 'frei'],
  fit: ['cardio', 'biostrength'],
  ruecken: ['haltung', 'biocircuit'],
  stress: ['biocircuit', 'cardio'],
  wiedereinstieg: ['biocircuit', 'biostrength'],
};

const BAUSTEIN: Record<string, { titel: string; text: string }> = {
  einweisung: { titel: 'Einweisung mit Trainer', text: 'Du lernst jedes Gerät in Ruhe kennen, niemand lässt dich allein.' },
  biostrength: { titel: 'Biostrength', text: 'Krafttraining an Geräten, die sich auf dich einstellen und dich durch die Übung führen.' },
  biocircuit: { titel: 'Biocircuit', text: 'Geführter 30-Minuten-Zirkel: kurz, kontrolliert, ohne selbst planen zu müssen.' },
  cardio: { titel: 'Cardio-Check', text: 'Ausdauergeräte mit virtuellem Coach, passend zu deinem Tempo.' },
  frei: { titel: 'Powerbereich', text: 'Freihanteln und Kabelzug kennenlernen, mit Technik-Tipps.' },
  haltung: { titel: 'Rücken & Haltung', text: 'Rumpf und Rücken kräftigen, Übungen für mehr Beweglichkeit im Alltag.' },
  ernaehrung: { titel: 'Ernährungs-Tipp', text: 'Ein kurzer, alltagstauglicher Tipp von deinem Trainer.' },
  start: { titel: 'Dein Startplan', text: 'Am Ende weißt du, womit du nächste Woche loslegst.' },
};

export type Auswahl = { ziel: string; erfahrung: string; zeit: string; fokus: string[] };
export type PlanItem = { key: string; titel: string; text: string };

export function baueBausteine(a: Auswahl): PlanItem[] {
  const keys: string[] = [];
  const neu = a.erfahrung === 'neu' || a.erfahrung === 'pause' || a.ziel === 'wiedereinstieg';
  if (neu) keys.push('einweisung');
  fokusBereinigen(a.fokus, a.erfahrung, a.ziel).forEach((k) => { if (!keys.includes(k)) keys.push(k); });
  if (keys.length < 3) keys.push('start');
  return keys.slice(0, 4).map((k) => ({ key: k, ...BAUSTEIN[k] }));
}

export function trainerEmpfohlen(erfahrung: string, ziel = ''): boolean {
  return !istErfahren(erfahrung, ziel);
}

export function rhythmus(zeit: string): string {
  return ZEITEN.find((z) => z.key === zeit)?.rhythmus || '';
}

export function planTitel(ziel: string): string {
  const map: Record<string, string> = {
    abnehmen: 'Dein Plan zum Abnehmen',
    muskeln: 'Dein Plan für Muskelaufbau',
    fit: 'Dein Plan für mehr Fitness',
    ruecken: 'Dein Plan für Rücken & Beweglichkeit',
    stress: 'Dein Plan gegen Stress',
    wiedereinstieg: 'Dein Plan für den Neustart',
  };
  return map[ziel] || 'Dein Fit-Inn-Plan';
}
