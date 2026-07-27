'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { aktion } from './content'
import { Glow } from './Decor'
import { Play } from './icons'
import { btnAmberSm, eyebrowAmber, wrap } from './styles'

const VIDEO_ID = aktion.rundgangVideoId
const POSTER = `https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`

// Startet stumm von selbst und läuft in Schleife: keine Steuerleiste, kein
// Play-/Pause-Knopf. Eine transparente Ebene über dem Player fängt Klicks ab,
// damit das Video auch durch Antippen nicht pausiert.
const EMBED =
  `https://www.youtube-nocookie.com/embed/${VIDEO_ID}` +
  `?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}` +
  '&controls=0&modestbranding=1&playsinline=1&rel=0&disablekb=1&iv_load_policy=3&fs=0'

// AKT 6 · RUNDGANG
export function RundgangSection() {
  const bereich = useRef<HTMLDivElement>(null)
  const [laden, setLaden] = useState(false)

  // Wer Bewegung reduzieren möchte, bekommt kein von selbst laufendes Video,
  // sondern ein Standbild mit Abspieltaste.
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
    // Das Video hängt weit unten. Erst laden, wenn es in die Nähe kommt –
    // sonst zieht jeder Seitenaufruf am Handy unnötig Mobilfunkvolumen.
    const el = bereich.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setLaden(true); io.disconnect() } },
      { rootMargin: '300px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [sparsam])

  return (
    <section
      id="rundgang"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--ink)',
        color: '#fff',
        padding: 'clamp(6rem,13vw,11rem) 0',
        scrollMarginTop: 64,
      }}
    >
      <Glow
        style={{ right: '-12%', top: '-10%', width: 'min(60vw,560px)', height: 'min(60vw,560px)' }}
        strength=".16"
      />

      <div style={wrap}>
        <div style={{ textAlign: 'center', maxWidth: '26ch', margin: '0 auto clamp(2.2rem,4.5vw,3.4rem)' }}>
          <span data-reveal="" style={eyebrowAmber}>Rundgang</span>
          <h2
            data-reveal=""
            style={{
              fontSize: 'clamp(34px,5.4vw,74px)',
              lineHeight: 1,
              letterSpacing: '-.04em',
              fontWeight: 800,
              margin: '.25em 0 0',
            }}
          >
            Sieh dich um, bevor du kommst.
          </h2>
          <p
            data-reveal=""
            style={{ fontSize: 'clamp(19px,1.9vw,23px)', fontWeight: 300, color: 'rgba(255,255,255,.66)', margin: '1em 0 0' }}
          >
            Ein Flug durch unsere Räume – Geräte &amp; Atmosphäre.
          </p>
        </div>

        <div
          ref={bereich}
          data-reveal=""
          style={{ position: 'relative', borderRadius: 26, overflow: 'hidden', boxShadow: '0 40px 90px rgba(0,0,0,.45)' }}
        >
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000' }}>
            {laden && (
              <>
                <iframe
                  src={EMBED}
                  title="Rundgang durch das Fit-Inn Trier"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, background: '#000' }}
                />
                <div aria-hidden="true" style={{ position: 'absolute', inset: 0, cursor: 'default' }} />
              </>
            )}

            {/* Vor dem Laden und bei reduzierter Bewegung: Standbild, auf Wunsch abspielbar */}
            {!laden && (
              <button
                type="button"
                onClick={() => setLaden(true)}
                aria-label="Rundgang-Video abspielen"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  padding: 0,
                  border: 0,
                  cursor: sparsam ? 'pointer' : 'default',
                  background: `#000 center/cover no-repeat url(${POSTER})`,
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg,rgba(4,22,27,.12),rgba(4,22,27,.5))',
                  }}
                />
                {sparsam && (
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%,-50%)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 'clamp(64px,7vw,92px)',
                      height: 'clamp(64px,7vw,92px)',
                      borderRadius: '50%',
                      background: 'var(--amber)',
                      boxShadow: '0 14px 40px rgba(4,22,27,.45)',
                    }}
                  >
                    <Play />
                  </span>
                )}
              </button>
            )}
          </div>
        </div>

        <div
          data-reveal=""
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(1rem,2.5vw,2rem)',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 'clamp(1.6rem,3.5vw,2.4rem)',
          }}
        >
          <span style={{ fontSize: 16.5, color: 'rgba(255,255,255,.6)' }}>
            Lieber persönlich? Wir zeigen dir alles beim Probetraining.
          </span>
          <a href="#termin" className="lift" style={btnAmberSm}>Termin wählen</a>
        </div>
      </div>
    </section>
  )
}
