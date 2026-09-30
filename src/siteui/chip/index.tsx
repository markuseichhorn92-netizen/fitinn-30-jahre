'use client';
import React from 'react';
import styles from './styles.module.css';

type Props = {
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
};

export default function Chip({ onClick, disabled, children }: Props) {
  return (
    <button type="button" className={styles.chip} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
