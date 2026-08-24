import type { Metadata } from 'next'
import { HellSeite } from '@/components/hell/HellSeite'
import { Abgelaufen } from '@/components/kampagne/Abgelaufen'
import { aktionLaeuft } from '@/components/kampagne/aktionsstand'

// Entwurf D · hell, nach dem Vorbild von pressmaster.ai. Gestalterische
// Testfläche mit denselben Fakten wie die Startseite. Nicht indexiert;
// das Buchungsformular bucht echt.
// Next verlangt hier einen festen Wert, keine importierte Konstante:
// alle zehn Minuten neu erzeugen, damit die Umschaltung am 01.09. greift.
export const revalidate = 600

/** Metadaten, solange die Aktion läuft. */
const BESTAND: Metadata = {
  title: 'Entwurf D · Zwölf Wochen, je fünf Euro — FIT-INN Trier',
  description:
    'Gestalterischer Entwurf in heller Formensprache. Computergesteuerte Premiumgeräte von TechnoGym, familiengeführt seit 1996, Probetraining kostenlos.',
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
  return <HellSeite />
}
