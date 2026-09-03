import * as stylex from "@stylexjs/stylex";

/**
 * Homepage specimen. Overlay kill (`html:has(.specimen-page)::before`)
 * and named grid-template-areas stay in specimen.css — StyleX cannot
 * target html from a child; CI greps the named areas and clip-path.
 */
export const specimen = stylex.create({
  page: {
    width: "100%",
    minHeight: "100dvh",
    margin: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
  },
  field: {
    display: "grid",
    width: "100%",
    minHeight: "100dvh",
    margin: 0,
    borderWidth: 0,
    gridTemplateColumns: "minmax(0, 1fr)",
    gridAutoRows: "minmax(204px, auto)",
    backgroundColor: "var(--divider)",
    padding: 0,
    gap: 1,
    boxShadow: "inset 1px 0 0 var(--grid-line), inset -1px 0 0 var(--grid-line)",
    clipPath: "inset(0)",
  },
  cell: {
    minWidth: 0,
    minHeight: 204,
    padding: 20,
    backgroundColor: "var(--bg)",
    display: "flex",
    flexDirection: "column",
    borderRadius: 0,
  },
});
