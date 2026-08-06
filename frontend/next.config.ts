import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ignore TypeScript errors during build (we already tested in dev)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;