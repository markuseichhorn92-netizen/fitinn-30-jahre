'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as interest from '@/lib/interest';
import { crm } from '@/lib/onepage-kit';
import { funnel } from '@/lib/funnel';
import styles from './styles.module.css';

// Vollbild-Buchungsstrecke für das Probetraining. Öffnen per window-Event:
//   window.dispatchEvent(new CustomEvent('fi:book', { detail: { source: 'chat' } }))
// Nach Erfolg: window-Event 'fi:booked' mit { startDateTime }.
// Ziel/Erfahrung gehen an FINN (Motivationssatz) und in die Magicline-Notiz.
// Der Trainer-Hinweis (ggf. gesundheitsbezogen) geht NUR in die Magicline-Notiz, nie an FINN.

type Slot = { startDateTime: string; endDateTime?: string };
type Step = 'slot' | 'goal' | 'experience' | 'focus' | 'name' | 'contact' | 'address' | 'confirm' | 'hint' | 'done';
const ORDER: Step[] = ['slot', 'goal', 'experience', 'focus', 'name', 'contact', 'address', 'confirm', 'hint'];
const ease = [0.22, 1, 0.36, 1] as any;
const pad = (n: number) => String(n).padStart(2, '0');
const dayKey = (iso: string) => { const d = new Date(iso); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
const fmtDay = (key: string) => { const [y, m, d] = key.split('-').map(Number); return new Date(y, m - 1, d).toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit' }); };
const dayParts = (key: string) => { const [y, m, d] = key.split('-').map(Number); const dt = new Date(y, m - 1, d); return { wd: dt.toLocaleDateString('de-DE', { weekday: 'short' }).replace('.', ''), d: pad(d), mon: dt.toLocaleDateString('de-DE', { month: 'short' }).replace('.', '') }; };
const daypart = (iso: string) => { const h = new Date(iso).getHours(); return h < 12 ? 'Vormittags' : h < 17 ? 'Nachmittags' : 'Abends'; };
const fmtShort = (iso: string) => new Date(iso).toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit' }) + ', ' + fmtTime(iso);
const fmtTime = (iso: string) => new Date(iso).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
const fmtFull = (iso: string) => new Date(iso).toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' }) + ', ' + fmtTime(iso) + ' Uhr';
const fill = (t: string, v: Record<string, string | number>) => String(t).replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? ''));
function isAdult(dob: string) { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dob); if (!m) return false; const b = new Date(+m[1], +m[2] - 1, +m[3]); const l = new Date(); l.setFullYear(l.getFullYear() - 18); return b <= l && +m[1] > 1900; }
function getVid() { try { return window.localStorage.getItem('finn_vid') || 'wizard'; } catch { return 'wizard'; } }

const EMPTY = { firstname: '', lastname: '', gender: '', dob: '', email: '', phone: '', street: '', houseNumber: '', zip: '', city: '', consent: false, marketing: false };

function OptIcon({ kind }: { kind?: string }) {
  const P = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const k = String(kind || '');
  if (k === 'flame') return <svg width="20" height="20" viewBox="0 0 24 24" {...P}><path d="M12 3c1 3 4 4 4 8a4 4 0 0 1-8 0c0-1 .3-2 1-3 0 2 1 3 2 3 0-3-1-5 1-8z" /><path d="M8 14a6 6 0 1 0 8 0" /></svg>;
  if (k === 'dumbbell') return <svg width="20" height="20" viewBox="0 0 24 24" {...P}><path d="M6 8v8M18 8v8M3 10v4M21 10v4M6 12h12" /></svg>;
  if (k === 'heart') return <svg width="20" height="20" viewBox="0 0 24 24" {...P}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" /></svg>;
  if (k === 'spine') return <svg width="20" height="20" viewBox="0 0 24 24" {...P}><path d="M12 3v18M8 7h8M8 12h8M8 17h8" /></svg>;
  if (k === 'leaf') return <svg width="20" height="20" viewBox="0 0 24 24" {...P}><path d="M4 20c0-8 6-14 16-14-1 9-6 14-14 14z" /><path d="M4 20c4-4 8-7 12-9" /></svg>;
  if (k === 'restart') return <svg width="20" height="20" viewBox="0 0 24 24" {...P}><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" /></svg>;
  return <svg width="20" height="20" viewBox="0 0 24 24" {...P}><circle cx="12" cy="12" r="8" /></svg>;
}

export default function Wizard(props: any) {
  const {
    apiBaseUrl, studioId, bookingWindowDays, finnApi, crmFormId,
    title, closeLabel, backLabel, nextLabel, skipLabel, stepLabel, steps,
    slotTitle, slotText, loadingText, noSlotsText, errorSlotsText, moreDaysLabel, dayLabel, timeLabel, pickTimeLabel,
    goalTitle, goalText, goals, expTitle, expText, experiences, finnIntro, finnPrompt,
    focusTitle, focusText, focusMax, focusByGoal, finnFocus, planTitle, planNote, trainerRecommended, trainerFree,
    trainerLabel, withTrainer, withoutTrainer,
    contactTitle, contactText, firstNameLabel, lastNameLabel, genderLabel, femaleLabel, maleLabel, dobLabel, emailLabel, phoneLabel,
    streetLabel, houseNoLabel, zipLabel, cityLabel, consentText, marketingText, privacyLabel, privacyHref, validationText,
    hintTitle, hintText, hintPlaceholder, hintConsent, hintThanks,
    submitLabel, sendingLabel, bookErrorText, phoneDisplay, phoneHref, successTitle, successText, successClose, noteSource,
    finnSlot, finnGoal, finnContact, finnHint, finnDone, finnDonePrompt, confirmHref,
    nameTitle, nameText, addressTitle, addressText, confirmTitle, confirmText, finnName, finnAddress, finnConfirm,
    validationName, validationContact, validationAddress, validationConfirm, presetGoal,
  } = props;
  // Themenseite: Ziel steht schon fest → Ziel-Schritt entfällt
  const preset = useMemo(() => (presetGoal && Array.isArray(goals) ? goals.find((g: any) => g.key === presetGoal) || null : null), [presetGoal, goals]);
  const STEPS: Step[] = useMemo(() => (preset ? ORDER.filter((s) => s !== 'goal') : ORDER), [preset]);
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
  const [focus, setFocus] = useState<any[]>([]);
  const [trainer, setTrainer] = useState(true);
  const [finnLine, setFinnLine] = useState('');
  const [form, setForm] = useState({ ...EMPTY });
  const [hint, setHint] = useState('');
  const [hintOk, setHintOk] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // Anonymer Trichter: welcher Formularschritt wurde erreicht (je Durchgang einmal)
  useEffect(() => { if (open && step !== 'done') funnel(`s_${step}`, source); }, [open, step, source]);

  const reset = () => { setStep('slot'); setDay(null); setSlot(null); setShowAllDays(false); setGoal(preset); setExp(null); setFocus([]); setTrainer(true); setFinnLine(''); setForm({ ...EMPTY }); setHint(''); setHintOk(false); setInvalid(false); setFailed(false); };

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
  }, [apiBaseUrl, studioId, bookingWindowDays, preset]);

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
  const countForDay = (d: string) => slots.filter((s) => dayKey(s.startDateTime) === d).length;
  const timeGroups = useMemo(() => {
    const g: Record<string, Slot[]> = {};
    timesForDay.forEach((s) => { const k = daypart(s.startDateTime); (g[k] = g[k] || []).push(s); });
    return ['Vormittags', 'Nachmittags', 'Abends'].filter((k) => g[k]).map((k) => ({ label: k, items: g[k] }));
  }, [day, slots]);
  useEffect(() => { if (open && step === 'slot' && !day && days.length) setDay(days[0]); }, [open, step, day, days]);
  const idx = STEPS.indexOf(step === 'done' ? 'hint' : step);
  const goTo = (s: Step) => { setInvalid(false); setFailed(false); setStep(s); };
  const next = () => goTo(STEPS[Math.min(idx + 1, STEPS.length - 1)]);
  const back = () => goTo(STEPS[Math.max(idx - 1, 0)]);

  // FINN-Satz nach Ziel + Erfahrung (Rückfall: feste Sätze aus dem Inhalt)
  useEffect(() => {
    if (step !== 'name' || !goal || !exp) return;
    const fallback = exp.finn;
    setFinnLine(fallback);
    if (!finnApi) return;
    const ctrl = new AbortController(); const to = setTimeout(() => ctrl.abort(), 4500);
    fetch(finnApi, { method: 'POST', headers: { 'content-type': 'application/json' }, signal: ctrl.signal, body: JSON.stringify({ message: fill(finnPrompt, { ziel: goal.label, erfahrung: exp.label, fokus: focusStr || 'nicht angegeben' }), history: [], visitorId: getVid() }) })
      .then((r) => r.json()).then((d: any) => { clearTimeout(to); const t = d && typeof d.answer === 'string' ? d.answer.replace(/\*\*|__|#/g, '').replace(/\s+/g, ' ').trim() : ''; if (t.length >= 25 && t.length <= 220 && !/http|\d\s?€|€\s?\d|diagnos|arzt|schmerz/i.test(t)) setFinnLine(t); })
      .catch(() => clearTimeout(to));
    return () => { clearTimeout(to); ctrl.abort(); };
  }, [step, goal, exp, finnApi, finnPrompt]);

  const vorname = form.firstname.trim() || 'du';
  const terminStr = slot ? fmtFull(slot.startDateTime) : '';
  const focusOptions: any[] = (focusByGoal && (focusByGoal[goal?.key] || focusByGoal._default)) || [];
  const focusStr = focus.map((f) => f.label).join(', ');
  // Empfehlung aus Ziel + Erfahrung + Fokus (regelbasiert; FINN formuliert den Satz dazu)
  const plan = useMemo(() => {
    const items: string[] = [];
    const fk = new Set(focus.map((f) => f.key));
    const g = goal?.key; const e = exp?.key;
    if (e === 'neu' || e === 'pause' || fk.has('begleitung') || fk.has('schonend') || fk.has('sanft')) items.push('Einweisung an jedem Gerät mit Trainer');
    if (g === 'ruecken' || g === 'stress' || fk.has('zirkel') || fk.has('ruhig') || fk.has('schonend')) items.push('Biocircuit: geführter 30-Minuten-Zirkel');
    if (g === 'muskeln' || fk.has('kraft') || fk.has('ganzkoerper') || fk.has('oberkoerper') || fk.has('beine') || fk.has('haltung')) items.push('Biostrength: Krafttraining, das sich auf dich einstellt');
    if (g === 'abnehmen' || fk.has('cardio') || fk.has('ausdauer') || fk.has('auspowern')) items.push('Cardio-Check mit virtuellem Coach');
    if (fk.has('frei') || (g === 'muskeln' && e === 'regelmaessig')) items.push('Powerbereich: Freihanteln und Kabelzug');
    if (fk.has('mobil') || fk.has('alltag')) items.push('Mobilität und Alltagsbewegungen');
    if (fk.has('ernaehrung')) items.push('Kurzer Ernährungs-Tipp vom Trainer');
    if (fk.has('plan') || fk.has('routine') || fk.has('motivation') || fk.has('abwechslung')) items.push('Erster Trainingsplan, der in deinen Alltag passt');
    if (!items.length) items.push('Gespräch zu deinem Ziel', 'Einweisung an den passenden Geräten');
    const rec = e === 'regelmaessig' && !fk.has('begleitung') ? false : true;
    return { items: items.slice(0, 3), trainer: rec };
  }, [goal, exp, focus]);
  const stepLine = (): string => {
    if (step === 'goal') return slot ? fill(finnSlot, { termin: terminStr }) : '';
    if (step === 'experience') return goal ? (preset && slot ? `${fill(finnSlot, { termin: terminStr })} ${goal.finn}` : goal.finn) : '';
    if (step === 'focus') return goal ? fill(finnFocus, { ziel: goal.label }) : (exp ? exp.finn : '');
    if (step === 'name') return finnLine || finnName;
    if (step === 'contact') return fill(finnContact, { vorname });
    if (step === 'address') return finnAddress;
    if (step === 'confirm') return fill(finnConfirm, { vorname, termin: terminStr });
    if (step === 'hint') return fill(finnHint, { vorname });
    if (step === 'done') return doneLine || fill(finnDone, { vorname, termin: terminStr });
    return '';
  };
  // Persönliche Begrüßung zum Abschluss (FINN, Rückfall: fester Text)
  useEffect(() => {
    if (step !== 'done' || !finnApi) return;
    const ctrl = new AbortController(); const to = setTimeout(() => ctrl.abort(), 5000);
    fetch(finnApi, { method: 'POST', headers: { 'content-type': 'application/json' }, signal: ctrl.signal, body: JSON.stringify({ message: fill(finnDonePrompt, { vorname, ziel: goal?.label || 'nicht angegeben', erfahrung: exp?.label || 'nicht angegeben', fokus: focusStr || 'nicht angegeben', termin: terminStr }), history: [], visitorId: getVid() }) })
      .then((r) => r.json()).then((d: any) => { clearTimeout(to); const t = d && typeof d.answer === 'string' ? d.answer.replace(/\*\*|__|#/g, '').replace(/\s+/g, ' ').trim() : ''; if (t.length >= 25 && t.length <= 260 && !/http|\d\s?€|€\s?\d|diagnos|arzt|schmerz/i.test(t)) setDoneLine(t); })
      .catch(() => clearTimeout(to));
    return () => { clearTimeout(to); ctrl.abort(); };
  }, [step]);

  const setF = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));
  const validName = form.firstname.trim().length > 1 && form.lastname.trim().length > 1 && (form.gender === 'FEMALE' || form.gender === 'MALE');
  const validContact = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) && form.phone.replace(/\D/g, '').length >= 6 && isAdult(form.dob);
  const validAddress = form.street.trim().length > 1 && form.houseNumber.trim().length > 0 && /^\d{4,5}$/.test(form.zip.trim()) && form.city.trim().length > 1;
  const formValid = form.firstname.trim().length > 1 && form.lastname.trim().length > 1 && (form.gender === 'FEMALE' || form.gender === 'MALE') && isAdult(form.dob) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) && form.phone.replace(/\D/g, '').length >= 6 && form.street.trim().length > 1 && form.houseNumber.trim().length > 0 && /^\d{4,5}$/.test(form.zip.trim()) && form.city.trim().length > 1 && form.consent;

  const submit = async () => {
    if (!slot) return;
    const hintText = hint.trim() && hintOk ? hint.trim().slice(0, 300) : '';
    const note = [
      (noteSource && noteSource[source]) || noteSource?.form || 'Gebucht über Aktionsseite',
      goal ? `Ziel: ${goal.label}` : '', exp ? `Erfahrung: ${exp.label}` : '', focusStr ? `Wichtig: ${focusStr}` : '',
      plan.items.length ? `Vorbereitung: ${plan.items.join(', ')}` : '',
      `Begleitung: ${trainer ? 'mit Trainer' : 'ohne Trainer'}`,
      interest.interestNote(),
      hintText ? `Hinweis für Trainer: ${hintText}` : '',
    ].filter(Boolean).join(' · ');
    setSending(true); setFailed(false);
    funnel('submit', source);
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
      // Bestätigungsseite: Daten nur im sessionStorage (nie in der URL), keine Gesundheitsangaben
      let saved = false;
      try {
        window.sessionStorage.setItem('fi_booking', JSON.stringify({
          v: 1, vorname: form.firstname.trim().slice(0, 40), start: slot.startDateTime, end: slot.endDateTime || '',
          trainer, ziel: goal?.label || '', erfahrung: exp?.label || '', fokus: focusStr, at: Date.now(),
          goalKey: goal?.key || '', expKey: exp?.key || '', focusKeys: focus.map((f) => f.key), focusLabels: focus.map((f) => f.label), plan: plan.items, planTrainer: plan.trainer,
        }));
        saved = true;
      } catch { /* privater Modus */ }
      if (saved && confirmHref) { window.location.assign(String(confirmHref)); return; }
      setStep('done');
    } catch { funnel('fail', source); setFailed(true); }
    finally { setSending(false); }
  };

  if (!open) return null;
  const total = STEPS.length;
  const stepTitle = step === 'done' ? successTitle : steps[step];

  return (
    <div className={styles.root} role="dialog" aria-modal="true" aria-label={title}>
      <div className={styles.backdrop} onClick={() => setOpen(false)} aria-hidden="true" />
      <div className={`${styles.box} ${step === 'slot' ? styles.boxWide : ''}`} ref={boxRef}>
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
          <motion.div key={step} className={styles.body} onKeyDown={(e) => { if (e.key === 'Enter' && (e.target as HTMLElement).tagName === 'INPUT') { e.preventDefault(); (document.querySelector('[data-next]') as HTMLButtonElement | null)?.click(); } }} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.28, ease }}>
            {stepLine() ? (
              <motion.div className={styles.finn} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.15, ease }}>
                <span className={styles.finnAvatar} aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9z" /></svg></span>
                <div><span className={styles.finnLabel}>{finnIntro}</span><p key={stepLine()}>{stepLine()}</p></div>
              </motion.div>
            ) : null}

            {step === 'slot' ? (
              <>
                <h2 className={styles.h}>{slotTitle}</h2>
                <ul className={styles.perks}>
                  {String(slotText || '').replace(/\.$/, '').split(/,\s*/).filter(Boolean).map((t) => <li key={t}>{t}</li>)}
                </ul>
                {slotState === 'loading' ? <p className={styles.muted}>{loadingText}</p> : null}
                {slotState === 'empty' ? <p className={styles.alert}>{noSlotsText} <a href={phoneHref}>{phoneDisplay}</a></p> : null}
                {slotState === 'error' ? <p className={styles.alert}>{errorSlotsText} <a href={phoneHref}>{phoneDisplay}</a></p> : null}
                {slotState === 'ok' ? (
                  <>
                    <div className={styles.slotGrid}>
                    <div className={styles.slotDays}>
                    <span className={styles.slotLabel}>{dayLabel || 'Tag'}</span>
                    <div className={styles.dayStrip} role="listbox" aria-label={dayLabel || 'Tag'}>
                      {days.map((d) => {
                        const dp = dayParts(d); const on = day === d;
                        return (
                          <button key={d} type="button" role="option" aria-selected={on} className={`${styles.dayCard} ${on ? styles.dayOn : ''}`} onClick={() => { setDay(d); setSlot(null); }}>
                            <span className={styles.dWd}>{dp.wd}</span>
                            <span className={styles.dNum}>{dp.d}</span>
                            <span className={styles.dMon}>{dp.mon}</span>
                            <span className={styles.dCount}>{countForDay(d)} frei</span>
                          </button>
                        );
                      })}
                    </div>
                    </div>
                    <div className={styles.slotTimes}>
                    {day ? (
                      <>
                        <span className={styles.slotLabel}>{timeLabel || 'Uhrzeit'}</span>
                        <div className={styles.timeGroups}>
                          {timeGroups.map((g) => (
                            <div key={g.label} className={styles.timeGroup}>
                              <span className={styles.groupLabel}>{g.label}</span>
                              <div className={styles.times}>
                                {g.items.map((s) => (
                                  <button key={s.startDateTime} type="button" className={`${styles.time} ${slot?.startDateTime === s.startDateTime ? styles.timeOn : ''}`} aria-pressed={slot?.startDateTime === s.startDateTime} onClick={() => setSlot(s)}>{fmtTime(s.startDateTime)}</button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : null}
                    </div>
                    </div>
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
                    <button key={g.key} type="button" className={`${styles.option} ${styles.optionRich} ${goal?.key === g.key ? styles.optionOn : ''}`} aria-pressed={goal?.key === g.key} onClick={() => { setGoal(g); setFocus([]); interest.signal('goal', g.label); setTimeout(next, 180); }}>
                      <span className={styles.optIcon} aria-hidden="true"><OptIcon kind={g.icon} /></span>
                      <span className={styles.optText}><strong>{g.label}</strong>{g.sub ? <small>{g.sub}</small> : null}</span>
                    </button>
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
                    <button key={x.key} type="button" className={`${styles.option} ${styles.optionRich} ${exp?.key === x.key ? styles.optionOn : ''}`} aria-pressed={exp?.key === x.key} onClick={() => { setExp(x); setTrainer(!!x.trainer); interest.signal('experience', x.label); setTimeout(next, 180); }}>
                      <span className={styles.optText}><strong>{x.label}</strong>{x.sub ? <small>{x.sub}</small> : null}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'focus' ? (
              <>
                <h2 className={styles.h}>{focusTitle}</h2>
                <p className={styles.p}>{focusText}</p>
                <div className={styles.options}>
                  {focusOptions.map((f: any) => {
                    const on = focus.some((x) => x.key === f.key);
                    return (
                      <button key={f.key} type="button" className={`${styles.option} ${styles.optionRich} ${on ? styles.optionOn : ''}`} aria-pressed={on}
                        onClick={() => { const max = Number(focusMax) || 2; setFocus((cur) => on ? cur.filter((x) => x.key !== f.key) : (cur.length >= max ? [...cur.slice(1), f] : [...cur, f])); interest.signal('focus', f.label); }}>
                        <span className={styles.optText}><strong>{f.label}</strong>{f.sub ? <small>{f.sub}</small> : null}</span>
                        <span className={`${styles.tick} ${on ? styles.tickOn : ''}`} aria-hidden="true" />
                      </button>
                    );
                  })}
                </div>
                {focus.length ? (
                  <div className={styles.plan}>
                    <span className={styles.planTitle}>{planTitle}</span>
                    <ul>{plan.items.map((it) => <li key={it}>{it}</li>)}</ul>
                    <span className={styles.planRec}>{plan.trainer ? trainerRecommended : trainerFree}</span>
                  </div>
                ) : null}
              </>
            ) : null}

            {step === 'name' ? (
              <>
                <h2 className={styles.h}>{nameTitle}</h2>
                {nameText ? <p className={styles.p}>{nameText}</p> : null}
                <label className={styles.field}><span>{firstNameLabel}</span><input type="text" autoComplete="given-name" autoFocus value={form.firstname} onChange={(e) => setF('firstname', e.target.value)} /></label>
                <label className={styles.field}><span>{lastNameLabel}</span><input type="text" autoComplete="family-name" value={form.lastname} onChange={(e) => setF('lastname', e.target.value)} /></label>
                <fieldset className={styles.seg}><legend>{genderLabel}</legend>
                  <button type="button" aria-pressed={form.gender === 'FEMALE'} className={form.gender === 'FEMALE' ? styles.segOn : ''} onClick={() => setF('gender', 'FEMALE')}>{femaleLabel}</button>
                  <button type="button" aria-pressed={form.gender === 'MALE'} className={form.gender === 'MALE' ? styles.segOn : ''} onClick={() => setF('gender', 'MALE')}>{maleLabel}</button>
                </fieldset>
                {invalid ? <p className={styles.alert} role="alert">{validationName}</p> : null}
              </>
            ) : null}

            {step === 'contact' ? (
              <>
                <h2 className={styles.h}>{contactTitle}</h2>
                <p className={styles.p}>{contactText}</p>
                <label className={styles.field}><span>{emailLabel}</span><input type="email" inputMode="email" autoComplete="email" autoFocus value={form.email} onChange={(e) => setF('email', e.target.value)} /></label>
                <label className={styles.field}><span>{phoneLabel}</span><input type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(e) => setF('phone', e.target.value)} /></label>
                <label className={styles.field}><span>{dobLabel}</span><input type="date" autoComplete="bday" max={(() => { const d = new Date(); d.setFullYear(d.getFullYear() - 18); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; })()} min="1920-01-01" value={form.dob} onChange={(e) => setF('dob', e.target.value)} /></label>
                {invalid ? <p className={styles.alert} role="alert">{validationContact}</p> : null}
              </>
            ) : null}

            {step === 'address' ? (
              <>
                <h2 className={styles.h}>{addressTitle}</h2>
                <p className={styles.p}>{addressText}</p>
                <div className={styles.row31}>
                  <label className={styles.field}><span>{streetLabel}</span><input type="text" autoComplete="address-line1" autoFocus value={form.street} onChange={(e) => setF('street', e.target.value)} /></label>
                  <label className={styles.field}><span>{houseNoLabel}</span><input type="text" value={form.houseNumber} onChange={(e) => setF('houseNumber', e.target.value)} /></label>
                </div>
                <div className={styles.row12}>
                  <label className={styles.field}><span>{zipLabel}</span><input type="text" inputMode="numeric" maxLength={5} autoComplete="postal-code" value={form.zip} onChange={(e) => setF('zip', e.target.value)} /></label>
                  <label className={styles.field}><span>{cityLabel}</span><input type="text" autoComplete="address-level2" value={form.city} onChange={(e) => setF('city', e.target.value)} /></label>
                </div>
                {invalid ? <p className={styles.alert} role="alert">{validationAddress}</p> : null}
              </>
            ) : null}

            {step === 'confirm' ? (
              <>
                <h2 className={styles.h}>{confirmTitle}</h2>
                {confirmText ? <p className={styles.p}>{confirmText}</p> : null}
                <fieldset className={styles.seg}><legend>{trainerLabel}</legend>
                  <button type="button" aria-pressed={trainer} className={trainer ? styles.segOn : ''} onClick={() => setTrainer(true)}>{withTrainer}</button>
                  <button type="button" aria-pressed={!trainer} className={!trainer ? styles.segOn : ''} onClick={() => setTrainer(false)}>{withoutTrainer}</button>
                </fieldset>
                <label className={styles.check}><input type="checkbox" checked={form.consent} onChange={(e) => setF('consent', e.target.checked)} /><span>{consentText} <a href={privacyHref} target="_blank" rel="noopener noreferrer">{privacyLabel}</a></span></label>
                <label className={styles.check}><input type="checkbox" checked={form.marketing} onChange={(e) => setF('marketing', e.target.checked)} /><span>{marketingText}</span></label>
                {invalid ? <p className={styles.alert} role="alert">{validationConfirm}</p> : null}
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
                {failed ? (
                  <p className={styles.alert} role="alert">{bookErrorText} <a href={phoneHref}>{phoneDisplay}</a>{' '}
                    <button type="button" className={styles.inlineLink} onClick={() => goTo('slot')}>Anderen Termin wählen</button>
                  </p>
                ) : null}
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
              {step === 'slot' ? <button type="button" className={styles.primary} disabled={!slot} onClick={next}>{slot ? <>{nextLabel}<span className={styles.btnSub}>{fmtShort(slot.startDateTime)} Uhr</span></> : (pickTimeLabel || 'Uhrzeit wählen')}</button> : null}
              {step === 'goal' || step === 'experience' ? <button type="button" className={styles.ghost} onClick={next}>{skipLabel}</button> : null}
              {step === 'focus' ? (focus.length ? <button type="button" className={styles.primary} onClick={() => { setTrainer(plan.trainer); next(); }}>{nextLabel}</button> : <button type="button" className={styles.ghost} onClick={next}>{skipLabel}</button>) : null}
              {step === 'name' ? <button type="button" data-next className={styles.primary} onClick={() => { if (!validName) { setInvalid(true); return; } next(); }}>{nextLabel}</button> : null}
              {step === 'contact' ? <button type="button" data-next className={styles.primary} onClick={() => { if (!validContact) { setInvalid(true); return; } next(); }}>{nextLabel}</button> : null}
              {step === 'address' ? <button type="button" data-next className={styles.primary} onClick={() => { if (!validAddress) { setInvalid(true); return; } next(); }}>{nextLabel}</button> : null}
              {step === 'confirm' ? <button type="button" className={styles.primary} onClick={() => { if (!form.consent) { setInvalid(true); return; } next(); }}>{nextLabel}</button> : null}
              {step === 'hint' ? <button type="button" className={styles.primary} disabled={sending || (!!hint.trim() && !hintOk)} onClick={submit}>{sending ? sendingLabel : submitLabel}</button> : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
