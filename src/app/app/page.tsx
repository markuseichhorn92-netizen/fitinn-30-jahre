import type { Metadata, Viewport } from 'next';
import NextImage from 'next/image';
import { fitInnApp, technogymApp, type StoreApp } from '@/lib/start-config';
import styles from '../start/start.module.css';
import extra from './app.module.css';

// /app – Download-Seite für beide Apps (Fit-Inn-App + Technogym-App), Ziel für Mail, WLAN-Erfolgsseite, Aushang.
// Statisch, ohne Cookie-Banner/Pixel (siehe HideOn im Root-Layout), nicht im Index.
// Geräteerkennung per kleinem Inline-Script: setzt <html data-os="ios|android">, CSS hebt den passenden
// Store-Knopf hervor. Ohne JS bzw. am Rechner sind beide Knöpfe gleichwertig. Kein automatisches Weiterleiten.
// Klicks zählen anonym im Trichter (/api/f, Schritte start-ios, start-android, Einstieg = fitinn/technogym), ohne Cookie.

export const dynamic = 'force-static';

const TITLE = 'Unsere Apps – Fit-Inn Trier';
const DESCRIPTION = 'Fit-Inn-App und Technogym-App kostenlos laden: Mitgliedschaft, Punkte und Prämien in der Fit-Inn-App, Training in der Technogym-App.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/app' },
  robots: { index: false, follow: false },
  openGraph: { title: TITLE, description: DESCRIPTION, url: '/app', locale: 'de_DE', type: 'website' },
};

export const viewport: Viewport = { themeColor: '#0A4958', width: 'device-width', initialScale: 1 };

const IMPRINT = 'https://fit-inn-trier.de/impressum-fit-inn-trier';
const PRIVACY = 'https://fit-inn-trier.de/datenschutz-fit-inn-trier';
const FITINN_POINTS = [
  'Mitgliedschaft verwalten und pausieren',
  'Check-in und Check-out',
  'Punkte sammeln, Prämien und Partner-Gutscheine',
  'Termine buchen, Auslastung sehen',
];
const TECHNOGYM_POINTS = ['Dein Trainingsplan', 'Dein Training', 'Anmeldung an den Geräten'];

const DETECT = `(function(){try{var n=navigator,u=n.userAgent||'',d=n.userAgentData,p='';
if(/iPhone|iPad|iPod/.test(u)||(/Macintosh/.test(u)&&n.maxTouchPoints>1))p='ios';
else if(/Android/i.test(u)||(d&&/android/i.test(d.platform||'')))p='android';
if(p)document.documentElement.setAttribute('data-os',p);
document.addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('[data-f]');if(!a||!n.sendBeacon)return;
try{n.sendBeacon('/api/f',new Blob([JSON.stringify({step:a.getAttribute('data-f'),page:location.pathname,src:a.getAttribute('data-src')||''})],{type:'application/json'}))}catch(x){}});
}catch(e){}})();`;

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4v11" />
      <path d="m7 10.5 5 5 5-5" />
      <path d="M5 20h14" />
    </svg>
  );
}

function AppCard({ app, id, points }: { app: StoreApp; id: string; points: string[] }) {
  return (
    <section className={styles.card} aria-labelledby={`app-${id}`}>
      <div className={styles.cardHead}>
        <span className={styles.icon}><PhoneIcon /></span>
        <div>
          <h2 id={`app-${id}`} className={styles.cardTitle}>{app.name}</h2>
          <p className={styles.cardText}>{app.text}</p>
        </div>
      </div>
      <ul className={extra.points}>
        {points.map((p) => <li key={p}>{p}</li>)}
      </ul>
      <div className={styles.stores}>
        <a className={`${styles.store} ${styles.ios}`} href={app.ios} data-f="start-ios" data-src={id} rel="noopener">
          <DownloadIcon />
          <span>Im App Store laden<small>iPhone und iPad</small></span>
        </a>
        <a className={`${styles.store} ${styles.android}`} href={app.android} data-f="start-android" data-src={id} rel="noopener">
          <DownloadIcon />
          <span>Bei Google Play laden<small>Android</small></span>
        </a>
      </div>
    </section>
  );
}

export default function AppPage() {
  return (
    <main className={styles.page}>
      <script dangerouslySetInnerHTML={{ __html: DETECT }} />
      <header className={styles.head}>
        <NextImage
          className={styles.logo}
          src="/media/77c4274d-cac5-4f25-88b1-15387b0fa6b9.png"
          alt="Fit-Inn Trier"
          width={2917}
          height={486}
          sizes="168px"
          priority
        />
        <h1 className={styles.title}>Unsere Apps</h1>
        <p className={styles.sub}>Zwei Apps, kostenlos – jede mit eigener Aufgabe</p>
      </header>

      <div className={styles.cards}>
        <p className={extra.note}>
          <strong>Alte Fit-Inn-App noch auf dem Handy?</strong> Bitte einmal löschen und die neue Fit-Inn-App laden.
          Die neue App ist komplett neu – ein normales Update ersetzt die alte nicht.
        </p>
        {fitInnApp ? <AppCard app={fitInnApp} id="fitinn" points={FITINN_POINTS} /> : null}
        <AppCard app={technogymApp} id="technogym" points={TECHNOGYM_POINTS} />

      </div>

      <footer className={styles.foot}>
        <p>Fit-Inn Trier · Auf Hirtenberg 8, 54296 Trier</p>
        <p className={styles.links}>
          <a href={IMPRINT}>Impressum</a>
          <a href={PRIVACY}>Datenschutz</a>
        </p>
      </footer>
    </main>
  );
}
