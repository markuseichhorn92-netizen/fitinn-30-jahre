import type { Metadata } from 'next'
import { AktionsSeite } from '@/components/aktion5/AktionsSeite'
import { googleAds } from '@/components/aktion5/varianten'
import { Abgelaufen } from '@/components/kampagne/Abgelaufen'
import { aktionLaeuft } from '@/components/kampagne/aktionsstand'

// Next verlangt hier einen festen Wert, keine importierte Konstante:
// alle zehn Minuten neu erzeugen, damit die Umschaltung am 01.09. greift.
export const revalidate = 600

/** Metadaten, solange die Aktion läuft. */
const BESTAND: Metadata = {
  title: { absolute: googleAds.meta.titel },
  description: googleAds.meta.beschreibung,
  openGraph: {
    title: googleAds.meta.titel,
    description: googleAds.meta.beschreibung,
  },
  // Reine Anzeigen-Zielseite: Google Ads braucht keine Indexierung, und so
  // konkurrieren nicht drei fast gleiche Seiten in der organischen Suche.
  // Zum Mitranken einfach diese Zeile entfernen und die Seite in die
  // sitemap.xml aufnehmen.
  robots: { index: false, follow: true },
}

// Zielseite für Google Ads: gleiches Angebot, altersneutrale Ansprache.
export function generateMetadata(): Metadata {
  if (aktionLaeuft()) return BESTAND
  // Nach Ablauf soll die Seite nicht mehr mit dem Angebot in der Suche stehen.
  return {
    title: 'Die 5-Euro-Aktion ist beendet — FIT-INN Trier',
    description: 'Die Aktion ist abgelaufen. Aktuelle Angebote und ein kostenloses Probetraining findest du auf fit-inn-trier.de.',
    robots: { index: false, follow: true },
  }
}

export default function FitnessstudioTrierPage() {
  if (!aktionLaeuft()) return <Abgelaufen />
  return <AktionsSeite variante={googleAds} />
}
