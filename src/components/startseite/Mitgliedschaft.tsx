import { aktivierungsgebuehr, eur, GEBUEHR_NAME, inklusive, studio, tarife } from '@/components/fitinn/studio'
import { Haken, Knopf, Label, Zeilen } from '@/components/fitinn/Teile'
import { laufzeiten as oktoberLaufzeiten } from '@/components/oktober/inhalt'
import { mitgliedschaft, PROBETRAINING } from './inhalt'

// Preisvergleich nach der Referenz: drei Spalten, die äußeren offen auf
// Weiß, nur die mittlere als dunkle Fläche. In der Mitte steht die
// 104-Wochen-Laufzeit, weil sie belegbar den niedrigsten Wochenbeitrag hat.
// Reihenfolge: 52 · 104 · 4 Wochen. Jede Karte rechnet bis zum Gesamtpreis
// inklusive Aktivierungsgebühr – wie die Rechnung auf /oktober.
export function Mitgliedschaft({ oktober }: { oktober: boolean }) {
  const [okt52, okt104] = oktoberLaufzeiten
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
                  <strong>{eur(t.preis)}</strong>
                  <span>pro Woche</span>
                </p>

                <table className="fi-rechnung" style={{ marginTop: 24 }}>
                  <caption>Erstlaufzeit {t.laufzeit}</caption>
                  <tbody>
                    <tr>
                      <th scope="row">Beiträge</th>
                      <td className="fi-formel">{t.wochen} × {eur(t.preis)}</td>
                      <td>{t.beitraege}</td>
                    </tr>
                    <tr>
                      <th scope="row">{GEBUEHR_NAME}</th>
                      <td className="fi-formel">einmalig</td>
                      <td>{aktivierungsgebuehr}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="fi-summe">
                      <th scope="row" colSpan={2}>Gesamtpreis</th>
                      <td>{t.gesamt}</td>
                    </tr>
                  </tfoot>
                </table>

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
              <strong>Oktober-Special:</strong> Bei Abschluss vom 01. bis 31.10.2026 kosten die ersten 12{'\u00a0'}Wochen
              je{'\u00a0'}5{'\u00a0'}€ – bei 52 oder 104{'\u00a0'}Wochen Laufzeit. Danach {okt52.folgebeitrag} bzw.{' '}
              {okt104.folgebeitrag} pro Woche, einmalig {aktivierungsgebuehr} {GEBUEHR_NAME}; Gesamtpreis{' '}
              {okt52.gesamt} bzw. {okt104.gesamt}. Nur für Neumitglieder ab 18{'\u00a0'}Jahren, nicht mit anderen
              Aktionen kombinierbar.
            </p>
            <a href="/oktober" className="fi-verweis">Alle Details zum Angebot</a>
          </div>
        )}
      </div>
    </section>
  )
}
