import * as stylex from "@stylexjs/stylex";
import { vlak } from "./tokens.stylex";

/** Screen-reader only. Matches .rs-sr */
export const hidden = stylex.create({
  sr: {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
  srFocusMark: {
    outlineWidth: {
      default: null,
      ":focus-visible + *": 1.5,
    },
    outlineStyle: {
      default: null,
      ":focus-visible + *": "solid",
    },
    outlineColor: {
      default: null,
      ":focus-visible + *": vlak.ink,
    },
    outlineOffset: {
      default: null,
      ":focus-visible + *": 2,
    },
  },
});
