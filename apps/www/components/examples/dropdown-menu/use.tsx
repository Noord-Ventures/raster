import { DropdownMenu } from "@noorddev/vlak-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="dropdown-menu">
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
    </UseField>
  );
}
