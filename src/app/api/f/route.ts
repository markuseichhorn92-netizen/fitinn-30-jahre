// Anonymer Trichter-Zähler: schreibt je Ereignis eine Zeile „[funnel] <schritt> <seite> <einstieg>" ins Vercel-Log.
// Nichts wird gespeichert, keine Kennung, keine Personendaten – nur feste Schrittnamen und der Seitenpfad.
// Auswertung: Vercel → Logs, Suche z. B. „[funnel] s_contact", Treffer zählen.
//
// Schritte: view (Seite geladen) · open (Buchung geöffnet) · s_<schritt> (Formularschritt erreicht:
// slot, goal, experience, focus, name, contact, address, confirm, hint) · submit (Absenden gedrückt) ·
// ok (gebucht) · fail (Magicline-Buchung fehlgeschlagen).
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
const STEPS = /^(view|open|submit|ok|fail|s_(slot|goal|experience|focus|name|contact|address|confirm|hint))$/;
const PAGE = /^\/[a-z0-9\-/]{0,60}$/;
const SRC = /^[a-z0-9-]{0,24}$/;

export async function POST(req: Request) {
  let b: any;
  try { b = JSON.parse(await req.text()); } catch { return new NextResponse(null, { status: 400 }); }
  const step = String(b?.step || '');
  const page = String(b?.page || '/');
  const src = String(b?.src || '');
  if (!STEPS.test(step) || !PAGE.test(page) || !SRC.test(src)) return new NextResponse(null, { status: 400 });
  console.log(`[funnel] ${step} ${page} ${src || '-'}`);
  return new NextResponse(null, { status: 204 });
}
