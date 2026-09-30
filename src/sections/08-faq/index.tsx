'use client';
import React from 'react';
import Title from '@siteui/title';
import Text from '@siteui/text';
import Badge from '@siteui/badge';
import AccordionItem from '@siteui/accordion-item';
import styles from './styles.module.css';

export default function Fragen({ fullHeight, anchorId, bgColor, eyebrow, title, text, phoneLabel, phoneHref, fragen }: any) {
  return (
    <section id={anchorId} className={`${styles.sec} ${fullHeight ? styles.full : ''}`} style={{ background: bgColor }}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Badge tone="accent" className={styles.badge}>{eyebrow}</Badge>
          <Title as="h2" size="xl">{title}</Title>
          <Text size="lg" className={styles.text}>{text}</Text>
          <a className={styles.phone} href={phoneHref}>{phoneLabel}</a>
        </div>
        <div className={styles.list}>
          {(fragen || []).map((it: any, i: number) => (
            <AccordionItem key={i} question={it.question} defaultOpen={it.open}>
              {it.answer}
            </AccordionItem>
          ))}
        </div>
      </div>
    </section>
  );
}
