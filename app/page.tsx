import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import Home from "@/app/pages/Home";
import HomeShell from "@/app/components/home/HomeShell";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: "Giacomo Bianchi · Product & Design Leadership",
};

export const viewport: Viewport = {
  themeColor: "#f5eedf",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function Page() {
  return (
    <div className={archivo.variable}>
      <HomeShell>
        <Home />
      </HomeShell>
    </div>
  );
}
