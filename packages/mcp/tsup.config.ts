import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  sourcemap: false,
  clean: true,
  // The SDK and zod stay external (they are dependencies); the data is
  // copied beside dist/index.js by scripts/copy-data.mjs and read on use.
  banner: {
    js: "#!/usr/bin/env node",
  },
});
