'use client';
// Blendet globale Bausteine (Cookie-Banner, Meta Pixel) auf bestimmten Seiten aus, z. B. /start (Studio-QR).
// prefixes: ganze Bereiche, z. B. '/rezepte' (Übersicht + alle /rezepte/<slug>).
import { usePathname } from 'next/navigation';

// only: umgekehrt, zeigt children NUR auf diesen Seiten (z. B. Cookie-Einstellungen ohne Banner).
export default function HideOn({ paths, prefixes = [], only = false, children }: { paths: string[]; prefixes?: string[]; only?: boolean; children: React.ReactNode }) {
  const pathname = usePathname();
  const p = pathname ? pathname.replace(/\/$/, '') || '/' : '';
  const hit = !!p && (paths.includes(p) || prefixes.some((x) => p === x || p.startsWith(x + '/')));
  if (hit !== only) return null;
  return <>{children}</>;
}
