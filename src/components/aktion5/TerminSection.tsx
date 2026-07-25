'use client'

import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { formatTime, toLocalDateKey, type Slot } from '@/lib/booking'
import { aktion } from './content'
import { Sprig } from './Decor'
import { Haken, PfeilLinks, PfeilRechts } from './icons'
import { decorLayer, eyebrowAmber, wrap } from './styles'

// AKT 8 · TERMIN (Funnel-Ende)
// Optik 1:1 aus dem Design; gebucht wird über den bestehenden Magicline-Proxy
// (/api/trialsession) – deshalb fragt Schritt 2/3 zusätzlich die Felder ab, die
// Magicline für eine Buchung verlangt (Geschlecht, Geburtsdatum, Anschrift).

const ZIELE = [
  'Kraft & Muskeln aufbauen',
  'Beweglichkeit & Balance',
  'Rücken & Gelenke',
  'Gesund & selbstständig bleiben',
  'Wiedereinstieg nach langer Pause',
]

const zellBasis: CSSProperties = {
  appearance: 'none',
  font: 'inherit',
  fontSize: 17,
  fontWeight: 500,
  minHeight: 48,
  borderRadius: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'border-color .25s,background .25s',
}

const slotBasis: CSSProperties = {
  appearance: 'none',
  font: 'inherit',
  fontSize: 17,
  fontWeight: 500,
  minHeight: 52,
  borderRadius: 999,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'border-color .25s,background .25s',
}

const navBtn: CSSProperties = {
  appearance: 'none',
  border: '1px solid var(--line-dark)',
  background: 'transparent',
  color: '#fff',
  width: 42,
  height: 42,
  borderRadius: '50%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}

const feldGruppe: CSSProperties = {
  display: 'grid',
  gap: 'clamp(1rem,2vw,1.6rem)',
  gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))',
}

function chipStil(aktiv: boolean, fertig: boolean): CSSProperties {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 'none',
    width: 34,
    height: 34,
    borderRadius: '50%',
    fontSize: 16,
    fontWeight: 700,
    ...(fertig
      ? { background: '#fff', color: '#04161b' }
      : aktiv
        ? { background: 'var(--amber)', color: '#04161b' }
        : { background: 'transparent', color: 'rgba(255,255,255,.5)', border: '1px solid var(--line-dark)' }),
  }
}

const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

const lang = (datum: string) =>
  new Date(datum + 'T00:00:00').toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })

export function TerminSection() {
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

  // Freie Termine des angezeigten Monats nachladen (Magicline-Proxy).
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
  const terminText = datum && slot ? `${lang(datum)} · ${formatTime(slot.startDateTime)} Uhr` : 'Noch kein Termin gewählt'

  const schrittGueltig = (n: number) => {
    if (n === 1) return !!(datum && slot)
    if (n === 2 && !geschlecht) {
      setFehler('Bitte wähle deine Anrede aus.')
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

  const absenden = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
      }
    } catch {
      setFehler('Verbindungsfehler. Bitte versuche es erneut.')
    } finally {
      setSendet(false)
    }
  }

  // ─── Kalenderraster ──────────────────────────────────────────────────────
  const monatLabel = basis.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })
  const ersterWt = (basis.getDay() + 6) % 7
  const anzahlTage = new Date(basis.getFullYear(), basis.getMonth() + 1, 0).getDate()

  const zellen: { key: string; label: string; aus: boolean; iso?: string }[] = []
  for (let i = 0; i < ersterWt; i++) zellen.push({ key: `l${i}`, label: '', aus: true })
  for (let d = 1; d <= anzahlTage; d++) {
    const dt = new Date(basis.getFullYear(), basis.getMonth(), d)
    const k = iso(dt)
    zellen.push({ key: k, label: String(d), aus: dt < heute || !slotsProTag[k], iso: k })
  }

  return (
    <section
      id="termin"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--ink)',
        color: '#fff',
        padding: 'clamp(6rem,13vw,11rem) 0',
        scrollMarginTop: 64,
      }}
    >
      <Sprig
        style={{
          right: '3%',
          top: '12%',
          width: 'clamp(80px,8vw,126px)',
          height: 'clamp(112px,11vw,176px)',
          transform: 'rotate(14deg)',
        }}
        strokeOpacity=".24"
      />
      <div
        aria-hidden="true"
        style={{
          ...decorLayer,
          left: '6%',
          bottom: '10%',
          width: 'clamp(56px,5.4vw,84px)',
          height: 'clamp(56px,5.4vw,84px)',
        }}
      >
        <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none" stroke="var(--amber)" strokeWidth="2.4" strokeOpacity=".2">
          <circle cx="50" cy="50" r="44" />
          <path d="M50 6 C28 28 28 72 50 94" />
          <path d="M50 6 C72 28 72 72 50 94" />
          <path d="M6 50 C28 38 72 38 94 50" />
        </svg>
      </div>
      <div
        aria-hidden="true"
        style={{ ...decorLayer, left: '-16%', top: '8%', width: 'min(64vw,620px)', height: 'min(64vw,620px)' }}
      >
        <svg viewBox="0 0 620 620" width="100%" height="100%" fill="none" stroke="var(--amber)" strokeWidth="1.5">
          <circle cx="310" cy="310" r="306" strokeOpacity=".15" />
          <circle cx="310" cy="310" r="228" strokeOpacity=".19" />
          <circle cx="310" cy="310" r="150" strokeOpacity=".21" />
          <circle cx="310" cy="310" r="72" strokeOpacity=".25" />
        </svg>
      </div>

      <div style={wrap}>
        <div style={{ textAlign: 'center', maxWidth: '24ch', margin: '0 auto clamp(2.5rem,5vw,4rem)' }}>
          <span data-reveal="" style={eyebrowAmber}>Probetraining</span>
          <h2
            data-reveal=""
            style={{
              fontSize: 'clamp(36px,6vw,84px)',
              lineHeight: .99,
              letterSpacing: '-.04em',
              fontWeight: 800,
              margin: '.25em 0 0',
            }}
          >
            Der erste Schritt.
          </h2>
          <p
            data-reveal=""
            style={{ fontSize: 'clamp(19px,1.9vw,23px)', fontWeight: 300, color: 'rgba(255,255,255,.66)', margin: '1em 0 0' }}
          >
            Kostenlos, unverbindlich, in deinem Tempo.
          </p>
        </div>

        <form
          ref={formRef}
          onSubmit={absenden}
          // Geprüft wird schrittweise über `schrittGueltig` – die native
          // Gesamtprüfung würde über die ausgeblendeten Pflichtfelder der
          // anderen Schritte stolpern und das Absenden blockieren.
          noValidate
          style={{
            border: '1px solid var(--line-dark)',
            borderRadius: 24,
            padding: 'clamp(1.5rem,4vw,3.2rem)',
            display: 'grid',
            gap: 'clamp(1.8rem,3.5vw,2.6rem)',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '.5em' }}>
            {[
              { nr: 1, label: 'Termin' },
              { nr: 2, label: 'Kontakt' },
              { nr: 3, label: 'Bestätigen' },
            ].map(s => (
              <div key={s.nr} style={{ display: 'flex', alignItems: 'center', gap: '.6em', minWidth: 0 }}>
                <span style={chipStil(schritt >= s.nr, schritt > s.nr)}>{s.nr}</span>
                <span style={{ fontSize: 16, fontWeight: 500, color: 'rgba(255,255,255,.8)' }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* ─── Schritt 1 · Termin ─────────────────────────────────────── */}
          <div data-step="1" style={{ display: schritt === 1 ? 'block' : 'none' }}>
            <div
              style={{
                display: 'grid',
                gap: 'clamp(1.5rem,3vw,2.5rem)',
                gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,270px),1fr))',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '.6em', marginBottom: '1.2em' }}>
                  <button
                    type="button"
                    className="kal-nav"
                    onClick={() => setMonatOffset(o => Math.max(0, o - 1))}
                    aria-label="Vorheriger Monat"
                    style={{ ...navBtn, ...(monatOffset <= 0 ? { opacity: .35, pointerEvents: 'none' } : null) }}
                  >
                    <PfeilLinks />
                  </button>
                  <span style={{ fontSize: 19, fontWeight: 600, letterSpacing: '-.01em' }}>{monatLabel}</span>
                  <button
                    type="button"
                    className="kal-nav"
                    onClick={() => setMonatOffset(o => o + 1)}
                    aria-label="Nächster Monat"
                    style={navBtn}
                  >
                    <PfeilRechts />
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4, marginBottom: 8 }}>
                  {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(t => (
                    <span key={t} style={{ textAlign: 'center', fontSize: 13.5, fontWeight: 600, color: 'rgba(255,255,255,.45)' }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4 }}>
                  {zellen.map(z => {
                    if (!z.iso) return <span key={z.key} style={{ ...zellBasis, visibility: 'hidden' }} />
                    const gewaehlt = datum === z.iso
                    return (
                      <button
                        key={z.key}
                        type="button"
                        className="kal-tag"
                        data-aus={z.aus ? '1' : '0'}
                        disabled={z.aus}
                        onClick={() => {
                          setDatum(z.iso!)
                          setSlot(null)
                        }}
                        style={{
                          ...zellBasis,
                          ...(z.aus
                            ? { background: 'transparent', border: '1px solid transparent', color: 'rgba(255,255,255,.22)', cursor: 'not-allowed' }
                            : gewaehlt
                              ? { background: '#fff', border: '1px solid #fff', color: '#04161b', cursor: 'pointer', fontWeight: 700 }
                              : { background: 'transparent', border: '1px solid rgba(255,255,255,.16)', color: '#fff', cursor: 'pointer' }),
                        }}
                      >
                        {z.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <span style={{ display: 'block', fontSize: 19, fontWeight: 600, letterSpacing: '-.01em', marginBottom: '1.2em' }}>
                  {datum ? `Freie Zeiten am ${lang(datum)}` : 'Uhrzeit'}
                </span>

                {tagesSlots.length > 0 ? (
                  <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit,minmax(104px,1fr))' }}>
                    {tagesSlots.map(s => {
                      const aktiv = slot?.startDateTime === s.startDateTime
                      return (
                        <button
                          key={s.startDateTime}
                          type="button"
                          className="kal-slot"
                          onClick={() => setSlot(s)}
                          style={{
                            ...slotBasis,
                            ...(aktiv
                              ? { background: 'var(--amber)', border: '1px solid var(--amber)', color: '#04161b', fontWeight: 700 }
                              : { background: 'transparent', border: '1px solid rgba(255,255,255,.16)', color: '#fff' }),
                          }}
                        >
                          {formatTime(s.startDateTime)}
                        </button>
                      )
                    })}
                  </div>
                ) : (
                  <p style={{ margin: 0, fontSize: 17, fontWeight: 300, lineHeight: 1.6, color: 'rgba(255,255,255,.55)' }}>
                    {ladeFehler
                      ? 'Die freien Zeiten lassen sich gerade nicht laden. Ruf uns gerne an – wir finden einen Termin für dich.'
                      : ladend
                        ? 'Freie Zeiten werden geladen …'
                        : datum
                          ? 'An diesem Tag ist online nichts mehr frei. Wähle einen anderen Tag oder ruf uns an.'
                          : 'Wähle links einen Tag – dann erscheinen die freien Uhrzeiten. Probetermine gibt es Montag bis Samstag.'}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ─── Schritt 2 · Kontakt ────────────────────────────────────── */}
          <div data-step="2" style={{ display: schritt === 2 ? 'block' : 'none' }}>
            <div style={{ display: 'grid', gap: 'clamp(1rem,2vw,1.6rem)' }}>
              <span style={{ fontSize: 16.5, color: 'var(--amber)', fontWeight: 600 }}>{terminText}</span>

              <div style={feldGruppe}>
                <input className="pinput" name="vorname" type="text" required autoComplete="given-name" placeholder="Vorname *" />
                <input className="pinput" name="nachname" type="text" required autoComplete="family-name" placeholder="Nachname *" />
              </div>
              <div style={feldGruppe}>
                <input className="pinput" name="email" type="email" required autoComplete="email" placeholder="E-Mail *" />
                <input className="pinput" name="telefon" type="tel" required autoComplete="tel" placeholder="Telefon *" />
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginTop: '.4em' }}>
                <span style={{ fontSize: 16.5, fontWeight: 300, color: 'rgba(255,255,255,.6)' }}>Anrede *</span>
                {([['FEMALE', 'Frau'], ['MALE', 'Herr']] as const).map(([wert, label]) => (
                  <button
                    key={wert}
                    type="button"
                    onClick={() => { setGeschlecht(wert); setFehler(null) }}
                    style={{
                      appearance: 'none',
                      font: 'inherit',
                      fontSize: 17,
                      fontWeight: geschlecht === wert ? 700 : 500,
                      padding: '.7em 1.6em',
                      borderRadius: 999,
                      cursor: 'pointer',
                      transition: 'border-color .25s,background .25s',
                      ...(geschlecht === wert
                        ? { background: 'var(--amber)', border: '1px solid var(--amber)', color: '#04161b' }
                        : { background: 'transparent', border: '1px solid var(--line-dark)', color: '#fff' }),
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div>
                <span style={{ display: 'block', fontSize: 16.5, fontWeight: 300, color: 'rgba(255,255,255,.6)', marginBottom: '.2em' }}>
                  Geburtsdatum *
                </span>
                <div style={{ display: 'grid', gap: 'clamp(1rem,2vw,1.6rem)', gridTemplateColumns: 'repeat(3,1fr)' }}>
                  <select className="pinput" name="gebTag" required defaultValue="" aria-label="Geburtstag">
                    <option value="" disabled>Tag</option>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <select className="pinput" name="gebMonat" required defaultValue="" aria-label="Geburtsmonat">
                    <option value="" disabled>Monat</option>
                    {['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
                      .map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                  </select>
                  <select className="pinput" name="gebJahr" required defaultValue="" aria-label="Geburtsjahr">
                    <option value="" disabled>Jahr</option>
                    {Array.from({ length: 84 }, (_, i) => new Date().getFullYear() - 16 - i).map(j => (
                      <option key={j} value={j}>{j}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Schritt 3 · Bestätigen ─────────────────────────────────── */}
          <div data-step="3" style={{ display: schritt === 3 ? 'block' : 'none' }}>
            <div style={{ display: 'grid', gap: 'clamp(1.2rem,2.4vw,1.8rem)' }}>
              <span style={{ fontSize: 16.5, color: 'var(--amber)', fontWeight: 600 }}>{terminText}</span>

              <div style={{ display: 'grid', gap: 'clamp(1rem,2vw,1.6rem)', gridTemplateColumns: 'minmax(0,3fr) minmax(0,1fr)' }}>
                <input className="pinput" name="strasse" type="text" required autoComplete="address-line1" placeholder="Straße *" />
                <input className="pinput" name="hausnummer" type="text" required placeholder="Nr. *" />
              </div>
              <div style={{ display: 'grid', gap: 'clamp(1rem,2vw,1.6rem)', gridTemplateColumns: 'minmax(0,1fr) minmax(0,2fr)' }}>
                <input className="pinput" name="plz" type="text" required autoComplete="postal-code" placeholder="PLZ *" />
                <input className="pinput" name="ort" type="text" required autoComplete="address-level2" placeholder="Ort *" />
              </div>

              <select className="pinput" name="ziel" defaultValue="">
                <option value="">Dein Ziel (optional)</option>
                {ZIELE.map(z => <option key={z} value={z}>{z}</option>)}
              </select>

              <textarea
                className="pinput"
                name="nachricht"
                rows={2}
                placeholder="Sollen wir vorab etwas wissen? (optional)"
                style={{ resize: 'vertical' }}
              />

              <label
                style={{
                  display: 'flex',
                  gap: '.9em',
                  alignItems: 'flex-start',
                  cursor: 'pointer',
                  fontSize: 16.5,
                  fontWeight: 300,
                  lineHeight: 1.55,
                  color: 'rgba(255,255,255,.8)',
                }}
              >
                <input
                  type="checkbox"
                  name="datenschutz"
                  required
                  style={{ width: 22, height: 22, flex: 'none', marginTop: '.1em', accentColor: 'var(--amber)' }}
                />
                <span>Ich bin mit der Verarbeitung meiner Daten zur Terminvereinbarung einverstanden. *</span>
              </label>
            </div>
          </div>

          {/* ─── Steuerung ──────────────────────────────────────────────── */}
          {!gesendet && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
              {schritt > 1 && (
                <button
                  type="button"
                  onClick={() => setSchritt(s => Math.max(1, s - 1))}
                  style={{
                    border: '1px solid var(--line-dark)',
                    background: 'transparent',
                    color: '#fff',
                    font: 'inherit',
                    fontSize: 17,
                    fontWeight: 500,
                    padding: '1em 1.9em',
                    borderRadius: 999,
                    cursor: 'pointer',
                  }}
                >
                  Zurück
                </button>
              )}

              {schritt < 3 ? (
                <button
                  key="weiter"
                  type="button"
                  className="lift"
                  onClick={() => { if (schrittGueltig(schritt)) setSchritt(s => s + 1) }}
                  disabled={schritt === 1 && !slot}
                  style={{
                    border: 0,
                    background: 'var(--amber)',
                    color: '#04161b',
                    font: 'inherit',
                    fontSize: 18,
                    fontWeight: 700,
                    padding: '1.05em 2.2em',
                    borderRadius: 999,
                    cursor: schritt === 1 && !slot ? 'not-allowed' : 'pointer',
                    opacity: schritt === 1 && !slot ? .45 : 1,
                    flex: 1,
                    minWidth: 220,
                  }}
                >
                  {schritt === 1 ? 'Weiter' : 'Weiter zur Bestätigung'}
                </button>
              ) : (
                <button
                  key="absenden"
                  type="submit"
                  className="lift"
                  disabled={sendet}
                  style={{
                    border: 0,
                    background: 'var(--amber)',
                    color: '#04161b',
                    font: 'inherit',
                    fontSize: 18,
                    fontWeight: 700,
                    padding: '1.05em 2.2em',
                    borderRadius: 999,
                    cursor: sendet ? 'progress' : 'pointer',
                    opacity: sendet ? .6 : 1,
                    flex: 1,
                    minWidth: 220,
                  }}
                >
                  {sendet ? 'Wird gesendet …' : 'Termin anfragen'}
                </button>
              )}

              <span style={{ fontSize: 16, color: 'rgba(255,255,255,.5)' }}>
                oder{' '}
                <a href={`tel:${aktion.telefon.link}`} style={{ color: '#fff' }}>{aktion.telefon.anzeige}</a>
              </span>
            </div>
          )}

          {fehler && !gesendet && (
            <div
              style={{
                display: 'flex',
                gap: '.9em',
                alignItems: 'flex-start',
                border: '1px solid rgba(255,255,255,.3)',
                borderRadius: 16,
                padding: '1.2em 1.4em',
              }}
            >
              <span style={{ fontSize: 17, lineHeight: 1.6, fontWeight: 300, color: 'rgba(255,255,255,.9)' }}>
                {fehler} Ruf uns gerne an:{' '}
                <a href={`tel:${aktion.telefon.link}`} style={{ color: '#fff', fontWeight: 600 }}>
                  {aktion.telefon.anzeige}
                </a>
              </span>
            </div>
          )}

          {gesendet && (
            <div
              style={{
                display: 'flex',
                gap: '.9em',
                alignItems: 'flex-start',
                border: '1px solid var(--amber)',
                borderRadius: 16,
                padding: '1.2em 1.4em',
              }}
            >
              <span style={{ color: 'var(--amber)', flex: 'none', marginTop: '.15em', display: 'inline-flex' }}>
                <Haken size={22} strokeWidth={2.2} />
              </span>
              <span style={{ fontSize: 17, lineHeight: 1.6, fontWeight: 300, color: 'rgba(255,255,255,.9)' }}>
                Danke. Wir haben deine Anfrage für <span style={{ fontWeight: 600, color: '#fff' }}>{terminText}</span>{' '}
                notiert und melden uns zur Bestätigung.
              </span>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
