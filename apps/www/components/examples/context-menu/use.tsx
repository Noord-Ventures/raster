import { ContextMenu } from "@noorddev/vlak-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="context-menu">
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
    </UseField>
  );
}
