import { add, init, list, snippetFor, tokensJson } from "./lib";

const VERSION = "0.3.0";

const HELP = `@noord/raster-cli ${VERSION}, the monochrome design system

Usage
  npx @noord/raster-cli init [--css-dir <dir>] [--components-dir <dir>] [--compat] [--registry <url>] [--overwrite]
  npx @noord/raster-cli add <component...> [--overwrite] [--registry <url>]
  npx @noord/raster-cli list
  npx @noord/raster-cli tokens
  npx @noord/raster-cli help

Commands
  init      Write raster.css, Inter (SIL OFL 1.1), and raster.json.
            --compat also writes the 0.1 class-name layer.
            --registry <url> stores a remote registry for add (HTTP(S) or a local directory).
  add       Copy a component's React source into your project.
            CSS-only components need no code; add prints the snippet.
            --registry <url> loads items from that registry instead of the bundled snapshot.
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

function registryFlag(flags: Record<string, string | boolean>): string | undefined {
  return typeof flags.registry === "string" ? flags.registry : undefined;
}

const [, , command, ...rest] = process.argv;
const { positional, flags } = parseFlags(rest);
const cwd = process.cwd();

async function main(): Promise<void> {
  switch (command) {
    case "init": {
      const results = init(cwd, {
        cssDir: typeof flags["css-dir"] === "string" ? flags["css-dir"] : undefined,
        componentsDir: typeof flags["components-dir"] === "string" ? flags["components-dir"] : undefined,
        compat: Boolean(flags["compat"]),
        overwrite: Boolean(flags["overwrite"]),
        registry: registryFlag(flags),
      });
      console.log("Raster initialized.\n");
      reportWrites(results);
      console.log(`
Next steps
  1. Link the stylesheet (or import it in your root layout):
       <link rel="stylesheet" href="/${results[0]!.path}" />
  2. Dark scheme: set data-theme="dark" on <html>.
  3. Inter is bundled (SIL OFL 1.1). System sans is fallback only.
  4. Add components:  npx @noord/raster-cli add button dialog
`);
      break;
    }

    case "add": {
      if (positional.length === 0) {
        console.error("Nothing to add. Usage: npx @noord/raster-cli add <component...>   (see: npx @noord/raster-cli list)");
        process.exit(1);
      }
      const { outcomes, unknown } = await add(cwd, positional, {
        overwrite: Boolean(flags["overwrite"]),
        registry: registryFlag(flags),
      });
      for (const name of unknown) console.error(`✗ unknown component "${name}". See: npx @noord/raster-cli list`);
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
}

await main();
