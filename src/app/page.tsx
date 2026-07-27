import { AktionsSeite } from '@/components/aktion5/AktionsSeite'
import { ab50 } from '@/components/aktion5/varianten'

// Startseite: 5-Euro-Aktion, Ansprache ab 50.
// Titel und Beschreibung kommen aus dem Root-Layout.
export default function Home() {
  return <AktionsSeite variante={ab50} />
}
