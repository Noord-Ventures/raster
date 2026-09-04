import { Button, ButtonGroup } from "@noorddev/vlak-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="button-group">
      <h3 className="rs-use-type">Align</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">Proof desk</p>
          <p className="rs-use-copy">Flush actions. The group is one object, not three buttons.</p>
        </div>
        <ButtonGroup>
          <Button variant="ghost">Left</Button>
          <Button variant="ghost">Center</Button>
          <Button variant="ghost">Right</Button>
        </ButtonGroup>
      </div>
    </UseField>
  );
}
