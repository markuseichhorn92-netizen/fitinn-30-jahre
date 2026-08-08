'use client'

import { useEffect, useState } from 'react'
import { aktion } from './inhalt'
import { satz, schluessel } from './teile'

// Die Kopfleiste ist die Montageschiene, an der die Tafelreihe hängt: eine
// dunkle Leiste über dem Blau, mit dem Namen der Reihe links und der Handlung
// rechts. Kein Logo-plus-Links-Baukasten.

const punkte = [
  { href: '#geraet', text: 'Das Gerät' },
  { href: '#angebot', text: 'Die Rechnung' },
  { href: '#haus', text: 'Das Haus' },
  { href: '#fragen', text: 'Fragen' },
]

export function Kopfleiste() {
  const [offen, setOffen] = useState(false)

  useEffect(() => {
    if (!offen) return
    const zu = (e: KeyboardEvent) => { if (e.key === 'Escape') setOffen(false) }
    document.addEventListener('keydown', zu)
    const vorher = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', zu)
      document.body.style.overflow = vorher
    }
  }, [offen])

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'var(--blau-tief)',
        borderBottom: '1px solid rgba(237,229,214,.16)',
      }}
    >
      <div
        style={{
          ...satz,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          minHeight: 62,
        }}
      >
        <a
          href="#geraet"
          className="tf-ziel"
          style={{ ...schluessel, textDecoration: 'none', color: 'var(--knochen)', letterSpacing: '.1em' }}
        >
          Fit-Inn Trier <span style={{ color: 'var(--chrom)' }}>· Lehrtafeln</span>
        </a>

        <nav className="tf-kopf-links" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1rem,2.2vw,2rem)' }}>
          {punkte.map(p => (
            <a
              key={p.href}
              href={p.href}
              className="tf-ziel"
              style={{ fontSize: 16, color: 'var(--matt-blau)', textDecoration: 'none' }}
            >
              {p.text}
            </a>
          ))}
          <a href="#termin" className="tf-knopf tf-knopf--chrom" style={{ fontSize: 16.5, minHeight: 44, padding: '.6em 1.2em' }}>
            Probetraining
          </a>
        </nav>

        <button
          type="button"
          className="tf-kopf-schalter"
          onClick={() => setOffen(o => !o)}
          aria-expanded={offen}
          aria-controls="tf-menue"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '.6em',
            appearance: 'none',
            background: 'transparent',
            border: '1px solid rgba(237,229,214,.35)',
            color: 'var(--knochen)',
            font: 'inherit',
            fontSize: 15.5,
            minHeight: 44,
            padding: '0 .9em',
            borderRadius: 2,
            cursor: 'pointer',
          }}
        >
          <svg width="17" height="13" viewBox="0 0 17 13" aria-hidden="true">
            <path
              d={offen ? 'M2 2 L15 11 M15 2 L2 11' : 'M0 1.5 H17 M0 6.5 H17 M0 11.5 H17'}
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          {offen ? 'Schließen' : 'Menü'}
        </button>
      </div>

      {offen && (
        <div
          id="tf-menue"
          className="tf-kopf-menue"
          style={{
            flexDirection: 'column',
            gap: 0,
            background: 'var(--blau-tief)',
            borderTop: '1px solid rgba(237,229,214,.16)',
            padding: '0 clamp(16px,4vw,44px) 1.4rem',
          }}
        >
          {punkte.map(p => (
            <a
              key={p.href}
              href={p.href}
              onClick={() => setOffen(false)}
              style={{
                fontSize: 19,
                color: 'var(--knochen)',
                textDecoration: 'none',
                padding: '.85em 0',
                borderBottom: '1px solid rgba(237,229,214,.14)',
              }}
            >
              {p.text}
            </a>
          ))}
          <a
            href="#termin"
            onClick={() => setOffen(false)}
            className="tf-knopf tf-knopf--chrom"
            style={{ marginTop: '1.2rem' }}
          >
            Probetraining wählen
          </a>
          <a
            href={`tel:${aktion.telefon.link}`}
            className="tf-ziel"
            style={{ marginTop: '.9rem', fontSize: 17, color: 'var(--matt-blau)', textDecoration: 'none' }}
          >
            oder anrufen: {aktion.telefon.anzeige}
          </a>
        </div>
      )}
    </header>
  )
}
