import { Card, CardBody, CardLabel, CardTitle } from "@noorddev/raster-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="card">
      <h3 className="rs-use-type">Case</h3>
      <div className="rs-use-body">
        <Card>
          <CardLabel>Studio note</CardLabel>
          <CardTitle>A quieter interface</CardTitle>
          <CardBody>Emphasis from weight and spacing, never from a hue.</CardBody>
        </Card>
      </div>
    </UseField>
  );
}
