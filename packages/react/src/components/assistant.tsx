import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../tokens.stylex";
import { rs } from "../rs";

export interface AssistantProps extends React.HTMLAttributes<HTMLDivElement> {}

const styles = stylex.create({
  ai: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    maxWidth: 560,
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: raster.divider,
    borderRadius: raster.radius,
    padding: 20,
  },
  head: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: "var(--text)",
  },
  status: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12,
    fontWeight: 500,
    color: raster.gray,
    letterSpacing: "-0.01em",
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    backgroundColor: "var(--text)",
  },
  msg: {
    display: "flex",
    width: "100%",
  },
  user: {
    justifyContent: "flex-end",
  },
  userBlock: {
    backgroundColor: "var(--table-alt)",
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: raster.divider,
    borderRadius: raster.radius,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 14,
    paddingRight: 14,
    fontSize: 13.5,
    color: "var(--text)",
    letterSpacing: "-0.01em",
    maxWidth: "85%",
  },
  reply: {
    fontSize: 13.5,
    lineHeight: 1.6,
    color: "var(--text)",
    letterSpacing: "-0.01em",
    margin: 0,
  },
  card: {
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: raster.divider,
    borderRadius: raster.radius,
    padding: 14,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  tag: {
    fontSize: 10.5,
    fontWeight: 600,
    letterSpacing: "0.02em",
    color: "var(--text)",
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: raster.divider,
    borderRadius: raster.radiusSm,
    paddingBlock: 2,
    paddingInline: 8,
    marginBottom: 10,
  },
  text: {
    fontSize: 13,
    color: "var(--text)",
    lineHeight: 1.5,
    margin: 0,
  },
  done: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    marginTop: 12,
    fontSize: 12.5,
    lineHeight: 1.45,
    color: raster.gray,
  },
  input: {
    marginTop: 2,
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: raster.divider,
    borderRadius: raster.radiusSm,
    backgroundColor: "var(--bg)",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 12,
    paddingRight: 12,
    fontSize: 12.5,
    color: raster.gray,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  send: {
    color: "var(--text)",
    fontWeight: 600,
  },
});

/** Chat panel: user block, reply, suggestion card, input row. */
export function Assistant({ className, style, ...props }: AssistantProps) {
  const sx = rs(["rs-ai", className], styles.ai);
  return <div {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function AssistantHead({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const sx = rs(["rs-ai-head", className], styles.head);
  return <div {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function AssistantTitle({ className, style, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  const sx = rs(["rs-ai-title", className], styles.title);
  return <span {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function AssistantStatus({ className, style, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  const sx = rs(["rs-ai-status", className], styles.status);
  const dot = rs([], styles.statusDot);
  return (
    <span {...props} className={sx.className} style={{ ...sx.style, ...style }}>
      <i className={dot.className} style={dot.style} />
      {children}
    </span>
  );
}

export function AssistantMsg({
  user,
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { user?: boolean }) {
  const sx = rs(["rs-ai-msg", user && "rs-ai-user", className], styles.msg, user && styles.user);
  return <div {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function AssistantUserBlock({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const sx = rs(["rs-ai-user-block", className], styles.userBlock);
  return <div {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function AssistantReply({ className, style, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const sx = rs(["rs-ai-reply", className], styles.reply);
  return <p {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function AssistantCard({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const sx = rs(["rs-ai-card", className], styles.card);
  return <div {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function AssistantTag({ className, style, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  const sx = rs(["rs-ai-tag", className], styles.tag);
  return <span {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function AssistantText({ className, style, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const sx = rs(["rs-ai-text", className], styles.text);
  return <p {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function AssistantDone({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const sx = rs(["rs-ai-done", className], styles.done);
  return <div {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function AssistantInput({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const sx = rs(["rs-ai-input", className], styles.input);
  return <div {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function AssistantSend({ className, style, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  const sx = rs(["rs-ai-send", className], styles.send);
  return <span {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}
