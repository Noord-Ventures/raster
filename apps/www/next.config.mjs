/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  transpilePackages: ["@noordvc/raster", "@noordvc/raster-react"],
};

export default nextConfig;
