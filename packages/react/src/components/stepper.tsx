import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { vlak, mq } from "../tokens.stylex";
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
      default: "0.1875rem",
      [mq.phone]: "0.375rem",
    },
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    minWidth: 0,
  },
  dot: {
    boxSizing: "border-box",
    width: {
      default: "1.5rem",
      [mq.phone]: vlak.hit,
    },
    height: {
      default: "1.5rem",
      [mq.phone]: vlak.hit,
    },
    borderRadius: "50%",
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: vlak.divider,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: {
      default: "0.6875rem",
      [mq.phone]: "0.9375rem",
    },
    fontWeight: 600,
    color: vlak.gray,
    marginBottom: {
      default: "0.375rem",
      [mq.phone]: "0.5rem",
    },
    backgroundColor: vlak.paper,
    position: "relative",
    zIndex: 1,
  },
  done: {
    backgroundColor: vlak.ink,
    borderColor: vlak.ink,
    color: vlak.paper,
  },
  active: {
    borderColor: vlak.ink,
    color: vlak.ink,
  },
  name: {
    fontSize: {
      default: "0.8125rem",
      [mq.phone]: vlak.controlFs,
    },
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: vlak.ink,
    lineHeight: 1.2,
  },
  sub: {
    fontSize: {
      default: "0.6875rem",
      [mq.phone]: "0.8125rem",
    },
    fontWeight: 500,
    color: vlak.gray,
    letterSpacing: "-0.01em",
  },
  line: {
    position: "absolute",
    top: {
      default: "0.71875rem",
      [mq.phone]: `calc(${vlak.hit} / 2)`,
    },
    insetInlineStart: {
      default: "1.5rem",
      [mq.phone]: vlak.hit,
    },
    insetInlineEnd: 0,
    height: vlak.hairline,
    backgroundColor: vlak.divider,
    margin: 0,
    minWidth: 0,
    zIndex: 0,
  },
});

export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(function Stepper(
  { steps, current, className, style, ...props },
  ref,
) {
  const root = rs(["rs-steps", className], styles.steps);
  return (
    <div ref={ref} {...props} className={root.className} style={{ ...root.style, ...style }}>
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
});
