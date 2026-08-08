import type { Metadata } from 'next'
import { TiefSeite } from '@/components/tief/TiefSeite'

// Entwurf C · tief & materiell. Gestalterische Testfläche mit denselben
// Fakten wie die Startseite. Nicht indexiert; das Buchungsformular bucht echt.
export const metadata: Metadata = {
  title: 'Entwurf C · Zwölf Wochen, je fünf Euro — FIT-INN Trier',
  description:
    'Gestalterischer Entwurf: die 5-Euro-Aktion tief und materiell. Computergesteuerte Premiumgeräte von TechnoGym, familiengeführt seit 1996.',
  robots: { index: false, follow: false },
}

export default function Seite() {
  return <TiefSeite />
}
