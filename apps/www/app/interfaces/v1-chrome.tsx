"use client";

/** Phone V1 chrome from box export-v1 stills. Desktop hides this. */
export function PhoneV1Chrome({
  heading,
  action,
  onAction,
}: {
  heading: string;
  action: string;
  onAction: () => void;
}) {
  return (
    <>
      <div className="if-v1-status" aria-hidden="true">
        <span>9:41</span>
        <span>Raster</span>
      </div>
      <header className="if-v1-nav">
        <p className="if-v1-title">{heading}</p>
        <button type="button" className="if-v1-action" onClick={onAction}>
          {action}
        </button>
      </header>
    </>
  );
}
