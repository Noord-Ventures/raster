"use client";

import Link from "next/link";
import { rasterComponents } from "@noordvc/raster";
import { Preview } from "@/components/preview";
import { KIT } from "./specimen";

export function SpecimenKit() {
  return (
    <>
      {KIT.map((name, i) => {
        const component = rasterComponents.find((c) => c.name === name);
        if (!component) return null;
        const slot = ["a", "b", "c"][i] ?? "a";
        return (
          <section
            key={component.name}
            className={`specimen-cell specimen-cell-demo specimen-cell-kit-${slot}`}
            aria-label={component.title}
          >
            <p className="specimen-kit-name">
              <Link href={`/components/${component.name}`}>{component.title}</Link>
            </p>
            <div className="specimen-kit-live">
              <Preview name={component.name} snippet={component.snippet} />
            </div>
          </section>
        );
      })}
    </>
  );
}
