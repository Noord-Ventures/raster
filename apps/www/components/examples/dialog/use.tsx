"use client";

import * as React from "react";
import { Button, Dialog, DialogActions, DialogBody, DialogTitle } from "@noorddev/raster-react";
import { UseField } from "../use-frame";

export function Use() {
  const [open, setOpen] = React.useState(false);
  return (
    <UseField name="dialog">
      <h3 className="rs-use-type">Pull</h3>
      <div className="rs-use-body">
        <p className="rs-use-copy">Remove a sheet from the run. The question sits on paper.</p>
        <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>Remove item…</Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Remove this item?</DialogTitle>
          <DialogBody>This can&rsquo;t be undone.</DialogBody>
          <DialogActions>
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Keep it</Button>
            <Button size="sm" onClick={() => setOpen(false)}>Remove</Button>
          </DialogActions>
        </Dialog>
      </div>
    </UseField>
  );
}
