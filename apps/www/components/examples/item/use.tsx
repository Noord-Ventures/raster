import { Item } from "@noorddev/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="item">
      <h3 className="rs-use-type">Town</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <Item title="Alkmaar" description="The studio city." meta="NL" />
          <Item title="Delft" description="The grid city." meta="NL" />
        </div>
      </div>
    </article>
  );
}
