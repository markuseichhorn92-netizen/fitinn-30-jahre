'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

/**
 * Routen ohne Tracking und damit ohne Cookie-Banner. /oktober ist bewusst
 * frei von externen Diensten.
 */
export const OHNE_TRACKING = ['/oktober'] as const

/**
 * Routen mit eigenen strukturierten Daten. Dort entfällt das JSON-LD der
 * 5-Euro-Aktion aus dem Root-Layout, damit keine zwei widersprüchlichen
 * Einträge (Telefon, Beschreibung) ausgeliefert werden.
 */
export const EIGENE_STRUKTURDATEN = ['/', '/oktober'] as const

/** Rendert seine Kinder auf allen Routen außer den genannten. */
export function AusserAuf({ pfade, children }: { pfade: readonly string[]; children: ReactNode }) {
  const pfad = usePathname() ?? ''
  if (pfade.some(p => pfad === p || (p !== '/' && pfad.startsWith(`${p}/`)))) return null
  return <>{children}</>
}
