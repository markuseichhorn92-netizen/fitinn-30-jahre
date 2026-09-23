'use client'

import Link from 'next/link'
import { formatTime } from '@/lib/booking'
import { langesDatum, MONATE, useBuchung, WOCHENTAGE, ZIELE } from '@/components/kampagne/useBuchung'
import { studio, telLink } from './studio'
import { Pfeil } from './Teile'

const SCHRITTE = ['Termin', 'Person', 'Anschrift']

function Feld({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label>
      <span className="fi-feld-label">{label}</span>
      {children}
    </label>
  )
}

// Der Terminbogen im Fit-Inn-Design. Die Logik – freie Termine laden,
// schrittweise prüfen, bei Magicline buchen, Buchung an den Google-Tag
// melden – kommt unverändert aus useBuchung; gebucht wird echt.
export function Buchung({ quelle }: { quelle: string }) {
  // Einzeln entnommen statt über ein Objekt: der Linter erkennt `formRef`
  // sonst nicht als Referenz (siehe hell/Formular.tsx).
  const {
    schritt, weiter, zurueck, monatOffset, setMonatOffset, monatLabel, zellen,
    datum, setDatum, slot, setSlot, tagesSlots, terminText, zeitHinweis,
    geschlecht, setGeschlecht, sendet, fehler, setFehler, gesendet,
    formRef, absenden, jahre,
  } = useBuchung(quelle)

  return (
    <form ref={formRef} onSubmit={absenden} noValidate className="fi-formular" aria-label="Probetraining buchen">
      <ol className="fi-fortschritt">
        {SCHRITTE.map((s, i) => {
          const zustand = schritt === i + 1 ? 'jetzt' : schritt > i + 1 ? 'fertig' : 'offen'
          return (
            <li key={s} data-zustand={zustand} aria-current={zustand === 'jetzt' ? 'step' : undefined}>
              0{i + 1} · {s}
            </li>
          )
        })}
      </ol>

      {/* ─── 01 · Termin ─────────────────────────────────────────────── */}
      <div data-step="1" hidden={schritt !== 1}>
        <div className="fi-termin-raster">
          <div>
            <div className="fi-monat">
              <button
                type="button"
                onClick={() => setMonatOffset(o => Math.max(0, o - 1))}
                disabled={monatOffset <= 0}
                aria-label="Vorheriger Monat"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M10 2 4 8l6 6" fill="none" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </button>
              <strong aria-live="polite">{monatLabel}</strong>
              <button type="button" onClick={() => setMonatOffset(o => o + 1)} aria-label="Nächster Monat">
                <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="m6 2 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </button>
            </div>
            <div className="fi-wochentage" aria-hidden="true">
              {WOCHENTAGE.map(t => <span key={t}>{t}</span>)}
            </div>
            <div className="fi-tage">
              {zellen.map(z => {
                if (!z.iso) return <span key={z.key} />
                return (
                  <button
                    key={z.key}
                    type="button"
                    className="fi-tag"
                    disabled={z.aus}
                    aria-pressed={datum === z.iso}
                    aria-label={langesDatum(z.iso)}
                    onClick={() => { setDatum(z.iso!); setSlot(null) }}
                  >
                    {z.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <p className="fi-feld-label" style={{ fontSize: 17 }}>
              {datum ? `Freie Zeiten am ${langesDatum(datum)}` : 'Uhrzeit'}
            </p>
            {tagesSlots.length > 0 ? (
              <div className="fi-zeiten">
                {tagesSlots.map(s => (
                  <button
                    key={s.startDateTime}
                    type="button"
                    className="fi-zeit"
                    aria-pressed={slot?.startDateTime === s.startDateTime}
                    onClick={() => setSlot(s)}
                  >
                    {formatTime(s.startDateTime)}
                  </button>
                ))}
              </div>
            ) : (
              <p className="fi-zeithinweis">{zeitHinweis}</p>
            )}
          </div>
        </div>
      </div>

      {/* ─── 02 · Person ─────────────────────────────────────────────── */}
      <div data-step="2" hidden={schritt !== 2} className="fi-feldgruppe">
        <div className="fi-paar">
          <Feld label="Vorname"><input className="fi-feld" name="vorname" type="text" required autoComplete="given-name" /></Feld>
          <Feld label="Nachname"><input className="fi-feld" name="nachname" type="text" required autoComplete="family-name" /></Feld>
        </div>
        <div className="fi-paar">
          <Feld label="E-Mail"><input className="fi-feld" name="email" type="email" required autoComplete="email" /></Feld>
          <Feld label="Telefon"><input className="fi-feld" name="telefon" type="tel" required autoComplete="tel" /></Feld>
        </div>
        <fieldset className="fi-fieldset">
          <legend className="fi-feld-label">Anrede</legend>
          <div className="fi-wahlen">
            {([['FEMALE', 'Frau'], ['MALE', 'Herr']] as const).map(([wert, text]) => (
              <button
                key={wert}
                type="button"
                className="fi-wahl"
                aria-pressed={geschlecht === wert}
                onClick={() => { setGeschlecht(wert); setFehler(null) }}
              >
                {text}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset className="fi-fieldset">
          <legend className="fi-feld-label">Geburtsdatum</legend>
          <div className="fi-paar" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 8 }}>
            <select className="fi-feld" name="gebTag" required defaultValue="" aria-label="Tag">
              <option value="" disabled>Tag</option>
              {Array.from({ length: 31 }, (_, i) => i + 1).map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select className="fi-feld" name="gebMonat" required defaultValue="" aria-label="Monat">
              <option value="" disabled>Monat</option>
              {MONATE.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
            </select>
            <select className="fi-feld" name="gebJahr" required defaultValue="" aria-label="Jahr">
              <option value="" disabled>Jahr</option>
              {jahre.map(j => <option key={j} value={j}>{j}</option>)}
            </select>
          </div>
        </fieldset>
      </div>

      {/* ─── 03 · Anschrift ──────────────────────────────────────────── */}
      <div data-step="3" hidden={schritt !== 3} className="fi-feldgruppe">
        <div className="fi-paar" style={{ gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 1fr)' }}>
          <Feld label="Straße"><input className="fi-feld" name="strasse" type="text" required autoComplete="address-line1" /></Feld>
          <Feld label="Nr."><input className="fi-feld" name="hausnummer" type="text" required /></Feld>
        </div>
        <div className="fi-paar" style={{ gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)' }}>
          <Feld label="PLZ"><input className="fi-feld" name="plz" type="text" required autoComplete="postal-code" inputMode="numeric" /></Feld>
          <Feld label="Ort"><input className="fi-feld" name="ort" type="text" required autoComplete="address-level2" /></Feld>
        </div>
        <Feld label="Dein Ziel (freiwillig)">
          <select className="fi-feld" name="ziel" defaultValue="">
            <option value="">Keine Angabe</option>
            {ZIELE.map(z => <option key={z} value={z}>{z}</option>)}
          </select>
        </Feld>
        <Feld label="Sollen wir vorab etwas wissen? (freiwillig)">
          <textarea className="fi-feld" name="nachricht" rows={2} />
        </Feld>
        <label className="fi-einwilligung">
          <input type="checkbox" name="datenschutz" required />
          <span>
            Ich bin mit der Verarbeitung meiner Daten zur Terminvereinbarung einverstanden. Mehr dazu in der{' '}
            <Link href="/datenschutz">Datenschutzerklärung</Link>.
          </span>
        </label>
      </div>

      {/* ─── Steuerung ───────────────────────────────────────────────── */}
      {terminText && !gesendet && (
        <p className="fi-gewaehlt">Gewählt: <strong>{terminText}</strong></p>
      )}

      {!gesendet && (
        <div className="fi-steuerung">
          {schritt > 1 && (
            <button type="button" className="fi-knopf fi-knopf--linie" onClick={zurueck}>Zurück</button>
          )}
          {schritt < 3 ? (
            <button
              key="weiter"
              type="button"
              className="fi-knopf fi-knopf--orange"
              onClick={weiter}
              disabled={schritt === 1 && !slot}
            >
              {schritt === 1 ? 'Weiter' : 'Weiter zur Anschrift'}
              <Pfeil />
            </button>
          ) : (
            <button key="absenden" type="submit" className="fi-knopf fi-knopf--orange" disabled={sendet}>
              {sendet ? 'Wird gesendet …' : 'Probetraining buchen'}
              <Pfeil />
            </button>
          )}
          <a href={telLink} data-kontakt="telefon" className="fi-verweis">
            Oder anrufen: {studio.telefon.anzeige}
          </a>
        </div>
      )}

      {fehler && !gesendet && (
        <p role="alert" className="fi-fehler">
          {fehler} Ruf uns gern an: <a href={telLink}>{studio.telefon.anzeige}</a>
        </p>
      )}

      {gesendet && (
        <p role="status" className="fi-erfolg">
          Notiert. Dein Probetraining am <strong>{terminText}</strong> liegt in unserem Kalender – wir melden uns
          zur Bestätigung.
        </p>
      )}
    </form>
  )
}
