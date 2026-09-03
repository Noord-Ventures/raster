import * as stylex from "@stylexjs/stylex";

/**
 * Site chrome StyleX. Document-level :has() / html::before stay in site.css —
 * StyleX cannot target html from a child. No accent in chrome.
 */
export const chrome = stylex.create({
  logoWrap: {
    position: "fixed",
    top: 24,
    left: 20,
    zIndex: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    height: 24,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    color: "var(--text)",
    filter: "drop-shadow(0 0 12px var(--bg)) drop-shadow(0 0 20px var(--bg))",
    transition: "var(--transition), opacity var(--duration-snap) var(--ease)",
    ":hover": { opacity: 0.6 },
    ":focus-visible": {
      outlineWidth: 2,
      outlineStyle: "solid",
      outlineColor: "var(--text)",
      outlineOffset: 2,
    },
  },
  cornerNav: {
    position: "fixed",
    top: 24,
    left: "var(--nav-left)",
    right: "auto",
    zIndex: 200,
    display: "flex",
    alignItems: "center",
    gap: 20,
    height: 24,
    filter: "drop-shadow(0 0 12px var(--bg)) drop-shadow(0 0 20px var(--bg))",
  },
  themeToggle: {
    width: 24,
    height: 24,
    padding: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "transparent",
    borderWidth: 0,
    borderRadius: 0,
    cursor: "pointer",
    color: "var(--text-secondary)",
    outline: "none",
    ":hover": { color: "var(--text)" },
    ":focus-visible": {
      outlineWidth: 2,
      outlineStyle: "solid",
      outlineColor: "var(--text)",
      outlineOffset: 2,
    },
  },
});
