import type { Metadata } from 'next';
import Booking from '@/sections/09-booking';
import Footer from '@/sections/10-footer';
import Wizard from '@/sections/11-wizard';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { FreundeHero, FreundeInfo } from '@/sections/15-freunde';

import hero from '@/content/01-hero.json';
import booking from '@/content/09-booking.json';
import footer from '@/content/10-footer.json';
import wizard from '@/content/11-wizard.json';
import freunde from '@/content/15-freunde.json';

// /freunde – Ziel des Links in „Freunde werben Freunde“ (GymApp). Nicht im Index, nicht im Menü.
// Gleiche Probetraining-Buchung (Magicline) wie die Startseite; Buchungen tragen „Freunde werben“ im Hinweis
// und zählen im Trichter unter der Seite /freunde (siehe /api/f). Bewusst ohne Preise/Aktion – die Seite bleibt zeitlos.
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
  return (
    <main>
      <FreundeHero
        {...freunde}
        bgImage={hero.bgImage}
        logo={hero.logo}
        logoAlt={hero.logoAlt}
        logoHref={hero.logoHref}
        phoneLabel={hero.topPhoneLabel}
        phoneHref={hero.topPhoneHref}
      />
      <Booking {...bookingFriends} />
      <FreundeInfo {...freunde} />
      <Footer {...footer} />
      <Wizard {...wizard} noteSource={note} />
      <WhatsAppFloat base={(footer as any).whatsappBase} text="Hallo Lena, ich wurde von einem Freund eingeladen und habe eine Frage zum Probetraining" place="freunde-float" />
    </main>
  );
}
