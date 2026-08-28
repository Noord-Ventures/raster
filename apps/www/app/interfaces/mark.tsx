import type { InterfaceSlug } from "./catalog";

/** Quiet geometric marks. One per invented tool. Inter chrome stays around them. */
export function Mark({ slug }: { slug: InterfaceSlug }) {
  return (
    <svg className="if-mark" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      {slug === "ai-tool" ? <rect x="7.25" y="2" width="1.5" height="12" fill="currentColor" /> : null}
      {slug === "dashboard" ? <rect x="4" y="4" width="8" height="8" fill="currentColor" /> : null}
      {slug === "threads" ? (
        <>
          <rect x="3" y="5" width="10" height="1.5" fill="currentColor" />
          <rect x="3" y="9.5" width="10" height="1.5" fill="currentColor" />
        </>
      ) : null}
      {slug === "fleet" ? (
        <rect x="5.5" y="5.5" width="5" height="5" fill="currentColor" transform="rotate(45 8 8)" />
      ) : null}
      {slug === "delivery" ? (
        <circle cx="8" cy="8" r="4.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      ) : null}
      {slug === "slack" ? (
        <>
          <rect x="3" y="3" width="4" height="4" fill="currentColor" />
          <rect x="9" y="3" width="4" height="4" fill="currentColor" />
          <rect x="3" y="9" width="4" height="4" fill="currentColor" />
          <rect x="9" y="9" width="4" height="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </>
      ) : null}
    </svg>
  );
}

export function Brand({ slug, title }: { slug: InterfaceSlug; title: string }) {
  return (
    <p className="if-app">
      <Mark slug={slug} />
      <span>{title}</span>
    </p>
  );
}
