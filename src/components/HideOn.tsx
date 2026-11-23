'use client';
// Blendet globale Bausteine (Cookie-Banner, Meta Pixel) auf bestimmten Seiten aus, z. B. /start (Studio-QR).
// prefixes: ganze Bereiche, z. B. '/rezepte' (Übersicht + alle /rezepte/<slug>).
import { usePathname } from 'next/navigation';

export default function HideOn({ paths, prefixes = [], children }: { paths: string[]; prefixes?: string[]; children: React.ReactNode }) {
  const pathname = usePathname();
  const p = pathname ? pathname.replace(/\/$/, '') || '/' : '';
  if (p && (paths.includes(p) || prefixes.some((x) => p === x || p.startsWith(x + '/')))) return null;
  return <>{children}</>;
}
