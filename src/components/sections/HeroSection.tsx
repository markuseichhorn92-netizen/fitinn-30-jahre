'use client'

import Image from 'next/image'
import { ArrowRight, PartyPopper } from 'lucide-react'
import { CountdownTimer } from '@/components/CountdownTimer'

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-24 px-5">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/hero-bg.avif"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
      </div>

      {/* Glow orbs */}
      <div className="glow-orb glow-orb--gold w-[400px] h-[400px] -top-32 -right-48" />
      <div className="glow-orb glow-orb--green w-[300px] h-[300px] bottom-20 -left-32" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8 animate-fade-up">
          <PartyPopper className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-accent uppercase tracking-wider">
            Jubiläums-Angebot &middot; Nur bis 30. April
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold leading-[0.9] mb-6 animate-fade-up delay-100">
          <span className="text-accent">30 Jahre</span><br />
          FIT-INN Trier
        </h1>

        {/* Subline */}
        <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-up delay-200">
          Feiere mit uns — <strong className="text-foreground">30% Rabatt</strong> auf deine Mitgliedschaft.
          Ab <strong className="text-primary">6,30 €/Woche</strong>.
        </p>

        {/* CTA */}
        <div className="flex flex-col items-center gap-6 animate-fade-up delay-300">
          <a href="#angebot" className="btn-cta inline-flex items-center gap-3 text-base md:text-lg px-6 md:px-8 py-3.5 md:py-4">
            Angebot ansehen
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        {/* Countdown */}
        <div className="mt-12 animate-fade-up delay-400">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Angebot endet in</p>
          <CountdownTimer />
        </div>
      </div>
    </section>
  )
}
