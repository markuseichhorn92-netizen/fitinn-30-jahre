import React from 'react';
import styles from './styles.module.css';

type Props = {
  size?: 'lg' | 'md' | 'sm' | 'xs';
  muted?: boolean;
  align?: 'left' | 'center';
  as?: 'p' | 'span' | 'div';
  className?: string;
  children?: React.ReactNode;
};

export default function Text({ size, muted, align, as, className, children }: Props) {
  const Tag = (as || 'p') as any;
  const cls = [styles.text, styles[size || 'md'], muted ? styles.muted : '', align === 'center' ? styles.center : '', className || '']
    .filter(Boolean)
    .join(' ');
  return <Tag className={cls}>{children}</Tag>;
}
