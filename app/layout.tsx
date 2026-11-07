import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteShell from "@/app/SiteShell";
import GoogleAnalytics from "@/app/components/GoogleAnalytics";
import CookieConsent from "@/app/components/CookieConsent";
import { Suspense } from "react";
import { shell } from "@/content/shell";
import localFont from "next/font/local";

// Font nel repo (app/fonts, latin + latin-ext, woff2), serviti dal nostro dominio.
// Locali e non next/font/google: il build non dipende piu' dalla risposta di Google
// (su GitHub Actions falliva). Le variabili CSS stanno su <html>; i ruoli
// (firma, lavoro, testo, etichette) sono in globals.css.
const comfortaa = localFont({
  src: [{ path: "./fonts/comfortaa-700.woff2", weight: "700", style: "normal" }],
  display: "swap",
  variable: "--font-comfortaa",
});
const redHatDisplay = localFont({
  src: [
    { path: "./fonts/red-hat-display-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/red-hat-display-700.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-red-hat-display",
});
const redHatText = localFont({
  src: [
    { path: "./fonts/red-hat-text-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/red-hat-text-600.woff2", weight: "600", style: "normal" },
  ],
  display: "swap",
  variable: "--font-red-hat-text",
});
const redHatMono = localFont({
  src: [{ path: "./fonts/red-hat-mono-500.woff2", weight: "500", style: "normal" }],
  display: "swap",
  variable: "--font-red-hat-mono",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const SITE_TITLE = shell.metadata.title;
const SITE_DESCRIPTION = shell.metadata.description;

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://giacomobianchi.tech'),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: shell.metadata.keywords,
  authors: [{ name: shell.metadata.author }],
  creator: shell.metadata.author,
  publisher: shell.metadata.author,
  applicationName: shell.metadata.applicationName,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: shell.metadata.appleWebAppTitle,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://giacomobianchi.tech",
    siteName: shell.metadata.siteName,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${basePath}/android-chrome-512x512.png?v=2`,
        width: 512,
        height: 512,
        alt: shell.metadata.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [`${basePath}/android-chrome-512x512.png?v=2`],
  },
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico?v=2`, sizes: "16x16 32x32" },
      {
        url: `${basePath}/favicon-16x16.png?v=2`,
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: `${basePath}/favicon-32x32.png?v=2`,
        sizes: "32x32",
        type: "image/png",
      },
    ],
    other: [
      {
        url: `${basePath}/android-chrome-192x192.png?v=2`,
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: `${basePath}/android-chrome-512x512.png?v=2`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: `${basePath}/apple-touch-icon.png?v=2`,
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: `${basePath}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

  return (
    <html
      lang="en"
      className={`${comfortaa.variable} ${redHatDisplay.variable} ${redHatText.variable} ${redHatMono.variable}`}
    >
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>
      <body>
        <Suspense fallback={null}>
          <GoogleAnalytics measurementId={gaId} />
        </Suspense>
        <SiteShell>{children}</SiteShell>
        <CookieConsent />
      </body>
    </html>
  );
}
