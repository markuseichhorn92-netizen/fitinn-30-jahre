'use client';
// Cookie-/Einwilligungs-Banner. "Alle akzeptieren" und "Nur notwendige" gleichwertig (DSK-Leitlinie).
// Analytics + Speed Insights und der Meta Pixel werden erst nach Einwilligung geladen.
// passive (Seiten ohne Banner: /start, /app, /rezepte): öffnet sich nie von selbst, nur über „Cookie-Einstellungen“ (Widerruf überall möglich).
// Texte geändert? BANNER_VERSION in src/lib/consent.ts hochsetzen (steht im Nachweis).
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { readConsent, saveConsent, enforceNoTracking, CONSENT_EVENT, CONSENT_OPEN_EVENT } from '@/lib/consent';
import { funnel } from '@/lib/funnel';
import styles from './ConsentBanner.module.css';

const PRIVACY = 'https://fit-inn-trier.de/datenschutz-fit-inn-trier';
const IMPRINT = 'https://fit-inn-trier.de/impressum-fit-inn-trier';

export default function ConsentBanner({ passive = false }: { passive?: boolean }) {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [stats, setStats] = useState(false);
  const [media, setMedia] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [statsOn, setStatsOn] = useState(false);

  useEffect(() => {
    const c = readConsent();
    enforceNoTracking();
    if (c) { setStats(c.stats); setMedia(c.media); setMarketing(!!c.marketing); setStatsOn(c.stats && !passive); } else if (!passive) { setOpen(true); funnel('consent_shown'); }
    const onChange = (e: any) => setStatsOn(!passive && !!(e.detail && e.detail.stats));
    const onOpen = () => { const cur = readConsent(); setStats(!!cur?.stats); setMedia(!!cur?.media); setMarketing(!!cur?.marketing); setDetails(true); setOpen(true); };
    window.addEventListener(CONSENT_EVENT, onChange);
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => { window.removeEventListener(CONSENT_EVENT, onChange); window.removeEventListener(CONSENT_OPEN_EVENT, onOpen); };
  }, [passive]);

  // Solange der Banner offen ist: Chat-Pille, Begrüßungsblase und feste Buchungsleisten ausblenden (lagen mit höherem z-index darüber),
  // In-App-Browser (Facebook/Instagram) erkennen → Banner höher, weg von der Werkzeugleiste unten.
  const [iab, setIab] = useState(false);
  useEffect(() => { setIab(/FBAN|FBAV|FB_IAB|FBIOS|Instagram/i.test(navigator.userAgent || '')); }, []);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('fi-consent-open', open);
    return () => root.classList.remove('fi-consent-open');
  }, [open]);
  // Sichtbarer Bereich kleiner als das Layout (Werkzeugleiste/Tastatur legt sich darüber): Abstand nach unten nachziehen
  useEffect(() => {
    const vv = window.visualViewport;
    const root = document.documentElement;
    if (!open || !vv) return;
    const set = () => root.style.setProperty('--fi-consent-vv', `${Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop))}px`);
    set();
    vv.addEventListener('resize', set); vv.addEventListener('scroll', set);
    return () => { vv.removeEventListener('resize', set); vv.removeEventListener('scroll', set); root.style.removeProperty('--fi-consent-vv'); };
  }, [open]);

  // Höhe des kompakten Banners (Handy) für die Sticky-Leiste: --fi-consent-h; im Einstellungs-Modus 0 (Leiste liegt dann dahinter)
  const wrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = document.documentElement;
    const el = wrapRef.current;
    if (!open || details || !el) { root.style.removeProperty('--fi-consent-h'); return; }
    const set = () => root.style.setProperty('--fi-consent-h', `${el.offsetHeight}px`);
    set();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(set) : null;
    ro?.observe(el);
    return () => { ro?.disconnect(); root.style.removeProperty('--fi-consent-h'); };
  }, [open, details]);

  // Messung (anonym, ohne Kennung): all = ein Klick auf „Akzeptieren“/„Nur notwendige“, custom = Auswahl in den Einstellungen
  const decide = (s: boolean, m: boolean, k: boolean, how: 'all' | 'custom') => {
    funnel(s || m || k ? 'consent_accept' : 'consent_necessary', how);
    saveConsent(s, m, k, how); setOpen(false); setDetails(false);
  };

  return (
    <>
      {statsOn ? <><Analytics /><SpeedInsights /></> : null}
      {open ? createPortal(
        <div ref={wrapRef} className={`${styles.wrap} ${iab ? styles.iab : ''}`} role="dialog" aria-modal="false" aria-labelledby="fi-consent-title">
          <div className={`${styles.box} ${details ? styles.boxOpen : ''}`}>
            <p id="fi-consent-title" className={styles.title}>Kurz zu Cookies 🍪</p>
            <p className={styles.text}>
              <span className={details ? '' : styles.long}>Notwendiges (Buchung, deine Auswahl hier) läuft immer. Anonyme Statistik, passende Tipps, Maps, YouTube und die Messung unserer Anzeigen (Meta, Google) nur mit deinem Okay. Ändern oder widerrufen kannst du das jederzeit unten auf jeder Seite unter „Cookie-Einstellungen“.{' '}</span>
              {details ? null : <span className={styles.short}>Notwendiges läuft immer. Statistik, Maps/YouTube und Anzeigen-Messung (Meta, Google) nur mit deinem Okay, jederzeit widerrufbar.{' '}</span>}
              <a href={PRIVACY} target="_blank" rel="noopener noreferrer">Datenschutz</a>
              {' · '}<a href={IMPRINT} target="_blank" rel="noopener noreferrer">Impressum</a>
            </p>
            {details ? (
              <div className={styles.opts}>
                <label className={styles.opt}>
                  <input type="checkbox" checked disabled />
                  <span><strong>Notwendig</strong>Buchung und deine Auswahl hier (Cookie fi_consent, 12 Monate). Der Lena-Chat (Magicline/Sportalliance) lädt erst, wenn du ihn antippst, und setzt dann ein Sicherheits-Cookie gegen Bots (aws-waf-token, ca. 4 Tage). Immer aktiv.</span>
                </label>
                <label className={styles.opt}>
                  <input type="checkbox" checked={stats} onChange={(e) => setStats(e.target.checked)} />
                  <span><strong>Statistik & passende Hinweise</strong>Vercel Analytics und Speed Insights (ohne Cookies, anonym), Auswertung der besuchten Bereiche für passende Tipps von Lena. Empfänger: Vercel Inc. (USA).</span>
                </label>
                <label className={styles.opt}>
                  <input type="checkbox" checked={media} onChange={(e) => setMedia(e.target.checked)} />
                  <span><strong>Externe Medien</strong>Google Maps und das YouTube-Rundgangsvideo. Dabei werden Daten an Google (Google Ireland, auch in die USA) übertragen.</span>
                </label>
                <label className={styles.opt}>
                  <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
                  <span><strong>Marketing</strong>Meta Pixel und Google-Tag (Google Analytics/Ads): messen, ob unsere Anzeigen auf Facebook, Instagram und Google zu Probetrainings führen. Empfänger: Meta Platforms Ireland und Google Ireland, auch in die USA. Cookies: _fbp und _gcl_au (90 Tage), _ga (bis 2 Jahre).</span>
                </label>
              </div>
            ) : null}
            <div className={styles.btns}>
              <button type="button" className={styles.btn} onClick={() => decide(false, false, false, 'all')}>Nur notwendige</button>
              <button type="button" className={styles.btn} onClick={() => decide(true, true, true, 'all')}><span className={styles.long}>Alle akzeptieren</span><span className={styles.short}>Akzeptieren</span></button>
              {details ? (
                <button type="button" className={styles.link} onClick={() => decide(stats, media, marketing, 'custom')}>Auswahl speichern</button>
              ) : (
                <button type="button" className={styles.link} onClick={() => setDetails(true)}>Einstellungen</button>
              )}
            </div>
          </div>
        </div>,
        document.body,
      ) : null}
    </>
  );
}
