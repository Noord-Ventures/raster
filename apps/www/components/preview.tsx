"use client";

import * as React from "react";
import {
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
  InlineForm,
  Input,
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
