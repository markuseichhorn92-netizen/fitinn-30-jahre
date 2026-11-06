import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import NextImage from 'next/image';
import type { StoreApp } from '@/lib/start-config';
import styles from '../start/start.module.css';
import extra from './app.module.css';

// Gemeinsame Schritt-für-Schritt-Seite hinter den Aufsteller-QR-Codes (/app/fitinn, /app/technogym).
// Serverseitig per User-Agent: passender Store-Knopf wird hervorgehoben, beide bleiben immer sichtbar. Kein Cookie, nicht im Index.

export type Step = { title: string; text: React.ReactNode };

const IMPRINT = 'https://fit-inn-trier.de/impressum-fit-inn-trier';
const PRIVACY = 'https://fit-inn-trier.de/datenschutz-fit-inn-trier';

const BEACON = `document.addEventListener('click',function(e){var n=navigator,a=e.target&&e.target.closest&&e.target.closest('[data-f]');if(!a||!n.sendBeacon)return;
try{n.sendBeacon('/api/f',new Blob([JSON.stringify({step:a.getAttribute('data-f'),page:location.pathname,src:a.getAttribute('data-src')||''})],{type:'application/json'}))}catch(x){}});`;

export const viewport: Viewport = { themeColor: '#0A4958', width: 'device-width', initialScale: 1 };

export function stepMeta(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: { index: false, follow: false },
    openGraph: { title, description, url: path, locale: 'de_DE', type: 'website' },
  };
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4v11" /><path d="m7 10.5 5 5 5-5" /><path d="M5 20h14" />
    </svg>
  );
}

function Stores({ app, id }: { app: StoreApp; id: string }) {
  return (
    <div className={styles.stores}>
      <a className={`${styles.store} ${extra.ios}`} href={app.ios} data-f="start-ios" data-src={id} rel="noopener">
        <DownloadIcon /><span>Im App Store laden<small>iPhone und iPad</small></span>
      </a>
      <a className={`${styles.store} ${extra.android}`} href={app.android} data-f="start-android" data-src={id} rel="noopener">
        <DownloadIcon /><span>Bei Google Play laden<small>Android</small></span>
      </a>
    </div>
  );
}

export default async function AppSteps({ app, id, title, sub, steps, buttonStep }: {
  app: StoreApp; id: string; title: string; sub: string; steps: Step[]; buttonStep: number;
}) {
  const ua = (await headers()).get('user-agent') || '';
  const os = /iPhone|iPod|iPad/.test(ua) ? 'ios' : /Android/i.test(ua) ? 'android' : '';
  return (
    <main className={styles.page}>
      <script dangerouslySetInnerHTML={{ __html: BEACON }} />
      <header className={styles.head}>
        <NextImage className={styles.logo} src="/media/77c4274d-cac5-4f25-88b1-15387b0fa6b9.png" alt="Fit-Inn Trier" width={2917} height={486} sizes="168px" priority />
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.sub}>{sub}</p>
      </header>
      <div className={styles.cards}>
        <div className={extra.wrap} data-os={os}>
          <ol className={extra.stepList}>
            {steps.map((s, i) => (
              <li key={s.title} className={extra.stepItem}>
                <span className={extra.stepNum}>{i + 1}</span>
                <div className={extra.stepBody}>
                  <h2 className={extra.stepTitle}>{s.title}</h2>
                  <p className={extra.stepText}>{s.text}</p>
                  {i === buttonStep ? <Stores app={app} id={id} /> : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <footer className={styles.foot}>
        <p>Fit-Inn Trier · Auf Hirtenberg 8, 54296 Trier</p>
        <p className={styles.links}><a href={IMPRINT}>Impressum</a><a href={PRIVACY}>Datenschutz</a></p>
      </footer>
    </main>
  );
}
