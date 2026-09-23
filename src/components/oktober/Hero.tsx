import { aktion, hero, vertrauen } from './inhalt'
import { AnrufVerweis, CtaKnopf, Platzhalter } from './Teile'

export function Hero() {
  return (
    <section className="hero dunkel" aria-labelledby="hero-titel">
      <div className="satz hero-raster">
        <div>
          <h1 id="hero-titel">
            <span className="hero-ort">{hero.ort}</span>
            <span className="sr-only">: </span>
            {hero.headline.map(zeile => (
              <span key={zeile} className="hero-zeile">{zeile} </span>
            ))}
          </h1>
          <p className="hero-sub">{hero.subline}</p>

          <p className="preis">
            <span className="preis-vorsatz">{hero.preisVorsatz}</span>
            <span className="preis-betrag">
              {aktion.vorteilsPreis}
              <sup>
                <a href="#hinweise" aria-label="Zu den Pflichthinweisen">*</a>
              </sup>
            </span>
            <span className="preis-nachsatz">{hero.preisNachsatz}</span>
            <span className="preis-bedingung">{hero.preisBedingung}</span>
          </p>

          <div className="aktionen" data-leiste-aus="">
            <CtaKnopf cta="oktober-allgemein" stil="bernstein">{hero.knopf}</CtaKnopf>
            <AnrufVerweis />
          </div>
        </div>

        <Platzhalter
          motiv={hero.bild.motiv}
          format={hero.bild.format}
          alt={hero.bild.alt}
          seitenverhaeltnis="4 / 5"
          className="hero-bild"
        />
      </div>
    </section>
  )
}

/** Vertrauensleiste direkt unter der ersten Ansicht. */
export function Vertrauen() {
  return (
    <section className="vertrauen" aria-label="Das Fit-Inn in Zahlen">
      <div className="satz">
        <ul>
          {vertrauen.map(p => (
            <li key={p.wert} className="vertrauen-punkt">
              <strong>{p.wert}</strong>
              <span>{p.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
