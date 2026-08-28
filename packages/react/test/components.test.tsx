import * as React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  BarChart,
  Badge,
  Breadcrumbs,
  ButtonGroup,
  CrumbBar,
  concentricInner,
  Nest,
  NestInner,
  Button,
  Empty,
  Field,
  FieldLabel,
  LineChart,
  Form,
  Icon,
  IconCatalog,
  ICON_STROKE,
  ICON_VIEWBOX,
  iconGroups,
  iconNames,
  NativeSelect,
  Spinner,
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
    expect(document.querySelector('path[d="M3.5 8.5 L6.5 11.5 L12.5 4.5"]')).toBeTruthy();
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

describe("Icon", () => {
  it("locks a 16 viewBox, 1px currentColor hairline, butt/miter, no radius", () => {
    const { container } = render(<Icon name="copy" />);
    const svg = container.querySelector("svg");
    expect(svg?.getAttribute("viewBox")).toBe("0 0 16 16");
    expect(svg?.getAttribute("width")).toBe("16");
    expect(svg?.getAttribute("height")).toBe("16");
    expect(svg?.getAttribute("fill")).toBe("none");
    expect(svg?.getAttribute("stroke")).toBe("currentColor");
    expect(svg?.getAttribute("stroke-width")).toBe("1");
    expect(svg?.getAttribute("stroke-linecap")).toBe("butt");
    expect(svg?.getAttribute("stroke-linejoin")).toBe("miter");
    expect(svg?.classList.contains("rs-icon")).toBe(true);
    expect(container.querySelector("[rx]")).toBeNull();
    expect(ICON_STROKE).toBe(1);
    expect(ICON_VIEWBOX).toBe(16);
  });

  it("keeps the copy mark square at 12 and 16", () => {
    const { container, rerender } = render(<Icon name="copy" size={12} />);
    let svg = container.querySelector("svg");
    expect(svg?.getAttribute("width")).toBe("12");
    expect(svg?.getAttribute("height")).toBe("12");
    expect(svg?.getAttribute("viewBox")).toBe("0 0 16 16");
    rerender(<Icon name="copy" size={16} />);
    svg = container.querySelector("svg");
    expect(svg?.getAttribute("width")).toBe("16");
    expect(svg?.getAttribute("height")).toBe("16");
  });

  it("draws Vera's copy: front 7×7, exposed L, no overlap", () => {
    const { container } = render(<Icon name="copy" />);
    expect(container.querySelector('path[d="M6.5 2.5 H13.5 V9.5"]')).toBeTruthy();
    const rect = container.querySelector("rect");
    expect(rect?.getAttribute("x")).toBe("2.5");
    expect(rect?.getAttribute("y")).toBe("6.5");
    expect(rect?.getAttribute("width")).toBe("7");
    expect(rect?.getAttribute("height")).toBe("7");
    expect(container.querySelectorAll("rect")).toHaveLength(1);
  });

  it("uses one check path for copied and check", () => {
    const { container, rerender } = render(<Icon name="copied" />);
    expect(container.querySelector('path[d="M3.5 8.5 L6.5 11.5 L12.5 4.5"]')).toBeTruthy();
    rerender(<Icon name="check" />);
    expect(container.querySelector('path[d="M3.5 8.5 L6.5 11.5 L12.5 4.5"]')).toBeTruthy();
    expect(container.querySelector("svg")?.getAttribute("viewBox")).toBe("0 0 16 16");
  });

  it("keeps Vera's five paths exact", () => {
    expect(iconNames.slice(0, 5)).toEqual(["copy", "copied", "chevron-left", "chevron-right", "close"]);
    const { container } = render(
      <>
        <Icon name="chevron-left" />
        <Icon name="chevron-right" />
        <Icon name="close" />
      </>,
    );
    expect(container.querySelector('path[d="M10.5 3.5 L5.5 8 L10.5 12.5"]')).toBeTruthy();
    expect(container.querySelector('path[d="M5.5 3.5 L10.5 8 L5.5 12.5"]')).toBeTruthy();
    expect(container.querySelector('path[d="M4.5 4.5 L11.5 11.5"]')).toBeTruthy();
    expect(container.querySelector('path[d="M11.5 4.5 L4.5 11.5"]')).toBeTruthy();
  });

  it("ships a complete family on the same 16 module", () => {
    expect(iconNames.length).toBeGreaterThanOrEqual(80);
    expect(iconNames.length).toBeLessThanOrEqual(120);
    const { container } = render(
      <>
        {iconNames.map((name) => (
          <Icon key={name} name={name} size={12} />
        ))}
      </>,
    );
    const svgs = [...container.querySelectorAll("svg")];
    expect(svgs).toHaveLength(iconNames.length);
    for (const svg of svgs) {
      expect(svg.getAttribute("viewBox")).toBe("0 0 16 16");
      expect(svg.getAttribute("width")).toBe("12");
      expect(svg.getAttribute("height")).toBe("12");
      expect(svg.getAttribute("stroke-width")).toBe("1");
      expect(svg.getAttribute("stroke-linecap")).toBe("butt");
      expect(svg.querySelector("[rx]")).toBeNull();
    }
  });

  it("reuses the check for success and rotates chevron-right for up and down", () => {
    const { container, rerender } = render(<Icon name="success" />);
    expect(container.querySelector('path[d="M3.5 8.5 L6.5 11.5 L12.5 4.5"]')).toBeTruthy();
    rerender(<Icon name="chevron-down" />);
    expect(container.querySelector('path[d="M5.5 3.5 L10.5 8 L5.5 12.5"]')).toBeTruthy();
    expect(container.querySelector('g[transform="rotate(90 8 8)"]')).toBeTruthy();
    rerender(<Icon name="chevron-up" />);
    expect(container.querySelector('g[transform="rotate(270 8 8)"]')).toBeTruthy();
  });

  it("catalogs the family in sentence-case groups at 12 and 16", () => {
    const { container } = render(<IconCatalog />);
    expect(iconGroups.length).toBeGreaterThanOrEqual(8);
    expect(container.querySelector(".rs-icon-catalog")).toBeTruthy();
    expect(container.querySelector(".rs-icon-group-title")?.textContent).toBe("Navigation");
    expect(container.textContent).not.toMatch(/NAVIGATION|ACTIONS|SETTINGS/);
    const cells = container.querySelectorAll(".rs-icon-cell");
    expect(cells.length).toBeGreaterThanOrEqual(80);
    const firstPair = container.querySelector(".rs-icon-pair");
    const sizes = [...firstPair.querySelectorAll("svg")].map((svg) => svg.getAttribute("width"));
    expect(sizes).toEqual(["12", "16"]);
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

describe("Breadcrumbs", () => {
  it("keeps ancestors as trail links, not a second color", () => {
    render(<Breadcrumbs items={[{ label: "Studio", href: "/" }, { label: "Raster" }]} />);
    expect(screen.getByRole("link", { name: "Studio" }).className).toBe("rs-crumbs-link");
    expect(screen.getByText("Raster").className).toBe("rs-crumbs-here");
    expect(screen.getByText("/").className).toBe("rs-crumbs-sep");
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

describe("ButtonGroup", () => {
  it("is a group of flush actions", () => {
    render(
      <ButtonGroup>
        <Button variant="ghost">Left</Button>
        <Button variant="ghost">Right</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole("group").className).toBe("rs-btn-group");
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });
});

describe("Form and Field", () => {
  it("stacks a labeled field inside a native form", () => {
    render(
      <Form aria-label="Contact">
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <input id="name" className="rs-input" />
        </Field>
      </Form>,
    );
    expect(screen.getByRole("form", { name: "Contact" }).className).toBe("rs-form");
    expect(screen.getByLabelText("Name")).toBeTruthy();
  });
});

describe("NativeSelect", () => {
  it("is a real select with Raster chrome", () => {
    render(
      <NativeSelect aria-label="City" defaultValue="alkmaar">
        <option value="alkmaar">Alkmaar</option>
        <option value="delft">Delft</option>
      </NativeSelect>,
    );
    const el = screen.getByRole("combobox", { name: "City" }) as HTMLSelectElement;
    expect(el.className).toBe("rs-native-select");
    expect(el.value).toBe("alkmaar");
  });
});

describe("Empty", () => {
  it("renders a vacant cell", () => {
    render(<Empty title="No projects yet">Start one.</Empty>);
    expect(screen.getByText("No projects yet").className).toBe("rs-empty-title");
    expect(screen.getByText("Start one.").className).toBe("rs-empty-body");
  });
});

describe("Spinner", () => {
  it("exposes status semantics", () => {
    render(<Spinner label="Loading" />);
    expect(screen.getByRole("status", { name: "Loading" }).className).toBe("rs-spinner");
  });
});

describe("LineChart", () => {
  it("renders a hairline plot and a screen-reader table", () => {
    render(
      <LineChart
        labels={["Mon", "Tue"]}
        series={[{ name: "Sheets", values: [12, 18] }]}
      />,
    );
    expect(document.querySelector(".rs-chart-line")).toBeTruthy();
    expect(document.querySelector(".rs-chart-field")).toBeTruthy();
    expect(screen.getByRole("table")).toBeTruthy();
    expect(screen.getByText("Sheets")).toBeTruthy();
  });
});

describe("BarChart", () => {
  it("draws horizontal bars without a radius", () => {
    const { container } = render(
      <BarChart
        orientation="horizontal"
        data={[
          { label: "Alkmaar", value: 42 },
          { label: "Delft", value: 28 },
        ]}
      />,
    );
    const bars = container.querySelectorAll("rect.rs-chart-bar");
    expect(bars.length).toBe(2);
    for (const bar of bars) {
      expect(bar.getAttribute("rx")).toBeNull();
    }
  });
});

describe("Nest", () => {
  it("sets concentric custom properties and nests by subtraction", () => {
    const { container } = render(
      <Nest radius={28} pad={16}>
        <Nest pad={8}>
          <NestInner>Board</NestInner>
        </Nest>
      </Nest>,
    );
    const nests = container.querySelectorAll(".rs-nest");
    expect(nests).toHaveLength(2);
    expect((nests[0] as HTMLElement).style.getPropertyValue("--rs-out")).toBe("28px");
    expect((nests[0] as HTMLElement).style.getPropertyValue("--rs-gap")).toBe("16px");
    expect((nests[1] as HTMLElement).style.getPropertyValue("--rs-out")).toBe("12px");
    expect((nests[1] as HTMLElement).style.getPropertyValue("--rs-gap")).toBe("8px");
    expect(container.querySelector(".rs-nest-in")?.textContent).toBe("Board");
    expect(concentricInner(28, 16)).toBe(12);
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
