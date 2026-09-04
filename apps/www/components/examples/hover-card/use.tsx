import { HoverCard, Link } from "@noorddev/vlak-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="hover-card">
      <h3 className="rs-use-type">Who</h3>
      <div className="rs-use-body">
        <p className="rs-use-copy">
          From{" "}
          <HoverCard trigger={<Link href="#">@noord</Link>}>
            Noord ships Vlak. Door: vlak.dev.
          </HoverCard>
          .
        </p>
      </div>
    </UseField>
  );
}
