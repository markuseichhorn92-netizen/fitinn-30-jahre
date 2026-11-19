// Schlichte Linien-Icons für /klar (eigene Zeichnung, 24er Raster, Farbe = currentColor).
const PFADE = {
  hantel: 'M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11',
  parken: 'M5 3.5h14a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V5A1.5 1.5 0 0 1 5 3.5zM9.5 17V7.5h3.2a2.8 2.8 0 0 1 0 5.6H9.5',
  stern: 'M12 3.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z',
  kalender: 'M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v12a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5zM4 10h16M8.5 3v4M15.5 3v4M8.5 14l2 2 4-4',
  betreuung: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20c.6-3.4 3.2-5.5 6.5-5.5s5.9 2.1 6.5 5.5M15.5 11.5l2 2 4-4.5',
  handschlag: 'M3 12.5l4-4 3 1.5 3-2.5 4.5 1.5 3.5 3.5M7 8.5l-4 4 6 6c.8.8 2 .8 2.8 0M12 18.5c.8.8 2 .8 2.8 0l3.7-3.7M9.5 16l2-2M11.5 18l2-2M13 10l3 3',
  app: 'M8 2.8h8A1.7 1.7 0 0 1 17.7 4.5v15a1.7 1.7 0 0 1-1.7 1.7H8a1.7 1.7 0 0 1-1.7-1.7v-15A1.7 1.7 0 0 1 8 2.8zM10.5 18h3',
  haus: 'M3.5 11L12 4l8.5 7M5.5 9.5V20h13V9.5M12 17.2s-3-1.8-3-3.7a1.6 1.6 0 0 1 3-.8 1.6 1.6 0 0 1 3 .8c0 1.9-3 3.7-3 3.7z',
  uhr: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5.2l3.4 2',
  ort: 'M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11zM12 12.3a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6z',
  route: 'M4 11.5L20 4l-7.5 16-2-6.5z',
  telefon: 'M6.6 3.5h2.6l1.4 4-2 1.4a11.5 11.5 0 0 0 6.5 6.5l1.4-2 4 1.4v2.6a1.6 1.6 0 0 1-1.7 1.6A16.5 16.5 0 0 1 5 5.2a1.6 1.6 0 0 1 1.6-1.7z',
  haken: 'M5 12.5l4.2 4.2L19 7',
} as const;

export type IconName = keyof typeof PFADE;

export default function Icon({ name, size = 24, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg className={className ? `ku-ic ${className}` : 'ku-ic'} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
      <path d={PFADE[name]} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
