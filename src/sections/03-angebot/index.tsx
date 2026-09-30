'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Title from '@siteui/title';
import Text from '@siteui/text';
import Badge from '@siteui/badge';
import Button from '@siteui/button';
import Deco from '@siteui/deco';
import styles from './styles.module.css';

const ease = [0.22, 1, 0.36, 1] as any;
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

const ICONS: Record<string, React.ReactNode> = {
  club: <path d="M3 9v6M21 9v6M6 7v10M18 7v10M6 12h12" />,
  screen: <><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></>,
  drink: <><path d="M7 3h10l-1.5 17a2 2 0 0 1-2 1.8h-3A2 2 0 0 1 8.5 20L7 3z" /><path d="M7.6 9h8.8" /></>,
  plan: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></>,
  app: <><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></>,
  wifi: <><path d="M2 9a15 15 0 0 1 20 0M5.5 12.5a10 10 0 0 1 13 0M9 16a5 5 0 0 1 6 0" /><circle cx="12" cy="19.5" r="0.8" /></>,
  heart: <><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /><path d="M8 11h2l1-2 2 4 1-2h2" /></>,
  person: <><circle cx="12" cy="7" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
};

export default function Angebot(props: any) {
  const {
    fullHeight, anchorId, bgColor, eyebrow, headlineSpar, textSpar, ctaLabel, ctaHref,
    sparLabel, currencySign, tomorrowText, lastDayText, limitText, todayMarker, chartAria, expiredText,
    promoStart, priceUntil, signupUntil,
    promoPrice, promoLabelSpar, afterLabelSpar, tarifSaveText, promoWeekly, tarife,
    inclTitle, included,
    bgDeco,
    hinweise, legalToggle, rechtstext, totalText, agbIntro, agbLabel, agbHref, andLabel, houseLabel, houseHref,
  } = props;

  const now = useNow();
  const [openIncl, setOpenIncl] = useState<number | null>(null);
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
      {bgDeco ? <Deco kind={String(bgDeco)} className={styles.bgDeco} /> : null}
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={styles.headCopy}>
            <Badge tone="accent">{eyebrow}</Badge>
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
                  <motion.span key={today} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }}>
                    {today}
                  </motion.span>
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
                        <motion.span
                          key={ts}
                          className={`${styles.bar} ${state}`}
                          style={{ height: `${Math.max(8, (v / top) * 100)}%`, transformOrigin: 'bottom' }}
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true, margin: '0px 0px 80px 0px' }}
                          transition={{ duration: 0.35, delay: Math.min(i * 0.005, 0.45), ease }}
                        >
                          {ts === signupTs ? <span className={`${styles.nowTag} ${i < barCount * 0.15 ? styles.nowTagLeft : ''} ${i > barCount * 0.85 ? styles.nowTagRight : ''}`}>{todayMarker}</span> : null}
                        </motion.span>
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
            <motion.article
              key={i}
              className={`${styles.tariff} ${t.highlight ? styles.hot : ''}`}
              onPointerDown={() => window.dispatchEvent(new CustomEvent('fi:signal', { detail: { type: 'tariff', value: t.name } }))}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px 120px 0px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
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
            </motion.article>
          ))}
        </div>

        <div className={styles.incl}>
          <Title as="h3" size="md" className={styles.inclTitle}>{inclTitle}</Title>
          <ul className={styles.inclGrid}>
            {(included || []).map((it: any, i: number) => (
              <motion.li
                key={i}
                className={`${styles.inclItem} ${openIncl === i ? styles.inclOpen : ''}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px 120px 0px' }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.05, ease }}
              >
                <button
                  type="button"
                  className={styles.inclBtn}
                  aria-expanded={openIncl === i}
                  aria-controls={`incl-${i}`}
                  onClick={() => { setOpenIncl(openIncl === i ? null : i); window.dispatchEvent(new CustomEvent('fi:signal', { detail: { type: 'incl', value: it.title } })); }}
                >
                  <span className={styles.icon} aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {ICONS[it.icon] || ICONS.club}
                    </svg>
                  </span>
                  <span className={styles.inclText}>
                    <strong>{it.title}</strong>
                    <span id={`incl-${i}`}>{it.text}</span>
                  </span>
                  <span className={styles.inclChevron} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                  </span>
                </button>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className={styles.foot}>
          <ul className={styles.notes}>
            {(hinweise || []).map((f: any, i: number) => (
              <li key={i}>{f.text}</li>
            ))}
          </ul>
          <div className={styles.cta}>
            <Button href={ctaHref} size="lg">{ctaLabel}</Button>
          </div>
        </div>

        <details className={styles.legal}>
          <summary>{legalToggle}</summary>
          <p>
            {rechtstext}{' '}
            {!over && totals.length >= 2 ? <>{fill(totalText, { basic: eur(totals[0]), premium: eur(totals[1]) })}{' '}</> : null}
            {agbIntro} <a href={agbHref} target="_blank" rel="noopener noreferrer">{agbLabel}</a> {andLabel}{' '}
            <a href={houseHref} target="_blank" rel="noopener noreferrer">{houseLabel}</a>.
          </p>
        </details>
      </div>
    </section>
  );
}
