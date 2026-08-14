import Image from 'next/image'
import Link from 'next/link'
import { Inter, Onest } from 'next/font/google'
import type { CSSProperties, ReactNode } from 'react'
import {
  aktion, alltag, angebotFussnoten, fragen, geraete, haus, hero, laufzeiten, stimmen, termin,
} from '@/components/kampagne/inhalt'
import { Formular } from './Formular'
import './hell.css'
import { Navigation, Video } from './Teile'

const inter = Inter({ variable: '--font-inter', subsets: ['latin'], display: 'swap' })
const onest = Onest({ variable: '--font-onest', subsets: ['latin'], display: 'swap' })

/*
<!--
ENTWURF D · HELL · /hell — nach dem Vorbild von pressmaster.ai

HERKUNFT: Die Formensprache stammt von pressmaster.ai und ist aus deren
Stylesheet ausgelesen, nicht geschaetzt. Uebernommen sind Palette
(#406ece auf Weiss und #f8f9fb/#eef2f8), Rundungen (12/16/24px, Pillen bei
100px), weiche Raender statt Schatten, Karten- und Plakettenlogik sowie die
Schriftwahl (Inter, Onest). Inhalte, Aufbau, Texte und Belege sind unsere.

THESE: Das Gegenteil der beiden dunklen Entwuerfe. Helle, ruhige Flaechen,
ein einziges kraeftiges Blau fuer alles Handelnde, viel Weissraum. Fuer eine
Zielgruppe ab 50, die abends am Telefon liest, ist das die lesbarste der
vier Welten.

BEWEGUNG: eine. Der Belegstreifen zieht ruhig durch und haelt beim
Darauffahren an. Sonst bewegt sich nichts von selbst.

ERSTE ANSICHT: Plakette mit der Frist, Schlagzeile, Subline, zwei
Handlungen, darunter drei belegte Zahlen und rechts das Studiofoto in einem
gerundeten Rahmen.
-->
*/

const satz: CSSProperties = { width: '100%', maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px,4vw,40px)' }
const luft = 'clamp(4.5rem,9vw,8rem)'

function Abschnitt({ id, kind, style }: { id?: string; kind: ReactNode; style?: CSSProperties }) {
  return (
    <section id={id} style={{ padding: `${luft} 0`, scrollMarginTop: 80, ...style }}>
      <div style={satz}>{kind}</div>
    </section>
  )
}

function Anzeige({ kind, style }: { kind: ReactNode; style?: CSSProperties }) {
  return (
    <h2
      style={{
        fontSize: 'clamp(30px,4vw,54px)',
        fontWeight: 600,
        letterSpacing: '-.04em',
        lineHeight: 1.08,
        textWrap: 'balance',
        maxWidth: '20ch',
        ...style,
      }}
    >
      {kind}
    </h2>
  )
}

function Fuehrung({ kind }: { kind: ReactNode }) {
  return (
    <p style={{ marginTop: 'clamp(.9rem,1.8vw,1.3rem)', maxWidth: '58ch', fontSize: 'clamp(17px,1.4vw,20px)', lineHeight: 1.6, color: 'var(--matt)' }}>
      {kind}
    </p>
  )
}

/* Gezeichnete Sinnbilder, eine Strichstärke, kein Symbolschriftsatz. */
const sinnbilder = [
  // Erkennung: Ausweis am Lesegerät
  <svg key="a" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2.5" y="5" width="13" height="14" rx="2.5" /><circle cx="9" cy="10" r="2" /><path d="M6 15.5c.6-1.4 1.7-2 3-2s2.4.6 3 2" />
    <path d="M18.5 9c1 1.2 1 4.8 0 6M21 7c1.6 2 1.6 8 0 10" />
  </svg>,
  // Einstellung: Schieberegler
  <svg key="b" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
    <path d="M4 7h16M4 12h16M4 17h16" /><circle cx="9" cy="7" r="2.4" fill="currentColor" stroke="none" />
    <circle cx="15" cy="12" r="2.4" fill="currentColor" stroke="none" /><circle cx="7" cy="17" r="2.4" fill="currentColor" stroke="none" />
  </svg>,
  // Führung: Bildschirm mit Bewegungsbahn
  <svg key="c" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2.5" y="4" width="19" height="13" rx="2.5" /><path d="M6 13.5c2-5 6-5.4 8-2.2" /><circle cx="15" cy="11" r="1.4" fill="currentColor" stroke="none" />
    <path d="M9 20h6" />
  </svg>,
  // Protokoll: Verlauf
  <svg key="d" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.5 20V4M3.5 20h17" /><path d="M7 16.5l4-4.5 3.5 3L20 8" /><circle cx="20" cy="8" r="1.6" fill="currentColor" stroke="none" />
  </svg>,
]

/** Die Belege für den Laufstreifen. Alle nachweisbar. */
const belege = [
  'Familiengeführt seit 1996',
  'Über 7.000 Mitglieder',
  'Über 250 positive Bewertungen',
  'Ausschließlich TechnoGym',
  'Für Sauberkeit am häufigsten gelobt',
  'Trier-Feyen, Auf Hirtenberg 8',
]

const schritte = [
  { titel: 'Termin wählen', text: 'Tag und Uhrzeit unten aussuchen. Dauert eine Minute, kostet nichts.' },
  { titel: 'Vorbeikommen', text: 'Wir zeigen dir alles in Ruhe, beantworten deine Fragen und du trainierst einmal mit.' },
  { titel: 'In Ruhe entscheiden', text: 'Kein Verkaufsgespräch an der Tür. Du gehst wieder – oder bleibst.' },
]

export function HellSeite() {
  return (
    <main id="oben" className={`hl ${inter.variable} ${onest.variable}`}>
      <Navigation />

      {/* ═══ Erste Ansicht ═══════════════════════════════════════════════ */}
      <header style={{ background: 'var(--grund)', paddingTop: 'clamp(2.5rem,6vw,5rem)', paddingBottom: 'clamp(2rem,4vw,3.5rem)' }}>
        <div
          style={{
            ...satz, display: 'grid', gap: 'clamp(2rem,4vw,4rem)',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))', alignItems: 'center',
          }}
        >
          <div>
            <span className="hl-plakette">
              <b>Neu</b> Nur für Neuabschlüsse bis {aktion.gueltigBis}
            </span>
            <h1
              style={{
                fontSize: 'clamp(38px,5.2vw,70px)', fontWeight: 600, letterSpacing: '-.045em',
                lineHeight: 1.04, marginTop: 'clamp(1.1rem,2.2vw,1.7rem)', textWrap: 'balance', maxWidth: '13ch',
              }}
            >
              {hero.zeile1}<br />
              <span style={{ color: 'var(--blau)' }}>{hero.zeile2}</span>
            </h1>
            <p style={{ marginTop: '1.1em', maxWidth: '44ch', fontSize: 'clamp(17px,1.4vw,20px)', lineHeight: 1.6, color: 'var(--matt)' }}>
              {hero.subline}
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 'clamp(1.6rem,3vw,2.2rem)', flexWrap: 'wrap' }}>
              <a href="#termin" className="hl-knopf">Probetraining sichern</a>
              <a href="#angebot" className="hl-knopf hl-knopf--rand">Was es kostet</a>
            </div>

            <div
              style={{
                display: 'grid', gap: 'clamp(1rem,2.5vw,2rem)',
                gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
                marginTop: 'clamp(1.8rem,3.4vw,2.6rem)', paddingTop: 'clamp(1.3rem,2.4vw,1.8rem)',
                borderTop: '1px solid var(--linie)',
              }}
            >
              {[
                ['5 €', 'pro Woche, die ersten zwölf'],
                [aktion.wochenbeitrag.einJahr, 'pro Woche danach, 52 Wochen'],
                ['0 €', 'kostet das Probetraining'],
              ].map(([w, l]) => (
                <div key={l}>
                  <div className="hl-zahl" style={{ fontFamily: 'var(--anzeige)', fontSize: 'clamp(22px,2vw,28px)', fontWeight: 700, letterSpacing: '-.04em' }}>{w}</div>
                  <div style={{ fontSize: 14.5, color: 'var(--matt)', marginTop: '.2em' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', border: '1px solid var(--linie)', aspectRatio: '4/3' }}>
            <Image
              src="/studio-1.avif"
              alt="Trainingsfläche mit Geräten von TechnoGym im Fit-Inn Trier"
              fill priority sizes="(max-width: 900px) 100vw, 560px"
              style={{ objectFit: 'cover', objectPosition: '55% 60%' }}
            />
          </div>
        </div>
      </header>

      {/* ═══ Belegstreifen ═══════════════════════════════════════════════ */}
      <div style={{ background: 'var(--grund-2)', borderBlock: '1px solid var(--linie)', padding: 'clamp(.9rem,1.8vw,1.3rem) 0' }}>
        <div className="hl-band">
          <div className="hl-band-spur">
            {[0, 1].map(runde => (
              <div key={runde} style={{ display: 'flex', gap: 'clamp(1.5rem,3vw,3rem)', paddingRight: 'clamp(1.5rem,3vw,3rem)' }} aria-hidden={runde === 1}>
                {belege.map(b => (
                  <span key={b} style={{ display: 'inline-flex', alignItems: 'center', gap: '.6em', whiteSpace: 'nowrap', fontSize: 15.5, color: 'var(--tinte-2)', fontWeight: 500 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flex: 'none' }}>
                      <path d="M4 12.5 L9.5 18 L20 6.5" stroke="var(--blau)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {b}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ Die Geräte ══════════════════════════════════════════════════ */}
      <Abschnitt id="geraete" kind={
        <>
          <Anzeige kind={geraete.titel} />
          <Fuehrung kind={geraete.text} />
          <div
            style={{
              display: 'grid', gap: 'clamp(.9rem,1.8vw,1.4rem)',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,250px),1fr))',
              marginTop: 'clamp(2rem,4vw,3.2rem)',
            }}
          >
            {geraete.punkte.map((p, i) => (
              <div key={p.titel} className="hl-karte hl-karte--blass">
                <span className="hl-sinnbild">{sinnbilder[i]}</span>
                <h3 style={{ fontSize: 'clamp(19px,1.7vw,22px)', marginTop: '1.1em', letterSpacing: '-.03em' }}>{p.titel}</h3>
                <p style={{ marginTop: '.5em', fontSize: 16.5, lineHeight: 1.55, color: 'var(--matt)' }}>{p.text}</p>
              </div>
            ))}
          </div>
        </>
      } />

      {/* ═══ Der Alltag ══════════════════════════════════════════════════ */}
      <Abschnitt style={{ background: 'var(--grund-2)' }} kind={
        <>
          <Anzeige kind={alltag.titel} />
          <Fuehrung kind={alltag.text} />
          <div
            style={{
              display: 'grid', gap: 'clamp(.9rem,1.8vw,1.4rem)',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))',
              marginTop: 'clamp(2rem,4vw,3.2rem)',
            }}
          >
            {alltag.punkte.map(p => (
              <div key={p.titel} className="hl-karte">
                <h3 style={{ fontSize: 'clamp(19px,1.7vw,23px)', letterSpacing: '-.03em' }}>{p.titel}</h3>
                <p style={{ marginTop: '.5em', fontSize: 16.5, lineHeight: 1.55, color: 'var(--matt)' }}>{p.text}</p>
              </div>
            ))}
          </div>
        </>
      } />

      {/* ═══ Das Angebot ═════════════════════════════════════════════════ */}
      <Abschnitt id="angebot" kind={
        <>
          <Anzeige kind={<>Was es kostet. Ganz.</>} />
          <Fuehrung kind={<>Kein Sternchenpreis, hinter dem sich etwas versteckt. Hier steht beides: der Wochenbeitrag und was am Ende der Laufzeit zusammenkommt.</>} />

          <div
            style={{
              display: 'grid', gap: 'clamp(1rem,2vw,1.6rem)',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))',
              marginTop: 'clamp(2rem,4vw,3.2rem)', alignItems: 'start',
            }}
          >
            {laufzeiten.map(l => (
              <div key={l.name} className={`hl-karte hl-karte--gross${l.hinweis ? ' hl-karte--betont' : ''}`}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1em', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: 'clamp(21px,2vw,26px)', letterSpacing: '-.035em' }}>{l.name}</h3>
                  {l.hinweis && (
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#fff', background: 'var(--blau)', padding: '.35em .9em', borderRadius: 100 }}>
                      {l.hinweis}
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '.25em', marginTop: '1em' }}>
                  <span className="hl-zahl" style={{ fontFamily: 'var(--anzeige)', fontSize: 'clamp(38px,4vw,52px)', fontWeight: 700, letterSpacing: '-.05em', lineHeight: 1 }}>
                    {l.proWoche}
                  </span>
                  <span style={{ fontSize: 17, color: 'var(--matt)', fontWeight: 500 }}>/ Woche nach den zwölf</span>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1.4em', fontSize: 16.5 }}>
                  <tbody>
                    {l.zeilen.map(z => (
                      <tr key={z.was}>
                        <td style={{ padding: '.5em 0', color: 'var(--matt)' }}>{z.was}</td>
                        <td className="hl-zahl" style={{ padding: '.5em .8em', color: 'var(--matt)', textAlign: 'right', whiteSpace: 'nowrap' }}>{z.rechnung}</td>
                        <td className="hl-zahl" style={{ padding: '.5em 0', textAlign: 'right', fontWeight: 600 }}>{z.summe}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={2} style={{ padding: '.9em 0 .2em', borderTop: '1px solid var(--linie)', fontWeight: 700 }}>Gesamt</td>
                      <td
                        className="hl-zahl"
                        style={{
                          padding: '.9em 0 .2em', borderTop: '1px solid var(--linie)', textAlign: 'right',
                          fontFamily: 'var(--anzeige)', fontSize: 'clamp(23px,2.3vw,30px)', fontWeight: 700,
                          letterSpacing: '-.04em', color: 'var(--blau)',
                        }}
                      >
                        {l.gesamt}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <a href="#termin" className={`hl-knopf${l.hinweis ? '' : ' hl-knopf--rand'}`} style={{ width: '100%', marginTop: '1.5em' }}>
                  Probetraining sichern
                </a>
              </div>
            ))}
          </div>

          <ul style={{ listStyle: 'none', margin: 'clamp(1.5rem,3vw,2.2rem) 0 0', padding: 0, display: 'grid', gap: '.55em', fontSize: 15.5, color: 'var(--matt)', maxWidth: '74ch' }}>
            {angebotFussnoten.map(t => (
              <li key={t} style={{ display: 'flex', gap: '.7em' }}>
                <span aria-hidden="true" style={{ color: 'var(--blau)' }}>•</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </>
      } />

      {/* ═══ So läuft es ═════════════════════════════════════════════════ */}
      <Abschnitt style={{ background: 'var(--blau-blass)' }} kind={
        <>
          <Anzeige kind={<>So läuft dein Probetraining.</>} />
          <div
            style={{
              display: 'grid', gap: 'clamp(1rem,2vw,1.6rem)',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,250px),1fr))',
              marginTop: 'clamp(2rem,4vw,3.2rem)',
            }}
          >
            {schritte.map((s, i) => (
              <div key={s.titel} className="hl-karte">
                <span
                  className="hl-zahl"
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 38, height: 38, borderRadius: 100, background: 'var(--blau)', color: '#fff',
                    fontFamily: 'var(--anzeige)', fontWeight: 700, fontSize: 17,
                  }}
                >
                  {i + 1}
                </span>
                <h3 style={{ fontSize: 'clamp(19px,1.7vw,22px)', marginTop: '.9em', letterSpacing: '-.03em' }}>{s.titel}</h3>
                <p style={{ marginTop: '.5em', fontSize: 16.5, lineHeight: 1.55, color: 'var(--matt)' }}>{s.text}</p>
              </div>
            ))}
          </div>
        </>
      } />

      {/* ═══ Rundgang ════════════════════════════════════════════════════ */}
      <Abschnitt id="rundgang" kind={
        <>
          <div style={{ display: 'grid', gap: 'clamp(1rem,3vw,3rem)', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', alignItems: 'end' }}>
            <Anzeige kind={<>Sieh es dir an, bevor du herkommst.</>} style={{ maxWidth: '15ch' }} />
            <p style={{ fontSize: 'clamp(17px,1.4vw,20px)', lineHeight: 1.6, color: 'var(--matt)', maxWidth: '44ch' }}>
              Ein Flug durch die Räume: Trainingsflächen, Geräte, Umkleiden. Kein Prospektbild – so
              sieht es aus, wenn du hereinkommst.
            </p>
          </div>
          <div style={{ marginTop: 'clamp(1.6rem,3vw,2.4rem)' }}>
            <Video />
          </div>
        </>
      } />

      {/* ═══ Das Haus ════════════════════════════════════════════════════ */}
      <Abschnitt id="haus" style={{ background: 'var(--grund-2)' }} kind={
        <>
          <div style={{ display: 'grid', gap: 'clamp(1.5rem,4vw,4rem)', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', alignItems: 'center' }}>
            <div>
              <Anzeige kind={haus.titel} style={{ maxWidth: '12ch' }} />
              <Fuehrung kind={haus.text} />
              <dl
                style={{
                  display: 'grid', gap: 'clamp(1rem,2vw,1.6rem)',
                  gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,130px),1fr))',
                  margin: 'clamp(1.6rem,3vw,2.4rem) 0 0',
                }}
              >
                {haus.zahlen.map(z => (
                  <div key={z.wert}>
                    <dt className="hl-zahl" style={{ fontFamily: 'var(--anzeige)', fontSize: 'clamp(23px,2.2vw,30px)', fontWeight: 700, letterSpacing: '-.045em', lineHeight: 1 }}>
                      {z.wert}
                    </dt>
                    <dd style={{ margin: '.4em 0 0', fontSize: 14.5, color: 'var(--matt)', lineHeight: 1.45 }}>{z.label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="hl-karte hl-karte--gross" style={{ background: 'var(--grund)' }}>
              <h3 style={{ fontSize: 'clamp(18px,1.6vw,21px)', letterSpacing: '-.03em' }}>Was drin ist</h3>
              <ul style={{ listStyle: 'none', margin: '1.1em 0 0', padding: 0, display: 'grid', gap: '.75em', fontSize: 16.5, color: 'var(--matt)' }}>
                {haus.leistungen.map(l => (
                  <li key={l} style={{ display: 'flex', gap: '.75em', alignItems: 'flex-start' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flex: 'none', marginTop: '.35em' }}>
                      <path d="M4 12.5 L9.5 18 L20 6.5" stroke="var(--blau)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      } />

      {/* ═══ Stimmen ═════════════════════════════════════════════════════ */}
      <Abschnitt kind={
        <>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem 2rem', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Anzeige kind={<>Was Mitglieder schreiben.</>} />
            {/* Belegt: über 250 positive Bewertungen. Wie viele Sterne die drei
                Zitierten einzeln vergeben haben, wissen wir nicht – deshalb
                stehen hier keine Sterne an den Zitaten. */}
            <span
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '.6em', padding: '.5em 1.1em',
                borderRadius: 100, background: 'var(--blau-blass)', border: '1px solid var(--linie)',
                fontSize: 15.5, fontWeight: 500, color: 'var(--tinte-2)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--orange)" aria-hidden="true">
                <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
              </svg>
              Über 250 positive Bewertungen
            </span>
          </div>
          <div
            style={{
              display: 'grid', gap: 'clamp(.9rem,1.8vw,1.4rem)',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))',
              marginTop: 'clamp(2rem,4vw,3.2rem)',
            }}
          >
            {stimmen.map(s => (
              <figure key={s.autor} className="hl-karte" style={{ margin: 0 }}>
                <svg width="26" height="20" viewBox="0 0 26 20" fill="var(--linie-2)" aria-hidden="true">
                  <path d="M0 20V11.4C0 5.1 3.4 1 9.6 0l1 2.4C7 3.6 5.3 6 5.3 8.7h4.4V20H0Zm16.3 0V11.4C16.3 5.1 19.7 1 25.9 0l1 2.4c-3.6 1.2-5.3 3.6-5.3 6.3H26V20h-9.7Z" />
                </svg>
                <blockquote style={{ margin: '.9em 0 0', fontSize: 17.5, lineHeight: 1.55, textWrap: 'pretty' }}>
                  {s.zitat}
                </blockquote>
                <figcaption style={{ marginTop: '1.1em', fontSize: 15, color: 'var(--matt)', fontWeight: 500 }}>
                  {s.autor} · Google-Bewertung
                </figcaption>
              </figure>
            ))}
          </div>
        </>
      } />

      {/* ═══ Fragen ══════════════════════════════════════════════════════ */}
      <Abschnitt id="fragen" style={{ background: 'var(--grund-2)' }} kind={
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <Anzeige kind={<>Was oft gefragt wird.</>} style={{ maxWidth: '18ch' }} />
          <div className="hl-frage" style={{ marginTop: 'clamp(1.8rem,3.5vw,2.6rem)', display: 'grid', gap: 10 }}>
            {fragen.map(f => (
              <details key={f.frage} open={f.offen} className="hl-karte" style={{ padding: 0, overflow: 'hidden' }}>
                <summary>
                  <span style={{ fontFamily: 'var(--anzeige)', fontSize: 'clamp(18px,1.6vw,21px)', fontWeight: 600, letterSpacing: '-.03em' }}>
                    {f.frage}
                  </span>
                  <svg className="hl-kreuz" width="17" height="17" viewBox="0 0 18 18" aria-hidden="true" style={{ flex: 'none' }}>
                    <path d="M9 1 V17 M1 9 H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </summary>
                <p style={{ fontSize: 16.5, lineHeight: 1.6, color: 'var(--matt)', maxWidth: '68ch', padding: '0 clamp(1.2rem,2.4vw,1.8rem) clamp(1.1rem,2.2vw,1.5rem)' }}>
                  {f.antwort}
                </p>
              </details>
            ))}
          </div>
        </div>
      } />

      {/* ═══ Termin ══════════════════════════════════════════════════════ */}
      <Abschnitt id="termin" kind={
        <>
          <div style={{ display: 'grid', gap: 'clamp(1rem,3vw,3rem)', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', alignItems: 'end' }}>
            <Anzeige kind={termin.titel} style={{ maxWidth: '12ch' }} />
            <p style={{ fontSize: 'clamp(17px,1.4vw,20px)', lineHeight: 1.6, color: 'var(--matt)', maxWidth: '44ch' }}>{termin.text}</p>
          </div>
          <div style={{ marginTop: 'clamp(1.8rem,3.5vw,2.6rem)' }}>
            <Formular />
          </div>
        </>
      } />

      {/* ═══ Rechtshinweis ═══════════════════════════════════════════════ */}
      <section id="hinweis" style={{ background: 'var(--grund-2)', borderTop: '1px solid var(--linie)', padding: 'clamp(2rem,4vw,3rem) 0', scrollMarginTop: 80 }}>
        <div style={satz}>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--matt)', columnWidth: '46ch', columnGap: 'clamp(1.5rem,4vw,3rem)', hyphens: 'auto' }}>
            {aktion.rechtshinweis.map((s, i) =>
              s.href ? (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blau)', textDecoration: 'underline' }}>
                  {s.t}
                </a>
              ) : (
                <span key={i}>{s.t}</span>
              ),
            )}
          </p>
        </div>
      </section>

      {/* ═══ Fuß ═════════════════════════════════════════════════════════ */}
      <footer style={{ background: 'var(--grund)', borderTop: '1px solid var(--linie)' }}>
        <div
          style={{
            ...satz, padding: 'clamp(2.5rem,5vw,4rem) clamp(20px,4vw,40px)',
            display: 'grid', gap: 'clamp(1.5rem,4vw,3rem)',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))', alignItems: 'start',
          }}
        >
          <div>
            <p style={{ fontFamily: 'var(--anzeige)', fontWeight: 700, fontSize: 21, letterSpacing: '-.035em' }}>
              Fit-Inn{' '}<span style={{ color: 'var(--blau)' }}>Trier</span>
            </p>
            <p style={{ marginTop: '.7em', fontSize: 16.5, color: 'var(--matt)' }}>{aktion.adresse}</p>
            <p style={{ marginTop: '.5em', fontSize: 15, color: 'var(--matt)' }}>Sonntags geschlossen</p>
          </div>
          <div style={{ display: 'grid', gap: '.2em', fontSize: 16.5 }}>
            <a href={`tel:${aktion.telefon.link}`} className="hl-ziel">{aktion.telefon.anzeige}</a>
            <a href={`mailto:${aktion.email}`} className="hl-ziel">{aktion.email}</a>
          </div>
          <div style={{ display: 'grid', gap: '.2em', fontSize: 16.5, color: 'var(--matt)' }}>
            <Link href="/" className="hl-ziel">Zur Startseite</Link>
            <Link href="/impressum" className="hl-ziel">Impressum</Link>
            <Link href="/datenschutz" className="hl-ziel">Datenschutz</Link>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--linie)' }}>
          <p style={{ ...satz, padding: '1.1rem clamp(20px,4vw,40px)', fontSize: 13.5, color: 'var(--matt)' }}>
            Entwurf D · gestalterische Testfläche · nicht in der Suche gelistet · Buchungen laufen echt
          </p>
        </div>
      </footer>
    </main>
  )
}
