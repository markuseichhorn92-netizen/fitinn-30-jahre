import { aktion } from '@/components/aktion5/content'

// Alle Zahlen, Preise und Zitate kommen aus aktion5/content.ts — diese Seite
// ist eine gestalterische Testfläche, keine zweite Quelle der Wahrheit.
export { aktion }

/**
 * Die sechs Verweise der ersten Tafel. `x`/`y` sind Ankerpunkte im
 * Koordinatensystem der Zeichnung (viewBox 0 0 920 660), `mx`/`my` die Lage
 * der Ziffernmarke am Rand. Die Verweislinie läuft vom Anker zur Marke.
 */
export type Ruf = {
  nr: string
  titel: string
  text: string
  x: number
  y: number
  mx: number
  my: number
}

export const rufe: Ruf[] = [
  {
    nr: '01',
    titel: 'Sie erkennt dich',
    text: 'Du meldest dich am Gerät an. Es weiß, wer du bist und was beim letzten Mal war.',
    x: 268, y: 250, mx: 92, my: 150,
  },
  {
    nr: '02',
    titel: 'Sie stellt sich auf dich ein',
    text: 'Sitzhöhe, Rückenlehne, Hebelweg – das Gerät fährt auf deine Werte. Kein Suchen, kein Schätzen.',
    x: 406, y: 524, mx: 92, my: 566,
  },
  {
    nr: '03',
    titel: 'Sie führt die Bewegung',
    text: 'Die Bahn ist geführt. Du kannst nicht in eine Haltung geraten, die dir schadet.',
    x: 512, y: 340, mx: 838, my: 330,
  },
  {
    nr: '04',
    titel: 'Sie wählt das Gewicht',
    text: 'Kein Steckbolzen, kein Raten. Das Gerät legt auf, was für dich vorgesehen ist.',
    x: 664, y: 404, mx: 838, my: 566,
  },
  {
    nr: '05',
    titel: 'Du machst nur die Übung',
    text: 'Der Bildschirm zeigt Tempo und Wiederholung live. Auch beim ersten Mal machst du es richtig.',
    x: 316, y: 258, mx: 92, my: 330,
  },
  {
    nr: '06',
    titel: 'Sie schreibt mit',
    text: 'Jede Einheit landet automatisch in deinem Plan. Beim nächsten Mal weiß das Gerät, wo du aufgehört hast.',
    x: 618, y: 142, mx: 838, my: 150,
  },
]

/** Was sich im Alltag ändert. Keine Zahlen — dafür gibt es keinen Beleg. */
export const alltag = [
  {
    titel: 'Einkäufe wieder selbst tragen',
    text: 'Kraft in Beinen und Rumpf ist das, was den Korb die Treppe hochbringt.',
  },
  {
    titel: 'Treppen ohne Pause nehmen',
    text: 'Ausdauer merkst du nicht im Studio, sondern im dritten Stock.',
  },
  {
    titel: 'Sicher stehen, sicher gehen',
    text: 'Balance ist trainierbar. Sie entscheidet darüber, wie lange du ohne Hilfe zurechtkommst.',
  },
]

export const haus = [
  { wert: '1996', label: 'in Familienhand, kein Franchise' },
  { wert: '7.000+', label: 'Mitglieder' },
  { wert: '250+', label: 'positive Bewertungen' },
  { wert: 'TechnoGym', label: 'ausschließlich, computergesteuert' },
]

/** Wörtlich aus den Google-Bewertungen. Nicht umformulieren. */
export const stimmen = [
  {
    zitat: 'Ich bin von der Ausstattung, den Geräten und den Mitarbeitern maximal überzeugt.',
    autor: 'Gisela T.',
  },
  {
    zitat: 'Super gepflegte Geräte, nette Leute, angenehme Atmosphäre, Duschen + Getränke top.',
    autor: 'Jana Thielen',
  },
  {
    zitat: 'Angenehmes Training, nette Menschen. Die neuen Geräte von Technogym sind super.',
    autor: 'Thomas Müller',
  },
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
