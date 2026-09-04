# @noorddev/raster-mcp

An MCP server for the Raster design system. Coding agents get the component catalogue, per-component docs with generated props tables, install commands, the design tokens, and the guide, all from a local snapshot. No network.

## Setup

Claude Code, Cursor, Windsurf, and other MCP clients take the same shape:

```json
{
  "mcpServers": {
    "raster": {
      "command": "npx",
      "args": ["-y", "@noorddev/raster-mcp"]
    }
  }
}
```

Claude Code from the terminal:

```sh
claude mcp add raster -- npx -y @noorddev/raster-mcp
```

## Tools

| Tool | Input | Returns |
|---|---|---|
| `list_components` | `category?` | Every catalogue component: name, title, description, category, aliases |
| `search_components` | `term` | Matches by name, title, description, alias (Sonner, Drawer, Combobox, and so on), or `rs-*` class, ranked |
| `get_component` | `name` | The markdown page, props as JSON (name, type, required, default, description, extends), the React example, the CSS snippet, classes, keyboard table, accessibility notes, dependencies |
| `get_install` | `name` | `npm install @noorddev/raster-react` plus the import line, `npx @noorddev/raster-cli add <name>`, `npx shadcn add https://getraster.com/r/<name>.json`, and the CSS-only markup |
| `get_tokens` | | The tokens page: every custom property, light and dark, StyleX alias, raw token groups |
| `get_guide` | | Install paths, theming, cascade layers, StyleX, CLI, registry, conventions |

## Resources

- `raster://docs/guide`
- `raster://docs/<name>` for every component (listed, with completion)
- `raster://tokens`

The same pages are served at `https://getraster.com/docs/<name>.md`, indexed by `https://getraster.com/llms.txt`.

## Data

The server reads `registry/bundle.json` (items, generated docs, CSS) and `props.json`, copied into `dist/` at build time from the workspace. Both are generated from `packages/core/src/registry.ts` and the React sources; nothing is hand-copied.

Docs: [getraster.com](https://getraster.com). Licence: MIT.
