// Vlak OG poster, 1200×630. Flush paper, one hairline, the word, the law.
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
  position:relative;
  display:grid;grid-template-columns:612px 1px 1fr;
  background:#FAF8F2;
  background-image:linear-gradient(to right,rgba(0,0,0,.055) 1px,transparent 1px);
  background-size:204px 100%;background-position:40px 0;
  color:#1A1A1A;
  font-family:Poster,sans-serif;
}
.brand-mark{position:absolute;top:40px;left:40px;width:32px;height:32px}
.cell{
  display:flex;flex-direction:column;justify-content:flex-end;
  padding:40px 40px 48px;
  box-sizing:border-box;
}
.cell:last-child{padding-left:39px}
.word{
  margin:0;
  font-size:184px;font-weight:580;
  letter-spacing:-.045em;line-height:.82;
}
.law{
  margin:0;
  font-size:40px;font-weight:580;
  letter-spacing:-.035em;line-height:1.04;
  max-width:9em;
}
.door{
  margin:24px 0 0;
  font-size:15px;font-weight:500;
  letter-spacing:-.01em;color:#6B6B6B;
}
.rule{width:1px;background:rgba(0,0,0,.12);align-self:stretch}
</style>
</head>
<body>
  <div class="poster">
    <svg class="brand-mark" viewBox="0 0 822 822" aria-label="Vlak"><g fill="currentColor" transform="translate(0 822) scale(1 -1)"><path d="m411.128.67 128.714 128.713L334.5 334.726 129.158 540.068.405 411.315 411.128.669Z"/><path d="M539.429 128.97 411.09.63 282.751 128.97v564.691l128.661 127.928 128.017-127.928V128.97Z"/><path d="m500.812 347.858 128.752-128.752 192.21 192.209-128.752 128.753-96.105-96.105-96.105-96.105Z"/></g></svg>
    <div class="cell"><p class="word">Vlak</p></div>
    <div class="rule" aria-hidden="true"></div>
    <div class="cell">
      <p class="law">A design system for product exploration</p>
      <p class="door">React · CSS · tokens · interfaces</p>
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
