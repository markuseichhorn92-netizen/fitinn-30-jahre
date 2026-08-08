import Link from 'next/link'
import { aktion } from './inhalt'
import { satz, schluessel } from './teile'

// Der Verlagsvermerk am Fuß der Tafelreihe.
export function Fussleiste() {
  return (
    <footer style={{ background: 'var(--blau-tief)', borderTop: '1px solid rgba(237,229,214,.16)' }}>
      <div
        style={{
          ...satz,
          padding: 'clamp(2.5rem,5vw,4rem) clamp(16px,4vw,44px)',
          display: 'grid',
          gap: 'clamp(1.5rem,4vw,3rem)',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))',
          alignItems: 'start',
        }}
      >
        <div>
          <p style={{ fontSize: 'clamp(21px,2.2vw,26px)', fontWeight: 700, letterSpacing: '-.03em' }}>Fit-Inn Trier</p>
          <p style={{ fontSize: 17, color: 'var(--matt-blau)', marginTop: '.5em' }}>{aktion.adresse}</p>
          <p style={{ ...schluessel, color: 'var(--matt-blau)', marginTop: '.9em' }}>Sonntags geschlossen</p>
        </div>

        <div style={{ display: 'grid', gap: '.6em', fontSize: 17 }}>
          <a href={`tel:${aktion.telefon.link}`} className="tf-ziel" style={{ color: 'var(--knochen)', textDecoration: 'none' }}>
            {aktion.telefon.anzeige}
          </a>
          <a href={`mailto:${aktion.email}`} className="tf-ziel" style={{ color: 'var(--knochen)', textDecoration: 'none' }}>
            {aktion.email}
          </a>
        </div>

        <div style={{ display: 'grid', gap: '.6em', fontSize: 17 }}>
          <Link href="/" className="tf-ziel" style={{ color: 'var(--matt-blau)' }}>Zur Startseite</Link>
          <Link href="/impressum" className="tf-ziel" style={{ color: 'var(--matt-blau)' }}>Impressum</Link>
          <Link href="/datenschutz" className="tf-ziel" style={{ color: 'var(--matt-blau)' }}>Datenschutz</Link>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(237,229,214,.16)' }}>
        <p
          style={{
            ...satz,
            ...schluessel,
            color: 'var(--matt-blau)',
            padding: '1.1rem clamp(16px,4vw,44px)',
            letterSpacing: '.07em',
          }}
        >
          Gestalterische Testfläche · nicht in der Suche gelistet · Buchungen laufen echt in Magicline
        </p>
      </div>
    </footer>
  )
}
