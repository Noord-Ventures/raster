"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";


export interface ToastOptions {
  description?: React.ReactNode;
}

interface ToastItem {
  id: number;
  title: React.ReactNode;
  description?: React.ReactNode;
}

let nextId = 1;
const listeners = new Set<(item: ToastItem) => void>();

/** Fire a toast from anywhere; a mounted <Toaster /> renders it. */
export function toast(title: React.ReactNode, options?: ToastOptions): void {
  const item: ToastItem = { id: nextId++, title, description: options?.description };
  listeners.forEach((listener) => listener(item));
}

export interface ToasterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** How long a toast stays, in milliseconds. */
  duration?: number;
}

const toastIn = stylex.keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const styles = stylex.create({
  stack: {
    position: "fixed",
    bottom: {
      default: 20,
      [mq.phone]: 0,
    },
    right: {
      default: 20,
      [mq.phone]: 0,
    },
    left: {
      default: null,
      [mq.phone]: 0,
    },
    zIndex: 300,
    display: "flex",
    flexDirection: "column",
    alignItems: {
      default: "flex-end",
      [mq.phone]: "stretch",
    },
    gap: {
      default: 8,
      [mq.phone]: 0,
    },
  },
  toast: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: raster.paper,
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: raster.divider,
    borderRadius: {
      default: raster.radius,
      [mq.phone]: 0,
    },
    boxShadow: {
      default: "0 8px 24px rgba(0,0,0,0.06)",
      [mq.phone]: "none",
    },
    paddingTop: {
      default: 10,
      [mq.phone]: 16,
    },
    paddingInline: {
      default: 14,
      [mq.phone]: 20,
    },
    paddingBottom: {
      default: 10,
      [mq.phone]: "calc(16px + env(safe-area-inset-bottom, 0px))",
    },
    maxWidth: {
      default: 340,
      [mq.phone]: "none",
    },
    width: {
      default: null,
      [mq.phone]: "100%",
    },
    animationName: {
      default: toastIn,
      [mq.reduce]: "none",
    },
    animationDuration: raster.durationConfirm,
    animationTimingFunction: raster.ease,
  },
  title: {
    display: "block",
    fontSize: {
      default: 13,
      [mq.phone]: 16,
    },
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: raster.ink,
  },
  body: {
    fontSize: {
      default: 12.5,
      [mq.phone]: 15,
    },
    lineHeight: 1.5,
    letterSpacing: "-0.01em",
    color: raster.gray,
    marginTop: {
      default: 1,
      [mq.phone]: 4,
    },
    marginBottom: 0,
    marginInline: 0,
  },
});

export function Toaster({ duration = 4000, className, style, ...props }: ToasterProps) {
  const [items, setItems] = React.useState<ToastItem[]>([]);

  React.useEffect(() => {
    const add = (item: ToastItem) => {
      setItems((current) => [...current, item]);
      setTimeout(() => {
        setItems((current) => current.filter((i) => i.id !== item.id));
      }, duration);
    };
    listeners.add(add);
    return () => {
      listeners.delete(add);
    };
  }, [duration]);

  const stack = rs(["rs-toasts", className], styles.stack);
  return (
    <div {...props} className={stack.className} style={{ ...stack.style, ...style }} role="status" aria-live="polite">
      {items.map((item) => {
        const card = rs(["rs-toast"], styles.toast);
        const heading = rs(["rs-toast-title"], styles.title);
        const body = rs(["rs-toast-body"], styles.body);
        return (
          <div key={item.id} className={card.className} style={card.style}>
            <div>
              <span className={heading.className} style={heading.style}>
                {item.title}
              </span>
              {item.description != null && (
                <p className={body.className} style={body.style}>
                  {item.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
