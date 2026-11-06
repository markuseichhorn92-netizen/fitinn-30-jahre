'use client';
// /black-week – Landingpage Black Week 2026 (Angebot E (Vertragsbeginn 01.01.2027, bis dahin kostenlos)). Look und Klassen wie /freunde (theme-c.css),
// Zusatz-Stile in src/app/black-week/black-week.css. Texte aus src/content/17-blackweek.json.
// Zeitsteuerung (Europe/Berlin) in src/lib/blackweek.ts: Aktion gilt ab sofort, nach 30.11. „Aktion beendet“.
import NextImage from 'next/image';
import React from 'react';
import { mediaUrl } from '@siteui/image';
import { useBwZeit } from '@/lib/blackweek';

const book = (source: string) => (e: React.MouseEvent) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('fi:book', { detail: { source } })); };

function Worte({ text }: { text: string }) {
  const w = String(text || '').split(' ');
  return (
    <>
      {w.map((x, i) => (
        <span key={i}>
          <span className={i >= w.length - 2 ? 'w fc-em' : 'w'} style={{ '--i': i } as React.CSSProperties}>{x}</span>
          {i < w.length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  );
}

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);

function Countdown({ rest, label }: { rest: number | null; label: string }) {
  const m = rest == null ? null : Math.floor(rest / 60000);
  const zahl = (n: number | null) => (n == null ? '–' : String(n));
  return (
    <div className="bw-cd-box">
      <div className="bw-cd" role="timer" aria-label={label}>
        <div><b>{zahl(m == null ? null : Math.floor(m / 1440))}</b><span>Tage</span></div>
        <div><b>{zahl(m == null ? null : Math.floor((m % 1440) / 60))}</b><span>Std</span></div>
        <div><b>{zahl(m == null ? null : m % 60)}</b><span>Min</span></div>
      </div>
      <p className="bw-cd-label">{label}</p>
    </div>
  );
}

export function BwHero(props: any) {
  const { bgImage, logoAlt, logoHref, phoneLabel, phoneHref, badge, kicker, headline, subline, primaryLabel, heroNote, countdownLabel, pillars, ende } = props;
  const z = useBwZeit();
  const phase = z?.phase ?? 'live';
  const ended = phase === 'ended';
  return (
    <>
      <header className="fc-top">
        <div className="fc-wrap fc-nav">
          <a href={logoHref} className="fc-logo">
            <NextImage src="/media/c/logo-petrol.png" alt={logoAlt} width={600} height={100} sizes="180px" priority />
          </a>
          {phoneLabel ? <a className="fc-pill fc-tel" href={phoneHref}>{phoneLabel}</a> : null}
        </div>
      </header>

      <section className="fc-hero" aria-labelledby="fc-h1">
        <div className="fc-floor" aria-hidden="true" />
        <div className="fc-wrap fc-hero-grid">
          <div className="fc-hero-text">
            <span className="fc-pill fc-badge"><span className="fc-pulse" aria-hidden="true" />{ended ? ende.badge : badge}</span>
            <h1 id="fc-h1">
              <span className="fc-kicker">{kicker}</span>
              <span className="fc-headline"><Worte text={ended ? ende.headline : headline} /></span>
            </h1>
            <p className="fc-lead">{ended ? ende.text : subline}</p>
            {ended ? (
              <div className="fc-ctas">
                <a className="fc-btn" href={ende.href}>{ende.label}<span className="fc-dot" aria-hidden="true" /></a>
              </div>
            ) : (
              <>
                <div className="fc-ctas">
                  <a className="fc-btn" href="#anmeldung" onClick={book('black-week-hero')}>
                    {primaryLabel}<span className="fc-dot" aria-hidden="true" data-trail="1" data-tm="1" data-mode="elbow" />
                  </a>
                </div>
                <p className="fc-note">{heroNote}</p>
                <Countdown rest={z ? z.rest : null} label={countdownLabel} />
              </>
            )}
          </div>
          <div className="fc-photo">
            <img className="fc-glas fc-glas-hero" src="/media/c/glas-hantel.svg" alt="" aria-hidden="true" width={170} height={170} data-trail="2" data-tm="2" />
            <div className="fc-frame">
              {bgImage?.src ? <NextImage src={mediaUrl(bgImage.src)} alt="" width={1920} height={1440} priority fetchPriority="high" quality={80} sizes="(max-width:760px) 100vw, 46vw" /> : null}
            </div>
          </div>
        </div>
      </section>

      {ended ? null : (
        <section className="fc-pillars" aria-label="Das gibt es in der Black Week">
          <div className="fc-wrap">
            <ul className="fc-rows">
              {(pillars || []).map((p: any) => (
                <li key={p.title} className="fc-row">
                  <span className="fc-ic"><Check /></span>
                  <strong>{p.title}</strong>
                  <p>{String(p.text).replace('{gratis}', z ? `${z.tage} Tage` : 'bis zu 56 Tage')}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}

// Alles zwischen Hero und Footer (Preise, Ablauf, Buchung, FAQ): nach Aktionsende ausgeblendet.
export function BwGate({ children }: { children: React.ReactNode }) {
  const z = useBwZeit();
  if (z?.phase === 'ended') return null;
  return <>{children}</>;
}

// Preisübersicht (Entwurf B): Zeitstrahl, Umschalter 104/52 Wochen, dunkle Karte, Vergleichstabelle.
// Umschalter nur mit CSS (Radio-Buttons, :checked): ohne JavaScript bedienbar, Pfeiltasten wechseln den Tarif, 104 Wochen ist Standard.
function Preise({ p, primaryLabel }: { p: any; primaryLabel: string }) {
  const tarife: any[] = p.tarife || [];
  return (
    <div className="bwp">
      <ol className="bwp-line">
        {(p.zeitstrahl || []).map((z: any) => (
          <li key={z.titel} className={z.gold ? 'bwp-st bwp-gold' : 'bwp-st'}><b>{z.titel}</b><span>{z.text}</span></li>
        ))}
      </ol>
      <div className="bwp-umschalter" role="radiogroup" aria-label={p.umschalterLabel}>
        {tarife.map((t, i) => (
          <input key={t.id} type="radio" name="bwp-tarif" id={`bwp-t${t.id}`} className="bwp-radio" defaultChecked={i === 0} />
        ))}
        <div className="bwp-seg">
          {tarife.map((t) => (
            <label key={t.id} htmlFor={`bwp-t${t.id}`}>{t.name}<small>{t.preis} {t.einheit}</small></label>
          ))}
        </div>
        <div className="bwp-panes">
          {tarife.map((t) => (
            <div key={t.id} className={`bwp-pane bwp-p${t.id}`}>
              <div className="bwp-big">
                <span className="bwp-tag">{t.tag}</span>
                <h3>{t.name}</h3>
                <div className="bwp-w"><b>{t.preis}</b><span>{t.einheit}</span></div>
                <p className="bwp-stand">{t.stand}</p>
                <div className="bwp-tot">
                  <small>{p.gesamtLabel}</small>
                  <span className="bwp-sum"><s><span className="bwp-sr">statt </span>{t.regulaer}</s>{t.gesamt}</span>
                  <div className="bwp-ex">{t.rechnung}</div>
                </div>
                <ul className="bwp-check">
                  {[...(p.leistungen || []), t.laufzeit, p.kuendigung].map((l: string) => (
                    <li key={l}><span className="bwp-hk"><Check /></span><span>{l}</span></li>
                  ))}
                </ul>
                <a className="bwp-btn" href="#anmeldung" onClick={book('black-week-preise')}>{primaryLabel}<span className="bwp-dot" aria-hidden="true" /></a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <h3 className="bwp-th">{p.tabelleTitel}</h3>
      <table className="bwp-cmp">
        <thead><tr><th scope="col"><span className="bwp-sr">Merkmal</span></th>{(p.tabelleKopf || []).map((k: string) => <th key={k} scope="col">{k}</th>)}</tr></thead>
        <tbody>
          {(p.tabelleZeilen || []).map((r: string[]) => (
            <tr key={r[0]}><th scope="row">{r[0]}</th><td>{r[1]}</td><td>{r[2]}</td></tr>
          ))}
        </tbody>
      </table>
      <p className="bw-fuss">{p.fuss}</p>
    </div>
  );
}

export function BwInfo(props: any) {
  const { preisKicker, preisTitle, preisIntro, preise, ablaufKicker, ablaufTitle, ablaufIntro, steps, importantTitle, importantText, primaryLabel, faqKicker, faqTitle, faq } = props;
  const n = (steps || []).length;
  return (
    <>
      <section className="bw-preis" aria-labelledby="bw-preis-h">
        <div className="fc-wrap">
          <div className="fc-head">
            <span className="fc-hand">{preisKicker}</span>
            <h2 id="bw-preis-h">{preisTitle}</h2>
            <p className="fc-intro">{preisIntro}</p>
          </div>
          <Preise p={preise} primaryLabel={primaryLabel} />
        </div>
      </section>

      <section id="ablauf" className="fc-ablauf">
        <div className="fc-wrap fc-ablauf-grid">
          <div className="fc-head">
            <span className="fc-hand">{ablaufKicker}</span>
            <h2>{ablaufTitle}</h2>
            <p className="fc-intro">{ablaufIntro}</p>
          </div>
          <div className="fc-body">
            <ol className="fc-steps">
              {(steps || []).map((s: any, i: number) => (
                <li key={s.strong} className="fc-step">
                  <span className="fc-n" data-trail={4 + i} data-tm={4 + i}>{String(i + 1).padStart(2, '0')}</span>
                  <strong>{s.strong}</strong>
                  <span className="fc-step-text">{s.text}</span>
                </li>
              ))}
            </ol>
            <div className="fc-important fc-auf" role="note">
              <strong>{importantTitle}</strong>
              <p>{importantText}</p>
            </div>
            <div className="fc-cta fc-auf">
              <a className="fc-btn" href="#anmeldung" onClick={book('black-week-ablauf')}>
                {primaryLabel}<span className="fc-dot" aria-hidden="true" data-trail={4 + n} data-tm={4 + n} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="fc-faq" aria-label={faqTitle}>
        <div className="fc-wrap fc-schmal">
          <span className="fc-kicker-s">{faqKicker}</span>
          <h2>{faqTitle}</h2>
          <div className="fc-faq-liste">
            {(faq || []).map((f: any) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function BwKleingedrucktes({ text }: { text: string }) {
  const z = useBwZeit();
  if (z?.phase === 'ended') return null;
  return (
    <div className="bw-klein">
      <div className="fc-wrap fc-schmal"><p>{text}</p></div>
    </div>
  );
}
