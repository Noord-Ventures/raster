import { Breadcrumbs } from "@noorddev/raster-react";
import { UseField } from "../use-frame";

/** A masthead trail. One ink line, not a web crumb. */
export function Use() {
  return (
    <UseField name="breadcrumbs">
      <h3 className="rs-use-type">Trail</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <Breadcrumbs
            items={[
              { label: "Studio", href: "/" },
              { label: "Raster", href: "/components" },
              { label: "Issue 03" },
            ]}
          />
          <p className="rs-use-copy">Studio / Raster / Issue 03 — ancestors stay ink. The page is full ink.</p>
        </div>
        <p className="rs-use-kicker">A line of type that connects</p>
      </div>
    </UseField>
  );
}
