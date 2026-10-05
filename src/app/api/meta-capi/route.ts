// Meta Conversions API: meldet ein erfolgreich gebuchtes Probetraining serverseitig als „Lead“.
// Läuft nur, wenn META_CAPI_ACCESS_TOKEN gesetzt ist – sonst passiert nichts (Entwurf, standardmäßig aus).
// Der Browser ruft diese Route nur nach Einwilligung „Marketing“ und erst nach erfolgreicher Magicline-Buchung auf.
// E-Mail, Telefon, Name und PLZ werden hier gehasht (SHA-256) an Meta geschickt; nichts wird gespeichert oder geloggt.
// Dieselbe event_id wie beim Browser-Pixel → Meta zählt den Lead nur einmal (Deduplizierung).
import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const GRAPH_VERSION = 'v26.0';
const DEFAULT_PIXEL_ID = '847643619850700';
const sha = (v: string) => createHash('sha256').update(v).digest('hex');
const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

// Meta verlangt Kleinbuchstaben ohne Leerzeichen; Telefon nur Ziffern mit Ländervorwahl (DE: 49).
const normEmail = (v: string) => v.toLowerCase();
const normName = (v: string) => v.toLowerCase().replace(/\s+/g, '');
function normPhone(v: string) {
  let d = v.replace(/\D/g, '');
  if (d.startsWith('00')) d = d.slice(2);
  else if (d.startsWith('0')) d = '49' + d.slice(1);
  return d.length >= 8 ? d : '';
}
const hashed = (v: string) => (v ? [sha(v)] : undefined);

export async function POST(req: Request) {
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (!token) return NextResponse.json({ ok: true, sent: false });

  let b: any;
  try { b = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }

  const eventId = str(b?.eventId, 64);
  const email = normEmail(str(b?.email, 120));
  if (!/^[\w-]{8,64}$/.test(eventId) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ ok: false }, { status: 400 });
  // Die Einwilligung „Marketing“ prüft der Browser vor dem Aufruf; ohne dieses Flag senden wir nichts.
  if (b?.consent !== true) return NextResponse.json({ ok: false, sent: false }, { status: 400 });

  // event_source_url nur von den eigenen Domains übernehmen
  let sourceUrl = '';
  try { const u = new URL(str(b?.url, 300)); if (u.hostname.endsWith('fit-inn-trier.de')) sourceUrl = u.origin + u.pathname; } catch { /* leer lassen */ }

  const fwd = req.headers.get('x-forwarded-for') || '';
  const ip = fwd.split(',')[0].trim();
  const userData: Record<string, unknown> = {
    em: hashed(email),
    ph: hashed(normPhone(str(b?.phone, 30))),
    fn: hashed(normName(str(b?.firstName, 60))),
    ln: hashed(normName(str(b?.lastName, 60))),
    zp: hashed(str(b?.zip, 5).replace(/\D/g, '')),
    country: [sha('de')],
    client_user_agent: str(req.headers.get('user-agent'), 400) || undefined,
    client_ip_address: ip || undefined,
    fbp: str(b?.fbp, 80) || undefined,
    fbc: str(b?.fbc, 120) || undefined,
  };

  const payload: Record<string, unknown> = {
    data: [{
      event_name: 'Lead',
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      action_source: 'website',
      event_source_url: sourceUrl || undefined,
      user_data: userData,
      custom_data: {
        content_name: 'Probetraining',
        source: str(b?.source, 24) || undefined,
        utm_source: str(b?.utm?.utm_source, 60) || undefined,
        utm_campaign: str(b?.utm?.utm_campaign, 80) || undefined,
        utm_content: str(b?.utm?.utm_content, 80) || undefined,
        utm_medium: str(b?.utm?.utm_medium, 60) || undefined,
      },
    }],
  };
  const testCode = process.env.META_CAPI_TEST_EVENT_CODE;
  if (testCode) payload.test_event_code = testCode; // nur zum Testen im Events-Manager setzen

  const pixelId = process.env.META_PIXEL_ID || DEFAULT_PIXEL_ID;
  try {
    const r = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
    if (!r.ok) console.error('[meta-capi] Meta antwortete mit', r.status); // ohne Antworttext (kein Token/Personenbezug im Log)
    return NextResponse.json({ ok: r.ok, sent: r.ok });
  } catch {
    console.error('[meta-capi] Aufruf fehlgeschlagen');
    return NextResponse.json({ ok: false, sent: false }, { status: 502 });
  }
}
