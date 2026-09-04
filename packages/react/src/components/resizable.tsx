"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";

export interface SplitProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Starting share of the first pane, in percent. */
  initial?: number;
  min?: number;
  max?: number;
  /** Accessible name of the handle. */
  handleLabel?: string;
  children: [React.ReactNode, React.ReactNode];
}

const styles = stylex.create({
  split: {
    display: "flex",
    flexDirection: {
      default: "row",
      [mq.phone]: "column",
    },
    width: "100%",
  },
  pane: {
    minWidth: 0,
    overflow: "hidden",
  },
  handle: {
    flexShrink: 0,
    width: {
      default: 9,
      [mq.phone]: "auto",
    },
    height: {
      default: null,
      [mq.phone]: raster.hit,
    },
    marginTop: {
      default: 0,
      [mq.phone]: -4,
    },
    marginBottom: {
      default: 0,
      [mq.phone]: -4,
    },
    marginInlineStart: {
      default: -4,
      [mq.phone]: 0,
    },
    marginInlineEnd: {
      default: -4,
      [mq.phone]: 0,
    },
    position: "relative",
    zIndex: raster.zRaised,
    cursor: {
      default: "col-resize",
      [mq.phone]: "row-resize",
    },
    backgroundColor: "transparent",
    borderWidth: 0,
    borderStyle: "none",
    padding: 0,
    touchAction: "none",
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
      ":focus-visible": raster.ink,
    },
    outlineOffset: {
      default: null,
      ":focus-visible": 2,
    },
    "::after": {
      content: '""',
      position: "absolute",
      insetInlineStart: {
        default: 4,
        [mq.phone]: 0,
      },
      insetInlineEnd: {
        default: null,
        [mq.phone]: 0,
      },
      top: {
        default: 0,
        [mq.phone]: "50%",
      },
      bottom: {
        default: 0,
        [mq.phone]: "auto",
      },
      width: {
        default: 1,
        [mq.phone]: "auto",
      },
      height: {
        default: null,
        [mq.phone]: 1,
      },
      backgroundColor: {
        default: raster.controlBorder,
        [mq.forcedColors]: "CanvasText",
      },
      forcedColorAdjust: "none",
      transition: {
        default: `background-color ${raster.durationSnap} ${raster.ease}`,
        [mq.reduce]: "none",
      },
    },
    ":hover::after": {
      backgroundColor: {
        default: raster.ink,
        [mq.forcedColors]: "Highlight",
      },
    },
    ":focus-visible::after": {
      backgroundColor: {
        default: raster.ink,
        [mq.forcedColors]: "Highlight",
      },
    },
  },
});

const STACK_QUERY = "(max-width: 640px)";
const noop = () => {};

/** True once the split stacks (the phone recut). False on the server and where matchMedia is missing. */
function useStacked(): boolean {
  const subscribe = React.useCallback((onChange: () => void) => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return noop;
    const mql = window.matchMedia(STACK_QUERY);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  const read = () =>
    typeof window !== "undefined" && typeof window.matchMedia === "function"
      ? window.matchMedia(STACK_QUERY).matches
      : false;
  return React.useSyncExternalStore(subscribe, read, () => false);
}

/** Two panes on a draggable hairline. Arrows step, Home/End jump; the axis follows the layout. */
export function Split({
  initial = 50,
  min = 20,
  max = 80,
  handleLabel = "Resize panes",
  className,
  style,
  children,
  ...props
}: SplitProps) {
  const [share, setShare] = React.useState(initial);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const stacked = useStacked();
  const clamp = (v: number) => Math.min(max, Math.max(min, v));

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect) return;
    const move = (ev: PointerEvent) =>
      setShare(
        clamp(
          stacked
            ? ((ev.clientY - rect.top) / rect.height) * 100
            : ((ev.clientX - rect.left) / rect.width) * 100,
        ),
      );
    const up = () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up);
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", up);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const step = e.shiftKey ? 10 : 2;
    let next: number | null = null;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = share - step;
    else if (e.key === "ArrowRight" || e.key === "ArrowDown") next = share + step;
    else if (e.key === "Home") next = min;
    else if (e.key === "End") next = max;
    if (next === null) return;
    e.preventDefault();
    setShare(clamp(next));
  };

  const root = rs(["rs-split", className], styles.split);
  const pane = rs(["rs-split-pane"], styles.pane);
  const handle = rs(["rs-split-handle"], styles.handle);
  const size = (pct: number): React.CSSProperties =>
    stacked ? { height: `${pct}%`, width: "auto" } : { width: `${pct}%` };

  return (
    <div ref={rootRef} {...props} className={root.className} style={{ ...root.style, ...style }}>
      <div className={pane.className} style={{ ...pane.style, ...size(share) }}>
        {children[0]}
      </div>
      <button
        type="button"
        className={handle.className}
        style={handle.style}
        role="separator"
        aria-orientation={stacked ? "horizontal" : "vertical"}
        aria-valuenow={Math.round(share)}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={handleLabel}
        onPointerDown={onPointerDown}
        onKeyDown={onKeyDown}
      />
      <div className={pane.className} style={{ ...pane.style, ...size(100 - share) }}>
        {children[1]}
      </div>
    </div>
  );
}
