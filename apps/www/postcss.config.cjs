/* Extracts the site's StyleX leaves into app/stylex.css (the `@stylex;`
   marker). Same plugin options as next.config.mjs so class hashes match.
   Raster's own leaves are not scanned: they ship precompiled inside
   @noorddev/raster-react/css. */
const path = require("node:path");

const stylexBabelOptions = {
  dev: false,
  runtimeInjection: false,
  enableInlinedConditionalMerge: true,
  treeshakeCompensation: true,
  unstable_moduleResolution: { type: "commonJS", rootDir: __dirname },
};

module.exports = {
  plugins: {
    "@stylexjs/postcss-plugin": {
      include: ["app/**/*.{js,jsx,ts,tsx}", "components/**/*.{js,jsx,ts,tsx}"],
      babelConfig: {
        babelrc: false,
        parserOpts: { plugins: ["typescript", "jsx"] },
        plugins: [["@stylexjs/babel-plugin", stylexBabelOptions]],
      },
      useCSSLayers: false,
    },
  },
};
