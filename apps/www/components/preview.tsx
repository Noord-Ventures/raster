"use client";

import * as React from "react";
import {
  Accordion,
  AccordionItem,
  Alert,
  AlertDialog,
  AlertDialogActions,
  AlertDialogBody,
  AlertDialogTitle,
  Avatar,
  AvatarRow,
  Badge,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardLabel,
  CardTitle,
  Checkbox,
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
  DropdownMenu,
  InlineForm,
  Input,
  Pagination,
  Progress,
  Radio,
  RadioGroup,
  ScrollArea,
  Select,
  Separator,
  Sheet,
  SheetBody,
  SheetTitle,
  Skeleton,
  Slider,
  Stepper,
  Switch,
  Textarea,
  toast,
  Toaster,
  ToggleGroup,
  Tooltip,
  Popover,
  PopoverBody,
  PopoverTitle,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "@raster/react";

function DialogDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
        Remove item…
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Remove this item?</DialogTitle>
        <DialogBody>This can&rsquo;t be undone.</DialogBody>
        <DialogActions>
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button size="sm" onClick={() => setOpen(false)}>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function AlertDialogDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
        Delete workspace…
      </Button>
      <AlertDialog open={open} onClose={() => setOpen(false)}>
        <AlertDialogTitle>Delete this workspace?</AlertDialogTitle>
        <AlertDialogBody>All projects go with it. This needs an answer.</AlertDialogBody>
        <AlertDialogActions>
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
            Keep it
          </Button>
          <Button size="sm" onClick={() => setOpen(false)}>
            Delete
          </Button>
        </AlertDialogActions>
      </AlertDialog>
    </>
  );
}

function SheetDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
        Open filters
      </Button>
      <Sheet open={open} onClose={() => setOpen(false)}>
        <SheetTitle>Filters</SheetTitle>
        <SheetBody>Everything narrows from here. Press Escape to close.</SheetBody>
      </Sheet>
    </>
  );
}

function ToastDemo() {
  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => toast("Saved", { description: "Your changes are live." })}>
        Save changes
      </Button>
      <Toaster />
    </>
  );
}

function PaginationDemo() {
  const [page, setPage] = React.useState(3);
  return <Pagination page={page} count={12} onPageChange={setPage} />;
}

function SliderDemo() {
  const [value, setValue] = React.useState(62);
  return (
    <div style={{ width: 240 }}>
      <Slider value={value} onValueChange={setValue} aria-label="Value" />
    </div>
  );
}

function ProgressDemo() {
  return (
    <div style={{ width: 240 }}>
      <Progress label="Uploading" value={40} />
    </div>
  );
}

/** Live demo per registry name. CSS-only entries fall back to their snippet. */
export const demos: Record<string, () => React.ReactNode> = {
  button: () => (
    <div style={{ display: "flex", gap: 10 }}>
      <Button>Primary action</Button>
      <Button variant="ghost">Secondary</Button>
    </div>
  ),
  badge: () => (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Badge>Recommended</Badge>
      <Badge variant="solid">Delivered</Badge>
      <Badge variant="muted">In progress</Badge>
    </div>
  ),
  card: () => (
    <Card>
      <CardLabel>Case study</CardLabel>
      <CardTitle>A quieter interface</CardTitle>
      <CardBody>Emphasis from weight and spacing, never from a hue.</CardBody>
    </Card>
  ),
  input: () => (
    <div style={{ width: 260 }}>
      <Input label="E-mail" placeholder="renn@noord.vc" />
    </div>
  ),
  "inline-form": () => (
    <div style={{ width: 300 }}>
      <InlineForm />
    </div>
  ),
  checkbox: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <Checkbox label="Brand" defaultChecked />
      <Checkbox label="Product" />
    </div>
  ),
  radio: () => (
    <RadioGroup defaultValue="monthly" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <Radio value="monthly" label="Monthly" />
      <Radio value="yearly" label="Yearly" />
    </RadioGroup>
  ),
  switch: () => <Switch defaultChecked aria-label="Notifications" />,
  slider: SliderDemo,
  progress: ProgressDemo,
  tabs: () => (
    <Tabs defaultValue="overview">
      <TabList>
        <Tab value="overview">Overview</Tab>
        <Tab value="activity">Activity</Tab>
        <Tab value="settings">Settings</Tab>
      </TabList>
    </Tabs>
  ),
  accordion: () => (
    <div style={{ width: 300 }}>
      <Accordion exclusive>
        <AccordionItem title="What is Raster?" defaultOpen>
          A monochrome, CSS-first design system.
        </AccordionItem>
        <AccordionItem title="Is it dependency-free?">Yes — native elements do the work.</AccordionItem>
      </Accordion>
    </div>
  ),
  alert: () => (
    <div style={{ width: 300 }}>
      <Alert title="Heads up">Your workspace syncs every hour.</Alert>
    </div>
  ),
  "alert-dialog": AlertDialogDemo,
  avatar: () => (
    <AvatarRow>
      <Avatar initials="RV" />
      <Avatar initials="NO" />
      <Avatar initials="+3" />
    </AvatarRow>
  ),
  textarea: () => (
    <div style={{ width: 280 }}>
      <Textarea label="Notes" placeholder="What should we know?" rows={3} />
    </div>
  ),
  separator: () => (
    <div style={{ width: 220 }}>
      <p className="rs-t-body">Above the line.</p>
      <Separator />
      <p className="rs-t-body">Below it.</p>
    </div>
  ),
  skeleton: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 220 }}>
      <Skeleton width="60%" />
      <Skeleton width="100%" />
      <Skeleton width="85%" />
    </div>
  ),
  tooltip: () => (
    <Tooltip tip="Copy to clipboard">
      <Button variant="ghost" size="sm">
        Copy
      </Button>
    </Tooltip>
  ),
  toast: ToastDemo,
  "dropdown-menu": () => (
    <DropdownMenu
      label="Actions"
      items={[
        { label: "Rename" },
        { label: "Duplicate" },
        { separator: true },
        { label: "Delete" },
      ]}
    />
  ),
  toggle: () => (
    <ToggleGroup
      options={[
        { value: "left", label: "Left" },
        { value: "center", label: "Center" },
        { value: "right", label: "Right" },
      ]}
      defaultValue="left"
    />
  ),
  popover: () => (
    <Popover trigger="Details">
      <PopoverTitle>Module grid</PopoverTitle>
      <PopoverBody>204px modules: a 184px column and a 20px gutter.</PopoverBody>
    </Popover>
  ),
  sheet: SheetDemo,
  "scroll-area": () => (
    <ScrollArea maxHeight={110} style={{ width: 180 }}>
      {["Alkmaar", "Amsterdam", "Delft", "Eindhoven", "Groningen", "Haarlem", "Rotterdam", "Utrecht"].map((c) => (
        <p key={c} className="rs-t-body" style={{ padding: "3px 0" }}>
          {c}
        </p>
      ))}
    </ScrollArea>
  ),
  "crumb-bar": () => (
    <nav className="rs-crumb-bar rs-crumb-bar-scrolled" style={{ position: "relative", width: 340 }} aria-label="Breadcrumbs">
      <div className="rs-crumb-bar-inner" style={{ margin: 0, paddingLeft: 16 }}>
        <p className="rs-crumbs">
          <span>Raster</span>
          <span className="rs-crumbs-sep">/</span>
          <span className="rs-crumbs-here">Components</span>
        </p>
      </div>
    </nav>
  ),
  breadcrumbs: () => (
    <Breadcrumbs items={[{ label: "Studio", href: "#" }, { label: "Raster" }]} />
  ),
  pagination: PaginationDemo,
  select: () => (
    <Select
      options={[
        { value: "alkmaar", label: "Alkmaar" },
        { value: "amsterdam", label: "Amsterdam" },
        { value: "rotterdam", label: "Rotterdam" },
      ]}
      defaultValue="alkmaar"
    />
  ),
  dialog: DialogDemo,
  stepper: () => (
    <Stepper
      steps={[{ name: "Brief" }, { name: "Design" }, { name: "Build" }]}
      current={1}
    />
  ),
};

export function Preview({ name, snippet }: { name: string; snippet: string }) {
  const demo = demos[name];
  if (demo) return <>{demo()}</>;
  return <div dangerouslySetInnerHTML={{ __html: snippet }} />;
}
