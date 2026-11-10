import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Konfigurator from '@/components/konfigurator/Konfigurator';
import { whatsappHref } from '@/lib/whatsapp';
import wizard from '@/content/11-wizard.json';

// /konfigurator – Probetraining-Konfigurator im Look C (echte Magicline-Buchung). Nicht im Index, nicht im Menü.
// Einstieg von /freunde und /black-week über ?q=… (nur diese Werte): bestimmt Quelle (Trichter) und Hinweis-Text in Magicline.
const outfit = localFont({ src: '../../fonts/outfit.woff', weight: '100 900', display: 'swap' });

export const metadata: Metadata = {
  title: 'Probetraining buchen | Fit-Inn Trier',
  description: 'Termin wählen, fünf Angaben, fertig. Kostenlos und unverbindlich.',
  robots: { index: false, follow: false },
};

const QUELLEN: Record<string, { source: string; note: string }> = {
  freunde: { source: 'freunde', note: 'Gebucht über Konfigurator (Freunde werben)' },
  'black-week': { source: 'black-week', note: 'Gebucht über Konfigurator (Black Week 2026)' },
};

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const w = wizard as any;
  const q = (await searchParams).q;
  const quelle = QUELLEN[String(Array.isArray(q) ? q[0] : q || '')];
  return (
    <main style={{ background: 'linear-gradient(180deg,#eaf4f6 0%,#f7fbfc 30%,#f4fafb 100%)', minHeight: '100vh', ['--fc-outfit' as any]: outfit.style.fontFamily }}>
      <header style={{ maxWidth: 720, margin: '0 auto', padding: '22px 16px 6px', fontFamily: `${outfit.style.fontFamily}, system-ui, sans-serif`, color: '#14252D' }}>
        <img src="/media/c/logo-petrol.png" alt="Fit-Inn Trier" width={112} height={34} style={{ height: 34, width: 'auto', display: 'block' }} />
        <h1 style={{ margin: '18px 0 8px', fontWeight: 800, fontSize: 'clamp(30px,8vw,46px)', lineHeight: 1.04, letterSpacing: '-.03em' }}>Buch dein Probetraining.</h1>
        <p style={{ margin: 0, fontSize: 17, lineHeight: 1.4, color: '#475467' }}>Termin wählen, fünf Angaben, fertig. Kostenlos und unverbindlich.</p>
      </header>
      <Konfigurator
        apiBaseUrl={w.apiBaseUrl}
        studioId={w.studioId}
        consentText={w.consentText}
        marketingText={w.marketingText}
        privacyHref={w.privacyHref}
        privacyLabel={w.privacyLabel}
        phoneDisplay={w.phoneDisplay}
        phoneHref={w.phoneHref}
        whatsappHref={whatsappHref(w.whatsappBase)}
        source={quelle?.source}
        noteSource={quelle?.note || 'Gebucht über Konfigurator'}
        confirmHref={w.confirmHref}
      />
    </main>
  );
}
