'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { studio, telLink } from './studio'
import { Anruf, Pfeil } from './Teile'

export type NavPunkt = { href: string; text: string }

// Schmale weiße Kopfzeile: Logo links, dezente Navigation, rechteckige
// Hauptaktion rechts. Klebt beim Scrollen mit einer feinen Unterkante.
// Unter 1000 px weicht die Navigation einem Menü.
export function Kopf({
  nav,
  aktion,
}: {
  nav: NavPunkt[]
  aktion: { href: string; lang: string; kurz: string; cta?: string }
}) {
  const [offen, setOffen] = useState(false)
  const schalter = useRef<HTMLButtonElement>(null)

  // Escape schließt das Menü und gibt den Fokus an den Menüknopf zurück.
  useEffect(() => {
    if (!offen) return
    const taste = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOffen(false)
      schalter.current?.focus()
    }
    window.addEventListener('keydown', taste)
    return () => window.removeEventListener('keydown', taste)
  }, [offen])

  return (
    <header className="fi-kopf">
      <div className="fi-satz fi-kopf-innen">
        <a href="#inhalt" className="fi-kopf-logo" aria-label="Fit-Inn Trier – zum Seitenanfang">
          <Image src="/logo.png" alt="" width={149} height={24} priority />
        </a>

        <nav className="fi-kopf-nav" aria-label="Seitenbereiche">
          <ul>
            {nav.map(p => (
              <li key={p.href}><a href={p.href}>{p.text}</a></li>
            ))}
          </ul>
        </nav>

        <a href={telLink} data-kontakt="telefon" className="fi-kopf-tel">{studio.telefon.anzeige}</a>

        <a href={aktion.href} data-cta={aktion.cta} className="fi-knopf fi-knopf--orange">
          <span className="fi-kopf-knopf-lang">{aktion.lang}</span>
          <span className="fi-kopf-knopf-kurz">{aktion.kurz}</span>
          <Pfeil />
        </a>

        <button
          ref={schalter}
          type="button"
          className="fi-menue-schalter"
          aria-expanded={offen}
          aria-controls="fi-menue"
          onClick={() => setOffen(o => !o)}
        >
          <span className="sr-only">{offen ? 'Menü schließen' : 'Menü öffnen'}</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {offen
              ? <path d="M4 4l12 12M16 4 4 16" stroke="currentColor" strokeWidth="1.8" />
              : <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="1.8" />}
          </svg>
        </button>
      </div>

      {/* Immer im DOM, damit aria-controls gültig bleibt; [hidden] blendet aus. */}
      <nav id="fi-menue" className="fi-menue" aria-label="Seitenbereiche (Menü)" hidden={!offen}>
        <div className="fi-satz">
          <ul>
            {nav.map(p => (
              <li key={p.href}><a href={p.href} onClick={() => setOffen(false)}>{p.text}</a></li>
            ))}
          </ul>
          <Anruf vorsatz="Anrufen:" />
        </div>
      </nav>
    </header>
  )
}
