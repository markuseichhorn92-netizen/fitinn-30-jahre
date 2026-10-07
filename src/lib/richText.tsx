// Gemeinsame Darstellung der Lena-Antworten in allen Chats der Aktionsseite.
// Lena antwortet mit leichtem Markdown (Absätze, **fett**, "- " / "1." Listen, "**Titel:**"-Zeilen).
// Daraus werden echte Blöcke: kurze Zwischenüberschriften, Listen mit Punkten, kurze Aufzählungen
// als kompakte Chips, Nummern als Schritte. Kein HTML aus der Antwort, nur React-Elemente.
import React from 'react';

type Block =
  | { t: 'p'; text: string }
  | { t: 'h'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: string[] };

const BULLET = /^\s*(?:[-*•–])\s+(.*)$/;
const NUM = /^\s*(\d{1,2})[.)]\s+(.*)$/;

function inline(s: string, key: string): React.ReactNode {
  const src = String(s).replace(/__([^_\n]+)__/g, '**$1**').replace(/^#{1,6}\s+/, '');
  return src.split(/(\*\*[^*\n]+?\*\*)/g).map((p, i) =>
    p.length > 4 && p.startsWith('**') && p.endsWith('**')
      ? <strong key={`${key}-${i}`}>{p.slice(2, -2)}</strong>
      : <React.Fragment key={`${key}-${i}`}>{p.replace(/\*\*|__/g, '')}</React.Fragment>,
  );
}

// Eine Zeile, die nur aus "**Titel:**" bzw. "# Titel" besteht, ist eine Zwischenüberschrift
function asHeading(line: string): string | null {
  const t = line.trim();
  let m = t.match(/^#{1,6}\s+(.{2,60})$/);
  if (m) return m[1].replace(/\*\*|__/g, '').replace(/:$/, '');
  m = t.match(/^\*\*([^*]{2,60}?):?\*\*:?$/);
  if (m && !/\?$/.test(m[1])) return m[1].replace(/:$/, '');
  return null;
}

export function parseBlocks(text: string): Block[] {
  const lines = String(text || '').replace(/\r/g, '').split('\n');
  const out: Block[] = [];
  let para: string[] = [];
  const flush = () => { if (para.length) { out.push({ t: 'p', text: para.join(' ') }); para = []; } };
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) { flush(); continue; }
    const h = asHeading(line);
    if (h) { flush(); out.push({ t: 'h', text: h }); continue; }
    const b = line.match(BULLET); const n = !b ? line.match(NUM) : null;
    if (b || n) {
      flush();
      const kind: 'ul' | 'ol' = b ? 'ul' : 'ol';
      const item = (b ? b[1] : (n as RegExpMatchArray)[2]).trim();
      const last = out[out.length - 1];
      if (last && last.t === kind) last.items.push(item); else out.push({ t: kind, items: [item] });
      continue;
    }
    para.push(line.trim());
  }
  flush();
  // Abschließende fette Rückfrage nicht fett (die Antwort-Buttons stehen direkt darunter)
  const last = out[out.length - 1];
  if (last && last.t === 'p' && /\?\s*\**$/.test(last.text)) last.text = last.text.replace(/^\*\*(.*)\*\*$/, '$1');
  return out;
}

type Cls = Partial<Record<'root' | 'p' | 'h' | 'ul' | 'ol' | 'chips' | 'wide' | 'ask', string>>;

// Kurze Listen (viele Einträge, alle knapp) werden zu Chips – spart Höhe und ist schneller erfassbar
const chipable = (items: string[]) => {
  if (items.length < 4 || items.some((x) => /:\s|\d\s?€/.test(x))) return false;
  const len = items.map((x) => x.replace(/\*\*/g, '').length);
  return len.filter((l) => l <= 32).length / len.length >= 0.75 && Math.max(...len) <= 64;
};

export function RichText({ text, cls = {} }: { text: string; cls?: Cls }) {
  const blocks = parseBlocks(text);
  return (
    <div className={cls.root}>
      {blocks.map((b, i) => {
        const k = `b${i}`;
        if (b.t === 'h') return <p key={k} className={cls.h}>{inline(b.text, k)}</p>;
        if (b.t === 'p') {
          const ask = i === blocks.length - 1 && i > 0 && /\?\s*$/.test(b.text);
          return <p key={k} className={`${cls.p || ''} ${ask ? cls.ask || '' : ''}`}>{inline(b.text, k)}</p>;
        }
        if (b.t === 'ul' && chipable(b.items)) {
          const twoCol = b.items.every((x) => x.replace(/\*\*/g, '').length <= 18);
          return <ul key={k} className={`${cls.chips || ''} ${twoCol ? '' : cls.wide || ''}`}>{b.items.map((x, j) => <li key={j}>{inline(x, `${k}-${j}`)}</li>)}</ul>;
        }
        const items = b.items.map((x, j) => <li key={j}>{inline(x, `${k}-${j}`)}</li>);
        return b.t === 'ol' ? <ol key={k} className={cls.ol}>{items}</ol> : <ul key={k} className={cls.ul}>{items}</ul>;
      })}
    </div>
  );
}
