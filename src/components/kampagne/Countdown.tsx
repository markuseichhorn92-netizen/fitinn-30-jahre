'use client'

import { useSyncExternalStore, type CSSProperties } from 'react'
import { aktion } from '@/components/aktion5/content'
import './countdown.css'

// Countdown bis zum Ende der Aktion.
//
// Der Termin ist echt: Laut Rechtshinweis gilt das Angebot für Verträge, die
// bis zum 31.08.2026 abgeschlossen werden. Deshalb zählt die Uhr auf einen
// festen Zeitpunkt aus content.ts und nicht auf „noch 24 Stunden ab deinem
// Besuch“ – eine Frist, die bei jedem Aufruf von vorn beginnt, wäre schlicht
// gelogen und in Deutschland dazu abmahnfähig.
//
// Nach Ablauf verschwindet der Countdown ersatzlos. Ein Feld mit der
// Aufschrift „Aktion beendet“ wäre auf einer Seite, die weiterhin
// Probetrainings bucht, das schlechtestmögliche Bauteil.

const ENDE = new Date(aktion.gueltigBisZeit).getTime()

type Rest = { tage: number; stunden: number; minuten: number; sekunden: number }

function restBerechnen(): Rest | null {
  const ms = ENDE - Date.now()
  if (ms <= 0) return null
  const s = Math.floor(ms / 1000)
  return {
    tage: Math.floor(s / 86400),
    stunden: Math.floor(s / 3600) % 24,
    minuten: Math.floor(s / 60) % 60,
    sekunden: s % 60,
  }
}

const zwei = (n: number) => String(n).padStart(2, '0')

/**
 * Die Uhr als äußere Quelle, an der React sich anmeldet.
 *
 * `useSyncExternalStore` verlangt, dass der Schnappschuss innerhalb desselben
 * Zustands dasselbe Objekt zurückgibt – sonst vergleicht React per Object.is,
 * findet jedes Mal etwas Neues und rendert endlos. Deshalb wird das Ergebnis
 * je Sekunde gemerkt.
 */
type Stand = Rest | 'vorbei' | 'wartet'

let gemerkt: Stand = 'wartet'
let gemerkteSekunde = -1

function schnappschuss(): Stand {
  const sek = Math.floor(Date.now() / 1000)
  if (sek !== gemerkteSekunde) {
    gemerkteSekunde = sek
    gemerkt = restBerechnen() ?? 'vorbei'
  }
  return gemerkt
}

/** Auf dem Server gibt es keine laufende Uhr – dort stehen Striche. */
const serverSchnappschuss = (): Stand => 'wartet'

function anmelden(melden: () => void) {
  const uhr = setInterval(melden, 1000)
  // Beim Zurückkehren aus dem Hintergrund sofort nachziehen, statt bis zur
  // nächsten vollen Sekunde eine veraltete Zahl stehen zu lassen.
  const beiSicht = () => { if (!document.hidden) melden() }
  document.addEventListener('visibilitychange', beiSicht)
  return () => {
    clearInterval(uhr)
    document.removeEventListener('visibilitychange', beiSicht)
  }
}

/** Ausgeschriebene Restzeit für die Sprachausgabe – ohne Sekunden. */
function inWorten(r: Rest) {
  const teile = []
  if (r.tage) teile.push(`${r.tage} ${r.tage === 1 ? 'Tag' : 'Tage'}`)
  if (r.stunden) teile.push(`${r.stunden} ${r.stunden === 1 ? 'Stunde' : 'Stunden'}`)
  if (!r.tage) teile.push(`${r.minuten} ${r.minuten === 1 ? 'Minute' : 'Minuten'}`)
  return teile.join(' und ')
}

export function Countdown({ style, className }: { style?: CSSProperties; className?: string }) {
  // Beim ersten Rendern steht „wartet“: Server und Client würden sonst
  // verschiedene Sekunden zeigen und React meldete einen Hydrations-Fehler.
  // Die Kästen stehen trotzdem schon da (mit „--“), damit beim Erscheinen der
  // Ziffern nichts springt.
  const stand = useSyncExternalStore(anmelden, schnappschuss, serverSchnappschuss)

  // Abgelaufen: nichts anzeigen.
  if (stand === 'vorbei') return null
  const rest = stand === 'wartet' ? null : stand

  const felder: [string, string][] = [
    [rest ? zwei(rest.tage) : '--', rest?.tage === 1 ? 'Tag' : 'Tage'],
    [rest ? zwei(rest.stunden) : '--', 'Std.'],
    [rest ? zwei(rest.minuten) : '--', 'Min.'],
    [rest ? zwei(rest.sekunden) : '--', 'Sek.'],
  ]

  return (
    <div
      className={`kc${className ? ` ${className}` : ''}`}
      style={style}
      data-knapp={rest && rest.tage === 0 ? '1' : '0'}
      role="timer"
      aria-label={
        rest
          ? `Das Angebot endet am ${aktion.gueltigBis}, in ${inWorten(rest)}.`
          : `Das Angebot endet am ${aktion.gueltigBis}.`
      }
    >
      <span className="kc-text" aria-hidden="true">
        Angebot endet <b>{aktion.gueltigBis}</b>
      </span>
      {/* Die Ziffern wechseln jede Sekunde. Für Screenreader sind sie
          ausgeblendet – die Beschriftung oben sagt dasselbe in Ruhe. */}
      <span className="kc-uhr" aria-hidden="true">
        {felder.map(([wert, label]) => (
          <span key={label} className="kc-teil">
            <b>{wert}</b>
            <i>{label}</i>
          </span>
        ))}
      </span>
    </div>
  )
}
