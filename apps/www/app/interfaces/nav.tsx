"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileToc } from "@/components/toc-mobile";
import { interfaces } from "./catalog";

function here(pathname: string, href: string) {
  return pathname === href || pathname === `${href}/`;
}

function currentLabel(pathname: string) {
  if (here(pathname, "/interfaces")) return "Interfaces";
  const slug = pathname.split("/")[2];
  return interfaces.find((item) => item.slug === slug)?.title ?? "Interfaces";
}

export function InterfacesNav({ rail = true }: { rail?: boolean }) {
  const pathname = usePathname();
  const links = (
    <>
      <Link
        href="/interfaces"
        className="toc-mobile-item"
        aria-current={here(pathname, "/interfaces") ? "page" : undefined}
      >
        Index
      </Link>
      {interfaces.map((item) => {
        const href = `/interfaces/${item.slug}`;
        return (
          <Link
            key={item.slug}
            href={href}
            className="toc-mobile-item"
            aria-current={here(pathname, href) ? "page" : undefined}
          >
            {item.title}
          </Link>
        );
      })}
    </>
  );

  return (
    <>
      {rail ? (
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
      ) : null}
      <MobileToc label={currentLabel(pathname)} inset={!rail}>
        {links}
      </MobileToc>
    </>
  );
}
