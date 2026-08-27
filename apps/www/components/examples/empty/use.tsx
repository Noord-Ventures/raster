import { Button, Empty } from "@noorddev/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="empty">
      <h3 className="rs-use-type">None</h3>
      <div className="rs-use-body">
        <Empty title="No sheets yet" action={<Button variant="ghost" size="sm">Open a sheet</Button>}>
          The press is idle. The grid is empty on purpose.
        </Empty>
      </div>
    </article>
  );
}
