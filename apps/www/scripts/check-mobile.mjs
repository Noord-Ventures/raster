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

const tocRail = navCss.slice(navCss.indexOf(".toc-rail {"), navCss.indexOf("}", navCss.indexOf(".toc-rail {")));
if (!tocRail.includes("padding: 120px 0 72px")) {
  fail("TOC rail first row stays at 120px");
}
const cover900 = site.slice(site.indexOf("@media (min-width: 900px)"));
if (!cover900.includes("padding-top: 120px") || !cover900.includes("justify-content: flex-start")) {
  fail("Desktop cover H1 must share the TOC first-row line, not sit above the rail");
}
if (!nav.includes('data-toc="groups"') || !nav.includes('data-toc="items"')) {
  fail("Do not collapse the two-column TOC to fake the H1 align");
}
if (ifCss.includes(".if-title")) {
  fail("Interfaces must not keep a parallel if-title spacer; cover owns the 204 cell");
}
const ifIndex = readFileSync(join(root, "apps/www/app/interfaces/page.tsx"), "utf8");
if (!ifIndex.includes('className="cover"')) {
  fail("Interfaces H1 must use the shared cover so it shares the rail first-row line");
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
if (!specimen.includes("gap: 1px") || !specimen.includes("background: var(--divider)")) {
  fail("Homepage box seams must be 1px --divider gaps, countable");
}
if (!specimen.includes("box-shadow: inset 1px 0 0 var(--grid-line), inset -1px 0 0 var(--grid-line)")) {
  fail("Homepage L/R box margins must be inset --grid-line, quieter than the cage");
}
if (specimen.includes("box-shadow: 1px 0 0 var(--grid-line)") && !specimen.includes("inset 1px 0 0 var(--grid-line)")) {
  fail("Homepage cell seams must stay --divider, not an outer --grid-line whisper");
}
if (/\.toc-sub \{[^}]*background:\s*var\(--bg\)/s.test(navCss)) {
  fail("Catalog secondaries must not cover the site module grid");
}
if (!about.includes("padding: 0 0 1px 0")) {
  fail("About must keep its bottom cage hairline");
}
if (!about.includes("box-shadow: inset 1px 0 0 var(--grid-line), inset -1px 0 0 var(--grid-line)")) {
  fail("About L/R box margins must be inset --grid-line, quieter than the cage");
}
const aboutField = about.slice(about.indexOf(".field {"), about.indexOf("}", about.indexOf(".field {")));
if (!aboutField.includes("gap: 1px") || !aboutField.includes("background: var(--divider)")) {
  fail("About box seams must be 1px --divider gaps, countable");
}
if (aboutField.includes("background: var(--grid-line)")) {
  fail("About seams must not be a --grid-line whisper");
}
if (!about.includes(".field-work") || !about.includes("object-fit: contain")) {
  fail("About stills sit contain on paper");
}
if (about.includes("object-fit: cover")) {
  fail("About stills must not cover-crop");
}
const facts = readFileSync(join(root, "apps/www/app/about/facts.ts"), "utf8");
for (const name of [
  "Rosmarie Tissi",
  "Nelly Rudin",
  "Thérèse Moll",
  "Shizuko Yoshikawa",
  "Fré Cohen",
  "Richard Paul Lohse",
  "Hans Neuburg",
  "Carlo Vivarelli",
  "Willem Sandberg",
  "Jurriaan Schrofer",
  "Benno Wissing",
]) {
  if (!facts.includes(name)) fail(`About field must include ${name}`);
}
if (!facts.includes('name: "International Typographic Style"')) {
  fail("Movement tile is International Typographic Style, not Swiss Style");
}
if (facts.includes("Swiss Style")) {
  fail("Influence copy uses International Typographic Style, not Swiss Style");
}
if (!facts.includes("Cohen_fre_sdap_nvv_poster_1926")) {
  fail("Fré Cohen must keep the 1926 SDAP Commons work crop");
}
for (const src of [
  "/about/moll-micorene.jpg",
  "/about/rudin-saffa-1958.jpg",
  "/about/yoshikawa-japanische-plakate-heute.jpg",
  "/about/lohse-100-jahre-eisenbeton.jpg",
  "/about/neuburg-konstruktive-grafik.jpg",
  "/about/vivarelli-fur-das-alter.jpg",
  "/about/sandberg-stedelijk-email-1954.jpg",
  "/about/schrofer-de-letter-op-straat.jpg",
  "/about/wissing-schiphol-signposting.jpg",
]) {
  if (!facts.includes(src)) fail(`About facts must wire ${src}`);
}
for (const leftover of [
  "/about/lohse-serial.jpg",
  "/about/neuburg-neue-grafik.jpg",
  "/about/vivarelli-neue-grafik.jpg",
  "/about/sandberg-stedelijk.jpg",
  "/about/schrofer-letterforms.jpg",
  "/about/wissing-total-design.jpg",
]) {
  if (facts.includes(leftover)) fail(`About must not keep placeholder still ${leftover}`);
}
for (const mark of [
  "100 Jahre Eisenbeton. Kunstgewerbemuseum Zürich, 1950.",
  "Konstruktive Grafik. Kunstgewerbemuseum Zürich, 1958.",
  "Für das Alter. Per la vecchiaia, 1949.",
  "Stedelijk Museum enamel sign. Torn paper, 1954.",
  "De letter op straat. Meijer, 1956.",
  "Schiphol signage. Total Design, 1967.",
]) {
  if (!facts.includes(mark)) fail(`About field must keep mark: ${mark}`);
}
if (!facts.includes("/about/neue-grafik.jpg")) {
  fail("ITS tile keeps the July 1963 Neue Grafik still");
}
const neuburgAt = facts.indexOf('name: "Hans Neuburg"');
if (neuburgAt < 0) fail("About field must include Hans Neuburg");
const neuburgBlock = facts.slice(neuburgAt, facts.indexOf("},", facts.indexOf("src:", neuburgAt)) + 2);
if (neuburgBlock.includes("/about/neue-grafik.jpg")) {
  fail("Neuburg still must not reuse the ITS July 1963 Neue Grafik");
}
if (!about.includes(".field-cell-n20") || !about.includes("n19 n19 n20 n20 n20 n20")) {
  fail("About field must run through n20; last 6-col row is Wissing + ITS");
}
const aboutCell = about.slice(about.indexOf(".field-cell {"), about.indexOf("}", about.indexOf(".field-cell {")));
if (aboutCell.includes("background-image") || aboutCell.includes("--grid-image") || aboutCell.includes("background-attachment: fixed")) {
  fail("About boxed cells must not paint the main 204 overlay");
}
const aboutKill = about.indexOf("html:has(.field-page)::before");
if (aboutKill < 0) {
  fail("About must kill html::before so the main grid does not cut type");
}
if (!about.slice(aboutKill, about.indexOf("}", aboutKill)).includes("display: none")) {
  fail("About overlay kill must be display: none");
}
if (about.includes("background-image: var(--grid-image)")) {
  fail("About must not paint gutter lines through type or stills");
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
if (!baseCss.includes("html::before") || !baseCss.includes("var(--grid-image)")) {
  fail("Site gutter overlay must paint verticals on html::before");
}
if (baseCss.includes("clip-path:inset(0 0 0 21px)") || site.includes("clip-path: inset(0 0 0 21px)")) {
  fail("Left inner-page gutter must paint; do not clip 21px off html::before");
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
if (!site.includes(".cover {\n  min-height: 204px")) {
  fail("Catalog cover must occupy a 204 cell");
}
if (!/@media \(max-width: 899px\) \{\s*\.cover \{\s*min-height: 0;/.test(site)) {
  fail("Phone cover must drop the 204 cell once the rail hides");
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
