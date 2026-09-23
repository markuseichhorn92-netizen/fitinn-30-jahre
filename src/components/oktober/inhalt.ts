// Oktober-Special 2026 „Dein Herbst. Dein Neustart.“
//
// Alle Texte, Preise und Pflichtangaben der Seite /oktober an einer Stelle.
// Die Sektionen setzen nur zusammen, was hier steht – wer eine Zahl ändert,
// ändert sie hier und sonst nirgends. Einzige Ausnahme: der Rechtshinweis
// unten nennt Beträge und Datum ausgeschrieben im Fließtext (siehe dort).

// ─── Aktion ───────────────────────────────────────────────────────────────────

export const aktion = {
  /** Aktionszeitraum: Vertragsabschlüsse im gesamten Oktober 2026. */
  zeitraum: '01.10.–31.10.2026',
  zeitraumLang: '1. bis 31. Oktober 2026',

  /**
   * Letzter Moment der Aktion, sekundengenau: 31.10.2026, 23:59:59 deutscher
   * Zeit. Am 25.10. endet die Sommerzeit, am 31.10. gilt also MEZ (UTC+1) –
   * deshalb 22:59:59Z und nicht 21:59:59Z wie bei einer Aktion im Sommer.
   */
  endeZeit: '2026-10-31T22:59:59.000Z',

  /** Die ersten 12 Wochen jeder Aktions-Mitgliedschaft. */
  vorteilsWochen: 12,
  vorteilsPreis: '5 €',

  aufnahmegebuehr: '39 €',

  ernaehrung: {
    dauer: '12 Monate',
    wert: '119,99 €',
  },
} as const

/** Die beiden Laufzeiten. Rechnung offen bis zur Endsumme. */
export const laufzeiten = [
  {
    id: 'oktober-52',
    wochen: 52,
    name: '52 Wochen',
    titel: 'Loslegen & wohlfühlen',
    folgebeitrag: '12 €',
    leistungen: [
      '52 Wochen Mitgliedschaft',
      'Persönliche Trainingsbetreuung',
      'Kraft- und Cardiotraining',
      'Familiäre Studioatmosphäre',
    ],
    extra: null,
    rechnung: [
      { was: 'Woche 1–12', rechnung: '12 × 5 €', summe: '60 €' },
      { was: 'Woche 13–52', rechnung: '40 × 12 €', summe: '480 €' },
    ],
    gesamt: '540 €',
    knopf: 'Mit 52 Wochen anfragen',
    empfohlen: false,
  },
  {
    id: 'oktober-104',
    wochen: 104,
    name: '104 Wochen',
    titel: 'Trainieren & dranbleiben',
    folgebeitrag: '9 €',
    leistungen: [
      'Alles aus „Loslegen & wohlfühlen“',
      '104 Wochen Mitgliedschaft',
      'Der günstigste Wochenbeitrag ab Woche 13',
    ],
    extra: {
      titel: '12 Monate Ernährungspläne gratis',
      wert: 'Wert 119,99 €',
    },
    rechnung: [
      { was: 'Woche 1–12', rechnung: '12 × 5 €', summe: '60 €' },
      { was: 'Woche 13–104', rechnung: '92 × 9 €', summe: '828 €' },
    ],
    gesamt: '888 €',
    knopf: 'Mit 104 Wochen anfragen',
    empfohlen: true,
  },
] as const

export type CtaId = 'oktober-allgemein' | 'oktober-52' | 'oktober-104'

// ─── Kontakt ──────────────────────────────────────────────────────────────────

export const kontakt = {
  name: 'Fit-Inn Trier',
  telefon: { anzeige: '0651 493 688 19', link: '+4965149368819' },
  email: 'info@fit-inn-trier.de',
  strasse: 'Auf Hirtenberg 8',
  plz: '54296',
  ort: 'Trier',
  stadtteil: 'Trier-Feyen',
  website: { anzeige: 'www.fit-inn-trier.de', href: 'https://www.fit-inn-trier.de' },
  route:
    'https://www.google.com/maps/search/?api=1&query=Fit-Inn+Trier%2C+Auf+Hirtenberg+8%2C+54296+Trier',
  /** PLATZHALTER – echte Öffnungszeiten vor dem Livegang eintragen. */
  oeffnungszeiten: [
    { tage: 'Montag – Freitag', zeit: '[bitte ergänzen]' },
    { tage: 'Samstag', zeit: '[bitte ergänzen]' },
    { tage: 'Sonntag', zeit: '[bitte ergänzen]' },
  ],
} as const

// ─── Seitenkopf und Hero ──────────────────────────────────────────────────────

export const hero = {
  ort: 'Fitnessstudio Trier-Feyen',
  headline: ['Dein Herbst.', 'Dein Neustart.'],
  subline:
    'Mehr Energie für die dunklen Monate: mit einem Team, das dich kennt, und einem Plan, ' +
    'der nach dem Training in deiner Küche weitergeht.',
  preisVorsatz: 'Die ersten 12 Wochen',
  preisNachsatz: 'pro Woche',
  preisBedingung: 'bei 52 oder 104 Wochen Laufzeit, danach 12 € bzw. 9 € pro Woche.',
  knopf: 'Unverbindlich anfragen',
  bild: {
    motiv: 'Mitglied im Gespräch mit einer Trainerin auf der Trainingsfläche, warmes Herbstlicht',
    format: 'Hochformat 4:5',
    alt: 'Eine Trainerin des Fit-Inn Trier bespricht mit einem Mitglied den Trainingsplan',
  },
}

/** Vertrauensleiste direkt unter der ersten Ansicht. */
export const vertrauen = [
  { wert: 'Seit 1996', text: 'Fitness in Trier' },
  { wert: 'Rund 1.200', text: 'Mitglieder, mehrere Tausend seit der Gründung' },
  { wert: 'Familienbetrieb', text: 'geführt von Familie Eichhorn' },
  { wert: 'Trier-Feyen', text: 'Auf Hirtenberg 8' },
]

// ─── Angebot ──────────────────────────────────────────────────────────────────

export const angebot = {
  titel: 'Zwei Wege in deinen Neustart.',
  text:
    'In beiden Laufzeiten kosten die ersten 12 Wochen je 5 €. Du entscheidest nur, wie lange du ' +
    'dabeibleibst – und ob die Ernährungspläne dazugehören sollen.',
  empfehlung: 'Unsere Empfehlung',
  /**
   * Pflichthinweise direkt am Preis. Die ausführliche Fassung steht im
   * Rechtshinweis am Seitenende.
   */
  hinweise: [
    `Aktionszeitraum: ${aktion.zeitraum}. Gilt für Mitgliedschaften über 52 oder 104 Wochen, die in diesem Zeitraum neu abgeschlossen werden.`,
    'Ab Woche 13 gilt der reguläre Beitrag der gewählten Laufzeit: 12 € pro Woche bei 52 Wochen, 9 € pro Woche bei 104 Wochen. Die 12 Vorteilswochen zählen zur Laufzeit.',
    `Einmalig kommt eine Aufnahmegebühr von ${aktion.aufnahmegebuehr} hinzu. Alle Preise inklusive Mehrwertsteuer.`,
    'Die Anfrage ist unverbindlich. Eine Mitgliedschaft schließt du erst nach einer persönlichen Beratung und mit vollständigen Konditionen ab.',
  ],
}

// ─── Das Fit-Inn-Gefühl ───────────────────────────────────────────────────────

export const gefuehl = {
  titel: 'Du kommst zum Training. Und gehörst dazu.',
  text:
    'Keine Nummer am Drehkreuz, kein Gerätepark ohne Ansprechpartner. Bei uns trainierst du mit ' +
    'Menschen, die wissen, was du vorhast – und die nachfragen, wenn du länger nicht da warst.',
  saeulen: [
    {
      titel: 'Persönlich',
      text:
        'Trainerinnen und Trainer, Ernährungs- und Gesundheitscoaches begleiten dich. Vom ersten ' +
        'Gespräch bis zu dem Tag, an dem das Training einfach zu deiner Woche gehört.',
    },
    {
      titel: 'Hochwertig',
      text:
        'Biostrength-Geräte von Technogym, die sich automatisch auf dich einstellen. Dazu moderne ' +
        'Cardiogeräte und ein Freihantelbereich, in dem auch Erfahrene nichts vermissen.',
    },
    {
      titel: 'Familiär',
      text:
        'Seit 1996 in Familienhand, rund 15 Menschen im Team, rund 1.200 Mitglieder. Groß genug ' +
        'für alles, was du brauchst. Klein genug, um dich zu kennen.',
    },
  ],
  bild: {
    motiv: 'Trainingsfläche mit Biostrength-Geräten, zwei Mitglieder im Austausch mit einem Trainer',
    format: 'Querformat 16:9',
    alt: 'Trainingsfläche des Fit-Inn Trier mit Biostrength-Geräten von Technogym',
  },
}

// ─── Training trifft Ernährung ────────────────────────────────────────────────

export const ernaehrung = {
  titel: 'Training trifft Ernährung.',
  text:
    'Was du im Studio aufbaust, entscheidet sich auch in deiner Küche. Damit dein Neustart nicht an ' +
    'der Studiotür endet, gehören bei 104 Wochen Laufzeit zwölf Monate Ernährungspläne dazu – ohne Aufpreis.',
  punkte: [
    'Abgestimmt auf dein Ziel: Muskelaufbau, Gewicht reduzieren oder mehr Energie im Alltag',
    'Klassisch, vegetarisch, vegan oder flexitarisch',
    'Allergien, Unverträglichkeiten und Vorlieben werden berücksichtigt',
    'Gerichte tauschen, Einkaufslisten inklusive',
    'Fragen dazu klärst du mit unseren Ernährungscoaches im Studio',
  ],
  stempel: {
    zeile1: '12 Monate',
    zeile2: 'Ernährungspläne',
    wert: 'Wert 119,99 €',
    bedingung: 'gratis bei 104 Wochen',
  },
  knopf: 'Mit 104 Wochen anfragen',
}

// ─── Ablauf ───────────────────────────────────────────────────────────────────

export const ablauf = {
  titel: 'In drei Schritten zum Start.',
  schritte: [
    {
      nr: '01',
      titel: 'Anfragen',
      text: 'Schick uns deine unverbindliche Anfrage oder ruf an. Das kostet nichts und verpflichtet dich zu nichts.',
    },
    {
      nr: '02',
      titel: 'Beraten lassen',
      text:
        'Wir vereinbaren einen Termin im Studio. Dort besprechen wir gemeinsam deine Ziele, zeigen dir alles ' +
        'und legen alle Konditionen offen auf den Tisch.',
    },
    {
      nr: '03',
      titel: 'Loslegen',
      text:
        'Erst wenn alles passt, entscheidest du dich. Dann starten wir mit Einweisung und Trainingsplan – ' +
        'bei 104 Wochen auch mit deinem Ernährungsplan.',
    },
  ],
  einsteiger: 'Neu im Studio oder lange raus? Genau dafür ist die Zielbesprechung zum Start da.',
}

// ─── Team ─────────────────────────────────────────────────────────────────────

export const team = {
  titel: 'Familie Eichhorn und Team.',
  text:
    'Das Fit-Inn ist seit 1996 ein Familienbetrieb. Mit uns arbeiten rund 15 Menschen: Trainerinnen und ' +
    'Trainer, Ernährungs- und Gesundheitscoaches und das Team am Empfang. Du trainierst nicht bei einer ' +
    'Kette, sondern bei Menschen, die jeden Tag hier sind.',
  familie: {
    motiv: 'Familie Eichhorn gemeinsam im Studio',
    format: 'Querformat 16:9',
    alt: 'Familie Eichhorn, die Inhaberfamilie des Fit-Inn Trier, im Studio',
  },
  /** PLATZHALTER – Namen, Rollen und Fotos vor dem Livegang ersetzen. */
  personen: [
    { name: '[Name]', rolle: '[Rolle, z. B. Trainer]' },
    { name: '[Name]', rolle: '[Rolle, z. B. Ernährungscoach]' },
    { name: '[Name]', rolle: '[Rolle, z. B. Gesundheitscoach]' },
  ],
}

// ─── Mitgliederstimmen ────────────────────────────────────────────────────────

/**
 * PLATZHALTER – hier kommen ausschließlich echte, freigegebene Stimmen hin.
 * Solange `platzhalter: true` gesetzt ist, zeigt die Seite einen deutlich
 * gekennzeichneten Leerplatz statt eines Zitats.
 */
export const stimmen = {
  titel: 'Das sagen unsere Mitglieder.',
  eintraege: [
    { platzhalter: true, zitat: '', name: '[Vorname, Initial]', seit: '[Mitglied seit …]' },
    { platzhalter: true, zitat: '', name: '[Vorname, Initial]', seit: '[Mitglied seit …]' },
    { platzhalter: true, zitat: '', name: '[Vorname, Initial]', seit: '[Mitglied seit …]' },
  ],
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

/**
 * Häufige Fragen. Dieselben Texte speisen das FAQPage-Schema – sichtbare
 * Antwort und strukturierte Daten dürfen nicht voneinander abweichen.
 */
export const fragen = [
  {
    frage: 'Was beinhaltet das Oktober-Angebot?',
    antwort:
      'Wenn du im Oktober 2026 eine Mitgliedschaft über 52 oder 104 Wochen abschließt, kosten die ersten ' +
      '12 Wochen je 5 €. Enthalten sind persönliche Trainingsbetreuung sowie Kraft- und Cardiotraining. ' +
      'Bei 104 Wochen bekommst du zusätzlich 12 Monate Ernährungspläne gratis (Wert 119,99 €).',
  },
  {
    frage: 'Was zahle ich nach den ersten 12 Wochen?',
    antwort:
      'Ab Woche 13 gilt der reguläre Beitrag deiner Laufzeit: 12 € pro Woche bei 52 Wochen, 9 € pro Woche ' +
      'bei 104 Wochen. Über die gesamte Laufzeit sind das 540 € bzw. 888 €. Einmalig kommt eine ' +
      'Aufnahmegebühr von 39 € hinzu. Die 12 Vorteilswochen zählen zur Laufzeit und verlängern sie nicht.',
  },
  {
    frage: 'Kann ich auch als Anfänger starten?',
    antwort:
      'Ja. Viele fangen bei uns ohne Vorerfahrung an oder nach einer langen Pause. Zum Start besprechen wir ' +
      'gemeinsam deine Ziele, weisen dich an den Geräten ein und bauen einen Plan, der zu dir passt.',
  },
  {
    frage: 'Schließe ich über die Anfrage schon eine Mitgliedschaft ab?',
    antwort:
      'Nein. Die Anfrage ist unverbindlich und kostenlos. Eine Mitgliedschaft entsteht erst nach einem ' +
      'persönlichen Beratungsgespräch, in dem du alle Konditionen vollständig erhältst – und nur, wenn du ' +
      'dich dafür entscheidest.',
  },
  {
    frage: 'Wo finde ich euch?',
    antwort:
      'Im Fit-Inn Trier, Auf Hirtenberg 8, 54296 Trier – im Stadtteil Feyen. Du erreichst uns telefonisch ' +
      'unter 0651 493 688 19 oder per E-Mail an info@fit-inn-trier.de.',
  },
  {
    frage: 'Was steckt in den Ernährungsplänen?',
    antwort:
      'Individuelle Pläne, abgestimmt auf dein Ziel und deine Ernährungsweise – klassisch, vegetarisch, ' +
      'vegan oder flexitarisch. Allergien und Unverträglichkeiten werden berücksichtigt, Gerichte lassen ' +
      'sich tauschen, Einkaufslisten sind dabei. Bei 104 Wochen Laufzeit bekommst du sie 12 Monate lang gratis.',
  },
  {
    frage: 'Wie lange gilt das Angebot?',
    antwort:
      'Für Mitgliedschaften, die vom 1. bis 31. Oktober 2026 neu abgeschlossen werden. Anfragen kannst du ' +
      'schon jetzt.',
  },
  {
    frage: 'Was passiert nach der Laufzeit?',
    antwort:
      'Danach läuft die Mitgliedschaft unbefristet weiter und ist jederzeit mit einer Frist von einem Monat ' +
      'kündbar. Zum Ende der ersten Laufzeit kannst du mit einer Frist von 4 Wochen kündigen.',
  },
]

// ─── Anfrage (Ziel aller Schaltflächen) ───────────────────────────────────────

export const anfrage = {
  titel: 'Dein Neustart beginnt mit einem Gespräch.',
  text:
    'Schick uns deine Anfrage – wir melden uns bei dir und vereinbaren einen Beratungstermin im Studio. ' +
    'Lieber direkt sprechen? Ruf uns an.',
  platzhalter: 'Hier wird im nächsten Schritt die Anfragestrecke eingebunden.',
}

// ─── Pflichtangaben ───────────────────────────────────────────────────────────

/**
 * Pflichtangaben zum Angebot, ausführlich. Grundlage ist der geprüfte
 * Rechtshinweis der 5-Euro-Aktion (src/components/aktion5/content.ts);
 * geändert sind Aktionszeitraum, Ernährungspläne und der Satz zur
 * unverbindlichen Anfrage. Vor dem Livegang erneut prüfen lassen.
 *
 * Beträge und Datum stehen bewusst ausgeschrieben im Text und werden nicht
 * eingesetzt: der Absatz wird nur als Ganzes geändert.
 */
export const rechtshinweis: { t: string; href?: string }[] = [
  {
    t:
      'Aktionszeitraum: 01.10.–31.10.2026. Das Angebot gilt für Mitgliedschaftsverträge über 52 oder 104 ' +
      'Wochen, die in diesem Zeitraum neu abgeschlossen werden. Die ersten 12 Wochen der Mitgliedschaft ' +
      'kosten je 5 €. Danach beträgt der Beitrag 12 € pro Woche bei einer Laufzeit von 52 Wochen bzw. 9 € ' +
      'pro Woche bei einer Laufzeit von 104 Wochen. Die 12 Vorteilswochen sind Teil der vereinbarten ' +
      'Laufzeit und verlängern diese nicht. Daraus ergibt sich ein Gesamtbetrag von 540 € über 52 Wochen ' +
      'bzw. 888 € über 104 Wochen. Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer. ' +
      'Hinzu kommt eine einmalige Aufnahmegebühr von 39 €. Bei einer Laufzeit von 104 Wochen sind ' +
      '12 Monate Ernährungspläne im Wert von 119,99 € ohne Aufpreis enthalten. Der Einzug erfolgt in ' +
      '14-tägigen Intervallen per SEPA-Lastschrift. Nach Ablauf der vereinbarten Laufzeit verlängert sich ' +
      'die Mitgliedschaft auf unbestimmte Zeit und kann jederzeit mit einer Frist von einem Monat ' +
      'gekündigt werden. Zum Ende der Erstlaufzeit ist eine Kündigung mit einer Frist von 4 Wochen ' +
      'möglich. Die Anfrage über diese Seite ist unverbindlich und kostenlos; eine Mitgliedschaft kommt ' +
      'erst nach einer persönlichen Beratung und mit Vorlage der vollständigen Vertragsbedingungen ' +
      'zustande. Das Angebot gilt nur für Neumitglieder, ist nicht mit anderen Aktionen oder Rabatten ' +
      'kombinierbar und nicht auf bestehende Verträge übertragbar. Mindestalter 18 Jahre. Es gelten unsere ',
  },
  { t: 'Allgemeinen Geschäftsbedingungen', href: 'https://fit-inn-trier.de/agbs-fit-inn-trier' },
  { t: ' und unsere ' },
  { t: 'Hausordnung', href: 'https://fit-inn-trier.de/hausordnung' },
  { t: '.' },
]

// ─── Metadaten ────────────────────────────────────────────────────────────────

export const meta = {
  pfad: '/oktober',
  titel: 'Fitnessstudio Trier: Herbst-Neustart ab 5 € pro Woche | Fit-Inn',
  beschreibung:
    'Oktober-Special im Fit-Inn Trier-Feyen: die ersten 12 Wochen für 5 € pro Woche, persönliche ' +
    'Betreuung und bei 104 Wochen 12 Monate Ernährungspläne gratis.',
}
