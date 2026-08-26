import { NavigationMenu } from "@noordvc/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="navigation-menu">
      <h3 className="rs-use-type">To</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">Go to</p>
          <p className="rs-use-copy">A line of destinations. Current is full ink.</p>
          <NavigationMenu
            items={[
              { label: "Overview", href: "/", current: true },
              { label: "Docs", href: "/docs" },
              { label: "Components", href: "/components" },
            ]}
          />
        </div>
      </div>
    </article>
  );
}
