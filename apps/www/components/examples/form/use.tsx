import { Button, Field, FieldLabel, Form, Input } from "@noorddev/raster-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="form">
      <h3 className="rs-use-type">Send</h3>
      <div className="rs-use-body">
        <Form onSubmit={(e) => e.preventDefault()} className="rs-use-stack">
          <Field>
            <FieldLabel htmlFor="use-form-name">From</FieldLabel>
            <Input plain id="use-form-name" defaultValue="Noord" />
          </Field>
          <Button type="submit" size="sm">Send the brief</Button>
        </Form>
      </div>
    </UseField>
  );
}
