'use client'

import Image from 'next/image'
import { ArrowRight, PartyPopper } from 'lucide-react'
import { CountdownTimer } from '@/components/CountdownTimer'

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[100svh] flex flex-col items-center justify-center pt-16 pb-16 px-4 md:pt-20 md:pb-24 md:px-5 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/hero-bg.avif"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-40 md:opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Glow orbs — kleiner auf Mobile */}
      <div className="glow-orb glow-orb--gold w-[200px] h-[200px] md:w-[400px] md:h-[400px] -top-16 -right-24 md:-top-32 md:-right-48" />
      <div className="glow-orb glow-orb--green w-[150px] h-[150px] md:w-[300px] md:h-[300px] bottom-10 -left-16 md:bottom-20 md:-left-32" />

      {/* Confetti — weniger auf Mobile */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {CONFETTI.map((c, i) => (
          <div
            key={i}
            className={`confetti-piece ${i >= 16 ? 'hidden md:block' : ''}`}
            style={{
              left: c.left,
              width: c.size,
              height: c.size,
              background: c.color,
              borderRadius: c.round ? '50%' : '2px',
              animationDelay: c.delay,
              animationDuration: c.duration,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center w-full max-w-4xl mx-auto">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-accent/10 border border-accent/20 mb-4 md:mb-6 animate-fade-up">
          <PartyPopper className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent" />
          <span className="text-xs md:text-sm font-medium text-accent uppercase tracking-wider">
            Jubiläum &middot; Nur für die ersten 30
          </span>
        </div>

        {/* Big 30 Balloon */}
        <div className="relative inline-block mb-2 md:mb-4 animate-fade-up delay-100">
          <div className="balloon-float relative">
            {/* Balloon strings */}
            <svg className="absolute -bottom-5 md:-bottom-8 left-1/2 -translate-x-1/2 w-10 h-6 md:w-16 md:h-10" viewBox="0 0 64 40" fill="none">
              <path d="M20 0 C20 20, 10 35, 14 40" stroke="var(--accent)" strokeWidth="1.5" fill="none" opacity="0.4" />
              <path d="M44 0 C44 20, 54 35, 50 40" stroke="var(--accent)" strokeWidth="1.5" fill="none" opacity="0.4" />
            </svg>
            <span className="text-[6rem] md:text-[10rem] lg:text-[14rem] font-black leading-none tracking-tight font-[family-name:var(--font-barlow-condensed)] balloon-text select-none">
              30
            </span>
          </div>
          {/* Sparkles */}
          <div className="absolute -top-2 -left-2 md:-top-6 md:-left-6">
            <Sparkle className="w-4 h-4 md:w-8 md:h-8 text-accent sparkle-1" />
          </div>
          <div className="absolute -top-1 -right-2 md:-top-4 md:-right-5">
            <Sparkle className="w-3.5 h-3.5 md:w-7 md:h-7 text-primary sparkle-2" />
          </div>
          <div className="absolute bottom-2 -right-4 md:bottom-8 md:-right-8">
            <Sparkle className="w-3 h-3 md:w-6 md:h-6 text-accent sparkle-3" />
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-extrabold leading-[0.95] mb-3 md:mb-5 animate-fade-up delay-200">
          <span className="text-accent">Jahre</span>{' '}
          FIT-INN Trier
        </h1>

        {/* Subline */}
        <p className="text-base md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-8 animate-fade-up delay-300">
          Feiere mit uns — <strong className="text-foreground">30% Rabatt</strong> auf deine Mitgliedschaft.
          <br className="hidden sm:block" />
          Ab <strong className="text-primary">6,30 €/Woche</strong>.
        </p>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 md:gap-6 animate-fade-up delay-400">
          <a href="/probetraining" className="btn-cta inline-flex items-center gap-2 md:gap-3 text-sm md:text-lg px-5 md:px-8 py-3 md:py-4 w-full sm:w-auto justify-center">
            Kostenloses Probetraining buchen
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </a>
        </div>

        {/* Countdown */}
        <div className="mt-8 md:mt-12 animate-fade-up delay-500">
          <p className="text-[0.65rem] md:text-xs text-muted-foreground uppercase tracking-wider mb-2 md:mb-3">Angebot endet in</p>
          <CountdownTimer />
        </div>
      </div>
    </section>
  )
}

/* ── Sparkle SVG ── */
function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z" />
    </svg>
  )
}

/* ── Confetti config ── */
const COLORS = ['#c48a1a', '#0a4958', '#e8b84b', '#1a7a8a', '#f5d080', '#0d5c6e', '#ef4444', '#f59e0b']
const CONFETTI = Array.from({ length: 30 }, (_, i) => ({
  left: `${(i * 3.3 + Math.sin(i) * 8) % 100}%`,
  size: `${5 + (i % 4) * 2}px`,
  color: COLORS[i % COLORS.length],
  round: i % 3 === 0,
  delay: `${(i * 0.3) % 5}s`,
  duration: `${3 + (i % 4)}s`,
}))
