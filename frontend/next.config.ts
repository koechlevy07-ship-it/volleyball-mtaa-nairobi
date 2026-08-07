import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production strict mode: Failing TypeScript checks will stop the build
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;