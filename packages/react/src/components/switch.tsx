import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../tokens.stylex";
import { rs } from "../rs";

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const styles = stylex.create({
  track: {
    display: "inline-flex",
    boxSizing: "border-box",
    width: {
      default: 32,
      ["@media (max-width: 640px)"]: 64,
    },
    height: {
      default: 18,
      ["@media (max-width: 640px)"]: raster.hit,
    },
    minWidth: {
      default: null,
      ["@media (max-width: 640px)"]: 64,
    },
    minHeight: {
      default: null,
      ["@media (max-width: 640px)"]: raster.hit,
    },
    borderRadius: {
      default: 9,
      ["@media (max-width: 640px)"]: 0,
    },
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: raster.divider,
    position: "relative",
    flexShrink: 0,
    padding: 0,
    backgroundColor: "transparent",
    cursor: "pointer",
    transition: `background-color ${raster.duration} ${raster.ease}, border-color ${raster.duration} ${raster.ease}`,
  },
  on: {
    backgroundColor: raster.ink,
    borderColor: raster.ink,
  },
  thumb: {
    position: "absolute",
    top: {
      default: 1.5,
      ["@media (max-width: 640px)"]: 4,
    },
    left: {
      default: 1.5,
      ["@media (max-width: 640px)"]: 4,
    },
    width: {
      default: 12,
      ["@media (max-width: 640px)"]: 36,
    },
    height: {
      default: 12,
      ["@media (max-width: 640px)"]: 36,
    },
    borderRadius: {
      default: "50%",
      ["@media (max-width: 640px)"]: 0,
    },
    backgroundColor: raster.gray,
    transition: `transform ${raster.duration} ${raster.ease}`,
  },
  thumbOn: {
    backgroundColor: raster.paper,
    transform: {
      default: "translateX(14px)",
      ["@media (max-width: 640px)"]: "translateX(20px)",
    },
  },
});

/** A button with role="switch". */
export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { checked, defaultChecked, onCheckedChange, className, style, onClick, ...props },
  ref,
) {
  const [inner, setInner] = React.useState(defaultChecked ?? false);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : inner;
  const sx = rs(["rs-switch", on && "rs-switch-on", className], styles.track, on && styles.on);
  const knob = rs([], styles.thumb, on && styles.thumbOn);
  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={on}
      className={sx.className}
      style={{ ...sx.style, ...style }}
      onClick={(e) => {
        if (!isControlled) setInner(!on);
        onCheckedChange?.(!on);
        onClick?.(e);
      }}
      {...props}
    >
      <i className={knob.className} style={knob.style} />
    </button>
  );
});
