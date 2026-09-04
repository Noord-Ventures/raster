// End-to-end checks over the exported site (apps/www/out): every catalogue
// page passes axe, the skip link works, the phone menu closes on Escape
// and hands focus back, nothing scrolls sideways at 390px, and controls
// in the previews meet the 44px phone hit size. Chromium via Playwright.
//
//   pnpm --filter www build && node scripts/e2e.mjs
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { chromium } from "playwright";

const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const out = fileURLToPath(new URL("../out", import.meta.url));
const { catalogComponents } = await import("@noorddev/raster");

const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".woff2": "font/woff2", ".webp": "image/webp", ".png": "image/png", ".svg": "image/svg+xml", ".txt": "text/plain", ".md": "text/markdown" };
const server = createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let file = join(out, p);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file)) file = join(out, `${p.replace(/\/$/, "")}.html`);
  if (!existsSync(file)) file = join(out, "404.html");
  res.setHeader("content-type", types[extname(file)] ?? "application/octet-stream");
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, r));
const base = `http://localhost:${server.address().port}`;

const failures = [];
const fail = (msg) => failures.push(msg);
const browser = await chromium.launch();

/* axe on every page, desktop. */
const pages = ["/", "/docs/", "/docs/tokens/", "/components/", "/about/", "/interfaces/", ...catalogComponents.map((c) => `/components/${c.name}/`)];
const desk = await browser.newPage({ viewport: { width: 1280, height: 900 } });
for (const path of pages) {
  const errors = [];
  desk.once("pageerror", (e) => errors.push(e.message));
  await desk.goto(base + path, { waitUntil: "networkidle" });
  await desk.addScriptTag({ content: axeSource });
  const result = await desk.evaluate(() =>
    axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"] }, rules: { region: { enabled: false } } }),
  );
  for (const v of result.violations) {
    fail(`${path}: axe ${v.id} (${v.impact}): ${v.help}\n      ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join("\n      ")}`);
  }
  for (const e of errors) fail(`${path}: page error ${e}`);
  if ((await desk.locator("main").count()) !== 1) fail(`${path}: expected exactly one <main>`);
}

/* Skip link. */
await desk.goto(`${base}/components/dialog/`, { waitUntil: "networkidle" });
await desk.keyboard.press("Tab");
if ((await desk.evaluate(() => document.activeElement?.className)) !== "skip-link") fail("skip link is not the first tab stop");
await desk.keyboard.press("Enter");
if (!(await desk.evaluate(() => location.hash === "#main"))) fail("skip link does not target #main");
await desk.close();

/* Phone. */
const phone = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
for (const path of ["/", "/docs/", "/components/", "/components/button/", "/components/select/", "/components/data-table/", "/about/", "/interfaces/evening/"]) {
  await phone.goto(base + path, { waitUntil: "networkidle" });
  const overflow = await phone.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (overflow > 0) fail(`${path}: horizontal overflow of ${overflow}px at 390px`);
}
await phone.goto(`${base}/components/button/`, { waitUntil: "networkidle" });
const small = await phone.evaluate(() =>
  [...document.querySelectorAll(".preview-box button, .preview-box input:not([type=hidden]), .preview-box a[href], .preview-box [role=option]")]
    .filter((el) => el.getClientRects().length && getComputedStyle(el).visibility !== "hidden")
    .map((el) => [el.tagName + (el.className ? `.${String(el.className).split(" ")[0]}` : ""), el.getBoundingClientRect().height])
    .filter(([, h]) => h > 0 && h < 44),
);
for (const [what, h] of small) fail(`phone: ${what} is ${Math.round(h)}px tall, under the 44px hit size`);
await phone.click(".nav-toggle");
await phone.waitForTimeout(250);
if (!(await phone.evaluate(() => document.activeElement?.closest("#navPanel") != null))) fail("phone menu: focus did not move into the panel");
await phone.keyboard.press("Escape");
await phone.waitForTimeout(250);
if (await phone.evaluate(() => document.querySelector("#navPanel")?.getAttribute("data-open") === "true")) fail("phone menu: Escape did not close it");
if (!(await phone.evaluate(() => document.activeElement?.classList.contains("nav-toggle")))) fail("phone menu: focus did not return to the toggle");
await phone.close();

await browser.close();
server.close();
if (failures.length) {
  console.error(`${failures.length} failure(s)\n\n${failures.map((f) => `  ✗ ${f}`).join("\n")}`);
  process.exit(1);
}
console.log(`e2e ok: ${pages.length} pages pass axe, skip link and phone menu behave, no sideways scroll at 390px`);
