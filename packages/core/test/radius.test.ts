import { describe, expect, it } from "vitest";
import { concentricInner, concentricOuter } from "../src/radius";

describe("concentric radius", () => {
  it("subtracts padding from the outer radius", () => {
    expect(concentricInner(28, 16)).toBe(12);
    expect(concentricInner(6, 20)).toBe(0);
    expect(concentricInner(0, 8)).toBe(0);
  });

  it("adds padding to recover the outer radius", () => {
    expect(concentricOuter(12, 16)).toBe(28);
    expect(concentricOuter(0, 20)).toBe(20);
  });

  it("round-trips", () => {
    const outer = 32;
    const pad = 12;
    expect(concentricOuter(concentricInner(outer, pad), pad)).toBe(outer);
  });
});
