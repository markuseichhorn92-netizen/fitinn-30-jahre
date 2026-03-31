'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Settings, ChevronDown, ChevronUp } from 'lucide-react'

// ─── Consent Storage ────────────────────────────────────────────────────────

const CONSENT_KEY = 'cookie-consent'
const CONSENT_DATE_KEY = 'cookie-consent-date'

type ConsentValue = 'all' | 'essential' | null

function saveConsent(value: 'all' | 'essential') {
  localStorage.setItem(CONSENT_KEY, value)
  localStorage.setItem(CONSENT_DATE_KEY, new Date().toISOString())
}

function getConsent(): ConsentValue {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(CONSENT_KEY)
  return stored === 'all' || stored === 'essential' ? stored : null
}

// ─── Cookie-Banner ──────────────────────────────────────────────────────────

export function CookieBanner() {
  const [consent, setConsent] = useState<ConsentValue>(null)
  const [mounted, setMounted] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    setMounted(true)
    setConsent(getConsent())
  }, [])

  const acceptAll = useCallback(() => {
    saveConsent('all')
    setConsent('all')
    setShowSettings(false)
  }, [])

  const acceptEssential = useCallback(() => {
    saveConsent('essential')
    setConsent('essential')
    setShowSettings(false)
  }, [])

  const openSettings = useCallback(() => {
    setShowSettings(true)
  }, [])

  if (!mounted) return null

  // Banner: show when no consent yet
  if (consent === null) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-[200] p-4 sm:p-6 animate-slide-up">
        <div className="max-w-xl mx-auto bg-card border border-border rounded-2xl shadow-2xl shadow-black/50 p-5 sm:p-6">
          <h3 className="text-base font-bold mb-2">Cookie-Einstellungen</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Wir nutzen Cookies und ähnliche Technologien. Notwendige Cookies ermöglichen grundlegende Funktionen
            und sind für den Betrieb der Website erforderlich. Analyse-Cookies helfen uns, die Nutzung der Website
            zu verstehen und zu verbessern.
          </p>

          {/* Detail-Aufklappbereich */}
          <button
            onClick={() => setShowDetails(d => !d)}
            className="flex items-center gap-1.5 text-sm text-primary font-semibold mb-3 hover:underline"
          >
            Details anzeigen {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showDetails && (
            <div className="mb-4 space-y-3 text-sm">
              {/* Notwendig */}
              <div className="p-3 bg-background rounded-xl border border-border">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold">Notwendig</span>
                  <span className="text-xs text-primary font-semibold px-2 py-0.5 bg-primary/10 rounded-full">Immer aktiv</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Technisch erforderliche Cookies für den Betrieb der Website. Speichert deine Cookie-Einstellungen
                  und ermöglicht grundlegende Funktionen wie Navigation und Formulare. Kein Tracking, keine Weitergabe an Dritte.
                </p>
                <div className="mt-2 text-xs text-muted-foreground">
                  <span className="font-medium">Cookies:</span> cookie-consent (localStorage) · <span className="font-medium">Speicherdauer:</span> 1 Jahr
                </div>
              </div>

              {/* Analyse */}
              <div className="p-3 bg-background rounded-xl border border-border">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold">Analyse & Performance</span>
                  <span className="text-xs text-muted-foreground px-2 py-0.5 bg-secondary rounded-full">Optional</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Vercel Web Analytics erfasst anonymisierte Seitenaufrufe (keine IP-Adressen, keine persönlichen Daten).
                  Vercel Speed Insights misst Ladezeiten zur Performance-Verbesserung der Website.
                </p>
                <div className="mt-2 text-xs text-muted-foreground">
                  <span className="font-medium">Anbieter:</span> Vercel Inc., San Francisco, USA ·
                  <span className="font-medium"> Datenbasis:</span> anonymisiert, keine Cookies, kein Cross-Site-Tracking
                </div>
              </div>
            </div>
          )}

          <p className="text-xs text-muted-foreground mb-4">
            Weitere Informationen in unserer{' '}
            <Link href="/datenschutz" className="text-primary underline hover:text-primary/80">Datenschutzerklärung</Link>
            {' '}und im{' '}
            <Link href="/impressum" className="text-primary underline hover:text-primary/80">Impressum</Link>.
          </p>

          {/* Buttons — gleichwertig gestaltet (DSGVO) */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={acceptEssential}
              className="flex-1 py-3 rounded-xl text-sm font-semibold border-2 border-border bg-card text-foreground hover:bg-secondary transition-colors"
            >
              Nur notwendige
            </button>
            <button
              onClick={acceptAll}
              className="flex-1 py-3 rounded-xl text-sm font-semibold border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Alle akzeptieren
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Settings modal: reopened via floating button
  if (showSettings) {
    return (
      <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-slide-up">
        <div className="w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl shadow-black/50 p-5 sm:p-6">
          <h3 className="text-base font-bold mb-3">Cookie-Einstellungen ändern</h3>

          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Du kannst deine Einwilligung jederzeit anpassen. Aktuell: <span className="font-semibold text-foreground">{consent === 'all' ? 'Alle Cookies' : 'Nur notwendige'}</span>.
          </p>

          <div className="mb-4 space-y-3 text-sm">
            <div className="p-3 bg-background rounded-xl border border-border">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Notwendig</span>
                <span className="text-xs text-primary font-semibold px-2 py-0.5 bg-primary/10 rounded-full">Immer aktiv</span>
              </div>
            </div>
            <div className="p-3 bg-background rounded-xl border border-border">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Analyse & Performance</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${consent === 'all' ? 'text-primary bg-primary/10' : 'text-muted-foreground bg-secondary'}`}>
                  {consent === 'all' ? 'Aktiv' : 'Deaktiviert'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={acceptEssential}
              className="flex-1 py-3 rounded-xl text-sm font-semibold border-2 border-border bg-card text-foreground hover:bg-secondary transition-colors"
            >
              Nur notwendige
            </button>
            <button
              onClick={acceptAll}
              className="flex-1 py-3 rounded-xl text-sm font-semibold border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Alle akzeptieren
            </button>
          </div>

          <button
            onClick={() => setShowSettings(false)}
            className="w-full mt-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Schließen
          </button>
        </div>
      </div>
    )
  }

  // Floating settings button (immer sichtbar nach Consent)
  return (
    <button
      onClick={openSettings}
      aria-label="Cookie-Einstellungen"
      className="fixed bottom-4 left-4 z-[150] w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
    >
      <Settings className="w-4 h-4" />
    </button>
  )
}

// ─── Conditional Analytics (nur bei Consent "all") ──────────────────────────

export function ConditionalAnalytics() {
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false)

  useEffect(() => {
    setAnalyticsAllowed(getConsent() === 'all')

    const interval = setInterval(() => {
      const current = getConsent() === 'all'
      setAnalyticsAllowed(prev => {
        if (prev !== current) return current
        return prev
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  if (!analyticsAllowed) return null

  return <AnalyticsLoader />
}

function AnalyticsLoader() {
  const [Components, setComponents] = useState<{
    Analytics: React.ComponentType
    SpeedInsights: React.ComponentType
  } | null>(null)

  useEffect(() => {
    Promise.all([
      import('@vercel/analytics/next'),
      import('@vercel/speed-insights/next'),
    ]).then(([analytics, speed]) => {
      setComponents({
        Analytics: analytics.Analytics,
        SpeedInsights: speed.SpeedInsights,
      })
    })
  }, [])

  if (!Components) return null

  return (
    <>
      <Components.Analytics />
      <Components.SpeedInsights />
    </>
  )
}
