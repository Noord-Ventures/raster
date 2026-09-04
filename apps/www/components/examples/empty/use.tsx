import { Button, Empty } from "@noorddev/vlak-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="empty">
      <h3 className="rs-use-type">None</h3>
      <div className="rs-use-body">
        <Empty title="No sheets yet" action={<Button variant="ghost" size="sm">Open a sheet</Button>}>
          The press is idle. The grid is empty on purpose.
        </Empty>
      </div>
    </UseField>
  );
}
