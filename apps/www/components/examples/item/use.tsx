import { Item } from "@noorddev/vlak-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="item">
      <h3 className="rs-use-type">Town</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <Item title="Alkmaar" description="The studio city." meta="NL" />
          <Item title="Delft" description="The grid city." meta="NL" />
        </div>
      </div>
    </UseField>
  );
}
