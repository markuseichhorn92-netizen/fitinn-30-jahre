import Link from 'next/link';
import { notFound } from 'next/navigation';
import s from '../rezepte.module.css';
import Rahmen from '../Rahmen';
import { KiPlakette } from '../KiPlakette';
import { KAT, meta, portText, REZEPTE, bildSet, bildUrl, zeitText } from '../daten';

// /rezepte/<slug> – Steckbrief nach dem QR-Scan am Terminal (A-0085). Statisch gebaut, unbekannte Adressen = 404.
export const dynamicParams = false;
export function generateStaticParams() {
  return REZEPTE.map((r) => ({ slug: r.slug }));
}
export { viewport } from '../Rahmen';

function Sym({ d }: { d: string }) {
  return <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>;
}

type P = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: P) {
  const { slug } = await params;
  const r = REZEPTE.find((x) => x.slug === slug);
  if (!r) return {};
  return meta(`${r.titel} – Rezept | Fit-Inn Trier`, `${r.kurz} ${r.naehr.kcal} kcal und ${r.naehr.eiweiss} g Eiweiß pro Portion (ca.).`, `/rezepte/${r.slug}`);
}

export default async function Page({ params }: P) {
  const { slug } = await params;
  const r = REZEPTE.find((x) => x.slug === slug);
  if (!r) notFound();
  const n = r.naehr;
  const weitere = REZEPTE.filter((x) => x.slug !== r.slug && x.kat.some((k) => k === r.kat[0])).slice(0, 3);
  return (
    <Rahmen>
      <nav className={s.zurueck}><Link href="/rezepte">‹ Alle Rezepte</Link></nav>
      <article className={s.rezept}>
        {r.bild ? (
          <div className={s.bild}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={bildUrl(r.bild.url, 1200)} srcSet={bildSet(r.bild.url)} sizes="(min-width: 760px) 720px, 100vw" alt={r.bild.alt} width={1200} height={806} fetchPriority="high" />
            {r.bild.ki ? <KiPlakette /> : null}
          </div>
        ) : null}
        <div className={s.rezeptKopf}>
          <div className={s.karteTags}>{r.kat.map((k) => <span key={k}>{KAT[k]}</span>)}</div>
          <h1 className={s.titel}>{r.titel}</h1>
          <p className={s.kurz}>{r.kurz}</p>
          <ul className={s.meta}>
            <li><Sym d="M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />{zeitText(r)}</li>
            <li><Sym d="M3 13h18M5 13a7 7 0 0 0 14 0M12 6v2" />{portText(r)}</li>
            {r.veg ? <li className={s.veg}><Sym d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14Zm0 0 8-8" />{r.veg === 'vegan' ? 'Vegan' : 'Vegetarisch'}</li> : null}
          </ul>
        </div>

        <section className={s.box} aria-labelledby="naehr">
          <h2 className={s.h3} id="naehr">Nährwerte pro Portion <small>(ca.)</small></h2>
          <dl className={s.naehr}>
            <div><dt>Energie</dt><dd>{n.kcal}<small> kcal</small></dd></div>
            <div className={s.ew}><dt>Eiweiß</dt><dd>{n.eiweiss}<small> g</small></dd></div>
            <div><dt>Kohlenhydrate</dt><dd>{n.kh}<small> g</small></dd></div>
            <div><dt>Fett</dt><dd>{n.fett}<small> g</small></dd></div>
          </dl>
        </section>

        <section className={s.box} aria-labelledby="zutaten">
          <h2 className={s.h3} id="zutaten">Zutaten <small>für {portText(r)}</small></h2>
          <ul className={s.zutaten}>
            {r.zutaten.map((z) => <li key={z}><label><input type="checkbox" /> <span>{z}</span></label></li>)}
          </ul>
          <p className={s.klein}>Tipp: Zum Einkaufen einfach abhaken.</p>
        </section>

        <section className={s.box} aria-labelledby="schritte">
          <h2 className={s.h3} id="schritte">Zubereitung</h2>
          <ol className={s.schritte}>{r.schritte.map((x, i) => <li key={i}>{x}</li>)}</ol>
          {r.tipp ? <p className={s.tippBox}><b>Tipp:</b> {r.tipp}</p> : null}
        </section>
      </article>

      {weitere.length ? (
        <section className={s.sec} aria-labelledby="weitere">
          <h2 className={s.h2} id="weitere">Mehr {KAT[r.kat[0]]}</h2>
          <ul className={s.weitere}>
            {weitere.map((w) => (
              <li key={w.slug}><Link href={`/rezepte/${w.slug}`}><b>{w.titel}</b><span>{zeitText(w)} · {w.naehr.kcal} kcal</span></Link></li>
            ))}
          </ul>
          <Link className={`${s.btn} ${s.btnHell}`} href="/rezepte">Alle Rezepte ansehen</Link>
        </section>
      ) : null}
    </Rahmen>
  );
}
