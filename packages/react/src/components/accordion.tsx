import * as React from "react";
import { cx } from "../cx";

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
        <svg className="rs-acc-chevron" viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <div className="rs-acc-body">{children}</div>
    </details>
  );
}
