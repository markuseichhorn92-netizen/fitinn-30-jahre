'use client'

import { EINSTELLUNGEN_EVENT } from '@/components/CookieBanner'

/** Öffnet die Cookie-Einstellungen – Ersatz für den schwebenden Knopf. */
export function CookieVerweis() {
  return (
    <button
      type="button"
      className="fi-fuss-knopf"
      onClick={() => window.dispatchEvent(new Event(EINSTELLUNGEN_EVENT))}
    >
      Cookie-Einstellungen
    </button>
  )
}
