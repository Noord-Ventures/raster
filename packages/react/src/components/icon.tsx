import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../tokens.stylex";
import { rs } from "../rs";
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

const at480 = "@media (max-width: 480px)" as const;

export { iconGroups, iconLabel, iconNames, resolveIcon };
export type { IconName, IconRotate };
export type { DrawnName, IconAlias, IconGroup } from "./icon-marks";

/**
 * Raster chrome marks. Vera 28 Aug 2026; optical recut 1 Sep 2026; R1 pairs 1 Sep 2026.
 *
 * 16×16 module, optical center 8,8. Line: stroke 1, fill none.
 * Filled: same figures, solid closed geometry, currentColor. Not a second library.
 * Cap butt, join miter, no rx. Hairline stays 1 CSS px at 12, 16, and 24.
 * Copied is check. Accordion down is chevron-right rotated 90°.
 * First five marks (copy, copied, chevron-left, chevron-right, close) stay as drawn,
 * except L/R chevrons take a measured +0.25y optical nudge toward 8,8.
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

export const iconFill = {
  fill: "currentColor",
  stroke: "none",
} as const;

export type IconSize = 12 | 16 | 24;
export type IconVariant = "line" | "filled";

const styles = stylex.create({
  icon: {
    display: "block",
    flexShrink: 0,
    overflow: "visible",
    color: "inherit",
  },
  row: {
    display: "flex",
    gap: 18,
    alignItems: "center",
    color: raster.ink,
  },
  catalog: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 28,
    textAlign: "start",
    alignSelf: "stretch",
  },
  group: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  groupTitle: {
    margin: 0,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 0,
    color: raster.gray,
    textTransform: "none",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(auto-fill, 184px)",
      [at480]: "minmax(0, 1fr)",
    },
    columnGap: raster.gutter,
    rowGap: 20,
    justifyContent: "start",
    width: "100%",
  },
  cell: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
    width: {
      default: 184,
      [at480]: "100%",
    },
  },
  pair: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    minHeight: 24,
  },
  kin: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    minHeight: 24,
  },
  label: {
    fontSize: 11,
    lineHeight: 1.3,
    color: raster.gray,
    textTransform: "none",
  },
});

function isClosed(el: MarkEl): boolean {
  if (el.t === "rect" || el.t === "circle") return true;
  if (el.t === "path") return /z\s*$/i.test(el.d.trim());
  return false;
}

function inkFor(el: MarkEl, variant: IconVariant) {
  return variant === "filled" && isClosed(el) ? iconFill : iconInk;
}

function renderEl(el: MarkEl, key: number, variant: IconVariant): React.ReactNode {
  const ink = inkFor(el, variant);
  switch (el.t) {
    case "path":
      return <path key={key} d={el.d} {...ink} />;
    case "rect":
      return <rect key={key} x={el.x} y={el.y} width={el.w} height={el.h} {...ink} />;
    case "circle":
      return <circle key={key} cx={el.cx} cy={el.cy} r={el.r} {...ink} />;
    case "line":
      return <line key={key} x1={el.x1} y1={el.y1} x2={el.x2} y2={el.y2} {...ink} />;
  }
}

export interface IconProps extends Omit<React.SVGAttributes<SVGSVGElement>, "children" | "rotate"> {
  name: IconName;
  size?: IconSize;
  /** Line hairline, or filled kinship of the same figure. */
  variant?: IconVariant;
  /** Same mark, spun around 8,8. Accordion down is chevron-right at 90. */
  rotate?: IconRotate;
}

/** One mark. Size is the drawn square; the viewBox is always 16. */
export const Icon = React.forwardRef<SVGSVGElement, IconProps>(function Icon(
  { name, size = 16, variant = "line", rotate, className, style, ...props },
  ref,
) {
  const resolved = resolveIcon(name);
  const turn = rotate ?? resolved.rotate;
  const nodes = marks[resolved.mark].map((el, i) => renderEl(el, i, variant));
  const sx = rs(["rs-icon", variant === "filled" && "rs-icon-filled", className], styles.icon);
  return (
    <svg
      ref={ref}
      viewBox="0 0 16 16"
      width={size}
      height={size}
      aria-hidden="true"
      {...iconInk}
      {...props}
      className={sx.className}
      style={{ ...sx.style, ...style }}
    >
      {turn ? <g transform={`rotate(${turn} 8 8)`}>{nodes}</g> : nodes}
    </svg>
  );
});

/** Inline mark row. One family, current color. */
export const Icons = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function Icons(
  { className, style, ...props },
  ref,
) {
  const sx = rs(["rs-icons", className], styles.row);
  return <div ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});

/** Full family at 12, 16, and 24, line | filled, grouped. Optical center 8,8. */
export const IconCatalog = React.forwardRef<HTMLDivElement, { className?: string }>(function IconCatalog(
  { className },
  ref,
) {
  const catalog = rs(["rs-icon-catalog", className], styles.catalog);
  const group = rs(["rs-icon-group"], styles.group);
  const groupTitle = rs(["rs-icon-group-title"], styles.groupTitle);
  const grid = rs(["rs-icon-grid"], styles.grid);
  const cell = rs(["rs-icon-cell"], styles.cell);
  const pair = rs(["rs-icon-pair"], styles.pair);
  const kin = rs(["rs-icon-kin"], styles.kin);
  const label = rs(["rs-icon-label"], styles.label);
  return (
    <div ref={ref} className={catalog.className} style={catalog.style}>
      {iconGroups.map((g) => (
        <section
          key={g.title}
          id={g.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
          className={group.className}
          style={group.style}
        >
          <h3 className={groupTitle.className} style={groupTitle.style}>
            {g.title}
          </h3>
          <div className={grid.className} style={grid.style}>
            {g.names.map((mark) => (
              <div key={`${g.title}-${mark}`} className={cell.className} style={cell.style}>
                <div className={pair.className} style={pair.style}>
                  <div className={kin.className} style={kin.style} data-variant="line">
                    <Icon name={mark} size={12} />
                    <Icon name={mark} size={16} />
                    <Icon name={mark} size={24} />
                  </div>
                  <div className={kin.className} style={kin.style} data-variant="filled">
                    <Icon name={mark} size={12} variant="filled" />
                    <Icon name={mark} size={16} variant="filled" />
                    <Icon name={mark} size={24} variant="filled" />
                  </div>
                </div>
                <span className={label.className} style={label.style}>
                  {iconLabel(mark)}
                </span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
});
