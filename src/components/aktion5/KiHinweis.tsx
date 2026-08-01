import type { CSSProperties } from 'react'

// Kennzeichnung für KI-generierte Motive. Sitzt als Plakette auf dem Bild und
// ist bewusst lesbarer Text, kein reines Symbol – der Hinweis soll auch
// vorgelesen werden können.
export function KiHinweis({ style }: { style?: CSSProperties }) {
  return (
    <span
      style={{
        position: 'absolute',
        right: 'clamp(12px,2vw,20px)',
        bottom: 'clamp(12px,2vw,20px)',
        zIndex: 2,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '.5em',
        background: 'rgba(4,22,27,.82)',
        backdropFilter: 'saturate(180%) blur(10px)',
        WebkitBackdropFilter: 'saturate(180%) blur(10px)',
        border: '1px solid rgba(255,181,79,.4)',
        borderRadius: 999,
        padding: '.5em .95em',
        color: 'var(--amber)',
        fontSize: 'clamp(12px,1.1vw,14px)',
        fontWeight: 700,
        letterSpacing: '.01em',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        ...style,
      }}
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flex: 'none' }}>
        <path d="M9.5 2 12 7 17 9.5 12 12 9.5 17 7 12 2 9.5 7 7z" />
        <path d="M18 13.4 19.3 15.7 21.6 17 19.3 18.3 18 20.6 16.7 18.3 14.4 17 16.7 15.7z" />
      </svg>
      KI-generiert
    </span>
  )
}
