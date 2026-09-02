import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@noorddev/raster/css";
import "./stylex.css";
import "./site.css";
import "@/components/examples/use.css";
import { CrumbBar } from "@/components/crumb-bar";
import { SiteChrome } from "@/components/site-chrome";
import { SiteFooter } from "@/components/site-footer";
import { social } from "./social";

export const metadata: Metadata = social;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const themeInit = `(function(){try{var r=document.documentElement,t=localStorage.getItem("raster-theme");var dark=t==="dark"||((!t||t==="auto")&&matchMedia("(prefers-color-scheme: dark)").matches);if(dark)r.dataset.theme="dark";else delete r.dataset.theme;if(localStorage.getItem("raster-grid")==="off")r.setAttribute("data-grid","off");var s=localStorage.getItem("raster-text-scale");if(s!=null){var n=parseFloat(s);if(isFinite(n)&&n>0){if(n>3)n=n/100;r.style.setProperty("--text-scale",String(n));r.setAttribute("data-text-scale",String(Math.round(n*100)))}}}catch(e){}})()`;

/* First paint: hide desktop crumb labels so “Raster” cannot sit on
   Components. The bar itself stays full-bleed (no width clip). Phone
   (≤640) keeps the trail. */
const crumbPin = `@media(min-width:641px){.rs-crumb-bar a.rs-crumb-root,.rs-crumb-bar a.site-crumb-root,.rs-crumb-bar .rs-crumbs{display:none!important}}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <style dangerouslySetInnerHTML={{ __html: crumbPin }} />
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <SiteChrome />
        <CrumbBar />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
