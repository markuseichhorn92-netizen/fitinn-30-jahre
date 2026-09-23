import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { oktoberLaeuft } from '@/components/oktober/stand'

// Vorschaubild für geteilte Links (WhatsApp, Facebook, Messenger). Der
// Preis steht nie ohne seine Bedingung – das Bild wird oft allein geteilt.
// Nach dem Aktionsende zeigt es einen neutralen Hinweis ohne Preis.
//
// Satori (next/og) liest weder WOFF2 noch variable Schriften; deshalb liegen
// zwei statische Archivo-Schnitte als WOFF unter src/fonts/og (OFL 1.1).
export const revalidate = 600
export const alt =
  'Oktober-Special im Fit-Inn Trier: die ersten 12 Wochen je 5 € bei 52 oder 104 Wochen Laufzeit, danach 12 € ' +
  'bzw. 9 € pro Woche, einmalig 39 € Aktivierungsgebühr. Nur für Neumitglieder, Abschluss 01.–31.10.2026.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Vorschaubild() {
  const [fett, normal] = await Promise.all([
    readFile(join(process.cwd(), 'src/fonts/og/Archivo-700-latin.woff')),
    readFile(join(process.cwd(), 'src/fonts/og/Archivo-400-latin.woff')),
  ])
  const laeuft = oktoberLaeuft()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 72px 52px',
          background: '#ffffff',
          color: '#14252d',
          borderBottom: '24px solid #ffb54f',
          fontFamily: 'Archivo',
        }}
      >
        <div style={{ display: 'flex', fontSize: 24, letterSpacing: 3, color: '#46555c' }}>
          FIT-INN TRIER · OKTOBER-SPECIAL
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 92, lineHeight: 1.02, fontWeight: 700 }}>
          <span>{laeuft ? 'Dein Herbst.' : 'Das Oktober-Special'}</span>
          <span style={{ color: '#c26a12' }}>{laeuft ? 'Dein Neustart.' : 'ist beendet.'}</span>
        </div>
        {laeuft ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, fontSize: 38 }}>
              <span>Die ersten 12 Wochen</span>
              <span style={{ fontSize: 60, fontWeight: 700 }}>je 5 €</span>
            </div>
            <div style={{ display: 'flex', fontSize: 23, color: '#46555c', lineHeight: 1.4 }}>
              bei 52 oder 104 Wochen Laufzeit · danach 12 € bzw. 9 € pro Woche · einmalig 39 € Aktivierungsgebühr ·
              nur Neumitglieder · Abschluss 01.–31.10.2026
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', fontSize: 34 }}>Probetraining weiterhin kostenlos und unverbindlich.</div>
        )}
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Archivo', data: fett, weight: 700, style: 'normal' },
        { name: 'Archivo', data: normal, weight: 400, style: 'normal' },
      ],
    },
  )
}
