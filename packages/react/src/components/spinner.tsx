import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { vlak, mq } from "../tokens.stylex";
import { rs } from "../rs";

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  label?: string;
}

const spin = stylex.keyframes({
  to: { transform: "rotate(360deg)" },
});

const styles = stylex.create({
  spinner: {
    display: "inline-flex",
    width: "1rem",
    height: "1rem",
    color: vlak.ink,
    verticalAlign: "middle",
  },
  ring: {
    display: "block",
    width: "1rem",
    height: "1rem",
    animationName: {
      default: spin,
      [mq.reduce]: "none",
    },
    animationDuration: "0.7s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  },
});

/** Hairline ring. Stops under prefers-reduced-motion. */
export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { label = "Loading", className, style, ...props },
  ref,
) {
  const sx = rs(["rs-spinner", className], styles.spinner);
  const ring = rs(["rs-spinner-ring"], styles.ring);
  return (
    <span ref={ref} role="status" aria-label={label} {...props} className={sx.className} style={{ ...sx.style, ...style }}>
      <svg
        viewBox="0 0 16 16"
        width="16"
        height="16"
        fill="none"
        aria-hidden="true"
        className={ring.className}
        style={ring.style}
      >
        <circle
          cx="8"
          cy="8"
          r="6.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          vectorEffect="non-scaling-stroke"
          strokeDasharray="28 13"
        />
      </svg>
    </span>
  );
});
