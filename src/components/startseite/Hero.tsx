import Image from 'next/image'
import { Knopf, Zeilen } from '@/components/fitinn/Teile'
import { hero, PROBETRAINING } from './inhalt'

// Große Aussage links, Bildtafel rechts: das echte Studiofoto in einem
// dunklen Rahmen mit Kopfzeile, belegten Eckdaten und orangem Streifen.
export function Hero() {
  return (
    <section className="fi-hero" aria-labelledby="hero-titel">
      <div className="fi-satz fi-hero-raster">
        <div>
          <h1 id="hero-titel" className="fi-h1">
            <span className="fi-hero-ort">{hero.ort}</span>
            <span className="sr-only">: </span>
            <Zeilen zeilen={hero.zeilen} betont={[1]} />
          </h1>
          <p className="fi-text fi-lead">{hero.text}</p>
          <div className="fi-aktionen">
            <Knopf href={PROBETRAINING} cta="startseite-hero">Probetraining anfragen</Knopf>
            <a href="#studio" className="fi-verweis">Studio entdecken</a>
          </div>
          <ul className="fi-merkmale">
            {hero.merkmale.map(m => (
              <li key={m.titel}>
                <strong>{m.titel}</strong>
                <span>{m.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <figure className="fi-tafel" style={{ margin: 0 }}>
          <div className="fi-tafel-kopf" aria-hidden="true">
            <span className="fi-tafel-kopf-punkt">{hero.tafel.kopf}</span>
            <span>{hero.tafel.marke}</span>
          </div>
          <div className="fi-tafel-bild">
            <Image
              src="/studio-1.avif"
              alt={hero.tafel.bildAlt}
              fill
              priority
              sizes="(min-width: 1120px) 528px, (min-width: 960px) 46vw, 92vw"
              style={{ objectPosition: 'center 60%' }}
            />
          </div>
          <ul className="fi-tafel-werte">
            {hero.tafel.werte.map(w => (
              <li key={w.wert}>
                <strong>{w.wert}</strong>
                <span>{w.text}</span>
              </li>
            ))}
          </ul>
          <figcaption className="fi-tafel-streifen">
            <span>{hero.tafel.streifenLabel}</span>
            <strong>{hero.tafel.streifenText}</strong>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
