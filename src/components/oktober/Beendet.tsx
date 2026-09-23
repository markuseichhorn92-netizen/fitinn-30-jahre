import './oktober.css'
import { kontakt } from './inhalt'
import { sans, serif } from './OktoberSeite'
import { AnrufKnopf } from './Teile'

// Was /oktober ab dem 01.11.2026 zeigt: kein Angebot mehr, aber ein Weg zum
// Studio. Wer über einen alten Flyer oder eine Anzeige kommt, ist trotzdem
// Interessent – nur eben für das reguläre Angebot.
export function Beendet() {
  return (
    <div className={`okt ${sans.variable} ${serif.variable}`}>
      <main className="dunkel" style={{ minHeight: '100svh', display: 'grid', alignItems: 'center' }}>
        <div className="satz" style={{ paddingBlock: 'clamp(4rem, 12vh, 8rem)' }}>
          <h1 className="h2" style={{ maxWidth: '16ch' }}>Das Oktober-Special ist beendet.</h1>
          <p className="lead">
            Danke für dein Interesse. Das Fit-Inn Trier ist natürlich weiter für dich da – aktuelle Angebote und
            ein unverbindliches Probetraining findest du auf unserer Website.
          </p>
          <div className="aktionen" style={{ marginTop: '2rem' }}>
            <a href={kontakt.website.href} className="knopf knopf-bernstein">Zur Website</a>
            <AnrufKnopf stil="linie-hell" />
          </div>
        </div>
      </main>
    </div>
  )
}
