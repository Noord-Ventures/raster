import Link from "next/link";
import type { Metadata } from "next";
import { interfaces } from "./catalog";
import { InterfacesNav } from "./nav";
import "./interfaces.css";

export const metadata: Metadata = {
  title: "Interfaces",
  description: "Working posters composed from the Raster catalog.",
};

export default function InterfacesPage() {
  return (
    <div className="if-index">
      <InterfacesNav />
      <main className="site-content-wide">
        <header className="cover" style={{ paddingBottom: 24, maxWidth: 592 }}>
          <h1 className="rs-t-display">Interfaces</h1>
          <p className="rs-t-sub">Working posters. The catalog, composed.</p>
        </header>
        <div className="if-list">
          {interfaces.map((item) => (
            <Link key={item.slug} href={`/interfaces/${item.slug}`} className="if-tile">
              <h2>{item.title}</h2>
              <p>{item.law}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
