import Link from "next/link";
import type { Metadata } from "next";
import { chrome } from "@/app/site.stylex";
import { sx } from "@/lib/sx";
import { interfaces as catalog } from "./catalog";
import { InterfaceCrop } from "./crops";
import { InterfacesNav } from "./nav";
import { interfaces } from "./interfaces.stylex";
import { DOOR } from "../specimen";
import "./interfaces.css";

export const metadata: Metadata = {
  title: "Interfaces",
  description: "Six invented tools. A poster crop of each.",
  alternates: { canonical: `${DOOR}/interfaces/` },
};

export default function InterfacesPage() {
  return (
    <div {...sx("if-index", interfaces.index)}>
      <InterfacesNav />
      <main {...sx("site-content-wide", chrome.contentWide)}>
          <header {...sx("cover", chrome.cover)} style={{ maxWidth: 592 }}>
          <h1 className="rs-t-display">Interfaces</h1>
          <p className="rs-t-sub">Six little tools. A poster crop of each.</p>
        </header>
        <div {...sx("if-list", interfaces.list)}>
          {catalog.map((item) => (
            <Link key={item.slug} href={`/interfaces/${item.slug}`} {...sx("if-tile", interfaces.tile)}>
              <InterfaceCrop slug={item.slug} />
              <div {...sx("if-tile-matter", interfaces.tileMatter)}>
                <h2 {...sx("", interfaces.tileTitle)}>{item.title}</h2>
                <p {...sx("", interfaces.tileVoice)}>{item.voice}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
