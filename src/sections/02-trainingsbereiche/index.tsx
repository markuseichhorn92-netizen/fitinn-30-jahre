'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Title from '@siteui/title';
import Badge from '@siteui/badge';
import Image from '@siteui/image';
import styles from './styles.module.css';

const ease = [0.22, 1, 0.36, 1] as any;

// Kompakte Anzeigen-Version: Kopf, ein Bild, vier Kacheln (Bereich + Nutzen in einer Zeile).
export default function Bereiche({ anchorId, bgColor, image, kicker, headline, imageAlt, bereiche }: any) {
  return (
    <section id={anchorId} className={styles.sec} style={{ background: bgColor }}>
      <div className={styles.container}>
        <div className={styles.head}>
          <Badge tone="accent" className={styles.badge}>{kicker}</Badge>
          <Title as="h2" size="xl">{headline}</Title>
        </div>
        <div className={styles.grid}>
          {image && image.src ? (
            <div className={styles.photo}>
              <Image src={image.src} alt={imageAlt} className={styles.img} />
            </div>
          ) : null}
          <ul className={styles.tiles}>
            {(bereiche || []).map((p: any, i: number) => (
              <motion.li
                key={i}
                className={styles.tile}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease }}
              >
                <span className={styles.num} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.tag}>{p.tag}</span>
                <strong className={styles.title}>{p.title}</strong>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
