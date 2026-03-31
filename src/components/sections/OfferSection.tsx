'use client'

import { ArrowRight, Check, Star } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const PLANS = [
  {
    name: '52-Wochen-Vertrag',
    subtitle: '1 Jahr',
    regularPrice: 12.0,
    discountedPrice: 8.4,
    discountWeeks: 26,
    savings: 93.6,
    recommended: false,
  },
  {
    name: '104-Wochen-Vertrag',
    subtitle: '2 Jahre',
    regularPrice: 9.0,
    discountedPrice: 6.3,
    discountWeeks: 26,
    savings: 70.2,
    recommended: true,
  },
] as const

function fmt(n: number) {
  return n.toFixed(2).replace('.', ',')
}

export function OfferSection({ onContact }: { onContact: () => void }) {
  const section = useScrollReveal(0.1)

  return (
    <section id="angebot" className="py-20 md:py-32 px-5">
      <div
        ref={section.ref}
        className={`mx-auto max-w-5xl fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
      >
        <div className="text-center mb-14">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-3">
            Jubiläums-Rabatt
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            30% auf deine ersten <span className="text-primary">6 Monate</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Wähle deinen Tarif und starte zum Jubiläumspreis.
            Nur für Neumitglieder, nur bis 30. April 2026.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`feature-card ${plan.recommended ? 'feature-card--gold ring-2 ring-primary' : ''} p-6 md:p-8 relative`}
            >
              {plan.recommended && (
                <div className="card-ribbon">
                  <Star className="w-3 h-3 inline -mt-0.5 mr-1" />
                  Empfohlen
                </div>
              )}

              <p className="text-sm text-muted-foreground mb-1">{plan.subtitle}</p>
              <h3 className="text-xl md:text-2xl font-bold mb-6">{plan.name}</h3>

              {/* Pricing */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-muted-foreground line-through text-lg">
                    {fmt(plan.regularPrice)} €/Woche
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-accent/15 text-accent text-xs font-bold uppercase">
                    30% Rabatt
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-extrabold text-primary font-[family-name:var(--font-barlow-condensed)]">
                    {fmt(plan.discountedPrice)} €
                  </span>
                  <span className="text-muted-foreground text-lg">/Woche</span>
                </div>
              </div>

              {/* Savings */}
              <div className="savings-highlight mb-6">
                <p className="text-sm font-semibold text-primary">
                  Du sparst {fmt(plan.savings)} € in 6 Monaten
                </p>
              </div>

              {/* Details */}
              <ul className="space-y-2.5 mb-8 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>30% Rabatt für die ersten 6 Monate ({plan.discountWeeks} Wochen)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>Ab Monat 7: {fmt(plan.regularPrice)} €/Woche (regulärer Preis)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>Voller Zugang zu allen Geräten und Trainingsbereichen</span>
                </li>
                {plan.recommended && (
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <span className="font-medium">Dauerhaft günstigerer Wochenpreis</span>
                  </li>
                )}
              </ul>

              <button onClick={onContact} className={`inline-flex items-center gap-2 w-full justify-center ${plan.recommended ? 'btn-cta' : 'btn-outline'}`}>
                Jetzt Mitglied werden
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          * Angebot gilt nur für Neumitglieder. Der 30%-Rabatt wird auf die ersten 6 Monate der gewählten Vertragslaufzeit angerechnet.
        </p>
      </div>
    </section>
  )
}
