import { aktion } from './content'

// Die 5-Euro-Aktion läuft für zwei Zielgruppen mit identischem Design und
// identischem Angebot – nur die Ansprache unterscheidet sich. Alles, was sich
// zwischen den Seiten ändert, steht hier; alles andere ist in den Sektionen
// gleich und existiert nur einmal.

export type Variante = {
  /** Route der Seite (für Metadaten und Sitemap). */
  pfad: string
  meta: { titel: string; beschreibung: string }
  hero: {
    eyebrow: string
    zeile1: string
    zeile2: string
    subline: string
    preiszeile: string
    bild: string
    bildAlt: string
    /** object-position des Hero-Bilds, Standard: 'center 22%'. */
    bildPos?: string
    /** Blendet die Plakette „KI-generiert“ über dem Bild ein. */
    kiGeneriert?: boolean
  }
  warum: { these: string; pointe: string; text: string }
  alltag: { eyebrow: string; punkte: { nr: string; titel: string }[] }
  /** Dritter Schritt in „So beginnt es“. */
  ablaufBegleitung: string
  fragen: {
    headline: string
    items: { frage: string; antwort: string; offen?: boolean }[]
  }
  stimme: {
    zitat: string
    autor: string
    quelle: string
    bild: string
    bildAlt: string
    /** object-position des Bilds, Standard: 'center 10%'. */
    bildPos?: string
  }
}

/** Antwort auf die Preisfrage – für beide Zielgruppen dieselbe Aktion. */
const preisAntwort =
  `Nach den 12 Vorteilswochen gilt der reguläre Wochenbeitrag: ${aktion.wochenbeitrag.einJahr} pro Woche ` +
  `bei einem Jahr Laufzeit, ${aktion.wochenbeitrag.zweiJahre} pro Woche bei zwei Jahren.`

// ─── Startseite · ab 50 ───────────────────────────────────────────────────────
export const ab50: Variante = {
  pfad: '/',
  meta: {
    titel: '5-Euro-Aktion FIT-INN Trier — Stark, beweglich und selbstbestimmt älter werden',
    beschreibung:
      'Die Jahre, die zählen: zwölf Wochen für je 5 € im FIT-INN Trier. Familiengeführt seit 1996, Betreuung mit Namen, computergesteuerte Premiumgeräte von TechnoGym. Probetraining kostenlos und unverbindlich.',
  },
  hero: {
    eyebrow: 'Sommer 2026 · Fit-Inn Trier',
    zeile1: 'Die Jahre,',
    zeile2: 'die zählen.',
    subline: 'Stark, beweglich und selbstbestimmt älter werden.',
    preiszeile: 'Ab 5 € die Woche.',
    bild: '/aktion5/hero.webp',
    bildAlt: 'Lächelnde Frau nach dem Training im Fit-Inn Trier',
    kiGeneriert: true,
  },
  warum: {
    these: 'Ab 50 verlieren wir jedes Jahr Muskelkraft.',
    pointe: 'Wenn wir nichts tun.',
    text:
      'Die gute Nachricht: Dieser Prozess lässt sich in fast jedem Alter umkehren. Kraft, Balance und ' +
      'Beweglichkeit halten dich selbstständig, aktiv und unabhängig.',
  },
  alltag: {
    eyebrow: 'Was das im Alltag heißt',
    punkte: [
      { nr: '01', titel: 'Einkäufe wieder selbst tragen' },
      { nr: '02', titel: 'Treppen ohne Pause nehmen' },
      { nr: '03', titel: 'Mit den Enkeln mithalten' },
    ],
  },
  ablaufBegleitung: 'Fachkundige Betreuung von Menschen, die wissen, worauf es ab 50 ankommt.',
  fragen: {
    headline: 'Bin ich zu alt dafür?',
    items: [
      {
        frage: 'Nein – du bist genau richtig.',
        antwort:
          'Viele unserer Mitglieder starten nach einer langen Pause. Wir beginnen genau da, wo du stehst – ohne Wettbewerb, ohne Druck.',
        offen: true,
      },
      { frage: 'Was kostet es nach der Aktion?', antwort: preisAntwort },
      {
        frage: 'Muss ich mich sofort entscheiden?',
        antwort: 'Nein. Komm erst einmal unverbindlich vorbei und lern uns kennen.',
      },
      {
        frage: 'Werde ich betreut?',
        antwort: 'Ja. Jede Mitgliedschaft startet mit einem persönlichen Gespräch und einer Einweisung.',
      },
    ],
  },
  stimme: {
    zitat: '„Ich bin von der Ausstattung, den Geräten und den Mitarbeitern maximal überzeugt.“',
    autor: 'Gisela T.',
    quelle: 'Google-Bewertung',
    bild: '/studio-2.avif',
    bildAlt: 'Trainingsbereich mit Geräten von TechnoGym im Fit-Inn Trier',
    bildPos: 'center 55%',
  },
}

// ─── Unterseite · ab 35 ───────────────────────────────────────────────────────
export const ab35: Variante = {
  pfad: '/ab-35',
  meta: {
    titel: '5-Euro-Aktion ab 35 — Stark durch Job, Familie und Alltag',
    beschreibung:
      'Zwölf Wochen für je 5 € im FIT-INN Trier. Zwei Einheiten pro Woche genügen, um Kraft und Rücken zu halten – mit einem Plan, der in einen vollen Alltag passt. Probetraining kostenlos und unverbindlich.',
  },
  hero: {
    eyebrow: 'Sommer 2026 · Fit-Inn Trier',
    zeile1: 'Jetzt,',
    zeile2: 'nicht irgendwann.',
    subline: 'Stark durch Job, Familie und alles dazwischen.',
    preiszeile: 'Ab 5 € die Woche.',
    bild: '/aktion5/hero-ab35.webp',
    bildAlt: 'Lachendes Paar nach dem Training im Park',
    kiGeneriert: true,
  },
  warum: {
    these: 'Ab 35 baut der Körper jedes Jahr Muskeln ab.',
    pointe: 'Wenn wir nichts tun.',
    text:
      'Die gute Nachricht: Zwei Einheiten pro Woche genügen, um das umzukehren. Kraft und Beweglichkeit ' +
      'sind das, was dich durch lange Tage trägt – im Büro, mit den Kindern, im Kopf.',
  },
  alltag: {
    eyebrow: 'Was das im Alltag heißt',
    punkte: [
      { nr: '01', titel: 'Der Rücken hält den Bürotag aus' },
      { nr: '02', titel: 'Abends noch Kraft für die Kinder' },
      { nr: '03', titel: 'Kopf frei nach Feierabend' },
    ],
  },
  ablaufBegleitung: 'Fachkundige Betreuung von Menschen, die wissen, wie Training in einen vollen Alltag passt.',
  fragen: {
    headline: 'Ich habe doch keine Zeit.',
    items: [
      {
        frage: 'Zweimal die Woche genügen.',
        antwort:
          'Zwei Einheiten pro Woche halten Kraft und Beweglichkeit. Wir bauen dir einen Plan, der in deinen Alltag passt – nicht umgekehrt.',
        offen: true,
      },
      { frage: 'Was kostet es nach der Aktion?', antwort: preisAntwort },
      {
        frage: 'Muss ich mich sofort entscheiden?',
        antwort: 'Nein. Komm erst einmal unverbindlich vorbei und lern uns kennen.',
      },
      {
        frage: 'Ich war lange nicht mehr im Studio.',
        antwort:
          'Genau dafür ist die Einweisung da. Wir beginnen da, wo du stehst – an Geräten, die sich selbst einstellen.',
      },
    ],
  },
  stimme: {
    zitat: '„Super gepflegte Geräte, nette Leute, angenehme Atmosphäre, Duschen + Getränke top.“',
    autor: 'Jana Thielen',
    quelle: 'Google-Bewertung',
    bild: '/studio-2.avif',
    bildAlt: 'Trainingsbereich mit Geräten von TechnoGym im Fit-Inn Trier',
    bildPos: 'center 55%',
  },
}

// ─── Unterseite · Google Ads ──────────────────────────────────────────────────
// Bei Google lässt sich das Alter nicht zuverlässig steuern – diese Fassung
// spricht deshalb niemanden über sein Alter an, sondern über die Suchabsicht:
// Wo ist das Studio, was steckt drin, was kostet es, kann ich es ansehen?
// Als Motive echte Aufnahmen der Trainingsfläche statt Personenfotos.
export const googleAds: Variante = {
  pfad: '/fitnessstudio-trier',
  meta: {
    titel: 'Fitnessstudio in Trier — 12 Wochen für je 5 € bei FIT-INN',
    beschreibung:
      'Fitnessstudio in Trier-Feyen: familiengeführt seit 1996, computergesteuerte Premiumgeräte von TechnoGym, Betreuung mit Namen. Die ersten 12 Wochen für je 5 €. Probetraining kostenlos und unverbindlich buchen.',
  },
  hero: {
    eyebrow: 'Trier-Feyen · seit 1996',
    zeile1: 'Dein Studio',
    zeile2: 'in Trier.',
    subline: 'Computergesteuerte TechnoGym-Geräte, Betreuung mit Namen, seit 1996.',
    preiszeile: 'Ab 5 € die Woche.',
    bild: '/studio-1.avif',
    bildAlt: 'Trainingsfläche mit TechnoGym-Geräten im Fit-Inn Trier',
    bildPos: 'center 62%',
  },
  warum: {
    these: 'Der beste Zeitpunkt anzufangen war gestern.',
    pointe: 'Der zweitbeste ist heute.',
    text:
      'Kraft, Ausdauer und Beweglichkeit lassen sich in jedem Alter aufbauen. Entscheidend ist nicht, wie fit ' +
      'du heute bist – sondern dass du anfängst. Den Rest zeigen wir dir.',
  },
  alltag: {
    eyebrow: 'Was das im Alltag heißt',
    punkte: [
      { nr: '01', titel: 'Ein Rücken, der mitmacht' },
      { nr: '02', titel: 'Mehr Energie, den ganzen Tag' },
      { nr: '03', titel: 'Ein Körper, dem du vertraust' },
    ],
  },
  ablaufBegleitung: 'Fachkundige Betreuung von Menschen, die dich beim Namen kennen – vom ersten Tag an.',
  fragen: {
    headline: 'Passt das zu mir?',
    items: [
      {
        frage: 'Ja – egal, wo du gerade stehst.',
        antwort:
          'Ob Wiedereinstieg nach Jahren oder das erste Mal überhaupt: Wir beginnen genau da, wo du stehst. Mit Einweisung an jedem Gerät, ohne Wettbewerb.',
        offen: true,
      },
      { frage: 'Was kostet es nach der Aktion?', antwort: preisAntwort },
      {
        frage: 'Kann ich mir das Studio vorher ansehen?',
        antwort:
          'Ja. Komm zum kostenlosen Probetraining vorbei – wir zeigen dir alles in Ruhe und beantworten deine Fragen.',
      },
      {
        frage: 'Muss ich mich sofort entscheiden?',
        antwort: 'Nein. Das Probetraining ist unverbindlich und kostet dich nichts.',
      },
    ],
  },
  stimme: {
    zitat: '„Angenehmes Training, nette Menschen. Die neuen Geräte von Technogym sind super.“',
    autor: 'Thomas Müller',
    quelle: 'Google-Bewertung',
    bild: '/studio-2.avif',
    bildAlt: 'Trainingsbereich mit Geräten von TechnoGym im Fit-Inn Trier',
    bildPos: 'center 55%',
  },
}
