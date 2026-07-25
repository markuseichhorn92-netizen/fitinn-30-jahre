import { decorLayer, wrap } from './styles'

// AKT 2 · SPANNUNG
export function WarumSection() {
  return (
    <section
      id="warum"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--ink)',
        color: '#fff',
        padding: 'clamp(6rem,14vw,12rem) 0',
        scrollMarginTop: 64,
      }}
    >
      <div
        aria-hidden="true"
        style={{ ...decorLayer, right: '-8%', bottom: '-6%', width: 'min(72vw,700px)', height: 'min(40vw,380px)' }}
      >
        <svg viewBox="0 0 700 380" width="100%" height="100%" fill="none" stroke="var(--amber)" strokeWidth="1.5" strokeLinecap="round">
          <path d="M0 80 Q175 20 350 80 T700 80" strokeOpacity=".26" />
          <path d="M0 140 Q175 80 350 140 T700 140" strokeOpacity=".22" />
          <path d="M0 200 Q175 140 350 200 T700 200" strokeOpacity=".19" />
          <path d="M0 260 Q175 200 350 260 T700 260" strokeOpacity=".15" />
          <path d="M0 320 Q175 260 350 320 T700 320" strokeOpacity=".12" />
        </svg>
      </div>

      <div style={wrap}>
        <p
          data-reveal=""
          style={{
            fontSize: 'clamp(30px,5.4vw,78px)',
            lineHeight: 1.06,
            letterSpacing: '-.035em',
            fontWeight: 700,
            margin: 0,
            maxWidth: '16ch',
            textWrap: 'balance',
          }}
        >
          Ab 50 verlieren wir jedes Jahr Muskelkraft.
        </p>
        <p
          data-reveal=""
          style={{
            fontSize: 'clamp(30px,5.4vw,78px)',
            lineHeight: 1.06,
            letterSpacing: '-.035em',
            fontWeight: 700,
            margin: '.12em 0 0',
            color: 'var(--amber)',
          }}
        >
          Wenn wir nichts tun.
        </p>
        <p
          data-reveal=""
          style={{
            fontSize: 'clamp(19px,1.9vw,24px)',
            lineHeight: 1.65,
            fontWeight: 300,
            color: 'rgba(255,255,255,.7)',
            margin: 'clamp(2rem,4vw,3rem) 0 0',
            maxWidth: '46ch',
          }}
        >
          Die gute Nachricht: Dieser Prozess lässt sich in fast jedem Alter umkehren. Kraft, Balance und
          Beweglichkeit halten dich selbstständig, aktiv und unabhängig.
        </p>
      </div>
    </section>
  )
}
