'use client'

import type { CSSProperties } from 'react'
import { formatTime } from '@/lib/booking'
import { aktion, termin } from '@/components/kampagne/inhalt'
import { langesDatum, MONATE, useBuchung, WOCHENTAGE, ZIELE } from '@/components/kampagne/useBuchung'

// Der Terminbogen in der tiefen Welt: eine große Glasebene über der Farbe.
// Die Logik kommt aus useBuchung, gebucht wird echt.

const paar: CSSProperties = {
  display: 'grid',
  gap: 'clamp(.9rem,1.8vw,1.4rem)',
  gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))',
}

const beschriftung: CSSProperties = {
  display: 'block', fontSize: 12.5, letterSpacing: '.18em', textTransform: 'uppercase',
  color: 'var(--matt)', marginBottom: '.45em', fontWeight: 600,
}

function Zeile({ label, kind }: { label: string; kind: React.ReactNode }) {
  return (
    <label style={{ display: 'block' }}>
      <span style={beschriftung}>{label}</span>
      {kind}
    </label>
  )
}

export function Formular() {
  // Einzeln entnommen statt über ein Objekt: der Linter kann sonst nicht
  // erkennen, dass `formRef` eine Referenz ist, und meldet einen Zugriff
  // während des Renderns.
  const {
    schritt, weiter, zurueck, monatOffset, setMonatOffset, monatLabel, zellen,
    datum, setDatum, slot, setSlot, tagesSlots, terminText, zeitHinweis,
    geschlecht, setGeschlecht, sendet, fehler, setFehler, gesendet,
    formRef, absenden, jahre,
  } = useBuchung()

  return (
    <form
      ref={formRef}
      onSubmit={absenden}
      noValidate
      className="tc-glas tc-glas--hoch"
      style={{ borderRadius: 26, padding: 'clamp(1.3rem,3.5vw,3.2rem)' }}
    >
      <ol
        style={{
          listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
          gap: 'clamp(.5rem,1.5vw,1.2rem)', margin: '0 0 clamp(1.8rem,3.5vw,2.6rem)', padding: 0,
        }}
      >
        {termin.schritte.map((s, i) => {
          const jetzt = schritt === i + 1
          const fertig = schritt > i + 1
          return (
            <li
              key={s.nr}
              aria-current={jetzt ? 'step' : undefined}
              style={{
                display: 'flex', gap: '.6em', alignItems: 'center', minWidth: 0,
                padding: '.7em .9em', borderRadius: 999,
                background: jetzt ? 'rgba(229,176,75,.16)' : 'transparent',
                border: `1px solid ${jetzt || fertig ? 'rgba(229,176,75,.42)' : 'var(--kante)'}`,
              }}
            >
              <span className="tc-zahl" style={{ fontSize: 12.5, letterSpacing: '.12em', fontWeight: 700, color: jetzt || fertig ? 'var(--gold)' : 'var(--matt)' }}>
                {s.nr}
              </span>
              <span style={{ fontSize: 15.5, fontWeight: jetzt ? 700 : 400, color: jetzt || fertig ? 'var(--hell)' : 'var(--matt)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {s.label}
              </span>
            </li>
          )
        })}
      </ol>

      {/* ─── 01 · Termin ───────────────────────────────────────────────── */}
      <div data-step="1" style={{ display: schritt === 1 ? 'block' : 'none' }}>
        <div style={{ display: 'grid', gap: 'clamp(1.6rem,3.5vw,3rem)', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '.6em', marginBottom: '1.1em' }}>
              <button
                type="button"
                onClick={() => setMonatOffset(o => Math.max(0, o - 1))}
                disabled={monatOffset <= 0}
                aria-label="Vorheriger Monat"
                style={{
                  appearance: 'none', width: 46, height: 46, borderRadius: 999, cursor: monatOffset <= 0 ? 'not-allowed' : 'pointer',
                  border: '1px solid var(--kante)', background: 'transparent', color: 'var(--hell)', opacity: monatOffset <= 0 ? .35 : 1,
                }}
              >
                <svg width="15" height="15" viewBox="0 0 16 16" style={{ margin: '0 auto', display: 'block' }} aria-hidden="true">
                  <path d="M10 2 L4 8 L10 14" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span style={{ fontSize: 19, fontWeight: 700, fontFamily: 'var(--anzeige)', letterSpacing: '-.02em' }}>{monatLabel}</span>
              <button
                type="button"
                onClick={() => setMonatOffset(o => o + 1)}
                aria-label="Nächster Monat"
                style={{
                  appearance: 'none', width: 46, height: 46, borderRadius: 999, cursor: 'pointer',
                  border: '1px solid var(--kante)', background: 'transparent', color: 'var(--hell)',
                }}
              >
                <svg width="15" height="15" viewBox="0 0 16 16" style={{ margin: '0 auto', display: 'block' }} aria-hidden="true">
                  <path d="M6 2 L12 8 L6 14" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4, marginBottom: 7 }}>
              {WOCHENTAGE.map(t => (
                <span key={t} style={{ textAlign: 'center', fontSize: 12, letterSpacing: '.08em', color: 'var(--matt)', fontWeight: 600 }}>{t}</span>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4 }}>
              {zellen.map(z => {
                if (!z.iso) return <span key={z.key} />
                const gewaehlt = datum === z.iso
                return (
                  <button
                    key={z.key}
                    type="button"
                    className="tc-tag tc-zahl"
                    disabled={z.aus}
                    onClick={() => { setDatum(z.iso!); setSlot(null) }}
                    style={{
                      minHeight: 46, fontSize: 16.5,
                      border: `1px solid ${gewaehlt ? 'var(--gold)' : z.aus ? 'transparent' : 'var(--kante)'}`,
                      background: gewaehlt ? 'var(--gold)' : 'transparent',
                      color: gewaehlt ? 'var(--tiefst)' : z.aus ? 'rgba(157,184,179,.35)' : 'var(--hell)',
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
            <p style={{ fontSize: 19, fontWeight: 700, fontFamily: 'var(--anzeige)', letterSpacing: '-.02em', marginBottom: '1.1em' }}>
              {datum ? `Freie Zeiten am ${langesDatum(datum)}` : 'Uhrzeit'}
            </p>
            {tagesSlots.length > 0 ? (
              <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit,minmax(104px,1fr))' }}>
                {tagesSlots.map(s => {
                  const an = slot?.startDateTime === s.startDateTime
                  return (
                    <button
                      key={s.startDateTime}
                      type="button"
                      className="tc-zeit tc-zahl"
                      onClick={() => setSlot(s)}
                      style={{
                        minHeight: 50, fontSize: 16.5, cursor: 'pointer',
                        border: `1px solid ${an ? 'var(--gold)' : 'var(--kante)'}`,
                        background: an ? 'var(--gold)' : 'rgba(2,14,14,.24)',
                        color: an ? 'var(--tiefst)' : 'var(--hell)',
                        fontWeight: an ? 700 : 400,
                      }}
                    >
                      {formatTime(s.startDateTime)}
                    </button>
                  )
                })}
              </div>
            ) : (
              <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--matt)', maxWidth: '42ch' }}>{zeitHinweis}</p>
            )}
          </div>
        </div>
      </div>

      {/* ─── 02 · Person ───────────────────────────────────────────────── */}
      <div data-step="2" style={{ display: schritt === 2 ? 'block' : 'none' }}>
        <div style={{ display: 'grid', gap: 'clamp(1rem,2vw,1.5rem)' }}>
          <div style={paar}>
            <Zeile label="Vorname" kind={<input className="tc-feld" name="vorname" type="text" required autoComplete="given-name" />} />
            <Zeile label="Nachname" kind={<input className="tc-feld" name="nachname" type="text" required autoComplete="family-name" />} />
          </div>
          <div style={paar}>
            <Zeile label="E-Mail" kind={<input className="tc-feld" name="email" type="email" required autoComplete="email" />} />
            <Zeile label="Telefon" kind={<input className="tc-feld" name="telefon" type="tel" required autoComplete="tel" />} />
          </div>

          <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
            <legend style={{ ...beschriftung, padding: 0 }}>Anrede</legend>
            <div style={{ display: 'flex', gap: 8 }}>
              {([['FEMALE', 'Frau'], ['MALE', 'Herr']] as const).map(([wert, label]) => (
                <button
                  key={wert}
                  type="button"
                  onClick={() => { setGeschlecht(wert); setFehler(null) }}
                  aria-pressed={geschlecht === wert}
                  style={{
                    appearance: 'none', font: 'inherit', fontSize: 16.5, minHeight: 48, padding: '0 1.8em',
                    borderRadius: 999, cursor: 'pointer',
                    border: `1px solid ${geschlecht === wert ? 'var(--gold)' : 'var(--kante)'}`,
                    background: geschlecht === wert ? 'var(--gold)' : 'rgba(2,14,14,.24)',
                    color: geschlecht === wert ? 'var(--tiefst)' : 'var(--hell)',
                    fontWeight: geschlecht === wert ? 700 : 400,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
            <legend style={{ ...beschriftung, padding: 0 }}>Geburtsdatum</legend>
            <div style={{ display: 'grid', gap: 'clamp(.6rem,1.4vw,1rem)', gridTemplateColumns: 'repeat(3,1fr)' }}>
              <select className="tc-feld" name="gebTag" required defaultValue="" aria-label="Geburtstag">
                <option value="" disabled>Tag</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <select className="tc-feld" name="gebMonat" required defaultValue="" aria-label="Geburtsmonat">
                <option value="" disabled>Monat</option>
                {MONATE.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
              </select>
              <select className="tc-feld" name="gebJahr" required defaultValue="" aria-label="Geburtsjahr">
                <option value="" disabled>Jahr</option>
                {jahre.map(j => <option key={j} value={j}>{j}</option>)}
              </select>
            </div>
          </fieldset>
        </div>
      </div>

      {/* ─── 03 · Anschrift ────────────────────────────────────────────── */}
      <div data-step="3" style={{ display: schritt === 3 ? 'block' : 'none' }}>
        <div style={{ display: 'grid', gap: 'clamp(1rem,2vw,1.5rem)' }}>
          <div style={{ display: 'grid', gap: 'clamp(.9rem,1.8vw,1.4rem)', gridTemplateColumns: 'minmax(0,3fr) minmax(0,1fr)' }}>
            <Zeile label="Straße" kind={<input className="tc-feld" name="strasse" type="text" required autoComplete="address-line1" />} />
            <Zeile label="Nr." kind={<input className="tc-feld" name="hausnummer" type="text" required />} />
          </div>
          <div style={{ display: 'grid', gap: 'clamp(.9rem,1.8vw,1.4rem)', gridTemplateColumns: 'minmax(0,1fr) minmax(0,2fr)' }}>
            <Zeile label="PLZ" kind={<input className="tc-feld" name="plz" type="text" required autoComplete="postal-code" inputMode="numeric" />} />
            <Zeile label="Ort" kind={<input className="tc-feld" name="ort" type="text" required autoComplete="address-level2" />} />
          </div>
          <Zeile
            label="Dein Ziel (freiwillig)"
            kind={
              <select className="tc-feld" name="ziel" defaultValue="">
                <option value="">Keine Angabe</option>
                {ZIELE.map(z => <option key={z} value={z}>{z}</option>)}
              </select>
            }
          />
          <Zeile
            label="Sollen wir vorab etwas wissen? (freiwillig)"
            kind={<textarea className="tc-feld" name="nachricht" rows={2} style={{ resize: 'vertical' }} />}
          />
          <label style={{ display: 'flex', gap: '.9em', alignItems: 'flex-start', cursor: 'pointer', fontSize: 16.5, lineHeight: 1.55 }}>
            <input type="checkbox" name="datenschutz" required style={{ width: 22, height: 22, flex: 'none', marginTop: '.15em', accentColor: 'var(--gold)' }} />
            <span>Ich bin mit der Verarbeitung meiner Daten zur Terminvereinbarung einverstanden.</span>
          </label>
        </div>
      </div>

      {/* ─── Steuerung ─────────────────────────────────────────────────── */}
      {terminText && !gesendet && (
        <p className="tc-klein" style={{ marginTop: 'clamp(1.5rem,3vw,2.2rem)' }}>Gewählt: {terminText}</p>
      )}

      {!gesendet && (
        <div
          style={{
            display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center',
            marginTop: terminText ? '.8rem' : 'clamp(1.8rem,3.5vw,2.6rem)',
            paddingTop: 'clamp(1.4rem,2.8vw,2.2rem)', borderTop: '1px solid var(--kante)',
          }}
        >
          {schritt > 1 && <button type="button" onClick={zurueck} className="tc-knopf tc-knopf--glas">Zurück</button>}
          {schritt < 3 ? (
            <button key="weiter" type="button" className="tc-knopf" onClick={weiter} disabled={schritt === 1 && !slot} style={{ flex: 1, minWidth: 220 }}>
              {schritt === 1 ? 'Weiter' : 'Weiter zur Anschrift'}
            </button>
          ) : (
            <button key="absenden" type="submit" className="tc-knopf" disabled={sendet} style={{ flex: 1, minWidth: 220 }}>
              {sendet ? 'Wird gesendet …' : 'Termin verbindlich anfragen'}
            </button>
          )}
          <span style={{ fontSize: 16, color: 'var(--matt)' }}>
            oder anrufen:{' '}
            <a href={`tel:${aktion.telefon.link}`} className="tc-ziel" style={{ color: 'var(--hell)', fontWeight: 600 }}>
              {aktion.telefon.anzeige}
            </a>
          </span>
        </div>
      )}

      {fehler && !gesendet && (
        <p role="alert" style={{ marginTop: '1.3rem', padding: '1.1em 1.3em', border: '1px solid #e58f6b', borderRadius: 14, fontSize: 16.5, lineHeight: 1.6 }}>
          {fehler} Ruf uns gerne an:{' '}
          <a href={`tel:${aktion.telefon.link}`} style={{ color: 'var(--gold)', fontWeight: 700 }}>{aktion.telefon.anzeige}</a>
        </p>
      )}

      {gesendet && (
        <div
          role="status"
          style={{
            marginTop: 'clamp(1.8rem,3.5vw,2.6rem)', padding: 'clamp(1.3rem,2.6vw,2rem)',
            border: '1px solid var(--gold)', borderRadius: 18, background: 'rgba(229,176,75,.1)',
            display: 'flex', gap: '1.1em', alignItems: 'flex-start',
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flex: 'none', marginTop: '.15em' }}>
            <path d="M4 12.5 L9.5 18 L20 6.5" stroke="var(--gold)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p style={{ fontSize: 17.5, lineHeight: 1.6 }}>
            Notiert. Dein Probetraining am <strong style={{ fontWeight: 700 }}>{terminText}</strong> liegt in unserem
            Kalender – wir melden uns zur Bestätigung.
          </p>
        </div>
      )}
    </form>
  )
}
