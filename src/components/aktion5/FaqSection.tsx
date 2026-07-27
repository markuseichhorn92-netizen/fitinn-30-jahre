import { Plus } from './icons'
import type { Variante } from './varianten'

// AKT 7 · EINWÄNDE
export function FaqSection({ fragen }: { fragen: Variante['fragen'] }) {
  return (
    <section
      id="fragen"
      className="pfaq"
      style={{ background: 'var(--paper)', padding: '0 0 clamp(6rem,13vw,11rem)', scrollMarginTop: 64 }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px,5vw,60px)' }}>
        <div
          style={{
            display: 'grid',
            gap: 'clamp(1.5rem,4vw,4rem)',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))',
            alignItems: 'start',
          }}
        >
          <h2
            data-reveal=""
            style={{
              fontSize: 'clamp(32px,4.6vw,60px)',
              lineHeight: 1.04,
              letterSpacing: '-.035em',
              fontWeight: 700,
              margin: 0,
              maxWidth: '12ch',
            }}
          >
            {fragen.headline}
          </h2>
          <div data-reveal="" style={{ display: 'flex', flexDirection: 'column' }}>
            {fragen.items.map((f, i) => (
              <details
                key={f.frage}
                open={f.offen}
                style={{
                  borderTop: '1px solid var(--line)',
                  borderBottom: i === fragen.items.length - 1 ? '1px solid var(--line)' : undefined,
                  padding: 'clamp(1.1rem,2vw,1.5rem) 0',
                }}
              >
                <summary
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '1.2em',
                    cursor: 'pointer',
                    fontSize: 'clamp(19px,1.9vw,23px)',
                    fontWeight: 600,
                    letterSpacing: '-.015em',
                  }}
                >
                  {f.frage}
                  <Plus style={{ flex: 'none', marginTop: '.35em' }} />
                </summary>
                <p
                  style={{
                    fontSize: 17.5,
                    lineHeight: 1.7,
                    fontWeight: 300,
                    color: 'var(--muted)',
                    margin: '.9em 0 0',
                    maxWidth: '52ch',
                  }}
                >
                  {f.antwort}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
