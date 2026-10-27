'use client';
// Blendet globale Bausteine (Cookie-Banner, Meta Pixel) auf bestimmten Seiten aus, z. B. /start (Studio-QR).
import { usePathname } from 'next/navigation';

export default function HideOn({ paths, children }: { paths: string[]; children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname && paths.includes(pathname.replace(/\/$/, '') || '/')) return null;
  return <>{children}</>;
}
