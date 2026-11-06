import NextImage from 'next/image';
import styles from './app-block.module.css';

// App-Block für Angebotsseiten (/black-week, /freunde): Mehrwert der Mitgliedschaft, kein Preis, kein Payback.
// Texte: outbox/app-werbung/KONZEPT.md (Abschnitt 3, Blöcke 1 + 2). Screens: echte App-Bilder aus public/media/app.
type Props = {
  variant?: 'dunkel' | 'hell';
  tag: string;
  title: string;
  text: string;
  bullets?: string[];
  linkLabel: string;
  linkHref?: string;
  note?: string;
  img: { src: string; alt: string };
};

export default function AppBlock({ variant = 'hell', tag, title, text, bullets, linkLabel, linkHref = '/app', note, img }: Props) {
  return (
    <section className={`${styles.block} ${variant === 'dunkel' ? styles.dunkel : ''}`} aria-labelledby="app-block-h">
      <div className={styles.wrap}>
        <div className={styles.text}>
          <span className={styles.tag}>{tag}</span>
          <h2 id="app-block-h" className={styles.title}>{title}</h2>
          <p className={styles.lead}>{text}</p>
          {bullets?.length ? <ul className={styles.list}>{bullets.map((b) => <li key={b}>{b}</li>)}</ul> : null}
          <a className={styles.link} href={linkHref}>{linkLabel}</a>
          {note ? <p className={styles.note}>{note}</p> : null}
        </div>
        <div className={styles.phone}>
          <NextImage src={img.src} alt={img.alt} width={600} height={1200} sizes="(max-width:760px) 60vw, 280px" />
        </div>
      </div>
    </section>
  );
}
