import React from 'react';
import styles from './styles.module.css';

type Props = {
  tone?: 'accent' | 'glass';
  dot?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export default function Badge({ tone, dot, className, children }: Props) {
  const cls = [styles.badge, styles[tone || 'glass'], className || ''].filter(Boolean).join(' ');
  return (
    <span className={cls}>
      {dot ? <span className={styles.dot} aria-hidden="true" /> : null}
      {children}
    </span>
  );
}
