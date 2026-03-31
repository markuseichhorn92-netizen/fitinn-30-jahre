'use client'

import { Dumbbell, Users, Clock, Heart, MapPin, Euro, ArrowRight } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const BENEFITS = [
  {
    icon: Dumbbell,
    title: 'Moderne Geräte',
    description: 'Top-ausgestatteter Gerätepark für jedes Fitnesslevel.',
  },
  {
    icon: Users,
    title: 'Persönliche Betreuung',
    description: 'Qualifizierte Trainer vor Ort für Fragen und Unterstützung.',
  },
  {
    icon: Clock,
    title: 'Flexible Zeiten',
    description: 'Großzügige Öffnungszeiten — Mo–Fr 6–22 Uhr, auch am Wochenende.',
  },
  {
    icon: Heart,
    title: 'Familiäre Atmosphäre',
    description: 'Kein anonymes Massenstudio — bei uns kennt man sich.',
  },
  {
    icon: MapPin,
    title: 'Zentrale Lage',
    description: 'Gut erreichbar in Trier-Feyen, Auf Hirtenberg 8.',
  },
  {
    icon: Euro,
    title: 'Faire Preise',
    description: 'Jetzt mit 30% Jubiläums-Rabatt noch günstiger.',
  },
]

export function BenefitsSection() {
  const section = useScrollReveal(0.1)

  return (
    <section id="vorteile" className="py-20 md:py-32 px-5">
      <div
        ref={section.ref}
        className={`mx-auto max-w-5xl fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
      >
        <div className="text-center mb-14">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-3">
            Warum FIT-INN?
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold">
            Dein Studio in <span className="text-primary headline-accent">Trier</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map(({ icon: Icon, title, description }, i) => (
            <div
              key={title}
              className="feature-card p-6"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/10 flex items-center justify-center mb-4">
                <Icon className="w-5.5 h-5.5 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2 normal-case">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="/probetraining" className="btn-cta inline-flex items-center gap-2 text-sm md:text-base">
            30% Rabatt sichern — Jetzt anfragen
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-xs text-muted-foreground mt-3">Nur für Neumitglieder · Limitiert auf 30 Plätze</p>
        </div>
      </div>
    </section>
  )
}
