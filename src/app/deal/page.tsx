import type { Metadata } from 'next';
import FinnWidget from '@/sections/00-finn-widget';
import Angebot from '@/sections/03-angebot';
import Stimmen from '@/sections/05-stimmen';
import Rundgang from '@/sections/06-rundgang';
import Fragen from '@/sections/08-fragen';
import Booking from '@/sections/09-booking';
import Footer from '@/sections/10-footer';
import Wizard from '@/sections/11-wizard';
import Deal from '@/sections/14-deal';

import finnWidget from '@/content/00-finn-widget.json';
import hero from '@/content/01-hero.json';
import angebot from '@/content/03-angebot.json';
import stimmen from '@/content/05-stimmen.json';
import rundgang from '@/content/06-rundgang.json';
import fragen from '@/content/08-fragen.json';
import booking from '@/content/09-booking.json';
import footer from '@/content/10-footer.json';
import wizard from '@/content/11-wizard.json';
import deal from '@/content/14-deal.json';

// /deal – dieselbe Aktion wie die Startseite, als laute „Deal"-Seite: großer Preis, drei Säulen,
// „Wie funktioniert der Deal?", danach Stimmen, Sparrechner, Buchung, Fragen. Texte: src/content/14-deal.json.
export const metadata: Metadata = {
  title: deal.meta.title,
  description: deal.meta.description,
  alternates: { canonical: '/deal' },
  openGraph: { title: deal.meta.title, description: deal.meta.description, url: '/deal' },
};

export default function Page() {
  const note = { ...(wizard as any).noteSource };
  Object.keys(note).forEach((k) => { note[k] = `${note[k]} (Deal-Seite)`; });
  return (
    <main>
      <FinnWidget {...finnWidget} />
      <Deal
        {...deal}
        bgImage={hero.bgImage}
        logo={hero.logo}
        logoAlt={hero.logoAlt}
        logoHref={hero.logoHref}
        phoneLabel={hero.topPhoneLabel}
        phoneHref={hero.topPhoneHref}
        features={hero.features}
        promoStart={hero.promoStart}
        priceUntil={hero.priceUntil}
        promoWeekly={hero.promoWeekly}
        regularMax={hero.regularMax}
      />
      <Stimmen {...stimmen} />
      <Angebot {...angebot} />
      <Rundgang {...rundgang} />
      <Booking {...booking} />
      <Fragen {...fragen} context="Kontext (nicht wiederholen): Der Besucher kam über die Deal-Seite. Keine Heil- oder Ergebnisversprechen." />
      <Footer {...footer} />
      <Wizard {...wizard} noteSource={note} />
    </main>
  );
}
