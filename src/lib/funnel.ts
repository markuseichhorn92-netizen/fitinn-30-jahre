// Anonymer Trichter-Zähler (ohne Einwilligung gedacht – vor Livegang mit Datenschutz abstimmen):
// nur Schrittname + Seitenpfad + Einstieg (z. B. „hero"). Keine Kennung, nichts im Browser gespeichert,
// kein Cookie, keine Personendaten. Jeder Schritt zählt je Seitenaufruf höchstens einmal.
// Auswertung: Vercel-Logs nach „[funnel]" (siehe src/app/api/f/route.ts).
const sent = new Set<string>();

export function funnel(step: string, src = '') {
  if (typeof window === 'undefined') return;
  const key = `${step}|${src}`;
  if (sent.has(key)) return;
  sent.add(key);
  try {
    const body = JSON.stringify({ step, page: window.location.pathname, src: String(src).toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 24) });
    if (navigator.sendBeacon) navigator.sendBeacon('/api/f', new Blob([body], { type: 'application/json' }));
    else fetch('/api/f', { method: 'POST', headers: { 'content-type': 'application/json' }, body, keepalive: true }).catch(() => {});
  } catch { /* egal */ }
}

// Formular erneut geöffnet: Schritte dürfen wieder gezählt werden (ein Durchgang = eine Zählung je Schritt).
export function funnelReset() {
  for (const k of Array.from(sent)) if (!k.startsWith('view|')) sent.delete(k);
}
