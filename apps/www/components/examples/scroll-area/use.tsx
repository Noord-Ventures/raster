import { ScrollArea } from "@noorddev/raster-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="scroll-area">
      <h3 className="rs-use-type">List</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">Towns on the sheet</p>
          <p className="rs-use-copy">The list is longer than the cell. Edges feather.</p>
        </div>
        <ScrollArea maxHeight={110} style={{ width: 180 }}>
          {["Alkmaar", "Amsterdam", "Delft", "Haarlem", "Rotterdam", "Utrecht"].map((c) => (
            <p key={c} className="rs-t-body" style={{ padding: "3px 0" }}>{c}</p>
          ))}
        </ScrollArea>
      </div>
    </UseField>
  );
}
