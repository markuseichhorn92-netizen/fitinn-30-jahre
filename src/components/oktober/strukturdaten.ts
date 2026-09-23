import { fragen, kontakt, meta } from './inhalt'

const BASIS = 'https://30jahre.fit-inn-trier.de'

// Strukturierte Daten der Seite /oktober: das Studio als HealthClub
// (LocalBusiness) und die sichtbaren FAQ als FAQPage. Bewusst ohne
// Bewertungen (selbst ausgewiesene Bewertungen zeigt Google für
// LocalBusiness nicht an), ohne Öffnungszeiten (noch Platzhalter) und ohne
// Geokoordinaten (nicht gegengeprüft).
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
        foundingDate: '1996',
        image: `${BASIS}/logo.png`,
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
        sameAs: ['https://www.instagram.com/fit_inn_trier/', 'https://www.facebook.com/FitInnFeyen'],
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
      {
        '@type': 'FAQPage',
        '@id': `${url}#fragen`,
        mainEntity: fragen.map(f => ({
          '@type': 'Question',
          name: f.frage,
          acceptedAnswer: { '@type': 'Answer', text: f.antwort },
        })),
      },
    ],
  }
}
