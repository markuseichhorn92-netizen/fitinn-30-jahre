'use client';
// /black-week – Landingpage Black Week 2026 (Angebot E (Vertragsbeginn 01.01.2027, bis dahin kostenlos)). Look und Klassen wie /freunde (theme-c.css),
// Zusatz-Stile in src/app/black-week/black-week.css. Texte aus src/content/17-blackweek.json.
// Zeitsteuerung (Europe/Berlin) in src/lib/blackweek.ts: Aktion gilt ab sofort, nach 30.11. „Aktion beendet“.
import NextImage from 'next/image';
import React from 'react';
import AppBlock from '@/components/app-block/AppBlock';
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

// Noch verbleibende ganze Tage bis Aktionsende (ohne Stunden-Uhr: ruhiger, kein Neuzeichnen im Halbminutentakt sichtbar).
function restTage(rest: number | null) {
  if (rest == null) return '';
  const t = Math.floor(rest / 86400000);
  return t >= 1 ? `Noch ${t} ${t === 1 ? 'Tag' : 'Tage'} · ` : 'Nur noch heute · ';
}

export function BwHero(props: any) {
  const { bgImage, logoAlt, logoHref, phoneLabel, phoneHref, badge, kicker, headline, subline, offer, primaryLabel, heroNote, trust, heroFuss, ende } = props;
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

      <section className="fc-hero bw-hero" aria-labelledby="fc-h1">
        <div className="fc-floor" aria-hidden="true" />
        <div className="fc-wrap fc-hero-grid">
          <div className="fc-hero-text">
            <span className="fc-pill fc-badge"><span className="fc-pulse" aria-hidden="true" />{ended ? ende.badge : badge}</span>
            <h1 id="fc-h1">
              <span className="fc-kicker">{kicker}</span>
              <span className="fc-headline"><Worte text={ended ? ende.headline : headline} /></span>
            </h1>
            {ended ? (
              <>
                <p className="fc-lead">{ende.text}</p>
                <div className="fc-ctas">
                  <a className="fc-btn" href={ende.href}>{ende.label}<span className="fc-dot" aria-hidden="true" /></a>
                </div>
              </>
            ) : (
              <>
                <p className="bwp-sr">{subline}</p>
                <ul className="bw-offer" aria-hidden="true">
                  {(offer || []).map((o: any) => (
                    <li key={o.wert} className={o.gold ? 'bw-offer-gold' : undefined}><b>{o.wert}</b><span>{o.text}</span></li>
                  ))}
                </ul>
                <div className="fc-ctas">
                  <a className="fc-btn" href="#anmeldung" onClick={book('black-week-hero')}>
                    {primaryLabel}<span className="fc-dot" aria-hidden="true" />
                  </a>
                </div>
                <p className="fc-note">{heroNote}</p>
                <p className="bw-trust"><b>{trust.stark}</b> · {trust.text}</p>
                <p className="bw-hero-fuss">{restTage(z ? z.rest : null)}{heroFuss}</p>
              </>
            )}
          </div>
          <div className="fc-photo">
            <img className="fc-glas fc-glas-hero" src="/media/c/glas-hantel.svg" alt="" aria-hidden="true" width={170} height={170} />
            <div className="fc-frame">
              {bgImage?.src ? <NextImage src={mediaUrl(bgImage.src)} alt="" width={1920} height={1440} priority fetchPriority="high" quality={80} sizes="(max-width:760px) 100vw, 46vw" /> : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Feste Leiste unten (nur Handy): erscheint, sobald der Kopf-Button aus dem Bild ist, und verschwindet an der Terminwahl und am Seitenende.
// Setzt html.bw-st, damit der Chat-Knopf (layout.tsx) über der Leiste sitzt (siehe black-week.css).
export function BwSticky({ stark, text, label }: { stark: string; text: string; label: string }) {
  const z = useBwZeit();
  const ended = z?.phase === 'ended';
  const [an, setAn] = React.useState(false);
  React.useEffect(() => {
    if (ended || typeof IntersectionObserver === 'undefined') { setAn(false); return; }
    const knopf = document.querySelector('.bw-hero .fc-btn');
    const enden = Array.from(document.querySelectorAll('#anmeldung, footer'));
    if (!knopf) return;
    let vorbei = false;
    const sichtbar = new Set<Element>();
    const io = new IntersectionObserver((es) => {
      for (const e of es) {
        if (e.target === knopf) vorbei = !e.isIntersecting && e.boundingClientRect.bottom < 0;
        else if (e.isIntersecting) sichtbar.add(e.target); else sichtbar.delete(e.target);
      }
      setAn(vorbei && sichtbar.size === 0);
    });
    io.observe(knopf);
    enden.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ended]);
  React.useEffect(() => {
    document.documentElement.classList.toggle('bw-st', an);
    return () => document.documentElement.classList.remove('bw-st');
  }, [an]);
  if (ended) return null;
  return (
    <div className={an ? 'bw-sticky an' : 'bw-sticky'} aria-hidden={!an}>
      <div className="bw-sticky-in">
        <p><b>{stark}</b><span>{text}</span></p>
        <a className="bw-sticky-btn" href="#anmeldung" tabIndex={an ? 0 : -1} onClick={book('black-week-sticky')}>{label}</a>
      </div>
    </div>
  );
}

// Alles zwischen Hero und Footer (Preise, Ablauf, FAQ, Buchung): nach Aktionsende ausgeblendet.
export function BwGate({ children }: { children: React.ReactNode }) {
  const z = useBwZeit();
  if (z?.phase === 'ended') return null;
  return <>{children}</>;
}

// Preisübersicht (v4): beide Tarife nebeneinander mit Wochenbeitrag, darüber die 0-€-Zeile. Gesamtpreise stehen in der Fußnote und im Kleingedruckten.
function Preise({ p, primaryLabel }: { p: any; primaryLabel: string }) {
  const tarife: any[] = p.tarife || [];
  return (
    <div className="bwp">
      <p className="bwt-null"><b>{p.nullZeile.stark}</b><span>{p.nullZeile.text}</span></p>
      <div className="bwt">
        {tarife.map((t, i) => (
          <div key={t.id} className={i === 0 ? 'bwt-k bwt-dunkel' : 'bwt-k'}>
            <span className="bwp-tag">{t.tag}</span>
            <h3>{t.name}</h3>
            <div className="bwp-w"><b>{t.preis}</b><span>{t.einheit}</span></div>
            <p className="bwp-stand">{t.stand}</p>
          </div>
        ))}
      </div>
      <div className="bwt-drin">
        <h3>{p.leistungenTitel}</h3>
        <ul className="bwp-check">
          {(p.leistungen || []).map((l: string) => (
            <li key={l}><span className="bwp-hk"><Check /></span><span>{l}</span></li>
          ))}
        </ul>
        <a className="fc-btn" href="#anmeldung" onClick={book('black-week-preise')}>{primaryLabel}<span className="fc-dot" aria-hidden="true" /></a>
        <p className="fc-note">{p.knopfNote}</p>
      </div>
      <p className="bw-fuss">{p.fuss}</p>
    </div>
  );
}

// Reihenfolge nach Kaufentscheidung: Preis → Ablauf → Vertrauen → Einwände → App. Die Terminwahl (Buchung) folgt danach in page.tsx.
export function BwInfo(props: any) {
  const { preisKicker, preisTitle, preise, ablaufKicker, ablaufTitle, ablaufIntro, steps, importantTitle, importantText, primaryLabel, pillarsTitle, pillars, faqKicker, faqTitle, einwaende, faqMehr, faq } = props;
  return (
    <>
      <section className="bw-preis" aria-labelledby="bw-preis-h">
        <div className="fc-wrap">
          <div className="fc-head">
            <span className="fc-hand">{preisKicker}</span>
            <h2 id="bw-preis-h">{preisTitle}</h2>
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
                  <span className="fc-n" aria-hidden="true">{i + 1}</span>
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
                {primaryLabel}<span className="fc-dot" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="fc-pillars" aria-label={pillarsTitle}>
        <div className="fc-wrap">
          <ul className="fc-rows">
            {(pillars || []).map((p: any) => (
              <li key={p.title} className="fc-row">
                <span className="fc-ic"><Check /></span>
                <strong>{p.title}</strong>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="fc-faq" aria-label={faqTitle}>
        <div className="fc-wrap fc-schmal">
          <span className="fc-kicker-s">{faqKicker}</span>
          <h2>{faqTitle}</h2>
          <dl className="bw-qa">
            {(einwaende || []).map((f: any) => (
              <div key={f.q}>
                <dt>{f.q}</dt>
                <dd>{f.a}</dd>
              </div>
            ))}
          </dl>
          <h3 className="bw-mehr">{faqMehr}</h3>
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

      <AppBlock
        variant="dunkel"
        tag="Dazu als Mitglied"
        title="Training, das dich belohnt."
        text="Mit deinem Vertrag bekommst du die Fit-Inn App:"
        bullets={['1 Punkt pro Check-in', 'Prämien und Partner-Gutscheine (Smilodox, Neosupps)', 'Ernährungspläne kostenlos für Mitglieder', 'Freunde werben: 50 Punkte oder 4 Wochen beitragsfrei', 'Mitgliedschaft selbst verwalten']}
        linkLabel="So sieht die App aus"
        note="Punkte und Prämien nur für Mitglieder, Prämienangebot kann sich ändern."
        img={{ src: '/media/app/iphone-2.webp', alt: 'Punkte-Seite der Fit-Inn-App mit Prämien' }}
      />
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
