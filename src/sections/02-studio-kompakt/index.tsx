'use client';
import React from 'react';
import Title from '@siteui/title';
import Text from '@siteui/text';
import Image from '@siteui/image';
import styles from './styles.module.css';

// Kompakt: ein echtes Studiofoto, eine Überschrift, ein bis zwei Zeilen. Texte: src/content/02-trainingsbereiche.json.
export default function StudioKompakt({ anchorId, bgColor, image, headline, intro, imageAlt, bereicheLine }: any) {
  return (
    <section id={anchorId} className={styles.sec} style={{ background: bgColor }}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {image && image.src ? (
            <div className={styles.photo}>
              <Image src={image.src} alt={imageAlt} className={styles.img} sizes="(max-width: 767px) 100vw, 55vw" />
            </div>
          ) : null}
          <div className={styles.copy}>
            <Title as="h2" size="lg">{headline}</Title>
            <Text size="lg">{intro}</Text>
            {bereicheLine ? <Text size="sm" muted>{bereicheLine}</Text> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
