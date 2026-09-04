import type * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../tokens.stylex";
import { rs } from "../rs";

export interface SeparatorProps extends React.HTMLAttributes<HTMLElement> {
  orientation?: "horizontal" | "vertical";
}

const styles = stylex.create({
  horizontal: {
    borderWidth: 0,
    borderStyle: "none",
    borderTopWidth: raster.hairline,
    borderTopStyle: "solid",
    borderTopColor: raster.divider,
    marginBlock: 20,
    marginInline: 0,
  },
  vertical: {
    display: "inline-block",
    width: raster.hairline,
    alignSelf: "stretch",
    backgroundColor: raster.divider,
    marginBlock: 0,
    marginInline: 12,
  },
});

export function Separator({ orientation = "horizontal", className, style, ...props }: SeparatorProps) {
  if (orientation === "vertical") {
    const sx = rs(["rs-sep-v", className], styles.vertical);
    return (
      // biome-ignore lint/a11y/useFocusableInteractive: a static separator is not a widget; it takes no focus
      <span
        // biome-ignore lint/a11y/useAriaPropsForRole: a non-focusable separator needs no aria-valuenow
        role="separator"
        aria-orientation="vertical"
        {...props}
        className={sx.className}
        style={{ ...sx.style, ...style }}
      />
    );
  }
  const sx = rs(["rs-sep", className], styles.horizontal);
  return <hr {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}
