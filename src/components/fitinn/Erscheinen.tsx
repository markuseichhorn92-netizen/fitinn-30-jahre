'use client'

import { useEffect } from 'react'

// Blendet [data-zeigen]-Elemente beim ersten Sichtbarwerden kurz ein
// (16 px Versatz, 0,6 s). Verborgen wird erst, wenn dieses Skript die Klasse
// .fi-js setzt – ohne JavaScript und bei reduzierter Bewegung bleibt alles
// sofort sichtbar.
export function Erscheinen() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const io = new IntersectionObserver(
      eintraege => {
        for (const e of eintraege) {
          if (e.isIntersecting) {
            e.target.classList.add('ist-da')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )

    // Was schon im Bild ist, sofort zeigen – sonst blitzt es kurz weg.
    document.querySelectorAll('[data-zeigen]').forEach(el => {
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('ist-da')
      else io.observe(el)
    })
    const wurzel = document.documentElement
    wurzel.classList.add('fi-js')

    return () => {
      io.disconnect()
      wurzel.classList.remove('fi-js')
    }
  }, [])

  return null
}
