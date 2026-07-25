import * as React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  Badge,
  CrumbBar,
  Button,
  Checkbox,
  InlineForm,
  Pagination,
  Progress,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Stepper,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "../src";

afterEach(cleanup);

describe("Button", () => {
  it("maps variants and sizes to Raster classes", () => {
    render(
      <>
        <Button>Go</Button>
        <Button variant="ghost" size="sm">
          Quiet
        </Button>
      </>,
    );
    expect(screen.getByRole("button", { name: "Go" }).className).toBe("rs-btn-primary");
    expect(screen.getByRole("button", { name: "Quiet" }).className).toBe("rs-btn-ghost rs-btn-sm");
  });

  it("defaults to type=button so it never submits forms by accident", () => {
    render(<Button>Go</Button>);
    expect(screen.getByRole("button")).toHaveProperty("type", "button");
  });
});

describe("Badge", () => {
  it("renders the three variants", () => {
    render(
      <>
        <Badge>A</Badge>
        <Badge variant="solid">B</Badge>
        <Badge variant="muted">C</Badge>
      </>,
    );
    expect(screen.getByText("A").className).toBe("rs-badge");
    expect(screen.getByText("B").className).toBe("rs-badge-solid");
    expect(screen.getByText("C").className).toBe("rs-badge-muted");
  });
});

describe("Switch", () => {
  it("toggles uncontrolled state with role=switch", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Switch aria-label="Notifications" onCheckedChange={onChange} />);
    const el = screen.getByRole("switch", { name: "Notifications" });
    expect(el.getAttribute("aria-checked")).toBe("false");
    await user.click(el);
    expect(el.getAttribute("aria-checked")).toBe("true");
    expect(el.className).toContain("rs-switch-on");
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("stays controlled when checked is passed", async () => {
    const user = userEvent.setup();
    render(<Switch aria-label="X" checked={false} />);
    const el = screen.getByRole("switch");
    await user.click(el);
    expect(el.getAttribute("aria-checked")).toBe("false");
  });
});

describe("Checkbox", () => {
  it("is a real native checkbox with a mirrored box", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Brand" />);
    const box = screen.getByRole("checkbox", { name: "Brand" });
    await user.click(box);
    expect((box as HTMLInputElement).checked).toBe(true);
  });
});

describe("RadioGroup", () => {
  it("selects one value at a time", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <RadioGroup defaultValue="monthly" onValueChange={onChange}>
        <Radio value="monthly" label="Monthly" />
        <Radio value="yearly" label="Yearly" />
      </RadioGroup>,
    );
    await user.click(screen.getByRole("radio", { name: "Yearly" }));
    expect(onChange).toHaveBeenCalledWith("yearly");
    expect((screen.getByRole("radio", { name: "Yearly" }) as HTMLInputElement).checked).toBe(true);
    expect((screen.getByRole("radio", { name: "Monthly" }) as HTMLInputElement).checked).toBe(false);
  });
});

describe("Slider", () => {
  it("drives fill width from a native range input", () => {
    const { container } = render(<Slider defaultValue={62} aria-label="Volume" />);
    const fill = container.querySelector<HTMLElement>(".rs-slider-fill");
    expect(fill?.style.width).toBe("62%");
    expect(screen.getByRole("slider", { name: "Volume" })).toBeTruthy();
  });
});

describe("Progress", () => {
  it("exposes progressbar semantics and keeps the number in the label", () => {
    render(<Progress label="Uploading" value={40} />);
    const bar = screen.getByRole("progressbar");
    expect(bar.getAttribute("aria-valuenow")).toBe("40");
    expect(screen.getByText("40%")).toBeTruthy();
    expect(bar.textContent).not.toContain("40%");
  });
});

describe("Tabs", () => {
  it("wires tab/panel semantics and switches on click", async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="overview">
        <TabList>
          <Tab value="overview">Overview</Tab>
          <Tab value="activity">Activity</Tab>
        </TabList>
        <TabPanel value="overview">First</TabPanel>
        <TabPanel value="activity">Second</TabPanel>
      </Tabs>,
    );
    expect(screen.getByRole("tab", { name: "Overview" }).getAttribute("aria-selected")).toBe("true");
    await user.click(screen.getByRole("tab", { name: "Activity" }));
    expect(screen.getByRole("tab", { name: "Activity" }).getAttribute("aria-selected")).toBe("true");
    expect(screen.getByText("Second").hidden).toBe(false);
    expect(screen.getByText("First").hidden).toBe(true);
  });

  it("moves selection with arrow keys", async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="a">
        <TabList>
          <Tab value="a">A</Tab>
          <Tab value="b">B</Tab>
        </TabList>
        <TabPanel value="a">PA</TabPanel>
        <TabPanel value="b">PB</TabPanel>
      </Tabs>,
    );
    screen.getByRole("tab", { name: "A" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "B" }).getAttribute("aria-selected")).toBe("true");
  });
});

describe("Select", () => {
  const options = [
    { value: "alkmaar", label: "Alkmaar" },
    { value: "amsterdam", label: "Amsterdam" },
  ];

  it("opens a listbox and selects an option", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select options={options} onValueChange={onChange} />);
    await user.click(screen.getByRole("button"));
    await user.click(screen.getByRole("option", { name: "Amsterdam" }));
    expect(onChange).toHaveBeenCalledWith("amsterdam");
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(screen.getByRole("button").textContent).toContain("Amsterdam");
  });

  it("supports keyboard: open, arrow, enter", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select options={options} onValueChange={onChange} />);
    screen.getByRole("button").focus();
    await user.keyboard("{ArrowDown}{ArrowDown}{Enter}");
    expect(onChange).toHaveBeenCalledWith("amsterdam");
  });
});

describe("Pagination", () => {
  it("marks the current page and windows long ranges", () => {
    render(<Pagination page={5} count={20} />);
    const current = screen.getByRole("button", { name: "5" });
    expect(current.className).toContain("rs-page-on");
    expect(current.getAttribute("aria-current")).toBe("page");
    expect(screen.getAllByText("…").length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: "20" })).toBeTruthy();
  });
});

describe("Stepper", () => {
  it("marks done and active steps", () => {
    const { container } = render(
      <Stepper steps={[{ name: "Brief" }, { name: "Design" }, { name: "Build" }]} current={1} />,
    );
    const dots = container.querySelectorAll(".rs-step-dot");
    expect(dots[0]?.className).toContain("rs-step-done");
    expect(dots[1]?.className).toContain("rs-step-active");
    expect(dots[2]?.className).not.toContain("rs-step-active");
  });
});

describe("CrumbBar", () => {
  it("solidifies and reveals the crumbs on scroll", () => {
    const { container } = render(
      <CrumbBar trail={[{ label: "Raster", href: "/" }, { label: "Components" }]} />,
    );
    const bar = container.querySelector(".rs-crumb-bar")!;
    expect(bar.className).not.toContain("rs-crumb-bar-scrolled");
    Object.defineProperty(window, "scrollY", { value: 300, configurable: true });
    fireEvent.scroll(window);
    expect(bar.className).toContain("rs-crumb-bar-scrolled");
    expect(screen.getByText("Components").className).toBe("rs-crumbs-here");
    Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
  });
});

describe("InlineForm", () => {
  it("reveals the action only once input validates, then confirms", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const { container } = render(<InlineForm onSubmit={onSubmit} />);
    const reveal = () => container.querySelector(".rs-reveal");
    expect(reveal()?.className).not.toContain("rs-reveal-in");
    await user.type(screen.getByPlaceholderText("Your e-mail"), "renn@noord.vc");
    expect(reveal()?.className).toContain("rs-reveal-in");
    await user.click(screen.getByRole("button", { name: "Subscribe" }));
    expect(onSubmit).toHaveBeenCalledWith("renn@noord.vc");
    expect(screen.getByText("You're on the list")).toBeTruthy();
  });
});
