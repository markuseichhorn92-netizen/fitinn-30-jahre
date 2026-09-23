import type { Metadata } from 'next'
import { Beendet } from '@/components/oktober/Beendet'
import { aktion, meta } from '@/components/oktober/inhalt'
import { OktoberSeite } from '@/components/oktober/OktoberSeite'
import { strukturdaten } from '@/components/oktober/strukturdaten'

// Oktober-Special 2026 „Dein Herbst. Dein Neustart.“
//
// Ab dem 01.11.2026 zeigt die Route den Hinweis auf das Ende der Aktion.
// Next verlangt hier einen festen Wert, keine importierte Konstante: alle
// zehn Minuten neu erzeugen, damit die Umschaltung zeitnah greift.
export const revalidate = 600

const ENDE = new Date(aktion.endeZeit).getTime()
const laeuft = () => Date.now() <= ENDE

export function generateMetadata(): Metadata {
  if (!laeuft()) {
    return {
      title: { absolute: 'Das Oktober-Special ist beendet — Fit-Inn Trier' },
      description: 'Die Aktion ist abgelaufen. Aktuelle Angebote findest du auf fit-inn-trier.de.',
      robots: { index: false, follow: true },
    }
  }
  return {
    title: { absolute: meta.titel },
    description: meta.beschreibung,
    alternates: { canonical: meta.pfad },
    openGraph: {
      type: 'website',
      locale: 'de_DE',
      siteName: 'Fit-Inn Trier',
      url: meta.pfad,
      title: 'Dein Herbst. Dein Neustart. — Fit-Inn Trier',
      description: meta.beschreibung,
    },
    robots: { index: true, follow: true },
  }
}

export default function OktoberPage() {
  if (!laeuft()) return <Beendet />
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(strukturdaten()).replace(/</g, '\\u003c') }}
      />
      <OktoberSeite />
    </>
  )
}
