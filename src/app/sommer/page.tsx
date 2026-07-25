import type { Metadata } from 'next'
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

export const metadata: Metadata = {
  title: 'Sommer-Aktion FIT-INN Trier — Archiv',
  description:
    'Archiv der Sommerferien-Aktion 2026: beitragsfrei trainieren vom 29.06.–07.08.2026 bei Abschluss einer 52- oder 104-Wochen-Mitgliedschaft.',
  robots: { index: false, follow: false },
}

// Archiv der Sommerferien-Kampagne (bis Juli 2026 die Startseite,
// abgelöst durch die 5-Euro-Aktion).
export default function SommerAktionPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <GrainOverlay />
      <Navbar />

      <SommerHeroSection />

      <div className="section-divider" />

      <SommerDealSection />

      {/* Übergang → Ablauf (Grün-Hauch) */}
      <div className="h-20 md:h-28 bg-gradient-to-b from-background to-[#eef6ee]" />
      <AblaufSection />
      <div className="h-20 md:h-28 bg-gradient-to-b from-[#eef6ee] to-background" />

      <SommerOfferSection />

      {/* Übergang → Studio (Grün-Hauch) */}
      <div className="h-20 md:h-28 bg-gradient-to-b from-background to-[#eef6ee]" />
      <StudioSection />
      <div className="h-20 md:h-28 bg-gradient-to-b from-[#eef6ee] to-background" />

      <SocialProofSection />

      {/* Übergang → Verfügbarkeit (Gold-Hauch) */}
      <div className="h-20 md:h-28 bg-gradient-to-b from-background to-[#f7f1e6]" />
      <UrgencySection />
      <div className="h-20 md:h-28 bg-gradient-to-b from-[#f7f1e6] to-background" />

      <FaqSection />

      {/* Übergang → CTA (Gold-Hauch) */}
      <div className="h-16 md:h-24 bg-gradient-to-b from-background to-[#f7f1e6]" />
      <SommerCTASection />
      <div className="h-16 md:h-24 bg-gradient-to-b from-[#f7f1e6] to-background" />

      <Footer />
    </main>
  )
}
