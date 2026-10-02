// Zusätzliche Benachrichtigung bei Probetraining-Buchungen (Magicline bleibt führend).
// Schickt eine E-Mail über Resend, wenn RESEND_API_KEY gesetzt ist – sonst passiert nichts.
// Es werden keine Daten gespeichert oder geloggt.
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const LABELS: Record<string, string> = {
  termin: 'Termin', trainer: 'Betreuung', email: 'E-Mail', phone: 'Telefon', gender: 'Geschlecht',
  dateOfBirth: 'Geburtsdatum', note: 'Anmerkung', marketing: 'Marketing-Einwilligung', quelle: 'Quelle',
};

const esc = (s: unknown) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

function fmt(key: string, v: any): string {
  if (v === null || v === undefined || v === '') return '–';
  if (typeof v === 'boolean') return v ? 'Ja' : 'Nein';
  if (key === 'name' && typeof v === 'object') return `${v.firstName ?? ''} ${v.lastName ?? ''}`.trim();
  if (key === 'address' && typeof v === 'object') return `${v.addressFirst ?? ''}, ${v.postalCode ?? ''} ${v.city ?? ''}`.trim();
  return typeof v === 'object' ? JSON.stringify(v) : String(v);
}

export async function POST(req: Request) {
  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'invalid' }, { status: 400 }); }
  const data = body && typeof body.data === 'object' ? body.data : null;
  if (!data) return NextResponse.json({ error: 'invalid' }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO;
  const from = process.env.LEAD_EMAIL_FROM;
  if (!key || !to || !from) return NextResponse.json({ ok: true, sent: false });

  // kind 'rescue' = Magicline-Buchung im Formular ist fehlgeschlagen → Rückruf nötig (siehe 11-wizard)
  const rescue = body.kind === 'rescue';
  const name = fmt('name', data.name);
  const rows = ['name', 'termin', 'trainer', 'email', 'phone', 'gender', 'dateOfBirth', 'address', 'note', 'marketing', 'quelle']
    .map((k) => `<tr><td style="padding:4px 12px 4px 0;color:#555">${esc(k === 'name' ? 'Name' : k === 'address' ? 'Adresse' : LABELS[k] || k)}</td><td style="padding:4px 0"><b>${esc(fmt(k, data[k]))}</b></td></tr>`)
    .join('');

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: to.split(',').map((s) => s.trim()).filter(Boolean),
      subject: rescue
        ? `⚠️ Probetraining NICHT eingetragen – bitte zurückrufen: ${name} – ${fmt('termin', data.termin)}`
        : `Neues Probetraining (Aktion): ${name} – ${fmt('termin', data.termin)}`,
      html: rescue
        ? `<p><b>Die automatische Buchung in Magicline ist fehlgeschlagen.</b> Die Person hat das Formular komplett ausgefüllt und den Wunschtermin unten gewählt. Bitte heute zurückrufen, Termin festmachen und in Magicline eintragen (Lead anlegen).</p><table>${rows}</table>`
        : `<p>Neue Probetraining-Buchung über die Aktionsseite (bereits in Magicline eingetragen):</p><table>${rows}</table>`,
    }),
  });
  return NextResponse.json({ ok: r.ok, sent: r.ok }, { status: r.ok ? 200 : 502 });
}
