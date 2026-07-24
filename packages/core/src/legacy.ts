/**
 * Canonical → legacy class names. Raster 0.2 normalized every class to
 * the rs- prefix; sites built on the 0.1 names (noord.vc, noord.dev,
 * renatovaldes.com) keep working by linking the generated
 * css/raster-compat.css alongside raster.css.
 *
 * Order matters only for chains where a legacy name equals another
 * canonical name (rs-input-full → rs-input): the canonical rule must
 * be rewritten first.
 */
export const legacyClassMap: ReadonlyArray<readonly [canonical: string, legacy: string]> = [
  ["rs-btn-primary", "bb-btn-primary"],
  ["rs-btn-ghost", "bb-btn-ghost"],
  ["rs-btn-sm", "bb-btn-sm"],
  ["rs-link", "bb-link-demo"],
  ["rs-badge-solid", "bb-badge-solid"],
  ["rs-badge-muted", "bb-badge-muted"],
  ["rs-badge", "bb-badge"],
  ["rs-chip", "lib-chip"],
  ["rs-card-label", "bb-card-label"],
  ["rs-card-title", "bb-card-title"],
  ["rs-card-body", "bb-card-body"],
  ["rs-card", "bb-card-demo"],
  ["rs-input", "bb-sig-input"],
  ["rs-input-full", "rs-input"],
  ["rs-radio-dot", "bb-radio-dot"],
  ["rs-radio-on", "bb-radio-on"],
  ["rs-radio", "bb-radio"],
  ["rs-slider-fill", "bb-slider-fill"],
  ["rs-slider-thumb", "bb-slider-thumb"],
  ["rs-slider", "bb-slider"],
  ["rs-progress", "bb-progress"],
  ["rs-tabs", "bb-tabs"],
  ["rs-tab-active", "bb-tab-active"],
  ["rs-tab", "bb-tab"],
  ["rs-crumbs-sep", "bb-crumbs-demo-sep"],
  ["rs-crumbs-here", "bb-crumbs-demo-here"],
  ["rs-crumbs", "bb-crumbs-demo"],
  ["rs-dropdown", "bb-dropdown"],
  ["rs-menu-item-active", "bb-menu-item-active"],
  ["rs-menu-item", "bb-menu-item"],
  ["rs-menu", "bb-menu"],
  ["rs-dialog-title", "bb-dialog-title"],
  ["rs-dialog-body", "bb-dialog-body"],
  ["rs-dialog-actions", "bb-dialog-actions"],
  ["rs-dialog", "bb-dialog"],
  ["rs-code", "bb-code"],
  ["rs-icons", "bb-icons"],
];

/**
 * Selector-level rewrites for the compat layer that aren't plain class
 * renames. Raster 0.2 scoped table styles to .rs-table; 0.1 styled the
 * bare elements.
 */
export const legacySelectorMap: ReadonlyArray<readonly [canonical: string, legacy: string]> = [
  [".rs-table", "table"],
];

/** Rewrite canonical class selectors in a CSS string to their legacy names. */
export function toLegacyCss(css: string): string {
  let out = css;
  for (const [canonical, legacy] of legacyClassMap) {
    out = out.replace(new RegExp(`\\.${canonical}(?![\\w-])`, "g"), `.${legacy}`);
  }
  for (const [canonical, legacy] of legacySelectorMap) {
    out = out.replace(new RegExp(`\\${canonical}(?![\\w-])`, "g"), legacy);
  }
  return out;
}
