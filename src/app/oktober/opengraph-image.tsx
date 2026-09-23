import { ImageResponse } from 'next/og'

// Vorschaubild für geteilte Links (WhatsApp, Facebook, Messenger). Der
// Preis steht nie ohne seine Bedingung – das Bild wird oft allein geteilt.
export const alt =
  'Dein Herbst. Dein Neustart. Oktober-Special im Fit-Inn Trier: die ersten 12 Wochen je 5 € bei 52 oder 104 Wochen Laufzeit.'
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
          padding: '64px 72px 56px',
          background: '#ffffff',
          color: '#14252d',
          borderBottom: '24px solid #ffb54f',
        }}
      >
        <div style={{ display: 'flex', fontSize: 26, letterSpacing: 4, color: '#46555c' }}>
          FIT-INN TRIER · OKTOBER-SPECIAL
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 92, lineHeight: 1.02, fontWeight: 700 }}>
          <span>Dein Herbst.</span>
          <span style={{ color: '#c26a12' }}>Dein Neustart.</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, fontSize: 38 }}>
            <span>Die ersten 12 Wochen</span>
            <span style={{ fontSize: 64, fontWeight: 700 }}>je 5 €</span>
          </div>
          <div style={{ display: 'flex', fontSize: 25, color: '#46555c' }}>
            bei 52 oder 104 Wochen Laufzeit · danach 12 € bzw. 9 € pro Woche · einmalig 39 € Aufnahmegebühr ·
            Abschluss 01.–31.10.2026
          </div>
        </div>
      </div>
    ),
    size,
  )
}
