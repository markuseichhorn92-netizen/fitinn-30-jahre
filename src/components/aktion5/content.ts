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

  telefon: { anzeige: '0651 30 85 24', link: '+49651308524' },
  email: 'info@fit-inn-trier.de',
  adresse: 'Auf Hirtenberg 8 · 54296 Trier',
} as const
