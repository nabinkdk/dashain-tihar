import type { Metadata } from "next";
import {
  Eczar,
  Manrope,
  Fraunces,
  Hind,
  IBM_Plex_Mono,
} from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

// You can replace this with your own Google Analytics ID later if you want to track visitors!
const GA_MEASUREMENT_ID = "G-8ZC8BEFS16";

const eczar = Eczar({
  variable: "--font-eczar",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "devanagari"],
});

const hind = Hind({
  variable: "--font-hind",
  weight: ["500", "600"],
  subsets: ["latin", "devanagari"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  weight: ["500", "600"],
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

// Updated Title and Description for Dashain & Tihar
const TITLE = "Dashain & Tihar Tunes — बडा दशैं तथा तिहार | Festival Vibes";
const DESCRIPTION =
  "Stream classic Dashain and Tihar songs anytime, anywhere. From Malshree Dhun to Deusi Re, get into the festive spirit with this live player.";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Dashain Tihar Radio",
  keywords: [
    "dashain songs",
    "tihar songs",
    "dashain tihar radio",
    "malshree dhun",
    "deusi re",
    "bhailini",
    "nepali festival music",
    "dashain aayo",
    "tihar aayo",
    "sugam pokharel dashain",
  ],
  openGraph: {
    title: "Dashain & Tihar Tunes 🪔🪁",
    description:
      "Stream classic Dashain and Tihar songs live — Get into the festive spirit!",
    siteName: "Dashain Tihar Radio",
    type: "website",
    locale: "ne_NP", // Changed locale to Nepali
  },
  twitter: {
    card: "summary_large_image",
    title: "Dashain & Tihar Tunes 🪔🪁",
    description:
      "Stream classic Dashain and Tihar songs live — Get into the festive spirit!",
  },
  other: {
    google: "notranslate",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

// Next.js 15+ sometimes requires layout props to be typed a specific way depending on your setup.
// Using standard React.ReactNode is the safest and most standard way to type the children prop.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ne" // Changed language to Nepali
      translate="no"
      className={`notranslate ${eczar.variable} ${manrope.variable} ${fraunces.variable} ${hind.variable} ${ibmPlexMono.variable}`}
    >
      <body suppressHydrationWarning>{children}</body>
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
    </html>
  );
}
