import type * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../tokens.stylex";
import { rs } from "../rs";

const styles = stylex.create({
  kbd: {
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontSize: 11,
    fontWeight: 500,
    color: raster.gray,
    backgroundColor: raster.paper,
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: raster.divider,
    borderBottomWidth: 2,
    borderRadius: raster.radiusSm,
    paddingBlock: 2,
    paddingInline: 6,
    lineHeight: 1.2,
  },
  pair: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
  },
});

export function Kbd({ className, style, ...props }: React.HTMLAttributes<HTMLElement>) {
  const sx = rs(["rs-kbd", className], styles.kbd);
  return <kbd {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function KbdPair({ className, style, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  const sx = rs(["rs-kbd-pair", className], styles.pair);
  return <span {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}
