import Image from 'next/image'
import localFont from 'next/font/local'
import { aktion } from '@/components/aktion5/content'
import './abgelaufen.css'

const figtree = localFont({
  src: '../../fonts/Figtree-Variable-latin.woff2',
  variable: '--font-figtree',
  weight: '300 900',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})

const HOMEPAGE = 'https://fit-inn-trier.de'

// Was die Angebotsseiten ab dem 01.09.2026 zeigen.
//
// Die Aktion ist vorbei, das Studio nicht. Deshalb steht hier kein
// Schlusspunkt, sondern eine Weiterleitung: der Knopf auf die Homepage und
// daneben die Telefonnummer. Wer über eine alte Anzeige kommt, ist ein
// Interessent – nur eben für das reguläre Angebot.
export function Abgelaufen() {
  return (
    <main className={`ab ${figtree.variable}`}>
      <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* Das Studiofoto trägt die Fläche, tief abgedunkelt. */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0 }}>
          <Image
            src="/studio-1.avif"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 60%', filter: 'grayscale(.6) brightness(.32)' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(4,22,27,.86) 0%, rgba(4,22,27,.7) 45%, rgba(4,22,27,.95) 100%)',
            }}
          />
        </div>

        <div className="ab-satz" style={{ position: 'relative', zIndex: 1, padding: 'clamp(4rem,10vh,7rem) clamp(20px,5vw,48px)' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '.6em',
              padding: '.5em 1.1em',
              borderRadius: 999,
              border: '1px solid var(--linie)',
              fontSize: 13.5,
              letterSpacing: '.14em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: 'var(--matt)',
            }}
          >
            Aktion beendet
          </span>

          <h1
            style={{
              fontSize: 'clamp(36px,6vw,72px)',
              marginTop: 'clamp(1.2rem,2.6vw,1.9rem)',
              maxWidth: '15ch',
              textWrap: 'balance',
            }}
          >
            Die 5-Euro-Aktion ist vorbei.
          </h1>

          <p
            style={{
              marginTop: 'clamp(1rem,2vw,1.5rem)',
              maxWidth: '46ch',
              fontSize: 'clamp(18px,1.6vw,21px)',
              color: 'var(--matt)',
              fontWeight: 300,
            }}
          >
            Sie galt für Verträge, die bis zum {aktion.gueltigBis} abgeschlossen wurden. Trainieren
            kannst du trotzdem – alle aktuellen Angebote und ein kostenloses Probetraining findest
            du auf unserer Website.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 'clamp(1.8rem,3.4vw,2.6rem)' }}>
            <a href={HOMEPAGE} className="ab-knopf">
              Zu fit-inn-trier.de
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href={`tel:${aktion.telefon.link}`} className="ab-knopf ab-knopf--offen">
              Anrufen: {aktion.telefon.anzeige}
            </a>
          </div>
        </div>
      </div>

      <footer style={{ position: 'relative', zIndex: 1, borderTop: '1px solid var(--linie)' }}>
        <div
          className="ab-satz"
          style={{
            padding: 'clamp(1.4rem,3vw,2rem) clamp(20px,5vw,48px)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '.8rem 2rem',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 15.5,
            color: 'var(--matt)',
          }}
        >
          <span>Fit-Inn Trier · {aktion.adresse}</span>
          <span style={{ display: 'flex', flexWrap: 'wrap', gap: '1.4rem' }}>
            <a href="/impressum" className="ab-ziel">Impressum</a>
            <a href="/datenschutz" className="ab-ziel">Datenschutz</a>
          </span>
        </div>
      </footer>
    </main>
  )
}
