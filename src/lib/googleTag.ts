// Google-Tag (GA4 „Fit-Inn Neue onepage“, dieselbe Property wie fit-inn-trier.de) mit Consent Mode v2.
// Lädt nur mit Einwilligung „Marketing“ (TDDDG § 25): ohne Okay kein Skript, kein Aufruf an Google.
// Consent Mode v2: Standard alles „denied“; nach dem Okay „granted“ (analytics_storage, ad_storage, ad_user_data, ad_personalization).
// gclid/UTM werden vom Tag aus der Adresse der Einstiegsseite gelesen (Seite lädt den Tag erst nach dem Klick auf das Banner, die Adresse ist dann noch dieselbe).
import { hasConsent } from './consent';

export const GA4_ID = 'G-Z8ZGP4RK08';
// Bestehende GA4-Ereignisse, die in Google Ads schon als Conversion-Aktion „Probetraining buchen“ hängen.
export const GA4_BOOKING_EVENT = 'ads_conversion_Termin_vereinbaren_2';
// Google-Ads-Konto 790-843-3809: eigene Conversion-Aktion „Probetraining gebucht“ (Website, Lead, primär; angelegt 20.11.2026).
// Die GA4-Import-Aktion „Probetraining buchen“ ist seitdem sekundär, damit nichts doppelt zählt.
export const ADS_ID = 'AW-16623457481';
export const ADS_BOOKING_SEND_TO = 'AW-16623457481/lMzBCJndrbwdEMmp1_Y9';
let loaded = false;

function gtag(..._args: unknown[]) {
  const w = window as any;
  (w.dataLayer = w.dataLayer || []).push(arguments); // gtag.js erwartet das Arguments-Objekt, kein Array
}

export function loadGoogleTag() {
  if (typeof window === 'undefined' || loaded || !hasConsent('marketing')) return;
  loaded = true;
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.gtag = gtag;
  gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied', wait_for_update: 500 });
  gtag('js', new Date());
  gtag('consent', 'update', { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted' });
  gtag('config', GA4_ID, { send_page_view: false });
  gtag('config', ADS_ID); // Conversion-Linker: übernimmt gclid/gbraid/wbraid aus der Adresse (wird bis /konfigurator weitergereicht)
  const s = document.createElement('script');
  s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(s);
}

// Widerruf (Banner → „Nur notwendige“): Tag stoppt sofort, Einwilligung zurück auf „denied“.
export function revokeGoogleTag() {
  if (!loaded) return;
  gtag('consent', 'update', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' });
}

export function googlePageView() {
  if (!loaded || !hasConsent('marketing')) return;
  gtag('event', 'page_view', { page_location: window.location.href, page_path: window.location.pathname, page_title: document.title });
}

// Erfolgreich gebuchtes Probetraining. Keine Personendaten, nur Seite und Einstieg.
export function googleLead(source: string, eventId?: string) {
  if (!hasConsent('marketing')) return;
  loadGoogleTag();
  const p = { content_name: 'Probetraining', page_path: window.location.pathname, source: String(source).slice(0, 24) };
  gtag('event', GA4_BOOKING_EVENT, p);
  gtag('event', 'probetraining_gebucht', p);
  gtag('event', 'conversion', { send_to: ADS_BOOKING_SEND_TO, ...(eventId ? { transaction_id: eventId } : {}) });
}
