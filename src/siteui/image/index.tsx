import React from 'react';
import styles from './styles.module.css';

// Ersatz für die Onepage-CDN-Anbindung: Bilder liegen lokal unter /public/media.
// Gespeicherte Werte haben die Form 'media/<uuid>'; die Dateiendung steht in MEDIA.
const MEDIA: Record<string, string> = {
  '833da1bc-191f-4c62-a865-5783d332fd28': '/media/833da1bc-191f-4c62-a865-5783d332fd28.avif',
  '1266cf3a-3b28-4752-ab90-ed9fc97d5583': '/media/1266cf3a-3b28-4752-ab90-ed9fc97d5583.avif',
  '77c4274d-cac5-4f25-88b1-15387b0fa6b9': '/media/77c4274d-cac5-4f25-88b1-15387b0fa6b9.png',
};

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
}

const Image: React.FC<Props> = ({ src, alt, className }) => (
  <img src={mediaUrl(src)} alt={alt} loading="lazy" decoding="async" className={styles.image + ' ' + (className || '')} />
);

export default Image;
