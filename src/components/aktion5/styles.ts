import type { CSSProperties } from 'react'

// Wiederkehrende Maße aus dem Design ("5-Euro-Aktion Premium.dc.html").
// Bewusst als Inline-Styles wie im Handoff — so bleiben die clamp()-Werte 1:1.

export const wrap: CSSProperties = {
  position: 'relative',
  zIndex: 1,
  maxWidth: 1240,
  margin: '0 auto',
  padding: '0 clamp(20px,5vw,60px)',
}

export const wrapWide: CSSProperties = {
  position: 'relative',
  zIndex: 1,
  maxWidth: 1500,
  margin: '0 auto',
  padding: '0 clamp(20px,5vw,60px)',
}

export const eyebrow: CSSProperties = {
  display: 'block',
  fontSize: 15,
  letterSpacing: '.16em',
  textTransform: 'uppercase',
  fontWeight: 600,
}

export const eyebrowAmber: CSSProperties = { ...eyebrow, color: 'var(--amber)' }
export const eyebrowMuted: CSSProperties = { ...eyebrow, color: 'var(--muted)' }

/** Amber-Pill, große Variante (Hero / Angebot). */
export const btnAmber: CSSProperties = {
  background: 'var(--amber)',
  color: '#04161b',
  fontSize: 18,
  fontWeight: 700,
  padding: '1em 2.1em',
  borderRadius: 999,
  textDecoration: 'none',
}

/** Amber-Pill, kompakte Variante (App / Rundgang). */
export const btnAmberSm: CSSProperties = {
  background: 'var(--amber)',
  color: '#04161b',
  fontSize: 17,
  fontWeight: 700,
  padding: '.9em 1.9em',
  borderRadius: 999,
  textDecoration: 'none',
}

export const btnGhost: CSSProperties = {
  border: '1px solid var(--line-dark)',
  color: '#fff',
  fontSize: 18,
  fontWeight: 500,
  padding: '1em 2.1em',
  borderRadius: 999,
  textDecoration: 'none',
}

/** Runder Icon-Chip vor den Feature-Überschriften. */
export const iconBubble: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 'none',
  width: 46,
  height: 46,
  borderRadius: '50%',
  background: 'rgba(255,181,79,.2)',
  color: '#8a5a13',
}

export const cardTitle: CSSProperties = {
  fontSize: 'clamp(21px,2.1vw,25px)',
  lineHeight: 1.15,
  letterSpacing: '-.02em',
  fontWeight: 600,
}

export const cardText: CSSProperties = {
  fontSize: 17,
  lineHeight: 1.6,
  fontWeight: 300,
  color: 'var(--muted)',
  margin: 0,
}

/** Dekorative Ebene hinter dem Inhalt. */
export const decorLayer: CSSProperties = {
  position: 'absolute',
  zIndex: 0,
  pointerEvents: 'none',
}

/** Dreispaltiges Rasterfeld mit Trennlinien: Innenabstände je nach Spaltenposition. */
export const cellPadLeft = 'clamp(1.7rem,3vw,2.4rem) clamp(1.4rem,2.4vw,2.2rem) clamp(1.7rem,3vw,2.4rem) 0'
export const cellPadMid = 'clamp(1.7rem,3vw,2.4rem) clamp(1.4rem,2.4vw,2.2rem)'
export const cellPadRight = 'clamp(1.7rem,3vw,2.4rem) 0 clamp(1.7rem,3vw,2.4rem) clamp(1.4rem,2.4vw,2.2rem)'
