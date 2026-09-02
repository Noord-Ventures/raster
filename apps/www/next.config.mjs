import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  transpilePackages: ["@noorddev/raster", "@noorddev/raster-react", "@stylexjs/stylex", "three"],
  webpack: (config) => {
    // Compile StyleX leaves from React source so PostCSS and Babel share hashes.
    config.resolve.alias["@noorddev/raster-react"] = path.join(here, "../../packages/react/src/index.ts");
    return config;
  },
};

export default nextConfig;
