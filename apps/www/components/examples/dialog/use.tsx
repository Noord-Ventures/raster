"use client";

import * as React from "react";
import { Button, Dialog, DialogActions, DialogBody, DialogTitle } from "@noordvc/raster-react";

export function Use() {
  const [open, setOpen] = React.useState(false);
  return (
    <article className="rs-use" data-use="dialog">
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
    </article>
  );
}
