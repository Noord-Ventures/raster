import * as React from "react";
import { cx } from "../cx";

export interface Step {
  name: React.ReactNode;
  sub?: React.ReactNode;
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[];
  /** 0-based index of the active step; everything before it is done. */
  current: number;
}

export function Stepper({ steps, current, className, ...props }: StepperProps) {
  return (
    <div className={cx("rs-steps", className)} {...props}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="rs-step-line" aria-hidden="true" />}
          <div className="rs-step" aria-current={index === current ? "step" : undefined}>
            <span
              className={cx(
                "rs-step-dot",
                index < current && "rs-step-done",
                index === current && "rs-step-active",
              )}
            >
              {index + 1}
            </span>
            <span className="rs-step-name">{step.name}</span>
            {step.sub != null && <span className="rs-step-sub">{step.sub}</span>}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
