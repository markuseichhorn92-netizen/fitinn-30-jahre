import { Knopf, Label, Zeilen } from '@/components/fitinn/Teile'
import { PROBETRAINING, staerken } from './inhalt'

// Dunkle Vollfläche mit feinem Raster: vier konkrete Stärken als offene
// Textspalten – eine zusammenhängende Fläche, keine Karten.
export function Staerken() {
  return (
    <section id="betreuung" className="fi-abschnitt fi-dunkel fi-raster-grund" aria-labelledby="staerken-titel">
      <div className="fi-satz">
        <Label nr="01">{staerken.label}</Label>
        <div className="fi-kopfreihe">
          <div>
            <h2 id="staerken-titel" className="fi-h2"><Zeilen zeilen={staerken.zeilen} /></h2>
            <p className="fi-text">{staerken.text}</p>
          </div>
          <Knopf href={PROBETRAINING} cta="startseite-betreuung">Probetraining anfragen</Knopf>
        </div>

        <ol className="fi-spalten fi-spalten--4">
          {staerken.punkte.map((p, i) => (
            <li key={p.titel} className="fi-spalte" data-zeigen="">
              <span className="fi-spalte-nr" aria-hidden="true">0{i + 1}</span>
              <h3 className="fi-h3">{p.titel}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ol>

        <p className="fi-fussnote">{staerken.fussnote}</p>
      </div>
    </section>
  )
}
