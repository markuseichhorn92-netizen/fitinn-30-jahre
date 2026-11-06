import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import NextImage from 'next/image';
import type { StoreApp } from '@/lib/start-config';
import localFont from 'next/font/local';
import extra from './app.module.css';
import '../freunde/theme-c.css';

// Gemeinsame Schritt-für-Schritt-Seite hinter den Aufsteller-QR-Codes (/app/fitinn, /app/technogym).
// Serverseitig per User-Agent: passender Store-Knopf wird hervorgehoben, beide bleiben immer sichtbar. Kein Cookie, nicht im Index.

const outfit = localFont({ src: '../../fonts/outfit.woff', weight: '100 900', display: 'swap' });
const caveat = localFont({ src: '../../fonts/caveat.woff', weight: '600', display: 'swap', preload: false });

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

export function Stores({ app, id, light }: { app: StoreApp; id: string; light?: boolean }) {
  return (
    <div className={`${extra.stores} ${light ? extra.onLight : ''}`}>
      <a className={`${extra.store} ${extra.ios}`} href={app.ios} data-f="start-ios" data-src={id} rel="noopener">
        <DownloadIcon /><span>Im App Store laden<small>iPhone und iPad</small></span>
      </a>
      <a className={`${extra.store} ${extra.android}`} href={app.android} data-f="start-android" data-src={id} rel="noopener">
        <DownloadIcon /><span>Bei Google Play laden<small>Android</small></span>
      </a>
    </div>
  );
}

export function Phone({ src, alt, cut }: { src: string; alt: string; cut?: boolean }) {
  return (
    <div className={`${extra.phone} ${cut ? extra.cut : ''}`}>
      <NextImage src={src} alt={alt} width={520} height={1030} sizes="300px" />
    </div>
  );
}

// Seitenrahmen im Look C (wie /black-week, /freunde): Hero (Petrol), Inhalt, Zeitstrahl, Footer.
export default async function AppShell({ app, id, badge, title, lead, hero, children, after, steps, stepsTitle, stepsKick, buttonStep }: {
  app: StoreApp; id: string; badge: string; title: React.ReactNode; lead: string; hero?: React.ReactNode;
  children?: React.ReactNode; after?: React.ReactNode; steps: Step[]; stepsTitle: string; stepsKick: string; buttonStep: number;
}) {
  const ua = (await headers()).get('user-agent') || '';
  const os = /iPhone|iPod|iPad/.test(ua) ? 'ios' : /Android/i.test(ua) ? 'android' : '';
  const fonts = `body:has([data-theme="c"]){--fc-outfit:${outfit.style.fontFamily};--fc-caveat:${caveat.style.fontFamily}}`;
  return (
    <main data-theme="c" className={extra.page}>
      <style dangerouslySetInnerHTML={{ __html: fonts }} />
      <script dangerouslySetInnerHTML={{ __html: BEACON }} />
      <div className={extra.wrap} data-os={os}>
        <header className={`${extra.hero} ${hero ? '' : extra.noPhone}`}>
          <div className={extra.heroTxt}>
            <NextImage className={extra.logo} src="/media/77c4274d-cac5-4f25-88b1-15387b0fa6b9.png" alt="Fit-Inn Trier" width={2917} height={486} sizes="150px" priority />
            <span className={extra.badge}>{badge}</span>
            <h1 className={extra.h1}>{title}</h1>
            <p className={extra.lead}>{lead}</p>
            <Stores app={app} id={`${id}-hero`} />
          </div>
          {hero}
        </header>
        {children}
        <section className={extra.sec} aria-labelledby="so">
          <div className={extra.secKick}>{stepsKick}</div>
          <h2 className={extra.h2} id="so">{stepsTitle}</h2>
          <ol className={extra.line}>
            {steps.map((s, i) => (
              <li key={s.title} className={extra.st}>
                <span className={`${extra.stNum} ${i === buttonStep ? extra.stGold : ''}`}>{i + 1}</span>
                <div className={extra.stBody}>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  {i === buttonStep ? <Stores app={app} id={id} light /> : null}
                </div>
              </li>
            ))}
          </ol>
        </section>
        {after}
      </div>
      <footer className={extra.foot}>
        <p>Fit-Inn Trier · Auf Hirtenberg 8, 54296 Trier</p>
        <p className={extra.links}><a href={IMPRINT}>Impressum</a><a href={PRIVACY}>Datenschutz</a></p>
      </footer>
    </main>
  );
}
