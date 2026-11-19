// /klar – alles unter dem Kopf (Entwurf 19.11.2026, Auftrag Markus „alles unter dem header … schöner machen“).
// Drei Stilrichtungen mit denselben Inhalten/Fakten: A = hell und ruhig, B = Petrol-Flächen und große Fotos,
// C = Mix aus beiden (Auftrag Markus „Mix mal hell und dunkel“): hell → dunkel im Wechsel.
// Umschalten: KLAR_UNTEN in src/lib/klar.ts (lokal: Umgebungsvariable KLAR_UNTEN=a|b|c). Nur echte Studiofotos, alle lazy.
import { BuchenKnopf, KlarStapel } from './KlarClient';
import Icon, { type IconName } from './Icon';
import Karussell from './Karussell';
import { OEFFNUNGSZEITEN, klarKarussellScroll, klarStapel, type KlarInhalt, type KlarUnten } from '@/lib/klar';
import footer from '@/content/10-footer.json';
import type { ReactNode } from 'react';

const ROUTE = 'https://www.google.com/maps/dir/?api=1&destination=Fit-Inn+Trier,+Auf+Hirtenberg+8,+54296+Trier';

const VORTEILE: Array<{ icon: IconName; stark: string; text: string }> = [
  { icon: 'hantel', stark: 'Technogym-Geräte', text: 'mit Betreuung' },
  { icon: 'parken', stark: 'Kostenlose', text: 'Parkplätze am Studio' },
  { icon: 'stern', stark: '4,8 ★ bei Google', text: 'über 180 Bewertungen' },
];

const DRIN: Array<{ icon: IconName; titel: string; text: string }> = [
  { icon: 'betreuung', titel: 'Betreuung inklusive', text: 'Wir zeigen dir die Geräte und stellen deinen Plan zusammen.' },
  { icon: 'app', titel: 'Fit-Inn App', text: 'Punkte für jeden Check-in, Prämien, kostenlose Ernährungspläne.' },
  { icon: 'haus', titel: 'Familiengeführt seit 1996', text: 'Kein Franchise. Wir kennen unsere Mitglieder.' },
];

// Angebot & was uns abhebt (Entwurf 19.11.2026, Auftrag Markus „was wir an Angebot haben und was uns abhebt“).
// Nur, was sonst noch nirgends auf /klar steht (Karussell, Preisliste, Zahlen haben den Rest). Quellen: BEREIT.md „Angebot & was uns abhebt“.
const ANGEBOT: Array<{ icon: IconName; titel: string; text: string }> = [
  { icon: 'hantel', titel: 'Freihantelbereich', text: 'Freihanteln, Kraftstationen und Kabelzug.' },
  { icon: 'klima', titel: 'Klimatisiert', text: 'Angenehm trainieren, auch im Sommer.' },
  { icon: 'betreuung', titel: 'Personal Training', text: 'Auf Wunsch eins zu eins mit Trainer.' },
  { icon: 'koffer', titel: 'Firmenfitness', text: 'Epassi, Wellhub, EGYM Wellpass und Urban Sports Club.' },
];
// 19.11.2026 Markus: „eher Betreuung, familiengeführt seit 1996, angenehme Atmosphäre, individuelle Trainingspläne ohne Trainerpauschalen“.
const ANDERS: Array<{ icon: IconName; titel: string; text: string }> = [
  { icon: 'betreuung', titel: 'Echte Betreuung', text: 'Wir zeigen dir die Geräte und sind ansprechbar, wenn du Fragen hast.' },
  { icon: 'haken', titel: 'Individueller Trainingsplan', text: 'Auf dich abgestimmt und inklusive, ohne Trainerpauschale.' },
  { icon: 'haus', titel: 'Familiengeführt seit 1996', text: 'Kein Franchise. Wir kennen unsere Mitglieder.' },
  { icon: 'handschlag', titel: 'Angenehme Atmosphäre', text: 'Ruhig, persönlich und unter Erwachsenen (ab 18).' },
];

type Foto = { hoch: string; hochB: number; hochH: number; breit: string; breitB: number; breitH: number; alt: string };
const FOTO_GERAETE: Foto = { hoch: '/media/klar/geraeteraum-hoch.webp', hochB: 800, hochH: 1000, breit: '/media/klar/geraeteraum-breit-1600.webp', breitB: 1600, breitH: 933, alt: 'Gerätebereich mit Technogym-Geräten und großen Fenstern im Fit-Inn Trier-Feyen' };
const FOTO_CARDIO: Foto = { hoch: '/media/klar/cardio-hoch.webp', hochB: 640, hochH: 800, breit: '/media/klar/cardio-breit-1280.webp', breitB: 1280, breitH: 746, alt: 'Cardio-Bereich mit Fahrrädern und Crosstrainern' };
const FOTO_FENSTER: Foto = { hoch: '/media/klar/geraeteraum-fenster-hoch.webp', hochB: 720, hochH: 812, breit: '/media/klar/geraeteraum-breit-1000.webp', breitB: 1000, breitH: 583, alt: '' };

function Bild({ f, className, deko = false }: { f: Foto; className?: string; deko?: boolean }) {
  return (
    <picture className={className}>
      <source media="(min-width: 900px)" srcSet={f.breit} width={f.breitB} height={f.breitH} />
      <img src={f.hoch} width={f.hochB} height={f.hochH} alt={deko ? '' : f.alt} loading="lazy" decoding="async" />
    </picture>
  );
}

function Vorteile() {
  return (
    <ul className="ku-vorteile" aria-label="Das Wichtigste in Kürze">
      {VORTEILE.map((v) => (
        <li key={v.icon}><span className="ku-vk"><Icon name={v.icon} /></span><b>{v.stark}</b><span>{v.text}</span></li>
      ))}
    </ul>
  );
}

function Schritte({ t }: { t: KlarInhalt }) {
  const s: Array<{ icon: IconName; titel: string; text: string }> = [
    { icon: 'kalender', titel: 'Termin wählen', text: 'Tag und Uhrzeit online aussuchen. Kostenlos.' },
    { icon: 'hantel', titel: 'Probetraining', text: 'Rund 90 Minuten. Wir zeigen dir die Geräte und stellen dir einen Plan zusammen.' },
    { icon: 'handschlag', titel: 'In Ruhe entscheiden', text: t.abschluss },
  ];
  return (
    <section className="ku-sek ku-ablauf" aria-labelledby="ku-ablauf-h">
      <div className="ku-in">
        <h2 id="ku-ablauf-h">So einfach geht’s.</h2>
        <ol className="ku-zeit">
          {s.map((x, i) => (
            <li key={x.titel}>
              <span className="ku-punkt"><Icon name={x.icon} /></span>
              <div><p className="ku-schritt">Schritt {i + 1}</p><b>{x.titel}</b><p>{x.text}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// Erste Zeile „Technogym-Gerätetraining“ ist seit 19.11.2026 das wischbare Karussell (Karussell.tsx) direkt unter der Überschrift.
// kopf = Überschrift im Karussell (Variante C): bleibt im Scroll-Modus (KLAR_KARUSSELL_SCROLL) mit den Karten stehen.
function DrinListe({ kopf }: { kopf?: ReactNode }) {
  return (
    <>
      <Karussell kopf={kopf} scroll={klarKarussellScroll()} />
      <ul className="ku-drin">
        {DRIN.map((d) => (
          <li key={d.titel}><span className="ku-dk"><Icon name={d.icon} /></span><div><b>{d.titel}</b><p>{d.text}</p></div></li>
        ))}
      </ul>
    </>
  );
}

// Klassische Preisliste (Entwurf 19.11.2026, Auftrag Markus „Preisliste mit Bullet Points, was enthalten ist“):
// je Tarif eine Karte (Desktop nebeneinander, mobil untereinander – kein zweites Wischen neben dem Karussell),
// in der Karte nur die Unterschiede; was alle Tarife gemeinsam haben, steht einmal darunter.
function Tarife({ t }: { t: KlarInhalt }) {
  return (
    <section className="ku-sek ku-preise" aria-labelledby="ku-tarife-h" id="tarife">
      <div className="ku-in">
        <h2 id="ku-tarife-h">{t.tarifTitel}</h2>
        {t.tarifBanner ? <p className="ku-banner"><Icon name="kalender" size={20} />{t.tarifBanner}</p> : null}
        <ul className={`ku-pl ku-pl-${t.tarife.length}`}>
          {t.tarife.map((x) => (
            <li key={x.laufzeit} className={x.hervor ? 'ku-pl-karte hervor' : 'ku-pl-karte'}>
              {x.hervor ? <span className="ku-badge">{x.hervor}</span> : null}
              <h3 className="ku-pl-lauf">{x.laufzeit}</h3>
              <p className="ku-pl-preis"><strong>{x.preis}</strong><span>{x.zusatz}</span></p>
              <p className="ku-pl-gesamt">{x.gesamt}</p>
              <ul className="ku-pl-punkte">
                {x.punkte.map((pkt) => <li key={pkt}><Icon name="haken" size={18} />{pkt}</li>)}
                {x.extra ? <li className="ku-pl-extra"><Icon name="stern" size={18} />{x.extra}</li> : null}
              </ul>
              <BuchenKnopf quelle="tarife" label="Probetraining buchen" klein />
            </li>
          ))}
        </ul>
        <div className="ku-inkl">
          <p>In jedem Tarif enthalten</p>
          <ul>
            {t.inklusive.map((i) => <li key={i}><Icon name="haken" size={18} />{i}</li>)}
          </ul>
        </div>
        <p className="ku-hinweis">{t.tarifHinweis}</p>
      </div>
    </section>
  );
}

function Zahlen() {
  return (
    <ul className="ku-zahlen">
      <li><strong>4,8 ★</strong><span>bei Google, über 180 Bewertungen</span></li>
      <li><strong>1.200+</strong><span>Kundinnen und Kunden</span></li>
      <li><strong>seit 1996</strong><span>familiengeführt, kein Franchise</span></li>
    </ul>
  );
}

function Abhebt() {
  const gruppe = (id: string, kopf: string, liste: typeof ANGEBOT) => (
    <div className="ku-ab-gruppe" role="group" aria-labelledby={id}>
      <h3 id={id} className="ku-ab-kopf">{kopf}</h3>
      <ul className="ku-ab-liste">
        {liste.map((x) => (
          <li key={x.titel}><span className="ku-ab-ic"><Icon name={x.icon} size={20} /></span><div><b>{x.titel}</b><span>{x.text}</span></div></li>
        ))}
      </ul>
    </div>
  );
  return (
    <section className="ku-sek ku-abhebt" aria-label="Angebot und was uns abhebt">
      <div className="ku-in ku-ab-raster">
        {gruppe('ku-ab-1', 'Das bekommst du außerdem', ANGEBOT)}
        {gruppe('ku-ab-2', 'Das macht uns anders', ANDERS)}
      </div>
    </section>
  );
}

function Info() {
  return (
    <section className="ku-sek ku-info" aria-labelledby="ku-info-h">
      <div className="ku-in">
        <h2 id="ku-info-h">Öffnungszeiten &amp; Anfahrt</h2>
        <div className="ku-kacheln">
          <div className="ku-kachel">
            <p className="ku-k-kopf"><span className="ku-k-ic"><Icon name="uhr" /></span>Öffnungszeiten</p>
            <dl className="ku-zeiten">
              {OEFFNUNGSZEITEN.map(([tag, zeit]) => (
                <div key={tag}><dt>{tag}</dt><dd>{zeit.split(' und ').map((z) => <span key={z}>{z}</span>)}</dd></div>
              ))}
            </dl>
            <p className="ku-k-note">Werktags Mittagspause von 13 bis 15 Uhr.</p>
          </div>
          <div className="ku-kachel">
            <p className="ku-k-kopf"><span className="ku-k-ic"><Icon name="ort" /></span>Anfahrt</p>
            <address className="ku-adresse">Fit-Inn Trier<br />Auf Hirtenberg 8<br />54296 Trier-Feyen</address>
            <p className="ku-parken"><Icon name="parken" size={22} />Kostenlose Parkplätze direkt am Studio</p>
            <div className="ku-k-knoepfe">
              <a className="ku-link-btn" href={ROUTE} rel="noopener" target="_blank"><Icon name="route" size={18} />Route planen</a>
              <a className="ku-link-btn" href={footer.phoneHref}><Icon name="telefon" size={18} />{footer.phoneLabel}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Fragen({ t }: { t: KlarInhalt }) {
  const f: Array<[string, string]> = [
    ['Was kostet das Probetraining?', 'Nichts. Es ist kostenlos und unverbindlich.'],
    ['Muss ich direkt einen Vertrag abschließen?', t.faqUnterschrift],
    ['Was kostet die Mitgliedschaft insgesamt?', t.faqKosten],
    ['Wie kündige ich?', 'Mit 4 Wochen Frist zum Ende der Laufzeit, danach jederzeit mit 4 Wochen Frist.'],
    ['Ab welchem Alter kann ich Mitglied werden?', 'Neumitglieder ab 18 Jahren.'],
  ];
  return (
    <section className="ku-sek ku-faq" aria-labelledby="ku-faq-h">
      <div className="ku-in ku-schmal">
        <h2 id="ku-faq-h">Häufige Fragen</h2>
        <div className="ku-akk">
          {f.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
        </div>
      </div>
    </section>
  );
}

// Klasse kl-schluss bleibt: daran blendet KlarSticky die feste Leiste aus.
function Schluss({ foto }: { foto?: Foto }) {
  return (
    <section className="kl-schluss ku-schluss" aria-labelledby="kl-schluss-h">
      {foto ? <Bild f={foto} className="ku-schluss-foto" deko /> : null}
      <div className="ku-schluss-in">
        <h2 id="kl-schluss-h">Probier es einfach aus.</h2>
        <p>Rund 90 Minuten, kostenlos und unverbindlich.</p>
        <BuchenKnopf quelle="schluss" />
        <p className="ku-anruf">Lieber anrufen? <a href={footer.phoneHref}>{footer.phoneLabel}</a></p>
      </div>
    </section>
  );
}

// A · hell und ruhig: viel Weiß, große Fotos mit runden Ecken, Kacheln und Linien statt Kästen.
function UntenA({ t }: { t: KlarInhalt }) {
  return (
    <div className="ku ku-a">
      <Vorteile />
      <Schritte t={t} />
      <section className="ku-sek ku-was" aria-labelledby="ku-drin-h">
        <div className="ku-in ku-split">
          <Bild f={FOTO_GERAETE} className="ku-foto-rund" />
          <div>
            <h2 id="ku-drin-h">Alles drin, was du brauchst.</h2>
            <DrinListe />
          </div>
        </div>
      </section>
      <Tarife t={t} />
      <section className="ku-sek ku-vertrauen" aria-labelledby="ku-vertrauen-h">
        <div className="ku-in">
          <h2 id="ku-vertrauen-h" className="kl-sr">Warum Fit-Inn</h2>
          <Zahlen />
          <Bild f={FOTO_CARDIO} className="ku-foto-rund ku-foto-cardio" />
        </div>
      </section>
      <Info />
      <Fragen t={t} />
      <Schluss />
    </div>
  );
}

// B · Petrol-Flächen und große Fotos: der dunkle Kopf läuft weiter, Fotos randlos, helle Fläche nur für die Preise.
function UntenB({ t }: { t: KlarInhalt }) {
  return (
    <div className="ku ku-b">
      <Vorteile />
      <Schritte t={t} />
      <section className="ku-was" aria-labelledby="ku-drin-h">
        <Bild f={FOTO_GERAETE} className="ku-foto-voll" />
        <div className="ku-sek ku-was-text">
          <div className="ku-in">
            <h2 id="ku-drin-h">Alles drin, was du brauchst.</h2>
            <DrinListe />
          </div>
        </div>
      </section>
      <Tarife t={t} />
      <section className="ku-vertrauen" aria-labelledby="ku-vertrauen-h">
        <Bild f={FOTO_CARDIO} className="ku-foto-voll" deko />
        <div className="ku-vertrauen-in">
          <h2 id="ku-vertrauen-h" className="kl-sr">Warum Fit-Inn</h2>
          <Zahlen />
        </div>
      </section>
      <Info />
      <Fragen t={t} />
      <Schluss foto={FOTO_FENSTER} />
    </div>
  );
}

// C · Mix: helle Abschnitte bekommen die Stile aus A, dunkle die aus B (Hüllen .ku-a/.ku-b).
// Rhythmus: hell (Vorteile + Ablauf) → dunkel (Foto + was drin ist) → hell (Preise) → dunkel (Zahlen auf Foto)
// → hell (Öffnungszeiten, FAQ) → dunkel (Abschluss mit Foto). Jeder Wechsel legt sich mit runden Ecken über den vorigen.
// Stapel-Animation (KLAR_STAPEL): Hüllen kleben oben fest, die nächste schiebt sich darüber. Info + FAQ (ku-stapel-frei)
// klebt nicht, weil das Akkordeon beim Aufklappen wächst – sie läuft normal, schiebt sich aber selbst noch über die Zahlen.
function UntenC({ t }: { t: KlarInhalt }) {
  const stapel = klarStapel();
  return (
    <div className={stapel ? 'ku ku-c ku-stapel' : 'ku ku-c'}>
      {stapel ? <KlarStapel /> : null}
      <div className="ku-a ku-c-hell">
        <Vorteile />
        <Schritte t={t} />
      </div>
      <div className="ku-b ku-c-dunkel">
        <section className="ku-was" aria-labelledby="ku-drin-h">
          <Bild f={FOTO_GERAETE} className="ku-foto-voll" />
          <div className="ku-sek ku-was-text">
            <div className="ku-in">
              <DrinListe kopf={<h2 id="ku-drin-h">Alles drin, was du brauchst.</h2>} />
            </div>
          </div>
        </section>
      </div>
      <div className="ku-a ku-c-hell">
        <Tarife t={t} />
      </div>
      <div className="ku-b ku-c-dunkel">
        <section className="ku-vertrauen" aria-labelledby="ku-vertrauen-h">
          <Bild f={FOTO_CARDIO} className="ku-foto-voll" deko />
          <div className="ku-vertrauen-in">
            <h2 id="ku-vertrauen-h" className="kl-sr">Warum Fit-Inn</h2>
            <Zahlen />
          </div>
        </section>
        <Abhebt />
      </div>
      <div className="ku-a ku-c-hell ku-stapel-frei">
        <Info />
        <Fragen t={t} />
      </div>
      <div className="ku-b ku-c-dunkel">
        <Schluss foto={FOTO_FENSTER} />
      </div>
    </div>
  );
}

export default function Unten({ v, t }: { v: KlarUnten; t: KlarInhalt }) {
  if (v === 'c') return <UntenC t={t} />;
  return v === 'b' ? <UntenB t={t} /> : <UntenA t={t} />;
}
