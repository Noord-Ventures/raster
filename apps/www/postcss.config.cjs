/* Extracts the site's StyleX leaves into app/stylex.css (the `@stylex;`
   marker). Same plugin options as next.config.mjs so class hashes match.
   Vlak's own leaves are not scanned: they ship precompiled inside
   @noorddev/vlak-react/css. */
const stylexBabelOptions = {
  dev: false,
  runtimeInjection: false,
  /* The site's atomics get their own prefix. Identical declarations would
     otherwise hash to the same class as the package's, and the site's
     unlayered copy would beat the package's layered :hover rules. */
  classNamePrefix: "s",
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
