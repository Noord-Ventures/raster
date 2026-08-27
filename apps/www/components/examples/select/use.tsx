import { Select } from "@noorddev/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="select">
      <h3 className="rs-use-type">Face</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">The only face</p>
          <p className="rs-use-copy">Inter, or Inter. Weight and size do the rest.</p>
          <Select
            options={[
              { value: "inter", label: "Inter" },
              { value: "inter-tight", label: "Inter tight" },
            ]}
            defaultValue="inter"
          />
        </div>
      </div>
    </article>
  );
}
