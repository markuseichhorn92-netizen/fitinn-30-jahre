'use client';
// Ziel-Unterseiten (/ziel/…): „Kennst du das?" (Problem) → „So gehen wir es an" (Lösung, nur echte
// Leistungen) → ehrlicher Hinweis ohne Versprechen → Buchung. Texte in src/content/13-ziele.json.
import React from 'react';
import { motion } from 'framer-motion';
import Title from '@siteui/title';
import Text from '@siteui/text';
import Badge from '@siteui/badge';
import Button from '@siteui/button';
import Deco from '@siteui/deco';
import styles from './styles.module.css';

const ease = [0.22, 1, 0.36, 1] as any;
const rise = (i = 0) => ({ initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '0px 0px 120px 0px' }, transition: { duration: 0.45, ease, delay: i * 0.06 } });

export default function Ziel(props: any) {
  const { slug, problemKicker, problemTitle, problemText, pains, solutionKicker, solutionTitle, solutions, note, medicalNote, ctaLabel, ctaHint, bgDeco } = props;
  const book = (e: React.MouseEvent) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('fi:book', { detail: { source: `ziel-${slug}` } })); };
  return (
    <section id="loesung" className={styles.sec}>
      {bgDeco ? <Deco kind={String(bgDeco)} className={styles.bgDeco} /> : null}
      <div className={styles.container}>
        <div className={styles.problem}>
          <Badge tone="accent" className={styles.badge}>{problemKicker}</Badge>
          <Title as="h2" size="xl">{problemTitle}</Title>
          {problemText ? <Text size="lg" muted className={styles.lead}>{problemText}</Text> : null}
          <ul className={styles.pains}>
            {(pains || []).map((p: string, i: number) => (
              <motion.li key={p} {...rise(i)}>
                <span className={styles.painIcon} aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M12 7v6M12 17h.01" /></svg>
                </span>
                {p}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className={styles.solution}>
          <span className={styles.kicker}>{solutionKicker}</span>
          <Title as="h2" size="lg" className={styles.solTitle}>{solutionTitle}</Title>
          <ul className={styles.cards}>
            {(solutions || []).map((s: any, i: number) => (
              <motion.li key={s.title} className={styles.card} {...rise(i)}>
                {s.tag ? <span className={styles.tag}>{s.tag}</span> : null}
                <strong>{s.title}</strong>
                <p>{s.text}</p>
              </motion.li>
            ))}
          </ul>
          {note ? <p className={styles.note}>{note}</p> : null}
          {medicalNote ? (
            <p className={styles.medical}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8h.01M11 12h1v4h1" /></svg>
              <span>{medicalNote}</span>
            </p>
          ) : null}
          <div className={styles.cta}>
            <Button href="#anmeldung" size="lg" onClick={book}>{ctaLabel}</Button>
            {ctaHint ? <span className={styles.ctaHint}>{ctaHint}</span> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
