// Network integration checks for the actual licensed Vehicle embed.
// Build and serve the site first, then:
// SITE_URL=http://localhost:3100 PLAYWRIGHT_EXECUTABLE_PATH=/path/to/chrome node apps/www/scripts/e2e-vehicle.mjs
import assert from "node:assert/strict";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium } from "playwright";

const base = (process.env.SITE_URL ?? "http://localhost:3100").replace(/\/$/, "");
const artifacts = await mkdtemp(join(tmpdir(), "vlak-vehicle-"));
const browser = await chromium.launch(
  process.env.PLAYWRIGHT_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH } : undefined,
);
const distance = (a, b) => Math.hypot(...a.map((value, index) => value - b[index]));
const radius = (camera) => distance(camera.position, camera.target);
const errors = [];

async function openViewer(page) {
  await page.goto(base + "/interfaces/render/", { waitUntil: "domcontentloaded" });
  await page.locator(".cx-render").scrollIntoViewIfNeeded();
}
async function ready(page) {
  await page.waitForSelector('[data-viewer-status="ready"]', { timeout: 60000 });
}
async function inspect(page, method) {
  return page.evaluate((name) => new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("Viewer API response timed out: " + name)), 10000);
    window.vehicleQaApi[name]((error, value) => {
      clearTimeout(timeout);
      if (error) reject(new Error(String(error)));
      else resolve(value);
    });
  }), method);
}

try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  page.on("pageerror", (error) => errors.push(error.message));
  // Capture the public API returned to the app without adding test hooks to
  // production code or reading private state inside the cross-origin viewer.
  await page.addInitScript(() => {
    let viewerConstructor;
    Object.defineProperty(window, "Sketchfab", {
      configurable: true,
      get: () => viewerConstructor,
      set(value) {
        viewerConstructor = value;
        const original = value.prototype.init;
        value.prototype.init = function (id, options) {
          return original.call(this, id, { ...options, success(api) {
            window.vehicleQaApi = api;
            options.success(api);
          } });
        };
      },
    });
  });
  await openViewer(page);
  await ready(page);
  assert.match(await page.locator(".cx-vehicle-frame").getAttribute("src"), /034600db0cc94d64a7f3ccb19c7799fa/);
  await page.getByRole("button", { name: "Pause turntable", exact: true }).click();
  await page.getByRole("button", { name: "Reset camera", exact: true }).click();
  await page.waitForTimeout(500);
  const home = await inspect(page, "getCameraLookAt");
  await page.waitForTimeout(400);
  assert.ok(distance(home.position, (await inspect(page, "getCameraLookAt")).position) < 0.000001, "Paused camera must stay still");

  const initialPaint = (await inspect(page, "getMaterialList")).find((item) => item.name === "Carro_Pintura").channels.AlbedoPBR.color;
  await page.locator(".cx-render").screenshot({ path: join(artifacts, "clay-desktop.png") });
  await page.getByRole("button", { name: "Warm clay", exact: false }).click();
  await page.waitForTimeout(300);
  const graphitePaint = (await inspect(page, "getMaterialList")).find((item) => item.name === "Carro_Pintura").channels.AlbedoPBR.color;
  assert.ok(graphitePaint.reduce((a, b) => a + b, 0) < initialPaint.reduce((a, b) => a + b, 0), "Graphite must darken the actual paint material");
  await page.getByRole("button", { name: "Show mesh", exact: true }).click();
  await page.waitForTimeout(1400);
  assert.equal((await inspect(page, "getWireframe")).enabled, true);
  await page.locator(".cx-render").screenshot({ path: join(artifacts, "mesh-desktop.png") });
  await page.getByRole("button", { name: "Show mesh", exact: true }).click();
  await page.waitForTimeout(200);
  assert.equal((await inspect(page, "getWireframe")).enabled, false);

  await page.getByRole("button", { name: "Play turntable", exact: true }).click();
  await page.mouse.move(0, 0);
  await page.waitForTimeout(650);
  assert.ok(distance(home.position, (await inspect(page, "getCameraLookAt")).position) > 0.05, "Turntable must move the actual model camera");
  await page.getByRole("button", { name: "Pause turntable", exact: true }).click();
  await page.getByRole("button", { name: "Reset camera", exact: true }).click();
  await page.waitForTimeout(500);
  assert.ok(distance(home.position, (await inspect(page, "getCameraLookAt")).position) < 0.00001, "Reset must restore the fitted starting view");

  const layout = await page.evaluate(() => {
    const frame = document.querySelector(".cx-vehicle-frame").getBoundingClientRect();
    const credit = document.querySelector(".cx-vehicle-credit").getBoundingClientRect();
    const timeline = document.querySelector(".cx-timeline").getBoundingClientRect();
    return { creditBelowFrame: credit.top >= frame.bottom, timelineBelowCredit: timeline.top >= credit.bottom, overflow: document.documentElement.scrollWidth - innerWidth };
  });
  assert.equal(layout.creditBelowFrame, true, "Credit must not cover the native viewer");
  assert.equal(layout.timelineBelowCredit, true, "Turntable must not cover native controls or credit");
  assert.equal(layout.overflow, 0);
  const smallTargets = await page.evaluate(() => [...document.querySelectorAll(".cx-render button, .cx-render a[href]")]
    .filter((element) => element.getClientRects().length)
    .map((element) => ({ label: element.getAttribute("aria-label") ?? element.textContent.trim(), width: element.getBoundingClientRect().width, height: element.getBoundingClientRect().height }))
    .filter((target) => target.width < 44 || target.height < 44));
  assert.deepEqual(smallTargets, [], "Workspace controls and credit links must have 44px targets");

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForTimeout(250);
  assert.equal(await page.getByRole("button", { name: "Play turntable", exact: true }).isDisabled(), true);
  assert.match(await page.locator(".cx-timeline").innerText(), /Reduced motion/);
  await page.locator(".cx-live-model").focus();
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(300);
  assert.ok(distance(home.position, (await inspect(page, "getCameraLookAt")).position) > 0.05, "Arrow key must orbit the real camera");

  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(".cx-render").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  const portraitCamera = await inspect(page, "getCameraLookAt");
  assert.ok(radius(portraitCamera) > radius(home) * 1.1, "Portrait resize must refit the model instead of cropping it");
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth), 0);
  await page.locator(".cx-render").screenshot({ path: join(artifacts, "graphite-phone.png") });
  await page.waitForTimeout(400);
  assert.ok(distance(portraitCamera.position, (await inspect(page, "getCameraLookAt")).position) < 0.00001, "Resize fitting must settle");
  assert.deepEqual(errors, [], "The integrated page should not emit JavaScript errors");
  await page.close();

  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const unavailable = await context.newPage();
  await context.route("**/sketchfab-viewer-*.js", (route) => route.abort("internetdisconnected"));
  await openViewer(unavailable);
  await unavailable.waitForSelector('[data-viewer-status="error"]', { timeout: 15000 });
  assert.match(await unavailable.locator(".cx-vehicle-status").innerText(), /internet connection and WebGL/);
  assert.equal(await unavailable.getByRole("button", { name: "Show mesh", exact: true }).isDisabled(), true);
  await unavailable.locator(".cx-render").screenshot({ path: join(artifacts, "offline-fallback.png") });
  await context.unroute("**/sketchfab-viewer-*.js");
  await unavailable.getByRole("button", { name: "Retry viewer", exact: true }).click();
  await ready(unavailable);
  assert.equal(await unavailable.getByRole("button", { name: "Show mesh", exact: true }).isEnabled(), true);
  await context.close();
  console.log("Vehicle integration passed: real camera, paint, wireframe, responsive fit, reduced motion, offline fallback and retry");
  console.log("Screenshots: " + artifacts);
} finally {
  await browser.close();
}
