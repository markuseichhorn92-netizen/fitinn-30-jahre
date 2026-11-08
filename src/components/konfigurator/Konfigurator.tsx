'use client';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { funnel } from '@/lib/funnel';
import * as interest from '@/lib/interest';
import {
  ZIELE, ERFAHRUNGEN, ZEITEN, SCHWERPUNKTE, VORSCHLAG,
  baueBausteine, trainerEmpfohlen, istErfahren, schwerpunkteFuer, fokusBereinigen, rhythmus, planTitel, type Auswahl,
} from './plan';
import './konfigurator.css';

// Probetraining-Konfigurator: Ziel → Erfahrung → Zeit → Schwerpunkte → Dein Plan → Termin → Daten → Fertig.
// Slots live aus Magicline (GET /trialsession), Buchung über POST /trialsession/book (wie der bisherige Wizard).
// Mit dryRun wird nichts gebucht (nur für Vorschauen). Meta-Lead und Analytics nur nach Einwilligung (interest.reportBooking).
// Lena-Weitergabe: gleicher sessionStorage-Schlüssel wie der bisherige Wizard (fi_booking), damit /bestaetigung greift.

type Slot = { startDateTime: string; endDateTime?: string };
type Step = 'ziel' | 'erfahrung' | 'zeit' | 'fokus' | 'plan' | 'termin' | 'daten' | 'fertig';
const STEPS: Step[] = ['ziel', 'erfahrung', 'zeit', 'fokus', 'plan', 'termin', 'daten'];
const TITEL: Record<Step, string> = {
  ziel: 'Was ist dein Ziel?', erfahrung: 'Wie viel Erfahrung hast du?', zeit: 'Wie viel Zeit hast du pro Woche?',
  fokus: 'Was soll dein Probetraining enthalten?', plan: 'Dein Fit-Inn-Plan', termin: 'Wann passt es dir?',
  daten: 'Fast geschafft', fertig: 'Dein Termin steht',
};
const SUB: Partial<Record<Step, string>> = {
  ziel: 'Tipp auf das, was am ehesten passt. Dein Trainer bereitet sich darauf vor.',
  erfahrung: 'Jede Antwort ist die richtige.',
  zeit: 'Daraus machen wir einen Rhythmus, der in deinen Alltag passt.',
  fokus: 'Wir haben etwas vorgewählt. Du entscheidest, bis zu drei Bausteine.',
};
const KEY = 'fi-kf-v1';

type Props = {
  apiBaseUrl?: string; studioId?: number | string; bookingWindowDays?: number; dryRun?: boolean; source?: string;
  consentText: string; marketingText: string; privacyHref: string; privacyLabel?: string;
  phoneDisplay: string; phoneHref: string; whatsappHref?: string; noteSource?: string; confirmHref?: string;
};

const pad = (n: number) => String(n).padStart(2, '0');
const dayKey = (iso: string) => new Date(iso).toLocaleDateString('sv-SE', { timeZone: 'Europe/Berlin' });
const fmtTime = (iso: string) => new Date(iso).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin' });
const fmtFull = (iso: string) => new Date(iso).toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Europe/Berlin' }) + ', ' + fmtTime(iso) + ' Uhr';
const daypart = (iso: string) => { const h = Number(fmtTime(iso).slice(0, 2)); return h < 12 ? 'Vormittag' : h < 17 ? 'Nachmittag' : 'Abend'; };
const parts = (key: string) => { const [y, m, d] = key.split('-').map(Number); const dt = new Date(y, m - 1, d); return { wd: dt.toLocaleDateString('de-DE', { weekday: 'short' }).replace('.', ''), d: pad(d), mon: dt.toLocaleDateString('de-DE', { month: 'short' }).replace('.', '') }; };

function dobToIso(v: string): string | null {
  const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(v); if (!m) return null;
  const d = +m[1], mo = +m[2], y = +m[3]; const dt = new Date(y, mo - 1, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== mo - 1 || dt.getDate() !== d || y < 1900) return null;
  return `${y}-${pad(mo)}-${pad(d)}`;
}
function ageOk(iso: string) { const [y, m, d] = iso.split('-').map(Number); const l = new Date(); l.setFullYear(l.getFullYear() - 18); return new Date(y, m - 1, d) <= l; }
function autoDots(v: string) { const s = v.replace(/\D/g, '').slice(0, 8); return s.length > 4 ? `${s.slice(0, 2)}.${s.slice(2, 4)}.${s.slice(4)}` : s.length > 2 ? `${s.slice(0, 2)}.${s.slice(2)}` : s; }
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TYPOS: Record<string, string> = { 'gmial.com': 'gmail.com', 'gmai.com': 'gmail.com', 'gmail.de': 'gmail.com', 'gmx.dee': 'gmx.de', 'web.dee': 'web.de', 'hotmial.com': 'hotmail.com', 'outlok.com': 'outlook.com' };
function typoHint(e: string) { const dom = e.split('@')[1]?.toLowerCase(); return dom && TYPOS[dom] ? e.split('@')[0] + '@' + TYPOS[dom] : ''; }

function Icon({ kind }: { kind?: string }) {
  const P = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const k = kind || '';
  const p = k === 'flame' ? <path d="M12 3c1 3 4 4 4 8a4 4 0 0 1-8 0c0-1 .3-2 1-3 0 2 1 3 2 3 0-3-1-5 1-8z" />
    : k === 'dumbbell' ? <path d="M6 8v8M18 8v8M3 10v4M21 10v4M6 12h12" />
    : k === 'heart' ? <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
    : k === 'spine' ? <path d="M12 3v18M8 7h8M8 12h8M8 17h8" />
    : k === 'leaf' ? <><path d="M4 20c0-8 6-14 16-14-1 9-6 14-14 14z" /><path d="M4 20c4-4 8-7 12-9" /></>
    : k === 'restart' ? <><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" /></>
    : <circle cx="12" cy="12" r="8" />;
  return <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" {...P}>{p}</svg>;
}
const Check = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5 10 17.5 19 7" /></svg>;


function Feld({ id, label, fehler, hinweis, wide, input }: { id: string; label: string; fehler?: string | false; hinweis?: React.ReactNode; wide?: boolean; input: React.InputHTMLAttributes<HTMLInputElement> }) {
  const eid = `kf-${id}-m`;
  return (
    <div className={`kf-field ${wide ? 'wide' : ''} ${fehler ? 'bad' : ''}`}>
      <label htmlFor={`kf-${id}`}>{label}</label>
      <input id={`kf-${id}`} aria-invalid={!!fehler} aria-describedby={fehler || hinweis ? eid : undefined} {...input} />
      {fehler ? <em id={eid} role="alert">{fehler}</em> : hinweis ? <em id={eid} className="hint">{hinweis}</em> : null}
    </div>
  );
}

export default function Konfigurator(props: Props) {
  const {
    apiBaseUrl = 'https://fit-inn-trier.api.magicline.com/connect/v1', studioId = 1210005460, bookingWindowDays = 14,
    dryRun = false, source = 'konfigurator', consentText, marketingText, privacyHref, privacyLabel = 'Datenschutz',
    phoneDisplay, phoneHref, whatsappHref, noteSource = 'Gebucht über Konfigurator', confirmHref,
  } = props;

  const [step, setStep] = useState<Step>('ziel');
  const [ziel, setZiel] = useState('');
  const [erfahrung, setErfahrung] = useState('');
  const [zeit, setZeit] = useState('');
  const [fokus, setFokus] = useState<string[]>([]);
  const [trainer, setTrainer] = useState(true);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotState, setSlotState] = useState<'loading' | 'ok' | 'empty' | 'error'>('loading');
  const [day, setDay] = useState<string | null>(null);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [f, setF] = useState({ vorname: '', nachname: '', email: '', dob: '', zip: '', consent: false, marketing: false, hint: '', hintOk: false });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [dir, setDir] = useState<1 | -1>(1);
  const headRef = useRef<HTMLHeadingElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const restored = useRef(false);

  // Auswahl (ohne persönliche Daten) bei Neuladen wiederherstellen
  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (s && s.v === 1) { setZiel(s.ziel || ''); setErfahrung(s.erfahrung || ''); setZeit(s.zeit || ''); setFokus(fokusBereinigen(Array.isArray(s.fokus) ? s.fokus : [], s.erfahrung || '', s.ziel || '')); setTrainer(istErfahren(s.erfahrung || '', s.ziel || '') ? s.trainer !== false : true); if (STEPS.includes(s.step) && s.step !== 'termin' && s.step !== 'daten') setStep(s.step); }
      }
    } catch { /* privater Modus */ }
    restored.current = true;
  }, []);
  useEffect(() => {
    if (!restored.current || step === 'fertig') return;
    try { window.sessionStorage.setItem(KEY, JSON.stringify({ v: 1, step, ziel, erfahrung, zeit, fokus, trainer })); } catch { /* egal */ }
  }, [step, ziel, erfahrung, zeit, fokus, trainer]);

  // Echte freie Termine aus Magicline
  useEffect(() => {
    const today = new Date(); const end = new Date(today); end.setDate(end.getDate() + Number(bookingWindowDays));
    const iso = (d: Date) => d.toISOString().split('T')[0];
    const ctrl = new AbortController();
    fetch(`${apiBaseUrl}/trialsession?studioId=${studioId}&startDate=${iso(today)}&endDate=${iso(end)}`, { signal: ctrl.signal })
      .then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.json(); })
      .then((d: any) => { const now = Date.now(); const arr: Slot[] = (Array.isArray(d.slots) ? d.slots : []).filter((s: Slot) => new Date(s.startDateTime).getTime() > now); setSlots(arr); setSlotState(arr.length ? 'ok' : 'empty'); })
      .catch((e) => { if (e?.name !== 'AbortError') setSlotState('error'); });
    return () => ctrl.abort();
  }, [apiBaseUrl, studioId, bookingWindowDays]);

  const countFor = useCallback((d: string) => slots.filter((s) => dayKey(s.startDateTime) === d).length, [slots]);
  const strip = useMemo(() => {
    const out: { key: string; n: number }[] = []; const t = new Date();
    for (let i = 0; i < Number(bookingWindowDays); i++) { const d = new Date(t); d.setDate(t.getDate() + i); const k = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; out.push({ key: k, n: countFor(k) }); }
    return out;
  }, [bookingWindowDays, countFor]);
  const nextSlot = slots[0];
  const times = day ? slots.filter((s) => dayKey(s.startDateTime) === day) : [];
  const groups = ['Vormittag', 'Nachmittag', 'Abend'].map((l) => ({ l, items: times.filter((s) => daypart(s.startDateTime) === l) })).filter((g) => g.items.length);

  const erfahren = istErfahren(erfahrung, ziel);
  const auswahl: Auswahl = { ziel, erfahrung, zeit, fokus };
  const bausteine = useMemo(() => baueBausteine(auswahl), [ziel, erfahrung, zeit, fokus]); // eslint-disable-line react-hooks/exhaustive-deps
  const idx = STEPS.indexOf(step);
  const zielLabel = ZIELE.find((z) => z.key === ziel)?.label;
  const erfLabel = ERFAHRUNGEN.find((z) => z.key === erfahrung)?.label;
  const zeitLabel = ZEITEN.find((z) => z.key === zeit)?.label;
  const fokusLabels = fokus.map((k) => SCHWERPUNKTE.find((s) => s.key === k)?.label).filter(Boolean) as string[];

  // Trichter zählt den Schritt, Fokus springt auf die Überschrift
  useEffect(() => { funnel(`kf_${step}`, source); headRef.current?.focus({ preventScroll: true }); }, [step, source]);
  const scrollTop = () => { const r = rootRef.current; if (r) { const top = r.getBoundingClientRect().top + window.scrollY - 12; if (top < window.scrollY) window.scrollTo({ top, behavior: 'smooth' }); } };
  const go = (s: Step) => { setDir(STEPS.indexOf(s) >= idx ? 1 : -1); setStep(s); setFailed(false); scrollTop(); };
  const next = () => go(STEPS[Math.min(idx + 1, STEPS.length - 1)]);
  const back = () => go(STEPS[Math.max(idx - 1, 0)]);

  const waehleZiel = (k: string) => { setZiel(k); setFokus(fokusBereinigen(VORSCHLAG[k] || [], erfahrung, k)); if (!istErfahren(erfahrung, k)) setTrainer(true); setTimeout(() => go('erfahrung'), 200); };
  const waehleErfahrung = (k: string) => { setErfahrung(k); setTrainer(trainerEmpfohlen(k, ziel)); setFokus((c) => { const vorher = fokusBereinigen(VORSCHLAG[ziel] || [], erfahrung, ziel); const gleich = c.length === vorher.length && c.every((x, i) => x === vorher[i]); return gleich ? fokusBereinigen(VORSCHLAG[ziel] || [], k, ziel) : fokusBereinigen(c, k, ziel); }); setTimeout(() => go('zeit'), 200); };
  const waehleZeit = (k: string) => { setZeit(k); setTimeout(() => go('fokus'), 200); };
  const toggleFokus = (k: string) => setFokus((c) => c.includes(k) ? c.filter((x) => x !== k) : c.length >= 3 ? [...c.slice(1), k] : [...c, k]);

  // Validierung: nur Magicline-Pflicht (Name, E-Mail, Geburtsdatum ab 18, PLZ)
  const dobIso = dobToIso(f.dob);
  const err: Record<string, string> = {};
  if (f.vorname.trim().length < 2) err.vorname = 'Bitte deinen Vornamen eintragen.';
  if (f.nachname.trim().length < 2) err.nachname = 'Bitte deinen Nachnamen eintragen.';
  if (!EMAIL.test(f.email.trim())) err.email = 'Bitte eine gültige E-Mail eintragen, dort kommt deine Bestätigung an.';
  if (!dobIso) err.dob = 'Bitte als TT.MM.JJJJ eintragen, z. B. 14.03.1985.';
  else if (!ageOk(dobIso)) err.dob = 'Das Probetraining ist ab 18 Jahren. Wir freuen uns, wenn du volljährig bist.';
  if (!/^\d{5}$/.test(f.zip.trim())) err.zip = 'Bitte die 5-stellige PLZ eintragen.';
  if (!f.consent) err.consent = 'Bitte bestätige den Datenschutzhinweis, damit wir den Termin buchen dürfen.';
  const formValid = Object.keys(err).length === 0 && (!f.hint.trim() || f.hintOk);
  const touch = (k: string) => setTouched((t) => ({ ...t, [k]: true }));
  const show = (k: string) => (touched[k] || touched._all) && err[k];

  const ics = () => {
    if (!slot) return;
    const z = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const end = slot.endDateTime || new Date(new Date(slot.startDateTime).getTime() + 90 * 60000).toISOString();
    const txt = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Fit-Inn Trier//Probetraining//DE', 'BEGIN:VEVENT', `UID:${z(slot.startDateTime)}@fit-inn-trier.de`, `DTSTAMP:${z(new Date().toISOString())}`, `DTSTART:${z(slot.startDateTime)}`, `DTEND:${z(end)}`, 'SUMMARY:Probetraining bei Fit-Inn Trier', 'LOCATION:Fit-Inn Trier\\, Auf Hirtenberg 8\\, 54296 Trier', 'BEGIN:VALARM', 'TRIGGER:-PT2H', 'ACTION:DISPLAY', 'DESCRIPTION:Probetraining bei Fit-Inn in 2 Stunden', 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([txt], { type: 'text/calendar' })); a.download = 'probetraining-fit-inn.ics'; a.click();
  };

  const submit = async () => {
    setTouched({ _all: true });
    if (!formValid || !slot || !dobIso) return;
    const note = [
      noteSource, zielLabel && `Ziel: ${zielLabel}`, erfLabel && `Erfahrung: ${erfLabel}`, zeitLabel && `Zeit pro Woche: ${zeitLabel}`,
      fokusLabels.length && `Wichtig: ${fokusLabels.join(', ')}`, `Plan: ${bausteine.map((b) => b.titel).join(', ')}`,
      `Begleitung: ${trainer ? 'mit Trainer' : 'ohne Trainer'}`, f.hint.trim() && f.hintOk ? `Hinweis für Trainer: ${f.hint.trim().slice(0, 300)}` : '',
    ].filter(Boolean).join(' · ');
    setSending(true); setFailed(false); funnel('submit', source);
    try {
      if (!dryRun) {
        const r = await fetch(`${apiBaseUrl}/trialsession/book`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
          studioId: Number(studioId), startDateTime: slot.startDateTime, trainerRequired: trainer, note,
          leadCustomer: { firstname: f.vorname.trim(), lastname: f.nachname.trim(), email: f.email.trim(), dateOfBirth: dobIso, address: { zip: f.zip.trim(), country: 'DE' },
            privacyConfiguration: { email: f.marketing, phone: f.marketing, letter: false, textMessage: f.marketing, mySportsMessage: false } } }) });
        if (!r.ok) throw new Error(String(r.status));
      } else { await new Promise((res) => setTimeout(res, 700)); }
      if (!dryRun) {
        interest.reportBooking('success', source);
        window.dispatchEvent(new CustomEvent('fi:booked', { detail: { startDateTime: slot.startDateTime, source } }));
      } else funnel('ok', source);
      try {
        window.sessionStorage.removeItem(KEY);
        window.sessionStorage.setItem('fi_booking', JSON.stringify({ v: 1, vorname: f.vorname.trim().slice(0, 40), start: slot.startDateTime, end: slot.endDateTime || '', trainer, ziel: zielLabel || '', erfahrung: erfLabel || '', zeit: zeitLabel || '', fokus: fokusLabels.join(', '), goalKey: ziel, expKey: erfahrung, focusKeys: fokus, plan: bausteine.map((b) => b.titel), planTrainer: trainer, at: Date.now() }));
        if (!dryRun && confirmHref) { window.location.assign(confirmHref); return; }
      } catch { /* privater Modus */ }
      setDir(1); setStep('fertig'); scrollTop();
    } catch { funnel('fail', source); setFailed(true); } finally { setSending(false); }
  };

  const pct = step === 'fertig' ? 100 : Math.round(((idx + 1) / STEPS.length) * 100);
  const vorname = f.vorname.trim();

  return (
    <div className="kf" ref={rootRef} data-dir={dir}>
      {dryRun ? <p className="kf-vorschau" role="note">Vorschau: Alles ist klickbar und die Termine sind echt, gebucht wird nichts.</p> : null}

      <div className="kf-top">
        <div className="kf-prog" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Fortschritt deines Plans">
          <span style={{ width: `${pct}%` }} />
        </div>
        <div className="kf-topline">
          <span>{step === 'fertig' ? 'Alles erledigt' : `Schritt ${idx + 1} von ${STEPS.length}`}</span>
          {step !== 'fertig' && idx > 0 ? <button type="button" className="kf-back" onClick={back}>← Zurück</button> : <span />}
        </div>
        {(zielLabel || erfLabel || zeitLabel || fokusLabels.length) && step !== 'fertig' ? (
          <ul className="kf-chips" aria-label="Deine bisherigen Antworten">
            {[zielLabel, erfLabel, zeitLabel, ...fokusLabels].filter(Boolean).map((c, i) => <li key={`${c}${i}`}><Check />{c}</li>)}
          </ul>
        ) : null}
      </div>

      <section key={step} className="kf-card" aria-labelledby="kf-h">
        <h2 id="kf-h" ref={headRef} tabIndex={-1}>
          {step === 'plan' && zielLabel ? planTitel(ziel) : step === 'fertig' && vorname ? `${vorname}, dein Termin steht` : TITEL[step]}
        </h2>
        {SUB[step] ? <p className="kf-sub">{SUB[step]}</p> : null}

        {step === 'ziel' ? (
          <div className="kf-grid">
            {ZIELE.map((z) => (
              <button key={z.key} type="button" className={`kf-opt ${ziel === z.key ? 'on' : ''}`} aria-pressed={ziel === z.key} onClick={() => waehleZiel(z.key)}>
                <span className="kf-ico"><Icon kind={z.icon} /></span>
                <span className="kf-t"><strong>{z.label}</strong><small>{z.sub}</small></span>
              </button>
            ))}
          </div>
        ) : null}

        {step === 'erfahrung' ? (
          <div className="kf-list">
            {ERFAHRUNGEN.map((z) => (
              <button key={z.key} type="button" className={`kf-opt ${erfahrung === z.key ? 'on' : ''}`} aria-pressed={erfahrung === z.key} onClick={() => waehleErfahrung(z.key)}>
                <span className="kf-t"><strong>{z.label}</strong><small>{z.sub}</small></span>
              </button>
            ))}
          </div>
        ) : null}

        {step === 'zeit' ? (
          <div className="kf-list">
            {ZEITEN.map((z) => (
              <button key={z.key} type="button" className={`kf-opt ${zeit === z.key ? 'on' : ''}`} aria-pressed={zeit === z.key} onClick={() => waehleZeit(z.key)}>
                <span className="kf-t"><strong>{z.label}</strong><small>{z.sub}</small></span>
              </button>
            ))}
          </div>
        ) : null}

        {step === 'fokus' ? (
          <>
            <div className="kf-grid">
              {schwerpunkteFuer(erfahrung, ziel).map((z) => {
                const on = fokus.includes(z.key);
                return (
                  <button key={z.key} type="button" className={`kf-opt ${on ? 'on' : ''}`} aria-pressed={on} onClick={() => toggleFokus(z.key)}>
                    <span className="kf-t"><strong>{z.label}</strong><small>{z.sub}</small></span>
                    <span className={`kf-tick ${on ? 'on' : ''}`} aria-hidden="true">{on ? <Check /> : null}</span>
                  </button>
                );
              })}
            </div>
            <div className="kf-foot"><button type="button" className="kf-cta" disabled={!fokus.length} onClick={next}>Meinen Plan ansehen</button></div>
          </>
        ) : null}

        {step === 'plan' ? (
          <>
            <p className="kf-sub">Das erwartet dich bei deinem Probetraining.</p>
            <ol className="kf-plan">
              {bausteine.map((b, i) => (
                <li key={b.key}><span className="kf-no" aria-hidden="true">{i + 1}</span><div><strong>{b.titel}</strong><p>{b.text}</p></div></li>
              ))}
            </ol>
            {zeit ? <p className="kf-rhythm"><span>Dein Rhythmus danach</span>{rhythmus(zeit)}</p> : null}
            {erfahren ? (
              <fieldset className="kf-seg"><legend>Begleitung beim Probetraining</legend>
                <button type="button" aria-pressed={trainer} className={trainer ? 'on' : ''} onClick={() => setTrainer(true)}>Mit Trainer (Standard)</button>
                <button type="button" aria-pressed={!trainer} className={!trainer ? 'on' : ''} onClick={() => setTrainer(false)}>Ohne Trainer</button>
              </fieldset>
            ) : (
              <p className="kf-rhythm"><span>Begleitung</span>Du startest mit einem Trainer an deiner Seite.</p>
            )}
            <ul className="kf-facts"><li><Check />Rund 90 Minuten</li><li><Check />Kostenlos</li><li><Check />Unverbindlich</li></ul>
            <div className="kf-foot">
              <button type="button" className="kf-cta" onClick={next}>Termin für meinen Plan wählen</button>
              <button type="button" className="kf-link" onClick={() => go('fokus')}>Plan ändern</button>
            </div>
            <p className="kf-trust"><b>4,8 ★ bei Google</b> · über 250 Bewertungen · familiengeführt seit 1996</p>
          </>
        ) : null}

        {step === 'termin' ? (
          <>
            {slotState === 'loading' ? <p className="kf-muted">Freie Termine werden geladen …</p> : null}
            {slotState === 'empty' ? <p className="kf-alert">Online sind gerade keine Termine frei. Ruf uns gern an: <a href={phoneHref}>{phoneDisplay}</a></p> : null}
            {slotState === 'error' ? <p className="kf-alert">Die Termine konnten nicht geladen werden. Ruf uns gern an: <a href={phoneHref}>{phoneDisplay}</a></p> : null}
            {slotState === 'ok' ? (
              <>
                {nextSlot ? (
                  <button type="button" className={`kf-next ${slot?.startDateTime === nextSlot.startDateTime ? 'on' : ''}`} onClick={() => { setDay(dayKey(nextSlot.startDateTime)); setSlot(nextSlot); }}>
                    <span>Nächster freier Termin</span><strong>{fmtFull(nextSlot.startDateTime)}</strong>
                  </button>
                ) : null}
                <p className="kf-label">Oder wähl deinen Tag</p>
                <div className="kf-days" role="listbox" aria-label="Tag">
                  {strip.map(({ key, n }) => {
                    const p = parts(key); const free = n > 0; const on = day === key;
                    return (
                      <button key={key} type="button" role="option" aria-selected={on} disabled={!free} className={`kf-day ${on ? 'on' : ''}`} onClick={() => { setDay(key); setSlot(null); }}>
                        <span className="wd">{p.wd}</span><span className="d">{p.d}</span><span className="mon">{p.mon}</span>
                        <span className="n">{free ? (n <= 2 ? `nur noch ${n}` : `${n} frei`) : 'kein Termin'}</span>
                      </button>
                    );
                  })}
                </div>
                {day ? groups.map((g) => (
                  <div key={g.l} className="kf-tg"><span className="kf-label">{g.l}</span>
                    <div className="kf-times">{g.items.map((s) => (
                      <button key={s.startDateTime} type="button" className={`kf-time ${slot?.startDateTime === s.startDateTime ? 'on' : ''}`} aria-pressed={slot?.startDateTime === s.startDateTime} onClick={() => setSlot(s)}>{fmtTime(s.startDateTime)}</button>
                    ))}</div></div>
                )) : <p className="kf-muted">Wähl oben einen Tag, die Uhrzeiten erscheinen dann hier.</p>}
                <p className="kf-muted kf-live">Die Termine kommen live aus unserem Buchungssystem.</p>
              </>
            ) : null}
            <div className="kf-foot"><button type="button" className="kf-cta" disabled={!slot} onClick={next}>{slot ? <>Weiter<small>{fmtFull(slot.startDateTime)}</small></> : 'Uhrzeit wählen'}</button></div>
          </>
        ) : null}

        {step === 'daten' && slot ? (
          <>
            <p className="kf-sub">{fmtFull(slot.startDateTime)} · {trainer ? 'mit Trainer' : 'ohne Trainer'}. Nur diese 5 Angaben brauchen wir für die Buchung.</p>
            <div className="kf-fields">
              <Feld id="vorname" label="Vorname" fehler={show('vorname')} input={{ type: 'text', autoComplete: 'given-name', enterKeyHint: 'next', value: f.vorname, onChange: (e) => setF({ ...f, vorname: e.target.value }), onBlur: () => touch('vorname') }} />
              <Feld id="nachname" label="Nachname" fehler={show('nachname')} input={{ type: 'text', autoComplete: 'family-name', enterKeyHint: 'next', value: f.nachname, onChange: (e) => setF({ ...f, nachname: e.target.value }), onBlur: () => touch('nachname') }} />
              <Feld id="email" label="E-Mail" wide fehler={show('email')} hinweis={typoHint(f.email) ? <>Meintest du <button type="button" onClick={() => setF({ ...f, email: typoHint(f.email) })}>{typoHint(f.email)}</button>?</> : null} input={{ type: 'email', inputMode: 'email', autoComplete: 'email', enterKeyHint: 'next', value: f.email, onChange: (e) => setF({ ...f, email: e.target.value }), onBlur: () => touch('email') }} />
              <Feld id="dob" label="Geburtsdatum" fehler={show('dob')} input={{ type: 'text', inputMode: 'numeric', autoComplete: 'bday', placeholder: 'TT.MM.JJJJ', maxLength: 10, enterKeyHint: 'next', value: f.dob, onChange: (e) => setF({ ...f, dob: autoDots(e.target.value) }), onBlur: () => touch('dob') }} />
              <Feld id="zip" label="PLZ" fehler={show('zip')} input={{ type: 'text', inputMode: 'numeric', autoComplete: 'postal-code', maxLength: 5, enterKeyHint: 'done', value: f.zip, onChange: (e) => setF({ ...f, zip: e.target.value.replace(/\D/g, '') }), onBlur: () => touch('zip') }} />
            </div>
            <p className="kf-why">Warum Geburtsdatum und PLZ? Unser Buchungssystem verlangt sie, und das Probetraining ist ab 18.</p>

            <button type="button" className="kf-link kf-hintbtn" aria-expanded={showHint} onClick={() => setShowHint(!showHint)}>{showHint ? '− Hinweis ausblenden' : '+ Soll dein Trainer etwas wissen? (optional)'}</button>
            {showHint ? (
              <div className="kf-hint">
                <textarea rows={3} maxLength={300} placeholder="z. B. Knieprobleme, Bandscheibe, Schwangerschaft …" value={f.hint} onChange={(e) => setF({ ...f, hint: e.target.value })} aria-label="Hinweis für den Trainer" />
                <p className="kf-muted">Das liest nur dein Trainer.</p>
                {f.hint.trim() ? <label className="kf-check"><input type="checkbox" checked={f.hintOk} onChange={(e) => setF({ ...f, hintOk: e.target.checked })} /><span>Ich willige ein, dass Fit-Inn Trier diese Angabe (auch gesundheitsbezogen) speichert, um mein Probetraining vorzubereiten. Widerruf jederzeit möglich.</span></label> : null}
              </div>
            ) : null}

            <label className={`kf-check ${show('consent') ? 'bad' : ''}`}><input type="checkbox" checked={f.consent} onChange={(e) => setF({ ...f, consent: e.target.checked })} onBlur={() => touch('consent')} /><span>{consentText} <a href={privacyHref} target="_blank" rel="noopener noreferrer">{privacyLabel}</a></span></label>
            {show('consent') ? <em className="kf-err" role="alert">{err.consent}</em> : null}
            <label className="kf-check"><input type="checkbox" checked={f.marketing} onChange={(e) => setF({ ...f, marketing: e.target.checked })} /><span>{marketingText} <i>(freiwillig)</i></span></label>

            {failed ? <p className="kf-alert" role="alert">Die Buchung hat leider nicht geklappt. Versuch es nochmal oder ruf uns an: <a href={phoneHref}>{phoneDisplay}</a> <button type="button" className="kf-link" onClick={() => go('termin')}>Anderen Termin wählen</button></p> : null}

            <div className="kf-foot">
              <button type="button" className="kf-cta kf-book" disabled={sending} onClick={submit}>{sending ? 'Wird gebucht …' : 'Probetraining kostenlos buchen'}</button>
              <p className="kf-risk">Kostenlos und unverbindlich. Einen Vertrag gibt es erst nach dem Probetraining, nur wenn du willst.</p>
            </div>
            <p className="kf-trust"><b>4,8 ★ bei Google</b> · familiengeführt seit 1996</p>
          </>
        ) : null}

        {step === 'fertig' && slot ? (
          <div className="kf-done">
            <span className="kf-ring" aria-hidden="true"><svg width="38" height="38" viewBox="0 0 24 24" fill="none"><path d="M5 12.5 10 17.5 19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
            <p className="kf-big">{fmtFull(slot.startDateTime)}</p>
            <p className="kf-sub">{trainer ? 'Mit Trainer' : 'Ohne Trainer'} · Auf Hirtenberg 8, 54296 Trier · rund 90 Minuten</p>
            {dryRun ? <p className="kf-vorschau">Vorschau: Es wurde nichts gebucht und nichts gesendet.</p> : <p className="kf-sub">Die Bestätigung kommt per E-Mail.</p>}
            <div className="kf-recap"><strong>Dein Plan</strong><ul>{bausteine.map((b) => <li key={b.key}><Check />{b.titel}</li>)}</ul></div>
            <div className="kf-actions">
              <button type="button" className="kf-cta" onClick={ics}>Zum Kalender hinzufügen</button>
              <a className="kf-ghost" href="https://maps.google.com/?q=Fit-Inn+Trier+Auf+Hirtenberg+8+54296+Trier" target="_blank" rel="noopener noreferrer">Anfahrt öffnen</a>
              <a className="kf-ghost" href={phoneHref}>Termin verschieben: {phoneDisplay}</a>
              {whatsappHref ? <a className="kf-ghost" href={whatsappHref} target="_blank" rel="noopener noreferrer">Oder per WhatsApp schreiben</a> : null}
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
