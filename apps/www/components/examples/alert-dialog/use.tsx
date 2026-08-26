"use client";

import * as React from "react";
import { AlertDialog, AlertDialogActions, AlertDialogBody, AlertDialogTitle, Button } from "@noordvc/raster-react";

export function Use() {
  const [open, setOpen] = React.useState(false);
  return (
    <article className="rs-use" data-use="alert-dialog">
      <h3 className="rs-use-type">Kill</h3>
      <div className="rs-use-body">
        <p className="rs-use-copy">Pull a sheet from the run. The question needs an answer.</p>
        <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>Delete sheet…</Button>
        <AlertDialog open={open} onClose={() => setOpen(false)}>
          <AlertDialogTitle>Delete this sheet?</AlertDialogTitle>
          <AlertDialogBody>The plate goes with it.</AlertDialogBody>
          <AlertDialogActions>
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Keep it</Button>
            <Button size="sm" onClick={() => setOpen(false)}>Delete</Button>
          </AlertDialogActions>
        </AlertDialog>
      </div>
    </article>
  );
}
