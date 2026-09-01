"use client";

import Link from "next/link";
import { rasterComponents } from "@noorddev/raster";
import { Preview } from "@/components/preview";
import { KIT } from "./specimen";

const slots = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"] as const;

export function SpecimenKit() {
  const shown = new Set<string>(KIT);
  const more = rasterComponents.filter((component) => !shown.has(component.name)).length;

  return (
    <>
      {KIT.map((name, i) => {
        const component = rasterComponents.find((c) => c.name === name);
        if (!component) return null;
        const slot = slots[i] ?? "a";
        return (
          <section
            key={component.name}
            className={`specimen-cell specimen-cell-demo specimen-cell-kit-${slot} specimen-cell-kit-${component.name}`}
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
      <section className="specimen-cell specimen-cell-more" aria-label="More components">
        <p className="specimen-more">
          <Link href="/components">Browse {more} more components</Link>
        </p>
      </section>
    </>
  );
}
