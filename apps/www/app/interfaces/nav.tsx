"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { interfaces } from "./catalog";

function here(pathname: string, href: string) {
  return pathname === href || pathname === `${href}/`;
}

export function InterfacesNav() {
  const pathname = usePathname();
  return (
    <nav className="if-rail" aria-label="Interfaces">
      <Link href="/interfaces" aria-current={here(pathname, "/interfaces") ? "page" : undefined}>
        Index
      </Link>
      {interfaces.map((item) => {
        const href = `/interfaces/${item.slug}`;
        return (
          <Link key={item.slug} href={href} aria-current={here(pathname, href) ? "page" : undefined}>
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
