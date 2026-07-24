import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { rasterComponents } from "@raster/core";
import { CodeBlock } from "@/components/code-block";
import { DocsNav } from "@/components/docs-nav";
import { Preview } from "@/components/preview";

export function generateStaticParams() {
  return rasterComponents.map((c) => ({ name: c.name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const component = rasterComponents.find((c) => c.name === name);
  return { title: component?.title ?? "Components", description: component?.description };
}

const reactUsage: Record<string, string> = {
  button: `import { Button } from "@/components/raster/button";

<Button>Primary action</Button>
<Button variant="ghost" size="sm">Secondary</Button>`,
  input: `import { Input } from "@/components/raster/input";

<Input label="E-mail" placeholder="renn@noord.vc" ok feedback="Looks good" />`,
  "inline-form": `import { InlineForm } from "@/components/raster/inline-form";

<InlineForm onSubmit={(email) => subscribe(email)} />`,
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
  const component = rasterComponents.find((c) => c.name === name);
  if (!component) notFound();

  const usage = reactUsage[component.name];

  return (
    <div className="docs-layout">
      <DocsNav />
      <main className="docs-main">
        <p className="rs-crumbs">
          <span>Components</span>
          <span className="rs-crumbs-sep">/</span>
          <span className="rs-crumbs-here">{component.title}</span>
        </p>
        <h1 className="rs-t-display component-head">{component.title}</h1>
        <p className="rs-t-sub component-desc">{component.description}</p>

        <div className="preview-box">
          <Preview name={component.name} snippet={component.snippet} />
        </div>

        <h2 className="section-label">Install</h2>
        <CodeBlock code={`npx raster add ${component.name}`} />

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
  );
}
