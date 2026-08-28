import { Card, CardBody, CardInner, CardLabel, CardTitle } from "@noorddev/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="card">
      <h3 className="rs-use-type">Case</h3>
      <div className="rs-use-body">
        <Card>
          <CardLabel>Studio note</CardLabel>
          <CardTitle>A quieter interface</CardTitle>
          <CardInner>
            <CardBody>Emphasis from weight and spacing, never from a hue.</CardBody>
          </CardInner>
        </Card>
      </div>
    </article>
  );
}
