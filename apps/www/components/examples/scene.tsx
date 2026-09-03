import * as stylex from "@stylexjs/stylex";
import { UseSlot } from "./use-slot";
import { useStyles } from "./use.stylex";

/** The component in a fragment of a UI. Not a title. Not the catalog tile. */
export function InAction({ name }: { name: string }) {
  const sx = stylex.props(useStyles.scene);
  return (
    <figure className={["rs-scene", sx.className].filter(Boolean).join(" ")} style={sx.style}>
      <UseSlot name={name} />
    </figure>
  );
}
