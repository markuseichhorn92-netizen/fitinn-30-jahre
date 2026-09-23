import { aktion, angebot, laufzeiten } from './inhalt'
import { AnrufVerweis, CtaKnopf, Haken } from './Teile'

// Die beiden Laufzeiten nebeneinander, 104 Wochen als Empfehlung. Jede Karte
// rechnet offen bis zur Endsumme; die Pflichthinweise stehen direkt darunter,
// nicht erst am Seitenende.
export function Angebot() {
  return (
    <section id="angebot" className="abschnitt" aria-labelledby="angebot-titel">
      <div className="satz">
        <div className="kopfzeile">
          <h2 id="angebot-titel" className="h2">{angebot.titel}</h2>
          <p className="lead">{angebot.text}</p>
        </div>

        <div className="tarife">
          {laufzeiten.map(l => {
            const titelId = `tarif-${l.wochen}`
            return (
              <article
                key={l.id}
                className={`tarif${l.empfohlen ? ' tarif-empfohlen' : ''}`}
                aria-labelledby={titelId}
                data-erscheinen=""
              >
                {l.empfohlen && <span className="tarif-marke">{angebot.empfehlung}</span>}
                <span className="tarif-laufzeit">{l.name}</span>
                <h3 id={titelId}>{l.titel}</h3>

                <p className="tarif-preis">
                  <span className="tarif-betrag">
                    {aktion.vorteilsPreis}
                    <sup>
                      <a href="#hinweise" aria-label="Zu den Pflichthinweisen">*</a>
                    </sup>
                  </span>
                  <span className="tarif-einheit">pro Woche</span>
                </p>
                <p className="tarif-folge">
                  in den ersten {aktion.vorteilsWochen} Wochen, danach <strong>{l.folgebeitrag} pro Woche</strong>
                </p>

                <ul className="haken-liste">
                  {l.leistungen.map(p => (
                    <li key={p}>
                      <Haken />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                {l.extra && (
                  <p className="tarif-extra">
                    <span className="tarif-extra-plus" aria-hidden="true">PLUS</span>
                    <span className="tarif-extra-text">
                      <span className="sr-only">Zusätzlich: </span>
                      <strong>{l.extra.titel}</strong>
                      <span className="tarif-extra-wert">{l.extra.wert}</span>
                    </span>
                  </p>
                )}

                <table className="rechnung">
                  <caption>Deine Rechnung über {l.name}</caption>
                  <tbody>
                    {l.rechnung.map(z => (
                      <tr key={z.was}>
                        <th scope="row">{z.was}</th>
                        <td className="formel">{z.rechnung}</td>
                        <td>{z.summe}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th scope="row">Gesamt</th>
                      <td className="formel" />
                      <td>{l.gesamt}</td>
                    </tr>
                    <tr className="gebuehr">
                      <th scope="row" colSpan={2}>plus einmalige Aufnahmegebühr</th>
                      <td>{aktion.aufnahmegebuehr}</td>
                    </tr>
                  </tfoot>
                </table>

                <div className="tarif-fuss">
                  <CtaKnopf cta={l.id} stil={l.empfohlen ? 'bernstein' : 'kupfer'}>
                    {l.knopf}
                  </CtaKnopf>
                </div>
              </article>
            )
          })}
        </div>

        <aside id="hinweise" className="hinweise" aria-labelledby="hinweise-titel">
          <h3 id="hinweise-titel">Gut zu wissen</h3>
          <ul>
            {angebot.hinweise.map(h => (
              <li key={h}>{h}</li>
            ))}
            <li>
              Alle Bedingungen im Detail findest du in den <a href="#pflichtangaben">Pflichtangaben zum Angebot</a>.
            </li>
          </ul>
        </aside>

        <div className="aktionen cta-zeile">
          <CtaKnopf cta="oktober-allgemein">Unverbindlich anfragen</CtaKnopf>
          <AnrufVerweis vorsatz="Fragen zum Angebot?" />
        </div>
      </div>
    </section>
  )
}
