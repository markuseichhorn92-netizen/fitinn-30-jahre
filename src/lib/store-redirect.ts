import { NextResponse, type NextRequest } from 'next/server';
import type { StoreApp } from '@/lib/start-config';

// Kurzlinks für QR-Codes (/app/fitinn, /app/technogym): erkennt iPhone/Android am User-Agent (serverseitig, ohne JS)
// und leitet zum passenden Store weiter. Alles andere (Rechner, iPad im Desktop-Modus) landet auf /app mit beiden Knöpfen.
export function storeRedirect(req: NextRequest, app: StoreApp) {
  const ua = req.headers.get('user-agent') || '';
  let target = new URL('/app', req.url).toString();
  if (/iPhone|iPod|iPad/.test(ua)) target = app.ios;
  else if (/Android/i.test(ua)) target = app.android;
  const res = NextResponse.redirect(target, 302);
  res.headers.set('Cache-Control', 'private, no-store');
  res.headers.set('Vary', 'User-Agent');
  return res;
}
