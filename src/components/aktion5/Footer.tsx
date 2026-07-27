import Image from 'next/image'
import Link from 'next/link'
import { aktion } from './content'

const rechtlich = [
  { label: 'Impressum', href: '/impressum', extern: false },
  { label: 'Datenschutz', href: '/datenschutz', extern: false },
  { label: 'AGB', href: 'https://fit-inn-trier.de/agbs-fit-inn-trier', extern: true },
]

export function Footer() {
  return (
    <footer
      style={{
        background: 'var(--ink)',
        color: 'rgba(255,255,255,.55)',
        borderTop: '1px solid var(--line-dark)',
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: 'clamp(2.5rem,5vw,3.5rem) clamp(20px,5vw,60px)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem clamp(2rem,6vw,5rem)',
          alignItems: 'center',
          fontSize: 16.5,
        }}
      >
        <Image
          src="/aktion5/logo-white.png"
          alt="Fit-Inn Trier"
          width={130}
          height={24}
          style={{ height: 24, width: 'auto', marginRight: 'auto', opacity: .9 }}
        />
        <span>{aktion.adresse}</span>
        <a href={`tel:${aktion.telefon.link}`} style={{ color: '#fff', textDecoration: 'none' }}>
          {aktion.telefon.anzeige}
        </a>
        <a href={`mailto:${aktion.email}`} style={{ color: '#fff', textDecoration: 'none' }}>
          {aktion.email}
        </a>
      </div>

      {/* Pflichtangaben – von jeder Seite aus erreichbar. */}
      <div style={{ borderTop: '1px solid var(--line-dark)' }}>
        <div
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            padding: 'clamp(1.1rem,2.2vw,1.5rem) clamp(20px,5vw,60px)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '.8rem clamp(1.5rem,4vw,2.5rem)',
            alignItems: 'center',
            fontSize: 16,
          }}
        >
          {rechtlich.map(l =>
            l.extern ? (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'rgba(255,255,255,.75)', textDecoration: 'none' }}
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.label}
                href={l.href}
                style={{ color: 'rgba(255,255,255,.75)', textDecoration: 'none' }}
              >
                {l.label}
              </Link>
            ),
          )}
          <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,.55)' }}>
            Familiengeführt seit 1996
          </span>
        </div>
      </div>
    </footer>
  )
}
