import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/tokens.stylex.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "@noorddev/raster", "@stylexjs/stylex", /tokens\.stylex/],
});
