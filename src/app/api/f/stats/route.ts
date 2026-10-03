// Auswertung des Trichter-Zählers: GET /api/f/stats?from=JJJJ-MM-TT&to=JJJJ-MM-TT
// Header „authorization: Bearer <FUNNEL_STATS_KEY>“ (Vercel-Variable). Ohne Schlüssel kein Zugriff.
// Antwort: { days: { "JJJJ-MM-TT": { "<schritt> <seite> <einstieg>": anzahl } }, total: { … } }
import { NextResponse } from 'next/server';
import { kvEnabled, kvPipeline } from '@/lib/kv';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const DATE = /^\d{4}-\d{2}-\d{2}$/;

export async function GET(req: Request) {
  // „UNNEL_STATS_KEY“: so wurde die Variable in Vercel angelegt (Name dort nicht mehr änderbar)
  const want = process.env.FUNNEL_STATS_KEY || process.env.UNNEL_STATS_KEY || '';
  const got = (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
  if (!want || got !== want) return new NextResponse(null, { status: 401 });
  if (!kvEnabled) return NextResponse.json({ error: 'kein KV verbunden' }, { status: 503 });

  const u = new URL(req.url);
  const today = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Berlin' });
  const to = DATE.test(u.searchParams.get('to') || '') ? u.searchParams.get('to')! : today;
  const from = DATE.test(u.searchParams.get('from') || '') ? u.searchParams.get('from')! : to;
  const dates: string[] = [];
  for (let d = new Date(`${from}T12:00:00Z`); dates.length < 400; d.setUTCDate(d.getUTCDate() + 1)) {
    const s = d.toISOString().slice(0, 10);
    if (s > to) break;
    dates.push(s);
  }
  const res = (await kvPipeline(dates.map((d) => ['HGETALL', `funnel:${d}`]))) || [];
  const days: Record<string, Record<string, number>> = {};
  const total: Record<string, number> = {};
  res.forEach((r, i) => {
    const arr = Array.isArray(r) ? (r as string[]) : [];
    if (!arr.length) return;
    const day: Record<string, number> = {};
    for (let j = 0; j + 1 < arr.length; j += 2) {
      const n = Number(arr[j + 1]) || 0;
      day[arr[j]] = n;
      total[arr[j]] = (total[arr[j]] || 0) + n;
    }
    days[dates[i]] = day;
  });
  return NextResponse.json({ from, to, days, total }, { headers: { 'cache-control': 'no-store' } });
}
