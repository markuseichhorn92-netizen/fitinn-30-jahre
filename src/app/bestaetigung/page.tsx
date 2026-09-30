import type { Metadata } from 'next';
import Bestaetigung from '@/sections/12-bestaetigung';
import Footer from '@/sections/10-footer';
import content from '@/content/12-bestaetigung.json';
import footer from '@/content/10-footer.json';

export const metadata: Metadata = {
  title: 'Dein Probetraining ist gebucht | Fit-Inn Trier',
  description: 'Alle Infos zu deinem Probetraining im Fit-Inn Trier: Termin, Ablauf, Anfahrt und Antworten auf deine Fragen.',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <main>
      <Bestaetigung {...content} />
      <Footer {...footer} />
    </main>
  );
}
