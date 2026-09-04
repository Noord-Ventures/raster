import type { Metadata } from "next";
import { Callout } from "@noorddev/raster-react";
import { chrome } from "@/app/site.stylex";
import { CodeBlock } from "@/components/code-block";
import { DocsNav } from "@/components/docs-nav";
import { sx } from "@/lib/sx";
import { COMMAND, DOOR, HOST, LAW, PACKAGES_PUBLISHED } from "../specimen";

export const metadata: Metadata = {
  title: "Getting started",
  description: LAW,
  alternates: { canonical: `${DOOR}/docs/` },
};

export default function DocsPage() {
  const cover = sx("cover", chrome.cover);
  return (
    <div className="site-layout">
      <DocsNav />
      <main id="main" {...sx("site-content", chrome.content)}>
        <header className={cover.className} style={{ ...cover.style, paddingBottom: 8 }}>
          <h1 className="rs-t-display">Getting started</h1>
          <p className="rs-t-sub">
            CSS you own. CSS-first, no Radix, no Tailwind. The door is {DOOR.replace("https://", "")}.
          </p>
          {PACKAGES_PUBLISHED ? null : (
            <p className="rs-t-body">
              Not on npm. This ship does not offer a CLI install. Clone the repo, or wait for
              publish. Do not run an unpublished package name.
            </p>
          )}
        </header>

      {PACKAGES_PUBLISHED ? (
        <>
          <h2 className="section-label">1. Initialize</h2>
          <CodeBlock code={COMMAND} />
          <p className="rs-t-body">
            Writes <code className="rs-code">styles/raster.css</code> (tokens, Inter, base
            styles, component classes), the Inter files,{" "}
            <code className="rs-code">index.html</code> (a specimen page, not a shell), and{" "}
            <code className="rs-code">raster.json</code>. The specimen already links the
            stylesheet. Raster is CSS-first: plain <code className="rs-code">rs-*</code>{" "}
            classes on plain markup. Set <code className="rs-code">data-theme=&quot;dark&quot;</code> on the
            root element for the dark scheme.
          </p>

          <h2 className="section-label">2. Add components</h2>
          <CodeBlock code={COMMAND.replace("init", "add button dialog switch")} />
          <p className="rs-t-body">
            Copies React source into <code className="rs-code">components/raster/</code>.
            Registry dependencies install with it; dialog pulls button. CSS-only components need
            no code, the classes are already in raster.css;{" "}
            <code className="rs-code">add</code> prints the snippet. The registry lives at{" "}
            <code className="rs-code">{HOST}/r/&lt;name&gt;.json</code>.
          </p>
        </>
      ) : (
        <>
          <h2 className="section-label">1. CSS-first</h2>
          <CodeBlock code={`<link rel="stylesheet" href="styles/raster.css" />`} />
          <p className="rs-t-body">
            Raster is CSS-first: plain <code className="rs-code">rs-*</code> classes on plain
            markup. From this repo, the stylesheet is{" "}
            <code className="rs-code">packages/core/css/raster.css</code> (also exported as{" "}
            <code className="rs-code">@noorddev/raster/css</code> after publish). Set{" "}
            <code className="rs-code">data-theme=&quot;dark&quot;</code> on the root element for the
            dark scheme. There is no CDN.
          </p>

          <h2 className="section-label">2. Registry</h2>
          <p className="rs-t-body">
            Each component is a shadcn registry item at{" "}
            <code className="rs-code">{HOST}/r/&lt;name&gt;.json</code>
            . After npm publish, the Raster CLI will copy React source into{" "}
            <code className="rs-code">components/raster/</code>. Until then, read the source in
            this repo.
          </p>
        </>
      )}

      <Callout>
        <p className="rs-t-label">StyleX</p>
        <p className="rs-t-body">
          The React layer is authored in StyleX — compile-time atomic CSS, typed against Raster tokens. The CSS file is still the door if you do not want React.
        </p>
      </Callout>

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
      {PACKAGES_PUBLISHED ? <CodeBlock code={`${COMMAND} --compat`} /> : null}
      <p className="rs-t-body">
        0.2 renamed every class to the <code className="rs-code">rs-</code> prefix. The
        generated <code className="rs-code">raster-compat.css</code> keeps the 0.1 names (
        <code className="rs-code">bb-*</code>, <code className="rs-code">lib-*</code>, bare{" "}
        <code className="rs-code">table</code>) working. Link it after raster.css.
      </p>
      </main>
    </div>
  );
}
