/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  transpilePackages: ["@noord/raster", "@noord/raster-react"],
};

export default nextConfig;
