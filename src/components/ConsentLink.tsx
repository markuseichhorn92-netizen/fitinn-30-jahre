'use client';
// „Cookie-Einstellungen“ für Fußzeilen ohne den Footer-Baustein (10-footer): öffnet die Einstellungen (Widerruf so leicht wie die Einwilligung, Art. 7 Abs. 3 DSGVO).
import { openConsent } from '@/lib/consent';

export default function ConsentLink({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <button type="button" className={className} style={{ padding: 0, border: 0, background: 'none', font: 'inherit', color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 2, cursor: 'pointer', ...style }} onClick={openConsent}>
      Cookie-Einstellungen
    </button>
  );
}
