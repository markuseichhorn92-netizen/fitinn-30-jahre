'use client';
// /klar – wischbare Karten Biostrength, Biocircuit, Stoffwechsel-Coaching (Entwurf 19.11.2026, Auftrag Markus
// „horizontales scrollen … für die Erklärung der Biostrength, biocircuit sowie Stoffwechselcoaching“).
// Texte nur aus den Sanity-Seiten /biostrength-fit-inn-trier, /biocircuit, /stoffwechsel-coaching (fit-inn-trier.de).
// Fotos: echte Studiofotos aus Sanity. Coaching-Foto von Markus (19.11.). Keine Preise.
// Mobil: CSS scroll-snap, nächste Karte ragt ins Bild, Punkte; ab 640 px Pfeile; ab 1024 px alle drei nebeneinander.
// Ohne JS bleibt das Band wischbar (Punkte/Pfeile sind dann nur Zierde).
import { useEffect, useRef, useState } from 'react';
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

export default function Karussell() {
  const band = useRef<HTMLUListElement>(null);
  const [lage, setLage] = useState({ aktiv: 0, anfang: true, ende: false });

  // Lage aus der Scroll-Position (ein rAF pro Bild): aktive Karte = nächster Einrastpunkt, am Ende immer die letzte.
  useEffect(() => {
    const b = band.current;
    if (!b) return;
    let raf = 0;
    const rechnen = () => {
      raf = 0;
      const k = b.children[1] as HTMLElement | undefined;
      const schritt = k ? k.offsetLeft - (b.children[0] as HTMLElement).offsetLeft : b.clientWidth;
      const max = b.scrollWidth - b.clientWidth;
      const ende = b.scrollLeft >= max - 4;
      const aktiv = ende ? KARTEN.length - 1 : Math.min(KARTEN.length - 1, Math.round(b.scrollLeft / schritt));
      setLage((l) => (l.aktiv === aktiv && l.anfang === b.scrollLeft <= 4 && l.ende === ende ? l : { aktiv, anfang: b.scrollLeft <= 4, ende }));
    };
    const los = () => { if (!raf) raf = requestAnimationFrame(rechnen); };
    rechnen();
    b.addEventListener('scroll', los, { passive: true });
    window.addEventListener('resize', los);
    return () => { b.removeEventListener('scroll', los); window.removeEventListener('resize', los); if (raf) cancelAnimationFrame(raf); };
  }, []);

  const ruhig = () => !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const zeige = (i: number) => {
    const b = band.current;
    const k = b?.children[i] as HTMLElement | undefined;
    if (!b || !k) return;
    b.scrollTo({ left: k.offsetLeft - (b.children[0] as HTMLElement).offsetLeft, behavior: ruhig() ? 'auto' : 'smooth' });
  };
  const blaettern = (r: 1 | -1) => {
    const b = band.current;
    const k = b?.children[1] as HTMLElement | undefined;
    if (!b || !k) return;
    b.scrollBy({ left: r * (k.offsetLeft - (b.children[0] as HTMLElement).offsetLeft), behavior: ruhig() ? 'auto' : 'smooth' });
  };

  return (
    <div className="ku-kar" role="region" aria-roledescription="Karussell" aria-label="Biostrength, Biocircuit und Stoffwechsel-Coaching">
      <ul className="ku-kar-band" ref={band} tabIndex={0} aria-label="Karten: seitlich wischen oder mit den Pfeiltasten blättern">
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
  );
}
