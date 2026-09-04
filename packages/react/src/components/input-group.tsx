import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";
import { Input, type InputProps } from "./input";

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Place the addon after the field. */
  end?: boolean;
}

const styles = stylex.create({
  group: {
    display: "flex",
    alignItems: "stretch",
    boxSizing: "border-box",
    width: "100%",
    height: raster.controlH,
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: {
      default: raster.divider,
      ":focus-within": raster.accent,
    },
    borderRadius: {
      default: raster.radiusSm,
      [mq.phone]: 0,
    },
    backgroundColor: "var(--bg)",
    overflow: "hidden",
  },
  addon: {
    display: "flex",
    alignItems: "center",
    paddingInline: {
      default: 10,
      [mq.phone]: 14,
    },
    paddingBlock: 0,
    fontSize: {
      default: 13,
      [mq.phone]: raster.controlFs,
    },
    fontWeight: 500,
    letterSpacing: "-0.01em",
    color: raster.gray,
    backgroundColor: raster.tableAlt,
    whiteSpace: "nowrap",
    minHeight: {
      default: null,
      [mq.phone]: raster.hit,
    },
    borderInlineStartWidth: raster.hairline,
    borderInlineStartStyle: "solid",
    borderInlineStartColor: raster.divider,
  },
  firstAddon: {
    borderInlineStartWidth: 0,
  },
});

/** Addon and field share one hairline. */
export function InputGroup({ end, className, style, children, ...props }: InputGroupProps) {
  const sx = rs(["rs-input-group", end && "rs-input-group-end", className], styles.group);
  return (
    <div {...props} className={sx.className} style={{ ...sx.style, ...style }}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === Input) {
          const next = child.props as InputProps;
          return React.cloneElement(child as React.ReactElement<InputProps>, {
            plain: next.plain ?? true,
            grouped: next.grouped ?? true,
          });
        }
        return child;
      })}
    </div>
  );
}

export function InputAddon({ className, style, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  const sx = rs(["rs-input-addon", className], styles.addon);
  return <span {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}
