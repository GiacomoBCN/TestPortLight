import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import DesignSystem from "@/app/pages/DesignSystem";
import { designSystem, type DesignSystemShotKey } from "@/content/design-system";
import { shell } from "@/content/shell";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: designSystem.metadata.title,
  description: designSystem.metadata.description,
  alternates: { canonical: "/design-system/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://giacomobianchi.tech/design-system/",
    siteName: shell.metadata.siteName,
    title: designSystem.metadata.title,
    description: designSystem.metadata.description,
    images: [
      {
        url: `${basePath}/android-chrome-512x512.png`,
        width: 512,
        height: 512,
        alt: shell.metadata.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: designSystem.metadata.title,
    description: designSystem.metadata.description,
    images: [`${basePath}/android-chrome-512x512.png`],
  },
};

// Controllo a build time: quali file del video ci sono davvero in public/
const inPublic = (file: string) => fs.existsSync(path.join(process.cwd(), "public", file));

const shotsAvailable = (Object.keys(designSystem.shots) as DesignSystemShotKey[]).filter((k) =>
  inPublic(`images/projects/design-system/${designSystem.shots[k].file}`)
);

export default function Page() {
  const { video, webm, poster } = designSystem.heroMedia;
  return (
    <DesignSystem
      shotsAvailable={shotsAvailable}
      media={{
        mp4: inPublic(video),
        webm: inPublic(webm),
        poster: inPublic(poster),
      }}
    />
  );
}
