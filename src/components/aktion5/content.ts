// Inhalte der 5-Euro-Aktion, die im Design als Platzhalter angelegt waren
// („[Betrag]“, „[Datum]“, „[Vorname], [Alter]“). Alles an einer Stelle, damit
// es vor dem Livegang in einem Rutsch gefüllt werden kann.
export const aktion = {
  /** Regulärer Wochenbeitrag nach den 12 Vorteilswochen, je nach Laufzeit. */
  wochenbeitrag: {
    einJahr: '12 €',
    zweiJahre: '9 €',
  },

  /** Letzter Tag der Aktion. */
  gueltigBis: '31.08.2026',

  /**
   * Mitglieder-Stimme: verbatim aus den Google-Bewertungen von Fit-Inn Trier
   * (dieselbe Quelle wie in components/sections/SocialProofSection.tsx).
   */
  stimme: {
    zitat: '„Ich bin von der Ausstattung, den Geräten und den Mitarbeitern maximal überzeugt.“',
    autor: 'Gisela T.',
    quelle: 'Google-Bewertung',
  },

  /** Rundgang-Video (im Design als Prop `rundgangVideoUrl` hinterlegt). */
  rundgangVideoId: 'C3CuSfV57jE',

  /**
   * Pflichtangaben zum Angebot, erscheint als Fußnote unter den Tarifen.
   * Achtung: Beträge und Datum stehen hier bewusst ausgeschrieben und werden
   * nicht aus den Feldern oben eingesetzt – der Text ist rechtlich geprüft und
   * soll nur als Ganzes geändert werden. Bei Preisänderungen also beides
   * anpassen: die Felder oben UND diesen Absatz.
   */
  rechtshinweis: [
    {
      t:
        'Das Angebot gilt für Mitgliedschaftsverträge, die bis zum 31.08.2026 neu abgeschlossen werden. ' +
        'Die ersten 12 Wochen der Mitgliedschaft kosten je 5 €. Danach beträgt der Beitrag 12 € pro Woche ' +
        'bei einer Laufzeit von 52 Wochen bzw. 9 € pro Woche bei einer Laufzeit von 104 Wochen. Die 12 ' +
        'Vorteilswochen sind Teil der vereinbarten Laufzeit und verlängern diese nicht. Daraus ergibt sich ' +
        'ein Gesamtbetrag von 540 € über 52 Wochen bzw. 888 € über 104 Wochen. Alle Preise verstehen sich ' +
        'inklusive der gesetzlichen Mehrwertsteuer. Hinzu kommt eine einmalige Aufnahmegebühr von 39 €. ' +
        'Der Einzug erfolgt in 14-tägigen Intervallen per SEPA-Lastschrift. Nach Ablauf der vereinbarten ' +
        'Laufzeit verlängert sich die Mitgliedschaft auf unbestimmte Zeit und kann jederzeit mit einer Frist ' +
        'von einem Monat gekündigt werden. Zum Ende der Erstlaufzeit ist eine Kündigung mit einer Frist von ' +
        '4 Wochen möglich. Das Angebot gilt nur für Neumitglieder, ist nicht mit anderen Aktionen oder ' +
        'Rabatten kombinierbar und nicht auf bestehende Verträge übertragbar. Mindestalter 18 Jahre. ' +
        'Es gelten unsere ',
    },
    { t: 'Allgemeinen Geschäftsbedingungen', href: 'https://fit-inn-trier.de/agbs-fit-inn-trier' },
    { t: ' und unsere ' },
    { t: 'Hausordnung', href: 'https://fit-inn-trier.de/hausordnung' },
    { t: '.' },
  ] as { t: string; href?: string }[],

  /**
   * Kontaktnummer der Kampagne. Bewusst getrennt von der Nummer im Impressum
   * und in den strukturierten Daten – dort steht weiterhin der Anschluss des
   * Studios in Trier.
   */
  telefon: { anzeige: '030 82 68 05 85', link: '+493082680585' },
  email: 'info@fit-inn-trier.de',
  adresse: 'Auf Hirtenberg 8 · 54296 Trier',
} as const
