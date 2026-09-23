import { ImageResponse } from 'next/og'

// Vorschaubild für geteilte Links (WhatsApp, Facebook, Messenger).
export const alt = 'Dein Herbst. Dein Neustart. Die ersten 12 Wochen für 5 € pro Woche im Fit-Inn Trier.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Vorschaubild() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#1d3329',
          color: '#f6f0e7',
        }}
      >
        <div style={{ display: 'flex', fontSize: 30, letterSpacing: 4, color: '#f2b35e' }}>
          FIT-INN TRIER · OKTOBER-SPECIAL
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 96, lineHeight: 1.02, fontWeight: 700 }}>
          <span>Dein Herbst.</span>
          <span style={{ color: '#f2b35e' }}>Dein Neustart.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, fontSize: 40 }}>
          <span>Die ersten 12 Wochen</span>
          <span style={{ fontSize: 72, fontWeight: 700, color: '#f2b35e' }}>5 €</span>
          <span>pro Woche*</span>
        </div>
      </div>
    ),
    size,
  )
}
