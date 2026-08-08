import Image from 'next/image'
import { aktion, alltag, fragen, haus, stimmen } from './inhalt'
import { Absatz, Platte, satz, schluessel, Stern, Titel } from './teile'

const RUSS = '#17191c'
const ZINNOBER = '#c4402b'

/** Die Rechnung, offen hingeschrieben – beide Laufzeiten, bis zur Endsumme. */
const laufzeiten = [
  {
    name: '52 Wochen',
    zeilen: [
      ['12 Wochen', '× 5 €', '60 €'],
      ['40 Wochen', `× ${aktion.wochenbeitrag.einJahr}`, '480 €'],
    ],
    summe: '540 €',
  },
  {
    name: '104 Wochen',
    zeilen: [
      ['12 Wochen', '× 5 €', '60 €'],
      ['92 Wochen', `× ${aktion.wochenbeitrag.zweiJahre}`, '828 €'],
    ],
    summe: '888 €',
  },
]

// TAFEL II — die Rechnung. Wer zwei Jahre unterschreiben soll, hat ein Recht
// darauf, die Endsumme zu sehen, bevor er sucht.
export function Angebot() {
  return (
    <Platte id="angebot" tafel="Tafel II · Die Rechnung" kind={
      <>
        <Titel kind={<>Was es kostet. Ganz.</>} />
        <Absatz
          style={{ marginTop: 'clamp(.9rem,2vw,1.4rem)', maxWidth: '52ch' }}
          kind={<>Kein Sternchenpreis, hinter dem sich etwas versteckt. Hier steht beides: der Wochenbeitrag und was am Ende der Laufzeit zusammenkommt.<Stern /></>}
        />

        <div
          style={{
            display: 'grid',
            gap: 'clamp(1.2rem,3vw,2.5rem)',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,290px),1fr))',
            marginTop: 'clamp(2rem,4vw,3rem)',
          }}
        >
          {laufzeiten.map((l, i) => (
            <div
              key={l.name}
              style={{
                borderTop: `2px solid ${i === 1 ? ZINNOBER : RUSS}`,
                paddingTop: 'clamp(1rem,2vw,1.4rem)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1em' }}>
                <span style={{ fontSize: 'clamp(21px,2.2vw,27px)', fontWeight: 700, letterSpacing: '-.03em' }}>
                  {l.name}
                </span>
                {i === 1 && (
                  <span style={{ ...schluessel, color: ZINNOBER }}>günstigste Woche</span>
                )}
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1.1em', fontSize: 17 }}>
                <tbody>
                  {l.zeilen.map(([a, b, c]) => (
                    <tr key={a}>
                      <td style={{ padding: '.5em 0', color: 'var(--matt-papier)' }}>{a}</td>
                      <td className="tf-zahl" style={{ padding: '.5em .8em', color: 'var(--matt-papier)', textAlign: 'right' }}>{b}</td>
                      <td className="tf-zahl" style={{ padding: '.5em 0', textAlign: 'right', fontWeight: 600 }}>{c}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={2} style={{ padding: '.9em 0 .3em', borderTop: `1.5px solid ${RUSS}`, fontWeight: 700 }}>
                      Gesamt
                    </td>
                    <td
                      className="tf-zahl"
                      style={{
                        padding: '.9em 0 .3em',
                        borderTop: `1.5px solid ${RUSS}`,
                        textAlign: 'right',
                        fontWeight: 700,
                        fontSize: 'clamp(24px,2.6vw,32px)',
                        letterSpacing: '-.03em',
                        color: ZINNOBER,
                      }}
                    >
                      {l.summe}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <ul
          style={{
            listStyle: 'none',
            margin: 'clamp(1.8rem,3.5vw,2.6rem) 0 0',
            padding: 'clamp(1rem,2vw,1.4rem) 0 0',
            borderTop: '1px solid rgba(23,25,28,.2)',
            display: 'grid',
            gap: '.6em',
            fontSize: 16.5,
            color: 'var(--matt-papier)',
            maxWidth: '70ch',
          }}
        >
          {[
            'Einmalige Aufnahmegebühr 39 €. Einzug in 14-tägigen Intervallen per SEPA-Lastschrift.',
            'Die zwölf Vorteilswochen zählen zur Laufzeit und verlängern sie nicht.',
            `Gilt für Neuabschlüsse bis ${aktion.gueltigBis}, nur für Neumitglieder, ab 18 Jahren.`,
          ].map(t => (
            <li key={t} style={{ display: 'flex', gap: '.7em' }}>
              <span aria-hidden="true" style={{ color: ZINNOBER, flex: 'none', fontWeight: 700 }}>—</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>

        <a href="#termin" className="tf-knopf" style={{ marginTop: 'clamp(1.6rem,3vw,2.2rem)' }}>
          Probetraining wählen
        </a>
      </>
    } />
  )
}

// TAFEL III — wozu das gut ist. Keine Zahlen: dafür gibt es keinen Beleg.
export function Alltag() {
  return (
    <Platte tafel="Tafel III · Der Alltag" kind={
      <>
        <Titel kind={<>Woran du es merkst.</>} />
        <Absatz
          style={{ marginTop: 'clamp(.9rem,2vw,1.4rem)', maxWidth: '52ch' }}
          kind={<>Nicht im Spiegel und nicht auf der Waage. Sondern an den Stellen, an denen der Tag sonst anstrengend war.</>}
        />
        <dl style={{ margin: 'clamp(2rem,4vw,3rem) 0 0' }}>
          {alltag.map(a => (
            <div
              key={a.titel}
              style={{
                borderTop: '1px solid rgba(23,25,28,.2)',
                padding: 'clamp(1.1rem,2.4vw,1.6rem) 0',
                display: 'grid',
                gap: '.4em clamp(1.5rem,4vw,3rem)',
                gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))',
                alignItems: 'baseline',
              }}
            >
              <dt style={{ fontSize: 'clamp(21px,2.3vw,29px)', fontWeight: 700, letterSpacing: '-.03em' }}>
                {a.titel}
              </dt>
              <dd style={{ margin: 0, fontSize: 17.5, lineHeight: 1.6, color: 'var(--matt-papier)' }}>{a.text}</dd>
            </div>
          ))}
        </dl>
      </>
    } />
  )
}

// TAFEL IV — das Haus. Der einzige Ort auf dieser Seite mit einer Fotografie:
// echte Aufnahme der Trainingsfläche, aufgezogen wie ein Bildstreifen.
export function Haus() {
  return (
    <Platte id="haus" tafel="Tafel IV · Das Haus" kind={
      <>
        <div
          style={{
            display: 'grid',
            gap: 'clamp(1.5rem,4vw,3.5rem)',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))',
            alignItems: 'end',
          }}
        >
          <Titel kind={<>Seit 1996 in einer Hand.</>} />
          <Absatz
            kind={<>Kein Franchise, keine wechselnden Gesichter. Dieselben Leute, die dich beim Namen kennen – und die auch noch da sind, wenn du im dritten Jahr wiederkommst.</>}
          />
        </div>

        <div
          style={{
            position: 'relative',
            marginTop: 'clamp(1.8rem,3.5vw,2.6rem)',
            aspectRatio: '21/9',
            overflow: 'hidden',
            border: `1.5px solid ${RUSS}`,
          }}
        >
          <Image
            src="/studio-1.avif"
            alt="Trainingsfläche mit Geräten von TechnoGym im Fit-Inn Trier"
            fill
            sizes="(max-width: 1240px) 100vw, 1160px"
            style={{ objectFit: 'cover', objectPosition: 'center 62%' }}
          />
        </div>

        <dl
          style={{
            display: 'grid',
            gap: 'clamp(1rem,2.5vw,2rem)',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,160px),1fr))',
            margin: 'clamp(1.8rem,3.5vw,2.6rem) 0 0',
          }}
        >
          {haus.map(h => (
            <div key={h.wert} style={{ borderTop: `2px solid ${RUSS}`, paddingTop: '.8em' }}>
              <dt
                className="tf-zahl"
                style={{ fontSize: 'clamp(28px,3.2vw,42px)', fontWeight: 700, letterSpacing: '-.04em', lineHeight: 1 }}
              >
                {h.wert}
              </dt>
              <dd style={{ margin: '.35em 0 0', fontSize: 16.5, lineHeight: 1.5, color: 'var(--matt-papier)' }}>
                {h.label}
              </dd>
            </div>
          ))}
        </dl>
      </>
    } />
  )
}

// TAFEL VI — die Stimmen. Wörtlich aus Google, mit Namen.
export function Stimmen() {
  return (
    <Platte tafel="Tafel VI · Die Stimmen" kind={
      <>
        <Titel kind={<>Was Mitglieder schreiben.</>} />
        <div
          style={{
            display: 'grid',
            gap: 'clamp(1.2rem,3vw,2.5rem)',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,250px),1fr))',
            marginTop: 'clamp(2rem,4vw,3rem)',
          }}
        >
          {stimmen.map(s => (
            <figure key={s.autor} style={{ margin: 0, borderTop: `2px solid ${RUSS}`, paddingTop: 'clamp(1rem,2vw,1.4rem)' }}>
              <blockquote
                style={{
                  margin: 0,
                  fontSize: 'clamp(19px,1.9vw,23px)',
                  lineHeight: 1.45,
                  letterSpacing: '-.02em',
                  fontWeight: 500,
                  textWrap: 'pretty',
                }}
              >
                <span aria-hidden="true" style={{ color: ZINNOBER }}>„</span>{s.zitat}<span aria-hidden="true" style={{ color: ZINNOBER }}>“</span>
              </blockquote>
              <figcaption style={{ ...schluessel, marginTop: '1em', color: 'var(--matt-papier)' }}>
                {s.autor} · Google-Bewertung
              </figcaption>
            </figure>
          ))}
        </div>
      </>
    } />
  )
}

// TAFEL VII — die Erläuterungen. Auf einer Tafel steht das Kleingedruckte
// nicht klein, sondern erklärt.
export function Fragen() {
  return (
    <Platte id="fragen" tafel="Tafel VII · Die Erläuterungen" kind={
      <>
        <Titel kind={<>Was oft gefragt wird.</>} />
        <div className="tf-frage" style={{ marginTop: 'clamp(1.8rem,3.5vw,2.6rem)' }}>
          {fragen.map(f => (
            <details key={f.frage} open={f.offen} style={{ borderTop: '1px solid rgba(23,25,28,.2)' }}>
              <summary style={{ display: 'flex', alignItems: 'center', gap: '1em', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 'clamp(19px,2vw,25px)', fontWeight: 600, letterSpacing: '-.025em' }}>
                  {f.frage}
                </span>
                <svg className="tf-kreuz" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" style={{ flex: 'none' }}>
                  <path d="M10 2 V18 M2 10 H18" stroke={ZINNOBER} strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </summary>
              <p
                style={{
                  fontSize: 17.5,
                  lineHeight: 1.62,
                  color: 'var(--matt-papier)',
                  maxWidth: '66ch',
                  padding: '0 0 clamp(1rem,2vw,1.4rem)',
                }}
              >
                {f.antwort}
              </p>
            </details>
          ))}
        </div>
      </>
    } />
  )
}

// Der Rechtshinweis steht am Fuß der Tafelreihe, im Rand des Grunds – so wie
// der Verlagsvermerk unter einem Schulwandbild.
export function Hinweis() {
  return (
    <section id="hinweis" style={{ ...satz, scrollMarginTop: 76, padding: 'clamp(3rem,6vw,5rem) clamp(16px,4vw,44px)' }}>
      <div style={{ display: 'flex', gap: 'clamp(1rem,2.5vw,2rem)', alignItems: 'flex-start', maxWidth: 980 }}>
        <span
          aria-hidden="true"
          style={{ color: 'var(--chrom)', fontSize: 34, lineHeight: .8, fontWeight: 700, flex: 'none' }}
        >
          *
        </span>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.72,
            color: 'var(--matt-blau)',
            columnWidth: '46ch',
            columnGap: 'clamp(1.5rem,4vw,3rem)',
            hyphens: 'auto',
          }}
        >
          {aktion.rechtshinweis.map((s, i) =>
            s.href ? (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--chrom)' }}>
                {s.t}
              </a>
            ) : (
              <span key={i}>{s.t}</span>
            ),
          )}
        </p>
      </div>
    </section>
  )
}
