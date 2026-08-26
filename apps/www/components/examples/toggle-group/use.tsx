import { ToggleGroup } from "@noordvc/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="toggle-group">
      <h3 className="rs-use-type">Set</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">Flush</p>
          <p className="rs-use-copy">One alignment. The group is one object.</p>
        </div>
        <ToggleGroup
          options={[
            { value: "left", label: "Left" },
            { value: "center", label: "Center" },
            { value: "right", label: "Right" },
          ]}
          defaultValue="left"
        />
      </div>
    </article>
  );
}
