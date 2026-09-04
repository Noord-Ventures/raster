import type { ReactNode } from "react";
import { chrome } from "@/app/site.stylex";
import { DocsNav } from "@/components/docs-nav";
import { sx } from "@/lib/sx";

/** The docs page frame: rail, 592 measure, cover with title and one-line summary. */
export function DocsShell({ title, summary, children }: { title: string; summary: ReactNode; children: ReactNode }) {
  const cover = sx("cover", chrome.cover);
  return (
    <div className="site-layout">
      <DocsNav />
      <main id="main" {...sx("site-content", chrome.content)}>
        <header className={cover.className} style={{ ...cover.style, paddingBottom: 8 }}>
          <h1 className="rs-t-display">{title}</h1>
          <p className="rs-t-sub">{summary}</p>
        </header>
        {children}
      </main>
    </div>
  );
}
