import type { Metadata } from 'next'
import { Entwuerfe } from '@/components/entwuerfe/Entwuerfe'

// Drei Entwürfe der ersten Ansicht zum Vergleich. Keine fertigen Seiten,
// sondern echte gebaute Kandidaten – damit die Entscheidung an dem fällt,
// was später auch wirklich im Browser steht.
export const metadata: Metadata = {
  title: 'Entwürfe · erste Ansicht',
  robots: { index: false, follow: false },
}

export default function Seite() {
  return <Entwuerfe />
}
