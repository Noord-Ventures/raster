import Link from "next/link";
import { chrome } from "@/app/site.stylex";
import { sx } from "@/lib/sx";

export default function NotFound() {
  return (
    <main id="main" {...sx("cover", chrome.cover)} aria-label="Not found">
      <h1 className="rs-t-display">Not found</h1>
      <p className="rs-t-sub">This page is not on the site.</p>
      <p className="rs-t-body">
        <Link href="/">Vlak</Link>
      </p>
    </main>
  );
}
