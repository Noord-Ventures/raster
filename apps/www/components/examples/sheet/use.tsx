"use client";

import * as React from "react";
import { Button, Sheet, SheetBody, SheetTitle } from "@noorddev/raster-react";

export function Use() {
  const [open, setOpen] = React.useState(false);
  return (
    <article className="rs-use" data-use="sheet">
      <h3 className="rs-use-type">Side</h3>
      <div className="rs-use-body">
        <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>Open notes</Button>
        <Sheet open={open} onClose={() => setOpen(false)}>
          <SheetTitle>Notes</SheetTitle>
          <SheetBody>A panel from the edge. Escape closes it.</SheetBody>
        </Sheet>
      </div>
    </article>
  );
}
