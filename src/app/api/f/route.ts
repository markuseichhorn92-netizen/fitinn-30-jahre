// Anonymer Trichter-Zähler: zählt je Ereignis „<schritt> <seite> <einstieg>“ pro Tag hoch.
// Keine Kennung, keine IP, keine Personendaten – nur feste Schrittnamen, Seitenpfad und Tageszähler.
// Speicher: Redis-Hash „funnel:JJJJ-MM-TT“ (Zeitzone Berlin, 400 Tage aufbewahrt), wenn KV verbunden ist.
// Zusätzlich weiter eine Zeile „[funnel] …“ im Vercel-Log. Auswertung: GET /api/f/stats (siehe dort).
//
// Schritte: view (Seite geladen) · open (Buchung geöffnet) · s_<schritt> (Formularschritt erreicht:
// slot, goal, experience, focus, name, contact, address, confirm, hint) · submit (Absenden gedrückt) ·
// ok (gebucht) · fail (Magicline-Buchung fehlgeschlagen) · whatsapp (Klick auf den WhatsApp-Link; Einstieg = Ort: fragen, footer, wizard).
import { NextResponse } from 'next/server';
import { kvEnabled, kvPipeline } from '@/lib/kv';

export const runtime = 'nodejs';
const STEPS = /^(view|open|submit|ok|fail|whatsapp|s_(slot|goal|experience|focus|name|contact|address|confirm|hint))$/;
const PAGE = /^\/[a-z0-9\-/]{0,60}$/;
const SRC = /^[a-z0-9-]{0,24}$/;
const KEEP_SECONDS = 400 * 24 * 3600;

function dayKey(d = new Date()) {
  return `funnel:${d.toLocaleDateString('sv-SE', { timeZone: 'Europe/Berlin' })}`;
}

export async function POST(req: Request) {
  let b: any;
  try { b = JSON.parse(await req.text()); } catch { return new NextResponse(null, { status: 400 }); }
  const step = String(b?.step || '');
  const page = String(b?.page || '/');
  const src = String(b?.src || '');
  if (!STEPS.test(step) || !PAGE.test(page) || !SRC.test(src)) return new NextResponse(null, { status: 400 });
  const field = `${step} ${page} ${src || '-'}`;
  console.log(`[funnel] ${field}`);
  if (kvEnabled) {
    const key = dayKey();
    try { await kvPipeline([['HINCRBY', key, field, 1], ['EXPIRE', key, KEEP_SECONDS]]); }
    catch (e) { console.log('[funnel] kv-fehler', String(e)); }
  }
  return new NextResponse(null, { status: 204 });
}
