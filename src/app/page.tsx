import type { Metadata } from 'next'
import { AktionsSeite } from '@/components/aktion5/AktionsSeite'
import { ab50 } from '@/components/aktion5/varianten'
import { Abgelaufen } from '@/components/kampagne/Abgelaufen'
import { aktionLaeuft } from '@/components/kampagne/aktionsstand'

// Startseite: 5-Euro-Aktion, Ansprache ab 50.
// Ab dem 01.09.2026 zeigt die Route stattdessen den Hinweis auf das Ende der
// Aktion und verweist auf fit-inn-trier.de.
// Next verlangt hier einen festen Wert, keine importierte Konstante:
// alle zehn Minuten neu erzeugen, damit die Umschaltung am 01.09. greift.
export const revalidate = 600

export function generateMetadata(): Metadata {
  if (aktionLaeuft()) return {}
  // Nach Ablauf soll die Seite nicht mehr mit dem Angebot in der Suche stehen.
  return {
    title: 'Die 5-Euro-Aktion ist beendet — FIT-INN Trier',
    description: 'Die Aktion ist abgelaufen. Aktuelle Angebote und ein kostenloses Probetraining findest du auf fit-inn-trier.de.',
    robots: { index: false, follow: true },
  }
}

export default function Home() {
  if (!aktionLaeuft()) return <Abgelaufen />
  return <AktionsSeite variante={ab50} />
}
