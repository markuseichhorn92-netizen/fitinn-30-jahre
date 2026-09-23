import type { Metadata } from 'next'
import { faqSchema } from '@/components/fitinn/Faq'
import { studio } from '@/components/fitinn/studio'
import { oktoberLaeuft } from '@/components/oktober/stand'
import { fragen, meta } from '@/components/startseite/inhalt'
import { StartSeite } from '@/components/startseite/StartSeite'

// Startseite im redaktionellen Fit-Inn-Design.
//
// Während des Oktober-Specials weist der Mitgliedschaftsbereich auf /oktober
// hin. Next verlangt hier einen festen Wert, keine importierte Konstante:
// alle zehn Minuten neu erzeugen, damit der Hinweis nach dem 31.10. entfällt.
export const revalidate = 600

const BASIS = 'https://30jahre.fit-inn-trier.de'

export const metadata: Metadata = {
  title: { absolute: meta.titel },
  description: meta.beschreibung,
  keywords: null,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'Fit-Inn Trier',
    url: '/',
    title: 'Dein Training. Deine Ziele. Persönlich begleitet. — Fit-Inn Trier',
    description: meta.beschreibung,
  },
  robots: { index: true, follow: true },
}

function strukturdaten() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HealthClub',
        '@id': `${studio.website.href}/#studio`,
        name: studio.name,
        description:
          'Familiengeführtes Fitnessstudio in Trier-Feyen seit 1996: persönliche Betreuung, computergesteuerte ' +
          'Technogym-Geräte, Cardio- und Freihantelbereich.',
        url: studio.website.href,
        telephone: studio.telefon.link,
        email: studio.email,
        foundingDate: studio.gegruendet,
        image: `${BASIS}/studio-1.avif`,
        logo: `${BASIS}/logo.png`,
        priceRange: '€€',
        address: {
          '@type': 'PostalAddress',
          streetAddress: studio.strasse,
          postalCode: studio.plz,
          addressLocality: studio.ort,
          addressRegion: 'Rheinland-Pfalz',
          addressCountry: 'DE',
        },
        areaServed: { '@type': 'City', name: 'Trier' },
        sameAs: [studio.instagram, studio.facebook],
      },
      faqSchema(fragen, `${BASIS}/#fragen`),
    ],
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
