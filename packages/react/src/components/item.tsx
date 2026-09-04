import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
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
    gap: 16,
    minHeight: {
      default: 48,
      [mq.phone]: raster.hit,
    },
    paddingBlock: {
      default: 10,
      [mq.phone]: 14,
    },
    paddingInline: 0,
    borderBottomWidth: {
      default: raster.hairline,
      ":last-child": 0,
    },
    borderBottomStyle: "solid",
    borderBottomColor: raster.divider,
    borderRadius: 0,
  },
  title: {
    margin: 0,
    fontSize: {
      default: 14,
      [mq.phone]: raster.controlFs,
    },
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: raster.ink,
  },
  desc: {
    marginTop: 2,
    marginBottom: 0,
    marginInline: 0,
    fontSize: {
      default: 12.5,
      [mq.phone]: 14,
    },
    fontWeight: 500,
    letterSpacing: "-0.01em",
    color: raster.gray,
  },
  meta: {
    fontSize: {
      default: 12,
      [mq.phone]: 14,
    },
    fontWeight: 500,
    letterSpacing: "-0.01em",
    color: raster.gray,
    flexShrink: 0,
  },
});

/** A flush row. Title occupies the cell; meta trails. */
export function Item({ title, description, meta, className, style, ...props }: ItemProps) {
  const sx = rs(["rs-item", className], styles.item);
  const heading = rs(["rs-item-title"], styles.title);
  const note = rs(["rs-item-desc"], styles.desc);
  const trail = rs(["rs-item-meta"], styles.meta);
  return (
    <div {...props} className={sx.className} style={{ ...sx.style, ...style }}>
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
}
