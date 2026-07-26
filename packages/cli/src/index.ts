import { add, init, list, snippetFor, tokensJson } from "./lib";

const VERSION = "0.2.0";

const HELP = `raster ${VERSION}, the monochrome design system

Usage
  raster init [--css-dir <dir>] [--components-dir <dir>] [--compat] [--overwrite]
  raster add <component...> [--overwrite]
  raster list
  raster tokens
  raster help

Commands
  init      Write raster.css into your project (plus raster.json config).
            --compat also writes the 0.1 class-name layer.
  add       Copy a component's React source into your project.
            CSS-only components need no code; add prints the snippet.
  list      Every component in the registry.
  tokens    The design tokens as JSON.
`;

function parseFlags(argv: string[]): { positional: string[]; flags: Record<string, string | boolean> } {
  const positional: string[] = [];
  const flags: Record<string, string | boolean> = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]!;
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith("--")) {
        flags[key] = next;
        i++;
      } else {
        flags[key] = true;
      }
    } else {
      positional.push(arg);
    }
  }
  return { positional, flags };
}

function reportWrites(results: { path: string; status: string }[]): void {
  for (const r of results) {
    const mark = r.status === "written" ? "+" : r.status === "unchanged" ? "=" : "!";
    const note = r.status === "skipped" ? "  (exists; pass --overwrite to replace)" : "";
    console.log(`  ${mark} ${r.path}${note}`);
  }
}

const [, , command, ...rest] = process.argv;
const { positional, flags } = parseFlags(rest);
const cwd = process.cwd();

switch (command) {
  case "init": {
    const results = init(cwd, {
      cssDir: typeof flags["css-dir"] === "string" ? flags["css-dir"] : undefined,
      componentsDir: typeof flags["components-dir"] === "string" ? flags["components-dir"] : undefined,
      compat: Boolean(flags["compat"]),
      overwrite: Boolean(flags["overwrite"]),
    });
    console.log("Raster initialized.\n");
    reportWrites(results);
    console.log(`
Next steps
  1. Link the stylesheet (or import it in your root layout):
       <link rel="stylesheet" href="/${results[0]!.path}" />
  2. Dark scheme: set data-theme="dark" on <html>.
  3. Messina Sans is licensed and not bundled. Provide your own
     @font-face; the stack falls back to system sans.
  4. Add components:  npx raster add button dialog
`);
    break;
  }

  case "add": {
    if (positional.length === 0) {
      console.error("Nothing to add. Usage: raster add <component...>   (see: raster list)");
      process.exit(1);
    }
    const { outcomes, unknown } = add(cwd, positional, { overwrite: Boolean(flags["overwrite"]) });
    for (const name of unknown) console.error(`✗ unknown component "${name}". See: raster list`);
    for (const outcome of outcomes) {
      if (outcome.cssOnly) {
        console.log(`${outcome.item.title} (${outcome.item.name}) is CSS-only; already styled by raster.css.`);
        const snippet = snippetFor(outcome.item.name);
        if (snippet) console.log(`  Markup:\n${snippet.split("\n").map((l) => `    ${l}`).join("\n")}`);
      } else {
        console.log(`${outcome.item.title} (${outcome.item.name})`);
        reportWrites(outcome.results);
      }
    }
    if (unknown.length > 0) process.exit(1);
    break;
  }

  case "list": {
    const entries = list();
    const byCategory = new Map<string, typeof entries>();
    for (const entry of entries) {
      const group = byCategory.get(entry.category) ?? [];
      group.push(entry);
      byCategory.set(entry.category, group);
    }
    for (const [category, group] of byCategory) {
      console.log(`\n${category}`);
      for (const entry of group) {
        console.log(`  ${entry.name.padEnd(14)} ${entry.description}${entry.cssOnly ? "  [css-only]" : ""}`);
      }
    }
    console.log();
    break;
  }

  case "tokens":
    console.log(tokensJson());
    break;

  case "help":
  case undefined:
  case "--help":
    console.log(HELP);
    break;

  case "--version":
  case "version":
    console.log(VERSION);
    break;

  default:
    console.error(`Unknown command "${command}".\n`);
    console.log(HELP);
    process.exit(1);
}
