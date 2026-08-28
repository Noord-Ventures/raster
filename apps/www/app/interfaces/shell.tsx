import type { ReactNode } from "react";
import { type InterfaceSlug, interfaceBySlug } from "./catalog";
import { InterfacesNav } from "./nav";

export function InterfaceShell({ slug, children }: { slug: InterfaceSlug; children: ReactNode }) {
  const proto = interfaceBySlug(slug)!;
  return (
    <div className="if-index">
      <InterfacesNav />
      <main className="site-content-wide">
        <div className="if-specimen">{children}</div>
        <section className="if-matter" aria-labelledby={`${slug}-name`}>
          <p className="if-voice">{proto.voice}</p>
          <h1 id={`${slug}-name`} className="rs-t-display">
            {proto.title}
          </h1>
          <p className="if-story">{proto.story}</p>
          <p className="if-story if-story-2">{proto.note}</p>
          <dl className="if-meta">
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
