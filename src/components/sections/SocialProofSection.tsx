'use client'

import { Star } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

// Echte Google-Bewertung von FIT-INN Trier (Stand Juni 2026, Quelle: Google).
const GOOGLE = { rating: 4.8, count: 179 }

// Echte Google-Rezensionen von FIT-INN Trier (verbatim, mit Klarnamen).
const TESTIMONIALS = [
  {
    quote: 'Super gepflegte Geräte, nette Leute, angenehme Atmosphäre, Duschen + Getränke top.',
    author: 'Jana Thielen',
    meta: 'Google-Bewertung',
  },
  {
    quote: 'Angenehmes Training, nette Menschen. Die neuen Geräte von Technogym sind super.',
    author: 'Thomas Müller',
    meta: 'Google-Bewertung',
  },
  {
    quote: 'Ein wirklich ganz familiäres und toll ausgestattetes Studio.',
    author: 'Annette Hoffmann',
    meta: 'Google-Bewertung',
  },
  {
    quote: 'Hier macht\'s richtig Spaß zu trainieren. Es gibt alles was man braucht. Die Geräte sind total modern.',
    author: 'Chris Petry',
    meta: 'Google-Bewertung',
  },
  {
    quote: 'Ich bin von der Ausstattung, den Geräten und den Mitarbeitern maximal überzeugt.',
    author: 'Gisela T.',
    meta: 'Google-Bewertung',
  },
  {
    quote: 'Wir sind nach mehr als vier Jahren bei Fit-Inn sehr zufrieden mit dem neuen Angebot.',
    author: 'Manfred Z.',
    meta: 'Google-Bewertung',
  },
]

const FACTS = ['Seit 1996', 'Familiengeführt', 'Moderne TechnoGym-Geräte', 'Trier-Feyen']

export function SocialProofSection() {
  const section = useScrollReveal(0.1)
  const fullStars = Math.floor(GOOGLE.rating)

  return (
    <section id="bewertungen" className="py-20 md:py-28 px-5">
      <div
        ref={section.ref}
        className={`mx-auto max-w-5xl fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}
      >
        <div className="text-center mb-10">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-3">
            Das sagen unsere Mitglieder
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold">
            Echte Stimmen aus <span className="text-primary headline-accent">Trier-Feyen</span>
          </h2>
        </div>

        {/* Google-Bewertung */}
        <div className="flex justify-center mb-10">
          <div className="feature-card feature-card--gold px-6 py-4 flex items-center gap-4">
            <span className="text-4xl font-black text-primary font-[family-name:var(--font-barlow-condensed)] leading-none">
              {GOOGLE.rating.toFixed(1).replace('.', ',')}
            </span>
            <div>
              <div className="flex gap-0.5 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < fullStars ? 'text-accent fill-accent' : 'text-border'}`} />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">{GOOGLE.count}+ Google-Bewertungen</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="feature-card p-6">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="w-3.5 h-3.5 text-accent fill-accent" />
                ))}
              </div>
              <p className="text-sm mb-4 leading-relaxed">&bdquo;{t.quote}&ldquo;</p>
              <p className="text-sm font-semibold">{t.author}</p>
              <p className="text-xs text-muted-foreground">{t.meta}</p>
            </div>
          ))}
        </div>

        {/* Studio-Fakten */}
        <div className="flex flex-wrap justify-center gap-2.5">
          {FACTS.map((f) => (
            <span
              key={f}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-sm font-medium"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
