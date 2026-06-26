'use client'

import { ArrowRight } from 'lucide-react'
import { CountdownTimer } from '@/components/CountdownTimer'
import { SpotsCounter } from '@/components/SpotsCounter'

export function UrgencySection() {
  return (
    <section id="verfuegbarkeit" className="py-20 md:py-28 px-5 relative overflow-hidden" style={{ backgroundColor: '#f6eedf' }}>
      <div className="glow-orb glow-orb--gold w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-3">
          Begrenzte Aktionsplätze
        </span>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
          Sichere dir deinen <span className="text-accent headline-accent">beitragsfreien Sommer</span>
        </h2>
        <p className="text-muted-foreground text-base md:text-lg mb-10 max-w-xl mx-auto">
          Je früher du startest, desto mehr Ferienwochen trainierst du beitragsfrei. Die Aktion ist auf eine
          begrenzte Anzahl Neumitglieder limitiert.
        </p>

        <div className="max-w-sm mx-auto mb-10">
          <SpotsCounter />
        </div>

        <div className="pt-8 border-t border-border/50 mb-8">
          <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mb-3">Aktion endet in</p>
          <CountdownTimer />
        </div>

        <a href="#probetraining" className="btn-cta inline-flex items-center gap-2 text-sm md:text-base">
          Jetzt Platz sichern
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  )
}
