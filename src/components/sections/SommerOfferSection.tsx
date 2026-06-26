'use client'

import { ArrowRight, Check, Star, Sun } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SpotsCounter } from '@/components/SpotsCounter'

const PLANS = [
  {
    name: 'Basic',
    subtitle: '52-Wochen-Vertrag · 1 Jahr',
    pricePerWeek: 12.0,
    freeValue: 72,
    recommended: false,
  },
  {
    name: 'Premium',
    subtitle: '104-Wochen-Vertrag · 2 Jahre',
    pricePerWeek: 9.0,
    freeValue: 54,
    recommended: true,
  },
] as const

const INCLUDES = [
  'Komplette Clubnutzung & alle Geräte',
  'Cardio-Entertainment',
  'Mineralgetränke gratis',
  'Individuelle Trainingspläne',
  'TechnoGym App',
  'Kostenloses WiFi',
  'Gesundheits-Check',
]

function fmt(n: number) {
  return n.toFixed(2).replace('.', ',')
}

export function SommerOfferSection() {
  const section = useScrollReveal(0.1)

  return (
    <section id="angebot" className="py-20 md:py-32 px-5 relative overflow-hidden">
      <div className="glow-orb glow-orb--gold w-[300px] h-[300px] md:w-[500px] md:h-[500px] top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div
        ref={section.ref}
        className={`relative z-10 mx-auto max-w-5xl fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
      >
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-5">
            <Sun className="w-4 h-4 text-accent" />
            <span className="text-sm font-bold text-accent uppercase tracking-wider">Sommer-Aktion</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            Wähle deinen Tarif — <span className="text-primary headline-accent">Sommerferien geschenkt</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
            Schließe jetzt einen 52- oder 104-Wochen-Vertrag ab und trainiere die kompletten
            Sommerferien beitragsfrei on top.
            <br className="hidden sm:block" />
            Nur für Neumitglieder.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl p-6 md:p-8 relative transition-all duration-300 ${
                plan.recommended
                  ? 'offer-card-recommended'
                  : 'bg-card border border-border hover:border-primary/30 hover:shadow-lg'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent text-white text-xs font-bold uppercase tracking-wider shadow-lg discount-badge">
                    <Star className="w-3.5 h-3.5" />
                    Bester Preis
                  </div>
                </div>
              )}

              <p className="text-sm text-muted-foreground mb-1 mt-2">{plan.subtitle}</p>
              <h3 className="text-xl md:text-2xl font-bold mb-6 normal-case">{plan.name}</h3>

              {/* Preis */}
              <div className="mb-5">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-5xl md:text-6xl font-black text-primary font-[family-name:var(--font-barlow-condensed)] leading-none">
                    {fmt(plan.pricePerWeek)}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-primary">€</span>
                    <span className="text-xs text-muted-foreground -mt-1">/Woche</span>
                  </div>
                </div>
                {plan.recommended && (
                  <p className="text-sm font-semibold text-primary mt-2">Dauerhaft günstigster Wochenpreis</p>
                )}
              </div>

              {/* Sommer-Vorteil */}
              <div className="savings-highlight mb-6 flex items-center gap-2">
                <span className="text-lg">🎁</span>
                <p className="text-sm font-semibold text-primary">
                  ~6 Wochen Sommerferien gratis — bis zu {fmt(plan.freeValue)} € geschenkt
                </p>
              </div>

              {/* Leistungen */}
              <ul className="space-y-3 mb-8 text-sm">
                {INCLUDES.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check className="w-4.5 h-4.5 text-primary mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#probetraining"
                className={`inline-flex items-center gap-2 w-full justify-center text-base ${
                  plan.recommended ? 'btn-cta !py-4' : 'btn-outline'
                }`}
              >
                Probetraining vereinbaren
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        <div className="max-w-sm mx-auto mt-12">
          <SpotsCounter />
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6 max-w-2xl mx-auto">
          * Nur für Neumitglieder bei Abschluss eines 52- oder 104-Wochen-Vertrags. Die rund 6 beitragsfreien
          Wochen (29.06.–07.08.2026) werden on top auf die Vertragslaufzeit gewährt. Zzgl. einmaliger Startgebühr
          von 39 €. SEPA-Abbuchung alle 14 Tage. Nicht kombinierbar mit anderen Aktionen.
        </p>
      </div>
    </section>
  )
}
