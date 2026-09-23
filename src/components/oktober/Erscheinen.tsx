'use client'

import { useEffect } from 'react'

// Blendet [data-erscheinen]-Elemente beim Scrollen einmal ein. Verborgen wird
// erst, wenn dieses Skript die Klasse .okt-js setzt – ohne JavaScript und bei
// reduzierter Bewegung bleibt alles sofort sichtbar (siehe oktober.css).
export function Erscheinen() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!('IntersectionObserver' in window)) return

    const wurzel = document.documentElement
    const io = new IntersectionObserver(
      eintraege => {
        for (const e of eintraege) {
          if (e.isIntersecting) {
            e.target.classList.add('ist-da')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    )

    // Was schon im Bild ist, sofort zeigen – sonst blitzt es kurz weg.
    document.querySelectorAll('[data-erscheinen]').forEach(el => {
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('ist-da')
      else io.observe(el)
    })
    wurzel.classList.add('okt-js')

    return () => {
      io.disconnect()
      wurzel.classList.remove('okt-js')
    }
  }, [])

  return null
}
