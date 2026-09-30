'use client';
import NextImage from 'next/image';
import React from 'react';
import Text from '@siteui/text';
import { mediaUrl } from '@siteui/image';
import { openConsent } from '@/lib/consent';
import styles from './styles.module.css';

export default function Footer({ bgColor, logo, brand, tagline, address, phoneLabel, phoneHref, email, links, copyright }: any) {
  return (
    <footer className={styles.foot} style={{ background: bgColor }}>
      <div className={styles.container}>
        <div className={styles.brandCol}>
          {logo && logo.src ? (
            <NextImage className={styles.logo} src={mediaUrl(logo.src)} alt={brand} width={2917} height={486} quality={85} sizes="240px" />
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
          <button type="button" className={styles.consentBtn} onClick={openConsent}>Cookie-Einstellungen</button>
        </nav>
      </div>
      <div className={styles.bottom}>{copyright}</div>
    </footer>
  );
}
