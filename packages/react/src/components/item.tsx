import * as React from "react";
import { cx } from "../cx";

export interface ItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  meta?: React.ReactNode;
}

/** A flush row. Title occupies the cell; meta trails. */
export function Item({ title, description, meta, className, ...props }: ItemProps) {
  return (
    <div className={cx("rs-item", className)} {...props}>
      <div>
        <p className="rs-item-title">{title}</p>
        {description != null && <p className="rs-item-desc">{description}</p>}
      </div>
      {meta != null && <span className="rs-item-meta">{meta}</span>}
    </div>
  );
}
