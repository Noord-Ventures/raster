import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@raster/core/css";
import "./site.css";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: {
    default: "Raster — a monochrome design system",
    template: "%s — Raster",
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
        <div className="site-shell">
          <SiteHeader />
          {children}
          <footer className="site-footer">
            <span>Raster — the design system behind noord.vc, noord.dev, and renatovaldes.com.</span>
            <span>
              <a href="https://github.com/rennvaldes/raster">GitHub</a>
            </span>
          </footer>
        </div>
      </body>
    </html>
  );
}
