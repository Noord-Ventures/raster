// Raster OG poster, 1200×630. Flush paper, one hairline, the word, the law.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const out = fileURLToPath(new URL("../public/og.png", import.meta.url));
const font = new URL("../../../packages/core/css/fonts/inter/InterVariable-latin.woff2", import.meta.url).href;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
@font-face{
  font-family:Poster;
  font-style:normal;
  font-weight:100 900;
  src:url("${font}") format("woff2");
}
html,body{margin:0;background:#FAF8F2}
.poster{
  width:1200px;height:630px;
  display:grid;
  grid-template-columns:1.35fr 1px 1fr;
  background:#FAF8F2;
  color:#1A1A1A;
  font-family:Poster,sans-serif;
}
.cell{
  display:flex;flex-direction:column;justify-content:flex-end;
  padding:48px 56px 52px;
  box-sizing:border-box;
}
.word{
  margin:0;
  font-size:148px;font-weight:600;
  letter-spacing:-.045em;line-height:.82;
}
.law{
  margin:0;
  font-size:42px;font-weight:600;
  letter-spacing:-.035em;line-height:1;
  max-width:7.2em;
}
.door{
  margin:28px 0 0;
  font-size:16px;font-weight:500;
  letter-spacing:-.01em;color:#6B6B6B;
}
.rule{width:1px;background:rgba(0,0,0,.10);align-self:stretch}
</style>
</head>
<body>
  <div class="poster">
    <div class="cell"><p class="word">Raster</p></div>
    <div class="rule" aria-hidden="true"></div>
    <div class="cell">
      <p class="law">A poster you can install.</p>
      <p class="door">getraster.com</p>
    </div>
  </div>
</body>
</html>`;

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH ?? "/usr/local/bin/google-chrome",
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: "networkidle" });
const buf = await page.locator(".poster").screenshot({ type: "png" });
await browser.close();
writeFileSync(out, buf);
console.log(`wrote ${out} (${buf.length} bytes)`);
