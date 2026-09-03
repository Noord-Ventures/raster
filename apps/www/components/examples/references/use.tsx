import { Cite, CiteLink, RefAuthors, RefItem, Refs } from "@noorddev/raster-react";
import { UseField } from "../use-frame";
export function Use() {
  return (
    <UseField name="references">
      <h3 className="rs-use-type">Ref</h3>
      <div className="rs-use-body">
        <p className="rs-use-copy">
          Set in a single ink.
          <Cite>
            <CiteLink href="#use-ref-1">1</CiteLink>
          </Cite>
        </p>
        <Refs>
          <RefItem id="use-ref-1">
            <RefAuthors>Müller-Brockmann, J.</RefAuthors> Grid systems in graphic design.
          </RefItem>
        </Refs>
      </div>
    </UseField>
  );
}
