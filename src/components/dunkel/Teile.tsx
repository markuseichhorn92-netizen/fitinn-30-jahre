'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { aktion, navigation } from '@/components/kampagne/inhalt'

// Die beweglichen Teile von Entwurf A. Alles andere ist statisch gerendert.

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
      requestAnimationFrame(() => {
        setGescrollt(window.scrollY > 24)
        laeuft = false
      })
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
        position: 'fixed',
        insetInline: 0,
        top: 0,
        zIndex: 50,
        background: gescrollt || offen ? 'rgba(12,13,15,.88)' : 'transparent',
        backdropFilter: gescrollt || offen ? 'blur(14px) saturate(160%)' : 'none',
        WebkitBackdropFilter: gescrollt || offen ? 'blur(14px) saturate(160%)' : 'none',
        borderBottom: `1px solid ${gescrollt || offen ? 'var(--linie)' : 'transparent'}`,
        transition: 'background .4s ease, border-color .4s ease',
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: '0 auto',
          padding: 'clamp(14px,1.8vw,22px) clamp(20px,4vw,64px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem',
          minHeight: 64,
        }}
      >
        <a href="#oben" className="dk-marke dk-ziel">Fit-Inn Trier</a>

        <nav className="dk-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1.2rem,2.2vw,2.4rem)' }}>
          {navigation.map(n => (
            <a key={n.href} href={n.href} className="dk-ziel" style={{ fontSize: 15.5, color: 'var(--matt)' }}>
              {n.text}
            </a>
          ))}
          <a href="#termin" className="dk-knopf dk-knopf--hell" style={{ fontSize: 15.5, minHeight: 44, padding: '.65em 1.35em' }}>
            Probetraining
          </a>
        </nav>

        <button
          type="button"
          className="dk-nav-schalter"
          onClick={() => setOffen(o => !o)}
          aria-expanded={offen}
          aria-controls="dk-menue"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '.6em',
            appearance: 'none',
            background: 'transparent',
            border: '1px solid var(--linie-stark)',
            color: 'var(--hell)',
            font: 'inherit',
            fontSize: 15,
            minHeight: 44,
            padding: '0 .95em',
            borderRadius: 2,
            cursor: 'pointer',
          }}
        >
          <svg width="17" height="13" viewBox="0 0 17 13" aria-hidden="true">
            <path
              d={offen ? 'M2 2 L15 11 M15 2 L2 11' : 'M0 1.5 H17 M0 6.5 H17 M0 11.5 H17'}
              stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
            />
          </svg>
          {offen ? 'Schließen' : 'Menü'}
        </button>
      </div>

      {offen && (
        <div
          id="dk-menue"
          className="dk-nav-menue"
          style={{ flexDirection: 'column', padding: '0 clamp(20px,4vw,64px) 1.6rem' }}
        >
          {navigation.map(n => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOffen(false)}
              style={{ fontSize: 20, padding: '.9em 0', borderBottom: '1px solid var(--linie)' }}
            >
              {n.text}
            </a>
          ))}
          <a href="#termin" onClick={() => setOffen(false)} className="dk-knopf" style={{ marginTop: '1.4rem' }}>
            Probetraining sichern
          </a>
          <a href={`tel:${aktion.telefon.link}`} className="dk-ziel" style={{ marginTop: '1rem', color: 'var(--matt)' }}>
            oder anrufen: {aktion.telefon.anzeige}
          </a>
        </div>
      )}
    </header>
  )
}

/* ─── Lichtkante ──────────────────────────────────────────────────────── */
// Die eine gestaltete Bewegung: Beim Erreichen eines Abschnitts läuft eine
// schmale Leuchtlinie an seinem oberen Rand entlang. Inhalte werden nie
// versteckt – ohne Skript fehlt nur die Linie, nicht der Text.
export function Lichtkante() {
  useEffect(() => {
    const ziele = document.querySelectorAll('.dk .dk-lichtkante')
    if (!ziele.length) return
    const io = new IntersectionObserver(
      eintraege => {
        for (const e of eintraege) {
          if (!e.isIntersecting) continue
          e.target.classList.add('ist-da')
          io.unobserve(e.target)
        }
      },
      { threshold: 0, rootMargin: '0px 0px -12% 0px' },
    )
    ziele.forEach(z => io.observe(z))
    return () => io.disconnect()
  }, [])
  return null
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
      style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000', overflow: 'hidden' }}
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
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            padding: 0,
            border: 0,
            cursor: sparsam ? 'pointer' : 'default',
            background: `#000 center/cover no-repeat url(https://i.ytimg.com/vi/${aktion.rundgangVideoId}/maxresdefault.jpg)`,
          }}
        >
          {sparsam && (
            <span
              aria-hidden="true"
              style={{
                position: 'absolute', inset: '50% auto auto 50%', transform: 'translate(-50%,-50%)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 'clamp(64px,6vw,88px)', height: 'clamp(64px,6vw,88px)',
                borderRadius: '50%', background: 'var(--glut)',
              }}
            >
              <svg width="24" height="28" viewBox="0 0 24 28" fill="#0c0d0f" aria-hidden="true">
                <path d="M0 0 L24 14 L0 28 Z" />
              </svg>
            </span>
          )}
        </button>
      )}
    </div>
  )
}
