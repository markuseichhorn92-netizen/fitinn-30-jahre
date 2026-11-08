import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Konfigurator from '@/components/konfigurator/Konfigurator';
import { whatsappHref } from '@/lib/whatsapp';
import wizard from '@/content/11-wizard.json';

// /konfigurator – ENTWURF (08.11.2026): Probetraining-Konfigurator im Look C. Nicht im Index, nicht im Menü.
// dryRun: es wird NICHTS in Magicline gebucht (Termine sind echt). Vor Livegang: dryRun entfernen und
// Einbindung auf den Seiten entscheiden (siehe outbox/probetraining-konfigurator/BEREIT.md).
const outfit = localFont({ src: '../../fonts/outfit.woff', weight: '100 900', display: 'swap' });

export const metadata: Metadata = {
  title: 'Stell dir dein Probetraining zusammen | Fit-Inn Trier',
  description: 'In einer Minute zu deinem Fit-Inn-Plan: Ziel wählen, Schwerpunkte festlegen, Termin buchen. Kostenlos und unverbindlich.',
  robots: { index: false, follow: false },
};

export default function Page() {
  const w = wizard as any;
  return (
    <main style={{ background: 'linear-gradient(180deg,#eaf4f6 0%,#f7fbfc 30%,#f4fafb 100%)', minHeight: '100vh', ['--fc-outfit' as any]: outfit.style.fontFamily }}>
      <header style={{ maxWidth: 720, margin: '0 auto', padding: '22px 16px 6px', fontFamily: `${outfit.style.fontFamily}, system-ui, sans-serif`, color: '#14252D' }}>
        <img src="/media/c/logo-petrol.png" alt="Fit-Inn Trier" width={112} height={34} style={{ height: 34, width: 'auto', display: 'block' }} />
        <h1 style={{ margin: '18px 0 8px', fontWeight: 800, fontSize: 'clamp(30px,8vw,46px)', lineHeight: 1.04, letterSpacing: '-.03em' }}>Stell dir dein Probetraining zusammen.</h1>
        <p style={{ margin: 0, fontSize: 17, lineHeight: 1.4, color: '#475467' }}>In einer Minute zu deinem Plan, mit Termin in Trier. Kostenlos und unverbindlich.</p>
      </header>
      <Konfigurator
        dryRun
        apiBaseUrl={w.apiBaseUrl}
        studioId={w.studioId}
        consentText={w.consentText}
        marketingText={w.marketingText}
        privacyHref={w.privacyHref}
        privacyLabel={w.privacyLabel}
        phoneDisplay={w.phoneDisplay}
        phoneHref={w.phoneHref}
        whatsappHref={whatsappHref(w.whatsappBase)}
        noteSource="Gebucht über Konfigurator"
        confirmHref={w.confirmHref}
      />
    </main>
  );
}
