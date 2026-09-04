import * as React from "react";

/* React 18 and 19 spell newer DOM attributes differently: 19 knows
   popoverTarget and boolean inert, 18 only passes lowercase unknown
   attributes through as strings. These helpers emit the right shape. */
const major = Number.parseInt(React.version.split(".")[0] ?? "19", 10);

/** Attributes that point a button at a popover element. */
export function popoverTargetAttrs(id: string): Record<string, string> {
  return major >= 19 ? { popoverTarget: id } : { popovertarget: id };
}

/** The inert attribute, on when `on` is true. */
export function inertAttrs(on: boolean): Record<string, boolean | string | undefined> {
  if (major >= 19) return { inert: on };
  return { inert: on ? "" : undefined };
}
