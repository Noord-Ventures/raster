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
if (!phone.includes("overflow: hidden") || !phone.includes("flex-wrap: nowrap")) {
  fail("Phone crumb bar must clip to one line; crumbs must not wrap out of the bar");
}
if (phone.includes("translateY(3px)")) {
  fail("Do not translate crumb type 3px down; that sits ink below the icon midline");
}
if (!phone.includes(".site-logo-mark") || !phone.includes("top: 1px")) {
  fail("Phone logo mark must sit on the same optical middle as Raster / crumbs");
}
if (!phone.includes("flex: 1 1 0")) {
  fail("Phone crumb leaf must shrink and ellipsize so the trail stays one line at 375");
}
if (chrome.includes("toggle-track") || chrome.includes("icon-moon") || chrome.includes("icon-sun") || chrome.includes("SunIcon") || chrome.includes("MoonIcon")) {
  fail("Site chrome toggle must show one mark, not a sun/moon pair");
}
if (!chrome.includes('d="M2 4.5h5M11 4.5h3M2 11.5h3M9 11.5h5"') || !chrome.includes("<SettingsMark />")) {
  fail("Site chrome toggle must use the sliders mark from renatovaldes.com");
}

const crumbs = readFileSync(join(root, "apps/www/components/crumb-bar.tsx"), "utf8");
if (crumbs.includes("return null") || crumbs.includes("isFieldPath")) {
  fail("About must use the same scroll-in crumb bar as home");
}
if (!crumbs.includes('parts[0] === "about"')) {
  fail("Crumb bar must trail About");
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
if (specimen.includes("background-image: var(--grid-image)") || specimen.includes("repeating-linear-gradient")) {
  fail("Homepage must not paint gutter lines through type");
}
if (!specimen.includes("html:has(.specimen-page)::before") || !specimen.includes("display: none")) {
  fail("Homepage must kill the site gutter overlay so Raster / tagline / install are not caged");
}
if (!specimen.includes("body:has(.specimen-page)") || !specimen.includes("clip-path: inset(0)")) {
  fail("Homepage must clip any edge hairline so there is no page frame");
}
if (!specimen.includes("body:has(.specimen-page) {\n  background: transparent;")) {
  fail("Homepage must not paint a second body grid");
}
if (!specimen.includes("box-shadow: 1px 0 0 var(--grid-line), 0 1px 0 var(--grid-line)")) {
  fail("Homepage field is boxed 204 cells in --grid-line, not a gutter overlay");
}
if (/\.toc-sub \{[^}]*background:\s*var\(--bg\)/s.test(navCss)) {
  fail("Catalog secondaries must not cover the site module grid");
}
if (!about.includes("padding: 0 1px 1px 0")) {
  fail("About must keep its right and bottom hairline");
}
const aboutCell = about.slice(about.indexOf(".field-cell {"), about.indexOf("}", about.indexOf(".field-cell {")));
if (!aboutCell.includes("background-image: var(--grid-image)") || !aboutCell.includes("background-position: var(--grid-pos)") || !aboutCell.includes("background-attachment: fixed")) {
  fail("About must keep the gutter-line 204 spine, not a local hero tile");
}
const aboutEra = about.slice(about.indexOf(".field-cell-era {"), about.indexOf("}", about.indexOf(".field-cell-era {")));
if (aboutEra.includes("background-image")) {
  fail("About hero must not paint a local unpositioned grid");
}

if (!ifCss.includes(".if-board .rs-sidebar-item") || !ifCss.includes("min-height: 44px")) {
  fail("Interface sidebars must use 44pt rows on the phone");
}
if (/\.if-rail \{[^}]*background:\s*var\(--bg\)/s.test(ifCss)) {
  fail("Interfaces rail must not cover the site module grid");
}
const baseCss = readFileSync(join(root, "packages/core/css/base.css"), "utf8");
if (!baseCss.includes("html::before") || !baseCss.includes("clip-path:inset(0 0 0 21px)") || !baseCss.includes("var(--grid-image)")) {
  fail("Site gutter overlay must paint verticals on html::before and clip the 20px page frame");
}
const beforeAt = baseCss.indexOf("html::before{");
const beforeRule = beforeAt >= 0 ? baseCss.slice(beforeAt, baseCss.indexOf("}", beforeAt)) : "";
if (beforeRule.includes("repeating-linear-gradient")) {
  fail("Gutter overlay must not paint 204 horizontals — that cages type");
}
if (!ifCss.includes("body:has(.if-index)") || !ifCss.includes("background: transparent")) {
  fail("Interfaces paper must stay open so the site 204 overlay reads through");
}
if (/if-list \{[^}]*padding:\s*24px/s.test(ifCss)) {
  fail("Interfaces cards must sit on the 204, not 24px off it");
}
if (!ifCss.includes(".if-title {\n  min-height: 204px")) {
  fail("Interfaces title must occupy a 204 cell");
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
if (!phoneCss.includes(".rs-cal-day") || !/\.rs-cal-day\{[^}]*width:36px;\s*height:36px/.test(phoneCss)) {
  fail("Phone calendar selected day must stay a 36×36 square, not a 44-tall cell");
}
if (/\.rs-cal-day\{[^}]*height:var\(--hit\)/.test(phoneCss) || /\.rs-cal-grid\{[^}]*minmax\(0,1fr\)/.test(phoneCss)) {
  fail("Do not stretch calendar days to fluid × 44 on phone");
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
