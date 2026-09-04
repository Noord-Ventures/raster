import Link from "next/link";
import type { Metadata } from "next";
import { chrome } from "@/app/site.stylex";
import { sx } from "@/lib/sx";
import { interfaces } from "./catalog";
import { InterfaceCrop } from "./crops";
import { InterfacesNav } from "./nav";
import { interfaces as ifx } from "./interfaces.stylex";
import { DOOR } from "../specimen";
import "./interfaces.css";

export const metadata: Metadata = {
  title: "Interfaces",
  description: "Six invented tools. A poster crop of each.",
  alternates: { canonical: `${DOOR}/interfaces/` },
};

export default function InterfacesPage() {
  const cover = sx("cover", chrome.cover);
  return (
    <div {...sx("if-index", ifx.index)}>
      <InterfacesNav />
      <main id="main" {...sx("site-content-wide", chrome.contentWide)}>
        <header className={cover.className} style={{ ...cover.style, maxWidth: 592 }}>
          <h1 className="rs-t-display">Interfaces</h1>
          <p className="rs-t-sub">Six little tools. A poster crop of each.</p>
        </header>
        <div {...sx("if-list", ifx.list)}>
          {interfaces.map((item) => (
            <Link key={item.slug} href={`/interfaces/${item.slug}`} {...sx("if-tile", ifx.tile)}>
              <InterfaceCrop slug={item.slug} />
              <div {...sx("if-tile-matter", ifx.tileMatter)}>
                <h2 {...sx("", ifx.tileTitle)}>{item.title}</h2>
                <p {...sx("", ifx.tileVoice)}>{item.voice}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
