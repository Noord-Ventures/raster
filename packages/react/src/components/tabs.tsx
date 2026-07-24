import * as React from "react";
import { cx } from "../cx";

interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
  idBase: string;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext(component: string): TabsContextValue {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error(`<${component}> must be used inside <Tabs>`);
  return ctx;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function Tabs({ value, defaultValue, onValueChange, children, ...props }: TabsProps) {
  const idBase = React.useId();
  const [inner, setInner] = React.useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const current = isControlled ? value : inner;
  const setValue = (next: string) => {
    if (!isControlled) setInner(next);
    onValueChange?.(next);
  };
  return (
    <div {...props}>
      <TabsContext.Provider value={{ value: current, setValue, idBase }}>
        {children}
      </TabsContext.Provider>
    </div>
  );
}

export function TabList({ className, onKeyDown, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const tabs = Array.from(
      e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)'),
    );
    const index = tabs.indexOf(document.activeElement as HTMLButtonElement);
    if (index === -1) return;
    e.preventDefault();
    const next = e.key === "ArrowRight" ? (index + 1) % tabs.length : (index - 1 + tabs.length) % tabs.length;
    tabs[next]?.focus();
    tabs[next]?.click();
  };
  return (
    <div role="tablist" className={cx("rs-tabs", className)} onKeyDown={handleKeyDown} {...props} />
  );
}

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export function Tab({ value, className, onClick, ...props }: TabProps) {
  const ctx = useTabsContext("Tab");
  const selected = ctx.value === value;
  return (
    <button
      type="button"
      role="tab"
      id={`${ctx.idBase}-tab-${value}`}
      aria-selected={selected}
      aria-controls={`${ctx.idBase}-panel-${value}`}
      tabIndex={selected ? 0 : -1}
      className={cx("rs-tab", selected && "rs-tab-active", className)}
      onClick={(e) => {
        ctx.setValue(value);
        onClick?.(e);
      }}
      {...props}
    />
  );
}

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabPanel({ value, ...props }: TabPanelProps) {
  const ctx = useTabsContext("TabPanel");
  const selected = ctx.value === value;
  return (
    <div
      role="tabpanel"
      id={`${ctx.idBase}-panel-${value}`}
      aria-labelledby={`${ctx.idBase}-tab-${value}`}
      hidden={!selected}
      {...props}
    />
  );
}
