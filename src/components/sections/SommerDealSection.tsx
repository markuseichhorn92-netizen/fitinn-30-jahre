'use client'

import { Gift, Euro, Zap, Dumbbell } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const ITEMS = [
  {
    icon: Gift,
    title: 'Bis zu 6 Wochen gratis',
    text: 'Die kompletten RLP-Sommerferien (29.06.–07.08.) trainierst du beitragsfrei.',
  },
  {
    icon: Euro,
    title: 'Bis zu 72 € geschenkt',
    text: 'Je nach Tarif sparst du 54 € (104 Wochen) bis 72 € (52 Wochen) an Beiträgen.',
  },
  {
    icon: Zap,
    title: 'Sofort loslegen',
    text: 'Anmelden und direkt ab dem ersten Tag voll durchstarten — nicht erst in den Ferien.',
  },
  {
    icon: Dumbbell,
    title: 'Voller Zugang ab Tag 1',
    text: 'Komplette Clubnutzung, alle Geräte und Services von Anfang an inklusive.',
  },
]

export function SommerDealSection() {
  const section = useScrollReveal(0.1)

  return (
    <section id="sommer-deal" className="py-20 md:py-28 px-5">
      <div
        ref={section.ref}
        className={`mx-auto max-w-5xl fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
      >
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-3">
            Dein Sommer-Vorteil
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold">
            6 Wochen Sommerferien — <span className="text-primary headline-accent">beitragsfrei</span> on top
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg mt-5">
            Du schließt jetzt deinen Vertrag ab — die rund 6 Ferienwochen schenken wir dir obendrauf.
            Keine versteckten Kosten, kein Haken.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ITEMS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="feature-card p-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/10 flex items-center justify-center mb-4 text-accent">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2 normal-case">{title}</h3>
              <p className="text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8 max-w-2xl mx-auto">
          Einmalige Startgebühr von 39 € fällt regulär an. Die beitragsfreien Wochen gelten on top auf die
          gewählte Vertragslaufzeit.
        </p>
      </div>
    </section>
  )
}
