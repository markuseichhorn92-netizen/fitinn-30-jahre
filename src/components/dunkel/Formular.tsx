'use client'

import type { CSSProperties } from 'react'
import { formatTime } from '@/lib/booking'
import { aktion, termin } from '@/components/kampagne/inhalt'
import { langesDatum, MONATE, useBuchung, WOCHENTAGE, ZIELE } from '@/components/kampagne/useBuchung'

// Der Terminbogen in der dunklen Welt. Die Logik kommt aus useBuchung –
// hier steht ausschließlich, wie er aussieht. Gebucht wird echt.

const paar: CSSProperties = {
  display: 'grid',
  gap: 'clamp(1rem,2vw,1.7rem)',
  gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))',
}

function Zeile({ label, kind }: { label: string; kind: React.ReactNode }) {
  return (
    <label style={{ display: 'block' }}>
      <span
        style={{
          display: 'block', fontSize: 12.5, letterSpacing: '.16em', textTransform: 'uppercase',
          color: 'var(--matt)', marginBottom: '.35em',
        }}
      >
        {label}
      </span>
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
      style={{
        background: 'var(--grund-2)',
        border: '1px solid var(--linie)',
        borderRadius: 3,
        padding: 'clamp(1.3rem,3.5vw,3.4rem)',
      }}
    >
      {/* Fortschritt */}
      <ol
        style={{
          listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
          gap: 'clamp(.5rem,1.5vw,1.4rem)', margin: '0 0 clamp(1.8rem,3.5vw,2.8rem)', padding: 0,
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
                borderTop: `2px solid ${jetzt || fertig ? 'var(--glut)' : 'var(--linie)'}`,
                paddingTop: '.8em', display: 'flex', gap: '.6em', alignItems: 'baseline', minWidth: 0,
              }}
            >
              <span
                className="dk-zahl"
                style={{ fontSize: 12.5, letterSpacing: '.16em', color: jetzt || fertig ? 'var(--glut)' : 'var(--matt)' }}
              >
                {s.nr}
              </span>
              <span
                style={{
                  fontSize: 16, fontWeight: jetzt ? 600 : 400,
                  color: jetzt || fertig ? 'var(--hell)' : 'var(--matt)',
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
        <div
          style={{
            display: 'grid', gap: 'clamp(1.6rem,3.5vw,3.4rem)',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '.6em', marginBottom: '1.1em' }}>
              <button
                type="button"
                onClick={() => setMonatOffset(o => Math.max(0, o - 1))}
                disabled={monatOffset <= 0}
                aria-label="Vorheriger Monat"
                style={{
                  appearance: 'none', width: 46, height: 46, borderRadius: 2, cursor: monatOffset <= 0 ? 'not-allowed' : 'pointer',
                  border: '1px solid var(--linie-stark)', background: 'transparent', color: 'var(--hell)',
                  opacity: monatOffset <= 0 ? .35 : 1,
                }}
              >
                <svg width="15" height="15" viewBox="0 0 16 16" style={{ margin: '0 auto', display: 'block' }} aria-hidden="true">
                  <path d="M10 2 L4 8 L10 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span style={{ fontSize: 19, fontWeight: 500 }}>{monatLabel}</span>
              <button
                type="button"
                onClick={() => setMonatOffset(o => o + 1)}
                aria-label="Nächster Monat"
                style={{
                  appearance: 'none', width: 46, height: 46, borderRadius: 2, cursor: 'pointer',
                  border: '1px solid var(--linie-stark)', background: 'transparent', color: 'var(--hell)',
                }}
              >
                <svg width="15" height="15" viewBox="0 0 16 16" style={{ margin: '0 auto', display: 'block' }} aria-hidden="true">
                  <path d="M6 2 L12 8 L6 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 3, marginBottom: 7 }}>
              {WOCHENTAGE.map(t => (
                <span key={t} style={{ textAlign: 'center', fontSize: 12, letterSpacing: '.1em', color: 'var(--matt)' }}>{t}</span>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 3 }}>
              {zellen.map(z => {
                if (!z.iso) return <span key={z.key} />
                const gewaehlt = datum === z.iso
                return (
                  <button
                    key={z.key}
                    type="button"
                    className="dk-tag dk-zahl"
                    disabled={z.aus}
                    onClick={() => { setDatum(z.iso!); setSlot(null) }}
                    style={{
                      minHeight: 46, fontSize: 16.5,
                      border: `1px solid ${gewaehlt ? 'var(--glut)' : z.aus ? 'transparent' : 'var(--linie)'}`,
                      background: gewaehlt ? 'var(--glut)' : 'transparent',
                      color: gewaehlt ? 'var(--grund)' : z.aus ? 'rgba(141,146,151,.4)' : 'var(--hell)',
                      fontWeight: gewaehlt ? 600 : 400,
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
            <p style={{ fontSize: 19, fontWeight: 500, marginBottom: '1.1em' }}>
              {datum ? `Freie Zeiten am ${langesDatum(datum)}` : 'Uhrzeit'}
            </p>
            {tagesSlots.length > 0 ? (
              <div style={{ display: 'grid', gap: 7, gridTemplateColumns: 'repeat(auto-fit,minmax(104px,1fr))' }}>
                {tagesSlots.map(s => {
                  const an = slot?.startDateTime === s.startDateTime
                  return (
                    <button
                      key={s.startDateTime}
                      type="button"
                      className="dk-zeit dk-zahl"
                      onClick={() => setSlot(s)}
                      style={{
                        minHeight: 50, fontSize: 16.5, cursor: 'pointer',
                        border: `1px solid ${an ? 'var(--glut)' : 'var(--linie)'}`,
                        background: an ? 'var(--glut)' : 'transparent',
                        color: an ? 'var(--grund)' : 'var(--hell)',
                        fontWeight: an ? 600 : 400,
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
        <div style={{ display: 'grid', gap: 'clamp(1.1rem,2.2vw,1.8rem)' }}>
          <div style={paar}>
            <Zeile label="Vorname" kind={<input className="dk-feld" name="vorname" type="text" required autoComplete="given-name" />} />
            <Zeile label="Nachname" kind={<input className="dk-feld" name="nachname" type="text" required autoComplete="family-name" />} />
          </div>
          <div style={paar}>
            <Zeile label="E-Mail" kind={<input className="dk-feld" name="email" type="email" required autoComplete="email" />} />
            <Zeile label="Telefon" kind={<input className="dk-feld" name="telefon" type="tel" required autoComplete="tel" />} />
          </div>

          <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
            <legend style={{ fontSize: 12.5, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--matt)', padding: 0, marginBottom: '.6em' }}>
              Anrede
            </legend>
            <div style={{ display: 'flex', gap: 8 }}>
              {([['FEMALE', 'Frau'], ['MALE', 'Herr']] as const).map(([wert, label]) => (
                <button
                  key={wert}
                  type="button"
                  onClick={() => { setGeschlecht(wert); setFehler(null) }}
                  aria-pressed={geschlecht === wert}
                  style={{
                    appearance: 'none', font: 'inherit', fontSize: 16.5, minHeight: 48, padding: '0 1.7em',
                    borderRadius: 2, cursor: 'pointer',
                    border: `1px solid ${geschlecht === wert ? 'var(--glut)' : 'var(--linie-stark)'}`,
                    background: geschlecht === wert ? 'var(--glut)' : 'transparent',
                    color: geschlecht === wert ? 'var(--grund)' : 'var(--hell)',
                    fontWeight: geschlecht === wert ? 600 : 400,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
            <legend style={{ fontSize: 12.5, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--matt)', padding: 0, marginBottom: '.35em' }}>
              Geburtsdatum
            </legend>
            <div style={{ display: 'grid', gap: 'clamp(.7rem,1.6vw,1.3rem)', gridTemplateColumns: 'repeat(3,1fr)' }}>
              <select className="dk-feld" name="gebTag" required defaultValue="" aria-label="Geburtstag">
                <option value="" disabled>Tag</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <select className="dk-feld" name="gebMonat" required defaultValue="" aria-label="Geburtsmonat">
                <option value="" disabled>Monat</option>
                {MONATE.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
              </select>
              <select className="dk-feld" name="gebJahr" required defaultValue="" aria-label="Geburtsjahr">
                <option value="" disabled>Jahr</option>
                {jahre.map(j => <option key={j} value={j}>{j}</option>)}
              </select>
            </div>
          </fieldset>
        </div>
      </div>

      {/* ─── 03 · Anschrift ────────────────────────────────────────────── */}
      <div data-step="3" style={{ display: schritt === 3 ? 'block' : 'none' }}>
        <div style={{ display: 'grid', gap: 'clamp(1.1rem,2.2vw,1.8rem)' }}>
          <div style={{ display: 'grid', gap: 'clamp(1rem,2vw,1.7rem)', gridTemplateColumns: 'minmax(0,3fr) minmax(0,1fr)' }}>
            <Zeile label="Straße" kind={<input className="dk-feld" name="strasse" type="text" required autoComplete="address-line1" />} />
            <Zeile label="Nr." kind={<input className="dk-feld" name="hausnummer" type="text" required />} />
          </div>
          <div style={{ display: 'grid', gap: 'clamp(1rem,2vw,1.7rem)', gridTemplateColumns: 'minmax(0,1fr) minmax(0,2fr)' }}>
            <Zeile label="PLZ" kind={<input className="dk-feld" name="plz" type="text" required autoComplete="postal-code" inputMode="numeric" />} />
            <Zeile label="Ort" kind={<input className="dk-feld" name="ort" type="text" required autoComplete="address-level2" />} />
          </div>
          <Zeile
            label="Dein Ziel (freiwillig)"
            kind={
              <select className="dk-feld" name="ziel" defaultValue="">
                <option value="">Keine Angabe</option>
                {ZIELE.map(z => <option key={z} value={z}>{z}</option>)}
              </select>
            }
          />
          <Zeile
            label="Sollen wir vorab etwas wissen? (freiwillig)"
            kind={<textarea className="dk-feld" name="nachricht" rows={2} style={{ resize: 'vertical' }} />}
          />
          <label style={{ display: 'flex', gap: '.9em', alignItems: 'flex-start', cursor: 'pointer', fontSize: 16.5, lineHeight: 1.55 }}>
            <input
              type="checkbox" name="datenschutz" required
              style={{ width: 22, height: 22, flex: 'none', marginTop: '.15em', accentColor: 'var(--glut)' }}
            />
            <span>Ich bin mit der Verarbeitung meiner Daten zur Terminvereinbarung einverstanden.</span>
          </label>
        </div>
      </div>

      {/* ─── Steuerung ─────────────────────────────────────────────────── */}
      {terminText && !gesendet && (
        <p style={{ marginTop: 'clamp(1.5rem,3vw,2.2rem)', fontSize: 13, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--glut)' }}>
          Gewählt: {terminText}
        </p>
      )}

      {!gesendet && (
        <div
          style={{
            display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center',
            marginTop: terminText ? '.8rem' : 'clamp(1.8rem,3.5vw,2.6rem)',
            paddingTop: 'clamp(1.4rem,2.8vw,2.2rem)', borderTop: '1px solid var(--linie)',
          }}
        >
          {schritt > 1 && (
            <button type="button" onClick={zurueck} className="dk-knopf dk-knopf--rand">Zurück</button>
          )}
          {schritt < 3 ? (
            <button
              key="weiter"
              type="button"
              className="dk-knopf"
              onClick={weiter}
              disabled={schritt === 1 && !slot}
              style={{ flex: 1, minWidth: 220 }}
            >
              {schritt === 1 ? 'Weiter' : 'Weiter zur Anschrift'}
            </button>
          ) : (
            <button key="absenden" type="submit" className="dk-knopf" disabled={sendet} style={{ flex: 1, minWidth: 220 }}>
              {sendet ? 'Wird gesendet …' : 'Termin verbindlich anfragen'}
            </button>
          )}
          <span style={{ fontSize: 16, color: 'var(--matt)' }}>
            oder anrufen:{' '}
            <a href={`tel:${aktion.telefon.link}`} className="dk-ziel" style={{ color: 'var(--hell)', fontWeight: 500 }}>
              {aktion.telefon.anzeige}
            </a>
          </span>
        </div>
      )}

      {fehler && !gesendet && (
        <p role="alert" style={{ marginTop: '1.3rem', padding: '1.1em 1.3em', border: '1px solid #e2714f', borderRadius: 2, fontSize: 16.5, lineHeight: 1.6 }}>
          {fehler} Ruf uns gerne an:{' '}
          <a href={`tel:${aktion.telefon.link}`} style={{ color: 'var(--glut)', fontWeight: 600 }}>{aktion.telefon.anzeige}</a>
        </p>
      )}

      {gesendet && (
        <div
          role="status"
          style={{
            marginTop: 'clamp(1.8rem,3.5vw,2.6rem)', padding: 'clamp(1.3rem,2.6vw,2rem)',
            border: '1px solid var(--glut)', borderRadius: 2, display: 'flex', gap: '1.1em', alignItems: 'flex-start',
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flex: 'none', marginTop: '.15em' }}>
            <path d="M4 12.5 L9.5 18 L20 6.5" stroke="var(--glut)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p style={{ fontSize: 17.5, lineHeight: 1.6 }}>
            Notiert. Dein Probetraining am <strong style={{ fontWeight: 600 }}>{terminText}</strong> liegt in unserem
            Kalender – wir melden uns zur Bestätigung.
          </p>
        </div>
      )}
    </form>
  )
}
