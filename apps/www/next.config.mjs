/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  transpilePackages: ["@raster/core", "@raster/react"],
};

export default nextConfig;
