"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { rasterCategories, rasterComponents } from "@noordvc/raster";

type Section = "start" | "foundations" | "components";

const topLevel: Array<{ href: string; label: string; section: Section }> = [
  { href: "/docs", label: "Getting started", section: "start" },
  { href: "/docs/tokens", label: "Foundations", section: "foundations" },
  { href: "/components", label: "Components", section: "components" },
];

const foundationPages = [{ href: "/docs/tokens", label: "Tokens" }];

function sectionOf(pathname: string): Section {
  if (pathname.startsWith("/components")) return "components";
  if (pathname.startsWith("/docs/tokens")) return "foundations";
  return "start";
}

/**
 * Dual-column rail, same idea as /work/: top-level in the first 184,
 * secondaries in the second, then the page. The component list never
 * lands in the first column.
 */
export function DocsNav() {
  const pathname = usePathname();
  const section = sectionOf(pathname);
  const here = (href: string) => pathname === href || pathname === `${href}/`;

  return (
    <div className="toc-rail">
      <nav className="toc" aria-label="Docs">
        {topLevel.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="toc-item"
            aria-current={section === item.section ? (here(item.href) ? "page" : "true") : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <nav
        className="toc toc-sub"
        aria-label={section === "components" ? "Components" : "In this section"}
      >
        {section === "foundations" &&
          foundationPages.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="toc-item"
              aria-current={here(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}

        {section === "components" &&
          rasterCategories.map((category) => {
            const items = rasterComponents.filter((c) => c.category === category);
            if (items.length === 0) return null;
            return (
              <div key={category}>
                <p className="toc-label">{category.charAt(0).toUpperCase() + category.slice(1)}</p>
                {items.map((c) => {
                  const href = `/components/${c.name}`;
                  return (
                    <Link
                      key={c.name}
                      href={href}
                      className="toc-item"
                      aria-current={here(href) ? "page" : undefined}
                    >
                      {c.title}
                    </Link>
                  );
                })}
              </div>
            );
          })}
      </nav>
    </div>
  );
}
