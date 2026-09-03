import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, phone } from "../tokens.stylex";
import { rs } from "../rs";
import { Icon } from "./icon";

const AccordionContext = React.createContext<string | undefined>(undefined);

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** One item open at a time, via the platform's own `name` grouping. */
  exclusive?: boolean;
}

const styles = stylex.create({
  acc: {
    borderTopWidth: raster.hairline,
    borderTopStyle: "solid",
    borderTopColor: raster.divider,
  },
  item: {
    borderBottomWidth: raster.hairline,
    borderBottomStyle: "solid",
    borderBottomColor: raster.divider,
  },
  summary: {
    listStyle: "none",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    paddingBlock: 14,
    paddingInline: 0,
    minHeight: {
      default: null,
      ["@media (max-width: 640px)"]: raster.hit,
    },
    fontSize: {
      default: 14.5,
      ["@media (max-width: 640px)"]: 17,
    },
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: raster.ink,
    "::-webkit-details-marker": {
      display: "none",
    },
  },
  chevron: {
    flexShrink: 0,
    color: raster.gray,
    transition: `transform ${raster.duration} ${raster.ease}`,
  },
  chevronOpen: {
    transform: "rotate(180deg)",
  },
  body: {
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: {
      default: 16,
      ["@media (max-width: 640px)"]: 20,
    },
    paddingLeft: 0,
    fontSize: {
      default: 13.5,
      ["@media (max-width: 640px)"]: 16,
    },
    lineHeight: 1.6,
    color: raster.gray,
  },
});

/** Native <details> rows on hairlines. */
export function Accordion({ exclusive, className, style, children, ...props }: AccordionProps) {
  const group = React.useId();
  const sx = rs(["rs-acc", className], styles.acc);
  return (
    <div {...props} className={sx.className} style={{ ...sx.style, ...style }}>
      <AccordionContext.Provider value={exclusive ? group : undefined}>
        {children}
      </AccordionContext.Provider>
    </div>
  );
}

export interface AccordionItemProps
  extends Omit<React.DetailsHTMLAttributes<HTMLDetailsElement>, "title"> {
  title: React.ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({
  title,
  defaultOpen,
  className,
  style,
  children,
  onToggle,
  open,
  ...props
}: AccordionItemProps) {
  const group = React.useContext(AccordionContext);
  const [innerOpen, setInnerOpen] = React.useState(!!defaultOpen);
  const isOpen = open ?? innerOpen;
  const item = rs(["rs-acc-item", className], styles.item);
  const summary = rs([], styles.summary);
  const chevron = rs(["rs-acc-chevron"], styles.chevron, isOpen && styles.chevronOpen);
  const body = rs(["rs-acc-body"], styles.body);
  return (
    <details
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
}
