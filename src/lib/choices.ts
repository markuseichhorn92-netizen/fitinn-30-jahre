// Gemeinsame Logik für die Antwort-Buttons in allen Chats der Aktionsseite
// (FINN-Widget, Sektion „Frag einfach", Chat auf der Bestätigungsseite).
//
// Idee: Der Besucher wird entlang eines kleinen Trichters geführt
//   Angebot verstehen → Preis/Tarif → Leistungen/Geräte → Zweifel ausräumen → Probetraining
// Die Buttons zeigen immer den nächsten sinnvollen Schritt, wiederholen nichts, was schon
// gefragt wurde, und enden (solange nicht gebucht) mit der Buchung als letztem Button.

export type Topic =
  | 'trial' | 'price' | 'tariff' | 'incl' | 'geraete' | 'hours' | 'busy' | 'fit' | 'contract' | 'age'
  | 'location' | 'bring' | 'reschedule' | 'companion' | 'flow' | 'other';

export type Candidate = { label: string; topic: Topic };

const TOPIC_RE: Array<[Topic, RegExp]> = [
  ['reschedule', /verschieb|absag|stornier|umbuch/i],
  ['companion', /begleit|jemanden mitbring|freund|partner mitbring|zu zweit/i],
  ['bring', /mitbring|handtuch|schuhe|sportkleid|sporttasche|duschen|schließf|spind/i],
  ['location', /park|adresse|anfahrt|wo seid|wo ist|wo finde|hirtenberg|feyen|route/i],
  ['age', /\bbin 1[4-7]\b|\b1[4-7] jahre|jahre alt|mindestalter|jugendlich|unter 18|minderjähr|\beltern|schüler|sohn|tochter/i],
  ['busy', /voll|auslastung|los ist|ruhig|stoßzeit|viele leute/i],
  ['hours', /öffnungszeit|geöffnet|wann habt|uhr\b|feiertag|sonntag|samstag/i],
  ['flow', /wie läuft|ablauf|was passiert|wie lange dauert|90 min/i],
  ['fit', /unfit|zu alt|anfänger|einsteiger|noch nie|lange nicht|übergewicht|rücken|verletz|traue|was für mich/i],
  ['trial', /probetraining|schnupper|termin|buchen|vorbeikommen/i],
  ['contract', /kündig|vertrag|laufzeit|frist|pausier|verläng|aufnahmegebühr|sepa/i],
  ['tariff', /basic|premium|tarif|52 wochen|104 wochen|was passt/i],
  ['price', /€|euro|preis|kost|beitrag|spar|günstig|teuer|rabatt|aktion|angebot|januar|silvester/i],
  ['incl', /inklusive|enthalten|leistung|getränk|app|check-?up|trainingsplan|wlan/i],
  ['geraete', /gerät|technogym|biocircuit|biostrength|cardio|kraft|hantel|powerbereich|zirkel/i],
];

export function detectTopic(text: string): Topic {
  const t = String(text || '');
  for (const [topic, re] of TOPIC_RE) if (re.test(t)) return topic;
  return 'other';
}

// Nächste sinnvolle Themen je nach zuletzt beantwortetem Thema (in Reihenfolge)
const NEXT: Record<Topic, Topic[]> = {
  other: ['price', 'trial', 'hours'],
  trial: ['flow', 'fit', 'hours', 'price'],
  flow: ['fit', 'bring', 'hours'],
  price: ['tariff', 'incl', 'contract'],
  tariff: ['incl', 'contract', 'price'],
  incl: ['geraete', 'tariff', 'busy'],
  geraete: ['incl', 'fit', 'busy'],
  hours: ['busy', 'price', 'flow'],
  busy: ['hours', 'flow', 'price'],
  fit: ['flow', 'geraete', 'incl'],
  contract: ['tariff', 'price', 'incl'],
  age: ['other'],
  location: ['bring', 'reschedule', 'companion'],
  bring: ['location', 'companion', 'reschedule'],
  reschedule: ['bring', 'location', 'companion'],
  companion: ['bring', 'location', 'reschedule'],
};

export type PickOptions = {
  question: string;           // zuletzt gestellte Frage
  answer: string;             // Antwort darauf
  finn?: string[];            // Vorschläge, die FINN selbst mitgeschickt hat
  asked: string[];            // alle bisher gestellten Fragen/Buttons
  previous?: string[];        // zuletzt angezeigte Buttons (nicht 1:1 wiederholen)
  candidates: Candidate[];    // Pool möglicher Fragen mit Thema
  booked?: boolean;           // Probetraining schon gebucht → keine Buchungs-CTA
  book?: string;              // Label der Buchungs-CTA
  other?: string;             // „Ich hab noch eine Frage"
  yes?: string; no?: string; bookYes?: string;
  limit?: number;
};

const norm = (s: string) => String(s || '').toLowerCase().replace(/[^\p{L}\p{N}€]+/gu, ' ').trim();

// Ja/Nein-Frage am Ende der Antwort?
function endsWithYesNo(answer: string): { yesNo: boolean; aboutTrial: boolean } {
  const t = String(answer || '').trim();
  const cut = Math.max(t.lastIndexOf('. ', t.length - 2), t.lastIndexOf('! ', t.length - 2), t.lastIndexOf('\n', t.length - 2));
  const last = t.slice(cut + 1).trim();
  const q = last.endsWith('?');
  const yesNo = q && /^(soll|möchtest|willst|magst|darf ich|kann ich dir|hast du lust|bist du|würdest|wollen wir|sollen wir|interessiert|passt|brauchst)/i.test(last);
  return { yesNo, aboutTrial: /probetraining|termin|vorbei|raussuchen/i.test(last) };
}

export function pickChoices(o: PickOptions): string[] {
  const limit = Math.min(4, Math.max(2, o.limit || 3));
  const asked = new Set(o.asked.map(norm));
  const prev = new Set((o.previous || []).map(norm));
  const out: string[] = [];
  const seen = new Set<string>();
  const add = (c?: string) => { const n = norm(c || ''); if (!n || seen.has(n) || out.length >= limit) return; seen.add(n); out.push(String(c)); };

  // 1) Rückfrage von FINN → Ja/Nein
  const yn = endsWithYesNo(o.answer);
  if (yn.yesNo) {
    if (yn.aboutTrial && !o.booked) { add(o.bookYes || o.book); add(o.no); }
    else { add(o.yes); add(o.no); }
    return out;
  }

  const qt = detectTopic(o.question);
  const topic = qt !== 'other' ? qt : detectTopic(o.answer.slice(0, 200));
  const unhappy = topic === 'age';                     // kein Push zur Buchung, wenn es ohnehin nicht geht
  const bookN = norm(o.book || '');

  // 2) FINNs eigene Vorschläge (max. 2), aber nicht Gefragtes und nicht die CTA (die kommt zuletzt)
  const finn = (o.finn || []).map(String).filter((c) => c.trim());
  let took = 0;
  for (const c of finn) {
    const n = norm(c);
    if (took >= 2) break;
    if (asked.has(n) || (bookN && (n === bookN || /^probetraining( buchen)?$/.test(n)))) continue;
    add(c); took++;
  }

  // 3) Nächste Schritte aus dem Trichter – Kandidaten je Thema, nichts Gefragtes, nichts Gleiches wie eben
  // Themen, die schon gefragt wurden (auch als freier Text), nicht erneut vorschlagen
  const askedTopics = new Set<Topic>(o.asked.map((q) => detectTopic(q)).filter((t) => t !== 'other'));
  askedTopics.add(topic);
  const usable = o.candidates.filter((c) => !asked.has(norm(c.label)) && norm(c.label) !== norm(o.question) && !askedTopics.has(c.topic));
  const pickTopic = (t: Topic) => usable.find((c) => c.topic === t && !seen.has(norm(c.label)) && !prev.has(norm(c.label)))
    || usable.find((c) => c.topic === t && !seen.has(norm(c.label)));
  const reserve = o.book && !o.booked && !unhappy && !asked.has(bookN) ? 1 : 0;
  for (const t of NEXT[topic]) {
    if (out.length >= limit - reserve) break;
    const c = pickTopic(t); if (c) add(c.label);
  }
  // Auffüllen, falls der Trichter nichts mehr hergibt
  for (const c of usable) { if (out.length >= Math.min(2, limit - reserve)) break; if (!seen.has(norm(c.label))) add(c.label); }

  // 4) CTA zuletzt (solange nicht gebucht); sonst „noch eine Frage"
  if (reserve) add(o.book);
  if (out.length < 2 && o.other) add(o.other);
  return out.slice(0, limit);
}
