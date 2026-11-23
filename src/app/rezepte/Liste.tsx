'use client';
// Rezeptliste mit Filter-Chips. Ohne JavaScript sind alle Rezepte sichtbar; der Filter steht in der Adresse (?f=), damit „Zurück“ ihn behält.
import Link from 'next/link';
import { useEffect, useState } from 'react';
import s from './rezepte.module.css';
import { FILTER, KAT, passt, REZEPTE, bildSet, bildUrl, zeitText, type Rezept } from './daten';
import { KiPlakette } from './KiPlakette';

function Karte({ r }: { r: Rezept }) {
  return (
    <li>
      <Link className={s.karte} href={`/rezepte/${r.slug}`}>
        {r.bild ? (
          <span className={s.karteBild}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={bildUrl(r.bild.url, 800)} srcSet={bildSet(r.bild.url)} sizes="(min-width: 760px) 320px, 100vw" alt={r.bild.alt} width={1200} height={806} loading="lazy" decoding="async" />
            {r.bild.ki ? <KiPlakette klein /> : null}
          </span>
        ) : null}
        <span className={s.karteTxt}>
          <span className={s.karteTags}>{r.kat.slice(0, 2).map((k) => <span key={k}>{KAT[k]}</span>)}</span>
          <b>{r.titel}</b>
          <span className={s.karteMeta}>{zeitText(r)} · {r.naehr.kcal} kcal · {r.naehr.eiweiss} g Eiweiß</span>
        </span>
      </Link>
    </li>
  );
}

export default function Liste() {
  const [f, setF] = useState('alle');
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('f');
    if (q && FILTER.some((x) => x.id === q)) setF(q);
  }, []);
  function waehle(id: string) {
    setF(id);
    const u = new URL(window.location.href);
    if (id === 'alle') u.searchParams.delete('f'); else u.searchParams.set('f', id);
    window.history.replaceState(null, '', u);
  }
  const liste = REZEPTE.filter((r) => passt(r, f));
  return (
    <section className={s.sec} aria-labelledby="liste">
      <h2 className={s.vh} id="liste">Rezepte</h2>
      <div className={s.chips} role="group" aria-label="Rezepte filtern">
        {FILTER.map((x) => (
          <button key={x.id} type="button" className={s.chip} aria-pressed={f === x.id} onClick={() => waehle(x.id)}>
            {x.titel} <small>{REZEPTE.filter((r) => passt(r, x.id)).length}</small>
          </button>
        ))}
      </div>
      <p className={s.anzahl} aria-live="polite">{liste.length} {liste.length === 1 ? 'Rezept' : 'Rezepte'}</p>
      <ul className={s.grid}>{liste.map((r) => <Karte key={r.slug} r={r} />)}</ul>
    </section>
  );
}
