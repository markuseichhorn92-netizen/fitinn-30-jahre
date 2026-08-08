import type { Metadata } from 'next'
import { DunkelSeite } from '@/components/dunkel/DunkelSeite'

// Entwurf A · dunkel & kinematisch. Gestalterische Testfläche mit denselben
// Fakten wie die Startseite. Nicht indexiert; das Buchungsformular bucht echt.
export const metadata: Metadata = {
  title: 'Entwurf A · Zwölf Wochen, je fünf Euro — FIT-INN Trier',
  description:
    'Gestalterischer Entwurf: die 5-Euro-Aktion dunkel und kinematisch. Computergesteuerte Premiumgeräte von TechnoGym, familiengeführt seit 1996.',
  robots: { index: false, follow: false },
}

export default function Seite() {
  return <DunkelSeite />
}
