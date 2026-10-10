'use client';
import NextImage from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Button from '@siteui/button';
import { funnel } from '@/lib/funnel';
import { CONSENT_EVENT } from '@/lib/consent';
import styles from './styles.module.css';

// Entschlackte Startseite (Branch entschlackt): sechs Abschnitte, ein wiederkehrender Button.
// Alle Texte stehen in src/content/16-kompakt.json; Rechtstext und AGB-Links kommen aus 03-angebot.json.
const DAY = 86400000;
const dayTs = (s: string) => { const [y, m, d] = String(s).split('-').map(Number); return new Date(y, (m || 1) - 1, d || 1).getTime(); };
const berlinToday = () => dayTs(new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()));
const fill = (tpl: string, v: Record<string, string | number>) => String(tpl).replace(/\{(\w+)\}/g, (_, k) => (k in v ? String(v[k]) : ''));
const book = (source: string) => window.dispatchEvent(new CustomEvent('fi:book', { detail: { source } }));

function BookButton({ source, label, className }: { source: string; label: string; className?: string }) {
  return <Button href="#anmeldung" size="lg" className={className} onClick={(e: React.MouseEvent) => { e.preventDefault(); book(source); }}>{label}</Button>;
}

// Sichtbarer Hinweis auf KI-Bilder (Textregel: KI-Bild-Badge)
function KiBadge({ label }: { label: string }) {
  return <span className={styles.ki}><i aria-hidden="true" />{label}</span>;
}

export function KompaktHero({ hero, kiBadge, stickyHideId }: { hero: any; kiBadge: string; stickyHideId: string }) {
  const ctaRef = useRef<HTMLDivElement>(null);
  const [stickyOn, setStickyOn] = useState(false);

  useEffect(() => { document.body.classList.add('fi-slim'); return () => document.body.classList.remove('fi-slim'); }, []);
  useEffect(() => { document.body.classList.toggle('fi-sticky-on', stickyOn); return () => document.body.classList.remove('fi-sticky-on'); }, [stickyOn]);

  // Leiste nur am Handy: erst wenn der Hero-Button aus dem Bild ist, weg beim Schluss-Abschnitt
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    let ctaVisible = true;
    let endVisible = false;
    const update = () => setStickyOn(!ctaVisible && !endVisible);
    const btn = ctaRef.current?.querySelector('a,button');
    const end = document.getElementById(stickyHideId);
    const o1 = btn ? new IntersectionObserver(([e]) => { ctaVisible = e.isIntersecting; update(); }, { threshold: 0.2 }) : null;
    const o2 = end ? new IntersectionObserver(([e]) => { endVisible = e.isIntersecting; update(); }, { threshold: 0.05 }) : null;
    if (btn && o1) o1.observe(btn);
    if (end && o2) o2.observe(end);
    return () => { o1?.disconnect(); o2?.disconnect(); };
  }, [stickyHideId]);

  // Anonym: war der Hero-Button im Bild, frei oder von Banner/Leiste verdeckt (siehe src/app/api/f/route.ts)
  useEffect(() => {
    const btn = ctaRef.current?.querySelector('a,button');
    if (!btn || !('IntersectionObserver' in window)) return;
    let visible = false;
    const covered = () => {
      const r = btn.getBoundingClientRect();
      return Array.from(document.querySelectorAll('[role="dialog"] > div')).some((el) => {
        const b = el.getBoundingClientRect();
        return b.height > 0 && getComputedStyle(el).visibility !== 'hidden' && b.top < r.bottom - 4 && b.bottom > r.top + 4 && b.left < r.right && b.right > r.left && getComputedStyle(el).opacity !== '0';
      });
    };
    const report = () => { if (visible) funnel('cta_seen', covered() ? 'covered' : 'free'); };
    const obs = new IntersectionObserver(([e]) => { visible = e.isIntersecting; setTimeout(report, 400); }, { threshold: 0.5 });
    obs.observe(btn);
    window.addEventListener(CONSENT_EVENT, report);
    return () => { obs.disconnect(); window.removeEventListener(CONSENT_EVENT, report); };
  }, []);

  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.top}>
          <NextImage className={styles.logo} src={hero.logo.src} alt={hero.logoAlt} width={1200} height={200} sizes="240px" priority />
          <a className={styles.tel} href={hero.phoneHref} aria-label={hero.phoneLabel}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>
            <span className={styles.telText}>{hero.phoneLabel}</span>
          </a>
        </div>
        <div className={styles.photo}>
          <NextImage src={hero.image.src} alt={hero.imageAlt} fill priority fetchPriority="high" quality={78} sizes="(max-width: 900px) 100vw, 560px" />
          <span className={styles.chipTop}>{hero.chip}</span>
          {hero.image.ki !== false && <KiBadge label={kiBadge} />}
        </div>
        <div className={styles.copy}>
          <h1 className={styles.h1}>{hero.headlineTop} <em>{hero.headlineAccent}</em></h1>
          <p className={styles.sub}>{hero.sub}</p>
          <div ref={ctaRef}><BookButton source="hero" label={hero.cta} className={styles.cta} /></div>
          <p className={styles.micro}>{hero.note}</p>
          <p className={styles.trust}>
            <a href={hero.trustHref} target="_blank" rel="noopener noreferrer">{hero.trustLine}</a>
            <span>{hero.trustSince}</span>
          </p>
        </div>
      </div>
      <div className={`${styles.sticky} ${stickyOn ? styles.stickyOn : ''}`} aria-hidden={!stickyOn}>
        <a className={styles.stickyBtn} href="#anmeldung" tabIndex={stickyOn ? 0 : -1} onClick={(e) => { e.preventDefault(); book('sticky'); }}>{hero.cta}</a>
      </div>
    </header>
  );
}

export function KompaktWarum({ warum, kiBadge }: { warum: any; kiBadge: string }) {
  return (
    <section className={`${styles.sec} ${styles.secSoft}`}>
      <div className={styles.wrap}>
        <h2 className={styles.h2}>{warum.headline}</h2>
        <div className={styles.warumPhoto}>
          <NextImage src={warum.image.src} alt={warum.image.alt} fill quality={78} sizes="(max-width: 700px) 100vw, 640px" />
          {warum.image.ki !== false && <KiBadge label={kiBadge} />}
        </div>
        <ul className={styles.why}>
          {warum.points.map((p: string) => <li key={p}>{p}</li>)}
        </ul>
        <details className={styles.details}>
          <summary>{warum.inclTitle}</summary>
          <p>{warum.inclText}</p>
        </details>
      </div>
    </section>
  );
}

export function KompaktAblauf({ ablauf }: { ablauf: any }) {
  return (
    <section className={styles.sec}>
      <div className={styles.wrap}>
        <h2 className={styles.h2}>{ablauf.headline}</h2>
        <ol className={styles.steps}>
          {ablauf.steps.map((s: any) => (
            <li key={s.title}><div><b>{s.title}</b><span>{s.text}</span></div></li>
          ))}
        </ol>
        <BookButton source="ablauf" label={ablauf.cta} className={styles.cta} />
      </div>
    </section>
  );
}

export function KompaktPreis({ preis, legal }: { preis: any; legal: any }) {
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => { setToday(berlinToday()); }, []);
  const startTs = dayTs(preis.promoStart);
  const untilTs = dayTs(preis.priceUntil);
  const over = today !== null && today > untilTs;
  const signupTs = Math.max(today === null ? startTs : today, startTs);
  // Tage zum Aktionspreis inkl. Abschlusstag und 31.12.; Wochen = Tage / 7 (wie im bisherigen Gesamtbetrag)
  const promoDays = Math.max(0, Math.round((untilTs - signupTs) / DAY) + 1);
  const daysLeft = Math.round((untilTs - signupTs) / DAY);
  const total = (t: any) => {
    const pw = promoDays / 7;
    return Math.round(pw * preis.promoWeekly + Math.max(0, Number(t.weeks) - pw) * Number(t.regular) + Number(preis.activation));
  };
  return (
    <section className={styles.sec}>
      <div className={styles.wrap}>
        <h2 className={styles.h2}>{preis.headline}</h2>
        <div className={styles.cards}>
          {preis.tarife.map((t: any) => (
            <div key={t.name} className={styles.card}>
              <h3>{t.name} · {t.term}</h3>
              <div className={styles.num}>{preis.promoWeekly}&nbsp;€</div>
              <small>{preis.promoLabel}</small>
              <hr />
              <div className={styles.after}>{preis.afterLabel} <b>{t.regular}&nbsp;€</b>{preis.perWeek}</div>
            </div>
          ))}
        </div>
        <p className={styles.total}>
          {preis.feeLine}{' '}
          {today !== null && !over ? fill(preis.totalText, { basic: total(preis.tarife[0]), premium: total(preis.tarife[1]) }) : null}
        </p>
        {today !== null && !over && daysLeft > 0 ? <p className={styles.count}>{fill(preis.daysText, { tage: daysLeft })}</p> : null}
        {over ? <p className={styles.count}>{preis.expiredText}</p> : null}
        <details className={styles.details}>
          <summary>{preis.legalToggle}</summary>
          <p className={styles.legal}>
            {legal.rechtstext}{' '}
            {legal.agbIntro} <a href={legal.agbHref} target="_blank" rel="noopener noreferrer">{legal.agbLabel}</a> {legal.andLabel}{' '}
            <a href={legal.houseHref} target="_blank" rel="noopener noreferrer">{legal.houseLabel}</a>.
          </p>
        </details>
      </div>
    </section>
  );
}

export function KompaktStimmen({ stimmen }: { stimmen: any }) {
  return (
    <section className={`${styles.sec} ${styles.secSoft}`}>
      <div className={styles.wrap}>
        <h2 className={styles.h2}>{stimmen.headline}</h2>
        <div className={styles.quotes} tabIndex={0} role="region" aria-label={stimmen.headline}>
          {stimmen.quotes.map((q: any) => (
            <figure key={q.author} className={styles.q}>
              <blockquote>„{q.quote}“</blockquote>
              <figcaption><span className={styles.stars} aria-label="5 von 5 Sternen">★★★★★</span> {q.author}</figcaption>
            </figure>
          ))}
        </div>
        <p className={styles.src}>{stimmen.source}</p>
      </div>
    </section>
  );
}

export function KompaktFragen({ fragen, id }: { fragen: any; id: string }) {
  return (
    <section id={id} className={styles.sec}>
      <div className={styles.wrap}>
        <h2 className={styles.h2}>{fragen.headline}</h2>
        <div className={styles.faq}>
          {fragen.items.map((f: any) => (
            <details key={f.q} className={styles.details}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
        <button type="button" className={styles.lena} onClick={() => window.dispatchEvent(new CustomEvent('finn:open'))}>{fragen.lenaLabel}</button>
        <BookButton source="schluss" label={fragen.cta} className={styles.cta} />
        <p className={styles.micro}>{fragen.note}</p>
      </div>
    </section>
  );
}
