import { faqSchema } from '@/components/fitinn/Faq'
import { fragen, kontakt, meta } from './inhalt'

const BASIS = 'https://30jahre.fit-inn-trier.de'

// Strukturierte Daten der Seite /oktober: das Studio als HealthClub
// (LocalBusiness) und die sichtbaren FAQ als FAQPage. Bewusst ohne
// Bewertungen (selbst ausgewiesene Bewertungen zeigt Google für
// LocalBusiness nicht an), ohne Öffnungszeiten (noch nicht bestätigt) und
// ohne Geokoordinaten (nicht gegengeprüft).
export function strukturdaten() {
  const url = `${BASIS}${meta.pfad}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HealthClub',
        '@id': `${kontakt.website.href}/#studio`,
        name: kontakt.name,
        description:
          'Familiengeführtes Fitnessstudio in Trier-Feyen seit 1996: persönliche Betreuung durch Trainer, ' +
          'Ernährungs- und Gesundheitscoaches, Biostrength-Geräte von Technogym, Cardio- und Freihantelbereich.',
        url: kontakt.website.href,
        telephone: kontakt.telefon.link,
        email: kontakt.email,
        foundingDate: kontakt.gegruendet,
        image: `${BASIS}/studio-1.avif`,
        logo: `${BASIS}/logo.png`,
        priceRange: '€€',
        address: {
          '@type': 'PostalAddress',
          streetAddress: kontakt.strasse,
          postalCode: kontakt.plz,
          addressLocality: kontakt.ort,
          addressRegion: 'Rheinland-Pfalz',
          addressCountry: 'DE',
        },
        areaServed: { '@type': 'City', name: 'Trier' },
        sameAs: [kontakt.instagram, kontakt.facebook],
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#seite`,
        url,
        name: meta.titel,
        description: meta.beschreibung,
        inLanguage: 'de-DE',
        about: { '@id': `${kontakt.website.href}/#studio` },
      },
      faqSchema(fragen, `${url}#fragen`),
    ],
  }
}
