'use client'

import Image from 'next/image'
import { Sun, Gift, Zap, Star, ArrowRight, Check } from 'lucide-react'
import { BookingForm } from '@/components/BookingForm'

const CHIPS = [
  { icon: Gift, label: 'Bis zu 6 Wochen geschenkt' },
  { icon: Zap, label: 'Sofort starten' },
  { icon: Star, label: 'Seit 30 Jahren in Trier' },
]

export function SommerHeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center pt-24 pb-16 md:pt-28 md:pb-20 px-4 md:px-5 overflow-hidden"
    >
      {/* Hintergrund */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/hero-bg.avif"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30 md:opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        <div className="absolute inset-0 hero-sun-gradient" />
      </div>

      {/* Glow orbs */}
      <div className="glow-orb glow-orb--sun w-[260px] h-[260px] md:w-[520px] md:h-[520px] -top-20 -right-24 md:-top-32 md:-right-40 sun-glow-pulse" />
      <div className="glow-orb glow-orb--green w-[150px] h-[150px] md:w-[300px] md:h-[300px] bottom-10 -left-16 md:bottom-20 md:-left-32" />

      <div className="relative z-10 mx-auto w-full max-w-6xl grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
        {/* Versprechen */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-accent/10 border border-accent/20 mb-5 animate-fade-up">
            <Sun className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent" />
            <span className="text-xs md:text-sm font-semibold text-accent uppercase tracking-wider">
              Sommer-Aktion · 29.06.–07.08.2026
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[0.95] mb-5 animate-fade-up delay-100">
            Die ganzen Sommerferien{' '}
            <span className="text-accent">beitragsfrei trainieren.</span>
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-6 animate-fade-up delay-200">
            Sichere dir jetzt deine 52- oder 104-Wochen-Mitgliedschaft — die kompletten{' '}
            <strong className="text-foreground">6 Wochen Sommerferien schenken wir dir on top</strong>.
            Voller Zugang ab Tag&nbsp;1.
          </p>

          {/* Highlight-Chips */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-2.5 mb-8 animate-fade-up delay-300">
            {CHIPS.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-sm font-medium shadow-sm"
              >
                <Icon className="w-4 h-4 text-accent" />
                {label}
              </span>
            ))}
          </div>

          {/* CTA + Trust */}
          <div className="animate-fade-up delay-400">
            <a
              href="#probetraining"
              className="btn-cta inline-flex items-center gap-2 md:gap-3 text-sm md:text-lg px-6 md:px-8 py-3.5 md:py-4 w-full sm:w-auto justify-center"
            >
              Jetzt Probetraining sichern
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </a>
            <div className="text-xs md:text-sm text-muted-foreground mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1.5">
              <span className="inline-flex items-center gap-1"><Check className="w-3.5 h-3.5 text-primary" /> Familiengeführt seit 1996</span>
              <span className="inline-flex items-center gap-1"><Check className="w-3.5 h-3.5 text-primary" /> Moderne TechnoGym-Geräte</span>
              <span className="inline-flex items-center gap-1"><Check className="w-3.5 h-3.5 text-primary" /> Trier-Feyen</span>
            </div>
          </div>
        </div>

        {/* Formular (Anker-Ziel) */}
        <div id="probetraining" className="scroll-mt-24 lg:scroll-mt-28 animate-fade-up delay-200">
          <BookingForm />
        </div>
      </div>
    </section>
  )
}
