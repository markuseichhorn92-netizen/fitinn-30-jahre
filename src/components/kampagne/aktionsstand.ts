import { aktion } from '@/components/aktion5/content'

// Läuft die Aktion noch?
//
// Die Frage wird auf dem Server beantwortet, nicht im Browser. Sonst stünde
// in der ausgelieferten Seite weiterhin das alte Angebot und würde erst nach
// dem Laden von JavaScript ausgetauscht – sichtbar, und für alles ohne
// JavaScript gar nicht.
//
// Damit der Server die Antwort nicht einmal beim Bauen einfriert, setzt jede
// Angebotsseite `export const revalidate = 600`. Next verlangt dort einen
// festen Wert, deshalb steht die Zahl in den Seiten und nicht hier. Die
// Umschaltung erfolgt damit spätestens zehn Minuten nach Ablauf.

const ENDE = new Date(aktion.gueltigBisZeit).getTime()

export function aktionLaeuft(jetzt: number = Date.now()): boolean {
  return jetzt <= ENDE
}

/** Erster Tag nach der Aktion, ausgeschrieben – für Texte. */
export const endeText = aktion.gueltigBis
