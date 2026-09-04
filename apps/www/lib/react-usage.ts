/**
 * Fallback React examples, keyed by registry name. The registry entry's
 * `example` field wins when present; delete an entry here once the
 * registry carries it. Every snippet imports from the published package.
 */
export const reactUsage: Record<string, string> = {
  button: `import { Button } from "@noorddev/raster-react";

<Button>Primary action</Button>
<Button variant="ghost" size="sm">Secondary</Button>`,
  callout: `import { Callout } from "@noorddev/raster-react";

<Callout>
  <p><strong>Fixed fee.</strong> The number on the cover is the number on the invoice.</p>
</Callout>`,
  "button-group": `import { Button, ButtonGroup } from "@noorddev/raster-react";

<ButtonGroup>
  <Button variant="ghost">Left</Button>
  <Button variant="ghost">Center</Button>
  <Button variant="ghost">Right</Button>
</ButtonGroup>`,
  link: `import { Link } from "@noorddev/raster-react";

<Link href="#">A text link</Link>
<Link underline href="#">An in-copy link</Link>`,
  chip: `import { Chip } from "@noorddev/raster-react";

<Chip>/noord-brand</Chip>`,
  table: `import { Table, TableBody, TableHead, TableRow, TableTd, TableTh } from "@noorddev/raster-react";

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
  workflow: `import { Flow, FlowAdd, FlowBody, FlowNum, FlowStep, FlowTitle } from "@noorddev/raster-react";

<Flow>
  <FlowStep>
    <FlowNum>1</FlowNum>
    <FlowTitle>Proposal</FlowTitle>
    <FlowBody>Scope, timeline, and fee on one page.</FlowBody>
  </FlowStep>
  <FlowAdd>Add a step</FlowAdd>
</Flow>`,
  assistant: `import { Assistant, AssistantMsg, AssistantReply, AssistantUserBlock } from "@noorddev/raster-react";

<Assistant>
  <AssistantMsg user>
    <AssistantUserBlock>Make the intro tighter.</AssistantUserBlock>
  </AssistantMsg>
  <AssistantReply>Done. Two sentences, same claim.</AssistantReply>
</Assistant>`,
  references: `import { Cite, CiteLink, RefAuthors, RefItem, Refs } from "@noorddev/raster-react";

<p>Set in a single ink.<Cite><CiteLink href="#ref-1">1</CiteLink></Cite></p>
<Refs>
  <RefItem id="ref-1">
    <RefAuthors>Müller-Brockmann, J.</RefAuthors> Grid systems in graphic design.
  </RefItem>
</Refs>`,
  label: `import { Label } from "@noorddev/raster-react";

<Label htmlFor="name">Name</Label>`,
  field: `import { Field, FieldHint, FieldLabel, Input } from "@noorddev/raster-react";

<Field>
  <FieldLabel htmlFor="name">Name</FieldLabel>
  <Input plain id="name" />
  <FieldHint>As it appears on the invoice.</FieldHint>
</Field>`,
  form: `import { Button, Field, FieldLabel, Form, Input } from "@noorddev/raster-react";

<Form onSubmit={save}>
  <Field>
    <FieldLabel htmlFor="name">Name</FieldLabel>
    <Input plain id="name" />
  </Field>
  <Button type="submit">Send</Button>
</Form>`,
  "input-group": `import { Input, InputAddon, InputGroup } from "@noorddev/raster-react";

<InputGroup>
  <InputAddon>https://</InputAddon>
  <Input placeholder="getraster.com" />
</InputGroup>`,
  "native-select": `import { NativeSelect } from "@noorddev/raster-react";

<NativeSelect label="City" defaultValue="alkmaar">
  <option value="alkmaar">Alkmaar</option>
  <option value="amsterdam">Amsterdam</option>
</NativeSelect>`,
  item: `import { Item } from "@noorddev/raster-react";

<Item title="Alkmaar" description="The studio city." meta="NL" />`,
  empty: `import { Button, Empty } from "@noorddev/raster-react";

<Empty title="No projects yet" action={<Button variant="ghost" size="sm">New project</Button>}>
  Start one. The grid is empty on purpose.
</Empty>`,
  spinner: `import { Spinner } from "@noorddev/raster-react";

<Spinner label="Loading" />`,
  drawer: `import { Drawer, DrawerBody, DrawerTitle } from "@noorddev/raster-react";

<Drawer open={open} onClose={() => setOpen(false)}>
  <DrawerTitle>Notes</DrawerTitle>
  <DrawerBody>A bottom panel. Escape closes it.</DrawerBody>
</Drawer>`,
  sidebar: `import { Sidebar, SidebarFoot, SidebarHead, SidebarItem, SidebarLabel, SidebarNav } from "@noorddev/raster-react";

<Sidebar>
  <SidebarHead>Raster</SidebarHead>
  <SidebarNav>
    <SidebarLabel>Go to</SidebarLabel>
    <SidebarItem href="/" current>Overview</SidebarItem>
    <SidebarItem href="/docs">Docs</SidebarItem>
  </SidebarNav>
  <SidebarFoot>0.3</SidebarFoot>
</Sidebar>`,
  "toggle-group": `import { ToggleGroup } from "@noorddev/raster-react";

<ToggleGroup
  options={[
    { value: "left", label: "Left" },
    { value: "center", label: "Center" },
    { value: "right", label: "Right" },
  ]}
  value={align}
  onValueChange={setAlign}
/>`,
  input: `import { Input } from "@noorddev/raster-react";

<Input label="E-mail" placeholder="you@example.com" ok feedback="Looks good" />`,
  "inline-form": `import { InlineForm } from "@noorddev/raster-react";

<InlineForm onSubmit={(email) => subscribe(email)} />`,
  icons: `import { Icon, IconCatalog } from "@noorddev/raster-react";

<Icon name="search" size={12} />
<Icon name="search" size={16} />
<Icon name="search" size={24} />
<IconCatalog />`,
  checkbox: `import { Checkbox } from "@noorddev/raster-react";

<Checkbox label="Brand" defaultChecked />`,
  radio: `import { Radio, RadioGroup } from "@noorddev/raster-react";

<RadioGroup defaultValue="monthly" onValueChange={setPlan}>
  <Radio value="monthly" label="Monthly" />
  <Radio value="yearly" label="Yearly" />
</RadioGroup>`,
  switch: `import { Switch } from "@noorddev/raster-react";

<Switch checked={enabled} onCheckedChange={setEnabled} aria-label="Notifications" />`,
  slider: `import { Slider } from "@noorddev/raster-react";

<Slider value={volume} onValueChange={setVolume} aria-label="Volume" />`,
  progress: `import { Progress } from "@noorddev/raster-react";

<Progress label="Uploading" value={40} />`,
  tabs: `import { Tab, TabList, TabPanel, Tabs } from "@noorddev/raster-react";

<Tabs value={tab} onValueChange={setTab}>
  <TabList>
    <Tab value="overview">Overview</Tab>
    <Tab value="activity">Activity</Tab>
  </TabList>
  <TabPanel value="overview">…</TabPanel>
  <TabPanel value="activity">…</TabPanel>
</Tabs>`,
  breadcrumbs: `import { Breadcrumbs } from "@noorddev/raster-react";

<Breadcrumbs items={[{ label: "Studio", href: "/studio" }, { label: "Raster" }]} />`,
  chart: `import { LineChart } from "@noorddev/raster-react";

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
  "bar-chart": `import { BarChart } from "@noorddev/raster-react";

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
  "area-chart": `import { AreaChart } from "@noorddev/raster-react";

<AreaChart
  height={204}
  labels={days}
  series={[{ name: "Sheets", values: sheets }]}
  unit="sheets"
  annotations={[{ at: 3, label: "Press" }]}
/>`,
  "scatter-chart": `import { ScatterChart } from "@noorddev/raster-react";

<ScatterChart
  height={204}
  points={marks}
  xLabel="Module"
  yLabel="Density"
  annotations={[{ at: 40, label: "204" }]}
/>`,
  donut: `import { Donut, Share } from "@noorddev/raster-react";

<Donut value={72} max={100} size={184} label="printed" />
<Share slices={[{ label: "Sheet", value: 72 }, { label: "Proof", value: 18 }]} />`,
  histogram: `import { Histogram } from "@noorddev/raster-react";

<Histogram
  height={204}
  bins={[
    { label: "0–1", count: 4 },
    { label: "1–2", count: 11 },
    { label: "2–3", count: 18 },
  ]}
/>`,
  "small-multiples": `import { SmallMultiples } from "@noorddev/raster-react";

<SmallMultiples
  height={136}
  panels={[
    { title: "Alkmaar", labels: days, series: [{ name: "Sheets", values: alkmaar }] },
    { title: "Delft", labels: days, series: [{ name: "Sheets", values: delft }] },
  ]}
/>`,
  collapsible: `import { Collapsible } from "@noorddev/raster-react";

<Collapsible title="Show the details">Here they are.</Collapsible>`,
  "hover-card": `import { HoverCard } from "@noorddev/raster-react";

<HoverCard trigger={<a className="rs-link" href="/noord">@noord</a>}>
  Noord, a venture studio in Alkmaar.
</HoverCard>`,
  kbd: `import { Kbd } from "@noorddev/raster-react";

<Kbd>⌘</Kbd><Kbd>K</Kbd>`,
  "input-otp": `import { InputOTP } from "@noorddev/raster-react";

<InputOTP length={6} onComplete={(code) => verify(code)} />`,
  "context-menu": `import { ContextMenu } from "@noorddev/raster-react";

<ContextMenu items={[{ label: "Copy", onSelect: copy }, { separator: true }, { label: "Inspect" }]}>
  <Canvas />
</ContextMenu>`,
  menubar: `import { Menubar } from "@noorddev/raster-react";

<Menubar
  menus={[
    { label: "File", items: [{ label: "New" }, { label: "Open…" }] },
    { label: "Edit", items: [{ label: "Undo" }, { label: "Redo" }] },
  ]}
/>`,
  "navigation-menu": `import { NavigationMenu } from "@noorddev/raster-react";

<NavigationMenu
  items={[
    { label: "Overview", href: "/", current: true },
    { label: "Docs", href: "/docs" },
  ]}
/>`,
  carousel: `import { Carousel } from "@noorddev/raster-react";

<Carousel aria-label="Case studies">
  {cases.map((c) => <CaseCard key={c.id} {...c} />)}
</Carousel>`,
  resizable: `import { Split } from "@noorddev/raster-react";

<Split initial={60} min={30} max={80}>
  <Editor />
  <Preview />
</Split>`,
  combobox: `import { Combobox } from "@noorddev/raster-react";

<Combobox
  options={cities}
  value={city}
  onValueChange={setCity}
  placeholder="Search cities…"
/>`,
  command: `import { CommandDialog } from "@noorddev/raster-react";

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
  calendar: `import { Calendar } from "@noorddev/raster-react";

<Calendar value={date} onValueChange={setDate} weekStart={1} />`,
  "date-picker": `import { DatePicker } from "@noorddev/raster-react";

<DatePicker value={date} onValueChange={setDate} placeholder="Press date" />`,
  "data-table": `import { DataTable } from "@noorddev/raster-react";

<DataTable
  columns={[
    { key: "phase", header: "Phase", sortable: true },
    { key: "weeks", header: "Weeks", sortable: true },
  ]}
  rows={rows}
/>`,
  "concentric-radius": `import { Button, Nest, NestInner } from "@noorddev/raster-react";

<Nest radius={28} pad={16}>
  <NestInner>
    <Button size="sm">Save</Button>
  </NestInner>
</Nest>`,
  "aspect-ratio": `import { AspectRatio } from "@noorddev/raster-react";

<AspectRatio ratio={16 / 9}>
  <img src="/cover.jpg" alt="" />
</AspectRatio>`,
  accordion: `import { Accordion, AccordionItem } from "@noorddev/raster-react";

<Accordion exclusive>
  <AccordionItem title="What is Raster?" defaultOpen>
    A monochrome design system on a 204px module.
  </AccordionItem>
  <AccordionItem title="Is it dependency-free?">
    Yes. Native elements do the work.
  </AccordionItem>
</Accordion>`,
  alert: `import { Alert } from "@noorddev/raster-react";

<Alert title="Heads up">Your workspace syncs every hour.</Alert>
<Alert variant="solid" title="Payment failed" live="assertive">
  Update your card to keep publishing.
</Alert>`,
  "alert-dialog": `import { AlertDialog, AlertDialogActions, AlertDialogBody, AlertDialogTitle } from "@noorddev/raster-react";

<AlertDialog open={open} onClose={() => setOpen(false)}>
  <AlertDialogTitle>Delete this workspace?</AlertDialogTitle>
  <AlertDialogBody>All projects go with it.</AlertDialogBody>
  <AlertDialogActions>
    <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Keep it</Button>
    <Button size="sm" onClick={remove}>Delete</Button>
  </AlertDialogActions>
</AlertDialog>`,
  avatar: `import { Avatar, AvatarRow } from "@noorddev/raster-react";

<Avatar src="/renn.jpg" name="Renato Valdés Olmos" initials="RV" />
<AvatarRow>
  <Avatar initials="RV" />
  <Avatar initials="NO" />
  <Avatar initials="+3" />
</AvatarRow>`,
  textarea: `import { Textarea } from "@noorddev/raster-react";

<Textarea label="Notes" placeholder="What should we know?" />`,
  separator: `import { Separator } from "@noorddev/raster-react";

<Separator />
<Separator orientation="vertical" />`,
  skeleton: `import { Skeleton } from "@noorddev/raster-react";

<Skeleton width="60%" />
<Skeleton width={240} height={14} />`,
  tooltip: `import { Tooltip } from "@noorddev/raster-react";

<Tooltip tip="Copy to clipboard">
  <Button variant="ghost" size="sm">Copy</Button>
</Tooltip>`,
  toast: `import { Toaster, toast } from "@noorddev/raster-react";

// once, in your layout
<Toaster closeLabel="Dismiss" />

// from anywhere
toast("Saved", { description: "Your changes are live." });`,
  "dropdown-menu": `import { DropdownMenu } from "@noorddev/raster-react";

<DropdownMenu
  label="Actions"
  items={[
    { label: "Rename", onSelect: rename },
    { label: "Duplicate", onSelect: duplicate },
    { separator: true },
    { label: "Delete", onSelect: remove },
  ]}
/>`,
  toggle: `import { Toggle, ToggleGroup } from "@noorddev/raster-react";

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
  popover: `import { Popover, PopoverBody, PopoverTitle } from "@noorddev/raster-react";

<Popover trigger="Details">
  <PopoverTitle>Module grid</PopoverTitle>
  <PopoverBody>204px modules: a 184px column and a 20px gutter.</PopoverBody>
</Popover>`,
  sheet: `import { Sheet, SheetBody, SheetTitle } from "@noorddev/raster-react";

<Sheet open={open} onClose={() => setOpen(false)} side="right">
  <SheetTitle>Filters</SheetTitle>
  <SheetBody>Everything narrows from here.</SheetBody>
</Sheet>`,
  "scroll-area": `import { ScrollArea } from "@noorddev/raster-react";

<ScrollArea maxHeight={240}>
  {cities.map((city) => <p key={city}>{city}</p>)}
</ScrollArea>`,
  "crumb-bar": `import { CrumbBar } from "@noorddev/raster-react";

<CrumbBar
  root={{ label: "Renato Valdés Olmos", href: "/" }}
  rootShort="RVO"
  trail={[
    { label: "Components", href: "/components" },
    { label: "Switch" },
  ]}
/>`,
  "theme-toggle": `import { ThemeToggle } from "@noorddev/raster-react";

<ThemeToggle onThemeChange={(dark) => console.log(dark)} />`,
  pagination: `import { Pagination } from "@noorddev/raster-react";

<Pagination page={page} count={12} onPageChange={setPage} />`,
  select: `import { Select } from "@noorddev/raster-react";

<Select
  aria-label="City"
  options={[{ value: "alkmaar", label: "Alkmaar" }]}
  value={city}
  onValueChange={setCity}
/>`,
  dialog: `import { Button, Dialog, DialogActions, DialogBody, DialogTitle } from "@noorddev/raster-react";

<Dialog open={open} onClose={() => setOpen(false)} closeLabel="Close">
  <DialogTitle>Remove this item?</DialogTitle>
  <DialogBody>This can't be undone.</DialogBody>
  <DialogActions>
    <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
    <Button size="sm" onClick={remove}>Remove</Button>
  </DialogActions>
</Dialog>`,
  badge: `import { Badge } from "@noorddev/raster-react";

<Badge>Recommended</Badge>
<Badge variant="solid">Delivered</Badge>
<Badge variant="muted">In progress</Badge>`,
  card: `import { Card, CardBody, CardLabel, CardTitle } from "@noorddev/raster-react";

<Card>
  <CardLabel>Case study</CardLabel>
  <CardTitle>A quieter interface</CardTitle>
  <CardBody>Emphasis from weight and spacing, never from a hue.</CardBody>
</Card>`,
  stepper: `import { Stepper } from "@noorddev/raster-react";

<Stepper steps={[{ name: "Brief" }, { name: "Design" }, { name: "Build" }]} current={1} />`,
};
