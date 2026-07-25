import { Sprig } from './Decor'
import { decorLayer, eyebrowMuted, wrap } from './styles'

const schritte = [
  {
    nr: '01',
    titel: 'Persönliches Gespräch',
    text: 'Wir hören zu: wo du stehst, was du erreichen willst, worauf du achten solltest.',
  },
  {
    nr: '02',
    titel: 'Dein Plan',
    text: 'Ein Training, das zu deinem Körper passt – mit Einweisung an jedem Gerät.',
  },
  {
    nr: '03',
    titel: 'Begleitet bleiben',
    text: 'Fachkundige Betreuung von Menschen, die wissen, worauf es ab 50 ankommt.',
  },
]

// AKT 5 · ABLAUF
export function AblaufSection() {
  return (
    <section
      id="ablauf"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--paper)',
        padding: 'clamp(6rem,13vw,11rem) 0',
        scrollMarginTop: 64,
      }}
    >
      <Sprig
        style={{
          right: '4%',
          top: '10%',
          width: 'clamp(86px,8.6vw,140px)',
          height: 'clamp(120px,12vw,196px)',
          transform: 'rotate(-18deg)',
        }}
        strokeOpacity=".3"
      />

      <div
        aria-hidden="true"
        style={{
          ...decorLayer,
          right: '16%',
          bottom: '16%',
          width: 'clamp(60px,6vw,96px)',
          height: 'clamp(60px,6vw,96px)',
        }}
      >
        <svg viewBox="0 0 120 120" width="100%" height="100%" fill="none" stroke="var(--amber)" strokeWidth="2.6" strokeLinecap="round" strokeOpacity=".26">
          <circle cx="60" cy="60" r="26" />
          <g transform="translate(60 60)">
            <line y1="-40" y2="-52" /><line y1="-40" y2="-52" transform="rotate(45)" />
            <line y1="-40" y2="-52" transform="rotate(90)" /><line y1="-40" y2="-52" transform="rotate(135)" />
            <line y1="-40" y2="-52" transform="rotate(180)" /><line y1="-40" y2="-52" transform="rotate(225)" />
            <line y1="-40" y2="-52" transform="rotate(270)" /><line y1="-40" y2="-52" transform="rotate(315)" />
          </g>
        </svg>
      </div>

      <div
        aria-hidden="true"
        style={{ ...decorLayer, left: '-10%', bottom: '-46%', width: 'min(100vw,900px)', height: 'min(100vw,900px)' }}
      >
        <svg viewBox="0 0 900 900" width="100%" height="100%" fill="none">
          <circle cx="450" cy="450" r="330" stroke="var(--amber)" strokeWidth="2" strokeOpacity=".14" />
          <circle cx="450" cy="450" r="240" fill="var(--amber)" fillOpacity=".045" />
          <g stroke="var(--amber)" strokeWidth="2" strokeLinecap="round" strokeOpacity=".16" transform="translate(450 450)">
            <line y1="-368" y2="-410" />
            <line y1="-368" y2="-410" transform="rotate(45)" />
            <line y1="-368" y2="-410" transform="rotate(90)" />
            <line y1="-368" y2="-410" transform="rotate(315)" />
            <line y1="-368" y2="-410" transform="rotate(270)" />
          </g>
        </svg>
      </div>

      <div style={wrap}>
        <span data-reveal="" style={eyebrowMuted}>So beginnt es</span>
        <h2
          data-reveal=""
          style={{
            fontSize: 'clamp(34px,5.4vw,72px)',
            lineHeight: 1.02,
            letterSpacing: '-.035em',
            fontWeight: 700,
            margin: '.3em 0 0',
            maxWidth: '15ch',
            textWrap: 'balance',
          }}
        >
          Kein Leistungsdruck. Nur dein Tempo.
        </h2>

        <div
          style={{
            display: 'grid',
            gap: 'clamp(2rem,4vw,3rem)',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))',
            marginTop: 'clamp(3rem,6vw,4.5rem)',
          }}
        >
          {schritte.map(s => (
            <div key={s.nr} data-reveal="">
              <span
                style={{
                  display: 'block',
                  fontSize: 'clamp(40px,4.6vw,58px)',
                  lineHeight: 1,
                  fontWeight: 200,
                  color: 'var(--amber)',
                  letterSpacing: '-.03em',
                }}
              >
                {s.nr}
              </span>
              <span
                style={{
                  display: 'block',
                  fontSize: 'clamp(21px,2.1vw,26px)',
                  fontWeight: 600,
                  letterSpacing: '-.02em',
                  marginTop: '.6em',
                }}
              >
                {s.titel}
              </span>
              <p style={{ fontSize: 17.5, lineHeight: 1.65, fontWeight: 300, color: 'var(--muted)', margin: '.6em 0 0' }}>
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
