// Phone chrome for the www site. Fail if tap targets, safe-area, or the
// stacked TOC drift, or if desktop rails / Raster chrome are restyled.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../..", import.meta.url));
const site = readFileSync(join(root, "apps/www/app/site.css"), "utf8");
const siteSx = readFileSync(join(root, "apps/www/app/site.stylex.ts"), "utf8");
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
if (!phone.includes(".corner-nav { display: none !important; }")) {
  fail("Phone must hide corner-nav (StyleX otherwise keeps display:flex)");
}
if (!/cornerNav:\s*\{[\s\S]*?display:\s*\{[\s\S]*?\[phone\]:\s*"none"/.test(siteSx)) {
  fail("StyleX cornerNav must be display none at ≤640");
}
if (!phone.includes("text-wrap: wrap") || !phone.includes(".site-content .rs-t-body")) {
  fail("Phone Install / body copy must be wrap, not pretty — pretty stacks lines on WebKit");
}
if (!layout.includes(".corner-nav{display:none!important}") && !layout.includes(".corner-nav{display:none !important}")) {
  fail("First paint must hide corner-nav on phone before StyleX");
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
if (!site.includes("html:has(.catalog-page)::after") || !site.includes("inset 1px 0 0 var(--grid-line), inset -1px 0 0 var(--grid-line)")) {
  fail("Components must paint page-grid L/R (home/about margin language) plus the 204 overlay");
}
if (site.includes("html:has(.catalog-page)::before") && /html:has\(\.catalog-page\)::before[\s\S]{0,80}display:\s*none/.test(site)) {
  fail("Components must keep the 204 block grid; do not kill html::before");
}
if (ifCss.includes(".if-title")) {
  fail("Interfaces must not keep a parallel if-title spacer; cover owns the 204 cell");
}
const ifIndex = readFileSync(join(root, "apps/www/app/interfaces/page.tsx"), "utf8");
if (!ifIndex.includes("chrome.cover") || (!ifIndex.includes('sx("cover"') && !ifIndex.includes('className="cover"'))) {
  fail("Interfaces H1 must use the shared cover so it shares the rail first-row line");
}

if (!block.includes("writeText") || !block.includes("Copied") || !block.includes("aria-live")) {
  fail("Code blocks must copy on the control and confirm on themselves");
}
if (page.includes("npx @noorddev/raster-cli")) {
  fail("Homepage must not teach unpublished raster-cli as a working path");
}
if (!page.includes("Not on npm") || !page.includes("PACKAGES_PUBLISHED")) {
  fail("Homepage must hide the install CTA while packages are unpublished");
}
if (specimen.includes("align-items: flex-start") && specimen.includes(".specimen-command-row")) {
  const row = specimen.slice(specimen.indexOf(".specimen-command-row {"), specimen.indexOf("}", specimen.indexOf(".specimen-command-row {")));
  if (row.includes("flex-start")) fail("Homepage copy control must sit on the command midline");
}
if (/specimen-cell-command \.code-copy \{[^}]*margin-top: 8px/.test(specimen)) {
  fail("Homepage copy control must not use a compensatory margin-top");
}
const copyStart = site.indexOf(".code-copy {\n  position: absolute");
if (copyStart < 0) fail("Docs copy control must be optically centered in the code box");
const codeCopy = site.slice(copyStart, site.indexOf("}", copyStart));
if (codeCopy.includes("top: 8px") || !codeCopy.includes("top: 50%") || !codeCopy.includes("translateY(-50%)")) {
  fail("Docs copy control must be optically centered in the code box");
}
const useRow = about.slice(about.indexOf(".field-code-row {"), about.indexOf("}", about.indexOf(".field-code-row {")));
if (useRow.includes("flex-start") || !useRow.includes("align-items: center")) {
  fail("About Usage copy control must sit on the command midline");
}
if (/field-cell-use \.code-copy \{[^}]*margin-top: 6px/.test(about)) {
  fail("About Usage copy control must not use a compensatory margin-top");
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
const specimenWithoutFooter = specimen.replace(/[^{}]*\.site-footer\s*\{[^}]*\}/g, "");
if (specimenWithoutFooter.includes("background-image: var(--grid-image)") || specimenWithoutFooter.includes("repeating-linear-gradient")) {
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
if (!about.includes("html:has(.field-page) .site-footer") || !/html:has\(\.field-page\) \.site-footer\s*\{[^}]*border-top:\s*none/s.test(about)) {
  fail("About footer must not stack a second hairline on the field cage");
}
if (!about.includes(".field-cell-lead") || !/field-cell-lead \{[^}]*padding-top:\s*24px/s.test(about)) {
  fail("About “What it is” must sit on the 24px navbar row");
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
const aboutPage = readFileSync(join(root, "apps/www/app/about/page.tsx"), "utf8");
const componentsPage = readFileSync(join(root, "apps/www/app/components/page.tsx"), "utf8");
if (!componentsPage.includes("catalog-page")) {
  fail("Components index must mark catalog-page so the two grids paint");
}
if (site.includes(".catalog-page .gallery { grid-template-columns: 388px; }")) {
  fail("Catalog gallery must auto-fill columns, not lock one 388 track");
}
if (site.includes("one 388 card column")) {
  fail("Catalog index is two 388 columns, not one");
}
if (!site.includes(".gallery { display: grid; grid-template-columns: repeat(auto-fill, 388px);")) {
  fail("Component gallery cards stay 388-wide auto-fill tracks");
}
if (!/catalog-page \.site-content \{[^}]*width:\s*min\(796px, 100%\)/s.test(site)) {
  fail("Catalog index measure must be 796 so two 388 cards fit");
}
if (!componentsPage.includes("catalogContent") || componentsPage.includes("chrome.content)")) {
  fail("Catalog index must use StyleX catalogContent (796), not the 592 content measure");
}
if (!siteSx.includes("catalogContent:") || !siteSx.includes('"min(796px, 100%)"')) {
  fail("StyleX catalogContent must be min(796px, 100%) so two 388 cards fit");
}
if (!/@media \(min-width: 1024px\) \{ \.site-layout \{ --ml: 204px; margin-left: 204px; \}/.test(site)) {
  fail("Desktop site-layout must keep the live --ml 204px / margin-left 204px");
}
if (!/@media \(min-width: 1024px\) \{\s*\.site-layout\.catalog-page \{\s*--ml:\s*0px;\s*margin-left:\s*0;/.test(site)) {
  fail("Catalog index must zero --ml at 1024–1439 so two 388 cards fit beside the rail");
}
if (!/@media \(min-width: 1440px\) \{\s*\.site-layout\.catalog-page \{[\s\S]*?--ml:\s*204px;[\s\S]*?margin-left:\s*204px;/.test(site)) {
  fail("Wide catalog index must restore the airy first 204 module at ≥1440");
}
if (!/@media \(min-width: 1440px\) \{\s*\.site-layout\.catalog-page \{[\s\S]*?width:\s*calc\(100vw - 204px\)/.test(site)) {
  fail("Wide catalog must size from the remaining viewport so 796 two-up still fits");
}
if (/data-rail="catalog"[\s\S]{0,160}--ml:\s*0px/.test(navCss)) {
  fail("Catalog rail must keep the live 204 inset; do not zero --ml for data-rail=catalog");
}
if (!siteSx.includes("iconContent:") || !siteSx.includes('"min(796px, 100%)"')) {
  fail("StyleX iconContent must be min(796px, 100%) — 4 × 184 cells + gutters");
}
if (!site.includes(".site-content:has(.rs-icon-catalog)") || !/rs-icon-catalog\) \{ width: min\(796px, 100%\)/.test(site)) {
  fail("Icons catalog container must span 4 × 184 cells (796)");
}
if (!/\.preview-box:has\(\.rs-icon-catalog\) \{[^}]*padding:\s*0/.test(site) || !/\.preview-box:has\(\.rs-icon-catalog\) \{[^}]*border:\s*0/.test(site)) {
  fail("Icons preview must not pad or frame or the 4th 184 column will not fit");
}
const namePage = readFileSync(join(root, "apps/www/app/components/[name]/page.tsx"), "utf8");
if (!namePage.includes("iconContent") || !namePage.includes('name === "icons"')) {
  fail("Icons page must use the 4-col iconContent measure");
}
if (!site.includes(".rs-crumb-bar-scrolled {") || !/rs-crumb-bar-scrolled \{[^}]*background:\s*var\(--bg\)/.test(site)) {
  fail("Scrolled crumb bar must restore paper background vs live");
}
if (!siteSx.includes("crumbBarScrolled:") || !siteSx.includes('backgroundColor: "var(--bg)"')) {
  fail("StyleX crumb bar must paint paper on scroll");
}
const specimenSx = readFileSync(join(root, "apps/www/app/specimen.stylex.ts"), "utf8");
if (!specimenSx.includes('repeat(2, minmax(0, 1fr))') || !specimenSx.includes('repeat(4, minmax(0, 1fr))') || !specimenSx.includes('repeat(6, minmax(0, 1fr))')) {
  fail("Homepage StyleX field must recut 2 / 4 / 6 columns; do not collapse to 1-col");
}
if (!specimenSx.includes("cellTall:") || !specimenSx.includes("minHeight: 408") || !specimenSx.includes('justifyContent: "flex-end"')) {
  fail("Homepage StyleX face/law must be min-height 408 and justify flex-end so the lockup clears the 72 crumb bar");
}
if (!specimenSx.includes("overflow: \"visible\"")) {
  fail("Homepage StyleX cells must keep overflow visible");
}
const homePage = readFileSync(join(root, "apps/www/app/page.tsx"), "utf8");
if (!homePage.includes("specimen.cellTall") || !homePage.includes("specimen-cell-face")) {
  fail("Homepage face/law must apply StyleX cellTall (408 + flex-end)");
}
if (!siteSx.includes("crumbBar:") || !siteSx.includes("zIndex: 160") || !/crumbBar: \{[\s\S]*?position:\s*\"fixed\"/.test(siteSx) || !/crumbBar: \{[\s\S]*?default:\s*72/.test(siteSx)) {
  fail("Site crumb bar StyleX must be a full-bleed fixed 72 layer (z 160)");
}
if (!/\.rs-crumb-bar \{[\s\S]*?position:\s*fixed/.test(site) || !/\.rs-crumb-bar \{[\s\S]*?height:\s*72px/.test(site) || !/\.rs-crumb-bar \{[\s\S]*?z-index:\s*160/.test(site)) {
  fail("Site crumb bar CSS must be a full-bleed fixed 72 layer matching live");
}
if (!siteSx.includes('repeat(auto-fill, 388px)') || !siteSx.includes('[at480]: "1fr"')) {
  fail("StyleX gallery must auto-fill 388 tracks and recut to 1fr at 480");
}
const catalogPhoneAt = site.lastIndexOf("@media (max-width: 480px)");
const catalogPhone = catalogPhoneAt >= 0 ? site.slice(catalogPhoneAt, catalogPhoneAt + 220) : "";
if (!catalogPhone.includes(".catalog-page .gallery { grid-template-columns: 1fr; }")) {
  fail("Catalog gallery stays one column at 480");
}
if (!site.includes(".catalog-page .gallery-demo") || !/height:\s*204px/.test(site.slice(site.indexOf(".catalog-page .gallery-demo")))) {
  fail("Catalog demos stay a 204 module");
}
const usageBlock = facts.slice(facts.indexOf("export const usage"), facts.indexOf("export const license"));
if (usageBlock.includes("paste this in the document head") || aboutPage.includes("paste this in the document head")) {
  fail("About Usage must not tell people to paste the CLI or a button into the head");
}
if (usageBlock.includes("specimen:") || aboutPage.includes("{usage.specimen}")) {
  fail("About Usage must not dump CLI, link, and button into one paste-in-head block");
}
if (!usageBlock.includes('commandWhere: "Terminal"') || !usageBlock.includes('htmlWhere: "Head"') || !usageBlock.includes('controlWhere: "Body"')) {
  fail("About Usage steps must be labeled Terminal, Head, Body");
}
if (!usageBlock.includes("command: COMMAND") || !usageBlock.includes('<link rel="stylesheet" href="styles/raster.css" />') || !usageBlock.includes("rs-btn-primary")) {
  fail("About Usage must show CLI, then head link, then body control");
}
if ((aboutPage.match(/field-code-row/g) ?? []).length !== 3) {
  fail("About Usage must be three labeled rows: terminal, head, body");
}
if (!aboutPage.includes("{usage.command}") || !aboutPage.includes("{usage.html}") || !aboutPage.includes("{usage.control}")) {
  fail("About Usage must render CLI, head, and body as separate rows");
}
if (!usageBlock.includes("index.html") || !usageBlock.includes("styles/raster.css") || !usageBlock.includes("raster.json") || !usageBlock.includes("Inter")) {
  fail("About Usage must name what init writes: CSS, Inter, index.html, raster.json");
}
if (!usageBlock.includes("one-shot Raster landing") || !usageBlock.includes("not a thin shell")) {
  fail("About Usage must explain the generated index.html landing");
}
if (!usageBlock.includes("There is no CDN")) {
  fail("About Usage must not invent a CDN");
}
const faceHang = "margin-left: -0.08em";
if (!specimen.includes(".specimen-face") || !/specimen-face \{[\s\S]*?margin-left: -0\.08em/.test(specimen)) {
  fail("Home Raster must hang -0.08em at display size, not a UPM fraction");
}
if (!specimen.includes("calc(1px - 0.03em)") || !specimen.includes("calc(1px - 0.07em)")) {
  fail("Home law and command must use size-specific hangs, not the hero em");
}
if (specimen.includes("calc(-150 / 2048") || specimen.includes("calc(-50 / 2048")) {
  fail("Do not hang Home type from Inter UPM sidebearings");
}
if (!/field-face \{[\s\S]*?margin-left: -0\.08em/.test(about)) {
  fail("About Raster hero must hang -0.08em at display size");
}
if (!about.includes("calc(1px - 0.045em)")) {
  fail("About specimen Raster must use a shallower hang so it meets the 15px body");
}
if (about.includes(".field-cell-era .field-kicker") && /field-cell-era \.field-kicker \{[\s\S]*?margin-left:/.test(about)) {
  fail("About era kicker stays on the pad; do not hang the 12px rail");
}
if (about.includes("calc(-150 / 2048") || about.includes("calc(-50 / 2048")) {
  fail("Do not hang About type from Inter UPM sidebearings");
}
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
  "/about/moll-micorene.webp",
  "/about/rudin-saffa-1958.webp",
  "/about/yoshikawa-japanische-plakate-heute.webp",
  "/about/lohse-100-jahre-eisenbeton.webp",
  "/about/neuburg-konstruktive-grafik.webp",
  "/about/vivarelli-fur-das-alter.webp",
  "/about/sandberg-stedelijk-email-1954.webp",
  "/about/schrofer-de-letter-op-straat.webp",
  "/about/wissing-schiphol-signposting.webp",
]) {
  if (!facts.includes(src)) fail(`About facts must wire ${src}`);
}
for (const leftover of [
  "/about/lohse-serial.jpg",
  "/about/neuburg-neue-grafik.webp",
  "/about/vivarelli-neue-grafik.webp",
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
if (!facts.includes("/about/neue-grafik.webp")) {
  fail("ITS tile keeps the July 1963 Neue Grafik still");
}
const neuburgAt = facts.indexOf('name: "Hans Neuburg"');
if (neuburgAt < 0) fail("About field must include Hans Neuburg");
const neuburgBlock = facts.slice(neuburgAt, facts.indexOf("},", facts.indexOf("src:", neuburgAt)) + 2);
if (neuburgBlock.includes("/about/neue-grafik.webp")) {
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
const aboutWithoutFooter = about.replace(/[^{}]*\.site-footer\s*\{[^}]*\}/g, "");
if (aboutWithoutFooter.includes("background-image: var(--grid-image)")) {
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
const buttonCss = readFileSync(join(root, "packages/react/src/components/button.tsx"), "utf8");
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
if (!buttonCss.includes("default: raster.controlH") && !buttonCss.includes("height:40px")) {
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

const laws = readFileSync(join(root, "apps/www/app/specimen-laws.ts"), "utf8");
const kit = readFileSync(join(root, "apps/www/app/specimen.ts"), "utf8");
const footer = readFileSync(join(root, "apps/www/components/site-footer.tsx"), "utf8");
const TEN = [
  "Simple",
  "Beautiful",
  "Opinionated",
  "Elegant",
  "Clear",
  "Legible",
  "Solid",
  "Versatile",
  "Customizable",
  "Minimal",
];
if (!laws.includes("Ten words.")) {
  fail('Homepage principles comment must be "Ten words."');
}
const lawTexts = [...laws.matchAll(/text: "([^"]+)"/g)].map((m) => m[1]);
if (lawTexts.length !== 10) {
  fail(`Homepage principles must be ten words, got ${lawTexts.length}`);
}
if (lawTexts[1] !== "Beautiful") fail("Homepage principles: Beautiful is 02");
if (lawTexts[lawTexts.length - 1] !== "Minimal") fail("Homepage principles: Minimal is last");
if (lawTexts.join(",") !== TEN.join(",")) {
  fail("Homepage principles must keep Renato's exact order");
}
for (const word of TEN) {
  if (!laws.includes(`text: "${word}"`)) fail(`Homepage principles must include ${word}`);
}
if (laws.includes("The grid is the idea.")) {
  fail("Homepage principles are Renato's ten words, not the old grid sentences");
}
if (!kit.includes('"toggle-group"') || !kit.includes('"card"') || !kit.includes('"pagination"')) {
  fail("Homepage kit must be denser than accordion, calendar, field, stepper");
}
if (!layout.includes("SiteFooter") || !footer.includes("getraster.com") || !footer.includes("MIT")) {
  fail("Root layout must render a sitewide footer with factual imprint");
}
if (!footer.includes("RasterMark") || !footer.includes("site-footer-about") || footer.includes("site-footer-imprint")) {
  fail("Footer must be RasterMark | stacked links | about copy, not the MIT-only imprint row");
}
if (
  !footer.includes("Raster is built and designed in the north by") ||
  !footer.includes('href="https://noord.dev"') ||
  !footer.includes(">Noord</a>")
) {
  fail("Footer about copy must link Noord to https://noord.dev");
}
for (const sentence of [
  "Inspired by the International Typographic Style.",
  "Free and open source under the MIT license.",
]) {
  if (!footer.includes(sentence)) fail(`Footer about copy must include: ${sentence}`);
}
if (footer.includes("/swag") || footer.includes(">Swag<")) {
  fail("Footer must not link Swag");
}
const footerNav = site.slice(site.indexOf(".site-footer-nav {"), site.indexOf("}", site.indexOf(".site-footer-nav {")));
if (!footerNav.includes("flex-direction: column")) {
  fail("Footer links must be one stacked column");
}
if (footerNav.includes("flex-wrap: wrap")) {
  fail("Footer must not be a horizontal link row");
}
const kitLive = readFileSync(join(root, "apps/www/app/specimen-kit.tsx"), "utf8");
if (!kitLive.includes("Browse {more} more components") || !kitLive.includes('href="/components"')) {
  fail("Homepage kit must end with Browse N more components → /components");
}
if (!kitLive.includes("catalogComponents.filter") || /Browse \d+ more/.test(kitLive)) {
  fail("Browse N must be catalog minus KIT, not a hardcoded count");
}
if (!specimen.includes("specimen-cell-more") || !specimen.includes('"more more more more more more"')) {
  fail("Browse row must sit on the 204 after the kit");
}
const cardUse = readFileSync(join(root, "apps/www/components/examples/card/use.tsx"), "utf8");
const preview = readFileSync(join(root, "apps/www/components/preview.tsx"), "utf8");
const registry = readFileSync(join(root, "packages/core/src/registry.ts"), "utf8");
if (cardUse.includes("CardInner") || preview.includes("CardInner")) {
  fail("Default Card specimen must not nest body in CardInner");
}
if (registry.includes('rs-card-in"><p class="rs-card-body"')) {
  fail("Card registry snippet must not wrap body in .rs-card-in");
}
if (registry.includes("1px frame, chrome-square")) {
  fail("Card catalog copy is a typography stack, not a framed box");
}
const cardCss = readFileSync(join(root, "packages/react/src/components/card.tsx"), "utf8");
const cardRule = cardCss.slice(cardCss.indexOf("card: {"), cardCss.indexOf("},", cardCss.indexOf("card: {")));
if (!cardRule.includes("borderWidth: 0") || cardRule.includes("borderWidth: 1")) {
  fail("Default Card chrome must not draw an outer frame");
}
const calloutCss = readFileSync(join(root, "packages/react/src/components/callout.tsx"), "utf8");
if (calloutCss.includes("borderLeft: 3") || calloutCss.includes("borderRadius: raster.radiusSm")) {
  fail("Callout is a 1px hairline, radius 0, no left bar");
}
const aboutNotes = readFileSync(join(root, "apps/www/app/about/about-notes.tsx"), "utf8");
if (!aboutPage.includes("AboutNotes") || !aboutNotes.includes("AccordionItem") || !aboutNotes.includes("from \"@noorddev/raster-react\"")) {
  fail("About Notes must use the Raster Accordion");
}
if (!aboutPage.includes("github.com/Noord-Ventures/raster") || aboutPage.includes("rennvaldes/raster")) {
  fail("About colophon must display github.com/Noord-Ventures/raster");
}
if (facts.includes("rennvaldes/raster") || !facts.includes("https://github.com/Noord-Ventures/raster")) {
  fail("About facts.person.repo must be https://github.com/Noord-Ventures/raster");
}
if (facts.includes("AI lab") || facts.includes("Swiss Style")) {
  fail("About must not say AI lab or Swiss Style");
}
if (!facts.includes("Frontier Design Lab") || !facts.includes("International Typographic Style")) {
  fail("About must name Noord Frontier Design Lab and International Typographic Style");
}
if (!facts.includes("Simple, Beautiful, Opinionated, Elegant, Clear, Legible, Solid, Versatile, Customizable, Minimal")) {
  fail("About Notes must name Renato's ten principles");
}
const nestCss = readFileSync(join(root, "packages/react/src/components/concentric-radius.tsx"), "utf8");
const catalogPage = readFileSync(join(root, "apps/www/app/components/page.tsx"), "utf8");
if (!/name:\s*"concentric-radius"[\s\S]*?hidden:\s*true/.test(registry) || catalogPage.includes("concentric-radius")) {
  fail("Concentric radius stays in the registry as hidden; it is not a catalog card");
}
if (!catalogPage.includes("catalogComponents") || !nav.includes("catalogComponents")) {
  fail("Catalog gallery and docs rail must list catalogComponents, not hidden entries");
}
if (!catalogPage.includes("iconGroups") || !catalogPage.includes('category === "icons"')) {
  fail("Icons on /components must be iconGroups subcategory cards, like Charts");
}
if (!nav.includes("iconGroups") || !nav.includes("/components/icons#") || !nav.includes("iconGroupSlug")) {
  fail("Icons toc-sub must list iconGroups (Navigation, Actions, …) like Charts");
}
if (!nestCss.includes("--rs-in") || !nestCss.includes("var(--rs-out) - var(--rs-gap)")) {
  fail("Nest must keep the inner-radius formula");
}
const iconCss = readFileSync(join(root, "packages/react/src/components/icon.tsx"), "utf8");
if (!iconCss.includes("repeat(auto-fill, 184px)") || !iconCss.includes("default: 184")) {
  fail("Icon catalog cells must sit on 184px module columns");
}
if (iconCss.includes("repeat(4,minmax") || iconCss.includes("repeat(3,minmax")) {
  fail("Icon catalog must not stretch leftover 1fr tracks");
}
const iconSrc = readFileSync(join(root, "packages/react/src/components/icon.tsx"), "utf8");
if (!iconSrc.includes('variant === "filled"') || !iconSrc.includes("rs-icon-kin")) {
  fail("Icon catalog must show line | filled pairs");
}
if (!iconSrc.includes("size={12}") || !iconSrc.includes("size={16}") || !iconSrc.includes("size={24}")) {
  fail("Icon catalog must draw 12, 16, and 24");
}
const copySlice = site.slice(site.indexOf(".code-copy {"), site.indexOf(".code-copy:hover"));
if (!copySlice.includes("border-radius: 0") || !copySlice.includes("box-shadow: none")) {
  fail("Copy chrome must be flush: no radius, no shadow");
}
if (!site.includes("--nav-left: 224px") || !site.includes("left: var(--nav-left)")) {
  fail("Corner-nav must freeze at the list 224 via --nav-left");
}
if (site.includes('body:has([data-rail="catalog"]):not(:has(.catalog-page))')) {
  fail("Do not override corner-nav on catalog detail; list and detail share 224");
}
if (/body:has\(\[data-rail="catalog"\]\) \.corner-nav/.test(site)) {
  fail("Catalog gallery index must not pin corner-nav to the toc-sub column");
}
if (site.includes("left: 428px") || /--nav-left:\s*428px/.test(site) || siteSx.includes("428px")) {
  fail("Corner-nav must freeze at the list 224; do not jump detail to toc-sub 428");
}
if (!site.includes(".gallery-item .preview-box") || !site.includes(".gallery-demo .preview-box") || !site.includes(".specimen-kit-live .preview-box")) {
  fail("Catalog / kit specimens must not stack preview-box on the card or cell");
}
if (!site.includes(".preview-box:has(.rs-callout)") || !site.includes(".gallery-demo .rs-callout")) {
  fail("Boxed leaves must not sit in a second demo hairline");
}
if (site.includes(".rs-scene .rs-input-group") || site.includes(".rs-use .rs-input-group") || site.includes(".rs-scene .rs-field")) {
  fail("Use / In Action must not zero the leaf — match the unboxed top specimen");
}
const useCss = readFileSync(join(root, "apps/www/components/examples/use.css"), "utf8");
const useSx = readFileSync(join(root, "apps/www/components/examples/use.stylex.ts"), "utf8");
const sceneRule = useCss.slice(useCss.indexOf(".rs-scene {"), useCss.indexOf("}", useCss.indexOf(".rs-scene {")));
if (/border:\s*1px/.test(sceneRule) || /scene:\s*\{[^}]*borderWidth:\s*1/s.test(useSx)) {
  fail("In Action scene must not add a second outline around the control");
}
if (!site.includes(".settings {") || !site.includes("right: 20px") || !site.includes("position: fixed")) {
  fail("Appearance control stays sticky on the right");
}
if (
  !chrome.includes("Text size") ||
  !chrome.includes('"Show"') ||
  !chrome.includes('"Hide"') ||
  !chrome.includes("--text-scale") ||
  !chrome.includes("dataset.grid")
) {
  fail("Appearance menu must include working text size and grid controls");
}
if (!layout.includes("raster-grid") || !layout.includes("raster-text-scale") || !layout.includes("--text-scale")) {
  fail("themeInit must restore grid and text scale before paint");
}
const typeCss = readFileSync(join(root, "packages/core/css/type.css"), "utf8");
if (!typeCss.includes("--text-scale")) {
  fail("Reading type must honor --text-scale");
}
if (!site.includes('html[data-grid="off"]')) {
  fail("Grid hide must turn off the module overlay");
}
if (!chrome.includes("0.9") || !chrome.includes("1.25") || !chrome.includes("1.4") || !chrome.includes("TEXT_STEPS")) {
  fail("Text size must step 90 / 100 / 110 / 125 / 140");
}
const appear = site.slice(site.indexOf(".appearance-menu {"), site.indexOf(".appearance-label {"));
if (!appear.includes("border-radius: 0") || appear.includes("10px")) {
  fail("Appearance panel is Raster hairline radius 0, not a 10px sheet");
}
if (!site.includes(".text-stepper button") || !site.slice(site.indexOf(".text-stepper button {"), site.indexOf(".text-stepper button:hover")).includes("border-radius: 0")) {
  fail("Text size −/+ are hairline squares, radius 0");
}
if (site.includes("var(--nav-left) - 8px")) {
  fail("Do not clip the crumb bar into a stump; hide desktop crumb labels only");
}
if (!layout.includes("display:none!important") || !layout.includes(".rs-crumb-bar a.rs-crumb-root")) {
  fail("First-paint HTML must hide desktop Raster/trail so crumbs cannot sit on Components");
}
if (!crumbs.includes("site-crumb-root") || !crumbs.includes("setProperty(\"display\"")) {
  fail("Crumb bar must hide desktop Raster/trail in the component, not only in CSS");
}
if (
  !chrome.includes("Math.round(scale * 100)") ||
  !layout.includes("n>3") ||
  !layout.includes("data-text-scale") ||
  !chrome.includes("data-text-scale")
) {
  fail("Text size must persist as a percent in localStorage and restore on html[data-text-scale] before paint");
}

console.log("Phone chrome: 44pt hits, safe-area, stacked TOC, copy control.");
