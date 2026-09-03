import { UseField } from "../use-frame";
export function Use() {
  return (
    <UseField name="crumb-bar">
      <h3 className="rs-use-type">Bar</h3>
      <div className="rs-use-body">
        <nav className="rs-crumb-bar rs-crumb-bar-scrolled" style={{ position: "relative" }} aria-label="Breadcrumbs">
          <div className="rs-crumb-bar-inner" style={{ margin: 0, paddingLeft: 0 }}>
            <p className="rs-crumbs">
              <span>Studio</span>
              <span className="rs-crumbs-sep">/</span>
              <span className="rs-crumbs-here">Raster</span>
            </p>
          </div>
        </nav>
        <p className="rs-use-copy">Transparent at rest. On scroll it gains paper and a hairline.</p>
      </div>
    </UseField>
  );
}
