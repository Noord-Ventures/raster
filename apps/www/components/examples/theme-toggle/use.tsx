import { ThemeToggle } from "@noorddev/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="theme-toggle">
      <h3 className="rs-use-type">Sun</h3>
      <div className="rs-use-body">
        <p className="rs-use-kicker">Paper / black</p>
        <p className="rs-use-copy">The choice stays. The grid does not move.</p>
        <ThemeToggle />
      </div>
    </article>
  );
}
