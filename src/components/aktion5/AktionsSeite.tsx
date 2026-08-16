import localFont from 'next/font/local'
import './premium.css'

import { AblaufSection } from './AblaufSection'
import { AlltagSection } from './AlltagSection'
import { AngebotSection } from './AngebotSection'
import { AppSection } from './AppSection'
import { FaqSection } from './FaqSection'
import { Footer } from './Footer'
import { Hero } from './Hero'
import { Nav } from './Nav'
import { Rechtshinweis } from './Rechtshinweis'
import { Reveal } from './Reveal'
import { RundgangSection } from './RundgangSection'
import { StimmeSection } from './StimmeSection'
import { StudioSection } from './StudioSection'
import { TerminSection } from './TerminSection'
import type { Variante } from './varianten'
import { WarumSection } from './WarumSection'

// Beide Schriften liegen im Projekt (src/fonts) statt über next/font/google.
//
// Grund: Google hat die Dateien von Source Serif 4 unter denselben
// Versionspfaden ausgetauscht. Vercel stellte den Build-Cache einer früheren
// Auslieferung wieder her, der Build fragte die alten Adressen an und bekam
// zwölfmal 404 – die Startseite ließ sich nicht mehr bauen, ohne dass jemand
// etwas an ihr geändert hätte. Selbst mitgeliefert kann das nicht wieder
// passieren: Der Build braucht dafür kein Netz mehr.
//
// Es sind die variablen Fassungen, nur Latin (20 KB und 122 KB).

const figtree = localFont({
  src: '../../fonts/Figtree-Variable-latin.woff2',
  variable: '--font-figtree',
  weight: '300 900',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})

const sourceSerif = localFont({
  src: '../../fonts/SourceSerif4-Variable-latin.woff2',
  variable: '--font-source-serif',
  weight: '200 900',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
})

// Die 5-Euro-Landingpage (Design-Handoff "5-Euro-Aktion Premium.dc.html").
// Aufbau, Angebot und Buchung sind für alle Zielgruppen gleich – nur die
// Ansprache kommt aus der übergebenen Variante.
export function AktionsSeite({ variante }: { variante: Variante }) {
  return (
    <main className={`p5 ${figtree.variable} ${sourceSerif.variable}`}>
      <Reveal />
      <Nav />
      <Hero hero={variante.hero} />
      <WarumSection warum={variante.warum} />
      <AlltagSection alltag={variante.alltag} />
      <StudioSection />
      <AngebotSection />
      <AppSection />
      <AblaufSection begleitung={variante.ablaufBegleitung} />
      <RundgangSection />
      <StimmeSection stimme={variante.stimme} />
      <FaqSection fragen={variante.fragen} />
      <TerminSection />
      <Rechtshinweis />
      <Footer />
    </main>
  )
}
