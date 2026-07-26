import * as React from "react";
import { cx } from "../cx";

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  "aria-label"?: string;
}

/** Native scroll snap; the buttons nudge. */
export function Carousel({ className, children, "aria-label": ariaLabel = "Carousel", ...props }: CarouselProps) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const nudge = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (track) track.scrollBy({ left: dir * track.clientWidth * 0.8 });
  };
  return (
    <div className={cx("rs-carousel", className)} role="group" aria-label={ariaLabel} {...props}>
      <div ref={trackRef} className="rs-carousel-track" tabIndex={0}>
        {children}
      </div>
      <div className="rs-carousel-nav">
        <button type="button" className="rs-page" aria-label="Previous" onClick={() => nudge(-1)}>
          ‹
        </button>
        <button type="button" className="rs-page" aria-label="Next" onClick={() => nudge(1)}>
          ›
        </button>
      </div>
    </div>
  );
}
