import Link from "next/link";
import { person } from "@/app/about/facts";
import { DOOR, WORD } from "@/app/specimen";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <nav className="site-footer-nav" aria-label="Footer">
          <Link href="/">{WORD}</Link>
          <Link href="/about/">About</Link>
          <Link href="/docs/">Docs</Link>
          <a href={person.repo}>GitHub</a>
          <a href={DOOR}>getraster.com</a>
        </nav>
        <p className="site-footer-imprint">MIT</p>
      </div>
    </footer>
  );
}
