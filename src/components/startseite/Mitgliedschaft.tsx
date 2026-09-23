import { aktivierungsgebuehr, inklusive, studio, tarife } from '@/components/fitinn/studio'
import { Haken, Knopf, Label, Zeilen } from '@/components/fitinn/Teile'
import { mitgliedschaft, PROBETRAINING } from './inhalt'

// Preisvergleich nach der Referenz: drei Spalten, die äußeren offen auf
// Weiß, nur die mittlere als dunkle Fläche. In der Mitte steht die
// 104-Wochen-Laufzeit, weil sie belegbar den niedrigsten Wochenbeitrag hat.
// Reihenfolge: 52 · 104 · 4 Wochen.
export function Mitgliedschaft({ oktober }: { oktober: boolean }) {
  return (
    <section id="mitgliedschaft" className="fi-abschnitt" aria-labelledby="mitgliedschaft-titel">
      <div className="fi-satz">
        <Label nr="02">{mitgliedschaft.label}</Label>
        <h2 id="mitgliedschaft-titel" className="fi-h2"><Zeilen zeilen={mitgliedschaft.zeilen} /></h2>
        <p className="fi-text" style={{ marginTop: 20 }}>{mitgliedschaft.text}</p>

        <div className="fi-preise">
          {tarife.map(t => {
            const mitte = t.id === '104'
            return (
              <article
                key={t.id}
                className={`fi-preis${mitte ? ' fi-preis--dunkel' : ''}`}
                aria-labelledby={`tarif-${t.id}`}
                data-zeigen=""
              >
                {mitte && <span className="fi-preis-marke">{mitgliedschaft.marke}</span>}
                <h3 id={`tarif-${t.id}`} className="fi-preis-name">{t.name}</h3>
                <p className="fi-preis-unter">{mitgliedschaft.beschreibung[t.id]}</p>

                <p className="fi-preis-kopf">Wochenbeitrag</p>
                <p className="fi-preis-betrag">
                  <strong>{t.preis} €</strong>
                  <span>pro Woche</span>
                </p>

                <hr className="fi-preis-trenner" />

                <ul className="fi-haken-liste">
                  <li><Haken /><span>Erstlaufzeit {t.laufzeit}</span></li>
                  <li><Haken /><span>{t.wochen} × {t.preis} € = {t.gesamt} über die Laufzeit</span></li>
                  <li><Haken /><span>Alle Leistungen inklusive</span></li>
                </ul>

                <div className="fi-preis-fuss">
                  <Knopf href={PROBETRAINING} stil={mitte ? 'orange' : 'linie'} cta={`startseite-tarif-${t.id}`}>
                    Probetraining anfragen
                  </Knopf>
                </div>
              </article>
            )
          })}
        </div>

        <div className="fi-preis-leiste">
          <div>
            <h3>{mitgliedschaft.inklusiveTitel}</h3>
            <ul>
              {inklusive.map(p => (
                <li key={p}><Haken /><span>{p}</span></li>
              ))}
            </ul>
          </div>
          <p className="fi-mono" style={{ fontSize: 15 }}>+ einmalig {aktivierungsgebuehr} Aktivierung</p>
        </div>

        <p className="fi-kleingedruckt">
          {mitgliedschaft.kleingedruckt}
          <a href={studio.agb} target="_blank" rel="noopener noreferrer">
            AGB<span className="sr-only"> (öffnet in neuem Tab)</span>
          </a>
          .
        </p>

        {oktober && (
          <div className="fi-hinweis">
            <p>
              <strong>Oktober-Special:</strong> Bei Abschluss vom 01. bis 31.10.2026 kosten die ersten 12 Wochen je 5 € –
              in der 52- und der 104-Wochen-Mitgliedschaft.
            </p>
            <a href="/oktober" className="fi-verweis">Alle Details zum Angebot</a>
          </div>
        )}
      </div>
    </section>
  )
}
