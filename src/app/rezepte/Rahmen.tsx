import type { Viewport } from 'next';
import localFont from 'next/font/local';
import Link from 'next/link';
import s from './rezepte.module.css';
import '../freunde/theme-c.css';
import { APP_URL, HINWEIS, STOFF_URL } from './daten';

// Seitenrahmen der Rezeptseiten im Look C (wie /app, /freunde): Inhalt, Ernährungs-Hinweis, Footer.
const outfit = localFont({ src: '../../fonts/outfit.woff', weight: '100 900', display: 'swap' });

const IMPRINT = 'https://fit-inn-trier.de/impressum-fit-inn-trier';
const PRIVACY = 'https://fit-inn-trier.de/datenschutz-fit-inn-trier';

export const viewport: Viewport = { themeColor: '#0A4958', width: 'device-width', initialScale: 1 };

export function MehrErnaehrung() {
  return (
    <section className={s.mehr} aria-labelledby="mehr">
      <div className={s.kick}>Mehr Ernährung bei Fit-Inn</div>
      <h2 className={s.h2} id="mehr">Dein Plan statt einzelner Rezepte</h2>
      <div className={s.mehrGrid}>
        <div className={s.mehrKarte}>
          <span className={s.gratis}>Für Mitglieder kostenlos</span>
          <h3>Ernährungsmodul in der Fit-Inn App</h3>
          <p>In der App auf „Ernährungsplan erstellen“ tippen, dem Hinweis folgen und das Ernährungsmodul hinzubuchen.</p>
          <Link className={s.btn} href={APP_URL}>App laden</Link>
        </div>
        <div className={s.mehrKarte}>
          <h3>Stoffwechsel-Coaching</h3>
          <p>Mit einer Atemgasanalyse messen wir, wie dein Stoffwechsel arbeitet – die Grundlage für deinen persönlichen Ernährungs- und Trainingsplan. Vorab gibt es ein kostenloses Beratungsgespräch.</p>
          <a className={`${s.btn} ${s.btnHell}`} href={STOFF_URL}>Mehr erfahren</a>
        </div>
      </div>
    </section>
  );
}

export default function Rahmen({ children }: { children: React.ReactNode }) {
  const fonts = `body:has([data-theme="c"]){--fc-outfit:${outfit.style.fontFamily}}`;
  return (
    <main data-theme="c" className={s.page}>
      <style dangerouslySetInnerHTML={{ __html: fonts }} />
      {children}
      <MehrErnaehrung />
      <p className={s.recht}>{HINWEIS}</p>
      <footer className={s.foot}>
        <p>Fit-Inn Trier · Auf Hirtenberg 8, 54296 Trier</p>
        <p className={s.links}><a href={IMPRINT}>Impressum</a><a href={PRIVACY}>Datenschutz</a></p>
      </footer>
    </main>
  );
}
