// Inhalte der 5-Euro-Aktion, die im Design als Platzhalter angelegt waren
// („[Betrag]“, „[Datum]“, „[Vorname], [Alter]“). Alles an einer Stelle, damit
// es vor dem Livegang in einem Rutsch gefüllt werden kann.
export const aktion = {
  /**
   * Angebots-Zeile: im Design als Platzhalter „[Betrag]“ angelegt.
   * TODO: Betrag eintragen. (Das FAQ desselben Designs nennt 24,90 € –
   * beim Füllen bitte beide Stellen angleichen.)
   */
  regulaererWochenbeitrag: '[Betrag]',

  /** FAQ-Antwort: nennt den Betrag im Design bereits konkret. */
  regulaererWochenbeitragFaq: '24,90 €',

  /** TODO: Enddatum der Aktion eintragen (im Design nur als „[Datum]“ angelegt). */
  gueltigBis: '[Datum]',

  /** TODO: echtes Mitglied + schriftliche Freigabe für Zitat, Vorname, Alter und Foto. */
  stimme: {
    zitat: '„Ich kann meine Einkäufe wieder allein tragen und die Treppe macht mir keine Angst mehr.“',
    vorname: '[Vorname]',
    alter: '[Alter]',
  },

  /** Rundgang-Video (im Design als Prop `rundgangVideoUrl` hinterlegt). */
  rundgangVideoId: 'C3CuSfV57jE',

  telefon: { anzeige: '0651 30 85 24', link: '+49651308524' },
  email: 'info@fit-inn-trier.de',
  adresse: 'Auf Hirtenberg 8 · 54296 Trier',
} as const
