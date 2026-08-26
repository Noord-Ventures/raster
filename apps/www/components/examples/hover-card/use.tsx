import { HoverCard } from "@noordvc/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="hover-card">
      <h3 className="rs-use-type">Who</h3>
      <div className="rs-use-body">
        <p className="rs-use-copy">
          From{" "}
          <HoverCard trigger={<span className="rs-link">@noord</span>}>
            Noord ships Raster. Host: raster.noord.dev.
          </HoverCard>
          .
        </p>
      </div>
    </article>
  );
}
