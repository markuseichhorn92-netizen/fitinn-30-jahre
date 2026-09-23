import '@/components/fitinn/fitinn.css'
import { Erscheinen } from '@/components/fitinn/Erscheinen'
import { Fuss } from '@/components/fitinn/Fuss'
import { Kopf } from '@/components/fitinn/Kopf'
import { schriftKlassen } from '@/components/fitinn/schriften'
import { Hero } from './Hero'
import { nav, PROBETRAINING } from './inhalt'
import { Mitgliedschaft } from './Mitgliedschaft'
import { Staerken } from './Staerken'
import { Probetraining, Start } from './Start'
import { Abschluss, Fragen, VorOrt } from './VorOrt'

// Startseite im redaktionellen Fit-Inn-Design: große Aussage, dunkle
// Stärken-Fläche, klarer Preisvergleich, Ablauf mit echter Buchung,
// Standort, Fragen und oranger Abschluss.
export function StartSeite({ oktober }: { oktober: boolean }) {
  return (
    <div className={`fi ${schriftKlassen}`}>
      <a href="#inhalt" className="fi-sprung">Zum Inhalt springen</a>
      <Erscheinen />
      <Kopf nav={nav} aktion={{ href: PROBETRAINING, lang: 'Probetraining anfragen', kurz: 'Probetraining', cta: 'startseite-kopf' }} />
      <main id="inhalt">
        <Hero />
        <Staerken />
        <Mitgliedschaft oktober={oktober} />
        <Start />
        <Probetraining />
        <VorOrt />
        <Fragen />
        <Abschluss />
      </main>
      <Fuss
        nav={[...nav, { href: '#fragen', text: 'Fragen' }, { href: PROBETRAINING, text: 'Probetraining' }]}
        cookieEinstellungen
      />
    </div>
  )
}
