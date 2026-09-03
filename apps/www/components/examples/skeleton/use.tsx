import { Skeleton } from "@noorddev/raster-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="skeleton">
      <h3 className="rs-use-type">Wait</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">The sheet is coming</p>
          <p className="rs-use-copy">Ink occupies the cell before the words arrive.</p>
          <Skeleton width="60%" />
          <Skeleton width="40%" />
        </div>
      </div>
    </UseField>
  );
}
