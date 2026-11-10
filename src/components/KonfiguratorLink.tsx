'use client';
// Ersetzt den alten Probetraining-Dialog: alle Buttons, die 'fi:book' senden, führen auf den Konfigurator.
// q = Einstiegsseite (freunde, black-week), steuert Quelle und Hinweis-Text der Buchung auf /konfigurator.
import { useEffect } from 'react';
import * as interest from '@/lib/interest';
import { motivAusUrl } from '@/lib/absprung';
import { funnel } from '@/lib/funnel';

export default function KonfiguratorLink({ q }: { q: string }) {
  useEffect(() => {
    const onBook = (e: Event) => {
      const src = String((e as CustomEvent).detail?.source || 'form');
      interest.reportBooking('start', src);
      // Anzeigen-Motiv (nur bekannte Werte) wird in der Adresse mitgegeben, damit der Konfigurator es je Schritt zählen kann – ohne Speichern.
      const c = motivAusUrl();
      funnel('from_open', c);
      window.location.assign(`/konfigurator?q=${encodeURIComponent(q)}${c === 'direkt' ? '' : `&c=${encodeURIComponent(c)}`}`);
    };
    window.addEventListener('fi:book', onBook);
    return () => window.removeEventListener('fi:book', onBook);
  }, [q]);
  return <span hidden data-konfigurator-link={q} />;
}
