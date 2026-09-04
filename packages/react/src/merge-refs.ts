import * as React from "react";

/** Writes a node into a ref of either shape; a missing ref is a no-op. */
export function setRef<T>(ref: React.Ref<T> | undefined, value: T | null): void {
  if (typeof ref === "function") ref(value);
  else if (ref) (ref as React.MutableRefObject<T | null>).current = value;
}

/**
 * One callback ref that feeds every ref given: a component's own ref on
 * its root and the ref forwarded from the parent. Stable while the refs
 * are, so React attaches it once.
 */
export function useMergedRefs<T>(...refs: Array<React.Ref<T> | undefined>): React.RefCallback<T> {
  return React.useCallback(
    (node: T | null) => {
      for (const ref of refs) setRef(ref, node);
    },
    // biome-ignore lint/correctness/useExhaustiveDependencies: the refs are the dependency list
    refs,
  );
}
