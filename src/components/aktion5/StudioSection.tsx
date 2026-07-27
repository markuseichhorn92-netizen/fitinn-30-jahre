import type { ReactNode } from 'react'
import { Hantel, Menschen, Pokal, Puls, Raster, Shaker } from './icons'
import {
  cardText, cardTitle, cellPadLeft, cellPadMid, cellPadRight, eyebrowMuted, iconBubble, wrap,
} from './styles'

const zahlen = [
  { wert: '30 Jahre', label: 'in Familienhand' },
  { wert: 'Premium', label: 'Geräte von TechnoGym, computergesteuert' },
  { wert: '7.000+', label: 'zufriedene Mitglieder' },
  { wert: '250+', label: 'positive Bewertungen' },
]

const geraete = [
  {
    titel: 'Das Gerät kennt dich',
    text: 'Du meldest dich an, das Gerät stellt Sitz, Hebel und Gewicht auf deine Werte ein. Kein Suchen, kein Schätzen.',
  },
  {
    titel: 'Der Bildschirm führt dich',
    text: 'Bewegungsbahn, Tempo und Wiederholungen siehst du live. Auch beim ersten Mal machst du die Übung richtig.',
  },
  {
    titel: 'Alles wird mitgeschrieben',
    text: 'Jede Einheit landet automatisch in deinem Plan. Beim nächsten Mal weiß das Gerät, wo du aufgehört hast.',
  },
]

const merkmale: { icon: ReactNode; titel: string; text: string; pad: string }[] = [
  {
    icon: <Hantel />,
    titel: 'Computergesteuerte Premiumgeräte',
    text: 'Ausschließlich TechnoGym. Die Geräte erkennen dich, stellen sich selbst ein und schreiben jede Einheit mit – sicher zu bedienen, auch wenn du lange nicht trainiert hast.',
    pad: cellPadLeft,
  },
  {
    icon: <Raster />,
    titel: 'Mehrere Trainingsbereiche',
    text: 'Kraft, Cardio und Freihanteln in getrennten Zonen – mit Cardio-Entertainment und viel Abwechslung für jedes Level.',
    pad: cellPadMid,
  },
  {
    icon: <Menschen />,
    titel: 'Betreuung mit Namen',
    text: 'Trainer, die dich kennen und auch über das Training hinaus beraten – von der Haltung am Schreibtisch bis zur Übungsauswahl.',
    pad: cellPadRight,
  },
  {
    icon: <Puls />,
    titel: 'Gesundheits-Check-up',
    text: 'Körperanalyse und digitale Trainingspläne, die in der App gespeichert sind – so siehst du schwarz auf weiß, was sich verändert.',
    pad: cellPadLeft,
  },
  {
    icon: <Shaker />,
    titel: 'Stoffwechsel-Coaching',
    text: 'Begleitung für alle, die Gewicht und Energie nachhaltig verändern wollen – nicht mit Verzicht, sondern mit Verständnis.',
    pad: cellPadMid,
  },
  {
    icon: <Pokal />,
    titel: 'Getränke, Duschen, Sauberkeit',
    text: 'Mineralgetränke inklusive, gepflegte Umkleiden und WLAN. Für Sauberkeit werden wir am häufigsten gelobt.',
    pad: cellPadRight,
  },
]

// AKT 3b · DAS STUDIO
export function StudioSection() {
  return (
    <section
      id="studio"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--paper)',
        padding: 'clamp(2rem,5vw,3.5rem) 0 clamp(6rem,13vw,10rem)',
        scrollMarginTop: 64,
      }}
    >
      <div style={wrap}>
        <div
          style={{
            display: 'grid',
            gap: 'clamp(1.5rem,4vw,4rem)',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))',
            alignItems: 'end',
          }}
        >
          <div>
            <span data-reveal="" style={eyebrowMuted}>Das Studio</span>
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
              Familiengeführt<br />seit 1996.
            </h2>
          </div>
          <p
            data-reveal=""
            style={{
              fontSize: 'clamp(19px,1.9vw,23px)',
              lineHeight: 1.6,
              fontWeight: 300,
              color: 'var(--muted)',
              margin: 0,
              maxWidth: '44ch',
            }}
          >
            Kein Franchise, keine Anonymität. Bei uns bist du{' '}
            <span style={{ color: 'var(--ink)', fontWeight: 600 }}>Teil der Fit-Inn-Familie</span> – wir kennen dich
            beim Namen, in jedem Alter.
          </p>
        </div>

        <div
          data-reveal=""
          style={{
            display: 'grid',
            gap: 'clamp(1.2rem,3vw,2.5rem)',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,180px),1fr))',
            marginTop: 'clamp(2.5rem,5vw,4rem)',
            borderTop: '1px solid var(--line)',
            borderBottom: '1px solid var(--line)',
            padding: 'clamp(1.8rem,3.4vw,2.6rem) 0',
          }}
        >
          {zahlen.map(z => (
            <div key={z.wert} style={{ display: 'flex', flexDirection: 'column', gap: '.3em' }}>
              <span
                style={{
                  fontSize: 'clamp(34px,4vw,52px)',
                  lineHeight: 1,
                  letterSpacing: '-.035em',
                  fontWeight: 800,
                  color: 'var(--ink)',
                }}
              >
                {z.wert}
              </span>
              <span style={{ fontSize: 16.5, fontWeight: 300, color: 'var(--muted)' }}>{z.label}</span>
            </div>
          ))}
        </div>

        {/* USP: die Geräte. Bewusst ausführlicher als die übrigen Merkmale. */}
        <div
          data-reveal=""
          style={{
            marginTop: 'clamp(2.5rem,5vw,4rem)',
            background: 'var(--paper-2)',
            borderRadius: 26,
            padding: 'clamp(1.8rem,4vw,3.2rem)',
          }}
        >
          <span style={eyebrowMuted}>Der Unterschied</span>
          <h3
            style={{
              fontSize: 'clamp(26px,3.4vw,44px)',
              lineHeight: 1.06,
              letterSpacing: '-.035em',
              fontWeight: 800,
              margin: '.3em 0 0',
              maxWidth: '20ch',
            }}
          >
            Premiumgeräte von TechnoGym. Computergesteuert.
          </h3>
          <p
            style={{
              fontSize: 'clamp(18px,1.8vw,21px)',
              lineHeight: 1.6,
              fontWeight: 300,
              color: 'var(--muted)',
              margin: 'clamp(1rem,2vw,1.4rem) 0 0',
              maxWidth: '58ch',
            }}
          >
            Wir setzen ausschließlich auf TechnoGym – den italienischen Hersteller, der auch die Olympischen Spiele
            ausstattet. Der Unterschied zeigt sich nicht am Preisschild, sondern beim ersten Training.
          </p>

          <div
            style={{
              display: 'grid',
              gap: 'clamp(1.4rem,3vw,2.5rem)',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))',
              marginTop: 'clamp(1.8rem,3.5vw,2.6rem)',
            }}
          >
            {geraete.map(g => (
              <div key={g.titel}>
                <span
                  style={{
                    display: 'block',
                    fontSize: 'clamp(20px,2vw,24px)',
                    lineHeight: 1.15,
                    letterSpacing: '-.02em',
                    fontWeight: 600,
                  }}
                >
                  {g.titel}
                </span>
                <p style={{ ...cardText, marginTop: '.6em' }}>{g.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gap: 0,
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,290px),1fr))',
            marginTop: 'clamp(1.5rem,3vw,2.5rem)',
          }}
        >
          {merkmale.map(m => (
            <div
              key={m.titel}
              data-reveal=""
              style={{
                borderBottom: '1px solid var(--line)',
                padding: m.pad,
                display: 'flex',
                flexDirection: 'column',
                gap: '.9em',
              }}
            >
              <span style={iconBubble}>{m.icon}</span>
              <span style={cardTitle}>{m.titel}</span>
              <p style={cardText}>{m.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
