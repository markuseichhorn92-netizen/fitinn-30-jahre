// Belegte Stammdaten von Fit-Inn Trier – eine Quelle für Startseite und
// Kampagnenseiten. Nur hier ändern.
//
// Quellen: Impressum, fit-inn-trier.de/preise (Stand August 2026),
// Angaben der Inhaber (rund 1.200 Mitglieder, rund 15 Mitarbeitende,
// Telefon 0651 493 688 19 für die Website).

export const studio = {
  name: 'Fit-Inn Trier',
  gegruendet: '1996',
  mitglieder: 'rund 1.200',
  team: 'rund 15',
  telefon: { anzeige: '0651 493 688 19', link: '+4965149368819' },
  email: 'info@fit-inn-trier.de',
  strasse: 'Auf Hirtenberg 8',
  plz: '54296',
  ort: 'Trier',
  stadtteil: 'Trier-Feyen',
  website: { anzeige: 'fit-inn-trier.de', href: 'https://www.fit-inn-trier.de' },
  route:
    'https://www.google.com/maps/search/?api=1&query=Fit-Inn+Trier%2C+Auf+Hirtenberg+8%2C+54296+Trier',
  agb: 'https://fit-inn-trier.de/agbs-fit-inn-trier',
  hausordnung: 'https://fit-inn-trier.de/hausordnung',
  instagram: 'https://www.instagram.com/fit_inn_trier/',
  facebook: 'https://www.facebook.com/FitInnFeyen',
  /**
   * Öffnungszeiten – die vorhandenen Quellen widersprechen sich (Website,
   * strukturierte Daten, PRODUCT.md). Erst eintragen, wenn sie bestätigt
   * sind; solange die Liste leer ist, zeigt keine Seite Öffnungszeiten an.
   */
  oeffnungszeiten: [] as { tage: string; zeit: string }[],
} as const

/**
 * Reguläre Mitgliedschaften laut Preisliste (Stand August 2026). Alle
 * Beiträge inkl. MwSt., Abbuchung alle 14 Tage per SEPA-Lastschrift,
 * einmalige Aktivierungsgebühr 39 €, keine weiteren Pauschalen.
 */
export const tarife = [
  { id: '52', laufzeit: '52 Wochen', name: 'Ein Jahr', wochen: 52, preis: 12, gesamt: '624 €' },
  { id: '104', laufzeit: '104 Wochen', name: 'Zwei Jahre', wochen: 104, preis: 9, gesamt: '936 €' },
  { id: '4', laufzeit: '4 Wochen', name: 'Flexibel', wochen: 4, preis: 15, gesamt: '60 €' },
] as const

export const aktivierungsgebuehr = '39 €'

/** Was laut Preisliste in jeder Mitgliedschaft enthalten ist. */
export const inklusive = [
  'Komplette Clubnutzung',
  'Trainingspläne und Technogym-App',
  'Gesundheits-Check-up',
  'Mineralgetränke',
  'Cardio-Entertainment',
  'WLAN',
]

export const telLink = `tel:${studio.telefon.link}`
