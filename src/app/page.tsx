import type { Metadata } from 'next'
import { faqSchema } from '@/components/fitinn/Faq'
import { BASIS, healthClubSchema } from '@/components/fitinn/studio'
import { oktoberLaeuft } from '@/components/oktober/stand'
import { fragen, meta } from '@/components/startseite/inhalt'
import { StartSeite } from '@/components/startseite/StartSeite'

// Startseite im redaktionellen Fit-Inn-Design.
//
// Bis zum Ende des Oktober-Specials (auch schon als Vorankündigung im
// September) weist der Mitgliedschaftsbereich auf /oktober hin; der Hinweis
// nennt den Abschlusszeitraum selbst. Next verlangt hier einen festen Wert,
// keine importierte Konstante: alle zehn Minuten neu erzeugen, damit der
// Hinweis nach dem 31.10. entfällt.
export const revalidate = 600

export const metadata: Metadata = {
  title: { absolute: meta.titel },
  description: meta.beschreibung,
  keywords: null,
  authors: [{ name: 'Fit-Inn Trier' }],
  creator: 'Fit-Inn Trier',
  publisher: 'Fit-Inn Trier',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'Fit-Inn Trier',
    url: '/',
    title: 'Dein Training. Deine Ziele. Persönlich begleitet. — Fit-Inn Trier',
    description: meta.beschreibung,
    images: [{ url: '/og-startseite.jpg', width: 1200, height: 630, alt: 'Fit-Inn Trier – Trainingsfläche in Trier-Feyen' }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

function strukturdaten() {
  return {
    '@context': 'https://schema.org',
    '@graph': [healthClubSchema(), faqSchema(fragen, `${BASIS}/#fragen`)],
  }
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(strukturdaten()).replace(/</g, '\\u003c') }}
      />
      <StartSeite oktober={oktoberLaeuft()} />
    </>
  )
}
