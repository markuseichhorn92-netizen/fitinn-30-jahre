import Image from 'next/image'
import { Archivo, Bodoni_Moda, Bricolage_Grotesque, Schibsted_Grotesk } from 'next/font/google'
import { aktion } from '@/components/aktion5/content'
import './entwuerfe.css'

// Drei Kandidaten für die erste Ansicht. Alle drei tragen dieselben echten
// Inhalte – Schlagzeile, Preis, Frist – damit die Entscheidung an der
// Gestaltung fällt und nicht an unterschiedlich gutem Text. Nichts hier ist
// erfunden: 5 € die Woche, danach 12 € bzw. 9 €, Frist 31.08.2026.

const archivo = Archivo({ variable: '--font-archivo', subsets: ['latin'], display: 'swap' })
const schibsted = Schibsted_Grotesk({ variable: '--font-schibsted', subsets: ['latin'], display: 'swap' })
const bodoni = Bodoni_Moda({ variable: '--font-bodoni', subsets: ['latin'], display: 'swap' })
const bricolage = Bricolage_Grotesque({ variable: '--font-bricolage', subsets: ['latin'], display: 'swap' })

const NAV = ['Das Studio', 'Das Angebot', 'Rundgang', 'Fragen']

function Marke({ nr, name, kurz }: { nr: string; name: string; kurz: string }) {
  return (
    <div className="ew-marke">
      <span>Entwurf {nr} — {name}</span>
      <span>{kurz}</span>
    </div>
  )
}

/* ═══ A · Dunkel & kinematisch ═══════════════════════════════════════════ */
function EntwurfA() {
  return (
    <section className="ew-schirm ew-a">
      <div className="bild">
        <Image src="/studio-1.avif" alt="" fill priority sizes="60vw" style={{ objectFit: 'cover' }} />
      </div>
      <div className="glut" aria-hidden="true" />

      <header
        style={{
          position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: '2rem',
          padding: 'clamp(20px,2.6vw,34px) clamp(24px,5vw,68px)',
        }}
      >
        <span style={{ fontSize: 14, letterSpacing: '.28em', fontWeight: 500 }}>FIT-INN TRIER</span>
        <nav style={{ display: 'flex', gap: 'clamp(1.4rem,2.4vw,2.6rem)', alignItems: 'center' }}>
          {NAV.map(n => (
            <span key={n} style={{ fontSize: 14.5, color: 'var(--matt)', letterSpacing: '.01em' }}>{n}</span>
          ))}
          <span
            style={{
              fontSize: 14.5, fontWeight: 600, color: '#0c0d0f', background: 'var(--hell)',
              padding: '.72em 1.4em', borderRadius: 2,
            }}
          >
            Probetraining
          </span>
        </nav>
      </header>

      <div
        style={{
          position: 'relative', zIndex: 2, flex: 1, display: 'flex', flexDirection: 'column',
          justifyContent: 'center', padding: '0 clamp(24px,5vw,68px)', maxWidth: '58%',
        }}
      >
        <span style={{ fontSize: 13, letterSpacing: '.22em', color: 'var(--glut)', marginBottom: '2.2em' }}>
          TRIER-FEYEN · SEIT 1996
        </span>
        <h1
          style={{
            fontSize: 'clamp(44px,5.6vw,86px)', lineHeight: 1.02, letterSpacing: '-.035em',
            fontWeight: 300, textWrap: 'balance',
          }}
        >
          Zwölf Wochen.<br />
          <span style={{ fontWeight: 600 }}>Je fünf Euro.</span>
        </h1>
        <p
          style={{
            marginTop: '1.4em', maxWidth: '40ch', fontSize: 'clamp(17px,1.3vw,19.5px)',
            lineHeight: 1.62, color: 'var(--matt)', fontWeight: 300,
          }}
        >
          Computergesteuerte Geräte von TechnoGym, die sich auf dich einstellen. Und Trainer, die
          deinen Namen kennen.
        </p>
        <div style={{ display: 'flex', gap: 14, marginTop: '2.4em', alignItems: 'center', flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: 16, fontWeight: 600, color: '#0c0d0f', background: 'var(--glut)',
              padding: '1.05em 2.1em', borderRadius: 2,
            }}
          >
            Probetraining sichern
          </span>
          <span
            style={{
              fontSize: 16, color: 'var(--hell)', padding: '1.05em 2.1em', borderRadius: 2,
              border: '1px solid rgba(244,242,238,.3)',
            }}
          >
            Angebot ansehen
          </span>
        </div>
      </div>

      <div
        style={{
          position: 'relative', zIndex: 2, display: 'flex', gap: 'clamp(2rem,5vw,5rem)',
          padding: 'clamp(20px,2.4vw,32px) clamp(24px,5vw,68px)',
          borderTop: '1px solid rgba(244,242,238,.14)',
        }}
      >
        {[
          ['5 €', 'pro Woche, die ersten zwölf'],
          [aktion.wochenbeitrag.einJahr, 'pro Woche danach, 52 Wochen'],
          [aktion.gueltigBis, 'letzter Tag der Aktion'],
        ].map(([w, l]) => (
          <div key={l} style={{ display: 'flex', flexDirection: 'column', gap: '.35em' }}>
            <span style={{ fontSize: 'clamp(19px,1.7vw,24px)', fontWeight: 500, letterSpacing: '-.02em' }}>{w}</span>
            <span style={{ fontSize: 13, color: 'var(--matt)', letterSpacing: '.02em' }}>{l}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ═══ B · Editorial & warm ═══════════════════════════════════════════════ */
function EntwurfB() {
  return (
    <section className="ew-schirm ew-b">
      <header
        style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '2rem',
          padding: 'clamp(22px,2.6vw,34px) clamp(24px,4vw,54px) clamp(16px,1.8vw,22px)',
          borderBottom: '1px solid rgba(23,21,15,.2)',
        }}
      >
        <span style={{ fontSize: 13.5, letterSpacing: '.26em', fontWeight: 500 }}>FIT-INN TRIER</span>
        <nav style={{ display: 'flex', gap: 'clamp(1.4rem,2.4vw,2.4rem)' }}>
          {NAV.map(n => (
            <span key={n} style={{ fontSize: 14.5, color: 'var(--matt)' }}>{n}</span>
          ))}
        </nav>
      </header>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'minmax(0,1.06fr) minmax(0,.94fr)', minHeight: 0 }}>
        <div
          style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            padding: 'clamp(24px,3vw,48px) clamp(24px,4vw,54px)',
            borderRight: '1px solid rgba(23,21,15,.2)',
          }}
        >
          <h1
            className="anzeige"
            style={{
              fontSize: 'clamp(46px,5.9vw,92px)', lineHeight: .96, letterSpacing: '-.028em',
              textWrap: 'balance',
            }}
          >
            Zwölf Wochen.<br />Je fünf Euro.
          </h1>

          <div
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,190px),1fr))',
              gap: 'clamp(1.2rem,2.4vw,2.4rem)', marginTop: 'clamp(1.6rem,2.6vw,2.4rem)',
              paddingTop: 'clamp(1.2rem,2vw,1.8rem)', borderTop: '1px solid rgba(23,21,15,.2)',
            }}
          >
            <p style={{ fontSize: 16.5, lineHeight: 1.6, color: 'var(--matt)' }}>
              Computergesteuerte Geräte von TechnoGym, die sich auf dich einstellen – damit
              Wiederanfangen keine Prüfung ist.
            </p>
            <p style={{ fontSize: 16.5, lineHeight: 1.6, color: 'var(--matt)' }}>
              Familiengeführt seit 1996 in Trier-Feyen. Trainer, die dich beim Namen kennen, nicht
              beim Vertragskürzel.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', marginTop: 'clamp(1.6rem,2.8vw,2.6rem)' }}>
            <span
              style={{
                fontSize: 16, fontWeight: 600, color: 'var(--papier)', background: 'var(--akzent)',
                padding: '1.05em 2.2em', borderRadius: 1,
              }}
            >
              Probetraining sichern
            </span>
            <span style={{ fontSize: 15.5, color: 'var(--matt)' }}>
              danach {aktion.wochenbeitrag.einJahr} pro Woche · Frist {aktion.gueltigBis}
            </span>
          </div>
        </div>

        <div className="bild" style={{ position: 'relative', overflow: 'hidden' }}>
          <Image src="/studio-2.avif" alt="" fill priority sizes="50vw" style={{ objectFit: 'cover' }} />
        </div>
      </div>
    </section>
  )
}

/* ═══ C · Tief & materiell ══════════════════════════════════════════════ */
function EntwurfC() {
  return (
    <section className="ew-schirm ew-c">
      <div className="bild">
        <Image src="/studio-1.avif" alt="" fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(18px,2vw,26px) clamp(20px,4vw,54px) 0' }}>
        <header
          className="glas"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem',
            borderRadius: 999, padding: '.55rem .7rem .55rem 1.5rem',
          }}
        >
          <span style={{ fontSize: 13.5, letterSpacing: '.24em', fontWeight: 600 }}>FIT-INN TRIER</span>
          <nav style={{ display: 'flex', gap: 'clamp(1.2rem,2.2vw,2.2rem)', alignItems: 'center' }}>
            {NAV.map(n => (
              <span key={n} style={{ fontSize: 14.5, color: 'var(--matt)' }}>{n}</span>
            ))}
            <span
              style={{
                fontSize: 14.5, fontWeight: 700, color: '#07201f', background: 'var(--akzent)',
                padding: '.72em 1.4em', borderRadius: 999,
              }}
            >
              Probetraining
            </span>
          </nav>
        </header>
      </div>

      <div
        style={{
          position: 'relative', zIndex: 2, flex: 1, display: 'grid',
          gridTemplateColumns: 'minmax(0,1.35fr) minmax(280px,.65fr)',
          gap: 'clamp(1.5rem,3vw,3.5rem)', alignItems: 'center',
          padding: 'clamp(20px,3vw,48px) clamp(20px,4vw,54px)',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 'clamp(48px,6.6vw,104px)', lineHeight: .92, letterSpacing: '-.045em',
              fontWeight: 700, textWrap: 'balance',
            }}
          >
            Zwölf Wochen.<br />Je fünf Euro.
          </h1>
          <p
            style={{
              marginTop: '1.1em', maxWidth: '40ch', fontSize: 'clamp(17px,1.35vw,20px)',
              lineHeight: 1.6, color: 'var(--matt)',
            }}
          >
            Computergesteuerte Geräte von TechnoGym, die sich auf dich einstellen. Familiengeführt in
            Trier-Feyen seit 1996.
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: '2em', flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: 16.5, fontWeight: 700, color: '#07201f', background: 'var(--akzent)',
                padding: '1.05em 2.2em', borderRadius: 999,
              }}
            >
              Probetraining sichern
            </span>
            <span
              className="glas"
              style={{ fontSize: 16.5, color: 'var(--hell)', padding: '1.05em 2.2em', borderRadius: 999 }}
            >
              Angebot ansehen
            </span>
          </div>
        </div>

        <div className="glas" style={{ borderRadius: 26, padding: 'clamp(1.4rem,2.4vw,2.2rem)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '.3em' }}>
            <span
              style={{
                fontSize: 'clamp(58px,6vw,92px)', lineHeight: .84, fontWeight: 700,
                letterSpacing: '-.055em', color: 'var(--akzent)',
              }}
            >
              5 €
            </span>
            <span style={{ fontSize: 19, fontWeight: 600, color: 'var(--hell)' }}>/ Woche</span>
          </div>
          <p style={{ marginTop: '.9em', fontSize: 16.5, color: 'var(--hell)', fontWeight: 600 }}>
            für die ersten zwölf Wochen
          </p>
          <div
            style={{
              marginTop: '1.2em', paddingTop: '1em', borderTop: '1px solid rgba(241,245,242,.18)',
              display: 'grid', gap: '.55em', fontSize: 15.5, color: 'var(--matt)',
            }}
          >
            {[
              ['danach, 52 Wochen', `${aktion.wochenbeitrag.einJahr} / Woche`],
              ['danach, 104 Wochen', `${aktion.wochenbeitrag.zweiJahre} / Woche`],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: '1em' }}>
                <span>{k}</span>
                <span style={{ color: 'var(--hell)', fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
          <p style={{ marginTop: '1.1em', fontSize: 13, letterSpacing: '.06em', color: 'var(--matt)' }}>
            NEUABSCHLÜSSE BIS {aktion.gueltigBis}
          </p>
        </div>
      </div>
    </section>
  )
}

export function Entwuerfe() {
  return (
    <main className={`ew ${archivo.variable} ${schibsted.variable} ${bodoni.variable} ${bricolage.variable}`}>
      <Marke nr="A" name="Dunkel & kinematisch" kurz="Graphit · Studiofoto hart belichtet · feine helle Schrift" />
      <EntwurfA />
      <Marke nr="B" name="Editorial & warm" kurz="Papier · Displayserife · strenges Raster, viel Luft" />
      <EntwurfB />
      <Marke nr="C" name="Tief & materiell" kurz="Sattes Petrol · Glasebenen mit Tiefe · große Schrift" />
      <EntwurfC />
    </main>
  )
}
