'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Menu, X, Phone, ArrowRight } from 'lucide-react'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-6xl px-5 flex items-center justify-between h-16">
        <a href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="FIT-INN Trier" width={120} height={120} className="rounded" />
        </a>

        <div className="hidden md:flex items-center gap-6">
          <a href="/#studio" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Studio</a>
          <a href="/#vorteile" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Vorteile</a>
          <a href="/#angebot" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Angebot</a>
          <a href="tel:+49651308524" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" /> 0651 308524
          </a>
          <a href="/probetraining" className="btn-cta inline-flex items-center gap-2 !py-2 !px-4 !text-sm">
            Angebot sichern
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-b border-border px-5 pb-4">
          <div className="flex flex-col gap-3">
            <a href="/#studio" onClick={() => setMenuOpen(false)} className="text-sm font-medium py-2 border-b border-border/50">Studio</a>
            <a href="/#vorteile" onClick={() => setMenuOpen(false)} className="text-sm font-medium py-2 border-b border-border/50">Vorteile</a>
            <a href="/#angebot" onClick={() => setMenuOpen(false)} className="text-sm font-medium py-2 border-b border-border/50">Angebot</a>
            <a href="/probetraining" className="btn-cta inline-flex items-center justify-center gap-2 mt-2">
              Angebot sichern <ArrowRight className="w-4 h-4" />
            </a>
            <a href="tel:+49651308524" className="btn-outline justify-center">
              <Phone className="w-4 h-4" /> 0651 308524
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
