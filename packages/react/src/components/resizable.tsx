import * as React from "react";
import { cx } from "../cx";

export interface SplitProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Starting share of the first pane, in percent. */
  initial?: number;
  min?: number;
  max?: number;
  children: [React.ReactNode, React.ReactNode];
}

/** Two panes on a draggable hairline. Arrow keys work. */
export function Split({ initial = 50, min = 20, max = 80, className, children, ...props }: SplitProps) {
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

  return (
    <div ref={rootRef} className={cx("rs-split", className)} {...props}>
      <div className="rs-split-pane" style={{ width: `${share}%` }}>
        {children[0]}
      </div>
      <button
        type="button"
        className="rs-split-handle"
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
      <div className="rs-split-pane" style={{ width: `${100 - share}%` }}>
        {children[1]}
      </div>
    </div>
  );
}
