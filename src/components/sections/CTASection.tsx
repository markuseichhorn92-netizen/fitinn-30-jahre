'use client'

import { Phone, MessageCircle, MapPin, Clock } from 'lucide-react'
import { CountdownTimer } from '@/components/CountdownTimer'

export function CTASection() {
  return (
    <section id="kontakt" className="py-20 md:py-32 px-5 relative overflow-hidden" style={{ backgroundColor: '#faf6ee' }}>
      <div className="glow-orb glow-orb--gold w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Jetzt <span className="text-accent">30% Rabatt</span> sichern
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
          Komm vorbei, ruf an oder schreib uns per WhatsApp — wir beraten dich gerne persönlich.
        </p>

        {/* Contact buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a
            href="tel:+49651308524"
            className="btn-cta inline-flex items-center gap-3 text-base md:text-lg px-6 md:px-8 py-3.5 md:py-4 w-full sm:w-auto justify-center"
          >
            <Phone className="w-5 h-5" />
            0651 308524
          </a>
          <a
            href="https://wa.me/4915679610457"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline w-full sm:w-auto justify-center"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp schreiben
          </a>
        </div>

        {/* Studio info */}
        <div className="grid sm:grid-cols-2 gap-6 text-sm text-left max-w-lg mx-auto mb-10">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">FIT-INN Trier</p>
              <p className="text-muted-foreground">Auf Hirtenberg 8<br />54296 Trier</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">Öffnungszeiten</p>
              <p className="text-muted-foreground">
                Mo–Fr: 06:00–22:00<br />
                Sa: 09:00–18:00<br />
                So: 09:00–14:00
              </p>
            </div>
          </div>
        </div>

        {/* Countdown */}
        <div className="pt-6 border-t border-border/50">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Angebot gültig bis 30. April 2026</p>
          <CountdownTimer compact />
        </div>
      </div>
    </section>
  )
}
