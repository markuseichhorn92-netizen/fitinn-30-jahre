"use client";
// Aus Prototyp C (outbox/website-neu/prototyp-c/components/Trail.tsx) übernommen, unverändert bis auf diesen Hinweis.
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/* Leuchtspur (roter Faden) wie im Muskel-Video.
   Desktop: Punkte mit data-trail="n", Mobil: data-tm="n" (Reihenfolge n).
   data-mode / data-mode-m="elbow": erst senkrecht, dann waagerecht; data-break / data-break-m: neue Teilstrecke.
   Die Spur zeichnet sich beim Scrollen mit (Spitze bei ca. 62 % Bildschirmhöhe) bis zum letzten Button.
   Erreichte Punkte bekommen .erreicht. prefers-reduced-motion: ganze Spur sofort, ohne Spitze.

   Flüssig (29.10.): Die Spitze ist ein eigenes HTML-Element auf eigener GPU-Ebene und wird nur per
   transform/opacity bewegt (kein Neuzeichnen der Spur). Position zwischen dicht vorberechneten Punkten
   interpoliert, Glättung zeitbasiert (gleich schnell bei 60 und 120 Hz). Am Ende einer Teilstrecke
   blendet die Spitze aus, statt stehen zu bleiben und dann zu springen. Jede Teilstrecke ist ein eigener
   Pfad – neu gemalt wird nur die, an der die Spitze gerade zeichnet. */
type Probe = { l: number; x: number; y: number; s: number };
type Teil = { a: number; e: number; pfade: SVGPathElement[]; zuletzt: number };

export default function Trail() {
  const pfad = usePathname();
  useEffect(() => {
    const ruhig = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let proben: Probe[] = [];
    let maxY: number[] = [];
    let teile: Teil[] = [];
    let marken: { el: HTMLElement; l: number; an: boolean }[] = [];
    let L = 0, ist = 0, tempo = 0, raf = 0, aktiv = false, breite = 0, hoehe = 0, tAlt = 0;
    let kopf: HTMLDivElement | null = null;
    let kx = -1, ky = -1, ko = -1;

    function draw() {
      document.getElementById("trail")?.remove();
      document.getElementById("trail-kopf")?.remove();
      kopf = null;
      breite = document.documentElement.clientWidth; hoehe = document.documentElement.scrollHeight;
      const mob = matchMedia("(max-width:760px)").matches;
      const key = mob ? "tm" : "trail", mk = mob ? "modeM" : "mode", bk = mob ? "breakM" : "break";
      const els = Array.from(document.querySelectorAll<HTMLElement>(mob ? "[data-tm]" : "[data-trail]"))
        .filter((el) => el.offsetParent !== null);
      els.sort((a, b) => parseFloat(a.dataset[key]!) - parseFloat(b.dataset[key]!));
      const pts = els.map((el) => {
        const r = el.getBoundingClientRect();
        // noch nicht eingeblendete Karten sitzen 24 px tiefer (siehe [data-r=auf] in globals.css)
        const v = el.closest<HTMLElement>("[data-r=auf]:not(.da)") ? 24 : 0;
        return { el, x: r.left + scrollX + r.width / 2, y: r.top + scrollY + r.height / 2 - v, m: el.dataset[mk] || "", b: bk in el.dataset };
      });
      if (pts.length < 2) return;

      // Kurven selbst ausrechnen, dicht abgetastet (ca. alle 3 px) – getrennt nach Teilstrecken
      proben = [];
      const ds: string[] = [];
      const grenzen: { a: number; e: number }[] = [];
      let acc = 0, lx = 0, ly = 0, s = -1;
      pts.forEach((q, i) => {
        const p = pts[i - 1];
        if (!p || q.b) {
          if (s >= 0) grenzen[s].e = acc;
          s++; ds.push(`M${q.x} ${q.y}`); grenzen.push({ a: acc, e: acc });
          lx = q.x; ly = q.y; proben.push({ l: acc, x: q.x, y: q.y, s });
          return;
        }
        const dy = q.y - p.y;
        const c = q.m === "elbow"
          ? [p.x, p.y + dy * 0.85, q.x + (p.x - q.x) * 0.6, q.y]
          : [p.x, p.y + dy * 0.55, q.x, q.y - dy * 0.55];
        ds[s] += ` C${c[0]} ${c[1]} ${c[2]} ${c[3]} ${q.x} ${q.y}`;
        const grob = Math.hypot(c[0] - p.x, c[1] - p.y) + Math.hypot(c[2] - c[0], c[3] - c[1]) + Math.hypot(q.x - c[2], q.y - c[3]);
        const n = Math.max(12, Math.ceil(grob / 3));
        for (let k = 1; k <= n; k++) {
          const t = k / n, u = 1 - t;
          const x = u * u * u * p.x + 3 * u * u * t * c[0] + 3 * u * t * t * c[2] + t * t * t * q.x;
          const y = u * u * u * p.y + 3 * u * u * t * c[1] + 3 * u * t * t * c[3] + t * t * t * q.y;
          acc += Math.hypot(x - lx, y - ly); lx = x; ly = y;
          proben.push({ l: acc, x, y, s });
        }
      });
      grenzen[s].e = acc;
      L = acc;
      // laufendes Maximum der Höhe → Ziel per Binärsuche statt Schleife über alle Punkte
      maxY = []; let m = -Infinity;
      for (const q of proben) { m = Math.max(m, q.y); maxY.push(m); }

      const H = hoehe, W = breite;
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.id = "trail"; svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("width", String(W)); svg.setAttribute("height", String(H)); svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      // Glanz ohne Blur-Filter – ein Filter würde beim Mitzeichnen jedes Bild neu gerechnet
      svg.innerHTML = `<defs><linearGradient id="tg" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="${H}">` +
        `<stop offset="0" class="s1"/><stop offset=".3" class="s2"/><stop offset=".65" class="s1"/><stop offset="1" class="s3"/></linearGradient></defs>` +
        ds.map((d) => `<g><path d="${d}" fill="none" stroke="url(#tg)" stroke-width="10" stroke-linecap="round" opacity=".18"/>` +
          `<path d="${d}" fill="none" stroke="url(#tg)" stroke-width="2.8" stroke-linecap="round"/>` +
          `<path d="${d}" fill="none" stroke="#fff" stroke-width="1" opacity=".75"/></g>`).join("");
      document.body.prepend(svg);
      teile = Array.from(svg.querySelectorAll("g")).map((g, i) => ({ a: grenzen[i].a, e: grenzen[i].e, pfade: Array.from(g.querySelectorAll("path")), zuletzt: -1 }));

      if (ruhig) { pts.forEach((p) => p.el.classList.add("erreicht")); return; }

      kopf = document.createElement("div");
      kopf.id = "trail-kopf"; kopf.setAttribute("aria-hidden", "true");
      document.body.prepend(kopf);
      kx = ky = ko = -1;

      marken = pts.map((p) => {
        let best = 0, bd = Infinity;
        for (const q of proben) { const dd = (q.x - p.x) ** 2 + (q.y - p.y) ** 2; if (dd < bd) { bd = dd; best = q.l; } }
        return { el: p.el, l: best, an: p.el.classList.contains("erreicht") };
      });
      // Strich etwas länger als die Teilstrecke, damit am Ende sicher alles gezeichnet ist
      teile.forEach((t) => { const n = t.e - t.a + 4; t.pfade.forEach((p) => { p.style.strokeDasharray = `${n} ${n + 40}`; }); });
      ist = Math.min(ist, L);
      setze(ist);
      los();
    }

    // Ziel: Spur reicht bis zur Höhe 62 % des Bildschirms; am Seitenende ganz
    function ziel() {
      if (scrollY + innerHeight >= document.documentElement.scrollHeight - 4) return L;
      const y = scrollY + innerHeight * 0.62;
      // erster Punkt, dessen Höhe (laufendes Maximum) unter der Linie liegt → davor endet die Spur
      let lo = 0, hi = maxY.length;
      while (lo < hi) { const m = (lo + hi) >> 1; if (maxY[m] > y) hi = m; else lo = m + 1; }
      if (lo === 0) return 0;
      const a = proben[lo - 1], b = proben[lo];
      // innerhalb eines Kurvenstücks stufenlos bis genau zur Linie
      if (b && b.s === a.s && b.y > a.y) return a.l + (b.l - a.l) * Math.min(1, (y - a.y) / (b.y - a.y));
      return a.l;
    }
    function setze(l: number) {
      // nur die Teilstrecke neu malen, deren Zeichenstand sich ändert
      for (const t of teile) {
        const n = t.e - t.a + 4;
        const off = Math.round((n - Math.max(0, Math.min(n, l - t.a))) * 2) / 2;
        if (off !== t.zuletzt) { t.zuletzt = off; const v = String(off); t.pfade.forEach((p) => { p.style.strokeDashoffset = v; }); }
      }
      if (kopf && proben.length) {
        let lo = 0, hi = proben.length - 1;
        while (lo < hi) { const m = (lo + hi) >> 1; if (proben[m].l < l) lo = m + 1; else hi = m; }
        const b = proben[lo], a = proben[lo - 1] || b;
        let x = b.x, y = b.y, s = b.s;
        if (a.s === b.s && b.l > a.l) { const f = Math.max(0, Math.min(1, (l - a.l) / (b.l - a.l))); x = a.x + (b.x - a.x) * f; y = a.y + (b.y - a.y) * f; }
        else s = a.s;
        // an Anfang/Ende einer Teilstrecke weich ein-/ausblenden (kein Stehenbleiben, kein Sprung)
        const t = teile[s];
        const o = t ? Math.max(0, Math.min(1, (l - t.a) / 28, (t.e - l) / 28)) : 0;
        const rx = Math.round(x * 4) / 4, ry = Math.round(y * 4) / 4, ro = Math.round(o * 50) / 50;
        if (rx !== kx || ry !== ky) { kx = rx; ky = ry; kopf.style.transform = `translate3d(${rx}px,${ry}px,0)`; }
        if (ro !== ko) { ko = ro; kopf.style.opacity = String(ro); }
      }
      for (const m of marken) {
        const an = l >= m.l - 6;
        if (an !== m.an) { m.an = an; m.el.classList.toggle("erreicht", an); }
      }
    }
    // weich nachziehen: kritisch gedämpfte Feder (Geschwindigkeit ändert sich stetig → kein Anrucken,
    // kein Überschwingen), zeitbasiert in kleinen Teilschritten – gleich bei 60 und 120 Hz
    function bild(t: number) {
      let dt = Math.min(0.064, tAlt ? (t - tAlt) / 1000 : 1 / 60); tAlt = t;
      const z = ziel(), w = 10;
      while (dt > 0) {
        const h = Math.min(dt, 0.008); dt -= h;
        tempo += (w * w * (z - ist) - 2 * w * tempo) * h;
        ist += tempo * h;
      }
      if (Math.abs(z - ist) < 0.25 && Math.abs(tempo) < 2) { ist = z; tempo = 0; aktiv = false; }
      setze(Math.max(0, Math.min(L, ist)));
      if (aktiv) raf = requestAnimationFrame(bild); else tAlt = 0;
    }
    function los() { if (!aktiv && L) { aktiv = true; raf = requestAnimationFrame(bild); } }

    // erst nach dem Hero-Auftritt und im Leerlauf zeichnen; vorher keine Neuberechnungen
    let gestartet = false;
    const start = () => { if (!gestartet) { gestartet = true; draw(); } };
    const t = setTimeout(() => (typeof requestIdleCallback === "function" ? requestIdleCallback(start, { timeout: 600 }) : start()), 650);
    let r = 0;
    // iOS feuert resize beim Ein-/Ausblenden der Adressleiste → nur neu zeichnen, wenn Breite oder Seitenhöhe sich ändern
    const neu = () => {
      cancelAnimationFrame(r);
      r = requestAnimationFrame(() => {
        if (gestartet && (document.documentElement.clientWidth !== breite || Math.abs(document.documentElement.scrollHeight - hoehe) > 2)) draw();
      });
    };
    window.addEventListener("resize", neu);
    if (!ruhig) window.addEventListener("scroll", los, { passive: true });
    document.fonts?.ready.then(neu);
    window.addEventListener("load", neu);
    // Seitenhöhe kann sich ändern (FAQ aufklappen, Bilder) → Spur nachführen
    const ro = new ResizeObserver(neu);
    ro.observe(document.body);
    return () => {
      clearTimeout(t); cancelAnimationFrame(raf); cancelAnimationFrame(r); ro.disconnect();
      window.removeEventListener("resize", neu); window.removeEventListener("load", neu); window.removeEventListener("scroll", los);
      document.getElementById("trail")?.remove();
      document.getElementById("trail-kopf")?.remove();
    };
  }, [pfad]);
  return null;
}
