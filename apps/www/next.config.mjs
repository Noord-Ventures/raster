/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  transpilePackages: ["@noorddev/raster", "@noorddev/raster-react", "three"],
};

export default nextConfig;
