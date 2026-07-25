import { Figtree, Source_Serif_4 } from 'next/font/google'
import '@/components/aktion5/premium.css'

import { AblaufSection } from '@/components/aktion5/AblaufSection'
import { AlltagSection } from '@/components/aktion5/AlltagSection'
import { AngebotSection } from '@/components/aktion5/AngebotSection'
import { AppSection } from '@/components/aktion5/AppSection'
import { FaqSection } from '@/components/aktion5/FaqSection'
import { Footer } from '@/components/aktion5/Footer'
import { Hero } from '@/components/aktion5/Hero'
import { Nav } from '@/components/aktion5/Nav'
import { Reveal } from '@/components/aktion5/Reveal'
import { RundgangSection } from '@/components/aktion5/RundgangSection'
import { StimmeSection } from '@/components/aktion5/StimmeSection'
import { StudioSection } from '@/components/aktion5/StudioSection'
import { TerminSection } from '@/components/aktion5/TerminSection'
import { WarumSection } from '@/components/aktion5/WarumSection'

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

// Startseite: 5-Euro-Aktion (Design-Handoff "5-Euro-Aktion Premium.dc.html").
// Titel und Beschreibung kommen aus dem Root-Layout.
export default function Home() {
  return (
    <main className={`p5 ${figtree.variable} ${sourceSerif.variable}`}>
      <Reveal />
      <Nav />
      <Hero />
      <WarumSection />
      <AlltagSection />
      <StudioSection />
      <AngebotSection />
      <AppSection />
      <AblaufSection />
      <RundgangSection />
      <StimmeSection />
      <FaqSection />
      <TerminSection />
      <Footer />
    </main>
  )
}
