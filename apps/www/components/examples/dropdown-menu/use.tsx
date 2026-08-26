import { DropdownMenu } from "@noorddev/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="dropdown-menu">
      <h3 className="rs-use-type">File</h3>
      <div className="rs-use-body">
        <DropdownMenu
          label="Export"
          items={[
            { label: "PDF", onSelect: () => {} },
            { label: "SVG", onSelect: () => {} },
          ]}
        />
      </div>
    </article>
  );
}
