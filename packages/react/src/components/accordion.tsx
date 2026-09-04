"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { vlak, mq } from "../tokens.stylex";
import { rs } from "../rs";
import { Icon } from "./icon";

const AccordionContext = React.createContext<string | undefined>(undefined);

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** One item open at a time, via the platform's own `name` grouping. */
  exclusive?: boolean;
}

const styles = stylex.create({
  acc: {
    borderTopWidth: vlak.hairline,
    borderTopStyle: "solid",
    borderTopColor: vlak.divider,
  },
  item: {
    borderBottomWidth: vlak.hairline,
    borderBottomStyle: "solid",
    borderBottomColor: vlak.divider,
  },
  summary: {
    listStyle: "none",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "0.75rem",
    paddingBlock: "0.875rem",
    paddingInline: 0,
    minHeight: {
      default: "1.5rem",
      [mq.phone]: vlak.hit,
    },
    fontSize: {
      default: "0.90625rem",
      [mq.phone]: "1.0625rem",
    },
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: vlak.ink,
    "::-webkit-details-marker": {
      display: "none",
    },
    outlineWidth: {
      default: null,
      ":focus-visible": 2,
    },
    outlineStyle: {
      default: null,
      ":focus-visible": "solid",
    },
    outlineColor: {
      default: null,
      ":focus-visible": vlak.ink,
    },
    outlineOffset: {
      default: null,
      ":focus-visible": 2,
    },
  },
  chevron: {
    flexShrink: 0,
    color: vlak.gray,
    transition: {
      default: `transform ${vlak.duration} ${vlak.ease}`,
      [mq.reduce]: "none",
    },
  },
  chevronOpen: {
    transform: "rotate(180deg)",
  },
  body: {
    paddingTop: 0,
    paddingInlineEnd: 0,
    paddingBottom: {
      default: "1rem",
      [mq.phone]: "1.25rem",
    },
    paddingInlineStart: 0,
    fontSize: {
      default: "0.84375rem",
      [mq.phone]: "1rem",
    },
    lineHeight: 1.45,
    color: vlak.gray,
  },
});

/** Native <details> rows on hairlines. */
export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  { exclusive, className, style, children, ...props },
  ref,
) {
  const group = React.useId();
  const sx = rs(["rs-acc", className], styles.acc);
  return (
    <div ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }}>
      <AccordionContext.Provider value={exclusive ? group : undefined}>
        {children}
      </AccordionContext.Provider>
    </div>
  );
});

export interface AccordionItemProps
  extends Omit<React.DetailsHTMLAttributes<HTMLDetailsElement>, "title"> {
  title: React.ReactNode;
  defaultOpen?: boolean;
}

export const AccordionItem = React.forwardRef<HTMLDetailsElement, AccordionItemProps>(function AccordionItem({
  title,
  defaultOpen,
  className,
  style,
  children,
  onToggle,
  open,
  ...props
}, ref) {
  const group = React.useContext(AccordionContext);
  const [innerOpen, setInnerOpen] = React.useState(!!defaultOpen);
  const isOpen = open ?? innerOpen;
  const item = rs(["rs-acc-item", className], styles.item);
  const summary = rs(["rs-acc-summary"], styles.summary);
  const chevron = rs(["rs-acc-chevron", isOpen && "rs-acc-chevron-open"], styles.chevron, isOpen && styles.chevronOpen);
  const body = rs(["rs-acc-body"], styles.body);
  return (
    <details
      ref={ref}
      name={group}
      open={open ?? (defaultOpen || undefined)}
      onToggle={(e) => {
        setInnerOpen(e.currentTarget.open);
        onToggle?.(e);
      }}
      {...props}
      className={item.className}
      style={{ ...item.style, ...style }}
    >
      <summary className={summary.className} style={summary.style}>
        {title}
        <Icon name="chevron-right" rotate={90} className={chevron.className} style={chevron.style} />
      </summary>
      <div className={body.className} style={body.style}>
        {children}
      </div>
    </details>
  );
});
