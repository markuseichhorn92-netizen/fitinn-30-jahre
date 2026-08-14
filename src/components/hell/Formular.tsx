'use client'

import type { CSSProperties } from 'react'
import { formatTime } from '@/lib/booking'
import { aktion, termin } from '@/components/kampagne/inhalt'
import { langesDatum, MONATE, useBuchung, WOCHENTAGE, ZIELE } from '@/components/kampagne/useBuchung'

// Der Terminbogen in der hellen Welt. Logik aus useBuchung, gebucht wird echt.

const paar: CSSProperties = {
  display: 'grid',
  gap: 'clamp(.9rem,1.8vw,1.3rem)',
  gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))',
}

const beschriftung: CSSProperties = {
  display: 'block', fontSize: 14.5, fontWeight: 600, color: 'var(--tinte-2)', marginBottom: '.4em',
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
      className="hl-karte hl-karte--gross"
      style={{ borderRadius: 24 }}
    >
      {/* Fortschritt */}
      <ol
        style={{
          listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
          gap: 'clamp(.4rem,1.2vw,.9rem)', margin: '0 0 clamp(1.6rem,3vw,2.4rem)', padding: 0,
        }}
      >
        {termin.schritte.map((s, i) => {
          const jetzt = schritt === i + 1
          const fertig = schritt > i + 1
          return (
            <li
              key={s.nr}
              aria-current={jetzt ? 'step' : undefined}
              style={{ display: 'flex', gap: '.6em', alignItems: 'center', minWidth: 0 }}
            >
              <span
                className="hl-zahl"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none',
                  width: 30, height: 30, borderRadius: 100, fontSize: 14, fontWeight: 700,
                  background: fertig ? 'var(--gruen)' : jetzt ? 'var(--blau)' : 'var(--grund-3)',
                  color: fertig || jetzt ? '#fff' : 'var(--matt)',
                }}
              >
                {fertig ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 12.5 L9.5 18 L20 6.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : i + 1}
              </span>
              <span
                style={{
                  fontSize: 15.5, fontWeight: jetzt ? 600 : 500,
                  color: jetzt || fertig ? 'var(--tinte)' : 'var(--matt)',
                  overflow: 'hidden', textOverflow: 'ellipsis',
                }}
              >
                {s.label}
              </span>
            </li>
          )
        })}
      </ol>

      {/* ─── 01 · Termin ───────────────────────────────────────────────── */}
      <div data-step="1" style={{ display: schritt === 1 ? 'block' : 'none' }}>
        <div style={{ display: 'grid', gap: 'clamp(1.5rem,3vw,2.6rem)', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '.6em', marginBottom: '1em' }}>
              <button
                type="button"
                onClick={() => setMonatOffset(o => Math.max(0, o - 1))}
                disabled={monatOffset <= 0}
                aria-label="Vorheriger Monat"
                style={{
                  appearance: 'none', width: 44, height: 44, borderRadius: 100, cursor: monatOffset <= 0 ? 'not-allowed' : 'pointer',
                  border: '1px solid var(--linie-2)', background: 'var(--grund)', color: 'var(--tinte)', opacity: monatOffset <= 0 ? .4 : 1,
                }}
              >
                <svg width="15" height="15" viewBox="0 0 16 16" style={{ margin: '0 auto', display: 'block' }} aria-hidden="true">
                  <path d="M10 2 L4 8 L10 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span style={{ fontSize: 18.5, fontWeight: 600, fontFamily: 'var(--anzeige)', letterSpacing: '-.02em' }}>{monatLabel}</span>
              <button
                type="button"
                onClick={() => setMonatOffset(o => o + 1)}
                aria-label="Nächster Monat"
                style={{
                  appearance: 'none', width: 44, height: 44, borderRadius: 100, cursor: 'pointer',
                  border: '1px solid var(--linie-2)', background: 'var(--grund)', color: 'var(--tinte)',
                }}
              >
                <svg width="15" height="15" viewBox="0 0 16 16" style={{ margin: '0 auto', display: 'block' }} aria-hidden="true">
                  <path d="M6 2 L12 8 L6 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4, marginBottom: 6 }}>
              {WOCHENTAGE.map(t => (
                <span key={t} style={{ textAlign: 'center', fontSize: 13, color: 'var(--matt)', fontWeight: 600 }}>{t}</span>
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
                    className="hl-tag hl-zahl"
                    disabled={z.aus}
                    onClick={() => { setDatum(z.iso!); setSlot(null) }}
                    style={{
                      minHeight: 44, fontSize: 16,
                      border: `1px solid ${gewaehlt ? 'var(--blau)' : z.aus ? 'transparent' : 'var(--linie)'}`,
                      background: gewaehlt ? 'var(--blau)' : 'var(--grund)',
                      color: gewaehlt ? '#fff' : z.aus ? 'var(--linie-2)' : 'var(--tinte)',
                      fontWeight: gewaehlt ? 700 : 500,
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
            <p style={{ fontSize: 18.5, fontWeight: 600, fontFamily: 'var(--anzeige)', letterSpacing: '-.02em', marginBottom: '1em' }}>
              {datum ? `Freie Zeiten am ${langesDatum(datum)}` : 'Uhrzeit'}
            </p>
            {tagesSlots.length > 0 ? (
              <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit,minmax(102px,1fr))' }}>
                {tagesSlots.map(s => {
                  const an = slot?.startDateTime === s.startDateTime
                  return (
                    <button
                      key={s.startDateTime}
                      type="button"
                      className="hl-zeit hl-zahl"
                      onClick={() => setSlot(s)}
                      style={{
                        minHeight: 48, fontSize: 16, cursor: 'pointer',
                        border: `1px solid ${an ? 'var(--blau)' : 'var(--linie-2)'}`,
                        background: an ? 'var(--blau)' : 'var(--grund)',
                        color: an ? '#fff' : 'var(--tinte)',
                        fontWeight: an ? 700 : 500,
                      }}
                    >
                      {formatTime(s.startDateTime)}
                    </button>
                  )
                })}
              </div>
            ) : (
              <p style={{ fontSize: 16.5, lineHeight: 1.6, color: 'var(--matt)', maxWidth: '42ch' }}>{zeitHinweis}</p>
            )}
          </div>
        </div>
      </div>

      {/* ─── 02 · Person ───────────────────────────────────────────────── */}
      <div data-step="2" style={{ display: schritt === 2 ? 'block' : 'none' }}>
        <div style={{ display: 'grid', gap: 'clamp(1rem,2vw,1.4rem)' }}>
          <div style={paar}>
            <Zeile label="Vorname" kind={<input className="hl-feld" name="vorname" type="text" required autoComplete="given-name" />} />
            <Zeile label="Nachname" kind={<input className="hl-feld" name="nachname" type="text" required autoComplete="family-name" />} />
          </div>
          <div style={paar}>
            <Zeile label="E-Mail" kind={<input className="hl-feld" name="email" type="email" required autoComplete="email" />} />
            <Zeile label="Telefon" kind={<input className="hl-feld" name="telefon" type="tel" required autoComplete="tel" />} />
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
                    appearance: 'none', font: 'inherit', fontSize: 16.5, minHeight: 48, padding: '0 1.7em',
                    borderRadius: 100, cursor: 'pointer',
                    border: `1px solid ${geschlecht === wert ? 'var(--blau)' : 'var(--linie-2)'}`,
                    background: geschlecht === wert ? 'var(--blau)' : 'var(--grund)',
                    color: geschlecht === wert ? '#fff' : 'var(--tinte)',
                    fontWeight: geschlecht === wert ? 700 : 500,
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
              <select className="hl-feld" name="gebTag" required defaultValue="" aria-label="Geburtstag">
                <option value="" disabled>Tag</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <select className="hl-feld" name="gebMonat" required defaultValue="" aria-label="Geburtsmonat">
                <option value="" disabled>Monat</option>
                {MONATE.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
              </select>
              <select className="hl-feld" name="gebJahr" required defaultValue="" aria-label="Geburtsjahr">
                <option value="" disabled>Jahr</option>
                {jahre.map(j => <option key={j} value={j}>{j}</option>)}
              </select>
            </div>
          </fieldset>
        </div>
      </div>

      {/* ─── 03 · Anschrift ────────────────────────────────────────────── */}
      <div data-step="3" style={{ display: schritt === 3 ? 'block' : 'none' }}>
        <div style={{ display: 'grid', gap: 'clamp(1rem,2vw,1.4rem)' }}>
          <div style={{ display: 'grid', gap: 'clamp(.9rem,1.8vw,1.3rem)', gridTemplateColumns: 'minmax(0,3fr) minmax(0,1fr)' }}>
            <Zeile label="Straße" kind={<input className="hl-feld" name="strasse" type="text" required autoComplete="address-line1" />} />
            <Zeile label="Nr." kind={<input className="hl-feld" name="hausnummer" type="text" required />} />
          </div>
          <div style={{ display: 'grid', gap: 'clamp(.9rem,1.8vw,1.3rem)', gridTemplateColumns: 'minmax(0,1fr) minmax(0,2fr)' }}>
            <Zeile label="PLZ" kind={<input className="hl-feld" name="plz" type="text" required autoComplete="postal-code" inputMode="numeric" />} />
            <Zeile label="Ort" kind={<input className="hl-feld" name="ort" type="text" required autoComplete="address-level2" />} />
          </div>
          <Zeile
            label="Dein Ziel (freiwillig)"
            kind={
              <select className="hl-feld" name="ziel" defaultValue="">
                <option value="">Keine Angabe</option>
                {ZIELE.map(z => <option key={z} value={z}>{z}</option>)}
              </select>
            }
          />
          <Zeile
            label="Sollen wir vorab etwas wissen? (freiwillig)"
            kind={<textarea className="hl-feld" name="nachricht" rows={2} style={{ resize: 'vertical' }} />}
          />
          <label style={{ display: 'flex', gap: '.85em', alignItems: 'flex-start', cursor: 'pointer', fontSize: 16.5, lineHeight: 1.55 }}>
            <input type="checkbox" name="datenschutz" required style={{ width: 21, height: 21, flex: 'none', marginTop: '.15em', accentColor: 'var(--blau)' }} />
            <span>Ich bin mit der Verarbeitung meiner Daten zur Terminvereinbarung einverstanden.</span>
          </label>
        </div>
      </div>

      {/* ─── Steuerung ─────────────────────────────────────────────────── */}
      {terminText && !gesendet && (
        <p
          style={{
            marginTop: 'clamp(1.4rem,2.8vw,2rem)', padding: '.8em 1.1em', borderRadius: 10,
            background: 'var(--blau-blass)', border: '1px solid var(--linie)',
            fontSize: 16, color: 'var(--tinte-2)', fontWeight: 500,
          }}
        >
          Gewählt: <strong style={{ fontWeight: 700 }}>{terminText}</strong>
        </p>
      )}

      {!gesendet && (
        <div
          style={{
            display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center',
            marginTop: terminText ? '.9rem' : 'clamp(1.6rem,3vw,2.4rem)',
            paddingTop: 'clamp(1.3rem,2.6vw,2rem)', borderTop: '1px solid var(--linie)',
          }}
        >
          {schritt > 1 && <button type="button" onClick={zurueck} className="hl-knopf hl-knopf--rand">Zurück</button>}
          {schritt < 3 ? (
            <button key="weiter" type="button" className="hl-knopf" onClick={weiter} disabled={schritt === 1 && !slot} style={{ flex: 1, minWidth: 220 }}>
              {schritt === 1 ? 'Weiter' : 'Weiter zur Anschrift'}
            </button>
          ) : (
            <button key="absenden" type="submit" className="hl-knopf" disabled={sendet} style={{ flex: 1, minWidth: 220 }}>
              {sendet ? 'Wird gesendet …' : 'Termin verbindlich anfragen'}
            </button>
          )}
          <span style={{ fontSize: 16, color: 'var(--matt)' }}>
            oder anrufen:{' '}
            <a href={`tel:${aktion.telefon.link}`} className="hl-ziel" style={{ color: 'var(--blau)', fontWeight: 600 }}>
              {aktion.telefon.anzeige}
            </a>
          </span>
        </div>
      )}

      {fehler && !gesendet && (
        <p
          role="alert"
          style={{
            marginTop: '1.2rem', padding: '1em 1.2em', borderRadius: 12,
            border: '1px solid #e43f3f', background: '#fff5f5', fontSize: 16.5, lineHeight: 1.6,
          }}
        >
          {fehler} Ruf uns gerne an:{' '}
          <a href={`tel:${aktion.telefon.link}`} style={{ color: 'var(--blau)', fontWeight: 700 }}>{aktion.telefon.anzeige}</a>
        </p>
      )}

      {gesendet && (
        <div
          role="status"
          style={{
            marginTop: 'clamp(1.6rem,3vw,2.4rem)', padding: 'clamp(1.2rem,2.4vw,1.8rem)',
            border: '1px solid var(--gruen)', borderRadius: 16, background: '#f0fdf6',
            display: 'flex', gap: '1em', alignItems: 'flex-start',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none',
              width: 34, height: 34, borderRadius: 100, background: 'var(--gruen)',
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M4 12.5 L9.5 18 L20 6.5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <p style={{ fontSize: 17, lineHeight: 1.6 }}>
            Notiert. Dein Probetraining am <strong style={{ fontWeight: 700 }}>{terminText}</strong> liegt in unserem
            Kalender – wir melden uns zur Bestätigung.
          </p>
        </div>
      )}
    </form>
  )
}
