import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../tokens.stylex";
import { rs } from "../rs";
import { Icon } from "./icon";

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  /** Solid ink variant. */
  variant?: "outline" | "solid";
  icon?: React.ReactNode;
  /**
   * Static content is a note. Set "polite" (role=status) or "assertive"
   * (role=alert) only when the alert appears in response to something.
   */
  live?: "polite" | "assertive";
}

const styles = stylex.create({
  alert: {
    display: "flex",
    gap: "0.625rem",
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: raster.divider,
    borderRadius: raster.radius,
    paddingBlock: "0.75rem",
    paddingInline: "0.875rem",
    alignItems: "flex-start",
  },
  solid: {
    backgroundColor: raster.ink,
    borderColor: raster.ink,
  },
  icon: {
    flexShrink: 0,
    marginTop: 1,
    color: raster.ink,
  },
  iconSolid: {
    color: raster.paper,
  },
  title: {
    display: "block",
    fontSize: "0.84375rem",
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: raster.ink,
  },
  titleSolid: {
    color: raster.paper,
  },
  body: {
    fontSize: "0.8125rem",
    lineHeight: 1.55,
    letterSpacing: "-0.01em",
    color: raster.gray,
    marginTop: 2,
    marginBottom: 0,
    marginInline: 0,
  },
  bodySolid: {
    color: raster.paper,
  },
});

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { title, variant = "outline", icon, live, className, style, children, ...props },
  ref,
) {
  const sx = rs(["rs-alert", variant === "solid" && "rs-alert-solid", className], styles.alert, variant === "solid" && styles.solid);
  const mark = rs(["rs-alert-icon", variant === "solid" && "rs-alert-icon-solid"], styles.icon, variant === "solid" && styles.iconSolid);
  const heading = rs(["rs-alert-title", variant === "solid" && "rs-alert-title-solid"], styles.title, variant === "solid" && styles.titleSolid);
  const body = rs(["rs-alert-body", variant === "solid" && "rs-alert-body-solid"], styles.body, variant === "solid" && styles.bodySolid);
  const role = live === "assertive" ? "alert" : live === "polite" ? "status" : "note";
  return (
    <div ref={ref} role={role} {...props} className={sx.className} style={{ ...sx.style, ...style }}>
      {icon ?? <Icon name="info" size={16} className={mark.className} style={mark.style} />}
      <div>
        {title != null && (
          <span className={heading.className} style={heading.style}>
            {title}
          </span>
        )}
        {children != null && (
          <p className={body.className} style={body.style}>
            {children}
          </p>
        )}
      </div>
    </div>
  );
});
