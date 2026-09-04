"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { vlak, mq } from "../tokens.stylex";
import { rs } from "../rs";
import { cx } from "../cx";

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {}

const styles = stylex.create({
  field: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: {
      default: "0.5rem",
      [mq.phone]: "0.5rem",
    },
  },
  label: {
    fontSize: {
      default: "0.75rem",
      [mq.phone]: vlak.controlLabel,
    },
    fontWeight: 600,
    color: vlak.gray,
    letterSpacing: "-0.01em",
    lineHeight: "16px",
  },
  hint: {
    margin: 0,
    fontSize: {
      default: "0.75rem",
      [mq.phone]: "0.875rem",
    },
    fontWeight: 500,
    color: vlak.gray,
    letterSpacing: "-0.01em",
    lineHeight: "16px",
  },
  error: {
    margin: 0,
    fontSize: {
      default: "0.75rem",
      [mq.phone]: "0.875rem",
    },
    fontWeight: 500,
    color: vlak.ink,
    letterSpacing: "-0.01em",
    lineHeight: "16px",
  },
});

/* ── Context: hint and error ids reach the control ── */

type FieldPart = "hint" | "error";

interface FieldContextValue {
  hintId: string;
  errorId: string;
  /** Ids of the parts currently rendered. */
  parts: { hint?: string; error?: string };
  register: (part: FieldPart, id: string) => () => void;
}

export const FieldContext = React.createContext<FieldContextValue | null>(null);

/** Hint and error parts: the id to render, registered while mounted. */
export function useFieldPart(part: FieldPart, explicitId?: string): string | undefined {
  const ctx = React.useContext(FieldContext);
  const id = explicitId ?? (part === "hint" ? ctx?.hintId : ctx?.errorId);
  // `register` is stable; the context value is not (it carries `parts`).
  const register = ctx?.register;
  React.useEffect(() => {
    if (!register || !id) return;
    return register(part, id);
  }, [register, part, id]);
  return id;
}

export interface FieldControlAria {
  "aria-describedby"?: string;
  "aria-invalid"?: React.AriaAttributes["aria-invalid"];
}

/**
 * Controls call this: the field's hint and error describe the control,
 * and a rendered error marks it invalid. Explicit props win.
 */
export function useFieldControl(props: FieldControlAria): FieldControlAria & { invalid: boolean } {
  const ctx = React.useContext(FieldContext);
  const describedBy = cx(props["aria-describedby"], ctx?.parts.hint, ctx?.parts.error) || undefined;
  const ariaInvalid = props["aria-invalid"] ?? (ctx?.parts.error ? true : undefined);
  return {
    "aria-describedby": describedBy,
    "aria-invalid": ariaInvalid,
    invalid: ariaInvalid === true || ariaInvalid === "true",
  };
}

/** Stack: label, control, hint or error. The hint and error describe the control. */
export const Field = React.forwardRef<HTMLDivElement, FieldProps>(function Field(
  { className, style, ...props },
  ref,
) {
  const base = React.useId();
  const [parts, setParts] = React.useState<{ hint?: string; error?: string }>({});
  const register = React.useCallback((part: FieldPart, id: string) => {
    setParts((current) => (current[part] === id ? current : { ...current, [part]: id }));
    return () => {
      setParts((current) => (current[part] === id ? { ...current, [part]: undefined } : current));
    };
  }, []);
  const value = React.useMemo<FieldContextValue>(
    () => ({ hintId: `${base}-hint`, errorId: `${base}-error`, parts, register }),
    [base, parts, register],
  );
  const sx = rs(["rs-field", className], styles.field);
  return (
    <FieldContext.Provider value={value}>
      <div ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />
    </FieldContext.Provider>
  );
});

export const FieldLabel = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(function FieldLabel(
  { className, style, ...props },
  ref,
) {
  const sx = rs(["rs-field-label", className], styles.label);
  return <label ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});

export const FieldHint = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(function FieldHint(
  { className, style, id, ...props },
  ref,
) {
  const hintId = useFieldPart("hint", id);
  const sx = rs(["rs-field-hint", className], styles.hint);
  return <p ref={ref} {...props} id={hintId} className={sx.className} style={{ ...sx.style, ...style }} />;
});

export const FieldError = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(function FieldError(
  { className, style, id, ...props },
  ref,
) {
  const errorId = useFieldPart("error", id);
  const sx = rs(["rs-field-error", className], styles.error);
  return <p ref={ref} role="alert" {...props} id={errorId} className={sx.className} style={{ ...sx.style, ...style }} />;
});
