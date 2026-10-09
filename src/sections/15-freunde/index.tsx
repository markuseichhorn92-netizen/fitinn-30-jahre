'use client';
// /freunde – Einladungsseite für „Freunde werben Freunde“ (GymApp): Hero, Vorteile, Ablauf, Hinweis für werbende Mitglieder, FAQ.
// Die Terminbuchung kommt aus 09-booking + 11-wizard (gleiche Magicline-Strecke wie die Startseite). Texte: src/content/15-freunde.json.
import NextImage from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import Button from '@siteui/button';
import AccordionItem from '@siteui/accordion-item';
import { mediaUrl } from '@siteui/image';
import styles from './styles.module.css';

const ease = [0.22, 1, 0.36, 1] as any;
const rise = (i = 0) => ({ initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '0px 0px 120px 0px' }, transition: { duration: 0.45, ease, delay: i * 0.07 } });

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);

const book = (source: string) => (e: React.MouseEvent) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('fi:book', { detail: { source } })); };

export function FreundeHero(props: any) {
  const { bgImage, logo, logoAlt, logoHref, phoneLabel, phoneHref, badge, kicker, headline, subline, primaryLabel, secondaryLabel, heroNote, pillars } = props;
  return (
    <>
      <section className={styles.hero}>
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
            <span className={styles.headline}>{headline}</span>
          </motion.h1>
          <motion.p className={styles.subline} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.16 }}>{subline}</motion.p>
          <motion.div className={styles.ctas} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.24 }}>
            <Button href="#anmeldung" size="lg" className={styles.mainBtn} onClick={book('freunde-hero')}>{primaryLabel}</Button>
            <a className={styles.textLink} href="#ablauf">{secondaryLabel}</a>
          </motion.div>
          <p className={styles.heroNote}>{heroNote}</p>
        </div>
      </section>

      <section className={styles.pillars} aria-label="Warum Fit-Inn">
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
    </>
  );
}

export function FreundeInfo(props: any) {
  const { ablaufKicker, ablaufTitle, ablaufIntro, steps, importantTitle, importantText, membersTitle, membersText, primaryLabel, faqKicker, faqTitle, faq } = props;
  return (
    <>
      <section id="ablauf" className={styles.ablauf}>
        <div className={`${styles.container} ${styles.ablaufGrid}`}>
          <div className={styles.head}>
            <span className={styles.sectionKicker}>{ablaufKicker}</span>
            <h2 className={styles.h2}>{ablaufTitle}</h2>
            <p className={styles.intro}>{ablaufIntro}</p>
          </div>
          <div className={styles.body}>
            <ol className={styles.steps}>
              {(steps || []).map((s: any, i: number) => (
                <motion.li key={s.strong} {...rise(i)}>
                  <span className={styles.stepNo}>{String(i + 1).padStart(2, '0')}</span>
                  <span><strong>{s.strong}</strong><span className={styles.stepText}>{s.text}</span></span>
                </motion.li>
              ))}
            </ol>
            <div className={styles.important} role="note">
              <strong>{importantTitle}</strong>
              <p>{importantText}</p>
            </div>
            <div className={styles.members}>
              <strong>{membersTitle}</strong>
              <p>{membersText}</p>
            </div>
            <div className={styles.cta}>
              <Button href="#anmeldung" size="lg" onClick={book('freunde-ablauf')}>{primaryLabel}</Button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.faq} aria-label={faqTitle}>
        <div className={styles.faqInner}>
          <span className={styles.sectionKicker}>{faqKicker}</span>
          <h2 className={styles.h2}>{faqTitle}</h2>
          <div className={styles.faqList}>
            {(faq || []).map((f: any) => <AccordionItem key={f.q} question={f.q}>{f.a}</AccordionItem>)}
          </div>
        </div>
      </section>
    </>
  );
}
