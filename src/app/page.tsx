import { Navbar } from '@/components/Navbar'
import { GrainOverlay } from '@/components/GrainOverlay'
import { SommerHeroSection } from '@/components/sections/SommerHeroSection'
import { SommerDealSection } from '@/components/sections/SommerDealSection'
import { AblaufSection } from '@/components/sections/AblaufSection'
import { SommerOfferSection } from '@/components/sections/SommerOfferSection'
import { StudioSection } from '@/components/sections/StudioSection'
import { SocialProofSection } from '@/components/sections/SocialProofSection'
import { UrgencySection } from '@/components/sections/UrgencySection'
import { FaqSection } from '@/components/sections/FaqSection'
import { SommerCTASection } from '@/components/sections/SommerCTASection'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <GrainOverlay />
      <Navbar />

      <SommerHeroSection />

      <div className="section-divider" />

      <SommerDealSection />

      {/* Übergang → Ablauf (Petrol-Hauch) */}
      <div className="h-20 md:h-28 bg-gradient-to-b from-background to-[#f0f9f9]" />
      <AblaufSection />
      <div className="h-20 md:h-28 bg-gradient-to-b from-[#f0f9f9] to-background" />

      <SommerOfferSection />

      {/* Übergang → Studio (Petrol-Hauch) */}
      <div className="h-20 md:h-28 bg-gradient-to-b from-background to-[#f0f9f9]" />
      <StudioSection />
      <div className="h-20 md:h-28 bg-gradient-to-b from-[#f0f9f9] to-background" />

      <SocialProofSection />

      {/* Übergang → Verfügbarkeit (Gold-Hauch) */}
      <div className="h-20 md:h-28 bg-gradient-to-b from-background to-[#f6eedf]" />
      <UrgencySection />
      <div className="h-20 md:h-28 bg-gradient-to-b from-[#f6eedf] to-background" />

      <FaqSection />

      {/* Übergang → CTA (Gold-Hauch) */}
      <div className="h-16 md:h-24 bg-gradient-to-b from-background to-[#f6eedf]" />
      <SommerCTASection />
      <div className="h-16 md:h-24 bg-gradient-to-b from-[#f6eedf] to-background" />

      <Footer />
    </main>
  )
}
