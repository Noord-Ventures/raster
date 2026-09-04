"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";

export interface ToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}

const styles = stylex.create({
  toggle: {
    boxSizing: "border-box",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: {
      default: 32,
      [mq.phone]: raster.hit,
    },
    minHeight: {
      default: null,
      [mq.phone]: raster.hit,
    },
    minWidth: {
      default: 32,
      [mq.phone]: raster.hit,
    },
    paddingBlock: 0,
    paddingInline: {
      default: 10,
      [mq.phone]: 14,
    },
    fontSize: {
      default: 13,
      [mq.phone]: raster.controlFs,
    },
    fontWeight: 500,
    letterSpacing: "-0.01em",
    backgroundColor: "transparent",
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: {
      default: raster.controlBorder,
      [mq.forcedColors]: "ButtonText",
    },
    borderRadius: {
      default: raster.radiusSm,
      [mq.phone]: 0,
    },
    color: {
      default: raster.gray,
      [mq.forcedColors]: "ButtonText",
    },
    cursor: "pointer",
    fontFamily: "inherit",
    transition: {
      default: `background-color ${raster.durationSnap} ${raster.ease}, color ${raster.durationSnap} ${raster.ease}, border-color ${raster.durationSnap} ${raster.ease}`,
      [mq.reduce]: "none",
    },
    outlineWidth: {
      default: null,
      ":focus-visible": 2,
    },
    outlineStyle: {
      default: null,
      ":focus-visible": "solid",
    },
    outlineColor: {
      default: null,
      ":focus-visible": raster.ink,
    },
    outlineOffset: {
      default: null,
      ":focus-visible": 2,
    },
  },
  pressed: {
    backgroundColor: {
      default: raster.ink,
      [mq.forcedColors]: "Highlight",
    },
    borderColor: {
      default: raster.ink,
      [mq.forcedColors]: "Highlight",
    },
    color: {
      default: raster.paper,
      [mq.forcedColors]: "HighlightText",
    },
    forcedColorAdjust: "none",
  },
  group: {
    display: {
      default: "inline-flex",
      [mq.phone]: "flex",
    },
    alignItems: "stretch",
    boxSizing: "border-box",
    height: {
      default: 32,
      [mq.phone]: raster.hit,
    },
    width: {
      default: null,
      [mq.phone]: "100%",
    },
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: {
      default: raster.controlBorder,
      [mq.forcedColors]: "ButtonText",
    },
    borderRadius: {
      default: raster.radiusSm,
      [mq.phone]: 0,
    },
    overflow: "hidden",
  },
  grouped: {
    height: "auto",
    flexGrow: {
      default: null,
      [mq.phone]: 1,
    },
    borderWidth: 0,
    borderRadius: 0,
    margin: 0,
    outlineOffset: {
      default: null,
      ":focus-visible": -2,
    },
    borderInlineStartWidth: {
      default: 0,
      ":not(:first-child)": raster.hairline,
    },
    borderInlineStartStyle: {
      default: "none",
      ":not(:first-child)": "solid",
    },
    borderInlineStartColor: {
      default: "transparent",
      ":not(:first-child)": raster.controlBorder,
    },
  },
  groupedOn: {
    position: "relative",
    zIndex: 1,
  },
});

/** Press switch; state lives in aria-pressed. */
export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  { pressed, defaultPressed, onPressedChange, className, style, onClick, ...props },
  ref,
) {
  const [inner, setInner] = React.useState(defaultPressed ?? false);
  const isControlled = pressed !== undefined;
  const on = isControlled ? pressed : inner;
  const sx = rs(["rs-toggle", className, on && "rs-toggle-pressed"], styles.toggle, on && styles.pressed);
  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={on}
      onClick={(e) => {
        if (!isControlled) setInner(!on);
        onPressedChange?.(!on);
        onClick?.(e);
      }}
      {...props}
      className={sx.className}
      style={{ ...sx.style, ...style }}
    />
  );
});

export interface ToggleGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: Array<{ value: string; label: React.ReactNode }>;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

/** One pressed at a time. */
export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(function ToggleGroup({
  options,
  value,
  defaultValue,
  onValueChange,
  className,
  style,
  ...props
}, ref) {
  const [inner, setInner] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : inner;
  const group = rs(["rs-toggle-group", className], styles.group);
  const nest: React.CSSProperties = {
    ["--rs-out" as string]: "var(--radius-sm)",
    ["--rs-gap" as string]: "0px",
    ["--rs-in" as string]: "max(0px, calc(var(--rs-out) - var(--rs-gap)))",
  };
  return (
    <div ref={ref} role="group" {...props} className={group.className} style={{ ...group.style, ...nest, ...style }}>
      {options.map((option) => {
        const on = option.value === current;
        const btn = rs(["rs-toggle", on && "rs-toggle-pressed", on && "rs-toggle-grouped-on"], styles.toggle, styles.grouped, on && styles.pressed, on && styles.groupedOn);
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={on}
            className={btn.className}
            style={btn.style}
            onClick={() => {
              if (!isControlled) setInner(option.value);
              onValueChange?.(option.value);
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
});
