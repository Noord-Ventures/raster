import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, phone } from "../tokens.stylex";
import { rs } from "../rs";

export interface SplitProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Starting share of the first pane, in percent. */
  initial?: number;
  min?: number;
  max?: number;
  children: [React.ReactNode, React.ReactNode];
}

const styles = stylex.create({
  split: {
    display: "flex",
    flexDirection: {
      default: "row",
      ["@media (max-width: 640px)"]: "column",
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
      ["@media (max-width: 640px)"]: "auto",
    },
    height: {
      default: null,
      ["@media (max-width: 640px)"]: raster.hit,
    },
    marginTop: {
      default: 0,
      ["@media (max-width: 640px)"]: -4,
    },
    marginBottom: {
      default: 0,
      ["@media (max-width: 640px)"]: -4,
    },
    marginLeft: {
      default: -4,
      ["@media (max-width: 640px)"]: 0,
    },
    marginRight: {
      default: -4,
      ["@media (max-width: 640px)"]: 0,
    },
    position: "relative",
    zIndex: 5,
    cursor: {
      default: "col-resize",
      ["@media (max-width: 640px)"]: "row-resize",
    },
    backgroundColor: "transparent",
    borderWidth: 0,
    borderStyle: "none",
    padding: 0,
    touchAction: "none",
    outline: {
      default: null,
      ":focus-visible": "none",
    },
    "::after": {
      content: '""',
      position: "absolute",
      left: {
        default: 4,
        ["@media (max-width: 640px)"]: 0,
      },
      right: {
        default: null,
        ["@media (max-width: 640px)"]: 0,
      },
      top: {
        default: 0,
        ["@media (max-width: 640px)"]: "50%",
      },
      bottom: {
        default: 0,
        ["@media (max-width: 640px)"]: "auto",
      },
      width: {
        default: 1,
        ["@media (max-width: 640px)"]: "auto",
      },
      height: {
        default: null,
        ["@media (max-width: 640px)"]: 1,
      },
      backgroundColor: raster.divider,
      transition: `background-color ${raster.durationSnap} ${raster.ease}`,
    },
    ":hover::after": {
      backgroundColor: raster.ink,
    },
    ":focus-visible::after": {
      backgroundColor: raster.ink,
    },
  },
});

/** Two panes on a draggable hairline. Arrow keys work. */
export function Split({ initial = 50, min = 20, max = 80, className, style, children, ...props }: SplitProps) {
  const [share, setShare] = React.useState(initial);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const clamp = (v: number) => Math.min(max, Math.max(min, v));

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect) return;
    const move = (ev: PointerEvent) => setShare(clamp(((ev.clientX - rect.left) / rect.width) * 100));
    const up = () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up);
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", up);
  };

  const root = rs(["rs-split", className], styles.split);
  const pane = rs(["rs-split-pane"], styles.pane);
  const handle = rs(["rs-split-handle"], styles.handle);

  return (
    <div ref={rootRef} {...props} className={root.className} style={{ ...root.style, ...style }}>
      <div className={pane.className} style={{ ...pane.style, width: `${share}%` }}>
        {children[0]}
      </div>
      <button
        type="button"
        className={handle.className}
        style={handle.style}
        role="separator"
        aria-orientation="vertical"
        aria-valuenow={Math.round(share)}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label="Resize panes"
        onPointerDown={onPointerDown}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setShare((s) => clamp(s - 2));
          if (e.key === "ArrowRight") setShare((s) => clamp(s + 2));
        }}
      />
      <div className={pane.className} style={{ ...pane.style, width: `${100 - share}%` }}>
        {children[1]}
      </div>
    </div>
  );
}
