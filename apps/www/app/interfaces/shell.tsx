import type { ReactNode } from "react";
import { chrome } from "@/app/site.stylex";
import { sx } from "@/lib/sx";
import { type InterfaceSlug, interfaceBySlug } from "./catalog";
import { interfaces } from "./interfaces.stylex";
import { InterfacesNav } from "./nav";

export function InterfaceShell({ slug, children }: { slug: InterfaceSlug; children: ReactNode }) {
  const proto = interfaceBySlug(slug)!;
  return (
    <div {...sx("if-index", interfaces.index)}>
      <InterfacesNav />
      <main id="main" {...sx("site-content-wide", chrome.contentWide)}>
        <div {...sx("if-specimen", interfaces.specimen)}>{children}</div>
        <section {...sx("if-matter", interfaces.matter)} aria-labelledby={`${slug}-name`}>
          <p {...sx("if-voice", interfaces.voice)}>{proto.voice}</p>
          <h1 id={`${slug}-name`} className="rs-t-display">
            {proto.title}
          </h1>
          <p {...sx("if-story", interfaces.story)}>{proto.story}</p>
          <p {...sx("if-story if-story-2", interfaces.story, interfaces.story2)}>{proto.note}</p>
          <dl {...sx("if-meta", interfaces.meta)}>
            <div>
              <dt>What</dt>
              <dd>{proto.what}</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>{proto.type}</dd>
            </div>
            <div>
              <dt>Module</dt>
              <dd>{proto.module}</dd>
            </div>
            <div>
              <dt>Ink</dt>
              <dd>{proto.ink}</dd>
            </div>
            <div>
              <dt>Use</dt>
              <dd>{proto.use}</dd>
            </div>
            <div>
              <dt>Field</dt>
              <dd>{proto.field}</dd>
            </div>
          </dl>
        </section>
      </main>
    </div>
  );
}
