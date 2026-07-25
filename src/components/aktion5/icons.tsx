// Icon-Set aus dem Design (24×24, Strichzeichnung, currentColor).

type IconProps = { size?: number; strokeWidth?: number; style?: React.CSSProperties }

function Base({ size = 23, strokeWidth = 2.2, style, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export const Hantel = (p: IconProps) => (
  <Base {...p}>
    <path d="M14.4 14.4 9.6 9.6M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l1.767-1.768a2 2 0 1 1 2.829 2.829z" />
    <path d="m21.5 21.5-1.4-1.4M3.9 3.9 2.5 2.5" />
    <path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.829-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.767a2 2 0 1 1 2.829 2.829z" />
  </Base>
)

export const Raster = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </Base>
)

export const Menschen = (p: IconProps) => (
  <Base {...p}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
  </Base>
)

export const Puls = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 12h3.5l2-5 3 10 2.5-5H21" />
  </Base>
)

export const Shaker = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 2v6M8 6h8l-1 14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z" />
    <path d="M8.5 12h7" />
  </Base>
)

export const Pokal = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 4h16v5a8 8 0 0 1-16 0z" />
    <path d="M12 17v4M8 21h8" />
  </Base>
)

export const Diagramm = (p: IconProps) => (
  <Base {...p}>
    <path d="M15 11h.01M11 15h.01M16 16h.01" />
    <path d="m2 16 20 6-6-20A20 20 0 0 0 2 16" />
    <path d="M5.71 17.11a17.04 17.04 0 0 1 11.4-11.4" />
  </Base>
)

export const Buch = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 7v14M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
  </Base>
)

export const Bot = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 6V2H8" />
    <path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z" />
    <path d="M2 12h2M9 11v2M15 11v2M20 12h2" />
  </Base>
)

export const Haken = ({ size = 18, strokeWidth = 2.6, style }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    aria-hidden="true"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

export const Plus = ({ size = 20, style }: IconProps) => (
  <svg
    className="chev"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--amber)"
    strokeWidth="2"
    strokeLinecap="round"
    style={style}
    aria-hidden="true"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const PfeilLinks = ({ size = 20 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="m15 18-6-6 6-6" />
  </svg>
)

export const PfeilRechts = ({ size = 20 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="m9 18 6-6-6-6" />
  </svg>
)

export const Play = ({ size = 30 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#04161b" stroke="none" style={{ marginLeft: 4 }} aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
)
