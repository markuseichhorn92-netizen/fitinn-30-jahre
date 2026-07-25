import type { Metadata } from 'next'
import { Figtree, Source_Serif_4 } from 'next/font/google'
import './premium.css'

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

export const metadata: Metadata = {
  title: '5-Euro-Aktion — Stark älter werden im Fit-Inn Trier',
  description:
    'Die Jahre, die zählen: zwölf Wochen für je 5 € im Fit-Inn Trier. Familiengeführt seit 1996, Betreuung mit Namen, über 100 TechnoGym-Geräte. Probetraining kostenlos und unverbindlich.',
  // TODO: auf index umstellen, sobald die Platzhalter in content.ts gefüllt sind.
  robots: { index: false, follow: false },
}

export default function FuenfEuroAktionPage() {
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
