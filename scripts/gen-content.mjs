// Erzeugt aus den Onepage-Controls (package.json → onepage.control.*.default)
// je Sektion eine Inhaltsdatei src/content/<sektion>.json.
// Nur einmalig beim Umzug nötig – danach werden Texte direkt in src/content/*.json gepflegt.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const sectionsDir = path.join(root, 'src', 'sections');
const outDir = path.join(root, 'src', 'content');
fs.mkdirSync(outDir, { recursive: true });

for (const name of fs.readdirSync(sectionsDir).sort()) {
  const pkgPath = path.join(sectionsDir, name, 'package.json');
  if (!fs.existsSync(pkgPath)) continue;
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const controls = (pkg.onepage && pkg.onepage.control) || {};
  const content = {};
  for (const [key, cfg] of Object.entries(controls)) {
    if (cfg && 'default' in cfg) content[key] = cfg.default;
  }
  fs.writeFileSync(path.join(outDir, `${name}.json`), JSON.stringify(content, null, 2) + '\n');
  console.log(`${name}: ${Object.keys(content).length} Felder`);
}
