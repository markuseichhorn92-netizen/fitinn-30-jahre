'use client'

import { useState, useEffect, useCallback, useRef, useSyncExternalStore } from 'react'
import { usePathname } from 'next/navigation'
import { Settings, ChevronDown, ChevronUp } from 'lucide-react'

// ─── Consent Storage ────────────────────────────────────────────────────────

const CONSENT_KEY = 'cookie-consent'
const CONSENT_DATE_KEY = 'cookie-consent-date'

type ConsentValue = 'all' | 'essential' | null

// Verbraucher der Einwilligung (Analytics, Google-Tag) hören auf dieses
// Ereignis. Vorher fragten sie im Sekundentakt den localStorage ab – das kostet
// auf dem Handy dauerhaft Rechenzeit und Akku, ohne je etwas zu erfahren.
export const CONSENT_EVENT = 'fitinn:cookie-consent'

// Öffnet die Einstellungen von außen, z. B. über einen Verweis im Fuß.
export const EINSTELLUNGEN_EVENT = 'fitinn:cookie-einstellungen'

// Routen, die „Cookie-Einstellungen“ im Fuß anbieten. Dort entfällt der
// schwebende Knopf unten links – er läge sonst über Inhalten und Aktionen.
const OHNE_SCHWEBEKNOPF = ['/']

function saveConsent(value: 'all' | 'essential') {
  localStorage.setItem(CONSENT_KEY, value)
  localStorage.setItem(CONSENT_DATE_KEY, new Date().toISOString())
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }))
}

/** Aktueller Stand der Einwilligung, auch für andere Komponenten. */
export function analyticsErlaubt(): boolean {
  return typeof window !== 'undefined' && localStorage.getItem(CONSENT_KEY) === 'all'
}

function getConsent(): ConsentValue {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(CONSENT_KEY)
  return stored === 'all' || stored === 'essential' ? stored : null
}

// ─── Cookie-Banner ──────────────────────────────────────────────────────────

// Einwilligung als externer Zustand: gelesen aus dem localStorage, neu gelesen
// bei CONSENT_EVENT und bei Änderungen in einem zweiten Tab. Auf dem Server
// (und beim Hydrieren) gilt `undefined` – dann rendert der Banner nichts.
function abonnieren(neuLesen: () => void) {
  window.addEventListener(CONSENT_EVENT, neuLesen)
  window.addEventListener('storage', neuLesen)
  return () => {
    window.removeEventListener(CONSENT_EVENT, neuLesen)
    window.removeEventListener('storage', neuLesen)
  }
}

const KNOPF =
  'flex-1 min-h-[48px] px-4 text-[16px] font-bold border-2 border-[#183240] rounded-none ' +
  'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0a4958]'
const KNOPF_LEER = `${KNOPF} bg-white text-[#14252d] hover:bg-[#f2f6f7]`
const KNOPF_VOLL = `${KNOPF} bg-[#183240] text-white hover:bg-[#14252d]`
const VERWEIS =
  'underline underline-offset-2 text-[#0a4958] hover:text-[#14252d] ' +
  'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0a4958]'
const MARKE = 'shrink-0 text-[13px] font-semibold px-2 py-0.5 border border-[#7c8d93] text-[#14252d]'

/** Die beiden Kategorien – im Banner (aufklappbar) und im Einstellungsdialog. */
function Kategorien({ analyseAktiv }: { analyseAktiv?: boolean }) {
  return (
    <div className="space-y-3 text-[16px] leading-relaxed">
      <div className="p-3 border border-[#dfe5e7]">
        <div className="flex items-center justify-between gap-3 mb-1">
          <span className="font-bold">Notwendig</span>
          <span className={MARKE}>Immer aktiv</span>
        </div>
        <p className="text-[#46555c]">
          Speichert deine Cookie-Auswahl (cookie-consent im localStorage, 1 Jahr). Kein Tracking, keine Weitergabe
          an Dritte.
        </p>
      </div>
      <div className="p-3 border border-[#dfe5e7]">
        <div className="flex items-center justify-between gap-3 mb-1">
          <span className="font-bold">Analyse &amp; Performance</span>
          <span className={MARKE}>
            {analyseAktiv === undefined ? 'Optional' : analyseAktiv ? 'Aktiv' : 'Deaktiviert'}
          </span>
        </div>
        <p className="text-[#46555c]">
          <strong className="text-[#14252d]">Google Analytics 4</strong> (Google Ireland Ltd.): misst, wie die
          Website genutzt wird und welche Anzeigen zu Probetrainings führen. Cookies _ga und _ga_*, Speicherdauer
          bis 2 Jahre; eine Übermittlung in die USA ist möglich.
        </p>
        <p className="text-[#46555c] mt-2">
          <strong className="text-[#14252d]">Vercel Web Analytics und Speed Insights</strong> (Vercel Inc., USA):
          erweiterte Reichweiten- und Ladezeitmessung, nach Angaben des Anbieters ohne Cookies.
        </p>
      </div>
    </div>
  )
}

export function CookieBanner() {
  const consent = useSyncExternalStore(abonnieren, getConsent, () => undefined)
  const [showDetails, setShowDetails] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const pfad = usePathname()

  useEffect(() => {
    const oeffnen = () => setShowSettings(true)
    window.addEventListener(EINSTELLUNGEN_EVENT, oeffnen)
    return () => window.removeEventListener(EINSTELLUNGEN_EVENT, oeffnen)
  }, [])

  // Der Einstellungsdialog ist ein natives <dialog>: showModal() bringt
  // Fokusfalle, Escape und einen inerten Hintergrund mit und gibt den Fokus
  // beim Schließen an den Auslöser zurück.
  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (showSettings && !d.open) d.showModal()
    if (!showSettings && d.open) d.close()
  }, [showSettings])

  const acceptAll = useCallback(() => {
    saveConsent('all')
    setShowSettings(false)
  }, [])

  const acceptEssential = useCallback(() => {
    saveConsent('essential')
    setShowSettings(false)
  }, [])

  if (consent === undefined) return null

  const einstellungen = (
    <dialog
      ref={dialog}
      aria-labelledby="cookie-dialog-titel"
      onClose={() => setShowSettings(false)}
      className="m-auto w-[min(36rem,calc(100%-2rem))] max-h-[calc(100dvh-2rem)] overflow-y-auto p-5 sm:p-6 bg-white text-[#14252d] border border-[#dfe5e7] border-t-4 border-t-[#ffb54f] rounded-none backdrop:bg-[#14252d]/70"
    >
      <h2 id="cookie-dialog-titel" className="text-[20px] font-bold normal-case tracking-normal mb-3" style={{ fontFamily: 'inherit', textTransform: 'none', letterSpacing: 'normal' }}>
        Cookie-Einstellungen ändern
      </h2>
      <p className="text-[17px] leading-relaxed text-[#46555c] mb-4">
        Du kannst deine Einwilligung jederzeit anpassen. Aktuell:{' '}
        <strong className="text-[#14252d]">{consent === 'all' ? 'Alle Cookies' : 'Nur notwendige'}</strong>.
      </p>
      <Kategorien analyseAktiv={consent === 'all'} />
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-5">
        <button type="button" onClick={acceptEssential} className={KNOPF_LEER}>Nur notwendige</button>
        <button type="button" onClick={acceptAll} className={KNOPF_VOLL}>Alle akzeptieren</button>
      </div>
      <button
        type="button"
        onClick={() => setShowSettings(false)}
        className={`w-full mt-2 min-h-[44px] text-[16px] text-[#46555c] hover:text-[#14252d] ${VERWEIS} no-underline`}
      >
        Schließen
      </button>
    </dialog>
  )

  // Banner, solange noch keine Einwilligung vorliegt. Als Region benannt und
  // im Layout vor dem Seiteninhalt eingehängt – damit steht er in der
  // Tab-Folge vorn und nicht erst nach allen Seitenlinks.
  if (consent === null) {
    return (
      <>
        <section
          aria-labelledby="cookie-titel"
          className="fixed bottom-0 left-0 right-0 z-[200] p-3 sm:p-6 animate-slide-up"
        >
          <div className="max-w-xl mx-auto max-h-[calc(100dvh-1.5rem)] overflow-y-auto overscroll-contain bg-white text-[#14252d] border border-[#dfe5e7] border-t-4 border-t-[#ffb54f] shadow-[0_8px_24px_rgba(20,37,45,.14)] p-5 sm:p-6">
            <h2 id="cookie-titel" className="text-[20px] font-bold normal-case tracking-normal mb-2" style={{ fontFamily: 'inherit', textTransform: 'none', letterSpacing: 'normal' }}>
              Cookie-Einstellungen
            </h2>
            <p className="text-[17px] leading-relaxed text-[#46555c] mb-3">
              Notwendige Cookies brauchen wir für den Betrieb der Website. Mit deiner Einwilligung messen wir
              zusätzlich mit Google Analytics 4 und Vercel, wie die Website genutzt wird und welche Anzeigen zu
              Probetrainings führen.
            </p>

            <button
              type="button"
              onClick={() => setShowDetails(d => !d)}
              aria-expanded={showDetails}
              aria-controls="cookie-details"
              className={`flex items-center gap-1.5 min-h-[44px] text-[16px] font-semibold ${VERWEIS} no-underline hover:underline`}
            >
              Details {showDetails ? 'ausblenden' : 'anzeigen'}
              {showDetails ? <ChevronUp className="w-4 h-4" aria-hidden="true" /> : <ChevronDown className="w-4 h-4" aria-hidden="true" />}
            </button>

            <div id="cookie-details" hidden={!showDetails} className="mb-4">
              <Kategorien />
            </div>

            <p className="text-[15px] text-[#46555c] mb-4">
              Mehr dazu in unserer{' '}
              <a href="/datenschutz" className={VERWEIS}>Datenschutzerklärung</a>
              {' '}und im{' '}
              <a href="/impressum" className={VERWEIS}>Impressum</a>.
            </p>

            {/* Buttons — gleichwertig gestaltet (DSGVO) */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button type="button" onClick={acceptEssential} className={KNOPF_LEER}>Nur notwendige</button>
              <button type="button" onClick={acceptAll} className={KNOPF_VOLL}>Alle akzeptieren</button>
            </div>
          </div>
        </section>
        {einstellungen}
      </>
    )
  }

  // Nach der Einwilligung: schwebender Knopf zum Ändern – außer auf Routen,
  // die den Verweis „Cookie-Einstellungen“ im Fuß tragen.
  return (
    <>
      {!OHNE_SCHWEBEKNOPF.includes(pfad ?? '') && (
        <button
          type="button"
          onClick={() => setShowSettings(true)}
          aria-label="Cookie-Einstellungen"
          className="fixed bottom-4 left-4 z-[150] w-11 h-11 rounded-none bg-white border border-[#7c8d93] flex items-center justify-center text-[#46555c] hover:text-[#14252d] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0a4958]"
        >
          <Settings className="w-4 h-4" aria-hidden="true" />
        </button>
      )}
      {einstellungen}
    </>
  )
}

// ─── Conditional Analytics (nur bei Consent "all") ──────────────────────────

export function ConditionalAnalytics() {
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false)

  useEffect(() => {
    const lesen = () => setAnalyticsAllowed(getConsent() === 'all')
    lesen()
    window.addEventListener(CONSENT_EVENT, lesen)
    // Deckt auch den Fall ab, dass in einem zweiten Tab zugestimmt wurde.
    window.addEventListener('storage', lesen)
    return () => {
      window.removeEventListener(CONSENT_EVENT, lesen)
      window.removeEventListener('storage', lesen)
    }
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
