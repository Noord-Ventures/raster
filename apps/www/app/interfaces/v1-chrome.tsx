"use client";

import { sx } from "@/lib/sx";
import { interfaces } from "./interfaces.stylex";

/** Phone V1 chrome from box export-v1 stills. Desktop hides this. */
export function PhoneV1Chrome({
  heading,
  action,
  onAction,
}: {
  heading: string;
  action: string;
  onAction: () => void;
}) {
  return (
    <>
      <div {...sx("if-v1-status", interfaces.v1Status)} aria-hidden="true">
        <span>9:41</span>
        <span>Raster</span>
      </div>
      <header {...sx("if-v1-nav", interfaces.v1Nav)}>
        <p {...sx("if-v1-title", interfaces.v1Title)}>{heading}</p>
        <button type="button" {...sx("if-v1-action", interfaces.v1Action)} onClick={onAction}>
          {action}
        </button>
      </header>
    </>
  );
}
