// Belegte Stammdaten von Fit-Inn Trier – eine Quelle für Startseite und
// Kampagnenseiten. Nur hier ändern.
//
// Quellen: Impressum, fit-inn-trier.de/preise und AGB (Stand September 2026),
// Angaben der Inhaber (rund 1.200 Mitglieder, rund 15 Mitarbeitende,
// Telefon 0651 493 688 19 für die Website).
//
// Zwischen Zahl und Einheit steht überall ein geschütztes Leerzeichen
// ( ), damit „39 €“ oder „52 Wochen“ nie auseinanderbrechen.

export const studio = {
  name: 'Fit-Inn Trier',
  gegruendet: '1996',
  mitglieder: 'rund 1.200',
  team: 'rund 15',
  telefon: { anzeige: '0651 493 688 19', link: '+4965149368819' },
  email: 'info@fit-inn-trier.de',
  strasse: 'Auf Hirtenberg 8',
  plz: '54296',
  ort: 'Trier',
  stadtteil: 'Trier-Feyen',
  website: { anzeige: 'fit-inn-trier.de', href: 'https://fit-inn-trier.de' },
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

/** Betrag mit geschütztem Leerzeichen, z. B. eur(39) → „39 €“. */
export const eur = (betrag: number | string) => `${betrag} €`

/** Einmalige Gebühr, wie sie in AGB (§ 6.3) und Preisliste heißt. */
export const GEBUEHR_BETRAG = 39
export const GEBUEHR_NAME = 'Aktivierungsgebühr'
export const aktivierungsgebuehr = eur(GEBUEHR_BETRAG)

/**
 * Verlängerung und Kündigung laut AGB § 3.2 und Preisliste: zum Ende der
 * Erstlaufzeit und danach jederzeit mit 4 Wochen Frist.
 * ACHTUNG: Die Seite fit-inn-trier.de/kundigungsbedingungen-fit-inn-trier
 * und der frühere Rechtshinweis der 5-Euro-Aktion nennen „einen Monat“ –
 * vor dem Livegang mit den Inhabern abstimmen.
 */
export const kuendigung =
  'Nach der Erstlaufzeit verlängert sich die Mitgliedschaft auf unbestimmte Zeit. Kündigen kannst du zum ' +
  'Ende der Erstlaufzeit und danach jederzeit mit einer Frist von 4 Wochen.'

/**
 * Reguläre Mitgliedschaften laut Preisliste. Alle Beiträge inkl. MwSt.,
 * Abbuchung alle 14 Tage per SEPA-Lastschrift, einmalige
 * Aktivierungsgebühr, keine weiteren Pauschalen.
 */
const tarif = (id: string, name: string, wochen: number, preis: number) => ({
  id,
  name,
  wochen,
  preis,
  laufzeit: `${wochen} Wochen`,
  beitraege: eur(wochen * preis),
  gesamt: eur(wochen * preis + GEBUEHR_BETRAG),
})

export const tarife = [
  tarif('52', 'Ein Jahr', 52, 12),
  tarif('104', 'Zwei Jahre', 104, 9),
  tarif('4', 'Flexibel', 4, 15),
]

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

/** Basis-URL dieser Website (für strukturierte Daten und Vorschaubilder). */
export const BASIS = 'https://30jahre.fit-inn-trier.de'

/** Das Studio als HealthClub – gemeinsam für alle Seiten, gleiche @id. */
export function healthClubSchema() {
  return {
    '@type': 'HealthClub',
    '@id': `${studio.website.href}/#studio`,
    name: studio.name,
    description:
      'Familiengeführtes Fitnessstudio in Trier-Feyen seit 1996: persönliche Betreuung, Biostrength-Geräte ' +
      'von Technogym, Cardio- und Freihantelbereich.',
    url: studio.website.href,
    telephone: studio.telefon.link,
    email: studio.email,
    foundingDate: studio.gegruendet,
    image: `${BASIS}/og-startseite.jpg`,
    logo: `${BASIS}/logo.png`,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Auf Hirtenberg 8',
      postalCode: studio.plz,
      addressLocality: studio.ort,
      addressRegion: 'Rheinland-Pfalz',
      addressCountry: 'DE',
    },
    areaServed: { '@type': 'City', name: 'Trier' },
    sameAs: [studio.instagram, studio.facebook],
  }
}
