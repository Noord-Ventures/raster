import * as React from "react";
import { cx } from "../cx";

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function Card({ className, ...props }, ref) {
    return <div ref={ref} className={cx("rs-card", className)} {...props} />;
  },
);

export function CardInner({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("rs-card-in", className)} {...props} />;
}

export function CardLabel({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cx("rs-card-label", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cx("rs-card-title", className)} {...props} />;
}

export function CardBody({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cx("rs-card-body", className)} {...props} />;
}
