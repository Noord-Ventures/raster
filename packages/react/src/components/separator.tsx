import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { vlak } from "../tokens.stylex";
import { rs } from "../rs";

export interface SeparatorProps extends React.HTMLAttributes<HTMLElement> {
  orientation?: "horizontal" | "vertical";
}

const styles = stylex.create({
  horizontal: {
    borderWidth: 0,
    borderStyle: "none",
    borderTopWidth: vlak.hairline,
    borderTopStyle: "solid",
    borderTopColor: vlak.divider,
    marginBlock: "1.25rem",
    marginInline: 0,
  },
  vertical: {
    display: "inline-block",
    width: vlak.hairline,
    alignSelf: "stretch",
    backgroundColor: vlak.divider,
    marginBlock: 0,
    marginInline: "0.75rem",
  },
});

export const Separator = React.forwardRef<HTMLElement, SeparatorProps>(function Separator(
  { orientation = "horizontal", className, style, ...props },
  ref,
) {
  if (orientation === "vertical") {
    const sx = rs(["rs-sep-v", className], styles.vertical);
    return (
      // biome-ignore lint/a11y/useFocusableInteractive: a static separator is not a widget; it takes no focus
      <span
        ref={ref as React.Ref<HTMLSpanElement>}
        // biome-ignore lint/a11y/useAriaPropsForRole: a non-focusable separator needs no aria-valuenow
        role="separator"
        aria-orientation="vertical"
        {...props}
        className={sx.className}
        style={{ ...sx.style, ...style }}
      />
    );
  }
  const sx = rs(["rs-sep", className], styles.horizontal);
  return <hr ref={ref as React.Ref<HTMLHRElement>} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});
