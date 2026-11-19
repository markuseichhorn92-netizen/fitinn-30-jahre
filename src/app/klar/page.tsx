import type { Metadata } from 'next';
import localFont from 'next/font/local';
import KonfiguratorLink from '@/components/KonfiguratorLink';
import { BuchenKnopf, KlarSticky } from './KlarClient';
import { INHALT, OEFFNUNGSZEITEN, klarPhase } from '@/lib/klar';
import footer from '@/content/10-footer.json';
import './klar.css';

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

const ROUTE = 'https://www.google.com/maps/dir/?api=1&destination=Fit-Inn+Trier,+Auf+Hirtenberg+8,+54296+Trier';

function Haken() {
  return (
    <svg className="kl-haken" viewBox="0 0 20 20" aria-hidden="true" width="20" height="20">
      <circle cx="10" cy="10" r="10" fill="#107E97" />
      <path d="M5.6 10.4l2.9 2.8 5.9-6.2" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Page() {
  const phase = klarPhase();
  const t = INHALT[phase];
  return (
    <main className="kl" data-phase={phase} style={{ ['--kl-font' as any]: outfit.style.fontFamily }}>
      {/* Lena-Begrüßung erst nach 25 s, damit beim ersten Eindruck nichts über Preis/Knopf liegt. Der Chat-Knopf selbst bleibt. */}
      <script dangerouslySetInnerHTML={{ __html: 'window.FILAUNCH=Object.assign({greetFirst:25000,greetHold:8000},window.FILAUNCH||{})' }} />

      {/* 1 · Kopf: Ort + Angebot, Preis mit Gesamtpreis, 3 Vorteile, ein Knopf, echtes Foto */}
      <section className="kl-hero" aria-labelledby="kl-h1">
        <div className="kl-hero-bild">
          <img src="/media/klar/hero-zirkel-1280.webp" srcSet="/media/klar/hero-zirkel-800.webp 800w, /media/klar/hero-zirkel-1280.webp 1280w" sizes="(min-width: 900px) 50vw, 100vw" alt="Gerätebereich im Fit-Inn Trier-Feyen" width={1280} height={960} fetchPriority="high" />
          <div className="kl-leiste">
            <img src="/media/c/logo-petrol.png" alt="Fit-Inn Trier" width={112} height={34} />
            <a className="kl-tel" href={footer.phoneHref} aria-label={`Anrufen: ${footer.phoneLabel}`}>
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" /></svg>
              {footer.phoneLabel}
            </a>
          </div>
        </div>
        <div className="kl-hero-text">
          <p className="kl-kicker">{t.kicker}</p>
          <h1 id="kl-h1">Fitnessstudio in <span className="kl-nw">Trier-Feyen</span> – mit Betreuung.</h1>
          <div className="kl-preis">
            <p className="kl-preis-zeile"><strong>{t.preisGross}</strong><span>{t.preisEinheit}</span>{t.preisDanach ? <em>{t.preisDanach}</em> : null}</p>
            <p className="kl-preis-klein">{t.preisKlein}</p>
          </div>
          <ul className="kl-vorteile">
            <li><Haken />Technogym-Geräte mit Betreuung und Trainingsplan</li>
            <li><Haken />Kostenlose Parkplätze direkt am Studio</li>
            <li><Haken /><span><b>4,8 ★ bei Google</b> · über 250 Bewertungen</span></li>
          </ul>
          <BuchenKnopf quelle="hero" />
          <p className="kl-note">Kostenlos und unverbindlich. Du entscheidest erst danach.</p>
        </div>
      </section>

      {/* 2 · So läuft's */}
      <section className="kl-sek" aria-labelledby="kl-ablauf">
        <p className="kl-kicker">So läuft’s</p>
        <h2 id="kl-ablauf">In drei Schritten zum Start.</h2>
        <ol className="kl-schritte">
          <li><span>1</span><div><b>Termin wählen</b><p>Tag und Uhrzeit online aussuchen. Kostenlos.</p></div></li>
          <li><span>2</span><div><b>Probetraining</b><p>Rund 90 Minuten. Wir zeigen dir die Geräte und stellen dir einen Plan zusammen.</p></div></li>
          <li><span>3</span><div><b>In Ruhe entscheiden</b><p>{t.abschluss}</p></div></li>
        </ol>
      </section>

      {/* 3 · Was du bekommst + echte Fotos */}
      <section className="kl-sek kl-hell" aria-labelledby="kl-drin">
        <p className="kl-kicker">Was du bekommst</p>
        <h2 id="kl-drin">Alles drin, was du zum Trainieren brauchst.</h2>
        <ul className="kl-karten">
          <li><b>Technogym-Gerätetraining</b><p>Biostrength, Biocircuit, Kraft- und Cardiogeräte.</p></li>
          <li><b>Betreuung inklusive</b><p>Unser Team zeigt dir die Geräte und stellt dir deinen Plan zusammen.</p></li>
          <li><b>Fit-Inn App</b><p>Punkte für jeden Check-in, Prämien und kostenlose Ernährungspläne.</p></li>
          <li><b>Familiengeführt seit 1996</b><p>Kein Franchise. Wir kennen unsere Mitglieder.</p></li>
        </ul>
        <div className="kl-fotos" aria-label="Fotos aus dem Studio">
          <figure><img src="/media/klar/geraeteraum-800.webp" alt="Gerätebereich mit großen Fenstern" width={800} height={600} loading="lazy" /><figcaption>Gerätebereich</figcaption></figure>
          <figure><img src="/media/klar/cardio-800.webp" alt="Cardio-Bereich mit Fahrrädern und Crosstrainern" width={800} height={600} loading="lazy" /><figcaption>Cardio</figcaption></figure>
          <figure><img src="/media/klar/hero-zirkel-800.webp" alt="Zirkel-Bereich mit Technogym-Geräten" width={800} height={600} loading="lazy" /><figcaption>Zirkel</figcaption></figure>
        </div>
      </section>

      {/* 4 · Tarife kompakt (Black Week / Standard per Umschalter) */}
      <section className="kl-sek" aria-labelledby="kl-tarife" id="tarife">
        <p className="kl-kicker">Preise</p>
        <h2 id="kl-tarife">{t.tarifTitel}</h2>
        {t.tarifBanner ? <p className="kl-banner">{t.tarifBanner}</p> : null}
        <ul className="kl-tarife">
          {t.tarife.map((x) => (
            <li key={x.laufzeit} className={x.hervor ? 'hervor' : undefined}>
              {x.hervor ? <span className="kl-badge">{x.hervor}</span> : null}
              <b>{x.laufzeit}</b>
              <p className="kl-t-preis"><strong>{x.preis}</strong> {x.zusatz}</p>
              <p className="kl-t-gesamt">{x.gesamt}</p>
            </li>
          ))}
        </ul>
        <p className="kl-inklusive"><Haken />In jedem Tarif: Gerätetraining mit Betreuung, Fit-Inn App, Kündigungsfrist 4 Wochen.</p>
        <p className="kl-hinweis">{t.tarifHinweis}</p>
        <BuchenKnopf quelle="tarife" />
      </section>

      {/* 5 · Vertrauen (nur belegte Zahlen) */}
      <section className="kl-sek kl-dunkel" aria-labelledby="kl-vertrauen">
        <h2 id="kl-vertrauen" className="kl-sr">Warum Fit-Inn</h2>
        <ul className="kl-zahlen">
          <li><strong>4,8 ★</strong><span>bei Google, über 250 Bewertungen</span></li>
          <li><strong>1.200+</strong><span>Kundinnen und Kunden</span></li>
          <li><strong>seit 1996</strong><span>familiengeführt, kein Franchise</span></li>
        </ul>
      </section>

      {/* 6 · Öffnungszeiten + Anfahrt */}
      <section className="kl-sek kl-hell" aria-labelledby="kl-zeiten">
        <p className="kl-kicker">Öffnungszeiten &amp; Anfahrt</p>
        <h2 id="kl-zeiten">Wann du trainieren kannst.</h2>
        <div className="kl-zeiten-grid">
          <table className="kl-zeiten">
            <tbody>
              {OEFFNUNGSZEITEN.map(([tag, zeit]) => <tr key={tag}><th scope="row">{tag}</th><td>{zeit}</td></tr>)}
            </tbody>
          </table>
          <div className="kl-ort">
            <p><b>Fit-Inn Trier</b><br />Auf Hirtenberg 8 · 54296 Trier-Feyen</p>
            <p><Haken />Kostenlose Parkplätze direkt am Studio</p>
            <p className="kl-links"><a href={ROUTE} rel="noopener" target="_blank">Route planen</a> · <a href={footer.phoneHref}>{footer.phoneLabel}</a></p>
          </div>
        </div>
        <p className="kl-hinweis">Werktags Mittagspause von 13 bis 15 Uhr.</p>
      </section>

      {/* 7 · FAQ (nur Kauffragen) */}
      <section className="kl-sek" aria-labelledby="kl-faq">
        <p className="kl-kicker">Kurz beantwortet</p>
        <h2 id="kl-faq">Häufige Fragen</h2>
        <div className="kl-faq">
          <details open><summary>Was kostet das Probetraining?</summary><p>Nichts. Es ist kostenlos und unverbindlich.</p></details>
          <details><summary>Muss ich direkt einen Vertrag abschließen?</summary><p>{t.faqUnterschrift}</p></details>
          <details><summary>Was kostet die Mitgliedschaft insgesamt?</summary><p>{t.faqKosten}</p></details>
          <details><summary>Wie kündige ich?</summary><p>Mit 4 Wochen Frist zum Ende der Laufzeit, danach jederzeit mit 4 Wochen Frist.</p></details>
          <details><summary>Ab welchem Alter kann ich Mitglied werden?</summary><p>Neumitglieder ab 18 Jahren.</p></details>
        </div>
      </section>

      {/* 8 · Abschluss + Kleingedrucktes (einmal) */}
      <section className="kl-schluss" aria-labelledby="kl-schluss-h">
        <h2 id="kl-schluss-h">Probier es einfach aus.</h2>
        <p>Rund 90 Minuten, kostenlos und unverbindlich. Lieber anrufen? <a href={footer.phoneHref}>{footer.phoneLabel}</a></p>
        <BuchenKnopf quelle="schluss" />
      </section>
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
