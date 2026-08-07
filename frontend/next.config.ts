import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production strict mode: Failing TypeScript checks will stop the build
  typescript: {
    ignoreBuildErrors: false,
  },
  // Production strict mode: Failing ESLint checks will stop the build
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;