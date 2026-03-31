import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { CookieBanner, ConditionalAnalytics } from "@/components/CookieBanner";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#fafafa',
}

export const metadata: Metadata = {
  title: {
    default: "30 Jahre FIT-INN Trier — Jubiläums-Angebot",
    template: "%s | 30 Jahre FIT-INN Trier",
  },
  description: "FIT-INN Trier feiert 30 Jahre! Sichere dir 30% Rabatt auf unsere 52- und 104-Wochen-Tarife. Nur für Neumitglieder, nur bis 30. April 2026.",
  keywords: [
    "FIT-INN Trier", "30 Jahre", "Jubiläum", "Fitnessstudio Trier",
    "Rabatt", "Mitgliedschaft", "Fitness Trier", "Angebot",
    "Fitnessstudio Angebot Trier", "30 Prozent Rabatt",
  ],
  authors: [{ name: "FIT-INN Trier" }],
  creator: "FIT-INN Trier",
  publisher: "FIT-INN Trier",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "30 Jahre FIT-INN Trier",
    title: "30 Jahre FIT-INN Trier — 30% Jubiläums-Rabatt",
    description: "Feiere mit uns 30 Jahre FIT-INN Trier! 30% Rabatt auf die 52- und 104-Wochen-Tarife. Nur für Neumitglieder, nur bis 30. April 2026.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "30 Jahre FIT-INN Trier — Jubiläums-Angebot",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HealthClub",
              name: "FIT-INN Trier",
              description: "FIT-INN Trier feiert 30-jähriges Jubiläum! 30% Rabatt auf 52- und 104-Wochen-Mitgliedschaften für Neumitglieder.",
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
              openingHoursSpecification: [
                { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "06:00", closes: "22:00" },
                { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "18:00" },
                { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "09:00", closes: "14:00" },
              ],
              sameAs: [
                "https://www.instagram.com/fit_inn_trier/",
                "https://www.facebook.com/FitInnFeyen",
              ],
            }),
          }}
        />
      </head>
      <body className={`${barlow.variable} ${barlowCondensed.variable}`}>
        {children}
        <CookieBanner />
        <ConditionalAnalytics />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
