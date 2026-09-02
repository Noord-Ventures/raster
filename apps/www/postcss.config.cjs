const babelConfig = require("./babel.config.json");

module.exports = {
  plugins: {
    "@stylexjs/postcss-plugin": {
      include: [
        "app/**/*.{js,jsx,ts,tsx}",
        "components/**/*.{js,jsx,ts,tsx}",
        "../../packages/react/src/**/*.{js,jsx,ts,tsx}",
      ],
      babelConfig: {
        babelrc: false,
        parserOpts: { plugins: ["typescript", "jsx"] },
        plugins: babelConfig.plugins,
      },
      useCSSLayers: false,
    },
  },
};
