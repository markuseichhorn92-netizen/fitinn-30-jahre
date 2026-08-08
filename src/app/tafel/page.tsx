import type { Metadata } from 'next'
import { TafelSeite } from '@/components/tafel/TafelSeite'

// Gestalterische Testfläche für die 5-Euro-Aktion: dieselben Fakten wie die
// Startseite, eine eigenständige visuelle Welt („Die Lehrtafel“). Bewusst
// nicht indexiert und nicht in der sitemap.xml – die Seite dient dem
// Vergleich, nicht dem Traffic. Das Buchungsformular bucht echt.
export const metadata: Metadata = {
  title: 'Lehrtafel · 5-Euro-Aktion FIT-INN Trier',
  description:
    'Gestalterische Testfläche: die 5-Euro-Aktion als Schautafel. Zwölf Wochen für je 5 €, computergesteuerte Premiumgeräte von TechnoGym, Probetraining kostenlos.',
  robots: { index: false, follow: false },
}

export default function Seite() {
  return <TafelSeite />
}
