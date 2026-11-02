'use client';
import { useEffect } from 'react';

/* Scroll-Animationen für /freunde im Stil von Prototyp C (outbox/website-neu/prototyp-c/components/Bewegung.tsx),
   gekürzt auf das, was die Seite braucht. IntersectionObserver + CSS (nur opacity/translate/scale).
   Elemente werden erst nach dem Laden markiert (data-r) – ohne JS ist alles sofort sichtbar.
   Was beim Start schon im Bild ist, bleibt unberührt. Das Hero-Foto (LCP) wird nie animiert.
   prefers-reduced-motion: nichts wird markiert. */

const GRUPPEN = ['.fc-rows', '.fc-steps', '.fi-quick', '.fc-faq-liste'];
const BLOECKE = ['.fc-auf', '.fi-cta__form', '.fi-cta__sub', '.fi-cta__contact'];

function inSicht(el: Element) {
  const r = el.getBoundingClientRect();
  return r.top < innerHeight && r.bottom > 0;
}

// Überschrift in Wörter teilen (Text bleibt Text, Leerzeichen bleiben → Vorlesen/Umbruch gleich)
function teile(h: HTMLElement) {
  if (h.dataset.geteilt) return;
  h.dataset.geteilt = '1';
  let i = 0;
  const walker = document.createTreeWalker(h, NodeFilter.SHOW_TEXT);
  const knoten: Text[] = [];
  while (walker.nextNode()) knoten.push(walker.currentNode as Text);
  for (const t of knoten) {
    const frag = document.createDocumentFragment();
    for (const s of (t.textContent || '').split(/(\s+)/)) {
      if (!s) continue;
      if (/^\s+$/.test(s)) { frag.append(s); continue; }
      const sp = document.createElement('span');
      sp.className = 'w'; sp.textContent = s; sp.style.setProperty('--i', String(i++));
      frag.append(sp);
    }
    t.replaceWith(frag);
  }
}

export default function Bewegung() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.documentElement.classList.add('bewegt');
    const wurzel = document.querySelector<HTMLElement>('[data-theme="c"]');
    if (!wurzel) return;

    let io: IntersectionObserver | null = null;
    let nachlauf = 0;
    const timer: number[] = [];
    let fege = () => {};
    const starte = () => {
      // erst alles lesen (Positionen), dann schreiben – sonst erzwingt jede Markierung ein neues Layout
      const kand: { el: HTMLElement; art: string; i: number; gruppe?: HTMLElement }[] = [];
      wurzel.querySelectorAll<HTMLElement>('h2').forEach((h) => kand.push({ el: h, art: 'wort', i: 0 }));
      GRUPPEN.forEach((s) => wurzel.querySelectorAll<HTMLElement>(s).forEach((g) => {
        Array.from(g.children).forEach((k, i) => { if (k instanceof HTMLElement) kand.push({ el: k, art: 'auf', i: Math.min(i, 6), gruppe: g }); });
      }));
      BLOECKE.forEach((s) => wurzel.querySelectorAll<HTMLElement>(s).forEach((el) => kand.push({ el, art: 'auf', i: 0 })));
      wurzel.querySelectorAll<HTMLElement>('.fc-glas:not(.fc-glas-hero)').forEach((el) => kand.push({ el, art: 'glas', i: 0 }));
      const sicht = new Map<Element, boolean>();
      const pruefe = (el: Element) => { if (!sicht.has(el)) sicht.set(el, inSicht(el)); return sicht.get(el)!; };
      const frei = kand.filter((k) => !pruefe(k.el) && !(k.gruppe && pruefe(k.gruppe)));
      const markiert: HTMLElement[] = [];
      for (const k of frei) {
        if (k.el.dataset.r) continue;
        if (k.art === 'wort') teile(k.el);
        k.el.dataset.r = k.art; k.el.style.setProperty('--i', String(k.i)); markiert.push(k.el);
      }

      const zeige = (el: HTMLElement) => {
        if (el.classList.contains('da') || el.dataset.r === 'fertig') return;
        io?.unobserve(el);
        el.classList.add('da');
        // danach Animation lösen, damit Hover und Schweben wieder freie Bahn haben
        timer.push(window.setTimeout(() => { el.dataset.r = 'fertig'; el.classList.remove('da'); }, 2400));
      };
      io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) zeige(e.target as HTMLElement); }),
        { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
      markiert.forEach((el) => io!.observe(el));
      // Sicherheitsnetz bei sehr schnellem Scrollen/Sprung (z. B. „#anmeldung“): alles über dem Bildrand zeigen
      fege = () => {
        if (nachlauf) return;
        nachlauf = window.setTimeout(() => {
          nachlauf = 0;
          for (const el of markiert) if (!el.classList.contains('da') && el.dataset.r !== 'fertig' && el.getBoundingClientRect().top < innerHeight * 0.9) zeige(el);
        }, 180);
      };
      addEventListener('scroll', fege, { passive: true });
    };
    // Markieren im Leerlauf nach dem Hydrieren (blockiert den Start nicht)
    const idle = typeof requestIdleCallback === 'function' ? requestIdleCallback(starte, { timeout: 400 }) : (setTimeout(starte, 120) as unknown as number);
    let ruhe = 0;
    const scrollt = () => {
      if (!document.documentElement.classList.contains('scrollt')) document.documentElement.classList.add('scrollt');
      clearTimeout(ruhe);
      ruhe = window.setTimeout(() => document.documentElement.classList.remove('scrollt'), 200);
    };
    addEventListener('scroll', scrollt, { passive: true });

    return () => {
      io?.disconnect();
      if (typeof cancelIdleCallback === 'function') cancelIdleCallback(idle); else clearTimeout(idle);
      timer.forEach(clearTimeout); clearTimeout(nachlauf); clearTimeout(ruhe);
      removeEventListener('scroll', scrollt); removeEventListener('scroll', fege);
      document.documentElement.classList.remove('bewegt', 'scrollt');
    };
  }, []);
  return null;
}
