import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const grotesk = Space_Grotesk({ subsets: ['latin'], weight: ['500', '700'], variable: '--font-space-grotesk', display: 'swap' });

export const metadata: Metadata = {
  title: '5 € pro Woche bis Silvester – nur für die ersten 25 | Fit-Inn Trier',
  description:
    'Fit-Inn Trier: Bis 31.12.2026 nur 5 € pro Woche – je früher du startest, desto mehr sparst du. Nur für die ersten 25 Neuanmeldungen. Familiengeführt seit 1996, TechnoGym-Geräte. Probetraining kostenlos buchen.',
  openGraph: {
    title: '5 € pro Woche bis Silvester | Fit-Inn Trier',
    description: 'Je früher du startest, desto mehr sparst du. Nur für die ersten 25 Neuanmeldungen.',
    images: ['/media/833da1bc-191f-4c62-a865-5783d332fd28.avif'],
    locale: 'de_DE',
    type: 'website',
  },
  icons: { icon: '/favicon.png' },
};

export const viewport: Viewport = { themeColor: '#05090B', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} ${grotesk.variable}`}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
