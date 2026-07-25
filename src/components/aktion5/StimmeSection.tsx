import Image from 'next/image'
import { aktion } from './content'
import { wrapWide } from './styles'

// AKT 7 · BEWEIS
export function StimmeSection() {
  return (
    <section style={{ background: 'var(--paper)', padding: 'clamp(5rem,11vw,9rem) 0 clamp(6rem,13vw,11rem)' }}>
      <div data-reveal="" style={wrapWide}>
        <div style={{ position: 'relative', borderRadius: 26, overflow: 'hidden', background: 'var(--ink)' }}>
          <div style={{ position: 'relative', width: '100%', height: 'clamp(420px,64vh,680px)' }}>
            <Image
              src="/aktion5/stimme.webp"
              alt="Porträt eines Mitglieds im Fit-Inn Trier"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: 'center 10%' }}
            />
          </div>
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background:
                'linear-gradient(180deg,rgba(4,22,27,.1) 0%,rgba(4,22,27,.5) 52%,rgba(4,22,27,.92) 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              padding: 'clamp(1.8rem,5vw,4rem)',
              pointerEvents: 'none',
            }}
          >
            <blockquote
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 300,
                fontSize: 'clamp(24px,3.6vw,52px)',
                lineHeight: 1.18,
                letterSpacing: '-.02em',
                color: '#fff',
                margin: 0,
                maxWidth: '20ch',
              }}
            >
              {aktion.stimme.zitat}
            </blockquote>
            <span style={{ display: 'block', fontSize: 16.5, color: 'rgba(255,255,255,.65)', marginTop: '1.4em' }}>
              {aktion.stimme.vorname}, {aktion.stimme.alter} · Mitglied im Fit-Inn Trier
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
