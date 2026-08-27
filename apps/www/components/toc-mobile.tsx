"use client";

import * as React from "react";

/**
 * Phone contents picker. Desktop rails stay in docs-nav / interfaces nav.
 * 44pt trigger, 44pt rows, paper + hairline, no radius, no dim.
 */
export function MobileToc({
  label,
  children,
  inset,
}: {
  label: string;
  children: React.ReactNode;
  inset?: boolean;
}) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav className={`toc-mobile${inset ? " toc-mobile-inset" : ""}`} aria-label={label}>
      <button
        type="button"
        className="toc-mobile-trigger"
        aria-expanded={open}
        aria-controls="tocMobileSheet"
        onClick={() => setOpen((value) => !value)}
      >
        <span>{label}</span>
        <span className="toc-mobile-mark" aria-hidden="true">
          {open ? "–" : "+"}
        </span>
      </button>
      {open ? (
        <button
          type="button"
          className="toc-mobile-dismiss"
          aria-label="Close contents"
          onClick={() => setOpen(false)}
        />
      ) : null}
      <div id="tocMobileSheet" className="toc-mobile-sheet" data-open={open} hidden={!open}>
        {children}
      </div>
    </nav>
  );
}
