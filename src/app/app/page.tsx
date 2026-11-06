import type { Metadata } from 'next';
import Link from 'next/link';
import { fitInnApp, technogymApp } from '@/lib/start-config';
import extra from './app.module.css';
import AppShell, { Phone, Stores, stepMeta } from './AppSteps';

// /app – Sammelseite für beide Apps (Fit-Inn-App + Technogym-App), Ziel für Mail, WLAN-Erfolgsseite, Aushang.
// Gleicher Look C und gleiche Bausteine wie /app/fitinn (AppSteps.tsx). Gerät wird serverseitig per User-Agent erkannt
// (Store-Knopf hervorgehoben, beide bleiben sichtbar). Kein Cookie, nicht im Index. Klicks zählen anonym (/api/f).
// Inhalt nur aus Rundmail/App-News (outbox/rundmail-app-update): keine Preise/Tarife.
export const dynamic = 'force-dynamic';
export const metadata: Metadata = stepMeta('Unsere Apps – Fit-Inn Trier', 'Fit-Inn-App und Technogym-App kostenlos laden: Mitgliedschaft, Punkte und Prämien in der Fit-Inn-App, Training in der Technogym-App.', '/app');
export { viewport } from './AppSteps';

const FITINN_POINTS = [
  'Mitgliedschaft verwalten und pausieren',
  'Punkte sammeln und Prämien einlösen',
  'Ernährungspläne kostenlos',
  'Freunde werben: 50 Punkte oder 4 Wochen beitragsfrei',
  'Check-in, Termine und Auslastung',
];
const TECHNOGYM_POINTS = ['Dein Trainingsplan', 'Dein Training', 'Anmeldung an den Geräten'];

const SHOTS = [
  { src: '/media/app/iphone-1.webp', alt: 'Startbildschirm der Fit-Inn-App mit Einloggen und Registrieren', cap: 'Registrieren oder einloggen' },
  { src: '/media/app/iphone-3.webp', alt: 'Startseite der Fit-Inn-App mit Einchecken, Ernährungsplan und Stoffwechselcoaching', cap: 'Einchecken und Ernährungsplan' },
  { src: '/media/app/iphone-2.webp', alt: 'Punkte-Seite der Fit-Inn-App mit Prämien und Willkommensgutschein', cap: 'Punkte und Prämien' },
];

const FITINN_STEPS = [
  { title: 'Alte Fit-Inn-App löschen', text: 'Die neue App ist komplett neu, ein Update ersetzt die alte nicht. iPhone: App gedrückt halten → „App entfernen“ → „App löschen“. Android: App gedrückt halten → „Deinstallieren“.' },
  { title: 'Neue Fit-Inn-App laden', text: <>Kostenlos über die Knöpfe oben bei der <a href="#fitinn">Fit-Inn App</a>.</> },
  { title: 'Mit der Vertrags-E-Mail registrieren', text: <>Nimm die E-Mail-Adresse, die du bei deinem Vertragsabschluss angegeben hast. Klappt das nicht? Schreib an <a href="mailto:info@fit-inn-trier.de">info@fit-inn-trier.de</a>.</> },
  { title: 'Willkommensgutschein einlösen', text: 'Löse in der App deinen Willkommensgutschein über 5 Extra-Punkte ein.' },
];
const TECHNOGYM_STEPS = [
  { title: 'Technogym-App laden', text: <>Kostenlos über die Knöpfe oben bei der <a href="#technogym">Technogym App</a>. Der Link verbindet die App gleich mit dem Fit-Inn.</> },
];

function Steps({ items }: { items: { title: string; text: React.ReactNode }[] }) {
  return (
    <ol className={extra.line}>
      {items.map((s, i) => (
        <li key={s.title} className={extra.st}>
          <span className={`${extra.stNum} ${i === 1 ? extra.stGold : ''}`}>{i + 1}</span>
          <div className={extra.stBody}><h3>{s.title}</h3><p>{s.text}</p></div>
        </li>
      ))}
    </ol>
  );
}

export default function Page() {
  return (
    <AppShell
      badge="Zwei Apps, kostenlos"
      title={<>Unsere <em>Apps</em></>}
      lead="Die Fit-Inn App für Mitgliedschaft, Punkte und Prämien. Die Technogym App für dein Training. Jede mit eigener Aufgabe."
      hero={<div className={extra.heroPhone}><Phone src="/media/app/iphone-3.webp" alt="Startseite der neuen Fit-Inn-App" cut /></div>}
      heroActions={
        <div className={extra.jump}>
          <a href="#fitinn">Fit-Inn App</a>
          <a href="#technogym">Technogym App</a>
        </div>
      }
      after={
        <section className={extra.sec} aria-labelledby="faq">
          <div className={extra.secKick}>Fragen</div>
          <h2 className={extra.h2} id="faq">Kurz beantwortet</h2>
          <div className={extra.faq}>
            <details>
              <summary>Die Registrierung klappt nicht – was jetzt?</summary>
              <p>Schreib uns kurz an <a href="mailto:info@fit-inn-trier.de">info@fit-inn-trier.de</a>. Gerade wenn du schon sehr lange bei uns trainierst, müssen wir für dich eventuell noch etwas einrichten – wir melden uns dann schnell bei dir. Du kannst uns auch einfach im Studio ansprechen.</p>
            </details>
            <details>
              <summary>Kosten die Apps etwas?</summary>
              <p>Nein, du kannst beide kostenlos im Store laden.</p>
            </details>
            <details>
              <summary>Brauche ich beide Apps?</summary>
              <p>Für dein Training bleibt alles wie gewohnt in der Technogym App. Für Punkte, Prämien, Check-in und deine Mitgliedschaft nutzt du die Fit-Inn App.</p>
            </details>
            <details>
              <summary>Reicht ein normales Update der alten Fit-Inn-App?</summary>
              <p>Nein. Die App ist komplett neu gebaut. Bitte lösche die alte App einmal und lade die neue.</p>
            </details>
          </div>
        </section>
      }
    >
      <section className={extra.sec}>
        <div className={extra.callout}>
          <span className={extra.dot} aria-hidden="true">!</span>
          <p><b>Alte Fit-Inn-App noch auf dem Handy?</b> Bitte einmal löschen und die neue Fit-Inn-App laden. Die neue App ist komplett neu – ein normales Update ersetzt die alte nicht.</p>
        </div>
      </section>

      <section className={extra.sec} aria-labelledby="apps">
        <div className={extra.secKick}>Deine zwei Apps</div>
        <h2 className={extra.h2} id="apps">Laden, was du brauchst</h2>
        <div className={extra.appCards}>
          {fitInnApp ? (
            <article className={extra.appCard} id="fitinn" aria-labelledby="t-fitinn">
              <span className={`${extra.tag} ${extra.tagGold}`}>Neu für alle Mitglieder</span>
              <h3 className={extra.appTitle} id="t-fitinn">Fit-Inn App</h3>
              <p className={extra.vp}>Dein Studio in deiner Tasche: Punkte sammeln, Prämien holen, einchecken und deine Mitgliedschaft selbst verwalten.</p>
              <ul className={extra.col}>{FITINN_POINTS.map((p) => <li key={p}>{p}</li>)}</ul>
              <Stores app={fitInnApp} id="fitinn" light />
              <Link className={extra.colLink} href="/app/fitinn">Ausführliche Anleitung →</Link>
            </article>
          ) : null}
          <article className={extra.appCard} id="technogym" aria-labelledby="t-technogym">
            <span className={extra.tag}>Für dein Training</span>
            <h3 className={extra.appTitle} id="t-technogym">Technogym App</h3>
            <p className={extra.vp}>Trainingsplan, Training und Anmeldung an den Geräten – direkt mit dem Fit-Inn verbunden.</p>
            <ul className={extra.col}>{TECHNOGYM_POINTS.map((p) => <li key={p}>{p}</li>)}</ul>
            <Stores app={technogymApp} id="technogym" light />
            <Link className={extra.colLink} href="/app/technogym">Ausführliche Anleitung →</Link>
          </article>
        </div>
      </section>

      <section className={extra.sec} aria-labelledby="warum">
        <div className={extra.secKick}>Warum zwei Apps?</div>
        <h2 className={extra.h2} id="warum">Jede macht, was sie am besten kann</h2>
        <div className={extra.why}>
          <div className={extra.card}>
            <p className={extra.vp}>Die Technogym App gehört zu den Geräten im Studio: Dort findest du weiterhin deinen Trainingsplan, dein Training und die Anmeldung an den Geräten. Alles rund um deine Mitgliedschaft liegt in der neuen Fit-Inn App, die wir nach euren Rückmeldungen von Grund auf neu gebaut haben.</p>
            <p className={extra.hand}>Für dein Training bleibt alles wie gewohnt.</p>
          </div>
          <div className={extra.callout}>
            <span className={extra.dot} aria-hidden="true">i</span>
            <p>Punkte sammeln, Prämien einlösen, Freunde werben: <b>nur in der Fit-Inn App.</b> Training und Geräte: <b>nur in der Technogym App.</b></p>
          </div>
        </div>
      </section>

      <section className={extra.sec} aria-labelledby="blick">
        <div className={extra.secKick}>Ein Blick hinein</div>
        <h2 className={extra.h2} id="blick">So sieht die Fit-Inn App aus</h2>
        <div className={extra.shots} role="list">
          {SHOTS.map((s) => (
            <figure key={s.src} className={extra.shot} role="listitem" style={{ margin: 0 }}>
              <Phone src={s.src} alt={s.alt} cut />
              <figcaption className={extra.shotCap}>{s.cap}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className={extra.sec} aria-labelledby="so">
        <div className={extra.secKick}>Schnellstart</div>
        <h2 className={extra.h2} id="so">So startest du</h2>
        <h3 className={extra.subH}>Fit-Inn App in 4 Schritten</h3>
        <Steps items={FITINN_STEPS} />
        <h3 className={extra.subH}>Technogym App in 1 Schritt</h3>
        <Steps items={TECHNOGYM_STEPS} />
        <p className={extra.p}>Mehr Details, Screens und Fragen findest du in der <Link className={extra.inlineLink} href="/app/fitinn">ausführlichen Fit-Inn-Anleitung</Link> und der <Link className={extra.inlineLink} href="/app/technogym">Technogym-Anleitung</Link>.</p>
      </section>
    </AppShell>
  );
}
