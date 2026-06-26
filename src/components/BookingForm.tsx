'use client'

import { useEffect } from 'react'
import { CalendarCheck } from 'lucide-react'

// Identische StudioPartner/Magicline-Integration wie bisher /probetraining —
// jetzt aber inline als Sektion einbettbar statt als Unterseite.
const FORM_URL = 'https://mein.studiopartner.de/b0a8bae3-dad0-4281-8279-dc0e4d0a15e6/form/trial_calendar'

export function BookingForm({
  className = '',
  heightClass = 'h-[640px] lg:h-[680px]',
}: {
  className?: string
  heightClass?: string
}) {
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data && event.data.type === 'form_redirect') {
        window.location.href = event.data.redirectUrl
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <div className={`feature-card feature-card--gold ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-border bg-card">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent/15 to-primary/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
            <CalendarCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold leading-tight normal-case">Kostenloses Probetraining buchen</p>
            <p className="text-xs text-muted-foreground">Unverbindlich · in 60 Sekunden</p>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-primary shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          Termine verfügbar
        </span>
      </div>

      <iframe
        src={FORM_URL}
        title="Probetraining buchen"
        className={`w-full border-0 bg-white ${heightClass}`}
      />
    </div>
  )
}
