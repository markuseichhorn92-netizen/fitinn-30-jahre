import Image from 'next/image'
import Link from 'next/link'
import { kontakt } from './inhalt'

export function Fuss() {
  return (
    <footer className="fuss">
      <div className="satz">
        <div className="fuss-raster">
          <div>
            <h2>Fit-Inn Trier</h2>
            <address>
              {kontakt.strasse}
              <br />
              {kontakt.plz} {kontakt.ort} ({kontakt.stadtteil})
            </address>
          </div>

          <div>
            <h2>Kontakt</h2>
            <ul>
              <li>
                <a href={`tel:${kontakt.telefon.link}`} data-kontakt="telefon">{kontakt.telefon.anzeige}</a>
              </li>
              <li>
                <a href={`mailto:${kontakt.email}`} data-kontakt="email">{kontakt.email}</a>
              </li>
              <li>
                <a href={kontakt.website.href}>{kontakt.website.anzeige}</a>
              </li>
            </ul>
          </div>

          <div>
            <h2>Öffnungszeiten</h2>
            {/* PLATZHALTER – echte Öffnungszeiten in inhalt.ts eintragen. */}
            <dl>
              {kontakt.oeffnungszeiten.map(o => (
                <div key={o.tage} style={{ display: 'contents' }}>
                  <dt>{o.tage}</dt>
                  <dd>{o.zeit}</dd>
                </div>
              ))}
            </dl>
            <p className="fuss-platzhalter">Platzhalter – Öffnungszeiten folgen.</p>
          </div>
        </div>

        <div className="fuss-unten">
          <Image src="/aktion5/logo-white.png" alt="Fit-Inn Trier" width={132} height={22} />
          <Link href="/impressum" className="fuss-verweis">Impressum</Link>
          <Link href="/datenschutz" className="fuss-verweis">Datenschutz</Link>
          <a href={kontakt.website.href} className="fuss-verweis">Zur Website</a>
        </div>
      </div>
    </footer>
  )
}
