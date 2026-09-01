import Link from "next/link";
import { person } from "@/app/about/facts";
import { DOOR, WORD } from "@/app/specimen";
import { RasterMark } from "./raster-mark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand" aria-hidden="true">
          <RasterMark />
        </div>
        <nav className="site-footer-nav" aria-label="Footer">
          <Link href="/">{WORD}</Link>
          <Link href="/about/">About</Link>
          <Link href="/docs/">Docs</Link>
          <a href={person.repo}>GitHub</a>
          <a href={DOOR}>getraster.com</a>
        </nav>
        <div className="site-footer-about">
          <p>Raster is built and designed in the north by Noord.</p>
          <p>Inspired by Dutch and Swiss modernism — the International Typographic Style.</p>
          <p>Free and open source under the MIT license.</p>
        </div>
      </div>
    </footer>
  );
}
