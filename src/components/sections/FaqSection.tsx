'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const FAQ = [
  {
    q: 'Was bedeutet „beitragsfreies Training in den Sommerferien" genau?',
    a: 'Du schließt jetzt einen 52- oder 104-Wochen-Vertrag ab. Die rund 6 Wochen der rheinland-pfälzischen Sommerferien (29.06.–07.08.2026) schenken wir dir on top — in diesem Zeitraum zahlst du keinen Mitgliedsbeitrag.',
  },
  {
    q: 'Muss ich bis zu den Ferien warten, um zu starten?',
    a: 'Nein. Du startest sofort nach der Anmeldung mit vollem Zugang. Die beitragsfreien Wochen werden zusätzlich auf deine Laufzeit aufgeschlagen.',
  },
  {
    q: 'Fällt die Startgebühr von 39 € weg?',
    a: 'Nein, die einmalige Startgebühr von 39 € bleibt bestehen. Geschenkt bekommst du die ~6 Ferienwochen als Beitragsfreiheit on top.',
  },
  {
    q: 'Wie viel spare ich konkret?',
    a: 'Beim 52-Wochen-Tarif rund 72 € (6 × 12 €), beim 104-Wochen-Tarif rund 54 € (6 × 9 €) an Beiträgen.',
  },
  {
    q: 'Welche Tarife gibt es und was kosten sie?',
    a: 'Basic (52 Wochen) für 12 €/Woche und Premium (104 Wochen) für 9 €/Woche — beide inklusive kompletter Clubnutzung, TechnoGym App, Gesundheits-Check, Mineralgetränken und WiFi. Abbuchung bequem per SEPA alle 14 Tage.',
  },
  {
    q: 'Gibt es einen Studentenrabatt?',
    a: 'Ja, mit gültigem Nachweis sparst du rund 3 € pro Woche. Sprich uns einfach beim Probetraining darauf an.',
  },
  {
    q: 'Ist das Probetraining wirklich kostenlos und unverbindlich?',
    a: 'Ja, komplett kostenlos und unverbindlich. Du lernst Studio, Team und Geräte in Ruhe kennen — ganz ohne Druck.',
  },
  {
    q: 'Bin ich an eine lange Laufzeit gebunden?',
    a: 'Du wählst zwischen 52 und 104 Wochen. Wir beraten dich vor Ort, welcher Tarif am besten zu deinen Zielen passt.',
  },
]

export function FaqSection() {
  const section = useScrollReveal(0.1)
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="py-20 md:py-28 px-5">
      <div
        ref={section.ref}
        className={`mx-auto max-w-3xl fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
      >
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-3">
            Häufige Fragen
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold">Noch Fragen?</h2>
        </div>

        <div className="space-y-3">
          {FAQ.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={i} className="feature-card overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-semibold text-base normal-case">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-accent transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div
                    id={`faq-panel-${i}`}
                    className="px-5 pb-5 -mt-1 text-sm text-muted-foreground leading-relaxed"
                  >
                    {item.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
