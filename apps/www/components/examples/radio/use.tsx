import { Radio, RadioGroup } from "@noordvc/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="radio">
      <h3 className="rs-use-type">Stock</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">The stock</p>
          <p className="rs-use-copy">One choice. The rest stay quiet.</p>
          <RadioGroup defaultValue="paper">
            <Radio value="paper" label="Paper" />
            <Radio value="board" label="Board" />
          </RadioGroup>
        </div>
      </div>
    </article>
  );
}
