'use client'

import { useState, useEffect } from 'react'

const TARGET_DATE = new Date('2026-04-30T23:59:59').getTime()

function getTimeLeft() {
  const now = Date.now()
  const diff = Math.max(0, TARGET_DATE - now)
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export function CountdownTimer({ compact }: { compact?: boolean }) {
  const [time, setTime] = useState(getTimeLeft)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) {
    return <div className={compact ? 'h-6' : 'h-16'} />
  }

  if (compact) {
    return (
      <span className="text-sm font-medium text-accent">
        Noch {time.days} Tage {time.hours}h {time.minutes}m
      </span>
    )
  }

  return (
    <div className="flex items-center justify-center gap-2 md:gap-5">
      <Unit value={time.days} label="Tage" />
      <span className="text-lg md:text-2xl font-bold text-muted-foreground/40 -mt-3 md:-mt-4">:</span>
      <Unit value={time.hours} label="Std" />
      <span className="text-lg md:text-2xl font-bold text-muted-foreground/40 -mt-3 md:-mt-4">:</span>
      <Unit value={time.minutes} label="Min" />
      <span className="text-lg md:text-2xl font-bold text-muted-foreground/40 -mt-3 md:-mt-4">:</span>
      <Unit value={time.seconds} label="Sek" />
    </div>
  )
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="countdown-unit">
      <span className="countdown-value">{String(value).padStart(2, '0')}</span>
      <span className="countdown-label">{label}</span>
    </div>
  )
}
