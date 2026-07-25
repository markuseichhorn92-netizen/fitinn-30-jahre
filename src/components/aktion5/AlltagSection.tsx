import { Glasses, Sprig } from './Decor'
import { decorLayer, eyebrowMuted, wrap } from './styles'

const punkte = [
  { nr: '01', titel: 'Einkäufe wieder selbst tragen', pad: 'clamp(1.6rem,3vw,2.4rem) clamp(1.4rem,2.5vw,2rem) clamp(1.6rem,3vw,2.4rem) 0' },
  { nr: '02', titel: 'Treppen ohne Pause nehmen', pad: 'clamp(1.6rem,3vw,2.4rem) clamp(1.4rem,2.5vw,2rem)' },
  { nr: '03', titel: 'Mit den Enkeln mithalten', pad: 'clamp(1.6rem,3vw,2.4rem) 0 clamp(1.6rem,3vw,2.4rem) clamp(1.4rem,2.5vw,2rem)' },
]

// AKT 3 · WAS DAS IM ALLTAG HEISST
export function AlltagSection() {
  return (
    <section
      style={{ position: 'relative', overflow: 'hidden', background: 'var(--paper)', padding: 'clamp(5rem,11vw,9rem) 0' }}
    >
      <Sprig
        style={{
          left: '-2%',
          bottom: '6%',
          width: 'clamp(80px,8vw,130px)',
          height: 'clamp(112px,11vw,182px)',
          transform: 'rotate(16deg)',
        }}
        strokeOpacity=".3"
      />
      <Glasses
        style={{
          right: '6%',
          bottom: '12%',
          width: 'clamp(78px,8vw,124px)',
          height: 'clamp(32px,3.3vw,52px)',
          transform: 'rotate(-8deg)',
        }}
        strokeOpacity=".32"
      />
      <div
        aria-hidden="true"
        style={{ ...decorLayer, top: '-30%', right: '-12%', width: 'min(60vw,540px)', height: 'min(60vw,540px)' }}
      >
        <svg viewBox="0 0 540 540" width="100%" height="100%" fill="none" stroke="var(--amber)" strokeWidth="2">
          <circle cx="270" cy="270" r="266" strokeOpacity=".28" />
          <circle cx="270" cy="270" r="196" strokeOpacity=".12" />
          <circle cx="270" cy="270" r="126" strokeOpacity=".2" />
        </svg>
      </div>

      <div style={wrap}>
        <span data-reveal="" style={eyebrowMuted}>Was das im Alltag heißt</span>
        <div
          style={{
            display: 'grid',
            gap: 0,
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))',
            marginTop: 'clamp(2rem,4vw,3rem)',
          }}
        >
          {punkte.map(p => (
            <div key={p.nr} data-reveal="" style={{ borderTop: '1px solid var(--line)', padding: p.pad }}>
              <span style={{ display: 'block', fontSize: 15, fontWeight: 600, color: 'var(--amber)', letterSpacing: '.04em' }}>
                {p.nr}
              </span>
              <span
                style={{
                  display: 'block',
                  fontSize: 'clamp(24px,2.6vw,32px)',
                  lineHeight: 1.15,
                  letterSpacing: '-.02em',
                  fontWeight: 600,
                  marginTop: '.7em',
                }}
              >
                {p.titel}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
