# Claude-Skills in diesem Projekt

Hier liegen Design- und Frontend-Skills aus drei öffentlichen Repositories. Sie
sind Anleitungen für Claude Code – kein Code, der beim Build der Website
mitläuft. Next.js ignoriert dieses Verzeichnis vollständig.

Aufruf im Chat mit `/<name>`, z. B. `/impeccable audit` oder `/animate`.

## Herkunft

| Paket | Quelle | Stand | Lizenz |
|---|---|---|---|
| Emil Kowalski · Design Engineering | [emilkowalski/skills](https://github.com/emilkowalski/skills) | `de33dbe` | MIT |
| Leon · taste-skill | [leonxlnx/taste-skill](https://github.com/leonxlnx/taste-skill) | `e988add` | MIT |
| Paul Bakaus · Impeccable v4.0.4 | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | `aee6ce9` | Apache 2.0 |

Die Lizenztexte liegen unverändert in `skills/_lizenzen/`.

## Was welcher Skill macht

### Emil Kowalski – Animation & Craft (9 Skills)

| Skill | Zweck |
|---|---|
| `animate` | Baut eine Animation von Grund auf – trifft die Entscheidungen in der richtigen Reihenfolge und schreibt den Code. |
| `review-animations` | Prüft vorhandenen Motion-Code gegen einen harten Qualitätsmaßstab. Nur auf Zuruf. |
| `improve-animations` | Auditiert die Bewegung einer ganzen Codebasis und schreibt Umsetzungspläne. Ändert nichts selbst. |
| `find-animation-opportunities` | Sucht Stellen, die von Bewegung profitieren würden – und lehnt den Rest ab. |
| `animation-vocabulary` | Rückwärts-Glossar: „das federnde Ding beim Öffnen“ → „Pop in“. |
| `apple-design` | Apples Gestaltungs- und Bewegungsprinzipien, übersetzt aufs Web. |
| `emil-design-eng` | Die Grundhaltung dahinter: UI-Politur, Komponentendesign, unsichtbare Details. |
| `pick-ui-library` | Kuratierte Bibliotheksempfehlungen (Toasts, Charts, Drag & Drop …). Nur auf Zuruf. |
| `prototype` | Baut mehrere echte Varianten eines UI-Teils hinter einer Vorschau zum Durchklicken. Nur auf Zuruf. |

### taste-skill – Ästhetik & Bildgenerierung (13 Skills)

| Skill | Zweck |
|---|---|
| `design-taste-frontend` | Der Standard: Anti-Schablonen-Skill für Landingpages, Portfolios, Redesigns. |
| `design-taste-frontend-v1` | Die alte Fassung, nur für Rückwärtskompatibilität. |
| `redesign-existing-projects` | Auditiert bestehende Seiten und hebt sie auf Premium-Niveau, ohne Funktion zu brechen. |
| `high-end-visual-design` | „Teuer aussehen“: Schriften, Abstände, Schatten, Karten, Bewegung. |
| `minimalist-ui` | Redaktioneller Minimalismus, warmes Monochrom, flache Bento-Grids. |
| `industrial-brutalist-ui` | Rohe, technische Oberflächen mit Schweizer Typografie. (Beta) |
| `gpt-taste` | Awwwards-Richtung mit GSAP-Scroll-Inszenierung. |
| `image-to-code` | Erst Design-Bilder erzeugen, analysieren, dann passgenau bauen. |
| `imagegen-frontend-web` | Erzeugt Referenzbilder für Websites – ein Bild pro Sektion. Schreibt keinen Code. |
| `imagegen-frontend-mobile` | Dasselbe für App-Screens. Schreibt keinen Code. |
| `brandkit` | Markenboards, Logo-Systeme, Identity-Decks. Schreibt keinen Code. |
| `stitch-design-taste` | Erzeugt `DESIGN.md`-Dateien für Google Stitch. |
| `full-output-enforcement` | Verbietet abgekürzte Ausgaben und Platzhalter-Kommentare. |

### Impeccable (1 Skill, 23 Unterbefehle)

`/impeccable <befehl> [ziel]` – u. a. `shape`, `critique`, `audit`, `polish`,
`bolder`, `quieter`, `distill`, `harden`, `onboard`, `animate`, `colorize`,
`typeset`, `layout`, `delight`, `overdrive`, `clarify`, `adapt`, `optimize`,
`live`, `init`, `document`, `extract`. Ohne Argument zeigt der Skill ein Menü.

Dazu gehören vier Unteragenten in `agents/`
(`impeccable-finish-reviewer`, `-documenter`, `-asset-producer`,
`-manual-edit-applier`) sowie Skripte unter `skills/impeccable/scripts/`.

**Bewusst nicht aktiviert:** der Design-Detector-Hook von Impeccable. Er würde
nach jeder Änderung an einer UI-Datei automatisch laufen. Falls gewünscht:
`/impeccable hooks on`.

## Überschneidungen

`design-taste-frontend`, `high-end-visual-design`, `redesign-existing-projects`,
`impeccable` und `emil-design-eng` beanspruchen alle „Frontend-Design“. Sie
werden nicht automatisch alle gleichzeitig aktiv – aber wenn eine bestimmte
Handschrift gewünscht ist, ist es zuverlässiger, den Skill mit `/name` direkt
zu nennen, statt es der Auswahl zu überlassen.

## Aktualisieren

Neu klonen und die Ordner unter `skills/` ersetzen. Die Verzeichnisnamen wurden
beim Einbau an das Feld `name` im Frontmatter angeglichen; das bitte beibehalten.
