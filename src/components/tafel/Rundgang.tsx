'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { aktion } from './inhalt'
import { Absatz, Platte, Titel } from './teile'

const RUSS = '#17191c'
const ZINNOBER = '#c4402b'
const POSTER = `https://i.ytimg.com/vi/${aktion.rundgangVideoId}/maxresdefault.jpg`

// Läuft stumm und in Schleife, ohne Steuerleiste. Eine unsichtbare Ebene
// darüber fängt Klicks ab, damit das Video beim Antippen nicht stehen bleibt.
const EMBED =
  `https://www.youtube-nocookie.com/embed/${aktion.rundgangVideoId}` +
  `?autoplay=1&mute=1&loop=1&playlist=${aktion.rundgangVideoId}` +
  '&controls=0&modestbranding=1&playsinline=1&rel=0&disablekb=1&iv_load_policy=3&fs=0'

// TAFEL V — der Rundgang. Auf der Tafel ist das Video das eine bewegte Bild;
// es hängt im selben Rahmen wie die Zeichnung.
export function Rundgang() {
  const feld = useRef<HTMLDivElement>(null)
  const [laden, setLaden] = useState(false)

  // Wer Bewegung reduziert haben möchte, bekommt ein Standbild mit Abspieltaste.
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
    // Erst laden, wenn das Video in die Nähe kommt – sonst zieht jeder
    // Seitenaufruf am Handy unnötig Mobilfunkvolumen.
    const el = feld.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setLaden(true); io.disconnect() } },
      { rootMargin: '300px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [sparsam])

  return (
    <Platte id="rundgang" tafel="Tafel V · Der Rundgang" kind={
      <>
        <div
          style={{
            display: 'grid',
            gap: 'clamp(1.2rem,4vw,3.5rem)',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))',
            alignItems: 'end',
          }}
        >
          <Titel kind={<>Sieh es dir an, bevor du herkommst.</>} />
          <Absatz kind={<>Ein Flug durch die Räume: Trainingsflächen, Geräte, Umkleiden. Kein Prospektbild – so sieht es aus, wenn du hereinkommst.</>} />
        </div>

        <div
          ref={feld}
          style={{
            position: 'relative',
            marginTop: 'clamp(1.8rem,3.5vw,2.6rem)',
            aspectRatio: '16/9',
            overflow: 'hidden',
            background: RUSS,
            border: `1.5px solid ${RUSS}`,
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
                background: `${RUSS} center/cover no-repeat url(${POSTER})`,
              }}
            >
              {sparsam && (
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: '50% auto auto 50%',
                    transform: 'translate(-50%,-50%)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 'clamp(64px,7vw,90px)',
                    height: 'clamp(64px,7vw,90px)',
                    borderRadius: '50%',
                    background: ZINNOBER,
                  }}
                >
                  <svg width="26" height="30" viewBox="0 0 26 30" fill="#ede5d6" aria-hidden="true">
                    <path d="M0 0 L26 15 L0 30 Z" />
                  </svg>
                </span>
              )}
            </button>
          )}
        </div>
      </>
    } />
  )
}
