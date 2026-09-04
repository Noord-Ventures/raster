import { Menubar } from "@noorddev/vlak-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="menubar">
      <h3 className="rs-use-type">Menu</h3>
      <div className="rs-use-body">
        <Menubar
          menus={[
            { label: "File", items: [{ label: "Export", onSelect: () => {} }] },
            { label: "Edit", items: [{ label: "Undo", onSelect: () => {} }] },
          ]}
        />
      </div>
    </UseField>
  );
}
