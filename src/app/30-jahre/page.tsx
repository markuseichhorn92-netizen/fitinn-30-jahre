import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { GrainOverlay } from '@/components/GrainOverlay'
import { HeroSection } from '@/components/sections/HeroSection'
import { OfferSection } from '@/components/sections/OfferSection'
import { StudioSection } from '@/components/sections/StudioSection'
import { BenefitsSection } from '@/components/sections/BenefitsSection'
import { CTASection } from '@/components/sections/CTASection'
import { Footer } from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: '30 Jahre FIT-INN Trier — Archiv',
  robots: { index: false, follow: false },
}

// Archiv der ursprünglichen 30-Jahre-Jubiläumsaktion (durch die Sommer-Aktion abgelöst).
export default function Jubilaeum30Page() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <GrainOverlay />
      <Navbar />

      <HeroSection />

      <div className="h-24 md:h-32 bg-gradient-to-b from-background to-[#f0f9f9]" />
      <StudioSection />
      <div className="h-24 md:h-32 bg-gradient-to-b from-[#f0f9f9] to-background" />

      <BenefitsSection />

      <div className="section-divider" />

      <OfferSection />

      <div className="h-24 md:h-32 bg-gradient-to-b from-background to-[#f6eedf]" />
      <CTASection />
      <div className="h-16 md:h-24 bg-gradient-to-b from-[#f6eedf] to-background" />

      <Footer />
    </main>
  )
}
