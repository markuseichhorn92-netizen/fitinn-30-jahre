'use client';
// Bestätigungsseite nach der Buchung (/bestaetigung).
// Daten kommen ausschließlich aus sessionStorage ('fi_booking', vom Wizard gesetzt) –
// nie aus der URL. Keine Gesundheitsangaben, nichts davon geht an Google.
import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Title from '@siteui/title';
import Text from '@siteui/text';
import Badge from '@siteui/badge';
import Button from '@siteui/button';
import Fragen from '@/sections/08-fragen';
import Deco from '@siteui/deco';
import { hasConsent, CONSENT_EVENT } from '@/lib/consent';
import styles from './styles.module.css';

type Booking = { vorname: string; start: string; end: string; trainer: boolean; ziel: string; erfahrung: string };
const TZ = 'Europe/Berlin';
const ease = [0.22, 1, 0.36, 1] as any;
const fill = (t: string, v: Record<string, string>) => String(t || '').replace(/\{(\w+)\}/g, (_, k) => v[k] ?? '');
const rise = (i = 0) => ({ initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '0px 0px 120px 0px' }, transition: { duration: 0.45, ease, delay: i * 0.06 } });

function getVid(): string {
  try {
    const e = window.localStorage.getItem('finn_vid');
    if (e && /^[A-Za-z0-9_-]{8,64}$/.test(e)) return e;
  } catch { /* egal */ }
  return String(Date.now());
}
function readBooking(): Booking | null {
  try {
    const raw = window.sessionStorage.getItem('fi_booking');
    if (!raw) return null;
    const d = JSON.parse(raw);
    if (!d || typeof d.start !== 'string' || isNaN(new Date(d.start).getTime())) return null;
    return { vorname: String(d.vorname || '').slice(0, 40), start: d.start, end: typeof d.end === 'string' ? d.end : '', trainer: !!d.trainer, ziel: String(d.ziel || ''), erfahrung: String(d.erfahrung || '') };
  } catch { return null; }
}
const fmt = (iso: string, o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('de-DE', { timeZone: TZ, ...o }).format(new Date(iso));
const utcStamp = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const icsEsc = (s: string) => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');

export default function Bestaetigung(props: any) {
  const {
    finnApi, badge, headline, headlineNoName, mailNote, withTrainer, withoutTrainer, durationLabel,
    calendarLabel, googleCalLabel, icsLabel, calTitle, calDescription,
    finnLabel, finnFallback, finnPrompt, flowTitle, flow, bringTitle, bring, onsiteTitle, onsite,
    wayTitle, address, parkingNote, routeGoogleLabel, routeAppleLabel, routeQuery, mapLoadLabel, mapNote,
    changeTitle, changeText, phoneLabel, phoneHref, emailLabel, emailHref,
    noBookingTitle, noBookingText, noBookingCta, backLabel, backHref, fragen, heroBg, chatIntro,
  } = props;

  const [ready, setReady] = useState(false);
  const [b, setB] = useState<Booking | null>(null);
  const [finnLine, setFinnLine] = useState('');
  const [mapOn, setMapOn] = useState(false);

  useEffect(() => { setB(readBooking()); setReady(true); }, []);
  // Google Maps direkt laden, wenn "Externe Medien" erlaubt sind
  useEffect(() => {
    const upd = () => { if (hasConsent('media')) setMapOn(true); };
    upd();
    window.addEventListener(CONSENT_EVENT, upd);
    return () => window.removeEventListener(CONSENT_EVENT, upd);
  }, []);

  // FINN-Motivation (Rückfall: fester Text). Nur Ziel/Erfahrung, kein Name, keine Gesundheitsdaten.
  useEffect(() => {
    if (!b || !finnApi || !finnPrompt) return;
    const ctrl = new AbortController(); const to = setTimeout(() => ctrl.abort(), 6000);
    fetch(finnApi, { method: 'POST', headers: { 'content-type': 'application/json' }, signal: ctrl.signal, body: JSON.stringify({ message: fill(finnPrompt, { ziel: b.ziel || 'nicht angegeben', erfahrung: b.erfahrung || 'nicht angegeben' }), history: [], visitorId: getVid() }) })
      .then((r) => r.json())
      .then((d: any) => {
        clearTimeout(to);
        const t = d && typeof d.answer === 'string' ? d.answer.replace(/\*\*|__|#/g, '').replace(/\s+/g, ' ').trim() : '';
        if (t.length >= 25 && t.length <= 320 && !/http|www\.|\d\s?€|€\s?\d|diagnos|arzt|schmerz|krank/i.test(t)) setFinnLine(t);
      })
      .catch(() => clearTimeout(to));
    return () => { clearTimeout(to); ctrl.abort(); };
  }, [b, finnApi, finnPrompt]);

  const times = useMemo(() => {
    if (!b) return null;
    const s = new Date(b.start);
    const e = b.end && !isNaN(new Date(b.end).getTime()) && new Date(b.end) > s ? new Date(b.end) : new Date(s.getTime() + 90 * 60000);
    return { s, e };
  }, [b]);

  const location = String(routeQuery || address || '');
  const gcalHref = times
    ? `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(calTitle)}&dates=${utcStamp(times.s)}/${utcStamp(times.e)}&details=${encodeURIComponent(calDescription)}&location=${encodeURIComponent(location)}`
    : '#';
  const downloadIcs = () => {
    if (!times) return;
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Fit-Inn Trier//Probetraining//DE', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
      'BEGIN:VEVENT', `UID:${utcStamp(times.s)}-probetraining@fit-inn-trier.de`, `DTSTAMP:${utcStamp(new Date())}`,
      `DTSTART:${utcStamp(times.s)}`, `DTEND:${utcStamp(times.e)}`,
      `SUMMARY:${icsEsc(calTitle)}`, `DESCRIPTION:${icsEsc(calDescription)}`, `LOCATION:${icsEsc(location)}`,
      'BEGIN:VALARM', 'TRIGGER:-PT2H', 'ACTION:DISPLAY', `DESCRIPTION:${icsEsc(calTitle)}`, 'END:VALARM',
      'END:VEVENT', 'END:VCALENDAR',
    ].join('\r\n');
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
    const a = document.createElement('a'); a.href = url; a.download = 'probetraining-fit-inn.ics';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  };

  const gRoute = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location)}`;
  const aRoute = `https://maps.apple.com/?daddr=${encodeURIComponent(location)}`;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(location)}&z=15&output=embed`;

  const fragenContext = b && times
    ? `Kontext (nicht wiederholen): Der Interessent hat bereits ein kostenloses Probetraining im Fit-Inn Trier gebucht – am ${fmt(b.start, { weekday: 'long', day: 'numeric', month: 'long' })} um ${fmt(b.start, { hour: '2-digit', minute: '2-digit' })} Uhr, ${b.trainer ? 'mit Trainer' : 'ohne Trainer'}, ca. 90 Minuten. Adresse: Auf Hirtenberg 8, 54296 Trier, kostenlose Parkplätze direkt am Studio. Beantworte die Frage kurz und freundlich.`
    : '';

  if (!ready) return <section className={styles.hero} aria-busy="true"><div className={styles.container} style={{ minHeight: '60vh' }} /></section>;

  if (!b || !times) {
    return (
      <section className={styles.hero}>
        <div className={`${styles.container} ${styles.empty}`}>
          <Title as="h1" size="xl">{noBookingTitle}</Title>
          <Text size="lg" className={styles.lead}>{noBookingText}</Text>
          <Button href={backHref} size="lg">{noBookingCta}</Button>
        </div>
      </section>
    );
  }

  const title = b.vorname ? fill(headline, { vorname: b.vorname }) : headlineNoName;

  return (
    <>
      {/* 1 · Termin */}
      <section className={styles.hero} data-bg={String(heroBg || 'glow')}>
        <div className={styles.bgLayer} aria-hidden="true">
          <span className={styles.bgDate}>{fmt(b.start, { day: '2-digit', month: '2-digit' })}</span>
          <Deco kind="route" className={styles.bgRoute} />
          <span className={styles.bgConfetti} />
        </div>
        <Deco kind="check" className={styles.decoHero} />
        <div className={styles.container}>
          <motion.div className={styles.check} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease }} aria-hidden="true">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
          </motion.div>
          <Badge tone="accent" className={styles.badge}>{badge}</Badge>
          <Title as="h1" size="xl" className={styles.h1}>{title}</Title>

          <motion.div className={styles.ticket} {...rise(1)}>
            <div className={styles.dateBox} aria-hidden="true">
              <span className={styles.dMon}>{fmt(b.start, { month: 'short' }).replace('.', '')}</span>
              <span className={styles.dDay}>{fmt(b.start, { day: 'numeric' })}</span>
            </div>
            <div className={styles.ticketBody}>
              <p className={styles.tDate}>{fmt(b.start, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <p className={styles.tTime}>{fmt(b.start, { hour: '2-digit', minute: '2-digit' })} Uhr · {durationLabel}</p>
              <ul className={styles.tags}>
                <li>{b.trainer ? withTrainer : withoutTrainer}</li>
                {b.ziel ? <li>{b.ziel}</li> : null}
                {b.erfahrung ? <li>{b.erfahrung}</li> : null}
              </ul>
            </div>
          </motion.div>
          <p className={styles.mail}>{mailNote}</p>

          <div className={styles.cal}>
            <span className={styles.calLabel}>{calendarLabel}</span>
            <div className={styles.calRow}>
              <button type="button" className={styles.pill} onClick={downloadIcs}>{icsLabel}</button>
              <a className={styles.pill} href={gcalHref} target="_blank" rel="noopener noreferrer">{googleCalLabel}</a>
            </div>
          </div>

          <motion.div {...rise(2)}>
            {fragen ? (
              <Fragen {...fragen} variant="embed" booked leadLabel={finnLabel} lead={finnLine || finnFallback} intro={chatIntro} context={fragenContext} />
            ) : null}
          </motion.div>
        </div>
      </section>

      {/* 2 · Ablauf + Mitbringen */}
      <section className={styles.sec}>
        <Deco kind="dumbbell" className={styles.deco} />
        <div className={styles.container}>
          <Title as="h2" size="lg">{flowTitle}</Title>
          <ol className={styles.flow}>
            {(flow || []).map((f: any, i: number) => (
              <motion.li key={f.title} className={styles.flowItem} {...rise(i)}>
                <span className={styles.flowNum}>{String(i + 1).padStart(2, '0')}</span>
                <div><strong>{f.title}</strong><p>{f.text}</p></div>
              </motion.li>
            ))}
          </ol>

          <div className={styles.lists}>
            <motion.div className={styles.listCard} {...rise(0)}>
              <h3>{bringTitle}</h3>
              <ul>{(bring || []).map((x: string) => <li key={x}>{x}</li>)}</ul>
            </motion.div>
            <motion.div className={`${styles.listCard} ${styles.listCardAlt}`} {...rise(1)}>
              <h3>{onsiteTitle}</h3>
              <ul>{(onsite || []).map((x: string) => <li key={x}>{x}</li>)}</ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3 · Anfahrt */}
      <section className={`${styles.sec} ${styles.secDark}`} id="anfahrt">
        <Deco kind="pin" className={`${styles.deco} ${styles.decoDark}`} />
        <div className={styles.container}>
          <Title as="h2" size="lg">{wayTitle}</Title>
          <p className={styles.addr}>{address}</p>
          <p className={styles.park}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4" /><path d="M9 17V7h4a3 3 0 010 6H9" /></svg>
            {parkingNote}
          </p>
          <div className={styles.routeRow}>
            <a className={styles.routeBtn} href={gRoute} target="_blank" rel="noopener noreferrer">{routeGoogleLabel}</a>
            <a className={`${styles.routeBtn} ${styles.routeGhost}`} href={aRoute} target="_blank" rel="noopener noreferrer">{routeAppleLabel}</a>
          </div>
          <div className={styles.map}>
            {mapOn ? (
              <iframe title={wayTitle} src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            ) : (
              <button type="button" className={styles.mapGate} onClick={() => setMapOn(true)}>
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0119 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
                <strong>{mapLoadLabel}</strong>
                <span>{mapNote}</span>
              </button>
            )}
          </div>

          <div className={styles.change}>
            <strong>{changeTitle}</strong>
            <p>{changeText}</p>
            <div className={styles.calRow}>
              <a className={styles.pillLight} href={phoneHref}>{phoneLabel}</a>
              <a className={styles.pillLight} href={emailHref}>{emailLabel}</a>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.back}><a href={backHref}>{backLabel}</a></div>
    </>
  );
}
