import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { afterEach, beforeEach, afterAll, beforeAll, describe, expect, it } from "vitest";

import { Tab, TabList, TabPanel, Tabs } from "../src/components/tabs";
import { Split } from "../src/components/resizable";
import { Breadcrumbs } from "../src/components/breadcrumbs";
import { CrumbBar } from "../src/components/crumb-bar";
import { ThemeToggle } from "../src/components/theme-toggle";
import { Carousel, CarouselSlide } from "../src/components/carousel";
import { ScrollArea } from "../src/components/scroll-area";
import { Avatar } from "../src/components/avatar";
import { Alert } from "../src/components/alert";
import { NavigationMenu } from "../src/components/navigation-menu";
import { Sidebar, SidebarItem, SidebarNav } from "../src/components/sidebar";
import { DataTable } from "../src/components/data-table";
import { Checkbox } from "../src/components/checkbox";
import { Switch } from "../src/components/switch";
import { Pagination } from "../src/components/pagination";
import { LineChart } from "../src/components/charts/line";
import { BarChart } from "../src/components/charts/bar";
import { Donut, Share } from "../src/components/charts/donut";
import { Sparkline } from "../src/components/charts/sparkline";
import { defaultFormat } from "../src/components/charts/frame";

afterEach(cleanup);

/* test/setup.ts registers the matcher at runtime; this keeps the call typed without a module augmentation. */
async function expectNoViolations(el: Element) {
  const results = await axe(el, { rules: { "color-contrast": { enabled: false } } });
  (expect(results) as unknown as { toHaveNoViolations(): void }).toHaveNoViolations();
}

/* jsdom has neither; the components feature-detect both. */
class ResizeObserverStub {
  static instances: ResizeObserverStub[] = [];
  callback: ResizeObserverCallback;
  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
    ResizeObserverStub.instances.push(this);
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

function stubMatchMedia(matches: (query: string) => boolean) {
  const original = window.matchMedia;
  window.matchMedia = (query: string) =>
    ({
      matches: matches(query),
      media: query,
      onchange: null,
      addEventListener() {},
      removeEventListener() {},
      addListener() {},
      removeListener() {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
  return () => {
    window.matchMedia = original;
  };
}

describe("Tabs keyboard", () => {
  function Fixture({ orientation }: { orientation?: "horizontal" | "vertical" }) {
    return (
      <Tabs defaultValue="a">
        <TabList orientation={orientation} aria-label="Sections">
          <Tab value="a">A</Tab>
          <Tab value="b">B</Tab>
          <Tab value="c">C</Tab>
        </TabList>
        <TabPanel value="a">PA</TabPanel>
        <TabPanel value="b">PB</TabPanel>
        <TabPanel value="c">PC</TabPanel>
      </Tabs>
    );
  }

  it("jumps with Home and End", async () => {
    const user = userEvent.setup();
    const { container } = render(<Fixture />);
    screen.getByRole("tab", { name: "A" }).focus();
    await user.keyboard("{End}");
    expect(screen.getByRole("tab", { name: "C" }).getAttribute("aria-selected")).toBe("true");
    expect(document.activeElement).toBe(screen.getByRole("tab", { name: "C" }));
    await user.keyboard("{Home}");
    expect(screen.getByRole("tab", { name: "A" }).getAttribute("aria-selected")).toBe("true");
    await expectNoViolations(container);
  });

  it("answers Up/Down when vertical and exposes the orientation", async () => {
    const user = userEvent.setup();
    render(<Fixture orientation="vertical" />);
    expect(screen.getByRole("tablist").getAttribute("aria-orientation")).toBe("vertical");
    expect(screen.getByRole("tablist").className).toContain("rs-tabs-vertical");
    screen.getByRole("tab", { name: "A" }).focus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("tab", { name: "B" }).getAttribute("aria-selected")).toBe("true");
    await user.keyboard("{ArrowUp}");
    expect(screen.getByRole("tab", { name: "A" }).getAttribute("aria-selected")).toBe("true");
  });
});

describe("Split keyboard", () => {
  it("steps with arrows, jumps with Home/End, and reports its range", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Split initial={50} min={20} max={80}>
        <p>Left</p>
        <p>Right</p>
      </Split>,
    );
    const handle = screen.getByRole("separator", { name: "Resize panes" });
    expect(handle.getAttribute("aria-orientation")).toBe("vertical");
    expect(handle.getAttribute("aria-valuemin")).toBe("20");
    expect(handle.getAttribute("aria-valuemax")).toBe("80");
    expect(handle.getAttribute("aria-valuenow")).toBe("50");
    handle.focus();
    await user.keyboard("{ArrowRight}");
    expect(handle.getAttribute("aria-valuenow")).toBe("52");
    await user.keyboard("{ArrowLeft}{ArrowLeft}");
    expect(handle.getAttribute("aria-valuenow")).toBe("48");
    await user.keyboard("{End}");
    expect(handle.getAttribute("aria-valuenow")).toBe("80");
    await user.keyboard("{Home}");
    expect(handle.getAttribute("aria-valuenow")).toBe("20");
    await expectNoViolations(container);
  });

  it("turns horizontal and answers Up/Down once the layout stacks", async () => {
    const restore = stubMatchMedia((q) => q === "(max-width: 640px)");
    try {
      const user = userEvent.setup();
      render(
        <Split>
          <p>Top</p>
          <p>Bottom</p>
        </Split>,
      );
      const handle = screen.getByRole("separator");
      expect(handle.getAttribute("aria-orientation")).toBe("horizontal");
      handle.focus();
      await user.keyboard("{ArrowDown}");
      expect(handle.getAttribute("aria-valuenow")).toBe("52");
      await user.keyboard("{ArrowUp}");
      expect(handle.getAttribute("aria-valuenow")).toBe("50");
    } finally {
      restore();
    }
  });
});

describe("Breadcrumbs", () => {
  it("is an ordered list in a labelled nav with the page marked current", async () => {
    const { container } = render(
      <Breadcrumbs items={[{ label: "Studio", href: "/" }, { label: "Raster", href: "/r" }, { label: "Issue 03" }]} />,
    );
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    const list = within(nav).getByRole("list");
    expect(list.tagName).toBe("OL");
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(screen.getByText("Issue 03").getAttribute("aria-current")).toBe("page");
    expect(screen.getByRole("link", { name: "Studio" }).getAttribute("aria-current")).toBeNull();
    await expectNoViolations(container);
  });

  it("keeps the crumb-bar trail inert until it shows", async () => {
    const { container } = render(<CrumbBar trail={[{ label: "Raster", href: "/" }, { label: "Components" }]} />);
    const trail = container.querySelector("ol.rs-crumb-crumbs")!;
    expect(trail.hasAttribute("inert")).toBe(true);
    Object.defineProperty(window, "scrollY", { value: 300, configurable: true });
    fireEvent.scroll(window);
    expect(trail.hasAttribute("inert")).toBe(false);
    expect(screen.getByText("Components").getAttribute("aria-current")).toBe("page");
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeTruthy();
    Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
    await expectNoViolations(container);
  });
});

describe("ThemeToggle", () => {
  afterEach(() => {
    delete document.documentElement.dataset.theme;
  });

  it("names the action it will take, so the name carries the state", async () => {
    const user = userEvent.setup();
    const { container } = render(<ThemeToggle />);
    const button = screen.getByRole("button", { name: "Switch to dark scheme" });
    await user.click(button);
    expect(screen.getByRole("button", { name: "Switch to light scheme" })).toBe(button);
    expect(document.documentElement.dataset.theme).toBe("dark");
    await expectNoViolations(container);
  });
});

describe("Carousel and ScrollArea", () => {
  it("names the focusable carousel region and numbers its slides", async () => {
    const { container } = render(
      <Carousel aria-label="Sheets">
        <CarouselSlide>One</CarouselSlide>
        <CarouselSlide>Two</CarouselSlide>
        <CarouselSlide aria-label="The last">Three</CarouselSlide>
      </Carousel>,
    );
    const region = screen.getByRole("region", { name: "Sheets" });
    expect(region.getAttribute("tabindex")).toBe("0");
    expect(region.getAttribute("aria-roledescription")).toBe("carousel");
    expect(screen.getByRole("group", { name: "1 of 3" }).getAttribute("aria-roledescription")).toBe("slide");
    expect(screen.getByRole("group", { name: "2 of 3" })).toBeTruthy();
    expect(screen.getByRole("group", { name: "The last" })).toBeTruthy();
    await expectNoViolations(container);
  });

  it("defaults the carousel name", () => {
    render(
      <Carousel>
        <div>A</div>
      </Carousel>,
    );
    expect(screen.getByRole("region", { name: "Carousel" })).toBeTruthy();
  });

  it("makes the scroll area a named region", async () => {
    const { container } = render(
      <>
        <ScrollArea>
          <p>Alkmaar</p>
        </ScrollArea>
        <ScrollArea aria-label="Towns">
          <p>Delft</p>
        </ScrollArea>
      </>,
    );
    expect(screen.getByRole("region", { name: "Scrollable content" }).getAttribute("tabindex")).toBe("0");
    expect(screen.getByRole("region", { name: "Towns" })).toBeTruthy();
    await expectNoViolations(container);
  });
});

describe("Avatar", () => {
  it("names the image from name, then initials, and allows a decorative alt", async () => {
    const { container } = render(
      <>
        <Avatar src="/a.png" name="Renn" />
        <Avatar src="/b.png" initials="RV" />
        <Avatar src="/c.png" name="Koen" alt="" />
        <Avatar name="Jenny" initials="JV" />
        <Avatar initials="AB" />
      </>,
    );
    expect(screen.getByRole("img", { name: "Renn" }).tagName).toBe("IMG");
    expect(screen.getByRole("img", { name: "RV" }).tagName).toBe("IMG");
    expect(container.querySelector('img[src="/c.png"]')?.getAttribute("alt")).toBe("");
    expect(screen.getByRole("img", { name: "Jenny" }).textContent).toBe("JV");
    expect(screen.getByText("AB").getAttribute("role")).toBeNull();
    await expectNoViolations(container);
  });
});

describe("Alert", () => {
  it("is a note by default and live only when asked", async () => {
    const { container } = render(
      <>
        <Alert title="Static">Copy</Alert>
        <Alert live="polite" title="Saved">
          Copy
        </Alert>
        <Alert live="assertive" title="Failed">
          Copy
        </Alert>
      </>,
    );
    expect(screen.getByRole("note")).toBeTruthy();
    expect(screen.getByRole("status")).toBeTruthy();
    expect(screen.getByRole("alert")).toBeTruthy();
    await expectNoViolations(container);
  });
});

describe("Landmarks and tables", () => {
  it("labels navigation landmarks by default", async () => {
    const { container } = render(
      <>
        <NavigationMenu items={[{ label: "Work", href: "/work", current: true }]} />
        <NavigationMenu aria-label="Footer" items={[{ label: "About", href: "/about" }]} />
        <Sidebar>
          <SidebarNav>
            <SidebarItem href="/">Home</SidebarItem>
          </SidebarNav>
        </Sidebar>
      </>,
    );
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeTruthy();
    expect(screen.getByRole("navigation", { name: "Footer" })).toBeTruthy();
    expect(screen.getByRole("navigation", { name: "Sidebar" })).toBeTruthy();
    await expectNoViolations(container);
  });

  it("shows a neutral sort mark until a column sorts, and keeps aria-sort", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <DataTable
        columns={[
          { key: "name", header: "Name", sortable: true },
          { key: "n", header: "Count", sortable: true },
        ]}
        rows={[
          { name: "Raster", n: 2 },
          { name: "Studio", n: 1 },
        ]}
      />,
    );
    const nameHeader = screen.getByRole("columnheader", { name: /Name/ });
    expect(nameHeader.getAttribute("aria-sort")).toBeNull();
    /* The "sort" mark is three shortening rules; an active column shows an arrow instead. */
    const sortMarks = () => container.querySelectorAll('path[d="M3.5 4.5 H12.5"]');
    expect(sortMarks()).toHaveLength(2);
    await user.click(screen.getByRole("button", { name: /Name/ }));
    expect(nameHeader.getAttribute("aria-sort")).toBe("ascending");
    expect(sortMarks()).toHaveLength(1);
    expect(container.querySelector(".rs-datatable-sort-icon-on")).toBeTruthy();
    await expectNoViolations(container);
  });

  it("keeps the simple controls clean", async () => {
    const { container } = render(
      <>
        <Checkbox label="Brand" />
        <Switch aria-label="Notifications" />
        <Pagination page={2} count={5} />
      </>,
    );
    await expectNoViolations(container);
  });
});

describe("Charts", () => {
  it("formats numbers with Intl and compacts thousands", () => {
    expect(defaultFormat(72)).toBe("72");
    expect(defaultFormat(72.25)).toBe("72.3");
    expect(defaultFormat(1200, undefined, "en")).toBe("1.2K");
    expect(defaultFormat(1200, "kg", "en")).toBe("1.2K kg");
    expect(defaultFormat(72.25, undefined, "de")).toBe("72,3");
  });

  it("gives Share, Donut, and Sparkline a screen-reader table and a full name", async () => {
    const { container } = render(
      <>
        <Share
          slices={[
            { label: "Sheet", value: 72 },
            { label: "Proof", value: 18 },
            { label: "Waste", value: 10 },
          ]}
        />
        <Donut value={72} max={100} label="printed" />
        <Sparkline values={[1, 3, 5]} label="Runs" />
      </>,
    );
    const tables = screen.getAllByRole("table");
    expect(tables).toHaveLength(3);
    expect(screen.getByRole("img", { name: "Share: Sheet 72%, Proof 18%, Waste 10%" })).toBeTruthy();
    expect(within(tables[0]!).getByRole("rowheader", { name: "Sheet" })).toBeTruthy();
    expect(screen.getByRole("img", { name: /printed/ }).getAttribute("aria-labelledby")).toBeTruthy();
    expect(within(tables[1]!).getByText("72%")).toBeTruthy();
    expect(screen.getByRole("img", { name: "Runs: trend of 3 values ending at 5" })).toBeTruthy();
    expect(within(tables[2]!).getByRole("columnheader", { name: "Runs" })).toBeTruthy();
    await expectNoViolations(container);
  });

  describe("with a ResizeObserver", () => {
    beforeAll(() => {
      (globalThis as { ResizeObserver?: unknown }).ResizeObserver = ResizeObserverStub;
    });
    afterAll(() => {
      delete (globalThis as { ResizeObserver?: unknown }).ResizeObserver;
    });
    beforeEach(() => {
      ResizeObserverStub.instances = [];
    });

    it("composes the plot name from the title and lays out in the measured width", () => {
      const { container } = render(
        <LineChart yLabel="Sheets per day" labels={["Mon", "Tue"]} series={[{ name: "Sheets", values: [12, 18] }]} />,
      );
      expect(screen.getByRole("group", { name: "Sheets per day" }).tagName).toBe("svg");
      expect(ResizeObserverStub.instances).toHaveLength(1);
      const svg = container.querySelector("svg.rs-chart-svg")!;
      expect(svg.getAttribute("viewBox")).toBe("0 0 408 204");
    });

    it("moves the cursor and tooltip with the keyboard", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <LineChart labels={["Mon", "Tue", "Wed"]} unit="sheets" series={[{ name: "Sheets", values: [12, 18, 9] }]} />,
      );
      const plot = screen.getByRole("group", { name: "Line chart of Sheets, in sheets" });
      expect(plot.getAttribute("tabindex")).toBe("0");
      expect(plot.getAttribute("aria-roledescription")).toBe("interactive chart");
      expect(container.querySelector(".rs-chart-tip")).toBeNull();
      (plot as unknown as HTMLElement).focus();
      await user.keyboard("{ArrowRight}");
      expect(container.querySelector(".rs-chart-tip")?.textContent).toContain("Mon");
      expect(container.querySelector(".rs-chart-tip")?.textContent).toContain("12 sheets");
      await user.keyboard("{ArrowRight}");
      expect(container.querySelector(".rs-chart-tip")?.textContent).toContain("Tue");
      await user.keyboard("{End}");
      expect(container.querySelector(".rs-chart-tip")?.textContent).toContain("Wed");
      await user.keyboard("{Home}");
      expect(container.querySelector(".rs-chart-tip")?.textContent).toContain("Mon");
      await user.keyboard("{Escape}");
      expect(container.querySelector(".rs-chart-tip")).toBeNull();
      await expectNoViolations(container);
    });

    it("does the same for bars and never names a bare kind", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <BarChart
          data={[
            { label: "Alkmaar", value: 42 },
            { label: "Delft", value: 28 },
          ]}
        />,
      );
      const plot = screen.getByRole("group", { name: "Bar chart of Value" });
      (plot as unknown as HTMLElement).focus();
      await user.keyboard("{End}");
      expect(container.querySelector(".rs-chart-tip")?.textContent).toContain("Delft");
      await expectNoViolations(container);
    });
  });
});
