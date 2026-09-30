// Nimmt anonyme Nutzungsereignisse entgegen (Abschnitt gesehen, Hinweis gezeigt, Buchung gestartet)
// und schreibt sie ins Vercel-Log. Keine personenbezogenen Daten, keine Speicherung darüber hinaus.
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
const ALLOWED = new Set(['section_view', 'signal', 'nudge_shown', 'nudge_click', 'booking_start', 'booking_success', 'question']);

export async function POST(req: Request) {
  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  const name = String(body?.name || '');
  if (!ALLOWED.has(name)) return NextResponse.json({ ok: false }, { status: 400 });
  const data: Record<string, string> = {};
  for (const [k, v] of Object.entries(body?.data || {})) {
    if (Object.keys(data).length >= 6) break;
    data[String(k).slice(0, 24)] = String(v).slice(0, 80);
  }
  console.log('[event]', JSON.stringify({ name, ...data }));
  return NextResponse.json({ ok: true });
}
