import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { catalogComponents } from "@noorddev/raster";
import { chrome } from "@/app/site.stylex";
import { CodeBlock } from "@/components/code-block";
import { DocsNav } from "@/components/docs-nav";
import { InAction } from "@/components/examples/scene";
import { Preview } from "@/components/preview";
import { sx } from "@/lib/sx";
import { COMMAND, PACKAGES_PUBLISHED } from "../../specimen";

export function generateStaticParams() {
  return catalogComponents.map((c) => ({ name: c.name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const component = catalogComponents.find((c) => c.name === name);
  return { title: component?.title ?? "Components", description: component?.description };
}

const reactUsage: Record<string, string> = {
  button: `import { Button } from "@/components/raster/button";

<Button>Primary action</Button>
<Button variant="ghost" size="sm">Secondary</Button>`,
  callout: `import { Callout } from "@/components/raster/callout";

<Callout>
  <p><strong>Fixed fee.</strong> The number on the cover is the number on the invoice.</p>
</Callout>`,
  "button-group": `import { ButtonGroup } from "@/components/raster/button-group";
import { Button } from "@/components/raster/button";

<ButtonGroup>
  <Button variant="ghost">Left</Button>
  <Button variant="ghost">Center</Button>
  <Button variant="ghost">Right</Button>
</ButtonGroup>`,
  link: `import { Link } from "@/components/raster/link";

<Link href="#">A text link</Link>
<Link underline href="#">An in-copy link</Link>`,
  chip: `import { Chip } from "@/components/raster/chip";

<Chip>/noord-brand</Chip>`,
  table: `import { Table, TableBody, TableHead, TableRow, TableTd, TableTh } from "@/components/raster/table";

<Table>
  <TableHead>
    <TableRow>
      <TableTh>Phase</TableTh>
      <TableTh>Weeks</TableTh>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableTd>Strategy</TableTd>
      <TableTd>2</TableTd>
    </TableRow>
  </TableBody>
</Table>`,
  workflow: `import { Flow, FlowAdd, FlowBody, FlowNum, FlowStep, FlowTitle } from "@/components/raster/flow";

<Flow>
  <FlowStep>
    <FlowNum>1</FlowNum>
    <FlowTitle>Proposal</FlowTitle>
    <FlowBody>Scope, timeline, and fee on one page.</FlowBody>
  </FlowStep>
  <FlowAdd>Add a step</FlowAdd>
</Flow>`,
  assistant: `import { Assistant, AssistantMsg, AssistantReply, AssistantUserBlock } from "@/components/raster/assistant";

<Assistant>
  <AssistantMsg user>
    <AssistantUserBlock>Make the intro tighter.</AssistantUserBlock>
  </AssistantMsg>
  <AssistantReply>Done. Two sentences, same claim.</AssistantReply>
</Assistant>`,
  references: `import { Cite, CiteLink, RefAuthors, RefItem, Refs } from "@/components/raster/refs";

<p>Set in a single ink.<Cite><CiteLink href="#ref-1">1</CiteLink></Cite></p>
<Refs>
  <RefItem id="ref-1">
    <RefAuthors>Müller-Brockmann, J.</RefAuthors> Grid systems in graphic design.
  </RefItem>
</Refs>`,
  label: `import { Label } from "@/components/raster/label";

<Label htmlFor="name">Name</Label>`,
  field: `import { Field, FieldHint, FieldLabel } from "@/components/raster/field";
import { Input } from "@/components/raster/input";

<Field>
  <FieldLabel htmlFor="name">Name</FieldLabel>
  <Input plain id="name" />
  <FieldHint>As it appears on the invoice.</FieldHint>
</Field>`,
  form: `import { Form } from "@/components/raster/form";
import { Field, FieldLabel } from "@/components/raster/field";
import { Input } from "@/components/raster/input";
import { Button } from "@/components/raster/button";

<Form onSubmit={save}>
  <Field>
    <FieldLabel htmlFor="name">Name</FieldLabel>
    <Input plain id="name" />
  </Field>
  <Button type="submit">Send</Button>
</Form>`,
  "input-group": `import { InputGroup, InputAddon } from "@/components/raster/input-group";
import { Input } from "@/components/raster/input";

<InputGroup>
  <InputAddon>https://</InputAddon>
  <Input placeholder="getraster.com" />
</InputGroup>`,
  "native-select": `import { NativeSelect } from "@/components/raster/native-select";

<NativeSelect label="City" defaultValue="alkmaar">
  <option value="alkmaar">Alkmaar</option>
  <option value="amsterdam">Amsterdam</option>
</NativeSelect>`,
  item: `import { Item } from "@/components/raster/item";

<Item title="Alkmaar" description="The studio city." meta="NL" />`,
  empty: `import { Empty } from "@/components/raster/empty";
import { Button } from "@/components/raster/button";

<Empty title="No projects yet" action={<Button variant="ghost" size="sm">New project</Button>}>
  Start one. The grid is empty on purpose.
</Empty>`,
  spinner: `import { Spinner } from "@/components/raster/spinner";

<Spinner label="Loading" />`,
  drawer: `import { Drawer, DrawerBody, DrawerTitle } from "@/components/raster/drawer";

<Drawer open={open} onClose={() => setOpen(false)}>
  <DrawerTitle>Notes</DrawerTitle>
  <DrawerBody>A bottom panel. Escape closes it.</DrawerBody>
</Drawer>`,
  sidebar: `import { Sidebar, SidebarFoot, SidebarHead, SidebarItem, SidebarLabel, SidebarNav } from "@/components/raster/sidebar";

<Sidebar>
  <SidebarHead>Raster</SidebarHead>
  <SidebarNav>
    <SidebarLabel>Go to</SidebarLabel>
    <SidebarItem href="/" current>Overview</SidebarItem>
    <SidebarItem href="/docs">Docs</SidebarItem>
  </SidebarNav>
  <SidebarFoot>0.3</SidebarFoot>
</Sidebar>`,
  "toggle-group": `import { ToggleGroup } from "@/components/raster/toggle-group";

<ToggleGroup
  options={[
    { value: "left", label: "Left" },
    { value: "center", label: "Center" },
    { value: "right", label: "Right" },
  ]}
  value={align}
  onValueChange={setAlign}
/>`,
  input: `import { Input } from "@/components/raster/input";

<Input label="E-mail" placeholder="you@example.com" ok feedback="Looks good" />`,
  "inline-form": `import { InlineForm } from "@/components/raster/inline-form";

<InlineForm onSubmit={(email) => subscribe(email)} />`,
  icons: `import { Icon, IconCatalog } from "@/components/raster/icon";

<Icon name="search" size={12} />
<Icon name="search" size={16} />
<Icon name="search" size={24} />
<IconCatalog />`,
  checkbox: `import { Checkbox } from "@/components/raster/checkbox";

<Checkbox label="Brand" defaultChecked />`,
  radio: `import { Radio, RadioGroup } from "@/components/raster/radio";

<RadioGroup defaultValue="monthly" onValueChange={setPlan}>
  <Radio value="monthly" label="Monthly" />
  <Radio value="yearly" label="Yearly" />
</RadioGroup>`,
  switch: `import { Switch } from "@/components/raster/switch";

<Switch checked={enabled} onCheckedChange={setEnabled} aria-label="Notifications" />`,
  slider: `import { Slider } from "@/components/raster/slider";

<Slider value={volume} onValueChange={setVolume} aria-label="Volume" />`,
  progress: `import { Progress } from "@/components/raster/progress";

<Progress label="Uploading" value={40} />`,
  tabs: `import { Tab, TabList, TabPanel, Tabs } from "@/components/raster/tabs";

<Tabs defaultValue="overview">
  <TabList>
    <Tab value="overview">Overview</Tab>
    <Tab value="activity">Activity</Tab>
  </TabList>
  <TabPanel value="overview">…</TabPanel>
  <TabPanel value="activity">…</TabPanel>
</Tabs>`,
  breadcrumbs: `import { Breadcrumbs } from "@/components/raster/breadcrumbs";

<Breadcrumbs items={[{ label: "Studio", href: "/studio" }, { label: "Raster" }]} />`,
  chart: `import { LineChart } from "@/components/raster/chart";

<LineChart
  height={204}
  labels={days}
  series={[
    { name: "Sheets", values: sheets },
    { name: "Proofs", values: proofs },
  ]}
  unit="sheets"
  annotations={[{ at: 3, label: "Press" }]}
  spot
  inverted={false}
/>`,
  "bar-chart": `import { BarChart } from "@/components/raster/chart";

<BarChart
  height={204}
  orientation="horizontal"
  data={[
    { label: "Alkmaar", value: 42 },
    { label: "Delft", value: 28 },
  ]}
  unit="issues"
  stacked
/>`,
  "area-chart": `import { AreaChart } from "@/components/raster/chart";

<AreaChart
  height={204}
  labels={days}
  series={[{ name: "Sheets", values: sheets }]}
  unit="sheets"
  annotations={[{ at: 3, label: "Press" }]}
/>`,
  "scatter-chart": `import { ScatterChart } from "@/components/raster/chart";

<ScatterChart
  height={204}
  points={marks}
  xLabel="Module"
  yLabel="Density"
  annotations={[{ at: 40, label: "204" }]}
/>`,
  donut: `import { Donut, Share } from "@/components/raster/chart";

<Donut value={72} max={100} size={184} label="printed" />
<Share slices={[{ label: "Sheet", value: 72 }, { label: "Proof", value: 18 }]} />`,
  histogram: `import { Histogram } from "@/components/raster/chart";

<Histogram
  height={204}
  bins={[
    { label: "0–1", count: 4 },
    { label: "1–2", count: 11 },
    { label: "2–3", count: 18 },
  ]}
/>`,
  "small-multiples": `import { SmallMultiples } from "@/components/raster/chart";

<SmallMultiples
  height={136}
  panels={[
    { title: "Alkmaar", labels: days, series: [{ name: "Sheets", values: alkmaar }] },
    { title: "Delft", labels: days, series: [{ name: "Sheets", values: delft }] },
  ]}
/>`,
  collapsible: `import { Collapsible } from "@/components/raster/collapsible";

<Collapsible title="Show the details">Here they are.</Collapsible>`,
  "hover-card": `import { HoverCard } from "@/components/raster/hover-card";

<HoverCard trigger={<a className="rs-link" href="/noord">@noord</a>}>
  Noord, a venture studio in Alkmaar.
</HoverCard>`,
  kbd: `import { Kbd } from "@/components/raster/kbd";

<Kbd>⌘</Kbd><Kbd>K</Kbd>`,
  "input-otp": `import { InputOTP } from "@/components/raster/input-otp";

<InputOTP length={6} onComplete={(code) => verify(code)} />`,
  "context-menu": `import { ContextMenu } from "@/components/raster/context-menu";

<ContextMenu items={[{ label: "Copy", onSelect: copy }, { separator: true }, { label: "Inspect" }]}>
  <Canvas />
</ContextMenu>`,
  menubar: `import { Menubar } from "@/components/raster/menubar";

<Menubar
  menus={[
    { label: "File", items: [{ label: "New" }, { label: "Open…" }] },
    { label: "Edit", items: [{ label: "Undo" }, { label: "Redo" }] },
  ]}
/>`,
  "navigation-menu": `import { NavigationMenu } from "@/components/raster/navigation-menu";

<NavigationMenu
  items={[
    { label: "Overview", href: "/", current: true },
    { label: "Docs", href: "/docs" },
  ]}
/>`,
  carousel: `import { Carousel } from "@/components/raster/carousel";

<Carousel aria-label="Case studies">
  {cases.map((c) => <CaseCard key={c.id} {...c} />)}
</Carousel>`,
  resizable: `import { Split } from "@/components/raster/resizable";

<Split initial={60} min={30} max={80}>
  <Editor />
  <Preview />
</Split>`,
  combobox: `import { Combobox } from "@/components/raster/combobox";

<Combobox
  options={cities}
  value={city}
  onValueChange={setCity}
  placeholder="Search cities…"
/>`,
  command: `import { CommandDialog } from "@/components/raster/command";

// wire the shortcut once in your app
useEffect(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setOpen(true); }
  };
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, []);

<CommandDialog
  open={open}
  onClose={() => setOpen(false)}
  groups={[{ label: "Go to", items: [{ label: "Components", onSelect: go }] }]}
/>`,
  calendar: `import { Calendar } from "@/components/raster/calendar";

<Calendar value={date} onSelect={setDate} />`,
  "date-picker": `import { DatePicker } from "@/components/raster/date-picker";

<DatePicker value={date} onChange={setDate} />`,
  "data-table": `import { DataTable } from "@/components/raster/data-table";

<DataTable
  columns={[
    { key: "phase", header: "Phase", sortable: true },
    { key: "weeks", header: "Weeks", sortable: true },
  ]}
  rows={rows}
/>`,
  "concentric-radius": `import { Nest, NestInner } from "@/components/raster/concentric-radius";
import { Button } from "@/components/raster/button";

<Nest radius={28} pad={16}>
  <NestInner>
    <Button size="sm">Save</Button>
  </NestInner>
</Nest>`,
  "aspect-ratio": `import { AspectRatio } from "@/components/raster/aspect-ratio";

<AspectRatio ratio={16 / 9}>
  <img src="/cover.jpg" alt="" />
</AspectRatio>`,
  accordion: `import { Accordion, AccordionItem } from "@/components/raster/accordion";

<Accordion exclusive>
  <AccordionItem title="What is Raster?" defaultOpen>
    A monochrome, CSS-first design system.
  </AccordionItem>
  <AccordionItem title="Is it dependency-free?">
    Yes. Native elements do the work.
  </AccordionItem>
</Accordion>`,
  alert: `import { Alert } from "@/components/raster/alert";

<Alert title="Heads up">Your workspace syncs every hour.</Alert>
<Alert variant="solid" title="Payment failed">Update your card to keep publishing.</Alert>`,
  "alert-dialog": `import { AlertDialog, AlertDialogActions, AlertDialogBody, AlertDialogTitle } from "@/components/raster/alert-dialog";

<AlertDialog open={open} onClose={() => setOpen(false)}>
  <AlertDialogTitle>Delete this workspace?</AlertDialogTitle>
  <AlertDialogBody>All projects go with it.</AlertDialogBody>
  <AlertDialogActions>
    <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Keep it</Button>
    <Button size="sm" onClick={remove}>Delete</Button>
  </AlertDialogActions>
</AlertDialog>`,
  avatar: `import { Avatar, AvatarRow } from "@/components/raster/avatar";

<Avatar src="/renn.jpg" alt="Renn" initials="RV" />
<AvatarRow>
  <Avatar initials="RV" />
  <Avatar initials="NO" />
  <Avatar initials="+3" />
</AvatarRow>`,
  textarea: `import { Textarea } from "@/components/raster/textarea";

<Textarea label="Notes" placeholder="What should we know?" />`,
  separator: `import { Separator } from "@/components/raster/separator";

<Separator />
<Separator orientation="vertical" />`,
  skeleton: `import { Skeleton } from "@/components/raster/skeleton";

<Skeleton width="60%" />
<Skeleton width={240} height={14} />`,
  tooltip: `import { Tooltip } from "@/components/raster/tooltip";

<Tooltip tip="Copy to clipboard">
  <Button variant="ghost" size="sm">Copy</Button>
</Tooltip>`,
  toast: `import { toast, Toaster } from "@/components/raster/toast";

// once, in your layout
<Toaster />

// from anywhere
toast("Saved", { description: "Your changes are live." });`,
  "dropdown-menu": `import { DropdownMenu } from "@/components/raster/dropdown-menu";

<DropdownMenu
  label="Actions"
  items={[
    { label: "Rename", onSelect: rename },
    { label: "Duplicate", onSelect: duplicate },
    { separator: true },
    { label: "Delete", onSelect: remove },
  ]}
/>`,
  toggle: `import { Toggle, ToggleGroup } from "@/components/raster/toggle";

<Toggle pressed={bold} onPressedChange={setBold}>Bold</Toggle>

<ToggleGroup
  options={[
    { value: "left", label: "Left" },
    { value: "center", label: "Center" },
    { value: "right", label: "Right" },
  ]}
  value={align}
  onValueChange={setAlign}
/>`,
  popover: `import { Popover, PopoverBody, PopoverTitle } from "@/components/raster/popover";

<Popover trigger="Details">
  <PopoverTitle>Module grid</PopoverTitle>
  <PopoverBody>204px modules: a 184px column and a 20px gutter.</PopoverBody>
</Popover>`,
  sheet: `import { Sheet, SheetBody, SheetTitle } from "@/components/raster/sheet";

<Sheet open={open} onClose={() => setOpen(false)} side="right">
  <SheetTitle>Filters</SheetTitle>
  <SheetBody>Everything narrows from here.</SheetBody>
</Sheet>`,
  "scroll-area": `import { ScrollArea } from "@/components/raster/scroll-area";

<ScrollArea maxHeight={240}>
  {cities.map((city) => <p key={city}>{city}</p>)}
</ScrollArea>`,
  "crumb-bar": `import { CrumbBar } from "@/components/raster/crumb-bar";

<CrumbBar
  root={{ label: "Renato Valdés Olmos", href: "/" }}
  rootShort="RVO"
  trail={[
    { label: "Components", href: "/components" },
    { label: "Switch" },
  ]}
/>`,
  "theme-toggle": `import { ThemeToggle } from "@/components/raster/theme-toggle";

<ThemeToggle onThemeChange={(dark) => console.log(dark)} />`,
  pagination: `import { Pagination } from "@/components/raster/pagination";

<Pagination page={page} count={12} onPageChange={setPage} />`,
  select: `import { Select } from "@/components/raster/select";

<Select
  options={[{ value: "alkmaar", label: "Alkmaar" }]}
  value={city}
  onValueChange={setCity}
/>`,
  dialog: `import { Dialog, DialogActions, DialogBody, DialogTitle } from "@/components/raster/dialog";
import { Button } from "@/components/raster/button";

<Dialog open={open} onClose={() => setOpen(false)}>
  <DialogTitle>Remove this item?</DialogTitle>
  <DialogBody>This can't be undone.</DialogBody>
  <DialogActions>
    <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
    <Button size="sm" onClick={remove}>Remove</Button>
  </DialogActions>
</Dialog>`,
  badge: `import { Badge } from "@/components/raster/badge";

<Badge>Recommended</Badge>
<Badge variant="solid">Delivered</Badge>
<Badge variant="muted">In progress</Badge>`,
  card: `import { Card, CardBody, CardLabel, CardTitle } from "@/components/raster/card";

<Card>
  <CardLabel>Case study</CardLabel>
  <CardTitle>A quieter interface</CardTitle>
  <CardBody>Emphasis from weight and spacing, never from a hue.</CardBody>
</Card>`,
  stepper: `import { Stepper } from "@/components/raster/stepper";

<Stepper steps={[{ name: "Brief" }, { name: "Design" }, { name: "Build" }]} current={1} />`,
};

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const component = catalogComponents.find((c) => c.name === name);
  if (!component) notFound();

  const usage = reactUsage[component.name];

  return (
    <>
      <div className="site-layout">
        <DocsNav />
        <main id="main"
          {...sx(
            "site-content",
            component.name === "icons" ? chrome.iconContent : chrome.content,
          )}
        >
          <header {...sx("cover", chrome.cover)}>
            <h1 className="rs-t-display component-head">{component.title}</h1>
            <p className="rs-t-sub component-desc">{component.description}</p>
          </header>

        <div className="preview-box">
          <Preview name={component.name} snippet={component.snippet} />
        </div>

        <InAction name={component.name} />

        <h2 className="section-label">Install</h2>
        {PACKAGES_PUBLISHED ? (
          <CodeBlock code={COMMAND.replace("init", `add ${component.name}`)} />
        ) : (
          <p className="rs-t-body">Not on npm. Use the markup and classes on this page.</p>
        )}

        <h2 className="section-label">Markup</h2>
        <CodeBlock code={component.snippet} />

        {usage && (
          <>
            <h2 className="section-label">React</h2>
            <CodeBlock code={usage} />
          </>
        )}

        <h2 className="section-label">Classes</h2>
        <div className="class-list">
          {component.classes.map((cls) => (
            <span key={cls} className="rs-chip">
              .{cls}
            </span>
          ))}
        </div>

        {(component.registryDependencies ?? []).length > 0 && (
          <>
            <h2 className="section-label">Depends on</h2>
            <div className="class-list">
              {component.registryDependencies!.map((dep) => (
                <a key={dep} href={`/components/${dep}`} className="rs-chip">
                  /{dep}
                </a>
              ))}
            </div>
          </>
        )}
        </main>
      </div>
    </>
  );
}
