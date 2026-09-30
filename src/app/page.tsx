import FinnWidget from '@/sections/00-finn-widget';
import Hero from '@/sections/01-hero';
import Trainingsbereiche from '@/sections/02-trainingsbereiche';
import Angebot from '@/sections/03-angebot';
import Haus from '@/sections/04-haus';
import Stimmen from '@/sections/05-stimmen';
import Rundgang from '@/sections/06-rundgang';
import FinnTeaser from '@/sections/07-finn-teaser';
import Faq from '@/sections/08-faq';
import Booking from '@/sections/09-booking';
import Footer from '@/sections/10-footer';

import finnWidget from '@/content/00-finn-widget.json';
import hero from '@/content/01-hero.json';
import trainingsbereiche from '@/content/02-trainingsbereiche.json';
import angebot from '@/content/03-angebot.json';
import haus from '@/content/04-haus.json';
import stimmen from '@/content/05-stimmen.json';
import rundgang from '@/content/06-rundgang.json';
import finnTeaser from '@/content/07-finn-teaser.json';
import faq from '@/content/08-faq.json';
import booking from '@/content/09-booking.json';
import footer from '@/content/10-footer.json';

// Reihenfolge wie auf Onepage. Texte stehen in src/content/*.json.
export default function Page() {
  return (
    <main>
      <FinnWidget {...finnWidget} />
      <Hero {...hero} />
      <Trainingsbereiche {...trainingsbereiche} />
      <Angebot {...angebot} />
      <Haus {...haus} />
      <Stimmen {...stimmen} />
      <Rundgang {...rundgang} />
      <FinnTeaser {...finnTeaser} />
      <Faq {...faq} />
      <Booking {...booking} />
      <Footer {...footer} />
    </main>
  );
}
