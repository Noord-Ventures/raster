import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../tokens.stylex";
import { rs } from "../rs";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  /** Shown when there is no image, or when it fails to load. */
  initials?: string;
  size?: "sm" | "md" | "lg";
}

const AvatarRowContext = React.createContext(false);

const styles = stylex.create({
  avatar: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    backgroundColor: raster.dividerSubtle,
    color: raster.ink,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "-0.01em",
    overflow: "hidden",
    flexShrink: 0,
    userSelect: "none",
  },
  sm: {
    width: 24,
    height: 24,
    fontSize: 10,
  },
  lg: {
    width: 48,
    height: 48,
    fontSize: 16,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  row: {
    display: "flex",
  },
  inRow: {
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: raster.paper,
    marginLeft: {
      default: -8,
      ":first-child": 0,
    },
  },
});

export function Avatar({ src, alt, initials, size = "md", className, style, ...props }: AvatarProps) {
  const [failed, setFailed] = React.useState(false);
  const inRow = React.useContext(AvatarRowContext);
  const showImage = src && !failed;
  const sx = rs(
    ["rs-avatar", size === "sm" && "rs-avatar-sm", size === "lg" && "rs-avatar-lg", className],
    styles.avatar,
    size === "sm" && styles.sm,
    size === "lg" && styles.lg,
    inRow && styles.inRow,
  );
  const img = rs([], styles.image);
  return (
    <span {...props} className={sx.className} style={{ ...sx.style, ...style }}>
      {showImage ? (
        <img className={img.className} style={img.style} src={src} alt={alt ?? ""} onError={() => setFailed(true)} />
      ) : (
        initials
      )}
    </span>
  );
}

/** Overlapping row with paper seams. */
export function AvatarRow({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const sx = rs(["rs-avatar-row", className], styles.row);
  return (
    <AvatarRowContext.Provider value={true}>
      <div {...props} className={sx.className} style={{ ...sx.style, ...style }} />
    </AvatarRowContext.Provider>
  );
}
