import type { Metadata } from 'next'
import { AktionsSeite } from '@/components/aktion5/AktionsSeite'
import { ab35 } from '@/components/aktion5/varianten'

export const metadata: Metadata = {
  title: { absolute: ab35.meta.titel },
  description: ab35.meta.beschreibung,
  alternates: { canonical: ab35.pfad },
  openGraph: {
    title: ab35.meta.titel,
    description: ab35.meta.beschreibung,
  },
}

// Gleiche Seite, gleiches Angebot – Ansprache ab 35.
export default function Ab35Page() {
  return <AktionsSeite variante={ab35} />
}
