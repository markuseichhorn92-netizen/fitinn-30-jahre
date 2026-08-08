---
name: Fit-Inn Trier · Lehrtafeln (/tafel)
description: Die Schautafel als Website — Preußischblau, Knochenpapier, zwei Druckfarben mit fester Zuständigkeit.
colors:
  blau: "#142f49"
  blau-tief: "#0d2237"
  knochen: "#ede5d6"
  russ: "#17191c"
  zinnober: "#c4402b"
  zinnober-tief: "#a6301f"
  chrom: "#dfa02a"
  matt-papier: "#46586b"
  matt-blau: "#a7b6c4"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(40px, 6.6vw, 92px)"
    fontWeight: 700
    lineHeight: 0.96
    letterSpacing: "-0.048em"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(30px, 4.4vw, 58px)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.038em"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(21px, 2.3vw, 29px)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(18px, 1.6vw, 21px)"
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: "normal"
  note:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  schluessel:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "clamp(11px, 0.85vw, 12.5px)"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.08em"
  zahl:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(28px, 3.2vw, 42px)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.04em"
    fontFeature: "tabular-nums"
rounded:
  kante: "0"
  fase: "2px"
spacing:
  rand: "clamp(16px, 4vw, 44px)"
  reihe: "clamp(1.2rem, 3vw, 2.4rem)"
  spiegel: "clamp(2rem, 5vw, 4.5rem) clamp(1.4rem, 4vw, 4rem) clamp(1.6rem, 3.5vw, 3rem)"
  block: "clamp(1.8rem, 3.5vw, 2.6rem)"
  abschnitt: "clamp(2rem, 4vw, 3rem)"
components:
  platte:
    backgroundColor: "{colors.knochen}"
    textColor: "{colors.russ}"
    rounded: "{rounded.fase}"
    padding: "{spacing.spiegel}"
    width: "1240px"
  knopf-zinnober:
    backgroundColor: "{colors.zinnober}"
    textColor: "{colors.knochen}"
    rounded: "{rounded.fase}"
    padding: "0.85em 1.7em"
    height: "52px"
  knopf-zinnober-hover:
    backgroundColor: "{colors.zinnober-tief}"
    textColor: "{colors.knochen}"
  knopf-chrom:
    backgroundColor: "{colors.chrom}"
    textColor: "{colors.russ}"
    rounded: "{rounded.fase}"
    padding: "0.85em 1.7em"
    height: "52px"
  knopf-chrom-hover:
    backgroundColor: "#c98d1e"
    textColor: "{colors.russ}"
  knopf-offen:
    backgroundColor: "transparent"
    textColor: "{colors.knochen}"
    rounded: "{rounded.fase}"
    padding: "0.85em 1.7em"
    height: "52px"
  feld:
    backgroundColor: "transparent"
    textColor: "{colors.russ}"
    rounded: "{rounded.kante}"
    padding: "12px 2px"
  legende:
    backgroundColor: "transparent"
    textColor: "{colors.russ}"
    rounded: "{rounded.kante}"
    padding: "clamp(0.85rem, 1.6vw, 1.15rem) 0"
  legende-aktiv:
    backgroundColor: "rgba(196, 64, 43, 0.1)"
    textColor: "{colors.russ}"
  preisfeld:
    backgroundColor: "{colors.knochen}"
    textColor: "{colors.zinnober}"
    rounded: "{rounded.fase}"
    padding: "clamp(1.1rem, 2.4vw, 1.7rem)"
    width: "420px"
---

# Design System: Fit-Inn Trier · Lehrtafeln (/tafel)

> **Geltungsbereich.** Diese Datei beschreibt **ausschließlich die Route `/tafel`**
> (`src/app/tafel/page.tsx`, `src/components/tafel/`). Sie ist kein projektweites
> System. Die vier übrigen Routen (`/`, `/ab-35`, `/fitnessstudio-trier`,
> `/sommer`) laufen in einer anderen, älteren Welt (`src/components/aktion5/`,
> dunkles Petrol mit Bernstein, Figtree/Source Serif). Diese Welt bleibt hier
> **undokumentiert und unangetastet**. Nichts aus dieser Datei gilt dort, und
> nichts von dort gilt hier. Wer eine neue Fläche baut, entscheidet zuerst,
> in welcher der beiden Welten sie steht.

## Overview

**Creative North Star: „Die Lehrtafel"**

Die deutsche Schautafel, wie sie zwischen 1925 und 1970 in Arztpraxen,
Turnhallen und Klassenzimmern hing — Deutsches Hygiene-Museum, Fritz Kahns
Schaubilder. Ein Grund aus Preußischblau, darauf Blätter aus Knochenpapier,
oben auf eine dunkle Rußleiste montiert, mit einer eingerückten Haarlinie als
Satzspiegel. Flache Druckfarben, Haarlinien, nummerierte Verweise, die aus der
Zeichnung in die Legende laufen. Die Seite belehrt nicht, sie **zeigt**: erst
das Gerät im Aufriss, dann die Rechnung offen bis zur Endsumme, dann den Termin.

Die Welt ist gegenständlich, nicht dekorativ. Jedes Element hat ein Vorbild im
Druckverfahren: die Tafel ist ein Blatt, die Kopfleiste ist die Montageschiene,
der Rechtshinweis ist der Verlagsvermerk, die Legendenzeile ist ein Schalter und
keine Karte. Die Dichte ist ruhig und großzügig — großer Satzspiegel, langer
Weißraum, aber sehr wenige Formen. Die Seite hat genau **eine gestaltete
Bewegung**: die Verweislinien zeichnen sich einmal, wenn die Tafel in den Blick
kommt; danach gehört die Bewegung dem Leser, der eine Legendenzeile anfasst und
die zugehörige Linie aufleuchten sieht.

Ausdrücklich verweigert wird die Anordnung, die jedes Fitnessstudio baut: fast
schwarzer Grund, Muskelfoto, Countdown, Kachelraster. Es gibt auf der ganzen
Fläche genau **eine** Fotografie (die echte Trainingsfläche) und **ein**
bewegtes Bild (den Rundgang) — beide im selben harten Rahmen wie die Zeichnung.

**Key Characteristics:**
- Preußischblauer Grund, auf den Papiertafeln montiert sind — nie Papier als Vollflächen-Grund.
- Zwei Druckfarben mit fester Zuständigkeit, plus Ruß als dritte, nicht-akzentuierende Druckfarbe.
- Eine Schriftfamilie mit Breitenachse für alles Lesbare, eine Monospace nur als Schlüsselschrift.
- Kanten statt Rundungen: 0 oder 2 px, sonst nichts.
- Keine Label über Überschriften — die Tafelbezeichnung steht unten im Rand.
- Beleg vor Versprechen: die Zeichnung trägt die erste Ansicht, nicht der Preis allein.

## Colors

Eine Druckpalette: ein Grund, ein Papier und drei Farben, die eine Handpresse in
drei Durchgängen auftragen könnte.

### Primary
- **Zinnober** (`{colors.zinnober}`): die Verweisfarbe **auf dem Papier**. Große
  Ziffern, Summen, Rahmen des Preisfelds, die Hauptschaltfläche, der aktive
  Zustand von Legende, Kalendertag und Zeitfenster, der Fokusring innerhalb
  einer Tafel, der Datenweg in der Zeichnung.
- **Zinnober tief** (`{colors.zinnober-tief}`): dieselbe Farbe, eine Stufe
  dunkler — für Fließtext-Auszeichnungen und den Sternchen-Verweis (5,6:1 auf
  Papier) sowie als Hover der Hauptschaltfläche. Nie als Fläche.

### Secondary
- **Chromgelb** (`{colors.chrom}`): die Verweisfarbe **auf dem Blau** (5,5:1).
  Der Zusatz in der Kopfleiste, der Sternanker des Rechtshinweises, Links im
  Rechtshinweis, die Schaltfläche in der Kopfleiste, der Fokusring und die
  Textmarkierung außerhalb der Tafeln.

### Neutral
- **Preußischblau** (`{colors.blau}`): der Grund, auf dem die Tafelreihe hängt.
  Trägt nie Fließtext in Zinnober.
- **Blau tief** (`{colors.blau-tief}`): Kopfleiste, Mobilmenü und Fußleiste —
  die Montageschienen ober- und unterhalb der Reihe.
- **Knochenpapier** (`{colors.knochen}`): das Tafelblatt, außerdem die Textfarbe
  auf dem Blau und die Schrift in Zinnoberflächen.
- **Ruß** (`{colors.russ}`): die 7 px hohe Montageleiste am Kopf jeder Tafel,
  die Zeichenfarbe des Aufrisses, harte Trennlinien (1,5–2 px) und die Textfarbe
  auf Chromgelb.
- **Matt Papier** (`{colors.matt-papier}`): abgesetzter Text auf dem Papier —
  Fließtext unter Überschriften, Tabellenspalten, Platzhalter, Tafelbezeichnung.
  Aus dem Blau getönt, nicht grau.
- **Matt Blau** (`{colors.matt-blau}`): abgesetzter Text auf dem Blau —
  Navigationspunkte, Fußzeilenangaben, Rechtshinweis.

### Named Rules

**Die Zuständigkeitsregel.** Zinnober verweist auf dem Papier, Chromgelb
verweist auf dem Blau. Nie umgekehrt: Zinnober auf Blau trägt nur 2,4:1. Diese
Regel entscheidet jede Akzentfrage auf dieser Route, ohne Ausnahme.

**Die Drei-Durchgänge-Regel.** Die Tafel kennt Ruß, Zinnober und Chromgelb —
mehr Farben hat die Presse nicht. Ein neuer Akzent (Grün, Violett, Blaugrün)
wird nicht eingeführt; ein zusätzlicher Zustand wird über Deckkraft, Linienstärke
oder eine getönte Fläche derselben Farbe gelöst (z. B. `rgba(196,64,43,.07)` für
Hover, `.1` für aktiv, `.05` für Feldfokus).

**Die Getönt-statt-grau-Regel.** Abgesetzter Text ist nie neutralgrau, sondern
aus seinem eigenen Grund getönt: `{colors.matt-papier}` auf dem Papier,
`{colors.matt-blau}` auf dem Blau.

## Typography

**Display Font:** Archivo mit Breitenachse (`wdth`), Fallback `system-ui, sans-serif`
**Body Font:** Archivo — dieselbe Familie
**Label/Mono Font:** Martian Mono (Schnitte 500 und 700), Fallback `ui-monospace, monospace`

**Character:** Eine Familie mit Breitenachse liefert die gedrängte Beschriftung
und die weite Überschrift, so wie eine Tafelschrift es tat — der Wechsel im
Bild ist eine Achsenbewegung, kein Familienwechsel. Daneben steht Martian Mono
als **Schlüsselschrift**: gesperrt, versal, klein, nur für Maße, Marken und
Bezeichnungen. Die Grundtypografie der Route beginnt bei
`clamp(17px, 1.4vw, 19px)` mit `line-height: 1.62` — kein Fließtext unter 17 px,
weil die Hauptzielgruppe 50+ am Handy liest.

### Hierarchy
- **Display** (700, `clamp(40px,6.6vw,92px)`, LH 0.96, LS −0.048em, max. 11ch):
  genau einmal pro Seite, die Schlagzeile der ersten Tafel.
- **Headline** (700, `clamp(30px,4.4vw,58px)`, LH 1.02, LS −0.038em, max. 19ch):
  der Titel jeder weiteren Tafel. Eine Stufe größer (`clamp(38px,6.4vw,88px)`,
  LS −0.045em, max. 15ch) nur, wenn eine Tafel den Auftakt trägt.
- **Title** (700, `clamp(21px,2.3vw,29px)`, LS −0.03em): Zwischenüberschriften
  innerhalb einer Tafel — Laufzeitköpfe, Begriffe einer Beschreibungsliste.
- **Body** (400, `clamp(18px,1.6vw,21px)`, LH 1.62, max. 68ch, in engen Spalten
  52ch): Fließtext auf dem Papier, in `{colors.matt-papier}`.
- **Note** (400, 16,5–17,5 px, LH 1.55–1.6): Tabellenzeilen, Legendentexte,
  Aufzählungen, Antworttexte. Der Rechtshinweis läuft bei 15 px auf dem Blau in
  Spalten von 46ch mit `hyphens: auto`.
- **Schlüssel** (Martian Mono 500, `clamp(11px,.85vw,12.5px)`, LS 0.08em,
  versal): Tafelbezeichnung, Verlagszeile, Legendenkopf, Formularbeschriftungen,
  Wochentagsköpfe, Bildunterschriften, Ziffern in der Zeichnung.
- **Zahl** (700, bis `clamp(56px,7vw,84px)` im Preisfeld, LS −0.04 bis −0.05em):
  Preise, Summen und Kennzahlen in Archivo mit `tabular-nums` über die Klasse
  `tf-zahl`.

### Named Rules

**Die Schlüsselschrift-Regel.** Martian Mono ist die Beschriftung der Tafel, nicht
ihr Text. Sie trägt Maße, Marken, Bezeichnungen und Ziffern in der Zeichnung —
immer klein, versal und gesperrt. Sie setzt nie eine Überschrift, nie einen Satz,
nie einen Preis. Große Zahlen sind Archivo mit Tabellenziffern.

**Die Regel ohne Label.** Über einer Überschrift steht nichts. Kein Eyebrow, kein
Kicker, keine Rubrik. Die Tafelbezeichnung („Tafel III · Der Alltag") steht unten
im Rand der Tafel, neben der Verlagszeile — so wie auf dem Schulwandbild.

**Die Enge-Regel.** Je größer der Grad, desto negativer die Laufweite: −0.02em im
Zitat, −0.03em im Titel, −0.038em in der Headline, −0.048em im Display. Überschriften
laufen immer mit `text-wrap: balance` und einer Zeichenbreite als Bremse.

## Layout

Die Seite ist eine **Tafelreihe**: eine Montageschiene oben (klebende Kopfleiste,
`min-height: 62px`, `{colors.blau-tief}`), darunter untereinander die Tafeln mit
`{spacing.reihe}` Abstand, am Fuß der Rechtshinweis frei auf dem Blau und die
Fußleiste als Verlagsvermerk.

Jede Tafel sitzt in einem Satzblock von maximal **1240 px** mit einem seitlichen
Rand von `{spacing.rand}`. Innerhalb des Blatts gilt der Satzspiegel
`{spacing.spiegel}`; die eingerückte Haarlinie (`1px rgba(23,25,28,.22)`, Rand
`clamp(9px,1.1vw,15px)`) markiert ihn sichtbar, unterhalb der 7 px hohen
Rußleiste.

Innerhalb der Tafeln gibt es **kein festes Spaltenraster**, sondern durchgehend
`repeat(auto-fit, minmax(min(100%, N), 1fr))` mit N zwischen 160 px (Kennzahlen)
und 320 px (Kopf der ersten Tafel). Der Umbruch entsteht dadurch von selbst; es
gibt keine Spalten-Breakpoints. Feste Verhältnisse kommen nur dort vor, wo der
Inhalt sie verlangt: die Zeichnung mit ihrer Legende steht
`minmax(0,1.55fr) / minmax(300px,1fr)`, der Kalender `repeat(7,1fr)`, der
Fortschritt `repeat(3,1fr)`, Straße/Nr. `3fr / 1fr`.

**Der eine Umbruchpunkt ist 860 px.** Darunter weicht die Kopfleiste dem
Menüschalter, und die Zeichnung schaltet von Randmarken mit Verweislinien auf
Ziffern direkt am Ankerpunkt um (die `viewBox` wechselt von `0 0 920 660` auf
`186 96 604 528`). Beide Umschaltungen sind über dieselbe Schwelle gebunden.

Rhythmus: Abstände sind fast durchgehend `clamp()`-Paare mit `vw` in der Mitte —
`{spacing.block}` zwischen Textblock und Bild/Tabelle, `{spacing.abschnitt}`
zwischen Überschrift und dem folgenden Raster. Tippziele sind mindestens
44 × 44 px; einzeln stehende Verweise spannen sie über `padding-block: .55rem`
mit ausgleichendem negativem `margin-block` auf, ohne den Satz zu verschieben.
Ankerziele tragen `scroll-margin-top: 76px`, damit die klebende Leiste nichts
verdeckt.

## Elevation & Depth

Die Welt ist **flach mit genau einer Ausnahme**: der Tafel selbst. Ein Blatt
Papier, das an einer Leiste vor einer Wand hängt, wirft einen Schatten — das ist
kein Effekt, sondern das Material. Alles, was **auf** dem Papier steht, bleibt
absolut flach: Preisfeld, Tabellen, Kalender, Formularfelder und Schaltflächen
haben keinen eigenen Schatten. Tiefe entsteht sonst ausschließlich aus der
Schichtung Blau → Rußleiste → Papier und aus Linienstärke (1 px Haarlinie,
1,5 px Trennung, 2 px Betonung, 3,4 px Gerätekontur).

### Shadow Vocabulary
- **Tafelschatten** (`box-shadow: 0 18px 40px -12px rgba(6,18,32,.55), 0 3px 8px -2px rgba(6,18,32,.4)`):
  der einzige Schatten des Systems. Zweistufig, nach unten versetzt, weich
  auslaufend und aus dem Blau des Grundes eingefärbt statt schwarz. Er gehört
  der Platte und keinem anderen Element.

### Named Rules

**Die Montage-Regel.** Nur das Tafelblatt wirft einen Schatten. Was auf dem Papier
gedruckt ist, kann nicht schweben: kein zweites Element auf dieser Route bekommt
ein `box-shadow`. Wenn etwas sich abheben soll, bekommt es eine Linie, eine
Farbe oder eine getönte Fläche — keinen Schatten.

**Die Grundfarbe-des-Schattens-Regel.** Schatten sind nie schwarz, sondern
`rgba(6,18,32,…)` — der Grund selbst, verdunkelt.

## Shapes

Die Tafel ist geschnittenes Papier, kein abgerundeter Kasten. Es gibt genau zwei
Radien: **0** für alles Gesetzte (Formularfelder, Bildrahmen, Tabellen,
Trennlinien) und **2 px** für Gegenstände, die eine Fase haben — Tafelblatt,
Schaltflächen, Preisfeld, Kalendertage, Zeitfenster, Menüschalter. Größere
Radien kommen nicht vor; der einzige Kreis der Seite ist die Abspieltaste des
Rundgangs, und die ist eine Marke, kein Container.

Die tragende Form ist die **Linie**, nicht die Fläche. Abschnitte werden mit
einer Oberkante eröffnet (`border-top`), nicht mit einer Umrandung geschlossen:
2 px Ruß für einen Block, 2 px Zinnober wenn er hervorgehoben ist, 1,5 px für die
Summenzeile, 1 px `rgba(23,25,28,.2)` für Listenzeilen. Ränder gibt es nur, wo
ein Gegenstand wirklich einen hat: das Preisfeld (2 px Zinnober, wie ein Stempel),
Bild und Video (1,5 px Ruß), die offene Schaltfläche (1 px, 40 % Knochen).

Formularfelder sind **beschriftete Zeilen**, keine Kästen: transparenter Grund,
nur eine 1,5 px Unterkante, die im Fokus auf Zinnober springt und die Fläche mit
`rgba(196,64,43,.05)` tönt.

## Components

### Buttons
- **Shape:** knappe Fase (2 px), Mindesthöhe 52 px, Innenmaß `.85em 1.7em`, 19 px, Gewicht 700, LS −0.015em.
- **Zinnober (Primär, auf dem Papier):** Zinnober-Fläche, Knochenschrift. Hover
  auf Zinnober tief; `:active` senkt um 1 px. Deaktiviert: `rgba(23,25,28,.3)`.
- **Chrom (Primär, auf dem Blau):** Chromgelb-Fläche, Rußschrift, Hover `#c98d1e`.
  Nur in Kopfleiste, Mobilmenü und anderen Flächen über dem Blau.
- **Linie (Sekundär, auf dem Papier):** transparent, Rußschrift, 1,5 px Rand
  `rgba(23,25,28,.35)`.
- **Offen (Sekundär, auf dem Blau):** transparent, Knochenschrift, 1 px Rand
  `rgba(237,229,214,.4)`, Hover `rgba(237,229,214,.1)`.
- **Fokus:** 2 px durchgezogener Ring mit 3 px Versatz — Zinnober innerhalb einer
  Tafel, Chromgelb außerhalb.
- **Ohne Zeigegerät:** Die Seite schaltet das Tap-Highlight global ab; als Ersatz
  staucht `:active` auf 0.985.

### Cards / Containers
Es gibt **keine Karten**. Der einzige Container ist die **Platte**: Knochenpapier,
2 px Fase, 7 px Rußleiste am Kopf, eingerückte Haarlinie als Satzspiegel, der
Tafelschatten, und unten im Rand eine Schlüsselzeile mit Tafelbezeichnung links
und „Fit-Inn Trier · seit 1996" rechts, getrennt durch 1 px `rgba(23,25,28,.18)`.
Innenmaß `{spacing.spiegel}`.

### Inputs / Fields
- **Style:** Zeile statt Kasten — transparent, Radius 0, 1,5 px Unterkante
  `rgba(23,25,28,.3)`, Innenmaß `12px 2px`. Schriftgröße **19 px erzwungen**
  (`!important`), weil die globale 16-px-Regel sonst den iOS-Safari-Zoom auslöst.
- **Label:** Schlüsselschrift in `{colors.matt-papier}`, über dem Feld.
- **Focus:** Unterkante auf Zinnober, Fläche auf `rgba(196,64,43,.05)`.
- **Invalid:** `:user-invalid` färbt die Unterkante Zinnober — erst nach der
  Eingabe, nicht beim ersten Blick.
- **Wahlflächen** (Kalendertag, Zeitfenster, Anrede): 2 px Fase, 1 px Rand in
  `rgba(23,25,28,.2)`, transparent; gewählt heißt Zinnober-Fläche mit
  Knochenschrift; Hover `rgba(196,64,43,.12)`.

### Navigation
Die Kopfleiste ist die **Montageschiene**, kein Logo-plus-Links-Baukasten: klebend,
`{colors.blau-tief}`, 1 px Unterkante `rgba(237,229,214,.16)`, Mindesthöhe 62 px.
Links der Reihenname in Schlüsselschrift (LS 0.1em) mit chromgelbem Zusatz,
rechts vier Ankerpunkte in 16 px `{colors.matt-blau}` und die chromgelbe
Schaltfläche. Unter 860 px ersetzt ein beschrifteter Schalter („Menü" /
„Schließen", SVG-Strichsymbol) die Punkte; das offene Menü ist eine gestapelte
Liste mit 19 px Knochenschrift, 1-px-Trennlinien und einem Telefonverweis am Fuß.
Die Fußleiste spiegelt die Schiene am unteren Ende.

### Der Aufriss mit Legende (Signaturkomponente)
Der Kern der Route. Ein SVG-Aufriss in Ruß auf dem Papier, mit Zinnober nur dort,
wo etwas geschieht (Bewegungsbahn auf dem Schirm, Datenweg als 7-7-Strichlinie,
Bolzen im Gewichtsblock). Sechs nummerierte Verweise laufen als
**Anker → Knick → Waagerechte** in eine eingekreiste Ziffer am Rand — so führen
echte Tafeln. Daneben die Legende: Zeilen mit 1-px-Oberkante, Schlüsselziffer in
Zinnober, Titel in 18,5 px/600 und Erläuterung in 16,5 px matt.

Verhalten: Beim ersten Sichtbarwerden zeichnen sich die Linien einmal über
`stroke-dashoffset` (1 s, `cubic-bezier(.16,1,.3,1)`, je Verweis 90 ms versetzt).
Danach ist die Legendenzeile ein **Schalter**: Hover, Fokus oder Klick setzt
`data-an="1"`, die zugehörige Linie wird 2,4 px zinnober, ihr Ankerpunkt wächst
auf r 8, alle anderen Verweise fallen auf `opacity: .24`. Unter 860 px entfallen
Randmarken und Linien; die Ziffern sitzen als zinnoberne Punkte direkt auf dem
Gerät.

### Das Preisfeld (Signaturkomponente)
Ein gestempelter Vermerk: 2 px Zinnober-Rand, 2 px Fase, max. 420 px. Der Betrag
in `clamp(56px,7vw,84px)` Zinnober mit LH 0.85, daneben die Einheit in 600.
Darunter die Bedingung mit Sternchen-Verweis, dann eine 1-px-Trennung und die
Folgebeiträge als `dt`/`dd`-Paare mit Tabellenziffern, zuletzt die Gültigkeit in
Schlüsselschrift.

## Do's and Don'ts

### Do:
- **Do** jede neue Fläche als **Tafel** bauen: Platte auf dem Blau, Titel ohne
  Label darüber, Tafelbezeichnung unten im Rand.
- **Do** die Zuständigkeitsregel befolgen: Zinnober auf Papier, Chromgelb auf Blau.
- **Do** Abschnitte mit einer Oberkante eröffnen (2 px Ruß, 2 px Zinnober für
  Betonung, 1 px `rgba(23,25,28,.2)` für Listenzeilen) statt sie zu umranden.
- **Do** Raster als `repeat(auto-fit, minmax(min(100%, N), 1fr))` schreiben, damit
  der Umbruch aus dem Inhalt kommt und nicht aus einem Breakpoint.
- **Do** Fließtext bei mindestens 17 px halten, Formularfelder bei 19 px, Tippziele
  bei mindestens 44 × 44 px.
- **Do** jede Bewegung an `prefers-reduced-motion: reduce` abschalten und Inhalte
  ohne JavaScript sichtbar lassen (verborgen wird erst, wenn das Skript übernimmt).
- **Do** Zahlen mit `tf-zahl` setzen, damit Spalten und Preise gleich breit laufen.

### Don't:
- **Don't** Zinnober auf dem Blau einsetzen — 2,4:1 ist unlesbar. Dort schreibt Chromgelb.
- **Don't** einem Element auf dem Papier einen Schatten geben. Der Tafelschatten
  gehört der Platte allein.
- **Don't** Karten bauen. Ein Container mit eigenem Hintergrund und Rundung auf
  dem Papier ist ein Fremdkörper; eine Zeile mit Oberkante tut dasselbe.
- **Don't** ein Label, einen Kicker oder ein Eyebrow über eine Überschrift setzen.
- **Don't** eine vierte Farbe einführen. Neue Zustände entstehen aus Deckkraft
  und Linienstärke derselben drei Druckfarben.
- **Don't** Martian Mono für Überschriften, Fließtext oder große Preise verwenden.
- **Don't** Radien über 2 px verwenden; Pillen und weiche Kästen gehören nicht
  in diese Welt.
- **Don't** eine zweite gestaltete Bewegung einführen. Der Verweis-Zeiger ist die
  eine; alles andere ist Erscheinen (0.8 s) oder Zustandswechsel (0.2–0.35 s).
- **Don't** diese Tokens auf `/`, `/ab-35`, `/fitnessstudio-trier` oder `/sommer`
  anwenden. Dort gilt die aktion5-Welt, die hier bewusst nicht beschrieben ist.
