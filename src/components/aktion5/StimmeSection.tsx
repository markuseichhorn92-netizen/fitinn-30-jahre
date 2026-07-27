import Image from 'next/image'
import { wrapWide } from './styles'
import type { Variante } from './varianten'

// AKT 7 · BEWEIS
export function StimmeSection({ stimme }: { stimme: Variante['stimme'] }) {
  return (
    <section style={{ background: 'var(--paper)', padding: 'clamp(5rem,11vw,9rem) 0 clamp(6rem,13vw,11rem)' }}>
      <div data-reveal="" style={wrapWide}>
        <div style={{ position: 'relative', borderRadius: 26, overflow: 'hidden', background: 'var(--ink)' }}>
          <div style={{ position: 'relative', width: '100%', height: 'clamp(420px,64vh,680px)' }}>
            <Image
              src={stimme.bild}
              alt={stimme.bildAlt}
              fill
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: stimme.bildPos ?? 'center 10%' }}
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
              {stimme.zitat}
            </blockquote>
            <span style={{ display: 'block', fontSize: 16.5, color: 'rgba(255,255,255,.65)', marginTop: '1.4em' }}>
              {stimme.autor} · {stimme.quelle}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
