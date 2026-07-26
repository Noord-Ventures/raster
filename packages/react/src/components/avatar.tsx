import * as React from "react";
import { cx } from "../cx";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  /** Shown when there is no image, or when it fails to load. */
  initials?: string;
  size?: "sm" | "md" | "lg";
}

export function Avatar({ src, alt, initials, size = "md", className, ...props }: AvatarProps) {
  const [failed, setFailed] = React.useState(false);
  const showImage = src && !failed;
  return (
    <span
      className={cx("rs-avatar", size === "sm" && "rs-avatar-sm", size === "lg" && "rs-avatar-lg", className)}
      {...props}
    >
      {showImage ? <img src={src} alt={alt ?? ""} onError={() => setFailed(true)} /> : initials}
    </span>
  );
}

/** Overlapping row with paper seams. */
export function AvatarRow({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("rs-avatar-row", className)} {...props} />;
}
