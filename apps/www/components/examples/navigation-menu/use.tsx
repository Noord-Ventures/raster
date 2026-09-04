import { NavigationMenu } from "@noorddev/vlak-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="navigation-menu">
      <h3 className="rs-use-type">To</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">Go to</p>
          <p className="rs-use-copy">A line of destinations. Current is full ink.</p>
          <NavigationMenu
            aria-label="Studio navigation"
            items={[
              { label: "Overview", href: "/", current: true },
              { label: "Docs", href: "/docs" },
              { label: "Components", href: "/components" },
            ]}
          />
        </div>
      </div>
    </UseField>
  );
}
