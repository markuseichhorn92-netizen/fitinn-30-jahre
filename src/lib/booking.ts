// Magicline-Hilfsfunktionen für die Terminauswahl (Slots → Kalender).
// Übernommen aus fitinn-landing-v2 (src/lib/quizResult.ts) – nur die für die
// Buchung relevanten Datums-/Slot-Helfer, ohne Quiz-/Krankenkassen-Logik.

export type Slot = { startDateTime: string; endDateTime: string }

/** Monatsraster (Mo–So) inkl. Leerzellen für die Kalenderdarstellung. */
export function getMonthGrid(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startPad = (firstDay.getDay() + 6) % 7 // Woche beginnt Montag
  const grid: (Date | null)[] = []
  for (let i = 0; i < startPad; i++) grid.push(null)
  for (let d = 1; d <= lastDay.getDate(); d++) grid.push(new Date(year, month, d))
  while (grid.length % 7 !== 0) grid.push(null)
  return grid
}

/** ISO-UTC-String → lokaler Tagesschlüssel "YYYY-MM-DD" (zum Gruppieren der Slots). */
export function toLocalDateKey(isoStr: string): string {
  const d = new Date(isoStr)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** Uhrzeit eines Slots, lokal formatiert (z. B. "10:00"). */
export function formatTime(isoStr: string): string {
  return new Date(isoStr).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
}

/** Tagesschlüssel "YYYY-MM-DD" → langes Datum (z. B. "Freitag, 13. März"). */
export function formatDateLong(dateKey: string): string {
  const d = new Date(dateKey + 'T12:00:00')
  return d.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })
}

/** ISO-UTC-String → kurzes Datum (z. B. "Fr., 13. März"). */
export function formatDateShort(isoStr: string): string {
  const d = new Date(isoStr)
  return d.toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric', month: 'long' })
}
