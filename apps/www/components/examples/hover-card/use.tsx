import { HoverCard } from "@noorddev/raster-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="hover-card">
      <h3 className="rs-use-type">Who</h3>
      <div className="rs-use-body">
        <p className="rs-use-copy">
          From{" "}
          <HoverCard trigger={<span className="rs-link">@noord</span>}>
            Noord ships Raster. Door: getraster.com.
          </HoverCard>
          .
        </p>
      </div>
    </UseField>
  );
}
