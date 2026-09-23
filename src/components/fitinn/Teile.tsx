import type { ReactNode } from 'react'
import { studio, telLink } from './studio'

// Kleine Bausteine des Fit-Inn-Designsystems.

// ─── Symbole (inline SVG, keine Symbolbibliothek) ────────────────────────

export function Pfeil({ groesse = 16 }: { groesse?: number }) {
  return (
    <svg width={groesse} height={groesse} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
    </svg>
  )
}

export function Haken({ groesse = 16 }: { groesse?: number }) {
  return (
    <svg width={groesse} height={groesse} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m2.5 8.5 3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  )
}

export function Telefon({ groesse = 16 }: { groesse?: number }) {
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

// ─── Schaltflächen ───────────────────────────────────────────────────────

type Stil = 'orange' | 'dunkel' | 'linie' | 'linie-hell'

/** Rechteckige Schaltfläche als Verweis, mit kleinem Pfeil. */
export function Knopf({
  href,
  stil = 'orange',
  children,
  pfeil = true,
  cta,
  className = '',
  tabIndex,
}: {
  href: string
  stil?: Stil
  children: ReactNode
  pfeil?: boolean
  /** Kennzeichnung für die spätere Auswertung (data-cta). */
  cta?: string
  className?: string
  tabIndex?: number
}) {
  return (
    <a href={href} data-cta={cta} className={`fi-knopf fi-knopf--${stil} ${className}`.trim()} tabIndex={tabIndex}>
      {children}
      {pfeil && <Pfeil />}
    </a>
  )
}

/** Anruf als Textverweis. */
export function Anruf({ vorsatz = 'Oder anrufen:', mono = false }: { vorsatz?: string; mono?: boolean }) {
  return (
    <a href={telLink} data-kontakt="telefon" className={`fi-verweis${mono ? ' fi-verweis--mono' : ''}`}>
      <Telefon />
      <span>
        {vorsatz} {studio.telefon.anzeige}
      </span>
    </a>
  )
}

// ─── Abschnittslabel ─────────────────────────────────────────────────────

/** Kleines technisches Label: „01 —— Bezeichnung“. */
export function Label({ nr, children }: { nr?: string; children: ReactNode }) {
  return (
    <p className="fi-label">
      {nr && <span className="fi-label-nr">{nr}</span>}
      {nr && <span className="fi-label-strich" aria-hidden="true" />}
      <span>{children}</span>
    </p>
  )
}

/** Überschrift mit bewusst gesetzten Zeilen. `betont` färbt einzelne Zeilen. */
export function Zeilen({ zeilen, betont = [] }: { zeilen: readonly string[]; betont?: readonly number[] }) {
  return (
    <>
      {zeilen.map((z, i) => (
        <span key={z} className={`fi-zeile${betont.includes(i) ? ' fi-betont' : ''}`}>
          {z}{i < zeilen.length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  )
}

// ─── Platzhalter ─────────────────────────────────────────────────────────

/** Deutlich gekennzeichneter Platzhalter für ein Foto, das noch fehlt. */
export function FotoPlatzhalter({
  motiv,
  alt,
  seitenverhaeltnis,
}: {
  motiv: string
  alt: string
  seitenverhaeltnis: string
}) {
  return (
    <div
      role="img"
      aria-label={`Bildplatzhalter: ${alt}`}
      data-platzhalter="bild"
      className="fi-platzhalter"
      style={{ aspectRatio: seitenverhaeltnis }}
    >
      <span className="fi-platzhalter-marke" aria-hidden="true">Foto folgt</span>
      <p aria-hidden="true">{motiv}</p>
    </div>
  )
}
