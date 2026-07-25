import Link from "next/link";
import { rasterComponents } from "@raster/core";
import { Preview } from "@/components/preview";

const principles = [
  {
    title: "One ink, no accent",
    body: "The palette is monochrome — paper, ink, and the grays between. Emphasis comes from weight, size, and spacing, never from a hue.",
  },
  {
    title: "Hairlines, not boxes",
    body: "Rows and dividers are 1px lines on the open grid; cells and cards avoid heavy chrome.",
  },
  {
    title: "The grid is visible",
    body: "A 204px module draws faint lines across every page; content boxes span whole modules so edges step from grid line to grid line.",
  },
  {
    title: "CSS-first, zero dependencies",
    body: "Plain classes on plain markup. The React layer adds behavior with native elements — no Radix, no Tailwind, nothing to audit.",
  },
  {
    title: "Sentence case, always",
    body: "Never all caps — labels and eyebrows are sentence case.",
  },
  {
    title: "Quiet motion",
    body: "0.15–0.3s, ease. Color and opacity change; layout rarely moves; nothing bounces.",
  },
];

const featured = ["button", "switch", "input", "tabs", "select", "badge"];

export default function Home() {
  const items = featured
    .map((name) => rasterComponents.find((c) => c.name === name)!)
    .filter(Boolean);
  return (
    <div className="site-layout">
      <main className="site-content-wide">
        <header className="cover" style={{ maxWidth: 592 }}>
          <p className="rs-t-label" style={{ color: "var(--text-secondary)", fontWeight: 500, marginBottom: 32 }}>
            Raster — a monochrome design system
          </p>
          <h1 className="rs-t-xl">A design system with one ink.</h1>
          <p className="rs-t-sub">
            Raster is monochrome, CSS-first, and dependency-free. Tokens, components, a typed
            registry, and a CLI that vendors code you own — nothing else comes along.
          </p>
          <div className="hero-actions">
            <Link href="/docs">
              <button className="rs-btn-primary">Get started</button>
            </Link>
            <Link href="/components">
              <button className="rs-btn-ghost">Browse components</button>
            </Link>
          </div>
          <code className="hero-install">npx raster init &amp;&amp; npx raster add button dialog</code>
        </header>

        <section className="principles">
          {principles.map((p) => (
            <div className="principle" key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="rs-t-title">The kit</h2>
          <div className="gallery">
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

        <footer className="site-footer">
          <span>Raster — the design system behind noord.vc, noord.dev, and renatovaldes.com.</span>
          <span>
            <a href="https://github.com/rennvaldes/raster">GitHub</a>
          </span>
        </footer>
      </main>
    </div>
  );
}
