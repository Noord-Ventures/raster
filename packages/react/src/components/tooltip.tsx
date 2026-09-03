import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, phone as phoneToken } from "../tokens.stylex";
import { rs } from "../rs";

const phone = "@media (max-width: 640px)" as typeof phoneToken;

export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Tip text. Plain CSS shows it on hover and on keyboard focus. */
  tip: string;
}

const styles = stylex.create({
  tip: {
    position: "relative",
    display: "inline-flex",
    "::after": {
      content: "attr(data-tip)",
      position: "absolute",
      bottom: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: raster.ink,
      color: raster.paper,
      fontSize: {
        default: 11.5,
        [phone]: 13,
      },
      fontWeight: 500,
      letterSpacing: "-0.01em",
      lineHeight: 1.3,
      paddingBlock: {
        default: 5,
        [phone]: 8,
      },
      paddingInline: {
        default: 9,
        [phone]: 12,
      },
      borderRadius: {
        default: raster.radiusSm,
        [phone]: 0,
      },
      whiteSpace: "nowrap",
      opacity: 0,
      pointerEvents: "none",
      zIndex: 180,
      transition: `opacity ${raster.durationSnap} ${raster.ease} ${raster.durationSnap}`,
    },
    ":hover::after": {
      opacity: {
        default: 1,
        "@media (hover: none)": 0,
      },
    },
    ":focus-within::after": {
      opacity: 1,
    },
    ":active::after": {
      opacity: {
        default: null,
        "@media (hover: none)": 1,
      },
    },
  },
});

export function Tooltip({ tip, className, style, children, ...props }: TooltipProps) {
  const sx = rs(["rs-tip", className], styles.tip);
  return (
    <span {...props} className={sx.className} style={{ ...sx.style, ...style }} data-tip={tip}>
      {children}
    </span>
  );
}
