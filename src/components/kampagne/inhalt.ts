import { aktion } from '@/components/aktion5/content'

// Inhalte, die beide Entwürfe teilen. Zahlen, Preise und der Rechtshinweis
// kommen weiterhin aus aktion5/content.ts – es gibt genau eine Quelle dafür.
export { aktion }

export const navigation = [
  { href: '#geraete', text: 'Das Studio' },
  { href: '#angebot', text: 'Das Angebot' },
  { href: '#rundgang', text: 'Rundgang' },
  { href: '#fragen', text: 'Fragen' },
]

export const hero = {
  ort: 'Trier-Feyen · seit 1996',
  zeile1: 'Zwölf Wochen.',
  zeile2: 'Je fünf Euro.',
  subline:
    'Computergesteuerte Geräte von TechnoGym, die sich auf dich einstellen. Und Trainer, die deinen Namen kennen.',
}

/** Die drei Kennzahlen unter der ersten Ansicht. Alle drei sind belegt. */
export const kennzahlen = [
  { wert: '5 €', label: 'pro Woche, die ersten zwölf' },
  { wert: aktion.wochenbeitrag.einJahr, label: 'pro Woche danach, 52 Wochen' },
  { wert: aktion.gueltigBis, label: 'letzter Tag der Aktion' },
]

/** Der USP, ausführlich: was „computergesteuert" konkret bedeutet. */
export const geraete = {
  titel: 'Das Gerät nimmt dir ab, was dich abschreckt.',
  text:
    'Wir setzen ausschließlich auf TechnoGym. Der Unterschied zeigt sich nicht am Preisschild, ' +
    'sondern in den ersten zehn Minuten – wenn niemand sonst zusieht.',
  punkte: [
    {
      titel: 'Es erkennt dich',
      text: 'Du meldest dich am Gerät an. Es weiß, wer du bist und was beim letzten Mal war.',
    },
    {
      titel: 'Es stellt sich ein',
      text: 'Sitzhöhe, Lehne, Hebelweg, Gewicht – das Gerät fährt auf deine Werte. Kein Suchen, kein Schätzen.',
    },
    {
      titel: 'Es führt die Bewegung',
      text: 'Die Bahn ist geführt und der Bildschirm zeigt Tempo und Wiederholung live. Auch beim ersten Mal machst du es richtig.',
    },
    {
      titel: 'Es schreibt mit',
      text: 'Jede Einheit landet automatisch in deinem Plan. Beim nächsten Mal weiß das Gerät, wo du aufgehört hast.',
    },
  ],
}

/** Die Rechnung, offen bis zur Endsumme. Zahlen geprüft gegen den Rechtshinweis. */
export const laufzeiten = [
  {
    name: '52 Wochen',
    zeilen: [
      { was: '12 Vorteilswochen', rechnung: '12 × 5 €', summe: '60 €' },
      { was: '40 weitere Wochen', rechnung: `40 × ${aktion.wochenbeitrag.einJahr}`, summe: '480 €' },
    ],
    gesamt: '540 €',
    proWoche: aktion.wochenbeitrag.einJahr,
  },
  {
    name: '104 Wochen',
    zeilen: [
      { was: '12 Vorteilswochen', rechnung: '12 × 5 €', summe: '60 €' },
      { was: '92 weitere Wochen', rechnung: `92 × ${aktion.wochenbeitrag.zweiJahre}`, summe: '828 €' },
    ],
    gesamt: '888 €',
    proWoche: aktion.wochenbeitrag.zweiJahre,
    hinweis: 'günstigste Woche',
  },
]

export const angebotFussnoten = [
  'Einmalige Aufnahmegebühr 39 €. Einzug in 14-tägigen Intervallen per SEPA-Lastschrift.',
  'Die zwölf Vorteilswochen zählen zur Laufzeit und verlängern sie nicht.',
  `Gilt für Neuabschlüsse bis ${aktion.gueltigBis}, nur für Neumitglieder, ab 18 Jahren.`,
]

export const alltag = {
  titel: 'Woran du es merkst.',
  text: 'Nicht im Spiegel und nicht auf der Waage. Sondern an den Stellen, an denen der Tag sonst anstrengend war.',
  punkte: [
    { titel: 'Einkäufe wieder selbst tragen', text: 'Kraft in Beinen und Rumpf ist das, was den Korb die Treppe hochbringt.' },
    { titel: 'Treppen ohne Pause nehmen', text: 'Ausdauer merkst du nicht im Studio, sondern im dritten Stock.' },
    { titel: 'Sicher stehen, sicher gehen', text: 'Balance ist trainierbar. Sie entscheidet darüber, wie lange du ohne Hilfe zurechtkommst.' },
  ],
}

export const haus = {
  titel: 'Seit 1996 in einer Hand.',
  text:
    'Kein Franchise, keine wechselnden Gesichter. Dieselben Leute, die dich beim Namen kennen – und ' +
    'die auch noch da sind, wenn du im dritten Jahr wiederkommst.',
  zahlen: [
    { wert: '1996', label: 'in Familienhand' },
    { wert: '7.000+', label: 'Mitglieder' },
    { wert: '250+', label: 'positive Bewertungen' },
    { wert: 'TechnoGym', label: 'ausschließlich, computergesteuert' },
  ],
  leistungen: [
    'Kraft, Cardio und Freihanteln in getrennten Bereichen',
    'Gesundheits-Check-up mit Körperanalyse',
    'Digitale Trainingspläne in der App',
    'Stoffwechsel-Coaching',
    'Mineralgetränke inklusive, Duschen, WLAN',
    'Für Sauberkeit werden wir am häufigsten gelobt',
  ],
}

/** Wörtlich aus den Google-Bewertungen. Nicht umformulieren. */
export const stimmen = [
  { zitat: 'Ich bin von der Ausstattung, den Geräten und den Mitarbeitern maximal überzeugt.', autor: 'Gisela T.' },
  { zitat: 'Super gepflegte Geräte, nette Leute, angenehme Atmosphäre, Duschen + Getränke top.', autor: 'Jana Thielen' },
  { zitat: 'Angenehmes Training, nette Menschen. Die neuen Geräte von Technogym sind super.', autor: 'Thomas Müller' },
]

export const fragen = [
  {
    frage: 'Bin ich zu alt dafür?',
    antwort:
      'Nein. Viele unserer Mitglieder fangen nach Jahren ohne Sport wieder an, manche zum ersten Mal überhaupt. ' +
      'Wir beginnen da, wo du stehst – ohne Wettbewerb, ohne Publikum.',
    offen: true,
  },
  {
    frage: 'Was kostet es nach den zwölf Wochen?',
    antwort:
      `${aktion.wochenbeitrag.einJahr} pro Woche bei 52 Wochen Laufzeit, ${aktion.wochenbeitrag.zweiJahre} pro Woche ` +
      'bei 104 Wochen. Die zwölf Vorteilswochen zählen zur Laufzeit und verlängern sie nicht.',
  },
  {
    frage: 'Was ist Coach Premium?',
    antwort:
      'Trainingspläne, Anleitungen und Auswertungen in der App – also Inhalte auf deinem Telefon. ' +
      'Persönliches Training mit einem Trainer vor Ort ist damit nicht gemeint.',
  },
  {
    frage: 'Muss ich mich beim Probetraining entscheiden?',
    antwort: 'Nein. Das Probetraining ist kostenlos und unverbindlich. Du siehst dir alles an und gehst wieder.',
  },
  {
    frage: 'Werde ich eingewiesen?',
    antwort:
      'Ja. Jede Mitgliedschaft beginnt mit einem Gespräch und einer Einweisung an jedem Gerät, das du benutzen wirst.',
  },
]

export const termin = {
  titel: 'Einmal vorbeikommen.',
  text: 'Kostenlos und unverbindlich. Du siehst dir alles an, stellst deine Fragen und gehst wieder – oder bleibst.',
  schritte: [
    { nr: '01', label: 'Termin' },
    { nr: '02', label: 'Person' },
    { nr: '03', label: 'Anschrift' },
  ],
}
