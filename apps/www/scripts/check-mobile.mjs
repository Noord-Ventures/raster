// Phone chrome for the www site. Fail if tap targets, safe-area, or the
// stacked TOC drift, or if desktop rails / Raster chrome are restyled.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../..", import.meta.url));
const site = readFileSync(join(root, "apps/www/app/site.css"), "utf8");
const chrome = readFileSync(join(root, "apps/www/components/site-chrome.tsx"), "utf8");
const layout = readFileSync(join(root, "apps/www/app/layout.tsx"), "utf8");
const block = readFileSync(join(root, "apps/www/components/code-block.tsx"), "utf8");
const nav = readFileSync(join(root, "apps/www/components/docs-nav/index.tsx"), "utf8");
const navCss = readFileSync(join(root, "apps/www/components/docs-nav/docs-nav.css"), "utf8");
const ifCss = readFileSync(join(root, "apps/www/app/interfaces/interfaces.css"), "utf8");
const ifNav = readFileSync(join(root, "apps/www/app/interfaces/nav.tsx"), "utf8");
const specimen = readFileSync(join(root, "apps/www/app/specimen.css"), "utf8");
const about = readFileSync(join(root, "apps/www/app/about/about.css"), "utf8");
const page = readFileSync(join(root, "apps/www/app/page.tsx"), "utf8");
const mobile = readFileSync(join(root, "apps/www/components/toc-mobile.tsx"), "utf8");

function fail(message) {
  console.error(message);
  process.exit(1);
}

if (!layout.includes("viewportFit") || !layout.includes('"cover"')) {
  fail("Root viewport must set viewportFit cover for safe-area insets");
}

for (const token of ["safe-area-inset-top", "safe-area-inset-bottom", "safe-area-inset-left", "safe-area-inset-right"]) {
  if (!site.includes(token)) fail(`site.css must honor ${token}`);
}

if (!site.includes(".toc-mobile") || !site.includes(".code-copy")) {
  fail("Phone TOC and copy control styles must live in site chrome");
}

const phone = site.slice(site.indexOf("/* ── Phone"));
if (!phone.includes(".site-logo {") || !phone.includes("min-width: 44px") || !phone.includes("min-height: 44px")) {
  fail("Phone chrome must grow logo / toggle / burger hit areas to 44px");
}
if (!phone.includes(".theme-toggle") || !phone.includes("display: flex")) {
  fail("Theme toggle must stay on the phone chrome, not hide behind the burger only");
}
if (phone.includes(".theme-toggle { display: none") || /corner-nav,\s*\.theme-toggle/.test(phone)) {
  fail("Do not hide the theme toggle on phone");
}

if (!nav.includes("MobileToc") || !nav.includes("toc-mobile-item")) {
  fail("DocsNav must render a stacked phone TOC");
}
if (!ifNav.includes("MobileToc") || !ifNav.includes("toc-mobile-item")) {
  fail("Interfaces nav must render a stacked phone TOC");
}
if (!mobile.includes("toc-mobile-trigger") || !mobile.includes("aria-expanded")) {
  fail("Phone TOC must be a 44pt disclosure, not a cramped rail");
}

if (!navCss.includes("@media (min-width: 900px)") || !ifCss.includes("@media (min-width: 900px)")) {
  fail("Desktop rails must stay off the phone");
}

if (!block.includes("writeText") || !block.includes("Copied") || !block.includes("aria-live")) {
  fail("Code blocks must copy on the control and confirm on themselves");
}
if (!page.includes("CopyControl") || !page.includes("specimen-command-row")) {
  fail("Homepage command must carry the same copy control");
}

if (specimen.includes("min-width: 408px") || about.includes("min-width: 408px")) {
  fail("Phone widths must stay one column; do not start the 204 pair at 408");
}
if (!specimen.includes("min-width: 481px") || !about.includes("min-width: 481px")) {
  fail("Two-column fields start at 481, after phone widths");
}
if (specimen.includes("padding: 0 1px 1px 0") || /padding:\s*1px;/.test(specimen)) {
  fail("Homepage must open on the right and bottom; do not restore an outer frame");
}
if (!about.includes("padding: 0 1px 1px 0")) {
  fail("About must keep its right and bottom hairline");
}

if (!ifCss.includes(".if-board .rs-sidebar-item") || !ifCss.includes("min-height: 44px")) {
  fail("Interface sidebars must use 44pt rows on the phone");
}

const phoneCss = readFileSync(join(root, "packages/core/css/phone.css"), "utf8");
const tokensCss = readFileSync(join(root, "packages/core/css/tokens.css"), "utf8");
const buttonCss = readFileSync(join(root, "packages/core/css/components/button.css"), "utf8");
if (!tokensCss.includes("--hit:") || !tokensCss.includes("--control-h:") || !tokensCss.includes("--control-fs:")) {
  fail("Tokens must emit --hit / --control-h / --control-fs");
}
if (!tokensCss.includes("--hit:44px") && !tokensCss.includes("--hit: 44px")) {
  fail("Phone tokens must set --hit to 44px");
}
if (!phoneCss.includes("@media(max-width:640px)") && !phoneCss.includes("@media (max-width: 640px)")) {
  fail("phone.css must recut interactive controls at 640");
}
for (const sel of [".rs-btn-primary", ".rs-input", ".rs-tab", ".rs-switch"]) {
  if (!phoneCss.includes(sel)) fail(`phone.css must recut ${sel}`);
}
if (!phoneCss.includes("min-height:var(--hit)") && !phoneCss.includes("min-height: var(--hit)")) {
  fail("phone.css must size hits with --hit");
}
if (!buttonCss.includes("height:40px")) {
  fail("Desktop button must stay 40px; recut only in phone.css");
}
if (!phone.includes("flex-direction: column") || !phone.includes(".preview-box")) {
  fail("Phone previews must stack so full-width controls show");
}

const desktopLogo = site.slice(0, site.indexOf("@media (max-width: 640px)"));
if (!desktopLogo.includes("width: 20px; height: 20px") || !desktopLogo.includes(".theme-toggle") || !desktopLogo.includes("width: 24px; height: 24px")) {
  fail("Desktop chrome must stay 20px mark / 24px toggle");
}

const files = [
  join(root, "apps/www/app/site.css"),
  join(root, "apps/www/components/site-chrome.tsx"),
  join(root, "apps/www/components/code-block.tsx"),
  join(root, "apps/www/components/toc-mobile.tsx"),
  join(root, "apps/www/components/docs-nav/index.tsx"),
  join(root, "apps/www/app/interfaces/nav.tsx"),
  join(root, "apps/www/app/interfaces/interfaces.css"),
];
for (const file of files) {
  const text = readFileSync(file, "utf8");
  if (/tailwind|@radix-ui|SF Pro|backdrop-filter/.test(text)) {
    fail(`Phone chrome must stay Raster: ${file}`);
  }
}

if (/toast|Toaster|rs-toast/.test(block)) {
  fail("Copy must confirm on the control, not via toast");
}

console.log("Phone chrome: 44pt hits, safe-area, stacked TOC, copy control.");
