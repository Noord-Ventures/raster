import { InputOTP } from "@noorddev/vlak-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="input-otp">
      <h3 className="rs-use-type">Code</h3>
      <div className="rs-use-body">
        <InputOTP length={4} />
      </div>
    </UseField>
  );
}
