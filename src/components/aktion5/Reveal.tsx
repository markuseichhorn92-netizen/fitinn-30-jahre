'use client'

import { useEffect } from 'react'

// Blendet alle `[data-reveal]`-Elemente beim Scrollen ein — wie im Design:
// bereits sichtbare Elemente sofort, alles andere per IntersectionObserver.
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

    const beobachte = () => {
      document.querySelectorAll('[data-reveal]:not(.is-in)').forEach(el => {
        const r = el.getBoundingClientRect()
        if (r.top < window.innerHeight * 0.98 && r.bottom > 0) el.classList.add('is-in')
        else io.observe(el)
      })
    }

    beobachte()
    window.addEventListener('scroll', beobachte, { passive: true })
    return () => {
      window.removeEventListener('scroll', beobachte)
      io.disconnect()
    }
  }, [])

  return null
}
