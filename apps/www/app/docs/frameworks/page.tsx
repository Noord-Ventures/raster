import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import { DocsShell } from "@/components/docs-shell";
import { DOOR } from "../../specimen";

export const metadata: Metadata = {
  title: "Frameworks",
  description: "Raster in Next.js, Vite, Remix and React Router, Astro, and plain HTML.",
  alternates: { canonical: `${DOOR}/docs/frameworks/` },
};

const next = `// app/layout.tsx
import "@noorddev/raster-react/css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}

// app/page.tsx: a Server Component. Dialog is "use client" already.
import { Button, Dialog } from "@noorddev/raster-react";`;

const nextExport = `// next.config.mjs
export default { output: "export", trailingSlash: true };`;

const vite = `// src/main.tsx
import "@noorddev/raster-react/css";
import { createRoot } from "react-dom/client";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(<App />);`;

const remix = `// app/root.tsx (React Router 7 framework mode, Remix)
import "@noorddev/raster-react/css";

// or, with the links() convention:
import rasterStyles from "@noorddev/raster-react/css?url";
export const links = () => [{ rel: "stylesheet", href: rasterStyles }];`;

const astro = `---
// src/layouts/Base.astro
import "@noorddev/raster-react/css";
import { Button } from "@noorddev/raster-react";
import { Dialog } from "@noorddev/raster-react";
---
<html lang="en">
  <body>
    <Button>Static, no JavaScript shipped</Button>
    <Dialog client:load open={false}>…</Dialog>
    <slot />
  </body>
</html>`;

const html = `<!doctype html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="node_modules/@noorddev/raster/css/raster.css" />
  </head>
  <body>
    <div class="rs-field">
      <label class="rs-field-label" for="name">Name</label>
      <input class="rs-input rs-input-full" id="name" />
    </div>
    <button class="rs-btn-primary">Save</button>
  </body>
</html>`;

export default function FrameworksPage() {
  return (
    <DocsShell
      title="Frameworks"
      summary="One stylesheet import, then components. Each framework below is what the packages actually export."
    >
      <h2 className="section-label">Next.js</h2>
      <CodeBlock code={next} />
      <p className="rs-t-body">
        App router. Import the stylesheet once in the root layout. Components that hold state carry{" "}
        <code className="rs-code">&quot;use client&quot;</code> inside the package, so a Server
        Component can render them directly. Static export works; this site is one:
      </p>
      <CodeBlock code={nextExport} />
      <p className="rs-t-body">
        For the dark scheme without a flash, set{" "}
        <code className="rs-code">data-theme</code> in an inline script before hydration and add{" "}
        <code className="rs-code">suppressHydrationWarning</code> on{" "}
        <code className="rs-code">&lt;html&gt;</code>. See{" "}
        <a className="rs-link" href="/docs/theming">
          Theming
        </a>
        . Writing your own StyleX leaves in Next is covered in{" "}
        <a className="rs-link" href="/docs/stylex">
          StyleX
        </a>
        .
      </p>

      <h2 className="section-label">Vite</h2>
      <CodeBlock code={vite} />
      <p className="rs-t-body">
        Nothing to configure. Vite bundles the CSS import and keeps the package&apos;s ESM modules.
        Add <code className="rs-code">@stylexjs/unplugin</code> only if you write leaves of your own.
      </p>

      <h2 className="section-label">Remix and React Router</h2>
      <CodeBlock code={remix} />
      <p className="rs-t-body">
        Side-effect CSS imports work in React Router 7 framework mode and Remix on Vite. Projects on
        the <code className="rs-code">links()</code> convention use the{" "}
        <code className="rs-code">?url</code> import instead. Dialog, Sheet, and Drawer render a
        native <code className="rs-code">&lt;dialog&gt;</code> and open after hydration, so
        server-rendered markup stays inert until React attaches.
      </p>

      <h2 className="section-label">Astro</h2>
      <CodeBlock code={astro} />
      <p className="rs-t-body">
        Import the stylesheet in a layout. Stateless components (Button, Badge, Card, Table) render
        to HTML with no client JavaScript. Interactive ones (Dialog, Select, Tabs, the menus) need a
        client directive; <code className="rs-code">client:load</code> is the simplest.
      </p>

      <h2 className="section-label">Plain HTML</h2>
      <CodeBlock code={html} />
      <p className="rs-t-body">
        Install <code className="rs-code">@noorddev/raster</code>, or copy{" "}
        <code className="rs-code">raster.css</code> and the Inter files with{" "}
        <code className="rs-code">npx @noorddev/raster-cli init</code>. Every component page lists
        its markup and classes; the behaviour that needs no script (details, dialog, popover, scroll
        snap) comes from the browser. Set <code className="rs-code">data-theme=&quot;dark&quot;</code>{" "}
        on <code className="rs-code">&lt;html&gt;</code> for the dark scheme.
      </p>

      <h2 className="section-label">Exports</h2>
      <div className="docs-table" tabIndex={0}>
        <table className="rs-table">
          <thead>
            <tr className="rs-table-row">
              <th className="rs-table-th">Specifier</th>
              <th className="rs-table-th">Contains</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["@noorddev/raster-react", "Every component, cx, rs, the icon set, the token vars"],
              ["@noorddev/raster-react/css", "The precompiled stylesheet, 42 KB, layered"],
              ["@noorddev/raster-react/components/<name>", "One component module"],
              ["@noorddev/raster-react/tokens.stylex", "raster and mq for your own StyleX leaves"],
              ["@noorddev/raster", "rasterTokens, the registry, the radius helpers"],
              ["@noorddev/raster/css", "raster.css, 84 KB, every rs-* class"],
              ["@noorddev/raster/css/components.css", "Components only, for pages that already load the React stylesheet"],
              ["@noorddev/raster/css/tokens.css", "The custom properties alone"],
              ["@noorddev/raster/css/components/<name>.css", "One component's CSS"],
              ["@noorddev/raster/tokens", "The tokens as JSON"],
              ["@noorddev/raster/props", "Every export's props as JSON"],
            ].map(([spec, holds]) => (
              <tr key={spec} className="rs-table-row">
                <td className="rs-table-td">
                  <code>{spec}</code>
                </td>
                <td className="rs-table-td">{holds}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DocsShell>
  );
}
