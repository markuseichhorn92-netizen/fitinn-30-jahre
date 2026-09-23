import { stimmen, team } from './inhalt'
import { Platzhalter } from './Teile'

// Familie Eichhorn und Team. Fotos, Namen und Rollen sind Platzhalter.
export function Team() {
  return (
    <section id="team" className="abschnitt hell-2" aria-labelledby="team-titel">
      <div className="satz">
        <div className="kopfzeile">
          <h2 id="team-titel" className="h2">{team.titel}</h2>
          <p className="lead">{team.text}</p>
        </div>

        <div className="team-raster">
          <Platzhalter
            motiv={team.familie.motiv}
            format={team.familie.format}
            alt={team.familie.alt}
            seitenverhaeltnis="16 / 9"
          />
          <ul className="team-personen">
            {team.personen.map((p, i) => (
              <li key={i}>
                <figure className="team-person" style={{ margin: 0 }}>
                  <Platzhalter
                    motiv="Porträt"
                    format="Hochformat 4:5"
                    alt={`Porträt: ${p.name}, ${p.rolle}`}
                    seitenverhaeltnis="4 / 5"
                  />
                  <figcaption>
                    <strong>{p.name}</strong>
                    <span className="team-rolle">{p.rolle}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

// Mitgliederstimmen – ausschließlich echte, freigegebene Zitate. Bis dahin
// stehen hier klar gekennzeichnete Leerplätze, keine erfundenen Bewertungen.
export function Stimmen() {
  return (
    <section id="stimmen" className="abschnitt" aria-labelledby="stimmen-titel">
      <div className="satz">
        <div className="kopfzeile">
          <h2 id="stimmen-titel" className="h2">{stimmen.titel}</h2>
        </div>
        <ul className="stimmen">
          {stimmen.eintraege.map((s, i) =>
            s.platzhalter ? (
              <li key={i} className="stimme-leer" data-platzhalter="stimme">
                <span className="platzhalter-marke">Platzhalter</span>
                <p>Hier steht bald die echte Stimme eines Mitglieds – nur mit dessen Freigabe.</p>
                <footer>
                  <strong>{s.name}</strong> · {s.seit}
                </footer>
              </li>
            ) : (
              <li key={i} className="stimme">
                <figure style={{ margin: 0 }}>
                  <blockquote>„{s.zitat}“</blockquote>
                  <figcaption>
                    <strong>{s.name}</strong> · {s.seit}
                  </figcaption>
                </figure>
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  )
}
