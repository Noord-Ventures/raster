import { ContextMenu } from "@noordvc/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="context-menu">
      <h3 className="rs-use-type">Hold</h3>
      <div className="rs-use-body">
        <ContextMenu
          items={[
            { label: "Duplicate", onSelect: () => {} },
            { label: "Remove", onSelect: () => {} },
          ]}
        >
          <p className="rs-use-copy">Right-click the sheet.</p>
        </ContextMenu>
      </div>
    </article>
  );
}
