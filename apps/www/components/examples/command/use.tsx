"use client";

import * as React from "react";
import { Button, CommandDialog } from "@noorddev/vlak-react";
import { UseField } from "../use-frame";

export function Use() {
  const [open, setOpen] = React.useState(false);
  return (
    <UseField name="command">
      <h3 className="rs-use-type">Jump</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">⌘K</p>
          <p className="rs-use-copy">Jump the catalog without leaving the sheet.</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>Open command</Button>
        <CommandDialog
          open={open}
          onClose={() => setOpen(false)}
          groups={[
            {
              items: [
                { label: "Overview", onSelect: () => setOpen(false) },
                { label: "Components", onSelect: () => setOpen(false) },
              ],
            },
          ]}
        />
      </div>
    </UseField>
  );
}
