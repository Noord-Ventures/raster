import { Icon } from "@noorddev/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="icons">
      <h3 className="rs-use-type">Go</h3>
      <div className="rs-use-body">
        <div className="rs-icons rs-use-actions">
          <Icon name="copy" size={12} />
          <Icon name="copy" size={16} />
          <p className="rs-use-copy">1px hairline. Current color. Square module.</p>
        </div>
      </div>
    </article>
  );
}
