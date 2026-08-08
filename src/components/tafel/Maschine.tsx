'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { aktion, rufe } from './inhalt'
import { Absatz, satz, schluessel, spiegel, Stern } from './teile'

// TAFEL I — der Beweis vor dem Versprechen.
// Die Zeichnung ist der Kern der Seite: ein Kraftgerät im Aufriss, mit
// nummerierten Verweisen in die Legende. Wer eine Legendenzeile anfasst,
// sieht die zugehörige Linie und ihren Ankerpunkt aufleuchten; alles andere
// tritt zurück. Das ist die eine gestaltete Bewegung dieser Seite.

const KNOCHEN = '#ede5d6'
const RUSS = '#17191c'
const ZINNOBER = '#c4402b'

/** Länge einer Verweislinie – bestimmt die Laufzeit ihres Zeichnens. */
function laenge(p: number[][]) {
  let l = 0
  for (let i = 1; i < p.length; i++) l += Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1])
  return Math.ceil(l)
}

/** Anker → Knick → waagerecht in die Ziffernmarke. So führen echte Tafeln. */
function pfad(r: (typeof rufe)[number]) {
  const links = r.mx < 460
  const knickX = links ? r.mx + 88 + (r.x - r.mx) * .28 : r.mx - 88 - (r.mx - r.x) * .28
  const ende = links ? r.mx + 21 : r.mx - 21
  return [[r.x, r.y], [knickX, r.my], [ende, r.my]]
}

export function Maschine() {
  const [aktiv, setAktiv] = useState<string | null>(null)
  const [sichtbar, setSichtbar] = useState(false)
  const feld = useRef<HTMLDivElement>(null)

  // Auf kleinen Schirmen wären Randmarken und Verweislinien fingernagelgroß.
  // Dort zeigt die Zeichnung nur das Gerät, die Ziffern sitzen direkt darauf.
  const weit = useSyncExternalStore(
    melden => {
      const mq = window.matchMedia('(min-width: 860px)')
      mq.addEventListener('change', melden)
      return () => mq.removeEventListener('change', melden)
    },
    () => window.matchMedia('(min-width: 860px)').matches,
    () => true,
  )

  useEffect(() => {
    const el = feld.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSichtbar(true); io.disconnect() } },
      { threshold: .2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section id="geraet" style={{ ...satz, paddingTop: 'clamp(1rem,2vw,2rem)', scrollMarginTop: 76 }}>
      <div className="tf-platte" style={{ borderRadius: 2 }}>
        <div style={spiegel}>
          {/* ─── Kopf der Tafel: das Angebot, dann der Beweis ───────────── */}
          <div
            style={{
              display: 'grid',
              gap: 'clamp(1.6rem,4vw,3.5rem)',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))',
              alignItems: 'start',
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: 'clamp(40px,6.6vw,92px)',
                  lineHeight: .96,
                  letterSpacing: '-.048em',
                  fontWeight: 700,
                  maxWidth: '11ch',
                  textWrap: 'balance',
                }}
              >
                Zwölf Wochen. Je fünf Euro.
              </h1>
              <Absatz
                style={{ marginTop: 'clamp(1.1rem,2.4vw,1.7rem)', maxWidth: '38ch', fontSize: 'clamp(19px,1.8vw,23px)' }}
                kind={
                  <>
                    Und ein Gerät, das dich erkennt, sich auf dich einstellt und mitschreibt. Damit
                    Wiederanfangen keine Prüfung ist, die man nicht bestehen kann.
                  </>
                }
              />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 'clamp(1.5rem,3vw,2.2rem)' }}>
                <a href="#termin" className="tf-knopf">Probetraining wählen</a>
                <a
                  href="#angebot"
                  className="tf-knopf"
                  style={{ background: 'transparent', color: RUSS, border: '1.5px solid rgba(23,25,28,.35)' }}
                >
                  Was es danach kostet
                </a>
              </div>
            </div>

            {/* Das Preisfeld – gestempelt, wie der Vermerk auf einer Tafel. */}
            <div
              style={{
                border: `2px solid ${ZINNOBER}`,
                borderRadius: 2,
                padding: 'clamp(1.1rem,2.4vw,1.7rem)',
                justifySelf: 'stretch',
                maxWidth: 420,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '.35em', color: ZINNOBER }}>
                <span
                  className="tf-zahl"
                  style={{ fontSize: 'clamp(56px,7vw,84px)', lineHeight: .85, fontWeight: 700, letterSpacing: '-.05em' }}
                >
                  5 €
                </span>
                <span style={{ fontSize: 'clamp(19px,1.7vw,22px)', fontWeight: 600 }}>/ Woche</span>
              </div>
              <p style={{ marginTop: '.7em', fontSize: 17.5, fontWeight: 600, color: RUSS }}>
                für die ersten 12 Wochen<Stern />
              </p>
              <dl
                style={{
                  margin: '1.1em 0 0',
                  paddingTop: '.9em',
                  borderTop: '1px solid rgba(23,25,28,.22)',
                  display: 'grid',
                  gap: '.5em',
                  fontSize: 16.5,
                  color: 'var(--matt-papier)',
                }}
              >
                {[
                  ['danach, 52 Wochen', `${aktion.wochenbeitrag.einJahr} / Woche`],
                  ['danach, 104 Wochen', `${aktion.wochenbeitrag.zweiJahre} / Woche`],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: '1em' }}>
                    <dt>{k}</dt>
                    <dd className="tf-zahl" style={{ margin: 0, fontWeight: 600, color: RUSS }}>{v}</dd>
                  </div>
                ))}
              </dl>
              <p style={{ ...schluessel, marginTop: '1.1em', color: 'var(--matt-papier)', letterSpacing: '.05em' }}>
                Neuabschlüsse bis {aktion.gueltigBis}
              </p>
            </div>
          </div>

          {/* ─── Die Zeichnung ──────────────────────────────────────────── */}
          <div
            ref={feld}
            style={{
              marginTop: 'clamp(2.5rem,5vw,4rem)',
              paddingTop: 'clamp(1.6rem,3vw,2.4rem)',
              borderTop: `2px solid ${RUSS}`,
              display: 'grid',
              gap: 'clamp(1.6rem,3.5vw,3rem)',
              gridTemplateColumns: weit ? 'minmax(0,1.55fr) minmax(300px,1fr)' : '1fr',
              alignItems: 'start',
            }}
          >
            <svg
              className={`tf-diagramm${sichtbar ? ' is-in' : ''}`}
              viewBox={weit ? '0 0 920 660' : '186 96 604 528'}
              width="100%"
              role="img"
              aria-label="Aufriss eines computergesteuerten Kraftgeräts mit sechs nummerierten Verweisen, die in der Legende daneben erklärt werden."
              style={{ display: 'block', overflow: 'visible' }}
            >
              {/* Boden */}
              <line x1="150" y1="598" x2="790" y2="598" stroke={RUSS} strokeWidth="2" opacity=".45" />
              <g stroke={RUSS} strokeWidth="1" opacity=".28">
                {Array.from({ length: 16 }, (_, i) => (
                  <line key={i} x1={158 + i * 41} y1="598" x2={144 + i * 41} y2="612" />
                ))}
              </g>

              {/* Rahmen des Geräts */}
              <g fill="none" stroke={RUSS} strokeWidth="3.4" strokeLinejoin="round">
                <rect x="230" y="572" width="490" height="18" rx="2" fill={RUSS} opacity=".9" />
                <rect x="246" y="214" width="470" height="10" rx="2" fill={RUSS} opacity=".9" stroke="none" />
                <rect x="252" y="224" width="10" height="348" fill={RUSS} opacity=".9" stroke="none" />
                <rect x="620" y="224" width="9" height="348" fill={RUSS} opacity=".9" stroke="none" />
                <rect x="711" y="224" width="9" height="348" fill={RUSS} opacity=".9" stroke="none" />
                <path d="M262 436 L330 560" strokeWidth="3" opacity=".75" />
              </g>

              {/* Gewichtsblock: neun Platten, der Bolzen steckt in der vierten */}
              <g>
                {Array.from({ length: 9 }, (_, i) => (
                  <rect
                    key={i}
                    x="632"
                    y={310 + i * 28}
                    width="68"
                    height="24"
                    rx="2"
                    fill={i < 4 ? RUSS : 'none'}
                    fillOpacity={i < 4 ? .82 : 0}
                    stroke={RUSS}
                    strokeWidth="2.2"
                  />
                ))}
                <line x1="646" y1="224" x2="646" y2="568" stroke={RUSS} strokeWidth="1.6" opacity=".5" />
                <line x1="686" y1="224" x2="686" y2="568" stroke={RUSS} strokeWidth="1.6" opacity=".5" />
                <rect x="698" y="398" width="30" height="12" rx="6" fill={ZINNOBER} />
              </g>

              {/* Zug: Seil über zwei Rollen zum Hebel */}
              <g fill="none" stroke={RUSS} strokeWidth="2.4">
                <path d="M512 326 L520 262" />
                <path d="M520 248 L660 248" />
                <path d="M660 262 L666 306" />
                <circle cx="520" cy="248" r="13" strokeWidth="3" />
                <circle cx="660" cy="248" r="13" strokeWidth="3" />
              </g>

              {/* Sitz, Lehne, Sitzstütze mit Rasterlöchern */}
              <g stroke={RUSS} strokeWidth="3" strokeLinejoin="round">
                <rect x="336" y="468" width="152" height="24" rx="5" fill={RUSS} fillOpacity=".16" />
                <path d="M484 468 L508 468 L524 346 L500 344 Z" fill={RUSS} fillOpacity=".16" />
                <rect x="400" y="492" width="12" height="80" fill={RUSS} fillOpacity=".9" stroke="none" />
              </g>
              <g fill={KNOCHEN} stroke={RUSS} strokeWidth="1.4">
                {[506, 522, 538, 554].map(cy => <circle key={cy} cx="406" cy={cy} r="3.6" />)}
              </g>

              {/* Hebelarm mit Griff */}
              <g fill="none" stroke={RUSS} strokeWidth="4" strokeLinecap="round">
                <path d="M512 340 L392 400" />
                <circle cx="512" cy="340" r="14" strokeWidth="3.4" fill={KNOCHEN} />
                <circle cx="512" cy="340" r="4" fill={RUSS} stroke="none" />
                <circle cx="386" cy="402" r="13" strokeWidth="3.4" fill={KNOCHEN} />
              </g>

              {/* Bildschirm am vorderen Holm */}
              <g>
                <rect x="196" y="176" width="132" height="96" rx="4" fill={RUSS} />
                <rect x="204" y="184" width="116" height="72" rx="2" fill={KNOCHEN} opacity=".92" />
                {/* Bewegungsbahn auf dem Schirm – das, was das Gerät zeigt */}
                <path d="M214 240 C238 200 266 200 288 226" fill="none" stroke={ZINNOBER} strokeWidth="3" strokeLinecap="round" />
                <circle cx="288" cy="226" r="5" fill={ZINNOBER} />
                <g fill={RUSS} opacity=".55">
                  <rect x="214" y="248" width="44" height="4" rx="2" />
                  <rect x="264" y="248" width="24" height="4" rx="2" />
                </g>
              </g>

              {/* Der Weg der Daten: gestrichelt vom Schirm zum Telefon */}
              <path
                d="M330 190 C420 132 520 130 588 140"
                fill="none"
                stroke={ZINNOBER}
                strokeWidth="2.2"
                strokeDasharray="7 7"
                opacity=".85"
              />
              <g>
                <rect x="596" y="104" width="46" height="78" rx="7" fill={RUSS} />
                <rect x="602" y="113" width="34" height="58" rx="2" fill={KNOCHEN} opacity=".92" />
                <g fill={ZINNOBER}>
                  <rect x="608" y="122" width="22" height="4" rx="2" />
                  <rect x="608" y="132" width="14" height="4" rx="2" />
                </g>
                <g fill={RUSS} opacity=".45">
                  <rect x="608" y="144" width="22" height="3" rx="1.5" />
                  <rect x="608" y="152" width="18" height="3" rx="1.5" />
                </g>
              </g>

              {/* ─── Verweise ────────────────────────────────────────────── */}
              {rufe.map((r, i) => {
                const p = pfad(r)
                const an = aktiv === r.nr ? '1' : aktiv ? '0' : ''
                return (
                  <g key={r.nr} className="tf-ruf" data-an={an}>
                    {weit && (
                      <>
                        <polyline
                          className="tf-linie"
                          points={p.map(([x, y]) => `${x},${y}`).join(' ')}
                          fill="none"
                          stroke={RUSS}
                          strokeWidth="1.3"
                          opacity=".65"
                          style={{ ['--laenge' as string]: laenge(p), transitionDelay: `${i * 90}ms` }}
                        />
                        <circle className="tf-marke" cx={r.mx} cy={r.my} r="21" fill="none" stroke={RUSS} strokeWidth="1.8" />
                        <text
                          className="tf-marke-nr"
                          x={r.mx}
                          y={r.my}
                          fill={RUSS}
                          fontSize="19"
                          fontWeight="700"
                          fontFamily="var(--font-schluessel)"
                          textAnchor="middle"
                          dominantBaseline="central"
                        >
                          {r.nr}
                        </text>
                      </>
                    )}
                    {/* Ankerpunkt – auf schmalen Schirmen trägt er die Ziffer selbst */}
                    <circle className="tf-punkt" cx={r.x} cy={r.y} r={weit ? 5.5 : 17} fill={weit ? RUSS : ZINNOBER} />
                    {!weit && (
                      <text
                        x={r.x}
                        y={r.y}
                        fill={KNOCHEN}
                        fontSize="17"
                        fontWeight="700"
                        fontFamily="var(--font-schluessel)"
                        textAnchor="middle"
                        dominantBaseline="central"
                      >
                        {r.nr}
                      </text>
                    )}
                  </g>
                )
              })}
            </svg>

            {/* ─── Legende ─────────────────────────────────────────────── */}
            <div>
              <p style={{ ...schluessel, color: 'var(--matt-papier)', marginBottom: '.9em' }}>
                Erläuterung der Verweise
              </p>
              {rufe.map(r => (
                <button
                  key={r.nr}
                  type="button"
                  className="tf-legende"
                  data-an={aktiv === r.nr ? '1' : '0'}
                  aria-pressed={aktiv === r.nr}
                  onMouseEnter={() => setAktiv(r.nr)}
                  onMouseLeave={() => setAktiv(null)}
                  onFocus={() => setAktiv(r.nr)}
                  onBlur={() => setAktiv(null)}
                  onClick={() => setAktiv(a => (a === r.nr ? null : r.nr))}
                >
                  <span style={{ display: 'flex', gap: '.85em', alignItems: 'baseline' }}>
                    <span
                      className="tf-zahl"
                      style={{ ...schluessel, fontSize: 14, color: ZINNOBER, flex: 'none', width: '2.2em' }}
                    >
                      {r.nr}
                    </span>
                    <span>
                      <span style={{ display: 'block', fontSize: 18.5, fontWeight: 600, letterSpacing: '-.02em' }}>
                        {r.titel}
                      </span>
                      <span
                        style={{ display: 'block', fontSize: 16.5, lineHeight: 1.55, color: 'var(--matt-papier)', marginTop: '.25em' }}
                      >
                        {r.text}
                      </span>
                    </span>
                  </span>
                </button>
              ))}
              <p style={{ fontSize: 16, lineHeight: 1.55, color: 'var(--matt-papier)', marginTop: '1.1em' }}>
                Schematische Darstellung. Wir setzen ausschließlich Geräte von TechnoGym ein.
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            ...schluessel,
            display: 'flex',
            justifyContent: 'space-between',
            gap: '1.5em',
            color: 'var(--matt-papier)',
            borderTop: '1px solid rgba(23,25,28,.18)',
            margin: '0 clamp(1.4rem,4vw,4rem)',
            padding: '.9rem 0 1.1rem',
          }}
        >
          <span>Tafel I · Das Gerät</span>
          <span>Fit-Inn Trier · seit 1996</span>
        </div>
      </div>
    </section>
  )
}
