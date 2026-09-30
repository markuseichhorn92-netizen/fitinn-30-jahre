'use client';
import React, { useEffect, useRef, useState } from 'react';
import Title from '@siteui/title';
import Text from '@siteui/text';
import Badge from '@siteui/badge';
import Button from '@siteui/button';
import Chip from '@siteui/chip';
// Button aus @siteui wird im Widget nur noch für die Buchung genutzt
import { crm } from '@/lib/onepage-kit';
import styles from './styles.module.css';

type Msg = { role: 'user' | 'assistant'; text: string; kind?: 'error' | 'local' };
type Confirm = { id: string; preview?: string } | null;
type Slot = { startDateTime: string; endDateTime?: string };
type Booking = {
  step: 'loading' | 'days' | 'times' | 'form' | 'sending' | 'empty';
  slots: Slot[];
  day: string | null;
  slot: Slot | null;
  invalid: boolean;
  failed: boolean;
} | null;

const VID_KEY = 'finn_vid';

// FINN antwortet teils mit Markdown (**fett**, __fett__, # Ueberschrift).
// Fettes wird als <strong> gezeigt, alle uebrigen Markdown-Zeichen entfernt. Kein HTML.
function cleanMd(s: string): string {
  return s
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*|__/g, '')
    .replace(/^\s*[*]\s+/gm, '• ');
}

function renderText(text: string): React.ReactNode {
  const src = String(text).replace(/__([^_\n]+)__/g, '**$1**');
  const parts = src.split(/(\*\*[^*\n]+?\*\*)/g);
  return parts.map((p, i) =>
    p.length > 4 && p.startsWith('**') && p.endsWith('**')
      ? <strong key={i}>{p.slice(2, -2)}</strong>
      : <React.Fragment key={i}>{cleanMd(p)}</React.Fragment>
  );
}

function makeVid(): string {
  const raw = typeof crypto !== 'undefined' && (crypto as any).randomUUID
    ? (crypto as any).randomUUID()
    : String(Date.now()) + String(Math.random()).slice(2);
  return raw.replace(/[^A-Za-z0-9_-]/g, '').slice(0, 64);
}

function getVid(): string {
  try {
    const existing = window.localStorage.getItem(VID_KEY);
    if (existing && /^[A-Za-z0-9_-]{8,64}$/.test(existing)) return existing;
    const v = makeVid();
    window.localStorage.setItem(VID_KEY, v);
    return v;
  } catch {
    return makeVid();
  }
}

const pad = (n: number) => String(n).padStart(2, '0');
const dayKey = (iso: string) => {
  const d = new Date(iso);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};
const fmtDay = (key: string) => {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit' });
};
const fmtTime = (iso: string) => new Date(iso).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
const fmtFull = (iso: string) =>
  new Date(iso).toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' }) + ', ' + fmtTime(iso) + ' Uhr';

function isAdult(dob: string): boolean {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dob);
  if (!m) return false;
  const birth = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  const limit = new Date();
  limit.setFullYear(limit.getFullYear() - 18);
  return birth <= limit && Number(m[1]) > 1900;
}

const EMPTY_FORM = {
  firstname: '', lastname: '', gender: '', dob: '', email: '', phone: '',
  street: '', houseNumber: '', zip: '', city: '', trainer: true, consent: false, marketing: false,
};

export default function FinnChat(props: any) {
  const {
    anchorId, bgColor, finnApi,
    badge, headline, introText, disclosure, privacyLabel, privacyHref,
    suggestionsLabel, suggestions,
    botName, greeting, placeholder, inputLabel, sendLabel, typingLabel, resetLabel, confirmLabel, declineLabel,
    bookLabel, bookIntro, bookTimeText, bookFormText, bookLoading, bookNoSlots, bookError, bookValidation,
    bookSuccess, bookSuccessAfter, bookBack, bookCancel, bookSubmit, bookSending,
    trainerLabel, withTrainer, withoutTrainer, firstNameLabel, lastNameLabel, genderLabel, femaleLabel, maleLabel,
    dobLabel, emailLabel, phoneFieldLabel, streetLabel, houseNoLabel, zipLabel, cityLabel, consentNote, marketingText,
    apiBaseUrl, studioId, bookingWindowDays, crmFormId, crmSource,
    launcherLabel, closeLabel, nudgeCloseLabel, showLauncher, maxNudges, nudgesSpar: nudges, mode,
    yesLabel, noLabel, bookYesLabel, bookChoice, priceChoiceSpar: priceChoice, inclChoice, busyChoice, otherChoice,
    errorGeneric, phoneLabel, phoneHref, maxChars,
    disclosureShort, disclosureMore, disclosureLess, hoursChoice, trialInfoChoice, tariffChoice, startChoices, maxChoices,
  } = props;
  const [moreInfo, setMoreInfo] = useState(false);

  const [messages, setMessages] = useState<Msg[]>([]);
  const [choices, setChoices] = useState<string[]>([]);
  const [confirm, setConfirm] = useState<Confirm>(null);
  const [booking, setBooking] = useState<Booking>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const vidRef = useRef<string>('');
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // ---------- Chat-Fenster (Overlay), Button & Hinweis-Trigger ----------
  const [overlay, setOverlay] = useState(false);
  const [nudge, setNudge] = useState<any>(null);
  const [launcherOn, setLauncherOn] = useState(false);
  const overlayRef = useRef(false);
  const usedRef = useRef(false);
  const nudgeRef = useRef<any>(null);
  const bookingVisibleRef = useRef(false);
  const startBookingRef = useRef<(t?: string) => void>(() => {});
  const sendRef = useRef<(t: string) => void>(() => {});

  useEffect(() => { overlayRef.current = overlay; }, [overlay]);
  useEffect(() => { nudgeRef.current = nudge; }, [nudge]);

  const openChat = (n?: any) => {
    usedRef.current = true;
    setNudge(null);
    setOverlay(true);
    if (n) {
      if (n.text) setMessages((m) => [...m, { role: 'assistant', text: String(n.text), kind: 'local' }]);
      if (n.book) {
        setTimeout(() => startBookingRef.current(), 60);
      } else if (n.message) {
        setTimeout(() => sendRef.current(String(n.message)), 60);
      } else if (n.ask) {
        setChoices([String(n.ask), bookChoice]);
      }
    }
    setTimeout(() => { if (inputRef.current && !(n && (n.book || n.message))) inputRef.current.focus(); }, 150);
  };

  useEffect(() => {
    const onOpen = (e: any) => openChat(e && e.detail ? e.detail : undefined);
    window.addEventListener('finn:open', onOpen as any);
    return () => window.removeEventListener('finn:open', onOpen as any);
  }, []);

  useEffect(() => {
    if (!overlay) return;
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    const prev = document.body.style.overflow;
    if (mobile) document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOverlay(false); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [overlay]);

  useEffect(() => {
    const onScroll = () => setLauncherOn(window.scrollY > 520);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    const target = document.getElementById('anmeldung');
    let o: IntersectionObserver | null = null;
    if (target && 'IntersectionObserver' in window) {
      o = new IntersectionObserver(([e]) => { bookingVisibleRef.current = e.isIntersecting; }, { threshold: 0.05 });
      o.observe(target);
    }
    return () => { window.removeEventListener('scroll', onScroll); if (o) o.disconnect(); };
  }, []);

  useEffect(() => {
    const list = Array.isArray(nudges) ? nudges : [];
    const max = Number(maxNudges);
    if (!list.length || !(max > 0)) return;
    let shown = 0;
    try { shown = Number(window.sessionStorage.getItem('finn_nudges') || 0); } catch { shown = 0; }
    const seen = new Set<number>();
    let lastAt = 0;
    const timers: any[] = [];
    const observers: IntersectionObserver[] = [];
    let hideTimer: any = null;
    const canShow = () =>
      !overlayRef.current && !usedRef.current && !nudgeRef.current && !bookingVisibleRef.current &&
      shown < max && Date.now() - lastAt > 20000;
    const fire = (i: number) => {
      if (seen.has(i) || !canShow()) return;
      seen.add(i);
      shown += 1;
      lastAt = Date.now();
      try { window.sessionStorage.setItem('finn_nudges', String(shown)); } catch { /* egal */ }
      nudgeRef.current = list[i];
      setNudge(list[i]);
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => { nudgeRef.current = null; setNudge(null); }, 16000);
    };
    list.forEach((n: any, i: number) => {
      if (n.mode === 'time') {
        timers.push(setTimeout(() => fire(i), Math.max(3, Number(n.value) || 30) * 1000));
      } else if (n.mode === 'section') {
        const el = document.getElementById(String(n.value || ''));
        if (el && 'IntersectionObserver' in window) {
          const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) timers.push(setTimeout(() => fire(i), 1800)); }, { threshold: 0.35 });
          o.observe(el);
          observers.push(o);
        }
      }
    });
    const idle = list.map((n: any, i: number) => ({ n, i })).filter((x: any) => x.n.mode === 'idle');
    let idleTimer: any = null;
    const resetIdle = () => {
      clearTimeout(idleTimer);
      if (!idle.length) return;
      idleTimer = setTimeout(() => idle.forEach((x: any) => fire(x.i)), Math.max(10, Number(idle[0].n.value) || 45) * 1000);
    };
    const exits = list.map((n: any, i: number) => ({ n, i })).filter((x: any) => x.n.mode === 'exit');
    const onOut = (e: MouseEvent) => { if (e.clientY <= 0 && !e.relatedTarget) exits.forEach((x: any) => fire(x.i)); };
    const acts = ['scroll', 'pointerdown', 'keydown', 'touchstart'];
    acts.forEach((a) => window.addEventListener(a, resetIdle, { passive: true }));
    if (exits.length) document.addEventListener('mouseout', onOut);
    resetIdle();
    return () => {
      timers.forEach(clearTimeout);
      observers.forEach((o) => o.disconnect());
      clearTimeout(idleTimer);
      clearTimeout(hideTimer);
      acts.forEach((a) => window.removeEventListener(a, resetIdle));
      document.removeEventListener('mouseout', onOut);
    };
  }, [nudges, maxNudges]);

  useEffect(() => { vidRef.current = getVid(); }, []);
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, busy, choices, confirm, booking && booking.step]);

  // ---------- FINN ----------
  const call = async (body: any) => {
    if (!vidRef.current) vidRef.current = getVid();
    const res = await fetch(finnApi, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...body, visitorId: vidRef.current }),
    });
    let data: any = null;
    try { data = await res.json(); } catch { data = null; }
    return data;
  };

  const show = (data: any) => {
    if (!data || typeof data.answer !== 'string' || !data.answer.trim()) {
      setMessages((m) => [...m, { role: 'assistant', text: errorGeneric, kind: 'error' }]);
      setChoices([]);
      setConfirm(null);
      return;
    }
    setMessages((m) => [...m, { role: 'assistant', text: data.answer }]);
    if (data.confirm && data.confirm.id) {
      setConfirm({ id: String(data.confirm.id), preview: data.confirm.preview ? String(data.confirm.preview) : undefined });
      setChoices([]);
    } else {
      setConfirm(null);
      setChoices(smartChoices(String(data.answer), Array.isArray(data.choices) ? data.choices.map((c: any) => String(c && c.label ? c.label : '')).filter(Boolean) : []));
    }
  };

  const run = async (body: any) => {
    setBusy(true);
    setChoices([]);
    setConfirm(null);
    try {
      show(await call(body));
    } catch {
      show(null);
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.focus();
    }
  };

  const wantsBooking = (text: string) => /probetraining/i.test(text) && /(buch|termin|vereinbar|reserv|anmeld)/i.test(text) || /^probetraining$/i.test(text.trim());

  const send = (raw: string) => {
    const text = String(raw || '').trim().slice(0, Number(maxChars));
    if (!text || busy) return;
    usedRef.current = true;
    if (wantsBooking(text)) {
      setInput('');
      startBooking(text);
      return;
    }
    const history = messages
      .filter((m) => !m.kind)
      .slice(-6)
      .map((m) => ({ role: m.role, text: m.text.slice(0, 800) }));
    setMessages((m) => [...m, { role: 'user', text }]);
    setInput('');
    run({ message: text, history });
  };

  sendRef.current = send;

  // Situationsabhängige Antwort-Buttons: FINNs eigene Vorschläge zuerst, dann passende
  // Anschlussfragen zum Thema der Antwort. Ja/Nein-Fragen bekommen Ja/Nein (+ Alternative).
  function smartChoices(answer: string, finn: string[]): string[] {
    const limit = Math.max(2, Number(maxChoices) || 4);
    const a = answer.toLowerCase();
    const t = answer.trim();
    const cut = Math.max(t.lastIndexOf('. ', t.length - 2), t.lastIndexOf('! ', t.length - 2), t.lastIndexOf('\n', t.length - 2));
    const lastQ = t.slice(cut + 1).trim();
    const isQuestion = lastQ.endsWith('?');
    const yesNo = isQuestion && /^(soll|möchtest|willst|magst|darf|kann ich|hast du|bist du|würdest|wollen wir|sollen wir|interessiert|passt|brauchst)/i.test(lastQ);
    const out: string[] = [];
    const add = (c: string) => { if (c && !out.includes(c) && out.length < limit) out.push(c); };
    if (yesNo) {
      if (/probetraining|termin|vorbei/i.test(lastQ)) { add(bookYesLabel); add(otherChoice); }
      else { add(yesLabel); add(noLabel); }
      return out;
    }
    finn.forEach((c) => add(/^probetraining$/i.test(c) ? bookChoice : c));
    const topics: Array<[RegExp, string[]]> = [
      [/probetraining|schnupper/, [bookChoice, trialInfoChoice, priceChoice]],
      [/€|preis|kost|tarif|beitrag|woche|spar/, [inclChoice, tariffChoice, bookChoice]],
      [/basic|premium|laufzeit/, [priceChoice, inclChoice, bookChoice]],
      [/öffnungs|geöffnet|uhr|auslastung|voll/, [busyChoice, bookChoice, priceChoice]],
      [/gerät|technogym|biocircuit|cardio|kraft/, [trialInfoChoice, inclChoice, bookChoice]],
      [/kündig|vertrag|agb|frist/, [tariffChoice, bookChoice, otherChoice]],
    ];
    const hit = topics.find(([re]) => re.test(a));
    (hit ? hit[1] : [bookChoice, priceChoice, hoursChoice]).forEach(add);
    if (out.length < 3) add(otherChoice);
    return out.slice(0, limit);
  }

  const handleChoice = (c: string) => {
    if (c === otherChoice) {
      setChoices([]);
      if (inputRef.current) inputRef.current.focus();
      return;
    }
    if (c === bookChoice || c === bookYesLabel || /probetraining buchen|termin raussuchen/i.test(c)) {
      startBooking(c);
      return;
    }
    send(c);
  };

  const answerConfirm = (action: 'confirm' | 'decline') => {
    if (!confirm || busy) return;
    const label = action === 'confirm' ? confirmLabel : declineLabel;
    setMessages((m) => [...m, { role: 'user', text: label }]);
    run({ action, id: confirm.id });
  };

  // ---------- Probetraining-Buchung (Magicline) ----------
  const startBooking = async (userText?: string) => {
    if (busy || booking) return;
    setChoices([]);
    setConfirm(null);
    setForm({ ...EMPTY_FORM });
    setMessages((m) => [...m, { role: 'user', text: userText || bookLabel, kind: 'local' }]);
    setBooking({ step: 'loading', slots: [], day: null, slot: null, invalid: false, failed: false });
    try {
      const today = new Date();
      const end = new Date(today);
      end.setDate(end.getDate() + Number(bookingWindowDays));
      const iso = (d: Date) => d.toISOString().split('T')[0];
      const r = await fetch(`${apiBaseUrl}/trialsession?studioId=${studioId}&startDate=${iso(today)}&endDate=${iso(end)}`);
      if (!r.ok) throw new Error(String(r.status));
      const d = await r.json();
      const now = Date.now();
      const slots: Slot[] = (Array.isArray(d.slots) ? d.slots : []).filter((s: Slot) => new Date(s.startDateTime).getTime() > now);
      setBooking({ step: slots.length ? 'days' : 'empty', slots, day: null, slot: null, invalid: false, failed: false });
    } catch {
      setBooking({ step: 'empty', slots: [], day: null, slot: null, invalid: false, failed: true });
    }
  };

  const cancelBooking = () => setBooking(null);
  startBookingRef.current = (t?: string) => { startBooking(t); };

  const days = booking ? Array.from(new Set(booking.slots.map((s) => dayKey(s.startDateTime)))).slice(0, 10) : [];
  const timesForDay = booking && booking.day ? booking.slots.filter((s) => dayKey(s.startDateTime) === booking.day) : [];

  const setField = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const formValid =
    form.firstname.trim().length > 1 &&
    form.lastname.trim().length > 1 &&
    (form.gender === 'FEMALE' || form.gender === 'MALE') &&
    isAdult(form.dob) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) &&
    form.phone.replace(/[^0-9]/g, '').length >= 6 &&
    form.street.trim().length > 1 &&
    form.houseNumber.trim().length > 0 &&
    /^\d{4,5}$/.test(form.zip.trim()) &&
    form.city.trim().length > 1 &&
    form.consent;

  const submitBooking = async () => {
    if (!booking || !booking.slot) return;
    if (!formValid) {
      setBooking({ ...booking, invalid: true, failed: false });
      return;
    }
    const slot = booking.slot;
    setBooking({ ...booking, step: 'sending', invalid: false, failed: false });
    try {
      const r = await fetch(`${apiBaseUrl}/trialsession/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studioId: Number(studioId),
          startDateTime: slot.startDateTime,
          trainerRequired: !!form.trainer,
          note: 'Gebucht über FINN-Chat (Oktober-Aktion)',
          leadCustomer: {
            firstname: form.firstname.trim(),
            lastname: form.lastname.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            gender: form.gender,
            dateOfBirth: form.dob,
            address: { street: form.street.trim(), houseNumber: form.houseNumber.trim(), zip: form.zip.trim(), city: form.city.trim(), country: 'DE' },
            privacyConfiguration: {
              email: form.marketing, phone: form.marketing, letter: false, textMessage: form.marketing, mySportsMessage: false,
            },
          },
        }),
      });
      if (!r.ok) throw new Error(String(r.status));
      if (crmFormId) {
        // Zusätzlich ins Onepage-CRM – Magicline bleibt führend, Fehler hier stören die Buchung nicht.
        try {
          crm.submitForm({
            formId: String(crmFormId),
            data: {
              name: { firstName: form.firstname.trim(), lastName: form.lastname.trim() },
              email: form.email.trim(),
              phone: form.phone.trim(),
              gender: form.gender === 'FEMALE' ? femaleLabel : maleLabel,
              dateOfBirth: form.dob,
              address: { country: 'DE', addressFirst: `${form.street.trim()} ${form.houseNumber.trim()}`, addressSecond: '', postalCode: form.zip.trim(), province: '', city: form.city.trim() },
              termin: fmtFull(slot.startDateTime),
              trainer: form.trainer ? withTrainer : withoutTrainer,
              note: '',
              marketing: !!form.marketing,
              quelle: crmSource,
            },
          }).catch(() => {});
        } catch { /* CRM optional */ }
      }
      setBooking(null);
      setForm({ ...EMPTY_FORM });
      setChoices([inclChoice, otherChoice]);
      setMessages((m) => [...m, { role: 'assistant', text: `${bookSuccess}\n**${fmtFull(slot.startDateTime)}**\n${bookSuccessAfter}`, kind: 'local' }]);
    } catch {
      setBooking((b) => (b ? { ...b, step: 'form', failed: true } : b));
    }
  };

  const reset = () => {
    setMessages([]);
    setChoices([]);
    setConfirm(null);
    setBooking(null);
  };

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const field = (id: string, label: string, key: string, type: string, auto: string, extra?: any) => (
    <div className={styles.field}>
      <label htmlFor={`fb-${id}`}>{label}</label>
      <input
        id={`fb-${id}`}
        type={type}
        autoComplete={auto}
        value={(form as any)[key]}
        aria-invalid={booking && booking.invalid ? 'true' : undefined}
        onChange={(e) => setField(key, e.target.value)}
        {...(extra || {})}
      />
    </div>
  );

  const maxDob = (() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 18);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  })();

  return (
    <section id={mode === 'widget' ? undefined : anchorId} className={mode === 'widget' ? styles.widget : styles.sec} style={mode === 'widget' ? undefined : { background: bgColor }}>
      {mode === 'widget' ? null : <div className={styles.glow} aria-hidden="true" />}
      <div className={styles.container}>
        {mode === 'widget' ? null : (<div className={styles.intro}>
          <Badge tone="accent" dot>{badge}</Badge>
          <Title as="h2" size="xl">{headline}</Title>
          <Text size="lg" muted>{introText}</Text>
          <div className={styles.suggest}>
            <span className={styles.suggestLabel}>{suggestionsLabel}</span>
            <div className={styles.chips}>
              <Chip disabled={busy || !!booking} onClick={() => startBooking()}>{bookLabel}</Chip>
              {(suggestions || []).map((s: any, i: number) => (
                <Chip key={i} disabled={busy || !!booking} onClick={() => send(s.text)}>{s.text}</Chip>
              ))}
            </div>
          </div>
        </div>)}

        {mode === 'widget' && !overlay ? null : (<div className={`${styles.window} ${overlay ? styles.overlay : ''}`} role={overlay ? 'dialog' : undefined} aria-modal={overlay ? true : undefined} aria-label={overlay ? botName : undefined}>
          <div className={styles.head}>
            <span className={styles.avatar} aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9z" /><path d="M19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" /></svg>
            </span>
            <div className={styles.headText}>
              <strong>{botName}</strong>
              <span>{badge}</span>
            </div>
            {messages.length ? (
              <button type="button" className={styles.reset} onClick={reset} disabled={busy}>{resetLabel}</button>
            ) : null}
            {overlay ? (
              <button type="button" className={styles.close} onClick={() => setOverlay(false)} aria-label={closeLabel}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            ) : null}
          </div>

          <div className={styles.log} ref={logRef} role="log" aria-live="polite" aria-relevant="additions">
            <div className={`${styles.msg} ${styles.bot}`}>{greeting}</div>
            {messages.map((m, i) => (
              <div key={i} className={`${styles.msg} ${m.role === 'user' ? styles.user : styles.bot} ${m.kind === 'error' ? styles.err : ''}`}>
                {m.role === 'assistant' ? renderText(m.text) : m.text}
                {m.kind === 'error' ? <> <a href={phoneHref}>{phoneLabel}</a></> : null}
              </div>
            ))}
            {busy ? (
              <div className={`${styles.msg} ${styles.bot} ${styles.typing}`}>
                <span className={styles.dots} aria-hidden="true"><i /><i /><i /></span>
                <span className={styles.srOnly}>{typingLabel}</span>
              </div>
            ) : null}

            {booking ? (
              <div className={styles.bookCard}>
                {booking.step === 'loading' ? (
                  <p className={styles.bookText}>{bookLoading}</p>
                ) : null}

                {booking.step === 'empty' ? (
                  <>
                    <p className={styles.bookText}>{bookNoSlots} <a href={phoneHref}>{phoneLabel}</a></p>
                    <div className={styles.actionRow}><Chip onClick={cancelBooking}>{bookCancel}</Chip></div>
                  </>
                ) : null}

                {booking.step === 'days' ? (
                  <>
                    <p className={styles.bookText}>{bookIntro}</p>
                    <div className={styles.actionRow}>
                      {days.map((d) => (
                        <Chip key={d} onClick={() => setBooking({ ...booking, step: 'times', day: d })}>{fmtDay(d)}</Chip>
                      ))}
                    </div>
                    <div className={styles.bookNav}><button type="button" className={styles.linkBtn} onClick={cancelBooking}>{bookCancel}</button></div>
                  </>
                ) : null}

                {booking.step === 'times' && booking.day ? (
                  <>
                    <p className={styles.bookText}>{fmtDay(booking.day)} · {bookTimeText}</p>
                    <div className={styles.actionRow}>
                      {timesForDay.map((s) => (
                        <Chip key={s.startDateTime} onClick={() => setBooking({ ...booking, step: 'form', slot: s })}>{fmtTime(s.startDateTime)}</Chip>
                      ))}
                    </div>
                    <div className={styles.bookNav}>
                      <button type="button" className={styles.linkBtn} onClick={() => setBooking({ ...booking, step: 'days', day: null })}>{bookBack}</button>
                      <button type="button" className={styles.linkBtn} onClick={cancelBooking}>{bookCancel}</button>
                    </div>
                  </>
                ) : null}

                {(booking.step === 'form' || booking.step === 'sending') && booking.slot ? (
                  <form className={styles.bookForm} onSubmit={(e) => { e.preventDefault(); submitBooking(); }} noValidate>
                    <p className={styles.bookSlot}>{fmtFull(booking.slot.startDateTime)}</p>
                    <p className={styles.bookText}>{bookFormText}</p>

                    <fieldset className={styles.seg}>
                      <legend>{trainerLabel}</legend>
                      <button type="button" aria-pressed={form.trainer} className={form.trainer ? styles.segOn : ''} onClick={() => setField('trainer', true)}>{withTrainer}</button>
                      <button type="button" aria-pressed={!form.trainer} className={!form.trainer ? styles.segOn : ''} onClick={() => setField('trainer', false)}>{withoutTrainer}</button>
                    </fieldset>

                    <div className={styles.row2}>
                      {field('fn', firstNameLabel, 'firstname', 'text', 'given-name')}
                      {field('ln', lastNameLabel, 'lastname', 'text', 'family-name')}
                    </div>

                    <fieldset className={styles.seg}>
                      <legend>{genderLabel}</legend>
                      <button type="button" aria-pressed={form.gender === 'FEMALE'} className={form.gender === 'FEMALE' ? styles.segOn : ''} onClick={() => setField('gender', 'FEMALE')}>{femaleLabel}</button>
                      <button type="button" aria-pressed={form.gender === 'MALE'} className={form.gender === 'MALE' ? styles.segOn : ''} onClick={() => setField('gender', 'MALE')}>{maleLabel}</button>
                    </fieldset>

                    {field('dob', dobLabel, 'dob', 'date', 'bday', { max: maxDob, min: '1920-01-01' })}
                    {field('em', emailLabel, 'email', 'email', 'email', { inputMode: 'email' })}
                    {field('ph', phoneFieldLabel, 'phone', 'tel', 'tel', { inputMode: 'tel' })}
                    <div className={styles.row31}>
                      {field('st', streetLabel, 'street', 'text', 'address-line1')}
                      {field('hn', houseNoLabel, 'houseNumber', 'text', 'off')}
                    </div>
                    <div className={styles.row12}>
                      {field('zip', zipLabel, 'zip', 'text', 'postal-code', { inputMode: 'numeric', maxLength: 5 })}
                      {field('ci', cityLabel, 'city', 'text', 'address-level2')}
                    </div>

                    <label className={styles.check}>
                      <input type="checkbox" checked={form.consent} onChange={(e) => setField('consent', e.target.checked)} />
                      <span>{consentNote} <a href={privacyHref} target="_blank" rel="noopener noreferrer">{privacyLabel}</a></span>
                    </label>
                    <label className={styles.check}>
                      <input type="checkbox" checked={form.marketing} onChange={(e) => setField('marketing', e.target.checked)} />
                      <span>{marketingText}</span>
                    </label>

                    {booking.invalid ? <p className={styles.bookErr} role="alert">{bookValidation}</p> : null}
                    {booking.failed ? <p className={styles.bookErr} role="alert">{bookError} <a href={phoneHref}>{phoneLabel}</a></p> : null}

                    <div className={styles.bookNav}>
                      <button type="button" className={styles.linkBtn} disabled={booking.step === 'sending'} onClick={() => setBooking({ ...booking, step: 'times', slot: null, invalid: false, failed: false })}>{bookBack}</button>
                      <Button type="submit" disabled={booking.step === 'sending'}>{booking.step === 'sending' ? bookSending : bookSubmit}</Button>
                    </div>
                  </form>
                ) : null}
              </div>
            ) : null}

            {!busy && !booking && confirm ? (
              <div className={styles.actions}>
                {confirm.preview ? <div className={styles.preview}>{confirm.preview}</div> : null}
                <div className={styles.actionRow}>
                  <Chip onClick={() => answerConfirm('confirm')}>{confirmLabel}</Chip>
                  <Chip onClick={() => answerConfirm('decline')}>{declineLabel}</Chip>
                </div>
              </div>
            ) : null}
            {!busy && !booking && !confirm && (messages.length === 0 || choices.length) ? (
              <div className={styles.actionRow}>
                {(messages.length === 0 ? (startChoices || []).map((s: any) => String(s.text)) : choices).map((c, i) => (
                  <Chip key={i} onClick={() => handleChoice(c)}>{c}</Chip>
                ))}
              </div>
            ) : null}
          </div>

          {booking ? null : (<form className={styles.form} onSubmit={(e) => { e.preventDefault(); send(input); }}>
            <label htmlFor="fi-finn-input" className={styles.srOnly}>{inputLabel}</label>
            <textarea
              id="fi-finn-input"
              ref={inputRef}
              className={styles.input}
              rows={1}
              value={input}
              maxLength={Number(maxChars)}
              placeholder={placeholder}
              autoComplete="off"
              disabled={!!booking}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
            />
            <button type="submit" className={styles.sendBtn} disabled={busy || !!booking || !input.trim()} aria-label={sendLabel}>
              <span className={styles.sendText}>{sendLabel}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          </form>)}
          <p className={styles.disclosure}>
            <span className={styles.discShort}>{moreInfo ? disclosure : disclosureShort}</span>{' '}
            <a href={privacyHref} target="_blank" rel="noopener noreferrer">{privacyLabel}</a>
            {' · '}
            <button type="button" className={styles.discToggle} onClick={() => setMoreInfo((v) => !v)} aria-expanded={moreInfo}>{moreInfo ? disclosureLess : disclosureMore}</button>
          </p>
        </div>)}
      </div>

      {overlay ? <div className={styles.backdrop} onClick={() => setOverlay(false)} aria-hidden="true" /> : null}

      {showLauncher && !overlay ? (
        <button type="button" className={`${styles.launcher} ${launcherOn ? styles.launcherOn : ''}`} onClick={() => openChat()} tabIndex={launcherOn ? 0 : -1} aria-hidden={!launcherOn}>
          <span className={styles.launcherIcon} aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /></svg>
          </span>
          {launcherLabel}
        </button>
      ) : null}

      {nudge && !overlay ? (
        <div className={styles.nudge} role="status">
          <button type="button" className={styles.nudgeBody} onClick={() => openChat(nudge)}>
            <span className={styles.nudgeAvatar} aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9z" /></svg>
            </span>
            <span className={styles.nudgeText}>
              <strong>{botName}</strong>
              <span>{nudge.text}</span>
            </span>
          </button>
          <button type="button" className={styles.nudgeClose} onClick={() => setNudge(null)} aria-label={nudgeCloseLabel}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
      ) : null}
    </section>
  );
}
