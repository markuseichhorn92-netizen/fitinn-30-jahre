'use client';
import React from 'react';
import Text from '@siteui/text';
import { mediaUrl } from '@siteui/image';
import styles from './styles.module.css';

export default function Footer({ bgColor, logo, brand, tagline, address, phoneLabel, phoneHref, email, links, copyright }: any) {
  return (
    <footer className={styles.foot} style={{ background: bgColor }}>
      <div className={styles.container}>
        <div className={styles.brandCol}>
          {logo && logo.src ? (
            <img
              className={styles.logo}
              src={mediaUrl(logo.src, 'md')}
              srcSet={`${mediaUrl(logo.src, 'md')} 1x, ${mediaUrl(logo.src, 'md2x')} 2x`}
              alt={brand}
              width={500}
              height={83}
              loading="lazy"
            />
          ) : (
            <span className={styles.brand}>{brand}</span>
          )}
          <Text size="md" muted>{tagline}</Text>
        </div>
        <address className={styles.contact}>
          <span>{address}</span>
          <a href={phoneHref}>{phoneLabel}</a>
          <a href={`mailto:${email}`}>{email}</a>
        </address>
        <nav className={styles.links}>
          {(links || []).map((l: any, i: number) => (
            <a key={i} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
          ))}
        </nav>
      </div>
      <div className={styles.bottom}>{copyright}</div>
    </footer>
  );
}
