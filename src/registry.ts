/**
 * Raster component registry — the interface kit as data, served through
 * the MCP endpoint so external agents can build with the system. Each
 * entry names the CSS classes involved and carries a minimal markup
 * snippet in the house style.
 */

export interface RasterComponent {
  name: string;
  description: string;
  classes: string[];
  snippet: string;
}

export const rasterComponents: RasterComponent[] = [
  {
    name: "button-primary",
    description: "Solid ink button; one per view. 40px tall, 36px small variant.",
    classes: ["bb-btn-primary", "bb-btn-sm"],
    snippet: `<button class="bb-btn-primary">Primary action</button>`,
  },
  {
    name: "button-secondary",
    description: "Hairline ghost button; fills with the border color on hover.",
    classes: ["bb-btn-ghost", "bb-btn-sm"],
    snippet: `<button class="bb-btn-ghost">Secondary</button>`,
  },
  {
    name: "text-link",
    description: "Underlined by its hairline; never colored.",
    classes: ["bb-link-demo"],
    snippet: `<a class="bb-link-demo" href="#">A text link</a>`,
  },
  {
    name: "input",
    description: "Quiet field: hairline border, ink focus, label above at 12px.",
    classes: ["bb-sig-input", "rs-field", "rs-field-label"],
    snippet: `<div class="rs-field"><span class="rs-field-label">E-mail</span><input class="bb-sig-input" /></div>`,
  },
  {
    name: "inline-form",
    description: "One field, one action — the action lives inside the field and appears once input validates.",
    classes: ["rs-inline-field", "rs-inline-input", "rs-inline-btn", "rs-reveal"],
    snippet: `<div class="rs-inline-field"><input class="rs-inline-input" placeholder="Your e-mail" /><span class="rs-reveal rs-reveal-in"><button class="bb-btn-primary rs-inline-btn">Subscribe</button></span></div>`,
  },
  {
    name: "radio",
    description: "One choice; the dot is ink, never a hue.",
    classes: ["bb-radio", "bb-radio-dot", "bb-radio-on"],
    snippet: `<span class="bb-radio"><span class="bb-radio-dot bb-radio-on"></span>Monthly</span>`,
  },
  {
    name: "checkbox",
    description: "Many choices; 16px boxes, 3px radius, ink when checked.",
    classes: ["rs-check", "rs-check-on"],
    snippet: `<span class="bb-radio"><span class="rs-check rs-check-on">✓</span>Brand</span>`,
  },
  {
    name: "switch",
    description: "32×18 pill; on is ink, off is hairline. State moves, layout doesn't.",
    classes: ["rs-switch", "rs-switch-on"],
    snippet: `<span class="rs-switch rs-switch-on"><i></i></span>`,
  },
  {
    name: "slider",
    description: "Thin track with ink fill and 14px thumb.",
    classes: ["bb-slider", "bb-slider-fill", "bb-slider-thumb"],
    snippet: `<div class="bb-slider"><span class="bb-slider-fill" style="width:62%"></span><span class="bb-slider-thumb" style="left:62%"></span></div>`,
  },
  {
    name: "progress",
    description: "4px bar; the percentage lives in the label, never inside the bar.",
    classes: ["bb-progress", "rs-progress-head"],
    snippet: `<div class="rs-progress-head"><span>Uploading</span><span>40%</span></div><div class="bb-progress"><span style="width:40%"></span></div>`,
  },
  {
    name: "tabs",
    description: "Active tab is ink with a 1.5px underline.",
    classes: ["bb-tabs", "bb-tab", "bb-tab-active"],
    snippet: `<div class="bb-tabs"><span class="bb-tab bb-tab-active">Overview</span><span class="bb-tab">Activity</span></div>`,
  },
  {
    name: "breadcrumbs",
    description: "Slashes at 40% opacity; the current page is ink.",
    classes: ["bb-crumbs-demo", "bb-crumbs-demo-sep", "bb-crumbs-demo-here"],
    snippet: `<p class="bb-crumbs-demo"><span>Studio</span><span class="bb-crumbs-demo-sep">/</span><span class="bb-crumbs-demo-here">Raster</span></p>`,
  },
  {
    name: "pagination",
    description: "Squares, not pills; the current page is solid ink.",
    classes: ["rs-pages", "rs-page", "rs-page-on"],
    snippet: `<div class="rs-pages"><span class="rs-page">‹</span><span class="rs-page rs-page-on">1</span><span class="rs-page">2</span><span class="rs-page">›</span></div>`,
  },
  {
    name: "dropdown",
    description: "Closed trigger with chevron; the open menu overlays instead of pushing layout.",
    classes: ["bb-dropdown", "bb-menu", "bb-menu-item", "bb-menu-item-active"],
    snippet: `<div class="bb-dropdown"><span>Alkmaar</span></div><div class="bb-menu"><span class="bb-menu-item bb-menu-item-active">Alkmaar</span></div>`,
  },
  {
    name: "dialog",
    description: "One question, two equal-sized actions, no third option.",
    classes: ["bb-dialog", "bb-dialog-title", "bb-dialog-body", "bb-dialog-actions"],
    snippet: `<div class="bb-dialog"><span class="bb-dialog-title">Remove this item?</span><p class="bb-dialog-body">…</p><div class="bb-dialog-actions"><button class="bb-btn-ghost bb-btn-sm">Cancel</button><button class="bb-btn-primary bb-btn-sm">Remove</button></div></div>`,
  },
  {
    name: "badge",
    description: "Outline for recommendations, solid for done, muted for pending.",
    classes: ["bb-badge", "bb-badge-solid", "bb-badge-muted"],
    snippet: `<span class="bb-badge">Recommended</span><span class="bb-badge-solid">Delivered</span><span class="bb-badge-muted">In progress</span>`,
  },
  {
    name: "mono-chip",
    description: "Technical identifiers set in the mono stack with a mixed hairline.",
    classes: ["lib-chip"],
    snippet: `<span class="lib-chip">/noord-brand</span>`,
  },
  {
    name: "table",
    description: "Hairline rows on the open grid; no cell borders, last column right-aligned.",
    classes: ["table (element styles)"],
    snippet: `<table><thead><tr><th>Phase</th><th>Weeks</th></tr></thead><tbody><tr><td>Strategy</td><td>2</td></tr></tbody></table>`,
  },
  {
    name: "workflow-card",
    description: "Editable pipeline card: dashed frame, drag handle, dashed chips, ghost add-step card.",
    classes: ["rs-flow", "rs-flow-step", "rs-flow-num", "rs-flow-subs", "rs-flow-add"],
    snippet: `<div class="rs-flow"><div class="rs-flow-step"><span class="rs-flow-num">1</span><h4>Proposal</h4><p>…</p></div></div>`,
  },
  {
    name: "assistant-panel",
    description: "Chat surface: user block, replies, suggestion card with applied state, quiet input row.",
    classes: ["rs-ai", "rs-ai-user-block", "rs-ai-reply", "rs-ai-card", "rs-ai-input"],
    snippet: `<div class="rs-ai"><div class="rs-ai-msg rs-ai-user"><div class="rs-ai-user-block">…</div></div><p class="rs-ai-reply">…</p></div>`,
  },
  {
    name: "icons",
    description: "16/20/24/32px, single-weight 1.5px strokes in currentColor, non-scaling.",
    classes: ["bb-icons"],
    snippet: `<svg viewBox="0 0 16 16" width="16" height="16" fill="none"><path d="M2.5 8h11M9.5 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>`,
  },
];
