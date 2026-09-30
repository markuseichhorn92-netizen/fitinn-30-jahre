import React from 'react';
import styles from './styles.module.css';

type Props = {
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  size?: 'xxl' | 'xl' | 'lg' | 'md' | 'sm';
  align?: 'left' | 'center';
  className?: string;
  children?: React.ReactNode;
};

export default function Title({ as, size, align, className, children }: Props) {
  const Tag = (as || 'h2') as any;
  const cls = [styles.title, styles[size || 'lg'], align === 'center' ? styles.center : '', className || '']
    .filter(Boolean)
    .join(' ');
  return <Tag className={cls}>{children}</Tag>;
}
