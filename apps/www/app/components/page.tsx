import Link from "next/link";
import type { Metadata } from "next";
import { rasterCategories, rasterComponents } from "@noordvc/raster";
import { DocsNav } from "@/components/docs-nav";
import { Preview } from "@/components/preview";

export const metadata: Metadata = { title: "Components" };

export default function ComponentsPage() {
  return (
    <>
      <div className="site-layout">
        <DocsNav />
        <main className="site-content-wide">
          <header className="cover" style={{ paddingBottom: 24, maxWidth: 592 }}>
            <h1 className="rs-t-display">Components</h1>
            <p className="rs-t-sub">
              The kit, live. Each page has markup, React usage, and the install command.
            </p>
          </header>
          {rasterCategories.map((category) => {
            const items = rasterComponents.filter((c) => c.category === category);
            if (items.length === 0) return null;
            return (
              <section key={category} id={category}>
                <h2 className="rs-t-title" style={{ marginTop: 40 }}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h2>
                <div className="gallery" style={{ paddingBottom: 8 }}>
                  {items.map((c) => (
                    <div key={c.name} className="gallery-item">
                      <div className="gallery-demo">
                        <Preview name={c.name} snippet={c.snippet} />
                      </div>
                      <div className="gallery-meta">
                        <h3>
                          <Link href={`/components/${c.name}`} className="gallery-item-link">
                            {c.title}
                          </Link>
                        </h3>
                        <p>{c.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </main>
      </div>
    </>
  );
}
