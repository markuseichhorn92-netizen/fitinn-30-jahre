import { ernaehrung } from './inhalt'
import { CtaKnopf, Haken } from './Teile'

// Training trifft Ernährung: das Extra der 104-Wochen-Mitgliedschaft.
export function Ernaehrung() {
  return (
    <section id="ernaehrung" className="abschnitt dunkel ernaehrung" aria-labelledby="ernaehrung-titel">
      <div className="satz ernaehrung-raster">
        <div>
          <h2 id="ernaehrung-titel" className="h2">{ernaehrung.titel}</h2>
          <p className="lead">{ernaehrung.text}</p>
          <ul className="haken-liste">
            {ernaehrung.punkte.map(p => (
              <li key={p}>
                <Haken />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <div className="aktionen cta-zeile">
            <CtaKnopf cta="oktober-104" stil="bernstein">{ernaehrung.knopf}</CtaKnopf>
          </div>
        </div>

        <p className="stempel" data-erscheinen="">
          <span className="stempel-innen">
            <span className="stempel-zahl">{ernaehrung.stempel.zeile1}</span>
            <span className="stempel-was">{ernaehrung.stempel.zeile2}</span>
            <span className="stempel-wert">{ernaehrung.stempel.wert}</span>
            <span className="stempel-bedingung">{ernaehrung.stempel.bedingung}</span>
          </span>
        </p>
      </div>
    </section>
  )
}
