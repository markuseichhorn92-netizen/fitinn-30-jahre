import { aktivierungsgebuehr, studio } from '@/components/fitinn/studio'

// Alle Texte der Startseite an einer Stelle. Nur belegte Aussagen: Quellen
// sind PRODUCT.md, die Preisliste auf fit-inn-trier.de und die Angaben der
// Inhaber. Kein Kursangebot, kein Wellness, kein Rehasport, keine
// Physiotherapie – nichts davon gehört in Texte über Fit-Inn.

export const nav = [
  { href: '#betreuung', text: 'Betreuung' },
  { href: '#mitgliedschaft', text: 'Mitgliedschaft' },
  { href: '#start', text: 'Dein Start' },
  { href: '#studio', text: 'Studio' },
]

export const PROBETRAINING = '#probetraining'

export const hero = {
  ort: `Fitnessstudio ${studio.stadtteil} · seit ${studio.gegruendet}`,
  zeilen: ['Dein Training.', 'Deine Ziele.', 'Persönlich begleitet.'],
  text:
    'Bei Fit-Inn Trier treffen moderne Trainingsmöglichkeiten auf Menschen, die dich kennen und auf ' +
    'deinem Weg begleiten.',
  merkmale: [
    { titel: 'Persönliche Betreuung', text: 'Gespräch und Einweisung zum Start' },
    { titel: 'Moderne Ausstattung', text: 'Computergesteuerte Technogym-Geräte' },
    { titel: 'Familiäre Atmosphäre', text: `Seit ${studio.gegruendet} in Familienhand` },
  ],
  tafel: {
    kopf: 'Trainingsfläche',
    marke: 'Studiofoto',
    bildAlt: 'Trainingsfläche im Fit-Inn Trier mit computergesteuerten Kraftgeräten von Technogym',
    werte: [
      { wert: studio.gegruendet, text: 'gegründet' },
      { wert: 'Familie', text: 'geführt, kein Franchise' },
      { wert: 'Technogym', text: 'Premiumgeräte' },
      { wert: 'Feyen', text: 'Stadtteil von Trier' },
    ],
    streifenLabel: 'Probetraining',
    streifenText: 'kostenlos und unverbindlich',
  },
}

export const vertrauen = [
  { titel: `Seit ${studio.gegruendet}`, text: 'Fitness in Trier' },
  { titel: 'Familienbetrieb', text: 'kein Franchise' },
  { titel: `${studio.mitglieder[0].toUpperCase()}${studio.mitglieder.slice(1)} Mitglieder`, text: 'trainieren aktuell bei uns' },
  { titel: studio.stadtteil, text: `${studio.strasse}` },
]

export const staerken = {
  label: 'Was uns ausmacht',
  zeilen: ['Hier kennt man dich.', 'Und deine Ziele.'],
  text:
    'Kein Franchise und keine wechselnden Gesichter. Bei uns trainierst du mit Menschen, die wissen, was du ' +
    'vorhast – vom ersten Termin an.',
  punkte: [
    {
      titel: 'Persönliche Betreuung.',
      text: 'Jede Mitgliedschaft beginnt mit einem Gespräch und einer Einweisung an jedem Gerät, das du benutzt.',
    },
    {
      titel: 'Training, das zu dir passt.',
      text: 'Ob Wiedereinstieg nach Jahren oder das erste Mal: Wir beginnen da, wo du stehst – ohne Wettbewerb, ohne Druck.',
    },
    {
      titel: 'Hochwertige Ausstattung.',
      text: 'Computergesteuerte Geräte von Technogym erkennen dich, stellen Sitz, Hebel und Gewicht ein und schreiben jede Einheit mit.',
    },
    {
      titel: 'Familiärer Umgang.',
      text: `Seit ${studio.gegruendet} in Familienhand. Dieselben Menschen, die dich beim Namen kennen – auch im dritten Jahr.`,
    },
  ],
  fussnote: 'Probetraining kostenlos und unverbindlich – du entscheidest danach in Ruhe.',
}

export const mitgliedschaft = {
  label: 'Mitgliedschaft',
  zeilen: ['Deine Mitgliedschaft.', 'Klar gerechnet.'],
  text:
    'Drei Laufzeiten, ein Leistungsumfang. Du zahlst pro Woche, abgebucht wird alle 14 Tage. Dazu kommt ' +
    `einmalig eine Aktivierungsgebühr von ${aktivierungsgebuehr} – weitere Pauschalen gibt es nicht.`,
  /** Beschreibung je Laufzeit (Reihenfolge wie in studio.tarife). */
  beschreibung: {
    '52': 'Ein Jahr Zeit, um das Training zur Gewohnheit zu machen.',
    '104': 'Zwei Jahre Laufzeit zum niedrigsten Wochenbeitrag.',
    '4': 'Mit vier Wochen Laufzeit – für alle, die sich nicht lange binden wollen.',
  } as Record<string, string>,
  marke: 'Günstigster Wochenbeitrag',
  inklusiveTitel: 'In jeder Mitgliedschaft enthalten',
  kleingedruckt:
    `Alle Preise inkl. MwSt. Einmalige Aktivierungsgebühr ${aktivierungsgebuehr}. Abbuchung alle 14 Tage per ` +
    'SEPA-Lastschrift. Ermäßigung für Schüler, Azubis und Studierende – sprich uns an. Mitgliedschaft ab 18 ' +
    'Jahren. Alle Vertragsbedingungen bekommst du vor dem Abschluss; es gelten unsere ',
}

export const start = {
  label: 'Dein Start',
  zeilen: ['Dein erster Schritt.', 'Wir begleiten', 'die nächsten.'],
  text:
    'Du musst nichts vorbereiten und dich zu nichts verpflichten. Such dir einen freien Termin aus – den Rest ' +
    'machen wir gemeinsam.',
  schritte: [
    { titel: 'Probetraining anfragen.', text: 'Wähl online einen freien Termin oder ruf uns an.' },
    { titel: 'Studio und Team kennenlernen.', text: 'Du schaust dir alles in Ruhe an und stellst deine Fragen.' },
    { titel: 'Ziele gemeinsam besprechen.', text: 'Wir sprechen darüber, was du erreichen willst und was dein Alltag zulässt.' },
    { titel: 'Mit deinem Training starten.', text: 'Mit Einweisung an jedem Gerät und einem Plan, der zu dir passt.' },
  ],
}

export const buchung = {
  label: 'Probetraining',
  zeilen: ['Such dir einen', 'freien Termin aus.'],
  text:
    'Das Probetraining ist kostenlos und unverbindlich. Wähle Tag und Uhrzeit, dann brauchen wir noch ein paar ' +
    'Angaben – der Termin landet direkt in unserem Kalender.',
}

export const vorOrt = {
  label: 'Vor Ort',
  zeilen: ['In Trier-Feyen.', 'Für dein gutes Gefühl.'],
  text:
    `Das Fit-Inn ist seit ${studio.gegruendet} ein Familienbetrieb. Rund 15 Menschen arbeiten hier, rund 1.200 ` +
    'Mitglieder trainieren bei uns. Groß genug für alles, was du brauchst – und klein genug, um dich zu kennen.',
  bildAlt: 'Helle Trainingsfläche im Fit-Inn Trier mit Holzdecke und Technogym-Geräten',
  kasten: {
    zahl: studio.gegruendet,
    text: 'gegründet und seitdem in Familienhand. Kein Franchise, keine Kette – ein Studio aus Trier.',
    quelle: 'Stand: September 2026',
  },
}

/** Belegte Antworten aus den bisherigen Seiten, der Preisliste und den AGB. */
export const fragen = [
  {
    frage: 'Was kostet das Probetraining?',
    antwort: 'Nichts. Das Probetraining ist kostenlos und unverbindlich.',
  },
  {
    frage: 'Muss ich mich beim Probetraining entscheiden?',
    antwort: 'Nein. Du siehst dir alles an, stellst deine Fragen und entscheidest danach in Ruhe.',
  },
  {
    frage: 'Kann ich ohne Vorerfahrung anfangen?',
    antwort:
      'Ja. Ob Wiedereinstieg nach Jahren oder das erste Mal überhaupt: Wir beginnen da, wo du stehst – mit ' +
      'Einweisung an jedem Gerät und ohne Wettbewerb.',
  },
  {
    frage: 'Werde ich beim Training betreut?',
    antwort:
      'Ja. Jede Mitgliedschaft beginnt mit einem Gespräch und einer Einweisung an jedem Gerät, das du benutzen ' +
      'wirst. Dein Trainingsplan liegt danach in der Technogym-App.',
  },
  {
    frage: 'Welche Mitgliedschaften gibt es?',
    antwort:
      'Drei Laufzeiten mit demselben Leistungsumfang: 104 Wochen für 9 € pro Woche, 52 Wochen für 12 € pro Woche ' +
      `und 4 Wochen für 15 € pro Woche. Einmalig kommt eine Aktivierungsgebühr von ${aktivierungsgebuehr} hinzu, ` +
      'abgebucht wird alle 14 Tage per SEPA-Lastschrift.',
  },
  {
    frage: 'Welche Geräte habt ihr?',
    antwort:
      'Computergesteuerte Premiumgeräte von Technogym, die dich erkennen und sich auf dich einstellen, dazu ' +
      'Cardiogeräte und einen Freihantelbereich.',
  },
  {
    frage: 'Ab welchem Alter kann ich Mitglied werden?',
    antwort: 'Mitgliedschaft und Training sind bei uns ab 18 Jahren möglich.',
  },
  {
    frage: 'Wo finde ich euch?',
    antwort:
      `Im Fit-Inn Trier, ${studio.strasse}, ${studio.plz} ${studio.ort} – im Stadtteil Feyen. Telefonisch ` +
      `erreichst du uns unter ${studio.telefon.anzeige}, per E-Mail an ${studio.email}.`,
  },
]

export const abschluss = {
  label: 'Kennenlernen',
  zeilen: ['Dein nächstes Kapitel', 'beginnt mit dir.'],
  text: 'Komm vorbei, lern uns kennen und schau dir alles in Ruhe an. Das Probetraining ist kostenlos und unverbindlich.',
}

export const meta = {
  titel: 'Fitnessstudio Trier-Feyen: persönlich betreut | Fit-Inn Trier',
  beschreibung:
    'Familiengeführtes Fitnessstudio in Trier-Feyen seit 1996: persönliche Betreuung, computergesteuerte ' +
    'Technogym-Geräte, klare Preise. Probetraining kostenlos und unverbindlich.',
}
