import type { Metadata } from 'next'
import { HellSeite } from '@/components/hell/HellSeite'

// Entwurf D · hell, nach dem Vorbild von pressmaster.ai. Gestalterische
// Testfläche mit denselben Fakten wie die Startseite. Nicht indexiert;
// das Buchungsformular bucht echt.
export const metadata: Metadata = {
  title: 'Entwurf D · Zwölf Wochen, je fünf Euro — FIT-INN Trier',
  description:
    'Gestalterischer Entwurf in heller Formensprache. Computergesteuerte Premiumgeräte von TechnoGym, familiengeführt seit 1996, Probetraining kostenlos.',
  robots: { index: false, follow: false },
}

export default function Seite() {
  return <HellSeite />
}
