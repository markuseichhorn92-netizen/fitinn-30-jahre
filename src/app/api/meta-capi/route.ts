// Meta Conversions API: meldet eine erfolgreich gebuchte Probetraining-Buchung serverseitig an den Pixel „Website Evelan“.
// Dieselbe event_id wie im Browser-Pixel (metaLead) → Meta zählt den Lead nur einmal (Deduplizierung).
// Standard: nur mit Marketing-Einwilligung aus dem Cookie-Banner. Ohne Einwilligung nur, wenn META_CAPI_OHNE_EINWILLIGUNG=1 (siehe BEREIT.md).
// Fehler und Timeouts stören die Buchung nie (Antwort immer 200, nichts wird gespeichert, Token/Antworten werden nicht geloggt).
import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const PIXEL_ID = process.env.META_PIXEL_ID || '847643619850700';
const GRAPH = 'https://graph.facebook.com/v26.0';
const sha = (s: string) => createHash('sha256').update(s).digest('hex');
const clean = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);

function phoneDigits(raw: string): string {
  let d = raw.replace(/[^\d+]/g, '');
  if (d.startsWith('+')) d = d.slice(1);
  else if (d.startsWith('00')) d = d.slice(2);
  else if (d.startsWith('0')) d = '49' + d.slice(1); // deutsche Nummer ohne Landesvorwahl
  return d.replace(/\D/g, '');
}

export async function POST(req: Request) {
  const done = (sent: boolean, extra: Record<string, unknown> = {}) => NextResponse.json({ ok: true, sent, ...extra });
  try {
    const token = process.env.META_CAPI_ACCESS_TOKEN;
    if (!token) return done(false);
    const text = await req.text();
    if (text.length > 4000) return done(false);
    const b = JSON.parse(text);

    const eventId = clean(b?.event_id, 64);
    if (!/^[A-Za-z0-9_-]{8,64}$/.test(eventId)) return done(false);
    const consent = b?.consent === true;
    if (!consent && process.env.META_CAPI_OHNE_EINWILLIGUNG !== '1') return done(false);

    const url = clean(b?.url, 300);
    const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim();
    const ua = req.headers.get('user-agent') || '';
    const user: Record<string, unknown> = { client_user_agent: ua };
    if (ip) user.client_ip_address = ip;

    // Personenbezogene Merkmale und Browser-Kennungen nur mit Einwilligung, gehasht (SHA-256, normalisiert).
    if (consent) {
      const c = b?.contact || {};
      const email = clean(c.email, 120).toLowerCase();
      const phone = phoneDigits(clean(c.phone, 30));
      const fn = clean(c.firstname, 60).toLowerCase();
      const ln = clean(c.lastname, 60).toLowerCase();
      const zip = clean(c.zip, 10).replace(/\s/g, '').toLowerCase();
      if (email.includes('@')) user.em = [sha(email)];
      if (phone.length >= 8) user.ph = [sha(phone)];
      if (fn) user.fn = [sha(fn)];
      if (ln) user.ln = [sha(ln)];
      if (zip) user.zp = [sha(zip)];
      user.country = [sha('de')];
      const fbp = clean(b?.fbp, 80);
      const fbc = clean(b?.fbc, 160);
      if (/^fb\.\d\.\d+\.\d+/.test(fbp)) user.fbp = fbp;
      if (/^fb\.\d\.\d+\.\S+/.test(fbc)) user.fbc = fbc;
    }

    const payload: Record<string, unknown> = {
      data: [{
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: 'website',
        ...(url.startsWith('https://') ? { event_source_url: url } : {}),
        user_data: user,
        custom_data: { content_name: 'Probetraining', source: clean(b?.source, 24) },
      }],
    };
    if (process.env.META_CAPI_TEST_EVENT_CODE) payload.test_event_code = process.env.META_CAPI_TEST_EVENT_CODE;

    const r = await fetch(`${GRAPH}/${PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(3000),
    });
    return done(r.ok, { status: r.status });
  } catch {
    return done(false); // Timeout, Netzwerk, kaputtes JSON: Buchung bleibt unberührt
  }
}
