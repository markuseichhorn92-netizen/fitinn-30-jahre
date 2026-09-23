import '@/components/fitinn/fitinn.css'
import { Erscheinen } from '@/components/fitinn/Erscheinen'
import { Fuss } from '@/components/fitinn/Fuss'
import { Kopf } from '@/components/fitinn/Kopf'
import { schriftKlassen } from '@/components/fitinn/schriften'
import { nav } from './inhalt'
import { Leiste } from './Leiste'
import {
  Ablauf, Anfrage, Angebot, Ernaehrung, Fragen, Gefuehl, Hero, Pflichtangaben, Stimmen, Team, Vertrauen,
} from './Sektionen'

// Oktober-Special 2026 „Dein Herbst. Dein Neustart.“ im Fit-Inn-Designsystem.
//
// Reihenfolge nach der Wettbewerbsanalyse: Das Angebot steht direkt hinter der
// Vertrauensleiste, weil Preis-Suchende sonst abspringen. Danach die Gründe
// (Gefühl, Ernährung), der Ablauf, die Menschen, die Fragen und das Ziel.
export function OktoberSeite() {
  return (
    <div className={`fi fi-mit-leiste ${schriftKlassen}`}>
      <a href="#inhalt" className="fi-sprung">Zum Inhalt springen</a>
      <Erscheinen />
      <Kopf
        nav={nav}
        aktion={{ href: '#anfrage', lang: 'Unverbindlich anfragen', kurz: 'Anfragen', cta: 'oktober-allgemein' }}
      />
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
      <Fuss nav={[...nav, { href: '#anfrage', text: 'Anfrage' }, { href: '/', text: 'Startseite' }]} />
      <Leiste />
    </div>
  )
}
