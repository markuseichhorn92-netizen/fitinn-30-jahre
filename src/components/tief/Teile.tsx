'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { aktion, navigation } from '@/components/kampagne/inhalt'

// Die beweglichen Teile von Entwurf C.

/* ─── Navigation: eine schwebende Glaskapsel ──────────────────────────── */
export function Navigation() {
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
    <div style={{ position: 'fixed', insetInline: 0, top: 0, zIndex: 50, padding: 'clamp(12px,1.6vw,20px) clamp(14px,3vw,40px)', pointerEvents: 'none' }}>
      <header
        className="tc-glas"
        style={{
          pointerEvents: 'auto',
          maxWidth: 1320,
          margin: '0 auto',
          borderRadius: offen ? 22 : 999,
          padding: '.5rem .6rem .5rem 1.5rem',
          transition: 'border-radius .3s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', minHeight: 48 }}>
          <a href="#oben" className="tc-ziel" style={{ fontSize: 13.5, letterSpacing: '.24em', fontWeight: 700 }}>
            FIT-INN TRIER
          </a>

          <nav className="tc-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1.1rem,2vw,2.1rem)' }}>
            {navigation.map(n => (
              <a key={n.href} href={n.href} className="tc-ziel" style={{ fontSize: 15.5, color: 'var(--matt)' }}>
                {n.text}
              </a>
            ))}
            <a href="#termin" className="tc-knopf" style={{ fontSize: 15.5, minHeight: 44, padding: '.65em 1.45em' }}>
              Probetraining
            </a>
          </nav>

          <button
            type="button"
            className="tc-nav-schalter"
            onClick={() => setOffen(o => !o)}
            aria-expanded={offen}
            aria-controls="tc-menue"
            style={{
              display: 'none', alignItems: 'center', gap: '.6em', appearance: 'none',
              background: 'transparent', border: '1px solid var(--kante)', color: 'var(--hell)',
              font: 'inherit', fontSize: 15, minHeight: 44, padding: '0 1em', borderRadius: 999, cursor: 'pointer',
            }}
          >
            <svg width="17" height="13" viewBox="0 0 17 13" aria-hidden="true">
              <path
                d={offen ? 'M2 2 L15 11 M15 2 L2 11' : 'M0 1.5 H17 M0 6.5 H17 M0 11.5 H17'}
                stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
              />
            </svg>
            {offen ? 'Schließen' : 'Menü'}
          </button>
        </div>

        {offen && (
          <div id="tc-menue" className="tc-nav-menue" style={{ flexDirection: 'column', padding: '.6rem .9rem 1.1rem' }}>
            {navigation.map(n => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOffen(false)}
                style={{ fontSize: 20, padding: '.85em 0', borderBottom: '1px solid var(--kante)' }}
              >
                {n.text}
              </a>
            ))}
            <a href="#termin" onClick={() => setOffen(false)} className="tc-knopf" style={{ marginTop: '1.3rem' }}>
              Probetraining sichern
            </a>
            <a href={`tel:${aktion.telefon.link}`} className="tc-ziel" style={{ marginTop: '.9rem', color: 'var(--matt)' }}>
              oder anrufen: {aktion.telefon.anzeige}
            </a>
          </div>
        )}
      </header>
    </div>
  )
}

/* ─── Rundgang ────────────────────────────────────────────────────────── */
const EMBED =
  `https://www.youtube-nocookie.com/embed/${aktion.rundgangVideoId}` +
  `?autoplay=1&mute=1&loop=1&playlist=${aktion.rundgangVideoId}` +
  '&controls=0&modestbranding=1&playsinline=1&rel=0&disablekb=1&iv_load_policy=3&fs=0'

export function Video() {
  const feld = useRef<HTMLDivElement>(null)
  const [laden, setLaden] = useState(false)

  const sparsam = useSyncExternalStore(
    melden => {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      mq.addEventListener('change', melden)
      return () => mq.removeEventListener('change', melden)
    },
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  )

  useEffect(() => {
    if (sparsam) return
    const el = feld.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setLaden(true); io.disconnect() } },
      { rootMargin: '400px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [sparsam])

  return (
    <div ref={feld} style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: 'var(--tiefst)', overflow: 'hidden', borderRadius: 18 }}>
      {laden ? (
        <>
          <iframe
            src={EMBED}
            title="Rundgang durch das Fit-Inn Trier"
            allow="autoplay; encrypted-media; picture-in-picture"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
          />
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0 }} />
        </>
      ) : (
        <button
          type="button"
          onClick={() => setLaden(true)}
          aria-label="Rundgang abspielen"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', padding: 0, border: 0,
            cursor: sparsam ? 'pointer' : 'default',
            background: `var(--tiefst) center/cover no-repeat url(https://i.ytimg.com/vi/${aktion.rundgangVideoId}/maxresdefault.jpg)`,
          }}
        >
          {sparsam && (
            <span
              aria-hidden="true"
              style={{
                position: 'absolute', inset: '50% auto auto 50%', transform: 'translate(-50%,-50%)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 'clamp(64px,6vw,88px)', height: 'clamp(64px,6vw,88px)', borderRadius: '50%',
                background: 'var(--gold)',
              }}
            >
              <svg width="24" height="28" viewBox="0 0 24 28" fill="#041a19" aria-hidden="true">
                <path d="M0 0 L24 14 L0 28 Z" />
              </svg>
            </span>
          )}
        </button>
      )}
    </div>
  )
}
