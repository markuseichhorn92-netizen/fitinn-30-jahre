'use client';
import React from 'react';
import Title from '@siteui/title';
import Text from '@siteui/text';
import Badge from '@siteui/badge';
import Button from '@siteui/button';
import Chip from '@siteui/chip';
import styles from './styles.module.css';

const open = (detail?: any) => {
  window.dispatchEvent(new CustomEvent('finn:open', { detail }));
};

export default function FinnTeaser({
  anchorId, bgColor, badge, headline, introText, openLabel, note,
  suggestionsLabel, bookLabel, fragenChips,
  previewQuestion, previewAnswer, botName, previewLabel,
}: any) {
  return (
    <section id={anchorId} className={styles.sec} style={{ background: bgColor }}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.intro}>
          <Badge tone="accent" dot>{badge}</Badge>
          <Title as="h2" size="xl">{headline}</Title>
          <Text size="lg" muted>{introText}</Text>
          <div className={styles.cta}>
            <Button size="lg" onClick={() => open()}>{openLabel}</Button>
          </div>
          <Text size="sm" muted>{note}</Text>
        </div>

        <div className={styles.side}>
          <button type="button" className={styles.preview} onClick={() => open()} aria-label={openLabel}>
            <span className={styles.previewTag}>{previewLabel}</span>
            <span className={`${styles.bubble} ${styles.user}`}>{previewQuestion}</span>
            <span className={styles.botRow}>
              <span className={styles.avatar} aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9z" /></svg>
              </span>
              <span className={`${styles.bubble} ${styles.bot}`}>
                <strong>{botName}</strong>
                {previewAnswer}
              </span>
            </span>
          </button>

          <span className={styles.suggestLabel}>{suggestionsLabel}</span>
          <div className={styles.chips}>
            <Chip onClick={() => open({ book: true })}>{bookLabel}</Chip>
            {(fragenChips || []).map((s: any, i: number) => (
              <Chip key={i} onClick={() => open({ message: s.text })}>{s.text}</Chip>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
