import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Booking from '@/sections/09-booking';
import Footer from '@/sections/10-footer';
import Wizard from '@/sections/11-wizard';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import Trail from '@/components/freunde-c/Trail';
import Bewegung from '@/components/freunde-c/Bewegung';
import { BwHero, BwGate, BwInfo, BwKleingedrucktes } from '@/sections/17-blackweek';
import '../freunde/theme-c.css';
import './black-week.css';

import hero from '@/content/01-hero.json';
import booking from '@/content/09-booking.json';
import footer from '@/content/10-footer.json';
import wizard from '@/content/11-wizard.json';
import bw from '@/content/17-blackweek.json';

const outfit = localFont({ src: '../../fonts/outfit.woff', weight: '100 900', display: 'swap' });
const caveat = localFont({ src: '../../fonts/caveat.woff', weight: '600', display: 'swap', preload: false });

// /black-week – Black Week 2026 (Angebot E (Vertragsbeginn 01.01.2027, bis dahin kostenlos), 20 Plätze, ab 06.11. bis 30.11.2026).
// Nicht im Index, nicht im Menü (solange das Angebot nicht final ist). Look „C“ wie /freunde, gleiche Magicline-Probetraining-Buchung;
// Buchungen tragen „Black Week 2026“ im Hinweis/Quelle, Trichter-Zählung unter der Seite /black-week (siehe /api/f).
// Zeitsteuerung (Europe/Berlin): Aktion gilt ab sofort, nach 30.11. „Aktion beendet“ statt Buchung (siehe src/lib/blackweek.ts).
export const metadata: Metadata = {
  title: bw.meta.title,
  description: bw.meta.description,
  alternates: { canonical: '/black-week' },
  robots: { index: false, follow: false },
  openGraph: { title: bw.meta.title, description: bw.meta.description, url: '/black-week' },
};

export default function Page() {
  const note = { ...(wizard as any).noteSource };
  Object.keys(note).forEach((k) => { note[k] = 'Gebucht über Black-Week-Seite (Black Week 2026)'; });
  const bookingBw = {
    ...booking,
    subheadline: 'Rund 90 Minuten, mit oder ohne Trainer. Kostenlos und unverbindlich – den Black-Week-Vertrag schließt du nach dem Probetraining vor Ort ab.',
    crmSource: 'Landingpage-Formular (Black Week 2026)',
  };
  const fonts = `body:has([data-theme="c"]){--fc-outfit:${outfit.style.fontFamily};--fc-caveat:${caveat.style.fontFamily}}`;
  return (
    <main data-theme="c">
      <style dangerouslySetInnerHTML={{ __html: fonts }} />
      <BwHero
        {...bw}
        bgImage={hero.bgImage}
        logoAlt={hero.logoAlt}
        logoHref={hero.logoHref}
        phoneLabel={hero.topPhoneLabel}
        phoneHref={hero.topPhoneHref}
      />
      <BwGate>
        <div className="fc-buchung">
          <img className="fc-glas fc-glas-kal" src="/media/c/glas-kalender.svg" alt="" aria-hidden="true" width={130} height={130} data-trail="3" data-tm="3" />
          <Booking {...bookingBw} />
        </div>
        <BwInfo {...bw} />
      </BwGate>
      <BwKleingedrucktes text={bw.pflichttext} />
      <Footer {...footer} />
      <BwGate>
        <Wizard {...wizard} noteSource={note} />
        <WhatsAppFloat base={(footer as any).whatsappBase} text="Hallo Lena, ich habe eine Frage zur Black Week im Fit-Inn" place="black-week-float" />
        <Trail />
        <Bewegung />
      </BwGate>
    </main>
  );
}
