import { sx } from "@/lib/sx";
import { PRINCIPLES } from "./specimen-laws";
import { specimen } from "./specimen.stylex";

export function SpecimenPrinciples() {
  return (
    <>
      {PRINCIPLES.map((principle) => (
        <section
          key={principle.n}
          {...sx(
            `specimen-cell specimen-cell-principle specimen-cell-p${principle.n}`,
            specimen.cell,
          )}
          aria-label={`Principle ${principle.n}`}
        >
          <div className="specimen-index">
            <p className="specimen-n" aria-hidden="true">
              {principle.n}
            </p>
            <p className="specimen-n-text">{principle.text}</p>
          </div>
        </section>
      ))}
    </>
  );
}
