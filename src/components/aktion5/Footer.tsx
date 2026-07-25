import Image from 'next/image'
import { aktion } from './content'

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
    </footer>
  )
}
