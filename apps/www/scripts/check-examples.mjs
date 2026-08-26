// Every catalog name owns one Use file. No shared dump.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = fileURLToPath(new URL("../../..", import.meta.url));
const examples = join(root, "apps/www/components/examples");
const registry = readFileSync(join(root, "packages/core/src/registry.ts"), "utf8");
const names = [...registry.matchAll(/^\s+name:\s+"([a-z0-9-]+)"/gm)].map((m) => m[1]);

if (names.length === 0) {
  console.error("No component names found in registry.ts");
  process.exit(1);
}

const missing = names.filter((name) => !existsSync(join(examples, name, "use.tsx")));
const dirs = readdirSync(examples, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);
const extras = dirs.filter((d) => !names.includes(d));

if (missing.length) {
  console.error("Missing Use file:\n" + missing.map((n) => `  ${n}`).join("\n"));
  process.exit(1);
}
if (extras.length) {
  console.error("Orphan Use folders:\n" + extras.map((n) => `  ${n}`).join("\n"));
  process.exit(1);
}

const slot = readFileSync(join(examples, "use-slot.tsx"), "utf8");
const unmapped = names.filter((name) => !slot.includes(`"${name}"`) && !new RegExp(`(?:^|\\n)\\s+${name}:`, "m").test(slot));
if (unmapped.length) {
  console.error("use-slot.tsx missing imports:\n" + unmapped.map((n) => `  ${n}`).join("\n"));
  process.exit(1);
}

const page = readFileSync(join(root, "apps/www/app/components/[name]/page.tsx"), "utf8");
if (!page.includes("UseSlot") || page.indexOf("UseSlot") > page.indexOf("preview-box")) {
  console.error("Component pages must render UseSlot above the preview-box specimen");
  process.exit(1);
}

const catalog = readFileSync(join(root, "apps/www/app/components/page.tsx"), "utf8");
if (!catalog.includes("UseSlot")) {
  console.error("Catalog tiles must preview the same Use composition");
  process.exit(1);
}

console.log(`ok: ${names.length} isolated Use files`);
