import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@noorddev/raster/css";
import "./site.css";
import "@/components/examples/use.css";
import { CrumbBar } from "@/components/crumb-bar";
import { SiteChrome } from "@/components/site-chrome";
import { social } from "./social";

export const metadata: Metadata = social;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const themeInit = `(function(){try{var t=localStorage.getItem("raster-theme");var dark=t==="dark"||((!t||t==="auto")&&matchMedia("(prefers-color-scheme: dark)").matches);if(dark)document.documentElement.dataset.theme="dark";else delete document.documentElement.dataset.theme}catch(e){}})()`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <SiteChrome />
        <CrumbBar />
        {children}
      </body>
    </html>
  );
}
