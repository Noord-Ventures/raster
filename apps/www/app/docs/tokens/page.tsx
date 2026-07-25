import type { Metadata } from "next";
import { rasterTokens } from "@raster/core";
import { CodeBlock } from "@/components/code-block";
import { CrumbBar } from "@/components/crumb-bar";
import { DocsNav } from "@/components/docs-nav";

export const metadata: Metadata = { title: "Tokens" };

export default function TokensPage() {
  const { color, type, grid } = rasterTokens;
  return (
    <>
      <CrumbBar trail={[{ label: "Raster", href: "/" }, { label: "Docs" }, { label: "Tokens" }]} />
      <div className="site-layout">
        <DocsNav />
        <main className="site-content">
          <header className="cover" style={{ paddingBottom: 8 }}>
            <h1 className="rs-t-display">Tokens</h1>
            <p className="rs-t-sub">
              One source of truth in TypeScript; JSON and CSS custom properties are generated from
              it. Import the typed object, fetch the JSON, or use the custom properties directly.
            </p>
          </header>

        <h2 className="section-label">The neutral scale</h2>
        <p className="rs-t-body">Ink to paper — there is no accent hue anywhere in the system.</p>
        <div style={{ display: "flex", gap: 0, margin: "16px 0 28px", border: "1px solid var(--divider)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
          {color.neutralScale.map((hex) => (
            <div key={hex} style={{ flex: 1, height: 56, background: hex }} title={hex} />
          ))}
        </div>

        <h2 className="section-label">Type scale</h2>
        <table className="rs-table">
          <thead>
            <tr>
              <th>Style</th>
              <th>Size</th>
              <th>Weight</th>
              <th>Tracking</th>
            </tr>
          </thead>
          <tbody>
            {type.scale.map((s) => (
              <tr key={s.name}>
                <td>{s.name}</td>
                <td>{s.px}px</td>
                <td>{s.weight}</td>
                <td>{s.tracking}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="section-label">The grid</h2>
        <p className="rs-t-body">
          {grid.module}px modules — a {grid.column}px column plus a {grid.gutter}px gutter —
          drawn faintly across every page. Content boxes span whole modules, so edges step from
          grid line to grid line on resize.
        </p>

        <h2 className="section-label">Programmatic access</h2>
        <CodeBlock
          code={`import { rasterTokens } from "@raster/core";

rasterTokens.color.light.paper; // "${color.light.paper}"
rasterTokens.grid.module;       // ${grid.module}

// or over the wire
// GET /r/index.json     — the component registry
// npx raster tokens     — the token set as JSON`}
        />
        </main>
      </div>
    </>
  );
}
