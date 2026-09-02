import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../tokens.stylex";
import { rs } from "../rs";
import type { ButtonProps } from "./button";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const styles = stylex.create({
  group: {
    boxSizing: "border-box",
    display: {
      default: "inline-flex",
      "@media (max-width: 640px)": "flex",
    },
    alignItems: "stretch",
    height: raster.controlH,
    width: {
      default: null,
      "@media (max-width: 640px)": "100%",
    },
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: raster.divider,
    borderRadius: {
      default: raster.radiusSm,
      "@media (max-width: 640px)": 0,
    },
    backgroundColor: raster.divider,
    gap: raster.hairline,
    overflow: "hidden",
  },
});

/** Flush joined actions. One hairline between. Group owns the outer stroke. */
export function ButtonGroup({ className, style, children, ...props }: ButtonGroupProps) {
  const sx = rs(["rs-btn-group", className], styles.group);
  return (
    <div role="group" {...props} className={sx.className} style={{ ...sx.style, ...style }}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<ButtonProps>, { grouped: true })
          : child,
      )}
    </div>
  );
}
