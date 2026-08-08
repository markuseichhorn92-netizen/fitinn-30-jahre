'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { meldeBuchung } from '@/components/GoogleTag'
import { formatTime, toLocalDateKey, type Slot } from '@/lib/booking'

// Die Buchungslogik, ohne jede Optik.
//
// Zwei Entwürfe zeigen dasselbe Probetraining in zwei Welten. Der Ablauf ist
// derselbe und darf es nur einmal geben: Magicline verlangt zwingend Vorname,
// Nachname, E-Mail, Telefon, Anrede, Geburtsdatum und die vollständige
// Anschrift — jede Kopie dieser Regeln wäre eine, die irgendwann veraltet.
// Gebucht wird über den bestehenden Proxy /api/trialsession.

export const ZIELE = [
  'Kraft & Muskeln aufbauen',
  'Beweglichkeit & Balance',
  'Rücken & Gelenke',
  'Gesund & selbstständig bleiben',
  'Wiedereinstieg nach langer Pause',
]

export const MONATE = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
]

export const WOCHENTAGE = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

export type Zelle = { key: string; label: string; aus: boolean; iso?: string }

const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

export const langesDatum = (datum: string) =>
  new Date(datum + 'T00:00:00').toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })

export function useBuchung() {
  const [schritt, setSchritt] = useState(1)
  const [monatOffset, setMonatOffset] = useState(0)
  const [datum, setDatum] = useState<string | null>(null)
  const [slot, setSlot] = useState<Slot | null>(null)

  const [slots, setSlots] = useState<Slot[]>([])
  const [ladend, setLadend] = useState(true)
  const [ladeFehler, setLadeFehler] = useState(false)

  const [geschlecht, setGeschlecht] = useState<'FEMALE' | 'MALE' | ''>('')
  const [sendet, setSendet] = useState(false)
  const [fehler, setFehler] = useState<string | null>(null)
  const [gesendet, setGesendet] = useState(false)

  const formRef = useRef<HTMLFormElement>(null)
  const geladeneMonate = useRef<Set<string>>(new Set())

  const heute = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const basis = useMemo(
    () => new Date(heute.getFullYear(), heute.getMonth() + monatOffset, 1),
    [heute, monatOffset],
  )

  // Freie Termine des angezeigten Monats nachladen.
  useEffect(() => {
    const key = `${basis.getFullYear()}-${basis.getMonth()}`
    if (geladeneMonate.current.has(key)) return
    geladeneMonate.current.add(key)

    const von = basis > heute ? basis : heute
    const bis = new Date(basis.getFullYear(), basis.getMonth() + 1, 0)

    setLadend(true)
    fetch(`/api/trialsession?startDate=${iso(von)}&endDate=${iso(bis)}`)
      .then(r => r.json())
      .then(d => {
        if (d.error) throw new Error(d.error)
        setSlots(vorher => {
          const bekannt = new Set(vorher.map(s => s.startDateTime))
          return [...vorher, ...(d.slots || []).filter((s: Slot) => !bekannt.has(s.startDateTime))]
        })
      })
      .catch(() => setLadeFehler(true))
      .finally(() => setLadend(false))
  }, [basis, heute])

  const slotsProTag = useMemo(() => {
    const map: Record<string, Slot[]> = {}
    for (const s of slots) {
      const k = toLocalDateKey(s.startDateTime)
      ;(map[k] ||= []).push(s)
    }
    for (const k of Object.keys(map)) map[k].sort((a, b) => a.startDateTime.localeCompare(b.startDateTime))
    return map
  }, [slots])

  const tagesSlots = datum ? slotsProTag[datum] || [] : []
  const terminText =
    datum && slot ? `${langesDatum(datum)}, ${formatTime(slot.startDateTime)} Uhr` : null

  /** Prüft nur die Felder des sichtbaren Schritts. */
  const schrittGueltig = (n: number) => {
    if (n === 1) return !!(datum && slot)
    if (n === 2 && !geschlecht) {
      setFehler('Bitte wähle die Anrede – ohne sie nimmt das Buchungssystem den Termin nicht an.')
      return false
    }
    const form = formRef.current
    if (!form) return true
    const felder = form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      `[data-step="${n}"] input, [data-step="${n}"] select, [data-step="${n}"] textarea`,
    )
    for (const f of felder) {
      if (!f.checkValidity()) {
        f.reportValidity()
        return false
      }
    }
    return true
  }

  const weiter = () => {
    if (schrittGueltig(schritt)) setSchritt(s => Math.min(3, s + 1))
  }
  const zurueck = () => setSchritt(s => Math.max(1, s - 1))

  const absenden = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Die native Gesamtprüfung würde über die ausgeblendeten Pflichtfelder der
    // anderen Schritte stolpern; deshalb prüft der Ablauf schrittweise.
    if (schritt !== 3 || !slot || !schrittGueltig(3)) return

    const fd = new FormData(e.currentTarget)
    const ziel = String(fd.get('ziel') || '')
    const nachricht = String(fd.get('nachricht') || '')

    setSendet(true)
    setFehler(null)
    try {
      const res = await fetch('/api/trialsession', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: fd.get('vorname'),
          lastName: fd.get('nachname'),
          email: fd.get('email'),
          mobilephone: fd.get('telefon'),
          gender: geschlecht,
          dateOfBirth: `${fd.get('gebJahr')}-${String(fd.get('gebMonat')).padStart(2, '0')}-${String(fd.get('gebTag')).padStart(2, '0')}`,
          street: fd.get('strasse'),
          houseNumber: fd.get('hausnummer'),
          zip: fd.get('plz'),
          city: fd.get('ort'),
          marketingConsent: false,
          note: [ziel && `Ziel: ${ziel}`, nachricht && `Anmerkung: ${nachricht}`].filter(Boolean).join(' | '),
          startDateTime: slot.startDateTime,
        }),
      })
      const ergebnis = await res.json()
      if (!res.ok || ergebnis.error) {
        setFehler(ergebnis.error || 'Die Buchung hat nicht geklappt.')
      } else {
        setGesendet(true)
        meldeBuchung({ termin: slot.startDateTime })
      }
    } catch {
      setFehler('Keine Verbindung zum Buchungssystem.')
    } finally {
      setSendet(false)
    }
  }

  // ─── Kalenderraster ────────────────────────────────────────────────────
  const monatLabel = basis.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })
  const ersterWt = (basis.getDay() + 6) % 7
  const anzahlTage = new Date(basis.getFullYear(), basis.getMonth() + 1, 0).getDate()

  const zellen: Zelle[] = []
  for (let i = 0; i < ersterWt; i++) zellen.push({ key: `l${i}`, label: '', aus: true })
  for (let d = 1; d <= anzahlTage; d++) {
    const dt = new Date(basis.getFullYear(), basis.getMonth(), d)
    const k = iso(dt)
    zellen.push({ key: k, label: String(d), aus: dt < heute || !slotsProTag[k], iso: k })
  }

  const jahre = Array.from({ length: 84 }, (_, i) => new Date().getFullYear() - 16 - i)

  /** Text für die Zeitspalte, wenn dort gerade nichts zu wählen ist. */
  const zeitHinweis = ladeFehler
    ? 'Die freien Zeiten lassen sich gerade nicht laden. Ruf uns an, wir finden einen Termin.'
    : ladend
      ? 'Freie Zeiten werden geladen …'
      : datum
        ? 'An diesem Tag ist online nichts mehr frei. Wähle einen anderen Tag oder ruf uns an.'
        : 'Wähle links einen Tag – dann erscheinen die freien Uhrzeiten. Probetermine gibt es Montag bis Samstag.'

  return {
    schritt, setSchritt, weiter, zurueck,
    monatOffset, setMonatOffset, monatLabel, zellen,
    datum, setDatum, slot, setSlot, tagesSlots, terminText, zeitHinweis,
    geschlecht, setGeschlecht, sendet, fehler, setFehler, gesendet,
    formRef, absenden, jahre,
  }
}
