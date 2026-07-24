import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  sourcemap: false,
  clean: true,
  // Bundle everything — the published CLI carries the whole system:
  // core tokens/CSS and the generated registry, so init/add work offline.
  noExternal: [/.*/],
  loader: {
    ".css": "text",
  },
  banner: {
    js: "#!/usr/bin/env node",
  },
});
