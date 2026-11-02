import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Booking from '@/sections/09-booking';
import Footer from '@/sections/10-footer';
import Wizard from '@/sections/11-wizard';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import Trail from '@/components/freunde-c/Trail';
import Bewegung from '@/components/freunde-c/Bewegung';
import { FreundeHero, FreundeInfo } from '@/sections/15-freunde';
import './theme-c.css';

import hero from '@/content/01-hero.json';
import booking from '@/content/09-booking.json';
import footer from '@/content/10-footer.json';
import wizard from '@/content/11-wizard.json';
import freunde from '@/content/15-freunde.json';

// Schriften wie Website-Entwurf Prototyp C (Outfit, Handschrift Caveat) – nur auf dieser Seite geladen.
const outfit = localFont({ src: '../../fonts/outfit.woff', weight: '100 900', display: 'swap' });
const caveat = localFont({ src: '../../fonts/caveat.woff', weight: '600', display: 'swap', preload: false });

// /freunde – Ziel des Links in „Freunde werben Freunde“ (GymApp). Nicht im Index, nicht im Menü.
// Gleiche Probetraining-Buchung (Magicline) wie die Startseite; Buchungen tragen „Freunde werben“ im Hinweis
// und zählen im Trichter unter der Seite /freunde (siehe /api/f). Bewusst ohne Preise/Aktion – die Seite bleibt zeitlos.
// Look „C“ (02.11.2026): data-theme="c" färbt Buchung, Dialog, Cookie-Banner und Footer nur auf dieser Seite um (theme-c.css).
export const metadata: Metadata = {
  title: freunde.meta.title,
  description: freunde.meta.description,
  alternates: { canonical: '/freunde' },
  robots: { index: false, follow: false },
  openGraph: { title: freunde.meta.title, description: freunde.meta.description, url: '/freunde' },
};

export default function Page() {
  const note = { ...(wizard as any).noteSource };
  Object.keys(note).forEach((k) => { note[k] = 'Gebucht über Freunde-werben-Seite'; });
  const bookingFriends = {
    ...booking,
    subheadline: 'Rund 90 Minuten, mit oder ohne Trainer. Kostenlos und unverbindlich – such dir einen Termin aus.',
    crmSource: 'Landingpage-Formular (Freunde werben)',
  };
  // Schriften auch für Cookie-Banner (liegt außerhalb von <main>) → Variablen am body
  const fonts = `body:has([data-theme="c"]){--fc-outfit:${outfit.style.fontFamily};--fc-caveat:${caveat.style.fontFamily}}`;
  return (
    <main data-theme="c">
      <style dangerouslySetInnerHTML={{ __html: fonts }} />
      <FreundeHero
        {...freunde}
        bgImage={hero.bgImage}
        logoAlt={hero.logoAlt}
        logoHref={hero.logoHref}
        phoneLabel={hero.topPhoneLabel}
        phoneHref={hero.topPhoneHref}
      />
      <div className="fc-buchung">
        <img className="fc-glas fc-glas-kal" src="/media/c/glas-kalender.svg" alt="" aria-hidden="true" width={130} height={130} data-trail="3" data-tm="3" />
        <Booking {...bookingFriends} />
      </div>
      <FreundeInfo {...freunde} />
      <Footer {...footer} />
      <Wizard {...wizard} noteSource={note} />
      <WhatsAppFloat base={(footer as any).whatsappBase} text="Hallo Lena, ich wurde von einem Freund eingeladen und habe eine Frage zum Probetraining" place="freunde-float" />
      <Trail />
      <Bewegung />
    </main>
  );
}
