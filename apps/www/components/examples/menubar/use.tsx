import { Menubar } from "@noordvc/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="menubar">
      <h3 className="rs-use-type">Menu</h3>
      <div className="rs-use-body">
        <Menubar
          menus={[
            { label: "File", items: [{ label: "Export", onSelect: () => {} }] },
            { label: "Edit", items: [{ label: "Undo", onSelect: () => {} }] },
          ]}
        />
      </div>
    </article>
  );
}
