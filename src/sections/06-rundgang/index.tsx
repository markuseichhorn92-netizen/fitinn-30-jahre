'use client';
// Studio-Rundgang: YouTube erst nach Klick (youtube-nocookie), Vorschaubild lokal & optimiert.
import React, { useEffect, useState } from 'react';
import NextImage from 'next/image';
import { motion } from 'framer-motion';
import Title from '@siteui/title';
import Text from '@siteui/text';
import Badge from '@siteui/badge';
import Deco from '@siteui/deco';
import { mediaUrl } from '@siteui/image';
import { hasConsent, CONSENT_EVENT } from '@/lib/consent';
import styles from './styles.module.css';

const ease = [0.22, 1, 0.36, 1] as any;
const rise = (i = 0) => ({ initial: { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '0px 0px 120px 0px' }, transition: { duration: 0.5, ease, delay: i * 0.07 } });

export default function Rundgang({ fullHeight, anchorId, bgColor, bgDeco, videoId, poster, eyebrow, title, intro, playLabel, consentNote, iframeTitle, bookLabel }: any) {
  const [play, setPlay] = useState(false);
  const [mediaOk, setMediaOk] = useState(false);
  useEffect(() => {
    const upd = () => setMediaOk(hasConsent('media'));
    upd();
    window.addEventListener(CONSENT_EVENT, upd);
    return () => window.removeEventListener(CONSENT_EVENT, upd);
  }, []);
  const start = () => {
    setPlay(true);
    window.dispatchEvent(new CustomEvent('fi:signal', { detail: { type: 'rundgang', value: 'play' } }));
  };
  return (
    <section id={anchorId} className={`${styles.sec} ${fullHeight ? styles.full : ''}`} style={{ background: bgColor }}>
      {bgDeco ? <Deco kind={String(bgDeco)} className={styles.bgDeco} /> : null}
      <div className={styles.container}>
        <motion.div className={styles.head} {...rise(0)}>
          <Badge tone="accent">{eyebrow}</Badge>
          <Title as="h2" size="lg">{title}</Title>
          {intro ? <Text size="lg" className={styles.intro}>{intro}</Text> : null}
        </motion.div>
        <motion.div className={styles.frame} {...rise(1)}>
          {play ? (
            <iframe
              className={styles.iframe}
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={iframeTitle}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
            <button type="button" className={styles.poster} onClick={start} aria-label={playLabel}>
              {poster && poster.src ? (
                <NextImage className={styles.posterImg} src={mediaUrl(poster.src)} alt="" fill quality={85} sizes="(max-width: 767px) 100vw, 1100px" />
              ) : null}
              <span className={styles.shade} aria-hidden="true" />
              <span className={styles.play}>
                <span className={styles.playIcon} aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z" /></svg>
                </span>
                <span className={styles.playLabel}>{playLabel}</span>
              </span>
            </button>
          )}
        </motion.div>
        {!play && !mediaOk ? <Text size="sm" muted className={styles.note}>{consentNote}</Text> : null}
        {bookLabel ? (
          <div className={styles.cta}>
            <a className={styles.book} href="#anmeldung" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('fi:book', { detail: { source: 'rundgang' } })); }}>
              {bookLabel}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
