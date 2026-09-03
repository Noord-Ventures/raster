import { sx } from "@/lib/sx";
import { UseSlot } from "./use-slot";
import { useStyles } from "./use.stylex";

/** The component in a fragment of a UI. Not a title. Not the catalog tile. */
export function InAction({ name }: { name: string }) {
  return (
    <figure {...sx("rs-scene", useStyles.scene)}>
      <UseSlot name={name} />
    </figure>
  );
}
