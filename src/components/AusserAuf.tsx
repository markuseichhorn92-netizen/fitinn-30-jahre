'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

/**
 * Routen, die ohne Tracking, ohne Cookie-Banner und ohne die strukturierten
 * Daten der 5-Euro-Aktion auskommen. /oktober ist bewusst frei von externen
 * Diensten und bringt eigene strukturierte Daten mit.
 */
export const EIGENSTAENDIGE_ROUTEN = ['/oktober'] as const

/** Rendert seine Kinder auf allen Routen außer den genannten. */
export function AusserAuf({
  pfade = EIGENSTAENDIGE_ROUTEN,
  children,
}: {
  pfade?: readonly string[]
  children: ReactNode
}) {
  const pfad = usePathname() ?? ''
  if (pfade.some(p => pfad === p || pfad.startsWith(`${p}/`))) return null
  return <>{children}</>
}
