'use client';
import React, { useEffect, useState } from 'react';
import Title from '@siteui/title';
import Text from '@siteui/text';
import Button from '@siteui/button';
import styles from './styles.module.css';

const DAY = 86400000;

function dayTs(s: string): number {
  const [y, m, d] = String(s).split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1).getTime();
}
// Kalendertag verschieben (sommerzeitsicher, statt + n * 24 h)
function addDays(ts: number, n: number): number {
  const d = new Date(ts);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n).getTime();
}
function startOfToday(): number {
  const n = new Date();
  return new Date(n.getFullYear(), n.getMonth(), n.getDate()).getTime();
}
// Anzahl Tage zum Aktionspreis, wenn am Tag `signup` abgeschlossen wird (inkl. Abschlusstag und Enddatum)
function promoDays(signup: number, until: number): number {
  return Math.max(0, Math.round((until - signup) / DAY) + 1);
}
function fill(tpl: string, vals: Record<string, string | number>): string {
  return String(tpl).replace(/\{(\w+)\}/g, (_, k) => (k in vals ? String(vals[k]) : ''));
}
const eur = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function useNow() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

export default function Angebot(props: any) {
  const {
    fullHeight, anchorId, bgColor, headlineSpar, textSpar, ctaLabel, ctaHref,
    sparLabel, currencySign, tomorrowText, lastDayText, limitText, todayMarker, chartAria, expiredText,
    promoStart, priceUntil, signupUntil,
    promoPrice, promoLabelSpar, afterLabelSpar, tarifSaveText, promoWeekly, tarife,
    inclTitle, inclLine,
    hinweise, legalToggle, rechtstext, totalText, agbIntro, agbLabel, agbHref, andLabel, houseLabel, houseHref,
  } = props;

  const now = useNow();
  const startTs = dayTs(promoStart);
  const untilTs = dayTs(priceUntil);
  const lastSignupTs = dayTs(signupUntil);
  const signupEnd = lastSignupTs + DAY - 1000;
  const todayTs = now === null ? startTs : startOfToday();
  const over = now !== null && now > signupEnd;
  const signupTs = Math.min(Math.max(todayTs, startTs), lastSignupTs);
  const promo = Number(promoWeekly);
  const list: any[] = Array.isArray(tarife) ? tarife : [];
  const perDay = list.reduce((mx, t) => Math.max(mx, (Number(t.regular) - promo) / 7), 0);

  const saveFor = (t: any, day: number) => Math.round((promoDays(day, untilTs) * (Number(t.regular) - promo)) / 7);
  const maxSave = (day: number) => Math.round(promoDays(day, untilTs) * perDay);

  const today = maxSave(signupTs);
  const tomorrow = maxSave(addDays(signupTs, 1));
  const lastDay = maxSave(lastSignupTs);
  const isLastDay = signupTs >= lastSignupTs;

  const barCount = Math.max(1, Math.round((lastSignupTs - startTs) / DAY) + 1);
  const bars = Array.from({ length: barCount }, (_, i) => addDays(startTs, i));
  const top = maxSave(startTs) || 1;
  const MONTHS = ['Jan.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sept.', 'Okt.', 'Nov.', 'Dez.'];
  const fmtAxis = (ts: number) => { const d = new Date(ts); return `${d.getDate()}. ${MONTHS[d.getMonth()]}`; };

  const totals = list.map((t) => {
    const pw = promoDays(signupTs, untilTs) / 7;
    const weeks = Number(t.weeks);
    return pw * promo + Math.max(0, weeks - pw) * Number(t.regular);
  });

  return (
    <section id={anchorId} className={`${styles.sec} ${fullHeight ? styles.full : ''}`} style={{ background: bgColor }}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={styles.headCopy}>
            <Title as="h2" size="xl">{headlineSpar}</Title>
            <Text size="lg" muted>{textSpar}</Text>
          </div>

          <div className={styles.meter}>
            {over ? (
              <Text size="md">{expiredText}</Text>
            ) : (
              <>
                <span className={styles.meterLabel}>{sparLabel}</span>
                <div className={styles.meterValue} aria-live="polite">
                  <span>
                    {today}
                  </span>
                  <span className={styles.meterCur}>{currencySign}</span>
                </div>
                <p className={styles.meterNext}>
                  {isLastDay ? lastDayText : fill(tomorrowText, { morgen: tomorrow, ende: lastDay })}
                </p>

                <div className={styles.chart} role="img" aria-label={fill(chartAria, { max: top, min: lastDay, heute: today })}>
                  <div className={styles.bars}>
                    {bars.map((ts, i) => {
                      const v = maxSave(ts);
                      const state = ts < signupTs ? styles.past : ts === signupTs ? styles.now : styles.future;
                      return (
                        <span
                          key={ts}
                          className={`${styles.bar} ${state}`}
                          style={{ height: `${Math.max(8, (v / top) * 100)}%` }}
                        >
                          {ts === signupTs ? <span className={`${styles.nowTag} ${i < barCount * 0.15 ? styles.nowTagLeft : ''} ${i > barCount * 0.85 ? styles.nowTagRight : ''}`}>{todayMarker}</span> : null}
                        </span>
                      );
                    })}
                  </div>
                  <div className={styles.axis} aria-hidden="true">
                    <span>{fmtAxis(startTs)}</span>
                    <span>{fmtAxis(addDays(startTs, Math.floor(barCount / 2)))}</span>
                    <span>{fmtAxis(lastSignupTs)}</span>
                  </div>
                </div>

                <div className={styles.limit}>
                  <span className={styles.limitDot} aria-hidden="true" />
                  {limitText}
                </div>
              </>
            )}
          </div>
        </div>

        <div className={styles.tariffs}>
          {list.map((t: any, i: number) => (
            <article
              key={i}
              className={`${styles.tariff} ${t.highlight ? styles.hot : ''}`}
              onPointerDown={() => window.dispatchEvent(new CustomEvent('fi:signal', { detail: { type: 'tariff', value: t.name } }))}
              >
              {t.highlight ? <span className={styles.flag}>{t.highlight}</span> : null}
              <div className={styles.tHead}>
                <Title as="h3" size="md">{t.name}</Title>
                <span className={styles.term}>{t.term}</span>
              </div>
              <div className={styles.promo}>
                <span className={styles.promoPrice}>{promoPrice}</span>
                <span className={styles.promoLabel}>{promoLabelSpar}</span>
              </div>
              {!over ? (
                <div className={styles.save}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 17l6-6 4 4 8-8" /><path d="M14 7h7v7" /></svg>
                  {fill(tarifSaveText, { x: saveFor(t, signupTs) })}
                </div>
              ) : null}
              <div className={styles.after}>
                <span>{afterLabelSpar}</span>
                <strong>{t.after}</strong>
              </div>
            </article>
          ))}
        </div>

        <p className={styles.inclLine}><strong>{inclTitle}:</strong> {inclLine}</p>

        <div className={styles.foot}>
          <ul className={styles.notes}>
            {(hinweise || []).map((f: any, i: number) => (
              <li key={i}>{f.text}</li>
            ))}
          </ul>
          <div className={styles.cta}>
            <Button href={ctaHref} size="lg" onClick={(e: React.MouseEvent) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('fi:book', { detail: { source: 'angebot' } })); }}>{ctaLabel}</Button>
          </div>
        </div>

        <details className={styles.legal}>
          <summary>{legalToggle}</summary>
          <p>
            {rechtstext}{' '}
            {!over && totals.length >= 2 ? <>{fill(totalText, { basic: String(Math.round(totals[0])), premium: String(Math.round(totals[1])) })}{' '}</> : null}
            {agbIntro} <a href={agbHref} target="_blank" rel="noopener noreferrer">{agbLabel}</a> {andLabel}{' '}
            <a href={houseHref} target="_blank" rel="noopener noreferrer">{houseLabel}</a>.
          </p>
        </details>
      </div>
    </section>
  );
}
