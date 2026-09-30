'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Title from '@siteui/title';
import Text from '@siteui/text';
import Button from '@siteui/button';
import Badge from '@siteui/badge';
import { mediaUrl } from '@siteui/image';
import styles from './styles.module.css';

const ease = [0.22, 1, 0.36, 1] as any;
const DAY = 86400000;
const dayTs = (s: string) => { const [y, m, d] = String(s).split('-').map(Number); return new Date(y, (m || 1) - 1, d || 1).getTime(); };
const fill = (tpl: string, v: Record<string, string | number>) => String(tpl).replace(/\{(\w+)\}/g, (_, k) => (k in v ? String(v[k]) : ''));

export default function Hero({
  fullHeight, bgImage, overlayStrength, bgColor, showGrid,
  logo, logoAlt, logoHref, topPhoneLabel, topPhoneHref, showTopPhone,
  stickyLabel, stickyHref, stickyNoteSpar, showSticky, stickyChatLabel,
  eyebrowSpar, hlTopSpar, hlAccentSpar, sublineSpar,
  primaryLabel, primaryHref, secondaryLabel, secondaryHref, showSecondary,
  ribbonSpar, priceValue, currency, priceUnit, durationSpar, heroSaveText, heroSaveHint, priceListSpar, priceNote,
  promoStart, priceUntil, promoWeekly, regularMax,
  features, factsLabel,
}: any) {
  const [todayTs, setTodayTs] = useState<number | null>(null);
  useEffect(() => { const n = new Date(); setTodayTs(new Date(n.getFullYear(), n.getMonth(), n.getDate()).getTime()); }, []);
  const startTs = dayTs(promoStart);
  const untilTs = dayTs(priceUntil);
  const perDay = (Number(regularMax) - Number(promoWeekly)) / 7;
  const saveAt = (ts: number) => Math.max(0, Math.round((Math.round((untilTs - ts) / DAY) + 1) * perDay));
  const signupTs = Math.max(todayTs === null ? startTs : todayTs, startTs);
  const saveToday = saveAt(signupTs);
  const saveTomorrow = saveAt(signupTs + DAY);
  const saveMax = saveAt(startTs) || 1;
  const promoOver = todayTs !== null && todayTs > untilTs;
  const [stickyOn, setStickyOn] = useState(false);
  useEffect(() => {
    if (!showSticky) return;
    let targetVisible = false;
    const target = typeof document !== 'undefined' && stickyHref && stickyHref.startsWith('#')
      ? document.getElementById(stickyHref.slice(1))
      : null;
    const update = () => setStickyOn(window.scrollY > 520 && !targetVisible);
    let obs: IntersectionObserver | null = null;
    if (target && 'IntersectionObserver' in window) {
      obs = new IntersectionObserver(([e]) => { targetVisible = e.isIntersecting; update(); }, { threshold: 0.05 });
      obs.observe(target);
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => { window.removeEventListener('scroll', update); if (obs) obs.disconnect(); };
  }, [showSticky, stickyHref]);

  const overlayHex = Math.round((Number(overlayStrength) / 100) * 255).toString(16).padStart(2, '0');
  const bgStyle: React.CSSProperties = { background: bgColor };
  const imgStyle: React.CSSProperties | undefined = bgImage && bgImage.src
    ? { backgroundImage: `url(${mediaUrl(bgImage.src, 'xl')})` }
    : undefined;

  return (
    <section className={`${styles.hero} ${fullHeight ? styles.full : ''}`} style={bgStyle}>
      {imgStyle ? <div className={styles.bgImg} style={imgStyle} aria-hidden="true" /> : null}
      {imgStyle ? <div className={styles.bgOverlay} style={{ background: `#05090B${overlayHex}` }} aria-hidden="true" /> : null}
      <div className={styles.glowA} aria-hidden="true" />
      <div className={styles.glowB} aria-hidden="true" />
      {showGrid ? <div className={styles.grid} aria-hidden="true" /> : null}
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.topbar}>
        <a className={styles.logoLink} href={logoHref}>
          {logo && logo.src ? (
            <img
              className={styles.logo}
              src={mediaUrl(logo.src, 'md')}
              srcSet={`${mediaUrl(logo.src, 'md')} 1x, ${mediaUrl(logo.src, 'md2x')} 2x`}
              alt={logoAlt}
              width={500}
              height={83}
            />
          ) : null}
        </a>
        {showTopPhone ? (
          <a className={styles.topPhone} href={topPhoneHref} aria-label={topPhoneLabel}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>
            <span>{topPhoneLabel}</span>
          </a>
        ) : null}
      </div>

      <div className={styles.container}>
        <div className={styles.copy}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <Badge tone="accent" dot>{eyebrowSpar}</Badge>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease }}>
            <Title as="h1" size="xxl" className={styles.headline}>
              {hlTopSpar} <em className={styles.accentLine}>{hlAccentSpar}</em>
            </Title>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.22, ease }}>
            <Text size="lg" muted className={styles.sub}>{sublineSpar}</Text>
          </motion.div>

          <motion.div className={styles.ctas} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.32, ease }}>
            <Button href={primaryHref} size="lg">{primaryLabel}</Button>
            {showSecondary ? <Button href={secondaryHref} size="lg" variant="ghost">{secondaryLabel}</Button> : null}
          </motion.div>

          <motion.div className={styles.facts} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}>
            <span className={styles.factsLabel}>{factsLabel}</span>
            <ul className={styles.factList}>
              {(features || []).map((f: any, i: number) => (
                <li key={i} className={styles.fact}>
                  <strong>{f.strong}</strong>
                  <span>{f.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          className={styles.priceWrap}
          initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
        >
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
                  <motion.span className={styles.saveFill} initial={{ width: '100%' }} animate={{ width: `${Math.max(3, (saveToday / saveMax) * 100)}%` }} transition={{ duration: 1.4, delay: 0.6, ease }} />
                </span>
                <span className={styles.saveHint}>{fill(heroSaveHint, { morgen: saveTomorrow })}</span>
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
        </motion.div>
      </div>
      {showSticky ? (
        <div className={`${styles.sticky} ${stickyOn ? styles.stickyOn : ''}`} aria-hidden={!stickyOn}>
          <span className={styles.stickyNote}>{fill(stickyNoteSpar, { x: saveToday })}</span>
          <a className={styles.stickyBtn} href={stickyHref} tabIndex={stickyOn ? 0 : -1}>{stickyLabel}</a>
          <button type="button" className={styles.stickyPhone} aria-label={stickyChatLabel} tabIndex={stickyOn ? 0 : -1} onClick={() => window.dispatchEvent(new CustomEvent('finn:open'))}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /><path d="M8.5 12h.01M12 12h.01M15.5 12h.01" /></svg>
            <span className={styles.stickyDot} aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </section>
  );
}
