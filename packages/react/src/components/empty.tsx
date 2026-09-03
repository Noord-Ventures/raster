import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, phone as phoneToken } from "../tokens.stylex";
import { rs } from "../rs";

const phone = "@media (max-width: 640px)" as typeof phoneToken;

export interface EmptyProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  action?: React.ReactNode;
}

const styles = stylex.create({
  empty: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 8,
    minHeight: 204,
    padding: 20,
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: raster.divider,
    borderRadius: 0,
  },
  title: {
    margin: 0,
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: raster.ink,
  },
  body: {
    margin: 0,
    fontSize: 13.5,
    lineHeight: 1.55,
    letterSpacing: "-0.01em",
    color: raster.gray,
  },
  action: {
    marginTop: 8,
    width: {
      default: "fit-content",
      [phone]: "100%",
    },
  },
});

/** A vacant cell. Title, one sentence, optional action. */
export function Empty({ title, action, className, style, children, ...props }: EmptyProps) {
  const sx = rs(["rs-empty", className], styles.empty);
  const heading = rs(["rs-empty-title"], styles.title);
  const body = rs(["rs-empty-body"], styles.body);
  const act = rs(["rs-empty-action"], styles.action);
  return (
    <div {...props} className={sx.className} style={{ ...sx.style, ...style }}>
      {title != null && (
        <p className={heading.className} style={heading.style}>
          {title}
        </p>
      )}
      {children != null && (
        <p className={body.className} style={body.style}>
          {children}
        </p>
      )}
      {action != null && (
        <div className={act.className} style={act.style}>
          {action}
        </div>
      )}
    </div>
  );
}
