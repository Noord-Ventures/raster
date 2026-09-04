import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";


export interface EmptyProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  action?: React.ReactNode;
}

const styles = stylex.create({
  empty: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "0.5rem",
    minHeight: 204,
    padding: "1.25rem",
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: raster.divider,
    borderRadius: 0,
  },
  title: {
    margin: 0,
    fontSize: "0.9375rem",
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: raster.ink,
  },
  body: {
    margin: 0,
    fontSize: "0.84375rem",
    lineHeight: 1.55,
    letterSpacing: "-0.01em",
    color: raster.gray,
  },
  action: {
    marginTop: "0.5rem",
    width: {
      default: "fit-content",
      [mq.phone]: "100%",
    },
  },
});

/** A vacant cell. Title, one sentence, optional action. */
export const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(function Empty(
  { title, action, className, style, children, ...props },
  ref,
) {
  const sx = rs(["rs-empty", className], styles.empty);
  const heading = rs(["rs-empty-title"], styles.title);
  const body = rs(["rs-empty-body"], styles.body);
  const act = rs(["rs-empty-action"], styles.action);
  return (
    <div ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }}>
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
});
