"use client";

import * as React from "react";
import { Button, Drawer, DrawerBody, DrawerTitle } from "@noorddev/raster-react";

export function Use() {
  const [open, setOpen] = React.useState(false);
  return (
    <article className="rs-use" data-use="drawer">
      <h3 className="rs-use-type">Up</h3>
      <div className="rs-use-body">
        <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>Open the tray</Button>
        <Drawer open={open} onClose={() => setOpen(false)}>
          <DrawerTitle>Notes</DrawerTitle>
          <DrawerBody>A bottom panel. Escape closes it.</DrawerBody>
        </Drawer>
      </div>
    </article>
  );
}
