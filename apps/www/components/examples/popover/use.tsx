import { Popover, PopoverBody, PopoverTitle } from "@noordvc/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="popover">
      <h3 className="rs-use-type">More</h3>
      <div className="rs-use-body">
        <Popover trigger="Module">
          <PopoverTitle>204</PopoverTitle>
          <PopoverBody>184 column. 20 gutter. The page is the measure.</PopoverBody>
        </Popover>
      </div>
    </article>
  );
}
