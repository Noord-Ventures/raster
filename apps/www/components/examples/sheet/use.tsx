"use client";

import * as React from "react";
import { Button, Sheet, SheetBody, SheetTitle } from "@noorddev/vlak-react";
import { UseField } from "../use-frame";

export function Use() {
  const [open, setOpen] = React.useState(false);
  return (
    <UseField name="sheet">
      <h3 className="rs-use-type">Side</h3>
      <div className="rs-use-body">
        <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>Open notes</Button>
        <Sheet open={open} onClose={() => setOpen(false)} closeLabel="Close">
          <SheetTitle>Notes</SheetTitle>
          <SheetBody>A panel from the edge. Escape closes it.</SheetBody>
        </Sheet>
      </div>
    </UseField>
  );
}
