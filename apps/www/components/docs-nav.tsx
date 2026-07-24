"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { rasterCategories, rasterComponents } from "@raster/core";

export function DocsNav() {
  const pathname = usePathname();
  return (
    <aside className="docs-nav">
      <h4>Foundations</h4>
      <Link href="/docs" aria-current={pathname === "/docs" ? "page" : undefined}>
        Getting started
      </Link>
      <Link href="/docs/tokens" aria-current={pathname === "/docs/tokens" ? "page" : undefined}>
        Tokens
      </Link>
      {rasterCategories.map((category) => {
        const items = rasterComponents.filter((c) => c.category === category);
        if (items.length === 0) return null;
        return (
          <div key={category}>
            <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
            {items.map((c) => {
              const href = `/components/${c.name}`;
              return (
                <Link key={c.name} href={href} aria-current={pathname === href ? "page" : undefined}>
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
