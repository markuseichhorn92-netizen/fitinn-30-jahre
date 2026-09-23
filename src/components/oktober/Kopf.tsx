import Image from 'next/image'
import { kontakt } from './inhalt'
import { CtaKnopf, Telefon } from './Teile'

// Schmale Kopfleiste: Logo, Telefon, Anfrage. Keine Navigation – die Seite
// hat ein Ziel, und jeder Verweis weg davon kostet Anfragen.
export function Kopf() {
  return (
    <header className="kopf">
      <div className="satz">
        <a href="#inhalt" className="kopf-logo" aria-label="Fit-Inn Trier – zum Seitenanfang">
          <Image src="/aktion5/logo-white.png" alt="" width={144} height={24} priority />
        </a>
        <a
          href={`tel:${kontakt.telefon.link}`}
          data-kontakt="telefon"
          className="anruf"
          aria-label={`Anrufen: ${kontakt.telefon.anzeige}`}
        >
          <span className="kopf-anruf-icon"><Telefon /></span>
          <span className="nummer" aria-hidden="true">{kontakt.telefon.anzeige}</span>
        </a>
        <CtaKnopf cta="oktober-allgemein" stil="bernstein">Anfragen</CtaKnopf>
      </div>
    </header>
  )
}
