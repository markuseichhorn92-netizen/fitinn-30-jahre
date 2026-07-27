'use client'

import { useEffect } from 'react'

// Blendet alle `[data-reveal]`-Elemente beim Scrollen ein. Bereits sichtbare
// Elemente sofort, alles andere per IntersectionObserver. Bewusst ohne
// Scroll-Listener: Ein Handler, der bei jedem Scroll-Ereignis das gesamte
// Dokument abfragt und Geometrien liest, kostet auf dem Handy spürbar Leistung.
export function Reveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    )

    document.querySelectorAll('[data-reveal]:not(.is-in)').forEach(el => {
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight * 0.98 && r.bottom > 0) el.classList.add('is-in')
      else io.observe(el)
    })

    return () => io.disconnect()
  }, [])

  return null
}
