'use client';
import React, { useState, useId } from 'react';
import styles from './styles.module.css';

type Props = {
  question: React.ReactNode;
  children?: React.ReactNode;
  defaultOpen?: boolean;
};

export default function AccordionItem({ question, children, defaultOpen }: Props) {
  const [open, setOpen] = useState(!!defaultOpen);
  const id = useId();
  return (
    <div className={`${styles.item} ${open ? styles.open : ''}`}>
      <button
        type="button"
        className={styles.head}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
      >
        <span className={styles.q}>{question}</span>
        <span className={styles.icon} aria-hidden="true" />
      </button>
      <div id={id} role="region" className={styles.body} hidden={!open}>
        <div className={styles.inner}>{children}</div>
      </div>
    </div>
  );
}
