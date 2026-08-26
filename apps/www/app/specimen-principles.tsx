import { PRINCIPLES } from "./specimen-laws";

export function SpecimenPrinciples() {
  return (
    <>
      {PRINCIPLES.map((law) => (
        <section
          key={law.n}
          className={`specimen-cell specimen-cell-principle specimen-cell-p${law.n}`}
          aria-label={`Law ${law.n}`}
        >
          <p className="specimen-n" aria-hidden="true">
            {law.n}
          </p>
          <p className="specimen-n-text">{law.text}</p>
        </section>
      ))}
    </>
  );
}
