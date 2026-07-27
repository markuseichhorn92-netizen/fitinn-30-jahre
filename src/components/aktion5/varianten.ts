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
  }
  warum: { these: string; pointe: string; text: string }
  alltag: { eyebrow: string; punkte: { nr: string; titel: string }[] }
  /** Dritter Schritt in „So beginnt es“. */
  ablaufBegleitung: string
  fragen: {
    headline: string
    items: { frage: string; antwort: string; offen?: boolean }[]
  }
  stimme: { zitat: string; autor: string; quelle: string; bild: string; bildAlt: string }
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
      'Die Jahre, die zählen: zwölf Wochen für je 5 € im FIT-INN Trier. Familiengeführt seit 1996, Betreuung mit Namen, über 100 TechnoGym-Geräte. Probetraining kostenlos und unverbindlich.',
  },
  hero: {
    eyebrow: 'Sommer 2026 · Fit-Inn Trier',
    zeile1: 'Die Jahre,',
    zeile2: 'die zählen.',
    subline: 'Stark, beweglich und selbstbestimmt älter werden.',
    preiszeile: 'Ab 5 € die Woche.',
    bild: '/aktion5/hero.webp',
    bildAlt: 'Lächelnde Frau nach dem Training im Fit-Inn Trier',
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
    bild: '/aktion5/stimme.webp',
    bildAlt: 'Porträt eines Mitglieds im Fit-Inn Trier',
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
    // TODO: eigenes Motiv für die Zielgruppe ab 35 hinterlegen.
    bild: '/aktion5/hero.webp',
    bildAlt: 'Training im Fit-Inn Trier',
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
    zitat: '„Hier macht’s richtig Spaß zu trainieren. Es gibt alles was man braucht. Die Geräte sind total modern.“',
    autor: 'Chris Petry',
    quelle: 'Google-Bewertung',
    // TODO: eigenes Motiv für die Zielgruppe ab 35 hinterlegen.
    bild: '/aktion5/stimme.webp',
    bildAlt: 'Porträt eines Mitglieds im Fit-Inn Trier',
  },
}
