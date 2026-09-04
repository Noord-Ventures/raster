// Installs the packed tarballs into a throwaway project, the way a user
// gets them from npm, and exercises every public surface:
//
//   - @noorddev/raster: tokens, registry, the CSS export, the props JSON
//   - @noorddev/raster-react: server render of components with no compiler,
//     the stylesheet, per-component entries, the .stylex token file
//   - @noorddev/raster-cli: init + add from the tarball, offline
//   - publint and are-the-types-wrong on each tarball
//
// Run after `pnpm build`. Needs network for react/react-dom.
import { execFileSync, execSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const work = mkdtempSync(join(tmpdir(), "raster-smoke-"));
const run = (cmd, cwd = work) => execSync(cmd, { cwd, stdio: "pipe", encoding: "utf8" });
const log = (msg) => console.log(`[smoke] ${msg}`);

try {
  /* 1. Pack. */
  const tarballs = {};
  for (const pkg of ["core", "react", "cli"]) {
    const out = run(`pnpm pack --pack-destination ${work}`, join(root, "packages", pkg)).trim().split("\n").pop();
    tarballs[pkg] = out;
    log(`packed ${pkg}: ${out.split("/").pop()}`);
  }

  /* 2. publint + are-the-types-wrong. */
  for (const [pkg, file] of Object.entries(tarballs)) {
    run(`npx publint ${file}`, root);
    if (pkg !== "cli") run(`npx attw ${file} --profile esm-only`, root);
    log(`${pkg}: publint and attw clean`);
  }

  /* 3. A consumer project. */
  writeFileSync(join(work, "package.json"), JSON.stringify({ name: "consumer", private: true, type: "module" }, null, 2));
  run(`npm install --no-audit --no-fund --silent react@19 react-dom@19 ${tarballs.core} ${tarballs.react} ${tarballs.cli}`);
  log("installed into a consumer project");

  writeFileSync(
    join(work, "render.mjs"),
    `
import { renderToString } from "react-dom/server";
import { createElement as h } from "react";
import { rasterTokens, catalogComponents } from "@noorddev/raster";
import props from "@noorddev/raster/props" with { type: "json" };
import * as raster from "@noorddev/raster-react";
import { Button } from "@noorddev/raster-react/components/button";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const checks = [];
checks.push(["tokens", rasterTokens.color.light.paper === "#FAF8F2"]);
checks.push(["catalogue", catalogComponents.length >= 70]);
checks.push(["props json", typeof props.components === "object"]);
const html = renderToString(h("div", null,
  h(Button, null, "Hi"),
  h(raster.Dialog, { open: false, onClose() {} }, h(raster.DialogTitle, null, "T")),
  h(raster.Select, { options: [{ value: "a", label: "A" }], value: "a", onValueChange() {} }),
  h(raster.Tabs, { defaultValue: "a" }, h(raster.TabList, null, h(raster.Tab, { value: "a" }, "A")), h(raster.TabPanel, { value: "a" }, "P")),
  h(raster.LineChart, { series: [{ name: "Sheets", values: [1, 2, 3] }], labels: ["Mon", "Tue", "Wed"] }),
));
checks.push(["ssr renders", html.includes("rs-btn-primary")]);
checks.push(["css export", require.resolve("@noorddev/raster/css").endsWith("raster.css")]);
checks.push(["react css export", require.resolve("@noorddev/raster-react/css").endsWith("raster-react.css")]);
checks.push(["runtime tokens are var()", String(raster.raster.ink).startsWith("var(--") && raster.phone.startsWith("@media")]);
/* The .stylex file is for a consumer's StyleX compiler and must stay uncompiled; it is never imported at runtime. */
checks.push(["stylex token file is uncompiled", (await import("node:fs")).readFileSync(require.resolve("@noorddev/raster-react/tokens.stylex"), "utf8").includes("defineVars(")]);
const failed = checks.filter(([, ok]) => !ok);
for (const [name, ok] of checks) console.log((ok ? "  ✓ " : "  ✗ ") + name);
if (failed.length) process.exit(1);
`,
  );
  const out = run("node render.mjs");
  process.stdout.write(out);

  /* 3b. React 18: the peer range allows it, so every export must render there too,
     with no unknown-prop warnings (popoverTarget and inert are spelled per version). */
  const r18 = join(work, "r18");
  run(`mkdir -p ${r18}`);
  writeFileSync(join(r18, "package.json"), JSON.stringify({ name: "consumer-r18", private: true, type: "module" }, null, 2));
  run(`npm install --no-audit --no-fund --silent react@18 react-dom@18 ${tarballs.core} ${tarballs.react}`, r18);
  writeFileSync(
    join(r18, "render.mjs"),
    `
import { renderToString } from "react-dom/server";
import { createElement as h } from "react";
import * as R from "@noorddev/raster-react";
const warnings = new Set();
console.error = (...a) => { let i = 1; warnings.add(String(a[0]).replace(/%s/g, () => String(a[i++])).slice(0, 120)); };
const html = renderToString(h("div", null,
  h(R.Popover, { trigger: "More" }, h(R.PopoverBody, null, "Body")),
  h(R.CrumbBar, { trail: [{ label: "Docs", href: "#" }, { label: "Here" }] }),
  h(R.Dialog, { open: true, onClose() {} }, h(R.DialogTitle, null, "T"), h(R.DialogBody, null, "B")),
  h(R.Select, { options: [{ value: "a", label: "A" }], value: "a", "aria-label": "Pick" }),
  h(R.Tabs, { defaultValue: "a" }, h(R.TabList, null, h(R.Tab, { value: "a" }, "A")), h(R.TabPanel, { value: "a" }, "P")),
  h(R.Button, null, "Go"),
));
const bad = [...warnings].filter((w) => /does not recognize|non-boolean attribute|Invalid DOM property|Each child in a list/.test(w));
console.log("  " + (bad.length ? "✗" : "✓") + " react 18 renders " + html.length + " chars, " + bad.length + " prop warnings");
for (const w of bad) console.log("    " + w);
if (!html.includes("popovertarget=")) { console.log("    ✗ popovertarget attribute missing on React 18"); process.exit(1); }
if (bad.length) process.exit(1);
`,
  );
  process.stdout.write(run("node render.mjs", r18));
  log("react 18 render clean");

  /* 4. The CLI from its tarball, offline. */
  const app = join(work, "app");
  run(`mkdir -p ${app}`);
  run("npx raster init", app);
  run("npx raster add button dialog bar-chart", app);
  for (const f of ["styles/raster.css", "styles/fonts/inter/OFL.txt", "index.html", "raster.json", "components/raster/button.tsx", "components/raster/dialog.tsx", "components/raster/charts/bar.tsx", "components/raster/rs.ts"]) {
    if (!existsSync(join(app, f))) throw new Error(`cli: expected ${f}`);
  }
  const listed = JSON.parse(run("npx raster list --json", app));
  if (!Array.isArray(listed) || listed.length < 70) throw new Error("cli: list --json");
  log(`cli: init + add wrote the tree, list --json has ${listed.length} entries`);

  log("ok");
} finally {
  rmSync(work, { recursive: true, force: true });
}
