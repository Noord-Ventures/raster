import Link from "next/link";
import type { Metadata } from "next";
import { rasterCategories, catalogComponents } from "@noorddev/raster";
import { chrome } from "@/app/site.stylex";
import { DocsNav } from "@/components/docs-nav";
import { Preview } from "@/components/preview";
import { sx } from "@/lib/sx";
import { DOOR } from "../specimen";

export const metadata: Metadata = {
  title: "Components",
  alternates: { canonical: `${DOOR}/components/` },
};

export default function ComponentsPage() {
  return (
    <>
      <div className="site-layout catalog-page">
        <DocsNav />
        <main {...sx("site-content", chrome.content)}>
          <header {...sx("cover", chrome.cover)}>
            <h1 className="rs-t-display">Components</h1>
            <p className="rs-t-sub">The control, the name, a short law.</p>
          </header>
          {rasterCategories.map((category) => {
            const items = catalogComponents.filter((c) => c.category === category);
            if (items.length === 0) return null;
            return (
              <section key={category} id={category}>
                <h2 className="rs-t-title catalog-group">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h2>
                <div {...sx("gallery", chrome.gallery)}>
                  {items.map((c) => (
                    <div key={c.name} {...sx("gallery-item", chrome.galleryItem)}>
                      <div {...sx("gallery-demo", chrome.galleryDemo)}>
                        <Preview name={c.name} snippet={c.snippet} />
                      </div>
                      <div {...sx("gallery-meta", chrome.galleryMeta)}>
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
