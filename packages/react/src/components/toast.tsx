import * as React from "react";
import { cx } from "../cx";

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

export function Toaster({ duration = 4000, className, ...props }: ToasterProps) {
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

  return (
    <div className={cx("rs-toasts", className)} role="status" aria-live="polite" {...props}>
      {items.map((item) => (
        <div key={item.id} className="rs-toast">
          <div>
            <span className="rs-toast-title">{item.title}</span>
            {item.description != null && <p className="rs-toast-body">{item.description}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
