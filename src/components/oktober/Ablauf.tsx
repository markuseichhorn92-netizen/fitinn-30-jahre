import { ablauf } from './inhalt'
import { AnrufVerweis, CtaKnopf } from './Teile'

// Anfrage → Beratung → Loslegen.
export function Ablauf() {
  return (
    <section id="ablauf" className="abschnitt" aria-labelledby="ablauf-titel">
      <div className="satz">
        <div className="kopfzeile">
          <h2 id="ablauf-titel" className="h2">{ablauf.titel}</h2>
        </div>

        <ol className="schritte">
          {ablauf.schritte.map(s => (
            <li key={s.nr} className="schritt" data-erscheinen="">
              <span className="schritt-nr" aria-hidden="true">{s.nr}</span>
              <h3>
                <span className="sr-only">Schritt {Number(s.nr)}: </span>
                {s.titel}
              </h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>

        <p className="einsteiger">{ablauf.einsteiger}</p>

        <div className="aktionen cta-zeile">
          <CtaKnopf cta="oktober-allgemein">Schritt 1: Jetzt anfragen</CtaKnopf>
          <AnrufVerweis />
        </div>
      </div>
    </section>
  )
}
