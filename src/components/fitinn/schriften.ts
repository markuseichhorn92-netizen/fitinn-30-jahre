import localFont from 'next/font/local'

// Beide Schriften liegen im Projekt (src/fonts) – keine Anfrage an Google,
// weder beim Bauen noch im Browser (siehe Kommentar in aktion5/AktionsSeite).
//
// Archivo ist die Hausschrift von Fit-Inn und hat eine Breitenachse: die
// Überschriften laufen mit font-stretch 112 % breit, der Fließtext normal.
// Variable Fassung, nur Latin (90 KB). Lizenz: SIL Open Font License 1.1.
export const archivo = localFont({
  src: '../../fonts/Archivo-Variable-wdth-latin.woff2',
  variable: '--font-fi-archivo',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  declarations: [{ prop: 'font-stretch', value: '62% 125%' }],
  fallback: ['Helvetica Neue', 'Arial', 'sans-serif'],
})

// Monospace nur für Nummern und kleine Metadaten. IBM Plex Mono 500,
// nur Latin (15 KB). Lizenz: SIL Open Font License 1.1.
export const mono = localFont({
  src: '../../fonts/IBMPlexMono-500-latin.woff2',
  variable: '--font-fi-mono',
  weight: '500',
  display: 'swap',
  preload: false,
  fallback: ['ui-monospace', 'Menlo', 'Consolas', 'monospace'],
})

export const schriftKlassen = `${archivo.variable} ${mono.variable}`
