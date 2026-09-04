"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";

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

const styles = stylex.create({
  list: {
    display: "flex",
    alignItems: {
      default: "baseline",
      [mq.phone]: "stretch",
    },
    gap: {
      default: 22,
      [mq.phone]: 0,
    },
    width: {
      default: null,
      [mq.phone]: "100%",
    },
    maxWidth: {
      default: 360,
      [mq.phone]: "none",
    },
    borderWidth: 0,
    borderStyle: "none",
    borderBottomWidth: {
      default: 0,
      [mq.phone]: raster.hairline,
    },
    borderBottomStyle: {
      default: "none",
      [mq.phone]: "solid",
    },
    borderBottomColor: {
      default: "transparent",
      [mq.phone]: raster.divider,
    },
    boxShadow: "none",
    backgroundColor: "transparent",
  },
  tab: {
    appearance: "none",
    boxSizing: "border-box",
    flexGrow: {
      default: null,
      [mq.phone]: 1,
    },
    flexShrink: {
      default: null,
      [mq.phone]: 1,
    },
    flexBasis: {
      default: null,
      [mq.phone]: 0,
    },
    display: {
      default: null,
      [mq.phone]: "inline-flex",
    },
    alignItems: {
      default: null,
      [mq.phone]: "center",
    },
    justifyContent: {
      default: null,
      [mq.phone]: "center",
    },
    minHeight: {
      default: null,
      [mq.phone]: raster.hit,
    },
    paddingBlock: {
      default: 8,
      [mq.phone]: 0,
    },
    paddingInline: {
      default: 0,
      [mq.phone]: 8,
    },
    fontSize: {
      default: 14,
      [mq.phone]: raster.controlFs,
    },
    fontFamily: "inherit",
    fontWeight: 400,
    color: raster.gray,
    letterSpacing: "-0.01em",
    textDecoration: "none",
    textAlign: {
      default: "left",
      [mq.phone]: "center",
    },
    backgroundColor: "transparent",
    backgroundImage: "none",
    boxShadow: "none",
    borderWidth: 0,
    borderStyle: "none",
    borderRadius: 0,
    cursor: "pointer",
  },
  active: {
    color: raster.ink,
    fontWeight: 600,
    borderWidth: 0,
    borderStyle: "none",
    boxShadow: "inset 0 -1px 0",
  },
});

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

export function TabList({ className, style, onKeyDown, ...props }: React.HTMLAttributes<HTMLDivElement>) {
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
  const sx = rs(["rs-tabs", className], styles.list);
  return (
    <div
      role="tablist"
      onKeyDown={handleKeyDown}
      {...props}
      className={sx.className}
      style={{ ...sx.style, ...style }}
    />
  );
}

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export function Tab({ value, className, style, onClick, ...props }: TabProps) {
  const ctx = useTabsContext("Tab");
  const selected = ctx.value === value;
  const sx = rs(["rs-tab", selected && "rs-tab-active", className], styles.tab, selected && styles.active);
  return (
    <button
      type="button"
      role="tab"
      id={`${ctx.idBase}-tab-${value}`}
      aria-selected={selected}
      aria-controls={`${ctx.idBase}-panel-${value}`}
      tabIndex={selected ? 0 : -1}
      onClick={(e) => {
        ctx.setValue(value);
        onClick?.(e);
      }}
      {...props}
      className={sx.className}
      style={{ ...sx.style, ...style }}
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
