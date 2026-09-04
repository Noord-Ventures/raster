import { Accordion, AccordionItem } from "@noorddev/vlak-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="accordion">
      <h3 className="rs-use-type">Why</h3>
      <div className="rs-use-body">
        <Accordion exclusive>
          <AccordionItem title="Why Inter?" defaultOpen>
            One face. Weight and size do the work a second typeface would try to do.
          </AccordionItem>
          <AccordionItem title="Why 204?">
            A 184 column and a 20 gutter. The page is the module.
          </AccordionItem>
        </Accordion>
      </div>
    </UseField>
  );
}
