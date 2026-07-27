'use client'

import Script from 'next/script'
import { useEffect } from 'react'

// Google-Tag (GA4). Geladen wird er immer, gesetzt werden Cookies aber erst
// nach Zustimmung im Banner: Der Consent Mode startet auf "denied", und sobald
// jemand "Alle akzeptieren" wählt, reichen wir die Einwilligung nach. Die
// Standardwerte stehen im <head> (src/app/layout.tsx), damit sie garantiert
// vor dem ersten Messaufruf in der dataLayer-Warteschlange liegen.

export const GA_MESS_ID = 'G-Z8ZGP4RK08'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const ERLAUBT = {
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
  analytics_storage: 'granted',
} as const

export function GoogleTag() {
  useEffect(() => {
    let nachgereicht = false
    const pruefen = () => {
      if (nachgereicht) return
      if (localStorage.getItem('cookie-consent') !== 'all') return
      nachgereicht = true
      window.gtag?.('consent', 'update', ERLAUBT)
    }
    // Gleiches Muster wie ConditionalAnalytics: der Banner meldet keine Events.
    pruefen()
    const timer = setInterval(pruefen, 500)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <Script
        id="gtag-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MESS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-config" strategy="afterInteractive">
        {`gtag('js', new Date()); gtag('config', '${GA_MESS_ID}');`}
      </Script>
    </>
  )
}

/** Meldet eine erfolgreiche Probetraining-Buchung an den Google-Tag. */
export function meldeBuchung(details: { termin?: string; seite?: string } = {}) {
  window.gtag?.('event', 'probetraining_gebucht', {
    event_category: 'buchung',
    termin: details.termin,
    seite: details.seite ?? (typeof window !== 'undefined' ? window.location.pathname : undefined),
  })
}
