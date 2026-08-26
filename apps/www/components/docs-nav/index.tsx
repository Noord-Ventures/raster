"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { rasterCategories, rasterComponents, type RasterCategory } from "@noordvc/raster";
import "./docs-nav.css";

function sentence(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function here(pathname: string, href: string) {
  return pathname === href || pathname === `${href}/`;
}

function pageGroup(pathname: string): RasterCategory | null {
  const match = pathname.match(/^\/components\/([^/]+)\/?$/);
  if (!match) return pathname.startsWith("/components") ? rasterCategories[0]! : null;
  return rasterComponents.find((c) => c.name === match[1])?.category ?? rasterCategories[0]!;
}

const groups = rasterCategories.filter((category) =>
  rasterComponents.some((c) => c.category === category),
);

/**
 * Components rail: groups in the first 184, that group's items in the
 * second. Hover (and focus) fills the second column. The page's own
 * group stays selected so the column is never empty on load.
 * Below 1440 the rail occupies columns 1–2; from 1440 the chrome
 * keeps the one-module inset.
 */
export function DocsNav() {
  const pathname = usePathname();
  const selected = pageGroup(pathname);
  const [preview, setPreview] = React.useState<RasterCategory | null>(null);
  const shown = preview ?? selected;

  React.useEffect(() => {
    setPreview(null);
  }, [pathname]);

  const leaveRail = (event: React.PointerEvent | React.FocusEvent) => {
    const next = "relatedTarget" in event ? event.relatedTarget : null;
    if (next instanceof Node && event.currentTarget.contains(next)) return;
    setPreview(null);
  };

  if (!pathname.startsWith("/components")) {
    return (
      <div className="toc-rail">
        <nav className="toc" aria-label="Docs">
          <Link href="/docs" className="toc-item" aria-current={here(pathname, "/docs") ? "page" : undefined}>
            Getting started
          </Link>
          <Link
            href="/docs/tokens"
            className="toc-item"
            aria-current={here(pathname, "/docs/tokens") ? "page" : undefined}
          >
            Tokens
          </Link>
        </nav>
      </div>
    );
  }

  const items = shown ? rasterComponents.filter((c) => c.category === shown) : [];

  return (
    <div className="toc-rail" data-rail="catalog" onPointerLeave={leaveRail} onBlur={leaveRail}>
      <nav className="toc" data-toc="groups" aria-label="Component groups">
        {groups.map((category) => (
          <Link
            key={category}
            href={`/components#${category}`}
            className="toc-item"
            aria-current={selected === category ? "true" : undefined}
            data-preview={shown === category ? "true" : undefined}
            onPointerEnter={() => setPreview(category)}
            onFocus={() => setPreview(category)}
          >
            {sentence(category)}
          </Link>
        ))}
      </nav>

      <nav className="toc toc-sub" data-toc="items" aria-label={shown ? sentence(shown) : "Components"}>
        {items.map((c) => {
          const href = `/components/${c.name}`;
          return (
            <Link
              key={c.name}
              href={href}
              className="toc-item"
              aria-current={here(pathname, href) ? "page" : undefined}
            >
              {c.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
