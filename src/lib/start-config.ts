// Konfiguration für /start (Ziel des QR „Apps laden“ am Studio-TV).
// Store-Links geprüft am 27.10.2026 (Seitentitel/Entwickler im Store, siehe outbox/tv-qr-karte/START-SEITE.md).

export type StoreApp = {
  /** Anzeigename, z. B. „Fit-Inn-App“ */
  name: string;
  /** Kurzer, sachlicher Satz, wofür die App da ist */
  text: string;
  /** Vollständiger App-Store-Link (https://apps.apple.com/de/app/…/id…) */
  ios: string;
  /** Vollständiger Google-Play-Link (https://play.google.com/store/apps/details?id=…) */
  android: string;
};

export const technogymApp: StoreApp = {
  name: 'Technogym-App',
  text: 'Trainingsplan, Training und Anmeldung an den Geräten.',
  // Studio-Link von Technogym (verbindet die App direkt mit dem Fit-Inn), leitet selbst in den passenden Store.
  ios: 'https://tgapp-link.mywellness.com/cc8c1dd38',
  android: 'https://tgapp-link.mywellness.com/cc8c1dd38',
};

// Eigene Fit-Inn-App: solange null, ist die Karte auf /start unsichtbar.
// Später eintragen, z. B.:
// export const fitInnApp: StoreApp | null = {
//   name: 'Fit-Inn-App',
//   text: 'Kurse, Öffnungszeiten und Neuigkeiten aus dem Studio.',
//   ios: 'https://apps.apple.com/de/app/…/id…',
//   android: 'https://play.google.com/store/apps/details?id=…',
// };
export const fitInnApp: StoreApp | null = {
  name: 'Fit-Inn-App',
  text: 'Mitgliedschaft, Check-in, Punkte, Prämien und Termine – alles in deiner App.',
  ios: 'https://apps.apple.com/de/app/fit-inn-trier/id6819301763',
  android: 'https://play.google.com/store/apps/details?id=de.fitinntrier.app',
};

export const wlan = { ssid: 'Fit-Inn Mitglieder' };
