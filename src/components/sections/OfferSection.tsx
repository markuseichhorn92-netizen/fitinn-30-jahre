'use client'

import { ArrowRight, Check, Star, Flame } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SpotsCounter } from '@/components/SpotsCounter'

const PLANS = [
  {
    name: '52-Wochen-Vertrag',
    subtitle: '1 Jahr',
    regularPrice: 12.0,
    discountedPrice: 8.4,
    discountWeeks: 13,
    savings: 46.8,
    recommended: false,
  },
  {
    name: '104-Wochen-Vertrag',
    subtitle: '2 Jahre',
    regularPrice: 9.0,
    discountedPrice: 6.3,
    discountWeeks: 13,
    savings: 35.1,
    recommended: true,
  },
] as const

function fmt(n: number) {
  return n.toFixed(2).replace('.', ',')
}

export function OfferSection() {
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
            <Flame className="w-4 h-4 text-accent" />
            <span className="text-sm font-bold text-accent uppercase tracking-wider">Jubiläums-Rabatt</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="headline-accent">30% auf deine ersten <span className="text-primary">3 Monate</span></span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
            Wähle deinen Tarif und starte zum Jubiläumspreis.
            <br className="hidden sm:block" />
            Nur für Neumitglieder — limitiert auf die ersten 30 Anmeldungen.
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
                    Beliebteste Wahl
                  </div>
                </div>
              )}

              <p className="text-sm text-muted-foreground mb-1 mt-2">{plan.subtitle}</p>
              <h3 className="text-xl md:text-2xl font-bold mb-6 normal-case">{plan.name}</h3>

              {/* Pricing */}
              <div className="mb-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-muted-foreground line-through text-lg">
                    {fmt(plan.regularPrice)} €
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-bold uppercase discount-badge">
                    -30%
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-5xl md:text-6xl font-black text-primary font-[family-name:var(--font-barlow-condensed)] leading-none">
                    {fmt(plan.discountedPrice)}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-primary">€</span>
                    <span className="text-xs text-muted-foreground -mt-1">/Woche</span>
                  </div>
                </div>
              </div>

              {/* Savings */}
              <div className="savings-highlight mb-6 flex items-center gap-2">
                <span className="text-lg">🎉</span>
                <p className="text-sm font-semibold text-primary">
                  Du sparst {fmt(plan.savings)} € in 3 Monaten
                </p>
              </div>

              {/* Details */}
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4.5 h-4.5 text-primary mt-0.5 shrink-0" />
                  <span>30% Rabatt für die ersten 3 Monate ({plan.discountWeeks} Wochen)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4.5 h-4.5 text-primary mt-0.5 shrink-0" />
                  <span>Ab Monat 4: {fmt(plan.regularPrice)} €/Woche (regulärer Preis)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4.5 h-4.5 text-primary mt-0.5 shrink-0" />
                  <span>Voller Zugang zu allen Geräten und Trainingsbereichen</span>
                </li>
                {plan.recommended && (
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4.5 h-4.5 text-accent mt-0.5 shrink-0" />
                    <span className="font-semibold">Dauerhaft günstigerer Wochenpreis</span>
                  </li>
                )}
              </ul>

              <a
                href="/probetraining"
                className={`inline-flex items-center gap-2 w-full justify-center text-base ${
                  plan.recommended ? 'btn-cta !py-4' : 'btn-outline'
                }`}
              >
                Jetzt Mitglied werden
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        <div className="max-w-sm mx-auto mt-12">
          <SpotsCounter />
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          * Angebot gilt nur für Neumitglieder, limitiert auf die ersten 30 Anmeldungen. Der 30%-Rabatt wird auf die ersten 3 Monate der gewählten Vertragslaufzeit angerechnet.
        </p>
      </div>
    </section>
  )
}
