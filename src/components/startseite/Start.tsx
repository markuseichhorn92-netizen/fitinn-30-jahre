import { Buchung } from '@/components/fitinn/Buchung'
import { Anruf, Knopf, Label, Zeilen } from '@/components/fitinn/Teile'
import { buchung, PROBETRAINING, start } from './inhalt'

// Ablauf: links die Aussage, rechts die Schritte als vertikale Folge.
export function Start() {
  return (
    <section id="start" className="fi-abschnitt" aria-labelledby="start-titel" style={{ paddingTop: 0 }}>
      <div className="fi-satz fi-zwei fi-zwei--gleich">
        <div className="fi-zwei-links fi-zwei-links--klebend">
          <Label nr="03">{start.label}</Label>
          <h2 id="start-titel" className="fi-h2"><Zeilen zeilen={start.zeilen} /></h2>
          <p className="fi-text">{start.text}</p>
          <div className="fi-aktionen">
            <Knopf href={PROBETRAINING} cta="startseite-ablauf">Probetraining anfragen</Knopf>
          </div>
        </div>

        <ol className="fi-schritte">
          {start.schritte.map((s, i) => (
            <li key={s.titel} className="fi-schritt" data-zeigen="">
              <span className="fi-schritt-nr" aria-hidden="true">0{i + 1}</span>
              <h3 className="fi-h3">
                <span className="sr-only">Schritt {i + 1}: </span>
                {s.titel}
              </h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

// Die Buchung selbst – Ziel aller „Probetraining anfragen“-Schaltflächen.
export function Probetraining() {
  return (
    <section id="probetraining" className="fi-abschnitt fi-hell" aria-labelledby="probetraining-titel">
      <div className="fi-satz fi-zwei fi-zwei--gleich">
        <div className="fi-zwei-links">
          <Label nr="04">{buchung.label}</Label>
          <h2 id="probetraining-titel" className="fi-h2"><Zeilen zeilen={buchung.zeilen} /></h2>
          <p className="fi-text">{buchung.text}</p>
          <div className="fi-aktionen">
            <Anruf vorsatz="Lieber anrufen:" />
          </div>
        </div>
        <Buchung quelle="startseite" />
      </div>
    </section>
  )
}
