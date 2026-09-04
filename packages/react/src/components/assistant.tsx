import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../tokens.stylex";
import { rs } from "../rs";

export interface AssistantProps extends React.HTMLAttributes<HTMLDivElement> {}

const styles = stylex.create({
  ai: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    maxWidth: "35rem",
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: raster.divider,
    borderRadius: raster.radius,
    padding: "1.25rem",
  },
  head: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: "0.8125rem",
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: "var(--text)",
  },
  status: {
    display: "flex",
    alignItems: "center",
    gap: "0.375rem",
    fontSize: "0.75rem",
    fontWeight: 500,
    color: raster.gray,
    letterSpacing: "-0.01em",
  },
  statusDot: {
    width: "0.375rem",
    height: "0.375rem",
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
    paddingTop: "0.625rem",
    paddingBottom: "0.625rem",
    paddingInlineStart: "0.875rem",
    paddingInlineEnd: "0.875rem",
    fontSize: "0.84375rem",
    color: "var(--text)",
    letterSpacing: "-0.01em",
    maxWidth: "85%",
  },
  reply: {
    fontSize: "0.84375rem",
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
    padding: "0.875rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  tag: {
    fontSize: "0.65625rem",
    fontWeight: 600,
    letterSpacing: "0.02em",
    color: "var(--text)",
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: raster.divider,
    borderRadius: raster.radiusSm,
    paddingBlock: 2,
    paddingInline: "0.5rem",
    marginBottom: "0.625rem",
  },
  text: {
    fontSize: "0.8125rem",
    color: "var(--text)",
    lineHeight: 1.5,
    margin: 0,
  },
  done: {
    display: "flex",
    alignItems: "baseline",
    gap: "0.5rem",
    marginTop: "0.75rem",
    fontSize: "0.78125rem",
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
    paddingTop: "0.625rem",
    paddingBottom: "0.625rem",
    paddingInlineStart: "0.75rem",
    paddingInlineEnd: "0.75rem",
    fontSize: "0.78125rem",
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
export const Assistant = React.forwardRef<HTMLDivElement, AssistantProps>(function Assistant(
  { className, style, ...props },
  ref,
) {
  const sx = rs(["rs-ai", className], styles.ai);
  return <div ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});

export const AssistantHead = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function AssistantHead(
  { className, style, ...props },
  ref,
) {
  const sx = rs(["rs-ai-head", className], styles.head);
  return <div ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});

export const AssistantTitle = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(function AssistantTitle(
  { className, style, ...props },
  ref,
) {
  const sx = rs(["rs-ai-title", className], styles.title);
  return <span ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});

export const AssistantStatus = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(function AssistantStatus(
  { className, style, children, ...props },
  ref,
) {
  const sx = rs(["rs-ai-status", className], styles.status);
  const dot = rs(["rs-ai-status-dot"], styles.statusDot);
  return (
    <span ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }}>
      <i className={dot.className} style={dot.style} />
      {children}
    </span>
  );
});

export const AssistantMsg = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { user?: boolean }>(function AssistantMsg({
  user,
  className,
  style,
  ...props
}, ref) {
  const sx = rs(["rs-ai-msg", user && "rs-ai-user", className], styles.msg, user && styles.user);
  return <div ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});

export const AssistantUserBlock = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function AssistantUserBlock(
  { className, style, ...props },
  ref,
) {
  const sx = rs(["rs-ai-user-block", className], styles.userBlock);
  return <div ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});

export const AssistantReply = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(function AssistantReply(
  { className, style, ...props },
  ref,
) {
  const sx = rs(["rs-ai-reply", className], styles.reply);
  return <p ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});

export const AssistantCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function AssistantCard(
  { className, style, ...props },
  ref,
) {
  const sx = rs(["rs-ai-card", className], styles.card);
  return <div ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});

export const AssistantTag = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(function AssistantTag(
  { className, style, ...props },
  ref,
) {
  const sx = rs(["rs-ai-tag", className], styles.tag);
  return <span ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});

export const AssistantText = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(function AssistantText(
  { className, style, ...props },
  ref,
) {
  const sx = rs(["rs-ai-text", className], styles.text);
  return <p ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});

export const AssistantDone = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function AssistantDone(
  { className, style, ...props },
  ref,
) {
  const sx = rs(["rs-ai-done", className], styles.done);
  return <div ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});

export const AssistantInput = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function AssistantInput(
  { className, style, ...props },
  ref,
) {
  const sx = rs(["rs-ai-input", className], styles.input);
  return <div ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});

export const AssistantSend = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(function AssistantSend(
  { className, style, ...props },
  ref,
) {
  const sx = rs(["rs-ai-send", className], styles.send);
  return <span ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});
