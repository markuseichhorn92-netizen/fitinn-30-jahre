'use client'

import { useEffect, useState } from 'react'
import { Knopf, Telefon } from '@/components/fitinn/Teile'
import { kontakt } from './inhalt'

// Klebende Leiste am unteren Rand, nur auf dem Handy (CSS blendet sie ab
// 820 px aus). Sie erscheint, sobald die Schaltflächen der ersten Ansicht aus
// dem Bild sind, und tritt zurück, solange der Anfragebereich sichtbar ist –
// dort stünde sie doppelt. Alle Flächen mit [data-leiste-aus] zählen.
export function Leiste() {
  const [sichtbar, setSichtbar] = useState(false)

  useEffect(() => {
    const ziele = Array.from(document.querySelectorAll('[data-leiste-aus]'))
    const imBild = new Set<Element>()
    const io = new IntersectionObserver(eintraege => {
      for (const e of eintraege) {
        if (e.isIntersecting) imBild.add(e.target)
        else imBild.delete(e.target)
      }
      setSichtbar(imBild.size === 0)
    })
    ziele.forEach(z => io.observe(z))
    return () => io.disconnect()
  }, [])

  return (
    <aside
      className="fi-leiste-unten"
      aria-label="Schnellkontakt"
      data-sichtbar={sichtbar ? 'ja' : 'nein'}
      aria-hidden={!sichtbar}
    >
      <Knopf href="#anfrage" cta="oktober-allgemein" tabIndex={sichtbar ? undefined : -1}>
        Unverbindlich anfragen
      </Knopf>
      <a
        href={`tel:${kontakt.telefon.link}`}
        data-kontakt="telefon"
        className="fi-knopf fi-knopf--linie"
        aria-label={`Anrufen: ${kontakt.telefon.anzeige}`}
        tabIndex={sichtbar ? undefined : -1}
      >
        <Telefon groesse={20} />
      </a>
    </aside>
  )
}
