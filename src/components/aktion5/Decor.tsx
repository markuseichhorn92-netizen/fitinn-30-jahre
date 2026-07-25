import type { CSSProperties } from 'react'
import { decorLayer } from './styles'

// Dekorative Linien-Grafiken aus dem Design. Rein schmückend → aria-hidden.

/** Zweig mit Blättern (Design-Motiv „Sprig“). */
export function Sprig({
  style,
  strokeOpacity = '.26',
}: {
  style: CSSProperties
  strokeOpacity?: string
}) {
  return (
    <div aria-hidden="true" style={{ ...decorLayer, ...style }}>
      <svg
        viewBox="0 0 100 140"
        width="100%"
        height="100%"
        fill="none"
        stroke="var(--amber)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeOpacity={strokeOpacity}
      >
        <path d="M50 136 C44 100 52 58 74 18" />
        <ellipse cx="38" cy="112" rx="14" ry="7.5" transform="rotate(-28 38 112)" />
        <ellipse cx="66" cy="98" rx="14" ry="7.5" transform="rotate(24 66 98)" />
        <ellipse cx="42" cy="80" rx="14" ry="7.5" transform="rotate(-24 42 80)" />
        <ellipse cx="70" cy="64" rx="14" ry="7.5" transform="rotate(28 70 64)" />
        <ellipse cx="50" cy="46" rx="13" ry="7" transform="rotate(-20 50 46)" />
        <ellipse cx="76" cy="32" rx="12" ry="6.5" transform="rotate(32 76 32)" />
      </svg>
    </div>
  )
}

/** Brille (Design-Motiv „Glasses“). */
export function Glasses({
  style,
  strokeOpacity = '.32',
}: {
  style: CSSProperties
  strokeOpacity?: string
}) {
  return (
    <div aria-hidden="true" style={{ ...decorLayer, ...style }}>
      <svg
        viewBox="0 0 150 62"
        width="100%"
        height="100%"
        fill="none"
        stroke="var(--amber)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={strokeOpacity}
      >
        <rect x="10" y="16" width="54" height="36" rx="17" />
        <rect x="86" y="16" width="54" height="36" rx="17" />
        <path d="M64 28 q11 -7 22 0" />
        <path d="M10 26 L1 14" />
        <path d="M140 26 L149 14" />
      </svg>
    </div>
  )
}

/** Weicher Amber-Schein (Radial-Gradient). */
export function Glow({ style, strength = '.3' }: { style: CSSProperties; strength?: string }) {
  return (
    <div
      aria-hidden="true"
      style={{
        ...decorLayer,
        ...style,
        background: `radial-gradient(circle,rgba(255,181,79,${strength}),rgba(255,181,79,0) 64%)`,
      }}
    />
  )
}
