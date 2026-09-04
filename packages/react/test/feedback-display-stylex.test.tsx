import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("../src/components/icon", () => ({
  Icon: () => null,
}));

import { Alert } from "../src/components/alert";
import { Avatar, AvatarRow } from "../src/components/avatar";
import { Badge } from "../src/components/badge";
import { Empty } from "../src/components/empty";
import { Item } from "../src/components/item";
import { Kbd } from "../src/components/kbd";
import { Progress } from "../src/components/progress";
import { Separator } from "../src/components/separator";
import { Skeleton } from "../src/components/skeleton";
import { Spinner } from "../src/components/spinner";
import { toast, Toaster } from "../src/components/toast";
import { Tooltip } from "../src/components/tooltip";

afterEach(cleanup);

describe("StyleX feedback/display leaves", () => {
  it("keeps alert classes and the solid variant", () => {
    render(
      <Alert title="Note" variant="solid">
        Body
      </Alert>,
    );
    expect(screen.getByRole("note").className).toContain("rs-alert");
    expect(screen.getByRole("note").className).toContain("rs-alert-solid");
    expect(screen.getByText("Note").className).toContain("rs-alert-title");
    expect(screen.getByText("Body").className).toContain("rs-alert-body");
  });

  it("keeps the three badge class names", () => {
    render(
      <>
        <Badge>A</Badge>
        <Badge variant="solid">B</Badge>
        <Badge variant="muted">C</Badge>
      </>,
    );
    expect(screen.getByText("A").className).toContain("rs-badge");
    expect(screen.getByText("B").className).toContain("rs-badge-solid");
    expect(screen.getByText("C").className).toContain("rs-badge-muted");
  });

  it("keeps the percentage in the progress label", () => {
    render(<Progress label="Uploading" value={40} />);
    const bar = screen.getByRole("progressbar");
    expect(bar.className).toContain("rs-progress");
    expect(bar.getAttribute("aria-valuenow")).toBe("40");
    expect(screen.getByText("40%")).toBeTruthy();
    expect(bar.textContent).not.toContain("40%");
  });

  it("keeps the skeleton class", () => {
    render(<Skeleton data-testid="sk" />);
    expect(screen.getByTestId("sk").className).toContain("rs-skeleton");
  });

  it("exposes spinner status and a 1px ring", () => {
    const { container } = render(<Spinner label="Loading" />);
    expect(screen.getByRole("status", { name: "Loading" }).className).toContain("rs-spinner");
    const ring = container.querySelector("circle");
    expect(ring?.getAttribute("stroke-width")).toBe("1");
    expect(ring?.getAttribute("stroke-linecap")).toBe("butt");
    expect(ring?.getAttribute("r")).toBe("6.5");
  });

  it("renders a vacant empty cell", () => {
    render(
      <Empty title="No projects yet" action={<button type="button">New</button>}>
        Start one.
      </Empty>,
    );
    expect(document.querySelector(".rs-empty")?.className).toContain("rs-empty");
    expect(screen.getByText("No projects yet").className).toContain("rs-empty-title");
    expect(screen.getByText("Start one.").className).toContain("rs-empty-body");
    expect(document.querySelector(".rs-empty-action")?.className).toContain("rs-empty-action");
  });

  it("keeps data-tip on the tooltip trigger", () => {
    render(<Tooltip tip="Hint">Hover</Tooltip>);
    expect(screen.getByText("Hover").className).toContain("rs-tip");
    expect(screen.getByText("Hover").getAttribute("data-tip")).toBe("Hint");
  });

  it("renders a toast from the imperative helper", () => {
    render(<Toaster />);
    expect(document.querySelector(".rs-toasts")?.className).toContain("rs-toasts");
    act(() => {
      toast("Saved", { description: "Done" });
    });
    expect(document.querySelector(".rs-toast")?.className).toContain("rs-toast");
    expect(screen.getByText("Saved").className).toContain("rs-toast-title");
    expect(screen.getByText("Done").className).toContain("rs-toast-body");
  });

  it("keeps the kbd class", () => {
    render(<Kbd>⌘</Kbd>);
    expect(screen.getByText("⌘").className).toContain("rs-kbd");
  });

  it("keeps avatar size classes and row overlap", () => {
    render(
      <AvatarRow>
        <Avatar initials="NV" />
        <Avatar initials="AB" size="sm" />
        <Avatar initials="LG" size="lg" />
      </AvatarRow>,
    );
    expect(document.querySelector(".rs-avatar-row")?.className).toContain("rs-avatar-row");
    expect(screen.getByText("NV").className).toContain("rs-avatar");
    expect(screen.getByText("AB").className).toContain("rs-avatar-sm");
    expect(screen.getByText("LG").className).toContain("rs-avatar-lg");
  });

  it("keeps item row classes", () => {
    render(<Item title="Row" description="Note" meta="Meta" />);
    expect(document.querySelector(".rs-item")?.className).toContain("rs-item");
    expect(screen.getByText("Row").className).toContain("rs-item-title");
    expect(screen.getByText("Note").className).toContain("rs-item-desc");
    expect(screen.getByText("Meta").className).toContain("rs-item-meta");
  });

  it("keeps separator orientation classes", () => {
    const { container } = render(
      <>
        <Separator />
        <Separator orientation="vertical" />
      </>,
    );
    expect(container.querySelector(".rs-sep")?.className).toContain("rs-sep");
    expect(container.querySelector(".rs-sep-v")?.className).toContain("rs-sep-v");
  });
});
