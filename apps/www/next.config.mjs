import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

/* StyleX for the site's own leaves (app/, components/). The Raster
   packages arrive precompiled from node_modules, exactly as they do for
   any consumer. SWC stays in charge of everything else: this Babel pass
   runs first, only here, and only rewrites stylex.* calls. The matching
   CSS is extracted by @stylexjs/postcss-plugin (postcss.config.cjs). */
export const stylexBabelOptions = {
  dev: false,
  runtimeInjection: false,
  enableInlinedConditionalMerge: true,
  treeshakeCompensation: true,
  unstable_moduleResolution: { type: "commonJS", rootDir: here },
};

const stylexRule = (test, isTSX) => ({
  test,
  enforce: "pre",
  include: [path.join(here, "app"), path.join(here, "components")],
  use: [
    {
      loader: "babel-loader",
      options: {
        babelrc: false,
        configFile: false,
        plugins: [
          ["@babel/plugin-syntax-typescript", { isTSX }],
          "@babel/plugin-syntax-jsx",
          ["@stylexjs/babel-plugin", stylexBabelOptions],
        ],
      },
    },
  ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  transpilePackages: ["three"],
  webpack: (config) => {
    config.module.rules.unshift(stylexRule(/\.tsx$/, true), stylexRule(/\.ts$/, false));
    return config;
  },
};

export default nextConfig;
