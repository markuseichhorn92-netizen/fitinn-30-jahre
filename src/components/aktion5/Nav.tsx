'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const links = [
  { href: '#warum', label: 'Warum' },
  { href: '#studio', label: 'Studio' },
  { href: '#angebot', label: 'Angebot' },
  { href: '#app', label: 'App' },
  { href: '#ablauf', label: 'Ablauf' },
  { href: '#fragen', label: 'Fragen' },
]

// Sticky-Navigation: transparent über dem Hero, ab 90px Scroll dunkel mit Blur.
export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 90)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="pnav"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background .4s,backdrop-filter .4s,border-color .4s',
        borderBottom: `1px solid ${scrolled ? 'var(--line-dark)' : 'transparent'}`,
        background: scrolled ? 'rgba(4,22,27,.82)' : 'transparent',
        backdropFilter: scrolled ? 'saturate(180%) blur(18px)' : undefined,
        WebkitBackdropFilter: scrolled ? 'saturate(180%) blur(18px)' : undefined,
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: '0 clamp(20px,5vw,60px)',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(1.2rem,3vw,2.4rem)',
        }}
      >
        <Image
          src="/aktion5/logo-white.png"
          alt="Fit-Inn Trier"
          width={140}
          height={26}
          priority
          style={{ height: 26, width: 'auto', marginRight: 'auto' }}
        />
        <div
          className="pnav-links"
          style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1.1rem,2.4vw,2rem)' }}
        >
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              style={{
                color: '#fff',
                textDecoration: 'none',
                fontSize: 16,
                fontWeight: 500,
                whiteSpace: 'nowrap',
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#termin"
          style={{
            background: 'var(--amber)',
            color: '#04161b',
            fontSize: 16,
            fontWeight: 700,
            padding: '.62em 1.35em',
            borderRadius: 999,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Probetraining
        </a>
      </div>
    </nav>
  )
}
