import { Badge } from "@noordvc/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="badge">
      <h3 className="rs-use-type">State</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">Issue 03</p>
          <p className="rs-use-copy">State is a word, not a hue.</p>
        </div>
        <div className="rs-use-actions">
          <Badge>On press</Badge>
          <Badge variant="solid">Printed</Badge>
          <Badge variant="muted">Hold</Badge>
        </div>
      </div>
    </article>
  );
}
