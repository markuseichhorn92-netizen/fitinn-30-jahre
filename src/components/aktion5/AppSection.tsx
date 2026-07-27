import type { ReactNode } from 'react'
import { Glow } from './Decor'
import { Bot, Buch, Diagramm, Hantel, Puls } from './icons'
import {
  btnAmberSm, cardTitle, cellPadLeft, cellPadMid, cellPadRight, eyebrowMuted, iconBubble, wrap,
} from './styles'

const bausteine: { icon: ReactNode; titel: string; punkte: string[]; pad: string }[] = [
  {
    icon: <Diagramm />,
    titel: 'Ernährung ohne Rechnen',
    punkte: [
      'Teller fotografieren – Kalorien und Makros erkennt die App selbst.',
      'Wochenpläne und Rezepte auf deine Zielwerte zugeschnitten.',
      'Im Supermarkt Produkt scannen: Ampel und Empfehlung fürs Ziel.',
      'Heißhunger-SOS, wenn es schwierig wird.',
    ],
    pad: cellPadLeft,
  },
  {
    icon: <Hantel />,
    titel: 'Zusätzliche KI-Pläne für zu Hause',
    punkte: [
      'Deinen Studio-Trainingsplan bekommst du ohnehin von uns – diese Pläne entstehen zusätzlich in der App.',
      'Für Tage ohne Studio: nach Ziel, Level und der Ausrüstung, die du daheim hast.',
      'Steigern sich automatisch anhand deiner protokollierten Einheiten.',
    ],
    pad: cellPadMid,
  },
  {
    icon: <Puls />,
    titel: 'Herz & Erholung im Blick',
    punkte: [
      'Morgen-Messung zeigt, ob heute Training oder Ruhe ansteht.',
      'Cardio-Zonen und Ziel-Gewichte für die Kraft-Last.',
      'HRV-Fitnessalter und Warnung vor Übertraining.',
    ],
    pad: cellPadRight,
  },
  {
    icon: <Buch />,
    titel: 'Wöchentliche Impulse in der App',
    punkte: [
      'Lektionen und Vertiefungen Woche für Woche.',
      'Tagesimpulse und eine Erfolgskontrolle nach 14 Tagen.',
    ],
    pad: cellPadLeft,
  },
  {
    icon: <Bot />,
    titel: 'FINN, dein KI-Coach',
    punkte: [
      'Fragen zu Ernährung, Training und Erholung – jederzeit im Chat.',
      'Wochen-Auswertung mit Empfehlungen aus deinen echten Daten.',
      'Einordnung von InBody-Messung und Figur-Check.',
    ],
    pad: cellPadMid,
  },
]

// AKT 4b · APP-BONUS
export function AppSection() {
  return (
    <section
      id="app"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--paper)',
        padding: 'clamp(6rem,13vw,11rem) 0',
        scrollMarginTop: 64,
      }}
    >
      <Glow
        style={{ left: '-10%', top: '-8%', width: 'min(52vw,480px)', height: 'min(52vw,480px)' }}
        strength=".2"
      />

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
            <span data-reveal="" style={eyebrowMuted}>Nur bei 2 Jahren · in der Fit-Inn App</span>
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
              Dein Coach<br />in der App.
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
            Zur <span style={{ color: 'var(--ink)', fontWeight: 600 }}>2-Jahres-Mitgliedschaft</span> gehören{' '}
            <span style={{ color: 'var(--ink)', fontWeight: 600 }}>3 Monate Coach Premium</span> in der Fit-Inn Trier
            App – kostenfrei. Das sind{' '}
            <span style={{ color: 'var(--ink)', fontWeight: 600 }}>digitale Funktionen auf deinem Handy</span> für die
            Zeit zwischen den Trainings. Die persönliche Betreuung im Studio bekommst du ohnehin von unserem Team.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gap: 0,
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,290px),1fr))',
            marginTop: 'clamp(2.5rem,5vw,4rem)',
          }}
        >
          {bausteine.map(b => (
            <div
              key={b.titel}
              data-reveal=""
              style={{
                borderTop: '1px solid var(--line)',
                padding: b.pad,
                display: 'flex',
                flexDirection: 'column',
                gap: '1.1em',
              }}
            >
              <span style={iconBubble}>{b.icon}</span>
              <span style={cardTitle}>{b.titel}</span>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '.7em',
                  fontSize: 17,
                  lineHeight: 1.55,
                  fontWeight: 300,
                  color: 'var(--muted)',
                }}
              >
                {b.punkte.map(p => <span key={p}>{p}</span>)}
              </div>
            </div>
          ))}

          <div
            data-reveal=""
            style={{
              borderTop: '1px solid var(--line)',
              padding: cellPadRight,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '1.2em',
            }}
          >
            <span style={{ ...cardTitle, lineHeight: 1.2 }}>
              3 Monate inklusive.<br />Danach freiwillig.
            </span>
            <p style={{ fontSize: 17, lineHeight: 1.55, fontWeight: 300, color: 'var(--muted)', margin: 0 }}>
              Coach Premium ist ein Zusatz in der App und gehört zur 2-Jahres-Mitgliedschaft. Nach drei Monaten
              entscheidest du selbst, ob du es weiterführst. Am Training und an der Betreuung im Studio ändert sich
              dadurch nichts.
            </p>
            <a href="#termin" className="lift" style={{ ...btnAmberSm, alignSelf: 'start' }}>Termin wählen</a>
          </div>
        </div>
      </div>
    </section>
  )
}
