import NextImage from 'next/image';
import s from './rezepte.module.css';
import Rahmen from './Rahmen';
import Liste from './Liste';
import { meta, REZEPTE, TIPPS } from './daten';

// /rezepte – Übersicht hinter den Terminal-QR-Codes (A-0085). Nur per QR erreichbar: nirgends verlinkt, noindex.
export const metadata = meta('Rezepte zum Nachkochen – Fit-Inn Trier', 'Einfache Rezepte mit Nährwerten zum Nachkochen – vom Infoterminal im Fit-Inn aufs Handy.', '/rezepte');
export { viewport } from './Rahmen';

export default function Page() {
  return (
    <Rahmen>
      <header className={s.hero}>
        <NextImage className={s.logo} src="/media/77c4274d-cac5-4f25-88b1-15387b0fa6b9.png" alt="Fit-Inn Trier" width={2917} height={486} sizes="140px" priority />
        <span className={s.badge}>Vom Terminal aufs Handy</span>
        <h1 className={s.h1}>Rezepte zum <em>Nachkochen</em></h1>
        <p className={s.lead}>{REZEPTE.length} einfache Gerichte mit Zutaten, Schritten und Nährwerten pro Portion. Such dir eins aus.</p>
      </header>
      <Liste />
      <section className={s.sec} aria-labelledby="tipps">
        <div className={s.kick}>Kurz &amp; alltagstauglich</div>
        <h2 className={s.h2} id="tipps">Ernährungs-Tipps</h2>
        <div className={s.tipps}>
          {TIPPS.map((t) => (
            <details key={t.titel} className={s.tipp}>
              <summary>{t.titel}</summary>
              <p>{t.text}</p>
            </details>
          ))}
        </div>
      </section>
    </Rahmen>
  );
}
