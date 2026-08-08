# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Menschen aus Trier und Umgebung, die eine Mitgliedschaft in einem Fitnessstudio
erwägen. Drei Gruppen, für die es bereits eigene Seiten gibt:

- **Ab 50** (Startseite `/`): oft nach längerer Trainingspause, teils nie
  trainiert. Sorge, zu alt, zu unfit oder fehl am Platz zu sein. Motiv ist
  Selbstständigkeit im Alltag, nicht Aussehen.
- **Ab 35** (`/ab-35`): Job und Familie gleichzeitig, Rücken meldet sich, Zeit
  ist der Engpass. Motiv ist Belastbarkeit.
- **Suchende ohne Altersfilter** (`/fitnessstudio-trier`, Google Ads): kommen
  über eine Suchanfrage. Wollen wissen, wo das Studio ist, was drin ist, was es
  kostet und ob sie es vorher ansehen können.

Alle entscheiden in einer verunsicherten Lage: Der Vertrag bindet ein bis zwei
Jahre, und viele haben schlechte Erfahrungen mit Ketten gemacht.

## Product Purpose

Fit-Inn Trier ist ein Fitnessstudio in Trier-Feyen, Auf Hirtenberg 8. Die
Website hat eine Aufgabe: kostenlose, unverbindliche Probetrainings buchen
lassen. Alles andere ist Mittel zum Zweck. Erfolg ist eine abgeschlossene
Terminbuchung im Kalender, nicht Verweildauer.

## Positioning

Familiengeführt seit 1996, kein Franchise. Zwei Dinge kann kein
Nachbarangebot in Trier gleichzeitig behaupten:

1. **Betreuung mit Namen.** Dieselben Menschen seit Jahren, sie kennen die
   Mitglieder persönlich.
2. **Ausschließlich computergesteuerte Premiumgeräte von TechnoGym.** Die
   Geräte erkennen das Mitglied, stellen Sitz, Hebel und Gewicht selbst ein,
   führen die Bewegung über den Bildschirm und protokollieren jede Einheit in
   den Trainingsplan.

Der zweite Punkt ist der eigentliche USP und trägt beide Zielgruppen: Für
Wiedereinsteiger nimmt er die Angst, etwas falsch zu machen; für Vielbeschäftigte
spart er die Zeit des Einstellens und Notierens.

## Operating Context

Die Entscheidung fällt meist am Handy, abends, nach einem Auslöser (Arzttermin,
Rückenschmerz, Foto, Jahreswechsel). Zwischen Seitenaufruf und Studiobesuch
liegen oft Tage. Die Buchung läuft über Magicline (Sport Alliance Solutions
GmbH); der Termin landet direkt im Studiokalender, das Team sieht ihn ohne
Zwischenschritt. Sonntags ist geschlossen.

## Capabilities and Constraints

**Die 5-Euro-Aktion 2026** (Stand dieser Datei, Quelle:
`src/components/aktion5/content.ts`):

- Die ersten 12 Wochen kosten je 5 €.
- Danach 12 € pro Woche bei 52 Wochen Laufzeit, 9 € pro Woche bei 104 Wochen.
- Die 12 Vorteilswochen sind Teil der Laufzeit und verlängern sie nicht.
  Gesamtbetrag 540 € über 52 Wochen bzw. 888 € über 104 Wochen.
- Einmalige Aufnahmegebühr 39 €. Einzug 14-tägig per SEPA-Lastschrift.
- Neuabschlüsse bis 31.08.2026. Nur Neumitglieder, nicht kombinierbar,
  nicht übertragbar. Mindestalter 18 Jahre.
- Nach der Erstlaufzeit unbefristet, kündbar mit einem Monat Frist; zum Ende der
  Erstlaufzeit mit 4 Wochen Frist.

Der Rechtshinweis in `content.ts` ist geprüft und wird **nur als Ganzes**
geändert. Preise und Datum stehen dort ausgeschrieben und müssen bei Änderungen
zusätzlich zu den Einzelfeldern angepasst werden.

**Leistungen:** mehrere Trainingsbereiche (Kraft, Cardio, Freihantel),
Cardio-Entertainment, Gesundheits-Check-up mit Körperanalyse, digitale
Trainingspläne in der App, Stoffwechsel-Coaching, Mineralgetränke inklusive,
Duschen, Umkleiden, WLAN.

**Coach Premium ist ein App-Angebot**, kein Personal Training vor Ort. Das muss
auf jeder Fläche klar bleiben — hier ist schon einmal ein Missverständnis
entstanden.

**Technisch:** Next.js 16 (App Router, Turbopack), React 19, TypeScript,
Tailwind 4, Vercel. GA4 `G-Z8ZGP4RK08` hinter Google Consent Mode v2, gesteuert
über den eigenen Cookie-Banner. Buchung über `/api/trialsession` an die
Magicline-Connect-API (studioId 1210005460). Magicline verlangt zwingend:
Vorname, Nachname, E-Mail, Telefon, Geschlecht, Geburtsdatum sowie Straße,
Hausnummer, PLZ, Ort und Land.

**Offen:** Meta-Pixel-ID und Google-Ads-Conversion-ID liegen noch nicht vor.

## Brand Commitments

- Name: **Fit-Inn Trier**. Logo unter `public/aktion5/logo-white.png`.
- Ansprache durchgehend im Du, deutsch, ohne Fachjargon und ohne Drill-Ton.
  Kein Wettbewerb, kein Körperkult, keine Vorher-Nachher-Rhetorik.
- KI-generierte Motive werden sichtbar als solche gekennzeichnet
  (`src/components/aktion5/KiHinweis.tsx`).

## Evidence on Hand

**Echt und belegt:**

- Google-Bewertungen, wörtlich: Gisela T. („Ich bin von der Ausstattung, den
  Geräten und den Mitarbeitern maximal überzeugt."), Jana Thielen („Super
  gepflegte Geräte, nette Leute, angenehme Atmosphäre, Duschen + Getränke
  top."), Thomas Müller („Angenehmes Training, nette Menschen. Die neuen Geräte
  von Technogym sind super.")
- Über 7.000 Mitglieder, über 250 positive Bewertungen, seit 1996 in
  Familienhand. Für Sauberkeit wird das Studio am häufigsten gelobt.
- Studiofotos: `public/studio-1.avif`, `public/studio-2.avif` (echte Aufnahmen
  der Trainingsfläche).
- Rundgang-Video: YouTube `C3CuSfV57jE`.
- Kontakt: 0651 30 85 24, info@fit-inn-trier.de.

**Nicht vorhanden, darf nicht erfunden werden:** Mitgliederfotos mit
Einverständnis, Trainerporträts, Namen des Teams, Erfolgszahlen einzelner
Mitglieder, Messwerte, Auszeichnungen. Die Behauptung, TechnoGym statte die
Olympischen Spiele aus, steht derzeit auf der Startseite und ist **nicht
gegengeprüft**.

## Product Principles

1. **Die Buchung ist das Produkt.** Jede Fläche wird daran gemessen, ob sie zu
   einem Termin führt.
2. **Zeigen, nicht behaupten.** Das Studio hat echte Geräte, echte Bewertungen,
   ein echtes Video. Adjektive ersetzen keinen Beleg.
3. **Die Angst zuerst nehmen.** Vor jedem Kaufargument steht der Satz, der
   jemandem die Sorge nimmt, hier fehl am Platz zu sein.
4. **Preise ohne Kleingedrucktes-Gefühl.** Der Gesamtbetrag und die Bindung
   stehen sichtbar, nicht nur in der Fußnote.
5. **Familiengeführt heißt persönlich.** Kein Ton, den auch eine Kette
   sprechen könnte.

## Accessibility & Inclusion

Die Hauptzielgruppe ist 50+ und liest am Handy. Bindend:

- Fließtext nicht unter 17 px, Formularfelder mindestens 19 px (verhindert den
  Zoom-Sprung in iOS Safari).
- Tippziele mindestens 44 × 44 px.
- Kontraste nach WCAG AA; die drei bestehenden Aktionsseiten sind aktuell
  frei von axe-Verstößen und sollen es bleiben.
- `prefers-reduced-motion` wird respektiert: keine selbsttätig laufenden Videos,
  keine Bewegung ohne Ausweg.
