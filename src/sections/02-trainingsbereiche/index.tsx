'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Title from '@siteui/title';
import Text from '@siteui/text';
import Badge from '@siteui/badge';
import Image from '@siteui/image';
import styles from './styles.module.css';

const ease = [0.22, 1, 0.36, 1] as any;

export default function Bereiche({ fullHeight, anchorId, bgColor, image, kicker, headline, intro, imageAlt, imageCaption, bereiche }: any) {
  return (
    <section id={anchorId} className={`${styles.sec} ${fullHeight ? styles.full : ''}`} style={{ background: bgColor }}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.sticky}>
            <Badge tone="accent" className={styles.badge}>{kicker}</Badge>
            <Title as="h2" size="xl">{headline}</Title>
            <Text size="lg" className={styles.text}>{intro}</Text>
            {image && image.src ? (
              <figure className={styles.figure}>
                <Image src={image.src} alt={imageAlt} className={styles.img} />
                <figcaption className={styles.caption}>{imageCaption}</figcaption>
              </figure>
            ) : null}
          </div>
        </div>
        <div className={styles.list}>
          {(bereiche || []).map((p: any, i: number) => (
            <motion.article
              key={i}
              className={styles.item}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease }}
            >
              <span className={styles.num} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div className={styles.body}>
                <span className={styles.tag}>{p.tag}</span>
                <Title as="h3" size="md">{p.title}</Title>
                <Text size="md" className={styles.itemText}>{p.text}</Text>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
