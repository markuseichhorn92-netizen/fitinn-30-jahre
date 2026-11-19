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

// Stapel-Animation (Entwurf 19.11.2026): schaltet erst per Skript ein (ohne JS oder mit „Bewegung reduzieren“ = normales Scrollen).
// Setzt je Hülle --ku-h (Höhe → Klebe-Kante, damit hohe Abschnitte bis zum Ende lesbar bleiben) und --ku-p (0…1: wie weit die
// nächste Hülle schon darüber liegt → Verkleinern/Abdunkeln in unten.css). Ein rAF pro Scroll-Bild, keine Bibliothek.
export function KlarStapel() {
  useEffect(() => {
    const box = document.querySelector<HTMLElement>('.ku-stapel');
    if (!box || !window.matchMedia || typeof ResizeObserver === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const teile = Array.from(box.children).filter((e): e is HTMLElement => e instanceof HTMLElement && e.tagName === 'DIV');
    let raf = 0, an = false;
    const leiste = document.querySelector<HTMLElement>('.kl-sticky');
    const messen = () => {
      for (const e of teile) e.style.setProperty('--ku-h', `${e.offsetHeight}px`);
      // feste Leiste unten (nur mobil sichtbar): Hüllen kleben darüber, nicht dahinter
      const unten = leiste && getComputedStyle(leiste).display !== 'none' ? leiste.offsetHeight : 0;
      box.style.setProperty('--ku-unten', `${unten}px`);
    };
    const ro = new ResizeObserver(messen);
    const rechnen = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (let i = 0; i < teile.length - 1; i++) {
        const e = teile[i];
        if (e.classList.contains('ku-stapel-frei')) continue;
        const p = Math.min(1, Math.max(0, (vh - teile[i + 1].getBoundingClientRect().top) / vh));
        const alt = e.style.getPropertyValue('--ku-p');
        const neu = p.toFixed(3);
        if (alt !== neu) e.style.setProperty('--ku-p', neu);
      }
    };
    const beimScrollen = () => { if (!raf) raf = requestAnimationFrame(rechnen); };
    const ein = () => {
      if (an) return; an = true;
      messen(); for (const e of teile) ro.observe(e);
      if (leiste) ro.observe(leiste);
      box.classList.add('ku-stapel-an');
      window.addEventListener('scroll', beimScrollen, { passive: true });
      window.addEventListener('resize', beimScrollen);
      rechnen();
    };
    const aus = () => {
      if (!an) return; an = false;
      ro.disconnect();
      window.removeEventListener('scroll', beimScrollen);
      window.removeEventListener('resize', beimScrollen);
      if (raf) cancelAnimationFrame(raf), (raf = 0);
      box.classList.remove('ku-stapel-an');
      for (const e of teile) { e.style.removeProperty('--ku-h'); e.style.removeProperty('--ku-p'); }
      box.style.removeProperty('--ku-unten');
    };
    const pruefen = () => (mq.matches ? aus() : ein());
    pruefen();
    mq.addEventListener?.('change', pruefen);
    return () => { mq.removeEventListener?.('change', pruefen); aus(); };
  }, []);
  return null;
}
