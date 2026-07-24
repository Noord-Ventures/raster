import Link from "next/link";
import type { Metadata } from "next";
import { rasterCategories, rasterComponents } from "@raster/core";
import { Preview } from "@/components/preview";

export const metadata: Metadata = { title: "Components" };

export default function ComponentsPage() {
  return (
    <main className="docs-main" style={{ maxWidth: "none" }}>
      <h1 className="rs-t-display">Components</h1>
      <p className="rs-t-sub" style={{ marginTop: 10 }}>
        Every piece of the kit, live. Click through for markup, React usage, and install
        commands.
      </p>
      {rasterCategories.map((category) => {
        const items = rasterComponents.filter((c) => c.category === category);
        if (items.length === 0) return null;
        return (
          <section key={category}>
            <h2 className="rs-t-title" style={{ marginTop: 40 }}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h2>
            <div className="gallery" style={{ padding: "20px 0 8px" }}>
              {items.map((c) => (
                <Link key={c.name} href={`/components/${c.name}`} className="gallery-item">
                  <div className="gallery-demo">
                    <Preview name={c.name} snippet={c.snippet} />
                  </div>
                  <div className="gallery-meta">
                    <h3>{c.title}</h3>
                    <p>{c.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
