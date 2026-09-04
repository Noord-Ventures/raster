import { Pagination } from "@noorddev/vlak-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="pagination">
      <h3 className="rs-use-type">Leaf</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">The catalog</p>
          <Pagination page={2} count={8} aria-label="Catalogue pages" />
        </div>
      </div>
    </UseField>
  );
}
