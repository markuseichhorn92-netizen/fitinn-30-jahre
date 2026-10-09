'use client';
import React, { useEffect, useState } from 'react';
import './styles.css';

// Einstieg in die Buchung: nächste freie Termine als Schnellwahl + Button. Die eigentliche
// Strecke (Termin, Ziel, Erfahrung, Daten, Hinweis) läuft im Vollbild-Fenster (11-wizard).
type Slot = { startDateTime: string };
const fmtDay = (iso: string) => new Date(iso).toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit' });
const fmtTime = (iso: string) => new Date(iso).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
const open = (source: string) => window.dispatchEvent(new CustomEvent('fi:book', { detail: { source } }));

export default function FitInnBooking(props: any) {
  const { eyebrow, headline, subheadline, quickTitle, quickButton, ctaLabel, loadingText, noSlotsText, phoneFallbackLabel, contactIntro, contactPhone, contactInstagram, contactInstagramHref, contactAddress, bookingWindowDays, apiBaseUrl, studioId, bgColor, bgDeco } = props;
  const [slots, setSlots] = useState<Slot[]>([]);
  const [state, setState] = useState<'loading' | 'ok' | 'empty'>('loading');
  useEffect(() => {
    const today = new Date(); const end = new Date(today); end.setDate(end.getDate() + Number(bookingWindowDays));
    const iso = (d: Date) => d.toISOString().split('T')[0];
    fetch(`${apiBaseUrl}/trialsession?studioId=${studioId}&startDate=${iso(today)}&endDate=${iso(end)}`)
      .then((r) => r.json()).then((d: any) => { const now = Date.now(); const arr = (Array.isArray(d.slots) ? d.slots : []).filter((s: Slot) => new Date(s.startDateTime).getTime() > now); setSlots(arr.slice(0, 4)); setState(arr.length ? 'ok' : 'empty'); })
      .catch(() => setState('empty'));
  }, [apiBaseUrl, studioId, bookingWindowDays]);
  const telHref = 'tel:+49' + String(contactPhone).replace(/\s/g, '').replace(/^0/, '');
  return (
    <section id="anmeldung" className="fi-cta" style={{ background: bgColor }}>
      <div className="fi-cta__inner is-visible">
        <div>
          <h2 className="fi-cta__headline">{headline}</h2>
          <p className="fi-cta__sub">{subheadline}</p>
          <div className="fi-cta__contact">
            <p>{contactIntro} <a className="fi-cta__phone" href={telHref}>{contactPhone}</a></p>
            <p><a href={contactInstagramHref} target="_blank" rel="noopener noreferrer">{contactInstagram}</a></p>
            <p>{contactAddress}</p>
          </div>
        </div>
        <div className="fi-cta__form">
          <h3 className="fi-cta__steptitle">{quickTitle}</h3>
          {state === 'loading' ? <div className="fi-cta__loading"><span className="fi-cta__spinner" aria-hidden="true" />{loadingText}</div> : null}
          {state === 'empty' ? <p className="fi-cta__msg fi-cta__msg--info">{noSlotsText} <a href={telHref}>{phoneFallbackLabel} · {contactPhone}</a></p> : null}
          {state === 'ok' ? (
            <div className="fi-quick">
              {slots.map((s) => (
                <button key={s.startDateTime} type="button" className="fi-quick__slot" onClick={() => open('form')}>
                  <strong>{fmtDay(s.startDateTime)}</strong><span>{fmtTime(s.startDateTime)} Uhr</span>
                </button>
              ))}
            </div>
          ) : null}
          <div className="fi-cta__actions">
            <span />
            <button type="button" className="fi-cta__submit" onClick={() => open('form')}>{state === 'ok' ? quickButton : ctaLabel}</button>
          </div>
        </div>
      </div>
    </section>
  );
}
