import { aktion } from './inhalt'

// Läuft das Oktober-Special noch? Beantwortet auf dem Server, nicht im
// Browser (siehe kampagne/aktionsstand.ts). Die Seiten, die davon abhängen,
// erzeugen sich mit `revalidate = 600` alle zehn Minuten neu.
const ENDE = new Date(aktion.endeZeit).getTime()

export function oktoberLaeuft(jetzt: number = Date.now()): boolean {
  return jetzt <= ENDE
}
