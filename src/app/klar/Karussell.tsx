'use client';
// /klar – wischbare Karten Biostrength, Biocircuit, Stoffwechsel-Coaching (Entwurf 19.11.2026, Auftrag Markus
// „horizontales scrollen … für die Erklärung der Biostrength, biocircuit sowie Stoffwechselcoaching“).
// Texte nur aus den Sanity-Seiten /biostrength-fit-inn-trier, /biocircuit, /stoffwechsel-coaching (fit-inn-trier.de).
// Fotos: echte Studiofotos aus Sanity. Coaching-Foto von Markus (19.11.). Keine Preise.
// Mobil: CSS scroll-snap, nächste Karte ragt ins Bild, Punkte; ab 640 px Pfeile; ab 1024 px alle drei nebeneinander.
// Ohne JS bleibt das Band wischbar (Punkte/Pfeile sind dann nur Zierde).
// Scroll-Modus (KLAR_KARUSSELL_SCROLL, Auftrag Markus 19.11. „wenn man scrollt das das Karussell zuerst durch scrollt“):
// nur < 1024 px, mit JS und ohne „Bewegung reduzieren“. Der Bereich (Überschrift + Karten + Punkte) klebt per sticky,
// darunter liegt eine Laufstrecke (unten.css), und der senkrechte Scroll-Fortschritt schiebt die Karten per translateX
// durch (ein rAF pro Bild, nur transform). Wischen ist dann aus (touch-action pan-y), Punkte/Pfeile/Pfeiltasten
// scrollen die Seite an die passende Stelle. Erst nach der letzten Karte geht die Seite weiter.
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import Icon from './Icon';

type Karte = { id: string; titel: string; unter: string; punkte: string[]; link: string; foto?: { src: string; alt: string }; zusatz?: string };

const KARTEN: Karte[] = [
  {
    id: 'biostrength',
    titel: 'Biostrength',
    unter: 'Krafttraining, das sich auf dich einstellt.',
    punkte: [
      'Sitz und Bewegungslinie passen sich automatisch an dich an.',
      'Ein kurzer Krafttest ermittelt dein Trainingsgewicht.',
      'Der Bildschirm zeigt dir Bewegungslinie und Tempo in Echtzeit.',
    ],
    link: 'https://fit-inn-trier.de/biostrength-fit-inn-trier',
    foto: { src: '/media/klar/karte-biostrength.webp', alt: 'Technogym-Biostrength-Geräte im Fit-Inn Trier' },
  },
  {
    id: 'biocircuit',
    titel: 'Biocircuit',
    unter: 'Geführter Zirkel für den ganzen Körper.',
    punkte: [
      'Ganzkörpertraining in rund 30 Minuten.',
      'Jedes Gerät erkennt dich über Armband oder Chip.',
      'Sitz, Gewicht und Bewegungsumfang stellen sich automatisch ein.',
    ],
    link: 'https://fit-inn-trier.de/biocircuit',
    foto: { src: '/media/klar/karte-biocircuit.webp', alt: 'Biocircuit-Zirkel mit nummerierten Stationen am Boden im Fit-Inn Trier' },
  },
  {
    id: 'stoffwechsel',
    titel: 'Stoffwechsel-Coaching',
    unter: 'Messen statt raten.',
    punkte: [
      'Atemgasanalyse in Ruhe und unter Belastung.',
      'Zeigt deinen Kalorienbedarf, deinen Fettstoffwechsel und deine Pulsbereiche.',
      'Daraus entsteht dein Ernährungs- und Trainingsplan.',
    ],
    link: 'https://fit-inn-trier.de/stoffwechsel-coaching',
    // 19.11.2026 Foto von Markus per Telegram (Atemgasanalyse mit Auswertung)
    foto: { src: '/media/klar/karte-stoffwechsel.webp', alt: 'Atemgasanalyse mit Maske, Trainer zeigt die Auswertung auf dem Tablet' },
    zusatz: 'Zusatzangebot',
  },
];

export default function Karussell({ kopf, scroll = false }: { kopf?: ReactNode; scroll?: boolean }) {
  const wurzel = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const band = useRef<HTMLUListElement>(null);
  const modus = useRef<{ ziel: (i: number) => number } | null>(null);
  const [lage, setLage] = useState({ aktiv: 0, anfang: true, ende: false });
  const melden = (aktiv: number, anfang: boolean, ende: boolean) =>
    setLage((l) => (l.aktiv === aktiv && l.anfang === anfang && l.ende === ende ? l : { aktiv, anfang, ende }));

  // Wisch-Modus: Lage aus der Scroll-Position des Bands (ein rAF pro Bild): aktive Karte = nächster Einrastpunkt, am Ende immer die letzte.
  useEffect(() => {
    const b = band.current;
    if (!b) return;
    let raf = 0;
    const rechnen = () => {
      raf = 0;
      if (modus.current) return;
      const k = b.children[1] as HTMLElement | undefined;
      const schritt = k ? k.offsetLeft - (b.children[0] as HTMLElement).offsetLeft : b.clientWidth;
      const max = b.scrollWidth - b.clientWidth;
      const ende = b.scrollLeft >= max - 4;
      melden(ende ? KARTEN.length - 1 : Math.min(KARTEN.length - 1, Math.round(b.scrollLeft / schritt)), b.scrollLeft <= 4, ende);
    };
    const los = () => { if (!raf) raf = requestAnimationFrame(rechnen); };
    rechnen();
    b.addEventListener('scroll', los, { passive: true });
    window.addEventListener('resize', los);
    return () => { b.removeEventListener('scroll', los); window.removeEventListener('resize', los); if (raf) cancelAnimationFrame(raf); };
  }, []);

  // Scroll-Modus: ein-/ausschalten nach Breite und „Bewegung reduzieren“.
  useEffect(() => {
    const w = wurzel.current, p = pin.current, b = band.current;
    if (!scroll || !w || !p || !b || !window.matchMedia || typeof ResizeObserver === 'undefined') return;
    // overflow: clip statt hidden an den Hüllen (sonst klebt sticky nicht) – ohne Unterstützung bleibt es beim Wischen
    if (!window.CSS?.supports?.('overflow', 'clip')) return;
    const mq = window.matchMedia('(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)');
    const karten = Array.from(b.children) as HTMLElement[];
    const n = karten.length;
    const leiste = document.querySelector<HTMLElement>('.kl-sticky');
    let an = false, raf = 0, oben = 0, strecke = 1, stellen: number[] = [], geklippt: HTMLElement[] = [];
    let probe: HTMLDivElement | null = null;

    // Karte i ruht kurz (je 18 % vor/nach dem Einrastpunkt), dazwischen weich (smoothstep) → kein hartes Springen
    const weich = (s: number) => {
      const i = Math.min(n - 2, Math.floor(s));
      const t = Math.min(1, Math.max(0, (s - i - 0.18) / 0.64));
      return i + t * t * (3 - 2 * t);
    };
    const messen = () => {
      if (!probe) return;
      for (const k of karten) k.style.transform = '';
      const sv = probe.offsetHeight || window.innerHeight; // 100svh: kleinste Höhe (Adressleiste sichtbar) → kein Springen
      const unten = leiste && getComputedStyle(leiste).display !== 'none' ? leiste.offsetHeight : 0;
      const frei = sv - unten - p.offsetHeight;
      // genug Platz: Block mittig (max. 40 px Rand oben); zu hoch: Unterkante bleibt über der festen Leiste
      oben = Math.round(frei >= 0 ? Math.min(frei / 2, 40) : frei - 8);
      w.style.setProperty('--ku-kar-oben', `${oben}px`);
      strecke = Math.max(1, w.offsetHeight - p.offsetHeight);
      const pr = parseFloat(getComputedStyle(b).paddingRight) || 0;
      const max = Math.max(0, karten[n - 1].offsetLeft + karten[n - 1].offsetWidth + pr - b.clientWidth);
      stellen = karten.map((k) => Math.min(max, k.offsetLeft - karten[0].offsetLeft));
      rechnen();
    };
    const rechnen = () => {
      raf = 0;
      const f = Math.min(1, Math.max(0, (oben - w.getBoundingClientRect().top) / strecke));
      const s = f * (n - 1);
      const e = weich(s);
      const i = Math.min(n - 2, Math.floor(e));
      const x = stellen[i] + (stellen[i + 1] - stellen[i]) * (e - i);
      const tf = `translate3d(${(-x).toFixed(1)}px,0,0)`;
      for (const k of karten) if (k.style.transform !== tf) k.style.transform = tf;
      melden(Math.min(n - 1, Math.round(s)), s < 0.05, s > n - 1.05);
    };
    const beimScrollen = () => { if (!raf) raf = requestAnimationFrame(rechnen); };
    const ro = new ResizeObserver(() => messen());
    const ein = () => {
      if (an) return; an = true;
      probe = document.createElement('div');
      probe.style.cssText = 'position:absolute;left:-9999px;top:0;width:1px;height:100vh;height:100svh;visibility:hidden;pointer-events:none';
      document.body.appendChild(probe);
      b.scrollLeft = 0;
      w.classList.add('ku-kar-scroll');
      w.style.setProperty('--ku-kar-n', String(n));
      // Vorfahren mit overflow hidden/auto auf clip umstellen (Klasse ku-kar-clip), sonst greift sticky nicht
      for (let e = w.parentElement; e && e !== document.body; e = e.parentElement) {
        const cs = getComputedStyle(e);
        if (/(hidden|auto|scroll)/.test(cs.overflowX + cs.overflowY)) { e.classList.add('ku-kar-clip'); geklippt.push(e); }
      }
      modus.current = { ziel: (i) => w.getBoundingClientRect().top + window.scrollY - oben + strecke * (i / (n - 1)) };
      ro.observe(w); ro.observe(p); if (leiste) ro.observe(leiste);
      window.addEventListener('scroll', beimScrollen, { passive: true });
      window.addEventListener('resize', beimScrollen);
      messen();
    };
    const aus = () => {
      if (!an) return; an = false;
      ro.disconnect();
      window.removeEventListener('scroll', beimScrollen);
      window.removeEventListener('resize', beimScrollen);
      if (raf) cancelAnimationFrame(raf), (raf = 0);
      modus.current = null;
      w.classList.remove('ku-kar-scroll');
      w.style.removeProperty('--ku-kar-oben'); w.style.removeProperty('--ku-kar-n');
      for (const e of geklippt) e.classList.remove('ku-kar-clip');
      geklippt = [];
      for (const k of karten) k.style.transform = '';
      probe?.remove(); probe = null;
      melden(0, true, false);
    };
    const pruefen = () => (mq.matches ? ein() : aus());
    pruefen();
    mq.addEventListener?.('change', pruefen);
    return () => { mq.removeEventListener?.('change', pruefen); aus(); };
  }, [scroll]);

  const ruhig = () => !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const zeige = (i: number) => {
    const m = modus.current;
    if (m) { window.scrollTo({ top: m.ziel(i), behavior: 'smooth' }); return; }
    const b = band.current;
    const k = b?.children[i] as HTMLElement | undefined;
    if (!b || !k) return;
    b.scrollTo({ left: k.offsetLeft - (b.children[0] as HTMLElement).offsetLeft, behavior: ruhig() ? 'auto' : 'smooth' });
  };
  const blaettern = (r: 1 | -1) => {
    if (modus.current) { zeige(Math.min(KARTEN.length - 1, Math.max(0, lage.aktiv + r))); return; }
    const b = band.current;
    const k = b?.children[1] as HTMLElement | undefined;
    if (!b || !k) return;
    b.scrollBy({ left: r * (k.offsetLeft - (b.children[0] as HTMLElement).offsetLeft), behavior: ruhig() ? 'auto' : 'smooth' });
  };
  // Pfeiltasten im Scroll-Modus (das Band selbst scrollt dann nicht)
  const taste = (e: KeyboardEvent<HTMLUListElement>) => {
    if (!modus.current || (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft')) return;
    e.preventDefault();
    blaettern(e.key === 'ArrowRight' ? 1 : -1);
  };

  return (
    <div className="ku-kar" ref={wurzel} role="region" aria-roledescription="Karussell" aria-label="Biostrength, Biocircuit und Stoffwechsel-Coaching">
      <div className="ku-kar-pin" ref={pin}>
      {kopf}
      <ul className="ku-kar-band" ref={band} tabIndex={0} onKeyDown={taste} aria-label="Karten: seitlich wischen oder mit den Pfeiltasten blättern">
        {KARTEN.map((k, i) => (
          <li key={k.id} className="ku-kar-karte" role="group" aria-roledescription="Karte" aria-label={`${i + 1} von ${KARTEN.length}: ${k.titel}`}>
            {k.foto ? (
              <img className="ku-kar-bild" src={k.foto.src} width={800} height={600} alt={k.foto.alt} loading="lazy" decoding="async" />
            ) : (
              <div className="ku-kar-bild ku-kar-grafik" aria-hidden="true">
                <svg viewBox="0 0 320 240">
                  <path d="M0 140h96l18-44 28 84 26-122 26 104 16-22h110" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Atemgasanalyse</span>
              </div>
            )}
            <div className="ku-kar-text">
              {k.zusatz ? <p className="ku-kar-zusatz">{k.zusatz}</p> : null}
              <h3>{k.titel}</h3>
              <p className="ku-kar-unter">{k.unter}</p>
              <ul>
                {k.punkte.map((p) => <li key={p}><Icon name="haken" size={18} />{p}</li>)}
              </ul>
              <a className="ku-kar-link" href={k.link} rel="noopener">Mehr zu {k.titel}<Icon name="pfeil" size={16} /></a>
            </div>
          </li>
        ))}
      </ul>
      <div className="ku-kar-nav">
        <button type="button" className="ku-kar-pfeil ku-kar-zurueck" onClick={() => blaettern(-1)} disabled={lage.anfang} aria-label="Vorherige Karte">
          <Icon name="pfeil" size={20} />
        </button>
        <div className="ku-kar-punkte">
          {KARTEN.map((k, i) => (
            <button key={k.id} type="button" className="ku-kar-punkt" onClick={() => zeige(i)} aria-label={`Karte ${i + 1}: ${k.titel}`} aria-current={i === lage.aktiv ? 'true' : undefined} />
          ))}
        </div>
        <button type="button" className="ku-kar-pfeil" onClick={() => blaettern(1)} disabled={lage.ende} aria-label="Nächste Karte">
          <Icon name="pfeil" size={20} />
        </button>
      </div>
      </div>
    </div>
  );
}
