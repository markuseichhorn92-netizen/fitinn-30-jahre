import { anfrage, kontakt, rechtshinweis } from './inhalt'
import { AnrufKnopf, Brief, Ort } from './Teile'

// Ziel aller Schaltflächen (#anfrage). Die Anfragestrecke wird im nächsten
// Schritt in den markierten Platzhalter eingebunden; Telefon und E-Mail
// funktionieren schon jetzt.
export function Anfrage() {
  return (
    <section
      id="anfrage"
      className="abschnitt dunkel anfrage"
      aria-labelledby="anfrage-titel"
      data-leiste-aus=""
    >
      <div className="satz anfrage-raster">
        <div>
          <h2 id="anfrage-titel" className="h2">{anfrage.titel}</h2>
          <p className="lead">{anfrage.text}</p>

          <div className="aktionen" style={{ marginTop: '1.8rem' }}>
            <AnrufKnopf stil="bernstein" text={`Anrufen: ${kontakt.telefon.anzeige}`} />
          </div>

          <ul className="kontaktwege">
            <li>
              <Brief />
              <span>
                <a href={`mailto:${kontakt.email}`} data-kontakt="email">{kontakt.email}</a>
                <small>Wir antworten dir persönlich</small>
              </span>
            </li>
            <li>
              <Ort />
              <span>
                <a href={kontakt.route} target="_blank" rel="noopener noreferrer">
                  {kontakt.strasse}, {kontakt.plz} {kontakt.ort}
                  <span className="sr-only"> (Route planen, öffnet Google Maps in neuem Tab)</span>
                </a>
                <small>{kontakt.stadtteil} · komm gern vorbei</small>
              </span>
            </li>
          </ul>
        </div>

        {/* PLATZHALTER Anfragestrecke: Formular hier einbinden. Die gewählte
            Option steht am auslösenden Link in data-cta. */}
        <div className="formular-platzhalter" data-platzhalter="anfragestrecke">
          <span className="platzhalter-marke">Platzhalter</span>
          <p>{anfrage.platzhalter}</p>
          <p>Bis dahin erreichst du uns telefonisch unter {kontakt.telefon.anzeige} oder per E-Mail.</p>
        </div>
      </div>
    </section>
  )
}

/** Pflichtangaben zum Angebot, ausführlich. Ziel des Sternchens. */
export function Pflichtangaben() {
  return (
    <section id="pflichtangaben" className="pflicht" aria-labelledby="pflicht-titel">
      <div className="satz">
        <h2 id="pflicht-titel">* Pflichtangaben zum Angebot</h2>
        <p>
          {rechtshinweis.map((teil, i) =>
            teil.href ? (
              <a key={i} href={teil.href} target="_blank" rel="noopener noreferrer">
                {teil.t}
                <span className="sr-only"> (öffnet in neuem Tab)</span>
              </a>
            ) : (
              <span key={i}>{teil.t}</span>
            ),
          )}
        </p>
      </div>
    </section>
  )
}
