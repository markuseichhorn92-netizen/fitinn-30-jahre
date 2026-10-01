import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
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
import Ziel from '@/sections/13-ziel';

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
import ziele from '@/content/13-ziele.json';

// Ziel-Unterseiten für Anzeigen je Thema (/ziel/abnehmen, /ziel/ruecken, /ziel/neustart, /ziel/fit-ab-50).
// Gleiche Seite wie die Startseite, aber: eigener Hero-Text, Problem→Lösung-Block, passende Bereiche zuerst,
// Themen-Fragen vorn und die Buchung startet mit dem passenden Ziel. Preis/Aktion bleiben identisch.
type Z = (typeof ziele)[keyof typeof ziele];
const ALL = ziele as Record<string, Z>;

export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(ALL).map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const z = ALL[slug];
  if (!z) return {};
  return {
    title: z.meta.title,
    description: z.meta.description,
    alternates: { canonical: `/ziel/${slug}` },
    openGraph: { title: z.meta.title, description: z.meta.description, url: `/ziel/${slug}` },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const z = ALL[slug];
  if (!z) notFound();
  const order = z.bereicheOrder as string[];
  const bereiche = [...trainingsbereiche.bereiche].sort((a, b) => order.indexOf(a.tag) - order.indexOf(b.tag));
  const fragenZiel = { ...fragen, fragen: [...z.fragen, ...fragen.fragen] };
  const context = `Kontext (nicht wiederholen): Der Besucher kam über die Themenseite „${z.label}“. Gehe, wo es passt, auf dieses Thema ein. Keine Heil- oder Ergebnisversprechen, keine medizinischen Aussagen.`;
  const note = { ...(wizard as any).noteSource };
  Object.keys(note).forEach((k) => { note[k] = `${note[k]} (Themenseite ${z.label})`; });
  return (
    <main>
      <FinnWidget {...finnWidget} />
      <Hero {...hero} {...z.hero} secondaryLabel="So gehen wir es an" secondaryHref="#loesung" />
      <Ziel slug={slug} bgDeco={z.deco} {...z.section} />
      <Angebot {...angebot} />
      <Trainingsbereiche {...trainingsbereiche} bereiche={bereiche} />
      <Rundgang {...rundgang} />
      <Stimmen {...stimmen} />
      <Booking {...booking} />
      <Fragen {...fragenZiel} context={context} />
      <Footer {...footer} />
      <Wizard {...wizard} presetGoal={z.presetGoal} noteSource={note} />
    </main>
  );
}
