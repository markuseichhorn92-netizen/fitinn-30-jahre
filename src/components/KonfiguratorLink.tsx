'use client';
// Ersetzt den alten Probetraining-Dialog: alle Buttons, die 'fi:book' senden, führen auf den Konfigurator.
// q = Einstiegsseite (freunde, black-week), steuert Quelle und Hinweis-Text der Buchung auf /konfigurator.
import { useEffect } from 'react';
import * as interest from '@/lib/interest';

export default function KonfiguratorLink({ q }: { q: string }) {
  useEffect(() => {
    const onBook = (e: Event) => {
      const src = String((e as CustomEvent).detail?.source || 'form');
      interest.reportBooking('start', src);
      window.location.assign(`/konfigurator?q=${encodeURIComponent(q)}`);
    };
    window.addEventListener('fi:book', onBook);
    return () => window.removeEventListener('fi:book', onBook);
  }, [q]);
  return null;
}
