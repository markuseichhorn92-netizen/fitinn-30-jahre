import { Figtree, Source_Serif_4 } from 'next/font/google'
import './premium.css'

import { AblaufSection } from './AblaufSection'
import { AlltagSection } from './AlltagSection'
import { AngebotSection } from './AngebotSection'
import { AppSection } from './AppSection'
import { FaqSection } from './FaqSection'
import { Footer } from './Footer'
import { Hero } from './Hero'
import { Nav } from './Nav'
import { Reveal } from './Reveal'
import { RundgangSection } from './RundgangSection'
import { StimmeSection } from './StimmeSection'
import { StudioSection } from './StudioSection'
import { TerminSection } from './TerminSection'
import type { Variante } from './varianten'
import { WarumSection } from './WarumSection'

const figtree = Figtree({
  variable: '--font-figtree',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  variable: '--font-source-serif',
  subsets: ['latin'],
  weight: ['300', '400'],
  display: 'swap',
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
      <Footer />
    </main>
  )
}
