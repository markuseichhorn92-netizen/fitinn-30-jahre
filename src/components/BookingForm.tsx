'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  CalendarCheck, ArrowRight, ArrowLeft, Loader2, CheckCircle2,
  AlertCircle, Phone, Calendar as CalendarIcon, Sun,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  type Slot, getMonthGrid, toLocalDateKey, formatTime, formatDateLong, formatDateShort,
} from '@/lib/booking'

// Echtes Magicline-Buchungsformular für die Sommerferien-Aktion.
// Schritt 1: Terminauswahl (Slots via GET /api/trialsession) · Schritt 2: Kontaktdaten (POST = Buchung).
// Ersetzt das frühere StudioPartner-iframe.

interface ContactData {
  firstName: string
  lastName: string
  email: string
  mobilephone: string
  gender: 'MALE' | 'FEMALE' | ''
  dateOfBirth: string
  street: string
  houseNumber: string
  zip: string
  city: string
  marketingConsent: boolean
  note: string
}

const TOTAL_STEPS = 2

export function BookingForm({ className = '' }: { className?: string }) {
  const [step, setStep] = useState(1)

  const [slots, setSlots] = useState<Slot[]>([])
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [slotsError, setSlotsError] = useState<string | null>(null)
  const [calendarMonth, setCalendarMonth] = useState(() => new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)

  const [contact, setContact] = useState<ContactData>({
    firstName: '', lastName: '', email: '', mobilephone: '',
    gender: '', dateOfBirth: '',
    street: '', houseNumber: '', zip: '', city: '',
    marketingConsent: false, note: '',
  })

  const [isBooking, setIsBooking] = useState(false)
  const [bookingError, setBookingError] = useState<string | null>(null)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  // Freie Termine direkt beim Mounten laden (nächste 28 Tage).
  useEffect(() => {
    setSlotsLoading(true)
    setSlotsError(null)
    const today = new Date()
    const end = new Date(today)
    end.setDate(end.getDate() + 28)
    const fmt = (d: Date) => d.toISOString().split('T')[0]
    fetch(`/api/trialsession?startDate=${fmt(today)}&endDate=${fmt(end)}`)
      .then(r => r.json())
      .then(d => {
        if (d.error) throw new Error(d.error)
        setSlots(d.slots || [])
        if (d.slots?.length > 0) {
          const first = new Date(d.slots[0].startDateTime)
          setCalendarMonth(new Date(first.getFullYear(), first.getMonth(), 1))
        }
      })
      .catch(e => setSlotsError(e.message || 'Termine konnten nicht geladen werden'))
      .finally(() => setSlotsLoading(false))
  }, [])

  const slotsByDate = useMemo(() => {
    const map: Record<string, Slot[]> = {}
    for (const slot of slots) {
      const key = toLocalDateKey(slot.startDateTime)
      map[key] = [...(map[key] || []), slot]
    }
    return map
  }, [slots])

  const contactValid =
    contact.firstName.trim().length > 1 &&
    contact.lastName.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email) &&
    contact.mobilephone.trim().length > 6 &&
    contact.gender !== '' &&
    /^\d{4}-\d{2}-\d{2}$/.test(contact.dateOfBirth) &&
    contact.street.trim().length > 1 &&
    contact.houseNumber.trim().length > 0 &&
    contact.zip.trim().length >= 4 &&
    contact.city.trim().length > 1

  const submitBooking = async () => {
    if (!selectedSlot) return
    setIsBooking(true)
    setBookingError(null)
    try {
      const res = await fetch('/api/trialsession', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          mobilephone: contact.mobilephone,
          gender: contact.gender,
          dateOfBirth: contact.dateOfBirth,
          street: contact.street,
          houseNumber: contact.houseNumber,
          zip: contact.zip,
          city: contact.city,
          marketingConsent: contact.marketingConsent,
          note: contact.note,
          startDateTime: selectedSlot.startDateTime,
        }),
      })
      const result = await res.json()
      if (!res.ok || result.error) {
        const detail = result.details ? ` — ${result.details}` : ''
        setBookingError((result.error || 'Buchung fehlgeschlagen') + detail)
      } else {
        setBookingSuccess(true)
      }
    } catch {
      setBookingError('Verbindungsfehler. Bitte versuche es erneut.')
    } finally {
      setIsBooking(false)
    }
  }

  // ─── Erfolgs-Zustand ────────────────────────────────────────────────────────
  if (bookingSuccess) {
    return (
      <div className={cn('feature-card feature-card--gold p-6 md:p-7', className)}>
        <div className="flex flex-col items-center text-center gap-4 py-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
            <CheckCircle2 className="w-9 h-9 text-primary" />
          </div>
          <div>
            <p className="text-xl font-bold mb-1">Probetraining gebucht!</p>
            {selectedSlot && (
              <p className="text-sm text-muted-foreground">
                {formatDateShort(selectedSlot.startDateTime)} · {formatTime(selectedSlot.startDateTime)} Uhr
              </p>
            )}
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Wir freuen uns auf dich bei FIT-INN Trier. Du erhältst in Kürze eine Bestätigung per E-Mail.
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent">
            <Sun className="w-3.5 h-3.5" /> Sommerferien-Aktion gesichert
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('feature-card feature-card--gold overflow-hidden', className)}>
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
            <CalendarCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold leading-tight">Kostenloses Probetraining buchen</p>
            <p className="text-xs text-muted-foreground">Unverbindlich · in 60 Sekunden</p>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-primary shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          Termine verfügbar
        </span>
      </div>

      <div className="p-5">
        {/* Fortschritt */}
        <div className="flex items-center gap-1.5 mb-5" aria-hidden="true">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => (
            <span
              key={i}
              className={cn(
                'h-1 flex-1 rounded-full transition-colors',
                i + 1 <= step ? 'bg-accent' : 'bg-border',
              )}
            />
          ))}
        </div>

        <div className="min-h-[320px] flex flex-col">
          {/* ─── Schritt 1: Terminauswahl ─── */}
          {step === 1 && (
            <div className="flex flex-col gap-3 animate-fade-up">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-accent" />
                <p className="text-base font-semibold">Wähle deinen Wunschtermin</p>
              </div>

              {slotsLoading && (
                <div className="flex flex-col items-center gap-3 py-12">
                  <Loader2 className="w-7 h-7 text-accent animate-spin" />
                  <p className="text-sm text-muted-foreground">Termine werden geladen…</p>
                </div>
              )}

              {slotsError && (
                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-xl flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-destructive">Termine konnten nicht geladen werden</p>
                    <a href="tel:+49651308524" className="text-sm font-semibold text-accent hover:underline mt-1 inline-block">
                      Telefonisch buchen → 0651 308524
                    </a>
                  </div>
                </div>
              )}

              {!slotsLoading && !slotsError && slots.length > 0 && (() => {
                const year = calendarMonth.getFullYear()
                const month = calendarMonth.getMonth()
                const grid = getMonthGrid(year, month)
                const today = new Date()
                today.setHours(0, 0, 0, 0)
                const monthName = calendarMonth.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })
                const slotsForSelected = selectedDate ? (slotsByDate[selectedDate] || []) : []

                return (
                  <div className="border border-border rounded-xl overflow-hidden bg-secondary/40">
                    <div className="flex items-center justify-between p-3 border-b border-border">
                      <button
                        type="button"
                        onClick={() => setCalendarMonth(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
                        className="p-2 rounded-lg hover:bg-secondary transition-colors"
                        aria-label="Vorheriger Monat"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-semibold capitalize">{monthName}</span>
                      <button
                        type="button"
                        onClick={() => setCalendarMonth(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
                        className="p-2 rounded-lg hover:bg-secondary transition-colors"
                        aria-label="Nächster Monat"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-7 px-2 pt-2">
                      {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(d => (
                        <div key={d} className="text-center text-xs text-muted-foreground/70 font-medium py-1">{d}</div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 px-2 pb-2">
                      {grid.map((date, i) => {
                        if (!date) return <div key={i} />
                        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
                        const hasSlots = !!slotsByDate[key]
                        const isPast = date < today
                        const isSelected = selectedDate === key
                        return (
                          <div key={i} className="flex items-center justify-center py-0.5">
                            <button
                              type="button"
                              disabled={!hasSlots || isPast}
                              onClick={() => { setSelectedDate(key); setSelectedSlot(null) }}
                              className={cn(
                                'w-9 h-9 rounded-full text-sm font-medium transition-all flex items-center justify-center',
                                isPast || !hasSlots ? 'text-muted-foreground/30 cursor-not-allowed' : '',
                                hasSlots && !isPast && !isSelected ? 'text-foreground hover:bg-accent/15 cursor-pointer' : '',
                                isSelected ? 'bg-accent text-accent-foreground font-bold shadow-md' : '',
                              )}
                            >
                              {date.getDate()}
                            </button>
                          </div>
                        )
                      })}
                    </div>

                    {selectedDate && (
                      <div className="border-t border-border p-3 max-h-[170px] overflow-y-auto">
                        <p className="text-sm font-semibold mb-2">{formatDateLong(selectedDate)}</p>
                        <div className="grid grid-cols-3 gap-2">
                          {slotsForSelected.map((slot, i) => {
                            const isActive = selectedSlot?.startDateTime === slot.startDateTime
                            return (
                              <button
                                key={i}
                                type="button"
                                onClick={() => setSelectedSlot(slot)}
                                className={cn(
                                  'p-2 rounded-md border text-sm font-semibold transition-all',
                                  isActive
                                    ? 'border-accent bg-accent text-accent-foreground'
                                    : 'border-border hover:border-accent text-accent bg-card',
                                )}
                              >
                                {formatTime(slot.startDateTime)}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })()}

              {!slotsLoading && !slotsError && slots.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground mb-2">Aktuell sind keine freien Termine online buchbar.</p>
                  <a href="tel:+49651308524" className="text-sm font-semibold text-accent hover:underline">
                    Termin telefonisch vereinbaren → 0651 308524
                  </a>
                </div>
              )}
            </div>
          )}

          {/* ─── Schritt 2: Kontaktdaten ─── */}
          {step === 2 && (
            <div className="flex flex-col gap-3 animate-fade-up">
              <p className="text-base font-semibold">Deine Daten</p>
              {selectedSlot && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/10 border border-accent/20 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                  <span className="font-medium">
                    {formatDateShort(selectedSlot.startDateTime)} · {formatTime(selectedSlot.startDateTime)} Uhr
                  </span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <FloatField label="Vorname *" value={contact.firstName} onChange={v => setContact(c => ({ ...c, firstName: v }))} autoComplete="given-name" />
                <FloatField label="Nachname *" value={contact.lastName} onChange={v => setContact(c => ({ ...c, lastName: v }))} autoComplete="family-name" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[{ value: 'FEMALE' as const, label: '♀ Weiblich' }, { value: 'MALE' as const, label: '♂ Männlich' }].map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setContact(c => ({ ...c, gender: opt.value }))}
                    className={cn(
                      'p-3 rounded-lg border text-sm font-medium transition-all',
                      contact.gender === opt.value
                        ? 'border-accent bg-accent text-accent-foreground'
                        : 'border-border bg-card hover:border-accent/50 text-muted-foreground',
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground/80 mb-1.5">Geburtsdatum *</p>
                <DateOfBirthInput value={contact.dateOfBirth} onChange={v => setContact(c => ({ ...c, dateOfBirth: v }))} />
              </div>

              <FloatField label="Handynummer *" type="tel" value={contact.mobilephone} onChange={v => setContact(c => ({ ...c, mobilephone: v }))} autoComplete="tel" />
              <FloatField label="E-Mail *" type="email" value={contact.email} onChange={v => setContact(c => ({ ...c, email: v }))} autoComplete="email" />

              <div className="grid grid-cols-4 gap-2">
                <div className="col-span-3"><FloatField label="Straße *" value={contact.street} onChange={v => setContact(c => ({ ...c, street: v }))} autoComplete="address-line1" /></div>
                <FloatField label="Nr. *" value={contact.houseNumber} onChange={v => setContact(c => ({ ...c, houseNumber: v }))} />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <FloatField label="PLZ *" value={contact.zip} onChange={v => setContact(c => ({ ...c, zip: v }))} autoComplete="postal-code" />
                <div className="col-span-2"><FloatField label="Stadt *" value={contact.city} onChange={v => setContact(c => ({ ...c, city: v }))} autoComplete="address-level2" /></div>
              </div>

              <label className="flex items-start gap-2.5 cursor-pointer select-none p-3 rounded-lg border border-border hover:border-accent/30 transition-colors">
                <div className="relative mt-0.5 shrink-0">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={contact.marketingConsent}
                    onChange={e => setContact(c => ({ ...c, marketingConsent: e.target.checked }))}
                  />
                  <div className={cn(
                    'w-5 h-5 rounded border-2 flex items-center justify-center transition-all',
                    contact.marketingConsent ? 'border-accent bg-accent' : 'border-muted-foreground/40 bg-card',
                  )}>
                    {contact.marketingConsent && <CheckCircle2 className="w-3 h-3 text-accent-foreground" />}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground leading-snug">
                  Ich bin einverstanden, dass FIT-INN Trier mich per E-Mail und Telefon zur Sommerferien-Aktion und zu Angeboten kontaktiert. Jederzeit widerrufbar.
                </span>
              </label>

              {bookingError && (
                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-destructive">{bookingError}</p>
                    <a href="tel:+49651308524" className="inline-flex items-center gap-1.5 mt-2 text-sm font-semibold text-accent hover:underline">
                      <Phone className="w-3.5 h-3.5" /> Telefonisch buchen · 0651 308524
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between gap-2 mt-5 pt-4 border-t border-border">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground px-2 py-2"
            >
              <ArrowLeft className="w-4 h-4" /> Zurück
            </button>
          ) : <span />}

          {step === 1 && (
            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!selectedSlot}
              className={cn(
                'inline-flex items-center gap-1.5 text-sm px-5 py-3 ml-auto rounded-full font-semibold transition-all',
                selectedSlot ? 'btn-cta' : 'bg-secondary text-muted-foreground/60 cursor-not-allowed border border-border',
              )}
            >
              Weiter <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {step === 2 && (
            <button
              type="button"
              onClick={submitBooking}
              disabled={!contactValid || isBooking}
              className={cn(
                'inline-flex items-center gap-1.5 text-sm px-5 py-3 ml-auto rounded-full font-semibold transition-all',
                contactValid && !isBooking ? 'btn-cta' : 'bg-secondary text-muted-foreground/60 cursor-not-allowed border border-border',
              )}
            >
              {isBooking ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Buche…</>
              ) : (
                <>Termin verbindlich buchen <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function FloatField({
  label, value, onChange, type = 'text', autoComplete,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  autoComplete?: string
}) {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder=" "
        value={value}
        onChange={e => onChange(e.target.value)}
        autoComplete={autoComplete}
        className="peer w-full px-3 pt-5 pb-2 rounded-lg border border-border bg-card text-foreground focus:border-accent focus:ring-1 focus:ring-accent/30 focus:outline-none transition-all"
      />
      <label className="absolute left-3 top-1.5 text-xs font-medium text-muted-foreground/70 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-accent pointer-events-none">
        {label}
      </label>
    </div>
  )
}

function DateOfBirthInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const parts = value.split('-')
  const year = parts[0] || ''
  const month = parts[1] || ''
  const day = parts[2] || ''

  const setPart = (idx: 0 | 1 | 2, v: string) => {
    const padded = idx === 0 ? v : v.padStart(2, '0')
    const next = [year, month, day]
    next[idx] = padded
    onChange(`${next[0] || '2000'}-${next[1] || '01'}-${next[2] || '01'}`)
  }

  const selectClass = 'w-full px-2 py-3 rounded-lg border border-border bg-card text-foreground focus:border-accent focus:ring-1 focus:ring-accent/30 focus:outline-none transition-all appearance-none cursor-pointer'

  return (
    <div className="grid grid-cols-3 gap-2">
      <select aria-label="Geburtstag" value={day ? parseInt(day) : ''} onChange={e => setPart(2, e.target.value)} className={selectClass}>
        <option value="">Tag</option>
        {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (<option key={d} value={d}>{d}</option>))}
      </select>
      <select aria-label="Geburtsmonat" value={month ? parseInt(month) : ''} onChange={e => setPart(1, e.target.value)} className={selectClass}>
        <option value="">Monat</option>
        {['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'].map((m, i) => (<option key={i} value={i + 1}>{m}</option>))}
      </select>
      <select aria-label="Geburtsjahr" value={year ? parseInt(year) : ''} onChange={e => setPart(0, e.target.value)} className={selectClass}>
        <option value="">Jahr</option>
        {Array.from({ length: 80 }, (_, i) => new Date().getFullYear() - 16 - i).map(y => (<option key={y} value={y}>{y}</option>))}
      </select>
    </div>
  )
}
