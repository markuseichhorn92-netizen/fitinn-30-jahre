import type { CSSProperties, ReactNode } from 'react'

// Bausteine der Tafelwelt. Jede Tafel ist ein Blatt Papier auf einer dunklen
// Montageleiste; unten im Rand steht das Impressum der Tafel, so wie es auf
// den Schulwandbildern stand.

export const satz: CSSProperties = {
  // `width: 100%` ist nicht kosmetisch: Die Tafeln sind Rasterelemente, und
  // ein `margin: auto` schaltet das Strecken im Raster ab. Ohne die feste
  // Breite schrumpft jede Tafel auf ihre Inhaltsbreite – dann sind sie
  // unterschiedlich breit.
  width: '100%',
  maxWidth: 1240,
  margin: '0 auto',
  padding: '0 clamp(16px,4vw,44px)',
  position: 'relative',
}

/** Der Satzspiegel innerhalb einer Tafel. */
export const spiegel: CSSProperties = {
  padding: 'clamp(2rem,5vw,4.5rem) clamp(1.4rem,4vw,4rem) clamp(1.6rem,3.5vw,3rem)',
  position: 'relative',
  zIndex: 1,
}

/** Kleine Auszeichnung in der Schlüsselschrift – für Maße, Ziffern, Marken. */
export const schluessel: CSSProperties = {
  fontFamily: 'var(--font-schluessel)',
  fontSize: 'clamp(11px,.85vw,12.5px)',
  fontWeight: 500,
  letterSpacing: '.08em',
  textTransform: 'uppercase',
}

export function Platte({
  id,
  tafel,
  kind,
  style,
}: {
  id?: string
  /** Tafelbezeichnung, erscheint unten im Rand – nicht über der Überschrift. */
  tafel: string
  kind: ReactNode
  style?: CSSProperties
}) {
  return (
    <section id={id} style={{ ...satz, scrollMarginTop: 76 }}>
      <div className="tf-platte" style={{ borderRadius: 2, ...style }}>
        <div style={spiegel}>{kind}</div>
        <div
          style={{
            ...schluessel,
            display: 'flex',
            justifyContent: 'space-between',
            gap: '1.5em',
            color: 'var(--matt-papier)',
            borderTop: '1px solid rgba(23,25,28,.18)',
            margin: '0 clamp(1.4rem,4vw,4rem)',
            padding: '.9rem 0 1.1rem',
          }}
        >
          <span>{tafel}</span>
          <span>Fit-Inn Trier · seit 1996</span>
        </div>
      </div>
    </section>
  )
}

/** Überschrift einer Tafel. Trägt sich selbst – kein Label darüber. */
export function Titel({
  kind,
  gross,
  style,
}: {
  kind: ReactNode
  /** Für die erste Tafel: eine Stufe größer. */
  gross?: boolean
  style?: CSSProperties
}) {
  return (
    <h2
      style={{
        fontSize: gross ? 'clamp(38px,6.4vw,88px)' : 'clamp(30px,4.4vw,58px)',
        letterSpacing: gross ? '-.045em' : '-.038em',
        fontWeight: 700,
        textWrap: 'balance',
        maxWidth: gross ? '15ch' : '19ch',
        ...style,
      }}
    >
      {kind}
    </h2>
  )
}

/** Fließtext auf dem Papier. Maß bleibt im lesbaren Bereich. */
export function Absatz({ kind, style }: { kind: ReactNode; style?: CSSProperties }) {
  return (
    <p
      style={{
        fontSize: 'clamp(18px,1.6vw,21px)',
        lineHeight: 1.62,
        color: 'var(--matt-papier)',
        maxWidth: '68ch',
        ...style,
      }}
    >
      {kind}
    </p>
  )
}

/** Der Stern, der auf den Rechtshinweis ganz unten verweist. */
export function Stern() {
  return (
    <a
      href="#hinweis"
      className="tf-stern"
      aria-label="Zu den Angaben zum Angebot"
      style={{
        color: 'var(--zinnober-tief)',
        textDecoration: 'none',
        fontWeight: 700,
        padding: '0 .1em',
      }}
    >
      *
    </a>
  )
}
