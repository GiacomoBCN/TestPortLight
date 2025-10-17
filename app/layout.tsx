import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteShell from "@/app/SiteShell";
import GoogleAnalytics from "@/app/components/GoogleAnalytics";
import CookieConsent from "@/app/components/CookieConsent";
import { Suspense } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const viewport: Viewport = {
  themeColor: "#0066ff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://giacomobianchi.tech'),
  title: "Giacomo Bianchi",
  description: "Italian by birth. Product leader by craft. Global by vocation.",
  keywords: [
    "UX Designer",
    "UI Designer",
    "Product Design",
    "Design Systems",
    "Front-End Developer",
    "Teacher",
    "Portfolio",
  ],
  authors: [{ name: "Giacomo Bianchi" }],
  creator: "Giacomo Bianchi",
  publisher: "Giacomo Bianchi",
  applicationName: "GB Portfolio",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "GB Portfolio",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://giacomobianchi.tech",
    siteName: "Giacomo Bianchi",
    title: "Giacomo Bianchi",
    description: "Italian by birth. Product leader by craft. Global by vocation.",
    images: [
      {
        url: `${basePath}/android-chrome-512x512.png`,
        width: 512,
        height: 512,
        alt: "Giacomo Bianchi",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Giacomo Bianchi",
    description: "Italian by birth. Product leader by craft. Global by vocation.",
    images: [`${basePath}/android-chrome-512x512.png`],
  },
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico`, sizes: "16x16 32x32" },
      {
        url: `${basePath}/favicon-16x16.png`,
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: `${basePath}/favicon-32x32.png`,
        sizes: "32x32",
        type: "image/png",
      },
    ],
    other: [
      {
        url: `${basePath}/android-chrome-192x192.png`,
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: `${basePath}/android-chrome-512x512.png`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: `${basePath}/apple-touch-icon.png`,
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
    <html lang="en">
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
