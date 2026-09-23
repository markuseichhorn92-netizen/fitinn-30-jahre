import { aktivierungsgebuehr, GEBUEHR_NAME, kuendigung, studio } from '@/components/fitinn/studio'

// Oktober-Special 2026 „Dein Herbst. Dein Neustart.“
//
// Alle Texte, Preise und Pflichtangaben der Seite /oktober an einer Stelle.
// Die Sektionen setzen nur zusammen, was hier steht – wer eine Zahl ändert,
// ändert sie hier und sonst nirgends. Einzige Ausnahme: der Rechtshinweis
// unten nennt Beträge und Datum ausgeschrieben im Fließtext (siehe dort).
//
// Nur belegte Aussagen. Was zu den Ernährungsplänen im Detail gehört, ist
// noch nicht bestätigt – deshalb nennt die Seite nur, was feststeht.

// ─── Aktion ───────────────────────────────────────────────────────────────────

export const aktion = {
  /** Aktionszeitraum: Vertragsabschlüsse im gesamten Oktober 2026. */
  zeitraum: '01.10.–31.10.2026',

  /**
   * Letzter Moment der Aktion, sekundengenau: 31.10.2026, 23:59:59 deutscher
   * Zeit. Am 25.10. endet die Sommerzeit, am 31.10. gilt also MEZ (UTC+1) –
   * deshalb 22:59:59Z und nicht 21:59:59Z wie bei einer Aktion im Sommer.
   */
  endeZeit: '2026-10-31T22:59:59.000Z',

  vorteilsWochen: 12,
  vorteilsPreis: '5\u00a0€',
} as const

/**
 * PLATZHALTER sichtbar? Solange Fotos, Namen und Mitgliederstimmen fehlen,
 * zeigt die Seite klar gekennzeichnete Leerplätze (so im Brief verlangt).
 * Vor dem Livegang ohne echtes Material auf `false` setzen: Dann entfallen
 * die Porträt-Kacheln und der Stimmen-Abschnitt, der Teamtext bleibt.
 */
export const platzhalterZeigen = true

/** Die beiden Laufzeiten. Rechnung offen bis zur Endsumme inkl. Gebühr. */
export const laufzeiten = [
  {
    id: 'oktober-52',
    wochen: 52,
    name: '52\u00a0Wochen',
    titel: 'Loslegen & wohlfühlen',
    folgebeitrag: '12\u00a0€',
    leistungen: [
      '52\u00a0Wochen Mitgliedschaft',
      'Persönliche Trainingsbetreuung',
      'Kraft- und Cardiotraining',
      'Familiäre Studioatmosphäre',
    ],
    extra: null,
    rechnung: [
      { was: 'Woche 1–12', rechnung: '12 × 5\u00a0€', summe: '60\u00a0€' },
      { was: 'Woche 13–52', rechnung: '40 × 12\u00a0€', summe: '480\u00a0€' },
    ],
    beitraege: '540\u00a0€',
    gesamt: '579\u00a0€',
    knopf: 'Mit 52\u00a0Wochen anfragen',
    empfohlen: false,
  },
  {
    id: 'oktober-104',
    wochen: 104,
    name: '104\u00a0Wochen',
    titel: 'Trainieren & dranbleiben',
    folgebeitrag: '9\u00a0€',
    leistungen: [
      '104\u00a0Wochen Mitgliedschaft',
      'Persönliche Trainingsbetreuung',
      'Kraft- und Cardiotraining',
      'Familiäre Studioatmosphäre',
      'Ab Woche 13: 9\u00a0€ pro Woche – 3\u00a0€ weniger als bei 52\u00a0Wochen',
    ],
    extra: {
      titel: '12\u00a0Monate Ernährungspläne inklusive',
      wert: 'Wert 119,99\u00a0€',
    },
    rechnung: [
      { was: 'Woche 1–12', rechnung: '12 × 5\u00a0€', summe: '60\u00a0€' },
      { was: 'Woche 13–104', rechnung: '92 × 9\u00a0€', summe: '828\u00a0€' },
    ],
    beitraege: '888\u00a0€',
    gesamt: '927\u00a0€',
    knopf: 'Mit 104\u00a0Wochen anfragen',
    empfohlen: true,
  },
] as const

export type CtaId = 'oktober-allgemein' | 'oktober-52' | 'oktober-104'

/** Stammdaten aus der gemeinsamen Quelle. */
export const kontakt = studio

// ─── Kopf und Hero ────────────────────────────────────────────────────────────

export const nav = [
  { href: '#angebot', text: 'Angebot' },
  { href: '#ernaehrung', text: 'Ernährung' },
  { href: '#ablauf', text: 'Ablauf' },
  { href: '#fragen', text: 'Fragen' },
]

export const hero = {
  ort: 'Oktober-Special · Fitnessstudio Trier-Feyen',
  zeilen: ['Dein Herbst.', 'Dein Neustart.'],
  subline:
    'Mehr Energie für die dunklen Monate – mit einem Team, das dich kennt und dich vom ersten Termin an begleitet.',
  preisVorsatz: 'Die ersten 12\u00a0Wochen',
  preisNachsatz: 'pro Woche',
  preisBedingung:
    `Bei 52 oder 104\u00a0Wochen Laufzeit. Danach 12\u00a0€ bzw. 9\u00a0€ pro Woche, einmalig ${aktivierungsgebuehr} ${GEBUEHR_NAME}. ` +
    'Für Abschlüsse vom 01. bis 31.10.2026.',
  knopf: 'Unverbindlich anfragen',
  tafel: {
    kopf: 'Oktober-Special',
    marke: 'Studiofoto',
    bildAlt: 'Trainingsfläche im Fit-Inn Trier mit computergesteuerten Kraftgeräten von Technogym',
    werte: [
      { wert: '12\u00a0Wochen', text: 'je 5\u00a0€' },
      { wert: '12\u00a0€ / 9\u00a0€', text: 'ab Woche 13' },
      { wert: '12\u00a0Monate', text: 'Ernährungspläne bei 104\u00a0Wochen' },
      { wert: '31.10.', text: 'letzter Abschlusstag' },
    ],
    streifenLabel: 'Anfrage',
    streifenText: 'unverbindlich und kostenlos',
  },
}

/** Vertrauensleiste direkt unter der ersten Ansicht. */
export const vertrauen = [
  { titel: 'Seit 1996', text: 'Fitness in Trier' },
  { titel: 'Rund 1.200 Mitglieder', text: 'mehrere Tausend seit der Gründung' },
  { titel: 'Familienbetrieb', text: 'geführt von Familie Eichhorn' },
  { titel: 'Trier-Feyen', text: 'Auf Hirtenberg 8' },
]

// ─── Angebot ──────────────────────────────────────────────────────────────────

export const angebot = {
  label: 'Das Angebot',
  zeilen: ['Zwei Wege in', 'deinen Neustart.'],
  text:
    'In beiden Laufzeiten kosten die ersten 12\u00a0Wochen je 5\u00a0€. Du entscheidest, wie lange du dabeibleibst – ' +
    'und ob die Ernährungspläne dazugehören sollen.',
  empfehlung: 'Unsere Empfehlung',
  /** Pflichthinweise direkt am Preis. Ausführlich im Rechtshinweis unten. */
  hinweise: [
    `Aktionszeitraum ${aktion.zeitraum}: gilt für Mitgliedschaften über 52 oder 104\u00a0Wochen, die in diesem Zeitraum neu abgeschlossen werden.`,
    'Nur für Neumitglieder ab 18\u00a0Jahren, nicht mit anderen Aktionen kombinierbar.',
    'Ab Woche 13 gilt der reguläre Beitrag der gewählten Laufzeit: 12\u00a0€ pro Woche bei 52\u00a0Wochen, 9\u00a0€ pro Woche bei 104\u00a0Wochen. Die 12 Vorteilswochen zählen zur Laufzeit.',
    `Einmalig kommt eine ${GEBUEHR_NAME} von ${aktivierungsgebuehr} hinzu, weitere Pauschalen gibt es nicht. Alle Preise inklusive Mehrwertsteuer.`,
    kuendigung,
    'Die Anfrage ist unverbindlich. Eine Mitgliedschaft schließt du erst nach einer persönlichen Beratung und mit vollständigen Konditionen ab.',
  ],
}

// ─── Das Fit-Inn-Gefühl ───────────────────────────────────────────────────────

export const gefuehl = {
  label: 'Das Fit-Inn-Gefühl',
  zeilen: ['Du kommst', 'zum Training.', 'Und gehörst dazu.'],
  text:
    'Keine Nummer am Drehkreuz, kein Gerätepark ohne Ansprechpartner. Bei uns trainierst du mit Menschen, die ' +
    'dich kennen und wissen, was du vorhast.',
  saeulen: [
    {
      titel: 'Persönlich.',
      text:
        'Trainerinnen und Trainer, Ernährungs- und Gesundheitscoaches begleiten dich – vom ersten Gespräch bis ' +
        'zu dem Tag, an dem das Training einfach zu deiner Woche gehört.',
    },
    {
      titel: 'Hochwertig.',
      text:
        'Biostrength-Geräte von Technogym, die sich automatisch auf dich einstellen. Dazu moderne Cardiogeräte ' +
        'und ein Freihantelbereich, in dem auch Erfahrene nichts vermissen.',
    },
    {
      titel: 'Familiär.',
      text:
        'Seit 1996 in Familienhand, rund 15 Menschen im Team, rund 1.200 Mitglieder. Groß genug für alles, was ' +
        'du brauchst. Klein genug, um dich zu kennen.',
    },
  ],
  fussnote: 'Neu im Studio oder lange raus? Zum Start besprechen wir gemeinsam deine Ziele.',
}

// ─── Training trifft Ernährung ────────────────────────────────────────────────

export const ernaehrung = {
  label: 'Training trifft Ernährung',
  zeilen: ['Training trifft', 'Ernährung.'],
  text:
    'Was du im Studio aufbaust, entscheidet sich auch in deiner Küche. Damit dein Neustart nicht an der ' +
    'Studiotür endet, gehören bei 104\u00a0Wochen Laufzeit zwölf Monate Ernährungspläne dazu – ohne Aufpreis.',
  punkte: [
    '12\u00a0Monate Ernährungspläne, abgestimmt auf dein Ziel',
    'Inklusive bei 104\u00a0Wochen Laufzeit – ohne Aufpreis',
    'Was genau drinsteckt, zeigen wir dir in der Beratung',
  ],
  kasten: {
    zahl: '12\u00a0Monate',
    text: 'Ernährungspläne inklusive – bei einer Mitgliedschaft über 104\u00a0Wochen.',
    wert: 'Wert 119,99\u00a0€',
  },
  knopf: 'Mit 104\u00a0Wochen anfragen',
}

// ─── Ablauf ───────────────────────────────────────────────────────────────────

export const ablauf = {
  label: 'Ablauf',
  zeilen: ['In drei Schritten', 'zum Start.'],
  text: 'Neu im Studio oder lange raus? Genau dafür ist die gemeinsame Zielbesprechung zum Start da.',
  schritte: [
    {
      titel: 'Anfragen.',
      text: 'Schick uns deine unverbindliche Anfrage oder ruf an. Das kostet nichts und verpflichtet dich zu nichts.',
    },
    {
      titel: 'Beraten lassen.',
      text:
        'Wir vereinbaren einen Termin im Studio. Dort besprechen wir gemeinsam deine Ziele, zeigen dir alles und ' +
        'legen alle Konditionen offen auf den Tisch.',
    },
    {
      titel: 'Loslegen.',
      text:
        'Erst wenn alles passt, entscheidest du dich. Dann starten wir mit Einweisung und Trainingsplan – bei ' +
        '104\u00a0Wochen auch mit deinem Ernährungsplan.',
    },
  ],
}

// ─── Team ─────────────────────────────────────────────────────────────────────

export const team = {
  label: 'Team',
  zeilen: ['Familie Eichhorn', 'und Team.'],
  text:
    'Das Fit-Inn ist seit 1996 ein Familienbetrieb. Mit uns arbeiten rund 15 Menschen, darunter Trainerinnen und ' +
    'Trainer, Ernährungs- und Gesundheitscoaches. Du trainierst nicht bei einer Kette, sondern bei Menschen, ' +
    'die du im Studio wiedersiehst.',
  familie: {
    motiv: 'Familie Eichhorn gemeinsam im Studio · Querformat 21:9',
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
  label: 'Mitglieder',
  zeilen: ['Das sagen unsere', 'Mitglieder.'],
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
      'Wenn du vom 1. bis 31. Oktober 2026 neu eine Mitgliedschaft über 52 oder 104\u00a0Wochen abschließt, kosten ' +
      'die ersten 12\u00a0Wochen je 5\u00a0€. Enthalten sind persönliche Trainingsbetreuung sowie Kraft- und Cardiotraining. ' +
      'Bei 104\u00a0Wochen sind zusätzlich 12\u00a0Monate Ernährungspläne inklusive (Wert 119,99\u00a0€). Ab Woche 13 gilt der ' +
      `reguläre Beitrag von 12\u00a0€ bzw. 9\u00a0€ pro Woche, einmalig kommt die ${GEBUEHR_NAME} von ${aktivierungsgebuehr} ` +
      'hinzu. Das Angebot gilt für Neumitglieder ab 18\u00a0Jahren und ist nicht mit anderen Aktionen kombinierbar.',
  },
  {
    frage: 'Was zahle ich nach den ersten 12\u00a0Wochen?',
    antwort:
      'Ab Woche 13 gilt der reguläre Beitrag deiner Laufzeit: 12\u00a0€ pro Woche bei 52\u00a0Wochen, 9\u00a0€ pro Woche bei ' +
      '104\u00a0Wochen. An Beiträgen sind das über die gesamte Laufzeit 540\u00a0€ bzw. 888\u00a0€, mit der einmaligen ' +
      `${GEBUEHR_NAME} von ${aktivierungsgebuehr} insgesamt 579\u00a0€ bzw. 927\u00a0€. Die 12 Vorteilswochen zählen zur Laufzeit.`,
  },
  {
    frage: 'Kann ich auch als Anfänger starten?',
    antwort:
      'Ja. Du kannst ohne Vorerfahrung oder nach einer langen Pause starten. Zum Start besprechen wir gemeinsam ' +
      'deine Ziele, weisen dich an den Geräten ein und bauen einen Plan, der zu dir passt.',
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
      'Bei 104\u00a0Wochen Laufzeit bekommst du 12\u00a0Monate Ernährungspläne ohne Aufpreis, abgestimmt auf dein Ziel. ' +
      'Was genau dazugehört, zeigen wir dir in der persönlichen Beratung.',
  },
  {
    frage: 'Wie lange gilt das Angebot?',
    antwort:
      'Für Mitgliedschaften, die vom 1. bis 31. Oktober 2026 neu abgeschlossen werden. Maßgeblich ist der ' +
      'Vertragsabschluss im Studio bis Samstag, 31.10.2026 – frag am besten früh an, damit wir dir noch im ' +
      'Oktober einen Beratungstermin geben können.',
  },
  {
    frage: 'Was passiert nach der Laufzeit?',
    antwort: kuendigung,
  },
]

// ─── Anfrage (Ziel aller Schaltflächen) ───────────────────────────────────────

export const anfrage = {
  label: 'Anfrage',
  zeilen: ['Dein Neustart', 'beginnt mit', 'einem Gespräch.'],
  text:
    'Schick uns deine Anfrage – wir melden uns bei dir und vereinbaren einen Beratungstermin im Studio. ' +
    'Lieber direkt sprechen? Ruf uns an.',
  platzhalter: 'Hier wird im nächsten Schritt die Anfragestrecke eingebunden.',
}

// ─── Pflichtangaben ───────────────────────────────────────────────────────────

/**
 * Pflichtangaben zum Angebot, ausführlich. Grundlage ist der geprüfte
 * Rechtshinweis der 5-Euro-Aktion (src/components/aktion5/content.ts);
 * geändert sind Aktionszeitraum, Gesamtpreis inkl. Gebühr, Ernährungspläne,
 * die Gebührenbezeichnung (wie in AGB und Preisliste „Aktivierungsgebühr“),
 * die Kündigungsfrist nach der Verlängerung (4\u00a0Wochen laut AGB § 3.2 statt
 * „einem Monat“) und der Satz zur unverbindlichen Anfrage. Vor dem Livegang
 * erneut prüfen lassen.
 *
 * Beträge und Datum stehen bewusst ausgeschrieben im Text und werden nicht
 * eingesetzt: der Absatz wird nur als Ganzes geändert.
 */
export const rechtshinweis: { t: string; href?: string }[] = [
  {
    t:
      'Aktionszeitraum: 01.10.–31.10.2026. Das Angebot gilt für Mitgliedschaftsverträge über 52 oder 104 ' +
      'Wochen, die in diesem Zeitraum neu abgeschlossen werden. Die ersten 12\u00a0Wochen der Mitgliedschaft ' +
      'kosten je 5\u00a0€. Danach beträgt der Beitrag 12\u00a0€ pro Woche bei einer Laufzeit von 52\u00a0Wochen bzw. 9\u00a0€ ' +
      'pro Woche bei einer Laufzeit von 104\u00a0Wochen. Die 12 Vorteilswochen sind Teil der vereinbarten ' +
      'Laufzeit und verlängern diese nicht. Hinzu kommt eine einmalige Aktivierungsgebühr von 39\u00a0€. Daraus ' +
      'ergibt sich ein Gesamtpreis von 579\u00a0€ über 52\u00a0Wochen (540\u00a0€ Beiträge zzgl. 39\u00a0€ Aktivierungsgebühr) bzw. ' +
      '927\u00a0€ über 104\u00a0Wochen (888\u00a0€ Beiträge zzgl. 39\u00a0€ Aktivierungsgebühr). Alle Preise verstehen sich ' +
      'inklusive der gesetzlichen Mehrwertsteuer. Bei einer Laufzeit von 104\u00a0Wochen sind 12\u00a0Monate ' +
      'Ernährungspläne im Wert von 119,99\u00a0€ ohne Aufpreis enthalten. Der Einzug erfolgt in 14-tägigen ' +
      'Intervallen per SEPA-Lastschrift. Eine Kündigung ist zum Ende der Erstlaufzeit mit einer Frist von ' +
      '4\u00a0Wochen möglich. Nach Ablauf der vereinbarten Laufzeit verlängert sich die Mitgliedschaft auf ' +
      'unbestimmte Zeit und kann dann jederzeit mit einer Frist von 4\u00a0Wochen gekündigt werden. Die ' +
      'Anfrage über diese Seite ist unverbindlich und kostenlos; eine Mitgliedschaft kommt erst nach einer ' +
      'persönlichen Beratung und mit Vorlage der vollständigen Vertragsbedingungen zustande. Das Angebot ' +
      'gilt nur für Neumitglieder, ist nicht mit anderen Aktionen oder Rabatten kombinierbar und nicht auf ' +
      'bestehende Verträge übertragbar. Mindestalter 18\u00a0Jahre. Es gelten unsere ',
  },
  { t: 'Allgemeinen Geschäftsbedingungen', href: 'https://fit-inn-trier.de/agbs-fit-inn-trier' },
  { t: ' und unsere ' },
  { t: 'Hausordnung', href: 'https://fit-inn-trier.de/hausordnung' },
  { t: '.' },
]

// ─── Metadaten ────────────────────────────────────────────────────────────────

export const meta = {
  pfad: '/oktober',
  titel: 'Fitnessstudio Trier: Oktober-Special, 12\u00a0Wochen je 5\u00a0€ | Fit-Inn',
  beschreibung:
    'Oktober-Special im Fit-Inn Trier-Feyen: die ersten 12\u00a0Wochen je 5\u00a0€, danach 12\u00a0€ bzw. 9\u00a0€ pro Woche, ' +
    'einmalig 39\u00a0€ Aktivierungsgebühr. Abschluss 01.–31.10.2026.',
}
