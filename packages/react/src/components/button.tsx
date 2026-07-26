import * as React from "react";
import { cx } from "../cx";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Solid ink primary or hairline ghost. One primary per view. */
  variant?: "primary" | "ghost";
  size?: "default" | "sm";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "default", type = "button", className, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx(
        variant === "ghost" ? "rs-btn-ghost" : "rs-btn-primary",
        size === "sm" && "rs-btn-sm",
        className,
      )}
      {...props}
    />
  );
});
