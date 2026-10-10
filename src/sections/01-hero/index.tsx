'use client';
import NextImage from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Title from '@siteui/title';
import Text from '@siteui/text';
import Button from '@siteui/button';
import { mediaUrl } from '@siteui/image';
import { funnel } from '@/lib/funnel';
import { CONSENT_EVENT } from '@/lib/consent';
import styles from './styles.module.css';

const DAY = 86400000;
const dayTs = (s: string) => { const [y, m, d] = String(s).split('-').map(Number); return new Date(y, (m || 1) - 1, d || 1).getTime(); };
// Heutiges Datum in Europe/Berlin (unabhängig von der Zeitzone des Geräts)
const berlinToday = () => dayTs(new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()));
const fill = (tpl: string, v: Record<string, string | number>) => String(tpl).replace(/\{(\w+)\}/g, (_, k) => (k in v ? String(v[k]) : ''));

export default function Hero({
  fullHeight, bgImage, overlayStrength, bgColor, showGrid,
  logo, logoAlt, logoHref, topPhoneLabel, topPhoneHref, showTopPhone,
  stickyLabel, stickyHref, stickyNoteSpar, showSticky, stickyChatLabel,
  hlTopSpar, hlAccentSpar, steps, trustLine, trustHref, sublineSpar, sublineShort,
  primaryLabel, primaryHref, primaryNote, secondaryLabel, secondaryHref, showSecondary,
  ribbonSpar, priceValue, currency, priceUnit, durationSpar, heroSaveText, heroSaveHint, priceListSpar, priceNote,
  promoStart, priceUntil, promoWeekly, regularMax,
  features, factsLabel,
}: any) {
  const [todayTs, setTodayTs] = useState<number | null>(null);
  useEffect(() => { setTodayTs(berlinToday()); }, []);
  const startTs = dayTs(promoStart);
  const untilTs = dayTs(priceUntil);
  const perDay = (Number(regularMax) - Number(promoWeekly)) / 7;
  const saveAt = (ts: number) => Math.max(0, Math.round((Math.round((untilTs - ts) / DAY) + 1) * perDay));
  const signupTs = Math.max(todayTs === null ? startTs : todayTs, startTs);
  const saveToday = saveAt(signupTs);
  const saveTomorrow = saveAt(new Date(new Date(signupTs).getFullYear(), new Date(signupTs).getMonth(), new Date(signupTs).getDate() + 1).getTime());
  const saveMax = saveAt(startTs) || 1;
  const daysLeft = Math.round((untilTs - signupTs) / DAY);
  const promoOver = todayTs !== null && todayTs > untilTs;
  const [stickyOn, setStickyOn] = useState(false);
  useEffect(() => { document.body.classList.toggle('fi-sticky-on', stickyOn); return () => document.body.classList.remove('fi-sticky-on'); }, [stickyOn]);
  const heroRef = useRef<HTMLElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!showSticky) return;
    let targetVisible = false;
    let ctaVisible = false;
    const target = typeof document !== 'undefined' && stickyHref && stickyHref.startsWith('#')
      ? document.getElementById(stickyHref.slice(1))
      : null;
    // Handy: Leiste erst, wenn der Hero-Button aus dem Bild ist (ein Button pro Bildschirm); weg, solange das Buchungsformular im Bild ist
    const update = () => setStickyOn(!targetVisible && !ctaVisible);
    const heroBtn = ctasRef.current?.querySelector('a,button');
    let obs: IntersectionObserver | null = null;
    let obsCta: IntersectionObserver | null = null;
    if (target && 'IntersectionObserver' in window) {
      obs = new IntersectionObserver(([e]) => { targetVisible = e.isIntersecting; update(); }, { threshold: 0.05 });
      obs.observe(target);
    }
    if (heroBtn && 'IntersectionObserver' in window) {
      obsCta = new IntersectionObserver(([e]) => { ctaVisible = e.isIntersecting; update(); }, { threshold: 0.2 });
      obsCta.observe(heroBtn);
    }
    update();
    return () => { if (obs) obs.disconnect(); if (obsCta) obsCta.disconnect(); };
  }, [showSticky, stickyHref]);

  useEffect(() => {
    const btn = ctasRef.current?.querySelector('a,button');
    if (!btn || !('IntersectionObserver' in window)) return;
    let visible = false;
    const covered = () => {
      const r = btn.getBoundingClientRect();
      return Array.from(document.querySelectorAll('[role="dialog"] > div, section > div[class*="sticky"]')).some((el) => {
        const b = el.getBoundingClientRect();
        return b.height > 0 && getComputedStyle(el).visibility !== 'hidden' && b.top < r.bottom - 4 && b.bottom > r.top + 4 && b.left < r.right && b.right > r.left && getComputedStyle(el).opacity !== '0';
      });
    };
    // Anonym: „Hero-Button war im Bild“ – frei oder von Banner/Leiste verdeckt (siehe src/app/api/f/route.ts)
    const report = () => { if (visible) funnel('cta_seen', covered() ? 'covered' : 'free'); };
    const obs = new IntersectionObserver(([e]) => { visible = e.isIntersecting; setTimeout(report, 400); }, { threshold: 0.5 });
    obs.observe(btn);
    window.addEventListener(CONSENT_EVENT, report);
    return () => { obs.disconnect(); window.removeEventListener(CONSENT_EVENT, report); };
  }, []);

  const overlayHex = Math.round((Number(overlayStrength) / 100) * 255).toString(16).padStart(2, '0');
  const bgStyle: React.CSSProperties = { background: bgColor };
  const imgStyle: React.CSSProperties | undefined = bgImage && bgImage.src
    ? { backgroundImage: `url(${mediaUrl(bgImage.src, 'xl')})` }
    : undefined;

  return (
    <section ref={heroRef} className={`${styles.hero} ${fullHeight ? styles.full : ''}`} style={bgStyle}>
      {imgStyle ? <NextImage className={styles.bgImg} src={mediaUrl(bgImage.src)} alt="" fill priority fetchPriority="high" quality={85} sizes="100vw" /> : null}
      {imgStyle ? <div className={styles.bgOverlay} style={{ background: `#05090B${overlayHex}` }} aria-hidden="true" /> : null}
      <div className={styles.glowA} aria-hidden="true" />
      <div className={styles.glowB} aria-hidden="true" />
      {showGrid ? <div className={styles.grid} aria-hidden="true" /> : null}
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.topbar}>
        {(() => {
          const img = logo && logo.src ? (
            <NextImage className={styles.logo} src={mediaUrl(logo.src)} alt={logoAlt} width={2917} height={486} quality={85} sizes="240px" priority />
          ) : null;
          // Während der Aktion kein Link zur Hauptseite: führt weg von der Anmeldung
          return logoHref ? <a className={styles.logoLink} href={logoHref}>{img}</a> : <span className={styles.logoLink}>{img}</span>;
        })()}
        {showTopPhone ? (
          <a className={styles.topPhone} href={topPhoneHref} aria-label={topPhoneLabel}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>
            <span>{topPhoneLabel}</span>
          </a>
        ) : null}
      </div>

      <div className={styles.container}>
        <div className={styles.copy}>
          <div className={`${styles.in}`} style={{ ['--d' as any]: '0.1s', ['--y' as any]: '28px', ['--t' as any]: '0.8s' }}>
            <Title as="h1" size="xxl" className={styles.headline}>
              {hlTopSpar} <em className={styles.accentLine}>{hlAccentSpar}</em>
            </Title>
          </div>

          {trustLine ? (
            <div className={`${styles.in} ${styles.trustWrap}`} style={{ ['--d' as any]: '0.16s', ['--y' as any]: '0px', ['--t' as any]: '0.4s' }}>
              {trustHref ? <a className={styles.trust} href={trustHref} target="_blank" rel="noopener noreferrer">{trustLine}</a> : <p className={styles.trust}>{trustLine}</p>}
            </div>
          ) : null}

          <div className={`${styles.in}`} style={{ ['--d' as any]: '0.22s', ['--y' as any]: '20px', ['--t' as any]: '0.7s' }}>
            <Text size="lg" muted className={styles.sub}>
              <span className={styles.subLong}>{sublineSpar}</span>
              <span className={styles.subShort}>{sublineShort || sublineSpar}</span>
            </Text>
          </div>

          <div ref={ctasRef} className={`${styles.in} ${styles.ctas}`} style={{ ['--d' as any]: '0.32s', ['--y' as any]: '20px', ['--t' as any]: '0.7s' }}>
            <Button href={primaryHref} size="lg" onClick={(e: React.MouseEvent) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('fi:book', { detail: { source: 'hero' } })); }}>{primaryLabel}</Button>
            {showSecondary ? <Button href={secondaryHref} size="lg" variant="ghost">{secondaryLabel}</Button> : null}
          </div>
          {primaryNote ? <p className={styles.ctaNote}>{primaryNote}</p> : null}

          {Array.isArray(steps) && steps.length ? (
            <ol className={styles.steps} aria-label="So läuft es ab">
              {steps.map((st: any, i: number) => (
                <li key={i} className={styles.step}>
                  <span className={styles.stepNo} aria-hidden="true">{i + 1}</span>
                  <span><strong>{st.title}</strong> {st.text}</span>
                </li>
              ))}
            </ol>
          ) : null}

          <div className={`${styles.in} ${styles.facts}`} style={{ ['--d' as any]: '0.5s', ['--y' as any]: '0px', ['--t' as any]: '0.8s' }}>
            {factsLabel ? <span className={styles.factsLabel}>{factsLabel}</span> : null}
            <ul className={styles.factList}>
              {(features || []).map((f: any, i: number) => (
                <li key={i} className={styles.fact}>
                  <strong>{f.strong}</strong>
                  <span>{f.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.priceWrap}>
          <div className={styles.ring} aria-hidden="true" />
          <div className={styles.priceCard}>
            <span className={styles.ribbon}>{ribbonSpar}</span>
            <div className={styles.priceRow}>
              <span className={styles.priceValue}>{priceValue}</span>
              <span className={styles.priceSide}>
                <span className={styles.currency}>{currency}</span>
                <span className={styles.unit}>{priceUnit}</span>
              </span>
            </div>
            <div className={styles.duration}>{durationSpar}</div>
            {!promoOver ? (
              <div className={styles.saveBox}>
                <strong>{fill(heroSaveText, { x: saveToday })}</strong>
                <span className={styles.saveTrack} aria-hidden="true">
                  <span className={styles.saveFill} style={{ width: `${Math.max(3, (saveToday / saveMax) * 100)}%` }} />
                </span>
                {heroSaveHint && daysLeft > 0 ? <span className={styles.saveHint}>{fill(heroSaveHint, { morgen: saveTomorrow, tage: daysLeft })}</span> : null}
              </div>
            ) : null}
            <ul className={styles.incl}>
              {(priceListSpar || []).map((p: any, i: number) => (
                <li key={i}>
                  <span className={styles.check} aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6.2l2.3 2.3 4.7-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  {p.text}
                </li>
              ))}
            </ul>
            <Text size="xs" muted className={styles.note}>{priceNote}</Text>
          </div>
        </div>
      </div>
      {showSticky ? (
        <div className={`${styles.sticky} ${stickyOn ? styles.stickyOn : ''}`} aria-hidden={!stickyOn}>
          <span className={styles.stickyNote}>{fill(stickyNoteSpar, { x: saveToday })}</span>
          <a className={styles.stickyBtn} href={stickyHref} aria-label={stickyLabel} tabIndex={stickyOn ? 0 : -1} onClick={(e: React.MouseEvent) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('fi:book', { detail: { source: 'sticky' } })); }}>
            <span className={styles.stickyMain}>{String(stickyLabel).split(' · ')[0]}</span>
            {String(stickyLabel).includes(' · ') ? <span className={styles.stickySub}>{String(stickyLabel).split(' · ').slice(1).join(' · ')}</span> : null}
          </a>
          <button type="button" className={styles.stickyPhone} aria-label={stickyChatLabel} tabIndex={stickyOn ? 0 : -1} onClick={() => window.dispatchEvent(new CustomEvent('finn:open'))}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9z" /><path d="M19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" /></svg>
            <span className={styles.stickyDot} aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </section>
  );
}
