import type { Metadata } from "next";
import { concentricInner, rasterTokens } from "@noorddev/raster";
import { CodeBlock } from "@/components/code-block";
import { DocsNav } from "@/components/docs-nav";

export const metadata: Metadata = { title: "Tokens" };

export default function TokensPage() {
  const { color, type, grid, radius, motion } = rasterTokens;
  return (
    <>
      <div className="site-layout">
        <DocsNav />
        <main className="site-content">
          <header className="cover" style={{ paddingBottom: 8 }}>
            <h1 className="rs-t-display">Tokens</h1>
            <p className="rs-t-sub">
              Defined once in TypeScript. The JSON and the CSS custom properties are generated.
            </p>
          </header>

        <h2 className="section-label">The neutral scale</h2>
        <p className="rs-t-body">Ink to paper. There is no accent.</p>
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
          {grid.module}px modules: a {grid.column}px column and a {grid.gutter}px gutter,
          drawn faintly across every page. Content boxes span whole modules; edges step from
          grid line to grid line on resize.
        </p>

        <h2 className="section-label">Radius</h2>
        <p className="rs-t-body">
          Chrome stays {radius.chrome}. Surfaces that use a radius keep nested
          corners concentric: {radius.concentric}.
        </p>
        <CodeBlock
          code={`import { innerRadius, concentricInner, concentricOuter } from "@noorddev/raster";

innerRadius(28, 16);      // ${concentricInner(28, 16)}
concentricInner(28, 16);  // ${concentricInner(28, 16)}
concentricOuter(12, 16);  // 28

// CSS: --rs-out and --rs-gap; --rs-in is the closed form of the fit.`}
        />

        <h2 className="section-label">Motion</h2>
        <p className="rs-t-body">
          {motion.rule} Snap {motion.snap}, ease {motion.ease}, confirm {motion.confirm}. Curve {motion.easing}.
        </p>

        <h2 className="section-label">Programmatic access</h2>
        <CodeBlock
          code={`import { rasterTokens } from "@noorddev/raster";

rasterTokens.color.light.paper; // "${color.light.paper}"
rasterTokens.grid.module;       // ${grid.module}

// or over the wire
// GET https://raster.noord.dev/r/index.json
// npx @noorddev/raster-cli tokens`}
        />
        </main>
      </div>
    </>
  );
}
