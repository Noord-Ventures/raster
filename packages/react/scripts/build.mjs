// Builds @noorddev/raster-react as precompiled StyleX.
//
//   src/**/*.ts(x)  →  dist/**/*.js     one ESM module per source file, StyleX
//                                        already compiled, "use client" kept
//                   →  dist/raster-react.css
//                                        Raster base (tokens, page, type, touch,
//                                        motion) + every compiled leaf, in layers
//                   →  dist/**/*.d.ts    via tsc
//
// Consumers import the package and one stylesheet. No Babel, no PostCSS.
// StyleX users can still `import { raster } from "@noorddev/raster-react/stylex"`
// to write leaves against Raster tokens.

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const require = createRequire(import.meta.url);
const babel = require("@babel/core");
const stylexPlugin = require("@stylexjs/babel-plugin");

const pkgDir = fileURLToPath(new URL("..", import.meta.url));
const srcDir = join(pkgDir, "src");
const distDir = join(pkgDir, "dist");
const coreCss = resolve(pkgDir, "../core/css");

rmSync(distDir, { recursive: true, force: true });
mkdirSync(distDir, { recursive: true });

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (/\.(ts|tsx)$/.test(name)) acc.push(p);
  }
  return acc;
}

/* Relative imports get explicit .js extensions so Node ESM resolves them. */
function jsExtensions({ types: t }) {
  const fix = (node, file) => {
    const spec = node.value;
    if (!spec.startsWith(".")) return;
    const base = resolve(dirname(file), spec);
    const target = [`${base}.tsx`, `${base}.ts`, join(base, "index.tsx"), join(base, "index.ts")].find((c) => existsSync(c));
    if (!target) return;
    let rel = relative(dirname(file), target).replace(/\\/g, "/").replace(/\.(tsx|ts)$/, ".js");
    if (!rel.startsWith(".")) rel = `./${rel}`;
    node.value = rel;
  };
  return {
    visitor: {
      ImportDeclaration(path, state) {
        fix(path.node.source, state.filename);
      },
      ExportNamedDeclaration(path, state) {
        if (path.node.source) fix(path.node.source, state.filename);
      },
      ExportAllDeclaration(path, state) {
        fix(path.node.source, state.filename);
      },
    },
  };
}

const rules = [];
for (const file of walk(srcDir)) {
  const result = babel.transformSync(readFileSync(file, "utf8"), {
    filename: file,
    babelrc: false,
    configFile: false,
    sourceMaps: true,
    presets: [
      ["@babel/preset-typescript", { isTSX: file.endsWith(".tsx"), allExtensions: true, onlyRemoveTypeImports: true }],
      ["@babel/preset-react", { runtime: "automatic" }],
    ],
    plugins: [
      [
        stylexPlugin,
        {
          dev: false,
          runtimeInjection: false,
          treeshakeCompensation: true,
          enableInlinedConditionalMerge: true,
          unstable_moduleResolution: { type: "commonJS", rootDir: pkgDir },
        },
      ],
      jsExtensions,
    ],
  });
  if (result.metadata?.stylex) rules.push(...result.metadata.stylex);
  const dest = join(distDir, relative(srcDir, file)).replace(/\.(tsx|ts)$/, ".js");
  mkdirSync(dirname(dest), { recursive: true });
  const mapName = `${dest.split("/").pop()}.map`;
  writeFileSync(dest, `${result.code}\n//# sourceMappingURL=${mapName}\n`);
  writeFileSync(`${dest}.map`, JSON.stringify(result.map));
}

/* One stylesheet: Raster base layers + the compiled leaves. */
const compiled = stylexPlugin.processStylexRules(rules, true);
const read = (f) => readFileSync(join(coreCss, f), "utf8");
const base = [
  ["raster.tokens", "tokens.css"],
  ["raster.base", "base.css"],
  ["raster.type", "type.css"],
];
const tail = [
  ["raster.touch", "touch.css"],
  ["raster.motion", "motion.css"],
];
const css =
  `/* @noorddev/raster-react. Raster base + compiled StyleX leaves. Generated. */\n` +
  read("fonts.css") +
  `\n@layer raster.tokens, raster.base, raster.type, raster.components, raster.touch, raster.motion;\n\n` +
  base.map(([name, f]) => `@layer ${name} {\n${read(f)}\n}\n`).join("\n") +
  `@layer raster.components {\n${compiled}\n}\n` +
  tail.map(([name, f]) => `@layer ${name} {\n${read(f)}\n}\n`).join("\n");
writeFileSync(join(distDir, "raster-react.css"), css);
writeFileSync(join(distDir, "raster-react.css.d.ts"), "export {};\n");
cpSync(join(coreCss, "fonts"), join(distDir, "fonts"), { recursive: true });

/* Types. */
execFileSync("npx", ["tsc", "-p", "tsconfig.build.json"], { cwd: pkgDir, stdio: "inherit" });
console.log(`built dist: ${rules.length} StyleX rules → raster-react.css (${css.length} bytes)`);
