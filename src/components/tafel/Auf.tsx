'use client'

import { useEffect } from 'react'

// Lässt die Tafeln beim Hereinscrollen einmal erscheinen. Der Ausgangszustand
// ist im Stylesheet sichtbar definiert, sobald jemand Bewegung reduziert –
// ohne Skript bleibt also nichts unsichtbar.
export function Auf() {
  useEffect(() => {
    const wurzel = document.querySelector<HTMLElement>('.tf')
    const ziele = document.querySelectorAll('.tf [data-auf]')
    if (!wurzel || !ziele.length) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Erst jetzt darf das Stylesheet die Tafeln verbergen: Ab hier ist
    // sichergestellt, dass sie auch wieder erscheinen.
    wurzel.dataset.bewegt = '1'

    const io = new IntersectionObserver(
      eintraege => {
        for (const e of eintraege) {
          if (!e.isIntersecting) continue
          e.target.classList.add('is-in')
          io.unobserve(e.target)
        }
      },
      { threshold: .08, rootMargin: '0px 0px -8% 0px' },
    )
    ziele.forEach(z => io.observe(z))
    return () => {
      io.disconnect()
      delete wurzel.dataset.bewegt
    }
  }, [])

  return null
}
