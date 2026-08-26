import Link from "next/link";
import type { Metadata } from "next";
import { rasterComponents, rasterTokens } from "@noordvc/raster";
import { Preview } from "@/components/preview";

export const metadata: Metadata = {
  title: "Raster",
  description: "One ink, a 204 module, Inter. npx @noordvc/raster-cli init",
};

const COMMAND = "npx @noordvc/raster-cli init";
const LAW = "One ink, a 204 module, Inter.";

const featured = ["button", "switch", "input", "tabs"];

export default function Home() {
  const items = featured
    .map((name) => rasterComponents.find((c) => c.name === name)!)
    .filter(Boolean);
  const { type } = rasterTokens;

  return (
    <div className="site-layout">
      <main className="site-content-wide">
        <section className="specimen" aria-label="Raster specimen">
          <div className="specimen-cell specimen-cell-2x2">
            <p className="specimen-face">Inter</p>
          </div>
          <div className="specimen-cell">
            <p className="rs-t-label specimen-quiet">Raster 0.3</p>
            <p className="specimen-meta">
              {type.foundry.typeface}
              <br />
              {type.foundry.license}
              <br />
              bundled
            </p>
          </div>
          <div className="specimen-cell">
            <h1 className="specimen-law">{LAW}</h1>
          </div>
          <div className="specimen-cell specimen-cell-2">
            <p className="specimen-quiet">Install</p>
            <code className="specimen-command">{COMMAND}</code>
            <Link href="/docs" className="specimen-link">
              Getting started
            </Link>
          </div>
        </section>

        <section className="specimen specimen-tight" aria-label="Type scale">
          {type.scale.map((s) => (
            <div className="specimen-cell specimen-type" key={s.name}>
              <p className="specimen-quiet">
                {s.name} · {s.px} · {s.weight}
              </p>
              <p style={{ fontSize: s.px, fontWeight: s.weight, letterSpacing: s.tracking, lineHeight: s.lineHeight, margin: 0 }}>
                Inter
              </p>
            </div>
          ))}
        </section>

        <section className="specimen specimen-tight" aria-label="Components">
          {items.map((c) => (
            <div className="specimen-cell specimen-demo" key={c.name}>
              <div className="specimen-demo-live">
                <Preview name={c.name} snippet={c.snippet} />
              </div>
              <Link href={`/components/${c.name}`} className="specimen-link">
                {c.title}
              </Link>
            </div>
          ))}
        </section>

        <footer className="site-footer">
          <span>MIT. Inter under SIL OFL 1.1.</span>
          <span>
            <a href="https://github.com/rennvaldes/raster">GitHub</a>
            {" · "}
            <Link href="/docs">Getting started</Link>
          </span>
        </footer>
      </main>
    </div>
  );
}
