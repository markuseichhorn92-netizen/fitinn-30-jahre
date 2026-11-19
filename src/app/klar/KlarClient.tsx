'use client';
// Client-Teile von /klar: Buchungsknopf (sendet 'fi:book' → KonfiguratorLink öffnet /konfigurator?q=klar)
// und die feste Leiste unten (nur mobil, erst wenn der Kopf-Knopf aus dem Bild ist, nicht über dem Abschluss-Block).
import { useEffect, useState } from 'react';

export function BuchenKnopf({ quelle, label = 'Kostenloses Probetraining buchen', klein = false }: { quelle: string; label?: string; klein?: boolean }) {
  return (
    <a
      className={klein ? 'kl-btn kl-btn-klein' : 'kl-btn'}
      href="/konfigurator?q=klar"
      data-kl-quelle={quelle}
      onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('fi:book', { detail: { source: quelle } })); }}
    >
      {label}
    </a>
  );
}

export function KlarSticky({ stark, text }: { stark: string; text: string }) {
  const [an, setAn] = useState(false);
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const knopf = document.querySelector('.kl-hero .kl-btn');
    const ende = document.querySelector('.kl-schluss');
    if (!knopf) return;
    let kopfVorbei = false, endeSichtbar = false;
    const setzen = () => {
      const v = kopfVorbei && !endeSichtbar;
      setAn(v);
      document.documentElement.classList.toggle('kl-st', v);
    };
    const io = new IntersectionObserver((es) => {
      for (const e of es) {
        if (e.target === knopf) kopfVorbei = !e.isIntersecting && e.boundingClientRect.top < 0;
        else endeSichtbar = e.isIntersecting;
      }
      setzen();
    });
    io.observe(knopf);
    if (ende) io.observe(ende);
    return () => { io.disconnect(); document.documentElement.classList.remove('kl-st'); };
  }, []);
  return (
    <div className={an ? 'kl-sticky an' : 'kl-sticky'} aria-hidden={!an}>
      <div className="kl-sticky-in">
        <p><b>{stark}</b><span>{text}</span></p>
        <BuchenKnopf quelle="sticky" label="Probetraining buchen" klein />
      </div>
    </div>
  );
}
