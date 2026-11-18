'use client';
// Lädt das Google-Tag nach Einwilligung „Marketing“ und meldet Seitenaufrufe (auch bei Navigation innerhalb der Seite).
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { hasConsent, CONSENT_EVENT } from '@/lib/consent';
import { loadGoogleTag, googlePageView, revokeGoogleTag } from '@/lib/googleTag';

export default function GoogleTag() {
  const pathname = usePathname();
  const [on, setOn] = useState(false);

  useEffect(() => {
    const upd = () => { const v = hasConsent('marketing'); setOn(v); if (!v) revokeGoogleTag(); };
    upd();
    window.addEventListener(CONSENT_EVENT, upd);
    return () => window.removeEventListener(CONSENT_EVENT, upd);
  }, []);

  useEffect(() => {
    if (!on) return;
    loadGoogleTag();
    googlePageView();
  }, [on, pathname]);

  return null;
}
