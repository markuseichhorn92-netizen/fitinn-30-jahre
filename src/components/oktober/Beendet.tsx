import '@/components/fitinn/fitinn.css'
import { schriftKlassen } from '@/components/fitinn/schriften'
import { Knopf, Zeilen } from '@/components/fitinn/Teile'
import { kontakt } from './inhalt'

// Was /oktober ab dem 01.11.2026 zeigt: kein Angebot mehr, aber ein Weg zum
// Studio. Wer über einen alten Flyer oder eine Anzeige kommt, ist trotzdem
// Interessent – nur eben für das reguläre Angebot.
export function Beendet() {
  return (
    <div className={`fi ${schriftKlassen}`}>
      <main className="fi-dunkel fi-raster-grund" style={{ minHeight: '100svh', display: 'grid', alignItems: 'center' }}>
        <div className="fi-satz" style={{ paddingBlock: 'clamp(64px, 12vh, 128px)' }}>
          <h1 className="fi-h2"><Zeilen zeilen={['Das Oktober-Special', 'ist beendet.']} /></h1>
          <p className="fi-text fi-lead" style={{ marginTop: 20 }}>
            Danke für dein Interesse. Das Fit-Inn Trier ist weiter für dich da – mit einem kostenlosen,
            unverbindlichen Probetraining.
          </p>
          <div className="fi-aktionen" style={{ marginTop: 32 }}>
            <Knopf href="/#probetraining">Probetraining anfragen</Knopf>
            <Knopf href={`tel:${kontakt.telefon.link}`} stil="linie-hell" pfeil={false}>
              Anrufen: {kontakt.telefon.anzeige}
            </Knopf>
          </div>
        </div>
      </main>
    </div>
  )
}
