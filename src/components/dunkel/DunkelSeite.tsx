import Image from 'next/image'
import Link from 'next/link'
import { Schibsted_Grotesk } from 'next/font/google'
import type { CSSProperties, ReactNode } from 'react'
import {
  aktion, alltag, angebotFussnoten, fragen, geraete, haus, hero, kennzahlen, laufzeiten, stimmen, termin,
} from '@/components/kampagne/inhalt'
import './dunkel.css'
import { Formular } from './Formular'
import { Lichtkante, Navigation, Video } from './Teile'

const schibsted = Schibsted_Grotesk({
  variable: '--font-schibsted',
  subsets: ['latin'],
  display: 'swap',
})

/*
<!--
ENTWURF A · DUNKEL & KINEMATISCH · /dunkel

THESE: Ein Fitnessstudio, das sich nicht wie ein Fitnessstudio verkauft.
Die Seite nimmt die Lautstaerke raus: Graphit statt Schwarz, ein einziges
warmes Licht, viel Luft, Fotografie als Raum statt als Prospekt. Sie
verweigert Countdown, Rabattstoerer und Muskelfoto.

WELT: Grund #0c0d0f, gehobene Flaeche #131518, Text #f4f2ee, abgesetzt
#8d9297, ein Akzent: Glut #d98c43 (6,8:1). Schibsted Grotesk in 300 fuer
Anzeige, 400/600 fuer Text. Haarlinien statt Rahmen, keine Karten,
kein Radius ueber 3px.

BEWEGUNG: genau eine. Beim Erreichen eines Abschnitts laeuft eine schmale
Leuchtlinie an seiner Oberkante entlang. Inhalte werden nie verborgen.

ERSTE ANSICHT: links Ortsmarke, Schlagzeile in zwei Gewichten, Subline,
zwei Handlungen; rechts das Studiofoto, entsaettigt und hart, das nach
links ins Schwarz auslaeuft. Unten eine Leiste mit drei belegten Zahlen.
-->
*/

const satz: CSSProperties = { width: '100%', maxWidth: 1440, margin: '0 auto', padding: '0 clamp(20px,4vw,64px)' }
const eng: CSSProperties = { width: '100%', maxWidth: 1180, margin: '0 auto', padding: '0 clamp(20px,4vw,64px)' }

/** Abstand zwischen den Abschnitten – ein Rhythmus, nicht zehn. */
const luft = 'clamp(5rem,11vw,10rem)'

function Abschnitt({
  id, kind, style, kante = true,
}: { id?: string; kind: ReactNode; style?: CSSProperties; kante?: boolean }) {
  return (
    <section
      id={id}
      className={kante ? 'dk-lichtkante' : undefined}
      style={{ position: 'relative', padding: `${luft} 0`, scrollMarginTop: 72, ...style }}
    >
      {kind}
    </section>
  )
}

function Anzeige({ kind, style }: { kind: ReactNode; style?: CSSProperties }) {
  return (
    <h2
      style={{
        fontSize: 'clamp(32px,4.4vw,62px)',
        fontWeight: 300,
        letterSpacing: '-.038em',
        lineHeight: 1.04,
        textWrap: 'balance',
        maxWidth: '18ch',
        ...style,
      }}
    >
      {kind}
    </h2>
  )
}

export function DunkelSeite() {
  return (
    <main id="oben" className={`dk ${schibsted.variable}`}>
      <Lichtkante />
      <Navigation />

      {/* ═══ Erste Ansicht ═══════════════════════════════════════════════ */}
      <header style={{ position: 'relative', minHeight: 'min(100svh, 980px)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div className="dk-foto dk-foto--rechts" style={{ position: 'absolute', inset: '0 0 0 42%' }}>
          <Image src="/studio-1.avif" alt="" fill priority sizes="60vw" style={{ objectFit: 'cover', objectPosition: '58% 60%' }} />
        </div>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', right: '10%', top: '22%', width: 'min(46vw,640px)', height: 'min(46vw,640px)',
            background: 'radial-gradient(circle, rgba(217,140,67,.18), rgba(217,140,67,0) 66%)', pointerEvents: 'none',
          }}
        />

        <div style={{ ...satz, position: 'relative', zIndex: 2, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 'clamp(6rem,12vh,9rem)', paddingBottom: 'clamp(2rem,5vh,4rem)' }}>
          <div style={{ maxWidth: 'min(100%, 620px)' }}>
            <span className="dk-klein">{hero.ort}</span>
            <h1
              style={{
                fontSize: 'clamp(42px,5.6vw,86px)', fontWeight: 300, letterSpacing: '-.038em',
                lineHeight: 1.02, marginTop: 'clamp(1.4rem,3vw,2.2rem)', textWrap: 'balance',
              }}
            >
              {hero.zeile1}<br />
              <span style={{ fontWeight: 600 }}>{hero.zeile2}</span>
            </h1>
            <p style={{ marginTop: '1.3em', maxWidth: '40ch', fontSize: 'clamp(17px,1.3vw,19.5px)', lineHeight: 1.62, color: 'var(--matt)' }}>
              {hero.subline}
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 'clamp(1.8rem,3.4vw,2.6rem)', flexWrap: 'wrap' }}>
              <a href="#termin" className="dk-knopf">Probetraining sichern</a>
              <a href="#angebot" className="dk-knopf dk-knopf--rand">Angebot ansehen</a>
            </div>
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 2, borderTop: '1px solid var(--linie)' }}>
          <div style={{ ...satz, display: 'flex', flexWrap: 'wrap', gap: 'clamp(1.6rem,5vw,5rem)', padding: 'clamp(1.4rem,2.4vw,2rem) clamp(20px,4vw,64px)' }}>
            {kennzahlen.map(k => (
              <div key={k.label} style={{ display: 'flex', flexDirection: 'column', gap: '.3em' }}>
                <span className="dk-zahl" style={{ fontSize: 'clamp(20px,1.7vw,25px)', fontWeight: 500, letterSpacing: '-.02em' }}>{k.wert}</span>
                <span style={{ fontSize: 13.5, color: 'var(--matt)' }}>{k.label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ═══ Die Geräte ══════════════════════════════════════════════════ */}
      <Abschnitt id="geraete" kind={
        <div style={eng}>
          <Anzeige kind={geraete.titel} />
          <p style={{ marginTop: 'clamp(1.1rem,2.2vw,1.7rem)', maxWidth: '58ch', fontSize: 'clamp(18px,1.45vw,21px)', color: 'var(--matt)', lineHeight: 1.62 }}>
            {geraete.text}
          </p>

          <div style={{ marginTop: 'clamp(2.5rem,5vw,4.5rem)' }}>
            {geraete.punkte.map((p, i) => (
              <div
                key={p.titel}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))',
                  gap: '.5em clamp(1.5rem,4vw,4rem)',
                  alignItems: 'baseline',
                  padding: 'clamp(1.3rem,2.6vw,2rem) 0',
                  borderTop: i === 0 ? '1px solid var(--linie-stark)' : '1px solid var(--linie)',
                }}
              >
                <h3 style={{ fontSize: 'clamp(21px,2.1vw,28px)', fontWeight: 400, letterSpacing: '-.03em' }}>{p.titel}</h3>
                <p style={{ fontSize: 17, lineHeight: 1.62, color: 'var(--matt)' }}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      } />

      {/* ═══ Bildband ════════════════════════════════════════════════════ */}
      <div className="dk-foto dk-foto--voll" style={{ position: 'relative', height: 'clamp(300px,52vh,560px)', overflow: 'hidden' }}>
        <Image src="/studio-2.avif" alt="Trainingsfläche mit Geräten von TechnoGym im Fit-Inn Trier" fill sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center 55%' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', zIndex: 2 }}>
          <p style={{ ...satz, paddingBottom: 'clamp(1.6rem,3vw,2.6rem)', fontSize: 'clamp(19px,2.2vw,30px)', fontWeight: 300, letterSpacing: '-.03em', maxWidth: '26ch' }}>
            Trier-Feyen, Auf Hirtenberg 8. Kein Franchise.
          </p>
        </div>
      </div>

      {/* ═══ Das Angebot ═════════════════════════════════════════════════ */}
      <Abschnitt id="angebot" kind={
        <div style={eng}>
          <Anzeige kind={<>Was es kostet. Ganz.</>} />
          <p style={{ marginTop: 'clamp(1.1rem,2.2vw,1.7rem)', maxWidth: '54ch', fontSize: 'clamp(18px,1.45vw,21px)', color: 'var(--matt)', lineHeight: 1.62 }}>
            Kein Sternchenpreis, hinter dem sich etwas versteckt. Hier steht beides: der Wochenbeitrag
            und was am Ende der Laufzeit zusammenkommt.
          </p>

          <div
            style={{
              display: 'grid', gap: 'clamp(1rem,2.4vw,2rem)',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))',
              marginTop: 'clamp(2.5rem,5vw,4rem)',
            }}
          >
            {laufzeiten.map(l => (
              <div
                key={l.name}
                style={{
                  background: 'var(--grund-2)',
                  border: `1px solid ${l.hinweis ? 'var(--glut)' : 'var(--linie)'}`,
                  borderRadius: 3,
                  padding: 'clamp(1.4rem,3vw,2.4rem)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1em', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: 'clamp(22px,2.2vw,28px)', fontWeight: 400 }}>{l.name}</h3>
                  {l.hinweis && (
                    <span style={{ fontSize: 12.5, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--glut)' }}>{l.hinweis}</span>
                  )}
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1.4em', fontSize: 16.5 }}>
                  <tbody>
                    {l.zeilen.map(z => (
                      <tr key={z.was}>
                        <td style={{ padding: '.55em 0', color: 'var(--matt)' }}>{z.was}</td>
                        <td className="dk-zahl" style={{ padding: '.55em .9em', color: 'var(--matt)', textAlign: 'right', whiteSpace: 'nowrap' }}>{z.rechnung}</td>
                        <td className="dk-zahl" style={{ padding: '.55em 0', textAlign: 'right', fontWeight: 500 }}>{z.summe}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={2} style={{ padding: '1em 0 .2em', borderTop: '1px solid var(--linie-stark)', fontWeight: 500 }}>Gesamt</td>
                      <td
                        className="dk-zahl"
                        style={{
                          padding: '1em 0 .2em', borderTop: '1px solid var(--linie-stark)', textAlign: 'right',
                          fontSize: 'clamp(26px,2.8vw,36px)', fontWeight: 400, letterSpacing: '-.035em', color: 'var(--glut)',
                        }}
                      >
                        {l.gesamt}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          <ul style={{ listStyle: 'none', margin: 'clamp(1.8rem,3.5vw,2.6rem) 0 0', padding: 0, display: 'grid', gap: '.6em', fontSize: 16, color: 'var(--matt)', maxWidth: '72ch' }}>
            {angebotFussnoten.map(t => (
              <li key={t} style={{ display: 'flex', gap: '.8em' }}>
                <span aria-hidden="true" style={{ color: 'var(--glut)' }}>—</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <a href="#termin" className="dk-knopf" style={{ marginTop: 'clamp(1.8rem,3.4vw,2.6rem)' }}>Probetraining sichern</a>
        </div>
      } />

      {/* ═══ Der Alltag ══════════════════════════════════════════════════ */}
      <Abschnitt style={{ background: 'var(--grund-2)' }} kind={
        <div style={eng}>
          <Anzeige kind={alltag.titel} />
          <p style={{ marginTop: 'clamp(1.1rem,2.2vw,1.7rem)', maxWidth: '52ch', fontSize: 'clamp(18px,1.45vw,21px)', color: 'var(--matt)', lineHeight: 1.62 }}>
            {alltag.text}
          </p>
          <div style={{ display: 'grid', gap: 'clamp(1.6rem,3.5vw,3.2rem)', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,250px),1fr))', marginTop: 'clamp(2.5rem,5vw,4rem)' }}>
            {alltag.punkte.map(p => (
              <div key={p.titel} style={{ borderTop: '1px solid var(--linie-stark)', paddingTop: 'clamp(1rem,2vw,1.5rem)' }}>
                <h3 style={{ fontSize: 'clamp(20px,1.9vw,25px)', fontWeight: 400, letterSpacing: '-.03em' }}>{p.titel}</h3>
                <p style={{ marginTop: '.6em', fontSize: 16.5, lineHeight: 1.6, color: 'var(--matt)' }}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      } />

      {/* ═══ Das Haus ════════════════════════════════════════════════════ */}
      <Abschnitt kind={
        <div style={eng}>
          <div style={{ display: 'grid', gap: 'clamp(1.5rem,4vw,4rem)', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', alignItems: 'end' }}>
            <Anzeige kind={haus.titel} style={{ maxWidth: '12ch' }} />
            <p style={{ fontSize: 'clamp(18px,1.45vw,21px)', lineHeight: 1.62, color: 'var(--matt)', maxWidth: '46ch' }}>{haus.text}</p>
          </div>

          <div
            style={{
              display: 'grid', gap: 'clamp(1.2rem,2.5vw,2.5rem)',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,160px),1fr))',
              marginTop: 'clamp(2.5rem,5vw,4rem)', paddingTop: 'clamp(1.6rem,3vw,2.4rem)',
              borderTop: '1px solid var(--linie-stark)',
            }}
          >
            {haus.zahlen.map(z => (
              <div key={z.wert}>
                <div className="dk-zahl" style={{ fontSize: 'clamp(26px,2.8vw,38px)', fontWeight: 300, letterSpacing: '-.04em', lineHeight: 1 }}>{z.wert}</div>
                <div style={{ marginTop: '.5em', fontSize: 15, color: 'var(--matt)', lineHeight: 1.5 }}>{z.label}</div>
              </div>
            ))}
          </div>

          <ul
            style={{
              listStyle: 'none', margin: 'clamp(2rem,4vw,3rem) 0 0', padding: 0,
              display: 'grid', gap: '.9em clamp(1.5rem,4vw,4rem)',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,270px),1fr))',
              fontSize: 16.5, color: 'var(--matt)',
            }}
          >
            {haus.leistungen.map(l => (
              <li key={l} style={{ display: 'flex', gap: '.8em' }}>
                <span aria-hidden="true" style={{ color: 'var(--glut)' }}>—</span>
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </div>
      } />

      {/* ═══ Rundgang ════════════════════════════════════════════════════ */}
      <Abschnitt id="rundgang" style={{ background: 'var(--grund-2)' }} kind={
        <div style={eng}>
          <div style={{ display: 'grid', gap: 'clamp(1.2rem,4vw,4rem)', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', alignItems: 'end' }}>
            <Anzeige kind={<>Sieh es dir an, bevor du herkommst.</>} style={{ maxWidth: '14ch' }} />
            <p style={{ fontSize: 'clamp(18px,1.45vw,21px)', lineHeight: 1.62, color: 'var(--matt)', maxWidth: '44ch' }}>
              Ein Flug durch die Räume: Trainingsflächen, Geräte, Umkleiden. Kein Prospektbild – so
              sieht es aus, wenn du hereinkommst.
            </p>
          </div>
          <div style={{ marginTop: 'clamp(1.8rem,3.5vw,2.8rem)', border: '1px solid var(--linie)', borderRadius: 3, overflow: 'hidden' }}>
            <Video />
          </div>
        </div>
      } />

      {/* ═══ Stimmen ═════════════════════════════════════════════════════ */}
      <Abschnitt kind={
        <div style={eng}>
          <Anzeige kind={<>Was Mitglieder schreiben.</>} />
          <div style={{ display: 'grid', gap: 'clamp(1.5rem,3.5vw,3rem)', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', marginTop: 'clamp(2.5rem,5vw,4rem)' }}>
            {stimmen.map(s => (
              <figure key={s.autor} style={{ margin: 0, borderTop: '1px solid var(--linie-stark)', paddingTop: 'clamp(1.1rem,2.2vw,1.7rem)' }}>
                <blockquote style={{ margin: 0, fontSize: 'clamp(19px,1.8vw,23px)', fontWeight: 300, lineHeight: 1.45, letterSpacing: '-.02em', textWrap: 'pretty' }}>
                  <span aria-hidden="true" style={{ color: 'var(--glut)' }}>„</span>{s.zitat}<span aria-hidden="true" style={{ color: 'var(--glut)' }}>“</span>
                </blockquote>
                <figcaption style={{ marginTop: '1.2em', fontSize: 13, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--matt)' }}>
                  {s.autor} · Google
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      } />

      {/* ═══ Fragen ══════════════════════════════════════════════════════ */}
      <Abschnitt id="fragen" style={{ background: 'var(--grund-2)' }} kind={
        <div style={{ ...eng, maxWidth: 900 }}>
          <Anzeige kind={<>Was oft gefragt wird.</>} />
          <div className="dk-frage" style={{ marginTop: 'clamp(2rem,4vw,3rem)' }}>
            {fragen.map(f => (
              <details key={f.frage} open={f.offen} style={{ borderTop: '1px solid var(--linie)' }}>
                <summary>
                  <span style={{ fontSize: 'clamp(19px,1.9vw,25px)', fontWeight: 400, letterSpacing: '-.028em' }}>{f.frage}</span>
                  <svg className="dk-kreuz" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" style={{ flex: 'none' }}>
                    <path d="M9 1 V17 M1 9 H17" stroke="var(--glut)" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </summary>
                <p style={{ fontSize: 17, lineHeight: 1.62, color: 'var(--matt)', maxWidth: '66ch', padding: '0 0 clamp(1.1rem,2.2vw,1.6rem)' }}>
                  {f.antwort}
                </p>
              </details>
            ))}
          </div>
        </div>
      } />

      {/* ═══ Termin ══════════════════════════════════════════════════════ */}
      <Abschnitt id="termin" kind={
        <div style={eng}>
          <div style={{ display: 'grid', gap: 'clamp(1.2rem,4vw,4rem)', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', alignItems: 'end' }}>
            <Anzeige kind={termin.titel} style={{ maxWidth: '12ch' }} />
            <p style={{ fontSize: 'clamp(18px,1.45vw,21px)', lineHeight: 1.62, color: 'var(--matt)', maxWidth: '44ch' }}>{termin.text}</p>
          </div>
          <div style={{ marginTop: 'clamp(2rem,4vw,3rem)' }}>
            <Formular />
          </div>
        </div>
      } />

      {/* ═══ Rechtshinweis ═══════════════════════════════════════════════ */}
      <section id="hinweis" style={{ ...eng, paddingTop: 'clamp(1rem,2vw,2rem)', paddingBottom: luft, scrollMarginTop: 72 }}>
        <p
          style={{
            fontSize: 14.5, lineHeight: 1.72, color: 'var(--matt)',
            columnWidth: '46ch', columnGap: 'clamp(1.5rem,4vw,3rem)', hyphens: 'auto',
          }}
        >
          {aktion.rechtshinweis.map((s, i) =>
            s.href ? (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--glut)', textDecoration: 'underline' }}>
                {s.t}
              </a>
            ) : (
              <span key={i}>{s.t}</span>
            ),
          )}
        </p>
      </section>

      {/* ═══ Fuß ═════════════════════════════════════════════════════════ */}
      <footer style={{ borderTop: '1px solid var(--linie)' }}>
        <div
          style={{
            ...eng, padding: 'clamp(2.5rem,5vw,4rem) clamp(20px,4vw,64px)',
            display: 'grid', gap: 'clamp(1.5rem,4vw,3rem)',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))', alignItems: 'start',
          }}
        >
          <div>
            <p className="dk-marke">Fit-Inn Trier</p>
            <p style={{ marginTop: '.9em', fontSize: 16.5, color: 'var(--matt)' }}>{aktion.adresse}</p>
            <p style={{ marginTop: '.5em', fontSize: 13, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--matt)' }}>
              Sonntags geschlossen
            </p>
          </div>
          <div style={{ display: 'grid', gap: '.3em', fontSize: 16.5 }}>
            <a href={`tel:${aktion.telefon.link}`} className="dk-ziel">{aktion.telefon.anzeige}</a>
            <a href={`mailto:${aktion.email}`} className="dk-ziel">{aktion.email}</a>
          </div>
          <div style={{ display: 'grid', gap: '.3em', fontSize: 16.5, color: 'var(--matt)' }}>
            <Link href="/" className="dk-ziel">Zur Startseite</Link>
            <Link href="/impressum" className="dk-ziel">Impressum</Link>
            <Link href="/datenschutz" className="dk-ziel">Datenschutz</Link>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--linie)' }}>
          <p style={{ ...eng, padding: '1.2rem clamp(20px,4vw,64px)', fontSize: 12.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--matt)' }}>
            Entwurf A · gestalterische Testfläche · nicht in der Suche gelistet · Buchungen laufen echt
          </p>
        </div>
      </footer>
    </main>
  )
}
