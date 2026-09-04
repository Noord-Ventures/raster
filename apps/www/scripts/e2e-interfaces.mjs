// Run against a development or preview server: SITE_URL=http://localhost:3000 node scripts/e2e-interfaces.mjs
import assert from "node:assert/strict";
import { chromium } from "playwright";

const base = process.env.SITE_URL || "http://localhost:3000";
const slugs = ["graphics", "render", "drive", "orbit", "frontier", "platforms", "line", "press", "wall", "night", "evening", "room"];
const browser = await chromium.launch({
  ...(process.env.PLAYWRIGHT_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH } : {}),
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const failures = [];
const componentLinks = new Set();
try {
  for (const [scheme, widths] of [["dark", [320, 390, 768, 1024, 1440]], ["light", [390, 1440]]]) {
    const page = await browser.newPage({ colorScheme: scheme, reducedMotion: "reduce" });
    let route = "";
    page.on("pageerror", error => failures.push(`${scheme} ${route}: ${error.message}`));
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      for (const slug of ["", ...slugs]) {
        route = `/interfaces/${slug ? slug + "/" : ""}`;
        const response = await page.goto(base + route, { waitUntil: "networkidle" });
        if (!response?.ok()) failures.push(`${route}: HTTP ${response?.status()}`);
        const layout = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          main: document.querySelectorAll("main").length,
          headings: document.querySelectorAll("h1").length,
          build: !!document.getElementById("build-with-vlak"),
          buildGutters: (() => {
            const build = document.getElementById("build-with-vlak");
            if (!build) return null;
            const box = build.getBoundingClientRect();
            const content = build.closest(".if-detail-content").getBoundingClientRect();
            return [content.left - box.left, box.right - content.right];
          })(),
          nextDivider: (() => {
            const nav = document.querySelector(".if-next-study");
            if (!nav) return null;
            const style = getComputedStyle(nav, "::before");
            return [style.left, style.right];
          })(),
          clippedBuildActions: Array.from(document.querySelectorAll(".if-build button")).filter(button => {
            const box = button.getBoundingClientRect();
            const section = button.closest(".if-build").getBoundingClientRect();
            return box.left < section.left || box.right > section.right;
          }).map(button => button.textContent),
          links: Array.from(document.querySelectorAll(".if-component-list a"), el => el.getAttribute("href")),
          controlRadii: Array.from(document.querySelectorAll(".cx-graphics > header button, .cx-graphics > aside > button, .cx-graphics textarea, .cx-segments"), el => getComputedStyle(el).borderRadius),
          clippedFormats: Array.from(document.querySelectorAll(".cx-format-label")).filter(label => {
            const button = label.closest("button").getBoundingClientRect();
            const text = label.getBoundingClientRect();
            return text.left < button.left + 6 || text.right > button.right - 6;
          }).map(label => label.textContent),
        }));
        if (layout.overflow > 1) failures.push(`${scheme} ${width}px ${route}: ${layout.overflow}px page overflow`);
        if (layout.main !== 1 || layout.headings !== 1) failures.push(`${route}: expected one main and h1, got ${layout.main}/${layout.headings}`);
        if (slug && !layout.build) failures.push(`${route}: missing build section`);
        if (layout.buildGutters?.some(gutter => Math.abs(gutter - 20) > 1)) failures.push(`${width}px ${route}: build box must extend into both gutters`);
        if (layout.nextDivider?.some(edge => edge !== "-20px")) failures.push(`${width}px ${route}: next-study divider must extend into both gutters`);
        if (layout.clippedBuildActions.length) failures.push(`${width}px ${route}: clipped build actions: ${layout.clippedBuildActions.join(", ")}`);
        if (layout.controlRadii.some(radius => radius !== "4px")) failures.push(`${width}px ${route}: generator controls lost their 4px radius`);
        if (layout.clippedFormats.length) failures.push(`${width}px ${route}: clipped format labels: ${layout.clippedFormats.join(", ")}`);
        layout.links.forEach(href => componentLinks.add(href));
      }
      console.log(`${scheme} ${width}px: checked gallery and twelve studies`);
    }
    await page.close();
  }

  assert.equal(failures.length, 0, failures.join("\n"));
  const context = await browser.newContext({ permissions: ["clipboard-read", "clipboard-write"], viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(base + "/interfaces/", { waitUntil: "networkidle" });
  assert.equal(await page.locator(".if-tile").count(), 12);
  assert.match(await page.locator(".if-tile").first().getAttribute("href"), /graphics/);
  await page.goto(base + "/interfaces/graphics/", { waitUntil: "networkidle" });
  await page.locator(".if-build-link").click();
  await page.waitForFunction(() => location.hash === "#build-with-vlak");
  await page.waitForFunction(() => {
    const top = document.getElementById("build-with-vlak").getBoundingClientRect().top;
    return top >= 60 && top < 400;
  });
  const top = await page.locator("#build-with-vlak").evaluate(el => el.getBoundingClientRect().top);
  assert(top >= 60 && top < 400, `Build section should land below mobile navigation, got ${top}px`);
  await page.getByRole("button", { name: "Copy install", exact: true }).click();
  assert.equal(await page.evaluate(() => navigator.clipboard.readText()), "npm install @noorddev/vlak-react");
  await page.getByRole("button", { name: "Copy build brief", exact: true }).click();
  assert.match(await page.evaluate(() => navigator.clipboard.readText()), /https:\/\/vlak.dev\/design.md/);
  assert.match(await page.evaluate(() => navigator.clipboard.readText()), /interfaces\/graphics/);
  const guide = await page.request.get(base + "/design.md");
  assert(guide.ok(), "Design guide should be available");
  assert.match(await guide.text(), /Vlak/);
  for (const href of componentLinks) {
    const response = await page.request.get(base + href);
    if (!response.ok()) failures.push(`${href}: component link HTTP ${response.status()}`);
  }
  await page.evaluate(() => Object.defineProperty(navigator.clipboard, "writeText", { configurable: true, value: () => Promise.reject(new Error("denied")) }));
  await page.locator(".if-install .if-copy-action button").click();
  assert(await page.getByRole("status").filter({ hasText: "Clipboard unavailable" }).isVisible(), "Clipboard failure should expose copyable text");
  console.log("Conversion: install and brief clipboard, failure fallback, build anchor, guide, and component links passed");
  await context.close();
  assert.equal(failures.length, 0, failures.join("\n"));
  console.log("Interface checks passed");
} finally {
  await browser.close();
}
