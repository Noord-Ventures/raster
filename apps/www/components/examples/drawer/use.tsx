"use client";

import * as React from "react";
import { Button, Drawer, DrawerBody, DrawerTitle } from "@noorddev/vlak-react";
import { UseField } from "../use-frame";

export function Use() {
  const [open, setOpen] = React.useState(false);
  return (
    <UseField name="drawer">
      <h3 className="rs-use-type">Up</h3>
      <div className="rs-use-body">
        <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>Open the tray</Button>
        <Drawer open={open} onClose={() => setOpen(false)} lightDismiss closeLabel="Close">
          <DrawerTitle>Notes</DrawerTitle>
          <DrawerBody>A bottom panel. Escape closes it.</DrawerBody>
        </Drawer>
      </div>
    </UseField>
  );
}
