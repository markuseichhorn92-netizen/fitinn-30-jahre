import React from 'react';
import NextImage from 'next/image';
import styles from './styles.module.css';

// Ersatz für die Onepage-CDN-Anbindung: Bilder liegen lokal unter /public/media.
// Gespeicherte Werte haben die Form 'media/<uuid>'; die Dateiendung steht in MEDIA.
const MEDIA: Record<string, string> = {
  '833da1bc-191f-4c62-a865-5783d332fd28': '/media/833da1bc-191f-4c62-a865-5783d332fd28.avif',
  '1266cf3a-3b28-4752-ab90-ed9fc97d5583': '/media/1266cf3a-3b28-4752-ab90-ed9fc97d5583.avif',
  '77c4274d-cac5-4f25-88b1-15387b0fa6b9': '/media/77c4274d-cac5-4f25-88b1-15387b0fa6b9.png',
};

// Originalmaße (für Seitenverhältnis und passende Größen je Gerät)
export const MEDIA_SIZE: Record<string, [number, number]> = {
  '833da1bc-191f-4c62-a865-5783d332fd28': [1920, 1440],
  '1266cf3a-3b28-4752-ab90-ed9fc97d5583': [1920, 1440],
  '77c4274d-cac5-4f25-88b1-15387b0fa6b9': [2917, 486],
};
export function mediaSize(src: string): [number, number] {
  const id = String(src || '').replace(/^media\//, '').split('/')[0];
  return MEDIA_SIZE[id] || [1600, 1200];
}

export type ImageSize = 'preview' | 'sm' | 'md' | 'lg' | 'xl' | 'xlg' | 'sm2x' | 'md2x' | 'lg2x' | 'xlg2x' | 'full';

export function mediaUrl(src: string, _size: ImageSize = 'full'): string {
  if (!src) return '';
  if (/^https?:\/\//i.test(src) || src.startsWith('/')) return src;
  const id = src.replace(/^media\//, '').split('/')[0];
  return MEDIA[id] || src;
}

interface Props {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

// Liefert je Gerät eine passend verkleinerte Version (AVIF/WebP) statt immer das 1920px-Original
const Image: React.FC<Props> = ({ src, alt, className, sizes, priority }) => {
  const [w, h] = mediaSize(src);
  return (
    <NextImage
      src={mediaUrl(src)}
      alt={alt}
      width={w}
      height={h}
      quality={85}
      sizes={sizes || '(max-width: 767px) 100vw, 50vw'}
      priority={priority}
      className={styles.image + ' ' + (className || '')}
    />
  );
};

export default Image;
