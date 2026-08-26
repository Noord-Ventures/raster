import { Pagination } from "@noordvc/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="pagination">
      <h3 className="rs-use-type">Leaf</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">The catalog</p>
          <Pagination page={2} count={8} />
        </div>
      </div>
    </article>
  );
}
