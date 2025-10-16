import type { Metadata } from "next";
import "./globals.css";
import SiteShell from "@/app/SiteShell";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata: Metadata = {
  title: "Giacomo Bianchi Portfolio",
  description: "Check my work ;)",
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico`, sizes: "16x16 32x32" },
      { url: `${basePath}/favicon-16x16.png`, sizes: "16x16", type: "image/png" },
      { url: `${basePath}/favicon-32x32.png`, sizes: "32x32", type: "image/png" },
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
      { url: `${basePath}/apple-touch-icon.png`, sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: `${basePath}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
