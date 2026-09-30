'use client';
import React from 'react';
import Title from '@siteui/title';
import Text from '@siteui/text';
import styles from './styles.module.css';


export default function Haus({ fullHeight, anchorId, bgColor, bigYear, title, text, stats, listTitle, items }: any) {
  return (
    <section id={anchorId} className={`${styles.sec} ${fullHeight ? styles.full : ''}`} style={{ background: bgColor }}>
      <div className={styles.year} aria-hidden="true">{bigYear}</div>
      <div className={styles.container}>
        <div
          className={styles.intro}
        >
          <Title as="h2" size="xl">{title}</Title>
          <Text size="lg" className={styles.text}>{text}</Text>
          <dl className={styles.stats}>
            {(stats || []).map((s: any, i: number) => (
              <div key={i} className={styles.stat}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          className={styles.panel}
        >
          <Title as="h3" size="sm" className={styles.listTitle}>{listTitle}</Title>
          <ul className={styles.list}>
            {(items || []).map((it: any, i: number) => (
              <li key={i}>
                <span className={styles.check} aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M2.5 6.2l2.3 2.3 4.7-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <span>{it.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
