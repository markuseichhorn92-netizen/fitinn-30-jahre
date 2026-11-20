// Anzeigen-Kennungen (Klick-IDs + UTM) aus der Einstiegsadresse – nur gelesen und in der Adresse weitergereicht, nichts gespeichert.
// Grund: Der Buchungsknopf öffnet /konfigurator als neue Seite. Ohne Weitergabe gehen gclid/fbclid verloren, wenn die
// Marketing-Einwilligung erst dort erteilt wird → Google/Meta können die Buchung keiner Anzeige zuordnen.
const PARAMS = ['gclid', 'gbraid', 'wbraid', 'fbclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

function clean(v: string | null): string {
  return (v || '').replace(/[^A-Za-z0-9_.\-]/g, '').slice(0, 200);
}

// Liefert „&gclid=…&utm_source=…“ (leer, wenn nichts da ist) zum Anhängen an eine interne Adresse.
export function klickIdsAlsQuery(search?: string): string {
  try {
    const q = new URLSearchParams(search ?? (typeof window === 'undefined' ? '' : window.location.search));
    const out = new URLSearchParams();
    for (const k of PARAMS) { const v = clean(q.get(k)); if (v) out.set(k, v); }
    const s = out.toString();
    return s ? `&${s}` : '';
  } catch { return ''; }
}

// Meta-Klick-Kennung im Format des _fbc-Cookies, falls der Pixel das Cookie noch nicht setzen konnte.
export function fbcAusUrl(search?: string): string {
  try {
    const id = clean(new URLSearchParams(search ?? window.location.search).get('fbclid'));
    return id ? `fb.1.${Date.now()}.${id}` : '';
  } catch { return ''; }
}

// Kurzer Herkunfts-Hinweis für die Buchungsnotiz in Magicline (keine Personendaten), z. B. „Herkunft: Meta-Anzeige (karussell-drin)“.
export function herkunftNotiz(search?: string): string {
  try {
    const q = new URLSearchParams(search ?? window.location.search);
    const src = clean(q.get('utm_source')).toLowerCase();
    const content = clean(q.get('utm_content')).slice(0, 30);
    let kanal = '';
    // utm_source zuerst (eindeutig gesetzt in unseren Anzeigen), dann Klick-IDs
    if (src === 'meta' || src === 'facebook' || src === 'instagram') kanal = 'Meta-Anzeige';
    else if (src === 'google') kanal = 'Google-Anzeige';
    else if (src) kanal = src;
    else if (q.get('gclid') || q.get('gbraid') || q.get('wbraid')) kanal = 'Google-Anzeige';
    else if (q.get('fbclid')) kanal = 'Meta-Anzeige';
    if (!kanal) return '';
    return `Herkunft: ${kanal}${content ? ` (${content})` : ''}`;
  } catch { return ''; }
}
