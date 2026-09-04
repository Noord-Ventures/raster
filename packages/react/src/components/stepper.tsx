import type * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";

export interface Step {
  name: React.ReactNode;
  sub?: React.ReactNode;
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[];
  /** 0-based index of the active step; everything before it is done. */
  current: number;
}

const styles = stylex.create({
  steps: {
    display: "flex",
    alignItems: "flex-start",
    width: "100%",
    maxWidth: "100%",
    gap: 0,
  },
  step: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: {
      default: 3,
      [mq.phone]: 6,
    },
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    minWidth: 0,
  },
  dot: {
    boxSizing: "border-box",
    width: {
      default: 24,
      [mq.phone]: raster.hit,
    },
    height: {
      default: 24,
      [mq.phone]: raster.hit,
    },
    borderRadius: "50%",
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: raster.divider,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: {
      default: 11,
      [mq.phone]: 15,
    },
    fontWeight: 600,
    color: raster.gray,
    marginBottom: {
      default: 6,
      [mq.phone]: 8,
    },
    backgroundColor: raster.paper,
    position: "relative",
    zIndex: 1,
  },
  done: {
    backgroundColor: raster.ink,
    borderColor: raster.ink,
    color: raster.paper,
  },
  active: {
    borderColor: raster.ink,
    color: raster.ink,
  },
  name: {
    fontSize: {
      default: 13,
      [mq.phone]: raster.controlFs,
    },
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: raster.ink,
    lineHeight: 1.2,
  },
  sub: {
    fontSize: {
      default: 11,
      [mq.phone]: 13,
    },
    fontWeight: 500,
    color: raster.gray,
    letterSpacing: "-0.01em",
  },
  line: {
    position: "absolute",
    top: {
      default: 11.5,
      [mq.phone]: `calc(${raster.hit} / 2)`,
    },
    insetInlineStart: {
      default: 24,
      [mq.phone]: raster.hit,
    },
    insetInlineEnd: 0,
    height: raster.hairline,
    backgroundColor: raster.divider,
    margin: 0,
    minWidth: 0,
    zIndex: 0,
  },
});

export function Stepper({ steps, current, className, style, ...props }: StepperProps) {
  const root = rs(["rs-steps", className], styles.steps);
  return (
    <div {...props} className={root.className} style={{ ...root.style, ...style }}>
      {steps.map((step, index) => {
        const row = rs(["rs-step"], styles.step);
        const dot = rs(
          ["rs-step-dot", index < current && "rs-step-done", index === current && "rs-step-active"],
          styles.dot,
          index < current && styles.done,
          index === current && styles.active,
        );
        const line = rs(["rs-step-line"], styles.line);
        const name = rs(["rs-step-name"], styles.name);
        const sub = rs(["rs-step-sub"], styles.sub);
        return (
          <div key={index} className={row.className} style={row.style} aria-current={index === current ? "step" : undefined}>
            <span className={dot.className} style={dot.style}>
              {index + 1}
            </span>
            {index < steps.length - 1 && <span className={line.className} style={line.style} aria-hidden="true" />}
            <span className={name.className} style={name.style}>
              {step.name}
            </span>
            {step.sub != null && (
              <span className={sub.className} style={sub.style}>
                {step.sub}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
