import { aktion } from './content'
import { eyebrow } from './styles'

// Pflichtangaben zum Angebot. Stehen ganz unten, direkt über dem Footer, und
// gehören zum Sternchen an der Überschrift „5 € die Woche.“ im Angebotsblock.
// Zweispaltig gesetzt, damit der lange Fließtext nicht als Textwand wirkt.
export function Rechtshinweis() {
  return (
    <section
      aria-label="Pflichtangaben zum Angebot"
      style={{
        background: 'var(--ink)',
        color: '#fff',
        borderTop: '1px solid var(--line-dark)',
        padding: 'clamp(2.8rem,6vw,4.5rem) 0',
      }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px,5vw,60px)' }}>
        <span
          data-reveal=""
          style={{ ...eyebrow, fontSize: 13, color: 'rgba(255,255,255,.45)', marginBottom: '1.3em' }}
        >
          Pflichtangaben zum Angebot
        </span>

        <p
          data-reveal=""
          style={{
            margin: 0,
            columnWidth: '48ch',
            columnGap: 'clamp(2rem,5vw,4.5rem)',
            fontSize: 13.5,
            lineHeight: 1.75,
            fontWeight: 300,
            color: 'rgba(255,255,255,.56)',
            hyphens: 'auto',
          }}
        >
          <span style={{ color: 'var(--amber)', fontWeight: 600 }}>*</span>{' '}
          {aktion.rechtshinweis.map((teil, i) =>
            teil.href ? (
              <a
                key={i}
                href={teil.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'rgba(255,255,255,.78)', textDecoration: 'underline', textUnderlineOffset: '.2em' }}
              >
                {teil.t}
              </a>
            ) : (
              <span key={i}>{teil.t}</span>
            ),
          )}
        </p>
      </div>
    </section>
  )
}
