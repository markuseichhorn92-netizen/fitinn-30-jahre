import Link from 'next/link';
import { fitInnApp } from '@/lib/start-config';
import extra from '../app.module.css';
import AppShell, { Phone, stepMeta, type Step } from '../AppSteps';

// Ziel des großen QR-Codes auf dem A4-Aufsteller. URL darf sich nicht ändern (Aufsteller ist gedruckt).
// Inhalt nur aus Rundmail/App-News (outbox/rundmail-app-update): keine Preise/Tarife, keine neuen Versprechen.
export const dynamic = 'force-dynamic';
export const metadata = stepMeta('Neue Fit-Inn-App in wenigen Schritten – Fit-Inn Trier', 'Die neue Fit-Inn-App: warum neu, was sie kann und wie du startest – alte App löschen, neue laden, registrieren, Willkommenspunkte einlösen.', '/app/fitinn');
export { viewport } from '../AppSteps';

const STEPS: Step[] = [
  { title: 'Alte Fit-Inn-App löschen', text: 'iPhone: App gedrückt halten → „App entfernen“ → „App löschen“. Android: App gedrückt halten → „Deinstallieren“. Die neue App ist komplett neu, ein Update ersetzt die alte nicht.' },
  { title: 'Neue Fit-Inn-App laden', text: 'Kostenlos, direkt im Store:' },
  { title: 'Öffnen und registrieren', text: <>Registriere dich mit der E-Mail-Adresse, die du bei deinem Vertragsabschluss angegeben hast. Klappt das nicht? Schreib uns an <a href="mailto:info@fit-inn-trier.de">info@fit-inn-trier.de</a> – bei sehr langjährigen Mitgliedern richten wir noch etwas für dich ein.</> },
  { title: 'Willkommensgutschein einlösen', text: 'Löse in der App deinen Willkommensgutschein über 5 Extra-Punkte ein.' },
  { title: 'Punkte sammeln', text: 'Für jeden Check-in im Studio bekommst du 1 Punkt (einmal pro Tag). Dein Punktekonto siehst du in der App.' },
  { title: 'Training bleibt in der Technogym-App', text: <>Trainingsplan, Training und Anmeldung an den Geräten findest du weiterhin dort: <Link href="/app/technogym">Technogym-App laden</Link>.</> },
];

const SHOTS = [
  { src: '/media/app/iphone-1.webp', alt: 'Startbildschirm der Fit-Inn-App mit Einloggen und Registrieren', cap: 'Registrieren oder einloggen' },
  { src: '/media/app/iphone-3.webp', alt: 'Startseite der Fit-Inn-App mit Einchecken, Ernährungsplan und Stoffwechselcoaching', cap: 'Einchecken und Ernährungsplan' },
  { src: '/media/app/iphone-2.webp', alt: 'Punkte-Seite der Fit-Inn-App mit Prämien und Willkommensgutschein', cap: 'Punkte und Prämien' },
];

const MORE = ['Check-in und Check-out', 'Termine buchen', 'Auslastung im Studio sehen', 'Mitgliedschaft verwalten', 'Mitgliedschaft pausieren', 'Adresse oder Bankverbindung ändern', 'Exklusive Deals für App-Nutzer', 'Zeitlich begrenzte Aktionen'];

export default function Page() {
  return (
    <AppShell
      app={fitInnApp!}
      id="fitinn"
      badge="Neu für alle Mitglieder"
      title={<>Die neue <em>Fit-Inn</em> App</>}
      lead="Dein Studio in deiner Tasche: Punkte sammeln, Prämien holen, einchecken und deine Mitgliedschaft selbst verwalten – kostenlos."
      hero={<div className={extra.heroPhone}><Phone src="/media/app/iphone-3.webp" alt="Startseite der neuen Fit-Inn-App" cut /></div>}
      steps={STEPS}
      stepsKick="So geht’s"
      stepsTitle="In 6 Schritten startklar"
      buttonStep={1}
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
              <summary>Kostet die App etwas?</summary>
              <p>Nein, du kannst sie kostenlos im Store laden.</p>
            </details>
            <details>
              <summary>Reicht ein normales Update der alten App?</summary>
              <p>Nein. Die App ist komplett neu gebaut. Bitte lösche die alte App einmal und lade die neue über die Knöpfe oben.</p>
            </details>
          </div>
        </section>
      }
    >
      <section className={extra.sec} aria-labelledby="warum">
        <div className={extra.secKick}>Warum eine neue App?</div>
        <h2 className={extra.h2} id="warum">Ihr habt uns Feedback gegeben. Wir haben zugehört.</h2>
        <div className={extra.why}>
          <div className={extra.card}>
            <p className={extra.vp}>Viele von euch haben uns in den letzten Monaten Rückmeldungen zur App geschickt. Wir haben jede ernst genommen und die App daraufhin von Grund auf neu programmiert.</p>
            <p className={extra.hand}>Danke dafür!</p>
          </div>
          <div className={extra.callout}>
            <span className={extra.dot} aria-hidden="true">!</span>
            <p><b>Alte App bitte löschen.</b> Weil die App komplett neu ist, reicht ein normales Update nicht. Einmal löschen, neue laden – siehe Schritte unten.</p>
          </div>
        </div>
      </section>

      <section className={extra.sec} aria-labelledby="wofuer">
        <div className={extra.secKick}>Wofür ist sie gut?</div>
        <h2 className={extra.h2} id="wofuer">Training, das sich auszahlt</h2>
        <p className={extra.p}>Wie bei Payback: Du sammelst Punkte, nur eben fürs Trainieren, und tauschst sie später gegen Prämien. Wer regelmäßig trainiert, wird doppelt belohnt – mit besseren Ergebnissen und mit Prämien.</p>
        <div className={extra.grid}>
          <div className={extra.vcard}>
            <div className={extra.big}>1<small>Punkt pro Check-in</small></div>
            <h3 className={extra.vt}>Punkte sammeln</h3>
            <p className={extra.vp}>Für jeden Check-in im Studio gibt es 1 Punkt (einmal pro Tag). In Aktionszeiträumen auch mal mehr. Dein Punktekonto siehst du jederzeit in der App.</p>
          </div>
          <div className={extra.vcard}>
            <div className={extra.big}>5<small>Extra-Punkte</small></div>
            <h3 className={extra.vt}>Willkommensgutschein</h3>
            <p className={extra.vp}>Zum Start schenken wir dir 5 Punkte. Löse den Gutschein einfach in der App ein – dein Konto ist vom ersten Tag an gefüllt.</p>
          </div>
          <div className={extra.vcard}>
            <h3 className={extra.vt}>Prämien einlösen</h3>
            <p className={extra.vp}>Tausche deine Punkte direkt in der App, zum Beispiel gegen einen Polar-Brustgurt, einen Gratismonat oder ein Stoffwechselcoaching. Bei unseren Partnern Smilodox und Neosupps gibt es Wertgutscheine.</p>
          </div>
          <div className={extra.vcard}>
            <span className={`${extra.tag} ${extra.tagGold}`}>Neu</span>
            <div className={extra.big}>50<small>Punkte oder 4 Wochen beitragsfrei</small></div>
            <h3 className={extra.vt}>Freunde werben</h3>
            <p className={extra.vp}>Training macht zusammen mehr Spaß. Begeisterst du jemanden fürs Fit-Inn und die Person wird Mitglied, bekommst du als Dankeschön wahlweise 50 Punkte oder 4 Wochen beitragsfrei.</p>
          </div>
          <div className={extra.vcard}>
            <span className={extra.tag}>Kostenlos</span>
            <h3 className={extra.vt}>Ernährungspläne</h3>
            <p className={extra.vp}>Unsere Ernährungspläne stehen allen Mitgliedern ab sofort kostenlos in der App bereit. Das Stoffwechselcoaching gibt es weiterhin als Zusatzangebot.</p>
          </div>
          <div className={extra.vcard}>
            <h3 className={extra.vt}>Alles zur Mitgliedschaft</h3>
            <p className={extra.vp}>Mitgliedschaft verwalten, pausieren, Adresse oder Bankverbindung ändern – alles direkt in der App.</p>
          </div>
        </div>
        <div className={extra.dark}>
          <h3 className={extra.vt}>Und noch mehr in deiner Tasche</h3>
          <p className={extra.vp}>Auslastung sehen, damit du weißt, wann es ruhig ist. Termine buchen. Dein Punktestand, deine Prämien und alle Deals auf einen Blick.</p>
          <ul className={extra.chips}>{MORE.map((m) => <li key={m}>{m}</li>)}</ul>
        </div>
      </section>

      <section className={extra.sec} aria-labelledby="blick">
        <div className={extra.secKick}>Ein Blick hinein</div>
        <h2 className={extra.h2} id="blick">So sieht die App aus</h2>
        <div className={extra.shots} role="list">
          {SHOTS.map((s) => (
            <figure key={s.src} className={extra.shot} role="listitem" style={{ margin: 0 }}>
              <Phone src={s.src} alt={s.alt} cut />
              <figcaption className={extra.shotCap}>{s.cap}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className={extra.sec} aria-labelledby="zwei">
        <div className={extra.secKick}>Zwei Apps, zwei Aufgaben</div>
        <h2 className={extra.h2} id="zwei">Was steckt wo?</h2>
        <div className={extra.two}>
          <div className={extra.col}>
            <span className={`${extra.tag} ${extra.tagGold}`}>Diese Seite</span>
            <h3>Fit-Inn App</h3>
            <ul>
              <li>Punkte und Prämien</li>
              <li>Check-in und Check-out</li>
              <li>Mitgliedschaft verwalten</li>
              <li>Termine und Auslastung</li>
              <li>Ernährungspläne</li>
            </ul>
          </div>
          <div className={extra.col}>
            <span className={extra.tag}>Bleibt wie gewohnt</span>
            <h3>Technogym App</h3>
            <ul>
              <li>Trainingsplan</li>
              <li>Dein Training</li>
              <li>Anmeldung an den Geräten</li>
            </ul>
            <Link className={extra.colLink} href="/app/technogym">Technogym-App laden →</Link>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
