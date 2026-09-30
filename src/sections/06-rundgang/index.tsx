'use client';
import React, { useState } from 'react';
import Title from '@siteui/title';
import Text from '@siteui/text';
import Badge from '@siteui/badge';
import { mediaUrl } from '@siteui/image';
import styles from './styles.module.css';

export default function Rundgang({ fullHeight, anchorId, bgColor, videoId, poster, eyebrow, title, playLabel, consentNote, iframeTitle }: any) {
  const [play, setPlay] = useState(false);
  const posterStyle: React.CSSProperties | undefined = poster && poster.src
    ? { backgroundImage: `url(${mediaUrl(poster.src, 'lg')})` }
    : undefined;
  return (
    <section id={anchorId} className={`${styles.sec} ${fullHeight ? styles.full : ''}`} style={{ background: bgColor }}>
      <div className={styles.container}>
        <div className={styles.head}>
          <Badge tone="accent">{eyebrow}</Badge>
          <Title as="h2" size="lg">{title}</Title>
        </div>
        <div className={styles.frame}>
          {play ? (
            <iframe
              className={styles.iframe}
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
              title={iframeTitle}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button type="button" className={styles.poster} style={posterStyle} onClick={() => setPlay(true)}>
              <span className={styles.shade} aria-hidden="true" />
              <span className={styles.play}>
                <span className={styles.playIcon} aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z" /></svg>
                </span>
                <span className={styles.playLabel}>{playLabel}</span>
              </span>
            </button>
          )}
        </div>
        {!play ? <Text size="sm" muted className={styles.note}>{consentNote}</Text> : null}
      </div>
    </section>
  );
}
