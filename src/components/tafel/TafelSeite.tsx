import { Archivo, Martian_Mono } from 'next/font/google'
import './tafel.css'

import { Anmeldung } from './Anmeldung'
import { Auf } from './Auf'
import { Fussleiste } from './Fussleiste'
import { Kopfleiste } from './Kopfleiste'
import { Maschine } from './Maschine'
import { Rundgang } from './Rundgang'
import { Alltag, Angebot, Fragen, Haus, Hinweis, Stimmen } from './Tafeln'

// Archivo hat eine Breitenachse – dieselbe Familie liefert die gedrängte
// Beschriftung und die weite Überschrift, so wie eine Tafelschrift es tat.
const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
})

// Für Ziffern, Marken und Maße: die Schlüsselschrift der Tafel.
const martian = Martian_Mono({
  variable: '--font-martian',
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap',
})

/*
 * Der Richtungsvertrag steht als HTML-Kommentar im ausgelieferten Markup
 * (siehe KONTRAKT weiter unten) und nicht nur hier, damit er den Produktions-
 * build überlebt und nachprüfbar bleibt. Er sitzt am Anfang dieser Seite und
 * nicht im Root-Layout, weil er nur diese Route regiert – die drei
 * Aktionsseiten folgen einer anderen Welt.
 */
const KONTRAKT = `<!--
IMPECCABLE DIRECTION CONTRACT · /tafel

THESIS: Diese Seite ist eine Schautafel, keine Landingpage. Sie beweist das
Gerät, bevor sie den Preis verspricht, und verweigert die Anordnung, die jedes
Fitnessstudio baut: fast schwarzer Grund, Muskelfoto, Countdown, Kachelraster.

OWN-WORLD: Preussischblauer Grund (#142f49); darauf Tafeln aus Knochenpapier
(#ede5d6), oben auf eine Russleiste (#17191c) montiert, mit eingerueckter
Haarlinie als Satzspiegel. Zwei Druckfarben mit fester Zustaendigkeit:
Zinnober (#c4402b) verweist auf dem Papier, Chromgelb (#dfa02a) auf dem Blau –
nie umgekehrt, weil Zinnober auf Blau nur 2,4:1 traegt. Archivo mit
Breitenachse; Martian Mono fuer Ziffern, Marken und Masse. Keine Karten, keine
Schlagschatten ohne Versatz, keine Label ueber Ueberschriften.

STORY: Der Besucher versteht in einem Blick, dass das Geraet die Arbeit
uebernimmt, die er sich nicht zutraut. Dann sieht er die Rechnung offen bis zur
Endsumme. Dann bucht er einen kostenlosen Termin.

FIRST VIEWPORT: Tafel I. Links die Schlagzeile "Zwoelf Wochen. Je fuenf Euro."
mit zwei Handlungen, rechts das gestempelte Preisfeld mit den Folgebeitraegen.
Darunter, ueber die volle Breite, der Aufriss eines computergesteuerten
Kraftgeraets mit sechs nummerierten Verweisen; rechts die Legende. Wer eine
Legendenzeile anfasst, sieht ihre Linie und ihren Ankerpunkt aufleuchten,
alles andere tritt zurueck. Das ist die einzige gestaltete Bewegung.

FORM: Die Lehrtafel (Deutsches Hygiene-Museum, Fritz Kahn). Kandidat 3 der nach
Resonanz geordneten eigenen Liste. Seed a2bc56aa, direction/persuade.

FINISH: unreviewed and undocumented is unfinished; this build ends with the
finish review, the verdict, and DESIGN.md
-->`

// Testfläche: dieselben Fakten wie die Startseite, eine andere Welt.
export function TafelSeite() {
  return (
    <main className={`tf ${archivo.variable} ${martian.variable}`}>
      <div style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: KONTRAKT }} />
      <Auf />
      <Kopfleiste />
      <div style={{ display: 'grid', gap: 'clamp(1.2rem,3vw,2.4rem)', padding: 'clamp(1.2rem,3vw,2.4rem) 0 0' }}>
        <Maschine />
        <Angebot />
        <Alltag />
        <Haus />
        <Rundgang />
        <Stimmen />
        <Fragen />
        <Anmeldung />
      </div>
      <Hinweis />
      <Fussleiste />
    </main>
  )
}
