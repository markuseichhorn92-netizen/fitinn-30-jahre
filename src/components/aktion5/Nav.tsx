'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const links = [
  { href: '#warum', label: 'Warum' },
  { href: '#studio', label: 'Studio' },
  { href: '#angebot', label: 'Angebot' },
  { href: '#app', label: 'App' },
  { href: '#ablauf', label: 'Ablauf' },
  { href: '#fragen', label: 'Fragen' },
]

// Sticky-Navigation: transparent über dem Hero, ab 90px Scroll dunkel mit Blur.
// Unter 820px weicht die Linkleiste einem Menü – der Entwurf blendet sie dort
// ersatzlos aus, womit auf dem Handy kein Weg zu den Abschnitten bliebe.
export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [offen, setOffen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 90)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Bei offenem Menü nicht im Hintergrund scrollen.
  useEffect(() => {
    document.body.style.overflow = offen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [offen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOffen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const dunkel = scrolled || offen

  return (
    <nav
      className="pnav"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background .4s,backdrop-filter .4s,border-color .4s',
        borderBottom: `1px solid ${dunkel ? 'var(--line-dark)' : 'transparent'}`,
        background: dunkel ? 'rgba(4,22,27,.82)' : 'transparent',
        backdropFilter: dunkel ? 'saturate(180%) blur(18px)' : undefined,
        WebkitBackdropFilter: dunkel ? 'saturate(180%) blur(18px)' : undefined,
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: '0 clamp(20px,5vw,60px)',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(1.2rem,3vw,2.4rem)',
        }}
      >
        <a
          href="#"
          aria-label="Zum Seitenanfang"
          style={{ marginRight: 'auto', display: 'inline-flex', alignItems: 'center', height: 46 }}
        >
          <Image
            src="/aktion5/logo-white.png"
            alt="Fit-Inn Trier"
            width={140}
            height={26}
            priority
            style={{ height: 26, width: 'auto' }}
          />
        </a>

        <div
          className="pnav-links"
          style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1.1rem,2.4vw,2rem)' }}
        >
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              style={{
                color: '#fff',
                textDecoration: 'none',
                fontSize: 16,
                fontWeight: 500,
                whiteSpace: 'nowrap',
              }}
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#termin"
          onClick={() => setOffen(false)}
          style={{
            background: 'var(--amber)',
            color: '#04161b',
            fontSize: 16,
            fontWeight: 700,
            padding: '.62em 1.35em',
            borderRadius: 999,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Probetraining
        </a>

        {/* Menütaste – nur unterhalb von 820px sichtbar (siehe premium.css) */}
        <button
          type="button"
          className="pnav-toggle"
          aria-expanded={offen}
          aria-controls="pnav-menue"
          aria-label={offen ? 'Menü schließen' : 'Menü öffnen'}
          onClick={() => setOffen(o => !o)}
          style={{
            appearance: 'none',
            border: '1px solid var(--line-dark)',
            background: 'transparent',
            borderRadius: 12,
            width: 46,
            height: 46,
            flex: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#fff',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {offen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
          </svg>
        </button>
      </div>

      {offen && (
        <div
          id="pnav-menue"
          className="pnav-menue"
          style={{
            borderTop: '1px solid var(--line-dark)',
            padding: '.6rem clamp(20px,5vw,60px) 1.4rem',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOffen(false)}
              style={{
                color: '#fff',
                textDecoration: 'none',
                fontSize: 19,
                fontWeight: 500,
                padding: '.85em 0',
                borderBottom: '1px solid var(--line-dark)',
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href={`tel:+49651308524`}
            onClick={() => setOffen(false)}
            style={{ color: 'rgba(255,255,255,.7)', textDecoration: 'none', fontSize: 17, padding: '1em 0 0' }}
          >
            0651 30 85 24
          </a>
        </div>
      )}
    </nav>
  )
}
