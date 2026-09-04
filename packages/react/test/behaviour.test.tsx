import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Histogram } from "../src/components/charts/histogram";
import { SmallMultiples } from "../src/components/charts/multiples";
import { ScatterChart } from "../src/components/charts/scatter";
import { InputOTP } from "../src/components/input-otp";
import { Popover, PopoverBody, PopoverTitle } from "../src/components/popover";

async function noViolations(el: Element) {
  // jsdom has no canvas, so axe cannot measure contrast here; the palette is checked in core.
  expect(await axe(el, { rules: { "color-contrast": { enabled: false } } })).toHaveNoViolations();
}

afterEach(cleanup);

describe("Popover", () => {
  it("wires the trigger to a popover=auto panel and mirrors its open state", async () => {
    const onToggle = vi.fn();
    const { container } = render(
      <Popover trigger="Details" onToggle={onToggle}>
        <PopoverTitle>Print run</PopoverTitle>
        <PopoverBody>Issue 03 goes on the press at 06:00.</PopoverBody>
      </Popover>,
    );
    const trigger = screen.getByRole("button", { name: "Details" });
    const panel = container.querySelector<HTMLElement>("[popover]");
    expect(panel).not.toBeNull();
    expect(panel?.getAttribute("popover")).toBe("auto");
    expect(trigger.getAttribute("popovertarget")).toBe(panel?.id);
    expect(panel?.id).toBeTruthy();

    /* jsdom has no Popover API; the toggle event is what the platform dispatches. */
    const openEvent = new Event("toggle") as Event & { newState: string; oldState: string };
    Object.assign(openEvent, { newState: "open", oldState: "closed" });
    fireEvent(panel as HTMLElement, openEvent);
    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(panel?.getAttribute("data-open")).not.toBe("false");

    await noViolations(container);
  });
});

describe("InputOTP", () => {
  it("advances on digits, retreats on Backspace, and reports completion", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onComplete = vi.fn();
    const { container } = render(<InputOTP length={4} onChange={onChange} onComplete={onComplete} />);
    const group = screen.getByRole("group", { name: "One-time code" });
    const cells = within(group).getAllByRole("textbox");
    expect(cells).toHaveLength(4);
    expect(cells.map((c) => c.getAttribute("aria-label"))).toEqual(["Digit 1", "Digit 2", "Digit 3", "Digit 4"]);
    expect(cells[0]!.getAttribute("inputmode")).toBe("numeric");

    await user.click(cells[0]!);
    await user.keyboard("12");
    expect(document.activeElement).toBe(cells[2]);
    expect(onChange).toHaveBeenLastCalledWith("12");

    /* Backspace on an empty cell steps back and clears the previous digit. */
    await user.keyboard("{Backspace}");
    expect(document.activeElement).toBe(cells[1]);
    expect((cells[1] as HTMLInputElement).value).toBe("");

    await user.keyboard("{ArrowRight}");
    expect(document.activeElement).toBe(cells[2]);
    await user.keyboard("{ArrowLeft}");
    expect(document.activeElement).toBe(cells[1]);

    await user.keyboard("234");
    expect(onComplete).toHaveBeenCalledWith("1234");
    await noViolations(container);
  });

  it("fills every cell from a paste", async () => {
    const onComplete = vi.fn();
    render(<InputOTP length={6} onComplete={onComplete} />);
    const cells = screen.getAllByRole("textbox");
    cells[0]!.focus();
    fireEvent.paste(cells[0]!, { clipboardData: { getData: () => "98 76-54" } });
    expect(cells.map((c) => (c as HTMLInputElement).value).join("")).toBe("987654");
    expect(onComplete).toHaveBeenCalledWith("987654");
  });
});

describe("Charts without a pixel pipeline", () => {
  it("Histogram names its plot and carries a screen-reader table", async () => {
    const { container } = render(
      <Histogram
        bins={[
          { label: "0-9", count: 4 },
          { label: "10-19", count: 12 },
          { label: "20-29", count: 7 },
        ]}
        unit="orders"
      />,
    );
    const table = container.querySelector("table");
    expect(table).not.toBeNull();
    expect(within(table as HTMLTableElement).getAllByRole("row").length).toBeGreaterThanOrEqual(4);
    expect(within(table as HTMLTableElement).getByText("10-19")).toBeTruthy();
    expect(container.querySelector("svg[aria-label], svg[aria-labelledby]")).not.toBeNull();
    await noViolations(container);
  });

  it("ScatterChart renders every point, annotations, and a table", async () => {
    const { container } = render(
      <ScatterChart
        points={[
          { x: 1, y: 2 },
          { x: 2, y: 3 },
          { x: 3, y: 5 },
        ]}
        annotations={[{ at: 2, label: "Launch" }]}
        xLabel="Week"
        yLabel="Sheets"
      />,
    );
    expect(container.querySelectorAll("circle").length).toBeGreaterThanOrEqual(3);
    expect(container.textContent).toContain("Launch");
    expect(container.querySelector("table")).not.toBeNull();
    await noViolations(container);
  });

  it("SmallMultiples renders one captioned panel per series", async () => {
    const { container } = render(
      <SmallMultiples
        panels={[
          { title: "North", series: [{ name: "Sheets", values: [1, 3, 2] }] },
          { title: "South", series: [{ name: "Sheets", values: [2, 2, 4] }] },
        ]}
      />,
    );
    expect(screen.getByText("North")).toBeTruthy();
    expect(screen.getByText("South")).toBeTruthy();
    expect(container.querySelectorAll("svg").length).toBeGreaterThanOrEqual(2);
    await noViolations(container);
  });
});
