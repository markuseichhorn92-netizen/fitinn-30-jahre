import { fragen } from './inhalt'
import { AnrufVerweis, CtaKnopf } from './Teile'

// FAQ als <details>: öffnet und schließt ohne JavaScript, Tastatur und
// Screenreader bekommen das Verhalten vom Browser. Dieselben Texte stehen im
// FAQPage-Schema (strukturdaten.ts).
export function Fragen() {
  return (
    <section id="fragen" className="abschnitt" aria-labelledby="fragen-titel">
      <div className="satz fragen-raster">
        <div className="fragen-kopf">
          <h2 id="fragen-titel" className="h2">Deine Fragen, unsere Antworten.</h2>
          <p className="lead">Etwas nicht dabei? Ruf uns an – wir nehmen uns Zeit.</p>
          <div className="aktionen">
            <CtaKnopf cta="oktober-allgemein">Unverbindlich anfragen</CtaKnopf>
            <AnrufVerweis vorsatz="Anrufen:" />
          </div>
        </div>

        <div>
          {fragen.map((f, i) => (
            <details key={f.frage} className="frage" open={i === 0}>
              <summary>
                <span>{f.frage}</span>
                <span className="frage-zeichen" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="frage-antwort">{f.antwort}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
