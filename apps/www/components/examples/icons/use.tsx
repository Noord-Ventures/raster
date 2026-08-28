import { Icon } from "@noorddev/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="icons">
      <h3 className="rs-use-type">Go</h3>
      <div className="rs-use-body">
        <div className="rs-icons rs-use-actions">
          <Icon name="search" size={16} />
          <Icon name="plus" size={16} />
          <Icon name="filter" size={16} />
          <Icon name="more" size={16} />
          <p className="rs-use-copy">One family. Current color. Square module.</p>
        </div>
      </div>
    </article>
  );
}
