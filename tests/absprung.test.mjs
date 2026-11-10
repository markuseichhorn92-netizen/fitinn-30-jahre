// Test der Absprung-Messung: node --test tests/absprung.test.mjs (nutzt das TypeScript aus node_modules, kein Browser nötig)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const ts = require('typescript');
const dir = mkdtempSync(join(tmpdir(), 'absprung-'));
const out = (f) => ts.transpileModule(readFileSync(f, 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
writeFileSync(join(dir, 'funnel.js'), 'export function funnel(){}\nexport function funnelReset(){}\n');
writeFileSync(join(dir, 'absprung.js'), out('src/lib/absprung.ts').replace("from './funnel'", "from './funnel.js'"));
const A = await import(pathToFileURL(join(dir, 'absprung.js')).href);

test('Motiv aus utm_content: nur bekannte Werte', () => {
  assert.equal(A.motivAusUrl('utm_content', '?utm_content=countdown&utm_campaign=black-week-2026'), 'countdown');
  assert.equal(A.motivAusUrl('utm_content', '?utm_content=karussell-ablauf'), 'karussell-ablauf');
  assert.equal(A.motivAusUrl('utm_content', '?utm_content=max.mustermann%40x.de'), 'other');
  assert.equal(A.motivAusUrl('utm_content', ''), 'direkt');
  assert.equal(A.motivAusUrl('c', '?c=preis'), 'preis');
});

test('Zeitbereiche', () => {
  assert.deepEqual([0, 4, 5, 14, 29, 59, 119, 299, 900].map(A.zeitBereich), ['t5', 't5', 't15', 't15', 't30', 't60', 't120', 't300', 't300p']);
  for (const z of ['t5', 't15', 't30', 't60', 't120', 't300', 't300p']) assert.ok(A.absprungErlaubt('dwell', '/black-week', z));
});

test('Server-Allowlist: erlaubte Kombinationen', () => {
  const ok = [['from', '/black-week', 'studio'], ['from', '/black-week', 'direkt'], ['from_open', '/black-week', 'other'], ['from_kf', '/konfigurator', 'preis'],
    ['from_ok', '/konfigurator', 'silvester'], ['sec', '/black-week', 'preise'], ['exit', '/black-week', 'faq'], ['depth', '/black-week', 'd75'],
    ['toggle', '/black-week', 't104'], ['faq', '/black-week', 'q6'], ['kf_exit', '/konfigurator', 'daten-email'], ['kf_exit', '/konfigurator', 'termin'], ['kf_err', '/konfigurator', 'zip']];
  for (const [s, p, r] of ok) assert.ok(A.absprungErlaubt(s, p, r), `${s} ${p} ${r}`);
});

test('Server-Allowlist: alles andere wird abgelehnt (keine freien Texte, keine falsche Seite)', () => {
  const bad = [['from', '/black-week', 'max-mustermann'], ['from', '/konfigurator', 'studio'], ['sec', '/black-week', 'x'], ['sec', '/freunde', 'hero'], ['depth', '/black-week', 'd10'],
    ['toggle', '/black-week', 't999'], ['faq', '/black-week', 'q16'], ['kf_exit', '/konfigurator', 'daten-passwort'], ['kf_err', '/konfigurator', 'hint'], ['view', '/black-week', ''], ['exit', '/black-week', '']];
  for (const [s, p, r] of bad) assert.ok(!A.absprungErlaubt(s, p, r), `${s} ${p} ${r}`);
});

test('Alle Zähler passen in das 24-Zeichen-Muster von /api/f', () => {
  const re = /^[a-z0-9-]{0,24}$/;
  for (const l of [A.MOTIVE, A.ABSCHNITTE, A.TIEFEN, A.ZEITEN]) for (const v of l) assert.match(v, re);
});
