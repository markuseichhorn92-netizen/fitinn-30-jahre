'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Title from '@siteui/title';
import Text from '@siteui/text';
import Badge from '@siteui/badge';
import Chip from '@siteui/chip';
import Deco from '@siteui/deco';
import { pickChoices, detectTopic } from '@/lib/choices';
import styles from './styles.module.css';

type Entry = { q: string; a: string; kind: 'verified' | 'ai'; choices: string[]; next?: string[] };
const ease = [0.22, 1, 0.36, 1] as any;
const VID_KEY = 'finn_vid'; // gleicher Besucher wie im schwebenden Chat

function getVid(): string {
  try {
    const e = window.localStorage.getItem(VID_KEY);
    if (e && /^[A-Za-z0-9_-]{8,64}$/.test(e)) return e;
    const v = (typeof crypto !== 'undefined' && (crypto as any).randomUUID ? (crypto as any).randomUUID() : String(Date.now()) + String(Math.random()).slice(2)).replace(/[^A-Za-z0-9_-]/g, '').slice(0, 64);
    window.localStorage.setItem(VID_KEY, v);
    return v;
  } catch { return String(Date.now()); }
}
function cleanMd(s: string) { return s.replace(/^#{1,6}\s+/gm, '').replace(/\*\*|__/g, '').replace(/^\s*[*]\s+/gm, '• '); }
function renderText(text: string): React.ReactNode {
  const src = String(text).replace(/__([^_\n]+)__/g, '**$1**');
  return src.split(/(\*\*[^*\n]+?\*\*)/g).map((p, i) =>
    p.length > 4 && p.startsWith('**') && p.endsWith('**') ? <strong key={i}>{p.slice(2, -2)}</strong> : <React.Fragment key={i}>{cleanMd(p)}</React.Fragment>
  );
}
const fill = (t: string, v: Record<string, string>) => String(t).replace(/\{(\w+)\}/g, (_, k) => v[k] ?? '');

export default function Fragen(props: any) {
  const {
    anchorId, bgColor, bgDeco, kicker, headline, intro, finnApi, maxChars, botName,
    verifiedLabel, aiLabel, followLabel, inputLabel, inputPlaceholder, sendLabel, thinkingLabel, errorText,
    phoneLabel, phoneHref, continueLabel, continueIntro, bookLabel, bookHref, clearLabel, disclosure, privacyLabel, privacyHref, fragen, context, variant, leadLabel, lead, booked,
  } = props;
  const embed = variant === 'embed';
  const list: Array<{ question: string; answer: string }> = Array.isArray(fragen) ? fragen : [];
  const [entries, setEntries] = useState<Entry[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const asked = new Set(entries.map((e) => e.q));
  const pool = list.map((f) => ({ label: f.question, topic: detectTopic(f.question) }));
  // Anschluss-Buttons beim Anlegen eines Eintrags festlegen (gemeinsame Trichter-Logik)
  const withNext = (prevEntries: Entry[], entry: Entry): Entry => ({
    ...entry,
    next: pickChoices({
      question: entry.q, answer: entry.a, finn: entry.choices, asked: [...prevEntries.map((x) => x.q), entry.q],
      previous: prevEntries.length ? prevEntries[prevEntries.length - 1].next || [] : [], candidates: pool, booked: !!booked, limit: 3,
    }),
  });

  const [expanded, setExpanded] = useState<number | null>(null);
  useEffect(() => { setExpanded(null); }, [entries.length]);
  // Neueste Antwort ins Bild holen
  useEffect(() => {
    const el = panelRef.current;
    if (!el || !entries.length) return;
    const last = el.lastElementChild as HTMLElement | null;
    if (last && typeof last.scrollIntoView === 'function') last.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [entries.length]);
  const MAX_OLD = embed ? 0 : 3; // eingebettet: nur die neueste Antwort, Karte wächst nicht
  const visible = entries.slice(-(MAX_OLD + 1));

  const askVerified = (q: string) => {
    const f = list.find((x) => x.question === q);
    if (!f || busy) return;
    setFailed(false);
    window.dispatchEvent(new CustomEvent('fi:signal', { detail: { type: 'question', value: q } }));
    setEntries((e) => [...e, withNext(e, { q, a: f.answer, kind: 'verified', choices: [] })]);
  };

  const askFinn = async (raw: string) => {
    const text = String(raw || '').trim().slice(0, Number(maxChars) || 800);
    if (!text || busy) return;
    const known = list.find((x) => x.question.toLowerCase() === text.toLowerCase());
    if (known) { askVerified(known.question); setInput(''); return; }
    setBusy(true); setFailed(false); setInput('');
    window.dispatchEvent(new CustomEvent('fi:signal', { detail: { type: 'question', value: text } }));
    const history = entries.slice(-3).flatMap((e) => [{ role: 'user', text: e.q.slice(0, 800) }, { role: 'assistant', text: e.a.slice(0, 800) }]);
    try {
      const r = await fetch(finnApi, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ message: context ? `${String(context)}\n\nFrage: ${text}` : text, history, visitorId: getVid() }) });
      const d: any = await r.json().catch(() => null);
      if (!d || typeof d.answer !== 'string' || !d.answer.trim()) throw new Error('empty');
      const choices = Array.isArray(d.choices) ? d.choices.map((c: any) => String(c && c.label ? c.label : '')).filter(Boolean).slice(0, 2) : [];
      setEntries((e) => [...e, withNext(e, { q: text, a: d.answer, kind: 'ai', choices })]);
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  };

  const onChoice = (c: string) => {
    if (list.some((x) => x.question === c)) askVerified(c); else askFinn(c);
  };
  const continueInChat = () => {
    const last = entries[entries.length - 1];
    window.dispatchEvent(new CustomEvent('finn:open', { detail: last ? { text: fill(continueIntro, { frage: last.q }) } : undefined }));
  };

  const body = (
    <>
        <div className={styles.chips} aria-label={kicker}>
          {list.map((f) => (
            <button
              key={f.question}
              type="button"
              className={`${styles.chip} ${asked.has(f.question) ? styles.chipDone : ''}`}
              onClick={() => askVerified(f.question)}
              disabled={busy}
            >
              {f.question}
            </button>
          ))}
        </div>

        <div className={styles.panel} ref={panelRef} aria-live="polite">
          <AnimatePresence initial={false}>
            {visible.map((e, vi) => {
              const i = entries.length - visible.length + vi;
              const isLast = i === entries.length - 1;
              const age = entries.length - 1 - i; // 1 = direkt davor
              const compact = !isLast && expanded !== i;
              return (
              <motion.article
                key={i + e.q}
                className={`${styles.card} ${e.kind === 'ai' ? styles.cardAi : ''} ${compact ? styles.cardOld : ''} ${compact ? styles['age' + Math.min(age, 3)] : ''}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease }}
                onClick={compact ? () => setExpanded(i) : undefined}
                role={compact ? 'button' : undefined}
                tabIndex={compact ? 0 : undefined}
                onKeyDown={compact ? (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); setExpanded(i); } } : undefined}
                aria-expanded={!isLast ? !compact : undefined}
              >
                <p className={styles.q}>{e.q}</p>
                <div className={styles.aRow}>
                  <span className={styles.avatar} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9z" /></svg>
                  </span>
                  <div className={styles.aBody}>
                    <span className={styles.meta}>
                      <strong>{botName}</strong>
                      <span className={`${styles.tag} ${e.kind === 'ai' ? styles.tagAi : styles.tagOk}`}>{e.kind === 'ai' ? aiLabel : verifiedLabel}</span>
                    </span>
                    <p className={styles.a}>{renderText(e.a)}</p>
                    {isLast && !embed ? (
                      <div className={styles.follow}>
                        <span className={styles.followLabel}>{followLabel}</span>
                        <div className={styles.followRow}>
                          {(e.next || []).map((c) => (
                            <Chip key={c} onClick={() => onChoice(c)} disabled={busy}>{c}</Chip>
                          ))}
                          {bookLabel ? <a className={styles.bookLink} href={bookHref} onClick={(e: React.MouseEvent) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('fi:book', { detail: { source: 'fragen' } })); }}>{bookLabel}</a> : null}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </motion.article>
              );
            })}
          </AnimatePresence>
          {busy ? (
            <div className={`${styles.card} ${styles.cardAi}`}>
              <div className={styles.aRow}>
                <span className={styles.avatar} aria-hidden="true"><span className={styles.dots}><i /><i /><i /></span></span>
                <div className={styles.aBody}><span className={styles.thinking}>{thinkingLabel}</span></div>
              </div>
            </div>
          ) : null}
          {failed ? (
            <p className={styles.error} role="alert">{errorText} <a href={phoneHref}>{phoneLabel}</a></p>
          ) : null}
        </div>

        <form className={styles.form} onSubmit={(e) => { e.preventDefault(); askFinn(input); }}>
          <label htmlFor="fi-fragen-input" className={styles.srOnly}>{inputLabel}</label>
          <input
            id="fi-fragen-input"
            ref={inputRef}
            className={styles.input}
            type="text"
            value={input}
            maxLength={Number(maxChars) || 800}
            placeholder={inputPlaceholder}
            autoComplete="off"
            enterKeyHint="send"
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className={styles.send} disabled={busy || !input.trim()} aria-label={sendLabel}>
            <span className={styles.sendText}>{sendLabel}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
        </form>

        <div className={styles.foot}>
          <p className={styles.disclosure}>
            {disclosure} <a href={privacyHref} target="_blank" rel="noopener noreferrer">{privacyLabel}</a>
          </p>
          <div className={styles.footActions}>
            {entries.length ? <button type="button" className={styles.linkBtn} onClick={() => { setEntries([]); setFailed(false); }}>{clearLabel}</button> : null}
            {continueLabel ? <button type="button" className={styles.linkBtn} onClick={continueInChat}>{continueLabel}</button> : null}
          </div>
        </div>
    </>
  );

  if (embed) {
    return (
      <div className={`${styles.embed} ${entries.length ? styles.embedActive : ''}`}>
        <div className={styles.embedHead}>
          <span className={styles.avatar} aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9z" /></svg>
          </span>
          <div className={styles.embedLead}>
            <span className={styles.embedLabel}>{leadLabel}</span>
            <p aria-live="polite">{lead}</p>
          </div>
        </div>
        {intro ? <p className={styles.embedIntro}>{intro}</p> : null}
        {body}
      </div>
    );
  }

  return (
    <section id={anchorId} className={styles.sec} style={{ background: bgColor }}>
      {bgDeco ? <Deco kind={String(bgDeco)} className={styles.bgDeco} /> : null}
      <div className={styles.container}>
        <div className={styles.head}>
          <Badge tone="accent" className={styles.badge}>{kicker}</Badge>
          <Title as="h2" size="xl">{headline}</Title>
          <Text size="lg" className={styles.intro}>{intro}</Text>
        </div>
        {body}
      </div>
    </section>
  );
}