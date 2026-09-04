/**
 * Fallback React examples, keyed by registry name. The registry entry's
 * `example` field wins when present; delete an entry here once the
 * registry carries it. Every snippet imports from the published package.
 */
export const reactUsage: Record<string, string> = {
  button: `import { Button } from "@noorddev/vlak-react";

<Button>Primary action</Button>
<Button variant="ghost" size="sm">Secondary</Button>`,
  callout: `import { Callout } from "@noorddev/vlak-react";

<Callout>
  <p><strong>Fixed fee.</strong> The number on the cover is the number on the invoice.</p>
</Callout>`,
  "button-group": `import { Button, ButtonGroup } from "@noorddev/vlak-react";

<ButtonGroup>
  <Button variant="ghost">Left</Button>
  <Button variant="ghost">Center</Button>
  <Button variant="ghost">Right</Button>
</ButtonGroup>`,
  link: `import { Link } from "@noorddev/vlak-react";

<Link href="#">A text link</Link>
<Link underline href="#">An in-copy link</Link>`,
  chip: `import { Chip } from "@noorddev/vlak-react";

<Chip>/noord-brand</Chip>`,
  table: `import { Table, TableBody, TableHead, TableRow, TableTd, TableTh } from "@noorddev/vlak-react";

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
  workflow: `import { Flow, FlowAdd, FlowBody, FlowNum, FlowStep, FlowTitle } from "@noorddev/vlak-react";

<Flow>
  <FlowStep>
    <FlowNum>1</FlowNum>
    <FlowTitle>Proposal</FlowTitle>
    <FlowBody>Scope, timeline, and fee on one page.</FlowBody>
  </FlowStep>
  <FlowAdd>Add a step</FlowAdd>
</Flow>`,
  assistant: `import { Assistant, AssistantMsg, AssistantReply, AssistantUserBlock } from "@noorddev/vlak-react";

<Assistant>
  <AssistantMsg user>
    <AssistantUserBlock>Make the intro tighter.</AssistantUserBlock>
  </AssistantMsg>
  <AssistantReply>Done. Two sentences, same claim.</AssistantReply>
</Assistant>`,
  references: `import { Cite, CiteLink, RefAuthors, RefItem, Refs } from "@noorddev/vlak-react";

<p>Set in a single ink.<Cite><CiteLink href="#ref-1">1</CiteLink></Cite></p>
<Refs>
  <RefItem id="ref-1">
    <RefAuthors>Müller-Brockmann, J.</RefAuthors> Grid systems in graphic design.
  </RefItem>
</Refs>`,
  label: `import { Label } from "@noorddev/vlak-react";

<Label htmlFor="name">Name</Label>`,
  field: `import { Field, FieldHint, FieldLabel, Input } from "@noorddev/vlak-react";

<Field>
  <FieldLabel htmlFor="name">Name</FieldLabel>
  <Input plain id="name" />
  <FieldHint>As it appears on the invoice.</FieldHint>
</Field>`,
  form: `import { Button, Field, FieldLabel, Form, Input } from "@noorddev/vlak-react";

<Form onSubmit={save}>
  <Field>
    <FieldLabel htmlFor="name">Name</FieldLabel>
    <Input plain id="name" />
  </Field>
  <Button type="submit">Send</Button>
</Form>`,
  "input-group": `import { Input, InputAddon, InputGroup } from "@noorddev/vlak-react";

<InputGroup>
  <InputAddon>https://</InputAddon>
  <Input placeholder="vlak.dev" />
</InputGroup>`,
  "native-select": `import { NativeSelect } from "@noorddev/vlak-react";

<NativeSelect label="City" defaultValue="alkmaar">
  <option value="alkmaar">Alkmaar</option>
  <option value="amsterdam">Amsterdam</option>
</NativeSelect>`,
  item: `import { Item } from "@noorddev/vlak-react";

<Item title="Alkmaar" description="The studio city." meta="NL" />`,
  empty: `import { Button, Empty } from "@noorddev/vlak-react";

<Empty title="No projects yet" action={<Button variant="ghost" size="sm">New project</Button>}>
  Start one. The grid is empty on purpose.
</Empty>`,
  spinner: `import { Spinner } from "@noorddev/vlak-react";

<Spinner label="Loading" />`,
  drawer: `import { Drawer, DrawerBody, DrawerTitle } from "@noorddev/vlak-react";

<Drawer open={open} onClose={() => setOpen(false)}>
  <DrawerTitle>Notes</DrawerTitle>
  <DrawerBody>A bottom panel. Escape closes it.</DrawerBody>
</Drawer>`,
  sidebar: `import { Sidebar, SidebarFoot, SidebarHead, SidebarItem, SidebarLabel, SidebarNav } from "@noorddev/vlak-react";

<Sidebar>
  <SidebarHead>Vlak</SidebarHead>
  <SidebarNav>
    <SidebarLabel>Go to</SidebarLabel>
    <SidebarItem href="/" current>Overview</SidebarItem>
    <SidebarItem href="/docs">Docs</SidebarItem>
  </SidebarNav>
  <SidebarFoot>0.3</SidebarFoot>
</Sidebar>`,
  "toggle-group": `import { ToggleGroup } from "@noorddev/vlak-react";

<ToggleGroup
  options={[
    { value: "left", label: "Left" },
    { value: "center", label: "Center" },
    { value: "right", label: "Right" },
  ]}
  value={align}
  onValueChange={setAlign}
/>`,
  input: `import { Input } from "@noorddev/vlak-react";

<Input label="E-mail" placeholder="you@example.com" ok feedback="Looks good" />`,
  "inline-form": `import { InlineForm } from "@noorddev/vlak-react";

<InlineForm onSubmit={(email) => subscribe(email)} />`,
  icons: `import { Icon, IconCatalog } from "@noorddev/vlak-react";

<Icon name="search" size={12} />
<Icon name="search" size={16} />
<Icon name="search" size={24} />
<IconCatalog />`,
  checkbox: `import { Checkbox } from "@noorddev/vlak-react";

<Checkbox label="Brand" defaultChecked />`,
  radio: `import { Radio, RadioGroup } from "@noorddev/vlak-react";

<RadioGroup defaultValue="monthly" onValueChange={setPlan}>
  <Radio value="monthly" label="Monthly" />
  <Radio value="yearly" label="Yearly" />
</RadioGroup>`,
  switch: `import { Switch } from "@noorddev/vlak-react";

<Switch checked={enabled} onCheckedChange={setEnabled} aria-label="Notifications" />`,
  slider: `import { Slider } from "@noorddev/vlak-react";

<Slider value={volume} onValueChange={setVolume} aria-label="Volume" />`,
  progress: `import { Progress } from "@noorddev/vlak-react";

<Progress label="Uploading" value={40} />`,
  tabs: `import { Tab, TabList, TabPanel, Tabs } from "@noorddev/vlak-react";

<Tabs value={tab} onValueChange={setTab}>
  <TabList>
    <Tab value="overview">Overview</Tab>
    <Tab value="activity">Activity</Tab>
  </TabList>
  <TabPanel value="overview">…</TabPanel>
  <TabPanel value="activity">…</TabPanel>
</Tabs>`,
  breadcrumbs: `import { Breadcrumbs } from "@noorddev/vlak-react";

<Breadcrumbs items={[{ label: "Studio", href: "/studio" }, { label: "Vlak" }]} />`,
  chart: `import { LineChart } from "@noorddev/vlak-react";

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
  "bar-chart": `import { BarChart } from "@noorddev/vlak-react";

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
  "area-chart": `import { AreaChart } from "@noorddev/vlak-react";

<AreaChart
  height={204}
  labels={days}
  series={[{ name: "Sheets", values: sheets }]}
  unit="sheets"
  annotations={[{ at: 3, label: "Press" }]}
/>`,
  "scatter-chart": `import { ScatterChart } from "@noorddev/vlak-react";

<ScatterChart
  height={204}
  points={marks}
  xLabel="Module"
  yLabel="Density"
  annotations={[{ at: 40, label: "204" }]}
/>`,
  donut: `import { Donut, Share } from "@noorddev/vlak-react";

<Donut value={72} max={100} size={184} label="printed" />
<Share slices={[{ label: "Sheet", value: 72 }, { label: "Proof", value: 18 }]} />`,
  histogram: `import { Histogram } from "@noorddev/vlak-react";

<Histogram
  height={204}
  bins={[
    { label: "0–1", count: 4 },
    { label: "1–2", count: 11 },
    { label: "2–3", count: 18 },
  ]}
/>`,
  "small-multiples": `import { SmallMultiples } from "@noorddev/vlak-react";

<SmallMultiples
  height={136}
  panels={[
    { title: "Alkmaar", labels: days, series: [{ name: "Sheets", values: alkmaar }] },
    { title: "Delft", labels: days, series: [{ name: "Sheets", values: delft }] },
  ]}
/>`,
  collapsible: `import { Collapsible } from "@noorddev/vlak-react";

<Collapsible title="Show the details">Here they are.</Collapsible>`,
  "hover-card": `import { HoverCard } from "@noorddev/vlak-react";

<HoverCard trigger={<a className="rs-link" href="/noord">@noord</a>}>
  Noord, a venture studio in Alkmaar.
</HoverCard>`,
  kbd: `import { Kbd } from "@noorddev/vlak-react";

<Kbd>⌘</Kbd><Kbd>K</Kbd>`,
  "input-otp": `import { InputOTP } from "@noorddev/vlak-react";

<InputOTP length={6} onComplete={(code) => verify(code)} />`,
  "context-menu": `import { ContextMenu } from "@noorddev/vlak-react";

<ContextMenu items={[{ label: "Copy", onSelect: copy }, { separator: true }, { label: "Inspect" }]}>
  <Canvas />
</ContextMenu>`,
  menubar: `import { Menubar } from "@noorddev/vlak-react";

<Menubar
  menus={[
    { label: "File", items: [{ label: "New" }, { label: "Open…" }] },
    { label: "Edit", items: [{ label: "Undo" }, { label: "Redo" }] },
  ]}
/>`,
  "navigation-menu": `import { NavigationMenu } from "@noorddev/vlak-react";

<NavigationMenu
  items={[
    { label: "Overview", href: "/", current: true },
    { label: "Docs", href: "/docs" },
  ]}
/>`,
  carousel: `import { Carousel } from "@noorddev/vlak-react";

<Carousel aria-label="Case studies">
  {cases.map((c) => <CaseCard key={c.id} {...c} />)}
</Carousel>`,
  resizable: `import { Split } from "@noorddev/vlak-react";

<Split initial={60} min={30} max={80}>
  <Editor />
  <Preview />
</Split>`,
  combobox: `import { Combobox } from "@noorddev/vlak-react";

<Combobox
  options={cities}
  value={city}
  onValueChange={setCity}
  placeholder="Search cities…"
/>`,
  command: `import { CommandDialog } from "@noorddev/vlak-react";

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
  calendar: `import { Calendar } from "@noorddev/vlak-react";

<Calendar value={date} onValueChange={setDate} weekStart={1} />`,
  "date-picker": `import { DatePicker } from "@noorddev/vlak-react";

<DatePicker value={date} onValueChange={setDate} placeholder="Press date" />`,
  "data-table": `import { DataTable } from "@noorddev/vlak-react";

<DataTable
  columns={[
    { key: "phase", header: "Phase", sortable: true },
    { key: "weeks", header: "Weeks", sortable: true },
  ]}
  rows={rows}
/>`,
  "concentric-radius": `import { Button, Nest, NestInner } from "@noorddev/vlak-react";

<Nest radius={28} pad={16}>
  <NestInner>
    <Button size="sm">Save</Button>
  </NestInner>
</Nest>`,
  "aspect-ratio": `import { AspectRatio } from "@noorddev/vlak-react";

<AspectRatio ratio={16 / 9}>
  <img src="/cover.jpg" alt="" />
</AspectRatio>`,
  accordion: `import { Accordion, AccordionItem } from "@noorddev/vlak-react";

<Accordion exclusive>
  <AccordionItem title="What is Vlak?" defaultOpen>
    A monochrome design system on a 204px module.
  </AccordionItem>
  <AccordionItem title="Is it dependency-free?">
    Yes. Native elements do the work.
  </AccordionItem>
</Accordion>`,
  alert: `import { Alert } from "@noorddev/vlak-react";

<Alert title="Heads up">Your workspace syncs every hour.</Alert>
<Alert variant="solid" title="Payment failed" live="assertive">
  Update your card to keep publishing.
</Alert>`,
  "alert-dialog": `import { AlertDialog, AlertDialogActions, AlertDialogBody, AlertDialogTitle } from "@noorddev/vlak-react";

<AlertDialog open={open} onClose={() => setOpen(false)}>
  <AlertDialogTitle>Delete this workspace?</AlertDialogTitle>
  <AlertDialogBody>All projects go with it.</AlertDialogBody>
  <AlertDialogActions>
    <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Keep it</Button>
    <Button size="sm" onClick={remove}>Delete</Button>
  </AlertDialogActions>
</AlertDialog>`,
  avatar: `import { Avatar, AvatarRow } from "@noorddev/vlak-react";

<Avatar src="/renn.jpg" name="Renato Valdés Olmos" initials="RV" />
<AvatarRow>
  <Avatar initials="RV" />
  <Avatar initials="NO" />
  <Avatar initials="+3" />
</AvatarRow>`,
  textarea: `import { Textarea } from "@noorddev/vlak-react";

<Textarea label="Notes" placeholder="What should we know?" />`,
  separator: `import { Separator } from "@noorddev/vlak-react";

<Separator />
<Separator orientation="vertical" />`,
  skeleton: `import { Skeleton } from "@noorddev/vlak-react";

<Skeleton width="60%" />
<Skeleton width={240} height={14} />`,
  tooltip: `import { Tooltip } from "@noorddev/vlak-react";

<Tooltip tip="Copy to clipboard">
  <Button variant="ghost" size="sm">Copy</Button>
</Tooltip>`,
  toast: `import { Toaster, toast } from "@noorddev/vlak-react";

// once, in your layout
<Toaster closeLabel="Dismiss" />

// from anywhere
toast("Saved", { description: "Your changes are live." });`,
  "dropdown-menu": `import { DropdownMenu } from "@noorddev/vlak-react";

<DropdownMenu
  label="Actions"
  items={[
    { label: "Rename", onSelect: rename },
    { label: "Duplicate", onSelect: duplicate },
    { separator: true },
    { label: "Delete", onSelect: remove },
  ]}
/>`,
  toggle: `import { Toggle, ToggleGroup } from "@noorddev/vlak-react";

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
  popover: `import { Popover, PopoverBody, PopoverTitle } from "@noorddev/vlak-react";

<Popover trigger="Details">
  <PopoverTitle>Module grid</PopoverTitle>
  <PopoverBody>204px modules: a 184px column and a 20px gutter.</PopoverBody>
</Popover>`,
  sheet: `import { Sheet, SheetBody, SheetTitle } from "@noorddev/vlak-react";

<Sheet open={open} onClose={() => setOpen(false)} side="right">
  <SheetTitle>Filters</SheetTitle>
  <SheetBody>Everything narrows from here.</SheetBody>
</Sheet>`,
  "scroll-area": `import { ScrollArea } from "@noorddev/vlak-react";

<ScrollArea maxHeight={240}>
  {cities.map((city) => <p key={city}>{city}</p>)}
</ScrollArea>`,
  "crumb-bar": `import { CrumbBar } from "@noorddev/vlak-react";

<CrumbBar
  root={{ label: "Renato Valdés Olmos", href: "/" }}
  rootShort="RVO"
  trail={[
    { label: "Components", href: "/components" },
    { label: "Switch" },
  ]}
/>`,
  "theme-toggle": `import { ThemeToggle } from "@noorddev/vlak-react";

<ThemeToggle onThemeChange={(dark) => console.log(dark)} />`,
  pagination: `import { Pagination } from "@noorddev/vlak-react";

<Pagination page={page} count={12} onPageChange={setPage} />`,
  select: `import { Select } from "@noorddev/vlak-react";

<Select
  aria-label="City"
  options={[{ value: "alkmaar", label: "Alkmaar" }]}
  value={city}
  onValueChange={setCity}
/>`,
  dialog: `import { Button, Dialog, DialogActions, DialogBody, DialogTitle } from "@noorddev/vlak-react";

<Dialog open={open} onClose={() => setOpen(false)} closeLabel="Close">
  <DialogTitle>Remove this item?</DialogTitle>
  <DialogBody>This can't be undone.</DialogBody>
  <DialogActions>
    <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
    <Button size="sm" onClick={remove}>Remove</Button>
  </DialogActions>
</Dialog>`,
  badge: `import { Badge } from "@noorddev/vlak-react";

<Badge>Recommended</Badge>
<Badge variant="solid">Delivered</Badge>
<Badge variant="muted">In progress</Badge>`,
  card: `import { Card, CardBody, CardLabel, CardTitle } from "@noorddev/vlak-react";

<Card>
  <CardLabel>Case study</CardLabel>
  <CardTitle>A quieter interface</CardTitle>
  <CardBody>Emphasis from weight and spacing, never from a hue.</CardBody>
</Card>`,
  stepper: `import { Stepper } from "@noorddev/vlak-react";

<Stepper steps={[{ name: "Brief" }, { name: "Design" }, { name: "Build" }]} current={1} />`,
};
