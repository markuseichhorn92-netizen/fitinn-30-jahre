import { faqSchema } from '@/components/fitinn/Faq'
import { BASIS, healthClubSchema, studio } from '@/components/fitinn/studio'
import { fragen, meta } from './inhalt'

// Strukturierte Daten der Seite /oktober: das Studio als HealthClub (dieselbe
// Entität wie auf der Startseite) und die sichtbaren FAQ als FAQPage. Ohne
// Bewertungen, Öffnungszeiten und Geokoordinaten – nichts davon ist belegt.
export function strukturdaten() {
  const url = `${BASIS}${meta.pfad}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      healthClubSchema(),
      {
        '@type': 'WebPage',
        '@id': `${url}#seite`,
        url,
        name: meta.titel,
        description: meta.beschreibung,
        inLanguage: 'de-DE',
        about: { '@id': `${studio.website.href}/#studio` },
      },
      faqSchema(fragen, `${url}#fragen`),
    ],
  }
}
