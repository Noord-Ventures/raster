import { Pagination } from "@noorddev/raster-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="pagination">
      <h3 className="rs-use-type">Leaf</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">The catalog</p>
          <Pagination page={2} count={8} />
        </div>
      </div>
    </UseField>
  );
}
