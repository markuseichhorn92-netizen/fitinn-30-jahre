'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as interest from '@/lib/interest';
import { crm } from '@/lib/onepage-kit';
import styles from './styles.module.css';

// Vollbild-Buchungsstrecke für das Probetraining. Öffnen per window-Event:
//   window.dispatchEvent(new CustomEvent('fi:book', { detail: { source: 'chat' } }))
// Nach Erfolg: window-Event 'fi:booked' mit { startDateTime }.
// Ziel/Erfahrung gehen an FINN (Motivationssatz) und in die Magicline-Notiz.
// Der Trainer-Hinweis (ggf. gesundheitsbezogen) geht NUR in die Magicline-Notiz, nie an FINN.

type Slot = { startDateTime: string; endDateTime?: string };
type Step = 'slot' | 'goal' | 'experience' | 'contact' | 'hint' | 'done';
const ORDER: Step[] = ['slot', 'goal', 'experience', 'contact', 'hint'];
const ease = [0.22, 1, 0.36, 1] as any;
const pad = (n: number) => String(n).padStart(2, '0');
const dayKey = (iso: string) => { const d = new Date(iso); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
const fmtDay = (key: string) => { const [y, m, d] = key.split('-').map(Number); return new Date(y, m - 1, d).toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit' }); };
const fmtTime = (iso: string) => new Date(iso).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
const fmtFull = (iso: string) => new Date(iso).toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' }) + ', ' + fmtTime(iso) + ' Uhr';
const fill = (t: string, v: Record<string, string | number>) => String(t).replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? ''));
function isAdult(dob: string) { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dob); if (!m) return false; const b = new Date(+m[1], +m[2] - 1, +m[3]); const l = new Date(); l.setFullYear(l.getFullYear() - 18); return b <= l && +m[1] > 1900; }
function getVid() { try { return window.localStorage.getItem('finn_vid') || 'wizard'; } catch { return 'wizard'; } }

const EMPTY = { firstname: '', lastname: '', gender: '', dob: '', email: '', phone: '', street: '', houseNumber: '', zip: '', city: '', consent: false, marketing: false };

export default function Wizard(props: any) {
  const {
    apiBaseUrl, studioId, bookingWindowDays, finnApi, crmFormId,
    title, closeLabel, backLabel, nextLabel, skipLabel, stepLabel, steps,
    slotTitle, slotText, loadingText, noSlotsText, errorSlotsText, moreDaysLabel,
    goalTitle, goalText, goals, expTitle, expText, experiences, finnIntro, finnPrompt,
    trainerLabel, withTrainer, withoutTrainer,
    contactTitle, contactText, firstNameLabel, lastNameLabel, genderLabel, femaleLabel, maleLabel, dobLabel, emailLabel, phoneLabel,
    streetLabel, houseNoLabel, zipLabel, cityLabel, consentText, marketingText, privacyLabel, privacyHref, validationText,
    hintTitle, hintText, hintPlaceholder, hintConsent, hintThanks,
    submitLabel, sendingLabel, bookErrorText, phoneDisplay, phoneHref, successTitle, successText, successClose, noteSource,
    finnSlot, finnGoal, finnContact, finnHint, finnDone, finnDonePrompt,
  } = props;
  const [doneLine, setDoneLine] = useState('');

  const [open, setOpen] = useState(false);
  const [source, setSource] = useState('form');
  const [step, setStep] = useState<Step>('slot');
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotState, setSlotState] = useState<'loading' | 'ok' | 'empty' | 'error'>('loading');
  const [day, setDay] = useState<string | null>(null);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [showAllDays, setShowAllDays] = useState(false);
  const [goal, setGoal] = useState<any>(null);
  const [exp, setExp] = useState<any>(null);
  const [trainer, setTrainer] = useState(true);
  const [finnLine, setFinnLine] = useState('');
  const [form, setForm] = useState({ ...EMPTY });
  const [hint, setHint] = useState('');
  const [hintOk, setHintOk] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const reset = () => { setStep('slot'); setDay(null); setSlot(null); setShowAllDays(false); setGoal(null); setExp(null); setTrainer(true); setFinnLine(''); setForm({ ...EMPTY }); setHint(''); setHintOk(false); setInvalid(false); setFailed(false); };

  // Öffnen per Event, Termine laden
  useEffect(() => {
    const onOpen = (e: any) => {
      reset();
      setSource(String(e?.detail?.source || 'form'));
      setOpen(true);
      interest.reportBooking('start', String(e?.detail?.source || 'form'));
      setSlotState('loading');
      const today = new Date(); const end = new Date(today); end.setDate(end.getDate() + Number(bookingWindowDays));
      const iso = (d: Date) => d.toISOString().split('T')[0];
      fetch(`${apiBaseUrl}/trialsession?studioId=${studioId}&startDate=${iso(today)}&endDate=${iso(end)}`)
        .then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.json(); })
        .then((d: any) => { const now = Date.now(); const arr: Slot[] = (Array.isArray(d.slots) ? d.slots : []).filter((s: Slot) => new Date(s.startDateTime).getTime() > now); setSlots(arr); setSlotState(arr.length ? 'ok' : 'empty'); })
        .catch(() => setSlotState('error'));
    };
    window.addEventListener('fi:book', onOpen as any);
    return () => window.removeEventListener('fi:book', onOpen as any);
  }, [apiBaseUrl, studioId, bookingWindowDays]);

  // Seite hinter dem Fenster einfrieren, Esc schließt
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow; document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [open]);
  useEffect(() => { if (boxRef.current) boxRef.current.scrollTo({ top: 0 }); }, [step]);

  const days = useMemo(() => Array.from(new Set(slots.map((s) => dayKey(s.startDateTime)))), [slots]);
  const timesForDay = day ? slots.filter((s) => dayKey(s.startDateTime) === day) : [];
  const idx = ORDER.indexOf(step === 'done' ? 'hint' : step);
  const goTo = (s: Step) => { setInvalid(false); setFailed(false); setStep(s); };
  const next = () => goTo(ORDER[Math.min(idx + 1, ORDER.length - 1)]);
  const back = () => goTo(ORDER[Math.max(idx - 1, 0)]);

  // FINN-Satz nach Ziel + Erfahrung (Rückfall: feste Sätze aus dem Inhalt)
  useEffect(() => {
    if (step !== 'contact' || !goal || !exp) return;
    const fallback = `${exp.finn} ${goal.finn}`;
    setFinnLine(fallback);
    if (!finnApi) return;
    const ctrl = new AbortController(); const to = setTimeout(() => ctrl.abort(), 4500);
    fetch(finnApi, { method: 'POST', headers: { 'content-type': 'application/json' }, signal: ctrl.signal, body: JSON.stringify({ message: fill(finnPrompt, { ziel: goal.label, erfahrung: exp.label }), history: [], visitorId: getVid() }) })
      .then((r) => r.json()).then((d: any) => { clearTimeout(to); const t = d && typeof d.answer === 'string' ? d.answer.replace(/\*\*|__|#/g, '').replace(/\s+/g, ' ').trim() : ''; if (t.length >= 25 && t.length <= 220 && !/http|\d\s?€|€\s?\d|diagnos|arzt|schmerz/i.test(t)) setFinnLine(t); })
      .catch(() => clearTimeout(to));
    return () => { clearTimeout(to); ctrl.abort(); };
  }, [step, goal, exp, finnApi, finnPrompt]);

  const vorname = form.firstname.trim() || 'du';
  const terminStr = slot ? fmtFull(slot.startDateTime) : '';
  const stepLine = (): string => {
    if (step === 'goal') return slot ? fill(finnSlot, { termin: terminStr }) : '';
    if (step === 'experience') return goal ? fill(finnGoal, { ziel: goal.label }) : '';
    if (step === 'contact') return finnLine || finnContact;
    if (step === 'hint') return fill(finnHint, { vorname });
    if (step === 'done') return doneLine || fill(finnDone, { vorname, termin: terminStr });
    return '';
  };
  // Persönliche Begrüßung zum Abschluss (FINN, Rückfall: fester Text)
  useEffect(() => {
    if (step !== 'done' || !finnApi) return;
    const ctrl = new AbortController(); const to = setTimeout(() => ctrl.abort(), 5000);
    fetch(finnApi, { method: 'POST', headers: { 'content-type': 'application/json' }, signal: ctrl.signal, body: JSON.stringify({ message: fill(finnDonePrompt, { vorname, ziel: goal?.label || 'nicht angegeben', erfahrung: exp?.label || 'nicht angegeben', termin: terminStr }), history: [], visitorId: getVid() }) })
      .then((r) => r.json()).then((d: any) => { clearTimeout(to); const t = d && typeof d.answer === 'string' ? d.answer.replace(/\*\*|__|#/g, '').replace(/\s+/g, ' ').trim() : ''; if (t.length >= 25 && t.length <= 260 && !/http|\d\s?€|€\s?\d|diagnos|arzt|schmerz/i.test(t)) setDoneLine(t); })
      .catch(() => clearTimeout(to));
    return () => { clearTimeout(to); ctrl.abort(); };
  }, [step]);

  const setF = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));
  const formValid = form.firstname.trim().length > 1 && form.lastname.trim().length > 1 && (form.gender === 'FEMALE' || form.gender === 'MALE') && isAdult(form.dob) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) && form.phone.replace(/\D/g, '').length >= 6 && form.street.trim().length > 1 && form.houseNumber.trim().length > 0 && /^\d{4,5}$/.test(form.zip.trim()) && form.city.trim().length > 1 && form.consent;

  const submit = async () => {
    if (!slot) return;
    const hintText = hint.trim() && hintOk ? hint.trim().slice(0, 300) : '';
    const note = [
      (noteSource && noteSource[source]) || noteSource?.form || 'Gebucht über Aktionsseite',
      goal ? `Ziel: ${goal.label}` : '', exp ? `Erfahrung: ${exp.label}` : '',
      `Begleitung: ${trainer ? 'mit Trainer' : 'ohne Trainer'}`,
      interest.interestNote(),
      hintText ? `Hinweis für Trainer: ${hintText}` : '',
    ].filter(Boolean).join(' · ');
    setSending(true); setFailed(false);
    try {
      const r = await fetch(`${apiBaseUrl}/trialsession/book`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
        studioId: Number(studioId), startDateTime: slot.startDateTime, trainerRequired: trainer, note,
        leadCustomer: { firstname: form.firstname.trim(), lastname: form.lastname.trim(), email: form.email.trim(), phone: form.phone.trim(), gender: form.gender, dateOfBirth: form.dob,
          address: { street: form.street.trim(), houseNumber: form.houseNumber.trim(), zip: form.zip.trim(), city: form.city.trim(), country: 'DE' },
          privacyConfiguration: { email: form.marketing, phone: form.marketing, letter: false, textMessage: form.marketing, mySportsMessage: false } } }) });
      if (!r.ok) throw new Error(String(r.status));
      interest.reportBooking('success', source);
      if (crmFormId) { try { crm.submitForm({ formId: String(crmFormId), data: { name: { firstName: form.firstname.trim(), lastName: form.lastname.trim() }, email: form.email.trim(), phone: form.phone.trim(), termin: fmtFull(slot.startDateTime), trainer: trainer ? 'Mit Trainer' : 'Ohne Trainer', note: [goal?.label, exp?.label].filter(Boolean).join(' / '), marketing: form.marketing, quelle: source } }).catch(() => {}); } catch { /* optional */ } }
      window.dispatchEvent(new CustomEvent('fi:booked', { detail: { startDateTime: slot.startDateTime, source } }));
      setStep('done');
    } catch { setFailed(true); } finally { setSending(false); }
  };

  if (!open) return null;
  const total = ORDER.length;
  const stepTitle = step === 'done' ? successTitle : steps[step];

  return (
    <div className={styles.root} role="dialog" aria-modal="true" aria-label={title}>
      <div className={styles.backdrop} onClick={() => setOpen(false)} aria-hidden="true" />
      <div className={styles.box} ref={boxRef}>
        <div className={styles.head}>
          <div className={styles.headText}>
            <span className={styles.stepNo}>{step === 'done' ? title : fill(stepLabel, { n: idx + 1, total })}</span>
            <strong>{stepTitle}</strong>
          </div>
          <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label={closeLabel}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
        {step !== 'done' ? <div className={styles.progress} aria-hidden="true"><span style={{ width: `${((idx + 1) / total) * 100}%` }} /></div> : null}

        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={step} className={styles.body} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.28, ease }}>
            {stepLine() ? (
              <motion.div className={styles.finn} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.15, ease }}>
                <span className={styles.finnAvatar} aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9z" /></svg></span>
                <div><span className={styles.finnLabel}>{finnIntro}</span><p key={stepLine()}>{stepLine()}</p></div>
              </motion.div>
            ) : null}

            {step === 'slot' ? (
              <>
                <h2 className={styles.h}>{slotTitle}</h2>
                <p className={styles.p}>{slotText}</p>
                {slotState === 'loading' ? <p className={styles.muted}>{loadingText}</p> : null}
                {slotState === 'empty' ? <p className={styles.alert}>{noSlotsText} <a href={phoneHref}>{phoneDisplay}</a></p> : null}
                {slotState === 'error' ? <p className={styles.alert}>{errorSlotsText} <a href={phoneHref}>{phoneDisplay}</a></p> : null}
                {slotState === 'ok' ? (
                  <>
                    <div className={styles.chips}>
                      {(showAllDays ? days : days.slice(0, 6)).map((d) => (
                        <button key={d} type="button" className={`${styles.chip} ${day === d ? styles.chipOn : ''}`} aria-pressed={day === d} onClick={() => { setDay(d); setSlot(null); }}>{fmtDay(d)}</button>
                      ))}
                      {!showAllDays && days.length > 6 ? <button type="button" className={styles.chipMore} onClick={() => setShowAllDays(true)}>{moreDaysLabel}</button> : null}
                    </div>
                    {day ? (
                      <div className={styles.times}>
                        {timesForDay.map((s) => (
                          <button key={s.startDateTime} type="button" className={`${styles.time} ${slot?.startDateTime === s.startDateTime ? styles.timeOn : ''}`} aria-pressed={slot?.startDateTime === s.startDateTime} onClick={() => setSlot(s)}>{fmtTime(s.startDateTime)}</button>
                        ))}
                      </div>
                    ) : null}
                  </>
                ) : null}
              </>
            ) : null}

            {step === 'goal' ? (
              <>
                <h2 className={styles.h}>{goalTitle}</h2>
                <p className={styles.p}>{goalText}</p>
                <div className={styles.options}>
                  {(goals || []).map((g: any) => (
                    <button key={g.key} type="button" className={`${styles.option} ${goal?.key === g.key ? styles.optionOn : ''}`} aria-pressed={goal?.key === g.key} onClick={() => { setGoal(g); interest.signal('goal', g.label); setTimeout(next, 180); }}>{g.label}</button>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'experience' ? (
              <>
                <h2 className={styles.h}>{expTitle}</h2>
                <p className={styles.p}>{expText}</p>
                <div className={styles.options}>
                  {(experiences || []).map((x: any) => (
                    <button key={x.key} type="button" className={`${styles.option} ${exp?.key === x.key ? styles.optionOn : ''}`} aria-pressed={exp?.key === x.key} onClick={() => { setExp(x); setTrainer(!!x.trainer); interest.signal('experience', x.label); setTimeout(next, 180); }}>{x.label}</button>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'contact' ? (
              <>
                <h2 className={styles.h}>{contactTitle}</h2>
                <p className={styles.p}>{contactText}</p>
                {slot ? <p className={styles.recap}>{fmtFull(slot.startDateTime)}</p> : null}
                <fieldset className={styles.seg}><legend>{trainerLabel}</legend>
                  <button type="button" aria-pressed={trainer} className={trainer ? styles.segOn : ''} onClick={() => setTrainer(true)}>{withTrainer}</button>
                  <button type="button" aria-pressed={!trainer} className={!trainer ? styles.segOn : ''} onClick={() => setTrainer(false)}>{withoutTrainer}</button>
                </fieldset>
                <div className={styles.row2}>
                  <label className={styles.field}><span>{firstNameLabel}</span><input type="text" autoComplete="given-name" value={form.firstname} onChange={(e) => setF('firstname', e.target.value)} /></label>
                  <label className={styles.field}><span>{lastNameLabel}</span><input type="text" autoComplete="family-name" value={form.lastname} onChange={(e) => setF('lastname', e.target.value)} /></label>
                </div>
                <fieldset className={styles.seg}><legend>{genderLabel}</legend>
                  <button type="button" aria-pressed={form.gender === 'FEMALE'} className={form.gender === 'FEMALE' ? styles.segOn : ''} onClick={() => setF('gender', 'FEMALE')}>{femaleLabel}</button>
                  <button type="button" aria-pressed={form.gender === 'MALE'} className={form.gender === 'MALE' ? styles.segOn : ''} onClick={() => setF('gender', 'MALE')}>{maleLabel}</button>
                </fieldset>
                <label className={styles.field}><span>{dobLabel}</span><input type="date" autoComplete="bday" max={(() => { const d = new Date(); d.setFullYear(d.getFullYear() - 18); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; })()} min="1920-01-01" value={form.dob} onChange={(e) => setF('dob', e.target.value)} /></label>
                <label className={styles.field}><span>{emailLabel}</span><input type="email" inputMode="email" autoComplete="email" value={form.email} onChange={(e) => setF('email', e.target.value)} /></label>
                <label className={styles.field}><span>{phoneLabel}</span><input type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(e) => setF('phone', e.target.value)} /></label>
                <div className={styles.row31}>
                  <label className={styles.field}><span>{streetLabel}</span><input type="text" autoComplete="address-line1" value={form.street} onChange={(e) => setF('street', e.target.value)} /></label>
                  <label className={styles.field}><span>{houseNoLabel}</span><input type="text" value={form.houseNumber} onChange={(e) => setF('houseNumber', e.target.value)} /></label>
                </div>
                <div className={styles.row12}>
                  <label className={styles.field}><span>{zipLabel}</span><input type="text" inputMode="numeric" maxLength={5} autoComplete="postal-code" value={form.zip} onChange={(e) => setF('zip', e.target.value)} /></label>
                  <label className={styles.field}><span>{cityLabel}</span><input type="text" autoComplete="address-level2" value={form.city} onChange={(e) => setF('city', e.target.value)} /></label>
                </div>
                <label className={styles.check}><input type="checkbox" checked={form.consent} onChange={(e) => setF('consent', e.target.checked)} /><span>{consentText} <a href={privacyHref} target="_blank" rel="noopener noreferrer">{privacyLabel}</a></span></label>
                <label className={styles.check}><input type="checkbox" checked={form.marketing} onChange={(e) => setF('marketing', e.target.checked)} /><span>{marketingText}</span></label>
                {invalid ? <p className={styles.alert} role="alert">{validationText}</p> : null}
              </>
            ) : null}

            {step === 'hint' ? (
              <>
                <h2 className={styles.h}>{hintTitle}</h2>
                <p className={styles.p}>{hintText}</p>
                <textarea className={styles.textarea} rows={4} maxLength={300} placeholder={hintPlaceholder} value={hint} onChange={(e) => setHint(e.target.value)} />
                {hint.trim() ? (
                  <label className={styles.check}><input type="checkbox" checked={hintOk} onChange={(e) => setHintOk(e.target.checked)} /><span>{hintConsent}</span></label>
                ) : null}
                {hint.trim() && hintOk ? <p className={styles.thanks}>{hintThanks}</p> : null}
                {failed ? <p className={styles.alert} role="alert">{bookErrorText} <a href={phoneHref}>{phoneDisplay}</a></p> : null}
              </>
            ) : null}

            {step === 'done' && slot ? (
              <div className={styles.done}>
                <span className={styles.doneIcon} aria-hidden="true"><svg width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M5 12.5 10 17.5 19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                <h2 className={styles.h}>{successTitle}</h2>
                <p className={styles.recap}>{fmtFull(slot.startDateTime)} · {trainer ? withTrainer.replace(/\s*\(.*\)/, '') : withoutTrainer}</p>
                <p className={styles.p}>{successText}</p>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>

        <div className={styles.foot}>
          {step === 'done' ? (
            <button type="button" className={styles.primary} onClick={() => setOpen(false)}>{successClose}</button>
          ) : (
            <>
              {idx > 0 ? <button type="button" className={styles.ghost} onClick={back} disabled={sending}>{backLabel}</button> : <span />}
              {step === 'slot' ? <button type="button" className={styles.primary} disabled={!slot} onClick={next}>{nextLabel}</button> : null}
              {step === 'goal' || step === 'experience' ? <button type="button" className={styles.ghost} onClick={next}>{skipLabel}</button> : null}
              {step === 'contact' ? <button type="button" className={styles.primary} onClick={() => { if (!formValid) { setInvalid(true); return; } next(); }}>{nextLabel}</button> : null}
              {step === 'hint' ? <button type="button" className={styles.primary} disabled={sending || (!!hint.trim() && !hintOk)} onClick={submit}>{sending ? sendingLabel : submitLabel}</button> : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
