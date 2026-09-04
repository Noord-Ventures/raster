import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  sourcemap: false,
  clean: true,
  // Bundle the code (core tokens and registry metadata included) so the
  // published CLI has no runtime dependencies. The CSS, fonts, and registry
  // snapshot are copied beside it by scripts/copy-fonts.mjs and read on use.
  noExternal: [/.*/],
  banner: {
    js: "#!/usr/bin/env node",
  },
});
