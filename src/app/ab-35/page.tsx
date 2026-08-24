import type { Metadata } from 'next'
import { AktionsSeite } from '@/components/aktion5/AktionsSeite'
import { ab35 } from '@/components/aktion5/varianten'
import { Abgelaufen } from '@/components/kampagne/Abgelaufen'
import { aktionLaeuft } from '@/components/kampagne/aktionsstand'

// Next verlangt hier einen festen Wert, keine importierte Konstante:
// alle zehn Minuten neu erzeugen, damit die Umschaltung am 01.09. greift.
export const revalidate = 600

/** Metadaten, solange die Aktion läuft. */
const BESTAND: Metadata = {
  title: { absolute: ab35.meta.titel },
  description: ab35.meta.beschreibung,
  alternates: { canonical: ab35.pfad },
  openGraph: {
    title: ab35.meta.titel,
    description: ab35.meta.beschreibung,
  },
}

// Gleiche Seite, gleiches Angebot – Ansprache ab 35.
export function generateMetadata(): Metadata {
  if (aktionLaeuft()) return BESTAND
  // Nach Ablauf soll die Seite nicht mehr mit dem Angebot in der Suche stehen.
  return {
    title: 'Die 5-Euro-Aktion ist beendet — FIT-INN Trier',
    description: 'Die Aktion ist abgelaufen. Aktuelle Angebote und ein kostenloses Probetraining findest du auf fit-inn-trier.de.',
    robots: { index: false, follow: true },
  }
}

export default function Ab35Page() {
  if (!aktionLaeuft()) return <Abgelaufen />
  return <AktionsSeite variante={ab35} />
}
