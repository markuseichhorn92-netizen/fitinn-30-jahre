import type { Metadata } from 'next'
import { AktionsSeite } from '@/components/aktion5/AktionsSeite'
import { googleAds } from '@/components/aktion5/varianten'

export const metadata: Metadata = {
  title: { absolute: googleAds.meta.titel },
  description: googleAds.meta.beschreibung,
  openGraph: {
    title: googleAds.meta.titel,
    description: googleAds.meta.beschreibung,
  },
  // Reine Anzeigen-Zielseite: Google Ads braucht keine Indexierung, und so
  // konkurrieren nicht drei fast gleiche Seiten in der organischen Suche.
  // Zum Mitranken einfach diese Zeile entfernen und die Seite in die
  // sitemap.xml aufnehmen.
  robots: { index: false, follow: true },
}

// Zielseite für Google Ads: gleiches Angebot, altersneutrale Ansprache.
export default function FitnessstudioTrierPage() {
  return <AktionsSeite variante={googleAds} />
}
