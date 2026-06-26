import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { CookieBanner, ConditionalAnalytics } from "@/components/CookieBanner";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";
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
    default: "Sommer-Aktion FIT-INN Trier — Beitragsfrei trainieren in den Sommerferien",
    template: "%s | FIT-INN Trier",
  },
  description: "Jetzt anmelden und die kompletten Sommerferien (29.06.–07.08.2026) beitragsfrei trainieren. Rund 6 Wochen geschenkt on top auf deinen 52- oder 104-Wochen-Vertrag. Nur für Neumitglieder bei FIT-INN Trier.",
  keywords: [
    "FIT-INN Trier", "Sommerferien Aktion", "beitragsfrei trainieren",
    "Fitnessstudio Trier", "Probetraining Trier", "Mitgliedschaft",
    "Sommer Angebot Fitness", "Trier-Feyen", "Fitness Trier",
  ],
  authors: [{ name: "FIT-INN Trier" }],
  creator: "FIT-INN Trier",
  publisher: "FIT-INN Trier",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "FIT-INN Trier",
    title: "Sommer-Aktion FIT-INN Trier — Beitragsfrei durch die Sommerferien",
    description: "Sichere dir jetzt deine 52- oder 104-Wochen-Mitgliedschaft und trainiere die kompletten Sommerferien (29.06.–07.08.2026) beitragsfrei on top. Nur für Neumitglieder.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Sommer-Aktion FIT-INN Trier — Beitragsfrei trainieren",
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
              description: "Sommer-Aktion bei FIT-INN Trier: Bei Abschluss einer 52- oder 104-Wochen-Mitgliedschaft trainieren Neumitglieder die kompletten Sommerferien (29.06.–07.08.2026) beitragsfrei.",
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
      </head>
      <body className={`${barlow.variable} ${barlowCondensed.variable}`}>
        {children}
        <WhatsAppWidget />
        <CookieBanner />
        <ConditionalAnalytics />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
