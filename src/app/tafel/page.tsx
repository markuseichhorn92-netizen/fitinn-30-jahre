import type { Metadata } from 'next'
import { TafelSeite } from '@/components/tafel/TafelSeite'
import { Abgelaufen } from '@/components/kampagne/Abgelaufen'
import { aktionLaeuft } from '@/components/kampagne/aktionsstand'

// Gestalterische Testfläche für die 5-Euro-Aktion: dieselben Fakten wie die
// Startseite, eine eigenständige visuelle Welt („Die Lehrtafel“). Bewusst
// nicht indexiert und nicht in der sitemap.xml – die Seite dient dem
// Vergleich, nicht dem Traffic. Das Buchungsformular bucht echt.
// Next verlangt hier einen festen Wert, keine importierte Konstante:
// alle zehn Minuten neu erzeugen, damit die Umschaltung am 01.09. greift.
export const revalidate = 600

/** Metadaten, solange die Aktion läuft. */
const BESTAND: Metadata = {
  title: 'Lehrtafel · 5-Euro-Aktion FIT-INN Trier',
  description:
    'Gestalterische Testfläche: die 5-Euro-Aktion als Schautafel. Zwölf Wochen für je 5 €, computergesteuerte Premiumgeräte von TechnoGym, Probetraining kostenlos.',
  robots: { index: false, follow: false },
}

export function generateMetadata(): Metadata {
  if (aktionLaeuft()) return BESTAND
  // Nach Ablauf soll die Seite nicht mehr mit dem Angebot in der Suche stehen.
  return {
    title: 'Die 5-Euro-Aktion ist beendet — FIT-INN Trier',
    description: 'Die Aktion ist abgelaufen. Aktuelle Angebote und ein kostenloses Probetraining findest du auf fit-inn-trier.de.',
    robots: { index: false, follow: true },
  }
}

export default function Seite() {
  if (!aktionLaeuft()) return <Abgelaufen />
  return <TafelSeite />
}
