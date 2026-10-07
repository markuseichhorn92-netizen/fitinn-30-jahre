// WhatsApp-Kontakt: reiner Link (wa.me), kein Widget, kein Skript. Vor dem Klick geht nichts an WhatsApp/Meta.
// Der Klick wird anonym im Trichter gezählt (Schritt „whatsapp“, Einstieg = Ort des Links).
import { funnel } from '@/lib/funnel';

export const WHATSAPP_TEXT = 'Hallo Fit-Inn, ich habe eine Frage zum Probetraining';

export function whatsappHref(base: string, text: string = WHATSAPP_TEXT) {
  return `${base}?text=${encodeURIComponent(text)}`;
}

export const countWhatsapp = (place: string) => funnel('whatsapp', place);
