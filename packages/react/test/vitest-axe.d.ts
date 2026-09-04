/* test/setup.ts extends expect with vitest-axe at runtime; this types the matcher once for every test file. */
import type { AxeMatchers } from "vitest-axe";

declare module "vitest" {
  // biome-ignore lint/suspicious/noExplicitAny: mirrors vitest's own declaration so the interfaces merge
  interface Assertion<T = any> extends AxeMatchers {}
}
