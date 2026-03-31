'use client'

import { useState, useEffect } from 'react'
import { Users } from 'lucide-react'

const TOTAL = 30
const LAUNCH_DATE = new Date('2026-03-31').getTime()

function getRealisticCount() {
  const now = Date.now()
  const daysSinceLaunch = Math.max(0, Math.floor((now - LAUNCH_DATE) / 86400000))

  // Erste Tage: 0-2, dann langsam steigernd, nie mehr als 28
  let taken = 0
  if (daysSinceLaunch <= 0) return 0
  if (daysSinceLaunch <= 3) taken = daysSinceLaunch // 1, 2, 3
  else if (daysSinceLaunch <= 7) taken = 3 + (daysSinceLaunch - 3) * 2 // ~11
  else if (daysSinceLaunch <= 14) taken = 11 + (daysSinceLaunch - 7) // ~18
  else taken = 18 + Math.min(10, daysSinceLaunch - 14) // max 28

  // Kleine Tageszeit-Variation
  const hour = new Date().getHours()
  if (hour >= 17 && hour <= 21 && taken > 0) taken = Math.min(TOTAL - 2, taken + 1)

  return Math.min(TOTAL - 2, taken)
}

export function SpotsCounter({ variant = 'default' }: { variant?: 'default' | 'compact' }) {
  const [taken, setTaken] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTaken(getRealisticCount())
  }, [])

  if (!mounted) return null

  const remaining = TOTAL - taken
  const pct = (taken / TOTAL) * 100

  if (variant === 'compact') {
    return (
      <div className="inline-flex items-center gap-2 text-sm">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
        </span>
        <span className="font-semibold text-foreground">Nur noch {remaining} Plätze frei</span>
      </div>
    )
  }

  return (
    <div className="spots-counter rounded-xl border border-border bg-card p-4 md:p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-accent" />
          <span className="text-sm font-semibold">Jubiläums-Plätze</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          <span className="text-xs font-medium text-red-600">Live</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-3 rounded-full bg-secondary overflow-hidden mb-3">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${pct}%`,
            background: pct > 80
              ? 'linear-gradient(90deg, var(--accent), #ef4444)'
              : 'linear-gradient(90deg, var(--primary), var(--accent))',
          }}
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          <strong className="text-foreground">{taken}</strong> von {TOTAL} vergeben
        </span>
        <span className="font-bold text-red-600">
          Noch {remaining} frei!
        </span>
      </div>
    </div>
  )
}
