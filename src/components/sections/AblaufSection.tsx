'use client'

import { ArrowRight } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const STEPS = [
  {
    n: '1',
    title: 'Termin sichern',
    text: 'Wähle oben direkt deinen Wunschtermin fürs kostenlose Probetraining — in unter 60 Sekunden.',
  },
  {
    n: '2',
    title: 'Vertrag & Tarif wählen',
    text: 'Wir beraten dich persönlich vor Ort und du wählst deinen 52- oder 104-Wochen-Tarif.',
  },
  {
    n: '3',
    title: 'Beitragsfrei in den Sommer',
    text: 'Die ~6 Ferienwochen kommen geschenkt on top — du startest sofort und trainierst den Sommer durch.',
  },
]

export function AblaufSection() {
  const section = useScrollReveal(0.1)

  return (
    <section id="ablauf" className="py-20 md:py-28 px-5 relative overflow-hidden" style={{ backgroundColor: '#edf4f6' }}>
      <div
        ref={section.ref}
        className={`mx-auto max-w-5xl fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
      >
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            In 3 Schritten zum Sommer-Training
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold">So einfach geht&rsquo;s</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map(({ n, title, text }) => (
            <div key={n} className="feature-card p-6 md:p-8">
              <span className="block text-5xl md:text-6xl font-black text-accent font-[family-name:var(--font-barlow-condensed)] leading-none mb-4">
                {n}
              </span>
              <h3 className="text-xl font-bold mb-2 normal-case">{title}</h3>
              <p className="text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#probetraining" className="btn-cta inline-flex items-center gap-2 text-sm md:text-base">
            Jetzt Termin sichern
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
