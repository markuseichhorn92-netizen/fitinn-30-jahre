import localFont from 'next/font/local'
import './oktober.css'

import { Ablauf } from './Ablauf'
import { Anfrage, Pflichtangaben } from './Anfrage'
import { Angebot } from './Angebot'
import { Ernaehrung } from './Ernaehrung'
import { Erscheinen } from './Erscheinen'
import { Fragen } from './Fragen'
import { Fuss } from './Fuss'
import { Gefuehl } from './Gefuehl'
import { Hero, Vertrauen } from './Hero'
import { Kopf } from './Kopf'
import { Leiste } from './Leiste'
import { Team, Stimmen } from './Team'

// Beide Schriften liegen im Projekt (src/fonts) – keine Anfrage an Google,
// weder beim Bauen noch im Browser.
export const sans = localFont({
  src: '../../fonts/Figtree-Variable-latin.woff2',
  variable: '--font-okt-sans',
  weight: '300 900',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})

export const serif = localFont({
  src: '../../fonts/SourceSerif4-Variable-latin.woff2',
  variable: '--font-okt-serif',
  weight: '200 900',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
})

// Oktober-Special 2026 „Dein Herbst. Dein Neustart.“
//
// Reihenfolge nach der Wettbewerbsanalyse: Das Angebot steht direkt hinter der
// Vertrauensleiste, weil Preis-Suchende sonst abspringen. Danach die Gründe
// (Gefühl, Ernährung), der Ablauf, die Menschen, die Fragen und das Ziel.
export function OktoberSeite() {
  return (
    <div className={`okt ${sans.variable} ${serif.variable}`}>
      <a href="#inhalt" className="sprung">Zum Inhalt springen</a>
      <Erscheinen />
      <Kopf />
      <main id="inhalt">
        <Hero />
        <Vertrauen />
        <Angebot />
        <Gefuehl />
        <Ernaehrung />
        <Ablauf />
        <Team />
        <Stimmen />
        <Fragen />
        <Anfrage />
        <Pflichtangaben />
      </main>
      <Fuss />
      <Leiste />
    </div>
  )
}
