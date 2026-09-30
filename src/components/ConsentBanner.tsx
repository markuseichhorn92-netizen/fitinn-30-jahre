'use client';
// Cookie-/Einwilligungs-Banner. "Alle akzeptieren" und "Nur notwendige" gleichwertig (DSK-Leitlinie).
// Analytics + Speed Insights werden erst nach Einwilligung geladen.
import React, { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { readConsent, saveConsent, CONSENT_EVENT, CONSENT_OPEN_EVENT } from '@/lib/consent';
import styles from './ConsentBanner.module.css';

const PRIVACY = 'https://fit-inn-trier.de/datenschutz-fit-inn-trier';
const IMPRINT = 'https://fit-inn-trier.de/impressum-fit-inn-trier';

export default function ConsentBanner() {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [stats, setStats] = useState(false);
  const [media, setMedia] = useState(false);
  const [statsOn, setStatsOn] = useState(false);

  useEffect(() => {
    const c = readConsent();
    if (c) { setStats(c.stats); setMedia(c.media); setStatsOn(c.stats); } else setOpen(true);
    const onChange = (e: any) => setStatsOn(!!(e.detail && e.detail.stats));
    const onOpen = () => { const cur = readConsent(); setStats(!!cur?.stats); setMedia(!!cur?.media); setDetails(true); setOpen(true); };
    window.addEventListener(CONSENT_EVENT, onChange);
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => { window.removeEventListener(CONSENT_EVENT, onChange); window.removeEventListener(CONSENT_OPEN_EVENT, onOpen); };
  }, []);

  const decide = (s: boolean, m: boolean) => { saveConsent(s, m); setOpen(false); setDetails(false); };

  return (
    <>
      {statsOn ? <><Analytics /><SpeedInsights /></> : null}
      {open ? (
        <div className={styles.wrap} role="dialog" aria-modal="false" aria-labelledby="fi-consent-title">
          <div className={styles.box}>
            <p id="fi-consent-title" className={styles.title}>Kurz zu Cookies 🍪</p>
            <p className={styles.text}>
              Notwendiges (Buchung, FINN-Chat) läuft immer. Anonyme Statistik, passende Tipps und Google Maps nur mit deinem Okay.{' '}
              <a href={PRIVACY} target="_blank" rel="noopener noreferrer">Datenschutz</a> · <a href={IMPRINT} target="_blank" rel="noopener noreferrer">Impressum</a>
            </p>
            {details ? (
              <div className={styles.opts}>
                <label className={styles.opt}>
                  <input type="checkbox" checked disabled />
                  <span><strong>Notwendig</strong>Buchung, FINN-Chat, deine Auswahl hier. Immer aktiv.</span>
                </label>
                <label className={styles.opt}>
                  <input type="checkbox" checked={stats} onChange={(e) => setStats(e.target.checked)} />
                  <span><strong>Statistik & passende Hinweise</strong>Vercel Analytics und Speed Insights (ohne Cookies, anonym), Auswertung der besuchten Bereiche für passende Tipps von FINN.</span>
                </label>
                <label className={styles.opt}>
                  <input type="checkbox" checked={media} onChange={(e) => setMedia(e.target.checked)} />
                  <span><strong>Externe Medien</strong>Google Maps auf der Bestätigungsseite. Dabei werden Daten an Google übertragen.</span>
                </label>
              </div>
            ) : null}
            <div className={styles.btns}>
              <button type="button" className={styles.btn} onClick={() => decide(false, false)}>Nur notwendige</button>
              <button type="button" className={styles.btn} onClick={() => decide(true, true)}>Alle akzeptieren</button>
            </div>
            {details ? (
              <button type="button" className={styles.link} onClick={() => decide(stats, media)}>Auswahl speichern</button>
            ) : (
              <button type="button" className={styles.link} onClick={() => setDetails(true)}>Einstellungen</button>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
