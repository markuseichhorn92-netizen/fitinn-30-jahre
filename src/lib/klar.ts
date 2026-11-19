// /klar – aufgeräumte Angebotsseite (Entwurf 19.11.2026). Hier liegen Umschalter und alle Preis-Fakten der Seite.
// Quelle der Zahlen: Sanity /preise (live seit 19.11.2026) bzw. /black-week. Nichts hier ohne Beleg ändern.

export type KlarPhase = 'blackweek' | 'standard';

// UMSCHALTER: 'auto' = nach Berliner Kalendertag (bis 30.11.2026 Black Week, ab 01.12.2026 Standard).
// Fest einstellen mit 'blackweek' oder 'standard'. Für Vorschauen/Tests überschreibt die Umgebungsvariable KLAR_PHASE.
export const KLAR_PHASE: 'auto' | KlarPhase = 'auto';
const BW_LETZTER_TAG = '2026-11-30';

export function klarPhase(d = new Date()): KlarPhase {
  const env = process.env.KLAR_PHASE;
  if (env === 'blackweek' || env === 'standard') return env;
  if (KLAR_PHASE !== 'auto') return KLAR_PHASE;
  return d.toLocaleDateString('sv-SE', { timeZone: 'Europe/Berlin' }) <= BW_LETZTER_TAG ? 'blackweek' : 'standard';
}

type Tarif = { laufzeit: string; preis: string; zusatz: string; gesamt: string; hervor?: string };

export type KlarInhalt = {
  kicker: string;
  preisGross: string;
  preisEinheit: string;
  preisDanach?: string;
  preisKlein: string;
  stickyStark: string;
  stickyText: string;
  tarifTitel: string;
  tarifBanner?: string;
  tarife: Tarif[];
  tarifHinweis: string;
  abschluss: string;
  faqKosten: string;
  faqUnterschrift: string;
  kleingedrucktes: string;
};

export const INHALT: Record<KlarPhase, KlarInhalt> = {
  blackweek: {
    kicker: 'Black Week · bis 30. November',
    preisGross: '0 €',
    preisEinheit: 'bis Silvester',
    preisDanach: 'danach ab 9 € pro Woche',
    preisKlein: '104 Wochen ab 01.01.2027 · Gesamtpreis 936 € · keine Aktivierungsgebühr',
    stickyStark: '0 € bis Silvester',
    stickyText: 'danach ab 9 € pro Woche',
    tarifTitel: 'Erst 0 €. Dann ab 9 € pro Woche.',
    tarifBanner: '0 € ab Unterschrift bis 31.12.2026',
    tarife: [
      { laufzeit: '104 Wochen', preis: '9 €', zusatz: 'pro Woche ab 01.01.2027', gesamt: 'Gesamtpreis 936 €', hervor: 'Günstigster Wochenpreis' },
      { laufzeit: '52 Wochen', preis: '12 €', zusatz: 'pro Woche ab 01.01.2027', gesamt: 'Gesamtpreis 624 €' },
    ],
    tarifHinweis: 'Keine Aktivierungsgebühr (regulär 39 €). Nur für Neumitglieder ab 18, nur die ersten 20, Unterschrift bis 30.11.2026. Der 4-Wochen-Tarif ist nicht Teil der Aktion.',
    abschluss: 'Passt es, unterschreibst du im Studio und trainierst sofort – bis Silvester kostenlos.',
    faqKosten: '104 Wochen à 9 €: Gesamtpreis 936 €. 52 Wochen à 12 €: Gesamtpreis 624 €. Keine Aktivierungsgebühr, der Beitrag beginnt am 01.01.2027.',
    faqUnterschrift: 'Nein. Erst trainierst du probe, dann entscheidest du in Ruhe. Unterschrieben wird danach im Studio.',
    kleingedrucktes:
      'Black Week: Vertrag vor Ort nach Probetraining, Vertragsbeginn 01.01.2027, ab Unterschrift bis 31.12.2026 beitragsfreie Nutzung. 104-Wochen-Tarif 9 € pro Woche (Gesamtpreis 936 €) oder 52-Wochen-Tarif 12 € pro Woche (Gesamtpreis 624 €), keine Aktivierungsgebühr. Abbuchung 14-tägig per SEPA-Lastschrift. Nach der Erstlaufzeit läuft der Vertrag auf unbestimmte Zeit und ist mit 4 Wochen Frist in Textform kündbar. Nur für Neumitglieder ab 18, nur die ersten 20, Unterschrift bis 30.11.2026. Alle Preise inkl. gesetzlicher MwSt.',
  },
  standard: {
    kicker: 'Fit-Inn Trier · familiengeführt seit 1996',
    preisGross: '9 €',
    preisEinheit: 'pro Woche',
    preisKlein: 'bei 104 Wochen · zzgl. 39 € Aktivierungsgebühr · Gesamtpreis 975 €',
    stickyStark: 'ab 9 € pro Woche',
    stickyText: 'Gesamtpreis 975 € (104 Wochen)',
    tarifTitel: 'Drei Laufzeiten. Ein klarer Wochenpreis.',
    tarife: [
      { laufzeit: '104 Wochen', preis: '9 €', zusatz: 'pro Woche', gesamt: 'Gesamtpreis 975 €', hervor: 'Günstigster Wochenpreis' },
      { laufzeit: '52 Wochen', preis: '12 €', zusatz: 'pro Woche', gesamt: 'Gesamtpreis 663 €' },
      { laufzeit: '4 Wochen', preis: '15 €', zusatz: 'pro Woche', gesamt: 'Gesamtpreis 99 €' },
    ],
    tarifHinweis: 'Gesamtpreise für die Erstlaufzeit inkl. 39 € Aktivierungsgebühr. Schüler, Azubis und Studenten (mit Nachweis): 52 Wochen für 9 € pro Woche, Gesamtpreis 507 €.',
    abschluss: 'Passt es, schließt du im Studio oder online ab. Passt es nicht, ist das auch völlig in Ordnung.',
    faqKosten: '104 Wochen à 9 €: Gesamtpreis 975 €. 52 Wochen à 12 €: 663 €. 4 Wochen à 15 €: 99 €. Die 39 € Aktivierungsgebühr sind jeweils schon eingerechnet.',
    faqUnterschrift: 'Nein. Erst trainierst du probe, dann entscheidest du in Ruhe – im Studio oder online.',
    kleingedrucktes:
      'Erstlaufzeit 104, 52 oder 4 Wochen zu 9 €, 12 € bzw. 15 € pro Woche, zzgl. einmaliger Aktivierungsgebühr 39 €. Gesamtpreis für die Erstlaufzeit: 975 €, 663 € bzw. 99 €. Schüler, Azubis und Studenten mit Nachweis: 52 Wochen zu 9 € pro Woche, Gesamtpreis 507 €. Abbuchung 14-tägig per SEPA-Lastschrift. Kündigung mit 4 Wochen Frist zum Ende der Erstlaufzeit in Textform; danach läuft der Vertrag auf unbestimmte Zeit und ist jederzeit mit 4 Wochen Frist kündbar. Neumitglieder ab 18. Alle Preise inkl. gesetzlicher MwSt.',
  },
};

// Gilt in beiden Phasen (Quelle: Sanity /preise FAQ, live 19.11.2026)
export const OEFFNUNGSZEITEN: Array<[string, string]> = [
  ['Montag – Freitag', '09:30 – 13:00 und 15:00 – 21:30 Uhr'],
  ['Samstag', '13:00 – 18:00 Uhr'],
  ['Sonntag', '09:00 – 15:00 Uhr'],
];
