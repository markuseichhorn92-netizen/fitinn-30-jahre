import FinnWidget from '@/sections/00-finn-widget';
import { KompaktHero, KompaktWarum, KompaktAblauf, KompaktPreis, KompaktStimmen, KompaktFragen } from '@/sections/16-kompakt';
import Footer from '@/sections/10-footer';
import Wizard from '@/sections/11-wizard';

import finnWidget from '@/content/00-finn-widget.json';
import kompakt from '@/content/16-kompakt.json';
import angebot from '@/content/03-angebot.json';
import footer from '@/content/10-footer.json';
import wizard from '@/content/11-wizard.json';

// Entschlackte Startseite (Branch entschlackt): Hero → Warum → Ablauf → Preis → Stimmen → Fragen + Schluss.
// Der Buchungsdialog (Wizard) und der Lena-Chat bleiben unverändert; /ziel und /deal nutzen weiter die bisherigen Abschnitte.
// Lena-Hinweis nach 20 s entfällt (nur noch Leerlauf und Abbruch), damit im Lesefluss nichts aufpoppt.
const finn = { ...finnWidget, nudgesSpar: finnWidget.nudgesSpar.filter((n: { mode: string }) => n.mode !== 'time') };

export default function Page() {
  return (
    <main>
      <FinnWidget {...finn} />
      <KompaktHero hero={kompakt.hero} stickyHideId="fragen" />
      <KompaktWarum warum={kompakt.warum} />
      <KompaktAblauf ablauf={kompakt.ablauf} />
      <KompaktPreis preis={kompakt.preis} legal={angebot} />
      <KompaktStimmen stimmen={kompakt.stimmen} />
      <KompaktFragen fragen={kompakt.fragen} id="fragen" />
      <Footer {...footer} />
      <Wizard {...wizard} />
    </main>
  );
}
