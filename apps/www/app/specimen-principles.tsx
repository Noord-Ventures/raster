import { sx } from "@/lib/sx";
import { PRINCIPLES } from "./specimen-laws";
import { specimen } from "./specimen.stylex";

export function SpecimenPrinciples() {
  return (
    <>
      {PRINCIPLES.map((law) => (
        <section
          key={law.n}
          {...sx(`specimen-cell specimen-cell-principle specimen-cell-p${law.n}`, specimen.cell)}
          aria-label={`Law ${law.n}`}
        >
          <div className="specimen-index">
            <p className="specimen-n" aria-hidden="true">
              {law.n}
            </p>
            <p className="specimen-n-text">{law.text}</p>
          </div>
        </section>
      ))}
    </>
  );
}
