import FinnWidget from '@/sections/00-finn-widget';
import Hero from '@/sections/01-hero';
import Trainingsbereiche from '@/sections/02-trainingsbereiche';
import Angebot from '@/sections/03-angebot';
import Stimmen from '@/sections/05-stimmen';
import Faq from '@/sections/08-faq';
import Booking from '@/sections/09-booking';
import Footer from '@/sections/10-footer';

import finnWidget from '@/content/00-finn-widget.json';
import hero from '@/content/01-hero.json';
import trainingsbereiche from '@/content/02-trainingsbereiche.json';
import angebot from '@/content/03-angebot.json';
import stimmen from '@/content/05-stimmen.json';
import faq from '@/content/08-faq.json';
import booking from '@/content/09-booking.json';
import footer from '@/content/10-footer.json';

// Anzeigen-Version: kurz, Buchung früh. (Haus, Rundgang, FINN-Teaser bleiben im Repo, sind aber nicht eingebunden.) Texte stehen in src/content/*.json.
export default function Page() {
  return (
    <main>
      <FinnWidget {...finnWidget} />
      <Hero {...hero} />
      <Angebot {...angebot} />
      <Trainingsbereiche {...trainingsbereiche} />
      <Stimmen {...stimmen} />
      <Booking {...booking} />
      <Faq {...faq} />
      <Footer {...footer} />
    </main>
  );
}
