import Link from "next/link";

export default function NotFound() {
  return (
    <main className="cover" aria-label="Not found">
      <h1 className="rs-t-display">Not found</h1>
      <p className="rs-t-sub">This page is not on the site.</p>
      <p className="rs-t-body">
        <Link href="/">Raster</Link>
      </p>
    </main>
  );
}
