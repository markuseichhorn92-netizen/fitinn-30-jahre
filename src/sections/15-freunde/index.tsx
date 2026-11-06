'use client';
// /freunde – Einladungsseite für „Freunde werben Freunde“ (GymApp): Hero, Vorteile, Ablauf, Hinweis für werbende Mitglieder, FAQ.
// Look seit 02.11.2026 wie Website-Entwurf Prototyp C (Eisblau, Petrol, Gold-Punkt, Glas-Icons, Leuchtspur) – Stil in
// src/app/freunde/theme-c.css. Texte unverändert aus src/content/15-freunde.json.
// Die Terminbuchung kommt aus 09-booking + 11-wizard (gleiche Magicline-Strecke wie die Startseite).
// Leuchtspur: Punkte mit data-trail (Desktop) / data-tm (Mobil), siehe src/components/freunde-c/Trail.tsx.
import NextImage from 'next/image';
import React from 'react';
import { mediaUrl } from '@siteui/image';
import AppBlock from '@/components/app-block/AppBlock';

const book = (source: string) => (e: React.MouseEvent) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('fi:book', { detail: { source } })); };

// Headline Wort für Wort (reines CSS, läuft ab dem ersten Bild). Letztes Wort in Türkis wie im Entwurf.
function Worte({ text }: { text: string }) {
  const w = String(text || '').split(' ');
  return (
    <>
      {w.map((x, i) => (
        <span key={i}>
          <span className={i === w.length - 1 ? 'w fc-em' : 'w'} style={{ '--i': i } as React.CSSProperties}>{x}</span>
          {i < w.length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  );
}

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);

export function FreundeHero(props: any) {
  const { bgImage, logoAlt, logoHref, phoneLabel, phoneHref, badge, kicker, headline, subline, primaryLabel, secondaryLabel, heroNote, pillars } = props;
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
            <span className="fc-pill fc-badge"><span className="fc-pulse" aria-hidden="true" />{badge}</span>
            <h1 id="fc-h1">
              <span className="fc-kicker">{kicker}</span>
              <span className="fc-headline"><Worte text={headline} /></span>
            </h1>
            <p className="fc-lead">{subline}</p>
            <div className="fc-ctas">
              <a className="fc-btn" href="#anmeldung" onClick={book('freunde-hero')}>
                {primaryLabel}<span className="fc-dot" aria-hidden="true" data-trail="1" data-tm="1" data-mode="elbow" />
              </a>
              <a className="fc-textlink" href="#ablauf">{secondaryLabel}</a>
            </div>
            <p className="fc-note">{heroNote}</p>
          </div>
          <div className="fc-photo">
            <img className="fc-glas fc-glas-hero" src="/media/c/glas-hantel.svg" alt="" aria-hidden="true" width={170} height={170} data-trail="2" data-tm="2" />
            {/* Hero-Foto = größtes Element beim Laden (LCP) – steht sofort, keine Animation */}
            <div className="fc-frame">
              {bgImage?.src ? <NextImage src={mediaUrl(bgImage.src)} alt="" width={1920} height={1440} priority fetchPriority="high" quality={80} sizes="(max-width:760px) 100vw, 46vw" /> : null}
            </div>
          </div>
        </div>
      </section>

      <section className="fc-pillars" aria-label="Warum Fit-Inn">
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
    </>
  );
}

export function FreundeInfo(props: any) {
  const { ablaufKicker, ablaufTitle, ablaufIntro, steps, importantTitle, importantText, membersTitle, membersText, primaryLabel, faqKicker, faqTitle, faq } = props;
  const n = (steps || []).length;
  return (
    <>
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
            <div className="fc-members fc-auf">
              <strong>{membersTitle}</strong>
              <p>{membersText}</p>
            </div>
            <div className="fc-cta fc-auf">
              <a className="fc-btn" href="#anmeldung" onClick={book('freunde-ablauf')}>
                {primaryLabel}<span className="fc-dot" aria-hidden="true" data-trail={4 + n} data-tm={4 + n} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <AppBlock
        tag="Fit-Inn App"
        title="Noch kein Mitglied? Dann schau dir die App an."
        text="Dein Freund lädt dich in der Fit-Inn App ein. So sieht sie aus: einchecken, Punkte sammeln, Prämien einlösen, Ernährungsplan nutzen."
        linkLabel="So funktioniert die App"
        img={{ src: '/media/app/iphone-3.webp', alt: 'Startseite der Fit-Inn-App mit Einchecken und Ernährungsplan' }}
      />

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
