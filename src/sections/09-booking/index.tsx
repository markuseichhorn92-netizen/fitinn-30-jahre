'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { crm } from '@/lib/onepage-kit';
import './styles.css';

type Slot = { startDateTime: string; endDateTime: string };

function toLocalDateKey(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
}
function formatDateLong(key: string) {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' });
}
function formatDateShort(iso: string) {
  return new Date(iso).toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' });
}
function getMonthGrid(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  const grid: (Date | null)[] = [];
  for (let i = 0; i < offset; i++) grid.push(null);
  for (let d = 1; d <= days; d++) grid.push(new Date(year, month, d));
  return grid;
}
const WEEKDAYS = Array.from({ length: 7 }, (_, i) =>
  new Date(2024, 0, i + 1).toLocaleDateString('de-DE', { weekday: 'short' })
);
const MONTHS = Array.from({ length: 12 }, (_, i) =>
  new Date(2000, i, 1).toLocaleDateString('de-DE', { month: 'short' })
);

export default function FitInnBookingForm(props: any) {
  const {
    eyebrow, headline, subheadline,
    stepSlotTitle, loadingText, slotsErrorText, noSlotsText, phoneFallbackLabel,
    prevMonthAria, nextMonthAria,
    stepContactTitle, firstNameLabel, lastNameLabel, genderFemaleLabel, genderMaleLabel,
    dobLabel, dayLabel, monthLabel, yearLabel,
    emailLabel, phoneLabel, streetLabel, houseNumberLabel, zipLabel, cityLabel,
    noteLabel, marketingConsentText,
    backLabel, nextLabel, submitLabel, bookingLoadingLabel,
    validationError, bookingErrorText, successTitle, successText, privacyNote,
    contactIntro, contactPhone, contactInstagram, contactInstagramHref, contactAddress,
    bookingWindowDays, apiBaseUrl, studioId, bgColor,
    crmFormId, crmSource, crmTrainerValue
  } = props;

  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(1);

  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(true);
  const [slotsError, setSlotsError] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState<'MALE' | 'FEMALE' | ''>('');
  const [dobDay, setDobDay] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobYear, setDobYear] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
  const [note, setNote] = useState('');
  const [consent, setConsent] = useState(false);

  const [status, setStatus] = useState<'idle' | 'validation' | 'bookingError' | 'success'>('idle');
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0, rootMargin: '0px 0px 120px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const today = new Date();
    const end = new Date(today);
    end.setDate(end.getDate() + Number(bookingWindowDays));
    const fmt = (d: Date) => d.toISOString().split('T')[0];
    setSlotsLoading(true);
    setSlotsError(false);
    fetch(`${apiBaseUrl}/trialsession?studioId=${studioId}&startDate=${fmt(today)}&endDate=${fmt(end)}`)
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((d: any) => {
        const arr: Slot[] = Array.isArray(d.slots) ? d.slots : [];
        setSlots(arr);
        if (arr.length > 0) {
          const first = new Date(arr[0].startDateTime);
          setCalendarMonth(new Date(first.getFullYear(), first.getMonth(), 1));
        }
      })
      .catch(() => setSlotsError(true))
      .finally(() => setSlotsLoading(false));
  }, [bookingWindowDays, apiBaseUrl, studioId]);

  const slotsByDate = useMemo(() => {
    const map: Record<string, Slot[]> = {};
    for (const slot of slots) {
      const key = toLocalDateKey(slot.startDateTime);
      map[key] = [...(map[key] || []), slot];
    }
    return map;
  }, [slots]);

  const dateOfBirth = dobYear && dobMonth && dobDay
    ? `${dobYear}-${String(dobMonth).padStart(2, '0')}-${String(dobDay).padStart(2, '0')}`
    : '';

  const contactValid =
    firstName.trim().length > 1 &&
    lastName.trim().length > 1 &&
    gender !== '' &&
    /^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    phone.trim().length > 6 &&
    street.trim().length > 1 &&
    houseNumber.trim().length > 0 &&
    zip.trim().length >= 4 &&
    city.trim().length > 1;

  const submitBooking = async () => {
    if (!selectedSlot) return;
    if (!contactValid) {
      setStatus('validation');
      return;
    }
    setIsBooking(true);
    setStatus('idle');
    try {
      const res = await fetch(`${apiBaseUrl}/trialsession/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studioId: Number(studioId),
          startDateTime: selectedSlot.startDateTime,
          trainerRequired: true,
          note,
          leadCustomer: {
            firstname: firstName,
            lastname: lastName,
            email,
            phone,
            gender,
            dateOfBirth,
            address: { street, houseNumber, zip, city, country: 'DE' },
            privacyConfiguration: {
              email: consent,
              phone: consent,
              letter: false,
              textMessage: consent,
              mySportsMessage: false
            }
          }
        })
      });
      if (res.ok && crmFormId) {
        // Zusätzlich ins Onepage-CRM – Magicline bleibt führend, Fehler hier stören die Buchung nicht.
        try {
          crm.submitForm({
            formId: String(crmFormId),
            data: {
              name: { firstName, lastName },
              email,
              phone,
              gender: gender === 'FEMALE' ? genderFemaleLabel : genderMaleLabel,
              dateOfBirth,
              address: { country: 'DE', addressFirst: `${street} ${houseNumber}`.trim(), addressSecond: '', postalCode: zip, province: '', city },
              termin: `${formatDateShort(selectedSlot.startDateTime)} ${formatTime(selectedSlot.startDateTime)}`,
              trainer: crmTrainerValue,
              note,
              marketing: consent,
              quelle: crmSource
            }
          }).catch(() => {});
        } catch { /* CRM optional */ }
      }
      setStatus(res.ok ? 'success' : 'bookingError');
    } catch {
      setStatus('bookingError');
    } finally {
      setIsBooking(false);
    }
  };

  const telHref = 'tel:' + String(contactPhone).replace(/\s/g, '');
  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth();
  const grid = getMonthGrid(year, month);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const monthName = calendarMonth.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' });
  const slotsForSelected = selectedDate ? (slotsByDate[selectedDate] || []) : [];
  const currentYear = new Date().getFullYear();

  return (
    <section id="anmeldung" className="fi-cta" style={{ background: bgColor }}>
      <div ref={ref} className={'fi-cta__inner' + (visible ? ' is-visible' : '')}>
        <div>
          <span className="fi-cta__eyebrow">{eyebrow}</span>
          <h2 className="fi-cta__headline">{headline}</h2>
          <p className="fi-cta__sub">{subheadline}</p>
          <div className="fi-cta__contact">
            <p>{contactIntro} <a className="fi-cta__phone" href={telHref}>{contactPhone}</a></p>
            <p><a href={contactInstagramHref} target="_blank" rel="noopener noreferrer">{contactInstagram}</a></p>
            <p>{contactAddress}</p>
          </div>
        </div>

        <div className="fi-cta__form">
          {status === 'success' ? (
            <div className="fi-cta__success" role="status">
              <span className="fi-cta__successicon" aria-hidden="true">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12.5 10 17.5 19 7" stroke="#05090B" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p className="fi-cta__successtitle">{successTitle}</p>
              {selectedSlot && (
                <p className="fi-cta__successslot">
                  {formatDateShort(selectedSlot.startDateTime)} · {formatTime(selectedSlot.startDateTime)}
                </p>
              )}
              <p className="fi-cta__successtext">{successText}</p>
            </div>
          ) : (
            <>
              <div className="fi-cta__progress" aria-hidden="true">
                <span className={step >= 1 ? 'is-active' : ''} />
                <span className={step >= 2 ? 'is-active' : ''} />
              </div>

              {step === 1 && (
                <>
                  <h3 className="fi-cta__steptitle">{stepSlotTitle}</h3>

                  {slotsLoading && (
                    <div className="fi-cta__loading">
                      <span className="fi-cta__spinner" aria-hidden="true" />
                      {loadingText}
                    </div>
                  )}

                  {!slotsLoading && slotsError && (
                    <p className="fi-cta__msg fi-cta__msg--error" role="alert">
                      {slotsErrorText}{' '}
                      <a href={telHref}>{phoneFallbackLabel} · {contactPhone}</a>
                    </p>
                  )}

                  {!slotsLoading && !slotsError && slots.length === 0 && (
                    <p className="fi-cta__msg fi-cta__msg--info">
                      {noSlotsText}{' '}
                      <a href={telHref}>{phoneFallbackLabel} · {contactPhone}</a>
                    </p>
                  )}

                  {!slotsLoading && !slotsError && slots.length > 0 && (
                    <div className="fi-cal">
                      <div className="fi-cal__head">
                        <button type="button" className="fi-cal__nav" aria-label={prevMonthAria}
                          onClick={() => setCalendarMonth(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        <span className="fi-cal__month">{monthName}</span>
                        <button type="button" className="fi-cal__nav" aria-label={nextMonthAria}
                          onClick={() => setCalendarMonth(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                      <div className="fi-cal__weekdays">
                        {WEEKDAYS.map((d, i) => (
                          <div key={i} className="fi-cal__weekday">{d}</div>
                        ))}
                      </div>
                      <div className="fi-cal__grid">
                        {grid.map((date, i) => {
                          if (!date) return <div key={i} className="fi-cal__day" />;
                          const localKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                          const hasSlots = !!slotsByDate[localKey];
                          const isPast = date < today;
                          const isSelected = selectedDate === localKey;
                          return (
                            <div key={localKey} className="fi-cal__day">
                              <button type="button"
                                className={'fi-cal__daybtn' + (isSelected ? ' is-selected' : '')}
                                disabled={!hasSlots || isPast}
                                aria-pressed={isSelected}
                                onClick={() => { setSelectedDate(localKey); setSelectedSlot(null); }}>
                                {date.getDate()}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                      {selectedDate && (
                        <div className="fi-cal__slots">
                          <p className="fi-cal__slotsdate">{formatDateLong(selectedDate)}</p>
                          <div className="fi-cal__slotgrid">
                            {slotsForSelected.map((slot, i) => {
                              const active = selectedSlot?.startDateTime === slot.startDateTime;
                              return (
                                <button key={i} type="button" aria-pressed={active}
                                  className={'fi-cal__slot' + (active ? ' is-selected' : '')}
                                  onClick={() => setSelectedSlot(slot)}>
                                  {formatTime(slot.startDateTime)}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="fi-cta__actions">
                    <span />
                    <button type="button" className="fi-cta__submit" disabled={!selectedSlot} onClick={() => setStep(2)}>
                      {nextLabel}
                    </button>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h3 className="fi-cta__steptitle">{stepContactTitle}</h3>

                  {selectedSlot && (
                    <div className="fi-cta__recap">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M5 12.5 10 17.5 19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {formatDateShort(selectedSlot.startDateTime)} · {formatTime(selectedSlot.startDateTime)}
                    </div>
                  )}

                  {status === 'validation' && (
                    <p className="fi-cta__msg fi-cta__msg--error" role="alert">{validationError}</p>
                  )}
                  {status === 'bookingError' && (
                    <p className="fi-cta__msg fi-cta__msg--error" role="alert">
                      {bookingErrorText}{' '}
                      <a href={telHref}>{phoneFallbackLabel} · {contactPhone}</a>
                    </p>
                  )}

                  <div className="fi-cta__row2">
                    <div className="fi-cta__field">
                      <label className="fi-cta__label" htmlFor="fi5-fn">{firstNameLabel}</label>
                      <input id="fi5-fn" className="fi-cta__input" type="text" autoComplete="given-name"
                        value={firstName} aria-invalid={status === 'validation' && firstName.trim().length <= 1}
                        onChange={e => setFirstName(e.target.value)} />
                    </div>
                    <div className="fi-cta__field">
                      <label className="fi-cta__label" htmlFor="fi5-ln">{lastNameLabel}</label>
                      <input id="fi5-ln" className="fi-cta__input" type="text" autoComplete="family-name"
                        value={lastName} aria-invalid={status === 'validation' && lastName.trim().length <= 1}
                        onChange={e => setLastName(e.target.value)} />
                    </div>
                  </div>

                  <div className="fi-cta__gender" role="group">
                    <button type="button" aria-pressed={gender === 'FEMALE'}
                      className={'fi-cta__genderbtn' + (gender === 'FEMALE' ? ' is-active' : '')}
                      onClick={() => setGender('FEMALE')}>{genderFemaleLabel}</button>
                    <button type="button" aria-pressed={gender === 'MALE'}
                      className={'fi-cta__genderbtn' + (gender === 'MALE' ? ' is-active' : '')}
                      onClick={() => setGender('MALE')}>{genderMaleLabel}</button>
                  </div>

                  <div className="fi-cta__field">
                    <span className="fi-cta__label">{dobLabel}</span>
                    <div className="fi-cta__row3">
                      <select className="fi-cta__select" aria-label={dayLabel} value={dobDay}
                        aria-invalid={status === 'validation' && !dobDay} onChange={e => setDobDay(e.target.value)}>
                        <option value="">{dayLabel}</option>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (<option key={d} value={d}>{d}</option>))}
                      </select>
                      <select className="fi-cta__select" aria-label={monthLabel} value={dobMonth}
                        aria-invalid={status === 'validation' && !dobMonth} onChange={e => setDobMonth(e.target.value)}>
                        <option value="">{monthLabel}</option>
                        {MONTHS.map((m, i) => (<option key={i} value={i + 1}>{m}</option>))}
                      </select>
                      <select className="fi-cta__select" aria-label={yearLabel} value={dobYear}
                        aria-invalid={status === 'validation' && !dobYear} onChange={e => setDobYear(e.target.value)}>
                        <option value="">{yearLabel}</option>
                        {Array.from({ length: 83 }, (_, i) => currentYear - 18 - i).map(y => (<option key={y} value={y}>{y}</option>))}
                      </select>
                    </div>
                  </div>

                  <div className="fi-cta__field">
                    <label className="fi-cta__label" htmlFor="fi5-em">{emailLabel}</label>
                    <input id="fi5-em" className="fi-cta__input" type="email" autoComplete="email"
                      value={email} aria-invalid={status === 'validation' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
                      onChange={e => setEmail(e.target.value)} />
                  </div>
                  <div className="fi-cta__field">
                    <label className="fi-cta__label" htmlFor="fi5-ph">{phoneLabel}</label>
                    <input id="fi5-ph" className="fi-cta__input" type="tel" autoComplete="tel"
                      value={phone} aria-invalid={status === 'validation' && phone.trim().length <= 6}
                      onChange={e => setPhone(e.target.value)} />
                  </div>

                  <div className="fi-cta__row31">
                    <div className="fi-cta__field">
                      <label className="fi-cta__label" htmlFor="fi5-st">{streetLabel}</label>
                      <input id="fi5-st" className="fi-cta__input" type="text" autoComplete="address-line1"
                        value={street} aria-invalid={status === 'validation' && street.trim().length <= 1}
                        onChange={e => setStreet(e.target.value)} />
                    </div>
                    <div className="fi-cta__field">
                      <label className="fi-cta__label" htmlFor="fi5-hn">{houseNumberLabel}</label>
                      <input id="fi5-hn" className="fi-cta__input" type="text"
                        value={houseNumber} aria-invalid={status === 'validation' && houseNumber.trim().length === 0}
                        onChange={e => setHouseNumber(e.target.value)} />
                    </div>
                  </div>
                  <div className="fi-cta__row12">
                    <div className="fi-cta__field">
                      <label className="fi-cta__label" htmlFor="fi5-zip">{zipLabel}</label>
                      <input id="fi5-zip" className="fi-cta__input" type="text" autoComplete="postal-code" inputMode="numeric"
                        value={zip} aria-invalid={status === 'validation' && zip.trim().length < 4}
                        onChange={e => setZip(e.target.value)} />
                    </div>
                    <div className="fi-cta__field">
                      <label className="fi-cta__label" htmlFor="fi5-ci">{cityLabel}</label>
                      <input id="fi5-ci" className="fi-cta__input" type="text" autoComplete="address-level2"
                        value={city} aria-invalid={status === 'validation' && city.trim().length <= 1}
                        onChange={e => setCity(e.target.value)} />
                    </div>
                  </div>

                  <div className="fi-cta__field">
                    <label className="fi-cta__label" htmlFor="fi5-note">{noteLabel}</label>
                    <textarea id="fi5-note" className="fi-cta__textarea" value={note} onChange={e => setNote(e.target.value)} />
                  </div>

                  <label className="fi-cta__consent">
                    <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)}
                      style={{ position: 'absolute', opacity: 0, width: 1, height: 1 }} />
                    <span className={'fi-cta__checkbox' + (consent ? ' is-checked' : '')} aria-hidden="true">
                      {consent && (
                        <svg viewBox="0 0 12 12" fill="none">
                          <path d="M2 6.2 4.8 9 10 3.4" stroke="#05090B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <span className="fi-cta__consenttext">{marketingConsentText}</span>
                  </label>

                  <div className="fi-cta__actions">
                    <button type="button" className="fi-cta__back" onClick={() => setStep(1)}>{backLabel}</button>
                    <button type="button" className="fi-cta__submit" disabled={isBooking} onClick={submitBooking}>
                      {isBooking ? bookingLoadingLabel : submitLabel}
                    </button>
                  </div>
                  <p className="fi-cta__note">{privacyNote}</p>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
