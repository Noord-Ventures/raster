import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import { DocsNav } from "@/components/docs-nav";

export const metadata: Metadata = { title: "Getting started" };

export default function DocsPage() {
  return (
    <>
      <div className="site-layout">
        <DocsNav />
        <main className="site-content">
          <header className="cover" style={{ paddingBottom: 8 }}>
            <h1 className="rs-t-display">Getting started</h1>
            <p className="rs-t-sub">
              Raster installs as plain CSS plus components you own. There is no runtime
              dependency — not on Raster, not on anything else.
            </p>
          </header>

        <h2 className="section-label">1. Initialize</h2>
        <CodeBlock code={`npx raster init`} />
        <p className="rs-t-body">
          This writes <code className="rs-code">styles/raster.css</code> — tokens, base styles,
          and every component class — plus a <code className="rs-code">raster.json</code> config.
          Link the stylesheet or import it in your root layout, and set{" "}
          <code className="rs-code">data-theme=&quot;dark&quot;</code> on the root element for the
          dark scheme.
        </p>

        <h2 className="section-label">2. Add components</h2>
        <CodeBlock code={`npx raster add button dialog switch`} />
        <p className="rs-t-body">
          React source is vendored into{" "}
          <code className="rs-code">components/raster/</code> — the code is yours, edit it
          freely. Registry dependencies come along automatically (dialog pulls button).
          CSS-only components need no code at all: the classes are already in raster.css, and{" "}
          <code className="rs-code">add</code> prints the markup snippet.
        </p>

        <h2 className="section-label">Using shadcn&apos;s CLI instead</h2>
        <CodeBlock code={`npx shadcn add https://raster.noord.dev/r/button.json`} />
        <p className="rs-t-body">
          Every component is also published as a shadcn-compatible registry item at{" "}
          <code className="rs-code">/r/&lt;name&gt;.json</code>, so teams already on shadcn
          tooling can install Raster components without switching CLIs.
        </p>

        <h2 className="section-label">The typeface</h2>
        <p className="rs-t-body">
          Raster is set in Messina Sans (Luzi Type, Zürich). The font is commercially licensed
          and not bundled — provide your own <code className="rs-code">@font-face</code> for{" "}
          <code className="rs-code">&apos;Messina Sans&apos;</code>, or the stack falls back to
          system sans. Weights: 500 for body, 600 for headings and labels.
        </p>

        <h2 className="section-label">Coming from Raster 0.1</h2>
        <CodeBlock code={`npx raster init --compat`} />
        <p className="rs-t-body">
          0.2 normalized every class to the <code className="rs-code">rs-</code> prefix. The
          compat flag also writes <code className="rs-code">raster-compat.css</code>, which keeps
          the 0.1 names (<code className="rs-code">bb-*</code>,{" "}
          <code className="rs-code">lib-*</code>, bare <code className="rs-code">table</code>)
          working while you migrate.
        </p>
        </main>
      </div>
    </>
  );
}
