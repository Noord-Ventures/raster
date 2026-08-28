import * as React from "react";
import { cx } from "../cx";

/**
 * Raster chrome marks. Vera 28 Aug 2026.
 *
 * 16×16 module, optical center 8,8. Stroke 1, currentColor, fill none.
 * Cap butt, join miter, no rx. Hairline stays 1 CSS px at 12 and 16.
 * Copied is check. Accordion down is chevron-right rotated 90°.
 */
export const ICON_STROKE = 1;
export const ICON_VIEWBOX = 16;

export const iconInk = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: ICON_STROKE,
  strokeLinecap: "butt",
  strokeLinejoin: "miter",
  vectorEffect: "non-scaling-stroke",
} as const;

export const iconNames = ["copy", "copied", "chevron-left", "chevron-right", "close"] as const;
export type IconName = (typeof iconNames)[number] | "check";
export type IconSize = 12 | 16;
export type IconRotate = 90 | 180 | 270;

const marks: Record<(typeof iconNames)[number], React.ReactNode> = {
  copy: (
    <>
      <path d="M6.5 2.5 H13.5 V9.5" {...iconInk} />
      <rect x="2.5" y="6.5" width="7" height="7" {...iconInk} />
    </>
  ),
  copied: <path d="M3.5 8.5 L6.5 11.5 L12.5 4.5" {...iconInk} />,
  "chevron-left": <path d="M10.5 3.5 L5.5 8 L10.5 12.5" {...iconInk} />,
  "chevron-right": <path d="M5.5 3.5 L10.5 8 L5.5 12.5" {...iconInk} />,
  close: (
    <>
      <path d="M4.5 4.5 L11.5 11.5" {...iconInk} />
      <path d="M11.5 4.5 L4.5 11.5" {...iconInk} />
    </>
  ),
};

function resolveName(name: IconName): (typeof iconNames)[number] {
  return name === "check" ? "copied" : name;
}

export interface IconProps extends Omit<React.SVGAttributes<SVGSVGElement>, "children" | "rotate"> {
  name: IconName;
  size?: IconSize;
  /** Same mark, spun around 8,8. Accordion down is chevron-right at 90. */
  rotate?: IconRotate;
}

/** One mark. Size is the drawn square; the viewBox is always 16. */
export function Icon({ name, size = 16, rotate, className, ...props }: IconProps) {
  const nodes = marks[resolveName(name)];
  return (
    <svg
      className={cx("rs-icon", className)}
      viewBox="0 0 16 16"
      width={size}
      height={size}
      aria-hidden="true"
      {...iconInk}
      {...props}
    >
      {rotate ? <g transform={`rotate(${rotate} 8 8)`}>{nodes}</g> : nodes}
    </svg>
  );
}
