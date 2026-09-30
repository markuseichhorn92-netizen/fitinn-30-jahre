import FinnWidget from '@/sections/00-finn-widget';
import Hero from '@/sections/01-hero';
import Trainingsbereiche from '@/sections/02-trainingsbereiche';
import Angebot from '@/sections/03-angebot';
import Stimmen from '@/sections/05-stimmen';
import Rundgang from '@/sections/06-rundgang';
import Fragen from '@/sections/08-fragen';
import Booking from '@/sections/09-booking';
import Footer from '@/sections/10-footer';
import Wizard from '@/sections/11-wizard';

import finnWidget from '@/content/00-finn-widget.json';
import hero from '@/content/01-hero.json';
import trainingsbereiche from '@/content/02-trainingsbereiche.json';
import angebot from '@/content/03-angebot.json';
import stimmen from '@/content/05-stimmen.json';
import rundgang from '@/content/06-rundgang.json';
import fragen from '@/content/08-fragen.json';
import booking from '@/content/09-booking.json';
import footer from '@/content/10-footer.json';
import wizard from '@/content/11-wizard.json';

// Anzeigen-Version: kurz, Buchung früh. (Haus, FINN-Teaser bleiben im Repo, sind aber nicht eingebunden.) Texte stehen in src/content/*.json.
export default function Page() {
  return (
    <main>
      <FinnWidget {...finnWidget} />
      <Hero {...hero} />
      <Angebot {...angebot} />
      <Trainingsbereiche {...trainingsbereiche} />
      <Rundgang {...rundgang} />
      <Stimmen {...stimmen} />
      <Booking {...booking} />
      <Fragen {...fragen} />
      <Footer {...footer} />
      <Wizard {...wizard} />
    </main>
  );
}
