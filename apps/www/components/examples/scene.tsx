import { UseSlot } from "./use-slot";

/** The component in a fragment of a UI. Not a title. Not the catalog tile. */
export function InAction({ name }: { name: string }) {
  return (
    <figure className="rs-scene">
      <UseSlot name={name} />
    </figure>
  );
}
