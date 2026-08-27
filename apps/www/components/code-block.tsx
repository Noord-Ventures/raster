"use client";

import * as React from "react";

/** House stroke: 16 viewBox, 1.5px, currentColor. Same check as the checkbox. */
function CopyMark() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
      <rect x="5.5" y="2.5" width="8" height="8" stroke="currentColor" strokeWidth="1.5" />
      <rect x="2.5" y="5.5" width="8" height="8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CopiedMark() {
  return (
    <svg viewBox="0 0 12 12" width="16" height="16" fill="none" aria-hidden="true">
      <path
        d="M2.5 6.5l2.5 2.5 4.5-5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

async function writeClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.left = "-9999px";
  document.body.appendChild(field);
  field.select();
  document.execCommand("copy");
  field.remove();
}

export function CopyControl({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<number>(0);

  React.useEffect(() => {
    return () => window.clearTimeout(timer.current);
  }, []);

  async function copy() {
    try {
      await writeClipboard(text);
    } catch {
      return;
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      className="code-copy"
      onClick={copy}
      aria-label={copied ? "Copied" : "Copy"}
    >
      {copied ? <CopiedMark /> : <CopyMark />}
      <span className="rs-sr" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
}

export function CodeBlock({ code }: { code: string }) {
  return (
    <div className="code-block">
      <pre>{code}</pre>
      <CopyControl text={code} />
    </div>
  );
}
