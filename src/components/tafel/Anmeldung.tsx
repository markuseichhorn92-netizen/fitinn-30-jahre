'use client'

import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { meldeBuchung } from '@/components/GoogleTag'
import { formatTime, toLocalDateKey, type Slot } from '@/lib/booking'
import { aktion } from './inhalt'
import { Absatz, Platte, schluessel, Titel } from './teile'

// TAFEL VIII — der Aufnahmebogen.
// Bucht echt: derselbe Magicline-Proxy (/api/trialsession) wie die Startseite.
// Deshalb fragt der Bogen alles ab, was Magicline zwingend verlangt –
// Anrede, Geburtsdatum und vollständige Anschrift.

const RUSS = '#17191c'
const ZINNOBER = '#c4402b'
const LINIE = 'rgba(23,25,28,.2)'

const ZIELE = [
  'Kraft & Muskeln aufbauen',
  'Beweglichkeit & Balance',
  'Rücken & Gelenke',
  'Gesund & selbstständig bleiben',
  'Wiedereinstieg nach langer Pause',
]

const SCHRITTE = [
  { nr: '01', label: 'Termin' },
  { nr: '02', label: 'Person' },
  { nr: '03', label: 'Anschrift' },
]

const paar: CSSProperties = {
  display: 'grid',
  gap: 'clamp(1rem,2vw,1.6rem)',
  gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))',
}

const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

const lang = (datum: string) =>
  new Date(datum + 'T00:00:00').toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })

/** Beschriftete Zeile – auf einem Bogen steht über jedem Feld, was hineingehört. */
function Zeile({ label, kind }: { label: string; kind: React.ReactNode }) {
  return (
    <label style={{ display: 'block' }}>
      <span style={{ ...schluessel, display: 'block', color: 'var(--matt-papier)', marginBottom: '.2em' }}>
        {label}
      </span>
      {kind}
    </label>
  )
}

export function Anmeldung() {
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
  const terminText = datum && slot ? `${lang(datum)}, ${formatTime(slot.startDateTime)} Uhr` : null

  const schrittGueltig = (n: number) => {
    if (n === 1) return !!(datum && slot)
    if (n === 2 && !geschlecht) {
      setFehler('Bitte wähle die Anrede – Magicline braucht sie für die Buchung.')
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

  const zellen: { key: string; label: string; aus: boolean; iso?: string }[] = []
  for (let i = 0; i < ersterWt; i++) zellen.push({ key: `l${i}`, label: '', aus: true })
  for (let d = 1; d <= anzahlTage; d++) {
    const dt = new Date(basis.getFullYear(), basis.getMonth(), d)
    const k = iso(dt)
    zellen.push({ key: k, label: String(d), aus: dt < heute || !slotsProTag[k], iso: k })
  }

  return (
    <Platte id="termin" tafel="Tafel VIII · Der Aufnahmebogen" kind={
      <>
        <div
          style={{
            display: 'grid',
            gap: 'clamp(1.2rem,4vw,3.5rem)',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))',
            alignItems: 'end',
          }}
        >
          <Titel kind={<>Einmal vorbeikommen.</>} />
          <Absatz kind={<>Kostenlos und unverbindlich. Du siehst dir alles an, stellst deine Fragen und gehst wieder – oder bleibst.</>} />
        </div>

        <form
          ref={formRef}
          onSubmit={absenden}
          // Geprüft wird schrittweise; die native Gesamtprüfung würde über die
          // ausgeblendeten Pflichtfelder der anderen Schritte stolpern.
          noValidate
          style={{ marginTop: 'clamp(1.8rem,3.5vw,2.6rem)' }}
        >
          {/* Fortschritt – hier trägt die Nummerierung Information */}
          <ol
            style={{
              listStyle: 'none',
              display: 'grid',
              gridTemplateColumns: 'repeat(3,1fr)',
              gap: 'clamp(.5rem,1.5vw,1.2rem)',
              margin: '0 0 clamp(1.8rem,3.5vw,2.6rem)',
              padding: 0,
            }}
          >
            {SCHRITTE.map((s, i) => {
              const jetzt = schritt === i + 1
              const fertig = schritt > i + 1
              return (
                <li
                  key={s.nr}
                  aria-current={jetzt ? 'step' : undefined}
                  style={{
                    borderTop: `3px solid ${jetzt || fertig ? ZINNOBER : LINIE}`,
                    paddingTop: '.7em',
                    display: 'flex',
                    gap: '.6em',
                    alignItems: 'baseline',
                    minWidth: 0,
                  }}
                >
                  <span style={{ ...schluessel, color: jetzt || fertig ? ZINNOBER : 'var(--matt-papier)' }}>{s.nr}</span>
                  <span
                    style={{
                      fontSize: 16.5,
                      fontWeight: jetzt ? 700 : 400,
                      color: jetzt || fertig ? RUSS : 'var(--matt-papier)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {s.label}
                  </span>
                </li>
              )
            })}
          </ol>

          {/* ─── 01 · Termin ────────────────────────────────────────────── */}
          <div data-step="1" style={{ display: schritt === 1 ? 'block' : 'none' }}>
            <div
              style={{
                display: 'grid',
                gap: 'clamp(1.5rem,3.5vw,3rem)',
                gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '.6em', marginBottom: '1em' }}>
                  <button
                    type="button"
                    onClick={() => setMonatOffset(o => Math.max(0, o - 1))}
                    aria-label="Vorheriger Monat"
                    disabled={monatOffset <= 0}
                    style={{
                      appearance: 'none', width: 46, height: 46, border: `1px solid ${LINIE}`, borderRadius: 2,
                      background: 'transparent', color: RUSS, cursor: monatOffset <= 0 ? 'not-allowed' : 'pointer',
                      opacity: monatOffset <= 0 ? .35 : 1,
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" style={{ margin: '0 auto', display: 'block' }}>
                      <path d="M10 2 L4 8 L10 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <span style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-.02em' }}>{monatLabel}</span>
                  <button
                    type="button"
                    onClick={() => setMonatOffset(o => o + 1)}
                    aria-label="Nächster Monat"
                    style={{
                      appearance: 'none', width: 46, height: 46, border: `1px solid ${LINIE}`, borderRadius: 2,
                      background: 'transparent', color: RUSS, cursor: 'pointer',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" style={{ margin: '0 auto', display: 'block' }}>
                      <path d="M6 2 L12 8 L6 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2, marginBottom: 6 }}>
                  {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(t => (
                    <span key={t} style={{ ...schluessel, textAlign: 'center', color: 'var(--matt-papier)' }}>{t}</span>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2 }}>
                  {zellen.map(z => {
                    if (!z.iso) return <span key={z.key} />
                    const gewaehlt = datum === z.iso
                    return (
                      <button
                        key={z.key}
                        type="button"
                        className="tf-tag tf-zahl"
                        disabled={z.aus}
                        onClick={() => { setDatum(z.iso!); setSlot(null) }}
                        style={{
                          minHeight: 46,
                          fontSize: 17,
                          border: `1px solid ${gewaehlt ? ZINNOBER : z.aus ? 'transparent' : LINIE}`,
                          background: gewaehlt ? ZINNOBER : 'transparent',
                          color: gewaehlt ? 'var(--knochen)' : z.aus ? 'rgba(23,25,28,.28)' : RUSS,
                          fontWeight: gewaehlt ? 700 : 400,
                          cursor: z.aus ? 'not-allowed' : 'pointer',
                        }}
                      >
                        {z.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <p style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-.02em', marginBottom: '1em' }}>
                  {datum ? `Freie Zeiten am ${lang(datum)}` : 'Uhrzeit'}
                </p>
                {tagesSlots.length > 0 ? (
                  <div style={{ display: 'grid', gap: 6, gridTemplateColumns: 'repeat(auto-fit,minmax(100px,1fr))' }}>
                    {tagesSlots.map(s => {
                      const an = slot?.startDateTime === s.startDateTime
                      return (
                        <button
                          key={s.startDateTime}
                          type="button"
                          className="tf-zeit tf-zahl"
                          onClick={() => setSlot(s)}
                          style={{
                            minHeight: 50,
                            fontSize: 17,
                            cursor: 'pointer',
                            border: `1px solid ${an ? ZINNOBER : LINIE}`,
                            background: an ? ZINNOBER : 'transparent',
                            color: an ? 'var(--knochen)' : RUSS,
                            fontWeight: an ? 700 : 400,
                          }}
                        >
                          {formatTime(s.startDateTime)}
                        </button>
                      )
                    })}
                  </div>
                ) : (
                  <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--matt-papier)', maxWidth: '42ch' }}>
                    {ladeFehler
                      ? 'Die freien Zeiten lassen sich gerade nicht laden. Ruf uns an, wir finden einen Termin.'
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

          {/* ─── 02 · Person ────────────────────────────────────────────── */}
          <div data-step="2" style={{ display: schritt === 2 ? 'block' : 'none' }}>
            <div style={{ display: 'grid', gap: 'clamp(1.1rem,2.2vw,1.7rem)' }}>
              <div style={paar}>
                <Zeile label="Vorname" kind={<input className="tf-feld" name="vorname" type="text" required autoComplete="given-name" />} />
                <Zeile label="Nachname" kind={<input className="tf-feld" name="nachname" type="text" required autoComplete="family-name" />} />
              </div>
              <div style={paar}>
                <Zeile label="E-Mail" kind={<input className="tf-feld" name="email" type="email" required autoComplete="email" />} />
                <Zeile label="Telefon" kind={<input className="tf-feld" name="telefon" type="tel" required autoComplete="tel" />} />
              </div>

              <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
                <legend style={{ ...schluessel, color: 'var(--matt-papier)', padding: 0, marginBottom: '.5em' }}>Anrede</legend>
                <div style={{ display: 'flex', gap: 8 }}>
                  {([['FEMALE', 'Frau'], ['MALE', 'Herr']] as const).map(([wert, label]) => (
                    <button
                      key={wert}
                      type="button"
                      onClick={() => { setGeschlecht(wert); setFehler(null) }}
                      aria-pressed={geschlecht === wert}
                      style={{
                        appearance: 'none', font: 'inherit', fontSize: 17, minHeight: 48, padding: '0 1.6em',
                        borderRadius: 2, cursor: 'pointer',
                        border: `1px solid ${geschlecht === wert ? ZINNOBER : LINIE}`,
                        background: geschlecht === wert ? ZINNOBER : 'transparent',
                        color: geschlecht === wert ? 'var(--knochen)' : RUSS,
                        fontWeight: geschlecht === wert ? 700 : 400,
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
                <legend style={{ ...schluessel, color: 'var(--matt-papier)', padding: 0, marginBottom: '.2em' }}>Geburtsdatum</legend>
                <div style={{ display: 'grid', gap: 'clamp(.7rem,1.6vw,1.2rem)', gridTemplateColumns: 'repeat(3,1fr)' }}>
                  <select className="tf-feld" name="gebTag" required defaultValue="" aria-label="Geburtstag">
                    <option value="" disabled>Tag</option>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <select className="tf-feld" name="gebMonat" required defaultValue="" aria-label="Geburtsmonat">
                    <option value="" disabled>Monat</option>
                    {['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
                      .map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                  </select>
                  <select className="tf-feld" name="gebJahr" required defaultValue="" aria-label="Geburtsjahr">
                    <option value="" disabled>Jahr</option>
                    {Array.from({ length: 84 }, (_, i) => new Date().getFullYear() - 16 - i).map(j => (
                      <option key={j} value={j}>{j}</option>
                    ))}
                  </select>
                </div>
              </fieldset>
            </div>
          </div>

          {/* ─── 03 · Anschrift ─────────────────────────────────────────── */}
          <div data-step="3" style={{ display: schritt === 3 ? 'block' : 'none' }}>
            <div style={{ display: 'grid', gap: 'clamp(1.1rem,2.2vw,1.7rem)' }}>
              <div style={{ display: 'grid', gap: 'clamp(1rem,2vw,1.6rem)', gridTemplateColumns: 'minmax(0,3fr) minmax(0,1fr)' }}>
                <Zeile label="Straße" kind={<input className="tf-feld" name="strasse" type="text" required autoComplete="address-line1" />} />
                <Zeile label="Nr." kind={<input className="tf-feld" name="hausnummer" type="text" required />} />
              </div>
              <div style={{ display: 'grid', gap: 'clamp(1rem,2vw,1.6rem)', gridTemplateColumns: 'minmax(0,1fr) minmax(0,2fr)' }}>
                <Zeile label="PLZ" kind={<input className="tf-feld" name="plz" type="text" required autoComplete="postal-code" inputMode="numeric" />} />
                <Zeile label="Ort" kind={<input className="tf-feld" name="ort" type="text" required autoComplete="address-level2" />} />
              </div>
              <Zeile
                label="Dein Ziel (freiwillig)"
                kind={
                  <select className="tf-feld" name="ziel" defaultValue="">
                    <option value="">Keine Angabe</option>
                    {ZIELE.map(z => <option key={z} value={z}>{z}</option>)}
                  </select>
                }
              />
              <Zeile
                label="Sollen wir vorab etwas wissen? (freiwillig)"
                kind={<textarea className="tf-feld" name="nachricht" rows={2} style={{ resize: 'vertical' }} />}
              />

              <label style={{ display: 'flex', gap: '.85em', alignItems: 'flex-start', cursor: 'pointer', fontSize: 17, lineHeight: 1.55 }}>
                <input
                  type="checkbox"
                  name="datenschutz"
                  required
                  style={{ width: 22, height: 22, flex: 'none', marginTop: '.15em', accentColor: ZINNOBER }}
                />
                <span>Ich bin mit der Verarbeitung meiner Daten zur Terminvereinbarung einverstanden.</span>
              </label>
            </div>
          </div>

          {/* ─── Steuerung ──────────────────────────────────────────────── */}
          {terminText && !gesendet && (
            <p style={{ ...schluessel, color: ZINNOBER, marginTop: 'clamp(1.4rem,2.6vw,2rem)' }}>
              Gewählt: {terminText}
            </p>
          )}

          {!gesendet && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 12,
                alignItems: 'center',
                marginTop: terminText ? '.7rem' : 'clamp(1.6rem,3vw,2.4rem)',
                paddingTop: 'clamp(1.4rem,2.6vw,2rem)',
                borderTop: `1px solid ${LINIE}`,
              }}
            >
              {schritt > 1 && (
                <button
                  type="button"
                  onClick={() => setSchritt(s => Math.max(1, s - 1))}
                  className="tf-knopf"
                  style={{ background: 'transparent', color: RUSS, border: `1.5px solid ${LINIE}` }}
                >
                  Zurück
                </button>
              )}

              {schritt < 3 ? (
                <button
                  key="weiter"
                  type="button"
                  className="tf-knopf"
                  onClick={() => { if (schrittGueltig(schritt)) setSchritt(s => s + 1) }}
                  disabled={schritt === 1 && !slot}
                  style={{ flex: 1, minWidth: 220 }}
                >
                  {schritt === 1 ? 'Weiter' : 'Weiter zur Anschrift'}
                </button>
              ) : (
                <button key="absenden" type="submit" className="tf-knopf" disabled={sendet} style={{ flex: 1, minWidth: 220 }}>
                  {sendet ? 'Wird gesendet …' : 'Termin verbindlich anfragen'}
                </button>
              )}

              <span style={{ fontSize: 16.5, color: 'var(--matt-papier)' }}>
                oder anrufen:{' '}
                <a href={`tel:${aktion.telefon.link}`} className="tf-ziel" style={{ color: 'var(--zinnober-tief)', fontWeight: 600 }}>
                  {aktion.telefon.anzeige}
                </a>
              </span>
            </div>
          )}

          {fehler && !gesendet && (
            <p
              role="alert"
              style={{
                marginTop: '1.2rem',
                padding: '1em 1.2em',
                border: `1.5px solid ${ZINNOBER}`,
                fontSize: 17,
                lineHeight: 1.6,
              }}
            >
              {fehler} Ruf uns gerne an:{' '}
              <a href={`tel:${aktion.telefon.link}`} style={{ color: 'var(--zinnober-tief)', fontWeight: 600 }}>
                {aktion.telefon.anzeige}
              </a>
            </p>
          )}

          {gesendet && (
            <div
              role="status"
              style={{
                marginTop: 'clamp(1.6rem,3vw,2.4rem)',
                padding: 'clamp(1.2rem,2.5vw,1.8rem)',
                border: `2px solid ${ZINNOBER}`,
                display: 'flex',
                gap: '1em',
                alignItems: 'flex-start',
              }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flex: 'none', marginTop: '.15em' }}>
                <path d="M4 12.5 L9.5 18 L20 6.5" stroke={ZINNOBER} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p style={{ fontSize: 17.5, lineHeight: 1.6 }}>
                Notiert. Dein Probetraining am <strong>{terminText}</strong> liegt in unserem Kalender – wir melden
                uns zur Bestätigung.
              </p>
            </div>
          )}
        </form>
      </>
    } />
  )
}
