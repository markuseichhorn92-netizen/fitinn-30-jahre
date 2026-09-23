import type { ReactNode } from 'react'
import { kontakt, type CtaId } from './inhalt'

// Kleine Bausteine, die mehrere Sektionen teilen.

// ─── Symbole (inline, damit keine Symbolbibliothek mitgeladen wird) ──────────

export function Haken({ groesse = 20 }: { groesse?: number }) {
  return (
    <svg width={groesse} height={groesse} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" opacity=".45" />
      <path d="m7.5 12.3 3 3 6-6.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Telefon({ groesse = 20 }: { groesse?: number }) {
  return (
    <svg width={groesse} height={groesse} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5.2 3.5h3.1l1.6 4-2 1.3a11 11 0 0 0 5.3 5.3l1.3-2 4 1.6v3.1a2 2 0 0 1-2.1 2A16.6 16.6 0 0 1 3.2 5.6a2 2 0 0 1 2-2.1Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Pfeil({ groesse = 20 }: { groesse?: number }) {
  return (
    <svg width={groesse} height={groesse} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Brief({ groesse = 20 }: { groesse?: number }) {
  return (
    <svg width={groesse} height={groesse} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}

export function Ort({ groesse = 20 }: { groesse?: number }) {
  return (
    <svg width={groesse} height={groesse} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.8 12 21 12 21Z" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

function Kamera() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 8h3l1.5-2h7L17 8h3v11H4V8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

// ─── Schaltflächen ───────────────────────────────────────────────────────────

type Stil = 'kupfer' | 'bernstein' | 'linie' | 'linie-hell'

/**
 * Hauptschaltfläche. Zeigt vorerst auf #anfrage – dort wird im nächsten
 * Schritt die Anfragestrecke angebunden. `data-cta` hält fest, welche Option
 * gewählt wurde (oktober-allgemein, oktober-52, oktober-104).
 */
export function CtaKnopf({
  cta,
  stil = 'kupfer',
  children,
  className = '',
  tabIndex,
}: {
  cta: CtaId
  stil?: Stil
  children: ReactNode
  className?: string
  tabIndex?: number
}) {
  return (
    <a
      href="#anfrage"
      data-cta={cta}
      className={`knopf knopf-${stil} ${className}`.trim()}
      tabIndex={tabIndex}
    >
      {children}
      <Pfeil />
    </a>
  )
}

/** Anruf als vollwertige Schaltfläche. */
export function AnrufKnopf({ stil = 'linie', text }: { stil?: Stil; text?: string }) {
  return (
    <a href={`tel:${kontakt.telefon.link}`} data-kontakt="telefon" className={`knopf knopf-${stil}`}>
      <Telefon />
      {text ?? kontakt.telefon.anzeige}
    </a>
  )
}

/** Anruf als Textverweis, z. B. neben einer Hauptschaltfläche. */
export function AnrufVerweis({ vorsatz = 'Lieber anrufen:' }: { vorsatz?: string }) {
  return (
    <a href={`tel:${kontakt.telefon.link}`} data-kontakt="telefon" className="anruf">
      <Telefon />
      <span>
        {vorsatz} {kontakt.telefon.anzeige}
      </span>
    </a>
  )
}

// ─── Bildplatzhalter ─────────────────────────────────────────────────────────

/**
 * Deutlich beschrifteter Platzhalter für ein Foto, das noch aufgenommen wird.
 * Motiv, Format und der spätere Alt-Text stehen in inhalt.ts – beim Tausch
 * gegen <Image> einfach `alt` übernehmen.
 */
export function Platzhalter({
  motiv,
  format,
  alt,
  seitenverhaeltnis,
  className = '',
}: {
  motiv: string
  format: string
  alt: string
  seitenverhaeltnis: string
  className?: string
}) {
  return (
    <div
      role="img"
      aria-label={`Bildplatzhalter: ${alt}`}
      data-platzhalter="bild"
      className={`platzhalter ${className}`.trim()}
      style={{ aspectRatio: seitenverhaeltnis }}
    >
      <span className="platzhalter-symbol"><Kamera /></span>
      <span className="platzhalter-marke" aria-hidden="true">Foto folgt</span>
      <span className="platzhalter-motiv" aria-hidden="true">{motiv}</span>
      <span className="platzhalter-format" aria-hidden="true">{format}</span>
    </div>
  )
}
