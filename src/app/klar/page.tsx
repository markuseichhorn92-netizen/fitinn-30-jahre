import type { Metadata } from 'next';
import localFont from 'next/font/local';
import KonfiguratorLink from '@/components/KonfiguratorLink';
import { BuchenKnopf, KlarSticky } from './KlarClient';
import { INHALT, klarPhase, klarUnten } from '@/lib/klar';
import Unten from './Unten';
import footer from '@/content/10-footer.json';
import './klar.css';
import './unten.css';

// /klar – ENTWURF 19.11.2026: aufgeräumte Angebotsseite (Maßstab Übersichtlichkeit: GymPod-Kampagnenseite, eigene Gestaltung/Texte).
// Ein Ziel (Probetraining → /konfigurator?q=klar), kein Menü, ~7 Bildschirme mobil. Nicht im Index.
// Black Week bis 30.11.2026, ab 01.12. Standard-Tarife: Umschalter in src/lib/klar.ts. Die Seite wird stündlich neu erzeugt (ISR),
// damit der Wechsel ohne neuen Deploy greift (spätestens ~1 h nach Mitternacht).
export const revalidate = 3600;

const outfit = localFont({ src: '../../fonts/outfit.woff', weight: '100 900', display: 'swap' });

export const metadata: Metadata = {
  title: 'Fitnessstudio in Trier-Feyen mit Betreuung | Fit-Inn Trier',
  description: 'Fit-Inn Trier-Feyen: Technogym-Gerätetraining mit Betreuung, familiengeführt seit 1996, kostenlose Parkplätze. Probetraining kostenlos buchen.',
  alternates: { canonical: '/klar' },
  robots: { index: false, follow: false },
};

export default function Page() {
  const phase = klarPhase();
  const t = INHALT[phase];
  return (
    <main className="kl" data-phase={phase} style={{ ['--kl-font' as any]: outfit.style.fontFamily }}>
      {/* Lena-Begrüßung erst nach 25 s, damit beim ersten Eindruck nichts über Preis/Knopf liegt. Der Chat-Knopf selbst bleibt. */}
      <script dangerouslySetInnerHTML={{ __html: 'window.FILAUNCH=Object.assign({greetFirst:25000,greetHold:8000},window.FILAUNCH||{})' }} />

      {/* 1 · Kopf v2 (19.11.): Aufbau wie GymPod – Logo + Ort oben, vollflächiges echtes Foto, Preis-Kachel, ein Knopf.
          Eigene Gestaltung/Texte in Markenfarben. Foto nicht animiert, mit fetchPriority=high (LCP). */}
      <section className="kl-hero" aria-labelledby="kl-h1">
        <picture className="kl-hero-foto">
          <source media="(max-width: 699px)" srcSet="/media/klar/hero-zirkel-hoch.webp" width={660} height={1100} />
          <img src="/media/klar/hero-zirkel-1600.webp" srcSet="/media/klar/hero-zirkel-1280.webp 1280w, /media/klar/hero-zirkel-1600.webp 1600w" sizes="100vw" alt="Zirkel-Bereich mit Technogym-Geräten im Fit-Inn Trier-Feyen" width={1600} height={1200} fetchPriority="high" />
        </picture>
        <a className="kl-tel" href={footer.phoneHref} aria-label={`Anrufen: ${footer.phoneLabel}`}>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" /></svg>
        </a>
        <div className="kl-hero-in">
          <div className="kl-kopf">
            <img className="kl-logo" src="/media/c/logo-petrol.png" alt="Fit-Inn Trier" width={150} height={25} />
            <h1 id="kl-h1"><span className="kl-ort">Trier-Feyen</span><span className="kl-ort-sub">Fitnessstudio mit Betreuung</span></h1>
          </div>
          <div className="kl-kachel">
            <p className="kl-etikett">{t.kachelEtikett}</p>
            <p className="kl-gross"><strong>{t.preisGross}</strong><span>{t.preisEinheit}</span></p>
            {t.preisDanach ? <p className="kl-danach">{t.preisDanach}</p> : null}
            {t.streich ? <p className="kl-streich">{t.streich.was} <s aria-label={`statt ${t.streich.alt}`}>{t.streich.alt}</s> <b>{t.streich.neu}</b></p> : null}
            <p className="kl-preis-klein">{t.preisKlein}</p>
            <p className="kl-frist">{t.frist}</p>
          </div>
          <BuchenKnopf quelle="hero" />
          <p className="kl-note">Kostenlos und unverbindlich. Du entscheidest erst danach.</p>
        </div>
      </section>
      {/* 2–8 · Alles unter dem Kopf: Variante A/B (Entwurf 19.11.), siehe Unten.tsx */}
      <Unten v={klarUnten()} t={t} />
      <p className="kl-klein">{t.kleingedrucktes}</p>

      <footer className="kl-fuss">
        <p>{footer.brand} · {footer.address} · <a href={footer.phoneHref}>{footer.phoneLabel}</a></p>
        <p>{footer.links.map((l, i) => <span key={l.href}>{i ? ' · ' : ''}<a href={l.href}>{l.label}</a></span>)}</p>
      </footer>

      <KonfiguratorLink q="klar" />
      <KlarSticky stark={t.stickyStark} text={t.stickyText} />
    </main>
  );
}
