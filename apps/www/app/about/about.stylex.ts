import * as stylex from "@stylexjs/stylex";

const at481 = "@media (min-width: 481px)";
const at816 = "@media (min-width: 816px)";
const at1224 = "@media (min-width: 1224px)";
const phone = "@media (max-width: 640px)";

/**
 * About field. Document overlay kill (`html:has(.field-page)::before`)
 * stays in about.css — StyleX cannot target html from a child.
 * Named grid areas stay in about.css (CI greps + pairing Brockmann/Crouwel).
 * Seams: 1px --divider gaps. L/R box margins: inset --grid-line.
 * Flush: radius 0. Artwork sits intact in a consistent 4:3 matte. Colophon 12px secondary.
 */
export const about = stylex.create({
  page: {
    width: "100%",
    minHeight: "100dvh",
  },
  field: {
    display: "grid",
    width: "100%",
    minHeight: "100dvh",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [at481]: "repeat(2, minmax(0, 1fr))",
      [at816]: "repeat(4, minmax(0, 1fr))",
      [at1224]: "repeat(6, minmax(0, 1fr))",
    },
    gridAutoRows: "minmax(204px, auto)",
    backgroundColor: "var(--divider)",
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 1,
    paddingLeft: 0,
    gap: 1,
    boxShadow: "inset 1px 0 0 var(--grid-line), inset -1px 0 0 var(--grid-line)",
  },
  cell: {
    minWidth: 0,
    minHeight: 204,
    padding: 20,
    backgroundColor: "var(--bg)",
    borderRadius: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 16,
    overflow: "visible",
  },
  cellTall: {
    minHeight: 408,
  },
  cellStart: {
    justifyContent: "flex-start",
  },
  cellEnd: {
    justifyContent: "flex-end",
  },
  cellLead: {
    paddingTop: 24,
  },
  kickerNav: {
    lineHeight: "24px",
  },
  cellWork: {
    padding: 20,
    gap: 20,
    minHeight: 408,
    justifyContent: "flex-start",
  },
  face: {
    margin: 0,
    marginLeft: "-0.08em",
    fontSize: "clamp(4.5rem, 28cqw, 18rem)",
    fontWeight: 600,
    letterSpacing: "-0.045em",
    lineHeight: 0.82,
    color: "var(--text)",
  },
  name: {
    margin: 0,
    fontSize: "clamp(1.5rem, 4.2vw, 2.5rem)",
    fontWeight: 600,
    letterSpacing: "-0.035em",
    lineHeight: 1.12,
  },
  nameFeature: {
    fontSize: {
      default: "clamp(2.5rem, 7vw, 7rem)",
      [at816]: "clamp(1.75rem, 3.2vw, 3.25rem)",
    },
    letterSpacing: {
      default: "-0.045em",
      [at816]: "-0.04em",
    },
    lineHeight: {
      default: 1.05,
      [at816]: 1.1,
    },
  },
  kicker: {
    margin: 0,
    fontSize: {
      default: "0.75rem",
      [phone]: "0.8125rem",
    },
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: "var(--text-secondary)",
  },
  specType: {
    margin: 0,
    marginLeft: "calc(1px - 0.045em)",
    fontSize: "clamp(3rem, 12vw, 8rem)",
    fontWeight: 600,
    letterSpacing: "-0.045em",
    lineHeight: 0.85,
    color: "var(--text)",
  },
  copy: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    maxWidth: "28em",
  },
  copyWide: {
    maxWidth: "36em",
  },
  copyP: {
    margin: 0,
    fontSize: {
      default: "0.9375rem",
      [phone]: "1rem",
    },
    fontWeight: 500,
    letterSpacing: "-0.01em",
    lineHeight: {
      default: 1.5,
      [phone]: 1.6,
    },
    color: "var(--text)",
  },
  mark: {
    margin: 0,
    fontSize: "0.8125rem",
    fontWeight: 500,
    letterSpacing: "-0.01em",
    lineHeight: 1.55,
    color: "var(--text-secondary)",
    maxWidth: "22em",
  },
  codeStack: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    width: "100%",
    maxWidth: "44em",
  },
  step: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: "100%",
  },
  codeRow: {
    position: "relative",
    display: "block",
    width: "100%",
  },
  code: {
    width: "100%",
    minWidth: 0,
    margin: 0,
    paddingTop: 20,
    paddingRight: 64,
    paddingBottom: 20,
    paddingLeft: 20,
    backgroundColor: "var(--table-alt)",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "var(--divider)",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "var(--divider)",
    overflowX: "auto",
  },
  work: {
    position: "relative",
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: "auto",
    display: "grid",
    placeItems: "center",
    aspectRatio: "4 / 3",
    minHeight: 0,
    padding: 20,
    overflow: "hidden",
    backgroundColor: "var(--table-alt)",
    boxShadow: "inset 0 0 0 1px var(--divider)",
  },
  workImg: {
    display: "block",
    width: "auto",
    height: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
    objectPosition: "center",
  },
  matter: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    padding: 0,
    backgroundColor: "transparent",
  },
  spec: {
    flexGrow: 1,
    minHeight: 88,
    width: "100%",
  },
  specModule: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  mod204: {
    flexGrow: 1,
    minHeight: 88,
    display: "grid",
    gridTemplateColumns: "184fr 20fr",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--divider)",
    backgroundColor: "var(--bg)",
  },
  col184: {
    backgroundColor: "var(--table-alt)",
    borderRightWidth: 1,
    borderRightStyle: "solid",
    borderRightColor: "var(--text)",
  },
  gut20: {
    backgroundColor: "var(--bg)",
  },
  modDim: {
    display: "grid",
    gridTemplateColumns: "184fr 20fr",
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: "var(--text-secondary)",
  },
  specHair: {
    backgroundImage:
      "repeating-linear-gradient(to bottom, var(--divider) 0, var(--divider) 1px, transparent 1px, transparent 20px)",
  },
  specFlush: {
    boxSizing: "border-box",
    width: "calc(100% + 40px)",
    maxWidth: "none",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: -20,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "var(--divider)",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "var(--divider)",
    display: "flex",
    flexDirection: "column",
  },
  flushRow: {
    flexGrow: 1,
    minHeight: 40,
    boxSizing: "border-box",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "var(--divider)",
  },
  grotesque: {
    margin: 0,
    fontSize: "clamp(4.5rem, 22cqw, 10rem)",
    fontWeight: 600,
    letterSpacing: "-0.05em",
    lineHeight: 0.8,
    paddingBottom: "0.25em",
    color: "var(--text)",
  },
  notes: {
    margin: 0,
    maxWidth: "40em",
  },
  colophon: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    maxWidth: "36em",
  },
  colophonP: {
    margin: 0,
    fontSize: "0.75rem",
    fontWeight: 500,
    letterSpacing: "-0.01em",
    lineHeight: 1.5,
    color: "var(--text-secondary)",
  },
  link: {
    color: "var(--text)",
    textDecoration: "none",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "var(--divider)",
    minHeight: {
      default: null,
      [phone]: 44,
    },
  },
});
