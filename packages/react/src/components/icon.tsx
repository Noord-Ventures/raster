import * as React from "react";
import { cx } from "../cx";
import {
  iconGroups,
  iconLabel,
  iconNames,
  marks,
  resolveIcon,
  type IconName,
  type IconRotate,
  type MarkEl,
} from "./icon-marks";

export { iconGroups, iconLabel, iconNames, resolveIcon };
export type { IconName, IconRotate };
export type { DrawnName, IconAlias, IconGroup } from "./icon-marks";

/**
 * Raster chrome marks. Vera 28 Aug 2026; optical recut 1 Sep 2026.
 *
 * 16×16 module, optical center 8,8. Stroke 1, currentColor, fill none.
 * Cap butt, join miter, no rx. Hairline stays 1 CSS px at 12, 16, and 24.
 * Copied is check. Accordion down is chevron-right rotated 90°.
 * First five marks (copy, copied, chevron-left, chevron-right, close) stay as drawn.
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

export type IconSize = 12 | 16 | 24;

function renderEl(el: MarkEl, key: number): React.ReactNode {
  switch (el.t) {
    case "path":
      return <path key={key} d={el.d} {...iconInk} />;
    case "rect":
      return <rect key={key} x={el.x} y={el.y} width={el.w} height={el.h} {...iconInk} />;
    case "circle":
      return <circle key={key} cx={el.cx} cy={el.cy} r={el.r} {...iconInk} />;
    case "line":
      return <line key={key} x1={el.x1} y1={el.y1} x2={el.x2} y2={el.y2} {...iconInk} />;
  }
}

export interface IconProps extends Omit<React.SVGAttributes<SVGSVGElement>, "children" | "rotate"> {
  name: IconName;
  size?: IconSize;
  /** Same mark, spun around 8,8. Accordion down is chevron-right at 90. */
  rotate?: IconRotate;
}

/** One mark. Size is the drawn square; the viewBox is always 16. */
export function Icon({ name, size = 16, rotate, className, ...props }: IconProps) {
  const resolved = resolveIcon(name);
  const turn = rotate ?? resolved.rotate;
  const nodes = marks[resolved.mark].map(renderEl);
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
      {turn ? <g transform={`rotate(${turn} 8 8)`}>{nodes}</g> : nodes}
    </svg>
  );
}

/** Full family at 12, 16, and 24, grouped. */
export function IconCatalog({ className }: { className?: string }) {
  return (
    <div className={cx("rs-icon-catalog", className)}>
      {iconGroups.map((group) => (
        <section key={group.title} className="rs-icon-group">
          <h3 className="rs-icon-group-title">{group.title}</h3>
          <div className="rs-icon-grid">
            {group.names.map((mark) => (
              <div key={`${group.title}-${mark}`} className="rs-icon-cell">
                <div className="rs-icon-pair">
                  <Icon name={mark} size={12} />
                  <Icon name={mark} size={16} />
                  <Icon name={mark} size={24} />
                </div>
                <span className="rs-icon-label">{iconLabel(mark)}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
