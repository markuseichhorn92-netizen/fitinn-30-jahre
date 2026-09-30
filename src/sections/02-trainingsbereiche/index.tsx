'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Title from '@siteui/title';
import Badge from '@siteui/badge';
import Image from '@siteui/image';
import Deco from '@siteui/deco';
import styles from './styles.module.css';


const ease = [0.22, 1, 0.36, 1] as any;

// Kompakte Anzeigen-Version: Kopf, ein Bild, vier Kacheln (Bereich + Nutzen in einer Zeile).
export default function Bereiche({ anchorId, bgColor, image, kicker, headline, imageAlt, bereiche, bgDeco }: any) {
  return (
    <section id={anchorId} className={styles.sec} style={{ background: bgColor }}>
      {bgDeco ? <Deco kind={String(bgDeco)} className={styles.bgDeco} /> : null}
      <div className={styles.container}>
        <div className={styles.head}>
          <Badge tone="accent" className={styles.badge}>{kicker}</Badge>
          <Title as="h2" size="xl">{headline}</Title>
        </div>
        <div className={styles.grid}>
          {image && image.src ? (
            <div className={styles.photo}>
              <Image src={image.src} alt={imageAlt} className={styles.img} sizes="(max-width: 767px) 100vw, 55vw" />
            </div>
          ) : null}
          <ul className={styles.tiles}>
            {(bereiche || []).map((p: any, i: number) => (
              <motion.li
                key={i}
                className={styles.tile}
                onPointerDown={() => window.dispatchEvent(new CustomEvent('fi:signal', { detail: { type: 'tile', value: p.tag } }))}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px 120px 0px' }}
                transition={{ duration: 0.45, delay: i * 0.06, ease }}
              >
                <span className={styles.num} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.tag}>{p.tag}</span>
                <strong className={styles.title}>{p.title}</strong>
                {p.text ? <span className={styles.text}>{p.text}</span> : null}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
