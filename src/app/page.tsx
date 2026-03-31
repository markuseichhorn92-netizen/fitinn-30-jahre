import { Navbar } from '@/components/Navbar'
import { GrainOverlay } from '@/components/GrainOverlay'
import { HeroSection } from '@/components/sections/HeroSection'
import { OfferSection } from '@/components/sections/OfferSection'
import { StudioSection } from '@/components/sections/StudioSection'
import { BenefitsSection } from '@/components/sections/BenefitsSection'
import { CTASection } from '@/components/sections/CTASection'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <GrainOverlay />
      <Navbar />

      <HeroSection />

      {/* Übergang → Studio (Petrol-Hauch) */}
      <div className="h-24 md:h-32 bg-gradient-to-b from-background to-[#edf4f6]" />

      <StudioSection />

      {/* Übergang → Vorteile */}
      <div className="h-24 md:h-32 bg-gradient-to-b from-[#edf4f6] to-background" />

      <BenefitsSection />

      {/* Übergang → Angebot */}
      <div className="section-divider" />

      <OfferSection />

      {/* Übergang → CTA (Gold-Hauch) */}
      <div className="h-24 md:h-32 bg-gradient-to-b from-background to-[#faf6ee]" />

      <CTASection />

      {/* Übergang → Footer */}
      <div className="h-16 md:h-24 bg-gradient-to-b from-[#faf6ee] to-background" />

      <Footer />
    </main>
  )
}
