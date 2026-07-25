"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { rasterCategories, rasterComponents } from "@raster/core";

/** The left TOC: one module wide, sticky, in the noord.dev studio style. */
export function DocsNav() {
  const pathname = usePathname();
  return (
    <aside className="toc">
      <p className="toc-label">Foundations</p>
      <Link href="/docs" className="toc-item" aria-current={pathname === "/docs" ? "page" : undefined}>
        Getting started
      </Link>
      <Link href="/docs/tokens" className="toc-item" aria-current={pathname === "/docs/tokens" ? "page" : undefined}>
        Tokens
      </Link>
      {rasterCategories.map((category) => {
        const items = rasterComponents.filter((c) => c.category === category);
        if (items.length === 0) return null;
        return (
          <div key={category}>
            <p className="toc-label">{category.charAt(0).toUpperCase() + category.slice(1)}</p>
            {items.map((c) => {
              const href = `/components/${c.name}`;
              return (
                <Link key={c.name} href={href} className="toc-item" aria-current={pathname === href ? "page" : undefined}>
                  {c.title}
                </Link>
              );
            })}
          </div>
        );
      })}
    </aside>
  );
}
