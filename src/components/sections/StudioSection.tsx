'use client'

import Image from 'next/image'
import { Trophy, Heart, Dumbbell, MapPin, ArrowRight } from 'lucide-react'
import { useScrollReveal, useCountUp } from '@/hooks/useScrollReveal'

const HIGHLIGHTS = [
  { icon: Trophy, label: '30 Jahre Erfahrung', color: 'text-accent' },
  { icon: Heart, label: 'Familiengeführt', color: 'text-primary' },
  { icon: Dumbbell, label: 'Moderne Ausstattung', color: 'text-accent' },
  { icon: MapPin, label: 'Trier-Feyen', color: 'text-primary' },
]

export function StudioSection() {
  const section = useScrollReveal(0.1)
  const years = useCountUp(30, 1500, section.isVisible)

  return (
    <section id="studio" className="py-20 md:py-32 px-5 relative overflow-hidden" style={{ backgroundColor: '#edf4f6' }}>
      <div className="glow-orb glow-orb--green w-[400px] h-[400px] -top-32 -right-48" />

      <div
        ref={section.ref}
        className={`mx-auto max-w-5xl fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
      >
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Text */}
          <div>
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Seit 1996
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-accent font-[family-name:var(--font-barlow-condensed)]">{years}</span> Jahre
              Fitness in Trier
            </h2>
            <p className="text-muted-foreground mb-4">
              Seit 1996 ist FIT-INN Trier dein Fitnessstudio in Trier-Feyen.
              Als Familienbetrieb legen wir Wert auf persönliche Betreuung,
              eine motivierende Atmosphäre und modernste Ausstattung.
            </p>
            <p className="text-muted-foreground mb-8">
              Zum 30-jährigen Jubiläum bedanken wir uns mit einem exklusiven
              Rabatt für alle, die jetzt den ersten Schritt machen wollen.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {HIGHLIGHTS.map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/10 flex items-center justify-center ${color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>

            <a href="/probetraining" className="btn-cta inline-flex items-center gap-2 text-sm md:text-base">
              Jubiläums-Angebot sichern
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Images */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
              <Image
                src="/studio-1.avif"
                alt="FIT-INN Trier Trainingsbereich"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden mt-8">
              <Image
                src="/studio-2.avif"
                alt="FIT-INN Trier Gerätepark"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
