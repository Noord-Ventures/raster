import { describe, expect, it } from "vitest";
import { rasterComponents } from "../src/registry";

/**
 * Official shadcn/ui registry:ui names from
 * https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/_registry.ts
 * checked 2026-08-26. Completeness means the catalog, not a clone.
 *
 * Raster names that cover a shadcn item (same job, Raster law):
 *   breadcrumb → breadcrumbs
 *   radio-group → radio
 */
const SHADCN_UI = [
  "accordion",
  "alert",
  "alert-dialog",
  "aspect-ratio",
  "avatar",
  "badge",
  "breadcrumb",
  "button",
  "button-group",
  "calendar",
  "card",
  "carousel",
  "chart",
  "checkbox",
  "collapsible",
  "combobox",
  "command",
  "context-menu",
  "dialog",
  "drawer",
  "dropdown-menu",
  "empty",
  "field",
  "form",
  "hover-card",
  "input",
  "input-group",
  "input-otp",
  "item",
  "label",
  "menubar",
  "navigation-menu",
  "pagination",
  "popover",
  "progress",
  "radio-group",
  "resizable",
  "scroll-area",
  "select",
  "separator",
  "sheet",
  "sidebar",
  "skeleton",
  "slider",
  "sonner",
  "spinner",
  "switch",
  "table",
  "tabs",
  "textarea",
  "toast",
  "toggle",
  "toggle-group",
  "tooltip",
  "kbd",
  "native-select",
  "direction",
  "attachment",
  "bubble",
  "marker",
  "message",
  "message-scroller",
] as const;

const ALIASES: Record<string, string> = {
  breadcrumb: "breadcrumbs",
  "radio-group": "radio",
};

/** Cannot be Raster without a JS widget library, Radix, or a chat SDK. */
const DEFERRED = new Set([
  "sonner",
  "direction",
  "attachment",
  "bubble",
  "marker",
  "message",
  "message-scroller",
]);

describe("shadcn everyday catalog parity", () => {
  const names = new Set(rasterComponents.map((c) => c.name));

  it("ships every everyday official ui item, or names it deferred", () => {
    const missing = SHADCN_UI.filter((name) => {
      if (DEFERRED.has(name)) return false;
      return !names.has(name) && !names.has(ALIASES[name] ?? "");
    });
    expect(missing, `everyday gap: ${missing.join(", ")}`).toEqual([]);
  });

  it("does not claim deferred AI or widget-library items", () => {
    for (const name of DEFERRED) {
      expect(names.has(name), `${name} should stay deferred`).toBe(false);
    }
  });
});
