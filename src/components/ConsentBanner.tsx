'use client';
// Cookie-/Einwilligungs-Banner. "Alle akzeptieren" und "Nur notwendige" gleichwertig (DSK-Leitlinie).
// Analytics + Speed Insights und der Meta Pixel werden erst nach Einwilligung geladen.
import React, { useEffect, useRef, useState } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { readConsent, saveConsent, CONSENT_EVENT, CONSENT_OPEN_EVENT } from '@/lib/consent';
import { funnel } from '@/lib/funnel';
import styles from './ConsentBanner.module.css';

const PRIVACY = 'https://fit-inn-trier.de/datenschutz-fit-inn-trier';
const IMPRINT = 'https://fit-inn-trier.de/impressum-fit-inn-trier';

export default function ConsentBanner() {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [stats, setStats] = useState(false);
  const [media, setMedia] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [statsOn, setStatsOn] = useState(false);

  useEffect(() => {
    const c = readConsent();
    if (c) { setStats(c.stats); setMedia(c.media); setMarketing(!!c.marketing); setStatsOn(c.stats); } else { setOpen(true); funnel('consent_shown'); }
    const onChange = (e: any) => setStatsOn(!!(e.detail && e.detail.stats));
    const onOpen = () => { const cur = readConsent(); setStats(!!cur?.stats); setMedia(!!cur?.media); setMarketing(!!cur?.marketing); setDetails(true); setOpen(true); };
    window.addEventListener(CONSENT_EVENT, onChange);
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => { window.removeEventListener(CONSENT_EVENT, onChange); window.removeEventListener(CONSENT_OPEN_EVENT, onOpen); };
  }, []);

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
    saveConsent(s, m, k); setOpen(false); setDetails(false);
  };

  return (
    <>
      {statsOn ? <><Analytics /><SpeedInsights /></> : null}
      {open ? (
        <div ref={wrapRef} className={styles.wrap} role="dialog" aria-modal="false" aria-labelledby="fi-consent-title">
          <div className={`${styles.box} ${details ? styles.boxOpen : ''}`}>
            <p id="fi-consent-title" className={styles.title}>Kurz zu Cookies 🍪</p>
            <p className={styles.text}>
              <span className={details ? '' : styles.long}>Notwendiges (Buchung, Lena-Chat) läuft immer. Anonyme Statistik, passende Tipps, Maps, YouTube und die Messung unserer Meta-Anzeigen nur mit deinem Okay.{' '}</span>
              {details ? null : <span className={styles.short}>Notwendiges läuft immer. Statistik, Maps/YouTube und Meta-Messung nur mit deinem Okay.{' '}</span>}
              <a href={PRIVACY} target="_blank" rel="noopener noreferrer">Datenschutz</a>
              <span className={details ? '' : styles.long}> · <a href={IMPRINT} target="_blank" rel="noopener noreferrer">Impressum</a></span>
            </p>
            {details ? (
              <div className={styles.opts}>
                <label className={styles.opt}>
                  <input type="checkbox" checked disabled />
                  <span><strong>Notwendig</strong>Buchung, Lena-Chat, deine Auswahl hier. Immer aktiv.</span>
                </label>
                <label className={styles.opt}>
                  <input type="checkbox" checked={stats} onChange={(e) => setStats(e.target.checked)} />
                  <span><strong>Statistik & passende Hinweise</strong>Vercel Analytics und Speed Insights (ohne Cookies, anonym), Auswertung der besuchten Bereiche für passende Tipps von Lena.</span>
                </label>
                <label className={styles.opt}>
                  <input type="checkbox" checked={media} onChange={(e) => setMedia(e.target.checked)} />
                  <span><strong>Externe Medien</strong>Google Maps und das YouTube-Rundgangsvideo. Dabei werden Daten an Google übertragen.</span>
                </label>
                <label className={styles.opt}>
                  <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
                  <span><strong>Marketing</strong>Meta Pixel: misst, ob unsere Anzeigen auf Facebook und Instagram zu Probetrainings führen. Dabei werden Daten an Meta (auch in die USA) übertragen.</span>
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
        </div>
      ) : null}
    </>
  );
}
