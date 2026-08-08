import Image from 'next/image'
import Link from 'next/link'
import { Archivo, Bricolage_Grotesque } from 'next/font/google'
import type { CSSProperties, ReactNode } from 'react'
import {
  aktion, alltag, angebotFussnoten, fragen, geraete, haus, hero, laufzeiten, stimmen, termin,
} from '@/components/kampagne/inhalt'
import { Formular } from './Formular'
import { Navigation, Video } from './Teile'
import './tief.css'

const bricolage = Bricolage_Grotesque({ variable: '--font-bricolage', subsets: ['latin'], display: 'swap' })
const archivo = Archivo({ variable: '--font-archivo', subsets: ['latin'], display: 'swap' })

/*
<!--
ENTWURF C · TIEF & MATERIELL · /tief

THESE: Die Seite ist ein Raum, kein Dokument. Eine einzige satte Farbe traegt
alles, das Studiofoto liegt darunter als Textur, und darueber schweben Ebenen
aus mattiertem Glas mit echtem Versatz und echtem Schatten. Sie verweigert
das weisse Kachelraster, mit dem jede Studioseite ihre Leistungen aufreiht.

WELT: Petrol #0d3b3a / #072726 / #041a19, Text #f1f5f2, abgesetzt #9db8b3,
ein Licht: Gold #e5b04b (6,1:1). Bricolage Grotesque schwer fuer Anzeige,
Archivo fuer Text. Radien gross (999px an Bedienelementen, 18-26px an
Ebenen), Schatten immer mit Versatz und Weichzeichnung.

BEWEGUNG: die Tiefe selbst. Der Grund steht (position: sticky), die Ebenen
ziehen darueber vorbei. Kein JavaScript, und bei reduzierter Bewegung faellt
es von selbst weg.

ERSTE ANSICHT: schwebende Glaskapsel als Navigation, links die schwere
Schlagzeile und zwei Handlungen, rechts die Preiskarte als eigene Glasebene
mit den Folgebeitraegen und der Frist.
-->
*/

const satz: CSSProperties = { width: '100%', maxWidth: 1320, margin: '0 auto', padding: '0 clamp(20px,4vw,54px)' }
const luft = 'clamp(5rem,11vw,9.5rem)'

function Abschnitt({ id, kind, style }: { id?: string; kind: ReactNode; style?: CSSProperties }) {
  return (
    <section id={id} style={{ position: 'relative', padding: `${luft} 0`, scrollMarginTop: 92, ...style }}>
      {kind}
    </section>
  )
}

function Anzeige({ kind, style }: { kind: ReactNode; style?: CSSProperties }) {
  return (
    <h2
      style={{
        fontSize: 'clamp(34px,5vw,72px)',
        fontWeight: 700,
        letterSpacing: '-.045em',
        lineHeight: .98,
        textWrap: 'balance',
        maxWidth: '16ch',
        ...style,
      }}
    >
      {kind}
    </h2>
  )
}

export function TiefSeite() {
  return (
    <main id="oben" className={`tf-c ${bricolage.variable} ${archivo.variable}`}>
      <Navigation />

      {/* ═══ Erste Ansicht ═══════════════════════════════════════════════ */}
      {/* Der Grund haftet, die Inhalte ziehen darüber – daher der doppelt
          hohe Rahmen mit dem haftenden Bild darin. */}
      <header style={{ position: 'relative' }}>
        <div className="tc-grundbild tc-haftgrund" style={{ position: 'sticky', top: 0, height: '100svh', overflow: 'hidden', zIndex: 0 }}>
          <Image src="/studio-1.avif" alt="" fill priority sizes="100vw" style={{ objectFit: 'cover', objectPosition: '50% 62%' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, marginTop: '-100svh', minHeight: '100svh', display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              ...satz,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))',
              gap: 'clamp(2rem,4vw,4rem)',
              alignItems: 'center',
              paddingTop: 'clamp(6rem,13vh,9rem)',
              paddingBottom: 'clamp(3rem,7vh,5rem)',
            }}
          >
            <div>
              <span className="tc-klein">{hero.ort}</span>
              <h1
                style={{
                  fontSize: 'clamp(46px,6.4vw,102px)', fontWeight: 700, letterSpacing: '-.05em',
                  lineHeight: .92, marginTop: 'clamp(1rem,2.2vw,1.6rem)', textWrap: 'balance',
                }}
              >
                {hero.zeile1}<br />{hero.zeile2}
              </h1>
              <p style={{ marginTop: '1.1em', maxWidth: '40ch', fontSize: 'clamp(17px,1.35vw,20px)', lineHeight: 1.6, color: 'var(--matt)' }}>
                {hero.subline}
              </p>
              <div style={{ display: 'flex', gap: 12, marginTop: 'clamp(1.7rem,3.2vw,2.4rem)', flexWrap: 'wrap' }}>
                <a href="#termin" className="tc-knopf">Probetraining sichern</a>
                <a href="#angebot" className="tc-knopf tc-knopf--glas">Angebot ansehen</a>
              </div>
            </div>

            {/* Die Preiskarte als eigene Ebene */}
            <div className="tc-glas tc-glas--hoch" style={{ borderRadius: 26, padding: 'clamp(1.4rem,2.6vw,2.2rem)', justifySelf: 'stretch', maxWidth: 440 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '.3em' }}>
                <span
                  className="tc-zahl"
                  style={{ fontFamily: 'var(--anzeige)', fontSize: 'clamp(58px,6vw,92px)', lineHeight: .84, fontWeight: 700, letterSpacing: '-.06em', color: 'var(--gold)' }}
                >
                  5 €
                </span>
                <span style={{ fontSize: 19, fontWeight: 700 }}>/ Woche</span>
              </div>
              <p style={{ marginTop: '.9em', fontSize: 16.5, fontWeight: 700 }}>für die ersten zwölf Wochen</p>
              <div style={{ marginTop: '1.2em', paddingTop: '1em', borderTop: '1px solid var(--kante)', display: 'grid', gap: '.55em', fontSize: 15.5, color: 'var(--matt)' }}>
                {laufzeiten.map(l => (
                  <div key={l.name} style={{ display: 'flex', justifyContent: 'space-between', gap: '1em' }}>
                    <span>danach, {l.name}</span>
                    <span className="tc-zahl" style={{ color: 'var(--hell)', fontWeight: 700 }}>{l.proWoche} / Woche</span>
                  </div>
                ))}
              </div>
              <p className="tc-klein" style={{ marginTop: '1.1em', color: 'var(--matt)' }}>
                Neuabschlüsse bis {aktion.gueltigBis}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Ab hier trägt die Farbe, nicht mehr das Foto. */}
      <div style={{ position: 'relative', zIndex: 2, background: 'var(--tief)' }}>

        {/* ═══ Die Geräte ════════════════════════════════════════════════ */}
        <Abschnitt id="geraete" kind={
          <div style={satz}>
            <Anzeige kind={geraete.titel} />
            <p style={{ marginTop: 'clamp(1.1rem,2.2vw,1.6rem)', maxWidth: '58ch', fontSize: 'clamp(18px,1.45vw,21px)', color: 'var(--matt)', lineHeight: 1.6 }}>
              {geraete.text}
            </p>

            {/* Asymmetrisch: der erste Punkt trägt die Ebene, die drei
                anderen sitzen daneben – kein Vierer-Kachelraster. */}
            <div
              style={{
                display: 'grid', gap: 'clamp(1rem,2vw,1.6rem)',
                gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))',
                marginTop: 'clamp(2.2rem,4.5vw,3.6rem)', alignItems: 'stretch',
              }}
            >
              {/* Die tragende Ebene: erst das Bild, dann der Satz. Ohne das Bild
                  klaffte hier eine Lücke, weil die Ebene auf die Höhe der drei
                  Karten daneben gestreckt wird. */}
              <div className="tc-glas tc-glas--hoch" style={{ borderRadius: 26, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', width: '100%', flex: '1 1 240px', minHeight: 220 }}>
                  <Image
                    src="/studio-1.avif"
                    alt="Computergesteuerte Geräte von TechnoGym im Fit-Inn Trier"
                    fill sizes="(max-width: 900px) 100vw, 620px"
                    style={{ objectFit: 'cover', objectPosition: '62% 58%' }}
                  />
                  <div
                    aria-hidden="true"
                    style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(7,39,38,.24), rgba(7,39,38,.72))' }}
                  />
                  <span className="tc-klein" style={{ position: 'absolute', left: 'clamp(1.2rem,2.4vw,2rem)', top: 'clamp(1.1rem,2.2vw,1.7rem)' }}>
                    Der Unterschied
                  </span>
                </div>
                <div style={{ padding: 'clamp(1.4rem,2.6vw,2.2rem)' }}>
                  <h3 style={{ fontSize: 'clamp(26px,2.8vw,38px)', letterSpacing: '-.04em' }}>{geraete.punkte[0].titel}</h3>
                  <p style={{ marginTop: '.7em', fontSize: 17, lineHeight: 1.6, color: 'var(--matt)' }}>{geraete.punkte[0].text}</p>
                </div>
              </div>

              <div style={{ display: 'grid', gap: 'clamp(1rem,2vw,1.6rem)' }}>
                {geraete.punkte.slice(1).map(p => (
                  <div key={p.titel} className="tc-glas" style={{ borderRadius: 18, padding: 'clamp(1.2rem,2.2vw,1.8rem)' }}>
                    <h3 style={{ fontSize: 'clamp(19px,1.8vw,23px)', letterSpacing: '-.035em' }}>{p.titel}</h3>
                    <p style={{ marginTop: '.5em', fontSize: 16.5, lineHeight: 1.55, color: 'var(--matt)' }}>{p.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        } />

        {/* ═══ Das Angebot ═══════════════════════════════════════════════ */}
        <Abschnitt id="angebot" style={{ background: 'var(--tiefer)' }} kind={
          <div style={satz}>
            <Anzeige kind={<>Was es kostet. Ganz.</>} />
            <p style={{ marginTop: 'clamp(1.1rem,2.2vw,1.6rem)', maxWidth: '54ch', fontSize: 'clamp(18px,1.45vw,21px)', color: 'var(--matt)', lineHeight: 1.6 }}>
              Kein Sternchenpreis, hinter dem sich etwas versteckt. Hier steht beides: der
              Wochenbeitrag und was am Ende der Laufzeit zusammenkommt.
            </p>

            <div style={{ display: 'grid', gap: 'clamp(1rem,2.2vw,1.8rem)', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', marginTop: 'clamp(2.2rem,4.5vw,3.6rem)', alignItems: 'start' }}>
              {laufzeiten.map(l => (
                <div
                  key={l.name}
                  className={l.hinweis ? 'tc-glas tc-glas--hoch' : 'tc-glas'}
                  style={{
                    borderRadius: 26,
                    padding: 'clamp(1.4rem,2.8vw,2.4rem)',
                    borderColor: l.hinweis ? 'rgba(229,176,75,.5)' : undefined,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1em', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: 'clamp(23px,2.3vw,30px)', letterSpacing: '-.04em' }}>{l.name}</h3>
                    {l.hinweis && <span className="tc-klein">{l.hinweis}</span>}
                  </div>

                  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1.4em', fontSize: 16.5 }}>
                    <tbody>
                      {l.zeilen.map(z => (
                        <tr key={z.was}>
                          <td style={{ padding: '.55em 0', color: 'var(--matt)' }}>{z.was}</td>
                          <td className="tc-zahl" style={{ padding: '.55em .9em', color: 'var(--matt)', textAlign: 'right', whiteSpace: 'nowrap' }}>{z.rechnung}</td>
                          <td className="tc-zahl" style={{ padding: '.55em 0', textAlign: 'right', fontWeight: 700 }}>{z.summe}</td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan={2} style={{ padding: '1em 0 .2em', borderTop: '1px solid var(--kante)', fontWeight: 700 }}>Gesamt</td>
                        <td
                          className="tc-zahl"
                          style={{
                            padding: '1em 0 .2em', borderTop: '1px solid var(--kante)', textAlign: 'right',
                            fontFamily: 'var(--anzeige)', fontSize: 'clamp(28px,3vw,40px)', fontWeight: 700,
                            letterSpacing: '-.045em', color: 'var(--gold)',
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
                  <span aria-hidden="true" style={{ color: 'var(--gold)' }}>—</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <a href="#termin" className="tc-knopf" style={{ marginTop: 'clamp(1.8rem,3.4vw,2.6rem)' }}>Probetraining sichern</a>
          </div>
        } />

        {/* ═══ Der Alltag ════════════════════════════════════════════════ */}
        {/* Die ruhige Passage: nur Farbe, kein Glas. */}
        <Abschnitt kind={
          <div style={satz}>
            <Anzeige kind={alltag.titel} />
            <p style={{ marginTop: 'clamp(1.1rem,2.2vw,1.6rem)', maxWidth: '52ch', fontSize: 'clamp(18px,1.45vw,21px)', color: 'var(--matt)', lineHeight: 1.6 }}>
              {alltag.text}
            </p>
            <div style={{ marginTop: 'clamp(2.2rem,4.5vw,3.6rem)' }}>
              {alltag.punkte.map((p, i) => (
                <div
                  key={p.titel}
                  style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))',
                    gap: '.5em clamp(1.5rem,4vw,4rem)', alignItems: 'baseline',
                    padding: 'clamp(1.3rem,2.6vw,2rem) 0',
                    borderTop: i === 0 ? '1px solid var(--kante-hell)' : '1px solid var(--kante)',
                  }}
                >
                  <h3 style={{ fontSize: 'clamp(22px,2.2vw,30px)', letterSpacing: '-.04em' }}>{p.titel}</h3>
                  <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--matt)' }}>{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        } />

        {/* ═══ Das Haus ══════════════════════════════════════════════════ */}
        <Abschnitt id="haus" style={{ background: 'var(--tiefer)' }} kind={
          <div style={satz}>
            <div style={{ display: 'grid', gap: 'clamp(1.5rem,4vw,4rem)', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', alignItems: 'end' }}>
              <Anzeige kind={haus.titel} style={{ maxWidth: '11ch' }} />
              <p style={{ fontSize: 'clamp(18px,1.45vw,21px)', lineHeight: 1.6, color: 'var(--matt)', maxWidth: '46ch' }}>{haus.text}</p>
            </div>

            <div style={{ position: 'relative', marginTop: 'clamp(1.8rem,3.5vw,2.8rem)', borderRadius: 26, overflow: 'hidden', aspectRatio: '21/9' }}>
              <Image
                src="/studio-2.avif"
                alt="Trainingsfläche mit Geräten von TechnoGym im Fit-Inn Trier"
                fill sizes="(max-width: 1320px) 100vw, 1210px"
                style={{ objectFit: 'cover', objectPosition: 'center 58%' }}
              />
            </div>

            <div className="tc-glas" style={{ borderRadius: 22, marginTop: 'clamp(-3rem,-4vw,-2rem)', marginInline: 'clamp(0px,3vw,44px)', position: 'relative', zIndex: 2, padding: 'clamp(1.3rem,2.6vw,2.2rem)' }}>
              <dl style={{ display: 'grid', gap: 'clamp(1rem,2.2vw,2rem)', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,150px),1fr))', margin: 0 }}>
                {haus.zahlen.map(z => (
                  <div key={z.wert}>
                    <dt className="tc-zahl" style={{ fontFamily: 'var(--anzeige)', fontSize: 'clamp(26px,2.8vw,38px)', fontWeight: 700, letterSpacing: '-.05em', lineHeight: 1 }}>
                      {z.wert}
                    </dt>
                    <dd style={{ margin: '.45em 0 0', fontSize: 14.5, color: 'var(--matt)', lineHeight: 1.5 }}>{z.label}</dd>
                  </div>
                ))}
              </dl>
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
                  <span aria-hidden="true" style={{ color: 'var(--gold)' }}>—</span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>
        } />

        {/* ═══ Rundgang ══════════════════════════════════════════════════ */}
        <Abschnitt id="rundgang" kind={
          <div style={satz}>
            <div style={{ display: 'grid', gap: 'clamp(1.2rem,4vw,4rem)', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', alignItems: 'end' }}>
              <Anzeige kind={<>Sieh es dir an, bevor du herkommst.</>} style={{ maxWidth: '13ch' }} />
              <p style={{ fontSize: 'clamp(18px,1.45vw,21px)', lineHeight: 1.6, color: 'var(--matt)', maxWidth: '44ch' }}>
                Ein Flug durch die Räume: Trainingsflächen, Geräte, Umkleiden. Kein Prospektbild – so
                sieht es aus, wenn du hereinkommst.
              </p>
            </div>
            <div style={{ marginTop: 'clamp(1.8rem,3.5vw,2.8rem)' }}>
              <Video />
            </div>
          </div>
        } />

        {/* ═══ Stimmen ═══════════════════════════════════════════════════ */}
        <Abschnitt style={{ background: 'var(--tiefer)' }} kind={
          <div style={satz}>
            <Anzeige kind={<>Was Mitglieder schreiben.</>} />
            <div style={{ display: 'grid', gap: 'clamp(1rem,2.2vw,1.8rem)', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', marginTop: 'clamp(2.2rem,4.5vw,3.6rem)' }}>
              {stimmen.map(s => (
                <figure key={s.autor} className="tc-glas" style={{ margin: 0, borderRadius: 22, padding: 'clamp(1.3rem,2.4vw,2rem)' }}>
                  <blockquote style={{ margin: 0, fontFamily: 'var(--anzeige)', fontSize: 'clamp(19px,1.75vw,23px)', fontWeight: 500, lineHeight: 1.35, letterSpacing: '-.03em', textWrap: 'pretty' }}>
                    <span aria-hidden="true" style={{ color: 'var(--gold)' }}>„</span>{s.zitat}<span aria-hidden="true" style={{ color: 'var(--gold)' }}>“</span>
                  </blockquote>
                  <figcaption className="tc-klein" style={{ marginTop: '1.3em', color: 'var(--matt)' }}>{s.autor} · Google</figcaption>
                </figure>
              ))}
            </div>
          </div>
        } />

        {/* ═══ Fragen ════════════════════════════════════════════════════ */}
        <Abschnitt id="fragen" kind={
          <div style={{ ...satz, maxWidth: 960 }}>
            <Anzeige kind={<>Was oft gefragt wird.</>} />
            <div className="tc-frage tc-glas" style={{ marginTop: 'clamp(2rem,4vw,3rem)', borderRadius: 22, overflow: 'hidden' }}>
              {fragen.map((f, i) => (
                <details key={f.frage} open={f.offen} style={{ borderTop: i === 0 ? 'none' : '1px solid var(--kante)' }}>
                  <summary>
                    <span style={{ fontFamily: 'var(--anzeige)', fontSize: 'clamp(19px,1.85vw,24px)', fontWeight: 700, letterSpacing: '-.035em' }}>
                      {f.frage}
                    </span>
                    <svg className="tc-kreuz" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" style={{ flex: 'none' }}>
                      <path d="M9 1 V17 M1 9 H17" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </summary>
                  <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--matt)', maxWidth: '66ch', padding: '0 clamp(1.2rem,2.4vw,1.8rem) clamp(1.1rem,2.2vw,1.6rem)' }}>
                    {f.antwort}
                  </p>
                </details>
              ))}
            </div>
          </div>
        } />

        {/* ═══ Termin ════════════════════════════════════════════════════ */}
        <Abschnitt id="termin" style={{ background: 'var(--tiefer)' }} kind={
          <div style={satz}>
            <div style={{ display: 'grid', gap: 'clamp(1.2rem,4vw,4rem)', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', alignItems: 'end' }}>
              <Anzeige kind={termin.titel} style={{ maxWidth: '11ch' }} />
              <p style={{ fontSize: 'clamp(18px,1.45vw,21px)', lineHeight: 1.6, color: 'var(--matt)', maxWidth: '44ch' }}>{termin.text}</p>
            </div>
            <div style={{ marginTop: 'clamp(2rem,4vw,3rem)' }}>
              <Formular />
            </div>
          </div>
        } />

        {/* ═══ Rechtshinweis ═════════════════════════════════════════════ */}
        <section id="hinweis" style={{ ...satz, paddingTop: 'clamp(1rem,2vw,2rem)', paddingBottom: luft, scrollMarginTop: 92 }}>
          <p style={{ fontSize: 14.5, lineHeight: 1.72, color: 'var(--matt)', columnWidth: '46ch', columnGap: 'clamp(1.5rem,4vw,3rem)', hyphens: 'auto' }}>
            {aktion.rechtshinweis.map((s, i) =>
              s.href ? (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>
                  {s.t}
                </a>
              ) : (
                <span key={i}>{s.t}</span>
              ),
            )}
          </p>
        </section>

        {/* ═══ Fuß ═══════════════════════════════════════════════════════ */}
        <footer style={{ background: 'var(--tiefst)' }}>
          <div
            style={{
              ...satz, padding: 'clamp(2.5rem,5vw,4rem) clamp(20px,4vw,54px)',
              display: 'grid', gap: 'clamp(1.5rem,4vw,3rem)',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))', alignItems: 'start',
            }}
          >
            <div>
              <p style={{ fontFamily: 'var(--anzeige)', fontSize: 'clamp(22px,2.2vw,28px)', fontWeight: 700, letterSpacing: '-.04em' }}>Fit-Inn Trier</p>
              <p style={{ marginTop: '.7em', fontSize: 16.5, color: 'var(--matt)' }}>{aktion.adresse}</p>
              <p className="tc-klein" style={{ marginTop: '.9em', color: 'var(--matt)' }}>Sonntags geschlossen</p>
            </div>
            <div style={{ display: 'grid', gap: '.3em', fontSize: 16.5 }}>
              <a href={`tel:${aktion.telefon.link}`} className="tc-ziel">{aktion.telefon.anzeige}</a>
              <a href={`mailto:${aktion.email}`} className="tc-ziel">{aktion.email}</a>
            </div>
            <div style={{ display: 'grid', gap: '.3em', fontSize: 16.5, color: 'var(--matt)' }}>
              <Link href="/" className="tc-ziel">Zur Startseite</Link>
              <Link href="/impressum" className="tc-ziel">Impressum</Link>
              <Link href="/datenschutz" className="tc-ziel">Datenschutz</Link>
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--kante)' }}>
            <p className="tc-klein" style={{ ...satz, padding: '1.2rem clamp(20px,4vw,54px)', color: 'var(--matt)', letterSpacing: '.14em' }}>
              Entwurf C · gestalterische Testfläche · nicht in der Suche gelistet · Buchungen laufen echt
            </p>
          </div>
        </footer>
      </div>
    </main>
  )
}
