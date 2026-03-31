'use client'

import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { GrainOverlay } from '@/components/GrainOverlay'
import { ContactModal } from '@/components/ContactModal'
import { HeroSection } from '@/components/sections/HeroSection'
import { OfferSection } from '@/components/sections/OfferSection'
import { StudioSection } from '@/components/sections/StudioSection'
import { BenefitsSection } from '@/components/sections/BenefitsSection'
import { CTASection } from '@/components/sections/CTASection'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false)
  const openContact = () => setContactOpen(true)

  return (
    <main className="min-h-screen overflow-x-hidden">
      <GrainOverlay />
      <Navbar onContact={openContact} />

      <HeroSection onContact={openContact} />

      {/* Übergang → Studio (Petrol-Hauch) */}
      <div className="h-24 md:h-32 bg-gradient-to-b from-background to-[#edf4f6]" />

      <StudioSection onContact={openContact} />

      {/* Übergang → Vorteile */}
      <div className="h-24 md:h-32 bg-gradient-to-b from-[#edf4f6] to-background" />

      <BenefitsSection onContact={openContact} />

      {/* Übergang → Angebot */}
      <div className="section-divider" />

      <OfferSection onContact={openContact} />

      {/* Übergang → CTA (Gold-Hauch) */}
      <div className="h-24 md:h-32 bg-gradient-to-b from-background to-[#faf6ee]" />

      <CTASection onContact={openContact} />

      {/* Übergang → Footer */}
      <div className="h-16 md:h-24 bg-gradient-to-b from-[#faf6ee] to-background" />

      <Footer />

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  )
}
