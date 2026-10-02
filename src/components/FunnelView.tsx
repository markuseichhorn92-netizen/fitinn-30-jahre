'use client';
// Zählt den Seitenaufruf anonym für den Trichter (siehe src/lib/funnel.ts). Bots ohne JavaScript zählen nicht mit.
import { useEffect } from 'react';
import { funnel } from '@/lib/funnel';

export default function FunnelView() {
  useEffect(() => { funnel('view'); }, []);
  return null;
}
