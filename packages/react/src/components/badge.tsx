import * as React from "react";
import { cx } from "../cx";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Outline for recommendations, solid for done, muted for pending. */
  variant?: "outline" | "solid" | "muted";
}

const variantClass = {
  outline: "rs-badge",
  solid: "rs-badge-solid",
  muted: "rs-badge-muted",
} as const;

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = "outline", className, ...props },
  ref,
) {
  return <span ref={ref} className={cx(variantClass[variant], className)} {...props} />;
});
