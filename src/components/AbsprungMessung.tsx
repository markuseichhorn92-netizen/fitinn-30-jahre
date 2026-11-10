'use client';
// Startet die anonyme Absprung-Messung der Black-Week-Seite (siehe src/lib/absprung.ts). Rendert nichts.
import { useEffect } from 'react';
import { starteAbsprungMessung } from '@/lib/absprung';

export default function AbsprungMessung() {
  useEffect(() => starteAbsprungMessung(), []);
  return null;
}
