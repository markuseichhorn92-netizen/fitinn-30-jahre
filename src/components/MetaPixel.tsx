'use client';
// Lädt den Meta Pixel nach Einwilligung „Marketing“ und meldet Seitenaufrufe (auch bei Navigation innerhalb der Seite).
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { hasConsent, CONSENT_EVENT } from '@/lib/consent';
import { loadMetaPixel, metaPageView } from '@/lib/metaPixel';

export default function MetaPixel() {
  const pathname = usePathname();
  const [on, setOn] = useState(false);

  useEffect(() => {
    const upd = () => setOn(hasConsent('marketing'));
    upd();
    window.addEventListener(CONSENT_EVENT, upd);
    return () => window.removeEventListener(CONSENT_EVENT, upd);
  }, []);

  useEffect(() => {
    if (!on) return;
    loadMetaPixel();
    metaPageView();
  }, [on, pathname]);

  return null;
}
