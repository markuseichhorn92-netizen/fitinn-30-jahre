// Anonymer Trichter-Zähler: zählt je Ereignis „<schritt> <seite> <einstieg>“ pro Tag hoch.
// Keine Kennung, keine IP, keine Personendaten – nur feste Schrittnamen, Seitenpfad und Tageszähler.
// Speicher: Redis-Hash „funnel:JJJJ-MM-TT“ (Zeitzone Berlin, 400 Tage aufbewahrt), wenn KV verbunden ist.
// Zusätzlich weiter eine Zeile „[funnel] …“ im Vercel-Log. Auswertung: GET /api/f/stats (siehe dort).
//
// Schritte: view (Seite geladen) · open (Buchung geöffnet) · s_<schritt> (Formularschritt erreicht:
// slot, goal, experience, focus, name, contact, address, confirm, hint) · submit (Absenden gedrückt) ·
// ok (gebucht) · fail (Magicline-Buchung fehlgeschlagen) ·
// cta_seen (Hero-Button ≥ 50 % im Sichtfeld; Einstieg free = frei, covered = von Banner/Leiste teilweise verdeckt) ·
// start-ios / start-android / start-wlan (Klick auf /start: Store-Knopf bzw. WLAN-Anmeldeseite; Einstieg = technogym, fitinn, wlan) ·
// kf_<schritt> (Probetraining-Konfigurator: ziel, erfahrung, zeit, fokus, plan, termin, daten, fertig) ·
// consent_shown (Cookie-Banner eingeblendet) · consent_accept (Einstieg all = „Akzeptieren“, custom = eigene Auswahl) · consent_necessary (Einstieg all = „Nur notwendige“, custom = eigene Auswahl ohne Häkchen).
// Absprung-Messung (Black Week, src/lib/absprung.ts): quelle (Herkunft) · from · from_open · from_kf · from_ok (Anzeigen-Motiv je Stufe) · sec · exit · depth · dwell · toggle · faq ·
// consent_log = Einwilligungs-Nachweis (eigener Speicher, siehe unten): zufällige ID, Banner-Version, Auswahl, Zeit, Seite, Art (all/custom). Keine IP, kein Name.
// kf_exit (Abbruch im Konfigurator je Schritt/Feld) · kf_err (Fehlermeldung je Feld). Erlaubt sind nur feste Kombinationen aus Schritt, Seite und Kurzbezeichnung.
import { NextResponse } from 'next/server';
import { kvEnabled, kvPipeline } from '@/lib/kv';
import { ABSPRUNG_SCHRITTE, absprungErlaubt } from '@/lib/absprung';

export const runtime = 'nodejs';
const STEPS = /^(view|start-(ios|android|wlan)|open|submit|ok|fail|cta_seen|consent_shown|consent_accept|consent_necessary|s_(slot|goal|experience|focus|name|contact|address|confirm|hint)|kf_(ziel|erfahrung|zeit|fokus|plan|termin|daten|fertig))$/;
const PAGE = /^\/[a-z0-9\-/]{0,60}$/;
const SRC = /^[a-z0-9-]{0,24}$/;
const KEEP_SECONDS = 400 * 24 * 3600;

// Einwilligungs-Nachweis: Redis-Liste „consent:JJJJ-MM“ (eine JSON-Zeile je Entscheidung, 3 Jahre aufbewahrt), sonst nur Vercel-Log „[consent] …“.
const CONSENT_KEEP_SECONDS = 3 * 366 * 24 * 3600;
const CID = /^[a-f0-9-]{16,40}$/;
const BV = /^\d{4}-\d{2}-\d{2}$/;
async function consentLog(b: any) {
  const ts = Number(b?.ts);
  const how = b?.how === 'custom' ? 'custom' : 'all';
  if (!CID.test(String(b?.id || '')) || !BV.test(String(b?.bv || '')) || !Number.isFinite(ts) || Math.abs(Date.now() - ts) > 864e5 || !PAGE.test(String(b?.page || '/'))) {
    return new NextResponse(null, { status: 400 });
  }
  const row = JSON.stringify({ id: b.id, bv: b.bv, stats: b.stats === true, media: b.media === true, marketing: b.marketing === true, how, ts, at: Date.now(), page: b.page });
  console.log(`[consent] ${row}`);
  if (kvEnabled) {
    const key = `consent:${new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Berlin' }).slice(0, 7)}`;
    try { await kvPipeline([['RPUSH', key, row], ['EXPIRE', key, CONSENT_KEEP_SECONDS]]); }
    catch (e) { console.log('[consent] kv-fehler', String(e)); }
  }
  return new NextResponse(null, { status: 204 });
}

function dayKey(d = new Date()) {
  return `funnel:${d.toLocaleDateString('sv-SE', { timeZone: 'Europe/Berlin' })}`;
}

export async function POST(req: Request) {
  let b: any;
  try { b = JSON.parse(await req.text()); } catch { return new NextResponse(null, { status: 400 }); }
  const step = String(b?.step || '');
  if (step === 'consent_log') return consentLog(b);
  const page = String(b?.page || '/');
  const src = String(b?.src || '');
  const absprung = ABSPRUNG_SCHRITTE.includes(step);
  if (!(absprung ? absprungErlaubt(step, page, src) : STEPS.test(step)) || !PAGE.test(page) || !SRC.test(src)) return new NextResponse(null, { status: 400 });
  const field = `${step} ${page} ${src || '-'}`;
  console.log(`[funnel] ${field}`);
  if (kvEnabled) {
    const key = dayKey();
    try { await kvPipeline([['HINCRBY', key, field, 1], ['EXPIRE', key, KEEP_SECONDS]]); }
    catch (e) { console.log('[funnel] kv-fehler', String(e)); }
  }
  return new NextResponse(null, { status: 204 });
}
