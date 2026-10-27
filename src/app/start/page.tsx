import type { Metadata, Viewport } from 'next';
import NextImage from 'next/image';
import { fitInnApp, technogymApp, wlan, type StoreApp } from '@/lib/start-config';
import styles from './start.module.css';

// /start – Ziel des QR „Apps laden“ am Studio-TV: Store-Links + WLAN-Anleitung.
// Statisch, ohne Cookie-Banner/Pixel (siehe HideOn im Root-Layout), nicht im Index.
// Geräteerkennung per kleinem Inline-Script: setzt <html data-os="ios|android">, CSS hebt den passenden
// Store-Knopf hervor. Ohne JS bzw. am Rechner sind beide Knöpfe gleichwertig. Kein automatisches Weiterleiten.
// Klicks zählen anonym im Trichter (/api/f, Schritte start-ios, start-android, start-wlan), ohne Cookie.

export const dynamic = 'force-static';

const TITLE = 'Apps & WLAN – Fit-Inn Trier';
const DESCRIPTION = 'Technogym-App laden und mit dem kostenlosen WLAN im Fit-Inn Trier verbinden.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/start' },
  robots: { index: false, follow: false },
  openGraph: { title: TITLE, description: DESCRIPTION, url: '/start', locale: 'de_DE', type: 'website' },
};

export const viewport: Viewport = { themeColor: '#0A4958', width: 'device-width', initialScale: 1 };

const IMPRINT = 'https://fit-inn-trier.de/impressum-fit-inn-trier';
const PRIVACY = 'https://fit-inn-trier.de/datenschutz-fit-inn-trier';
// Löst die WLAN-Anmeldeseite aus, falls sie nicht von selbst erscheint (Seite bewusst ohne https)
const PORTAL_TRIGGER = 'http://neverssl.com';

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

function WifiIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 8.5a14 14 0 0 1 19 0" />
      <path d="M5.5 12a9.5 9.5 0 0 1 13 0" />
      <path d="M8.5 15.5a5 5 0 0 1 7 0" />
      <circle cx="12" cy="19" r="1" fill="currentColor" />
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

function AppCard({ app, id }: { app: StoreApp; id: string }) {
  return (
    <section className={styles.card} aria-labelledby={`app-${id}`}>
      <div className={styles.cardHead}>
        <span className={styles.icon}><PhoneIcon /></span>
        <div>
          <h2 id={`app-${id}`} className={styles.cardTitle}>{app.name}</h2>
          <p className={styles.cardText}>{app.text}</p>
        </div>
      </div>
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

export default function StartPage() {
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
        <h1 className={styles.title}>Willkommen im Fit-Inn</h1>
        <p className={styles.sub}>Apps laden und WLAN verbinden</p>
      </header>

      <div className={styles.cards}>
        {fitInnApp ? <AppCard app={fitInnApp} id="fitinn" /> : null}
        <AppCard app={technogymApp} id="technogym" />

        <section className={styles.card} aria-labelledby="wlan">
          <div className={styles.cardHead}>
            <span className={styles.icon}><WifiIcon /></span>
            <div>
              <h2 id="wlan" className={styles.cardTitle}>Kostenloses WLAN</h2>
              <p className={styles.cardText}>Netz „{wlan.ssid}“ – offen, ohne Passwort.</p>
            </div>
          </div>
          <ol className={styles.steps}>
            <li><span className={styles.num}>1</span><span>Mit „{wlan.ssid}“ verbinden.</span></li>
            <li><span className={styles.num}>2</span><span>Auf der Anmeldeseite „Akzeptieren“ tippen.</span></li>
          </ol>
          <p className={styles.hint}>
            Die Anmeldeseite erscheint automatisch. Falls nicht, öffne den Browser oder{' '}
            <a href={PORTAL_TRIGGER} data-f="start-wlan" data-src="wlan" rel="noopener nofollow">tippe hier</a>.
          </p>
        </section>
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
