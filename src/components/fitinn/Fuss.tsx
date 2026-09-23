import Image from 'next/image'
import { CookieVerweis } from './CookieVerweis'
import type { NavPunkt } from './Kopf'
import { studio, telLink } from './studio'

// Dunkelblauer Fuß: Logo und kurzer Studiotext, Kontakt, Navigation, Recht.
export function Fuss({
  nav,
  zusatz,
  cookieEinstellungen = false,
}: {
  nav: NavPunkt[]
  zusatz?: string
  /** Verweis auf die Cookie-Einstellungen – nur auf Routen mit Tracking. */
  cookieEinstellungen?: boolean
}) {
  return (
    <footer className="fi-fuss">
      <div className="fi-satz">
        <div className="fi-fuss-raster">
          <div>
            <Image src="/aktion5/logo-white.png" alt="Fit-Inn Trier" width={144} height={24} />
            <p>
              Familiengeführtes Fitnessstudio in {studio.stadtteil} seit {studio.gegruendet}. Persönliche Betreuung,
              moderne Geräte und Menschen, die dich kennen.
            </p>
          </div>

          <div>
            <h2>Kontakt</h2>
            <address>
              {studio.strasse}
              <br />
              {studio.plz} {studio.ort}
              <br />
              <a href={telLink} data-kontakt="telefon">{studio.telefon.anzeige}</a>
              <br />
              <a href={`mailto:${studio.email}`} data-kontakt="email">{studio.email}</a>
            </address>
            {studio.oeffnungszeiten.length > 0 && (
              <dl>
                {studio.oeffnungszeiten.map(o => (
                  <div key={o.tage}>
                    <dt>{o.tage}</dt>
                    <dd>{o.zeit}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          <nav aria-label="Seite">
            <h2>Seite</h2>
            <ul>
              {nav.map(p => (
                <li key={p.href}><a href={p.href}>{p.text}</a></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Rechtliches">
            <h2>Rechtliches</h2>
            <ul>
              {/* Bewusst <a> statt <Link>: ein voller Seitenaufbau lädt das Root-Layout
                  der Zielseite samt Consent-Voreinstellung frisch (siehe AusserAuf). */}
              <li><a href="/impressum">Impressum</a></li>
              <li><a href="/datenschutz">Datenschutz</a></li>
              <li><a href={studio.agb} target="_blank" rel="noopener noreferrer">AGB<span className="sr-only"> (öffnet in neuem Tab)</span></a></li>
              <li><a href={studio.website.href}>{studio.website.anzeige}</a></li>
              {cookieEinstellungen && <li><CookieVerweis /></li>}
            </ul>
          </nav>
        </div>

        <div className="fi-fuss-unten">
          <span>© {studio.name} · {studio.strasse} · {studio.plz} {studio.ort}</span>
          {zusatz && <span>{zusatz}</span>}
        </div>
      </div>
    </footer>
  )
}
