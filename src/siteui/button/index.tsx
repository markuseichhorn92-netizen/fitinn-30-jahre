'use client';
import React from 'react';
import styles from './styles.module.css';

type Props = {
  href?: string;
  variant?: 'primary' | 'ghost' | 'light';
  size?: 'md' | 'lg';
  full?: boolean;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  children?: React.ReactNode;
};

export default function Button({ href, variant, size, full, type, disabled, onClick, className, children }: Props) {
  const cls = [styles.btn, styles[variant || 'primary'], styles[size || 'md'], full ? styles.full : '', className || '']
    .filter(Boolean)
    .join(' ');
  if (href) {
    return (
      <a className={cls} href={href} onClick={onClick}>
        <span className={styles.label}>{children}</span>
        <span className={styles.arrow} aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </a>
    );
  }
  return (
    <button className={cls} type={type || 'button'} disabled={disabled} onClick={onClick}>
      <span className={styles.label}>{children}</span>
      <span className={styles.arrow} aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
    </button>
  );
}
