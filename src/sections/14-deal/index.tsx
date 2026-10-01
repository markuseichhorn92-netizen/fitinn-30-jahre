'use client';
// /deal – Deal-Seite im Stil einer klassischen „Deal"-Landingpage: großer Preis-Hero, drei Säulen,
// „Wie funktioniert der Deal?" als Klartext-Liste, Kennzahlen, fester Button unten.
// Texte in src/content/14-deal.json; Preise/Datum wie auf der Startseite (03-angebot.json).
import NextImage from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@siteui/button';
import { mediaUrl } from '@siteui/image';
import styles from './styles.module.css';

const ease = [0.22, 1, 0.36, 1] as any;
const DAY = 86400000;
const dayTs = (s: string) => { const [y, m, d] = String(s).split('-').map(Number); return new Date(y, (m || 1) - 1, d || 1).getTime(); };
const fill = (tpl: string, v: Record<string, string | number>) => String(tpl).replace(/\{(\w+)\}/g, (_, k) => (k in v ? String(v[k]) : ''));
const rise = (i = 0) => ({ initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '0px 0px 120px 0px' }, transition: { duration: 0.45, ease, delay: i * 0.07 } });

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);

export default function Deal(props: any) {
  const {
    bgImage, logo, logoAlt, logoHref, phoneLabel, phoneHref, features,
    promoStart, priceUntil, promoWeekly, regularMax,
    badge, kicker, price, priceUnit, strike, until, subline, primaryLabel, secondaryLabel, heroNote,
    pillars, dealKicker, dealTitle, dealSteps, inclTitle, included, dealCta, dealCtaHint, stickyLabel, stickyNote,
  } = props;

  // Ersparnis heute (Basic): Tage bis Silvester × (regulär − Aktion) / 7 – gleiche Rechnung wie im Hero der Startseite.
  const [todayTs, setTodayTs] = useState<number | null>(null);
  useEffect(() => { const n = new Date(); setTodayTs(new Date(n.getFullYear(), n.getMonth(), n.getDate()).getTime()); }, []);
  const startTs = dayTs(promoStart), untilTs = dayTs(priceUntil);
  const perDay = (Number(regularMax) - Number(promoWeekly)) / 7;
  const fromTs = Math.max(todayTs === null ? startTs : todayTs, startTs);
  const saveToday = Math.max(0, Math.round((Math.round((untilTs - fromTs) / DAY) + 1) * perDay));

  const book = (source: string) => (e: React.MouseEvent) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('fi:book', { detail: { source } })); };

  // Fester Button erscheint, sobald der Hero aus dem Bild ist.
  const heroRef = useRef<HTMLElement | null>(null);
  const [stickyOn, setStickyOn] = useState(false);
  useEffect(() => {
    const el = heroRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([en]) => setStickyOn(!en.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => { document.body.classList.toggle('fi-sticky-on', stickyOn); return () => document.body.classList.remove('fi-sticky-on'); }, [stickyOn]);

  return (
    <>
      <section ref={heroRef} className={styles.hero}>
        {bgImage?.src ? <NextImage className={styles.heroImg} src={mediaUrl(bgImage.src)} alt="" fill priority fetchPriority="high" quality={85} sizes="100vw" /> : null}
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.topbar}>
          <a href={logoHref} className={styles.logoLink}>
            {logo?.src ? <NextImage className={styles.logo} src={mediaUrl(logo.src)} alt={logoAlt} width={2917} height={486} sizes="200px" priority /> : logoAlt}
          </a>
          {phoneLabel ? <a className={styles.phone} href={phoneHref}>{phoneLabel}</a> : null}
        </div>
        <div className={styles.heroInner}>
          <motion.span className={styles.badge} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
            <span className={styles.pulse} aria-hidden="true" />{badge}
          </motion.span>
          <motion.h1 className={styles.h1} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.08 }}>
            <span className={styles.kicker}>{kicker}</span>
            <span className={styles.priceRow}>
              <span className={styles.price}>{price}</span>
              <span className={styles.priceSide}>
                <span className={styles.strike}>{strike}</span>
                <span className={styles.unit}>{priceUnit}</span>
              </span>
            </span>
            <span className={styles.until}>{until}</span>
          </motion.h1>
          <motion.p className={styles.subline} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.16 }}>{subline}</motion.p>
          <motion.div className={styles.ctas} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.24 }}>
            <Button href="#anmeldung" size="lg" className={styles.mainBtn} onClick={book('deal-hero')}>{primaryLabel}</Button>
            <a className={styles.textLink} href="#deal">{secondaryLabel}</a>
          </motion.div>
          <p className={styles.heroNote}>{heroNote}</p>
        </div>
      </section>

      <section className={styles.pillars} aria-label="Warum der Deal">
        <div className={styles.container}>
          <ul className={styles.pillarGrid}>
            {(pillars || []).map((p: any, i: number) => (
              <motion.li key={p.title} className={styles.pillar} {...rise(i)}>
                <span className={styles.pillarIcon}><Check /></span>
                <strong className={styles.pillarTitle}>{p.title}</strong>
                <p>{p.text}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section id="deal" className={styles.deal}>
        <div className={`${styles.container} ${styles.dealGrid}`}>
          <div className={styles.dealHead}>
            <span className={styles.dealKicker}>{dealKicker}</span>
            <h2 className={styles.h2}>{dealTitle}</h2>
            <div className={styles.bigSave}>
              <span>Heute starten, bis zu</span>
              <strong>{saveToday} €</strong>
              <span>sparen (Basic)</span>
            </div>
          </div>
          <div className={styles.dealBody}>
            <ol className={styles.steps}>
              {(dealSteps || []).map((s: any, i: number) => (
                <motion.li key={s.strong} {...rise(i)}>
                  <span className={styles.stepNo}>{String(i + 1).padStart(2, '0')}</span>
                  <span><strong>{s.strong}</strong><span className={styles.stepText}>{s.text}</span></span>
                </motion.li>
              ))}
            </ol>
            <div className={styles.incl}>
              <span className={styles.inclTitle}>{inclTitle}</span>
              <ul>
                {(included || []).map((t: string) => <li key={t}><Check />{t}</li>)}
              </ul>
            </div>
            <div className={styles.dealCta}>
              <Button href="#anmeldung" size="lg" onClick={book('deal-liste')}>{dealCta}</Button>
              <span>{dealCtaHint}</span>
            </div>
          </div>
        </div>
      </section>

      {features?.length ? (
        <section className={styles.stats} aria-label="Fit-Inn in Zahlen">
          <ul className={styles.container}>
            {features.map((f: any, i: number) => (
              <motion.li key={f.strong} {...rise(i)}><strong>{f.strong}</strong><span>{f.text}</span></motion.li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className={`${styles.sticky} ${stickyOn ? styles.stickyOn : ''}`} aria-hidden={!stickyOn}>
        <span className={styles.stickyNote}>{fill(stickyNote, { x: saveToday })}</span>
        <a className={styles.stickyBtn} href="#anmeldung" tabIndex={stickyOn ? 0 : -1} onClick={book('deal-sticky')}>{stickyLabel}</a>
      </div>
    </>
  );
}
