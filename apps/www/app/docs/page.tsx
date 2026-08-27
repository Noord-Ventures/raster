import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import { DocsNav } from "@/components/docs-nav";
import { COMMAND, DOOR, HOST, LAW } from "../specimen";

export const metadata: Metadata = {
  title: "Getting started",
  description: LAW,
};

export default function DocsPage() {
  return (
    <>
      <div className="site-layout">
        <DocsNav />
        <main className="site-content">
          <header className="cover" style={{ paddingBottom: 8 }}>
            <h1 className="rs-t-display">Getting started</h1>
            <p className="rs-t-sub">
              CSS you own. The door is {DOOR.replace("https://", "")}.
            </p>
          </header>

        <h2 className="section-label">1. Initialize</h2>
        <CodeBlock code={COMMAND} />
        <p className="rs-t-body">
          Writes <code className="rs-code">styles/raster.css</code> (tokens, Inter, base
          styles, component classes), the Inter files, and{" "}
          <code className="rs-code">raster.json</code>. Link the stylesheet or import it in
          your root layout. Set <code className="rs-code">data-theme=&quot;dark&quot;</code> on the
          root element for the dark scheme.
        </p>

        <h2 className="section-label">2. Add components</h2>
        <CodeBlock code="npx @noorddev/raster-cli add button dialog switch" />
        <p className="rs-t-body">
          Copies React source into <code className="rs-code">components/raster/</code>.
          Registry dependencies install with it; dialog pulls button. CSS-only components need
          no code, the classes are already in raster.css;{" "}
          <code className="rs-code">add</code> prints the snippet.
        </p>

        <h2 className="section-label">Using shadcn&apos;s CLI instead</h2>
        <CodeBlock code={`npx shadcn add ${HOST}/r/button.json`} />
        <p className="rs-t-body">
          Each component is also a shadcn registry item at{" "}
          <code className="rs-code">{HOST}/r/&lt;name&gt;.json</code>
          , on the host we run today.
        </p>

        <h2 className="section-label">The typeface</h2>
        <p className="rs-t-body">
          Raster is set in Inter (SIL OFL 1.1). The variable face, latin + latin-ext, is
          bundled. System sans is fallback only. Weights: 500 body, 600 headings and labels.
        </p>

        <h2 className="section-label">Coming from Raster 0.1</h2>
        <CodeBlock code={`${COMMAND} --compat`} />
        <p className="rs-t-body">
          0.2 renamed every class to the <code className="rs-code">rs-</code> prefix. The
          compat flag also writes <code className="rs-code">raster-compat.css</code>, which
          keeps the 0.1 names (<code className="rs-code">bb-*</code>,{" "}
          <code className="rs-code">lib-*</code>, bare <code className="rs-code">table</code>)
          working.
        </p>
        </main>
      </div>
    </>
  );
}
