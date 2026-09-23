import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { CookieBanner, ConditionalAnalytics } from "@/components/CookieBanner";
import { GoogleTag } from "@/components/GoogleTag";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AusserAuf, EIGENE_STRUKTURDATEN, OHNE_TRACKING } from "@/components/AusserAuf";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  // Nur noch die Archiv- und Unterseiten nutzen Barlow – nicht vorladen,
  // sonst konkurrieren die Dateien auf / und /oktober mit deren Schriften.
  preload: false,
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#fafafa',
}

export const metadata: Metadata = {
  title: {
    default: "5-Euro-Aktion FIT-INN Trier — Stark, beweglich und selbstbestimmt älter werden",
    template: "%s | FIT-INN Trier",
  },
  description: "Die Jahre, die zählen: zwölf Wochen für je 5 € im FIT-INN Trier. Familiengeführt seit 1996, Betreuung mit Namen, über 100 TechnoGym-Geräte. Probetraining kostenlos und unverbindlich.",
  keywords: [
    "FIT-INN Trier", "5 Euro Aktion", "Fitness ab 50",
    "Fitnessstudio Trier", "Probetraining Trier", "Mitgliedschaft",
    "Krafttraining Senioren", "Trier-Feyen", "Fitness Trier",
  ],
  authors: [{ name: "FIT-INN Trier" }],
  creator: "FIT-INN Trier",
  publisher: "FIT-INN Trier",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "FIT-INN Trier",
    title: "5-Euro-Aktion FIT-INN Trier — Die Jahre, die zählen",
    description: "Zwölf Wochen für je 5 € – in beiden Laufzeiten. Stark, beweglich und selbstbestimmt älter werden im FIT-INN Trier. Probetraining kostenlos und unverbindlich.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "5-Euro-Aktion FIT-INN Trier — Die Jahre, die zählen",
      },
    ],
  },
  metadataBase: new URL("https://30jahre.fit-inn-trier.de"),
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.jpg",
    apple: "/favicon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        {/*
          Google Consent Mode v2: Diese Standardwerte müssen in der
          dataLayer-Warteschlange stehen, bevor gtag.js den ersten Messaufruf
          absetzt – deshalb synchron im <head> und nicht über next/script.
          Ohne Zustimmung im Cookie-Banner setzt Google keine Cookies; die
          Freigabe reicht src/components/GoogleTag.tsx nach.
        */}
        <AusserAuf pfade={OHNE_TRACKING}>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});`,
            }}
          />
        </AusserAuf>
        {/*
          Strukturierte Daten der 5-Euro-Aktion. Die Startseite und /oktober
          bringen eigene mit (Telefon, Beschreibung) und sollen hier nicht zwei
          widersprüchliche Einträge ausliefern.
        */}
        <AusserAuf pfade={EIGENE_STRUKTURDATEN}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "HealthClub",
                name: "FIT-INN Trier",
                description: "5-Euro-Aktion bei FIT-INN Trier: Die ersten zwölf Wochen für je 5 € – in der 52- wie in der 104-Wochen-Mitgliedschaft. Familiengeführt seit 1996.",
                telephone: "+49651308524",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Auf Hirtenberg 8",
                  addressLocality: "Trier",
                  postalCode: "54296",
                  addressCountry: "DE",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: 49.7492,
                  longitude: 6.6371,
                },
                priceRange: "€€",
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "4.8",
                  reviewCount: "179",
                  bestRating: "5",
                  worstRating: "1",
                },
                openingHoursSpecification: [
                  { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:00", closes: "13:00" },
                  { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "15:00", closes: "21:30" },
                  { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "13:00", closes: "18:00" },
                  { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "09:00", closes: "15:00" },
                ],
                sameAs: [
                  "https://www.instagram.com/fit_inn_trier/",
                  "https://www.facebook.com/FitInnFeyen",
                ],
              }),
            }}
          />
        </AusserAuf>
      </head>
      <body className={`${barlow.variable} ${barlowCondensed.variable}`}>
        {/* Eigenständige Routen (/oktober) laufen ohne Tracking und damit
            auch ohne Cookie-Banner – siehe src/components/AusserAuf.tsx.
            Der Banner steht vor dem Seiteninhalt, damit er in der Tab-Folge
            als Erstes kommt. */}
        <AusserAuf pfade={OHNE_TRACKING}>
          <CookieBanner />
        </AusserAuf>
        {children}
        <AusserAuf pfade={OHNE_TRACKING}>
          <ConditionalAnalytics />
          <GoogleTag />
          <Analytics />
          <SpeedInsights />
        </AusserAuf>
      </body>
    </html>
  );
}
