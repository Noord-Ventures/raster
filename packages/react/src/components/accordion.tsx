import * as React from "react";
import { cx } from "../cx";
import { Icon } from "./icon";

const AccordionContext = React.createContext<string | undefined>(undefined);

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** One item open at a time, via the platform's own `name` grouping. */
  exclusive?: boolean;
}

/** Native <details> rows on hairlines. */
export function Accordion({ exclusive, className, children, ...props }: AccordionProps) {
  const group = React.useId();
  return (
    <div className={cx("rs-acc", className)} {...props}>
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

export function AccordionItem({ title, defaultOpen, className, children, ...props }: AccordionItemProps) {
  const group = React.useContext(AccordionContext);
  return (
    <details className={cx("rs-acc-item", className)} name={group} open={defaultOpen || undefined} {...props}>
      <summary>
        {title}
        <Icon name="chevron-right" rotate={90} className="rs-acc-chevron" />
      </summary>
      <div className="rs-acc-body">{children}</div>
    </details>
  );
}
