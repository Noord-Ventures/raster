import { InputOTP } from "@noordvc/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="input-otp">
      <h3 className="rs-use-type">Code</h3>
      <div className="rs-use-body">
        <InputOTP length={4} />
      </div>
    </article>
  );
}
