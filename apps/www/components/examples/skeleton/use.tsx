import { Skeleton } from "@noordvc/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="skeleton">
      <h3 className="rs-use-type">Wait</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">The sheet is coming</p>
          <p className="rs-use-copy">Ink occupies the cell before the words arrive.</p>
          <Skeleton width="60%" />
          <Skeleton width="40%" />
        </div>
      </div>
    </article>
  );
}
