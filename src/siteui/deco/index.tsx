import React from 'react';

// Dezente Linien-Grafiken als Hintergrund-Motiv einer Sektion (wie früher das große "1996").
// kind: euro | dumbbell | stars | calendar | question
type Props = { kind: string; className?: string };

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 3, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export default function Deco({ kind, className }: Props) {
  let body: React.ReactNode = null;
  if (kind === 'euro') {
    body = (
      <g {...S}>
        <circle cx="100" cy="100" r="86" />
        <circle cx="100" cy="100" r="70" strokeDasharray="6 10" />
        <path d="M128 66a36 36 0 1 0 0 68" strokeWidth="6" />
        <path d="M58 92h60M58 108h54" strokeWidth="6" />
      </g>
    );
  } else if (kind === 'dumbbell') {
    body = (
      <g {...S}>
        <rect x="14" y="70" width="16" height="60" rx="5" />
        <rect x="34" y="52" width="22" height="96" rx="6" />
        <rect x="144" y="52" width="22" height="96" rx="6" />
        <rect x="170" y="70" width="16" height="60" rx="5" />
        <path d="M56 100h88" strokeWidth="8" />
        <path d="M4 100h10M186 100h10" />
      </g>
    );
  } else if (kind === 'stars') {
    const star = (cx: number, cy: number, r: number) => {
      const pts = Array.from({ length: 10 }, (_, i) => {
        const a = -Math.PI / 2 + (i * Math.PI) / 5;
        const rr = i % 2 ? r * 0.45 : r;
        return `${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)}`;
      });
      return <polygon key={cx + '-' + cy} points={pts.join(' ')} />;
    };
    body = (
      <g {...S}>
        {star(100, 92, 60)}
        {star(36, 130, 26)}
        {star(164, 130, 26)}
        {star(56, 40, 16)}
        {star(150, 34, 12)}
      </g>
    );
  } else if (kind === 'calendar') {
    body = (
      <g {...S}>
        <rect x="22" y="36" width="156" height="144" rx="16" />
        <path d="M22 76h156" />
        <path d="M60 22v28M140 22v28" strokeWidth="5" />
        <path d="M46 100h18M91 100h18M136 100h18M46 130h18M136 130h18" strokeDasharray="1 0" opacity="0.7" />
        <path d="M84 132l14 14 26-30" strokeWidth="7" />
      </g>
    );
  } else if (kind === 'question') {
    body = (
      <g {...S}>
        <path d="M100 26c48 0 82 30 82 68s-34 66-82 66c-8 0-16-1-24-3l-36 22 8-32C30 134 18 116 18 94c0-38 34-68 82-68z" />
        <path d="M78 78c0-13 10-22 24-22s24 8 24 20c0 18-22 18-22 38" strokeWidth="7" />
        <circle cx="104" cy="134" r="5" fill="currentColor" stroke="none" />
      </g>
    );
  }
  if (!body) return null;
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      {body}
    </svg>
  );
}
