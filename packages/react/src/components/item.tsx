import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { vlak, mq } from "../tokens.stylex";
import { rs } from "../rs";


export interface ItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  meta?: React.ReactNode;
}

const styles = stylex.create({
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    minHeight: {
      default: "3rem",
      [mq.phone]: vlak.hit,
    },
    paddingBlock: {
      default: "0.625rem",
      [mq.phone]: "0.875rem",
    },
    paddingInline: 0,
    borderBottomWidth: {
      default: vlak.hairline,
      ":last-child": 0,
    },
    borderBottomStyle: "solid",
    borderBottomColor: vlak.divider,
    borderRadius: 0,
  },
  title: {
    margin: 0,
    fontSize: {
      default: "0.875rem",
      [mq.phone]: vlak.controlFs,
    },
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: vlak.ink,
  },
  desc: {
    marginTop: 2,
    marginBottom: 0,
    marginInline: 0,
    fontSize: {
      default: "0.78125rem",
      [mq.phone]: "0.875rem",
    },
    fontWeight: 500,
    letterSpacing: "-0.01em",
    color: vlak.gray,
  },
  meta: {
    fontSize: {
      default: "0.75rem",
      [mq.phone]: "0.875rem",
    },
    fontWeight: 500,
    letterSpacing: "-0.01em",
    color: vlak.gray,
    flexShrink: 0,
  },
});

/** A flush row. Title occupies the cell; meta trails. */
export const Item = React.forwardRef<HTMLDivElement, ItemProps>(function Item(
  { title, description, meta, className, style, ...props },
  ref,
) {
  const sx = rs(["rs-item", className], styles.item);
  const heading = rs(["rs-item-title"], styles.title);
  const note = rs(["rs-item-desc"], styles.desc);
  const trail = rs(["rs-item-meta"], styles.meta);
  return (
    <div ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }}>
      <div>
        <p className={heading.className} style={heading.style}>
          {title}
        </p>
        {description != null && (
          <p className={note.className} style={note.style}>
            {description}
          </p>
        )}
      </div>
      {meta != null && (
        <span className={trail.className} style={trail.style}>
          {meta}
        </span>
      )}
    </div>
  );
});
