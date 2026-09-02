import { Icon } from "@noorddev/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="icons">
      <h3 className="rs-use-type">Go</h3>
      <div className="rs-use-body">
        <div className="rs-icons rs-use-actions">
          <Icon name="search" size={12} />
          <Icon name="search" size={16} />
          <Icon name="search" size={24} />
          <Icon name="search" size={16} variant="filled" />
          <Icon name="plus" size={16} />
          <Icon name="plus" size={16} variant="filled" />
          <p className="rs-use-copy">One family. Line and filled. Current color. 12, 16, 24.</p>
        </div>
      </div>
    </article>
  );
}
