// SITE_URL=http://localhost:3100 node scripts/e2e-vehicle.mjs
import assert from "node:assert/strict";
import { chromium } from "playwright";

const base = process.env.SITE_URL || "http://localhost:3000";
const browser = await chromium.launch({
  ...(process.env.PLAYWRIGHT_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH } : {}),
});
try {
  const page = await browser.newPage({ colorScheme: "dark", reducedMotion: "reduce" });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  for (const width of [320, 390, 768, 1024, 1440, 2082]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(base + "/interfaces/drive/", { waitUntil: "networkidle" });
    const geometry = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      sceneOverflow: document.querySelector(".cx-drive").scrollWidth - document.querySelector(".cx-drive").clientWidth,
      image: document.querySelector(".cx-ev-illustration img").naturalWidth,
      blend: getComputedStyle(document.querySelector(".cx-ev-illustration img")).mixBlendMode,
      isolatedImage: getComputedStyle(document.querySelector(".cx-ev-illustration")).isolation,
      smallTargets: Array.from(document.querySelectorAll(".cx-drive button")).filter(button => {
        const box = button.getBoundingClientRect();
        return box.width < 44 || box.height < 44;
      }).map(button => button.getAttribute("aria-label") || button.textContent),
      clippedModes: Array.from(document.querySelectorAll(".cx-ev-modes button")).filter(button => {
        const box = button.getBoundingClientRect();
        const group = button.parentElement.getBoundingClientRect();
        return box.bottom > group.bottom - 1 || box.top < group.top + 1;
      }).map(button => button.textContent),
      specimenHeight: document.querySelector(".if-specimen").getBoundingClientRect().height,
      cards: Array.from(document.querySelectorAll(".cx-ev-card"), card => {
        const box = card.getBoundingClientRect();
        const label = card.querySelector(".rs-card-label").getBoundingClientRect();
        const content = card.querySelector(".cx-ev-card-content").getBoundingClientRect();
        const style = getComputedStyle(card);
        return {
          visible: getComputedStyle(card).display !== "none",
          inset: [label.left - box.left, label.top - box.top, content.left - box.left, box.bottom - content.bottom - parseFloat(style.borderBottomWidth)],
          padding: [parseFloat(style.paddingLeft), parseFloat(style.paddingTop), parseFloat(style.paddingLeft), parseFloat(style.paddingBottom)],
          gap: card.querySelector(".cx-ev-card-content").firstElementChild.getBoundingClientRect().top - label.bottom,
          overflow: card.scrollWidth - card.clientWidth,
        };
      }),
    }));
    assert(geometry.overflow <= 1 && geometry.sceneOverflow <= 1, `${width}px: horizontal overflow`);
    assert(geometry.image > 1000 && geometry.blend === "screen", "Redrawn artwork must load and blend");
    assert.equal(geometry.isolatedImage, "auto", "Artwork must blend with the scene, not an isolated transparent wrapper");
    assert.deepEqual(geometry.smallTargets, [], `${width}px: controls must have 44px targets`);
    assert.deepEqual(geometry.clippedModes, [], `${width}px: mode controls must fit inside their frame`);
    assert.equal(geometry.specimenHeight, width <= 640 ? 680 : 720);
    assert.equal(geometry.cards.length, 4);
    geometry.cards.forEach((card, index) => {
      assert(card.visible && card.overflow <= 1, `${width}px card ${index}: hidden or overflowing`);
      card.inset.forEach((inset, i) => assert(Math.abs(inset - card.padding[i]) <= 1, `${width}px card ${index}: inset ${i} is ${inset}, expected ${card.padding[i]}`));
      assert(card.gap >= 8, `${width}px card ${index}: label and content are crowded`);
    });
    await page.locator(".if-study").screenshot({ path: `/tmp/vlak-drive-${width}.png` });
    console.log(`${width}px: vehicle image, four cards, insets and overflow passed`);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base + "/interfaces/drive/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Journey", exact: true }).click();
  await page.getByRole("button", { name: "Start route", exact: true }).click();
  assert(await page.getByText("355 km after arrival", { exact: true }).isVisible());
  await page.getByRole("button", { name: "Energy", exact: true }).click();
  await page.getByRole("button", { name: "Schedule charge", exact: true }).click();
  assert(await page.getByText("Charge scheduled for 23:00", { exact: true }).isVisible());
  await page.getByRole("button", { name: "Vehicle", exact: true }).click();
  await page.getByRole("button", { name: "Locked", exact: true }).click();
  assert(await page.getByText("Vehicle unlocked", { exact: true }).isVisible());
  await page.getByRole("button", { name: "Lights off", exact: true }).click();
  assert.equal(await page.locator(".cx-ev-illustration").getAttribute("data-lights"), "true");
  await page.getByRole("button", { name: "Raise temperature", exact: true }).click();
  assert.equal(await page.locator(".cx-ev-temperature strong").textContent(), "21°");
  assert.equal(await page.locator(".cx-ev-track").innerText(), "Fortress Down\nLoathe");
  await page.getByRole("button", { name: "Pause playback", exact: true }).click();
  assert.equal(await page.locator(".cx-drive").getAttribute("data-playing"), "false");
  await page.getByRole("button", { name: "Restart track", exact: true }).click();
  assert.equal(await page.getByRole("progressbar", { name: "Track progress", exact: true }).getAttribute("aria-valuenow"), "0");
  await page.getByRole("button", { name: "Skip ahead", exact: true }).click();
  assert.equal(await page.getByRole("progressbar", { name: "Track progress", exact: true }).getAttribute("aria-valuenow"), "10");
  await page.getByRole("button", { name: "Disconnect Mara’s phone", exact: true }).click();
  assert(await page.getByRole("button", { name: "Resume playback", exact: true }).isDisabled());
  await page.getByRole("button", { name: "Connect Mara’s phone", exact: true }).click();
  assert(await page.getByRole("button", { name: "Resume playback", exact: true }).isEnabled());
  assert.deepEqual(errors, []);
  console.log("Vehicle controls passed: views, route, charge, locks, lights, climate, media and connectivity");
} finally {
  await browser.close();
}
