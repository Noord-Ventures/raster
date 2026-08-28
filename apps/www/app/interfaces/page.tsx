import Link from "next/link";
import type { Metadata } from "next";
import { interfaces } from "./catalog";
import { InterfaceCrop } from "./crops";
import { InterfacesNav } from "./nav";
import "./interfaces.css";

export const metadata: Metadata = {
  title: "Interfaces",
  description: "Six invented tools. A poster crop of each.",
};

export default function InterfacesPage() {
  return (
    <div className="if-index">
      <InterfacesNav />
      <main className="site-content-wide">
        <header className="if-title">
          <h1 className="rs-t-display">Interfaces</h1>
          <p className="rs-t-sub">Six little tools. A poster crop of each.</p>
        </header>
        <div className="if-list">
          {interfaces.map((item) => (
            <Link key={item.slug} href={`/interfaces/${item.slug}`} className="if-tile">
              <InterfaceCrop slug={item.slug} />
              <div className="if-tile-matter">
                <h2>{item.title}</h2>
                <p>{item.voice}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
