import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Booking from '@/sections/09-booking';
import Footer from '@/sections/10-footer';
import KonfiguratorLink from '@/components/KonfiguratorLink';
import Bewegung from '@/components/freunde-c/Bewegung';
import { BwHero, BwGate, BwInfo, BwKleingedrucktes, BwSticky } from '@/sections/17-blackweek';
import '../freunde/theme-c.css';
import './black-week.css';

import hero from '@/content/01-hero.json';
import booking from '@/content/09-booking.json';
import footer from '@/content/10-footer.json';
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
  const bookingBw = {
    ...booking,
    headline: 'Such dir einen Termin aus.',
    subheadline: 'Rund 90 Minuten, mit oder ohne Trainer. Kostenlos und unverbindlich.',
    crmSource: 'Landingpage-Formular (Black Week 2026)',
  };
  const fonts = `body:has([data-theme="c"]){--fc-outfit:${outfit.style.fontFamily};--fc-caveat:${caveat.style.fontFamily}}`;
  return (
    <main data-theme="c">
      <style dangerouslySetInnerHTML={{ __html: fonts }} />
      {/* Lena-Begrüßung erst nach 25 s (statt 1,8 s): sie lag sonst beim ersten Eindruck über dem Hauptknopf. Der Chat-Knopf selbst bleibt. */}
      <script dangerouslySetInnerHTML={{ __html: 'window.FILAUNCH=Object.assign({greetFirst:25000,greetHold:8000},window.FILAUNCH||{})' }} />
      <BwHero
        {...bw}
        bgImage={hero.bgImage}
        logoAlt={hero.logoAlt}
        logoHref={hero.logoHref}
        phoneLabel={hero.topPhoneLabel}
        phoneHref={hero.topPhoneHref}
      />
      <BwGate>
        <BwInfo {...bw} />
        <div className="fc-buchung">
          <img className="fc-glas fc-glas-kal" src="/media/c/glas-kalender.svg" alt="" aria-hidden="true" width={130} height={130} loading="lazy" />
          <Booking {...bookingBw} />
        </div>
      </BwGate>
      <BwKleingedrucktes text={bw.pflichttext} />
      <Footer {...footer} />
      <BwGate>
        <KonfiguratorLink q="black-week" />
        <BwSticky {...bw.sticky} />
        <Bewegung />
      </BwGate>
    </main>
  );
}
