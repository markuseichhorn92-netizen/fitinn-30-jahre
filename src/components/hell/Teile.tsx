'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { aktion, navigation } from '@/components/kampagne/inhalt'

// Die beweglichen Teile von Entwurf D.

/* ─── Navigation ──────────────────────────────────────────────────────── */
export function Navigation() {
  const [offen, setOffen] = useState(false)
  const [gescrollt, setGescrollt] = useState(false)

  useEffect(() => {
    // rAF-gedrosselt: ein Zustandswechsel, nicht einer pro Scrollereignis.
    let laeuft = false
    const beim = () => {
      if (laeuft) return
      laeuft = true
      requestAnimationFrame(() => { setGescrollt(window.scrollY > 16); laeuft = false })
    }
    window.addEventListener('scroll', beim, { passive: true })
    return () => window.removeEventListener('scroll', beim)
  }, [])

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
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(255,255,255,.86)',
        backdropFilter: 'blur(14px) saturate(160%)',
        WebkitBackdropFilter: 'blur(14px) saturate(160%)',
        borderBottom: `1px solid ${gescrollt || offen ? 'var(--linie)' : 'transparent'}`,
        transition: 'border-color .3s ease',
      }}
    >
      <div
        style={{
          maxWidth: 1240, margin: '0 auto', padding: 'clamp(10px,1.4vw,16px) clamp(20px,4vw,40px)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', minHeight: 62,
        }}
      >
        <a href="#oben" className="hl-ziel" style={{ fontFamily: 'var(--anzeige)', fontWeight: 700, fontSize: 19, letterSpacing: '-.03em' }}>
          Fit-Inn{' '}<span style={{ color: 'var(--blau)' }}>Trier</span>
        </a>

        <nav className="hl-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1rem,2vw,2rem)' }}>
          {navigation.map(n => (
            <a key={n.href} href={n.href} className="hl-ziel" style={{ fontSize: 16, color: 'var(--matt)', fontWeight: 500 }}>
              {n.text}
            </a>
          ))}
          <a href={`tel:${aktion.telefon.link}`} className="hl-knopf hl-knopf--rand" style={{ fontSize: 15.5, minHeight: 44, padding: '.6em 1.2em' }}>
            {aktion.telefon.anzeige}
          </a>
          <a href="#termin" className="hl-knopf" style={{ fontSize: 15.5, minHeight: 44, padding: '.6em 1.35em' }}>
            Probetraining
          </a>
        </nav>

        <button
          type="button"
          className="hl-nav-schalter"
          onClick={() => setOffen(o => !o)}
          aria-expanded={offen}
          aria-controls="hl-menue"
          style={{
            display: 'none', alignItems: 'center', gap: '.55em', appearance: 'none',
            background: 'var(--grund)', border: '1px solid var(--linie-2)', color: 'var(--tinte)',
            font: 'inherit', fontSize: 15, minHeight: 44, padding: '0 1em', borderRadius: 100, cursor: 'pointer',
          }}
        >
          <svg width="17" height="13" viewBox="0 0 17 13" aria-hidden="true">
            <path
              d={offen ? 'M2 2 L15 11 M15 2 L2 11' : 'M0 1.5 H17 M0 6.5 H17 M0 11.5 H17'}
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
            />
          </svg>
          {offen ? 'Schließen' : 'Menü'}
        </button>
      </div>

      {offen && (
        <div
          id="hl-menue"
          className="hl-nav-menue"
          style={{ flexDirection: 'column', padding: '0 clamp(20px,4vw,40px) 1.4rem', background: 'var(--grund)', borderTop: '1px solid var(--linie)' }}
        >
          {navigation.map(n => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOffen(false)}
              style={{ fontSize: 19, padding: '.9em 0', borderBottom: '1px solid var(--linie)', fontWeight: 500 }}
            >
              {n.text}
            </a>
          ))}
          <a href="#termin" onClick={() => setOffen(false)} className="hl-knopf" style={{ marginTop: '1.3rem' }}>
            Probetraining sichern
          </a>
          <a href={`tel:${aktion.telefon.link}`} className="hl-knopf hl-knopf--rand" style={{ marginTop: '.7rem' }}>
            Anrufen: {aktion.telefon.anzeige}
          </a>
        </div>
      )}
    </header>
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
    // Erst laden, wenn das Video in die Nähe kommt – sonst zieht jeder
    // Seitenaufruf am Handy unnötig Mobilfunkvolumen.
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setLaden(true); io.disconnect() } },
      { rootMargin: '400px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [sparsam])

  return (
    <div
      ref={feld}
      style={{
        position: 'relative', width: '100%', aspectRatio: '16/9', background: 'var(--grund-3)',
        overflow: 'hidden', borderRadius: 20, border: '1px solid var(--linie)',
      }}
    >
      {laden ? (
        <>
          <iframe
            src={EMBED}
            title="Rundgang durch das Fit-Inn Trier"
            allow="autoplay; encrypted-media; picture-in-picture"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
          />
          {/* Fängt Klicks ab, damit das Video beim Antippen nicht stehen bleibt. */}
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
            background: `var(--grund-3) center/cover no-repeat url(https://i.ytimg.com/vi/${aktion.rundgangVideoId}/maxresdefault.jpg)`,
          }}
        >
          {sparsam && (
            <span
              aria-hidden="true"
              style={{
                position: 'absolute', inset: '50% auto auto 50%', transform: 'translate(-50%,-50%)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 'clamp(64px,6vw,86px)', height: 'clamp(64px,6vw,86px)', borderRadius: '50%',
                background: 'var(--blau)',
              }}
            >
              <svg width="22" height="26" viewBox="0 0 24 28" fill="#fff" aria-hidden="true">
                <path d="M0 0 L24 14 L0 28 Z" />
              </svg>
            </span>
          )}
        </button>
      )}
    </div>
  )
}
