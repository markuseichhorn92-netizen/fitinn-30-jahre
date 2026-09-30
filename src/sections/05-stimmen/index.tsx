'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Title from '@siteui/title';
import Text from '@siteui/text';
import Badge from '@siteui/badge';
import styles from './styles.module.css';


function Stars() {
  return (
    <span className={styles.stars} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L1.3 7.8l6.1-.7z" /></svg>
      ))}
    </span>
  );
}

const ease = [0.22, 1, 0.36, 1] as any;

export default function Stimmen({ fullHeight, anchorId, bgColor, eyebrow, title, source, quotes, stars }: any) {
  return (
    <section id={anchorId} className={`${styles.sec} ${fullHeight ? styles.full : ''}`} style={{ background: bgColor }}>
      <div className={styles.container}>
        <div className={styles.head}>
          <Badge tone="accent">{eyebrow}</Badge>
          <Title as="h2" size="xl">{title}</Title>
        </div>
        <div className={styles.stack}>
          {(quotes || []).map((q: any, i: number) => (
            <motion.figure
              key={i}
              className={`${styles.quote} ${styles['q' + (i % 3)]}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px 120px 0px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
            >
              <span className={styles.mark} aria-hidden="true">„</span>
              <blockquote className={styles.text}>{q.quote}</blockquote>
              <figcaption className={styles.author}>
                {stars ? <Stars /> : null}
                <span>{q.author}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
        <Text size="sm" muted className={styles.source}>{source}</Text>
      </div>
    </section>
  );
}
