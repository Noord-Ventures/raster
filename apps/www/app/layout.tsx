import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@raster/core/css";
import "./site.css";
import { CrumbBar } from "@/components/crumb-bar";
import { SiteChrome } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: {
    default: "Raster: a monochrome design system",
    template: "%s · Raster",
  },
  description:
    "One ink, no accent. Raster is a CSS-first, zero-dependency design system: tokens, components, a registry, and a CLI.",
};

const themeInit = `(function(){try{var t=localStorage.getItem("raster-theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.dataset.theme="dark"}catch(e){}})()`;

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
